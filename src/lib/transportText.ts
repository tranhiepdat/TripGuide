export type TransportHighlightKind =
  | 'airport-rail'
  | 'line-blue'
  | 'line-red'
  | 'line-green'
  | 'line-orange'
  | 'line-brown'
  | 'line-yellow'
  | 'station'
  | 'bus'
  | 'taxi'
  | 'walk'
  | 'rail'
  | 'flight';

export type TransportTextSegment = {
  value: string;
  kind?: TransportHighlightKind;
};

type HighlightRule = {
  kind: TransportHighlightKind;
  pattern: RegExp;
};

type HighlightCandidate = {
  start: number;
  end: number;
  kind: TransportHighlightKind;
  priority: number;
};

const bounded = (source: string) => new RegExp(`(?:${source})`, 'giu');
const stationPattern = (source: string) => new RegExp(`(?:${source})`, 'gu');
const letterOrNumber = /[\p{L}\p{N}]/u;

function touchesWordCharacter(value: string, start: number, end: number): boolean {
  const before = value.slice(0, start).match(/.$/u)?.[0] ?? '';
  const after = value.slice(end).match(/^./u)?.[0] ?? '';
  return letterOrNumber.test(before) || letterOrNumber.test(after);
}

// Rules are ordered from the most specific route cue to the generic transport mode.
// The tokenizer also resolves overlaps by keeping the longest match at each position.
const highlightRules: readonly HighlightRule[] = [
  {
    kind: 'airport-rail',
    pattern: bounded('(?:Taoyuan\\s+)?Airport\\s+MRT(?:\\s+Express)?'),
  },
  {
    kind: 'line-blue',
    pattern: bounded('(?:Blue\\s*\\/\\s*Bannan|Bannan\\s*\\/\\s*Blue|Blue|Bannan)\\s+Line|tuyến\\s+xanh\\s+dương'),
  },
  {
    kind: 'line-red',
    pattern: bounded('(?:Red|Tamsui[–-]Xinyi)\\s+Line|tuyến\\s+đỏ'),
  },
  {
    kind: 'line-green',
    pattern: bounded('(?:Green|Songshan[–-]Xindian)\\s+Line|tuyến\\s+xanh\\s+lá'),
  },
  {
    kind: 'line-orange',
    pattern: bounded('(?:Orange|Zhonghe[–-]Xinlu)\\s+Line|tuyến\\s+cam'),
  },
  {
    kind: 'line-brown',
    pattern: bounded('(?:Brown|Wenhu)\\s+Line|tuyến\\s+nâu'),
  },
  {
    kind: 'line-yellow',
    pattern: bounded('(?:Yellow|Circular)\\s+Line|tuyến\\s+vàng'),
  },
  {
    kind: 'station',
    pattern: stationPattern(
      '(?:MRT\\s+)?(?:[\\p{Lu}\\p{N}][\\p{L}\\p{N}\'’/-]*\\s+){0,6}[\\p{Lu}\\p{N}][\\p{L}\\p{N}\'’/-]*\\s+(?:Station|Bus\\s+Terminal|Service\\s+Center)(?:\\s*\\((?:G|R|O|BL|BR|Y)\\d{2}(?:\\/(?:G|R|O|BL|BR|Y)\\d{2})*\\))?',
    ),
  },
  {
    kind: 'station',
    pattern: stationPattern(
      '(?:[\\p{Lu}\\p{N}][\\p{L}\\p{N}\'’/-]*\\s+){0,5}[\\p{Lu}\\p{N}][\\p{L}\\p{N}\'’/-]*\\s*\\((?:G|R|O|BL|BR|Y)\\d{2}(?:\\/(?:G|R|O|BL|BR|Y)\\d{2})*\\)',
    ),
  },
  {
    kind: 'station',
    pattern: stationPattern('(?:G|R|O|BL|BR|Y)\\d{2}(?:\\/(?:G|R|O|BL|BR|Y)\\d{2})*'),
  },
  {
    kind: 'station',
    pattern: stationPattern('[\\p{Script=Han}]{2,16}(?:站(?:[（(][\\p{Script=Han}]{1,8}[)）])?|總站|服務站|市場)'),
  },
  {
    kind: 'bus',
    pattern: bounded('(?:bus|xe\\s+buýt|tuyến)\\s*(?:no\\.?\\s*)?(?:S?\\d{1,3}|R\\d{1,2}|小\\d{1,2})'),
  },
  {
    kind: 'bus',
    pattern: bounded('Red\\s+\\d{1,2}|(?:R|S)\\d{1,2}|小\\d{1,2}'),
  },
  {
    kind: 'bus',
    pattern: bounded('\\d{2,3}(?=\\s*(?:hoặc|or|/)\\s*(?:R|S|小)\\d{1,2})'),
  },
  {
    kind: 'taxi',
    pattern: bounded('taxi\\s*\\/\\s*Uber'),
  },
  {
    kind: 'flight',
    pattern: bounded('China\\s+Airlines(?:\\s+CI\\d{3,4})?|CI\\d{3,4}'),
  },
  {
    kind: 'walk',
    pattern: bounded('đi\\s+bộ|walk(?:ing)?'),
  },
  {
    kind: 'bus',
    pattern: bounded('bus(?:\\s+stop|\\s+terminal)?|xe\\s+buýt'),
  },
  {
    kind: 'taxi',
    pattern: bounded('taxi|Uber'),
  },
  {
    kind: 'rail',
    pattern: bounded('MRT|TRA|HSR|train|tàu'),
  },
  {
    kind: 'flight',
    pattern: bounded('bay\\s+thẳng|chuyến\\s+bay|máy\\s+bay|flight|airport|sân\\s+bay'),
  },
];

export function tokenizeTransportText(value: string): readonly TransportTextSegment[] {
  if (!value) return [];

  const candidates: HighlightCandidate[] = [];
  highlightRules.forEach((rule, priority) => {
    rule.pattern.lastIndex = 0;
    for (const match of value.matchAll(rule.pattern)) {
      if (match.index === undefined || !match[0]) continue;
      if (touchesWordCharacter(value, match.index, match.index + match[0].length)) continue;
      const stationLead = rule.kind === 'station' ? match[0].match(/^(?:Tại|Từ|Xuống|Lên|Đến)\s+/u)?.[0] : undefined;
      candidates.push({
        start: match.index + (stationLead?.length ?? 0),
        end: match.index + match[0].length,
        kind: rule.kind,
        priority,
      });
    }
  });

  candidates.sort(
    (first, second) =>
      first.start - second.start ||
      second.end - second.start - (first.end - first.start) ||
      first.priority - second.priority,
  );

  const accepted: HighlightCandidate[] = [];
  let coveredUntil = 0;
  for (const candidate of candidates) {
    if (candidate.start < coveredUntil) continue;
    accepted.push(candidate);
    coveredUntil = candidate.end;
  }

  if (accepted.length === 0) return [{ value }];

  const segments: TransportTextSegment[] = [];
  let cursor = 0;
  for (const candidate of accepted) {
    if (candidate.start > cursor) segments.push({ value: value.slice(cursor, candidate.start) });
    segments.push({ value: value.slice(candidate.start, candidate.end), kind: candidate.kind });
    cursor = candidate.end;
  }
  if (cursor < value.length) segments.push({ value: value.slice(cursor) });

  return segments;
}

