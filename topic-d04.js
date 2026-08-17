/* d04 — מיתר מונע בקצה: מבחן 2026 שאלה 1. מנוע ב-x=0 משגר גל ימינה,
 * y(x,t)=−0.04·sin(πx/60 − πt/2) על 0≤x≤30t, v=30 m/s, Z=6 kg/s.
 * החזית ב-x=vt, חלון התוקף מתרחב איתה. */
window.TOPIC_PLAYERS = (window.TOPIC_PLAYERS || []).concat([
  {
    id: "d04_p1",
    frames: [
      {
        viz: {
          type: "wave", xmin: -8, xmax: 158, ymax: 0.052,
          curves: [
            { shape: "flat", y: 0, from: 0, to: 158, c: "dim", label: "מיתר במנוחה" }
          ],
          markers: [{ x: 0, label: "מנוע" }],
          caption: "t=0 — המנוע מתחיל לפעול"
        },
        cap: "ברגע \\(t=0\\) המנוע מתחיל להניע את הקצה \\(x=0\\). הכוח הדרוש נקבע רק ממהירות הקצה: <b>\\(F_D(t)=Z\\,v_y(0,t)\\)</b> עם \\(Z=\\sqrt{T\\rho}=\\sqrt{180\\cdot0.2}=6\\ \\mathrm{kg/s}\\)."
      },
      {
        viz: {
          type: "wave", xmin: -8, xmax: 158, ymax: 0.052,
          curves: [
            { shape: "sin", A: -0.04, k: 0.05236, phi: -1.5708, from: 0, to: 30, c: "hot", label: "y(x,t)" },
            { shape: "flat", y: 0, from: 30, to: 158, c: "dim" }
          ],
          markers: [{ x: 0, label: "מנוע" }, { x: 30, label: "חזית x=vt=30" }],
          regions: [{ from: 0, to: 30, label: "חלון תוקף", c: "good" }],
          arrows: [{ x: 40, y: 0.032, dir: "right", c: "good", label: "v=30 m/s" }],
          caption: "t=1 s — ההפרעה הגיעה עד x=30 m"
        },
        cap: "אחרי שנייה אחת החזית נמצאת ב-\\(x=vt=30\\ \\mathrm{m}\\); לפניה המיתר עדיין במנוחה מוחלטת. <b>חלון התוקף:</b> \\(0\\le x\\le 30t\\), ומחוצה לו \\(y=0\\)."
      },
      {
        viz: {
          type: "wave", xmin: -8, xmax: 158, ymax: 0.052,
          curves: [
            { shape: "sin", A: -0.04, k: 0.05236, phi: -3.1416, from: 0, to: 60, c: "hot", label: "y(x,t)" },
            { shape: "flat", y: 0, from: 60, to: 158, c: "dim" }
          ],
          markers: [{ x: 0, label: "מנוע" }, { x: 60, label: "חזית x=vt=60" }],
          arrows: [{ x: 70, y: 0.032, dir: "right", c: "good", label: "v=30 m/s" }],
          caption: "t=2 s — כל נקודה מחקה את הקצה באיחור x/v"
        },
        cap: "כל נקודה על המיתר חוזרת על תנועת הקצה באיחור \\(x/v\\): \\(v_y(x,t)=v_y\\!\\left(0,\\,t-\\dfrac{x}{v}\\right)\\) — כך \"מפיצים\" את תנועת המנוע לאורך המיתר."
      },
      {
        viz: {
          type: "wave", xmin: -8, xmax: 158, ymax: 0.052,
          curves: [
            { shape: "sin", A: -0.04, k: 0.05236, phi: -4.7124, from: 0, to: 90, c: "hot", label: "y(x,t)" },
            { shape: "flat", y: 0, from: 90, to: 158, c: "dim" }
          ],
          markers: [{ x: 0, label: "מנוע" }, { x: 90, label: "חזית x=vt=90" }],
          arrows: [{ x: 100, y: 0.032, dir: "right", c: "good", label: "v=30 m/s" }],
          caption: "t=3 s — הקצה בשיא תזוזה, אבל F_D=0"
        },
        cap: "\\(F_D(t)=Z\\,v_y(0,t)=\\tfrac{3\\pi}{25}\\cos\\!\\big(\\tfrac{\\pi}{2}t\\big)\\ \\mathrm{N}\\) — הכוח בפאזה עם <b>המהירות</b>, לא עם התזוזה: ברגע זה הקצה בתזוזה מקסימלית (\\(y=-0.04\\)) אך \\(v_y(0,3)=0\\), ולכן דווקא עכשיו \\(F_D=0\\)."
      },
      {
        viz: {
          type: "wave", xmin: -8, xmax: 158, ymax: 0.052,
          curves: [
            { shape: "sin", A: -0.04, k: 0.05236, phi: -6.2832, from: 0, to: 120, c: "hot", label: "y(x,t)" },
            { shape: "flat", y: 0, from: 120, to: 158, c: "dim" }
          ],
          markers: [{ x: 0, label: "מנוע" }, { x: 120, label: "חזית x=vt=120" }],
          regions: [{ from: 0, to: 120, label: "חלון תוקף", c: "good" }],
          arrows: [{ x: 130, y: 0.032, dir: "right", c: "good", label: "v=30 m/s" }],
          caption: "t=4 s — הרגע שנתון במבחן"
        },
        cap: "זה בדיוק הפרופיל שנתון בשאלון ברגע \\(t=4\\): \\(v_y=\\tfrac{\\pi}{50}\\cos\\!\\big(\\tfrac{\\pi}{60}x\\big)\\) על \\(0\\le x\\le120\\ \\mathrm{m}\\) — וממנו משחזרים <b>אחורה בזמן</b> את כל הגל דרך ההצבה \\(u=x-vt\\)."
      },
      {
        viz: {
          type: "wave", xmin: -8, xmax: 158, ymax: 0.052,
          curves: [
            { shape: "sin", A: -0.04, k: 0.05236, phi: -7.854, from: 0, to: 150, c: "hot", label: "y(x,t)" },
            { shape: "flat", y: 0, from: 150, to: 158, c: "dim" }
          ],
          markers: [{ x: 0, label: "מנוע" }, { x: 150, label: "חזית x=vt=150" }],
          arrows: [{ x: 118, y: 0.046, dir: "right", c: "good", label: "v=30 m/s" }],
          caption: "t=5 s — המנוע ממשיך להזרים אנרגיה"
        },
        cap: "המנוע מזרים אנרגיה ללא הפסקה: \\(P_D=F_D\\,v_y(0,t)=Z\\,v_y^2(0,t)\\ge0\\), והעבודה המצטברת \\(W=\\int_0^t P_D\\,dt'\\) שווה בדיוק לאנרגיה האגורה במיתר (ראו עמוד אנרגיה והספק)."
      }
    ]
  }
]);
