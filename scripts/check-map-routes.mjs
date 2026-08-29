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

assert.equal(itinerary.length, 34, 'Notion snapshot must contain all 34 live rows');
assert.deepEqual([...new Set(itinerary.map((item) => item.dayNumber))], [1, 2, 3, 4]);
assert.deepEqual(
  [1, 2, 3, 4].map((day) => itinerary.filter((item) => item.dayNumber === day).length),
  [9, 9, 11, 5],
  'Notion day counts must match the live itinerary',
);
assert.equal(new Set(itinerary.map((item) => item.id)).size, itinerary.length, 'Notion row IDs must stay unique');

const primaryItinerary = itinerary.filter((item) => !item.isBackup);
const backupItinerary = itinerary.filter((item) => item.isBackup);
assert.equal(primaryItinerary.length, 28, 'The live timeline must keep 28 primary activities');
assert.equal(backupItinerary.length, 6, 'Notion must expose all six fallback routes');
assert.ok(
  backupItinerary.every((backup) =>
    primaryItinerary.some(
      (primary) =>
        primary.dayNumber === backup.dayNumber &&
        primary.start === backup.start &&
        primary.end === backup.end,
    ),
  ),
  'Every backup must pair with a primary row using the same time window',
);

const toMinutes = (clock) => {
  const [hours, minutes] = clock.split(':').map(Number);
  return hours * 60 + minutes;
};

for (const [index, item] of primaryItinerary.entries()) {
  assert.match(item.start, /^\d{2}:\d{2}$/);
  assert.match(item.end, /^\d{2}:\d{2}$/);
  assert.ok(toMinutes(item.end) > toMinutes(item.start), `${item.title}: end must be after start`);
  const previous = primaryItinerary[index - 1];
  if (previous?.dayNumber === item.dayNumber) {
    assert.ok(toMinutes(previous.end) <= toMinutes(item.start), `${item.title}: schedule must not overlap the previous row`);
  }
}

assert.deepEqual(
  primaryItinerary.filter((item) => item.dayNumber === 1).map((item) => [item.start, item.title]),
  [
    ['07:50', 'Có mặt SGN T2 · check-in China Airlines'],
    ['10:50', 'Bay SGN → TPE · China Airlines CI782'],
    ['15:20', 'Nhập cảnh + lấy hành lý'],
    ['16:40', '🥇 PRIMARY — Airport MRT A12 → A1 → taxi → Muzik'],
    ['17:50', 'Check-in Muzik Hotel'],
    ['18:40', 'Taipei 101 Observatory'],
    ['20:05', 'Syntrend Creative Park'],
    ['20:43', 'Syntrend → bus 202 → Ximen → ngủ sớm'],
  ],
  'Day 1 order and updated times must match Notion',
);

const blockedTitles = itinerary.filter((item) => getDirectionsIssue(item)).map((item) => item.title);
assert.deepEqual(
  blockedTitles,
  [
    'Bay SGN → TPE · China Airlines CI782',
    'Ăn nhẹ → tới meeting point tour',
    'Tour Shifen → Jiufen · chiều đến tối',
    'Bay TPE → SGN · China Airlines CI783',
  ],
  'Flights and tour legs with an unconfirmed voucher meeting point must block road directions',
);

