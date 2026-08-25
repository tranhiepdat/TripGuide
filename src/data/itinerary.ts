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

export type DirectionsStart = "current" | "plan";

export const itineraryExportedAt = "2026-08-21T09:50:57.078Z";

/** Snapshot of the 28 live rows in the Notion itinerary database, ordered by day and time. */
// <notion-data>
export const itinerary = [
  {
    "id": "3c0e8e18-6119-81ab-9c6d-d0a4857429cf",
    "dayNumber": 1,
    "date": "2026-08-30",
    "dayLabel": "Ngày 1 · CN 30/8",
    "start": "07:50",
    "end": "10:50",
    "timeLabel": "07:50",
    "title": "Có mặt SGN T2 · check-in China Airlines",
    "area": "Tân Sơn Nhất T2",
    "categories": [
      "Di chuyển"
    ],
    "note": "07:50 có mặt SGN Terminal 2. Làm theo thứ tự: quầy China Airlines → check-in/gửi hành lý → xuất cảnh → tìm gate. Nếu chưa ăn sáng thì ăn sau khi check-in để khỏi vội.",
    "mapSearch": "Google Maps: Tan Son Nhat International Airport – Terminal 2. Chuyến bay cần theo dõi: China Airlines CI782.",
    "notionUrl": "https://app.notion.com/3c0e8e18611981ab9c6dd0a4857429cf"
  },
  {
    "id": "3afe8e18-6119-812c-8b8a-d60f55a0c19f",
    "dayNumber": 1,
    "date": "2026-08-30",
    "dayLabel": "Ngày 1 · CN 30/8",
    "start": "10:50",
    "end": "15:20",
    "timeLabel": "10:50–15:20",
    "title": "Bay SGN → TPE · China Airlines CI782",
    "area": "SGN T2 → TPE T1",
    "categories": [
      "Di chuyển"
    ],
    "note": "Bay thẳng CI782, giờ dự kiến 10:50–15:20. Theo dõi gate trên bảng sân bay/app hãng; nên mang snack nhỏ và nước mua sau security để phòng đói.",
    "mapSearch": "Flight search: CI782 SGN → TPE. Điểm đến trên Maps: Taiwan Taoyuan International Airport – Terminal 1.",
    "notionUrl": "https://app.notion.com/3afe8e186119812c8b8ad60f55a0c19f"
  },
  {
    "id": "3afe8e18-6119-81ce-a0a6-c6d6f65af9fc",
    "dayNumber": 1,
    "date": "2026-08-30",
    "dayLabel": "Ngày 1 · CN 30/8",
    "start": "15:20",
    "end": "16:40",
    "timeLabel": "15:20–16:40",
    "title": "Nhập cảnh + lấy hành lý",
    "area": "TPE Terminal 1",
    "categories": [
      "Di chuyển"
    ],
    "note": "Xuống máy bay → Immigration/nhập cảnh → lấy hành lý → xử lý EasyCard/eSIM/ATM nếu cần → đi theo bảng chỉ dẫn Airport MRT. Ga cần tới là A12 Terminal 1.",
    "mapSearch": "Google Maps: Taiwan Taoyuan International Airport Terminal 1 → Airport Terminal 1 Station (A12). Từ khóa: Taoyuan Airport MRT A12.",
    "notionUrl": "https://app.notion.com/3afe8e18611981cea0a6c6d6f65af9fc"
  },
  {
    "id": "3afe8e18-6119-81f4-bb0d-d49f0a4d461a",
    "dayNumber": 1,
    "date": "2026-08-30",
    "dayLabel": "Ngày 1 · CN 30/8",
    "start": "16:40",
    "end": "17:50",
    "timeLabel": "16:40–17:50",
    "title": "Airport MRT A12 → A1 → Ximending",
    "area": "Taoyuan → Taipei Main → Ximen",
    "categories": [
      "Di chuyển"
    ],
    "note": "Tại A12, lên Taoyuan Airport MRT Express đi thẳng tới A1 Taipei Main Station, không đổi tàu. Xuống A1 xong bắt taxi/Uber ngắn tới Muzik Hotel ở Ximending để đỡ kéo vali.",
    "mapSearch": "Google Maps: Airport Terminal 1 Station (A12) → Taipei Main Station (A1) → Muzik Hotel Ximen Station Branch. Tàu: Taoyuan Airport MRT Express A12 → A1.",
    "notionUrl": "https://app.notion.com/3afe8e18611981f4bb0dd49f0a4d461a"
  },
  {
    "id": "3afe8e18-6119-8152-9f00-f31b95762d7d",
    "dayNumber": 1,
    "date": "2026-08-30",
    "dayLabel": "Ngày 1 · CN 30/8",
    "start": "17:50",
    "end": "18:10",
    "timeLabel": "17:50–18:10",
    "title": "Check-in Muzik Hotel",
    "area": "Ximending",
    "categories": [
      "Nghỉ"
    ],
    "note": "Check-in nhanh, để hành lý và chỉ mang daily bag. Mục tiêu rời hotel khoảng 18:15 để không trễ Syntrend/Guanghua.",
    "mapSearch": "Google Maps: Muzik Hotel Ximen Station Branch.",
    "notionUrl": "https://app.notion.com/3afe8e18611981529f00f31b95762d7d"
  },
  {
    "id": "3afe8e18-6119-81bc-a163-c6aec473b4ba",
    "dayNumber": 1,
    "date": "2026-08-30",
    "dayLabel": "Ngày 1 · CN 30/8",
    "start": "18:30",
    "end": "19:20",
    "timeLabel": "18:30–19:20",
    "title": "Syntrend Creative Park + Guanghua Digital Plaza",
    "area": "Zhongxiao Xinsheng",
    "categories": [
      "Tech",
      "Mua sắm"
    ],
    "note": "Từ Ximen Station đi Blue/Bannan Line thẳng tới Zhongxiao Xinsheng, không đổi tuyến. Xuống ga rồi đi bộ tới Syntrend; Guanghua nằm ngay khu bên cạnh. Chỉ browse nhanh vì 19:20 phải rời đi Taipei 101.",
    "mapSearch": "Google Maps: Ximen Station → Zhongxiao Xinsheng Station → Syntrend Creative Park → Guang Hua Digital Plaza. MRT: Blue Line, Ximen → Zhongxiao Xinsheng.",
    "notionUrl": "https://app.notion.com/3afe8e18611981bca163c6aec473b4ba"
  },
  {
    "id": "3afe8e18-6119-8150-8454-ebc23d81cde6",
    "dayNumber": 1,
    "date": "2026-08-30",
    "dayLabel": "Ngày 1 · CN 30/8",
    "start": "19:45",
    "end": "21:00",
    "timeLabel": "19:45–21:00",
    "title": "Taipei 101 Observatory",
    "area": "Xinyi",
    "categories": [
      "Tham quan"
    ],
    "note": "Từ Zhongxiao Xinsheng đi Orange Line tới Dongmen → đổi sang Red Line hướng Xiangshan → xuống Taipei 101/World Trade Center. Vào Observatory và giữ giờ ra khoảng 21:00 để kịp đi ăn tối.",
    "mapSearch": "Google Maps: Zhongxiao Xinsheng Station → Dongmen Station → Taipei 101/World Trade Center Station → Taipei 101 Observatory. MRT: Orange Line → đổi Red Line tại Dongmen.",
    "notionUrl": "https://app.notion.com/3afe8e18611981508454ebc23d81cde6"
  },
  {
    "id": "3afe8e18-6119-81b7-a09b-e0e7f62b2873",
    "dayNumber": 1,
    "date": "2026-08-30",
    "dayLabel": "Ngày 1 · CN 30/8",
    "start": "21:15",
    "end": "22:45",
    "timeLabel": "21:15–22:45",
    "title": "Linjiang / Tonghua Night Market · ăn tối",
    "area": "Linjiang Street",
    "categories": [
      "Ăn uống"
    ],
    "note": "Từ Taipei 101 đi bộ khoảng 15–20 phút hoặc taxi ngắn tới Linjiang/Tonghua Night Market. Đây là bữa tối chính ngày 1. Ăn xong: đi tới Xinyi Anhe Station → Red Line tới Chiang Kai-Shek Memorial Hall → đổi Green Line → Ximen.",
    "mapSearch": "Google Maps: Taipei 101 Observatory → Linjiang Street Night Market. Về hotel: Xinyi Anhe Station → Chiang Kai-Shek Memorial Hall → Ximen Station.",
    "notionUrl": "https://app.notion.com/3afe8e18611981b7a09be0e7f62b2873"
  },
  {
    "id": "3afe8e18-6119-81f4-a6f5-d9547fd7ce0c",
    "dayNumber": 2,
    "date": "2026-08-31",
    "dayLabel": "Ngày 2 · T2 31/8",
    "start": "07:10",
    "end": "09:00",
    "timeLabel": "07:10–09:00",
    "title": "Ximen → Yangmingshan → Xiaoyoukeng",
    "area": "Taipei → Yangmingshan",
    "categories": [
      "Di chuyển"
    ],
    "note": "Trước khi đi: ăn sáng ở Ximen khoảng 06:30–07:00, mang theo 1 snack + nước vì trên núi không nên trông chờ đồ ăn đúng lúc. Sau đó đi bộ tới điểm bus Zhonghua Road North → bắt bus 260 lên Yangmingshan Bus Terminal → xuống bến cuối/terminal → đổi bus 108 → xuống Xiaoyoukeng.",
    "mapSearch": "Google Maps: Ximen → Yangmingshan Bus Terminal → Xiaoyoukeng Recreation Area. Cách đi: bus 260 → xuống Yangmingshan Bus Terminal → đổi bus 108 → xuống Xiaoyoukeng.",
    "notionUrl": "https://app.notion.com/3afe8e18611981f4a6f5d9547fd7ce0c"
  },
  {
    "id": "3afe8e18-6119-81c5-ad30-f8465b222982",
    "dayNumber": 2,
    "date": "2026-08-31",
    "dayLabel": "Ngày 2 · T2 31/8",
    "start": "09:00",
    "end": "09:40",
    "timeLabel": "09:00–09:40",
    "title": "Xiaoyoukeng · ghé điểm địa nhiệt",
    "area": "Yangmingshan",
    "categories": [
      "Tham quan"
    ],
    "note": "Ở Xiaoyoukeng khoảng 30–40 phút là đủ: xem fumarole/địa nhiệt, chụp hình rồi quay lại trạm bus. Trước khi đi bộ xa khỏi trạm, nhìn giờ bus 108 kế tiếp để khỏi chờ lâu. Sau đó bắt 108 tiếp tục tới Qingtiangang.",
    "mapSearch": "Google Maps: Xiaoyoukeng Recreation Area. Chặng kế: bus 108, Xiaoyoukeng → Qingtiangang.",
    "notionUrl": "https://app.notion.com/3afe8e18611981c5ad30f8465b222982"
  },
  {
    "id": "3afe8e18-6119-811c-a7b4-e3dd961eb964",
    "dayNumber": 2,
    "date": "2026-08-31",
    "dayLabel": "Ngày 2 · T2 31/8",
    "start": "10:10",
    "end": "12:00",
    "timeLabel": "10:10–12:00",
    "title": "Qingtiangang Grassland · main visit",
    "area": "Yangmingshan",
    "categories": [
      "Tham quan"
    ],
    "note": "Bus 108 sẽ đưa tới Qingtiangang. Dành phần lớn thời gian ở đồng cỏ + viewpoint gần visitor center. Khoảng 11:45 bắt đầu quay về khu bus stop để 12:00 có thể rời đi; đừng đợi sát giờ mới xếp hàng.",
    "mapSearch": "Google Maps: Qingtiangang Grassland / 擎天崗. Khi rời đi: tìm Qingtiangang Bus Stop và tuyến S15 về Shilin.",
    "notionUrl": "https://app.notion.com/3afe8e186119811ca7b4e3dd961eb964"
  },
  {
    "id": "3afe8e18-6119-8174-a009-ffe7014c30d0",
    "dayNumber": 2,
    "date": "2026-08-31",
    "dayLabel": "Ngày 2 · T2 31/8",
    "start": "12:00",
    "end": "13:30",
    "timeLabel": "12:00–13:30",
    "title": "Qingtiangang → Shilin → Beitou",
    "area": "Yangmingshan → Beitou",
    "categories": [
      "Di chuyển"
    ],
    "note": "Từ Qingtiangang bắt bus S15 về MRT Shilin Station → vào Red Line → đi thẳng tới Beitou Station, không cần đổi tuyến MRT. Nếu bus núi trễ thì ưu tiên giữ giờ Gaia, có thể rút ngắn bữa trưa một chút.",
    "mapSearch": "Google Maps: Qingtiangang Bus Stop → Shilin Station → Beitou Station. Cách đi: bus S15 → Shilin; sau đó Red Line Shilin → Beitou.",
    "notionUrl": "https://app.notion.com/3afe8e1861198174a009ffe7014c30d0"
  },
  {
    "id": "3afe8e18-6119-81f6-bede-c00c751f76ff",
    "dayNumber": 2,
    "date": "2026-08-31",
    "dayLabel": "Ngày 2 · T2 31/8",
    "start": "13:30",
    "end": "14:35",
    "timeLabel": "13:30–14:35",
    "title": "Wu Jia Beef Noodles → taxi tới The Gaia",
    "area": "Beitou",
    "categories": [
      "Ăn uống",
      "Di chuyển"
    ],
    "note": "13:30–14:20 ăn trưa ở Wu Jia Beef Noodles. Ăn xong khoảng 14:20 gọi taxi/Uber tới The Gaia Hotel; chặng này ngắn nên taxi tiện hơn MRT. Aim tới Gaia trước 14:35 để có thời gian thay đồ.",
    "mapSearch": "Google Maps: Wu Jia Beef Noodles Beitou → The Gaia Hotel Taipei. Di chuyển: taxi/Uber thẳng tới Gaia.",
    "notionUrl": "https://app.notion.com/3afe8e18611981f6bedec00c751f76ff"
  },
  {
    "id": "3afe8e18-6119-81da-9390-ce948bc68e13",
    "dayNumber": 2,
    "date": "2026-08-31",
    "dayLabel": "Ngày 2 · T2 31/8",
    "start": "14:45",
    "end": "16:30",
    "timeLabel": "14:45–16:30",
    "title": "The Gaia Hotel · public hot spring",
    "area": "Beitou",
    "categories": [
      "Nghỉ"
    ],
    "note": "Public hot spring nam/nữ riêng. Tới nơi thay đồ, tắm trước rồi mới vào khu ngâm. Cố gắng kết thúc ngâm khoảng 16:15 để còn tắm lại/thay đồ và rời Gaia khoảng 16:30.",
    "mapSearch": "Google Maps: The Gaia Hotel Taipei. Khi gần 16:30 có thể nhờ lễ tân gọi taxi hoặc mở Uber.",
    "notionUrl": "https://app.notion.com/3afe8e18611981da9390ce948bc68e13"
  },
  {
    "id": "3afe8e18-6119-819d-8512-fb41d3f7dd4d",
    "dayNumber": 2,
    "date": "2026-08-31",
    "dayLabel": "Ngày 2 · T2 31/8",
    "start": "16:30",
    "end": "20:45",
    "timeLabel": "16:30–20:45",
    "title": "Dadaocheng sunset → Ningxia Night Market",
    "area": "Beitou → Dadaocheng → Ningxia",
    "categories": [
      "Tham quan",
      "Ăn uống"
    ],
    "note": "16:30 rời Gaia → ưu tiên taxi/Uber đi thẳng Dadaocheng Wharf để đỡ đổi MRT. Aim tới khoảng 17:10–17:30, đi dạo/ngắm golden hour; sunset khoảng 18:14. Sau đó đi bộ/taxi ngắn sang Ningxia Night Market và ăn tối khoảng 18:50–20:45.",
    "mapSearch": "Google Maps: The Gaia Hotel Taipei → Dadaocheng Wharf → Ningxia Night Market. Chặng Gaia → Dadaocheng: taxi/Uber thẳng là dễ nhất.",
    "notionUrl": "https://app.notion.com/3afe8e186119819d8512fb41d3f7dd4d"
  },
  {
    "id": "3afe8e18-6119-813b-8ad5-e02be96f502c",
    "dayNumber": 3,
    "date": "2026-09-01",
    "dayLabel": "Ngày 3 · T3 1/9",
    "start": "05:30",
    "end": "06:40",
    "timeLabel": "05:30–06:40",
    "title": "Dậy sớm · Ximen → Holy Family Catholic Church",
    "area": "Ximending → Da’an",
    "categories": [
      "Nghỉ",
      "Di chuyển"
    ],
    "note": "05:30 dậy và chuẩn bị. Khoảng 06:05–06:10 rời Ximen; sáng này ưu tiên taxi/Uber tới Holy Family để chắc giờ, aim tới 06:30–06:35. Nếu đi MRT: Ximen → Chiang Kai-Shek Memorial Hall → đổi Red Line → Daan Park, rồi đi bộ tới nhà thờ.",
    "mapSearch": "Google Maps: Muzik Hotel Ximen Station Branch → Holy Family Catholic Church Taipei / 台北聖家堂. Ưu tiên: taxi/Uber. MRT dự phòng: Ximen → Chiang Kai-Shek Memorial Hall → Daan Park.",
    "notionUrl": "https://app.notion.com/3afe8e186119813b8ad5e02be96f502c"
  },
  {
    "id": "3afe8e18-6119-81ea-96f1-c1cec87fe4ed",
    "dayNumber": 3,
    "date": "2026-09-01",
    "dayLabel": "Ngày 3 · T3 1/9",
    "start": "06:45",
    "end": "07:15",
    "timeLabel": "06:45–07:15",
    "title": "Holy Family Catholic Church · weekday Mass",
    "area": "Da’an",
    "categories": [
      "Tham quan"
    ],
    "note": "Dự weekday Mass 06:45–07:15. Theo lịch hiện tại đây không phải English Mass, nhiều khả năng dùng tiếng Hoa/Mandarin. Tới sớm 10–15 phút, ngồi yên tham dự lễ; sau lễ ra ngoài mới chuyển sang điểm tiếp theo.",
    "mapSearch": "Google Maps: Holy Family Catholic Church Taipei / 台北聖家堂. Không cần search transit thêm trong slot này.",
    "notionUrl": "https://app.notion.com/3afe8e18611981ea96f1c1cec87fe4ed"
  },
  {
    "id": "3afe8e18-6119-81c9-97dc-ff6c61c89029",
    "dayNumber": 3,
    "date": "2026-09-01",
    "dayLabel": "Ngày 3 · T3 1/9",
    "start": "07:15",
    "end": "08:10",
    "timeLabel": "07:15–08:10",
    "title": "Daan Forest Park / Qingtian · đi nhanh → Longshan",
    "area": "Da’an → Wanhua",
    "categories": [
      "Tham quan",
      "Di chuyển"
    ],
    "note": "Sau lễ chỉ chọn 1 điểm để khỏi chạy: Daan Forest Park nếu muốn cây xanh/đi bộ, hoặc Qingtian Street nếu muốn phố yên + kiến trúc đẹp. Đi khoảng 20–25 phút rồi rời khu Da’an. Sau đó ưu tiên taxi/Uber tới Longshan để tiết kiệm đổi MRT.",
    "mapSearch": "Google Maps: Holy Family Catholic Church → Daan Forest Park HOẶC Qingtian Street → Lungshan Temple. Chặng Da’an → Longshan: taxi/Uber là dễ nhất.",
    "notionUrl": "https://app.notion.com/3afe8e18611981c997dcff6c61c89029"
  },
  {
    "id": "3afe8e18-6119-816b-bb95-f3fe8e6d5cbe",
    "dayNumber": 3,
    "date": "2026-09-01",
    "dayLabel": "Ngày 3 · T3 1/9",
    "start": "08:10",
    "end": "09:30",
    "timeLabel": "08:10–09:30",
    "title": "Longshan Temple + ăn sáng + street photo Wanhua",
    "area": "Wanhua / Longshan",
    "categories": [
      "Tham quan",
      "Ăn uống"
    ],
    "note": "Tới Longshan khoảng 08:10. Tham quan temple trước rồi ăn sáng quanh Wanhua/Dongsanshui Street Market; sau đó đi bộ chụp phố cũ gần đó. Không cần ép ghé Bopiliao nếu không hứng thú. Aim rời khu khoảng 09:30.",
    "mapSearch": "Google Maps: Lungshan Temple / 龍山寺 → Dongsanshui Street Market / 東三水街市場. Từ khóa ăn sáng: breakfast near Longshan Temple / Wanhua breakfast.",
    "notionUrl": "https://app.notion.com/3afe8e186119816bbb95f3fe8e6d5cbe"
  },
  {
    "id": "3afe8e18-6119-811b-a795-f1468c091fa7",
    "dayNumber": 3,
    "date": "2026-09-01",
    "dayLabel": "Ngày 3 · T3 1/9",
    "start": "09:30",
    "end": "10:50",
    "timeLabel": "09:30–10:50",
    "title": "Longshan → Taipei Main · cafe / buffer",
    "area": "Wanhua → Taipei Main",
    "categories": [
      "Di chuyển",
      "Nghỉ"
    ],
    "note": "Từ Longshan Temple Station lên Blue/Bannan Line đi thẳng 2 stops tới Taipei Main Station, không đổi tuyến. Tới sớm thì nghỉ/cafe gần ga; đây là buffer trước khi Taipei City Mall mở 11:00.",
    "mapSearch": "Google Maps: Longshan Temple Station → Taipei Main Station. MRT: Blue Line, Longshan Temple → Ximen → Taipei Main, không đổi tuyến.",
    "notionUrl": "https://app.notion.com/3afe8e186119811ba795f1468c091fa7"
  },
  {
    "id": "3afe8e18-6119-816d-8956-e03cda25a34d",
    "dayNumber": 3,
    "date": "2026-09-01",
    "dayLabel": "Ngày 3 · T3 1/9",
    "start": "11:00",
    "end": "12:10",
    "timeLabel": "11:00–12:10",
    "title": "Taipei City Mall · game / figure / gadget",
    "area": "Taipei Main",
    "categories": [
      "Mua sắm",
      "Tech"
    ],
    "note": "11:00 vào Taipei City Mall, ưu tiên khu game/figure/gashapon/gadget. Khoảng 11:50–12:00 bắt đầu để ý giờ và search chỗ ăn. Ưu tiên 大稻埕魯肉飯 (Dadaocheng Braised Pork Rice) gần khu Taipei Main/Y Underground Mall; nếu đông thì chọn quán nhanh gần City Mall.",
    "mapSearch": "Google Maps: Taipei City Mall / 台北地下街. Tìm quán ăn: 大稻埕魯肉飯 / Dadaocheng Braised Pork Rice. Từ khóa khu mall: Y Underground Mall Taipei Main Station.",
    "notionUrl": "https://app.notion.com/3afe8e186119816d8956e03cda25a34d"
  },
  {
    "id": "3c3e8e18-6119-8107-9da6-fcaee4e89d05",
    "dayNumber": 3,
    "date": "2026-09-01",
    "dayLabel": "Ngày 3 · T3 1/9",
    "start": "12:10",
    "end": "12:50",
    "timeLabel": "12:10–12:50",
    "title": "Ăn nhẹ → tới meeting point tour",
    "area": "Taipei Main / điểm đón tour",
    "categories": [
      "Ăn uống",
      "Di chuyển"
    ],
    "note": "12:10 rời City Mall và ăn trưa nhanh. Ưu tiên 大稻埕魯肉飯 nếu vị trí meeting point tour thuận tiện; ăn xong đi toilet, mua nước/snack rồi đi tới điểm đón. Aim có mặt 12:45–12:50, không canh sát 13:15.",
    "mapSearch": "Google Maps: Taipei City Mall → 大稻埕魯肉飯 → TOUR MEETING POINT (TBD). Khi có voucher tour, thay TBD bằng đúng tên/address trên voucher.",
    "notionUrl": "https://app.notion.com/3c3e8e18611981079da6fcaee4e89d05"
  },
  {
    "id": "3c3e8e18-6119-8132-a7d2-d922d1626899",
    "dayNumber": 3,
    "date": "2026-09-01",
    "dayLabel": "Ngày 3 · T3 1/9",
    "start": "13:15",
    "end": "20:30",
    "timeLabel": "13:15–20:30",
    "title": "Tour Shifen → Jiufen · chiều đến tối",
    "area": "Taipei → Shifen → Jiufen → Taipei",
    "categories": [
      "Tham quan",
      "Di chuyển"
    ],
    "note": "Tour dự kiến pickup 13:15. Ưu tiên route Shifen/Waterfall trước khi còn sáng → Jiufen sau để bắt golden hour + đèn lồng. Dự kiến về Taipei khoảng 20:30. Giờ pickup, meeting point và drop-off vẫn để TBD cho tới khi có link/voucher tour thật; lúc đó update lại theo voucher.",
    "mapSearch": "Google Maps để nhận diện điểm: Shifen Old Street / 十分老街; Shifen Waterfall / 十分瀑布; Jiufen Old Street / 九份老街. Di chuyển trong tour: theo xe và meeting point trên voucher; chưa cần tự search tàu/bus.",
    "notionUrl": "https://app.notion.com/3c3e8e1861198132a7d2d922d1626899"
  },
  {
    "id": "3afe8e18-6119-8111-a0aa-c162e641a912",
    "dayNumber": 3,
    "date": "2026-09-01",
    "dayLabel": "Ngày 3 · T3 1/9",
    "start": "21:00",
    "end": "22:30",
    "timeLabel": "21:00–22:30",
    "title": "Raohe Night Market · ăn đêm",
    "area": "Songshan / Raohe",
    "categories": [
      "Ăn uống"
    ],
    "note": "Nếu tour về Taipei khoảng 20:30 và còn sức thì đi Raohe ăn tối/ăn đêm khoảng 21:00–22:30. Nếu drop-off ở Ximen thì đi Green Line thẳng tới Songshan; nếu drop-off ở chỗ khác thì mở Google Maps từ đúng điểm thả tour. Nếu quá mệt thì bỏ Raohe, không ảnh hưởng phần chính của ngày.",
    "mapSearch": "Google Maps: Raohe Street Night Market / 饒河街觀光夜市. Nếu xuất phát Ximen: Green Line Ximen → Songshan, không đổi tuyến. Nếu tour thả chỗ khác: search route từ điểm drop-off thực tế.",
    "notionUrl": "https://app.notion.com/3afe8e1861198111a0aac162e641a912"
  },
  {
    "id": "3afe8e18-6119-8103-83d5-d8d05279a3a9",
    "dayNumber": 4,
    "date": "2026-09-02",
    "dayLabel": "Ngày 4 · T4 2/9",
    "start": "07:30",
    "end": "09:15",
    "timeLabel": "07:30–09:15",
    "title": "Ăn sáng + kiểm tra hành lý + checkout",
    "area": "Ximending",
    "categories": [
      "Ăn uống",
      "Nghỉ"
    ],
    "note": "07:30 ăn sáng gần hotel → về kiểm tra passport, ví/thẻ, điện thoại, sạc, đồ mua và cân lại hành lý nếu cần → checkout. Aim rời hotel đúng 09:15; đừng kéo bữa sáng quá lâu.",
    "mapSearch": "Google Maps: Muzik Hotel Ximen Station Branch. Tìm ăn sáng: breakfast near Ximen Station / Ximending breakfast.",
    "notionUrl": "https://app.notion.com/3afe8e186119810383d5d8d05279a3a9"
  },
  {
    "id": "3afe8e18-6119-81e8-bc1c-ebd65ab00230",
    "dayNumber": 4,
    "date": "2026-09-02",
    "dayLabel": "Ngày 4 · T4 2/9",
    "start": "09:15",
    "end": "10:45",
    "timeLabel": "09:15–10:45",
    "title": "Ximen → A1 Taipei Main → TPE T1",
    "area": "Taipei → Taoyuan Airport",
    "categories": [
      "Di chuyển"
    ],
    "note": "Từ Ximen đi Green Line 1 stop tới Beimen → đi bộ theo bảng chỉ dẫn tới Taoyuan Airport MRT A1 Taipei Main Station → lên Express A1 đi thẳng A12 Terminal 1. Nếu vali nặng hoặc ngại đi underground, có thể taxi từ hotel thẳng A1 rồi đi Airport MRT.",
    "mapSearch": "Google Maps: Ximen Station → Beimen Station → Taipei Main Station A1 → Airport Terminal 1 Station A12. MRT: Green Line Ximen → Beimen; sau đó Airport MRT Express A1 → A12.",
    "notionUrl": "https://app.notion.com/3afe8e18611981e8bc1cebd65ab00230"
  },
  {
    "id": "3afe8e18-6119-81fc-be34-f6d32dd11ec8",
    "dayNumber": 4,
    "date": "2026-09-02",
    "dayLabel": "Ngày 4 · T4 2/9",
    "start": "10:45",
    "end": "13:45",
    "timeLabel": "10:45–13:45",
    "title": "China Airlines check-in + security + xuất cảnh",
    "area": "TPE Terminal 1",
    "categories": [
      "Di chuyển"
    ],
    "note": "Tới TPE Terminal 1 khoảng 10:45. Làm theo thứ tự: tìm quầy China Airlines → check-in/gửi hành lý → security → exit immigration → tìm gate. Sau khi qua security có thể ăn nhẹ/lunch khoảng 11:30–12:15 rồi ra gate sớm.",
    "mapSearch": "Google Maps: Taiwan Taoyuan International Airport Terminal 1. Flight cần theo dõi: China Airlines CI783. Trong sân bay: theo bảng Departures → China Airlines → Security → Immigration → Gate.",
    "notionUrl": "https://app.notion.com/3afe8e18611981fcbe34f6d32dd11ec8"
  },
  {
    "id": "3afe8e18-6119-8102-8749-d790db828c3e",
    "dayNumber": 4,
    "date": "2026-09-02",
    "dayLabel": "Ngày 4 · T4 2/9",
    "start": "13:45",
    "end": "16:20",
    "timeLabel": "13:45–16:20",
    "title": "Bay TPE → SGN · China Airlines CI783",
    "area": "TPE T1 → SGN T2",
    "categories": [
      "Di chuyển"
    ],
    "note": "CI783 bay 13:45–16:20 về SGN. Có mặt ở gate trước boarding; giữ passport + boarding pass trong túi dễ lấy. Hạ cánh SGN Terminal 2 rồi làm nhập cảnh/lấy hành lý như bình thường.",
    "mapSearch": "Flight search: CI783 TPE → SGN. Điểm đến: Tan Son Nhat International Airport – Terminal 2.",
    "notionUrl": "https://app.notion.com/3afe8e18611981028749d790db828c3e"
  }
] as const satisfies readonly ItineraryItem[];
// </notion-data>

