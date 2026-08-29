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
  isBackup: boolean;
}

export type DirectionsStart = "current" | "plan";

export const itineraryExportedAt = "2026-08-29T05:23:41.624Z";

/** Snapshot of the 34 live rows in Notion, including six explicitly labeled backup routes. */
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
    "mapSearch": "Google Maps search: Tan Son Nhat International Airport - Terminal 2, Ho Chi Minh City, Vietnam. Flight reference: China Airlines CI782 (SGN → TPE).",
    "notionUrl": "https://app.notion.com/p/3c0e8e18611981ab9c6dd0a4857429cf",
    "isBackup": false
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
    "mapSearch": "Google Maps search: Tan Son Nhat International Airport - Terminal 2, Ho Chi Minh City, Vietnam → Taiwan Taoyuan International Airport Terminal 1, Dayuan District, Taoyuan City, Taiwan. Flight: China Airlines CI782.",
    "notionUrl": "https://app.notion.com/p/3afe8e186119812c8b8ad60f55a0c19f",
    "isBackup": false
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
    "mapSearch": "Google Maps search: Taiwan Taoyuan International Airport Terminal 1, Dayuan District, Taoyuan City, Taiwan → A12 Airport Terminal 1 Station, Taoyuan Airport MRT, Dayuan District, Taoyuan City, Taiwan.",
    "notionUrl": "https://app.notion.com/p/3afe8e18611981cea0a6c6d6f65af9fc",
    "isBackup": false
  },
  {
    "id": "3afe8e18-6119-81f4-bb0d-d49f0a4d461a",
    "dayNumber": 1,
    "date": "2026-08-30",
    "dayLabel": "Ngày 1 · CN 30/8",
    "start": "16:40",
    "end": "17:50",
    "timeLabel": "16:40–17:50",
    "title": "🥇 PRIMARY — Airport MRT A12 → A1 → taxi → Muzik",
    "area": "Taoyuan → Taipei Main → Ximen",
    "categories": [
      "Di chuyển"
    ],
    "note": "Tại TPE Terminal 1 Station (A12), lên Taoyuan Airport MRT Express đi thẳng A1 Taipei Main Station, không đổi tàu. Xuống A1 ưu tiên đi theo biển Taxi tới taxi stand rồi bắt taxi ngắn về Muzik Hotel để đỡ kéo vali; budget khoảng NT$100–130. Nếu taxi stand đông/khó lấy xe thì xem hàng BACKUP MRT riêng.",
    "mapSearch": "Google Maps search: A12 Airport Terminal 1 Station, Taoyuan Airport MRT, Dayuan District, Taoyuan City, Taiwan → A1 Taipei Main Station, Taoyuan Airport MRT, Taipei City, Taiwan → Muzik Hotel - Ximen Station Branch, Wanhua District, Taipei City, Taiwan. Transit: Taoyuan Airport MRT Express A12 → A1; taxi A1 → Muzik.",
    "notionUrl": "https://app.notion.com/p/3afe8e18611981f4bb0dd49f0a4d461a",
    "isBackup": false
  },
  {
    "id": "3cae8e18-6119-8129-972a-f7390106d471",
    "dayNumber": 1,
    "date": "2026-08-30",
    "dayLabel": "Ngày 1 · CN 30/8",
    "start": "16:40",
    "end": "17:50",
    "timeLabel": "16:40–17:50 · BACKUP",
    "title": "🔄 BACKUP — A1 → bus → Ximen → Muzik",
    "area": "Taipei Main → Ximending",
    "categories": [
      "Di chuyển"
    ],
    "note": "Dùng khi taxi stand ở A1 quá đông/khó lấy xe. Từ A1 Taipei Main Station đi bộ khoảng 6–7 phút tới trạm 臺北車站(忠孝) chiều westbound, mở Bus+ và bắt chuyến tới sớm trong nhóm 202 / 205 / 212 theo hướng Ximen. Ưu tiên xuống 中華路北站 nếu chuyến đó phục vụ trạm này; nếu không thì xuống 捷運西門站 rồi đi bộ ngắn về Muzik. Cách này tránh đoạn đi bộ 10–14 phút nối A1 với Blue/Bannan Line. Taxi vẫn là PRIMARY vì có vali; bus là backup tiết kiệm.",
    "mapSearch": "Google Maps search: A1 Taipei Main Station, Taoyuan Airport MRT, Taipei City, Taiwan → Taipei Main Station (Zhongxiao) / 臺北車站(忠孝) westbound bus stop → Zhonghua Rd. North / 中華路北站 or MRT Ximen Station / 捷運西門站 → Muzik Hotel - Ximen Station Branch, No. 90 Section 1 Zhonghua Road, Wanhua District, Taipei City, Taiwan. Transit BACKUP: earliest live ETA among bus 202 / 205 / 212 toward Ximen.",
    "notionUrl": "https://app.notion.com/p/3cae8e1861198129972af7390106d471",
    "isBackup": true
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
    "note": "Check-in nhanh, để hành lý và chỉ mang daily bag. Mục tiêu rời hotel khoảng 18:15 để đi Taipei 101.",
    "mapSearch": "Google Maps search: Muzik Hotel - Ximen Station Branch, Wanhua District, Taipei City, Taiwan.",
    "notionUrl": "https://app.notion.com/p/3afe8e18611981529f00f31b95762d7d",
    "isBackup": false
  },
  {
    "id": "3afe8e18-6119-8150-8454-ebc23d81cde6",
    "dayNumber": 1,
    "date": "2026-08-30",
    "dayLabel": "Ngày 1 · CN 30/8",
    "start": "18:40",
    "end": "19:35",
    "timeLabel": "18:40–19:35",
    "title": "Taipei 101 Observatory",
    "area": "Xinyi",
    "categories": [
      "Tham quan"
    ],
    "note": "Rời Muzik Hotel khoảng 18:15. Từ Ximen Station đi Green Line tới Chiang Kai-Shek Memorial Hall → đổi Red Line hướng Xiangshan → xuống Taipei 101/World Trade Center. Ưu tiên Observatory khoảng 45–55 phút; khoảng 19:35 bắt đầu rời Taipei 101 để qua Syntrend.",
    "mapSearch": "Google Maps search: Muzik Hotel - Ximen Station Branch, Wanhua District, Taipei City, Taiwan → Ximen Station, Wanhua District, Taipei City, Taiwan → Chiang Kai-Shek Memorial Hall Station, Zhongzheng District, Taipei City, Taiwan → Taipei 101/World Trade Center Station, Xinyi District, Taipei City, Taiwan → Taipei 101 Observatory, Xinyi District, Taipei City, Taiwan. Transit: Green Line Ximen → Chiang Kai-Shek Memorial Hall; Red Line → Taipei 101/World Trade Center.",
    "notionUrl": "https://app.notion.com/p/3afe8e18611981508454ebc23d81cde6",
    "isBackup": false
  },
  {
    "id": "3afe8e18-6119-81bc-a163-c6aec473b4ba",
    "dayNumber": 1,
    "date": "2026-08-30",
    "dayLabel": "Ngày 1 · CN 30/8",
    "start": "20:05",
    "end": "20:43",
    "timeLabel": "20:05–20:43",
    "title": "Syntrend Creative Park",
    "area": "Zhongxiao Xinsheng",
    "categories": [
      "Tech",
      "Mua sắm"
    ],
    "note": "Sau Taipei 101 khoảng 19:35, PRIMARY: nếu bus 669 có live ETA đẹp (≤10 phút) thì đi từ khu Songlian Rd./Taipei 101 tới Syntrend. BACKUP: nếu vừa miss 669 hoặc ETA >15 phút thì đi MRT Taipei 101/World Trade Center → Dongmen → Zhongxiao Xinsheng; taxi là emergency fallback nếu đã trễ. Dành khoảng 35–40 phút browse nhanh các tầng tech/gadget/game; khoảng 20:43–20:45 rời Syntrend.",
    "mapSearch": "Google Maps search: Taipei 101 Observatory, Xinyi District, Taipei City, Taiwan → Songlian Rd. bus stop → Syntrend Creative Park, No. 2 Section 3 Civic Boulevard, Zhongzheng District, Taipei City, Taiwan. Transit PRIMARY: bus 669 khi live ETA đẹp. BACKUP: Taipei 101/World Trade Center → Dongmen → Zhongxiao Xinsheng → Syntrend Creative Park.",
    "notionUrl": "https://app.notion.com/p/3afe8e18611981bca163c6aec473b4ba",
    "isBackup": false
  },
  {
    "id": "3afe8e18-6119-81b7-a09b-e0e7f62b2873",
    "dayNumber": 1,
    "date": "2026-08-30",
    "dayLabel": "Ngày 1 · CN 30/8",
    "start": "20:43",
    "end": "21:30",
    "timeLabel": "20:43–21:30",
    "title": "Syntrend → bus 202 → Ximen → ngủ sớm",
    "area": "Xinyi → Ximending",
    "categories": [
      "Ăn uống",
      "Di chuyển"
    ],
    "note": "Khoảng 20:43–20:45 rời Syntrend. PRIMARY: đi bộ tới trạm Zhongxiao Elementary School (忠孝國小), aim bắt bus 202 khoảng 20:48; tuyến chạy thẳng qua Taipei Main → MRT Ximen Station. Route mẫu trên Google Maps khoảng 20:43–20:59, tổng ~16 phút, walking ~6 phút. BACKUP ngay cùng cụm trạm: 212 / 212直 / 262 / 262區; chọn xe có live ETA sớm nhất và đúng chiều Ximen. Nếu các bus đều chờ lâu thì dùng MRT/taxi. Aim về Muzik khoảng 21:05–21:15 và lên giường khoảng 21:30.",
    "mapSearch": "Google Maps search: Syntrend Creative Park, No. 2 Section 3 Civic Boulevard, Zhongzheng District, Taipei City, Taiwan → Zhongxiao Elementary School (忠孝國小) bus stop, Taipei City → MRT Ximen Station, Wanhua District, Taipei City, Taiwan → Muzik Hotel - Ximen Station Branch, Wanhua District, Taipei City, Taiwan. Transit PRIMARY: bus 202. BACKUP cùng cụm trạm: 212 / 212直 / 262 / 262區.",
    "notionUrl": "https://app.notion.com/p/3afe8e18611981b7a09be0e7f62b2873",
    "isBackup": false
  },
  {
    "id": "3afe8e18-6119-81f4-a6f5-d9547fd7ce0c",
    "dayNumber": 2,
    "date": "2026-08-31",
    "dayLabel": "Ngày 2 · T2 31/8",
    "start": "07:10",
    "end": "09:00",
    "timeLabel": "07:10–09:00",
    "title": "🥇 PRIMARY — Ximen → Yangmingshan → Xiaoyoukeng",
    "area": "Taipei → Yangmingshan",
    "categories": [
      "Di chuyển"
    ],
    "note": "Ăn sáng ở Ximen khoảng 06:30–07:00, mang 1 snack + nước. Primary: từ khu Ximen/Zhonghua Road North bắt bus 260 lên Yangmingshan Bus Terminal → đổi bus 108 → Xiaoyoukeng. Bus 260 đi qua MRT Ximen/Zhonghua Road North nên ít phải đi bộ/đổi tuyến. Nếu miss 260 hoặc ETA xấu thì dùng hàng BACKUP riêng.",
    "mapSearch": "Google Maps search: Muzik Hotel - Ximen Station Branch, Wanhua District, Taipei City, Taiwan → Zhonghua Rd. North / Ximen bus stop, Taipei City → Yangmingshan Bus Terminal, Beitou District, Taipei City, Taiwan → Xiaoyoukeng Recreation Area, Yangmingshan National Park, Beitou District, Taipei City, Taiwan. Transit: bus 260 → Yangmingshan Bus Terminal → bus 108 → Xiaoyoukeng.",
    "notionUrl": "https://app.notion.com/p/3afe8e18611981f4a6f5d9547fd7ce0c",
    "isBackup": false
  },
  {
    "id": "3cae8e18-6119-81c6-b04e-f19fc679d32c",
    "dayNumber": 2,
    "date": "2026-08-31",
    "dayLabel": "Ngày 2 · T2 31/8",
    "start": "07:10",
    "end": "09:00",
    "timeLabel": "07:10–09:00 · BACKUP",
    "title": "🔄 BACKUP — Ximen → Jiantan → R5 → Yangmingshan → Xiaoyoukeng",
    "area": "Taipei → Yangmingshan",
    "categories": [
      "Di chuyển"
    ],
    "note": "Dùng nếu vừa miss bus 260 hoặc live ETA 260 quá lâu. MRT Ximen → Zhongshan → đổi Red Line lên Jiantan → bus R5 (Red 5) tới Yangmingshan Bus Terminal → bus 108 tới Xiaoyoukeng. R5 chạy khá dày nên đây là backup public transport tốt.",
    "mapSearch": "Google Maps search: Ximen Station, Wanhua District, Taipei City, Taiwan → Zhongshan Station, Zhongshan District, Taipei City, Taiwan → Jiantan Station, Shilin District, Taipei City, Taiwan → Yangmingshan Bus Terminal, Beitou District, Taipei City, Taiwan → Xiaoyoukeng Recreation Area, Yangmingshan National Park. Transit: MRT → R5 → 108.",
    "notionUrl": "https://app.notion.com/p/3cae8e18611981c6b04ef19fc679d32c",
    "isBackup": true
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
    "note": "Ghé Xiaoyoukeng khoảng 40 phút để xem địa nhiệt, fumarole và chụp hình. Giữ pace gọn để còn thời gian qua Qingtiangang.",
    "mapSearch": "Google Maps search: Xiaoyoukeng Recreation Area, Yangmingshan National Park, Beitou District, Taipei City, Taiwan. Transit tiếp theo: bus 108 → Qingtiangang Grassland.",
    "notionUrl": "https://app.notion.com/p/3afe8e18611981c5ad30f8465b222982",
    "isBackup": false
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
    "note": "Qingtiangang là main visit của buổi sáng. Đi bộ/chụp hình thong thả nhưng khoảng 11:45 bắt đầu quay về bus stop để giữ buffer xuống Beitou và không ảnh hưởng booking The Gaia 14:30.",
    "mapSearch": "Google Maps search: Qingtiangang Grassland, Shilin District, Taipei City, Taiwan → Qingtiangang Bus Stop. Transit tới đây: bus 108 từ Xiaoyoukeng/Yangmingshan.",
    "notionUrl": "https://app.notion.com/p/3afe8e186119811ca7b4e3dd961eb964",
    "isBackup": false
  },
  {
    "id": "3afe8e18-6119-8174-a009-ffe7014c30d0",
    "dayNumber": 2,
    "date": "2026-08-31",
    "dayLabel": "Ngày 2 · T2 31/8",
    "start": "12:00",
    "end": "13:30",
    "timeLabel": "12:00–13:30",
    "title": "🥇 PRIMARY — Qingtiangang → Shilin → Beitou",
    "area": "Yangmingshan → Beitou",
    "categories": [
      "Di chuyển"
    ],
    "note": "Khoảng 11:45 quay lại bus stop, aim rời Qingtiangang khoảng 12:00. Primary: bus S15 → MRT Shilin → Red Line → Beitou. Nếu S15 vừa miss nhưng bus 108 sắp tới thì xem hàng BACKUP riêng. Nếu public transport delay nhiều và đe dọa booking The Gaia 14:30, taxi thẳng xuống Beitou/Gaia là emergency fallback.",
    "mapSearch": "Google Maps search: Qingtiangang Bus Stop, Shilin District, Taipei City, Taiwan → Shilin Station, Shilin District, Taipei City, Taiwan → Beitou Station, Beitou District, Taipei City, Taiwan. Transit PRIMARY: bus S15 → MRT Shilin → Red Line → Beitou.",
    "notionUrl": "https://app.notion.com/p/3afe8e1861198174a009ffe7014c30d0",
    "isBackup": false
  },
  {
    "id": "3cae8e18-6119-815a-826a-eeebdeaa2f2a",
    "dayNumber": 2,
    "date": "2026-08-31",
    "dayLabel": "Ngày 2 · T2 31/8",
    "start": "12:00",
    "end": "13:30",
    "timeLabel": "12:00–13:30 · BACKUP",
    "title": "🔄 BACKUP — Qingtiangang → Yangmingshan → Beitou",
    "area": "Yangmingshan → Beitou",
    "categories": [
      "Di chuyển"
    ],
    "note": "Dùng nếu vừa miss S15 nhưng bus 108 tới sớm. Đi 108 về Yangmingshan Bus Terminal → đổi 230 hoặc S9 xuống Beitou. Nếu route này bị delay quá nhiều, taxi thẳng xuống Beitou/Gaia để giữ booking 14:30.",
    "mapSearch": "Google Maps search: Qingtiangang Bus Stop, Shilin District, Taipei City, Taiwan → Yangmingshan Bus Terminal, Beitou District, Taipei City, Taiwan → Beitou Station, Beitou District, Taipei City, Taiwan. Transit BACKUP: 108 → Yangmingshan Bus Terminal → 230 hoặc S9 → Beitou.",
    "notionUrl": "https://app.notion.com/p/3cae8e186119815a826aeeebdeaa2f2a",
    "isBackup": true
  },
  {
    "id": "3afe8e18-6119-81f6-bede-c00c751f76ff",
    "dayNumber": 2,
    "date": "2026-08-31",
    "dayLabel": "Ngày 2 · T2 31/8",
    "start": "13:30",
    "end": "14:10",
    "timeLabel": "13:30–14:10",
    "title": "Yixin Dumpling & Beef Noodle → The Gaia shuttle",
    "area": "Beitou",
    "categories": [
      "Ăn uống",
      "Di chuyển"
    ],
    "note": "Xuống Beitou Station, đi bộ khoảng 3 phút từ Exit 1 tới 一心餃子牛肉麵專賣店 / Yixin Dumpling & Beef Noodle để ăn trưa nhanh. Rời quán khoảng 14:05–14:10, đi bộ khoảng 3 phút trở lại Beitou Station rồi dùng free shuttle của The Gaia Hotel tới hotel. Aim tới Gaia khoảng 14:20 để check-in thong thả trước booking 14:30. Nếu xuống Beitou trễ thì rút ngắn bữa trưa trước; taxi chỉ dùng nếu shuttle ETA xấu và có nguy cơ trễ booking.",
    "mapSearch": "Google Maps search: Beitou Station Exit 1, Beitou District, Taipei City, Taiwan → 一心餃子牛肉麵專賣店 / Yixin Dumpling & Beef Noodle, No. 43 Datong Street, Beitou District, Taipei City, Taiwan → Beitou Station → The Gaia Hotel Taipei, No. 1 Qiyan Road, Beitou District, Taipei City, Taiwan. Transit: walk ~3 min station → Yixin; walk ~3 min Yixin → Beitou Station; The Gaia free shuttle → hotel.",
    "notionUrl": "https://app.notion.com/p/3afe8e18611981f6bedec00c751f76ff",
    "isBackup": false
  },
  {
    "id": "3afe8e18-6119-81da-9390-ce948bc68e13",
    "dayNumber": 2,
    "date": "2026-08-31",
    "dayLabel": "Ngày 2 · T2 31/8",
    "start": "14:30",
    "end": "16:30",
    "timeLabel": "14:30–16:30",
    "title": "The Gaia Hotel · public hot spring + afternoon tea",
    "area": "Beitou",
    "categories": [
      "Nghỉ"
    ],
    "note": "Booking 14:30 cho public hot spring, 1 người. Afternoon tea đã chọn 15:45. Vào hot spring trước khoảng 50–60 phút rồi qua afternoon tea; aim rời The Gaia khoảng 16:30–16:45 để đi Dadaocheng.",
    "mapSearch": "Google Maps search: The Gaia Hotel Taipei, Beitou District, Taipei City, Taiwan. Booking: public hot spring 14:30; afternoon tea 15:45.",
    "notionUrl": "https://app.notion.com/p/3afe8e18611981da9390ce948bc68e13",
    "isBackup": false
  },
  {
    "id": "3afe8e18-6119-819d-8512-fb41d3f7dd4d",
    "dayNumber": 2,
    "date": "2026-08-31",
    "dayLabel": "Ngày 2 · T2 31/8",
    "start": "16:45",
    "end": "20:45",
    "timeLabel": "16:45–20:45",
    "title": "Dadaocheng sunset → Ningxia Night Market",
    "area": "Beitou → Dadaocheng → Ningxia",
    "categories": [
      "Tham quan",
      "Ăn uống"
    ],
    "note": "Khoảng 16:45 rời The Gaia. PRIMARY: hỏi/đặt trước shuttle miễn phí của The Gaia xuống MRT Beitou Station, rồi Red Line Beitou → Shuanglian. Tại Shuanglian: nếu Red33 ETA ≤5 phút thì bắt Red33 tới 大稻埕碼頭; nếu phải chờ lâu thì bắt 民生幹線 / Minsheng Trunk Line và xuống 民生西路口(大稻埕碼頭), đi bộ khoảng 3–6 phút ra Dadaocheng Wharf. Sau sunset, đi bộ lại trạm 民生西路口(大稻埕碼頭) → bắt 民生幹線 chiều đông → xuống 靜修高中, đi bộ khoảng 2 phút tới Ningxia Night Market. Khoảng 20:20–20:30 rời Ningxia: đi bộ khoảng 3 phút tới 民生重慶路口, mở Bus+ và bắt chuyến về phía Ximen trong nhóm 223 / 250 / 302 / 304重慶; xuống 中華路北站 rồi đi bộ rất ngắn về Muzik. Taxi chỉ emergency fallback nếu shuttle/public transport ETA xấu.",
    "mapSearch": "Google Maps search: The Gaia Hotel Taipei, No. 1 Qiyan Road, Beitou District, Taipei City, Taiwan → MRT Beitou Station → Shuanglian Station → Dadaocheng Wharf / 大稻埕碼頭 → Minsheng W. Rd. Entrance (Dadaocheng Wharf) / 民生西路口(大稻埕碼頭) → Blessed Imelda's School / 靜修高中 → Ningxia Night Market → Minsheng Chongqing Rd. Intersection / 民生重慶路口 → Zhonghua Rd. North / 中華路北站 → Muzik Hotel - Ximen Station Branch. Transit PRIMARY: Gaia shuttle → Red Line Beitou–Shuanglian → Red33 nếu ETA đẹp, nếu không dùng 民生幹線 → 民生幹線 tới Ningxia → 223/250/302/304重慶 về Ximen.",
    "notionUrl": "https://app.notion.com/p/3afe8e186119819d8512fb41d3f7dd4d",
    "isBackup": false
  },
  {
    "id": "3afe8e18-6119-813b-8ad5-e02be96f502c",
    "dayNumber": 3,
    "date": "2026-09-01",
    "dayLabel": "Ngày 3 · T3 1/9",
    "start": "05:30",
    "end": "06:40",
    "timeLabel": "05:30–06:40",
    "title": "🥇 PRIMARY — Muzik → bus 235 → Holy Family",
    "area": "Ximending → Da’an",
    "categories": [
      "Nghỉ",
      "Di chuyển"
    ],
    "note": "Rời Muzik khoảng 05:35–05:45. Đi bộ khoảng 5–7 phút tới trạm 西門市場(漢中) / Ximen Market (Hanzhong), bắt bus 235 hướng 國父紀念館. Xuống 溫州街口 / Wenzhou St. Entrance rồi đi bộ khoảng 6 phút tới Holy Family Catholic Church. Bus 235 chạy từ 05:15 ngày thường; mở Bus+ kiểm tra ETA trước khi rời hotel. Aim tới nhà thờ khoảng 06:25–06:35 cho lễ 06:45. Taxi chỉ dùng nếu bus bị delay bất thường.",
    "mapSearch": "Google Maps search: Muzik Hotel - Ximen Station Branch, No. 90 Section 1 Zhonghua Road, Wanhua District, Taipei City, Taiwan → Ximen Market (Hanzhong) / 西門市場(漢中) bus stop → Wenzhou St. Entrance / 溫州街口 bus stop → Holy Family Catholic Church, No. 50 Section 2 Xinsheng South Road, Da'an District, Taipei City, Taiwan. Transit PRIMARY: bus 235 toward 國父紀念館; walking mỗi đầu khoảng 5–7 phút.",
    "notionUrl": "https://app.notion.com/p/3afe8e186119813b8ad5e02be96f502c",
    "isBackup": false
  },
  {
    "id": "3cae8e18-6119-81da-974a-c1474316d19a",
    "dayNumber": 3,
    "date": "2026-09-01",
    "dayLabel": "Ngày 3 · T3 1/9",
    "start": "05:30",
    "end": "06:40",
    "timeLabel": "05:30–06:40 · BACKUP",
    "title": "🔄 BACKUP — Ximen → Dongmen → Holy Family bằng MRT",
    "area": "Ximending → Da’an",
    "categories": [
      "Di chuyển"
    ],
    "note": "Dùng nếu bus 235 ETA quá lâu. Từ Muzik đi bộ tới Ximen Station → Green Line tới Chiang Kai-Shek Memorial Hall → đổi Red Line tới Dongmen → đi bộ khoảng 7 phút tới Holy Family Catholic Church. Taxi chỉ là emergency fallback nếu đã sát giờ lễ.",
    "mapSearch": "Google Maps search: Muzik Hotel - Ximen Station Branch → Ximen Station → Chiang Kai-Shek Memorial Hall Station → Dongmen Station → Holy Family Catholic Church, No. 50 Section 2 Xinsheng South Road, Da'an District, Taipei City, Taiwan. Transit BACKUP: Green Line Ximen → Chiang Kai-Shek Memorial Hall; transfer Red Line → Dongmen; walk ~7 phút.",
    "notionUrl": "https://app.notion.com/p/3cae8e18611981da974ac1474316d19a",
    "isBackup": true
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
    "note": "Weekday Mass 06:45–07:15. Có mặt sớm vài phút để vào nhà thờ ổn định chỗ ngồi.",
    "mapSearch": "Google Maps search: Holy Family Catholic Church, Da'an District, Taipei City, Taiwan.",
    "notionUrl": "https://app.notion.com/p/3afe8e18611981ea96f1c1cec87fe4ed",
    "isBackup": false
  },
  {
    "id": "3afe8e18-6119-81c9-97dc-ff6c61c89029",
    "dayNumber": 3,
    "date": "2026-09-01",
    "dayLabel": "Ngày 3 · T3 1/9",
    "start": "07:15",
    "end": "08:10",
    "timeLabel": "07:15–08:10",
    "title": "🥇 PRIMARY — Holy Family → bus 568 → Longshan",
    "area": "Da’an → Wanhua",
    "categories": [
      "Tham quan",
      "Di chuyển"
    ],
    "note": "Tan lễ khoảng 07:15 thì đi thẳng Longshan, không ghé điểm khác. Đi bộ khoảng 6 phút tới trạm 溫州街口 / Wenzhou St. Entrance, bắt bus 568 hướng 萬華. Xuống 捷運龍山寺站 / MRT Longshan Temple Station rồi đi bộ ngắn tới Longshan Temple. 568 ngày thường có nhiều chuyến trong khung 07:00–08:10; check Bus+ live ETA khi tan lễ.",
    "mapSearch": "Google Maps search: Holy Family Catholic Church, No. 50 Section 2 Xinsheng South Road, Da'an District, Taipei City, Taiwan → Wenzhou St. Entrance / 溫州街口 bus stop → MRT Longshan Temple Station / 捷運龍山寺站 → Longshan Temple, Wanhua District, Taipei City, Taiwan. Transit PRIMARY: bus 568 toward 萬華.",
    "notionUrl": "https://app.notion.com/p/3afe8e18611981c997dcff6c61c89029",
    "isBackup": false
  },
  {
    "id": "3cae8e18-6119-81f2-8efb-f8d13ffda279",
    "dayNumber": 3,
    "date": "2026-09-01",
    "dayLabel": "Ngày 3 · T3 1/9",
    "start": "07:15",
    "end": "08:10",
    "timeLabel": "07:15–08:10 · BACKUP",
    "title": "🔄 BACKUP — Holy Family → Dongmen → Longshan bằng MRT",
    "area": "Da’an → Wanhua",
    "categories": [
      "Di chuyển"
    ],
    "note": "Nếu bus 568 ETA quá lâu: đi bộ khoảng 7 phút tới Dongmen Station → Orange Line tới Zhongxiao Xinsheng → đổi Blue/Bannan Line đi thẳng tới Longshan Station → đi bộ ngắn tới Longshan Temple. Taxi chỉ dùng nếu public transport delay nhiều.",
    "mapSearch": "Google Maps search: Holy Family Catholic Church → Dongmen Station → Zhongxiao Xinsheng Station → Longshan Temple Station → Longshan Temple. Transit BACKUP: Orange Line Dongmen → Zhongxiao Xinsheng; transfer Blue/Bannan Line → Longshan.",
    "notionUrl": "https://app.notion.com/p/3cae8e18611981f28efbf8d13ffda279",
    "isBackup": true
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
    "note": "Tham quan Longshan Temple, ăn sáng quanh khu Wanhua và chụp street photo. Giữ nhịp vừa phải để khoảng 09:30 bắt đầu đi Taipei Main.",
    "mapSearch": "Google Maps search: Longshan Temple, Wanhua District, Taipei City, Taiwan → Bopiliao Historic Block / Wanhua District, Taipei City, Taiwan → Longshan Temple Station.",
    "notionUrl": "https://app.notion.com/p/3afe8e186119816bbb95f3fe8e6d5cbe",
    "isBackup": false
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
    "note": "Từ Longshan đi Taipei Main bằng MRT. Dùng khoảng thời gian này làm cafe/buffer, nghỉ chân và xử lý nếu buổi sáng bị trễ nhẹ; aim sẵn sàng vào Taipei City Mall lúc 11:00.",
    "mapSearch": "Google Maps search: Longshan Temple Station, Wanhua District, Taipei City, Taiwan → Taipei Main Station, Zhongzheng District, Taipei City, Taiwan. Transit: Blue/Bannan Line Longshan → Taipei Main.",
    "notionUrl": "https://app.notion.com/p/3afe8e186119811ba795f1468c091fa7",
    "isBackup": false
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
    "note": "Browse game/figure/gadget ở Taipei City Mall. Rời khoảng 12:10 để ăn trưa nhanh và tới tour meeting point đúng giờ.",
    "mapSearch": "Google Maps search: Taipei City Mall, Zhongzheng District, Taipei City, Taiwan. Khu dưới lòng đất nối Taipei Main/Beimen; xem exit gần meeting point nhất trên Google Maps.",
    "notionUrl": "https://app.notion.com/p/3afe8e186119816d8956e03cda25a34d",
    "isBackup": false
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
    "note": "Ăn trưa nhanh gần Taipei Main/Taipei City Mall. Tour hiện dự kiến khởi hành khoảng 13:15 nên aim có mặt meeting point khoảng 13:00 để check-in. Khi có voucher, thay ngay meeting point bằng địa chỉ/exit chính xác và chọn route có walking ngắn nhất.",
    "mapSearch": "Google Maps search: Taipei City Mall, Zhongzheng District, Taipei City, Taiwan → tour meeting point tại Taipei Main Station/Taipei City. Target arrival ~13:00 for ~13:15 departure. Meeting point/exit cuối cùng lấy đúng theo voucher.",
    "notionUrl": "https://app.notion.com/p/3c3e8e18611981079da6fcaee4e89d05",
    "isBackup": false
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
    "note": "Tour chiều ưu tiên thứ tự Shifen → Shifen Waterfall khi còn sáng → Jiufen về chiều/tối để ngắm golden hour và đèn lồng. Kiểm tra voucher trước khi đi để xác nhận meeting point, giờ tập trung và điểm trả khách.",
    "mapSearch": "Google Maps search: tour meeting point tại Taipei Main Station/Taipei City → Shifen Old Street, Pingxi District, New Taipei City, Taiwan → Shifen Waterfall, Pingxi District, New Taipei City, Taiwan → Jiufen Old Street, Ruifang District, New Taipei City, Taiwan. Di chuyển theo tour.",
    "notionUrl": "https://app.notion.com/p/3c3e8e1861198132a7d2d922d1626899",
    "isBackup": false
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
    "note": "Chỉ đi Raohe nếu còn sức sau tour. Nếu tour trả khách gần Raohe thì ghé luôn; nếu trả ở Taipei Main và đã mệt thì về hotel nghỉ.",
    "mapSearch": "Google Maps search: Raohe Street Night Market, Songshan District, Taipei City, Taiwan → Muzik Hotel - Ximen Station Branch, Wanhua District, Taipei City, Taiwan. Chọn route live theo điểm tour drop-off thực tế.",
    "notionUrl": "https://app.notion.com/p/3afe8e1861198111a0aac162e641a912",
    "isBackup": false
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
    "note": "Ăn sáng, kiểm tra hành lý lần cuối và checkout. Aim rời Muzik khoảng 09:15 để có buffer ra sân bay.",
    "mapSearch": "Google Maps search: Muzik Hotel - Ximen Station Branch, Wanhua District, Taipei City, Taiwan.",
    "notionUrl": "https://app.notion.com/p/3afe8e186119810383d5d8d05279a3a9",
    "isBackup": false
  },
  {
    "id": "3afe8e18-6119-81e8-bc1c-ebd65ab00230",
    "dayNumber": 4,
    "date": "2026-09-02",
    "dayLabel": "Ngày 4 · T4 2/9",
    "start": "09:15",
    "end": "10:45",
    "timeLabel": "09:15–10:45",
    "title": "🥇 PRIMARY — Muzik → taxi A1 → TPE T1",
    "area": "Taipei → Taoyuan Airport",
    "categories": [
      "Di chuyển"
    ],
    "note": "Rời Muzik khoảng 09:15. Bắt taxi ngắn tới A1 Taipei Main Station để đỡ kéo vali, sau đó đi Taoyuan Airport MRT Express tới A12 Terminal 1. Aim tới sân bay khoảng 10:45.",
    "mapSearch": "Google Maps search: Muzik Hotel - Ximen Station Branch, Wanhua District, Taipei City, Taiwan → A1 Taipei Main Station, Taoyuan Airport MRT, Taipei City, Taiwan → A12 Airport Terminal 1 Station, Taoyuan Airport MRT, Dayuan District, Taoyuan City, Taiwan. Transit: taxi → A1; Airport MRT Express A1 → A12.",
    "notionUrl": "https://app.notion.com/p/3afe8e18611981e8bc1cebd65ab00230",
    "isBackup": false
  },
  {
    "id": "3cae8e18-6119-81b9-af6a-e7efb37080a1",
    "dayNumber": 4,
    "date": "2026-09-02",
    "dayLabel": "Ngày 4 · T4 2/9",
    "start": "09:15",
    "end": "10:45",
    "timeLabel": "09:15–10:45 · BACKUP",
    "title": "🔄 BACKUP — Ximen → Beimen → A1 → TPE T1 bằng MRT",
    "area": "Ximending → Taipei Main → Taoyuan Airport",
    "categories": [
      "Di chuyển"
    ],
    "note": "Dùng nếu taxi khó gọi hoặc traffic không thuận tiện. Từ Ximen đi Green Line 1 stop tới Beimen → đi theo bảng chỉ dẫn/đường ngầm tới A1 Taipei Main Station → Airport MRT Express tới A12 Terminal 1.",
    "mapSearch": "Google Maps search: Muzik Hotel - Ximen Station Branch, Wanhua District, Taipei City, Taiwan → Ximen Station → Beimen Station, Datong District, Taipei City, Taiwan → A1 Taipei Main Station, Taoyuan Airport MRT → A12 Airport Terminal 1 Station, Taoyuan Airport MRT. Transit BACKUP: MRT Ximen → Beimen → walk to A1 → Airport MRT Express A1 → A12.",
    "notionUrl": "https://app.notion.com/p/3cae8e18611981b9af6ae7efb37080a1",
    "isBackup": true
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
    "note": "Tới TPE Terminal 1 khoảng 10:45. Làm theo thứ tự: China Airlines check-in/gửi hành lý → security → xuất cảnh → tìm gate. Có buffer khoảng 3 giờ trước chuyến CI783 13:45.",
    "mapSearch": "Google Maps search: Taiwan Taoyuan International Airport Terminal 1, Dayuan District, Taoyuan City, Taiwan. Flight reference: China Airlines CI783 (TPE → SGN).",
    "notionUrl": "https://app.notion.com/p/3afe8e18611981fcbe34f6d32dd11ec8",
    "isBackup": false
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
    "note": "Bay thẳng CI783, giờ dự kiến 13:45–16:20. Theo dõi gate trên bảng sân bay/app hãng.",
    "mapSearch": "Google Maps search: Taiwan Taoyuan International Airport Terminal 1, Dayuan District, Taoyuan City, Taiwan → Tan Son Nhat International Airport - Terminal 2, Ho Chi Minh City, Vietnam. Flight: China Airlines CI783.",
    "notionUrl": "https://app.notion.com/p/3afe8e18611981028749d790db828c3e",
    "isBackup": false
  }
] as const satisfies readonly ItineraryItem[];
// </notion-data>

