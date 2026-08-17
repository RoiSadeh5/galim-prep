/* d03 — דלמבר: פולס חצי-סינוס (תומך [-1,1], v=1) משוחרר ממנוחה נחצה לשני חצאי-אמפליטודה,
 * רגע ההפרדה t_sep=a/v, ופריים סיום למקרה הכללי F2≠0 (חלוקה לא סימטרית, כמו 2026). */
window.TOPIC_PLAYERS = (window.TOPIC_PLAYERS || []).concat([
  {
    id: "d03_p1",
    frames: [
      {
        viz: {
          type: "wave", xmin: -4.6, xmax: 4.6, ymax: 1.2,
          curves: [
            { shape: "halfsin", A: 1, from: -1, to: 1, c: "hot", label: "F(x)=y(x,0)" },
            { shape: "halfsin", A: 0.5, from: -1, to: 1, c: "dim", dash: true, label: "½F ימינה + ½F שמאלה" }
          ],
          arrows: [
            { x: 1.7, y: 0.62, dir: "right", c: "good", label: "v" },
            { x: -1.7, y: 0.62, dir: "left", c: "good", label: "v" }
          ],
          caption: "t=0 — הפרופיל ההתחלתי, שחרור ממנוחה"
        },
        cap: "שחרור ממנוחה (\\(F_2=0\\)): דלמבר נותן \\(y=\\tfrac12F(x-vt)+\\tfrac12F(x+vt)\\) — <b>שני עותקים בחצי אמפליטודה</b> שמתחילים מונחים זה על זה, ולכן ברגע ההתחלה רואים את \\(F(x)\\) המלא."
      },
      {
        viz: {
          type: "wave", xmin: -4.6, xmax: 4.6, ymax: 1.2,
          curves: [
            { shape: "halfsin", A: 0.5, from: -0.5, to: 1.5, c: "dim", dash: true, label: "½F(x−vt)" },
            { shape: "halfsin", A: 0.5, from: -1.5, to: 0.5, c: "dim", dash: true, label: "½F(x+vt)" },
            { shape: "sin", A: 0.5, k: 1.5708, phi: 2.3562, from: -1.5, to: -0.5, c: "hot" },
            { shape: "sin", A: 0.7071, k: 1.5708, phi: 1.5708, from: -0.5, to: 0.5, c: "hot", label: "הסכום בפועל" },
            { shape: "sin", A: 0.5, k: 1.5708, phi: 0.7854, from: 0.5, to: 1.5, c: "hot" }
          ],
          caption: "t=0.5·a/v — חפיפה חלקית: המיתר הוא סכום שני העותקים"
        },
        cap: "העותקים נפרדים בהדרגה: <b>באזור החפיפה הגובה הוא הסכום</b> \\(\\tfrac12F(x-vt)+\\tfrac12F(x+vt)\\) (כאן \\(\\approx0.71A\\) במרכז), ומחוץ לה כל עותק מופיע לבדו בגובה \\(\\tfrac12 A\\)."
      },
      {
        viz: {
          type: "wave", xmin: -4.6, xmax: 4.6, ymax: 1.2,
          curves: [
            { shape: "halfsin", A: 0.5, from: 0, to: 2, c: "hot", label: "½F(x−vt)" },
            { shape: "halfsin", A: 0.5, from: -2, to: 0, c: "info", label: "½F(x+vt)" }
          ],
          markers: [{ x: 0, label: "רגע ההפרדה" }],
          arrows: [
            { x: 2.6, y: 0.4, dir: "right", c: "good", label: "v" },
            { x: -2.6, y: 0.4, dir: "left", c: "good", label: "v" }
          ],
          caption: "t=a/v — הקצוות הפנימיים נפגשים ב-x=0"
        },
        cap: "<b>רגע ההפרדה:</b> הקצוות הפנימיים נעים זה מזה במהירות יחסית \\(2v\\), ולכן לתומך ברוחב \\(L=2a\\) מקבלים \\(t_{\\mathrm{sep}}=\\dfrac{a}{v}=\\dfrac{L}{2v}\\) — לא \\(L/v\\)!"
      },
      {
        viz: {
          type: "wave", xmin: -4.6, xmax: 4.6, ymax: 1.2,
          curves: [
            { shape: "halfsin", A: 0.5, from: 1, to: 3, c: "hot", label: "½F(x−vt)" },
            { shape: "halfsin", A: 0.5, from: -3, to: -1, c: "info", label: "½F(x+vt)" }
          ],
          arrows: [
            { x: 3.6, y: 0.4, dir: "right", c: "good", label: "v" },
            { x: -3.6, y: 0.4, dir: "left", c: "good", label: "v" }
          ],
          caption: "t=2a/v — שני פולסים חד-כיווניים נפרדים"
        },
        cap: "מכאן והלאה: שני פולסים חד־כיווניים נפרדים <b>בחצי אמפליטודה</b>, כל אחד ברוחב המקורי \\(L\\). בכל אחד מהם \\(K=U\\), והצורה קבועה לנצח."
      },
      {
        viz: {
          type: "wave", xmin: -4.6, xmax: 4.6, ymax: 1.05,
          curves: [
            { shape: "halfsin", A: 0.8, from: -3, to: -1, c: "good", label: "yₙ(x+vt)" },
            { shape: "halfsin", A: -0.2, from: 1, to: 3, c: "bad", label: "yₚ(x−vt)" }
          ],
          arrows: [
            { x: 3.6, y: 0.35, dir: "right", c: "bad", label: "v" },
            { x: -3.6, y: 0.95, dir: "left", c: "good", label: "v" }
          ],
          caption: "המקרה הכללי F₂≠0 — חלוקה לא סימטרית"
        },
        cap: "המקרה הכללי \\(F_2\\ne0\\): המקדמים הם \\(\\tfrac12F_1\\mp\\tfrac{1}{2v}G\\) והחלוקה <b>אינה סימטרית</b> — הפולסים יוצאים בגבהים שונים ואף בסימנים הפוכים, כמו במבחן 2026 שאלה 2 (ימני \\(-0.0028\\), שמאלי \\(+0.0162\\))."
      }
    ]
  }
]);
