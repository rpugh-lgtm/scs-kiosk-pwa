// A simple service worker to enable PWA features
const CACHE_NAME = 'slides-kiosk-v1';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
];

self.addEventListener('install', (event) => {
    // Perform installation steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
