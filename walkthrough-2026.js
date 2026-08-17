/* ============================================================
 * פתרון מונפש מלא — שאלון 2026 X.
 * המספרים, התוצאות והשלבים נבדקו מול הפתרון הרשמי שבתיקיית הקורס.
 * ============================================================ */
window.EXAM_WALKTHROUGHS = window.EXAM_WALKTHROUGHS || {};

window.EXAM_WALKTHROUGHS["2026-X"] = {
  label: "מבחן 2026 · שאלון X",
  year: 2026,
  term: "שאלון X",
  questionHref: "assets/exams/2026-x-question.pdf",
  solutionHref: "assets/exams/2026-x-solution.pdf",
  questions: [
    {
      id: "2026X-q1",
      num: "שאלה 1",
      topic: "מיתר-מונע-בקצה",
      points: 25,
      prompt: "מיתר חצי־אינסופי <span dir='ltr'>x≥0</span> נתון במתיחות " +
        "<span dir='ltr'>T=180 N</span> ובצפיפות קווית <span dir='ltr'>ρ=0.2 kg/m</span>. " +
        "המיתר היה במנוחה, ונוצר בו גל ימינה. בזמן <span dir='ltr'>t=4 s</span> נתונה " +
        "<span dir='ltr'>vᵧ=(π/50)cos(πx/60)</span> עבור <span dir='ltr'>0≤x≤120 m</span>, " +
        "ואפס אחרת. יש למצוא מהירות גל, <span dir='ltr'>vᵧ(x,t)</span>, " +
        "<span dir='ltr'>y(x,t)</span> ואנרגיה כוללת עבור <span dir='ltr'>0≤t≤4 s</span>.",
      idea: "מתרגמים את החתך בזמן 4 לפונקציה של המשתנה החד־כיווני " +
        "<span dir='ltr'>u=x−vt</span>, מחזירים את התלות בזמן, ואז משלבים לקבלת ההעתק והאנרגיה.",
      formulas: [
        { label: "מהירות", value: "v = sqrt(T/rho)" },
        { label: "גל ימינה", value: "u = x - vt" },
        { label: "אנרגיה חד-כיוונית", value: "rho_E = rho * v_y^2" }
      ],
      answer: "<span dir='ltr'>v=30 m/s</span>; " +
        "<span dir='ltr'>y=-0.04sin(πx/60−πt/2)</span> בתחום " +
        "<span dir='ltr'>0≤x≤30t</span>; " +
        "<span dir='ltr'>E(t)=1.2·10⁻³π²[t+sin(πt)/π] J</span>.",
      traps: [
        "בזמנים 0–4 המגבלה x≥0 חזקה מן הגבול 30t−120, ולכן תחום הגל מתחיל ב־0.",
        "אינטגרציה בזמן מוסיפה קבוע; מצב המנוחה ורציפות בחזית מאפסים אותו.",
        "בגל חד־כיווני האנרגיות הקינטית והפוטנציאלית שוות."
      ],
      steps: [
        {
          title: "מחשבים מהירות גל",
          text: "מציבים מתיחות וצפיפות קווית בנוסחת המיתר.",
          formula: "v = sqrt(180 / 0.2) = 30 m/s",
          visual: { type: "vars", items: [{ k: "T", v: "180 N" }, { k: "ρ", v: "0.2 kg/m" }, { k: "v", v: "30 m/s", c: "good" }] }
        },
        {
          title: "עוברים למשתנה החד־כיווני",
          text: "לגל ימינה יש צורה קבועה כתלות ב־<span dir='ltr'>u=x−30t</span>. בזמן 4 מתקבל <span dir='ltr'>x=u+120</span>.",
          formula: "u = x - 30t;  t=4 -> x = u + 120",
          visual: { type: "note", text: "החתך בזמן 4 אינו גל חדש; הוא צילום של אותה פונקציה לאחר הזזה של 120 מטר." }
        },
        {
          title: "משחזרים את המהירות לכל זמן",
          text: "הצבה בנתון והחזרת <span dir='ltr'>u=x−30t</span> נותנות את הפאזה ואת תחום התמיכה.",
          formula: "v_y = (pi/50) cos(pi*x/60 - pi*t/2),  0 <= x <= 30t",
          visual: { type: "vars", items: [{ k: "front", v: "x=30t", c: "hot" }, { k: "left bound", v: "x=0" }, { k: "outside", v: "v_y=0", c: "dim" }] }
        },
        {
          title: "משלבים בזמן",
          text: "האינטגרל של הקוסינוס לפי הזמן מוסיף גורם <span dir='ltr'>−2/π</span>.",
          formula: "y = -0.04 sin(pi*x/60 - pi*t/2) + h(x)",
          visual: { type: "note", text: "h(x) אינו תלוי בזמן, אבל עדיין צריך לקבוע אותו ממשוואת הגלים ומתנאי ההתחלה." }
        },
        {
          title: "קובעים את קבוע האינטגרציה",
          text: "משוואת הגלים מחייבת <span dir='ltr'>h''(x)=0</span>. לפני חזית הגל המיתר נשאר על ציר x, ורציפות בחזית מאפסת את שני הקבועים.",
          formula: "h(x)=Ax+B -> A=B=0",
          visual: { type: "rows", items: [{ type: "vars", items: [{ k: "x>30t", v: "y=0", c: "dim" }] }, { type: "vars", items: [{ k: "x=30t", v: "continuous", c: "good" }] }] }
        },
        {
          title: "כותבים את הגל החתכי",
          text: "בתוך תחום הפולס משתמשים בביטוי שמצאנו; מחוצה לו ההעתק אפס.",
          formula: "y(x,t) = -0.04 sin(pi*x/60 - pi*t/2), 0<=x<=30t; else 0",
          visual: { type: "note", text: "ב־t=0 התחום מתכווץ לנקודה ולכן כל המיתר אכן מתחיל במצב שיווי משקל." }
        },
        {
          title: "מנצלים שוויון אנרגיות",
          text: "בגל חד־כיווני צפיפות האנרגיה הכוללת היא פי שניים מן הקינטית.",
          formula: "rho_E = rho * v_y^2 = 8*pi^2*10^-5 cos^2(pi*x/60-pi*t/2)",
          visual: { type: "vars", items: [{ k: "kinetic", v: "1/2 total" }, { k: "potential", v: "1/2 total" }] }
        },
        {
          title: "משלבים על תחום הפולס",
          text: "הגבול העליון הוא חזית הגל <span dir='ltr'>x=30t</span>. אינטגרל <span dir='ltr'>cos²</span> נותן את תלות האנרגיה בזמן.",
          formula: "E(t)=1.2e-3*pi^2 [ t + sin(pi*t)/pi ] J",
          visual: { type: "vars", items: [{ k: "lower", v: "0" }, { k: "upper", v: "30t" }, { k: "E(0)", v: "0 J", c: "good" }] }
        }
      ]
    },
    {
      id: "2026X-q2",
      num: "שאלה 2",
      topic: "דלמבר",
      points: 25,
      prompt: "מיתר אינסופי: <span dir='ltr'>T=900 N</span>, <span dir='ltr'>ρ=0.10 kg/m</span>. " +
        "ב־<span dir='ltr'>t=0</span>, בתחום <span dir='ltr'>|x|≤1/3</span>, " +
        "<span dir='ltr'>y=A sin²(3πx)</span> ו־<span dir='ltr'>yₜ=B sin(6πx)</span>; מחוץ לתחום שניהם אפס. " +
        "נתון <span dir='ltr'>E=7.2 J</span> ו־<span dir='ltr'>K₀/U₀=2</span>. יש למצוא " +
        "<span dir='ltr'>v,A,B</span>, פתרון ד׳אלמבר מפורש, זמן הפרדת הפולסים והספק דרך הראשית בזמן הנתון.",
      idea: "האנרגיה קובעת את שתי האמפליטודות בנפרד. אחר כך ד׳אלמבר מפצל את הנתונים לשני פולסים, וההספק מתקבל משתי הנגזרות בראשית.",
      formulas: [
        { label: "ד׳אלמבר", value: "y = 1/2[f(x-vt)+f(x+vt)] + (1/2v) integral g" },
        { label: "הספק", value: "P = -T y_x y_t" },
        { label: "הפרדה", value: "t_sep = 1/(3v)" }
      ],
      answer: "<span dir='ltr'>v=94.87 m/s, A=1.342·10⁻² m, B=16.97 m/s</span>; " +
        "הפולסים בעלי אמפליטודות <span dir='ltr'>−0.0028</span> ימינה ו־<span dir='ltr'>+0.0162</span> שמאלה; " +
        "<span dir='ltr'>t_sep=3.51 ms</span>; בזמן המבוקש <span dir='ltr'>P(0,t₁)=−1.93 kW</span> שמאלה.",
      traps: [
        "את A קובעת האנרגיה הפוטנציאלית, ואת B האנרגיה הקינטית.",
        "גבולות אינטגרל ד׳אלמבר חייבים להיחתך עם [−1/3,1/3].",
        "סימן שלילי בהספק מציין זרימה לכיוון x השלילי."
      ],
      steps: [
        {
          title: "מחשבים מהירות ומחלקים אנרגיה",
          text: "יחס 2 ו־סכום 7.2 נותנים שלושה חלקים: שניים לקינטית ואחד לפוטנציאלית.",
          formula: "v=sqrt(900/0.10)=94.87 m/s; U0=2.4 J; K0=4.8 J",
          visual: { type: "vars", items: [{ k: "v", v: "94.87", c: "good" }, { k: "U₀", v: "2.4 J" }, { k: "K₀", v: "4.8 J" }] }
        },
        {
          title: "מוצאים את A מן האנרגיה הפוטנציאלית",
          text: "גוזרים את <span dir='ltr'>A sin²(3πx)</span>, מעלים בריבוע ומשלבים רק בתחום התמיכה.",
          formula: "U0=(T/2) integral[y_x^2] dx = (3/2)T*pi^2*A^2 -> A=1.342e-2 m",
          visual: { type: "note", text: "האינטגרל הנתון בשאלון חוסך את האלגברה הטריגונומטרית." }
        },
        {
          title: "מוצאים את B מן האנרגיה הקינטית",
          text: "משלבים את ריבוע המהירות ההתחלתית בתחום <span dir='ltr'>[−1/3,1/3]</span>.",
          formula: "K0=(rho/2) B^2 integral[sin^2(6*pi*x)] dx -> B=16.97 m/s",
          visual: { type: "vars", items: [{ k: "A", v: "0.01342 m" }, { k: "B", v: "16.97 m/s", c: "good" }] }
        },
        {
          title: "כותבים ד׳אלמבר עם חיתוך",
          text: "החלק מן המהירות ההתחלתית משולב רק במקום שבו חלון ד׳אלמבר חופף לתמיכה.",
          formula: "lower=max(x-vt,-1/3); upper=min(x+vt,1/3)",
          visual: { type: "rows", items: [{ type: "vars", items: [{ k: "window", v: "[x-vt,x+vt]" }] }, { type: "vars", items: [{ k: "support", v: "[-1/3,1/3]", c: "hot" }] }] }
        },
        {
          title: "מפצלים לשני פולסים",
          text: "לאחר חיבור תרומת ההעתק ותרומת המהירות מתקבלות שתי אמפליטודות שונות.",
          formula: "y_p=-0.0028 sin^2(3*pi*(x-vt)); y_n=+0.0162 sin^2(3*pi*(x+vt))",
          visual: { type: "vars", items: [{ k: "right", v: "-0.0028", c: "bad" }, { k: "left", v: "+0.0162", c: "good" }, { k: "width", v: "2/3 m" }] }
        },
        {
          title: "מוצאים את זמן ההפרדה",
          text: "הפולסים מפסיקים לחפוף כאשר הקצה השמאלי של הימני פוגש את הקצה הימני של השמאלי.",
          formula: "-1/3 + vt = 1/3 - vt -> t_sep=1/(3v)=3.51e-3 s",
          visual: { type: "note", text: "מיד אחר כך: פולס שלילי נמוך ימינה ופולס חיובי גבוה שמאלה." }
        },
        {
          title: "גוזרים בראשית בזמן t₁",
          text: "בזמן <span dir='ltr'>t₁=1/(12v)</span> מציבים בשני הפולסים ומקבלים את השיפוע והמהירות החומרית.",
          formula: "y_x(0,t1)=0.1789; y_t(0,t1)=12.0 m/s",
          visual: { type: "vars", items: [{ k: "y_x", v: "0.1789" }, { k: "y_t", v: "12.0 m/s" }] }
        },
        {
          title: "מחשבים הספק וכיוון",
          text: "הצבת שתי הנגזרות בנוסחת ההספק נותנת סימן שלילי.",
          formula: "P=-900*0.1789*12.0=-1.93e3 W",
          visual: { type: "vars", items: [{ k: "P", v: "−1.93 kW", c: "hot" }, { k: "direction", v: "−x" }] }
        }
      ]
    },
    {
      id: "2026X-q3",
      num: "שאלה 3",
      topic: "צומת-אימפדנסים",
      points: 25,
      prompt: "מיתר במתיחות <span dir='ltr'>T=1200 N</span> מורכב משני קטעים: " +
        "<span dir='ltr'>ρ₁=0.03 kg/m</span> עבור <span dir='ltr'>x&lt;0</span> ו־" +
        "<span dir='ltr'>ρ₂=0.12 kg/m</span> עבור <span dir='ltr'>x&gt;0</span>. בזמן 0 חזית פולס " +
        "חצי־סינוס בגובה <span dir='ltr'>0.06 m</span> וברוחב <span dir='ltr'>0.4 m</span> מגיעה לצומת. " +
        "יש למצוא זמן מעבר, גל פוגע, גלים חוזר ועובר, רוחבים, יחסי אנרגיה והגל העובר לכל זמן.",
      idea: "משך יצירת הגלים בצומת שווה לזמן מעבר הפולס הפוגע. האמפליטודות נקבעות מעכבות, והרוחבים מהמהירויות.",
      formulas: [
        { label: "אמפליטודות", value: "r=(Z1-Z2)/(Z1+Z2); tau=2Z1/(Z1+Z2)" },
        { label: "אנרגיה", value: "R_E=r^2; T_E=1-r^2" },
        { label: "רוחב", value: "b_t=v2*t_i" }
      ],
      answer: "<span dir='ltr'>v₁=200 m/s, v₂=100 m/s, tᵢ=2 ms</span>; " +
        "<span dir='ltr'>Aᵣ=−0.02 m, Aₜ=0.04 m</span>; " +
        "<span dir='ltr'>bᵣ=0.4 m, bₜ=0.2 m</span>; 1/9 מוחזר ו־8/9 עובר.",
      traps: [
        "אמפליטודת ההחזרה היא שלילית אף שהפתרון הרשמי מציג גם את גודלה החיובי.",
        "רוחב הגל העובר קטן כי מהירותו חצי ממהירות הגל הפוגע.",
        "אחרי tᵢ לפולס העובר יש גם גבול אחורי; לפני tᵢ הוא מתחיל בצומת."
      ],
      steps: [
        {
          title: "מחשבים מהירויות וזמן מעבר",
          text: "מהירות נקבעת בכל צד מצפיפות המיתר. זמן מעבר הצומת הוא רוחב הפולס חלקי מהירותו בצד 1.",
          formula: "v1=200 m/s; v2=100 m/s; t_i=0.4/200=0.002 s",
          visual: { type: "vars", items: [{ k: "v₁", v: "200 m/s" }, { k: "v₂", v: "100 m/s" }, { k: "tᵢ", v: "2 ms", c: "good" }] }
        },
        {
          title: "מזיזים את הגל הפוגע",
          text: "הפולס נע ימינה במהירות 200. עד תום המעבר הוא חתוך גם על ידי התחום <span dir='ltr'>x≤0</span>.",
          formula: "y_i=0.06 sin(2.5*pi*x-500*pi*t), 200t-0.4<=x<=0",
          visual: { type: "note", text: "אחרי tᵢ אין עוד גל פוגע בצד השמאלי של הצומת." }
        },
        {
          title: "מחשבים עכבות",
          text: "אותה מתיחות בשני הצדדים; צפיפות פי ארבע נותנת מהירות חצי ועכבה כפולה.",
          formula: "Z1=sqrt(1200*0.03)=6 kg/s; Z2=sqrt(1200*0.12)=12 kg/s",
          visual: { type: "vars", items: [{ k: "Z₁", v: "6 kg/s" }, { k: "Z₂", v: "12 kg/s", c: "hot" }] }
        },
        {
          title: "מקדמי החזרה והעברה",
          text: "העכבה עולה ולכן הגל החוזר מתהפך.",
          formula: "r=(6-12)/18=-1/3; tau=12/18=2/3",
          visual: { type: "vars", items: [{ k: "r", v: "−1/3", c: "bad" }, { k: "τ", v: "2/3", c: "good" }] }
        },
        {
          title: "גובה ורוחב",
          text: "מכפילים גובה במקדמים; רוחב הוא מהירות כפול משך המעבר.",
          formula: "A_r=-0.02 m; A_t=0.04 m; b_r=0.4 m; b_t=0.2 m",
          visual: { type: "table", head: ["wave", "amplitude", "width"], rows: [["reflected", "−0.02", "0.4"], ["transmitted", "0.04", "0.2"]] }
        },
        {
          title: "יחסי אנרגיה",
          text: "האנרגיה המוחזרת תלויה בריבוע מקדם האמפליטודה; השאר עובר.",
          formula: "E_r/E_i=1/9; E_t/E_i=8/9",
          visual: { type: "vars", items: [{ k: "reflected", v: "11.1%" }, { k: "transmitted", v: "88.9%", c: "good" }] }
        },
        {
          title: "כותבים את הגל העובר",
          text: "התדר נשמר והמהירות חצי, ולכן מספר הגל מוכפל. לפני סיום היצירה הפולס נוגע בצומת; אחריה הוא כולו בצד 2.",
          formula: "y_t=0.04 sin(5*pi*x-500*pi*t)",
          visual: { type: "rows", items: [{ type: "vars", items: [{ k: "0<=t<=tᵢ", v: "0<=x<=100t" }] }, { type: "vars", items: [{ k: "t>tᵢ", v: "100t−0.2<=x<=100t", c: "hot" }] }] }
        }
      ]
    },
    {
      id: "2026X-q4",
      num: "שאלה 4",
      topic: "גלים-עומדים-פורייה",
      points: 25,
      prompt: "מיתר רתום באורך <span dir='ltr'>L=6 m</span>, מתיחות <span dir='ltr'>T=900 N</span> " +
        "וצפיפות <span dir='ltr'>ρ=0.040 kg/m</span>. ההעתק ההתחלתי כולל אופנים 1,2,4 במקדמים " +
        "<span dir='ltr'>0.020,−0.006,0.004 m</span>; המהירות ההתחלתית כוללת אופנים 1,3,4 במקדמים " +
        "<span dir='ltr'>0.50π,−0.30π,0.40π m/s</span>. יש למצוא מהירות, תדרים, אמפליטודות ופאזות, " +
        "חד־כיווניות, מחזור ואנרגיה בכל אופן.",
      idea: "האורתוגונליות כבר גלויה בנתונים: קוראים לכל n את מקדם ההעתק ואת מקדם המהירות, ממירים לזוג <span dir='ltr'>Cₙ,Sₙ</span>, ואז לאמפליטודה ופאזה.",
      formulas: [
        { label: "אופנים", value: "k_n=n*pi/L; omega_n=v*k_n" },
        { label: "אמפליטודה", value: "c_n=sqrt(C_n^2+S_n^2)" },
        { label: "אנרגיה", value: "E_n=rho*L*omega_n^2*c_n^2/4" }
      ],
      answer: "<span dir='ltr'>v=150 m/s, ωₙ=25πn rad/s</span>. " +
        "האופנים 1–4 הם בהתאמה <span dir='ltr'>(0.020√2,−π/4), (0.006,π), (0.004,π/2), (0.004√2,−π/4)</span>. " +
        "<span dir='ltr'>Tmin=0.080 s</span> ו־<span dir='ltr'>Etotal=0.592 J</span>.",
      traps: [
        "אופן יכול להיעדר מן ההעתק ולהופיע במהירות; אין למחוק אותו.",
        "הסימן של מקדם המהירות קובע את הפאזה דרך הנגזרת בזמן.",
        "זהו סכום גלים עומדים, לא גל חד־כיווני."
      ],
      steps: [
        {
          title: "מהירות ותדרים",
          text: "מחשבים מהירות גל ואז משתמשים בתנאי רתימה בשני קצות המיתר.",
          formula: "v=sqrt(900/0.040)=150 m/s; omega_n=25*pi*n rad/s",
          visual: { type: "vars", items: [{ k: "v", v: "150 m/s" }, { k: "ω₁", v: "25π" }, { k: "ω₄", v: "100π" }] }
        },
        {
          title: "מגדירים שני מקדמים לכל אופן",
          text: "<span dir='ltr'>Cₙ=cₙcosφₙ</span> מתקבל מן ההעתק. בגלל נגזרת הקוסינוס, <span dir='ltr'>Sₙ=cₙsinφₙ</span> מתקבל עם מינוס מן המהירות.",
          formula: "C_n=(2/L) integral y0*sin(k_n*x); S_n=-(2/(n*pi*v)) integral ydot0*sin(k_n*x)",
          visual: { type: "note", text: "כאן לא צריך לבצע אינטגרלים בפועל: הנתונים כבר כתובים בבסיס הסינוסים." }
        },
        {
          title: "קוראים את המקדמים",
          text: "מסדרים את תוצאות האורתוגונליות בטבלה אחת.",
          formula: "n: 1 2 3 4; C: .020 -.006 0 .004; S: -.020 0 .004 -.004",
          visual: { type: "table", head: ["n", "Cₙ", "Sₙ"], rows: [[1, "0.020", "−0.020"], [2, "−0.006", "0"], [3, "0", "0.004"], [4, "0.004", "−0.004"]] }
        },
        {
          title: "ממירים לאמפליטודה ופאזה",
          text: "לכל שורה מחשבים אורך וקטור וזווית ברביע הנכון.",
          formula: "c_n=sqrt(C_n^2+S_n^2); phi_n=atan2(S_n,C_n)",
          visual: { type: "table", head: ["n", "cₙ", "φₙ"], rows: [[1, "0.020√2", "−π/4"], [2, "0.006", "π"], [3, "0.004", "π/2"], [4, "0.004√2", "−π/4"]] }
        },
        {
          title: "כותבים את הטור המפורש",
          text: "מציבים כל שורה בביטוי <span dir='ltr'>cₙ sin(nπx/L) cos(25πnt+φₙ)</span> ומחברים ארבעה איברים.",
          formula: "y = sum_{n=1..4} c_n sin(n*pi*x/L) cos(25*pi*n*t + phi_n)",
          visual: { type: "note", text: "האופן 3 נוצר רק מן המהירות ההתחלתית, ולכן הוא מופיע למרות שאינו נמצא ב־y(x,0)." }
        },
        {
          title: "קובעים סוג גל ומחזור",
          text: "תנאי הרתימה יוצרים גלים עומדים. מכיוון שהאופן היסודי פעיל, כל האופנים חוזרים יחד לאחר מחזורו.",
          formula: "T_min=2*pi/omega_1=2*pi/(25*pi)=0.080 s",
          visual: { type: "vars", items: [{ k: "type", v: "standing-wave sum" }, { k: "Tmin", v: "0.080 s", c: "good" }] }
        },
        {
          title: "מחשבים אנרגיה לכל אופן",
          text: "אורתוגונליות מאפסת איברים מעורבים, ולכן אפשר לחשב ולסכום אופן־אופן.",
          formula: "E_n=rho*L*omega_n^2*c_n^2/4",
          visual: { type: "table", head: ["mode", "energy"], rows: [[1, "0.296 J"], [2, "0.0533 J"], [3, "0.0533 J"], [4, "0.189 J"]] }
        },
        {
          title: "מסכמים ובודקים",
          text: "סכום ארבע התרומות הוא האנרגיה המכנית הקבועה של המיתר.",
          formula: "E_total=0.060*pi^2=0.592 J",
          visual: { type: "vars", items: [{ k: "Etotal", v: "0.592 J", c: "good" }, { k: "periodic", v: "yes" }, { k: "one-way", v: "no" }] }
        }
      ]
    }
  ]
};