function getMapsPart(item: ItineraryItem): string | undefined {
  return item.mapSearch
    .match(
      /(?:^|[|.!?]\s*)(?:(?:Google\s+)?Maps(?:\s+arrival|\s+để nhận diện điểm)?|Điểm đến(?:\s+trên\s+Maps)?)\s*:\s*([^|.!?]+)/i,
    )?.[1]
    ?.trim();
}

type MapRoute = {
  destination: string;
  searchDestination: string;
  plannedOrigin?: string;
  waypoints: string[];
  directionsIssue?: string;
  planIssue?: string;
};

function cleanStop(stop: string): string {
  return stop.trim().replace(/[.,;:]+$/, "").trim();
}

function isPlaceholderStop(stop: string): boolean {
  return /\b(?:TBD|TBA|UNKNOWN|PLACEHOLDER)\b/i.test(stop);
}

function isAmbiguousOrigin(stop: string): boolean {
  return isPlaceholderStop(stop) || /\b(?:HOẶC|OR)\b/i.test(stop) || /[a-z]\s*\/\s*[a-z]/i.test(stop);
}

function isAmbiguousWaypoint(stop: string): boolean {
  return isPlaceholderStop(stop) || /\b(?:HOẶC|OR)\b/i.test(stop) || /[a-z]\s*\/\s*[a-z]/i.test(stop);
}

