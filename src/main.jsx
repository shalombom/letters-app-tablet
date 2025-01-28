import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// קוד להפעלת מסך מלא
function enableFullScreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  
  // הסתרת הכפתורים אחרי הלחיצה
  const buttons = document.querySelectorAll('.fullscreen-btn');
  buttons.forEach(btn => {
    btn.style.display = 'none';
  });
}

// הוספת כפתור מסך מלא
window.addEventListener('load', () => {
  // כפתור ימני
  const rightBtn = document.createElement('button');
  rightBtn.innerHTML = '';  // מסיר את האייקון
  rightBtn.className = 'fullscreen-btn';
  rightBtn.style.cssText = `
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 20px;
  `;
  rightBtn.onclick = enableFullScreen;
  document.body.appendChild(rightBtn);
});

// ניהול Service Worker
if ('serviceWorker' in navigator) {
  // ניקוי Service Workers ישנים
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister()
        .then(() => console.log('SW unregistered successfully'))
        .catch(error => console.error('SW unregister error:', error));
    }
  }).catch(error => console.error('Get registrations error:', error));

  // רישום Service Worker חדש
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then(registration => {
        console.log('SW registered successfully:', registration);
        
        // טיפול בסגירת האפליקציה
        window.addEventListener('beforeunload', () => {
          registration.unregister()
            .then(() => console.log('SW unregistered on close'))
            .catch(error => console.error('SW unregister error on close:', error));
        });

        // טיפול בעדכוני Service Worker
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'activated') {
              console.log('New SW activated');
              window.location.reload();
            }
          });
        });
      })
      .catch(error => {
        console.error('SW registration failed:', error);
      });
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
