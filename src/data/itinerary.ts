export type ItineraryCategory =
  | "Di chuyển"
  | "Ăn uống"
  | "Tham quan"
  | "Mua sắm"
  | "Nghỉ"
  | "Tech";

export type IsoDate = `${number}-${number}-${number}`;
export type TimeHHMM = `${number}${number}:${number}${number}`;

export interface ItineraryItem {
  id: string;
  dayNumber: 1 | 2 | 3 | 4;
  dayLabel: string;
  date: IsoDate;
  start: TimeHHMM;
  end: TimeHHMM;
  timeLabel: string;
  title: string;
  area: string;
  categories: readonly ItineraryCategory[];
  note: string;
  mapSearch: string;
  notionUrl: string;
}

export type DirectionsOrigin =
  | string
  | { latitude: number; longitude: number }
  | { lat: number; lng: number };

export const itineraryExportedAt = "2026-08-19T08:32:32Z";

/** Snapshot of the 26 live rows in the Notion itinerary database, ordered by day and time. */
// <notion-data>
export const itinerary = [
  {
    id: "3c0e8e18-6119-81ab-9c6d-d0a4857429cf",
    dayNumber: 1,
    dayLabel: "Ngày 1 · CN 30/8",
    date: "2026-08-30",
    start: "07:50",
    end: "10:50",
    timeLabel: "07:50",
    title: "Có mặt SGN T2 · check-in China Airlines",
    area: "Tân Sơn Nhất T2",
    categories: ["Di chuyển"],
    note: "Có mặt trước giờ bay khoảng 3 tiếng; làm check-in, gửi hành lý và thủ tục xuất cảnh.",
    mapSearch: "Maps: Tan Son Nhat International Airport Terminal 2 | Flight: CI782 China Airlines",
    notionUrl: "https://app.notion.com/3c0e8e18611981ab9c6dd0a4857429cf",
  },
  {
    id: "3afe8e18-6119-812c-8b8a-d60f55a0c19f",
    dayNumber: 1,
    dayLabel: "Ngày 1 · CN 30/8",
    date: "2026-08-30",
    start: "10:50",
    end: "15:20",
    timeLabel: "10:50–15:20",
    title: "Bay SGN → TPE · China Airlines CI782",
    area: "SGN T2 → TPE T1",
    categories: ["Di chuyển"],
    note: "Chuyến bay thẳng CI782; hạ cánh Taoyuan Terminal 1 lúc 15:20.",
    mapSearch: "Flight search: CI782 SGN TPE | Maps arrival: Taiwan Taoyuan International Airport Terminal 1",
    notionUrl: "https://app.notion.com/3afe8e186119812c8b8ad60f55a0c19f",
  },
  {
    id: "3afe8e18-6119-81ce-a0a6-c6d6f65af9fc",
    dayNumber: 1,
    dayLabel: "Ngày 1 · CN 30/8",
    date: "2026-08-30",
    start: "15:20",
    end: "16:40",
    timeLabel: "15:20–16:40",
    title: "Nhập cảnh + lấy hành lý",
    area: "TPE Terminal 1",
    categories: ["Di chuyển"],
    note: "Làm thủ tục nhập cảnh và lấy hành lý; sau đó đi tới Airport MRT A12 Terminal 1.",
    mapSearch: "Maps: Taoyuan Airport Terminal 1 → Airport Terminal 1 Station A12 | Search: Taoyuan Airport MRT A12",
    notionUrl: "https://app.notion.com/3afe8e18611981cea0a6c6d6f65af9fc",
  },
  {
    id: "3afe8e18-6119-81f4-bb0d-d49f0a4d461a",
    dayNumber: 1,
    dayLabel: "Ngày 1 · CN 30/8",
    date: "2026-08-30",
    start: "16:40",
    end: "17:50",
    timeLabel: "16:40–17:50",
    title: "Airport MRT A12 → A1 → Ximending",
    area: "Taoyuan → Taipei Main → Ximen",
    categories: ["Di chuyển"],
    note: "Airport MRT Express A12 Terminal 1 → A1 Taipei Main, không đổi tàu; từ A1 bắt taxi ngắn tới Muzik Hotel.",
    mapSearch: "Maps: Airport Terminal 1 Station A12 → Taipei Main Station A1 | Train search: Taoyuan Airport MRT Express A12 A1 | Then: Muzik Hotel Ximen Station Branch",
    notionUrl: "https://app.notion.com/3afe8e18611981f4bb0dd49f0a4d461a",
  },
  {
    id: "3afe8e18-6119-8152-9f00-f31b95762d7d",
    dayNumber: 1,
    dayLabel: "Ngày 1 · CN 30/8",
    date: "2026-08-30",
    start: "17:50",
    end: "18:10",
    timeLabel: "17:50–18:10",
    title: "Check-in Muzik Hotel",
    area: "Ximending",
    categories: ["Nghỉ"],
    note: "Check-in nhanh, để hành lý rồi đi Syntrend/Guanghua.",
    mapSearch: "Maps: Muzik Hotel Ximen Station Branch",
    notionUrl: "https://app.notion.com/3afe8e18611981529f00f31b95762d7d",
  },
  {
    id: "3afe8e18-6119-81bc-a163-c6aec473b4ba",
    dayNumber: 1,
    dayLabel: "Ngày 1 · CN 30/8",
    date: "2026-08-30",
    start: "18:30",
    end: "19:20",
    timeLabel: "18:30–19:20",
    title: "Syntrend Creative Park + Guanghua Digital Plaza",
    area: "Zhongxiao Xinsheng",
    categories: ["Tech", "Mua sắm"],
    note: "MRT Bannan (Blue) Line: Ximen → Zhongxiao Xinsheng, không đổi tuyến; đi bộ tới Syntrend.",
    mapSearch: "Maps: Syntrend Creative Park; Guang Hua Digital Plaza | MRT: Ximen Station → Zhongxiao Xinsheng Station",
    notionUrl: "https://app.notion.com/3afe8e18611981bca163c6aec473b4ba",
  },
  {
    id: "3afe8e18-6119-8150-8454-ebc23d81cde6",
    dayNumber: 1,
    dayLabel: "Ngày 1 · CN 30/8",
    date: "2026-08-30",
    start: "19:45",
    end: "21:00",
    timeLabel: "19:45–21:00",
    title: "Taipei 101 Observatory",
    area: "Xinyi",
    categories: ["Tham quan"],
    note: "Zhongxiao Xinsheng → Dongmen bằng Orange Line; đổi Red Line tại Dongmen → Taipei 101/World Trade Center.",
    mapSearch: "Maps: Taipei 101 Observatory | MRT: Zhongxiao Xinsheng → Dongmen → Taipei 101/World Trade Center",
    notionUrl: "https://app.notion.com/3afe8e18611981508454ebc23d81cde6",
  },
  {
    id: "3afe8e18-6119-81b7-a09b-e0e7f62b2873",
    dayNumber: 1,
    dayLabel: "Ngày 1 · CN 30/8",
    date: "2026-08-30",
    start: "21:15",
    end: "22:45",
    timeLabel: "21:15–22:45",
    title: "Linjiang / Tonghua Night Market · ăn tối",
    area: "Linjiang Street",
    categories: ["Ăn uống"],
    note: "Từ Taipei 101 đi bộ 15–20 phút hoặc taxi ngắn. Sau ăn đi MRT Xinyi Anhe → Chiang Kai-Shek Memorial Hall, đổi Green Line → Ximen.",
    mapSearch: "Maps: Linjiang Street Night Market / Tonghua Night Market | MRT return: Xinyi Anhe → Chiang Kai-Shek Memorial Hall → Ximen",
    notionUrl: "https://app.notion.com/3afe8e18611981b7a09be0e7f62b2873",
  },
  {
    id: "3afe8e18-6119-81f4-a6f5-d9547fd7ce0c",
    dayNumber: 2,
    dayLabel: "Ngày 2 · T2 31/8",
    date: "2026-08-31",
    start: "07:10",
    end: "09:00",
    timeLabel: "07:10–09:00",
    title: "Ximen → Yangmingshan → Xiaoyoukeng",
    area: "Taipei → Yangmingshan",
    categories: ["Di chuyển"],
    note: "Đi bộ tới Zhonghua Road North bus stop; bus 260 → Yangmingshan Bus Terminal; đổi bus 108 → Xiaoyoukeng Service Center.",
    mapSearch: "Maps: Yangmingshan Bus Terminal; Xiaoyoukeng Recreation Area | Bus search: 260 Taipei → Yangmingshan; 108 Yangmingshan Shuttle Bus",
    notionUrl: "https://app.notion.com/3afe8e18611981f4a6f5d9547fd7ce0c",
  },
  {
    id: "3afe8e18-6119-81c5-ad30-f8465b222982",
    dayNumber: 2,
    dayLabel: "Ngày 2 · T2 31/8",
    date: "2026-08-31",
    start: "09:00",
    end: "09:40",
    timeLabel: "09:00–09:40",
    title: "Xiaoyoukeng · ghé điểm địa nhiệt",
    area: "Yangmingshan",
    categories: ["Tham quan"],
    note: "Ghé khoảng một headway bus 108, tầm 30–40 phút; sau đó lên chuyến 108 tiếp theo tới Qingtiangang.",
    mapSearch: "Maps: Xiaoyoukeng Recreation Area 小油坑 | Bus search: 108 Xiaoyoukeng → Qingtiangang",
    notionUrl: "https://app.notion.com/3afe8e18611981c5ad30f8465b222982",
  },
  {
    id: "3afe8e18-6119-811c-a7b4-e3dd961eb964",
    dayNumber: 2,
    dayLabel: "Ngày 2 · T2 31/8",
    date: "2026-08-31",
    start: "10:10",
    end: "12:00",
    timeLabel: "10:10–12:00",
    title: "Qingtiangang Grassland · main visit",
    area: "Yangmingshan",
    categories: ["Tham quan"],
    note: "Bus 108 từ Xiaoyoukeng, đi qua Lengshuikeng rồi tới Qingtiangang; dành phần lớn thời gian ở đồng cỏ và viewpoint gần visitor center.",
    mapSearch: "Maps: Qingtiangang Grassland 擎天崗 | Bus search: 108 Xiaoyoukeng → Qingtiangang",
    notionUrl: "https://app.notion.com/3afe8e186119811ca7b4e3dd961eb964",
  },
  {
    id: "3afe8e18-6119-8174-a009-ffe7014c30d0",
    dayNumber: 2,
    dayLabel: "Ngày 2 · T2 31/8",
    date: "2026-08-31",
    start: "12:00",
    end: "13:30",
    timeLabel: "12:00–13:30",
    title: "Qingtiangang → Shilin → Beitou",
    area: "Yangmingshan → Beitou",
    categories: ["Di chuyển"],
    note: "Bus S15 từ Qingtiangang → MRT Shilin; Red Line Shilin → Beitou, không đổi tuyến.",
    mapSearch: "Maps: Qingtiangang Bus Stop → MRT Shilin Station → MRT Beitou Station | Bus search: S15 Qingtiangang → Shilin",
    notionUrl: "https://app.notion.com/3afe8e1861198174a009ffe7014c30d0",
  },
  {
    id: "3afe8e18-6119-81f6-bede-c00c751f76ff",
    dayNumber: 2,
    dayLabel: "Ngày 2 · T2 31/8",
    date: "2026-08-31",
    start: "13:30",
    end: "14:35",
    timeLabel: "13:30–14:35",
    title: "Wu Jia Beef Noodles → taxi tới The Gaia",
    area: "Beitou",
    categories: ["Ăn uống", "Di chuyển"],
    note: "13:30–14:20 ăn trưa tại Wu Jia Beef Noodles; 14:20–14:35 taxi ngắn tới The Gaia Hotel.",
    mapSearch: "Maps: Wu Jia Beef Noodles Beitou; The Gaia Hotel Taipei | Taxi search: Wu Jia Beef Noodles → The Gaia Hotel Taipei",
    notionUrl: "https://app.notion.com/3afe8e18611981f6bedec00c751f76ff",
  },
  {
    id: "3afe8e18-6119-81da-9390-ce948bc68e13",
    dayNumber: 2,
    dayLabel: "Ngày 2 · T2 31/8",
    date: "2026-08-31",
    start: "14:45",
    end: "16:30",
    timeLabel: "14:45–16:30",
    title: "The Gaia Hotel · public hot spring",
    area: "Beitou",
    categories: ["Nghỉ"],
    note: "Public hot spring nam/nữ riêng; itinerary visa ghi nên đặt trước. Rời khoảng 16:30 để kịp Dadaocheng.",
    mapSearch: "Maps: The Gaia Hotel Taipei",
    notionUrl: "https://app.notion.com/3afe8e18611981da9390ce948bc68e13",
  },
  {
    id: "3afe8e18-6119-819d-8512-fb41d3f7dd4d",
    dayNumber: 2,
    dayLabel: "Ngày 2 · T2 31/8",
    date: "2026-08-31",
    start: "16:30",
    end: "20:45",
    timeLabel: "16:30–20:45",
    title: "Dadaocheng sunset → Ningxia Night Market",
    area: "Beitou → Dadaocheng → Ningxia",
    categories: ["Tham quan", "Ăn uống"],
    note: "16:30–17:30 Gaia → MRT Beitou → Shuanglian → taxi Dadaocheng; 17:30–18:35 ngắm hoàng hôn; 18:50–20:45 ăn tối Ningxia.",
    mapSearch: "Maps: Dadaocheng Wharf; Ningxia Night Market | MRT: Beitou Station → Shuanglian Station | Then taxi/walk to Dadaocheng",
    notionUrl: "https://app.notion.com/3afe8e186119819d8512fb41d3f7dd4d",
  },
  {
    id: "3afe8e18-6119-813b-8ad5-e02be96f502c",
    dayNumber: 3,
    dayLabel: "Ngày 3 · T3 1/9",
    date: "2026-09-01",
    start: "06:30",
    end: "08:30",
    timeLabel: "06:30–08:30",
    title: "Taipei → Ruifang → Jiufen",
    area: "Taipei → Jiufen",
    categories: ["Di chuyển"],
    note: "Bannan Line Ximen → Taipei Main; đổi TRA đi Ruifang; đi bộ tới Citizen’s Square và bắt bus 788 tới Jiufen Old Street.",
    mapSearch: "Maps: Taipei Main Station → Ruifang Station; Ruifang Citizens Square; Jiufen Old Street | Train search: TRA Taipei Main → Ruifang 2026/09/01 | Bus: 788 Ruifang → Jiufen",
    notionUrl: "https://app.notion.com/3afe8e186119813b8ad5e02be96f502c",
  },
  {
    id: "3afe8e18-6119-81ea-96f1-c1cec87fe4ed",
    dayNumber: 3,
    dayLabel: "Ngày 3 · T3 1/9",
    date: "2026-09-01",
    start: "08:30",
    end: "10:45",
    timeLabel: "08:30–10:45",
    title: "Jiufen Old Street + viewpoints",
    area: "Jiufen",
    categories: ["Tham quan"],
    note: "Đi bộ khám phá phố cổ và các viewpoint; ưu tiên đi sớm trước khi đông.",
    mapSearch: "Maps: Jiufen Old Street 九份老街 | Optional viewpoint search: Jiufen Viewing Platform",
    notionUrl: "https://app.notion.com/3afe8e18611981ea96f1c1cec87fe4ed",
  },
  {
    id: "3afe8e18-6119-81c9-97dc-ff6c61c89029",
    dayNumber: 3,
    dayLabel: "Ngày 3 · T3 1/9",
    date: "2026-09-01",
    start: "10:45",
    end: "12:15",
    timeLabel: "10:45–12:15",
    title: "Jiufen → Ruifang → Shifen",
    area: "Jiufen → Shifen",
    categories: ["Di chuyển"],
    note: "Bus 788 về Ruifang; đổi Pingxi Line từ Ruifang → Shifen.",
    mapSearch: "Maps: Jiufen Old Street → Ruifang Station → Shifen Station | Bus: 788 Jiufen → Ruifang | Train search: Pingxi Line Ruifang → Shifen timetable",
    notionUrl: "https://app.notion.com/3afe8e18611981c997dcff6c61c89029",
  },
  {
    id: "3afe8e18-6119-816b-bb95-f3fe8e6d5cbe",
    dayNumber: 3,
    dayLabel: "Ngày 3 · T3 1/9",
    date: "2026-09-01",
    start: "12:15",
    end: "13:15",
    timeLabel: "12:15–13:15",
    title: "Shifen Old Street + ăn trưa",
    area: "Shifen",
    categories: ["Ăn uống", "Tham quan"],
    note: "Đi Shifen Old Street, ăn trưa nhẹ rồi tiếp tục đi bộ về hướng Shifen Waterfall.",
    mapSearch: "Maps: Shifen Old Street 十分老街 | Station: Shifen Station",
    notionUrl: "https://app.notion.com/3afe8e186119816bbb95f3fe8e6d5cbe",
  },
  {
    id: "3afe8e18-6119-811b-a795-f1468c091fa7",
    dayNumber: 3,
    dayLabel: "Ngày 3 · T3 1/9",
    date: "2026-09-01",
    start: "13:15",
    end: "15:15",
    timeLabel: "13:15–15:15",
    title: "Shifen Waterfall + quay lại ga",
    area: "Shifen",
    categories: ["Tham quan"],
    note: "Đi bộ tới khu viewpoint Shifen Waterfall; sau đó quay lại Shifen Station để bắt Pingxi Line về Ruifang.",
    mapSearch: "Maps: Shifen Waterfall 十分瀑布 | Walk route: Shifen Old Street → Shifen Waterfall",
    notionUrl: "https://app.notion.com/3afe8e186119811ba795f1468c091fa7",
  },
  {
    id: "3afe8e18-6119-816d-8956-e03cda25a34d",
    dayNumber: 3,
    dayLabel: "Ngày 3 · T3 1/9",
    date: "2026-09-01",
    start: "15:30",
    end: "18:30",
    timeLabel: "15:30–18:30",
    title: "Shifen → Taipei Main + Taipei City Mall",
    area: "Shifen → Taipei Main → Beimen",
    categories: ["Di chuyển", "Mua sắm"],
    note: "15:30–17:15 Pingxi Line Shifen → Ruifang, đổi TRA → Taipei Main; 17:15–18:30 đi Taipei City Mall và theo underground mall về hướng Beimen.",
    mapSearch: "Maps: Shifen Station → Ruifang Station → Taipei Main Station; Taipei City Mall | Train search: Pingxi Line Shifen → Ruifang; TRA Ruifang → Taipei 2026/09/01",
    notionUrl: "https://app.notion.com/3afe8e186119816d8956e03cda25a34d",
  },
  {
    id: "3afe8e18-6119-8111-a0aa-c162e641a912",
    dayNumber: 3,
    dayLabel: "Ngày 3 · T3 1/9",
    date: "2026-09-01",
    start: "19:00",
    end: "20:45",
    timeLabel: "19:00–20:45",
    title: "Raohe Night Market · ăn tối",
    area: "Songshan",
    categories: ["Ăn uống", "Mua sắm"],
    note: "Green Line Beimen → Songshan, không đổi tuyến; đi bộ tới Raohe. Sau đó Green Line Songshan → Ximen.",
    mapSearch: "Maps: Raohe Street Night Market 饒河街觀光夜市 | MRT: Songshan Station → Ximen Station",
    notionUrl: "https://app.notion.com/3afe8e1861198111a0aac162e641a912",
  },
  {
    id: "3afe8e18-6119-8103-83d5-d8d05279a3a9",
    dayNumber: 4,
    dayLabel: "Ngày 4 · T4 2/9",
    date: "2026-09-02",
    start: "07:30",
    end: "09:15",
    timeLabel: "07:30–09:15",
    title: "Ăn sáng + kiểm tra hành lý + checkout",
    area: "Ximending",
    categories: ["Ăn uống", "Nghỉ"],
    note: "Ăn sáng gần khách sạn, kiểm tra hành lý và hoàn tất checkout Muzik Hotel.",
    mapSearch: "Maps: Muzik Hotel Ximen Station Branch | Nearby: Ximen Station",
    notionUrl: "https://app.notion.com/3afe8e186119810383d5d8d05279a3a9",
  },
  {
    id: "3afe8e18-6119-81e8-bc1c-ebd65ab00230",
    dayNumber: 4,
    dayLabel: "Ngày 4 · T4 2/9",
    date: "2026-09-02",
    start: "09:15",
    end: "10:45",
    timeLabel: "09:15–10:45",
    title: "Ximen → A1 Taipei Main → TPE T1",
    area: "Taipei → Taoyuan Airport",
    categories: ["Di chuyển"],
    note: "Green Line Ximen → Beimen; đi underground passage tới Airport MRT A1; Express A1 → A12 Terminal 1.",
    mapSearch: "Maps: Ximen Station → Beimen Station → Taipei Main Station A1 → Airport Terminal 1 Station A12 | Train search: Taoyuan Airport MRT Express A1 → A12",
    notionUrl: "https://app.notion.com/3afe8e18611981e8bc1cebd65ab00230",
  },
  {
    id: "3afe8e18-6119-81fc-be34-f6d32dd11ec8",
    dayNumber: 4,
    dayLabel: "Ngày 4 · T4 2/9",
    date: "2026-09-02",
    start: "10:45",
    end: "13:45",
    timeLabel: "10:45–13:45",
    title: "China Airlines check-in + security + xuất cảnh",
    area: "TPE Terminal 1",
    categories: ["Di chuyển"],
    note: "Làm thủ tục China Airlines tại TPE T1, qua security và exit immigration trước giờ bay.",
    mapSearch: "Maps: Taiwan Taoyuan International Airport Terminal 1; China Airlines check-in Terminal 1 | Flight search: CI783 TPE SGN",
    notionUrl: "https://app.notion.com/3afe8e18611981fcbe34f6d32dd11ec8",
  },
  {
    id: "3afe8e18-6119-8102-8749-d790db828c3e",
    dayNumber: 4,
    dayLabel: "Ngày 4 · T4 2/9",
    date: "2026-09-02",
    start: "13:45",
    end: "16:20",
    timeLabel: "13:45–16:20",
    title: "Bay TPE → SGN · China Airlines CI783",
    area: "TPE T1 → SGN T2",
    categories: ["Di chuyển"],
    note: "Chuyến bay thẳng CI783 về TP.HCM; kết thúc chuyến đi.",
    mapSearch: "Flight search: CI783 TPE → SGN | Maps arrival: Tan Son Nhat International Airport",
    notionUrl: "https://app.notion.com/3afe8e18611981028749d790db828c3e",
  },
] as const satisfies readonly ItineraryItem[];
// </notion-data>

