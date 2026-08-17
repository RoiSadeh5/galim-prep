#!/bin/bash
# save-progress.sh — בודק שכל קובצי התוכן תקינים, ואז מקבע ודוחף לגיט.
#
# למה: סוכנים כותבים פתרונות ברקע, והשיחה עלולה להיקטע באמצע.
# הרצה של הסקריפט הזה שומרת כל מה שכבר נכתב — בלי לדחוף קוד שבור.
#
#   ./save-progress.sh              ← הודעת קומיט אוטומטית
#   ./save-progress.sh "תיאור"      ← הודעה משלך

cd "$(dirname "$0")" || exit 1

FAIL=0

# 1. תקינות תחביר של כל קובצי ה-JS
for f in *.js; do
  node --check "$f" 2>/dev/null || { echo "✗ שגיאת תחביר: $f"; FAIL=1; }
done

# 2. סכימת הפתרונות המונפשים + התאמת הקטגוריות ל-config.js
node -e '
const fs = require("fs");
const cfg = fs.readFileSync("config.js", "utf8");
let total = 0, bad = 0;
fs.readdirSync(".").filter(f => /^walkthrough-\d+\.js$/.test(f)).forEach(f => {
  if (!fs.statSync(f).size) return;                 /* קובץ ריק — עדיין לא נכתב */
  global.window = { EXAM_WALKTHROUGHS: {} };
  delete require.cache[require.resolve("./" + f)];
  require("./" + f);
  Object.keys(window.EXAM_WALKTHROUGHS).forEach(k => {
    window.EXAM_WALKTHROUGHS[k].questions.forEach(q => {
      total++;
      if (cfg.indexOf("\"" + q.topic + "\"") < 0) {
        bad++; console.error("  ✗ " + q.id + " — קטגוריה לא קיימת ב-config.js: " + q.topic);
      }
      if (!q.prompt || !q.steps || !q.steps.length) {
        bad++; console.error("  ✗ " + q.id + " — חסר נוסח או שלבים");
      }
    });
  });
});
console.log("שאלות מונפשות תקינות: " + (total - bad) + "/" + total);
process.exit(bad ? 1 : 0);
' || FAIL=1

[ $FAIL -ne 0 ] && { echo "✗ נמצאו תקלות — לא נדחף כלום. תקן ונסה שוב."; exit 1; }

[ -z "$(git status --porcelain)" ] && { echo "אין שינויים לשמור."; exit 0; }

./bump-version.sh
git add -A
git commit -q -m "${1:-שמירת התקדמות אוטומטית}" || exit 1
git push -q origin main && echo "✓ נשמר ונדחף: $(git rev-parse --short HEAD)"
