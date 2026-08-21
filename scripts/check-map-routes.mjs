import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import ts from 'typescript';

const source = await readFile(new URL('../src/data/itinerary.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;

const dataModule = { exports: {} };
const require = createRequire(import.meta.url);
new Function('module', 'exports', 'require', compiled)(dataModule, dataModule.exports, require);

const {
  getDirectionsIssue,
  getDirectionsUrl,
  getGoogleMapsUrl,
  getMapDestination,
  getPlanDirectionsIssue,
  getPlannedOrigin,
  itinerary,
} = dataModule.exports;

assert.equal(itinerary.length, 28, 'Notion snapshot must contain all 28 live rows');
assert.deepEqual([...new Set(itinerary.map((item) => item.dayNumber))], [1, 2, 3, 4]);
assert.deepEqual(
  [1, 2, 3, 4].map((day) => itinerary.filter((item) => item.dayNumber === day).length),
  [8, 7, 9, 4],
  'Notion day counts must match the live itinerary',
);
assert.equal(new Set(itinerary.map((item) => item.id)).size, itinerary.length, 'Notion row IDs must stay unique');

const blockedTitles = itinerary.filter((item) => getDirectionsIssue(item)).map((item) => item.title);
assert.deepEqual(
  blockedTitles,
  ['Ăn nhẹ → tới meeting point tour', 'Tour Shifen → Jiufen · chiều đến tối'],
  'Only the two intentionally unresolved tour rows may block directions',
);

for (const item of itinerary) {
  const destination = getMapDestination(item);
  const directionsIssue = getDirectionsIssue(item);
  const currentHref = getDirectionsUrl(item, 'current');
  const planHref = getDirectionsUrl(item, 'plan');
  const plannedOrigin = getPlannedOrigin(item);

  assert.ok(destination.trim(), `${item.title}: destination must not be empty`);

  if (directionsIssue) {
    assert.equal(currentHref, undefined, `${item.title}: unsafe current route must stay disabled`);
    assert.equal(planHref, undefined, `${item.title}: unsafe plan route must stay disabled`);
    continue;
  }

  assert.ok(currentHref, `${item.title}: safe current route must have a URL`);
  const currentUrl = new URL(currentHref);
  assert.equal(currentUrl.origin, 'https://www.google.com');
  assert.equal(currentUrl.pathname, '/maps/dir/');
  assert.equal(currentUrl.searchParams.get('destination'), destination);
  assert.equal(currentUrl.searchParams.has('origin'), false, `${item.title}: current route must omit origin`);

  if (plannedOrigin) {
    assert.ok(planHref, `${item.title}: resolved plan origin must have a URL`);
    const planUrl = new URL(planHref);
    assert.equal(planUrl.searchParams.get('origin'), plannedOrigin, `${item.title}: plan origin mismatch`);
    const waypoints = planUrl.searchParams.get('waypoints')?.split('|') ?? [];
    assert.equal(waypoints.includes(plannedOrigin), false, `${item.title}: origin repeated as waypoint`);
  } else {
    assert.equal(planHref, undefined, `${item.title}: ambiguous plan route must stay disabled`);
  }
}

const airportMrt = itinerary.find((item) => item.title.startsWith('Airport MRT A12'));
assert.ok(airportMrt, 'Representative Airport MRT route is missing');
const airportCurrent = new URL(getDirectionsUrl(airportMrt, 'current'));
const airportPlan = new URL(getDirectionsUrl(airportMrt, 'plan'));
assert.equal(airportCurrent.searchParams.has('origin'), false);
assert.equal(airportPlan.searchParams.get('origin'), 'Airport Terminal 1 Station (A12)');
assert.equal(airportPlan.searchParams.get('waypoints'), 'Taipei Main Station (A1)');
assert.equal(airportPlan.searchParams.get('destination'), 'Muzik Hotel Ximen Station Branch');

const multiLeg = itinerary.find((item) => item.title.startsWith('Ximen → A1'));
assert.ok(multiLeg, 'Representative multi-leg airport route is missing');
const multiLegPlan = new URL(getDirectionsUrl(multiLeg, 'plan'));
assert.equal(multiLegPlan.searchParams.get('origin'), 'Ximen Station');
assert.equal(multiLegPlan.searchParams.get('waypoints'), 'Beimen Station|Taipei Main Station A1');
assert.equal(multiLegPlan.searchParams.get('destination'), 'Airport Terminal 1 Station A12');

const supplementalPoi = itinerary.find((item) => item.title.startsWith('Syntrend Creative Park'));
assert.ok(supplementalPoi, 'Representative transit-to-POI row is missing');
const supplementalPlan = new URL(getDirectionsUrl(supplementalPoi, 'plan'));
assert.equal(supplementalPlan.searchParams.get('origin'), 'Ximen Station');
assert.equal(
  supplementalPlan.searchParams.get('waypoints'),
  'Zhongxiao Xinsheng Station|Syntrend Creative Park',
);
assert.equal(supplementalPlan.searchParams.get('destination'), 'Guang Hua Digital Plaza');
assert.equal(supplementalPlan.searchParams.get('travelmode'), 'transit');

const supplementalFixture = {
  ...supplementalPoi,
  mapSearch: 'Maps: Syntrend Creative Park; Guang Hua Digital Plaza | MRT: Ximen Station → Zhongxiao Xinsheng Station → Syntrend Creative Park',
};
const supplementalFixturePlan = new URL(getDirectionsUrl(supplementalFixture, 'plan'));
assert.equal(supplementalFixturePlan.searchParams.get('origin'), 'Ximen Station');
assert.equal(
  supplementalFixturePlan.searchParams.get('waypoints'),
  'Zhongxiao Xinsheng Station|Syntrend Creative Park',
);
assert.equal(supplementalFixturePlan.searchParams.get('destination'), 'Guang Hua Digital Plaza');

const observatory = itinerary.find((item) => item.title === 'Taipei 101 Observatory');
assert.ok(observatory, 'Representative MRT attraction row is missing');
assert.equal(new URL(getDirectionsUrl(observatory, 'plan')).searchParams.get('travelmode'), 'transit');

const taxiLeg = itinerary.find((item) => item.title.startsWith('Wu Jia Beef Noodles'));
assert.ok(taxiLeg, 'Representative taxi row is missing');
assert.equal(new URL(getDirectionsUrl(taxiLeg, 'plan')).searchParams.get('travelmode'), 'driving');

const airportWalk = itinerary.find((item) => item.title === 'Nhập cảnh + lấy hành lý');
assert.ok(airportWalk, 'Representative in-airport walking row is missing');
assert.equal(new URL(getDirectionsUrl(airportWalk, 'plan')).searchParams.get('travelmode'), 'walking');

const marketWalk = itinerary.find((item) => item.title.startsWith('Longshan Temple +'));
assert.ok(marketWalk, 'Representative walking row is missing');
assert.equal(new URL(getDirectionsUrl(marketWalk, 'plan')).searchParams.get('travelmode'), 'walking');

const hotSpring = itinerary.find((item) => item.title.startsWith('The Gaia Hotel ·'));
assert.ok(hotSpring, 'Representative stay-put row is missing');
assert.equal(new URL(getDirectionsUrl(hotSpring, 'current')).searchParams.has('travelmode'), false);

const conditionalOrigin = itinerary.find((item) => item.title.startsWith('Raohe Night Market'));
assert.ok(conditionalOrigin, 'Representative conditional-origin row is missing');
assert.equal(getPlannedOrigin(conditionalOrigin), undefined, 'A conditional origin must not be invented');
assert.equal(getDirectionsUrl(conditionalOrigin, 'plan'), undefined);

const samePlace = itinerary.find((item) => item.title.startsWith('Xiaoyoukeng ·'));
assert.ok(samePlace, 'Representative same-place row is missing');
assert.equal(getPlannedOrigin(samePlace), undefined, 'A route starting at the destination must stay disabled');
assert.equal(new URL(getDirectionsUrl(samePlace, 'current')).searchParams.get('travelmode'), null);

const nextLegMention = itinerary.find((item) => item.title.startsWith('Qingtiangang Grassland'));
assert.ok(nextLegMention, 'Representative next-leg mention row is missing');
assert.equal(new URL(getDirectionsUrl(nextLegMention, 'current')).searchParams.get('travelmode'), null);

const meetingTbd = itinerary.find((item) => item.title.startsWith('Ăn nhẹ →'));
assert.ok(meetingTbd, 'Representative TBD row is missing');
assert.match(getDirectionsIssue(meetingTbd), /TBD/);
assert.equal(getDirectionsUrl(meetingTbd, 'current'), undefined);
assert.doesNotMatch(new URL(getGoogleMapsUrl(meetingTbd)).searchParams.get('query'), /TBD/i);

const guidedTour = itinerary.find((item) => item.title.startsWith('Tour Shifen'));
assert.ok(guidedTour, 'Representative guided-tour row is missing');
assert.match(getDirectionsIssue(guidedTour), /voucher/);
assert.equal(getDirectionsUrl(guidedTour, 'current'), undefined);

const ambiguousStop = itinerary.find((item) => item.title.startsWith('Daan Forest Park /'));
assert.ok(ambiguousStop, 'Representative optional-stop row is missing');
assert.match(getPlanDirectionsIssue(ambiguousStop), /HOẶC/);
assert.equal(getDirectionsUrl(ambiguousStop, 'plan'), undefined);
assert.equal(new URL(getDirectionsUrl(ambiguousStop, 'current')).searchParams.get('destination'), 'Lungshan Temple');

const bilingualOrigin = marketWalk;
assert.ok(bilingualOrigin, 'Representative bilingual-origin row is missing');
assert.match(getPlannedOrigin(bilingualOrigin), /龍山寺/);

console.log(`Map route checks passed for ${itinerary.length} itinerary items.`);
