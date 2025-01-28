# פתרון מהיר לבעיות שרת

## אם האפליקציה לא עולה או נופלת פתאום:

### פתרון בשני צעדים:
1. פתח CMD כמנהל והעתק-הדבק את השורות הבאות:
```
cd C:\Users\Shalom\Desktop\אפליקציות אותיות\letters-app- tablet
taskkill /F /FI "IMAGENAME eq node.exe"
npm run dev
```

2. פתח בדפדפן:
```
http://localhost:5174
```

### אם זה לא עובד:
1. סגור את כל הדפדפנים (גם במחשב וגם בטאבלט)
2. חכה 30 שניות
3. חזור על הצעדים למעלה

### חשוב לזכור:
- אל תנסה לתקן שום דבר אחר
- פשוט תעקוב אחרי הצעדים בדיוק
- אם זה לא עובד אחרי 2-3 נסיונות, חכה כמה דקות ונסה שוב

# פתרון בעיות שרת - אפליקציית אותיות

## במקרה שהשרת נופל או לא מגיב

אם האפליקציה לא עולה או נופלת, יש לבצע את הצעדים הבאים:

1. לפתוח CMD (Command Prompt) כמנהל מערכת
2. לנווט לתיקיית הפרויקט:
```
cd C:\Users\Shalom\Desktop\אפליקציות אותיות\letters-app- tablet
```

3. להריץ את הפקודה הבאה כדי לסגור את כל תהליכי node שתקועים:
```
taskkill /F /FI "IMAGENAME eq node.exe"
```

4. להריץ מחדש את השרת:
```
npm run dev
```

5. לפתוח את הדפדפן בכתובת:
```
http://localhost:5174
```

## הערות חשובות
- אם האפליקציה נופלת שוב, יש לחזור על התהליך
- מומלץ לסגור את כל הדפדפנים (במחשב ובטאבלט) לפני הרצה מחדש
- יש להמתין כ-30 שניות בין סגירת השרת להרצה מחדש

פרויקט ניקוד - Hebrew Nikud Learning System
תיאור הפרויקט
מערכת אינטראקטיבית ללימוד וזיהוי סימני ניקוד בעברית, המבוססת על React + Vite. המערכת מציגה את סימני הניקוד בצורה מדויקת ומאפשרת תרגול והתנסות.
סביבת פיתוח
React עם Vite
HMR (Hot Module Replacement)
ESLint
שני plugins רשמיים זמינים:
@vitejs/plugin-react (משתמש ב-Babel)
@vitejs/plugin-react-swc (משתמש ב-SWC)
מבנה הפרויקט
קומפוננטות ראשיות
1. NikudTile
תא בסיסי להצגת אותיות וסימני ניקוד
props: {
width: number (default: 80px),
height: number (default: 120px),
children: ReactNode
}
מאפיינים חשובים:
מסגרת חיצונית: שקופה (rgba(255, 255, 255, 0))
מסגרת פנימית:
רוחב: 60% מרוחב התא
גובה: 50% מגובה התא
מיקום: ממורכז אבסולוטית
יישור תוכן: לתחתית
מרווחים: 5px בין תאים
2. סימני ניקוד
כל הסימנים בנויים כ-SVG עם מאפיינים מדויקים:
VavHolam / VavShuruk
// מאפיינים משותפים
width: 30px
height: 70px
viewBox: "0 0 30 70"
position: absolute
left: -10px
transform: translate(-50%, -50%)
// וו חולם
קו אנכי: M15 15 V56
נקודה עליונה: cx="15" cy="6"
// וו שורוק
קו אנכי: זהה לחולם
נקודה צדדית: cx="6" cy="37"
Hirik
width: 30px
height: 30px
viewBox: "0 0 30 30"
position: absolute
marginTop: 1px
נקודה: cx="15" cy="10" r="4"
Kamatz
width: 30px
height: 15px
viewBox: "0 0 30 15"
position: absolute
marginTop: -2px
קו אופקי: x1="7.5" y1="7.5" x2="22.5" y2="7.5"
קו אנכי: x1="15" y1="7.5" x2="15" y2="15"
Patach
width: 30px
height: 30px
viewBox: "0 0 30 30"
position: absolute
marginTop: 4px
קו: M5 15 L25 15
strokeWidth: 8
strokeLinecap: round
מבנה תיקיות
project-root/
├── src/
│ ├── components/
│ │ ├── NikudTile.jsx
│ │ └── NikudSigns/
│ │ ├── VavHolam.jsx
│ │ ├── VavShuruk.jsx
│ │ ├── Hirik.jsx
│ │ ├── Kamatz.jsx
│ │ ├── PatachSign.jsx
│ │ ├── Segol.jsx
│ │ ├── Shva.jsx
│ │ ├── Tzereh.jsx
│ │ └── ...
├── README.md
└── ...
מבנה המסך
+--------------------------------+
| מחסן ניקוד |
| שורה 1: |
| +----+ +----+ +----+ +----+ |
| |וּ | |וֹ | | | | | |
| +----+ +----+ +----+ +----+ |
| שורה 2: |
| +----+ +----+ +----+ +----+ |
| | | | | | | | | |
| +----+ +----+ +----+ +----+ |
| |
| אזור תרגול |
| +--------+ +--------+ |
| | | | | |
| +--------+ +--------+ |
| ▶ ▶ |
+--------------------------------+
מפרט טכני מדויק
מידות קריטיות
1. תא בודד (NikudTile):
רוחב: 80px
גובה: 120px
מסגרת פנימית: 60% מהרוחב, 50% מהגובה
מרווח: 5px
סימני ניקוד - מיקום אנכי:
וו חולם/שורוק: V56
חיריק: marginTop: 1px
קמץ: marginTop: -2px
פתח: marginTop: 4px
צבעים וקווים
צבע כללי: black
עובי קווים:
רגיל: 3px
פתח: 8px
מסגרות:
חיצונית: 2px solid transparent
פנימית: 1px solid black
הנחיות לפיתוח המשך
עקרונות מנחים
1. דיוק במיקום:
חשיבות עליונה למיקום מדויק של כל סימן
שמירה על פרופורציות קבועות
התייחסות לבסיס האות כנקודת ייחוס
תאימות:
בדיקה בדפדפנים שונים
תמיכה ברזולוציות שונות
שמירה על עקביות בתצוגה
תיעוד:
תיעוד מדויק של כל שינוי במיקום
הסבר על כל סימן ניקוד חדש
תיעוד החלטות עיצוביות
טיפים לפיתוח
שימוש בכלי המדידה של הדפדפן לוודא מיקום מדויק
בדיקת תצוגה במספר דפדפנים
גיבוי לפני שינויים משמעותיים
שמירה על עקביות בשמות ומבנה הקוד
הערות חשובות
כל שינוי במיקום דורש בדיקה מקיפה
יש לשמור על קוד נקי ומתועד
עדכון התיעוד במקביל לשינויי קוד
4. שמירה על גרסאות יציבות

