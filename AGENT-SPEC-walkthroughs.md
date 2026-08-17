# מפרט לסוכני הפתרונות המונפשים — גלים 90929

## הפלט
קובץ `walkthrough-<שנה>.js` בתבנית (הסכימה המלאה ב-walkthrough-example.js):

```js
window.EXAM_WALKTHROUGHS = window.EXAM_WALKTHROUGHS || {};
window.EXAM_WALKTHROUGHS["2026-A"] = {
  label: "מבחן 2026 מועד א'",
  year: 2026,
  term: "A",                       /* X / Y / A */
  questions: [
    {
      id: "2026A-q1",
      num: "שאלה 1",
      topic: "מיתר-מונע-בקצה",     /* חייב להתאים ל-topicPages ב-config.js */
      points: 25,
      prompt: "נוסח מלא של השאלה כולל כל הסעיפים, KaTeX בלוכסן כפול.",
      answer: "התשובות הסופיות של כל הסעיפים, בשורה-שתיים.",
      idea: "רעיון הפתרון ב-2–3 משפטים: מה המפתח שפותח את השאלה.",
      formulas: [
        { label: "מהירות הגל", value: "v = √(T/ρ)" }   /* value בטקסט פשוט/unicode — לא KaTeX */
      ],
      traps: ["מלכודת — ולמה היא מפילה."],
      steps: [
        {
          title: "כותרת קצרה לשלב",
          text: "הסבר מלא שמסביר <b>למה</b>, לא רק מה. KaTeX: \\\\(u=x-vt\\\\).",
          formula: "v = \\\\sqrt{1800/0.02} = 300",   /* אופציונלי; מוצג LTR, KaTeX עובד */
          visual: { type: "wave", ... }               /* אופציונלי אך רצוי מאוד */
        }
        /* 8–14 שלבים לשאלה: שלב לכל סעיף לפחות, ושלב לכל מעבר מהותי */
      ]
    }
  ]
};
```

## חוקי התוכן
1. **שלב לכל צעד חשיבה**: זיהוי נתונים → נוסחה → הצבה → תוצאה. סעיף של 8 נק' = 2–4 שלבים.
2. **visual בכמה שיותר שלבים** — סוגי `wave` (פרופילים, פולסים, צמתים, אופנים), `vars` (ערכים שחושבו עד כה), `table` (טבלת מקדמים/פאזות), `note`, `rows`. מפרט ה-wave המלא ב-AGENT-SPEC-topics.md §"מפרט הוויזואל".
3. **לאמת כל חישוב בעצמך** מול הפתרון הרשמי — לא להעתיק עיוור. סתירה? פתור נכון וציין בשדה traps.
4. **תחומי תוקף** בכל נוסחת גל (דגש 2026).
5. KaTeX ב-JS: לוכסן כפול. בתוויות SVG — unicode פשוט בלבד.
6. **לשמור את הקובץ אחרי כל שאלה** (Write מחדש מלא).
7. `node --check` חייב לעבור.

## בדיקת סכימה
אחרי הכתיבה הרץ:
```bash
cd /Users/roisadeh/Desktop/Projects/galim-prep && node -e "
global.window={EXAM_WALKTHROUGHS:{}};
require('./walkthrough-<שנה>.js');
const w=Object.values(window.EXAM_WALKTHROUGHS)[0];
console.log(w.label, w.questions.length+' questions',
  w.questions.map(q=>q.id+':'+q.steps.length+' steps').join(', '));
w.questions.forEach(q=>{ if(!q.prompt||!q.steps||q.steps.length<6) throw new Error(q.id+' thin'); });
console.log('SCHEMA OK');"
```