function stopKey(stop: string): string {
  return stop.toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
}

function isSameStop(first: string, second: string): boolean {
  const firstKey = stopKey(first);
  const secondKey = stopKey(second);
  return Boolean(firstKey && secondKey && (firstKey.includes(secondKey) || secondKey.includes(firstKey)));
}

function uniqueStops(stops: string[]): string[] {
  return stops.reduce<string[]>((result, stop) => {
    if (!result.some((existing) => isSameStop(existing, stop))) result.push(stop);
    return result;
  }, []);
}

function getSupplementalRouteStops(item: ItineraryItem): string[] | undefined {
  const routeClause = item.mapSearch
    .split(/\s*\|\s*|[.!?]\s+/)
    .map((clause) => clause.trim().match(/^([^:]+):\s*(.+)$/))
    .find((match) => {
      if (!match) return false;
      const [, label, value] = match;
      return (
        value.includes("→") &&
        /^(?:MRT(?:\s+(?:search|dự phòng))?|Bus(?:\s+search)?|Walk(?:\s+route)?|Taxi(?:\s+search)?|Transit(?:\s+search)?|Di chuyển)$/i.test(
          label.trim(),
        ) &&
        !/return/i.test(label)
      );
    });

  if (!routeClause) return undefined;
  const [, label, value] = routeClause;
  const stops = value
    .split(/\s*→\s*/)
    .map((stop) => cleanStop(stop.split(";")[0]))
    .map((stop) => (/bus/i.test(label) ? stop.replace(/^\d+[a-z]?\s+/i, "") : stop))
    .filter(Boolean);

  return stops.length > 1 ? stops : undefined;
}

