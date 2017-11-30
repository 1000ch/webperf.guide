const CACHE_KEY = '20171130';
const CACHE_FILES = [
  '/',
  'base.css',
  'button.css',
  'comment.css',
  'container.css',
  'headline.css',
  'inner.css',
  'normalize.css',
  'outer.css',
  'outline.css',
  'profile.css',
  'share.css',
  'summary.css',
  'cover.png',
  'ahomu.webp',
  'ahomu.png',
  '1000ch.webp',
  '1000ch.jpg',
  'mizchi.webp',
  'mizchi.jpg',
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
  const deletion = caches.keys()
    .then(keys => keys.filter(key => key !== CACHE_KEY))
    .then(keys => Promise.all(keys.map(key => caches.delete(key))));

  event.waitUntil(deletion.then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  if (!CACHE_FILES.some(file => event.request.url.includes(file))) {
    return;
  }

  const fetching = caches.open(CACHE_KEY).then(cache => {
    return cache.match(event.request).then(response => {
      return response || fetch(event.request.clone()).then(response => {
        if (!response.ok) {
          return;
        }

        cache.put(event.request, response.clone());
        return response;
      });
    });
  });

  event.respondWith(fetching);
});
