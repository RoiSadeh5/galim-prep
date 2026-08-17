/* d01 — משוואת הגלים ופתרון כללי: פולס גאוסי חד-כיווני f(x−vt), v=1.5 m/s */
window.TOPIC_PLAYERS = (window.TOPIC_PLAYERS || []).concat([
  {
    id: "d01_p1",
    frames: [
      {
        viz: {
          type: "wave", xmin: -5.5, xmax: 5.5, ymax: 1.25,
          curves: [
            { shape: "gauss", A: 1, x0: -3, w: 1, c: "hot", label: "y(x,0)" }
          ],
          markers: [{ x: -3, label: "שיא" }],
          arrows: [{ x: -2.2, y: 1.05, dir: "right", c: "good", label: "v=1.5" }],
          caption: "t=0 — הפרופיל ההתחלתי"
        },
        cap: "ברגע \\(t=0\\) נתון הפרופיל \\(y(x,0)=f(x)\\) — פולס גאוסי שמרכזו ב-\\(x=-3\\). <b>מכאן והלאה הצורה לא תשתנה</b> — רק תזוז."
      },
      {
        viz: {
          type: "wave", xmin: -5.5, xmax: 5.5, ymax: 1.25,
          curves: [
            { shape: "gauss", A: 1, x0: -3, w: 1, c: "dim", dash: true, label: "t=0" },
            { shape: "gauss", A: 1, x0: -1.5, w: 1, c: "hot", label: "t=1" }
          ],
          markers: [{ x: -1.5, label: "שיא" }],
          arrows: [{ x: -0.7, y: 1.05, dir: "right", c: "good", label: "v=1.5" }],
          caption: "t=1 s — הפולס התקדם v·t=1.5 m"
        },
        cap: "אחרי שנייה אחת: \\(y(x,1)=f(x-v)\\). כל הפרופיל הוזז ימינה ב-\\(v\\cdot 1=1.5\\,\\mathrm{m}\\) — <b>אותה צורה בדיוק</b>."
      },
      {
        viz: {
          type: "wave", xmin: -5.5, xmax: 5.5, ymax: 1.25,
          curves: [
            { shape: "gauss", A: 1, x0: -3, w: 1, c: "dim", dash: true, label: "t=0" },
            { shape: "gauss", A: 1, x0: 0, w: 1, c: "hot", label: "t=2" }
          ],
          markers: [{ x: 0, label: "שיא" }],
          arrows: [{ x: 0.8, y: 1.05, dir: "right", c: "good", label: "v=1.5" }],
          caption: "t=2 s — השיא ב-x=0"
        },
        cap: "על השיא מתקיים תמיד \\(u=x-vt=-3\\) — קבוע! זו המשמעות של \"פונקציה של \\(u\\) בלבד\": כל נקודת פאזה נעה במהירות \\(v\\)."
      },
      {
        viz: {
          type: "wave", xmin: -5.5, xmax: 5.5, ymax: 1.25,
          curves: [
            { shape: "gauss", A: 1, x0: -3, w: 1, c: "dim", dash: true, label: "t=0" },
            { shape: "gauss", A: 1, x0: 1.5, w: 1, c: "hot", label: "t=3" }
          ],
          markers: [{ x: 1.5, label: "שיא" }],
          arrows: [{ x: 2.3, y: 1.05, dir: "right", c: "good", label: "v=1.5" }],
          caption: "t=3 s"
        },
        cap: "בכל נקודה על המיתר המהירות החומרית היא \\(v_y=-v\\,y_x\\) (גל ימינה): בחזית הפולס המיתר עולה, בעורף — יורד. הגל מתקדם, החומר רק מתנדנד."
      },
      {
        viz: {
          type: "wave", xmin: -5.5, xmax: 5.5, ymax: 1.25,
          curves: [
            { shape: "gauss", A: 1, x0: -3, w: 1, c: "dim", dash: true, label: "t=0" },
            { shape: "gauss", A: 1, x0: 3, w: 1, c: "hot", label: "t=4" }
          ],
          markers: [{ x: 3, label: "שיא" }],
          arrows: [{ x: 3.8, y: 1.05, dir: "right", c: "good", label: "v=1.5" }],
          caption: "t=4 s — הפולס עבר 6 m"
        },
        cap: "אחרי 4 שניות הפולס עבר \\(v\\,t=6\\,\\mathrm{m}\\). <b>הצורה קבועה, רק זזה</b> — וזה בדיוק מה שמנצלים בשחזור גל משני רגעים: מהזזת הפרופיל מחלצים את \\(v\\)."
      }
    ]
  }
]);
