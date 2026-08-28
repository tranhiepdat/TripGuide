import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  Bookmark,
  Bus,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Clock3,
  CloudOff,
  Compass,
  Database,
  Footprints,
  Info,
  LocateFixed,
  Languages,
  Map,
  MapPin,
  Maximize2,
  Mountain,
  Navigation,
  Plane,
  RefreshCcw,
  Route,
  Share2,
  ShoppingBag,
  ShieldAlert,
  Sparkles,
  TimerReset,
  TrainFront,
  UtensilsCrossed,
  Volume2,
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
import {
  phraseCategoryLabels,
  taxiDestinations,
  travelPhrases,
  type PhraseCategory,
  type TaxiDestination,
  type TravelPhrase,
} from './data/phrases';
import { tokenizeTransportText } from './lib/transportText';
import './styles.css';

type AppMode = 'now' | 'saved' | 'phrases' | 'route';

type TimelineState = {
  current?: ItineraryItem;
  next?: ItineraryItem;
  previous?: ItineraryItem;
  completed: number;
};

type OpenDirections = (item: ItineraryItem) => void;

const PREVIEW_START_MINUTES = 5 * 60;
const PREVIEW_END_MINUTES = 23 * 60;
const PREVIEW_SLIDER_STEP_MINUTES = 5;

const SOURCE_URL =
  'https://app.notion.com/p/aef8fa576f704484bc66494b64004474?v=3afe8e18611981c79e78000c06433c8e';
const SAVED_STORAGE_KEY = 'tripguide-saved-destinations-v1';
const primaryItinerary = itinerary.filter((item) => !item.isBackup);
const backupCount = itinerary.length - primaryItinerary.length;
const SYNCED_LABEL = new Intl.DateTimeFormat('vi-VN', {
  timeZone: 'Asia/Ho_Chi_Minh',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
}).format(new Date(itineraryExportedAt));