for (const item of itinerary) {
  const destination = getMapDestination(item);
  const directionsIssue = getDirectionsIssue(item);
  const currentHref = getDirectionsUrl(item, 'current');
  const planHref = getDirectionsUrl(item, 'plan');
  const plannedOrigin = getPlannedOrigin(item);
  const searchUrl = new URL(getGoogleMapsUrl(item));

  assert.ok(destination.trim(), `${item.title}: destination must not be empty`);
  assert.doesNotMatch(destination, /(?:\bNo|\bSec|\bRd|\bBlvd)$/i, `${item.title}: dotted address was truncated`);
  assert.equal(searchUrl.origin, 'https://www.google.com');
  assert.ok(searchUrl.searchParams.get('query')?.trim(), `${item.title}: search destination must not be empty`);

  if (directionsIssue) {
    assert.equal(currentHref, undefined, `${item.title}: unsafe current route must stay disabled`);
    assert.equal(planHref, undefined, `${item.title}: unsafe plan route must stay disabled`);
    continue;
  }

  assert.ok(currentHref, `${item.title}: safe current route must have a URL`);
  assert.ok(currentHref.length < 2048, `${item.title}: current Maps URL must stay below 2,048 chars`);
  const currentUrl = new URL(currentHref);
  assert.equal(currentUrl.origin, 'https://www.google.com');
  assert.equal(currentUrl.pathname, '/maps/dir/');
  assert.equal(currentUrl.searchParams.get('destination'), destination);
  assert.equal(currentUrl.searchParams.has('origin'), false, `${item.title}: current route must omit origin`);
  assert.equal(currentUrl.searchParams.has('departure_time'), false, `${item.title}: Maps URLs do not support departure_time`);
  assert.equal(currentUrl.searchParams.has('dir_action'), false, `${item.title}: route preview must not auto-start navigation`);

  const travelMode = currentUrl.searchParams.get('travelmode');
  if (travelMode === 'transit') {
    assert.equal(currentUrl.searchParams.has('waypoints'), false, `${item.title}: transit route must omit waypoints`);
  }

  if (plannedOrigin) {
    assert.ok(planHref, `${item.title}: resolved plan origin must have a URL`);
    assert.ok(planHref.length < 2048, `${item.title}: planned Maps URL must stay below 2,048 chars`);
    const planUrl = new URL(planHref);
    assert.equal(planUrl.searchParams.get('origin'), plannedOrigin, `${item.title}: plan origin mismatch`);
    assert.equal(planUrl.searchParams.has('departure_time'), false, `${item.title}: planned time stays in the UI, not the URL`);
    assert.equal(planUrl.searchParams.has('dir_action'), false, `${item.title}: planned route must stay in preview mode`);
    const waypoints = planUrl.searchParams.get('waypoints')?.split('|') ?? [];
    assert.equal(waypoints.includes(plannedOrigin), false, `${item.title}: origin repeated as waypoint`);
    assert.ok(waypoints.length <= 3, `${item.title}: mobile Maps URLs support at most three waypoints`);
    if (travelMode === 'transit') {
      assert.equal(planUrl.searchParams.has('waypoints'), false, `${item.title}: planned transit must stay one leg`);
    }
  } else {
    assert.equal(planHref, undefined, `${item.title}: unresolved plan origin must stay disabled`);
  }
}

const find = (title) => {
  const normalizeTitle = (value) => value.replace(/^(?:🥇|🔄)\s*(?:PRIMARY|BACKUP)\s*—\s*/iu, '');
  const item = itinerary.find((candidate) => {
    const candidateTitle = normalizeTitle(candidate.title);
    return candidateTitle === title || candidateTitle.startsWith(title);
  });
  assert.ok(item, `Representative row is missing: ${title}`);
  return item;
};

const expectedModes = new Map([
  ['Nhập cảnh + lấy hành lý', 'walking'],
  ['Airport MRT A12', 'transit'],
  ['Taipei 101 Observatory', 'transit'],
  ['Syntrend Creative Park', 'transit'],
  ['Syntrend → bus 202', 'transit'],
  ['Ximen → Yangmingshan', 'transit'],
  ['Qingtiangang → Shilin', 'transit'],
  ['Yixin Dumpling & Beef Noodle', 'transit'],
  ['Dadaocheng sunset', 'transit'],
  ['Muzik → bus 235', 'transit'],
  ['Holy Family → bus 568', 'transit'],
  ['Longshan → Taipei Main', 'transit'],
  ['Raohe Night Market', null],
  ['Muzik → taxi A1', 'transit'],
]);

for (const [title, mode] of expectedModes) {
  const url = new URL(getDirectionsUrl(find(title), 'current'));
  assert.equal(url.searchParams.get('travelmode'), mode, `${title}: wrong travel mode`);
}

const airportMrt = find('Airport MRT A12');
const airportPlan = new URL(getDirectionsUrl(airportMrt, 'plan'));
assert.match(airportPlan.searchParams.get('origin'), /^A12 Airport Terminal 1 Station/);
assert.match(airportPlan.searchParams.get('destination'), /^Muzik Hotel - Ximen Station Branch/);
assert.equal(airportPlan.searchParams.has('waypoints'), false);

