/* סימולטור מבחן מלא — 8 שאלות לפי משבצות המבחן האמיתי, 180 דקות, ציון ופתרונות מלאים */
(function () {
  "use strict";

  var KEY = ((window.COURSE && window.COURSE.storagePrefix) || "course-") + "exam-sim-v1";
  var DURATION_MIN = (window.COURSE && window.COURSE.examMinutes) || 180;

  /* משבצות המבחן — מוגדרות ב-config.js לפי מפת המבחן של הקורס. */
  var SLOTS = (window.COURSE && window.COURSE.examSlots) || [];

  var root = document.getElementById("simulator");
  var trainer = document.getElementById("trainerParts");
  var btnTrainer = document.getElementById("modeTrainer");
  var btnSim = document.getElementById("modeSim");
  if (!root || !trainer || !btnTrainer || !btnSim) return;

  var data = window.CODEX_COMPLEXITY_DATA;
  if (!data || !Array.isArray(data.qs)) return;
  var questions = data.qs;
  var byId = {};
  questions.forEach(function (q) { byId[String(q.id || q.n)] = q; });

  var state = load();
  var timerHandle = null;
  var position = 0;

  function load() {
    try {
      var parsed = JSON.parse(localStorage.getItem(KEY) || "");
      if (parsed && Array.isArray(parsed.picked) && parsed.picked.length) return parsed;
    } catch (e) {}
    return null;
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }

  function escapeCode(value) {
    return String(value || "")
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function pickExam() {
    return SLOTS.map(function (slot) {
      var pool = questions.filter(function (q) {
        return slot.cats.indexOf(q.cat) >= 0;
      });
      /* עדיפות לשאלות ברמת מבחן: מהמאגר הפתוח או ממבחני 2023–2025 */
      var strong = pool.filter(function (q) {
        return q.origin === "bank" || q.origin === "recent" || q.origin === "official";
      });
      var source = strong.length ? strong : pool;
      var q = source[Math.floor(Math.random() * source.length)];
      return q ? String(q.id || q.n) : null;
    }).filter(Boolean);
  }

  function startExam() {
    state = {
      picked: pickExam(),
      answers: {},
      checked: {},
      startedAt: Date.now(),
      finished: false
    };
    position = 0;
    save();
    render();
  }

  function remainingMs() {
    return Math.max(0, DURATION_MIN * 60000 - (Date.now() - state.startedAt));
  }

  function fmtTime(ms) {
    var total = Math.floor(ms / 1000);
    var h = Math.floor(total / 3600);
    var m = Math.floor((total % 3600) / 60);
    var s = total % 60;
    function pad(v) { return String(v).padStart(2, "0"); }
    return pad(h) + ":" + pad(m) + ":" + pad(s);
  }

  function stopTimer() {
    if (timerHandle) window.clearInterval(timerHandle);
    timerHandle = null;
  }

  function startTimer() {
    stopTimer();
    timerHandle = window.setInterval(function () {
      var label = root.querySelector("#simClock");
      if (!label) { stopTimer(); return; }
      var left = remainingMs();
      label.textContent = fmtTime(left);
      label.classList.toggle("danger", left < 15 * 60000);
      if (left <= 0 && state && !state.finished) submitExam(true);
    }, 1000);
  }

  function isEngaged(id) {
    return !!(state.answers[id] || (state.checked && state.checked[id]));
  }

  function answeredCount() {
    return state.picked.filter(isEngaged).length;
  }

  function submitExam(auto) {
    var open = state.picked.length - answeredCount();
    if (!auto && open > 0 &&
        !window.confirm("נשארו " + open + " שאלות ללא מענה. להגיש בכל זאת?")) return;
    state.finished = true;
    state.finishedAt = Date.now();
    save();
    stopTimer();
    render();
  }

  function grade() {
    var right = 0, wrong = 0, skipped = 0, pendingSelf = 0;
    state.picked.forEach(function (id) {
      var q = byId[id];
      var a = state.answers[id];
      if (!a) { skipped++; return; }
      if (q.kind === "open") {
        if (a.self === true) right++;
        else if (a.self === false) wrong++;
        else pendingSelf++;
      } else {
        if (a.choice === q.ans) right++; else wrong++;
      }
    });
    return { right: right, wrong: wrong, skipped: skipped, pendingSelf: pendingSelf };
  }

  function stepsHtml(q) {
    if (!q.examSolution) return "";
    var s = q.examSolution;
    return '<div class="sim-steps"><b>' + s.title + " — הפתרון בשלבים:</b>" +
      s.steps.map(function (step, i) {
        return '<div class="solution-step"><span class="solution-step-number">שלב ' +
          (i + 1) + "</span><h4>" + step.title + "</h4><p>" + step.text + "</p>" +
          (step.formula ? '<div class="solution-equation" dir="ltr">' +
            escapeCode(step.formula) + "</div>" : "") + "</div>";
      }).join("") + "</div>";
  }

  /* השאלה תמיד למעלה, הקוד מתחתיה, והפתרון רק כשמבקשים */
  function questionBody(q, reveal) {
    var head = '<div class="quiz-prompt">' + (q.prompt || q.cat) + "</div>";
    if (q.kind === "open") {
      var parts = window.splitBankCard(q.html, String(q.id || q.n));
      return head +
        (parts.code ? '<div class="q-given"><b>נתון:</b></div>' + parts.code : "") +
        (parts.rest ? '<div class="q-extra">' + parts.rest + "</div>" : "") +
        (window.codeEditorHtml ? window.codeEditorHtml(q) : "") +
        (reveal ? '<div class="q-solution"><b>✅ הפתרון המלא</b>' +
          parts.solution + "</div>" : "");
    }
    return head +
      (q.code ? '<pre class="' + (q.kind === "math" ? "" : "c") + '" dir="ltr">' +
        escapeCode(q.code) + "</pre>" : "");
  }

  function renderRunning() {
    var id = state.picked[position];
    var q = byId[id];
    var a = state.answers[id] || null;
    var slot = SLOTS[position] || { title: "שאלה " + (position + 1) };

    var pills = state.picked.map(function (pid, i) {
      var cls = i === position ? " on" : (isEngaged(pid) ? " done" : "");
      return '<button class="sim-pill' + cls + '" data-sim-jump="' + i + '">' +
        (i + 1) + "</button>";
    }).join("");

    var checked = !!(state.checked && state.checked[id]);
    var answerArea, feedback = "";

    if (q.kind === "open") {
      answerArea = checked ? "" :
        '<div class="sim-open-note">פתור את השאלה במלואה' +
        (q.qtype === "code" ? " — כתוב את הקוד בעורך שלמעלה או על דף" : " על דף") +
        ". כשסיימת, לחץ <b>בדוק</b> כדי לראות את הפתרון המלא.</div>" +
        '<div class="quiz-selfgrade">' +
        '<button class="quiz-option primary-check" data-sim-check><span class="key">🔍</span>' +
        "<span>בדוק — הצג את הפתרון</span></button></div>";
      if (checked) {
        var self = a ? a.self : undefined;
        feedback = self === undefined
          ? '<div class="quiz-selfgrade"><span class="selfgrade-hint">השווה למה שכתבת וסמן:</span>' +
            '<button class="quiz-option" data-sim-self="1" data-sim-q="' + id + '"><span class="key">✔</span><span>פתרתי נכון</span></button>' +
            '<button class="quiz-option" data-sim-self="0" data-sim-q="' + id + '"><span class="key">✘</span><span>טעיתי</span></button></div>'
          : '<div class="quiz-verdict ' + (self ? "good" : "bad") + '">' +
            (self ? "✓ סימנת: פתרתי נכון" : "✗ סימנת: טעיתי — השאלה תחזור אליך בתרגול") + "</div>";
      }
    } else {
      answerArea = '<div class="quiz-options">' + q.opts.map(function (opt, i) {
        var mark = "";
        if (checked) {
          if (i === q.ans) mark = " good";
          else if (a && a.choice === i) mark = " bad";
        } else if (a && a.choice === i) mark = " answer";
        return '<button class="quiz-option' + mark + '" data-sim-choice="' + i + '"' +
          (checked ? " disabled" : "") + ">" +
          '<span class="key">' + (i + 1) + "</span>" +
          "<span" + (opt.ltr ? ' dir="ltr"' : "") + ">" + opt.h + "</span></button>";
      }).join("") + "</div>" +
      (checked ? "" :
        '<div class="quiz-selfgrade"><button class="quiz-option primary-check" data-sim-check>' +
        '<span class="key">🔍</span><span>בדוק את התשובה</span></button></div>');
      if (checked) {
        var right = a && a.choice === q.ans;
        feedback = '<div class="quiz-verdict ' + (right ? "good" : "bad") + '">' +
          (right ? "✓ נכון" : a
            ? "✗ ענית: " + q.opts[a.choice].h + " · הנכונה: " + q.opts[q.ans].h
            : "לא נענתה · הנכונה: " + q.opts[q.ans].h) + "</div>" +
          (q.rule ? '<div class="quiz-rule"><b>כלל:</b> ' + q.rule + "</div>" : "") +
          (q.why ? "<p>" + q.why + "</p>" : "") + stepsHtml(q);
      }
    }

    if (checked) {
      feedback += '<div class="source-proof">' +
        (window.topicLinkFor ? window.topicLinkFor(q) : "") + "</div>";
    }

    root.innerHTML =
      '<div class="sim-bar"><span class="tag exam">סימולציית מבחן · 8 שאלות · 180 דק\'</span>' +
      '<span class="sim-clock" id="simClock">' + fmtTime(remainingMs()) + "</span>" +
      '<span class="sim-progress">' + answeredCount() + "/8 נענו</span>" +
      '<button class="quiz-btn" data-sim-abort>ביטול המבחן</button>' +
      '<button class="quiz-btn primary" data-sim-submit>סיים והצג סיכום</button></div>' +
      '<div class="sim-pills">' + pills + "</div>" +
      '<div class="quiz-shell sim-running"><div class="quiz-head">' +
      '<span class="quiz-index">' + slot.title + "</span>" +
      '<span class="tag">' + q.cat + "</span>" +
      (q.kind === "open" && window.qtypeLabel
        ? '<span class="tag hot">' + window.qtypeLabel(q) + "</span>" : "") +
      (checked ? '<span class="tag exam">נבדקה</span>' : "") +
      "</div><div class=\"quiz-body\">" + questionBody(q, checked) + answerArea +
      feedback + "</div>" +
      '<div class="quiz-nav">' +
      '<button class="quiz-btn" data-sim-nav="prev"' + (position === 0 ? " disabled" : "") + ">הקודמת</button>" +
      '<button class="quiz-btn primary" data-sim-nav="next"' +
      (position === state.picked.length - 1 ? " disabled" : "") + ">" +
      (checked ? "המשך לשאלה הבאה ←" : "הבאה") + "</button>" +
      '<span class="quiz-position">' + (position + 1) + " / " + state.picked.length + "</span></div></div>";
    startTimer();
    highlightCode();
  }

  function renderReview() {
    var g = grade();
    var took = state.finishedAt
      ? Math.round((state.finishedAt - state.startedAt) / 60000) : DURATION_MIN;
    var score = state.picked.length
      ? Math.round(g.right / state.picked.length * 100) : 0;

    var cards = state.picked.map(function (id, i) {
      var q = byId[id];
      var a = state.answers[id] || null;
      var slot = SLOTS[i] || { title: "שאלה " + (i + 1) };
      var verdict, answerReview = "";

      if (q.kind === "open") {
        var self = a ? a.self : undefined;
        verdict = self === true
          ? '<div class="quiz-verdict good">✓ סימנת: פתרתי נכון</div>'
          : self === false
            ? '<div class="quiz-verdict bad">✗ סימנת: טעיתי</div>'
            : '<div class="quiz-verdict">השווה את מה שכתבת על הדף לפתרון בכרטיס, וסמן:</div>' +
              '<div class="quiz-selfgrade">' +
              '<button class="quiz-option" data-sim-self="1" data-sim-q="' + id + '"><span class="key">✔</span><span>פתרתי נכון</span></button>' +
              '<button class="quiz-option" data-sim-self="0" data-sim-q="' + id + '"><span class="key">✘</span><span>טעיתי</span></button></div>';
      } else {
        var correct = a && a.choice === q.ans;
        verdict = !a
          ? '<div class="quiz-verdict bad">לא נענתה · התשובה הנכונה: ' + q.opts[q.ans].h + "</div>"
          : correct
            ? '<div class="quiz-verdict good">✓ נכון</div>'
            : '<div class="quiz-verdict bad">✗ ענית: ' + q.opts[a.choice].h +
              " · הנכונה: " + q.opts[q.ans].h + "</div>";
        answerReview = (q.rule ? '<div class="quiz-rule"><b>כלל:</b> ' + q.rule + "</div>" : "") +
          (q.why ? "<p>" + q.why + "</p>" : "") + stepsHtml(q);
      }

      return '<div class="sim-review-card"><h3>' + slot.title + "</h3>" +
        '<div class="source-proof"><span class="question-source tag">' +
        (q.sourceLabel || "") + "</span>" +
        (window.topicLinkFor ? window.topicLinkFor(q) : "") + "</div>" +
        questionBody(q, true) + verdict + answerReview + "</div>";
    }).join("");

    root.innerHTML =
      '<div class="sim-summary"><h2>תוצאת הסימולציה</h2>' +
      '<div class="quiz-stats">' +
      '<div class="quiz-stat"><b>' + score + "%</b><span>ציון</span></div>" +
      '<div class="quiz-stat"><b>' + g.right + "/8</b><span>נכונות</span></div>" +
      '<div class="quiz-stat"><b>' + g.skipped + "</b><span>לא נענו</span></div>" +
      '<div class="quiz-stat"><b>' + took + " דק'</b><span>משך</span></div></div>" +
      (g.pendingSelf ? '<div class="warn" style="margin-top:10px"><b>' + g.pendingSelf +
        " שאלות פתוחות ממתינות לסימון עצמי</b> — השווה לפתרון וסמן כדי לקבל ציון סופי.</div>" : "") +
      '<div class="sim-actions"><button class="quiz-btn primary" data-sim-new>מבחן חדש</button>' +
      '<button class="quiz-btn" data-sim-exit>חזרה לתרגול החופשי</button></div></div>' +
      cards;
    highlightCode();
  }

  function renderIdle() {
    root.innerHTML =
      '<div class="sim-intro"><h2>⏱️ סימולטור מבחן מלא</h2>' +
      "<p>8 שאלות — אחת מכל משבצת של המבחן האמיתי (סיבוכיות, רקורסיה, רשימות, עצים, " +
      "מחסנית ותור, ערימה, ערבול, מיונים) — עם שעון של 180 דקות, בדיוק כמו במבחן.</p>" +
      "<ul><li><b>בדיקה אחרי כל שאלה:</b> פתרת? לחץ “בדוק” וקבל מיד את הפתרון המלא, " +
      "ואז המשך הלאה. לא צריך לחכות לסוף המבחן.</li>" +
      "<li>שאלות כתיבת קוד נפתחות עם עורך שאפשר להקליד בו את המימוש (הטיוטה נשמרת).</li>" +
      "<li>בסיום: ציון, פתרון מלא לכל שאלה, וקישור להרחבה על כל נושא שלא ישבת עליו.</li></ul>" +
      '<button class="quiz-btn primary big" data-sim-start>התחל מבחן (180 דק\')</button></div>';
  }

  function highlightCode() {
    var pre = root.querySelector("pre.c");
    if (!pre || pre.querySelector(".kw")) return;
    var keywords = /\b(int|char|void|return|if|else|while|for|struct|typedef|sizeof|NULL|do|long|double|float|unsigned)\b/g;
    pre.innerHTML = escapeCode(pre.textContent).replace(keywords, '<span class="kw">$1</span>');
  }

  function render() {
    if (!state) renderIdle();
    else if (state.finished) renderReview();
    else renderRunning();
  }

  /* מתג בין שלושת המצבים: תרגול חופשי · סימולטור · פתרונות מונפשים */
  var MODES = ["trainer", "sim", "walk", "labs"];
  var buttons = { trainer: btnTrainer, sim: btnSim,
                  walk: document.getElementById("modeWalk"),
                  labs: document.getElementById("modeLabs") };

  function show(mode) {
    if (typeof mode === "boolean") mode = mode ? "sim" : "trainer";
    if (MODES.indexOf(mode) < 0) mode = "trainer";
    trainer.style.display = mode === "trainer" ? "" : "none";
    root.style.display = mode === "sim" ? "" : "none";
    if (window.showWalkthroughs) window.showWalkthroughs(mode === "walk");
    if (window.showLabs) window.showLabs(mode === "labs");
    MODES.forEach(function (m) {
      var b = buttons[m];
      if (!b) return;
      b.classList.toggle("on", m === mode);
      b.classList.toggle("primary", m === mode);
    });
    if (mode === "sim") render(); else stopTimer();
  }

  window.setPracticeMode = show;
  MODES.forEach(function (m) {
    if (buttons[m]) buttons[m].addEventListener("click", function () { show(m); });
  });

  root.addEventListener("click", function (event) {
    var t = event.target;
    if (t.closest("[data-sim-start]") || t.closest("[data-sim-new]")) { startExam(); return; }
    if (t.closest("[data-sim-exit]")) { show("trainer"); return; }
    if (t.closest("[data-sim-abort]")) {
      if (window.confirm("לבטל את המבחן הנוכחי? ההתקדמות תימחק.")) {
        state = null; stopTimer();
        try { localStorage.removeItem(KEY); } catch (e) {}
        render();
      }
      return;
    }
    if (t.closest("[data-sim-submit]")) { submitExam(false); return; }
    var jump = t.closest("[data-sim-jump]");
    if (jump) { position = Number(jump.getAttribute("data-sim-jump")); renderRunning(); return; }
    var nav = t.closest("[data-sim-nav]");
    if (nav) {
      position += nav.getAttribute("data-sim-nav") === "next" ? 1 : -1;
      position = Math.max(0, Math.min(state.picked.length - 1, position));
      renderRunning(); return;
    }
    var choice = t.closest("[data-sim-choice]");
    if (choice && state && !state.finished) {
      var id = state.picked[position];
      state.answers[id] = { choice: Number(choice.getAttribute("data-sim-choice")) };
      save(); renderRunning(); return;
    }
    if (t.closest("[data-sim-check]") && state && !state.finished) {
      state.checked = state.checked || {};
      state.checked[state.picked[position]] = true;
      save(); renderRunning(); return;
    }
    var self = t.closest("[data-sim-self]");
    if (self && state) {
      var sid = self.getAttribute("data-sim-q");
      state.answers[sid] = state.answers[sid] || {};
      state.answers[sid].self = self.getAttribute("data-sim-self") === "1";
      save();
      if (state.finished) renderReview(); else renderRunning();
      return;
    }
  });

  root.addEventListener("input", function (event) {
    var box = event.target.closest("[data-code-for]");
    if (box && window.codeDraft) {
      window.codeDraft(box.getAttribute("data-code-for"), box.value);
    }
  });

  /* מבחן פתוח באמצע? חזור אליו אוטומטית */
  show(state && !state.finished ? "sim" : "trainer");
})();