function getMapsPart(item: ItineraryItem): string | undefined {
  return item.mapSearch
    .match(/(?:^|\|\s*)Maps(?:\s+arrival)?\s*:\s*([^|]+)/i)?.[1]
    ?.trim();
}

function getMapStops(item: ItineraryItem): string[] {
  const mapsPart = getMapsPart(item);

  if (!mapsPart) {
    return [`${item.title}, ${item.area}`];
  }

  const stops = mapsPart
    .split(/\s*(?:→|;)\s*/)
    .map((stop) => stop.trim())
    .filter(Boolean);
  const finalStop = item.mapSearch.match(/\|\s*Then\s*:\s*([^|]+)/i)?.[1]?.trim();

  return finalStop ? [...stops, finalStop] : stops;
}

/** Opens a focused Google Maps search for the most relevant destination in a row. */
export function getGoogleMapsUrl(item: ItineraryItem): string {
  const stops = getMapStops(item);
  const query = stops[stops.length - 1] ?? `${item.title}, ${item.area}`;
  const params = new URLSearchParams({ api: "1", query });

  return `https://www.google.com/maps/search/?${params.toString()}`;
}

function formatOrigin(origin: DirectionsOrigin): string {
  if (typeof origin === "string") {
    return origin.trim();
  }

  if ("latitude" in origin) {
    return `${origin.latitude},${origin.longitude}`;
  }

  return `${origin.lat},${origin.lng}`;
}

/** Builds a universal Google Maps route to the row's destination. */
export function getDirectionsUrl(
  item: ItineraryItem,
  current?: DirectionsOrigin,
): string {
  const stops = getMapStops(item);
  const destination = stops[stops.length - 1] ?? `${item.title}, ${item.area}`;
  const params = new URLSearchParams({
    api: "1",
    destination,
    dir_action: "navigate",
  });

  if (current) {
    params.set("origin", formatOrigin(current));
  }

  if (stops.length > 1) {
    params.set("waypoints", stops.slice(0, -1).join("|"));
  }

  const routeText = `${item.mapSearch} ${item.title}`;
  if (/taxi/i.test(routeText)) {
    params.set("travelmode", "driving");
  } else if (item.categories.includes("Di chuyển") && !/Flight|bay/i.test(routeText)) {
    params.set("travelmode", "transit");
  }

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}
