import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const NOTION_VERSION = '2026-03-11';
const DATABASE_ID = 'aef8fa576f704484bc66494b64004474';
const DATA_SOURCE_NAME = 'Lịch trình Đài Loan — 4 ngày 3 đêm';
const outputPath = resolve('src/data/itinerary.ts');

async function loadLocalEnv() {
  try {
    const contents = await readFile(resolve('.env'), 'utf8');
    for (const rawLine of contents.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;
      const separator = line.indexOf('=');
      if (separator < 1) continue;
      const name = line.slice(0, separator).trim();
      const value = line
        .slice(separator + 1)
        .trim()
        .replace(/^(['"])(.*)\1$/, '$2');
      if (!(name in process.env)) process.env[name] = value;
    }
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
}

await loadLocalEnv();

const token = process.env.NOTION_TOKEN;
if (!token) {
  throw new Error('Thiếu NOTION_TOKEN. Hãy tạo integration, share database cho integration và đặt biến môi trường trước khi sync.');
}

const headers = {
  Authorization: `Bearer ${token}`,
  'Notion-Version': NOTION_VERSION,
  'Content-Type': 'application/json',
};

async function notionRequest(url, init = {}) {
  const response = await fetch(url, { ...init, headers: { ...headers, ...init.headers } });
  if (!response.ok) {
    throw new Error(`Notion ${response.status}: ${await response.text()}`);
  }
  return response.json();
}

async function resolveDataSourceId() {
  if (process.env.NOTION_DATA_SOURCE_ID) return process.env.NOTION_DATA_SOURCE_ID;

  const database = await notionRequest(`https://api.notion.com/v1/databases/${DATABASE_ID}`);
  const sources = database.data_sources ?? [];
  const selected =
    sources.find((source) => source.name === DATA_SOURCE_NAME) ??
    (sources.length === 1 ? sources[0] : undefined);

  if (!selected?.id) {
    throw new Error(
      `Không xác định được data source. Hãy đặt NOTION_DATA_SOURCE_ID; hiện có: ${sources
        .map((source) => `${source.name} (${source.id})`)
        .join(', ') || 'không có'}`,
    );
  }
  return selected.id;
}

async function queryAllPages(dataSourceId) {
  const pages = [];
  let cursor;

  do {
    const body = { page_size: 100, ...(cursor ? { start_cursor: cursor } : {}) };
    const data = await notionRequest(
      `https://api.notion.com/v1/data_sources/${dataSourceId}/query`,
      { method: 'POST', body: JSON.stringify(body) },
    );
    pages.push(...data.results.filter((item) => item.object === 'page'));
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);

  return pages;
}

function plainText(value = []) {
  return value.map((item) => item.plain_text ?? item.text?.content ?? '').join('');
}

function richText(properties, name) {
  return plainText(properties[name]?.rich_text);
}

function title(properties, name) {
  return plainText(properties[name]?.title);
}

function select(properties, name) {
  return properties[name]?.select?.name ?? '';
}

function multiSelect(properties, name) {
  return (properties[name]?.multi_select ?? []).map((item) => item.name).filter(Boolean);
}

function normalizeClock(value) {
  const [hours, minutes] = value.split(':').map(Number);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function parseTime(value) {
  const matches = [...value.matchAll(/\b(\d{1,2}:\d{2})\b/g)].map((match) => normalizeClock(match[1]));
  return { start: matches[0] ?? '00:00', end: matches[1], timeLabel: value.trim() };
}

function parseDay(label) {
  const dayNumber = Number(label.match(/Ngày\s+(\d+)/i)?.[1]);
  const dateParts = label.match(/(\d{1,2})\/(\d{1,2})/);
  const year = Number(process.env.NOTION_TRIP_YEAR ?? 2026);
  if (![1, 2, 3, 4].includes(dayNumber) || !dateParts) {
    throw new Error(`Không đọc được ngày từ nhãn “${label}”`);
  }
  const [, day, month] = dateParts;
  return {
    dayNumber,
    date: `${year}-${String(Number(month)).padStart(2, '0')}-${String(Number(day)).padStart(2, '0')}`,
  };
}

function addMinutes(clock, minutes) {
  const [hour, minute] = clock.split(':').map(Number);
  const total = (hour * 60 + minute + minutes) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

function normalizePages(pages) {
  const rows = pages.map((page) => {
    const properties = page.properties ?? {};
    const dayLabel = select(properties, 'Ngày');
    const day = parseDay(dayLabel);
    const time = parseTime(richText(properties, 'Time'));
    const activityTitle = title(properties, 'Hoạt động');
    return {
      id: page.id,
      ...day,
      dayLabel,
      start: time.start,
      end: time.end,
      timeLabel: time.timeLabel,
      title: activityTitle,
      area: richText(properties, 'Khu vực'),
      categories: multiSelect(properties, 'Loại'),
      note: richText(properties, 'Ghi chú'),
      mapSearch: richText(properties, '🔎 Map / Transit'),
      notionUrl: page.url,
      isBackup: /\bBACKUP\b/i.test(`${time.timeLabel} ${activityTitle}`),
    };
  });

  rows.sort(
    (a, b) =>
      a.dayNumber - b.dayNumber ||
      a.start.localeCompare(b.start) ||
      Number(a.isBackup) - Number(b.isBackup) ||
      a.title.localeCompare(b.title),
  );
  return rows.map((row, index) => {
    const next = rows
      .slice(index + 1)
      .find((candidate) => candidate.dayNumber === row.dayNumber && candidate.start !== row.start);
    const inferredEnd = next?.start ?? addMinutes(row.start, 60);
    return { ...row, end: row.end ?? inferredEnd };
  });
}

function renderData(rows) {
  const serialized = JSON.stringify(rows, null, 2).replace(/^/gm, '');
  const exportedAt = new Date().toISOString();
  return {
    block: `// <notion-data>\nexport const itinerary = ${serialized} as const satisfies readonly ItineraryItem[];\n// </notion-data>`,
    exportedAt,
  };
}

async function main() {
  const dataSourceId = await resolveDataSourceId();
  const rows = normalizePages(await queryAllPages(dataSourceId));
  const source = await readFile(outputPath, 'utf8');
  if (!/\/\/ <notion-data>[\s\S]*?\/\/ <\/notion-data>/.test(source)) {
    throw new Error('Không tìm thấy marker <notion-data> trong itinerary.ts.');
  }
  const { block, exportedAt } = renderData(rows);
  const nextSource = source
    .replace(/export const itineraryExportedAt = "[^"]+";/, `export const itineraryExportedAt = "${exportedAt}";`)
    .replace(/\/\/ <notion-data>[\s\S]*?\/\/ <\/notion-data>/, block);

  await writeFile(outputPath, nextSource, 'utf8');
  console.log(`Đã đồng bộ ${rows.length} hoạt động từ Notion (${dataSourceId}).`);
}

await main();
