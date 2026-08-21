import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  Bus,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDot,
  Clock3,
  CloudOff,
  Compass,
  Database,
  Footprints,
  Info,
  LocateFixed,
  Map,
  MapPin,
  Mountain,
  Navigation,
  Plane,
  RefreshCcw,
  Route,
  Share2,
  ShoppingBag,
  Sparkles,
  TimerReset,
  TrainFront,
  UtensilsCrossed,
  Wifi,
  X,
} from 'lucide-react';
import {
  getDirectionsUrl,
  getDirectionsIssue,
  getGoogleMapsUrl,
  getMapDestination,
  getPlanDirectionsIssue,
  getPlannedOrigin,
  itinerary,
  itineraryExportedAt,
  type ItineraryItem,
} from './data/itinerary';
import './styles.css';

type AppMode = 'now' | 'day' | 'trip' | 'route';

type TimelineState = {
  current?: ItineraryItem;
  next?: ItineraryItem;
  previous?: ItineraryItem;
  completed: number;
};

type OpenDirections = (item: ItineraryItem) => void;

const SOURCE_URL =
  'https://app.notion.com/p/aef8fa576f704484bc66494b64004474?v=3afe8e18611981c79e78000c06433c8e';
const SYNCED_LABEL = new Intl.DateTimeFormat('vi-VN', {
  timeZone: 'Asia/Ho_Chi_Minh',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
}).format(new Date(itineraryExportedAt));

const dayMeta = {
  1: {
    eyebrow: 'Chạm ngõ Taipei',
    title: 'Từ SGN đến phố đêm',
    summary: 'Hạ cánh, đồ công nghệ, Taipei 101 và bữa tối đầu tiên.',
    image: 'images/taiwan-hero.webp',
    accent: '#ffb66e',
  },
  2: {
    eyebrow: 'Núi xanh & onsen',
    title: 'Yangmingshan đến Beitou',
    summary: 'Đồng cỏ, suối nóng, hoàng hôn và chợ đêm Ningxia.',
    image: 'images/yangmingshan.webp',
    accent: '#99c785',
  },
  3: {
    eyebrow: 'Làng cổ & thác',
    title: 'Jiufen, Shifen và Raohe',
    summary: 'Một ngày tàu địa phương, đèn lồng, thác nước và đồ ăn.',
    image: 'images/jiufen-shifen.webp',
    accent: '#f28d69',
  },
  4: {
    eyebrow: 'Mang Đài Loan về nhà',
    title: 'Taipei đến Tân Sơn Nhất',
    summary: 'Ăn sáng thong thả, trả phòng và ra sân bay đúng nhịp.',
    image: 'images/taiwan-hero.webp',
    accent: '#8bb9cf',
  },
} as const;

const navItems: Array<{
  id: AppMode;
  label: string;
  icon: typeof Compass;
}> = [
  { id: 'now', label: 'Bây giờ', icon: LocateFixed },
  { id: 'day', label: 'Theo ngày', icon: CalendarDays },
  { id: 'trip', label: 'Cả chuyến', icon: Compass },
  { id: 'route', label: 'Tuyến', icon: Route },
];

function getOffset(item: ItineraryItem, edge: 'start' | 'end') {
  const fromSgn =
    item.area.includes('Tân Sơn Nhất') ||
    item.area.startsWith('SGN') ||
    item.title.includes('SGN → TPE');
  const arrivesSgn = item.title.includes('TPE → SGN');

  if (fromSgn && (edge === 'start' || !item.title.includes('SGN → TPE'))) return '+07:00';
  if (edge === 'end' && arrivesSgn) return '+07:00';
  return '+08:00';
}

function toInstant(item: ItineraryItem, edge: 'start' | 'end') {
  const clock = edge === 'start' ? item.start : item.end;
  const [startHour, startMinute] = item.start.split(':').map(Number);
  const [edgeHour, edgeMinute] = clock.split(':').map(Number);
  const rollsOver =
    edge === 'end' && edgeHour * 60 + edgeMinute < startHour * 60 + startMinute;
  const base = new Date(`${item.date}T00:00:00Z`);
  if (rollsOver) base.setUTCDate(base.getUTCDate() + 1);
  const date = base.toISOString().slice(0, 10);
  return new Date(`${date}T${clock}:00${getOffset(item, edge)}`);
}

