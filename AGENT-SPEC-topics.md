# מפרט לסוכני עמודי הנושא — גלים 90929

## מה מייצרים
לכל נושא dNN שני קבצים:

1. **`fragments/dNN.html`** — אלמנט `<section class="pg" id="dNN"> … </section>` מלא (כולל `<h1>`).
2. **`topic-dNN.js`** — נגני אנימציה לעמוד (לפחות נגן אחד לנושא ליבה):
```js
window.TOPIC_PLAYERS = (window.TOPIC_PLAYERS || []).concat([
  { id: "dNN_p1", frames: [
      { viz: { /* מפרט ויזואל, ראה בהמשך */ }, cap: "מה רואים בפריים + <b>הדגשה</b>" },
      /* 4–8 פריימים: התקדמות בזמן */
  ]}
]);
```
בעמוד ה-HTML שים `<div id="dNN_p1"></div>` במקום שבו הנגן יופיע.
`node --check topic-dNN.js` חייב לעבור.

## מבנה עמוד (בסדר הזה)
1. `<h1>` + `<p class="lead">` — משפט אחד: מה המבחן שואל מהנושא הזה (משבצת/שאלה מספר…).
2. `<h2>1 · הנוסחאות והמושגים</h2>` — טבלה ב-`<div class="tw"><table>` או כרטיסים `.card`. כל נוסחה ב-KaTeX.
3. `<h2>2 · השיטה — צעד אחר צעד</h2>` — המתכון כפי שמופיע בפתרונות הרשמיים, רשימה ממוספרת. זה הלב של העמוד.
4. `<h2>3 · אנימציה</h2>` — `<div id="dNN_p1"></div>` + משפט הסבר.
5. `<h2>4 · דוגמה פתורה מהמבחן</h2>` — סעיף אמיתי משאלון עבר (ציין שנה ושאלה), פתרון מלא בשלבים עם KaTeX. עטוף את הפתרון ב-`<details class="sol"><summary>פתרון</summary><div class="body">…</div></details>`.
6. `<h2>5 · מלכודות</h2>` — `.warn` לכל מלכודת (מ-EXAM-MAP.md + מה שמצאת בפתרונות).
7. `<h2>6 · מה לשים בדף הנוסחאות</h2>` — `.tip` עם רשימה קצרה.

## CSS זמין
`.card` · `.note` (כחול, מידע) · `.warn` (אדום, מלכודת) · `.tip` (ענבר) · `.ok` (ירוק) ·
`.tw > table` (טבלה גלילה) · `.eq` (קופסת נוסחה ממורכזת) · `details.sol` · `.tag`, `.tag.exam`, `.tag.hot`

## מתמטיקה — KaTeX
- Inline: `\(y(x,t)\)` · Display: `<div class="eq">$$ … $$</div>`
- **בקובצי HTML**: לכתוב `\(` ו-`$$` כרגיל.
- **בקובצי JS** (בתוך cap): להכפיל לוכסנים — `"\\(v=\\sqrt{T/\\rho}\\)"`.
- אל תשתמש ב-Unicode subscripts בתוך נוסחאות — רק LaTeX. מחוץ לנוסחאות (תוויות SVG) — רק Unicode פשוט (ρ₁, v₂), כי KaTeX לא רץ בתוך SVG.

## מפרט הוויזואל `wave` (viz.js)
```js
{ type:"wave", xmin:-4, xmax:8,     // חובה
  ymax:1.2,                          // רשות (אחרת אוטומטי)
  curves:[
    {shape:"sin",  A:1, k:1, phi:0, from:-4, to:8},  // A·sin(kx+phi)
    {shape:"cos",  A:1, k:1, phi:0, from:-4, to:8},
    {shape:"halfsin", A:1, from:0, to:2},            // בליטה אחת
    {shape:"sin2", A:1, from:0, to:2},               // A·sin²
    {shape:"tri",  A:1, from:0, peak:1, to:2},       // משולש
    {shape:"parab",A:1, from:0, to:2},               // שיא A באמצע, 0 בקצוות
    {shape:"gauss",A:1, x0:0, w:1},
    {shape:"flat", y:0, from:-4, to:8},
    {shape:"pts",  pts:[[0,0],[1,0.5],[2,0]]}        // פוליליין חופשי
  ],
  // לכל עקומה: c:"hot|good|bad|info|dim" · label:"פוגע" · dash:true
  markers:[{x:0, label:"צומת"}],                     // קו אנכי מקווקו
  arrows:[{x:2, y:0.6, dir:"right", c:"good", label:"v₁"}],
  regions:[{from:-4,to:0,label:"ρ₁",c:"info"}],      // הצללת תווך
  caption:"כיתוב מתחת" }
```
וגם `{type:"tline", label:"…", len:"ℓ=20m", left:"short|open", right:"short|open"}`
ו-`{type:"vars", items:[{k:"v",v:"300 m/s",c:"hot"}]}` · `{type:"note", text:"…"}` ·
`{type:"rows", items:[…]}` לשילוב כמה ויזואלים בפריים.

## עקרונות תוכן
- עברית, RTL. משפטים שלמים, בלי קיצורים.
- **נאמנות לפתרונות הרשמיים**: השיטה, הסימונים (u=x−vt, R=(Z₁−Z₂)/(Z₁+Z₂), τ=1+R) והמוסכמות שלהם.
- לאמת כל חישוב בדוגמה הפתורה בעצמך — אל תעתיק עיוור.
- כל דוגמה מתויגת במקור: "מבחן 2026 מועד א' · שאלה 1 סעיף ב'".
- תחומי תוקף: בכל נוסחת גל כתוב את החלון שבו היא תקפה — זה דגש של מבחן 2026.

## חומר הגלם
בסיס: `/Users/roisadeh/Library/Mobile Documents/com~apple~CloudDocs/הנדסת חשמל/שנה 2 - סמס ב’/גלים/`
(שים לב: הגרש בנתיב הוא U+2019. צטט נתיבים במלואם.)
- `מבחנים משנים קודמות/` — מבחן/פתרון X,Y 2021–2025 + `2026 que.pdf`, `2026-sol.pdf`
- `מטלות להגשה גלים/` — גליונות 1–6 (חלקם עם פתרונות)
- `דף נוסחאות גלים/` — 3 דפי נוסחאות
- וכן `/Users/roisadeh/Desktop/Projects/galim-prep/EXAM-MAP.md` — מפת המבחן המלאה (לקרוא!)