function getMapRoute(item: ItineraryItem): MapRoute {
  const mapsPart = getMapsPart(item);
  const fallbackDestination = `${item.title}, ${item.area}`;

  if (!mapsPart) {
    return {
      destination: fallbackDestination,
      searchDestination: fallbackDestination,
      waypoints: [],
      directionsIssue: "Chưa có keyword Google Maps rõ ràng trong plan",
    };
  }

  const hasMapsRoute = mapsPart.includes("→");
  const mapStops = mapsPart
    .split(/\s*(?:→|;)\s*/)
    .map(cleanStop)
    .filter(Boolean);
  const finalStop = item.mapSearch.match(/\|\s*Then\s*:\s*([^|]+)/i)?.[1];

  if (finalStop && mapStops.at(-1) !== cleanStop(finalStop)) {
    mapStops.push(cleanStop(finalStop));
  }

  const destination = mapStops.at(-1) ?? fallbackDestination;
  const searchDestination = mapStops.filter((stop) => !isPlaceholderStop(stop)).at(-1) ?? fallbackDestination;

  if (isPlaceholderStop(destination)) {
    return {
      destination,
      searchDestination,
      waypoints: [],
      directionsIssue: "Điểm đến trong plan vẫn là TBD — hãy cập nhật voucher trên Notion",
    };
  }

  if (/(?:tour transport|di chuyển trong tour)[^.|]*(?:voucher|theo xe|follow)/i.test(item.mapSearch)) {
    return {
      destination,
      searchDestination,
      waypoints: [],
      directionsIssue: "Chặng tour này di chuyển theo xe và meeting point trên voucher",
    };
  }

  const supplementalStops = hasMapsRoute ? undefined : getSupplementalRouteStops(item);
  const plannedStops = hasMapsRoute
    ? uniqueStops(mapStops)
    : supplementalStops
      ? uniqueStops([...supplementalStops, ...mapStops])
      : undefined;

  if (!plannedStops || plannedStops.length < 2 || isSameStop(plannedStops[0], destination)) {
    return { destination, searchDestination, waypoints: [] };
  }

  if (isAmbiguousOrigin(plannedStops[0])) {
    return {
      destination,
      searchDestination,
      waypoints: [],
      planIssue: "Điểm bắt đầu trong plan đang có nhiều lựa chọn, chưa thể tạo tuyến chính xác",
    };
  }

  const hasAmbiguousWaypoint = plannedStops.slice(1, -1).some(isAmbiguousWaypoint);
  if (hasAmbiguousWaypoint) {
    return {
      destination,
      searchDestination,
      waypoints: plannedStops
        .slice(1)
        .filter((stop) => !isSameStop(stop, destination) && !isAmbiguousWaypoint(stop)),
      planIssue: "Chặng này có điểm “HOẶC” chưa chốt — hãy chọn điểm trên Notion trước",
    };
  }

  return {
    plannedOrigin: plannedStops[0],
    destination,
    searchDestination,
    waypoints: plannedStops
      .slice(1)
      .filter((stop) => !isSameStop(stop, destination) && !isAmbiguousWaypoint(stop)),
  };
}