const clauseBoundary =
  /\s*(?:\|\s*|\.\s+)(?=(?:Flight(?:\s+reference)?|Transit(?:\s+(?:PRIMARY|BACKUP|after\s+visit|tiếp\s+theo))?|Nearby\s+area\s+keyword(?:\s+for\s+[^:]+)?|Next\s+transit\s+search|Exit\s+transit\s+search|Alternative\s+waypoint|Destination|Option\s+B|Tour\s+meeting\s+keyword|MRT\s+option|Return\s+search|Bus|MRT|Walk\s+route|Taxi\s+search|Di\s+chuyển)\s*:)/i;

function getLabeledClause(text: string, label: RegExp): string | undefined {
  const flags = label.flags.replace('g', '');
  const match = new RegExp(`(?:^|\\|\\s*|\\.\\s+)(?:${label.source})\\s*:\\s*`, flags).exec(text);
  if (!match) return undefined;

  const remainder = text.slice(match.index + match[0].length);
  const boundaryIndex = remainder.search(clauseBoundary);
  return cleanStop(boundaryIndex < 0 ? remainder : remainder.slice(0, boundaryIndex));
}

function getMapsPart(item: ItineraryItem): string | undefined {
  const labeled = getLabeledClause(
    item.mapSearch,
    /(?:(?:Google\s+)?Maps(?:\s+search(?:\s+option\s+A)?|\s+arrival|\s+để nhận diện điểm)?|Flight\s+search|Điểm đến(?:\s+trên\s+Maps)?)/i,
  );
  return labeled
    ? cleanStop(labeled.split(/\.\s+(?=(?:Khu\b|Chọn\b|Target\b|Meeting point\b|Di chuyển\b))/i)[0])
    : undefined;
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
  return /\b(?:TBD|TBA|UNKNOWN|PLACEHOLDER)\b/i.test(stop) || /\btour meeting point\b/i.test(stop);
}