const navItems: Array<{
  id: AppMode;
  label: string;
  icon: typeof Compass;
}> = [
  { id: 'now', label: 'Bây giờ', icon: LocateFixed },
  { id: 'saved', label: 'Đã lưu', icon: Bookmark },
  { id: 'phrases', label: 'Câu nói', icon: Languages },
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
  return [...primaryItinerary].sort(
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
  const sample = primaryItinerary.find((item) => item.dayNumber === day) ?? primaryItinerary[0];
  return new Date(`${sample.date}T${formatPreviewClock(minutes)}:00+08:00`);
}

function getBackupsFor(item: ItineraryItem) {
  if (item.isBackup) return [];
  return itinerary.filter(
    (candidate) =>
      candidate.isBackup &&
      candidate.dayNumber === item.dayNumber &&
      candidate.start === item.start &&
      candidate.end === item.end,
  );
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

function getPreviewPosition(item: ItineraryItem) {
  const previewAt = new Date(toInstant(item, 'start').getTime() + 5 * 60_000);
  return {
    day: item.dayNumber,
    minutes: getTaipeiMinutes(previewAt),
  };
}

function getAdjacentDestinations(day: number, minutes: number) {
  const destinations = orderedItems();
  const cursorMs = getPreviewInstant(day, minutes).getTime();
  const currentIndex = destinations.findIndex(
    (item) =>
      toInstant(item, 'start').getTime() <= cursorMs &&
      cursorMs < toInstant(item, 'end').getTime(),
  );

  if (currentIndex >= 0) {
    return {
      previous: destinations[currentIndex - 1],
      next: destinations[currentIndex + 1],
    };
  }

  const nextIndex = destinations.findIndex(
    (item) => toInstant(item, 'start').getTime() > cursorMs,
  );
  if (nextIndex < 0) return { previous: destinations.at(-1), next: undefined };

  return {
    previous: destinations[nextIndex - 1],
    next: destinations[nextIndex],
  };
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

function TransportText({ text }: { text: string }) {
  return tokenizeTransportText(text).map((segment, index) =>
    segment.kind ? (
      <span className={`transport-token transport-token--${segment.kind}`} key={`${segment.value}-${index}`}>
        {segment.value}
      </span>
    ) : (
      segment.value
    ),
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
  backups = [],
  isSaved = false,
  savedIds = [],
  onToggleSaved,
  compact = false,
}: {
  item: ItineraryItem;
  state?: 'current' | 'past' | 'upcoming';
  expanded: boolean;
  onToggle: () => void;
  onDirections: OpenDirections;
  onPreview?: () => void;
  backups?: readonly ItineraryItem[];
  isSaved?: boolean;
  savedIds?: readonly string[];
  onToggleSaved?: (item: ItineraryItem) => void;
  compact?: boolean;
}) {
  const Icon = getCategoryIcon(item);
  const primaryCategory = item.categories[0] ?? 'Tham quan';

  return (
    <article className={`activity-card ${state} ${item.isBackup ? 'backup' : ''} ${compact ? 'compact' : ''}`}>
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
          <strong><TransportText text={item.title} /></strong>
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
          <p><TransportText text={item.note} /></p>
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
            {onToggleSaved && (
              <button
                className={`preview-here save-toggle ${isSaved ? 'saved' : ''}`}
                type="button"
                aria-pressed={isSaved}
                onClick={() => onToggleSaved(item)}
              >
                <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
                {isSaved ? 'Đã lưu' : 'Lưu điểm'}
              </button>
            )}
          </div>
          {backups.length > 0 && (
            <div className="backup-options" aria-label="Phương án dự phòng">
              <div className="backup-options-heading">
                <RefreshCcw size={15} />
                <span><strong>Có phương án backup</strong><small>Dùng khi lỡ chuyến hoặc tuyến chính không thuận lợi</small></span>
              </div>
              {backups.map((backup) => (
                <BackupRouteOption
                  key={backup.id}
                  item={backup}
                  onDirections={onDirections}
                  isSaved={savedIds.includes(backup.id)}
                  onToggleSaved={onToggleSaved}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}

function BackupRouteOption({
  item,
  onDirections,
  isSaved,
  onToggleSaved,
}: {
  item: ItineraryItem;
  onDirections: OpenDirections;
  isSaved: boolean;
  onToggleSaved?: (item: ItineraryItem) => void;
}) {
  return (
    <article className="backup-option-card">
      <div className="backup-option-label"><RefreshCcw size={13} /> BACKUP</div>
      <strong><TransportText text={item.title.replace(/^🔄\s*BACKUP\s*—\s*/i, '')} /></strong>
      <p><TransportText text={item.note} /></p>
      <div className="backup-option-actions">
        <button type="button" onClick={() => onDirections(item)}>
          <Navigation size={15} /> Chỉ đường backup
        </button>
        {onToggleSaved && (
          <button
            className={isSaved ? 'saved' : ''}
            type="button"
            aria-pressed={isSaved}
            onClick={() => onToggleSaved(item)}
          >
            <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
            {isSaved ? 'Đã lưu' : 'Lưu'}
          </button>
        )}
      </div>
    </article>
  );
}

function PreviewControls({
  previewDay,
  previewMinutes,
  enabled,
  onDayChange,
  onMinutesChange,
  onDestinationChange,
  onEnable,
  onReset,
}: {
  previewDay: number;
  previewMinutes: number;
  enabled: boolean;
  onDayChange: (day: number) => void;
  onMinutesChange: (minutes: number) => void;
  onDestinationChange: (item: ItineraryItem) => void;
  onEnable: () => void;
  onReset: () => void;
}) {
  const { previous, next } = getAdjacentDestinations(previewDay, previewMinutes);

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
            id="preview-time-range"
            type="range"
            min={PREVIEW_START_MINUTES}
            max={PREVIEW_END_MINUTES}
            step={PREVIEW_SLIDER_STEP_MINUTES}
            value={previewMinutes}
            aria-valuetext={formatPreviewClock(previewMinutes)}
            onChange={(event) => onMinutesChange(Number(event.target.value))}
          />
        </label>
        <span>23:00</span>
      </div>
      <div className="preview-commit">
        <div className="preview-time-control" role="group" aria-label="Chuyển giữa các điểm trong lịch trình">
          <button
            className="destination-step-button"
            type="button"
            aria-label={previous ? `Điểm trước: ${previous.title}` : 'Không có điểm trước'}
            title={previous ? `Điểm trước: ${previous.title}` : 'Không có điểm trước'}
            disabled={!previous}
            onClick={() => previous && onDestinationChange(previous)}
          >
            <ChevronLeft size={21} />
          </button>
          <div className="preview-time-readout">
            <small>Giờ Đài Loan</small>
            <output htmlFor="preview-time-range" aria-live="polite" aria-atomic="true">
              <strong>{formatPreviewClock(previewMinutes)}</strong>
            </output>
          </div>
          <button
            className="destination-step-button"
            type="button"
            aria-label={next ? `Điểm tiếp theo: ${next.title}` : 'Không có điểm tiếp theo'}
            title={next ? `Điểm tiếp theo: ${next.title}` : 'Không có điểm tiếp theo'}
            disabled={!next}
            onClick={() => next && onDestinationChange(next)}
          >
            <ChevronRight size={21} />
          </button>
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
  onPreviewDestination,
  onPreviewEnable,
  onPreviewReset,
  savedIds,
  onToggleSaved,
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
  onPreviewDestination: (item: ItineraryItem) => void;
  onPreviewEnable: () => void;
  onPreviewReset: () => void;
  savedIds: readonly string[];
  onToggleSaved: (item: ItineraryItem) => void;
}) {
  const first = orderedItems()[0];
  const last = orderedItems().at(-1)!;
  const beforeTrip = effectiveNow < toInstant(first, 'start');
  const afterTrip = effectiveNow >= toInstant(last, 'end');
  const progress = Math.round((timeline.completed / primaryItinerary.length) * 100);

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
            <span><b>{primaryItinerary.length}</b> điểm</span>
            <span><b>{backupCount}</b> backup</span>
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
              <strong>Hoàn thành {primaryItinerary.length}/{primaryItinerary.length} hoạt động</strong>
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
            backups={getBackupsFor(timeline.current)}
            isSaved={savedIds.includes(timeline.current.id)}
            savedIds={savedIds}
            onToggleSaved={onToggleSaved}
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
            backups={getBackupsFor(timeline.next)}
            isSaved={savedIds.includes(timeline.next.id)}
            savedIds={savedIds}
            onToggleSaved={onToggleSaved}
          />
        </section>
      )}

      <PreviewControls
        previewDay={previewDay}
        previewMinutes={previewMinutes}
        enabled={isPreviewing}
        onDayChange={onPreviewDay}
        onMinutesChange={onPreviewMinutes}
        onDestinationChange={onPreviewDestination}
        onEnable={onPreviewEnable}
        onReset={onPreviewReset}
      />
    </div>
  );
}

type PhraseDisplay = {
  id: string;
  vi: string;
  zh: string;
  romanization: string;
  speech: string;
  note?: string;
  addressZh?: string;
};

function SavedScreen({
  savedIds,
  expandedId,
  onExpand,
  onDirections,
  onToggleSaved,
  onPreviewItem,
}: {
  savedIds: readonly string[];
  expandedId?: string;
  onExpand: (id: string) => void;
  onDirections: OpenDirections;
  onToggleSaved: (item: ItineraryItem) => void;
  onPreviewItem: (item: ItineraryItem) => void;
}) {
  const savedItems = itinerary.filter((item) => savedIds.includes(item.id));
  const savedDays = [...new Set(savedItems.map((item) => item.dayNumber))];

  return (
    <div className="screen saved-screen">
      <div className="screen-title-row">
        <div>
          <span className="section-kicker">Mở lại trong một chạm</span>
          <h1>Điểm đã lưu</h1>
        </div>
        <span className="item-count">{savedItems.length} điểm</span>
      </div>

      <section className="saved-intro">
        <span><Bookmark size={22} fill="currentColor" /></span>
        <div>
          <strong>Bookmark ngay chặng cần nhớ</strong>
          <p>Mở một mục trong tab Tuyến rồi bấm “Lưu điểm”. Danh sách này vẫn còn khi bạn mở app lại.</p>
        </div>
      </section>

      {savedItems.length === 0 ? (
        <section className="empty-saved">
          <span><Bookmark size={30} /></span>
          <h2>Chưa lưu điểm nào</h2>
          <p>Những chặng taxi, điểm hẹn hoặc tuyến backup là các mục nên lưu trước.</p>
        </section>
      ) : (
        <div className="saved-groups">
          {savedDays.map((day) => (
            <section className="saved-day-group" key={day}>
              <div className="saved-day-heading">
                <span>Ngày {day}</span>
                <small>{savedItems.filter((item) => item.dayNumber === day).length} điểm</small>
              </div>
              <div className="saved-list">
                {savedItems
                  .filter((item) => item.dayNumber === day)
                  .map((item) => (
                    <ActivityCard
                      key={item.id}
                      item={item}
                      expanded={expandedId === item.id}
                      onToggle={() => onExpand(item.id)}
                      onDirections={onDirections}
                      onPreview={() => onPreviewItem(item)}
                      backups={getBackupsFor(item)}
                      isSaved
                      savedIds={savedIds}
                      onToggleSaved={onToggleSaved}
                    />
                  ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function phraseToDisplay(phrase: TravelPhrase): PhraseDisplay {
  return {
    id: phrase.id,
    vi: phrase.vi,
    zh: phrase.zh,
    romanization: phrase.romanization,
    speech: phrase.zh,
    note: phrase.note,
  };
}

function taxiToDisplay(destination: TaxiDestination): PhraseDisplay {
  return {
    id: `taxi-${destination.id}`,
    vi: `Đưa mình đến ${destination.nameVi}`,
    zh: `請帶我去${destination.nameZh}，謝謝。`,
    romanization: destination.romanization,
    speech: destination.speech,
    note: destination.nameZh,
    addressZh: destination.addressZh,
  };
}

function getTaxiMapUrl(destination: TaxiDestination) {
  const params = new URLSearchParams({ api: '1', query: destination.mapQuery });
  return `https://www.google.com/maps/search/?${params.toString()}`;
}

function PhrasesScreen({
  onOpenPhrase,
  onSpeak,
}: {
  onOpenPhrase: (phrase: PhraseDisplay) => void;
  onSpeak: (text: string) => void;
}) {
  const [category, setCategory] = useState<PhraseCategory | 'all'>('all');
  const visiblePhrases =
    category === 'all'
      ? travelPhrases
      : travelPhrases.filter((phrase) => phrase.category === category);

  return (
    <div className="screen phrases-screen">
      <div className="screen-title-row">
        <div>
          <span className="section-kicker">Việt · 中文 · Pinyin</span>
          <h1>Câu nói bỏ túi</h1>
        </div>
        <Languages size={28} />
      </div>

      <section className="phrase-hero">
        <div>
          <span>ZH–TW</span>
          <h2>Chạm để đưa người địa phương xem</h2>
          <p>Nút loa đọc bằng giọng Hoa Đài Loan có sẵn trên điện thoại.</p>
        </div>
        <Volume2 size={30} />
      </section>

      <section className="taxi-section">
        <div className="section-heading slim">
          <div>
            <span className="section-kicker">Đưa tài xế xem</span>
            <h2>Địa chỉ taxi chính xác</h2>
          </div>
          <Navigation size={21} />
        </div>
        <div className="taxi-destination-list">
          {taxiDestinations.map((destination) => {
            const display = taxiToDisplay(destination);
            return (
              <article className="taxi-destination-card" key={destination.id}>
                <button type="button" className="taxi-destination-main" onClick={() => onOpenPhrase(display)}>
                  <span className="taxi-index">計</span>
                  <span>
                    <small>{destination.nameVi}</small>
                    <strong lang="zh-Hant">{destination.nameZh}</strong>
                    <em lang="zh-Hant">{destination.addressZh}</em>
                  </span>
                  <Maximize2 size={17} />
                </button>
                <div className="taxi-destination-actions">
                  <button type="button" onClick={() => onSpeak(destination.speech)}>
                    <Volume2 size={16} /> Đọc
                  </button>
                  <a href={getTaxiMapUrl(destination)} target="_blank" rel="noreferrer">
                    <Map size={16} /> Bản đồ
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="phrasebook-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Dùng nhanh</span>
            <h2>Câu thiết yếu</h2>
          </div>
          <span className="item-count">{visiblePhrases.length} câu</span>
        </div>

        <div className="phrase-filter" role="group" aria-label="Lọc câu nói">
          <button type="button" className={category === 'all' ? 'active' : ''} onClick={() => setCategory('all')}>
            Tất cả
          </button>
          {(Object.keys(phraseCategoryLabels) as PhraseCategory[]).map((key) => (
            <button type="button" className={category === key ? 'active' : ''} key={key} onClick={() => setCategory(key)}>
              {phraseCategoryLabels[key]}
            </button>
          ))}
        </div>

        <div className="phrase-list">
          {visiblePhrases.map((phrase) => {
            const display = phraseToDisplay(phrase);
            return (
              <article className="phrase-card" key={phrase.id}>
                <button type="button" className="phrase-card-main" onClick={() => onOpenPhrase(display)}>
                  <span>
                    <small>{phraseCategoryLabels[phrase.category]} · {phrase.vi}</small>
                    <strong lang="zh-Hant">{phrase.zh}</strong>
                    <em>{phrase.romanization}</em>
                  </span>
                  <Maximize2 size={17} />
                </button>
                <button
                  type="button"
                  className="phrase-speak-button"
                  aria-label={`Đọc câu: ${phrase.vi}`}
                  onClick={() => onSpeak(phrase.zh)}
                >
                  <Volume2 size={18} /> Nghe phát âm
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="phrase-emergency-note">
        <ShieldAlert size={19} />
        <span><strong>Khi cần khẩn cấp:</strong> gọi 110 (cảnh sát), 119 (cấp cứu/cứu hỏa); thử 112 nếu điện thoại không gọi được hai số trên.</span>
      </section>
    </div>
  );
}


function RouteScreen({
  selectedDay,
  onDayChange,
  expandedId,
  onExpand,
  onDirections,
  savedIds,
  onToggleSaved,
}: {
  selectedDay: number;
  onDayChange: (day: number) => void;
  expandedId?: string;
  onExpand: (id: string) => void;
  onDirections: OpenDirections;
  savedIds: readonly string[];
  onToggleSaved: (item: ItineraryItem) => void;
}) {
  const routes = primaryItinerary.filter(
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
        <span>Chọn xuất phát từ vị trí hiện tại hoặc điểm đầu trong plan. Tuyến có rủi ro đã kèm phương án BACKUP ngay bên dưới.</span>
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
                backups={getBackupsFor(item)}
                isSaved={savedIds.includes(item.id)}
                savedIds={savedIds}
                onToggleSaved={onToggleSaved}
                compact
              />
              <button type="button" onClick={() => onDirections(item)} className="route-map-cta">
                Mở Google Maps <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </section>

      <a className="source-card" href={SOURCE_URL} target="_blank" rel="noreferrer">
        <span className="source-icon"><Database size={21} /></span>
        <span>
          <small>Nguồn lịch trình</small>
          <strong>34 mục từ Notion · {backupCount} backup</strong>
          <em>Cập nhật {SYNCED_LABEL} · app giữ snapshot để xem offline</em>
        </span>
        <ArrowUpRight size={19} />
      </a>
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

type DepartureChoice = 'plan' | 'now';

function getPlanRouteTiming(item: ItineraryItem) {
  const [, month, day] = item.date.split('-');
  const usesDepartureTime = item.categories.includes('Di chuyển');
  return {
    compact: `${item.start} · ${day}/${month}`,
    instruction: `${item.start} ngày ${day}/${month}`,
    mapsAction: usesDepartureTime ? 'Rời đi lúc' : 'Đến lúc',
  };
}

function MapChoiceDialog({ item, onClose }: { item: ItineraryItem; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [departureChoice, setDepartureChoice] = useState<DepartureChoice>('plan');
  const plannedOrigin = getPlannedOrigin(item);
  const destination = getMapDestination(item);
  const directionsIssue = getDirectionsIssue(item);
  const planDirectionsIssue = getPlanDirectionsIssue(item);
  const currentUrl = getDirectionsUrl(item, 'current');
  const plannedUrl = getDirectionsUrl(item, 'plan');
  const isTransitRoute = currentUrl
    ? new URL(currentUrl).searchParams.get('travelmode') === 'transit'
    : false;
  const planTiming = getPlanRouteTiming(item);

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

        {isTransitRoute && (
          <section className="map-departure-choice" aria-labelledby="map-departure-title">
            <div className="map-departure-heading">
              <span><Clock3 size={17} /></span>
              <div>
                <small>Thời điểm tìm chuyến</small>
                <strong id="map-departure-title">Tính tuyến theo giờ nào?</strong>
              </div>
            </div>

            <div className="map-departure-toggle" role="group" aria-label="Chọn thời gian tính tuyến">
              <button
                type="button"
                aria-pressed={departureChoice === 'plan'}
                onClick={() => setDepartureChoice('plan')}
              >
                <CalendarDays size={17} />
                <span>
                  <strong>Theo plan</strong>
                  <small>{planTiming.compact}</small>
                </span>
              </button>
              <button
                type="button"
                aria-pressed={departureChoice === 'now'}
                onClick={() => setDepartureChoice('now')}
              >
                <TimerReset size={17} />
                <span>
                  <strong>Bây giờ</strong>
                  <small>Giờ hiện tại</small>
                </span>
              </button>
            </div>

            <p className="map-departure-hint" id="map-departure-hint" aria-live="polite">
              <Info size={15} />
              {departureChoice === 'plan' ? (
                <span>
                  <strong>Miễn phí · 1 bước trong Maps:</strong>{' '}
                  chọn “{planTiming.mapsAction}” → {planTiming.instruction}.
                </span>
              ) : (
                <span>Maps sẽ hiện các chuyến sắp khởi hành ngay lúc bạn mở.</span>
              )}
            </p>
          </section>
        )}

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
            <span>Maps sẽ tính chuyến MRT / bus phù hợp với giờ bạn chọn. Các ga trung gian vẫn nằm trong plan.</span>
          </p>
        )}
      </section>
    </dialog>
  );
}

function PhraseDisplayDialog({
  phrase,
  onClose,
  onSpeak,
}: {
  phrase: PhraseDisplay;
  onClose: () => void;
  onSpeak: (text: string) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

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
  }, [phrase]);

  const closeDialog = () => dialogRef.current?.close();

  return (
    <dialog
      className="phrase-display-dialog"
      ref={dialogRef}
      aria-labelledby="phrase-display-zh"
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        closeDialog();
      }}
    >
      <section className="phrase-display-sheet">
        <header>
          <span>給對方看 · ĐƯA NGƯỜI ĐỊA PHƯƠNG XEM</span>
          <button type="button" onClick={closeDialog} aria-label="Đóng câu nói toàn màn hình">
            <X size={23} />
          </button>
        </header>
        <div className="phrase-display-content">
          {phrase.note && <small lang="zh-Hant">{phrase.note}</small>}
          <h2 id="phrase-display-zh" lang="zh-Hant">{phrase.zh}</h2>
          {phrase.addressZh && <strong className="phrase-display-address" lang="zh-Hant">{phrase.addressZh}</strong>}
          <p className="phrase-display-romanization">{phrase.romanization}</p>
          <p className="phrase-display-vi">{phrase.vi}</p>
        </div>
        <footer>
          <button className="phrase-display-speak" type="button" onClick={() => onSpeak(phrase.speech)}>
            <Volume2 size={22} /> Đọc bằng tiếng Hoa Đài Loan
          </button>
          <button className="phrase-display-close" type="button" onClick={closeDialog}>Đóng</button>
        </footer>
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
  const [phraseDisplay, setPhraseDisplay] = useState<PhraseDisplay>();
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem(SAVED_STORAGE_KEY) ?? '[]');
      return Array.isArray(stored)
        ? stored.filter((id): id is string => typeof id === 'string' && itinerary.some((item) => item.id === id))
        : [];
    } catch {
      return [];
    }
  });

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

  useEffect(() => {
    window.localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedIds));
  }, [savedIds]);

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

  const previewDestination = (item: ItineraryItem) => {
    const position = getPreviewPosition(item);
    setPreviewDay(position.day);
    setSelectedDay(position.day);
    setPreviewMinutes(position.minutes);
    setIsPreviewing(true);
  };

  const previewItem = (item: ItineraryItem) => {
    previewDestination(item);
    setMode('now');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSaved = (item: ItineraryItem) => {
    setSavedIds((current) => {
      const isRemoving = current.includes(item.id);
      setToast(isRemoving ? 'Đã bỏ khỏi điểm lưu' : 'Đã lưu để mở nhanh');
      return isRemoving ? current.filter((id) => id !== item.id) : [...current, item.id];
    });
  };

  const speakTraditionalChinese = (text: string) => {
    if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
      setToast('Điện thoại này chưa hỗ trợ đọc giọng nói');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-TW';
    utterance.rate = 0.78;
    const taiwanVoice = window.speechSynthesis
      .getVoices()
      .find((voice) => voice.lang.toLowerCase().replace('_', '-').startsWith('zh-tw'));
    if (taiwanVoice) utterance.voice = taiwanVoice;
    window.speechSynthesis.speak(utterance);
    setToast('Đang đọc bằng giọng zh-TW');
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
            onPreviewDestination={previewDestination}
            onPreviewEnable={() => setIsPreviewing(true)}
            onPreviewReset={() => setIsPreviewing(false)}
            savedIds={savedIds}
            onToggleSaved={toggleSaved}
          />
        )}
        {mode === 'saved' && (
          <SavedScreen
            savedIds={savedIds}
            expandedId={expandedId}
            onExpand={toggleExpanded}
            onDirections={setMapItem}
            onToggleSaved={toggleSaved}
            onPreviewItem={previewItem}
          />
        )}
        {mode === 'phrases' && (
          <PhrasesScreen onOpenPhrase={setPhraseDisplay} onSpeak={speakTraditionalChinese} />
        )}
        {mode === 'route' && (
          <RouteScreen
            selectedDay={selectedDay}
            onDayChange={setSelectedDay}
            expandedId={expandedId}
            onExpand={toggleExpanded}
            onDirections={setMapItem}
            savedIds={savedIds}
            onToggleSaved={toggleSaved}
          />
        )}
      </main>

      {mode === 'now' && <QuickMap item={quickTarget} relation={quickRelation} onDirections={setMapItem} />}
      <BottomNav
        mode={mode}
        onChange={(nextMode) => {
          setMode(nextMode);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {mapItem && <MapChoiceDialog item={mapItem} onClose={() => setMapItem(undefined)} />}
      {phraseDisplay && (
        <PhraseDisplayDialog
          phrase={phraseDisplay}
          onClose={() => setPhraseDisplay(undefined)}
          onSpeak={speakTraditionalChinese}
        />
      )}

      {toast && <div className="toast"><CircleDot size={15} /> {toast}</div>}
      <span className="sr-only">Dữ liệu đồng bộ lần cuối {SYNCED_LABEL}</span>
    </div>
  );
}

export default App;
