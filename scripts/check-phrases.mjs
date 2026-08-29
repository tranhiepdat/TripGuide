import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import ts from 'typescript';

const source = await readFile(new URL('../src/data/phrases.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;

const dataModule = { exports: {} };
new Function('module', 'exports', 'require', compiled)(
  dataModule,
  dataModule.exports,
  createRequire(import.meta.url),
);

const { moneyNumbers, phraseCategoryLabels, taxiDestinations, travelPhrases } = dataModule.exports;
const categories = Object.keys(phraseCategoryLabels);

assert.deepEqual(categories, ['polite', 'essential', 'transport', 'food', 'money', 'help']);
assert.equal(new Set(travelPhrases.map((phrase) => phrase.id)).size, travelPhrases.length, 'Phrase IDs must be unique');
assert.ok(travelPhrases.every((phrase) => categories.includes(phrase.category)), 'Every phrase needs a known category');
const politePhrases = travelPhrases.filter((phrase) => phrase.category === 'polite');
assert.equal(phraseCategoryLabels.polite, 'Lịch sự');
assert.equal(politePhrases.length, 10, 'Polite tag must keep the compact ten-phrase starter set');
for (const id of ['hello', 'thank-you', 'excuse-me', 'menu-please', 'goodbye']) {
  assert.ok(politePhrases.some((phrase) => phrase.id === id), `Missing polite phrase: ${id}`);
}
assert.equal(politePhrases.find((phrase) => phrase.id === 'menu-please')?.zh, '請給我菜單。');
assert.ok(
  travelPhrases.every((phrase) => phrase.vi.length <= 30),
  'Memorization prompts must stay at 30 Vietnamese characters or fewer',
);
assert.ok(
  travelPhrases.every((phrase) => phrase.zh.length <= 12),
  'Displayed Chinese phrases must stay short enough to memorize',
);
assert.ok(
  travelPhrases.every((phrase) => !/^(?:Cho mình hỏi|Vui lòng|Bạn có thể)/u.test(phrase.vi)),
  'Politeness boilerplate belongs in optional notes, not memorization prompts',
);

const foodPhrases = travelPhrases.filter((phrase) => phrase.category === 'food');
assert.ok(foodPhrases.some((phrase) => phrase.id === 'food-price' && phrase.zh.includes('多少錢')));
assert.ok(foodPhrases.some((phrase) => phrase.id === 'bill'), 'Food phrases must include asking for the bill');

const moneyPhrases = travelPhrases.filter((phrase) => phrase.category === 'money');
assert.ok(moneyPhrases.some((phrase) => phrase.zh === '新台幣'), 'Money tag must name the Taiwan dollar');
for (const amount of ['10', '50', '100', '150', '230', '1.000']) {
  assert.ok(moneyPhrases.some((phrase) => phrase.vi === `${amount} TWD`), `Missing TWD example: ${amount}`);
}
assert.equal(moneyNumbers.length, 13, 'Money guide must cover digits plus 10, 100, and 1,000');
assert.equal(new Set(moneyNumbers.map((number) => number.value)).size, moneyNumbers.length);

assert.equal(taxiDestinations.length, 7, 'Saved tab must keep all seven driver addresses');
assert.ok(
  taxiDestinations.every((destination) =>
    [destination.nameZh, destination.nameEn, destination.addressZh, destination.addressEn].every((value) => value.trim()),
  ),
  'Every taxi card needs complete Chinese and English names and addresses',
);

console.log(`Phrase checks passed for ${travelPhrases.length} short phrases in ${categories.length} color groups.`);
