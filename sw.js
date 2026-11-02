// Offline-Cache: Die App funktioniert nach dem ersten Öffnen auch ohne Netz (z. B. im Keller).
// Nach Änderungen an der App die Versionsnummer erhöhen.
const CACHE = 'dgx-aufnahme-v5';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './lib/xlsx.full.min.js',
  './lib/jszip.min.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  // Seite selbst: erst Netz (damit Updates ankommen), sonst Cache
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put('./index.html', copy)); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Bibliotheken, Icons: erst Cache, sonst Netz
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});
