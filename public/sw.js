const CACHE_NAME = 'tripguide-shell-v4';
const scopePath = new URL(self.registration.scope).pathname;
const scoped = (path) => new URL(path, self.registration.scope).pathname;
const APP_SHELL = [
  scopePath,
  scoped('index.html'),
  scoped('manifest.webmanifest'),
  scoped('icon.svg'),
  scoped('icon-192.png'),
  scoped('icon-512.png'),
  scoped('apple-touch-icon.png'),
  scoped('images/taiwan-hero.webp'),
  scoped('images/yangmingshan.webp'),
  scoped('images/jiufen-shifen.webp'),
];

async function cacheBuiltAssets(cache) {
  const response = await fetch(scoped('index.html'));
  const html = await response.text();
  const paths = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)]
    .map((match) => new URL(match[1], self.registration.scope))
    .filter((url) => url.origin === self.location.origin)
    .map((url) => url.pathname);
  await cache.addAll([...new Set(paths)]);
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(async (cache) => {
        await cache.addAll(APP_SHELL);
        await cacheBuiltAssets(cache);
      })
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const contentType = response.headers.get('content-type') ?? '';
          if (!response.ok || !contentType.includes('text/html')) {
            throw new Error(`Navigation failed with ${response.status}`);
          }
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(scoped('index.html'), copy));
          return response;
        })
        .catch(() => caches.match(scoped('index.html'))),
    );
    return;
  }

  const cacheableDestination = ['style', 'script', 'worker', 'image', 'font'].includes(
    request.destination,
  );
  const cacheableMetadata = url.pathname.endsWith('/manifest.webmanifest');

  if (!cacheableDestination && !cacheableMetadata) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    }),
  );
});

