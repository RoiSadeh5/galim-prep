/* ============================================================
 *  labs.js — מעבדות חופשיות.
 *
 *  לכל מעבדה: פרמטרים שמזיזים, ציור חי, וגדלים נגזרים שמתעדכנים
 *  תוך כדי. המטרה היא לפתח אינטואיציה — מה קורה לגל כשמשנים ρ,
 *  איך נראה גל חוזר כש-Z₂>Z₁, ולמה פאזה משנה את צורת הגל העומד.
 *
 *  צורך: window.showLabs(on) — נקרא מ-exam-sim.js בעת מעבר מצב.
 *  הציור ב-canvas עם requestAnimationFrame; הצבעים נלקחים ממשתני
 *  ה-CSS של הדף, ולכן המעבדות מתחלפות אוטומטית בין מצב בהיר לכהה.
 * ============================================================ */
(function () {
  "use strict";

  var root = document.getElementById("labs");
  if (!root) return;

  var active = "harmonic";
  var playing = true;
  var t = 0;
  var raf = null;
  var canvas = null;
  var ctx = null;
  var P = {};                      /* ערכי הפרמטרים של המעבדה הפעילה */

  /* ---------- צבעים מתוך ערכת הנושא ---------- */
  function css(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name);
    return (v || "").trim() || fallback;
  }
  function theme() {
    return {
      fg: css("--fg", "#152528"),
      fg2: css("--fg2", "#54676b"),
      line: css("--line", "#b9c9cb"),
      bg: css("--bg2", "#fff"),
      accent: css("--accent", "#087f8c"),
      red: css("--red", "#a13c2d"),
      blue: css("--blue", "#285b8f"),
      amber: css("--amber", "#9a6100")
    };
  }

  /* ---------- הגדרת המעבדות ---------- */
  var LABS = {
    harmonic: {
      title: "גל הרמוני",
      lead: "הזז את המשרעת, מספר הגל והתדירות — וראה איך הם קובעים את אורך הגל, " +
            "המחזור ומהירות ההתקדמות. שים לב שמהירות הגל ומהירות החומר הן שני דברים שונים.",
      topic: "d02",
      params: [
        { k: "A", label: "משרעת A", min: 0.1, max: 1, step: 0.05, val: 0.6, unit: "m" },
        { k: "k", label: "מספר הגל k", min: 0.5, max: 6, step: 0.1, val: 2, unit: "rad/m" },
        { k: "w", label: "תדירות זוויתית ω", min: 0.5, max: 8, step: 0.1, val: 3, unit: "rad/s" },
        { k: "ph", label: "פאזה φ", min: 0, max: 6.28, step: 0.05, val: 0, unit: "rad" },
        { k: "dir", label: "כיוון (1 ימינה, ‎−1 שמאלה)", min: -1, max: 1, step: 2, val: 1, unit: "" }
      ],
      derived: function (p) {
        var v = p.w / p.k;
        return [
          ["מהירות הגל  v = ω/k", v.toFixed(2) + " m/s"],
          ["אורך גל  λ = 2π/k", (2 * Math.PI / p.k).toFixed(2) + " m"],
          ["מחזור  T = 2π/ω", (2 * Math.PI / p.w).toFixed(2) + " s"],
          ["תדירות  f = ω/2π", (p.w / (2 * Math.PI)).toFixed(2) + " Hz"],
          ["מהירות חומרית מרבית  ωA", (p.w * p.A).toFixed(2) + " m/s"]
        ];
      },
      draw: function (g, p, time) {
        var c = theme();
        g.axis();
        g.curve(function (x) {
          return p.A * Math.cos(p.k * x - p.dir * p.w * time + p.ph);
        }, c.accent, 2.4);
        /* נקודה חומרית אחת — להמחשת התנועה האנכית בלבד */
        var xm = g.xmax * 0.5;
        var ym = p.A * Math.cos(p.k * xm - p.dir * p.w * time + p.ph);
        g.dot(xm, ym, c.red);
        g.vArrow(xm, ym, p.A * p.w * Math.sin(p.k * xm - p.dir * p.w * time + p.ph) * 0.12, c.red);
        g.label(xm, ym, "נקודה על המיתר — נעה רק אנכית", c.red);
      }
    },

    junction: {
      title: "צומת אימפדנסים",
      lead: "שני מיתרים באותה מתיחות ובצפיפויות שונות. שלח פולס וראה מה חוזר ומה עובר. " +
            "כאשר ρ₂>ρ₁ הפולס החוזר מתהפך; רוחב הפולס העובר נמתח ביחס המהירויות.",
      topic: "d06",
      params: [
        { k: "r1", label: "צפיפות ρ₁", min: 0.05, max: 1, step: 0.05, val: 0.2, unit: "kg/m" },
        { k: "r2", label: "צפיפות ρ₂", min: 0.05, max: 1, step: 0.05, val: 0.8, unit: "kg/m" },
        { k: "T", label: "מתיחות T", min: 10, max: 200, step: 5, val: 80, unit: "N" },
        { k: "w", label: "רוחב הפולס", min: 0.4, max: 2.5, step: 0.1, val: 1.2, unit: "m" }
      ],
      derived: function (p) {
        var v1 = Math.sqrt(p.T / p.r1), v2 = Math.sqrt(p.T / p.r2);
        var Z1 = Math.sqrt(p.T * p.r1), Z2 = Math.sqrt(p.T * p.r2);
        var R = (Z1 - Z2) / (Z1 + Z2), tau = 2 * Z1 / (Z1 + Z2);
        return [
          ["v₁ · v₂", v1.toFixed(1) + " · " + v2.toFixed(1) + " m/s"],
          ["Z₁ · Z₂", Z1.toFixed(2) + " · " + Z2.toFixed(2) + " kg/s"],
          ["מקדם החזרה  R", R.toFixed(3) + (R < 0 ? "  (הפולס מתהפך)" : "  (בלי היפוך)")],
          ["מקדם העברה  τ = 1+R", tau.toFixed(3)],
          ["אנרגיה מוחזרת  R²", (100 * R * R).toFixed(1) + "%"],
          ["אנרגיה עוברת  1−R²", (100 * (1 - R * R)).toFixed(1) + "%"],
          ["רוחב הפולס העובר", (p.w * Math.sqrt(p.r1 / p.r2)).toFixed(2) + " m"]
        ];
      },
      draw: function (g, p, time) {
        var c = theme();
        var v1 = Math.sqrt(p.T / p.r1), v2 = Math.sqrt(p.T / p.r2);
        var Z1 = Math.sqrt(p.T * p.r1), Z2 = Math.sqrt(p.T * p.r2);
        var R = (Z1 - Z2) / (Z1 + Z2), tau = 2 * Z1 / (Z1 + Z2);
        var xj = g.xmax / 2;                       /* מיקום הצומת */
        var scale = 4;                             /* האטה כדי שיהיה נוח לעקוב */
        var tt = (time * scale) % ((g.xmax / v1) * 1.9);
        var head = -g.xmax * 0.45 + v1 * tt;       /* מרכז הפולס הפוגע */

        function bump(d, w) {                      /* פולס חלק, תמיכה סופית */
          if (Math.abs(d) > w / 2) return 0;
          return Math.pow(Math.cos(Math.PI * d / w), 2);
        }
        g.band(xj, g.xmax, "rgba(128,128,128,.10)");
        g.axis();
        g.curve(function (x) {
          if (x < xj) {
            var inc = head < xj ? bump(x - head, p.w) : 0;
            var refl = head > xj ? R * bump(x - (2 * xj - head), p.w) : 0;
            return 0.55 * (inc + refl);
          }
          var dt = (head - xj) / v1;
          var xt = xj + v2 * dt;
          return head > xj ? 0.55 * tau * bump((x - xt) * (v1 / v2), p.w) : 0;
        }, c.accent, 2.4);
        g.vline(xj, c.red, "צומת");
        g.label(g.xmax * 0.12, 0.86, "ρ₁ = " + p.r1.toFixed(2), c.fg2);
        g.label(g.xmax * 0.72, 0.86, "ρ₂ = " + p.r2.toFixed(2), c.fg2);
      }
    },

    dalembert: {
      title: "ד׳אלמבר — תנאי התחלה",
      lead: "העתק התחלתי מתפצל לשני חצאים שנעים לכיוונים מנוגדים. " +
            "הוסף מהירות התחלתית ותראה איך היחס בין שני החצאים משתנה — " +
            "ובערך אחד מהם נעלם לגמרי והגל הופך חד-כיווני.",
      topic: "d03",
      params: [
        { k: "A", label: "העתק התחלתי A", min: 0, max: 1, step: 0.05, val: 0.7, unit: "m" },
        { k: "B", label: "מהירות התחלתית (יחס B/Av)", min: -1.5, max: 1.5, step: 0.05, val: 0, unit: "" },
        { k: "v", label: "מהירות הגל v", min: 0.5, max: 4, step: 0.1, val: 1.5, unit: "m/s" },
        { k: "w", label: "רוחב התמיכה", min: 0.4, max: 2.5, step: 0.1, val: 1.2, unit: "m" }
      ],
      derived: function (p) {
        var right = 0.5 * p.A * (1 + p.B), left = 0.5 * p.A * (1 - p.B);
        var note = Math.abs(p.B - 1) < 0.03 ? "חד-כיווני ימינה"
                 : Math.abs(p.B + 1) < 0.03 ? "חד-כיווני שמאלה" : "שני כיוונים";
        return [
          ["חצי נע ימינה  ½A(1+B)", right.toFixed(3) + " m"],
          ["חצי נע שמאלה  ½A(1−B)", left.toFixed(3) + " m"],
          ["מצב", note],
          ["תנאי חד-כיווניות", "v_y = ∓v·y_x  ⟺  B/Av = ±1"],
          ["זמן הפרדה מלאה", (p.w / (2 * p.v)).toFixed(2) + " s"]
        ];
      },
      draw: function (g, p, time) {
        var c = theme();
        var scale = 1.4;
        var tt = (time * scale) % (g.xmax / (2 * p.v));
        function bump(d, w) {
          if (Math.abs(d) > w / 2) return 0;
          return Math.pow(Math.cos(Math.PI * d / w), 2);
        }
        var x0 = g.xmax / 2;
        var aR = 0.5 * p.A * (1 + p.B), aL = 0.5 * p.A * (1 - p.B);
        g.axis();
        g.curve(function (x) { return aR * bump(x - x0 - p.v * tt, p.w); }, c.blue, 1.6);
        g.curve(function (x) { return aL * bump(x - x0 + p.v * tt, p.w); }, c.amber, 1.6);
        g.curve(function (x) {
          return aR * bump(x - x0 - p.v * tt, p.w) + aL * bump(x - x0 + p.v * tt, p.w);
        }, c.accent, 2.6);
        g.label(g.xmax * 0.80, 0.86, "ימינה", c.blue);
        g.label(g.xmax * 0.12, 0.86, "שמאלה", c.amber);
      }
    },

    standing: {
      title: "מיתר רתום — גלים עומדים",
      lead: "הפעל הרמוניות וקבע את המשרעת של כל אחת. הסכום הוא בדיוק טור פורייה. " +
            "שים לב שהצמתים של כל אופן נשארים במקומם, ושהאנרגיה גדלה כ-n².",
      topic: "d07",
      params: [
        { k: "c1", label: "משרעת אופן 1", min: 0, max: 1, step: 0.05, val: 0.8, unit: "" },
        { k: "c2", label: "משרעת אופן 2", min: 0, max: 1, step: 0.05, val: 0, unit: "" },
        { k: "c3", label: "משרעת אופן 3", min: 0, max: 1, step: 0.05, val: 0.35, unit: "" },
        { k: "c4", label: "משרעת אופן 4", min: 0, max: 1, step: 0.05, val: 0, unit: "" },
        { k: "v", label: "מהירות הגל v", min: 0.5, max: 4, step: 0.1, val: 1.5, unit: "m/s" }
      ],
      derived: function (p) {
        var L = 8, cs = [p.c1, p.c2, p.c3, p.c4];
        var E = 0, out = [];
        cs.forEach(function (c, i) { E += c * c * (i + 1) * (i + 1); });
        out.push(["אורך המיתר L", L + " m"]);
        out.push(["תדירות יסוד  f₁ = v/2L", (p.v / (2 * L)).toFixed(3) + " Hz"]);
        cs.forEach(function (c, i) {
          if (c > 0) out.push(["אופן " + (i + 1) + " — צמתים פנימיים", String(i)]);
        });
        out.push(["אנרגיה יחסית  Σcₙ²n²", E.toFixed(3)]);
        if (E > 0) out.push(["חלק האופן הראשון", (100 * p.c1 * p.c1 / E).toFixed(1) + "%"]);
        return out;
      },
      draw: function (g, p, time) {
        var c = theme();
        var L = 8, cs = [p.c1, p.c2, p.c3, p.c4];
        g.axis();
        cs.forEach(function (cn, i) {
          if (cn <= 0) return;
          var n = i + 1, w = n * Math.PI * p.v / L;
          g.curve(function (x) {
            return 0.75 * cn * Math.sin(n * Math.PI * x / L) * Math.cos(w * time);
          }, c.line, 1.1);
        });
        g.curve(function (x) {
          var y = 0;
          cs.forEach(function (cn, i) {
            var n = i + 1, w = n * Math.PI * p.v / L;
            y += cn * Math.sin(n * Math.PI * x / L) * Math.cos(w * time);
          });
          return 0.75 * y;
        }, c.accent, 2.6);
        g.clamp(0); g.clamp(L);
      }
    },

    tline: {
      title: "קו תמסורת",
      lead: "אותה פיזיקה בשפה של מתח וזרם. שנה את L׳ ו-C׳ וראה איך משתנים " +
            "מהירות ההתפשטות והעכבה האופיינית. שים לב לסימן: בגל שנע שמאלה I = −V/Z.",
      topic: "d08",
      params: [
        { k: "L", label: "השראות ליחידת אורך L׳ (µH/m)", min: 0.2, max: 6, step: 0.1, val: 2.5, unit: "" },
        { k: "C", label: "קיבול ליחידת אורך C׳ (nF/m)", min: 0.2, max: 6, step: 0.1, val: 1, unit: "" },
        { k: "A", label: "משרעת המתח V₀", min: 0.2, max: 1, step: 0.05, val: 0.7, unit: "V" },
        { k: "dir", label: "כיוון (1 ימינה, ‎−1 שמאלה)", min: -1, max: 1, step: 2, val: 1, unit: "" }
      ],
      derived: function (p) {
        var L = p.L * 1e-6, C = p.C * 1e-9;
        var v = 1 / Math.sqrt(L * C), Z = Math.sqrt(L / C);
        return [
          ["מהירות  v = 1/√(L׳C׳)", (v / 1e8).toFixed(3) + " ×10⁸ m/s"],
          ["עכבה  Z₀ = √(L׳/C׳)", Z.toFixed(1) + " Ω"],
          ["משרעת הזרם  I₀ = V₀/Z₀", (p.A / Z * 1000).toFixed(2) + " mA"],
          ["סימן הזרם", p.dir > 0 ? "I = +V/Z₀  (ימינה)" : "I = −V/Z₀  (שמאלה)"],
          ["בדיקה  Z₀ = L׳·v", (L * v).toFixed(1) + " Ω"]
        ];
      },
      draw: function (g, p, time) {
        var c = theme();
        var k = 1.6, w = 3;
        g.axis();
        g.curve(function (x) {
          return p.A * Math.cos(k * x - p.dir * w * time);
        }, c.accent, 2.4);
        g.curve(function (x) {
          return p.dir * p.A * 0.62 * Math.cos(k * x - p.dir * w * time);
        }, c.amber, 1.8);
        g.label(g.xmax * 0.06, 0.86, "V(x,t)", c.accent);
        g.label(g.xmax * 0.06, 0.70, "I(x,t)·Z₀", c.amber);
      }
    }
  };

  /* ---------- שכבת ציור ---------- */
  function makeGfx() {
    var W = canvas.width, H = canvas.height;
    var dpr = window.devicePixelRatio || 1;
    var padX = 34 * dpr, padY = 20 * dpr;
    var xmax = 12;
    var mx = function (x) { return padX + (x / xmax) * (W - 2 * padX); };
    var my = function (y) { return H / 2 - y * (H / 2 - padY); };
    var c = theme();
    return {
      xmax: xmax,
      axis: function () {
        ctx.strokeStyle = c.line; ctx.lineWidth = 1 * dpr;
        ctx.beginPath(); ctx.moveTo(mx(0), my(0)); ctx.lineTo(mx(xmax), my(0)); ctx.stroke();
      },
      curve: function (fn, color, width) {
        ctx.strokeStyle = color; ctx.lineWidth = (width || 2) * dpr;
        ctx.beginPath();
        for (var i = 0; i <= 600; i++) {
          var x = xmax * i / 600, y = fn(x);
          if (!isFinite(y)) y = 0;
          if (i === 0) ctx.moveTo(mx(x), my(y)); else ctx.lineTo(mx(x), my(y));
        }
        ctx.stroke();
      },
      dot: function (x, y, color) {
        ctx.fillStyle = color; ctx.beginPath();
        ctx.arc(mx(x), my(y), 4.5 * dpr, 0, 6.283); ctx.fill();
      },
      vArrow: function (x, y, dy, color) {
        ctx.strokeStyle = color; ctx.lineWidth = 2 * dpr;
        ctx.beginPath(); ctx.moveTo(mx(x), my(y)); ctx.lineTo(mx(x), my(y + dy)); ctx.stroke();
      },
      vline: function (x, color, text) {
        ctx.strokeStyle = color; ctx.lineWidth = 1.6 * dpr;
        ctx.setLineDash([5 * dpr, 4 * dpr]);
        ctx.beginPath(); ctx.moveTo(mx(x), padY); ctx.lineTo(mx(x), H - padY); ctx.stroke();
        ctx.setLineDash([]);
        if (text) {
          ctx.fillStyle = color; ctx.font = (11 * dpr) + "px system-ui, sans-serif";
          ctx.textAlign = "center"; ctx.fillText(text, mx(x), padY - 4 * dpr);
        }
      },
      band: function (x0, x1, fill) {
        ctx.fillStyle = fill;
        ctx.fillRect(mx(x0), padY, mx(x1) - mx(x0), H - 2 * padY);
      },
      clamp: function (x) {
        ctx.fillStyle = c.fg2;
        ctx.fillRect(mx(x) - 2 * dpr, my(0) - 9 * dpr, 4 * dpr, 18 * dpr);
      },
      label: function (x, y, text, color) {
        ctx.fillStyle = color; ctx.font = (11.5 * dpr) + "px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(text, mx(x), my(y) - 7 * dpr);
      }
    };
  }

  function drawOnce() {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    LABS[active].draw(makeGfx(), P, t);
    renderDerived();
  }

  function frame() {
    if (!canvas || !ctx) return;
    if (playing) t += 0.016;
    drawOnce();
    raf = requestAnimationFrame(frame);
  }

  function renderDerived() {
    var box = document.getElementById("labDerived");
    if (!box) return;
    box.innerHTML = LABS[active].derived(P).map(function (row) {
      return '<div class="lab-row"><span>' + row[0] + "</span><b>" + row[1] + "</b></div>";
    }).join("");
  }

  function sizeCanvas() {
    if (!canvas) return;
    var dpr = window.devicePixelRatio || 1;
    var w = canvas.clientWidth || 600;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(260 * dpr);
  }

  function render() {
    var lab = LABS[active];
    P = {};
    lab.params.forEach(function (p) { P[p.k] = p.val; });

    var topicLink = "";
    if (window.COURSE && window.COURSE.topicPages) {
      var entry = null;
      Object.keys(window.COURSE.topicPages).forEach(function (cat) {
        if (window.COURSE.topicPages[cat][0] === lab.topic) entry = window.COURSE.topicPages[cat];
      });
      if (entry) {
        topicLink = '<a class="topic-link" href="#' + entry[0] + '">📖 רקע מלא: ' + entry[1] + "</a>";
      }
    }

    root.innerHTML =
      '<div class="lab-tabs">' +
        Object.keys(LABS).map(function (key) {
          return '<button class="quiz-btn' + (key === active ? " primary on" : "") +
            '" data-lab="' + key + '">' + LABS[key].title + "</button>";
        }).join("") +
      "</div>" +
      '<div class="lab-wrap">' +
        "<h2>" + lab.title + "</h2>" +
        '<p class="lead">' + lab.lead + "</p>" +
        (topicLink ? '<div class="source-proof">' + topicLink + "</div>" : "") +
        '<canvas id="labCanvas"></canvas>' +
        '<div class="lab-bar">' +
          '<button class="quiz-btn" data-lab-play>' + (playing ? "עצור" : "הפעל") + "</button>" +
          '<button class="quiz-btn" data-lab-reset>אפס מהתחלה</button>' +
          '<span class="muted">הזמן רץ אוטומטית — עצור כדי לבחון רגע אחד</span>' +
        "</div>" +
        '<div class="lab-grid">' +
          '<div class="lab-params">' +
            lab.params.map(function (p) {
              return '<label class="lab-param"><span>' + p.label +
                ' <b data-out="' + p.k + '">' + p.val + "</b> " + (p.unit || "") + "</span>" +
                '<input type="range" data-p="' + p.k + '" min="' + p.min + '" max="' + p.max +
                '" step="' + p.step + '" value="' + p.val + '"></label>';
            }).join("") +
          "</div>" +
          '<div class="lab-derived" id="labDerived"></div>' +
        "</div>" +
      "</div>";

    canvas = document.getElementById("labCanvas");
    ctx = canvas.getContext("2d");
    sizeCanvas();
    drawOnce();
  }

  root.addEventListener("input", function (e) {
    var sl = e.target.closest("input[data-p]");
    if (!sl) return;
    var key = sl.getAttribute("data-p");
    P[key] = parseFloat(sl.value);
    var out = root.querySelector('[data-out="' + key + '"]');
    if (out) out.textContent = sl.value;
    drawOnce();
  });

  root.addEventListener("click", function (e) {
    var tab = e.target.closest("[data-lab]");
    if (tab) { active = tab.getAttribute("data-lab"); t = 0; render(); return; }
    if (e.target.closest("[data-lab-play]")) {
      playing = !playing;
      var b = root.querySelector("[data-lab-play]");
      if (b) b.textContent = playing ? "עצור" : "הפעל";
      return;
    }
    if (e.target.closest("[data-lab-reset]")) { t = 0; render(); }
  });

  window.addEventListener("resize", function () { sizeCanvas(); drawOnce(); });

  window.showLabs = function (on) {
    root.style.display = on ? "" : "none";
    if (on) {
      render();
      if (!raf) raf = requestAnimationFrame(frame);
    } else if (raf) {
      cancelAnimationFrame(raf); raf = null;
    }
  };
})();
