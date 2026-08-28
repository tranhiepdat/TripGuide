import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import ts from 'typescript';

function loadTypescriptModule(path) {
  return readFile(new URL(path, import.meta.url), 'utf8').then((source) => {
    const compiled = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    }).outputText;
    const loaded = { exports: {} };
    new Function('module', 'exports', 'require', compiled)(loaded, loaded.exports, createRequire(import.meta.url));
    return loaded.exports;
  });
}

const tokenizerSource = await readFile(new URL('../src/lib/transportText.ts', import.meta.url), 'utf8');
assert.doesNotMatch(tokenizerSource, /\(\?<\!/, 'Mobile Safari-compatible tokenizer must not use regex lookbehind');

const { tokenizeTransportText } = await loadTypescriptModule('../src/lib/transportText.ts');
const { itinerary } = await loadTypescriptModule('../src/data/itinerary.ts');

function keywords(value) {
  return tokenizeTransportText(value)
    .filter((segment) => segment.kind)
    .map(({ value: text, kind }) => [text, kind]);
}

assert.deepEqual(keywords('bus 260 → đổi bus 108 → tuyến S15'), [
  ['bus 260', 'bus'],
  ['bus 108', 'bus'],
  ['tuyến S15', 'bus'],
]);
assert.deepEqual(keywords('bus R5/Red 5 → bus 108; check ETA 230 hoặc S9'), [
  ['bus R5', 'bus'],
  ['Red 5', 'bus'],
  ['bus 108', 'bus'],
  ['230', 'bus'],
  ['S9', 'bus'],
]);
assert.deepEqual(keywords('Blue/Bannan Line → Red Line → Green Line → Orange Line → Brown Line → Yellow Line'), [
  ['Blue/Bannan Line', 'line-blue'],
  ['Red Line', 'line-red'],
  ['Green Line', 'line-green'],
  ['Orange Line', 'line-orange'],
  ['Brown Line', 'line-brown'],
  ['Yellow Line', 'line-yellow'],
]);
assert.deepEqual(keywords('Taoyuan Airport MRT Express A12 → A1 rồi taxi/Uber'), [
  ['Taoyuan Airport MRT Express', 'airport-rail'],
  ['taxi/Uber', 'taxi'],
]);
assert.deepEqual(keywords('đi bộ / walk / walking · MRT · tàu · TRA · HSR'), [
  ['đi bộ', 'walk'],
  ['walk', 'walk'],
  ['walking', 'walk'],
  ['MRT', 'rail'],
  ['tàu', 'rail'],
  ['TRA', 'rail'],
  ['HSR', 'rail'],
]);
assert.deepEqual(keywords('China Airlines CI782 · chuyến bay · sân bay'), [
  ['China Airlines CI782', 'flight'],
  ['chuyến bay', 'flight'],
  ['sân bay', 'flight'],
]);
assert.deepEqual(
  keywords('13:30–14:20 · A1 · A12 · T2 · 1080 · Red House · Orange Hotel · business · restaurant · Busan · Gaia'),
  [],
);

for (const value of itinerary.flatMap((item) => [item.title, item.note, item.mapSearch])) {
  const segments = tokenizeTransportText(value);
  assert.equal(segments.map((segment) => segment.value).join(''), value, 'Tokenizer must preserve source text');
  assert.ok(segments.every((segment) => segment.value.length > 0), 'Tokenizer must not emit empty segments');
  assert.ok(
    segments.every((segment, index) => index === 0 || segment.kind || segments[index - 1].kind),
    'Plain text segments must be coalesced',
  );
}

console.log(`Transport highlight checks passed for ${itinerary.length} itinerary items.`);
