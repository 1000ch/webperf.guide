const CACHE_KEY = '20171216';
const CACHE_FILES = [
  '/',
  'normalize.css',
  'base.css',
  'layout.css',
  'component.css',
  'cover.png',
  'ahomu.webp',
  'ahomu.png',
  '1000ch.webp',
  '1000ch.jpg',
  'mizchi.webp',
  'mizchi.jpg',
  't32k.webp',
  't32k.jpg',
  'icon-48.png',
  'icon-96.png',
  'icon-192.png',
  'icon-256.png',
  'icon-512.png',
  'twitter-button.js',
  'facebook-button.js'
];

self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    const deleteKeys = keys.filter(key => key !== CACHE_KEY);
    await Promise.all(deleteKeys.map(key => caches.delete(key)));

    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.hostname !== 'webperf.guide') {
    return;
  }

  if (!CACHE_FILES.some(file => url.pathname.includes(file))) {
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_KEY);
    const data = await cache.match(request);
    if (data) {
      return data;
    }

    const response = await fetch(request.clone());
    if (!response.ok) {
      return;
    }

    await cache.put(request, response.clone());

    return response;
  })());
});