const syntrend = find('Syntrend Creative Park');
const syntrendPlan = new URL(getDirectionsUrl(syntrend, 'plan'));
assert.match(syntrendPlan.searchParams.get('origin'), /^Taipei 101 Observatory/);
assert.match(syntrendPlan.searchParams.get('destination'), /^Syntrend Creative Park, No\. 2/);
assert.equal(syntrendPlan.searchParams.has('waypoints'), false);

const shuttleLeg = find('Yixin Dumpling & Beef Noodle');
assert.match(getMapDestination(shuttleLeg), /^The Gaia Hotel Taipei, No\. 1 Qiyan Road/);
assert.match(getPlannedOrigin(shuttleLeg), /^Beitou Station Exit 1/);

const multiStopTransit = find('Dadaocheng sunset');
const multiStopTransitPlan = new URL(getDirectionsUrl(multiStopTransit, 'plan'));
assert.match(multiStopTransitPlan.searchParams.get('origin'), /^The Gaia Hotel Taipei/);
assert.match(multiStopTransitPlan.searchParams.get('destination'), /^Ningxia Night Market/);
assert.equal(multiStopTransitPlan.searchParams.has('waypoints'), false);

const meetingPoint = find('Ăn nhẹ →');
assert.match(getDirectionsIssue(meetingPoint), /voucher/, 'The meeting point must stay blocked until the voucher is confirmed');
assert.equal(getDirectionsUrl(meetingPoint, 'plan'), undefined);
assert.match(new URL(getGoogleMapsUrl(meetingPoint)).searchParams.get('query'), /^Taipei City Mall/);

const raohe = find('Raohe Night Market');
assert.match(getMapDestination(raohe), /^Raohe Street Night Market/);
assert.equal(getPlannedOrigin(raohe), undefined);

const samePlace = find('Xiaoyoukeng ·');
assert.equal(getPlannedOrigin(samePlace), undefined);
assert.equal(new URL(getDirectionsUrl(samePlace, 'current')).searchParams.get('travelmode'), null);

const nextLegMention = find('Qingtiangang Grassland');
assert.equal(getPlannedOrigin(nextLegMention), undefined);
assert.equal(new URL(getDirectionsUrl(nextLegMention, 'current')).searchParams.get('travelmode'), null);

const busToLongshan = find('Holy Family → bus 568');
assert.match(getPlannedOrigin(busToLongshan), /^Holy Family Catholic Church/);
assert.match(getMapDestination(busToLongshan), /^Longshan Temple/);
assert.equal(new URL(getDirectionsUrl(busToLongshan, 'plan')).searchParams.get('travelmode'), 'transit');

const guidedTour = find('Tour Shifen');
assert.match(getDirectionsIssue(guidedTour), /voucher/);
assert.match(getMapDestination(guidedTour), /^Jiufen Old Street/);

for (const flightTitle of ['Bay SGN → TPE', 'Bay TPE → SGN']) {
  const flight = find(flightTitle);
  assert.match(getDirectionsIssue(flight), /Chặng bay/);
  assert.match(new URL(getGoogleMapsUrl(flight)).searchParams.get('query'), /International Airport.*Terminal/);
}

const holyFamily = find('Holy Family Catholic Church ·');
assert.match(getMapDestination(holyFamily), /^Holy Family Catholic Church, Da'an District/);
const cityMall = find('Taipei City Mall ·');
assert.match(getMapDestination(cityMall), /^Taipei City Mall, Zhongzheng District/);

const supplementalFixture = {
  ...syntrend,
  mapSearch: 'Maps: Syntrend Creative Park; Guang Hua Digital Plaza | MRT: Ximen Station → Zhongxiao Xinsheng Station → Syntrend Creative Park',
};
const supplementalFixturePlan = new URL(getDirectionsUrl(supplementalFixture, 'plan'));
assert.equal(supplementalFixturePlan.searchParams.get('origin'), 'Ximen Station');
assert.equal(supplementalFixturePlan.searchParams.get('destination'), 'Guang Hua Digital Plaza');
assert.equal(supplementalFixturePlan.searchParams.get('travelmode'), 'transit');
assert.equal(supplementalFixturePlan.searchParams.has('waypoints'), false);

console.log(`Map route checks passed for ${itinerary.length} itinerary items.`);

