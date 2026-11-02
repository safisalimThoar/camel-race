// سباق الهجن: يعمل التطبيق دون إنترنت
const CACHE = 'camel-race-7fb5f85835';
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-64.png",
  "./fonts/lalezar-arabic-400-normal.woff2",
  "./fonts/lalezar-latin-400-normal.woff2",
  "./fonts/baloo-bhaijaan-2-arabic-500-normal.woff2",
  "./fonts/baloo-bhaijaan-2-latin-500-normal.woff2",
  "./fonts/baloo-bhaijaan-2-arabic-600-normal.woff2",
  "./fonts/baloo-bhaijaan-2-latin-600-normal.woff2",
  "./fonts/baloo-bhaijaan-2-arabic-700-normal.woff2",
  "./fonts/baloo-bhaijaan-2-latin-700-normal.woff2",
  "./fonts/baloo-bhaijaan-2-arabic-800-normal.woff2",
  "./fonts/baloo-bhaijaan-2-latin-800-normal.woff2"
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); return res; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  })));
});
