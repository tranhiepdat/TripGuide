# TripGuide — Đài Loan 4N3Đ

Mobile-first PWA cho chuyến Đài Loan 30/08–02/09/2026. App lấy lịch trình từ database Notion, giữ một snapshot offline và mở Google Maps bằng một chạm.

## Có gì trong app

- **Bây giờ:** tự xác định hoạt động hiện tại, khoảng trống và điểm tiếp theo.
- **Xem thử:** chọn ngày + giờ để preview trước khi chuyến đi bắt đầu.
- **Theo ngày:** timeline đầy đủ 4 ngày, ghi chú transit và trạng thái đã xong/đang diễn ra.
- **Cả chuyến:** preview nhanh từng ngày bằng ảnh.
- **Tuyến:** các chặng di chuyển, MRT/bus/train và CTA Google Maps.
- **PWA/offline:** cache app shell, đủ 26 hoạt động và ba ảnh chính. Google Maps vẫn cần mạng hoặc dữ liệu đã cache trong app Maps.
- **Múi giờ:** so sánh theo UTC+8 tại Đài Loan; hai chặng SGN dùng UTC+7 đúng đầu/cuối chuyến bay.

## Chạy local

Yêu cầu Node.js 20+ và pnpm.

```bash
pnpm install
pnpm dev
```

Kiểm tra production:

```bash
pnpm typecheck
pnpm build
pnpm preview
```

## Đồng bộ lịch từ Notion

Snapshot hiện tại được xuất từ database **Lịch trình Đài Loan — 4 ngày 3 đêm**. Để lấy các thay đổi mới:

1. Tạo Notion integration và share database cho integration đó.
2. Copy `.env.example` thành `.env`, rồi đặt `NOTION_TOKEN`.
3. Nạp biến môi trường bằng công cụ/CI của bạn và chạy:

```bash
pnpm sync:notion
```

Script dùng API version `2026-03-11`, tự phân trang, normalize dữ liệu và chỉ thay block `<notion-data>` trong `src/data/itinerary.ts`. Token chỉ chạy ở Node/CI, không bao giờ được bundle vào trình duyệt. Xem [Notion Query a data source](https://developers.notion.com/reference/query-a-data-source) và [Handling API keys](https://developers.notion.com/guides/get-started/handling-api-keys).

## Nguồn dữ liệu và hình ảnh

- Lịch trình: [Notion database](https://app.notion.com/p/aef8fa576f704484bc66494b64004474?v=3afe8e18611981c79e78000c06433c8e)
- Hero Taipei/Jiufen, Yangmingshan và Jiufen/Shifen: ảnh AI tạo riêng cho dự án, lưu tối ưu WebP trong `public/images/`.
- Google Maps: URL universal `https://www.google.com/maps/...`; không cần API key phía client.
