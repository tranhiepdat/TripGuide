import type { ItineraryItem } from '../data/itinerary';

export type BusTimingWarning = {
  headline: string;
  detail: string;
};

const warningsByItineraryId: Readonly<Record<string, BusTimingWarning>> = {
  '3afe8e18-6119-81b7-a09b-e0e7f62b2873': {
    headline: 'Canh bus 202 khoảng 20:48',
    detail: '20:43–20:45 rời Syntrend. Lỡ 202 thì chọn ngay 212 / 212直 / 262 / 262區 có ETA sớm nhất.',
  },
  '3afe8e18-6119-81f4-a6f5-d9547fd7ce0c': {
    headline: 'Bus núi: đừng lỡ nhịp 260 → 108',
    detail: '06:51 rời Muzik và kiểm tra ETA 260 ngay. Nếu vừa lỡ, chuyển backup 1717 hoặc MRT → Jiantan → R5; không đứng chờ lâu.',
  },
  '3cae8e18-6119-81c6-b04e-f19fc679d32c': {
    headline: '1717: chỉ lên chuyến có đi qua Xiaoyoukeng',
    detail: 'Ưu tiên biến thể 08:00 / 08:30 ghi Via Jiantan + Via Xiaoyoukeng. Không lên chuyến 07:00 vì không qua Xiaoyoukeng.',
  },
  '3cbe8e18-6119-812d-8b2d-cfe415aa1abc': {
    headline: 'Canh bus 108 sang Qingtiangang',
    detail: 'Mở Bus+ trước khi kết thúc tham quan; 108 trên núi thường cách 30–40 phút, không nên để vừa lỡ mới ra trạm.',
  },
  '3afe8e18-6119-811c-a7b4-e3dd961eb964': {
    headline: '11:45 phải quay về trạm bus',
    detail: 'Giữ mốc rời khoảng 12:00 để kịp S15/108 và booking The Gaia lúc 14:30.',
  },
  '3afe8e18-6119-8174-a009-ffe7014c30d0': {
    headline: 'S15 là chặng nhạy giờ',
    detail: '11:45 ra trạm, aim lên xe khoảng 12:00. Vừa lỡ S15 thì xem ngay 108 backup; trễ nhiều dùng taxi.',
  },
  '3cae8e18-6119-815a-826a-eeebdeaa2f2a': {
    headline: 'Backup 108 → 230/S9 vẫn phải canh giờ',
    detail: 'Chỉ chọn khi 108 tới sớm; nếu ETA xấu, taxi thẳng Beitou/Gaia để giữ booking 14:30.',
  },
  '3cbe8e18-6119-81a2-b099-ffa1da15a3aa': {
    headline: 'Shuttle The Gaia cần canh giờ',
    detail: '14:05–14:10 rời quán về Beitou Station. Shuttle ETA xấu thì chuyển taxi để tới Gaia trước 14:30.',
  },
  '3cbe8e18-6119-8127-ba21-ccee51ac243d': {
    headline: 'Red33: chỉ chờ tối đa 5 phút',
    detail: 'Rời Gaia khoảng 16:45; Red33 ETA >5 phút thì đổi Minsheng Trunk Line ngay.',
  },
  '3afe8e18-6119-813b-8ad5-e02be96f502c': {
    headline: 'Bus 235 sáng sớm — đừng trễ',
    detail: '05:35–05:45 rời Muzik, kiểm tra Bus+ trước khi đi. ETA quá lâu thì đổi MRT backup để kịp lễ 06:45.',
  },
};

export function getBusTimingWarning(
  item: Pick<ItineraryItem, 'id'>,
): BusTimingWarning | undefined {
  return warningsByItineraryId[item.id];
}

export const busTimingWarningCount = Object.keys(warningsByItineraryId).length;
