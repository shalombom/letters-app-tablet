const CACHE_NAME = 'nikud-app-v4';
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
  self.skipWaiting();
});

// הפעלת Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
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
    fetch(event.request)
      .then(response => {
        // אם הבקשה הצליחה, נחזיר את התשובה ישירות
        return response;
      })
      .catch(() => {
        // רק אם יש בעיית רשת, ננסה להשתמש בקאש
        return caches.match(event.request);
      })
  );
});

// מניעת התנהגות ברירת מחדל של אירועי מגע
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
}); 