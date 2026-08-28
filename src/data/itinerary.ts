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

export const itineraryExportedAt = "2026-08-28T01:48:45.123Z";

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
    "note": "Tại TPE Terminal 1 Station (A12), lên Taoyuan Airport MRT Express đi thẳng A1 Taipei Main Station, không đổi tàu. Xuống A1 ưu tiên đi theo biển Taxi tới taxi stand rồi bắt taxi ngắn về Muzik Hotel để đỡ kéo vali; budget khoảng NT\\$100–130. Nếu taxi stand đông/khó lấy xe thì xem hàng BACKUP MRT riêng.",
    "mapSearch": "Google Maps search: A12 Airport Terminal 1 Station, Taoyuan Airport MRT, Dayuan District, Taoyuan City, Taiwan → A1 Taipei Main Station, Taoyuan Airport MRT, Taipei City, Taiwan → Muzik Hotel - Ximen Station Branch, Wanhua District, Taipei City, Taiwan. Transit: Taoyuan Airport MRT Express A12 → A1; then official taxi stand / metered taxi to hotel.",
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
    "title": "🔄 BACKUP — A1 → Ximen → Muzik bằng MRT",
    "area": "Taipei Main → Ximending",
    "categories": [
      "Di chuyển"
    ],
    "note": "Dùng khi taxi stand ở A1 quá đông/khó lấy xe và bạn chấp nhận kéo vali thêm. Từ A1 đi theo biển kết nối Taipei Metro/Taipei Main Station → Blue/Bannan Line 1 stop tới Ximen → Exit 6 → đi bộ khoảng 5 phút tới Muzik Hotel.",
    "mapSearch": "Google Maps search: A1 Taipei Main Station, Taoyuan Airport MRT, Taipei City, Taiwan → Taipei Main Station (BL12), Zhongzheng District, Taipei City, Taiwan → Ximen Station (BL11/G12), Wanhua District, Taipei City, Taiwan → Muzik Hotel - Ximen Station Branch, Wanhua District, Taipei City, Taiwan. Transit: connect from A1 to Taipei Metro Taipei Main Station → Blue/Bannan Line to Ximen → walk to hotel.",
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
    "note": "Check-in nhanh, để hành lý và chỉ mang daily bag. Mục tiêu rời hotel khoảng 18:15 để đi thẳng Taipei 101 trước; không ghé Syntrend lúc này.",
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
    "end": "19:50",
    "timeLabel": "18:40–19:50",
    "title": "Taipei 101 Observatory",
    "area": "Xinyi",
    "categories": [
      "Tham quan"
    ],
    "note": "Rời Muzik Hotel khoảng 18:15. Từ Ximen Station đi Green Line tới Chiang Kai-Shek Memorial Hall → đổi Red Line hướng Xiangshan → xuống Taipei 101/World Trade Center. Ưu tiên lên Observatory trước để ngắm cảnh sớm hơn; khoảng 19:50 rời 101 để qua khu Syntrend/Guanghua.",
    "mapSearch": "Google Maps search: Muzik Hotel - Ximen Station Branch, Wanhua District, Taipei City, Taiwan → Ximen Station, Wanhua District, Taipei City, Taiwan → Chiang Kai-Shek Memorial Hall Station, Zhongzheng District, Taipei City, Taiwan → Taipei 101/World Trade Center Station, Xinyi District, Taipei City, Taiwan → Taipei 101 Observatory, Xinyi District, Taipei City, Taiwan. Transit: Taipei MRT Green Line Ximen → Chiang Kai-Shek Memorial Hall; transfer to Red Line toward Xiangshan → Taipei 101/World Trade Center.",
    "notionUrl": "https://app.notion.com/p/3afe8e18611981508454ebc23d81cde6",
    "isBackup": false
  },
  {
    "id": "3afe8e18-6119-81bc-a163-c6aec473b4ba",
    "dayNumber": 1,
    "date": "2026-08-30",
    "dayLabel": "Ngày 1 · CN 30/8",
    "start": "20:15",
    "end": "20:50",
    "timeLabel": "20:15–20:50",
    "title": "Syntrend Creative Park + Guanghua Digital Plaza",
    "area": "Zhongxiao Xinsheng",
    "categories": [
      "Tech",
      "Mua sắm"
    ],
    "note": "Từ Taipei 101/World Trade Center Station đi Red Line tới Dongmen → đổi Orange Line tới Zhongxiao Xinsheng → Exit 1, đi bộ khoảng 5 phút. Vì Guanghua thường đóng sớm hơn Syntrend, ưu tiên Guang Hua Digital Plaza trước rồi Syntrend. Aim khoảng 20:50 xuống Syntrend B2 ăn tối nếu chưa ăn ở Taipei 101; Linjiang/Tonghua đã bỏ khỏi ngày 1 để giảm di chuyển.",
    "mapSearch": "Google Maps search: Taipei 101 Observatory, Xinyi District, Taipei City, Taiwan → Taipei 101/World Trade Center Station, Xinyi District, Taipei City, Taiwan → Dongmen Station, Da'an District, Taipei City, Taiwan → Zhongxiao Xinsheng Station, Zhongzheng District, Taipei City, Taiwan → Guang Hua Digital Plaza, No. 8 Section 3 Civic Boulevard, Zhongzheng District, Taipei City, Taiwan → Syntrend Creative Park, No. 2 Section 3 Civic Boulevard, Zhongzheng District, Taipei City, Taiwan. Transit: Red Line Taipei 101/World Trade Center → Dongmen; transfer to Orange Line → Zhongxiao Xinsheng Exit 1; walk about 5 minutes.",
    "notionUrl": "https://app.notion.com/p/3afe8e18611981bca163c6aec473b4ba",
    "isBackup": false
  },
  {
    "id": "3afe8e18-6119-81b7-a09b-e0e7f62b2873",
    "dayNumber": 1,
    "date": "2026-08-30",
    "dayLabel": "Ngày 1 · CN 30/8",
    "start": "20:50",
    "end": "22:00",
    "timeLabel": "20:50–22:00",
    "title": "Ăn tối Syntrend B2 → MRT về Ximen",
    "area": "Zhongxiao Xinsheng → Ximending",
    "categories": [
      "Ăn uống",
      "Di chuyển"
    ],
    "note": "Bỏ Linjiang/Tonghua khỏi ngày 1 để đỡ chạy và giảm taxi. Sau khi ưu tiên Guanghua + Syntrend, aim xuống B2 khoảng 20:50 nếu chưa ăn; ăn xong đi bộ lại Zhongxiao Xinsheng Station → Blue/Bannan Line đi thẳng tới Ximen. Nếu đói sớm thì ăn Taipei 101 B1 trước khi qua Syntrend, sau đó chỉ shopping rồi về Ximen. Taxi chỉ optional nếu quá mệt/mưa.",
    "mapSearch": "Google Maps search: Syntrend Creative Park, No. 2 Section 3 Civic Boulevard, Zhongzheng District, Taipei City, Taiwan → Zhongxiao Xinsheng Station, Zhongzheng District, Taipei City, Taiwan → Ximen Station, Wanhua District, Taipei City, Taiwan → Muzik Hotel - Ximen Station Branch, Wanhua District, Taipei City, Taiwan. Transit: Taipei MRT Blue/Bannan Line Zhongxiao Xinsheng → Ximen, direct.",
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
    "note": "Ăn sáng ở Ximen khoảng 06:30–07:00, mang 1 snack + nước. Primary: từ khu Ximen/Zhonghua Road North bắt bus 260 lên Yangmingshan Bus Terminal → đổi bus 108 → Xiaoyoukeng. Bus 260 đi qua MRT Ximen/Zhonghua Road North nên ít phải đi bộ/đổi tuyến. Nếu miss 260 hoặc ETA xấu thì dùng hàng BACKUP MRT + R5 riêng.",
    "mapSearch": "Google Maps search: Muzik Hotel - Ximen Station Branch, Wanhua District, Taipei City, Taiwan → Ximen Station, Wanhua District, Taipei City, Taiwan → Yangmingshan Bus Terminal, Beitou District, Taipei City, Taiwan → Xiaoyoukeng Recreation Area, Yangmingshan National Park, Beitou District, Taipei City, Taiwan. Transit: bus 260 → Yangmingshan Bus Terminal; bus 108 → Xiaoyoukeng Service Center.",
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
    "mapSearch": "Google Maps search: Ximen Station, Wanhua District, Taipei City, Taiwan → Zhongshan Station, Zhongshan District, Taipei City, Taiwan → Jiantan Station, Shilin District, Taipei City, Taiwan → Yangmingshan Bus Terminal, Beitou District, Taipei City, Taiwan → Xiaoyoukeng Recreation Area, Yangmingshan National Park, Beitou District, Taipei City, Taiwan. Transit: Green Line Ximen → Zhongshan; transfer Red Line → Jiantan; bus R5/Red 5 → Yangmingshan; bus 108 → Xiaoyoukeng.",
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
    "note": "Ở Xiaoyoukeng khoảng 30–40 phút là đủ: xem fumarole/địa nhiệt, chụp hình rồi quay lại trạm bus. Trước khi đi bộ xa khỏi trạm, nhìn giờ bus 108 kế tiếp để khỏi chờ lâu. Sau đó bắt 108 tiếp tục tới Qingtiangang.",
    "mapSearch": "Google Maps search: Xiaoyoukeng Recreation Area, Yangmingshan National Park, Beitou District, Taipei City, Taiwan. Next transit search: Xiaoyoukeng Service Center, Yangmingshan National Park, Taipei City, Taiwan → Qingtiangang, Yangmingshan National Park, Taipei City, Taiwan. Bus: 108.",
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
    "note": "Bus 108 sẽ đưa tới Qingtiangang. Dành phần lớn thời gian ở đồng cỏ + viewpoint gần visitor center. Khoảng 11:45 bắt đầu quay về khu bus stop để 12:00 có thể rời đi; đừng đợi sát giờ mới xếp hàng.",
    "mapSearch": "Google Maps search: Qingtiangang Grassland (擎天崗草原), Yangmingshan National Park, Shilin District, Taipei City, Taiwan. Exit transit search: Qingtiangang bus stop, Shilin District, Taipei City, Taiwan → Shilin Station, Shilin District, Taipei City, Taiwan. Bus: S15.",
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
    "note": "Khoảng 11:45 bắt đầu quay về Qingtiangang bus stop và mở live ETA. Nếu S15 sắp tới/chờ ngắn thì lấy S15 → MRT Shilin Station → Red Line đi thẳng Beitou. Đây là primary vì route đơn giản và không phải vòng xuống Jiantan. Nếu vừa miss S15 thì xem hàng BACKUP riêng; nếu cả public options đều chờ lâu và có nguy cơ trễ Gaia thì taxi thẳng xuống Beitou/Wu Jia là emergency fallback.",
    "mapSearch": "Google Maps search: Qingtiangang Grassland (擎天崗草原), Shilin District, Taipei City, Taiwan → Qingtiangang Bus Stop, Shilin District, Taipei City, Taiwan → Shilin Station, Shilin District, Taipei City, Taiwan → Beitou Station, Beitou District, Taipei City, Taiwan. Transit: bus S15 Qingtiangang → MRT Shilin; Taipei MRT Red Line Shilin → Beitou.",
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
    "note": "Dùng nếu vừa miss S15 nhưng 108 đang tới sớm. Bắt 108 từ Qingtiangang về Yangmingshan Bus Terminal → check live ETA 230 hoặc S9 hướng Beitou → xuống MRT Beitou. Chỉ chọn backup này khi connection 230/S9 đẹp; nếu cả S15 lẫn route này đều phải chờ lâu và có nguy cơ trễ Gaia thì taxi thẳng Beitou/Wu Jia là emergency fallback.",
    "mapSearch": "Google Maps search: Qingtiangang Bus Stop, Shilin District, Taipei City, Taiwan → Yangmingshan Bus Terminal, Beitou District, Taipei City, Taiwan → Beitou Station, Beitou District, Taipei City, Taiwan. Transit: bus 108 Qingtiangang → Yangmingshan Bus Terminal; then bus 230 or S9 → MRT Beitou Station.",
    "notionUrl": "https://app.notion.com/p/3cae8e186119815a826aeeebdeaa2f2a",
    "isBackup": true
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
    "note": "13:30–14:20 ăn trưa ở Wu Jia Beef Noodles. Ăn xong khoảng 14:20 gọi taxi tới The Gaia Hotel; chặng này ngắn nên taxi tiện hơn MRT. Budget khoảng NT\\$100–130. Aim tới Gaia trước 14:35 để có thời gian thay đồ.",
    "mapSearch": "Google Maps search: Wu Jia Beef Noodles (吳家牛肉麵店), No. 224, Sec. 1, Zhongyang N. Rd., Beitou District, Taipei City, Taiwan → The Gaia Hotel, No. 1, Qiyan Rd., Beitou District, Taipei City, Taiwan. Transit: taxi/Uber.",
    "notionUrl": "https://app.notion.com/p/3afe8e18611981f6bedec00c751f76ff",
    "isBackup": false
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
    "mapSearch": "Google Maps search: The Gaia Hotel, No. 1, Qiyan Rd., Beitou District, Taipei City, Taiwan.",
    "notionUrl": "https://app.notion.com/p/3afe8e18611981da9390ce948bc68e13",
    "isBackup": false
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
    "note": "16:30 rời Gaia → ưu tiên taxi/Uber đi thẳng Dadaocheng Wharf để đỡ đổi MRT và giữ golden hour; budget khoảng NT\\$320–380. Aim tới khoảng 17:10–17:30, đi dạo/ngắm golden hour; sunset khoảng 18:14. Sau đó đi bộ/taxi ngắn sang Ningxia Night Market và ăn tối khoảng 18:50–20:45.",
    "mapSearch": "Google Maps search: The Gaia Hotel, No. 1, Qiyan Rd., Beitou District, Taipei City, Taiwan → Dadaocheng Wharf (大稻埕碼頭), Datong District, Taipei City, Taiwan → Ningxia Night Market, Datong District, Taipei City, Taiwan. Transit: taxi/Uber Gaia → Dadaocheng Wharf.",
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
    "title": "🥇 PRIMARY — Ximen → Holy Family Catholic Church bằng MRT",
    "area": "Ximending → Da’an",
    "categories": [
      "Nghỉ",
      "Di chuyển"
    ],
    "note": "05:30 dậy và chuẩn bị. Aim rời hotel khoảng 05:45–05:50 để tới Ximen Station trước/around 06:00. Đi MRT Ximen (G12) → Chiang Kai-Shek Memorial Hall (G10/R08) → đổi Red Line → Daan Park (R06) → đi bộ tới Holy Family Catholic Church. Aim tới khoảng 06:20–06:30, còn buffer trước Mass 06:45. Nếu rời hotel muộn, mưa lớn hoặc MRT có vấn đề thì dùng hàng BACKUP taxi riêng.",
    "mapSearch": "Google Maps search: Muzik Hotel - Ximen Station Branch, Wanhua District, Taipei City, Taiwan → Ximen Station, Wanhua District, Taipei City, Taiwan → Chiang Kai-Shek Memorial Hall Station, Zhongzheng District, Taipei City, Taiwan → Daan Park Station, Da'an District, Taipei City, Taiwan → Holy Family Catholic Church, Taipei (台北聖家堂), No. 50, Sec. 2, Xinsheng S. Rd., Da'an District, Taipei City, Taiwan. Transit: Taipei MRT Green Line Ximen → Chiang Kai-Shek Memorial Hall; transfer to Red Line → Daan Park; then walk to church.",
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
    "title": "🔄 BACKUP — Muzik → Holy Family bằng taxi",
    "area": "Ximending → Da’an",
    "categories": [
      "Di chuyển"
    ],
    "note": "Taxi chỉ là fallback, không phải mặc định. Dùng nếu rời hotel muộn khoảng sau 06:10–06:15, mưa lớn, MRT có vấn đề hoặc thấy có nguy cơ trễ Mass 06:45. Đi thẳng Muzik Hotel → Holy Family Catholic Church.",
    "mapSearch": "Google Maps search: Muzik Hotel - Ximen Station Branch, Wanhua District, Taipei City, Taiwan → Holy Family Catholic Church, Taipei (台北聖家堂), No. 50, Sec. 2, Xinsheng S. Rd., Da'an District, Taipei City, Taiwan. Transit: taxi/Uber direct.",
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
    "note": "Dự weekday Mass 06:45–07:15. Theo lịch hiện tại đây không phải English Mass, nhiều khả năng dùng tiếng Hoa/Mandarin. Tới sớm 10–15 phút, ngồi yên tham dự lễ; sau lễ ra ngoài mới chuyển sang điểm tiếp theo.",
    "mapSearch": "Google Maps search: Holy Family Catholic Church, Taipei (台北聖家堂), No. 50, Sec. 2, Xinsheng S. Rd., Da'an District, Taipei City, Taiwan.",
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
    "title": "🥇 PRIMARY — Daan/Qingtian → Longshan bằng taxi",
    "area": "Da’an → Wanhua",
    "categories": [
      "Tham quan",
      "Di chuyển"
    ],
    "note": "Sau lễ chỉ chọn 1 điểm: Daan Forest Park hoặc Qingtian Street. Đi khoảng 20–25 phút rồi rời khu Da’an. Primary là taxi/Uber tới Longshan để giảm đi bộ + đổi MRT; budget khoảng NT\\$180–220. Nếu muốn tiết kiệm tiền/còn nhiều sức thì dùng hàng BACKUP MRT riêng.",
    "mapSearch": "Google Maps search: Holy Family Catholic Church, Taipei, Da'an District, Taipei City, Taiwan → Daan Forest Park, Da'an District, Taipei City, Taiwan. Alternative waypoint: Qingtian Street, Da'an District, Taipei City, Taiwan. Destination: Bangka Lungshan Temple (艋舺龍山寺), Wanhua District, Taipei City, Taiwan. Transit after visit: taxi/Uber to Longshan.",
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
    "title": "🔄 BACKUP — Daan/Dongmen → Longshan bằng MRT",
    "area": "Da’an → Wanhua",
    "categories": [
      "Di chuyển"
    ],
    "note": "Dùng nếu muốn tiết kiệm taxi và chấp nhận đi bộ/đổi line nhiều hơn. Nếu đang gần Daan Park: Red Line → Taipei Main → đổi Blue Line → Longshan Temple. Nếu đang gần Qingtian/Dongmen: đi tới Dongmen → Orange Line tới Zhongxiao Xinsheng → đổi Blue Line → Longshan Temple. Chọn route live nào Google Maps báo ít đi bộ/nhanh hơn lúc đó.",
    "mapSearch": "Google Maps search option A: Daan Park Station, Da'an District, Taipei City, Taiwan → Taipei Main Station, Zhongzheng District, Taipei City, Taiwan → Longshan Temple Station, Wanhua District, Taipei City, Taiwan. Option B: Dongmen Station, Da'an District, Taipei City, Taiwan → Zhongxiao Xinsheng Station, Zhongzheng District, Taipei City, Taiwan → Longshan Temple Station, Wanhua District, Taipei City, Taiwan.",
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
    "note": "Tới Longshan khoảng 08:10. Tham quan temple trước rồi ăn sáng quanh Wanhua/Dongsanshui Street Market; sau đó đi bộ chụp phố cũ gần đó. Không cần ép ghé Bopiliao nếu không hứng thú. Aim rời khu khoảng 09:30.",
    "mapSearch": "Google Maps search: Bangka Lungshan Temple (艋舺龍山寺), Wanhua District, Taipei City, Taiwan. Nearby area keyword for breakfast/street photos: Wanhua District, Taipei City, Taiwan.",
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
    "note": "Từ Longshan Temple Station lên Blue/Bannan Line đi thẳng 2 stops tới Taipei Main Station, không đổi tuyến. Tới sớm thì nghỉ/cafe gần ga; đây là buffer trước khi Taipei City Mall mở 11:00.",
    "mapSearch": "Google Maps search: Bangka Lungshan Temple (艋舺龍山寺), Wanhua District, Taipei City, Taiwan → Taipei Main Station, Zhongzheng District, Taipei City, Taiwan.",
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
    "note": "11:00 vào Taipei City Mall, ưu tiên khu game/figure/gashapon/gadget. Khoảng 11:50–12:00 bắt đầu để ý giờ và search chỗ ăn. Ưu tiên 大稻埕魯肉飯 (Dadaocheng Braised Pork Rice) gần khu Taipei Main/Y Underground Mall; nếu đông thì chọn quán nhanh gần City Mall.",
    "mapSearch": "Google Maps search: Taipei City Mall (台北地下街), B1, No. 100, Section 1, Shimin Blvd., Zhongzheng District, Taipei City, Taiwan.",
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
    "note": "12:10 rời City Mall và ăn trưa nhanh. Ưu tiên 大稻埕魯肉飯 nếu vị trí meeting point tour thuận tiện; ăn xong đi toilet, mua nước/snack rồi đi tới điểm đón. Aim có mặt 12:45–12:50, không canh sát 13:15.",
    "mapSearch": "Google Maps search: Taipei City Mall (台北地下街), Zhongzheng District, Taipei City, Taiwan → Dadaocheng Braised Pork Rice (大稻埕魯肉飯), No. 17, Lane 220, Chang'an W. Rd., Datong District, Taipei City, Taiwan → Taipei Main Station East Gate 3 (台北車站東三門), Zhongzheng District, Taipei City, Taiwan. Tour meeting keyword: FamilyMart near Taipei Main Station East Gate 3.",
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
    "note": "Tour dự kiến pickup 13:15. Ưu tiên route Shifen/Waterfall trước khi còn sáng → Jiufen sau để bắt golden hour + đèn lồng. Dự kiến về Taipei khoảng 20:30. Giờ pickup, meeting point và drop-off vẫn để TBD cho tới khi có link/voucher tour thật; lúc đó update lại theo voucher.",
    "mapSearch": "Google Maps search: Taipei Main Station East Gate 3 (台北車站東三門), Zhongzheng District, Taipei City, Taiwan → Shifen Old Street, Pingxi District, New Taipei City, Taiwan → Shifen Waterfall, Pingxi District, New Taipei City, Taiwan → Jiufen Old Street, Ruifang District, New Taipei City, Taiwan → Taipei Main Station, Zhongzheng District, Taipei City, Taiwan. Transit: booked tour bus.",
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
    "note": "Nếu tour về Taipei khoảng 20:30 và còn sức thì đi Raohe ăn tối/ăn đêm khoảng 21:00–22:30. Nếu drop-off ở Ximen thì đi Green Line thẳng tới Songshan; nếu drop-off ở chỗ khác thì mở Google Maps từ đúng điểm thả tour. Nếu quá mệt thì bỏ Raohe, không ảnh hưởng phần chính của ngày.",
    "mapSearch": "Google Maps search: Taipei Main Station, Zhongzheng District, Taipei City, Taiwan → Raohe Night Market, Songshan District, Taipei City, Taiwan → Muzik Hotel - Ximen Station Branch, Wanhua District, Taipei City, Taiwan.",
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
    "note": "07:30 ăn sáng gần hotel → về kiểm tra passport, ví/thẻ, điện thoại, sạc, đồ mua và cân lại hành lý nếu cần → checkout. Aim rời hotel đúng 09:15; đừng kéo bữa sáng quá lâu.",
    "mapSearch": "Google Maps search: Muzik Hotel - Ximen Station Branch, Wanhua District, Taipei City, Taiwan. Nearby area keyword: Ximending, Wanhua District, Taipei City, Taiwan.",
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
    "note": "09:15 rời hotel. Vì có vali, primary là taxi từ Muzik Hotel thẳng A1 Taipei Main Station, budget khoảng NT\\$100–130 → lên Taoyuan Airport MRT Express A1 đi thẳng A12 Terminal 1. Nếu taxi khó gọi/traffic xấu thì dùng hàng BACKUP MRT riêng.",
    "mapSearch": "Google Maps search: Muzik Hotel - Ximen Station Branch, Wanhua District, Taipei City, Taiwan → A1 Taipei Main Station, Taoyuan Airport MRT, Taipei City, Taiwan → A12 Airport Terminal 1 Station, Taoyuan Airport MRT, Dayuan District, Taoyuan City, Taiwan → Taiwan Taoyuan International Airport Terminal 1, Dayuan District, Taoyuan City, Taiwan. Transit: taxi hotel → A1; Taoyuan Airport MRT Express A1 → A12.",
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
    "note": "Dùng nếu taxi khó gọi/traffic xấu hoặc muốn tiết kiệm. Từ Ximen đi Green Line 1 stop tới Beimen → theo bảng chỉ dẫn/underground connection tới A1 Taipei Main Station → Taoyuan Airport MRT Express A1 → A12 Terminal 1. Có vali nên chặng đi bộ underground sẽ nhiều hơn primary taxi.",
    "mapSearch": "Google Maps search: Muzik Hotel - Ximen Station Branch, Wanhua District, Taipei City, Taiwan → Ximen Station, Wanhua District, Taipei City, Taiwan → Beimen Station, Datong District, Taipei City, Taiwan → A1 Taipei Main Station, Taoyuan Airport MRT, Taipei City, Taiwan → A12 Airport Terminal 1 Station, Taoyuan Airport MRT, Dayuan District, Taoyuan City, Taiwan → Taiwan Taoyuan International Airport Terminal 1, Dayuan District, Taoyuan City, Taiwan. Transit: Green Line Ximen → Beimen; walk via underground connection to A1; Taoyuan Airport MRT Express A1 → A12.",
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
    "note": "Tới TPE Terminal 1 khoảng 10:45. Làm theo thứ tự: tìm quầy China Airlines → check-in/gửi hành lý → security → exit immigration → tìm gate. Sau khi qua security có thể ăn nhẹ/lunch khoảng 11:30–12:15 rồi ra gate sớm.",
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
    "note": "CI783 bay 13:45–16:20 về SGN. Có mặt ở gate trước boarding; giữ passport + boarding pass trong túi dễ lấy. Hạ cánh SGN Terminal 2 rồi làm nhập cảnh/lấy hành lý như bình thường.",
    "mapSearch": "Google Maps search: Taiwan Taoyuan International Airport Terminal 1, Dayuan District, Taoyuan City, Taiwan → Tan Son Nhat International Airport - Terminal 2, Ho Chi Minh City, Vietnam. Flight: China Airlines CI783 (TPE → SGN).",
    "notionUrl": "https://app.notion.com/p/3afe8e18611981028749d790db828c3e",
    "isBackup": false
  }
] as const satisfies readonly ItineraryItem[];
// </notion-data>

