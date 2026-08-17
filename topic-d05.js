/* d05 — אנרגיה והספק: פולס חד-כיווני נושא אנרגיה (P=Z·v_y²≥0) עובר דרך נקודת מדידה;
 * פריים סיום: גל עומד — P=0 תמידית בצמתים ובבטנים, אין הובלת אנרגיה נטו. */
window.TOPIC_PLAYERS = (window.TOPIC_PLAYERS || []).concat([
  {
    id: "d05_p1",
    frames: [
      {
        viz: {
          type: "wave", xmin: -5, xmax: 5, ymax: 1.1,
          curves: [
            { shape: "halfsin", A: 0.8, from: -4, to: -2, c: "hot", label: "פולס חד־כיווני" }
          ],
          markers: [{ x: 0, label: "נקודת מדידה x₀" }],
          arrows: [{ x: -1.6, y: 0.5, dir: "right", c: "good", label: "P=Z·v_y²" }],
          caption: "t=0 — האנרגיה ארוזה בפולס ונעה איתו"
        },
        cap: "בפולס חד־כיווני צפיפות האנרגיה הקינטית \\(\\rho_K=\\tfrac{\\rho}{2}y_t^2\\) והפוטנציאלית \\(\\rho_P=\\tfrac{T}{2}y_x^2\\) <b>שוות בכל נקודה ורגע</b>, ולכן \\(\\rho_E=\\rho v_y^2\\) — האנרגיה יושבת היכן שהפולס ונעה איתו במהירות \\(v\\)."
      },
      {
        viz: {
          type: "wave", xmin: -5, xmax: 5, ymax: 1.1,
          curves: [
            { shape: "halfsin", A: 0.8, from: -4, to: -2, c: "dim", dash: true, label: "t=0" },
            { shape: "halfsin", A: 0.8, from: -2.7, to: -0.7, c: "hot", label: "הפולס" }
          ],
          markers: [{ x: 0, label: "נקודת מדידה x₀" }],
          arrows: [{ x: -0.3, y: 0.5, dir: "right", c: "good", label: "P=Z·v_y²" }],
          caption: "ההספק חיובי בכל נקודה שהפולס עובר בה"
        },
        cap: "ההספק הרגעי \\(P=-T\\,y_x\\,y_t\\) הופך לגל ימינה ל-\\(P=Z\\,v_y^2\\ge0\\) — <b>שטף האנרגיה תמיד בכיוון ההתקדמות</b>, לעולם לא אחורה. שקול: \\(P=v\\,\\rho_E\\) — צפיפות האנרגיה מוסעת במהירות הגל."
      },
      {
        viz: {
          type: "wave", xmin: -5, xmax: 5, ymax: 1.1,
          curves: [
            { shape: "halfsin", A: 0.8, from: -4, to: -2, c: "dim", dash: true, label: "t=0" },
            { shape: "halfsin", A: 0.8, from: -1.2, to: 0.8, c: "hot", label: "הפולס" }
          ],
          markers: [{ x: 0, label: "נקודת מדידה x₀" }],
          arrows: [{ x: 1.3, y: 0.5, dir: "right", c: "good", label: "P=Z·v_y²" }],
          caption: "הפולס חוצה את x₀ — אנרגיה זורמת דרך הנקודה"
        },
        cap: "כשהפולס חוצה את נקודת המדידה \\(x_0\\), האנרגיה שעוברת דרכה בפרק זמן היא <b>אינטגרל בזמן על ההספק</b>: \\(W=\\displaystyle\\int_{t_1}^{t_2}P(x_0,t)\\,dt\\)."
      },
      {
        viz: {
          type: "wave", xmin: -5, xmax: 5, ymax: 1.1,
          curves: [
            { shape: "halfsin", A: 0.8, from: -4, to: -2, c: "dim", dash: true, label: "t=0" },
            { shape: "halfsin", A: 0.8, from: 0.6, to: 2.6, c: "hot", label: "הפולס" }
          ],
          markers: [{ x: 0, label: "נקודת מדידה x₀" }],
          arrows: [{ x: 3.1, y: 0.5, dir: "right", c: "good", label: "P=Z·v_y²" }],
          caption: "הפולס עבר כולו — כל האנרגיה שלו חצתה את x₀"
        },
        cap: "אחרי שהפולס עבר כולו, כל האנרגיה שלו חצתה את הנקודה: \\(W=E_{\\mathrm{pulse}}=\\displaystyle\\int T\\,y_x^2\\,dx=\\displaystyle\\int\\rho\\,v_y^2\\,dx\\) — אינטגרל הזמן על ההספק שווה לאינטגרל המקום על הצפיפות."
      },
      {
        viz: {
          type: "wave", xmin: -4.71, xmax: 4.71, ymax: 1.1,
          curves: [
            { shape: "sin", A: 0.8, k: 1, phi: 0, from: -4.71, to: 4.71, c: "hot", label: "גל עומד (רגע נתון)" },
            { shape: "sin", A: -0.8, k: 1, phi: 0, from: -4.71, to: 4.71, c: "dim", dash: true, label: "חצי מחזור אחר־כך" }
          ],
          markers: [
            { x: -3.1416, label: "צומת · P=0" },
            { x: 0, label: "צומת · P=0" },
            { x: 3.1416, label: "צומת · P=0" }
          ],
          caption: "גל עומד — אין הובלת אנרגיה נטו"
        },
        cap: "בגל עומד \\(y=A\\sin(kx)\\cos(\\omega t)\\) מתקיים \\(P\\propto\\sin(2kx)\\sin(2\\omega t)\\): ההספק מתאפס <b>תמידית</b> בצמתים (\\(y_t=0\\)) ובבטנים (\\(y_x=0\\)) — האנרגיה כלואה בין הצמתים ומתנדנדת בין קינטית לפוטנציאלית, ולכל אופן \\(E_n=\\tfrac14\\rho L c_n^2\\omega_n^2\\)."
      }
    ]
  }
]);
