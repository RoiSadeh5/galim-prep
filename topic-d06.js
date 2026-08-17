/* d06 — צומת אימפדנסים: פולס חצי-סינוס (רוחב 2, A=1) פוגע בצומת x=0.
 * v1=2, v2=1 ⇒ ρ2=4ρ1, Z2=2Z1 ⇒ R=−1/3, τ=2/3 (היחסים של מבחן 2026 שאלה 3).
 * f(s)=sin(π(s+4)/2) על s∈[−4,−2]; פוגע f(x−v1t), חוזר R·f(−x−v1t), עובר τ·f(2x−2t).
 * כל עקומה מיוצגת כ-sin עם k,phi מחושבים מראש: phi_i=π(2−t), phi_r=−π(2−t), phi_t=π(2−t) עם k=π. */
window.TOPIC_PLAYERS = (window.TOPIC_PLAYERS || []).concat([
  {
    id: "d06_p1",
    frames: [
      {
        viz: {
          type: "wave", xmin: -4.6, xmax: 3, ymax: 1.25,
          regions: [
            { from: -4.6, to: 0, label: "ρ₁ · v₁", c: "info" },
            { from: 0, to: 3, label: "ρ₂=4ρ₁ · v₂=v₁/2", c: "dim" }
          ],
          curves: [
            { shape: "halfsin", A: 1, from: -4, to: -2, c: "hot", label: "פוגע" }
          ],
          markers: [{ x: 0, label: "צומת" }],
          arrows: [{ x: -1.6, y: 0.55, dir: "right", c: "good", label: "v₁" }],
          caption: "t=0 — פולס חצי־סינוס ברוחב b₁=2 נע ימינה"
        },
        cap: "פולס חצי־סינוס ברוחב \\(b_i=2\\) נע ימינה בתווך 1. באנימציה \\(v_2=v_1/2\\), כלומר \\(\\rho_2=4\\rho_1\\) ו-\\(Z_2=2Z_1\\) — בדיוק היחסים של מבחן 2026 שאלה 3: \\(R=-\\tfrac13\\), \\(\\tau=\\tfrac23\\)."
      },
      {
        viz: {
          type: "wave", xmin: -4.6, xmax: 3, ymax: 1.25,
          regions: [
            { from: -4.6, to: 0, label: "ρ₁", c: "info" },
            { from: 0, to: 3, label: "ρ₂", c: "dim" }
          ],
          curves: [
            { shape: "halfsin", A: 1, from: -2.5, to: -0.5, c: "hot", label: "פוגע" }
          ],
          markers: [{ x: 0, label: "צומת" }],
          arrows: [{ x: -0.2, y: 0.55, dir: "right", c: "good", label: "v₁" }],
          caption: "הפולס מתקרב לצומת"
        },
        cap: "הפולס מתקרב לצומת. המתיחות \\(T\\) זהה בשני הצדדים — רק הצפיפות קופצת, ולכן \\(v=\\sqrt{T/\\rho}\\) ו-\\(Z=\\sqrt{T\\rho}\\) שונים בין התווכים, וזה כל מה שקובע את \\(R\\) ו-\\(\\tau\\)."
      },
      {
        viz: {
          type: "wave", xmin: -4.6, xmax: 3, ymax: 1.25,
          regions: [
            { from: -4.6, to: 0, label: "ρ₁", c: "info" },
            { from: 0, to: 3, label: "ρ₂", c: "dim" }
          ],
          curves: [
            { shape: "sin", A: 1, k: 1.5708, phi: 2.1991, from: -1.4, to: 0, c: "hot", label: "פוגע" },
            { shape: "sin", A: 0.3333, k: 1.5708, phi: -2.1991, from: -0.6, to: 0, c: "bad", label: "חוזר (נבנה)" },
            { shape: "sin", A: 0.6667, k: 3.1416, phi: 2.1991, from: 0, to: 0.3, c: "good", label: "עובר (נבנה)" }
          ],
          markers: [{ x: 0, label: "צומת" }],
          caption: "t=1.3 — הפגיעה בעיצומה: שלושת הגלים קיימים בו־זמנית"
        },
        cap: "הפגיעה החלה: משמאל הצורה בפועל היא <b>סכום</b> הפוגע והחוזר, ומימין נבנה הגל העובר. בצומת נשמרת רציפות: \\(y_i+y_r=y_t\\) — וממנה בדיוק נובע \\(1+R=\\tau\\)."
      },
      {
        viz: {
          type: "wave", xmin: -4.6, xmax: 3, ymax: 1.25,
          regions: [
            { from: -4.6, to: 0, label: "ρ₁", c: "info" },
            { from: 0, to: 3, label: "ρ₂", c: "dim" }
          ],
          curves: [
            { shape: "sin", A: 1, k: 1.5708, phi: 0.9425, from: -0.6, to: 0, c: "hot", label: "פוגע (זנב)" },
            { shape: "sin", A: 0.3333, k: 1.5708, phi: -0.9425, from: -1.4, to: 0, c: "bad", label: "חוזר" },
            { shape: "sin", A: 0.6667, k: 3.1416, phi: 0.9425, from: 0, to: 0.7, c: "good", label: "עובר" }
          ],
          markers: [{ x: 0, label: "צומת" }],
          caption: "t=1.7 — החוזר מתארך שמאלה, העובר מתקדם ימינה"
        },
        cap: "הגל החוזר — <b>הפוך!</b> (\\(R=-\\tfrac13&lt;0\\) כי \\(Z_2&gt;Z_1\\)) — מתארך שמאלה, והעובר, שנע בתווך האיטי והצפוף, מתקדם ימינה ונדחס: כל שנייה של פגיעה מייצרת קטע באורך \\(v_2\\Delta t\\) בלבד."
      },
      {
        viz: {
          type: "wave", xmin: -4.6, xmax: 3, ymax: 1.25,
          regions: [
            { from: -4.6, to: 0, label: "ρ₁", c: "info" },
            { from: 0, to: 3, label: "ρ₂", c: "dim" }
          ],
          curves: [
            { shape: "sin", A: 0.3333, k: 1.5708, phi: 1.5708, from: -3, to: -1, c: "bad", label: "חוזר: RA=−⅓, רוחב 2" },
            { shape: "sin", A: 0.6667, k: 3.1416, phi: -1.5708, from: 0.5, to: 1.5, c: "good", label: "עובר: τA=⅔, רוחב 1" }
          ],
          markers: [{ x: 0, label: "צומת" }],
          arrows: [
            { x: -3.6, y: 0.45, dir: "left", c: "bad", label: "v₁" },
            { x: 1.9, y: 0.75, dir: "right", c: "good", label: "v₂" }
          ],
          caption: "t=2.5 — המעבר הסתיים: שני פולסים חד־כיווניים"
        },
        cap: "אחרי המעבר: החוזר בגובה \\(|R|A=\\tfrac13\\) <b>והפוך</b>, באותו רוחב כמו הפוגע (\\(b_r=b_i=2\\)); העובר בגובה \\(\\tau A=\\tfrac23\\) וברוחב מכווץ פי \\(v_2/v_1=\\tfrac12\\) (\\(b_t=1\\))."
      },
      {
        viz: {
          type: "wave", xmin: -4.6, xmax: 3, ymax: 1.25,
          regions: [
            { from: -4.6, to: 0, label: "ρ₁", c: "info" },
            { from: 0, to: 3, label: "ρ₂", c: "dim" }
          ],
          curves: [
            { shape: "sin", A: 0.3333, k: 1.5708, phi: 3.7699, from: -4.4, to: -2.4, c: "bad", label: "חוזר" },
            { shape: "sin", A: 0.6667, k: 3.1416, phi: -3.7699, from: 1.2, to: 2.2, c: "good", label: "עובר" }
          ],
          markers: [{ x: 0, label: "צומת" }],
          arrows: [
            { x: -1.9, y: 0.45, dir: "left", c: "bad", label: "v₁" },
            { x: 2.55, y: 0.75, dir: "right", c: "good", label: "v₂" }
          ],
          caption: "t=3.2 — הפולסים מתרחקים; האנרגיה התחלקה"
        },
        cap: "היחסים הסופיים: \\(\\dfrac{E_r}{E_i}=R^2=\\tfrac19\\approx11\\%\\) מוחזר, \\(\\dfrac{E_t}{E_i}=1-R^2=\\tfrac89\\approx89\\%\\) עובר. <b>האנרגיה נשמרת — האמפליטודות לא</b> (\\(|R|+\\tau\\ne1\\) וזה בסדר גמור)."
      }
    ]
  }
]);
