/* מנוע הנפשה גנרי — מקבל תיאור נתונים ומחזיר HTML.
 * נועד לשמש פתרונות מונפשים שלב-אחר-שלב.
 *
 * סוגים נתמכים:
 *   {type:"array",  cells:[...], base:0, brace:{from,to,text}}
 *   {type:"stack",  items:[...]}                 // items[0] = תחתית
 *   {type:"queue",  items:[...]}
 *   {type:"list",   nodes:[...], kind:"single|double|circular"}
 *   {type:"tree",   root:{v,c,l,r}}
 *   {type:"code",   lines:[...], mark:[2,3]}     // mark = מספרי שורות מודגשות (1-based)
 *   {type:"table",  head:[...], rows:[[...]]}
 *   {type:"vars",   items:[{k,v,c}]}             // מצב משתנים
 *   {type:"call",   frames:[{label,c}]}          // מחסנית קריאות רקורסיה
 *   {type:"note",   text:"..."}
 *   {type:"rows",   items:[ <visual>, ... ]}     // כמה ויזואלים בטור
 *
 * תא (cell) הוא ערך פשוט או {v:ערך, c:צבע, t:תווית-מתחת}
 * צבעים: hot (צהוב) · good (ירוק) · bad (אדום) · info (כחול) · dim (מעומעם)
 */