/** Opens a focused Google Maps search for the most relevant destination in a row. */
export function getGoogleMapsUrl(item: ItineraryItem): string {
  const query = getMapRoute(item).searchDestination;
  const params = new URLSearchParams({ api: "1", query });

  return `https://www.google.com/maps/search/?${params.toString()}`;
}

/** Returns the destination keyword shown in the route picker. */
export function getMapDestination(item: ItineraryItem): string {
  return getMapRoute(item).destination;
}

/** Returns the first stop from an explicit `Maps:` or labeled transit arrow route. */
export function getPlannedOrigin(item: ItineraryItem): string | undefined {
  return getMapRoute(item).plannedOrigin;
}

/** Explains why a row cannot safely open a route preview. */
export function getDirectionsIssue(item: ItineraryItem): string | undefined {
  return getMapRoute(item).directionsIssue;
}

/** Explains why the saved plan origin cannot safely be used. */
export function getPlanDirectionsIssue(item: ItineraryItem): string | undefined {
  return getMapRoute(item).planIssue;
}

/** Builds a universal Google Maps route to the row's destination. */
export function getDirectionsUrl(
  item: ItineraryItem,
  start: DirectionsStart = "current",
): string | undefined {
  const route = getMapRoute(item);
  const plannedOrigin = route.plannedOrigin;
  if (route.directionsIssue) return undefined;

  const params = new URLSearchParams({
    api: "1",
    destination: route.destination,
  });

  if (start === "plan") {
    if (!plannedOrigin || route.planIssue) return undefined;
    params.set("origin", plannedOrigin);
  }

  const routeText = `${item.mapSearch} ${item.title}`;
  const guidanceText = `${routeText} ${item.note}`;
  const hasPlannedTaxi = /(?:Ưu tiên|Di chuyển|Taxi(?:\s+search)?|Chặng[^.:]*?)\s*:\s*taxi|taxi\/Uber\s+thẳng|taxi\s+tới/i.test(
    item.mapSearch,
  );
  let travelMode: "walking" | "driving" | "transit" | undefined;
  if (/International Airport Terminal\s+\d+\s*→\s*Airport Terminal\s+\d+\s+Station/i.test(routeText)) {
    travelMode = "walking";
  } else if (hasPlannedTaxi) {
    travelMode = "driving";
  } else if (
    !/Flight|bay/i.test(routeText) &&
    (item.categories.includes("Di chuyển") ||
      (Boolean(route.plannedOrigin) && /\b(?:MRT|bus|train|metro)\b/i.test(routeText)))
  ) {
    travelMode = "transit";
  } else if (route.plannedOrigin && /(?:\bwalk(?:ing)?\b|đi bộ)/i.test(guidanceText)) {
    travelMode = "walking";
  }

  if (travelMode) params.set("travelmode", travelMode);

  if (travelMode !== "transit" && route.waypoints.length > 0) {
    params.set("waypoints", route.waypoints.join("|"));
  }

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}
