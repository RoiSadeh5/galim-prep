/* תצוגת פתרונות מבחן מונפשים — צורכת את window.EXAM_WALKTHROUGHS
 * שני מסכים: בחירת מבחן (רשת כרטיסים לפי שנה) ואז המבחן עצמו.
 */
(function () {
  "use strict";

  var root = document.getElementById("walkthroughs");
  var btn = document.getElementById("modeWalk");
  if (!root || !btn) return;

  var DATA = window.EXAM_WALKTHROUGHS || {};
  var examKeys = Object.keys(DATA).sort().reverse();
  var current = null;          /* null = מסך בחירת מבחן */
  var openQ = 0;
  var stepAt = {};
  var timer = null;

  function esc(v) {
    return String(v === null || v === undefined ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function highlight(codeText) {
    var kw = /\b(int|char|void|return|if|else|while|for|struct|typedef|sizeof|NULL|do|long|double|float|unsigned|BOOL|TRUE|FALSE)\b/g;
    return esc(codeText).replace(kw, '<span class="kw">$1</span>');
  }

  /* תווית אחידה לכל המבחנים, בלי תלות באיך נוסח ה-label במקור */
  function termName(term) {
    if (term === "X" || term === "A") return "מועד א׳";
    if (term === "Y" || term === "B") return "מועד ב׳";
    return term || "";
  }

  function stats(key) {
    var steps = 0;
    DATA[key].questions.forEach(function (q) { steps += (q.steps || []).length; });
    return { questions: DATA[key].questions.length, steps: steps };
  }

  function questions() {
    return (current && DATA[current] && DATA[current].questions) || [];
  }

  function stepIndex(q) {
    var total = (q.steps || []).length;
    var at = Number(stepAt[q.id]) || 0;
    return Math.max(0, Math.min(Math.max(0, total - 1), at));
  }

  function stopAuto() {
    if (timer) window.clearInterval(timer);
    timer = null;
  }

  /* ============ מסך 1 · בחירת מבחן ============ */

  function pickerHtml() {
    var byYear = {};
    examKeys.forEach(function (k) {
      var y = DATA[k].year || 0;
      (byYear[y] = byYear[y] || []).push(k);
    });
    var years = Object.keys(byYear).sort().reverse();

    var rows = years.map(function (y, yi) {
      var cards = byYear[y].sort().map(function (k) {
        var s = stats(k);
        return '<button class="exam-card' + (yi === 0 ? " newest" : "") +
          '" data-wt-exam="' + k + '">' +
          '<span class="exam-term">' + termName(DATA[k].term) + "</span>" +
          '<span class="exam-meta">' + s.questions + " שאלות · " +
          s.steps + " שלבים</span>" +
          (yi === 0 ? '<span class="exam-flag">הכי דומה למבחן שלך</span>' : "") +
          '<span class="exam-go">פתח את הפתרון המלא ←</span></button>';
      }).join("");
      return '<div class="exam-year-row"><div class="exam-year-tag">' + y +
        '</div><div class="exam-cards">' + cards + "</div></div>";
    }).join("");

    var totalQ = 0, totalS = 0;
    examKeys.forEach(function (k) {
      var s = stats(k); totalQ += s.questions; totalS += s.steps;
    });

    return '<div class="wt-intro"><h2>📚 פתרונות מבחן מונפשים</h2>' +
      "<p><b>בחר מבחן</b> — וייפתח הפתרון המלא של כל שאלה בו, מפורק לשלבים " +
      "קטנים עם הנפשה של מה שקורה בקוד ובמבנה הנתונים.<br>" +
      "סה\"כ " + examKeys.length + " שאלונים · " + totalQ + " שאלות · " +
      totalS + " שלבים.</p></div>" +
      '<div class="exam-picker">' + rows + "</div>";
  }

  /* ============ מסך 2 · המבחן שנבחר ============ */

  function stepHtml(q) {
    var steps = q.steps || [];
    if (!steps.length) return "";
    var i = stepIndex(q);
    var s = steps[i];
    var visual = (window.renderViz && s.visual) ? window.renderViz(s.visual) : "";
    var dots = steps.map(function (_, k) {
      return '<button class="solution-dot' + (k === i ? " on" : "") +
        '" data-wt-jump="' + k + '" aria-label="שלב ' + (k + 1) + '"></button>';
    }).join("");

    return '<div class="wt-stage">' +
      '<div class="solution-step"><span class="solution-step-number">שלב ' +
      (i + 1) + " מתוך " + steps.length + "</span>" +
      "<h4>" + s.title + "</h4><p>" + s.text + "</p>" +
      (s.formula ? '<div class="solution-equation" dir="ltr">' +
        esc(s.formula) + "</div>" : "") +
      (visual ? '<div class="wt-visual">' + visual + "</div>" : "") +
      "</div></div>" +
      '<div class="solution-controls">' +
      '<button class="quiz-btn" data-wt-act="prev"' + (i === 0 ? " disabled" : "") +
      ">← השלב הקודם</button>" +
      '<div class="solution-dots">' + dots + "</div>" +
      '<button class="quiz-btn" data-wt-act="auto">' +
      (timer ? "⏸ עצור" : "▶ הרץ אוטומטית") + "</button>" +
      '<button class="quiz-btn primary" data-wt-act="next"' +
      (i === steps.length - 1 ? " disabled" : "") + ">השלב הבא →</button></div>";
  }

  function questionHtml(q, index) {
    var open = index === openQ;
    var head = '<button class="wt-head" data-wt-open="' + (open ? -1 : index) + '">' +
      '<span class="wt-num">' + q.num + "</span>" +
      '<span class="wt-topic">' + q.topic + "</span>" +
      (q.points ? '<span class="tag">' + q.points + " נק'</span>" : "") +
      '<span class="wt-steps">' + (open ? "▲ סגור" :
        (q.steps || []).length + " שלבים") + "</span></button>";

    if (!open) return '<div class="wt-card">' + head + "</div>";

    return '<div class="wt-card open">' + head +
      '<div class="wt-body">' +
      '<div class="quiz-prompt">' + q.prompt + "</div>" +
      (q.code ? '<div class="q-given"><b>נתון:</b></div><pre class="c" dir="ltr">' +
        highlight(q.code) + "</pre>" : "") +
      (q.idea ? '<div class="wt-idea"><b>💡 רעיון הפתרון:</b> ' + q.idea + "</div>" : "") +
      ((q.formulas || []).length
        ? '<div class="formula-title">הנוסחאות שצריך לשאלה</div><div class="formula-strip">' +
          q.formulas.map(function (f) {
            return '<div class="formula-card"><small>' + f.label +
              '</small><div dir="ltr">' + esc(f.value) + "</div></div>";
          }).join("") + "</div>"
        : "") +
      stepHtml(q) +
      (q.answer ? '<div class="wt-answer"><b>✅ התשובה הסופית:</b> ' + q.answer + "</div>" : "") +
      ((q.traps || []).length
        ? '<div class="wt-traps"><b>⚠️ מלכודות:</b><ul>' +
          q.traps.map(function (t) { return "<li>" + t + "</li>"; }).join("") + "</ul></div>"
        : "") +
      (window.topicLinkFor
        ? '<div class="source-proof">' + window.topicLinkFor({ cat: q.topic }) + "</div>"
        : "") +
      "</div></div>";
  }

  function examHtml() {
    var e = DATA[current];
    var s = stats(current);
    var qs = questions();

    var siblings = examKeys.filter(function (k) {
      return DATA[k].year === e.year && k !== current;
    }).map(function (k) {
      return '<button class="quiz-btn" data-wt-exam="' + k + '">' +
        "עבור ל" + termName(DATA[k].term) + " ←</button>";
    }).join("");

    return '<div class="exam-head">' +
      '<button class="quiz-btn back" data-wt-back>← כל המבחנים</button>' +
      '<div class="exam-head-title"><h2>מבחן ' + e.year + " · " +
      termName(e.term) + "</h2>" +
      "<span>" + s.questions + " שאלות · " + s.steps + " שלבים מונפשים</span></div>" +
      (siblings ? '<div class="exam-siblings">' + siblings + "</div>" : "") +
      "</div>" +
      '<div class="wt-list">' +
      (qs.length ? qs.map(questionHtml).join("")
        : '<div class="quiz-empty">אין עדיין שאלות למבחן הזה.</div>') +
      "</div>";
  }

  function render() {
    if (!examKeys.length) {
      root.innerHTML = '<div class="quiz-empty"><b>הפתרונות המונפשים בהכנה.</b></div>';
      return;
    }
    root.innerHTML = current ? examHtml() : pickerHtml();
  }

  function move(delta) {
    var q = questions()[openQ];
    if (!q) return;
    var steps = (q.steps || []).length;
    stepAt[q.id] = Math.max(0, Math.min(steps - 1, stepIndex(q) + delta));
    render();
  }

  root.addEventListener("click", function (event) {
    var tab = event.target.closest("[data-wt-exam]");
    if (tab) {
      stopAuto();
      current = tab.getAttribute("data-wt-exam");
      openQ = 0;
      render();
      root.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (event.target.closest("[data-wt-back]")) {
      stopAuto();
      current = null;
      render();
      root.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    var head = event.target.closest("[data-wt-open]");
    if (head) {
      stopAuto();
      openQ = Number(head.getAttribute("data-wt-open"));
      render();
      return;
    }
    var jump = event.target.closest("[data-wt-jump]");
    if (jump) {
      stopAuto();
      var qj = questions()[openQ];
      if (qj) stepAt[qj.id] = Number(jump.getAttribute("data-wt-jump"));
      render();
      return;
    }
    var act = event.target.closest("[data-wt-act]");
    if (!act) return;
    var name = act.getAttribute("data-wt-act");
    if (name === "prev") { stopAuto(); move(-1); return; }
    if (name === "next") { stopAuto(); move(1); return; }
    if (name === "auto") {
      if (timer) { stopAuto(); render(); return; }
      var q = questions()[openQ];
      if (!q) return;
      if (stepIndex(q) === (q.steps || []).length - 1) stepAt[q.id] = 0;
      timer = window.setInterval(function () {
        var cur = questions()[openQ];
        if (!cur || stepIndex(cur) >= (cur.steps || []).length - 1) {
          stopAuto(); render(); return;
        }
        move(1);
      }, 2600);
      render();
    }
  });

  window.showWalkthroughs = function (on) {
    root.style.display = on ? "" : "none";
    if (on) render(); else stopAuto();
  };

  render();
})();
