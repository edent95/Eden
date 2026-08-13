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

  // Let media go straight to the network so the browser keeps full control of
  // Range requests and partial responses.
  if (MEDIA_PATTERN.test(new URL(event.request.url).pathname)) return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match('./'))),
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok && new URL(event.request.url).origin === self.location.origin) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request)),
  );
});