# מעבר בין אפליקציות

## אם אפליקציה אחרת לא עולה (בעיית "המפתח"):

### פתרון מיידי - כדי להעלות אפליקציה אחרת:
1. סגור את האפליקציה הנוכחית (Ctrl+C בטרמינל)
2. פתח CMD כמנהל והעתק-הדבק:
```
taskkill /F /FI "IMAGENAME eq node.exe"
```
3. חכה 30 שניות
4. נווט לתיקייה של האפליקציה הרצויה והרץ:
```
npm run dev
```

### פתרון קבוע - תיקון בעיית "המפתח":
יש לבצע את השינויים הבאים בכל אחת מהאפליקציות:

1. פתח את הקובץ `src/main.jsx`
2. החלף את כל הקוד של Service Worker בקוד הבא:
```javascript
// ניהול Service Worker
if ('serviceWorker' in navigator) {
  // ניקוי Service Workers ישנים
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
    }
  });

  // רישום Service Worker חדש
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered:', registration);
        
        // טיפול בסגירת האפליקציה
        window.addEventListener('beforeunload', () => {
          registration.unregister()
            .then(() => console.log('SW unregistered'))
            .catch(error => console.log('SW unregister failed:', error));
        });
      })
      .catch(error => {
        console.log('SW registration failed:', error);
      });
  });
}
```

### איך לבדוק שהתיקון עובד:
1. הרץ את האפליקציה הראשונה
2. פתח את הקונסול בדפדפן (F12)
3. וודא שמופיעה ההודעה "SW registered"
4. סגור את האפליקציה (Ctrl+C בטרמינל)
5. רענן את הדף בדפדפן
6. וודא שמופיעה ההודעה "SW unregistered"
7. נסה להריץ אפליקציה אחרת - היא אמורה לעלות ללא בעיה

### אם עדיין יש בעיה:
1. סגור את כל הדפדפנים
2. מחק את ה-cache של הדפדפן
3. בצע את הפתרון המיידי שלמעלה