/* d08 — קו תמסורת מקוצר בשני קצותיו (מבחן X-2025 שאלה 2):
 * סכמת הקו → תנאי ההתחלה V(x,0), I(x,0) → ההרמוניה הראשונה של V בשני זמנים.
 * יחידות: המתח מנורמל ב-8ZI₀; התחום x∈[0,ℓ] עם ℓ=6.
 * k₁=π/6≈0.5236, k₂=2π/ℓ=π/3≈1.0472, b₁/8ZI₀=√2≈1.4142, Z·I₀·3π/8ZI₀=3π/8≈1.1781 */
window.TOPIC_PLAYERS = (window.TOPIC_PLAYERS || []).concat([
  {
    id: "d08_p1",
    frames: [
      {
        viz: {
          type: "tline",
          label: "קו תמסורת מקוצר בשני הקצוות",
          len: "ℓ",
          left: "short",
          right: "short",
          caption: "קצר בקצה ⇒ V=0 שם, בכל רגע"
        },
        cap: "קו תמסורת סופי שאורכו \\(\\ell\\), <b>מקוצר בשני קצותיו</b> — התצורה של מבחן X-2025 שאלה 2. קצר פירושו \\(V(0,t)=V(\\ell,t)=0\\), ולכן המתח מקיים בדיוק את תנאי הריתום של מיתר ונכתב כטור גלים עומדים: \\(V(x,t)=\\sum_n b_n\\sin(k_nx)\\cos(\\omega_nt+\\phi_n)\\) עם \\(k_n=n\\pi/\\ell,\\ \\omega_n=v_wk_n\\)."
      },
      {
        viz: {
          type: "rows",
          items: [
            { type: "tline", left: "short", right: "short", len: "ℓ=6" },
            {
              type: "wave", xmin: 0, xmax: 6, ymax: 1.6,
              curves: [
                { shape: "sin", A: 1, k: 0.5236, phi: 0, from: 0, to: 6, c: "hot", label: "V(x,0)" },
                { shape: "cos", A: 1.1781, k: 1.0472, phi: 0, from: 0, to: 3, c: "info", dash: true, label: "Z·I(x,0)" },
                { shape: "flat", y: 0, from: 3, to: 6, c: "info", dash: true }
              ],
              markers: [{ x: 3, label: "ℓ/2" }],
              caption: "תנאי ההתחלה, ביחידות של 8ZI₀"
            }
          ]
        },
        cap: "תנאי ההתחלה: \\(V(x,0)=8ZI_0\\sin(\\pi x/\\ell)\\) על כל הקו, ואילו הזרם \\(I(x,0)=3\\pi I_0\\cos(2\\pi x/\\ell)\\) חי רק על <b>חצי התחום</b> \\(0\\le x\\le \\ell/2\\) — ולכן הוא מזין את <b>כל</b> ההרמוניות. את הנגזרת בזמן של המתח מקבלים ממשוואת הטלגרף: \\(\\dfrac{\\partial V}{\\partial t}(x,0)=-\\dfrac1C\\dfrac{\\partial I}{\\partial x}(x,0)\\) עם \\(\\dfrac1C=Zv_w\\)."
      },
      {
        viz: {
          type: "wave", xmin: 0, xmax: 6, ymax: 1.6,
          curves: [
            { shape: "sin", A: 1.4142, k: 0.5236, phi: 0, from: 0, to: 6, c: "dim", dash: true, label: "מעטפת ±b₁=±8√2·ZI₀" },
            { shape: "sin", A: -1.4142, k: 0.5236, phi: 0, from: 0, to: 6, c: "dim", dash: true },
            { shape: "sin", A: 1, k: 0.5236, phi: 0, from: 0, to: 6, c: "hot", label: "V₁ ברגע t=0" }
          ],
          caption: "ההרמוניה הראשונה של V ברגע t=0 — בגובה 8ZI₀, לא בשיא"
        },
        cap: "ההרמוניה הראשונה: \\(V_1(x,t)=8\\sqrt2\\,ZI_0\\sin(\\pi x/\\ell)\\cos(\\omega_1t-\\pi/4)\\). ברגע \\(t=0\\): \\(\\cos(-\\pi/4)=\\tfrac{\\sqrt2}{2}\\), והגובה הוא בדיוק \\(8ZI_0\\) — <b>מתלכד עם הפרופיל ההתחלתי כולו</b>, כי ההרמוניה השנייה מתאפסת ברגע זה (\\(b_2\\cos\\phi_2=0\\)). המעטפת המקווקוות מסמנת את \\(\\pm b_1=\\pm8\\sqrt2\\,ZI_0\\)."
      },
      {
        viz: {
          type: "wave", xmin: 0, xmax: 6, ymax: 1.6,
          curves: [
            { shape: "sin", A: 1.4142, k: 0.5236, phi: 0, from: 0, to: 6, c: "dim", dash: true, label: "מעטפת" },
            { shape: "sin", A: -1.4142, k: 0.5236, phi: 0, from: 0, to: 6, c: "dim", dash: true },
            { shape: "sin", A: 1, k: 0.5236, phi: 0, from: 0, to: 6, c: "info", dash: true, label: "t=0" },
            { shape: "sin", A: 1.4142, k: 0.5236, phi: 0, from: 0, to: 6, c: "hot", label: "t=T₁/8" }
          ],
          caption: "ברגע t=T₁/8 האופן נוגע במעטפת — זה פשר הפאזה φ₁=−π/4"
        },
        cap: "ברגע \\(t=T_1/8\\) מתקיים \\(\\omega_1t-\\pi/4=0\\) והאופן נוגע במעטפת \\(8\\sqrt2\\,ZI_0\\). זה הפירוש הפיזיקלי של \\(\\phi_1=-\\tfrac{\\pi}{4}\\): השיא מגיע <b>אחרי</b> \\(t=0\\) — ברגע ההתחלתי חלק מהאנרגיה עוד אגורה בזרם (\\(\\tfrac12LI^2\\)) וזורמת אל המתח (\\(\\tfrac12CV^2\\))."
      }
    ]
  }
]);
