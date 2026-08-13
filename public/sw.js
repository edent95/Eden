// CACHE_NAME is rewritten at build time by the `service-worker-build-stamp`
// plugin in vite.config.ts. That is what makes this file's bytes differ on
// every deploy, which is how the browser detects a new service worker at all.
const CACHE_NAME = 'eden-site-dev';
const APP_SHELL = [
  './',
  './site.webmanifest',
  './eden-app-icon.svg',
  './conways-game-of-life',
  './conway.webmanifest',
  './conway-app-icon.svg',
  './film-gallery',
  './film-gallery.webmanifest',
  './film-gallery-app-icon.svg',
];

// Video is streamed with Range requests and a single file can exceed the whole
// Cache Storage quota on iOS. Never route it through the worker.
const MEDIA_PATTERN = /\.(mp4|m4v|mov|webm)$/i;

// Vite writes every JS/CSS chunk into `assets/` with a content hash in the
// filename, so one of these URLs always answers with the same bytes. Only
// those are safe to serve cache-first; every other path keeps its URL across
// deploys and has to be revalidated.
const HASHED_ASSET_PATTERN = /\/assets\/[^/]+-[A-Za-z0-9_-]{8,}\.[a-z0-9]+$/;

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const sameOrigin = url.origin === self.location.origin;

  // Let media go straight to the network so the browser keeps full control of
  // Range requests and partial responses.
  if (MEDIA_PATTERN.test(url.pathname)) return;

  // Documents are never written to the cache here. An HTML page names the
  // hashed asset files of the deploy it came from, so a document cached on a
  // previous deploy asks for chunks this cache no longer holds — which renders
  // as a half-old page rather than an honest failure. The only cached HTML is
  // the app shell that `install` fetches fresh for every worker version, so it
  // can only ever pair with its own assets.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches
          .match(event.request, { cacheName: CACHE_NAME })
          .then((cached) => cached || caches.match('./', { cacheName: CACHE_NAME })),
      ),
    );
    return;
  }

  if (sameOrigin && HASHED_ASSET_PATTERN.test(url.pathname)) {
    event.respondWith(
      caches.match(event.request, { cacheName: CACHE_NAME }).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        });
      }),
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok && sameOrigin) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request, { cacheName: CACHE_NAME })),
  );
});