function isAmbiguousOrigin(stop: string): boolean {
  return isPlaceholderStop(stop) || /\b(?:HOẶC|OR)\b/i.test(stop);
}

function isAmbiguousWaypoint(stop: string): boolean {
  return isPlaceholderStop(stop) || /\b(?:HOẶC|OR)\b/i.test(stop);
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
        /^(?:MRT(?:\s+(?:search|dự phòng))?|Bus(?:\s+search)?|Walk(?:\s+route)?|Taxi(?:\s+search)?|Transit(?:\s+(?:search|PRIMARY|BACKUP))?|Di chuyển)$/i.test(
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
  const explicitDestination = getLabeledClause(item.mapSearch, /Destination/i);
  const alternativeWaypoint = getLabeledClause(item.mapSearch, /Alternative\s+waypoint/i);
  const finalStop = item.mapSearch.match(/\|\s*Then\s*:\s*([^|]+)/i)?.[1];

  for (const appendedStop of [explicitDestination, finalStop && cleanStop(finalStop)]) {
    if (appendedStop && !mapStops.some((stop) => isSameStop(stop, appendedStop))) {
      mapStops.push(appendedStop);
    }
  }

  // A few activities include the return leg in the same Maps clause. When the activity
  // clearly names a preceding POI, keep that POI as the destination instead of the return.
  const lastStop = mapStops.at(-1);
  const isActivityExitStop = Boolean(
    lastStop?.toLocaleLowerCase().includes("bus stop") && !item.title.includes("→"),
  );
  const hasReturnDestination =
    Boolean(
      lastStop &&
        /\b(?:hotel|hostel|accommodation)\b/i.test(lastStop) &&
        !/\b(?:hotel|check-in|checkout|Ximen(?:ding)?)\b/i.test(item.title),
    ) ||
    isActivityExitStop ||
    (/\b(?:booked\s+)?tour\s+bus\b/i.test(item.mapSearch) && Boolean(lastStop && /Taipei\s+Main/i.test(lastStop)));
  if (lastStop && hasReturnDestination) {
    const titleWords = [...item.title.toLocaleLowerCase().matchAll(/[\p{L}\p{N}]{4,}/gu)].map((match) => match[0]);
    const finalMatchesTitle =
      !isActivityExitStop && titleWords.some((word) => lastStop.toLocaleLowerCase().includes(word));
    let matchingIndex = -1;
    if (!finalMatchesTitle) {
      for (let index = mapStops.length - 2; index >= 0; index -= 1) {
        if (titleWords.some((word) => mapStops[index].toLocaleLowerCase().includes(word))) {
          matchingIndex = index;
          break;
        }
      }
    }
    if (matchingIndex >= 0) mapStops.splice(matchingIndex + 1);
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

  if (/^Bay\b/i.test(item.title)) {
    return {
      destination,
      searchDestination,
      waypoints: [],
      directionsIssue: "Chặng bay không dùng Google Maps — hãy mở điểm đến sân bay",
    };
  }

  if (
    (/(?:tour transport|di chuyển (?:trong|theo) tour)/i.test(item.mapSearch) &&
      /voucher|tour/i.test(`${item.title} ${item.note}`)) ||
    (/\b(?:booked\s+)?tour\s+bus\b/i.test(item.mapSearch) && /voucher|tour/i.test(`${item.title} ${item.note}`))
  ) {
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

  const hasAmbiguousWaypoint = Boolean(alternativeWaypoint) || plannedStops.slice(1, -1).some(isAmbiguousWaypoint);
  if (hasAmbiguousWaypoint) {
    return {
      destination,
      searchDestination,
      waypoints: [],
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
  const transitClause = getLabeledClause(item.mapSearch, /Transit(?:\s+(?:PRIMARY|BACKUP|after\s+visit))?/i);
  const hasPlannedTaxi =
    /^(?:taxi|Uber)\b/i.test(transitClause ?? "") ||
    /(?:ưu tiên|gọi|đi|là)\s+taxi\s*\/\s*Uber|taxi\s*\/\s*Uber\s+(?:thẳng|tới|recommended|là gọn nhất)|taxi\s+tiện hơn|bằng\s+taxi|taxi\s+từ/i.test(
      guidanceText,
    );
  const hasTransitInClause = /\b(?:MRT|bus|train|metro|shuttle)\b|(?:Blue|Bannan|Red|Green|Orange|Brown|Yellow)\s+Line/i.test(
    transitClause ?? "",
  );
  const hasTransitGuidance =
    /\b(?:MRT|bus|train|metro|shuttle)\b|(?:Blue(?:\s*\/\s*Bannan)?|Bannan|Red|Green|Orange|Brown|Yellow)\s+Line/i.test(
      guidanceText,
    );
  let travelMode: "walking" | "driving" | "transit" | undefined;
  if (
    /International Airport Terminal\s+\d+\s*→\s*Airport Terminal\s+\d+\s+Station/i.test(routeText) ||
    (/Nhập cảnh \+ lấy hành lý/i.test(item.title) && /Airport Terminal.*→.*Airport.*Station/i.test(routeText))
  ) {
    travelMode = "walking";
  } else if (/meeting point tour/i.test(item.title)) {
    travelMode = "walking";
  } else if (hasPlannedTaxi && hasTransitInClause) {
    travelMode = "transit";
  } else if (hasPlannedTaxi) {
    travelMode = "driving";
  } else if (
    !/Flight|bay/i.test(routeText) && Boolean(route.plannedOrigin) && hasTransitGuidance
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

