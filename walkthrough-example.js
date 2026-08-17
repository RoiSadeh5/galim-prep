/* ============================================================
 *  walkthrough-example.js — הסכימה של פתרון מונפש.
 *  זה הפורמט שהסוכנים בשלבים 6–7 מייצרים.
 *  להעתיק את הקובץ לכל שנה: walkthrough-2025.js וכו'.
 * ============================================================ */

/* ---------- א. פתרון מונפש לשאלת מבחן ---------- */
window.EXAM_WALKTHROUGHS = window.EXAM_WALKTHROUGHS || {};

window.EXAM_WALKTHROUGHS["2025-X"] = {
  label: "מבחן 2025 מועד א׳ (X)",
  year: 2025,
  term: "X",                       /* X = מועד א׳ · Y = מועד ב׳ */
  questions: [
    {
      id: "2025X-q1",
      num: "שאלה 1",
      topic: "<נושא>",             /* חייב להתאים ל-topicPages ב-config */
      points: 16,

      prompt: "<b>נוסח השאלה המלא</b> כפי שהוא בשאלון.",
      code: "for (i = 0; i < n; i++)\n    cnt++;",
      answer: "התשובה הסופית בשורה אחת.",
      idea: "רעיון הפתרון ב-2–3 משפטים: מה המפתח שפותח את השאלה.",

      formulas: [
        { label: "שם הכלל", value: "T(n) = 2T(n/2) + Theta(n)" }
      ],
      traps: [
        "מלכודת נפוצה — ולמה היא מפילה."
      ],

      steps: [
        {
          title: "כותרת קצרה לשלב",
          text: "הסבר מלא. מסביר <b>למה</b>, לא רק מה.",
          formula: "k = (n/2) / (n/1000) = 500",   /* אופציונלי, LTR */
          visual: {                                 /* אופציונלי אך רצוי */
            type: "rows",
            items: [
              { type: "code", lines: ["for (i=1; i<=n; i*=2)", "    cnt++;"], mark: [1] },
              { type: "vars", items: [{ k: "i", v: 4, c: "hot" }, { k: "cnt", v: 2 }] }
            ]
          }
        }
        /* … 8–12 שלבים. שלב לכל איטרציה או קריאה רקורסיבית. */
      ]
    }
  ]
};

/* ---------- ב. פתרון מונפש לשאלת תרגול ---------- */
window.BANK_WALKTHROUGHS = window.BANK_WALKTHROUGHS || {};

Object.assign(window.BANK_WALKTHROUGHS, {
  "BK-1.1": {                      /* המפתח = id של השאלה ב-questions.js */
    title: "כותרת קצרה לפתרון",
    steps: [
      {
        title: "כותרת השלב",
        text: "ההסבר.",
        formula: "n = 1234 → n % 10 = 4",
        visual: { type: "array", cells: [5, { v: 7, c: "hot" }, null], base: 0 }
      }
      /* … 6–10 שלבים */
    ]
  }
});

/* ============================================================
 *  סוגי ה-visual שמנוע ההנפשה יודע לצייר (viz.js):
 *
 *  {type:"array", cells:[5,{v:7,c:"hot"},null], base:0,
 *                 brace:{from:1,to:2,text:"התחום"}, caption:"…"}
 *  {type:"stack", items:["3","7"]}              // items[0] = תחתית
 *  {type:"queue", items:["A","B"]}              // items[0] = ראש
 *  {type:"list",  nodes:[5,{v:2,c:"hot"}], kind:"single|double|circular"}
 *  {type:"tree",  root:{v:8,c:"hot",l:{v:3},r:{v:10}}}
 *  {type:"code",  lines:["…"], mark:[2]}        // mark 1-based
 *  {type:"table", head:["i","cnt"], rows:[[0,{v:5,c:"hot"}]]}
 *  {type:"vars",  items:[{k:"i",v:3,c:"hot"}]}
 *  {type:"call",  frames:[{label:"rec(13)"}]}   // frames[0] = חיצונית
 *  {type:"note",  text:"הדגשה"}
 *  {type:"rows",  items:[ <visual>, <visual> ]}
 *
 *  צבעים: hot (מה שמסתכלים עליו) · good · bad · info · dim
 *
 *  קורס אחר? מוסיפים סוג חדש ב-viz.js:
 *  1. פונקציה שמקבלת spec ומחזירה HTML
 *  2. רישום ב-RENDERERS
 *  3. CSS למחלקות החדשות
 * ============================================================ */