function orderedItems() {
  return [...itinerary].sort(
    (a, b) => toInstant(a, 'start').getTime() - toInstant(b, 'start').getTime(),
  );
}

function getTimelineState(now: Date): TimelineState {
  const items = orderedItems();
  const nowMs = now.getTime();
  const current = items.find(
    (item) =>
      toInstant(item, 'start').getTime() <= nowMs &&
      nowMs < toInstant(item, 'end').getTime(),
  );
  const next = items.find((item) => toInstant(item, 'start').getTime() > nowMs);
  const past = items.filter((item) => toInstant(item, 'end').getTime() <= nowMs);

  return {
    current,
    next,
    previous: past.at(-1),
    completed: past.length,
  };
}

function formatTaipeiClock(date: Date) {
  return new Intl.DateTimeFormat('vi-VN', {
    timeZone: 'Asia/Taipei',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

function formatPreviewClock(minutes: number) {
  const hour = Math.floor(minutes / 60)
    .toString()
    .padStart(2, '0');
  const minute = (minutes % 60).toString().padStart(2, '0');
  return `${hour}:${minute}`;
}

function getPreviewInstant(day: number, minutes: number) {
  const sample = itinerary.find((item) => item.dayNumber === day) ?? itinerary[0];
  return new Date(`${sample.date}T${formatPreviewClock(minutes)}:00+08:00`);
}

function getTaipeiMinutes(date: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Taipei',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === 'minute')?.value ?? 0);
  return hour * 60 + minute;
}

function countdownLabel(target: Date, now: Date) {
  const distance = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(distance / 86_400_000);
  const hours = Math.floor((distance % 86_400_000) / 3_600_000);

  if (days > 0) return `${days} ngày ${hours} giờ`;
  const minutes = Math.max(1, Math.ceil(distance / 60_000));
  if (minutes > 60) return `${Math.floor(minutes / 60)} giờ ${minutes % 60} phút`;
  return `${minutes} phút`;
}

function gapLabel(now: Date, next: ItineraryItem) {
  const minutes = Math.max(
    1,
    Math.round((toInstant(next, 'start').getTime() - now.getTime()) / 60_000),
  );
  if (minutes >= 60) return `${Math.floor(minutes / 60)} giờ ${minutes % 60} phút`;
  return `${minutes} phút`;
}

function getCategoryIcon(item: ItineraryItem) {
  const categories = item.categories;
  if (categories.includes('Di chuyển')) {
    if (/bay|flight|airport|sân bay/i.test(`${item.title} ${item.mapSearch}`)) return Plane;
    if (/bus/i.test(item.mapSearch)) return Bus;
    if (/mrt|train|tra|station|tàu/i.test(`${item.title} ${item.mapSearch}`)) return TrainFront;
    return Navigation;
  }
  if (categories.includes('Ăn uống')) return UtensilsCrossed;
  if (categories.includes('Mua sắm') || categories.includes('Tech')) return ShoppingBag;
  if (categories.includes('Nghỉ')) return BedDouble;
  return Mountain;
}

function categoryClass(category: string) {
  if (category === 'Di chuyển') return 'transport';
  if (category === 'Ăn uống') return 'food';
  if (category === 'Nghỉ') return 'rest';
  if (category === 'Mua sắm' || category === 'Tech') return 'shop';
  return 'visit';
}

function isTransport(item: ItineraryItem) {
  return (
    item.categories.includes('Di chuyển') ||
    /MRT|bus|train|flight|taxi|station|airport/i.test(item.mapSearch)
  );
}

function Header({
  online,
  onShare,
}: {
  online: boolean;
  onShare: () => void;
}) {
  return (
    <header className="topbar">
      <div className="brand-lockup" aria-label="TripGuide">
        <span className="brand-mark">
          <Compass size={17} strokeWidth={2.3} />
        </span>
        <span>
          <b>TripGuide</b>
          <small>Đài Loan · 4N3Đ</small>
        </span>
      </div>
      <div className="topbar-actions">
        <span className={`connection-dot ${online ? '' : 'offline'}`} title={online ? 'Đang online' : 'Đang offline'}>
          {online ? <Wifi size={15} /> : <CloudOff size={15} />}
        </span>
        <button className="icon-button" type="button" onClick={onShare} aria-label="Chia sẻ chuyến đi">
          <Share2 size={18} />
        </button>
      </div>
    </header>
  );
}

function ActivityCard({
  item,
  state = 'upcoming',
  expanded,
  onToggle,
  onDirections,
  onPreview,
  compact = false,
}: {
  item: ItineraryItem;
  state?: 'current' | 'past' | 'upcoming';
  expanded: boolean;
  onToggle: () => void;
  onDirections: OpenDirections;
  onPreview?: () => void;
  compact?: boolean;
}) {
  const Icon = getCategoryIcon(item);
  const primaryCategory = item.categories[0] ?? 'Tham quan';

  return (
    <article className={`activity-card ${state} ${compact ? 'compact' : ''}`}>
      <button className="activity-summary" type="button" onClick={onToggle} aria-expanded={expanded}>
        <span className={`activity-icon ${categoryClass(primaryCategory)}`}>
          <Icon size={20} />
        </span>
        <span className="activity-copy">
          <span className="activity-time">
            {item.timeLabel}
            {state === 'current' && <em>Đang diễn ra</em>}
            {state === 'past' && <Check size={13} aria-label="Đã xong" />}
          </span>
          <strong>{item.title}</strong>
          <span className="activity-area">
            <MapPin size={13} /> {item.area}
          </span>
        </span>
        <ChevronDown className={`expand-icon ${expanded ? 'open' : ''}`} size={18} />
      </button>

      {(expanded || state === 'current') && (
        <div className="activity-details">
          <div className="category-row">
            {item.categories.map((category) => (
              <span className={`category-pill ${categoryClass(category)}`} key={category}>
                {category}
              </span>
            ))}
          </div>
          <p>{item.note}</p>
          <div className="activity-actions">
            <button className="map-button primary" type="button" onClick={() => onDirections(item)}>
              <Navigation size={17} /> Chỉ đường
            </button>
            <a className="map-button" href={getGoogleMapsUrl(item)} target="_blank" rel="noreferrer">
              <Map size={17} /> Xem điểm
            </a>
            {onPreview && (
              <button className="preview-here" type="button" onClick={onPreview}>
                <Clock3 size={16} /> Xem lúc này
              </button>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

function PreviewControls({
  previewDay,
  previewMinutes,
  enabled,
  onDayChange,
  onMinutesChange,
  onEnable,
  onReset,
}: {
  previewDay: number;
  previewMinutes: number;
  enabled: boolean;
  onDayChange: (day: number) => void;
  onMinutesChange: (minutes: number) => void;
  onEnable: () => void;
  onReset: () => void;
}) {
  return (
    <section className="preview-panel" aria-label="Xem thử lịch trình">
      <div className="section-heading compact-heading">
        <div>
          <span className="section-kicker">Cỗ máy thời gian</span>
          <h2>Xem thử chuyến đi</h2>
        </div>
        <TimerReset size={22} />
      </div>
      <div className="day-pills preview-days">
        {[1, 2, 3, 4].map((day) => (
          <button
            className={previewDay === day ? 'active' : ''}
            type="button"
            key={day}
            onClick={() => onDayChange(day)}
          >
            Ngày {day}
          </button>
        ))}
      </div>
      <div className="time-slider-row">
        <span>05:00</span>
        <label>
          <span className="sr-only">Chọn thời gian xem thử</span>
          <input
            type="range"
            min={300}
            max={1380}
            step={5}
            value={previewMinutes}
            onChange={(event) => onMinutesChange(Number(event.target.value))}
          />
        </label>
        <span>23:00</span>
      </div>
      <div className="preview-commit">
        <div>
          <small>Giờ Đài Loan</small>
          <strong>{formatPreviewClock(previewMinutes)}</strong>
        </div>
        {enabled ? (
          <button className="secondary-action" type="button" onClick={onReset}>
            <RefreshCcw size={16} /> Về thời gian thật
          </button>
        ) : (
          <button className="primary-action" type="button" onClick={onEnable}>
            <Sparkles size={16} /> Bắt đầu xem thử
          </button>
        )}
      </div>
    </section>
  );
}

function NowScreen({
  timeline,
  effectiveNow,
  isPreviewing,
  previewDay,
  previewMinutes,
  expandedId,
  onExpand,
  onDirections,
  onPreviewDay,
  onPreviewMinutes,
  onPreviewEnable,
  onPreviewReset,
}: {
  timeline: TimelineState;
  effectiveNow: Date;
  isPreviewing: boolean;
  previewDay: number;
  previewMinutes: number;
  expandedId?: string;
  onExpand: (id: string) => void;
  onDirections: OpenDirections;
  onPreviewDay: (day: number) => void;
  onPreviewMinutes: (minutes: number) => void;
  onPreviewEnable: () => void;
  onPreviewReset: () => void;
}) {
  const first = orderedItems()[0];
  const last = orderedItems().at(-1)!;
  const beforeTrip = effectiveNow < toInstant(first, 'start');
  const afterTrip = effectiveNow >= toInstant(last, 'end');
  const progress = Math.round((timeline.completed / itinerary.length) * 100);

  return (
    <div className="screen now-screen">
      <section className="hero-card">
        <img src="images/taiwan-hero.webp" alt="Đường chân trời Taipei và phố đèn lồng lúc chạng vạng" />
        <div className="hero-shade" />
        <div className="hero-content">
          <div className="hero-status">
            <span className="live-dot" />
            {isPreviewing ? `Đang xem thử · ${formatTaipeiClock(effectiveNow)}` : 'Theo giờ Đài Loan'}
          </div>
          <h1>Taiwan,<br />mình đi thôi.</h1>
          <p>30/08 — 02/09/2026 · Taipei & New Taipei</p>
          <div className="hero-stats">
            <span><b>4</b> ngày</span>
            <span><b>{itinerary.length}</b> điểm</span>
            <span><b>{progress}%</b> xong</span>
          </div>
        </div>
      </section>

      {isPreviewing && (
        <div className="preview-banner">
          <Sparkles size={17} />
          <span>Đang xem thử ngày {previewDay}, {formatPreviewClock(previewMinutes)}</span>
          <button type="button" onClick={onPreviewReset}>Thời gian thật</button>
        </div>
      )}

      <section className="now-block">
        <div className="section-heading">
          <div>
            <span className="section-kicker">
              {beforeTrip ? 'Sắp lên đường' : afterTrip ? 'Đã về nhà' : 'Ngay lúc này'}
            </span>
            <h2>
              {beforeTrip
                ? `Còn ${countdownLabel(toInstant(first, 'start'), effectiveNow)}`
                : afterTrip
                  ? 'Một chuyến đi trọn vẹn'
                  : timeline.current
                    ? 'Đúng lịch rồi đó'
                    : 'Một khoảng thở nhỏ'}
            </h2>
          </div>
          <span className="taipei-clock">
            <Clock3 size={16} /> {formatTaipeiClock(effectiveNow)}
          </span>
        </div>

        {afterTrip ? (
          <div className="complete-card">
            <span><Check size={26} /></span>
            <div>
              <strong>Hoàn thành {itinerary.length}/{itinerary.length} hoạt động</strong>
              <p>Lịch vẫn ở đây cho album ảnh và chuyến Đài Loan lần sau.</p>
            </div>
          </div>
        ) : timeline.current ? (
          <ActivityCard
            item={timeline.current}
            state="current"
            expanded
            onToggle={() => onExpand(timeline.current!.id)}
            onDirections={onDirections}
          />
        ) : beforeTrip ? (
          <div className="countdown-card">
            <span className="countdown-icon"><Plane size={25} /></span>
            <div>
              <strong>Passport, eSIM, pin dự phòng?</strong>
              <p>Chuyến đi bắt đầu ở Tân Sơn Nhất T2. Bên dưới có thể xem thử mọi ngày ngay bây giờ.</p>
            </div>
          </div>
        ) : timeline.next ? (
          <div className="free-time-card">
            <span><Footprints size={23} /></span>
            <div>
              <small>Thời gian trống · còn {gapLabel(effectiveNow, timeline.next)}</small>
              <strong>Đi chậm một chút cũng được</strong>
              <p>Điểm tiếp theo vẫn sẵn sàng ở ngay bên dưới.</p>
            </div>
          </div>
        ) : null}
      </section>

      {timeline.next && (
        <section className="next-block">
          <div className="section-heading slim">
            <div>
              <span className="section-kicker">Tiếp theo</span>
              <h2>{beforeTrip ? 'Điểm mở màn' : 'Sắp đến lượt'}</h2>
            </div>
            <ArrowRight size={22} />
          </div>
          <ActivityCard
            item={timeline.next}
            expanded={expandedId === timeline.next.id}
            onToggle={() => onExpand(timeline.next!.id)}
            onDirections={onDirections}
          />
        </section>
      )}

      <PreviewControls
        previewDay={previewDay}
        previewMinutes={previewMinutes}
        enabled={isPreviewing}
        onDayChange={onPreviewDay}
        onMinutesChange={onPreviewMinutes}
        onEnable={onPreviewEnable}
        onReset={onPreviewReset}
      />
    </div>
  );
}

function DayScreen({
  selectedDay,
  onDayChange,
  effectiveNow,
  expandedId,
  onExpand,
  onDirections,
  onPreviewItem,
}: {
  selectedDay: number;
  onDayChange: (day: number) => void;
  effectiveNow: Date;
  expandedId?: string;
  onExpand: (id: string) => void;
  onDirections: OpenDirections;
  onPreviewItem: (item: ItineraryItem) => void;
}) {
  const meta = dayMeta[selectedDay as keyof typeof dayMeta];
  const items = itinerary.filter((item) => item.dayNumber === selectedDay);

  return (
    <div className="screen day-screen">
      <div className="screen-title-row">
        <div>
          <span className="section-kicker">Chi tiết từng ngày</span>
          <h1>Lịch trình của mình</h1>
        </div>
        <span className="item-count">{items.length} mục</span>
      </div>

      <div className="day-pills sticky-days">
        {[1, 2, 3, 4].map((day) => (
          <button
            className={selectedDay === day ? 'active' : ''}
            type="button"
            key={day}
            onClick={() => onDayChange(day)}
          >
            <span>N{day}</span>
            <small>{day === 1 ? '30/8' : day === 2 ? '31/8' : day === 3 ? '1/9' : '2/9'}</small>
          </button>
        ))}
      </div>

      <section className="day-cover" style={{ '--day-accent': meta.accent } as CSSProperties}>
        <img src={meta.image} alt={meta.title} />
        <div className="day-cover-shade" />
        <div>
          <span>{meta.eyebrow}</span>
          <h2>{meta.title}</h2>
          <p>{meta.summary}</p>
        </div>
      </section>

      <section className="timeline" aria-label={`Lịch trình ngày ${selectedDay}`}>
        {items.map((item) => {
          const state =
            toInstant(item, 'end') <= effectiveNow
              ? 'past'
              : toInstant(item, 'start') <= effectiveNow && effectiveNow < toInstant(item, 'end')
                ? 'current'
                : 'upcoming';
          return (
            <div className="timeline-item" key={item.id}>
              <span className={`timeline-dot ${state}`} />
              <ActivityCard
                item={item}
                state={state}
                expanded={expandedId === item.id}
                onToggle={() => onExpand(item.id)}
                onDirections={onDirections}
                onPreview={() => onPreviewItem(item)}
              />
            </div>
          );
        })}
      </section>
    </div>
  );
}

function TripScreen({
  effectiveNow,
  onOpenDay,
}: {
  effectiveNow: Date;
  onOpenDay: (day: number) => void;
}) {
  const timeline = getTimelineState(effectiveNow);
  const completedDays = [1, 2, 3, 4].filter((day) => {
    const items = itinerary.filter((item) => item.dayNumber === day);
    return items.every((item) => toInstant(item, 'end') <= effectiveNow);
  }).length;

  return (
    <div className="screen trip-screen">
      <div className="screen-title-row trip-title">
        <div>
          <span className="section-kicker">Toàn cảnh chuyến đi</span>
          <h1>4 ngày, một Đài Loan</h1>
        </div>
        <span className="round-progress">{completedDays}/4</span>
      </div>

      <section className="trip-overview">
        <div>
          <span>TIỆN NHẤT TRÊN MOBILE</span>
          <strong>4N3Đ</strong>
          <p>Taipei · New Taipei · Taoyuan</p>
        </div>
        <div className="overview-numbers">
          <span><b>{itinerary.length}</b> hoạt động</span>
          <span><b>3</b> ảnh chuyến đi</span>
          <span><b>{timeline.completed}</b> đã xong</span>
        </div>
      </section>

      <section className="day-gallery">
        {[1, 2, 3, 4].map((day) => {
          const meta = dayMeta[day as keyof typeof dayMeta];
          const items = itinerary.filter((item) => item.dayNumber === day);
          const done = items.every((item) => toInstant(item, 'end') <= effectiveNow);
          return (
            <button className="trip-day-card" type="button" key={day} onClick={() => onOpenDay(day)}>
              <img src={meta.image} alt="" />
              <span className="trip-day-shade" />
              <span className="trip-day-number">0{day}</span>
              {done && <span className="done-badge"><Check size={14} /> Xong</span>}
              <span className="trip-day-content">
                <small>{meta.eyebrow}</small>
                <strong>{meta.title}</strong>
                <span>{items.length} hoạt động <ChevronRight size={15} /></span>
              </span>
            </button>
          );
        })}
      </section>

      <a className="source-card" href={SOURCE_URL} target="_blank" rel="noreferrer">
        <span className="source-icon"><Database size={21} /></span>
        <span>
          <small>Nguồn lịch trình</small>
          <strong>Đồng bộ từ Notion</strong>
          <em>Cập nhật {SYNCED_LABEL} · dữ liệu dự phòng có sẵn offline</em>
        </span>
        <ArrowUpRight size={19} />
      </a>
    </div>
  );
}

function RouteScreen({
  selectedDay,
  onDayChange,
  expandedId,
  onExpand,
  onDirections,
}: {
  selectedDay: number;
  onDayChange: (day: number) => void;
  expandedId?: string;
  onExpand: (id: string) => void;
  onDirections: OpenDirections;
}) {
  const routes = itinerary.filter(
    (item) => item.dayNumber === selectedDay && isTransport(item),
  );

  return (
    <div className="screen route-screen">
      <div className="screen-title-row">
        <div>
          <span className="section-kicker">Đi từng chặng</span>
          <h1>Tuyến đường bỏ túi</h1>
        </div>
        <Route size={27} />
      </div>

      <div className="route-note">
        <Info size={17} />
        <span>Chọn xuất phát từ vị trí hiện tại hoặc điểm đầu đã lưu trong plan.</span>
      </div>

      <div className="day-pills route-days">
        {[1, 2, 3, 4].map((day) => (
          <button
            className={selectedDay === day ? 'active' : ''}
            type="button"
            key={day}
            onClick={() => onDayChange(day)}
          >
            Ngày {day}
          </button>
        ))}
      </div>

      <section className="route-list">
        {routes.map((item, index) => (
          <div className="route-leg" key={item.id}>
            <div className="route-rail">
              <span>{index + 1}</span>
              {index < routes.length - 1 && <i />}
            </div>
            <div className="route-leg-body">
              <ActivityCard
                item={item}
                expanded={expandedId === item.id}
                onToggle={() => onExpand(item.id)}
                onDirections={onDirections}
                compact
              />
              <button type="button" onClick={() => onDirections(item)} className="route-map-cta">
                Mở Google Maps <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

function QuickMap({
  item,
  relation,
  onDirections,
}: {
  item?: ItineraryItem;
  relation: 'current' | 'next';
  onDirections: OpenDirections;
}) {
  if (!item) return null;
  return (
    <div className="quick-map-wrap">
      <button type="button" onClick={() => onDirections(item)} className="quick-map">
        <span className="quick-map-icon"><Navigation size={19} /></span>
        <span>
          <small>Maps tới điểm {relation === 'current' ? 'hiện tại' : 'tiếp theo'}</small>
          <strong>{item.title}</strong>
        </span>
        <ArrowUpRight size={18} />
      </button>
    </div>
  );
}

function MapChoiceDialog({ item, onClose }: { item: ItineraryItem; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const plannedOrigin = getPlannedOrigin(item);
  const destination = getMapDestination(item);
  const directionsIssue = getDirectionsIssue(item);
  const planDirectionsIssue = getPlanDirectionsIssue(item);
  const currentUrl = getDirectionsUrl(item, 'current');
  const plannedUrl = getDirectionsUrl(item, 'plan');
  const isTransitRoute = currentUrl
    ? new URL(currentUrl).searchParams.get('travelmode') === 'transit'
    : false;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [item]);

  const closeDialog = () => dialogRef.current?.close();

  return (
    <dialog
      className="map-choice-dialog"
      ref={dialogRef}
      aria-labelledby="map-choice-title"
      aria-describedby="map-choice-destination"
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        closeDialog();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeDialog();
      }}
    >
      <section className="map-choice-sheet">
        <span className="map-choice-handle" aria-hidden="true" />
        <header className="map-choice-header">
          <span className="map-choice-header-icon"><Navigation size={20} /></span>
          <div>
            <small>Mở Google Maps</small>
            <h2 id="map-choice-title">Bạn muốn xem tuyến nào?</h2>
          </div>
          <button type="button" onClick={closeDialog} aria-label="Đóng lựa chọn chỉ đường">
            <X size={19} />
          </button>
        </header>

        <p id="map-choice-destination">
          Đi đến <strong>{destination}</strong>
        </p>

        <div className="map-choice-options">
          {currentUrl ? (
            <a
              className="map-choice-option current-location"
              href={currentUrl}
              target="_blank"
              rel="noreferrer"
              onClick={closeDialog}
            >
              <span><LocateFixed size={21} /></span>
              <span>
                <strong>Từ vị trí hiện tại</strong>
                <small>
                  {isTransitRoute
                    ? 'Xem các chuyến MRT / bus từ vị trí điện thoại'
                    : 'Google Maps dùng vị trí của điện thoại'}
                </small>
              </span>
              <ArrowUpRight size={18} />
            </a>
          ) : (
            <button className="map-choice-option current-location unavailable" type="button" disabled>
              <span><LocateFixed size={21} /></span>
              <span>
                <strong>Từ vị trí hiện tại</strong>
                <small>{directionsIssue}</small>
              </span>
            </button>
          )}

          {plannedOrigin && plannedUrl ? (
            <a
              className="map-choice-option plan-location"
              href={plannedUrl}
              target="_blank"
              rel="noreferrer"
              onClick={closeDialog}
            >
              <span><Route size={21} /></span>
              <span>
                <strong>Từ điểm đầu trong plan</strong>
                <small>{plannedOrigin}{isTransitRoute ? ' · xem MRT / bus' : ''}</small>
              </span>
              <ArrowUpRight size={18} />
            </a>
          ) : (
            <button className="map-choice-option plan-location unavailable" type="button" disabled>
              <span><Route size={21} /></span>
              <span>
                <strong>Từ điểm đầu trong plan</strong>
                <small>{planDirectionsIssue ?? directionsIssue ?? 'Chưa có keyword điểm bắt đầu cho chặng này'}</small>
              </span>
            </button>
          )}
        </div>

        {isTransitRoute && (
          <p className="map-choice-transit-note">
            <TrainFront size={16} />
            <span>Maps sẽ tính một hành trình công cộng tới đích để hiện đúng chuyến. Các ga trung gian vẫn nằm trong plan.</span>
          </p>
        )}
      </section>
    </dialog>
  );
}

function BottomNav({ mode, onChange }: { mode: AppMode; onChange: (mode: AppMode) => void }) {
  return (
    <nav className="bottom-nav" aria-label="Điều hướng chính">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            type="button"
            className={mode === item.id ? 'active' : ''}
            onClick={() => onChange(item.id)}
            key={item.id}
            aria-current={mode === item.id ? 'page' : undefined}
          >
            <Icon size={21} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function App() {
  const [mode, setMode] = useState<AppMode>('now');
  const [selectedDay, setSelectedDay] = useState(1);
  const [previewDay, setPreviewDay] = useState(1);
  const [previewMinutes, setPreviewMinutes] = useState(10 * 60 + 30);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [expandedId, setExpandedId] = useState<string>();
  const [online, setOnline] = useState(() => navigator.onLine);
  const [clock, setClock] = useState(() => new Date());
  const [toast, setToast] = useState<string>();
  const [mapItem, setMapItem] = useState<ItineraryItem>();

  useEffect(() => {
    const timer = window.setInterval(() => setClock(new Date()), 30_000);
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(undefined), 2500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const effectiveNow = useMemo(
    () => (isPreviewing ? getPreviewInstant(previewDay, previewMinutes) : clock),
    [clock, isPreviewing, previewDay, previewMinutes],
  );
  const timeline = useMemo(() => getTimelineState(effectiveNow), [effectiveNow]);
  const quickTarget = timeline.current ?? timeline.next;
  const quickRelation = timeline.current ? 'current' : 'next';

  const toggleExpanded = (id: string) => {
    setExpandedId((current) => (current === id ? undefined : id));
  };

  const openDay = (day: number) => {
    setSelectedDay(day);
    setMode('day');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const previewItem = (item: ItineraryItem) => {
    const previewAt = new Date(toInstant(item, 'start').getTime() + 5 * 60_000);
    setPreviewDay(item.dayNumber);
    setPreviewMinutes(getTaipeiMinutes(previewAt));
    setIsPreviewing(true);
    setMode('now');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shareTrip = async () => {
    const shareData = {
      title: 'TripGuide · Đài Loan 4N3Đ',
      text: 'Lịch trình Đài Loan 4 ngày 3 đêm của tụi mình',
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setToast('Đã sao chép link chuyến đi');
      }
    } catch {
      // The native share sheet can be dismissed without an error state in the UI.
    }
  };

  return (
    <div className="app-shell">
      <Header online={online} onShare={shareTrip} />

      {!online && (
        <div className="offline-banner">
          <CloudOff size={16} />
          <span>Đang offline · lịch và ảnh chính vẫn xem được</span>
        </div>
      )}

      <main>
        {mode === 'now' && (
          <NowScreen
            timeline={timeline}
            effectiveNow={effectiveNow}
            isPreviewing={isPreviewing}
            previewDay={previewDay}
            previewMinutes={previewMinutes}
            expandedId={expandedId}
            onExpand={toggleExpanded}
            onDirections={setMapItem}
            onPreviewDay={(day) => {
              setPreviewDay(day);
              if (isPreviewing) setSelectedDay(day);
            }}
            onPreviewMinutes={setPreviewMinutes}
            onPreviewEnable={() => setIsPreviewing(true)}
            onPreviewReset={() => setIsPreviewing(false)}
          />
        )}
        {mode === 'day' && (
          <DayScreen
            selectedDay={selectedDay}
            onDayChange={setSelectedDay}
            effectiveNow={effectiveNow}
            expandedId={expandedId}
            onExpand={toggleExpanded}
            onDirections={setMapItem}
            onPreviewItem={previewItem}
          />
        )}
        {mode === 'trip' && <TripScreen effectiveNow={effectiveNow} onOpenDay={openDay} />}
        {mode === 'route' && (
          <RouteScreen
            selectedDay={selectedDay}
            onDayChange={setSelectedDay}
            expandedId={expandedId}
            onExpand={toggleExpanded}
            onDirections={setMapItem}
          />
        )}
      </main>

      <QuickMap item={quickTarget} relation={quickRelation} onDirections={setMapItem} />
      <BottomNav
        mode={mode}
        onChange={(nextMode) => {
          setMode(nextMode);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {mapItem && <MapChoiceDialog item={mapItem} onClose={() => setMapItem(undefined)} />}

      {toast && <div className="toast"><CircleDot size={15} /> {toast}</div>}
      <span className="sr-only">Dữ liệu đồng bộ lần cuối {SYNCED_LABEL}</span>
    </div>
  );
}

export default App;