(function () {
  "use strict";

  function esc(v) {
    return String(v === null || v === undefined ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function norm(cell) {
    if (cell === null || cell === undefined) return { v: "", empty: true };
    if (typeof cell === "object") return cell;
    return { v: cell };
  }

  function cls(c) { return c ? " v-" + c : ""; }

  function array(spec) {
    var base = spec.base === undefined ? 0 : spec.base;
    var cells = (spec.cells || []).map(norm);
    var idx = cells.map(function (_, i) {
      return '<span class="v-ix">' + (base + i) + "</span>";
    }).join("");
    var row = cells.map(function (c) {
      return '<div class="v-cell' + cls(c.c) + (c.empty ? " v-empty" : "") + '">' +
        esc(c.v) + "</div>";
    }).join("");
    var labels = cells.some(function (c) { return c.t; })
      ? '<div class="v-labels">' + cells.map(function (c) {
          return "<span>" + esc(c.t || "") + "</span>";
        }).join("") + "</div>"
      : "";
    var brace = "";
    if (spec.brace) {
      var span = spec.brace.to - spec.brace.from + 1;
      brace = '<div class="v-brace" style="margin-inline-start:' +
        (spec.brace.from * 46) + "px;width:" + (span * 46 - 6) + 'px">' +
        esc(spec.brace.text || "") + "</div>";
    }
    return '<div class="v-array">' +
      '<div class="v-ixrow">' + idx + "</div>" +
      '<div class="v-row">' + row + "</div>" + labels + brace +
      (spec.caption ? '<div class="v-cap">' + spec.caption + "</div>" : "") + "</div>";
  }

  function stack(spec) {
    var items = (spec.items || []).map(norm).slice().reverse();
    var body = items.map(function (c, i) {
      return '<div class="v-slot' + cls(c.c) + '">' + esc(c.v) +
        (i === 0 ? '<span class="v-tip">← top</span>' : "") + "</div>";
    }).join("");
    return '<div class="v-stack">' + (body || '<div class="v-slot v-empty">ריקה</div>') +
      '<div class="v-base">מחסנית</div></div>';
  }

  function queue(spec) {
    var items = (spec.items || []).map(norm);
    var body = items.map(function (c, i) {
      return '<div class="v-cell' + cls(c.c) + '">' + esc(c.v) +
        (i === 0 ? '<span class="v-tip">head</span>' : "") +
        (i === items.length - 1 ? '<span class="v-tip v-tail">tail</span>' : "") +
        "</div>";
    }).join('<span class="v-arrow">←</span>');
    return '<div class="v-queue"><div class="v-row">' +
      (body || '<div class="v-cell v-empty">ריק</div>') + "</div>" +
      '<div class="v-cap">תור — יוצא מהראש, נכנס לזנב</div></div>';
  }

  function list(spec) {
    var kind = spec.kind || "single";
    var link = kind === "double" ? "⇄" : "→";
    var nodes = (spec.nodes || []).map(norm);
    var body = nodes.map(function (c) {
      return '<div class="v-node' + cls(c.c) + '">' + esc(c.v) + "</div>";
    }).join('<span class="v-link">' + link + "</span>");
    var tail = kind === "circular"
      ? '<span class="v-link">↺</span><span class="v-cap-inline">חזרה לראש</span>'
      : '<span class="v-link">→</span><span class="v-null">NULL</span>';
    return '<div class="v-list"><span class="v-head-tag">head</span>' +
      body + tail + "</div>";
  }

  /* --- עץ בינארי --- */
  function treeLayout(node, depth, out, xref) {
    if (!node) return null;
    var left = treeLayout(node.l, depth + 1, out, xref);
    var me = { v: node.v, c: node.c, x: xref.x++, y: depth, l: left, r: null };
    out.push(me);
    me.r = treeLayout(node.r, depth + 1, out, xref);
    return me;
  }

  function tree(spec) {
    if (!spec.root) return "";
    var nodes = [], xref = { x: 0 };
    treeLayout(spec.root, 0, nodes, xref);
    var GX = 56, GY = 62, R = 19, PAD = 26;
    var maxX = 0, maxY = 0;
    nodes.forEach(function (n) {
      maxX = Math.max(maxX, n.x); maxY = Math.max(maxY, n.y);
    });
    var w = maxX * GX + PAD * 2, h = maxY * GY + PAD * 2;
    function cx(n) { return n.x * GX + PAD; }
    function cy(n) { return n.y * GY + PAD; }
    var edges = "", circles = "";
    nodes.forEach(function (n) {
      [n.l, n.r].forEach(function (kid) {
        if (kid) {
          edges += '<line x1="' + cx(n) + '" y1="' + cy(n) + '" x2="' + cx(kid) +
            '" y2="' + cy(kid) + '" class="v-edge"/>';
        }
      });
    });
    nodes.forEach(function (n) {
      circles += '<g class="v-tnode' + cls(n.c) + '">' +
        '<circle cx="' + cx(n) + '" cy="' + cy(n) + '" r="' + R + '"/>' +
        '<text x="' + cx(n) + '" y="' + (cy(n) + 5) + '">' + esc(n.v) + "</text></g>";
    });
    return '<div class="v-tree"><svg viewBox="0 0 ' + w + " " + h +
      '" width="' + Math.min(w, 640) + '" role="img">' + edges + circles + "</svg>" +
      (spec.caption ? '<div class="v-cap">' + spec.caption + "</div>" : "") + "</div>";
  }

  function code(spec) {
    var mark = spec.mark || [];
    var body = (spec.lines || []).map(function (line, i) {
      var on = mark.indexOf(i + 1) >= 0;
      return '<div class="v-line' + (on ? " v-line-on" : "") + '">' +
        '<span class="v-lineno">' + (i + 1) + "</span>" +
        '<span class="v-linetext">' + esc(line) + "</span></div>";
    }).join("");
    return '<div class="v-code" dir="ltr">' + body + "</div>";
  }

  function table(spec) {
    var head = (spec.head || []).map(function (h) { return "<th>" + h + "</th>"; }).join("");
    var rows = (spec.rows || []).map(function (r) {
      return "<tr>" + r.map(function (c) {
        var n = norm(c);
        return '<td class="' + (n.c ? "v-" + n.c : "") + '">' + esc(n.v) + "</td>";
      }).join("") + "</tr>";
    }).join("");
    return '<div class="v-table"><table>' +
      (head ? "<thead><tr>" + head + "</tr></thead>" : "") +
      "<tbody>" + rows + "</tbody></table></div>";
  }

  function vars(spec) {
    return '<div class="v-vars">' + (spec.items || []).map(function (it) {
      return '<div class="v-var' + cls(it.c) + '"><span class="v-k">' + esc(it.k) +
        '</span><span class="v-v">' + esc(it.v) + "</span></div>";
    }).join("") + "</div>";
  }

  function call(spec) {
    var frames = (spec.frames || []).slice().reverse();
    return '<div class="v-call">' + frames.map(function (f, i) {
      var n = norm(f.label !== undefined ? { v: f.label, c: f.c } : f);
      return '<div class="v-frame' + cls(n.c) + '">' + esc(n.v) +
        (i === 0 ? '<span class="v-tip">← מבצעת עכשיו</span>' : "") + "</div>";
    }).join("") + '<div class="v-base">מחסנית הקריאות</div></div>';
  }

  function note(spec) {
    return '<div class="v-note">' + (spec.text || "") + "</div>";
  }

  /* ============================================================
   * סוגי ויזואל לקורס גלים
   * ------------------------------------------------------------
   * {type:"wave", xmin,xmax, [ymax], [height], curves:[...],
   *   [markers:[{x,label}]], [arrows:[{x,y,dir:"right|left",c,label}]],
   *   [regions:[{from,to,label,c}]], [caption]}
   *
   * צורות עקומה (curve.shape):
   *   sin    {A,k,phi,from,to}    A·sin(kx+phi)
   *   cos    {A,k,phi,from,to}    A·cos(kx+phi)
   *   halfsin{A,from,to}          בליטה אחת: A·sin(π(x-from)/(to-from))
   *   sin2   {A,from,to}          A·sin²(π(x-from)/(to-from))
   *   tri    {A,from,peak,to}     משולש (peak = מקום השיא, ברירת מחדל באמצע)
   *   parab  {A,from,to}          פרבולה: שיא A באמצע, אפס בקצוות
   *   gauss  {A,x0,w}             A·exp(−((x−x0)/w)²)
   *   flat   {y,from,to}          קו ישר
   *   pts    {pts:[[x,y],...]}    פוליליין חופשי
   * לכל עקומה: c (hot/good/bad/info/dim) · label · dash:true
   *
   * {type:"tline", [label], [len], left:"short|open", right:"short|open"}
   * ============================================================ */
  function waveEval(cv, x) {
    var A = cv.A === undefined ? 1 : cv.A;
    switch (cv.shape) {
      case "sin":  return A * Math.sin((cv.k === undefined ? 1 : cv.k) * x + (cv.phi || 0));
      case "cos":  return A * Math.cos((cv.k === undefined ? 1 : cv.k) * x + (cv.phi || 0));
      case "halfsin": return A * Math.sin(Math.PI * (x - cv.from) / (cv.to - cv.from));
      case "sin2": {
        var s = Math.sin(Math.PI * (x - cv.from) / (cv.to - cv.from));
        return A * s * s;
      }
      case "tri": {
        var p = cv.peak === undefined ? (cv.from + cv.to) / 2 : cv.peak;
        return x <= p
          ? A * (x - cv.from) / Math.max(1e-9, p - cv.from)
          : A * (cv.to - x) / Math.max(1e-9, cv.to - p);
      }
      case "parab": {
        var w2 = cv.to - cv.from;
        return A * 4 * (x - cv.from) * (cv.to - x) / (w2 * w2);
      }
      case "gauss": {
        var t = (x - (cv.x0 || 0)) / (cv.w || 1);
        return A * Math.exp(-t * t);
      }
      case "flat": return cv.y || 0;
      default: return 0;
    }
  }

  function wave(spec) {
    var W = spec.width || 560, H = spec.height || 210;
    var PADL = 34, PADR = 14, PADT = 20, PADB = 24;
    var xmin = spec.xmin, xmax = spec.xmax;
    var curves = spec.curves || [];

    /* טווח y */
    var ymax = spec.ymax;
    if (ymax === undefined) {
      ymax = 0;
      curves.forEach(function (cv) {
        if (cv.shape === "pts") (cv.pts || []).forEach(function (p) {
          ymax = Math.max(ymax, Math.abs(p[1]));
        });
        else if (cv.shape === "flat") ymax = Math.max(ymax, Math.abs(cv.y || 0));
        else ymax = Math.max(ymax, Math.abs(cv.A === undefined ? 1 : cv.A));
      });
      (spec.arrows || []).forEach(function (a) { ymax = Math.max(ymax, Math.abs(a.y || 0)); });
      ymax = ymax * 1.15 || 1;
    }
    var ymin = spec.ymin === undefined ? -ymax : spec.ymin;

    function X(x) { return PADL + (x - xmin) / (xmax - xmin) * (W - PADL - PADR); }
    function Y(y) { return PADT + (ymax - y) / (ymax - ymin) * (H - PADT - PADB); }

    var out = "";

    /* תחומים מוצללים (שני תווכים) */
    (spec.regions || []).forEach(function (r) {
      out += '<rect class="vw-region ' + (r.c ? "vwr-" + r.c : "") + '" x="' + X(r.from) +
        '" y="' + PADT + '" width="' + (X(r.to) - X(r.from)) + '" height="' + (H - PADT - PADB) + '"/>';
      if (r.label) out += '<text class="vw-rlabel" x="' + ((X(r.from) + X(r.to)) / 2) +
        '" y="' + (PADT + 14) + '">' + esc(r.label) + "</text>";
    });

    /* צירים */
    var y0 = Y(0);
    out += '<line class="vw-axis" x1="' + PADL + '" y1="' + y0 + '" x2="' + (W - PADR) + '" y2="' + y0 + '"/>';
    if (xmin <= 0 && xmax >= 0)
      out += '<line class="vw-axis vw-yaxis" x1="' + X(0) + '" y1="' + PADT + '" x2="' + X(0) + '" y2="' + (H - PADB) + '"/>';

    /* שנתות x */
    var span = xmax - xmin;
    var step = Math.pow(10, Math.floor(Math.log10(span / 6)));
    if (span / step > 12) step *= 5; else if (span / step > 6) step *= 2;
    for (var tx = Math.ceil(xmin / step) * step; tx <= xmax + 1e-9; tx += step) {
      var lbl = Math.abs(tx) < 1e-9 ? 0 : +tx.toFixed(6);
      out += '<line class="vw-tick" x1="' + X(tx) + '" y1="' + (y0 - 3) + '" x2="' + X(tx) + '" y2="' + (y0 + 3) + '"/>' +
        '<text class="vw-tlabel" x="' + X(tx) + '" y="' + (y0 + 15) + '">' + lbl + "</text>";
    }
    /* תווית ymax */
    var yref = spec.ymax !== undefined ? spec.ymax : ymax / 1.15;
    out += '<text class="vw-tlabel vw-ylabel" x="' + (PADL - 5) + '" y="' + (Y(yref) + 4) + '">' +
      (+yref.toFixed(3)) + "</text>";

    /* עקומות */
    var legends = [];
    curves.forEach(function (cv) {
      var cls2 = "vw-curve " + (cv.c ? "vwc-" + cv.c : "vwc-info") + (cv.dash ? " vw-dash" : "");
      var d = "";
      if (cv.shape === "pts") {
        (cv.pts || []).forEach(function (p, i) {
          d += (i ? "L" : "M") + X(p[0]).toFixed(1) + " " + Y(p[1]).toFixed(1);
        });
      } else {
        var a = cv.from === undefined ? xmin : cv.from;
        var b = cv.to === undefined ? xmax : cv.to;
        var N = 160;
        for (var i = 0; i <= N; i++) {
          var x = a + (b - a) * i / N;
          d += (i ? "L" : "M") + X(x).toFixed(1) + " " + Y(waveEval(cv, x)).toFixed(1);
        }
      }
      out += '<path class="' + cls2 + '" d="' + d + '"/>';
      if (cv.label) legends.push({ label: cv.label, c: cv.c || "info", dash: cv.dash });
    });

    /* קווי סימון אנכיים */
    (spec.markers || []).forEach(function (m) {
      out += '<line class="vw-marker" x1="' + X(m.x) + '" y1="' + PADT + '" x2="' + X(m.x) + '" y2="' + (H - PADB) + '"/>';
      if (m.label) out += '<text class="vw-mlabel" x="' + X(m.x) + '" y="' + (PADT - 6) + '">' + esc(m.label) + "</text>";
    });

    /* חיצי כיוון */
    (spec.arrows || []).forEach(function (a) {
      var ax = X(a.x), ay = Y(a.y || 0), len = 34, s = a.dir === "left" ? -1 : 1;
      out += '<g class="vw-arrow ' + (a.c ? "vwc-" + a.c : "vwc-info") + '">' +
        '<line x1="' + ax + '" y1="' + ay + '" x2="' + (ax + s * len) + '" y2="' + ay + '"/>' +
        '<path d="M' + (ax + s * len) + " " + ay + " l" + (-s * 7) + ' -4 v8 z"/>' +
        (a.label ? '<text x="' + (ax + s * len / 2) + '" y="' + (ay - 7) + '">' + esc(a.label) + "</text>" : "") +
        "</g>";
    });

    var legendHtml = legends.length
      ? '<div class="vw-legend">' + legends.map(function (l) {
          return '<span class="vw-leg"><i class="vwl-' + l.c + (l.dash ? " vw-dash" : "") + '"></i>' +
            esc(l.label) + "</span>";
        }).join("") + "</div>"
      : "";

    return '<div class="v-wave"><svg viewBox="0 0 ' + W + " " + H + '" role="img">' + out + "</svg>" +
      legendHtml +
      (spec.caption ? '<div class="v-cap">' + spec.caption + "</div>" : "") + "</div>";
  }

  function tline(spec) {
    var W = 380, H = 90, PAD = 30, yTop = 30, yBot = 62;
    var out = '<line class="vw-rail" x1="' + PAD + '" y1="' + yTop + '" x2="' + (W - PAD) + '" y2="' + yTop + '"/>' +
              '<line class="vw-rail" x1="' + PAD + '" y1="' + yBot + '" x2="' + (W - PAD) + '" y2="' + yBot + '"/>';
    function end(x, kind) {
      if (kind === "short")
        return '<line class="vw-rail vw-short" x1="' + x + '" y1="' + (yTop - 4) + '" x2="' + x + '" y2="' + (yBot + 4) + '"/>';
      return '<circle class="vw-open" cx="' + x + '" cy="' + yTop + '" r="4"/>' +
             '<circle class="vw-open" cx="' + x + '" cy="' + yBot + '" r="4"/>';
    }
    out += end(PAD, spec.left || "open") + end(W - PAD, spec.right || "open");
    if (spec.len) out += '<text class="vw-tlabel" x="' + (W / 2) + '" y="' + (H - 6) + '">' + esc(spec.len) + "</text>";
    if (spec.label) out += '<text class="vw-mlabel" x="' + (W / 2) + '" y="' + 16 + '">' + esc(spec.label) + "</text>";
    return '<div class="v-wave v-tline"><svg viewBox="0 0 ' + W + " " + H + '" role="img">' + out + "</svg>" +
      (spec.caption ? '<div class="v-cap">' + spec.caption + "</div>" : "") + "</div>";
  }

  var RENDERERS = {
    array: array, stack: stack, queue: queue, list: list, tree: tree,
    code: code, table: table, vars: vars, call: call, note: note,
    wave: wave, tline: tline
  };

  /* ---- נגן שלבים גנרי ----
   * משמש גם את פתרונות המבחנים וגם פתרונות מונפשים של שאלות המאגר.
   * המצב נשמר ב-window.__stepAt כדי שכל צרכן לא ינהל מצב משלו.
   */
  window.__stepAt = {};

  window.stepperIndex = function (id, total) {
    var at = Number(window.__stepAt[id]) || 0;
    return Math.max(0, Math.min(Math.max(0, total - 1), at));
  };

  window.renderStepper = function (id, steps, opts) {
    steps = steps || [];
    if (!steps.length) return "";
    opts = opts || {};
    var i = window.stepperIndex(id, steps.length);
    var s = steps[i];
    var visual = s.visual ? window.renderViz(s.visual) : "";
    var dots = steps.map(function (_, k) {
      return '<button class="solution-dot' + (k === i ? " on" : "") +
        '" data-step-jump="' + k + '" data-step-id="' + id +
        '" aria-label="שלב ' + (k + 1) + '"></button>';
    }).join("");

    return '<div class="stepper" data-stepper="' + id + '">' +
      (opts.title ? '<div class="stepper-title">' + opts.title + "</div>" : "") +
      '<div class="wt-stage"><div class="solution-step">' +
      '<span class="solution-step-number">שלב ' + (i + 1) + " מתוך " + steps.length + "</span>" +
      "<h4>" + (s.title || "") + "</h4><p>" + (s.text || "") + "</p>" +
      (s.formula ? '<div class="solution-equation" dir="ltr">' + esc(s.formula) + "</div>" : "") +
      (visual ? '<div class="wt-visual">' + visual + "</div>" : "") +
      "</div></div>" +
      '<div class="solution-controls">' +
      '<button class="quiz-btn" data-step-act="prev" data-step-id="' + id + '"' +
      (i === 0 ? " disabled" : "") + ">← הקודם</button>" +
      '<div class="solution-dots">' + dots + "</div>" +
      '<button class="quiz-btn" data-step-act="auto" data-step-id="' + id + '">▶ הרץ</button>' +
      '<button class="quiz-btn primary" data-step-act="next" data-step-id="' + id + '"' +
      (i === steps.length - 1 ? " disabled" : "") + ">הבא →</button></div></div>";
  };

  /* מטפל לחיצות אחד לכל הדף — כל נגן שלבים עונה לו */
  var autoTimer = null;
  function stopAuto() {
    if (autoTimer) window.clearInterval(autoTimer);
    autoTimer = null;
  }

  document.addEventListener("click", function (event) {
    var el = event.target.closest("[data-step-jump],[data-step-act]");
    if (!el) return;
    var id = el.getAttribute("data-step-id");
    var host = document.querySelector('[data-stepper="' + id + '"]');
    if (!host) return;
    var total = host.querySelectorAll("[data-step-jump]").length;

    function repaint() {
      if (typeof window.__stepperRepaint === "function") window.__stepperRepaint(id);
    }

    if (el.hasAttribute("data-step-jump")) {
      stopAuto();
      window.__stepAt[id] = Number(el.getAttribute("data-step-jump"));
      repaint(); return;
    }
    var act = el.getAttribute("data-step-act");
    if (act === "prev" || act === "next") {
      stopAuto();
      window.__stepAt[id] = window.stepperIndex(id, total) + (act === "next" ? 1 : -1);
      repaint(); return;
    }
    if (act === "auto") {
      if (autoTimer) { stopAuto(); return; }
      if (window.stepperIndex(id, total) === total - 1) window.__stepAt[id] = 0;
      repaint();
      autoTimer = window.setInterval(function () {
        var at = window.stepperIndex(id, total);
        if (at >= total - 1) { stopAuto(); return; }
        window.__stepAt[id] = at + 1;
        repaint();
      }, 2600);
    }
  });

  window.renderViz = function renderViz(spec) {
    if (!spec) return "";
    if (Array.isArray(spec)) return spec.map(window.renderViz).join("");
    if (spec.type === "rows") {
      return '<div class="v-rows">' +
        (spec.items || []).map(window.renderViz).join("") + "</div>";
    }
    var fn = RENDERERS[spec.type];
    return fn ? fn(spec) : "";
  };
})();