const clauseBoundary =
  /\s*(?:\|\s*|\.\s+)(?=(?:Flight(?:\s+reference)?|Transit|Nearby\s+area\s+keyword(?:\s+for\s+[^:]+)?|Next\s+transit\s+search|Exit\s+transit\s+search|Alternative\s+waypoint|Destination|Option\s+B|Tour\s+meeting\s+keyword|MRT\s+option|Return\s+search|Bus|MRT|Walk\s+route|Taxi\s+search|Di\s+chuyển)\s*:)/i;

function getLabeledClause(text: string, label: RegExp): string | undefined {
  const flags = label.flags.replace('g', '');
  const match = new RegExp(`(?:^|\\|\\s*|\\.\\s+)(?:${label.source})\\s*:\\s*`, flags).exec(text);
  if (!match) return undefined;

  const remainder = text.slice(match.index + match[0].length);
  const boundaryIndex = remainder.search(clauseBoundary);
  return cleanStop(boundaryIndex < 0 ? remainder : remainder.slice(0, boundaryIndex));
}

function getMapsPart(item: ItineraryItem): string | undefined {
  return getLabeledClause(
    item.mapSearch,
    /(?:(?:Google\s+)?Maps(?:\s+search(?:\s+option\s+A)?|\s+arrival|\s+để nhận diện điểm)?|Flight\s+search|Điểm đến(?:\s+trên\s+Maps)?)/i,
  );
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
  const hasReturnDestination =
    Boolean(
      lastStop &&
        /\b(?:hotel|hostel|accommodation)\b/i.test(lastStop) &&
        !/\b(?:hotel|check-in|checkout|Ximen(?:ding)?)\b/i.test(item.title),
    ) ||
    (/\b(?:booked\s+)?tour\s+bus\b/i.test(item.mapSearch) && Boolean(lastStop && /Taipei\s+Main/i.test(lastStop)));
  if (lastStop && hasReturnDestination) {
    const titleWords = [...item.title.toLocaleLowerCase().matchAll(/[\p{L}\p{N}]{4,}/gu)].map((match) => match[0]);
    const finalMatchesTitle = titleWords.some((word) => lastStop.toLocaleLowerCase().includes(word));
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
    /(?:tour transport|di chuyển trong tour)[^.|]*(?:voucher|theo xe|follow)/i.test(item.mapSearch) ||
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
  const transitClause = getLabeledClause(item.mapSearch, /Transit(?:\s+after\s+visit)?/i);
  const hasPlannedTaxi =
    /^(?:taxi|Uber)\b/i.test(transitClause ?? "") ||
    /(?:ưu tiên|gọi|đi|là)\s+taxi\s*\/\s*Uber|taxi\s*\/\s*Uber\s+(?:thẳng|tới|recommended|là gọn nhất)|taxi\s+tiện hơn|bằng\s+taxi|taxi\s+từ/i.test(
      guidanceText,
    );
  const hasTransitInClause = /\b(?:MRT|bus|train|metro)\b|(?:Blue|Bannan|Red|Green|Orange|Brown|Yellow)\s+Line/i.test(
    transitClause ?? "",
  );
  const hasTransitGuidance =
    /\b(?:MRT|bus|train|metro)\b|(?:Blue(?:\s*\/\s*Bannan)?|Bannan|Red|Green|Orange|Brown|Yellow)\s+Line/i.test(
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
