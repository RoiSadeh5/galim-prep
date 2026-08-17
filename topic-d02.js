/* d02 — גל הרמוני A·sin(kx−ωt) לאורך מחזור אחד (k=1, ω=1, T=2π), מעקב אחרי פסגה */
window.TOPIC_PLAYERS = (window.TOPIC_PLAYERS || []).concat([
  {
    id: "d02_p1",
    frames: [
      {
        viz: {
          type: "wave", xmin: -1.5, xmax: 9.4, ymax: 1.3,
          curves: [
            { shape: "sin", A: 1, k: 1, phi: 0, from: -1.5, to: 9.4, c: "hot", label: "t=0" }
          ],
          markers: [{ x: 1.5708, label: "פסגה" }],
          arrows: [{ x: 2.4, y: 1.12, dir: "right", c: "good", label: "v=ω/k" }],
          caption: "t=0 — פאזת הפסגה: kx−ωt=π/2"
        },
        cap: "\\(y=A\\sin(kx-\\omega t)\\) ברגע \\(t=0\\). הפסגה המסומנת יושבת היכן שהפאזה שווה \\(\\pi/2\\), כלומר ב-\\(x=\\pi/2k\\). נעקוב אחריה לאורך <b>מחזור אחד שלם</b> \\(T=2\\pi/\\omega\\)."
      },
      {
        viz: {
          type: "wave", xmin: -1.5, xmax: 9.4, ymax: 1.3,
          curves: [
            { shape: "sin", A: 1, k: 1, phi: 0, from: -1.5, to: 9.4, c: "dim", dash: true, label: "t=0" },
            { shape: "sin", A: 1, k: 1, phi: -1.2566, from: -1.5, to: 9.4, c: "hot", label: "t=T/5" }
          ],
          markers: [{ x: 2.8274, label: "פסגה" }],
          arrows: [{ x: 3.7, y: 1.12, dir: "right", c: "good", label: "v=ω/k" }],
          caption: "t=T/5 — הפסגה זזה λ/5"
        },
        cap: "ברגע \\(t=T/5\\) הפסגה התקדמה \\(v\\cdot T/5=\\lambda/5\\). הפאזה עליה עדיין \\(kx-\\omega t=\\pi/2\\) — <b>נקודת פאזה קבועה נעה במהירות \\(v=\\omega/k\\)</b>."
      },
      {
        viz: {
          type: "wave", xmin: -1.5, xmax: 9.4, ymax: 1.3,
          curves: [
            { shape: "sin", A: 1, k: 1, phi: 0, from: -1.5, to: 9.4, c: "dim", dash: true, label: "t=0" },
            { shape: "sin", A: 1, k: 1, phi: -2.5133, from: -1.5, to: 9.4, c: "hot", label: "t=2T/5" }
          ],
          markers: [{ x: 4.0841, label: "פסגה" }],
          arrows: [{ x: 5.0, y: 1.12, dir: "right", c: "good", label: "v=ω/k" }],
          caption: "t=2T/5 — הפסגה זזה 2λ/5"
        },
        cap: "שימו לב לנקודה קבועה על הציר (למשל \\(x=0\\)): הגובה שלה השתנה — היא מבצעת תנודה הרמונית \\(y(0,t)=-A\\sin(\\omega t)\\) עם מהירות חומרית שמקסימומה \\(A\\omega\\)."
      },
      {
        viz: {
          type: "wave", xmin: -1.5, xmax: 9.4, ymax: 1.3,
          curves: [
            { shape: "sin", A: 1, k: 1, phi: 0, from: -1.5, to: 9.4, c: "dim", dash: true, label: "t=0" },
            { shape: "sin", A: 1, k: 1, phi: -3.7699, from: -1.5, to: 9.4, c: "hot", label: "t=3T/5" }
          ],
          markers: [{ x: 5.3407, label: "פסגה" }],
          arrows: [{ x: 6.2, y: 1.12, dir: "right", c: "good", label: "v=ω/k" }],
          caption: "t=3T/5 — הפסגה זזה 3λ/5"
        },
        cap: "הגל ההרמוני הוא גל חד-כיווני לכל דבר: \\(kx-\\omega t=k\\big(x-\\tfrac{\\omega}{k}t\\big)=k(x-vt)\\) — פונקציה של \\(u=x-vt\\) בלבד."
      },
      {
        viz: {
          type: "wave", xmin: -1.5, xmax: 9.4, ymax: 1.3,
          curves: [
            { shape: "sin", A: 1, k: 1, phi: 0, from: -1.5, to: 9.4, c: "dim", dash: true, label: "t=0" },
            { shape: "sin", A: 1, k: 1, phi: -5.0265, from: -1.5, to: 9.4, c: "hot", label: "t=4T/5" }
          ],
          markers: [{ x: 6.5973, label: "פסגה" }],
          arrows: [{ x: 7.5, y: 1.12, dir: "right", c: "good", label: "v=ω/k" }],
          caption: "t=4T/5 — הפסגה זזה 4λ/5"
        },
        cap: "מהירות הפסגה (מהירות הגל \\(v\\)) ומהירות המיתר עצמו (\\(v_y=-A\\omega\\cos(kx-\\omega t)\\)) הם שני גדלים שונים לחלוטין — אל תערבבו ביניהם."
      },
      {
        viz: {
          type: "wave", xmin: -1.5, xmax: 9.4, ymax: 1.3,
          curves: [
            { shape: "sin", A: 1, k: 1, phi: -6.2832, from: -1.5, to: 9.4, c: "hot", label: "t=T" }
          ],
          markers: [{ x: 7.854, label: "פסגה" }],
          arrows: [{ x: 8.6, y: 1.12, dir: "right", c: "good", label: "v=ω/k" }],
          caption: "t=T — מחזור שלם: הגל זהה לפריים הראשון"
        },
        cap: "אחרי מחזור שלם \\(t=T\\) תמונת הגל <b>זהה לחלוטין</b> לפריים הראשון — אבל הפסגה שסימנו התקדמה בדיוק אורך גל אחד: \\(\\lambda=vT=2\\pi/k\\)."
      }
    ]
  }
]);
