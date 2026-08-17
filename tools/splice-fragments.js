#!/usr/bin/env node
/* מחליף כל <section class="pg" id="dNN">…</section> ב-index.html
 * בתוכן הקובץ fragments/dNN.html (אם קיים). מריצים מתיקיית הפרויקט:
 *   node tools/splice-fragments.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const indexPath = path.join(root, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

const fragDir = path.join(root, "fragments");
const frags = fs.existsSync(fragDir)
  ? fs.readdirSync(fragDir).filter(f => /^d\d\d\.html$/.test(f))
  : [];

let changed = 0;
for (const f of frags) {
  const id = f.replace(".html", "");
  const frag = fs.readFileSync(path.join(fragDir, f), "utf8").trim();
  if (!frag.includes('id="' + id + '"')) {
    console.error(`SKIP ${f}: fragment missing <section id="${id}">`);
    continue;
  }
  const re = new RegExp(
    '<section class="pg" id="' + id + '">[\\s\\S]*?</section>'
  );
  if (!re.test(html)) {
    console.error(`SKIP ${f}: placeholder for ${id} not found in index.html`);
    continue;
  }
  html = html.replace(re, frag);
  changed++;
  console.log(`spliced ${id}`);
}

fs.writeFileSync(indexPath, html);
console.log(`done: ${changed}/${frags.length} fragments spliced`);
