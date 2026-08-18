/* ============================================================
 *  questions-diagnostic.js — 10 שאלות אבחון אמריקאיות.
 *  יובאו מ-waves-prep; הקטגוריות תואמות ל-topicPages ב-config.js.
 *  מיקום התשובה הנכונה מאוזן על פני ארבע האפשרויות.
 * ============================================================ */
window.CODEX_ADAPTIVE_QUESTIONS = (window.CODEX_ADAPTIVE_QUESTIONS || []).concat([
  {
    id: "WG-2026X-Q1-V",
    cat: "מיתר-מונע-בקצה",
    difficulty: 1,
    skills: ["מהירות גל","יחידות"],
    origin: "recent",
    sourceLabel: "מבחן 2026 · שאלון X · שאלה 1(א)",
    prompt: "מיתר חצי־אינסופי נתון במתיחות <span dir='ltr'>T = 180 N</span> ובצפיפות קווית <span dir='ltr'>ρ = 0.2 kg/m</span>. מהי מהירות הגל?",
    kind: "math",
    opts: [
      {"h":"30 m/s","ltr":true},
      {"h":"6 m/s","ltr":true},
      {"h":"90 m/s","ltr":true},
      {"h":"900 m/s","ltr":true}
    ],
    ans: 0,
    rule: "במיתר: v = √(T/ρ).",
    why: "מציבים: √(180/0.2) = √900 = 30 m/s.",
    trap: "לא להשתמש ב־√(Tρ); זהו האימפדנס, לא המהירות."
  },
  {
    id: "WG-2026X-Q1-Z",
    cat: "מיתר-מונע-בקצה",
    difficulty: 1,
    skills: ["אימפדנס","מנוע"],
    origin: "recent",
    sourceLabel: "מבחן 2026 · שאלון X · שאלה 1",
    prompt: "עבור אותו מיתר, <span dir='ltr'>T = 180 N</span> ו־<span dir='ltr'>ρ = 0.2 kg/m</span>. מהו האימפדנס המכני שלו?",
    kind: "math",
    opts: [
      {"h":"30 kg/s","ltr":true},
      {"h":"6 kg/s","ltr":true},
      {"h":"36 kg/s","ltr":true},
      {"h":"90 kg/s","ltr":true}
    ],
    ans: 1,
    rule: "אימפדנס מיתר: Z = √(Tρ) = ρv = T/v.",
    why: "√(180·0.2) = √36 = 6 kg/s.",
    trap: "היחידות kg/s מבדילות את Z ממהירות הגל."
  },
  {
    id: "WG-2026X-Q2-V",
    cat: "דלמבר",
    difficulty: 1,
    skills: ["ד׳אלמבר","מהירות גל"],
    origin: "recent",
    sourceLabel: "מבחן 2026 · שאלון X · שאלה 2(א)",
    prompt: "מיתר אינסופי נתון במתיחות <span dir='ltr'>T = 900 N</span> ובצפיפות <span dir='ltr'>ρ = 0.10 kg/m</span>. באיזו מהירות נעים שני הרכיבים בנוסחת ד׳אלמבר?",
    kind: "math",
    opts: [
      {"h":"30 m/s","ltr":true},
      {"h":"90 m/s","ltr":true},
      {"h":"94.87 m/s","ltr":true},
      {"h":"9000 m/s","ltr":true}
    ],
    ans: 2,
    rule: "שני רכיבי ד׳אלמבר נעים במהירויות +v ו־−v, כאשר v = √(T/ρ).",
    why: "√(900/0.10) = √9000 ≈ 94.87 m/s.",
    trap: "הסימן קובע כיוון; גודל המהירות זהה לשני הרכיבים."
  },
  {
    id: "WG-2026X-Q2-E",
    cat: "אנרגיה-והספק",
    difficulty: 2,
    skills: ["אנרגיה קינטית","אנרגיה פוטנציאלית"],
    origin: "recent",
    sourceLabel: "מבחן 2026 · שאלון X · שאלה 2(א)",
    prompt: "ברגע ההתחלתי האנרגיה הכוללת היא <span dir='ltr'>E = 7.2 J</span> והיחס הוא <span dir='ltr'>K₀/U₀ = 2</span>. מהם <span dir='ltr'>K₀, U₀</span>?",
    kind: "math",
    opts: [
      {"h":"K₀=3.6 J, U₀=3.6 J","ltr":true},
      {"h":"K₀=2.4 J, U₀=4.8 J","ltr":true},
      {"h":"K₀=7.2 J, U₀=3.6 J","ltr":true},
      {"h":"K₀=4.8 J, U₀=2.4 J","ltr":true}
    ],
    ans: 3,
    rule: "משלבים K/U = 2 עם K + U = E.",
    why: "K = 2U ולכן 3U = 7.2; מתקבל U = 2.4 J ו־K = 4.8 J.",
    trap: "היחס אינו אומר שהאנרגיה הקינטית שווה לכל האנרגיה."
  },
  {
    id: "WG-2026X-Q3-COEFF",
    cat: "צומת-אימפדנסים",
    difficulty: 2,
    skills: ["מקדם החזרה","מקדם העברה"],
    origin: "recent",
    sourceLabel: "מבחן 2026 · שאלון X · שאלה 3(ב)",
    prompt: "גל מגיע ממיתר בעל <span dir='ltr'>Z₁ = 6 kg/s</span> למיתר בעל <span dir='ltr'>Z₂ = 12 kg/s</span>. מהם מקדמי האמפליטודה של הגל העובר והחוזר?",
    kind: "math",
    opts: [
      {"h":"τ=2/3, R=−1/3","ltr":true},
      {"h":"τ=4/3, R=1/3","ltr":true},
      {"h":"τ=1/3, R=2/3","ltr":true},
      {"h":"τ=8/9, R=1/9","ltr":true}
    ],
    ans: 0,
    rule: "τ = 2Z₁/(Z₁+Z₂), ואילו R = (Z₁−Z₂)/(Z₁+Z₂).",
    why: "τ = 12/18 = 2/3 ו־R = −6/18 = −1/3.",
    trap: "8/9 ו־1/9 הם יחסי אנרגיה, לא יחסי אמפליטודה."
  },
  {
    id: "WG-2026X-Q3-ENERGY",
    cat: "צומת-אימפדנסים",
    difficulty: 2,
    skills: ["שימור אנרגיה","צומת"],
    origin: "recent",
    sourceLabel: "מבחן 2026 · שאלון X · שאלה 3(ב)",
    prompt: "באותו מעבר מתקבל <span dir='ltr'>R = −1/3</span>. איזה חלק מן האנרגיה מוחזר ואיזה חלק עובר?",
    kind: "math",
    opts: [
      {"h":"1/3 מוחזר, 2/3 עובר","ltr":true},
      {"h":"1/9 מוחזר, 8/9 עובר","ltr":true},
      {"h":"2/3 מוחזר, 1/3 עובר","ltr":true},
      {"h":"1/9 מוחזר, 2/3 עובר","ltr":true}
    ],
    ans: 1,
    rule: "יחס האנרגיה המוחזרת הוא R²; השאר עובר.",
    why: "R² = 1/9 ולכן 8/9 מן האנרגיה עוברים לצדו השני של הצומת.",
    trap: "הסימן השלילי מציין היפוך מופע; אנרגיה אינה שלילית."
  },
  {
    id: "WG-2026X-Q4-MODES",
    cat: "גלים-עומדים-פורייה",
    difficulty: 2,
    skills: ["הרמוניות","תדירות זוויתית"],
    origin: "recent",
    sourceLabel: "מבחן 2026 · שאלון X · שאלה 4(א)",
    prompt: "מיתר באורך <span dir='ltr'>L = 6 m</span> רתום בשני קצותיו ומהירות הגל בו <span dir='ltr'>v = 150 m/s</span>. מהי התדירות הזוויתית של האופן ה־<span dir='ltr'>n</span>?",
    kind: "math",
    opts: [
      {"h":"ωₙ=50πn rad/s","ltr":true},
      {"h":"ωₙ=150πn rad/s","ltr":true},
      {"h":"ωₙ=25πn rad/s","ltr":true},
      {"h":"ωₙ=900πn rad/s","ltr":true}
    ],
    ans: 2,
    rule: "במיתר רתום: kₙ = nπ/L ולכן ωₙ = vkₙ.",
    why: "ωₙ = 150·nπ/6 = 25πn rad/s.",
    trap: "אין להחליף בין תדירות f לבין תדירות זוויתית ω."
  },
  {
    id: "WG-2026X-Q4-PERIOD",
    cat: "גלים-עומדים-פורייה",
    difficulty: 2,
    skills: ["מחזור","סופרפוזיציה"],
    origin: "recent",
    sourceLabel: "מבחן 2026 · שאלון X · שאלה 4(ג)",
    prompt: "כאשר באותו מיתר מופיע גם האופן היסודי ו־<span dir='ltr'>ω₁ = 25π rad/s</span>, מהו המחזור המינימלי של הגל השקול?",
    kind: "math",
    opts: [
      {"h":"0.02 s","ltr":true},
      {"h":"0.04 s","ltr":true},
      {"h":"25 s","ltr":true},
      {"h":"0.08 s","ltr":true}
    ],
    ans: 3,
    rule: "כאשר האופן היסודי קיים, מחזור הגל השקול הוא T₁ = 2π/ω₁.",
    why: "2π/(25π) = 2/25 = 0.08 s.",
    trap: "המחזור אינו 1/ω; יש גורם 2π."
  },
  {
    id: "WG-2025X-Q2-TL",
    cat: "קו-תמסורת",
    difficulty: 2,
    skills: ["משוואות הטלגרף","תנאי שפה"],
    origin: "recent",
    sourceLabel: "מבחן 2025 · שאלון X · שאלה 2",
    prompt: "בקו תמסורת חסר הפסדים, אילו קשרים בין פרמטרי הקו מגדירים את מהירות הגל ואת האימפדנס?",
    kind: "math",
    opts: [
      {"h":"v=1/√(LC), Z=√(L/C)","ltr":true},
      {"h":"v=√(L/C), Z=1/√(LC)","ltr":true},
      {"h":"v=LC, Z=L/C","ltr":true},
      {"h":"v=√(LC), Z=√(C/L)","ltr":true}
    ],
    ans: 0,
    rule: "לקו תמסורת חסר הפסדים: v = 1/√(LC), Z = √(L/C).",
    why: "אלה המקבילים החשמליים למהירות ולעכבה המכנית במיתר.",
    trap: "הנוסחאות דומות ולכן קל להחליף ביניהן; בדיקת יחידות מונעת זאת."
  },
  {
    id: "WG-2025Y-Q1-POWER",
    cat: "אנרגיה-והספק",
    difficulty: 1,
    skills: ["הספק מנוע","גל חד־כיווני"],
    origin: "recent",
    sourceLabel: "מבחן 2025 · שאלון Y · שאלה 1(ד)",
    prompt: "מנוע מניע קצה של מיתר ויוצר גל חד־כיווני. אם מהירות הקצה היא <span dir='ltr'>vᵧ(0,t)</span> ואימפדנס המיתר הוא <span dir='ltr'>Z</span>, מהו הספק המנוע?",
    kind: "math",
    opts: [
      {"h":"Pᴅ=Z²vᵧ","ltr":true},
      {"h":"Pᴅ=Zvᵧ²","ltr":true},
      {"h":"Pᴅ=vᵧ/Z","ltr":true},
      {"h":"Pᴅ=T/Z","ltr":true}
    ],
    ans: 1,
    rule: "בקצה: Fᴅ = Zvᵧ, ולכן Pᴅ = Fᴅvᵧ = Zvᵧ².",
    why: "הכוח והמהירות מקושרים דרך האימפדנס; כפל נוסף במהירות נותן הספק.",
    trap: "לא לשכוח שההספק תלוי בריבוע המהירות ולכן אינו משנה סימן עם כיוון המהירות."
  }
]);
