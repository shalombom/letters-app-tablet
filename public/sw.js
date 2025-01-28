const CACHE_NAME = 'nikud-app-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/App.jsx',
  '/src/index.css',
  '/src/main.jsx',
  '/video/kamatz.mp4',
  '/video/hirik.mp4',
  '/video/holam.mp4',
  '/video/segol.mp4',
  '/video/shuruk.mp4',
  '/sounds/kamatz.mp3',
  '/sounds/hirik.mp3',
  '/sounds/holam.mp3',
  '/sounds/segol.mp3',
  '/sounds/shuruk.mp3'
];

// התקנת Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Cache installation failed:', error);
      })
  );
  self.skipWaiting();
});

// הפעלת Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// טיפול בבקשות
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // החזרה מהקאש אם קיים
        if (response) {
          return response;
        }

        // אחרת, הבא מהשרת
        return fetch(event.request)
          .then((response) => {
            // בדוק אם התגובה תקינה
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // שמור עותק בקאש
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(error => {
            console.error('Fetch failed:', error);
            // אם יש שגיאה בפטצ', נחזיר דף שגיאה או תוכן ברירת מחדל
            return new Response('Network error occurred', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
}); 