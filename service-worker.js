// A simple service worker to enable PWA features and bypass caching for the iframe
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
    // Check if the request is for the iframe content
    // We want to fetch it directly from the network to ensure it's always up-to-date
    if (event.request.url.includes('google.com/presentation/')) {
        event.respondWith(fetch(event.request));
        return;
    }

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
