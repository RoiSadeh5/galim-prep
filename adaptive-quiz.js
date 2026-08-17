/* Adaptive quiz engine: local, private to this browser, and safe to use offline. */
(function () {
  "use strict";

  /* קידומת מפתחות ה-localStorage — כדי ששני קורסים לא ידרסו זה את זה */
  var KEY_PREFIX = (window.COURSE && window.COURSE.storagePrefix) || "course-";

  var data = window.CODEX_COMPLEXITY_DATA;
  var additions = window.CODEX_ADAPTIVE_QUESTIONS || [];
  var bankQuestions = window.BANK_OPEN_QUESTIONS || [];
  var examSolutions = window.CODEX_EXAM_SOLUTIONS || {};
  if (!data || !Array.isArray(data.qs)) return;

  /* מיפוי קטגוריה ⟵ עמוד הנושא. מוגדר ב-config.js — אל תערוך כאן. */
  var TOPIC_PAGES = (window.COURSE && window.COURSE.topicPages) || {};

  window.topicLinkFor = function (question) {
    var entry = TOPIC_PAGES[question.cat];
    if (!entry) return "";
    return '<a class="topic-link" href="#' + entry[0] +
      '">📖 לא בטוח בחומר? הרחבה: ' + entry[1] + "</a>";
  };

  /* ---- פירוק כרטיס מהמאגר לחלקיו: קוד, פתרון, ושאר התוכן ----
   * כרטיסי המאגר הגיעו כ-HTML אחד שמכיל כותרת, קוד ופתרון מקופל.
   * כדי להציג "קודם השאלה, אחר כך הקוד" צריך להפריד ביניהם.
   */
  var splitCache = {};

  window.splitBankCard = function (html, cacheKey) {
    if (cacheKey && splitCache[cacheKey]) return splitCache[cacheKey];
    var host = document.createElement("div");
    host.innerHTML = html || "";
    /* הכותרת הפנימית מיותרת — כותרת השאלה מוצגת בנפרד */
    var qh = host.querySelector(".qh");
    if (qh) qh.remove();
    var solutionEl = host.querySelector("details.sol");
    var solution = "";
    if (solutionEl) {
      var body = solutionEl.querySelector(".body");
      solution = body ? body.innerHTML : solutionEl.innerHTML;
      solutionEl.remove();
    }
    var codeParts = [];
    [].slice.call(host.querySelectorAll("pre")).forEach(function (pre) {
      codeParts.push(pre.outerHTML);
      pre.remove();
    });
    var result = {
      code: codeParts.join(""),
      solution: solution,
      rest: host.innerHTML.trim()
    };
    if (cacheKey) splitCache[cacheKey] = result;
    return result;
  };

  var QTYPE_LABELS = {
    code: "✍️ כתיבת קוד",
    trace: "🔍 מעקב אחרי ריצה",
    analysis: "📐 ניתוח והוכחה",
    design: "🏗️ עיצוב מבנה נתונים"
  };

  window.qtypeLabel = function (question) {
    return QTYPE_LABELS[question.qtype] || "שאלה פתוחה";
  };

  /* ---- פתרון מונפש לשאלת מאגר, אם הוכן לה ---- */
  window.bankStepperHtml = function (question) {
    var bank = window.BANK_WALKTHROUGHS || {};
    var entry = bank[String(question.id || question.n)];
    if (!entry || !entry.steps || !entry.steps.length || !window.renderStepper) return "";
    return window.renderStepper("bank-" + (question.id || question.n), entry.steps, {
      title: "🎬 " + (entry.title || "הפתרון שלב-אחר-שלב") +
        " — " + entry.steps.length + " שלבים"
    });
  };

  /* ---- עורך קוד לשאלות מימוש ---- */
  var EDITOR_KEY = KEY_PREFIX + "code-drafts";

  window.codeDraft = function (id, value) {
    var all = {};
    try { all = JSON.parse(localStorage.getItem(EDITOR_KEY) || "{}"); } catch (e) {}
    if (value === undefined) return all[id] || "";
    all[id] = value;
    try { localStorage.setItem(EDITOR_KEY, JSON.stringify(all)); } catch (e) {}
    return value;
  };

  window.codeEditorHtml = function (question) {
    if (question.qtype !== "code") return "";
    var id = String(question.id || question.n);
    var sig = question.signature || "";
    var draft = window.codeDraft(id);
    return '<div class="code-editor">' +
      '<div class="code-editor-head"><b>✍️ כתוב כאן את המימוש</b>' +
      (sig ? '<code class="sig" dir="ltr">' + sig + "</code>" : "") + "</div>" +
      '<textarea class="code-input" dir="ltr" spellcheck="false" ' +
      'data-code-for="' + id + '" placeholder="' +
      (sig ? sig.replace(/"/g, "&quot;") + " {\n    \n}" : "כתוב את הפונקציה כאן…") +
      '">' + draft.replace(/</g, "&lt;") + "</textarea>" +
      '<div class="code-editor-foot">הטיוטה נשמרת אוטומטית במכשיר. ' +
      "כתוב קודם ביד על דף — המקלדת סלחנית מדי לעומת המבחן.</div></div>";
  };

  function unique(values) {
    return values.filter(function (value, index) {
      return values.indexOf(value) === index;
    });
  }

  function normalizeQuestion(question, index) {
    question.n = index + 1;
    question.difficulty = Math.max(1, Math.min(4, Number(question.difficulty) || 2));
    question.skills = Array.isArray(question.skills) && question.skills.length
      ? question.skills
      : [question.cat];
    question.origin = question.origin || "generated";
    if (!question.sourceLabel) {
      question.sourceLabel = "שאלת Codex · לא ממבחן";
      question.origin = "generated";
    }
    question.examSolution = examSolutions[String(question.id || "")] || null;
    return question;
  }

  if (!data.adaptiveQuestionsAdded) {
    data.qs.forEach(function (question) {
      if (question.origin === "generated") {
        question.sourceLabel = "שאלת Codex · לא ממבחן · תרגול יסודות";
      } else if (question.origin === "official" && question.id === "A10") {
        question.sourceLabel = "מבחן 2021 Y (מועד ב׳) · שאלה 1, לולאה 2 · נוסח מקורי";
        question.sourceHref = "/assets/exams/2021-y-questionnaire.pdf#page=2";
      }
    });
    data.qs = data.qs.concat(additions).concat(bankQuestions);
    data.qs = data.qs.map(normalizeQuestion);
    data.cats = unique(data.qs.map(function (question) { return question.cat; }));
    data.adaptiveQuestionsAdded = true;
  }

  window.mountCodexQuiz = function mountAdaptiveCodexQuiz() {
    var shell = document.getElementById("quizShell");
    if (!shell) return;

    var questions = data.qs;
    var categories = data.cats || [];
    var KEY = KEY_PREFIX + "adaptive-progress-v2";
    var OLD_KEY = KEY_PREFIX + "progress-v1";
    var OLD_MISTAKE_KEY = KEY_PREFIX + "mistakes-v1";
    var model = loadModel();
    var category = "all";
    var mode = "adaptive";
    var originFilter = "all";
    var query = "";
    var visible = [];
    var position = 0;
    var viewAnswers = {};
    var revealedSolutions = {};
    var solutionPositions = {};
    var solutionTimer = null;

    function emptyModel() {
      return { version: 2, sequence: 0, records: {}, migrated: false, lastQuestion: null };
    }

    function readJson(key, fallback) {
      try {
        var parsed = JSON.parse(localStorage.getItem(key) || "");
        return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : fallback;
      } catch {
        return fallback;
      }
    }

    function loadModel() {
      var saved = readJson(KEY, emptyModel());
      if (!saved.records || typeof saved.records !== "object" || Array.isArray(saved.records)) {
        saved = emptyModel();
      }
      saved.version = 2;
      saved.sequence = Number(saved.sequence) || 0;
      if (!saved.migrated) migrateOldProgress(saved);
      return saved;
    }

    function migrateOldProgress(target) {
      var oldAnswers = readJson(OLD_KEY, {});
      var oldMistakes = readJson(OLD_MISTAKE_KEY, {});
      var now = Date.now();
      questions.forEach(function (question) {
        var id = keyOf(question);
        var answer = oldAnswers[id];
        var mistake = oldMistakes[id];
        if (!answer && !mistake) return;
        var wrongCount = Math.max(Number(mistake && mistake.count) || 0, answer && !answer.correct ? 1 : 0);
        var correctCount = answer && answer.correct ? 1 : 0;
        target.records[id] = {
          attempts: Math.max(1, wrongCount + correctCount),
          correct: correctCount,
          wrong: wrongCount,
          streak: correctCount,
          mastery: correctCount ? 1 : 0,
          lastChoice: answer ? answer.choice : (mistake ? mistake.lastChoice : null),
          lastCorrect: !!(answer && answer.correct),
          lastAt: answer && answer.answeredAt ? answer.answeredAt : (mistake && mistake.lastAt),
          dueAt: correctCount ? now + 30 * 60000 : now,
          dueAfter: target.sequence
        };
      });
      target.migrated = true;
      saveModel(target);
    }

    function saveModel(value) {
      try { localStorage.setItem(KEY, JSON.stringify(value || model)); } catch {}
    }

    function keyOf(question) {
      return String(question.id || question.n);
    }

    function recordOf(question) {
      return model.records[keyOf(question)] || null;
    }

    function plain(value) {
      return String(value || "")
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .toLowerCase();
    }

    function escapeCode(value) {
      return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }

    function isMastered(question) {
      var record = recordOf(question);
      return !!record && Number(record.mastery) >= 3;
    }

    function isDue(question) {
      var record = recordOf(question);
      if (!record || !record.attempts || isMastered(question)) return false;
      return model.sequence >= (Number(record.dueAfter) || Infinity) ||
        Date.now() >= (Number(record.dueAt) || Infinity);
    }

    function isTemporarilyDelayed(question) {
      var record = recordOf(question);
      return !!record && record.lastCorrect === false && !isDue(question);
    }

    function matchesScope(question) {
      if (category !== "all" && question.cat !== category) return false;
      if (originFilter !== "all" && question.origin !== originFilter) return false;
      if (query) {
        var haystack = [
          question.prompt,
          question.code,
          question.html,
          question.rule,
          question.why,
          question.trap,
          question.cat,
          question.sourceLabel,
          (question.skills || []).join(" ")
        ].map(plain).join(" ");
        if (haystack.indexOf(query) === -1) return false;
      }
      return true;
    }

    function weaknessRows(kind) {
      var groups = {};
      questions.forEach(function (question) {
        var names = kind === "skill" ? question.skills : [question.cat];
        names.forEach(function (name) {
          if (!groups[name]) {
            groups[name] = {
              name: name,
              questions: 0,
              attemptedQuestions: 0,
              attempts: 0,
              correct: 0,
              wrong: 0,
              open: 0,
              due: 0,
              mastered: 0,
              difficulty: 0
            };
          }
          var row = groups[name];
          var record = recordOf(question);
          row.questions += 1;
          row.difficulty += question.difficulty;
          if (record && record.attempts) {
            row.attemptedQuestions += 1;
            row.attempts += Number(record.attempts) || 0;
            row.correct += Number(record.correct) || 0;
            row.wrong += Number(record.wrong) || 0;
            if (record.wrong && !isMastered(question)) row.open += 1;
            if (isDue(question)) row.due += 1;
            if (isMastered(question)) row.mastered += 1;
          }
        });
      });

      return Object.keys(groups).map(function (name) {
        var row = groups[name];
        row.accuracy = row.attempts ? row.correct / row.attempts : null;
        var errorWeight = row.accuracy === null ? 0.3 : 1 - row.accuracy;
        var openWeight = row.questions ? row.open / row.questions : 0;
        var masteryGap = row.questions ? 1 - row.mastered / row.questions : 1;
        row.score = errorWeight * 62 + openWeight * 25 + masteryGap * 8 +
          Math.min(5, row.difficulty / Math.max(1, row.questions));
        return row;
      }).sort(function (a, b) {
        if (a.attemptedQuestions && !b.attemptedQuestions) return -1;
        if (!a.attemptedQuestions && b.attemptedQuestions) return 1;
        return b.score - a.score || a.name.localeCompare(b.name, "he");
      });
    }

    function categoryScores() {
      var scores = {};
      weaknessRows("category").forEach(function (row) { scores[row.name] = row.score; });
      return scores;
    }

    function adaptiveCandidates() {
      var scoped = questions.filter(matchesScope);
      var ready = scoped.filter(function (question) {
        return !isTemporarilyDelayed(question);
      });
      return ready.length ? ready : scoped;
    }

    function recommendationScore(question, scores) {
      var record = recordOf(question);
      var score = (scores[question.cat] || 0) * 2;
      if (isDue(question)) score += 1000;
      if (!record || !record.attempts) score += 240;
      else score += Math.max(0, 3 - Number(record.mastery || 0)) * 45;
      if (record && record.wrong) score += Math.min(120, Number(record.wrong) * 24);
      if (question.origin === "recent") score += 90;
      if (question.origin === "official") score += 60;
      if (question.origin === "homework") score += 50;
      if (question.origin === "bank") score += 45;
      score += question.difficulty * 14;
      if (keyOf(question) === model.lastQuestion) score -= 2000;
      return score;
    }

    function rankedAdaptive() {
      var scores = categoryScores();
      return adaptiveCandidates().sort(function (a, b) {
        return recommendationScore(b, scores) - recommendationScore(a, scores) ||
          a.n - b.n;
      });
    }

    function pickRecommended() {
      return rankedAdaptive()[0] || null;
    }

    function matchesMode(question) {
      var record = recordOf(question);
      if (!matchesScope(question)) return false;
      if (mode === "unanswered") return !record || !record.attempts;
      if (mode === "due") return isDue(question);
      if (mode === "wrong") return !!record && !!record.wrong && !isMastered(question);
      if (mode === "correct") return !!record && record.lastCorrect === true;
      if (mode === "mastered") return isMastered(question);
      return true;
    }

    function refreshVisible(keepQuestion) {
      var currentId = keepQuestion && visible[position] ? keyOf(visible[position]) : null;
      visible = mode === "adaptive" ? rankedAdaptive() : questions.filter(matchesMode);
      if (currentId) {
        var nextPosition = visible.findIndex(function (question) {
          return keyOf(question) === currentId;
        });
        position = nextPosition >= 0 ? nextPosition : 0;
      } else {
        position = 0;
      }
      if (position >= visible.length) position = Math.max(0, visible.length - 1);
    }

    function totals() {
      var attemptedQuestions = 0;
      var attempts = 0;
      var correctAttempts = 0;
      var due = 0;
      var mastered = 0;
      questions.forEach(function (question) {
        var record = recordOf(question);
        if (record && record.attempts) {
          attemptedQuestions += 1;
          attempts += Number(record.attempts) || 0;
          correctAttempts += Number(record.correct) || 0;
        }
        if (isDue(question)) due += 1;
        if (isMastered(question)) mastered += 1;
      });
      return {
        attemptedQuestions: attemptedQuestions,
        attempts: attempts,
        correctAttempts: correctAttempts,
        due: due,
        mastered: mastered
      };
    }

    function renderStats() {
      var stats = totals();
      var accuracy = stats.attempts
        ? Math.round(stats.correctAttempts / stats.attempts * 100) + "%"
        : "—";
      document.getElementById("quizAnswered").textContent = stats.attemptedQuestions;
      document.getElementById("quizCorrect").textContent = stats.correctAttempts;
      document.getElementById("quizAccuracy").textContent = accuracy;
      document.getElementById("quizRemaining").textContent =
        questions.length - stats.attemptedQuestions;
      document.getElementById("quizDue").textContent = stats.due;
      document.getElementById("quizMastered").textContent = stats.mastered;
      document.getElementById("quizProgress").style.width =
        Math.round(stats.attemptedQuestions / questions.length * 100) + "%";
    }

    function renderCategories() {
      var root = document.getElementById("quizCategories");
      var all = ["all"].concat(categories);
      root.innerHTML = all.map(function (cat) {
        var count = cat === "all"
          ? questions.length
          : questions.filter(function (question) { return question.cat === cat; }).length;
        var label = cat === "all" ? "הכול" : cat;
        return '<button class="quiz-btn' + (category === cat ? " on" : "") +
          '" data-cat="' + cat.replace(/"/g, "&quot;") + '">' +
          label + " · " + count + "</button>";
      }).join("");
    }

    function masteryLabel(question) {
      var record = recordOf(question);
      if (!record || !record.attempts) return "חדש";
      if (record.mastery >= 3) return "נשלט ✓";
      if (isDue(question)) return "מוכן לחזרה";
      return "שליטה " + Number(record.mastery || 0) + "/3";
    }

    function renderCoach() {
      var summary = document.getElementById("coachSummary");
      var map = document.getElementById("weaknessMap");
      var next = pickRecommended();
      var categoryRows = weaknessRows("category");
      var skillRows = weaknessRows("skill");
      var attemptedCategories = categoryRows.filter(function (row) {
        return row.attemptedQuestions > 0;
      });
      var weakCategory = attemptedCategories[0];
      var weakSkills = skillRows.filter(function (row) {
        return row.attemptedQuestions > 0;
      }).slice(0, 3);

      if (summary) {
        var weakText = weakCategory
          ? '<b>הנושא החלש כרגע:</b> ' + weakCategory.name +
            " · " + Math.round((weakCategory.accuracy || 0) * 100) + "% דיוק"
          : "<b>עדיין אין מספיק נתונים.</b> המאמן יתחיל משאלות 2023–2025 וממטלות הקורס.";
        var skillsText = weakSkills.length
          ? '<div class="coach-skills"><b>מיומנויות לחיזוק:</b> ' +
            weakSkills.map(function (row) {
              return '<span class="tag hot">' + row.name + "</span>";
            }).join(" ") + "</div>"
          : "";
        var nextText = next
          ? '<div class="coach-next"><b>השאלה המומלצת:</b> ' + next.id + " · " +
            next.cat + " · " + next.sourceLabel + "</div>"
          : "";
        summary.innerHTML = weakText + skillsText + nextText;
      }

      if (map) {
        var rows = categoryRows.slice(0, 10);
        map.innerHTML = rows.map(function (row) {
          var accuracy = row.accuracy === null ? 0 : Math.round(row.accuracy * 100);
          var status = row.accuracy === null
            ? "טרם נבדק"
            : accuracy + "% דיוק · " + row.open + " טעויות פתוחות";
          return '<div class="weakness-row">' +
            '<div><b>' + row.name + '</b><small>' + status + "</small></div>" +
            '<div class="weakness-bar" aria-label="' + status + '"><i style="width:' +
            accuracy + '%"></i></div>' +
            '<button class="quiz-btn" data-coach-cat="' +
            row.name.replace(/"/g, "&quot;") + '">תרגל</button></div>';
        }).join("");
      }
    }

    function sourceProof(question) {
      var label = question.sourceLabel || "שאלת Codex · לא ממבחן";
      var className = question.origin === "recent" || question.origin === "official"
        ? "exam"
        : question.origin === "homework" ? "hot" : "generated";
      var content = "<b>מקור:</b> " + label;
      return question.sourceHref
        ? '<a class="question-source tag ' + className + '" href="' +
          question.sourceHref + '" target="_blank" rel="noopener">' + content + "</a>"
        : '<span class="question-source tag ' + className + '">' + content + "</span>";
    }

    function optionClass(question, answer, index) {
      if (!answer) return "";
      if (index === question.ans) return answer.choice === index ? " good" : " answer";
      if (answer.choice === index) return " bad";
      return "";
    }

    function relatedQuestions(question) {
      var skills = question.skills || [];
      return questions.filter(function (candidate) {
        if (keyOf(candidate) === keyOf(question)) return false;
        return (candidate.skills || []).some(function (skill) {
          return skills.indexOf(skill) >= 0;
        }) || candidate.cat === question.cat;
      }).sort(function (a, b) {
        var aRecord = recordOf(a);
        var bRecord = recordOf(b);
        var aPriority = isDue(a) ? 0 : (!aRecord ? 1 : 2);
        var bPriority = isDue(b) ? 0 : (!bRecord ? 1 : 2);
        return aPriority - bPriority || b.difficulty - a.difficulty;
      }).slice(0, 3);
    }

    function renderNotebook() {
      var root = document.getElementById("mistakeNotebook");
      if (!root) return;
      var records = questions.map(function (question) {
        return { question: question, record: recordOf(question) };
      }).filter(function (item) {
        return item.record && item.record.wrong;
      }).sort(function (a, b) {
        if (isMastered(a.question) !== isMastered(b.question)) {
          return isMastered(a.question) ? 1 : -1;
        }
        return String(b.record.lastAt || "").localeCompare(String(a.record.lastAt || ""));
      });

      if (!records.length) {
        root.className = "mistake-empty";
        root.innerHTML =
          "עדיין אין טעויות שמורות. כשתטעה, המקור, המלכודת ומועד החזרה יישמרו כאן.";
        return;
      }

      var open = records.filter(function (item) { return !isMastered(item.question); }).length;
      root.className = "";
      root.innerHTML =
        '<div class="mistake-summary"><span class="tag hot">' + open + " לחיזוק</span>" +
        '<span class="tag">' + (records.length - open) + " נשלטו</span>" +
        '<span class="tag generated">' + records.length + " טעויות היסטוריות</span></div>" +
        '<div class="mistake-list">' +
        records.slice(0, 16).map(function (item) {
          var question = item.question;
          var record = item.record;
          return '<div class="mistake-row' +
            (isMastered(question) ? " mastered" : "") + '">' +
            "<div><b>" + question.id + "</b> · " + question.cat +
            "<br><small>" + question.sourceLabel + "<br>" +
            record.wrong + " טעויות · " + masteryLabel(question) + "</small></div>" +
            '<div class="rule"><b>המלכודת:</b> ' +
            (question.trap || question.rule) + "</div>" +
            '<button class="quiz-btn" data-review="' + question.id + '">' +
            (isMastered(question) ? "תרגל שוב" : "חזק עכשיו") + "</button></div>";
        }).join("") + "</div>";
    }

    function renderDynamicCode() {
      var dynamicCode = shell.querySelector("pre.c");
      if (!dynamicCode) return;
      var raw = dynamicCode.textContent;
      var keywords = /\b(int|char|void|return|if|else|while|for|struct|typedef|sizeof|NULL|do|long|double|float|unsigned)\b/g;
      dynamicCode.innerHTML = escapeCode(raw).replace(keywords, '<span class="kw">$1</span>');
    }

    function stopSolutionAuto() {
      if (solutionTimer) window.clearInterval(solutionTimer);
      solutionTimer = null;
    }

    function solutionIndex(question) {
      var id = keyOf(question);
      var total = question.examSolution ? question.examSolution.steps.length : 0;
      var current = Number(solutionPositions[id]) || 0;
      return Math.max(0, Math.min(Math.max(0, total - 1), current));
    }

    function solutionStepHtml(question, index) {
      var solution = question.examSolution;
      var step = solution.steps[index];
      return '<div class="solution-step" data-step="' + index + '">' +
        '<span class="solution-step-number">שלב ' + (index + 1) + '</span>' +
        "<h4>" + step.title + "</h4>" +
        '<p dir="rtl">' + step.text + "</p>" +
        (step.formula
          ? '<div class="solution-equation" dir="ltr">' +
            escapeCode(step.formula) + "</div>"
          : "") + "</div>";
    }

    function examSolutionHtml(question) {
      var solution = question.examSolution;
      if (!solution) return "";
      var index = solutionIndex(question);
      var formulas = solution.formulas.map(function (formula) {
        return '<div class="formula-card"><small>' + formula.label + '</small>' +
          '<div dir="ltr">' + escapeCode(formula.value) + "</div></div>";
      }).join("");
      var dots = solution.steps.map(function (step, stepIndex) {
        return '<button class="solution-dot' + (stepIndex === index ? " on" : "") +
          '" data-solution-jump="' + stepIndex + '" aria-label="מעבר לשלב ' +
          (stepIndex + 1) + '"></button>';
      }).join("");

      return '<section class="solution-lab" data-solution-id="' + question.id +
        '" aria-label="פתרון מלא ומונפש">' +
        '<div class="solution-lab-head"><div><span class="tag exam">פתרון מבחן מלא</span>' +
        "<h3>" + solution.title + "</h3>" +
        '<p>התקדם שלב-שלב או הפעל את הפתרון האוטומטי. הנוסחאות נשארות מול העיניים.</p>' +
        '</div><button class="quiz-btn" data-solution-action="auto">הפעל אוטומטית</button></div>' +
        '<div class="formula-title">הנוסחאות והכללים שצריך לשאלה</div>' +
        '<div class="formula-strip">' + formulas + "</div>" +
        '<div class="solution-stage" aria-live="polite">' +
        solutionStepHtml(question, index) + "</div>" +
        '<div class="solution-controls">' +
        '<button class="quiz-btn" data-solution-action="prev"' +
        (index === 0 ? " disabled" : "") + ">השלב הקודם</button>" +
        '<div class="solution-dots">' + dots + "</div>" +
        '<span class="solution-position">שלב ' + (index + 1) + " מתוך " +
        solution.steps.length + "</span>" +
        '<button class="quiz-btn primary" data-solution-action="next"' +
        (index === solution.steps.length - 1 ? " disabled" : "") +
        ">השלב הבא</button></div></section>";
    }

    function updateSolutionDisplay(question) {
      var solution = question.examSolution;
      var lab = shell.querySelector('[data-solution-id="' + question.id + '"]');
      if (!solution || !lab) return;
      var index = solutionIndex(question);
      var stage = lab.querySelector(".solution-stage");
      if (stage) stage.innerHTML = solutionStepHtml(question, index);
      [].slice.call(lab.querySelectorAll(".solution-dot")).forEach(function (dot, dotIndex) {
        dot.classList.toggle("on", dotIndex === index);
      });
      var positionLabel = lab.querySelector(".solution-position");
      if (positionLabel) {
        positionLabel.textContent = "שלב " + (index + 1) + " מתוך " + solution.steps.length;
      }
      var previous = lab.querySelector('[data-solution-action="prev"]');
      var next = lab.querySelector('[data-solution-action="next"]');
      var auto = lab.querySelector('[data-solution-action="auto"]');
      if (previous) previous.disabled = index === 0;
      if (next) next.disabled = index === solution.steps.length - 1;
      if (auto) auto.textContent = solutionTimer ? "עצור" : "הפעל אוטומטית";
    }

    function moveSolution(question, nextIndex) {
      if (!question.examSolution) return;
      solutionPositions[keyOf(question)] = Math.max(
        0,
        Math.min(question.examSolution.steps.length - 1, nextIndex)
      );
      updateSolutionDisplay(question);
    }

    function toggleSolutionAuto(question) {
      if (solutionTimer) {
        stopSolutionAuto();
        updateSolutionDisplay(question);
        return;
      }
      if (solutionIndex(question) === question.examSolution.steps.length - 1) {
        solutionPositions[keyOf(question)] = 0;
      }
      updateSolutionDisplay(question);
      solutionTimer = window.setInterval(function () {
        var index = solutionIndex(question);
        if (index >= question.examSolution.steps.length - 1) {
          stopSolutionAuto();
          updateSolutionDisplay(question);
          return;
        }
        moveSolution(question, index + 1);
      }, 1700);
      updateSolutionDisplay(question);
    }

    function renderQuestion() {
      stopSolutionAuto();
      if (!visible.length) {
        shell.innerHTML =
          '<div class="quiz-empty"><b>אין כרגע שאלות בסינון הזה.</b><br>' +
          "אפשר לשנות מקור, קטגוריה או מצב תרגול.</div>";
        return;
      }

      var question = visible[position];
      var answer = viewAnswers[keyOf(question)] || null;
      var record = recordOf(question);
      var isOpen = question.kind === "open";
      var body = "";
      var options = "";
      if (isOpen) {
        var parts = window.splitBankCard(question.html, keyOf(question));
        var revealed = !!revealedSolutions[keyOf(question)] || !!answer;
        body =
          (question.hint
            ? '<details class="q-hint"><summary>💡 רמז — בלי לפתור</summary><div>' +
              question.hint + "</div></details>"
            : "") +
          (parts.code ? '<div class="q-given"><b>נתון:</b></div>' + parts.code : "") +
          (parts.rest ? '<div class="q-extra">' + parts.rest + "</div>" : "") +
          window.codeEditorHtml(question) +
          (revealed
            ? '<div class="q-solution"><b>✅ הפתרון המלא</b>' + parts.solution +
              window.bankStepperHtml(question) + "</div>"
            : "");
        options = answer ? "" : (revealed
          ? '<div class="quiz-selfgrade"><span class="selfgrade-hint">השווה למה שכתבת וסמן — כדי שהמאמן ידע מה להחזיר אליך:</span>' +
            '<button class="quiz-option" data-self="1"><span class="key">✔</span><span>פתרתי נכון</span></button>' +
            '<button class="quiz-option" data-self="0"><span class="key">✘</span><span>טעיתי</span></button></div>'
          : '<div class="quiz-selfgrade"><span class="selfgrade-hint">פתור קודם על דף. רק אחר כך:</span>' +
            '<button class="quiz-option primary-check" data-reveal><span class="key">🔍</span>' +
            "<span>בדוק — הצג את הפתרון</span></button></div>");
      } else {
        body = question.code
          ? '<pre class="' + (question.kind === "math" ? "" : "c") +
            '" dir="ltr">' + escapeCode(question.code) + "</pre>"
          : "";
        options = '<div class="quiz-options">' + question.opts.map(function (option, index) {
          return '<button class="quiz-option' + optionClass(question, answer, index) +
            '" data-choice="' + index + '"' + (answer ? " disabled" : "") + ">" +
            '<span class="key">' + (index + 1) + "</span>" +
            "<span" + (option.ltr ? ' dir="ltr"' : "") + ">" + option.h + "</span></button>";
        }).join("") + "</div>";
      }
      var explanation = "";

      if (answer) {
        var related = relatedQuestions(question);
        var mistakeHelp = answer.correct ? "" :
          '<div class="quiz-mistake"><b>הטעות נשמרה.</b> ' +
          (question.trap || "קרא שוב את הכלל ונסה להסביר לעצמך את תנאי העצירה.") +
          "<br>השאלה תחזור אחרי לפחות 3 שאלות אחרות, או כשהגיע זמן החזרה." +
          (related.length
            ? '<div class="quiz-similar"><b>חיזוק דומה:</b>' +
              related.map(function (candidate) {
                return '<button class="quiz-btn" data-open-question="' +
                  candidate.id + '">' + candidate.id + " · " + candidate.cat + "</button>";
              }).join("") + "</div>"
            : "") + "</div>";
        explanation =
          '<div class="quiz-explain open">' +
          '<div class="quiz-verdict ' + (answer.correct ? "good" : "bad") + '">' +
          (answer.correct
            ? "✓ נכון · התקדמת לרמת שליטה " + Number(record.mastery || 0) + "/3"
            : "✗ לא בדיוק · " + (isOpen
                ? "השאלה נשמרה לחיזוק — עבור שוב על הפתרון בכרטיס"
                : "התשובה הנכונה: " + question.opts[question.ans].h)) +
          "</div>" +
          (question.rule ? '<div class="quiz-rule"><b>כלל:</b> ' + question.rule + "</div>" : "") +
          (question.why ? "<p>" + question.why + "</p>" : "") + examSolutionHtml(question) +
          mistakeHelp + "</div>";
      }

      shell.innerHTML =
        '<div class="quiz-head"><span class="quiz-index">שאלה ' +
        String(question.n).padStart(3, "0") + " · " + question.id + "</span>" +
        '<span class="tag">' + question.cat + "</span>" +
        '<span class="tag difficulty">קושי ' + question.difficulty + "/4</span>" +
        '<span class="tag mastery">' + masteryLabel(question) + "</span>" +
        (isOpen ? '<span class="tag hot">' + window.qtypeLabel(question) + "</span>" : "") +
        (question.examSolution
          ? '<span class="tag exam">פתרון מונפש · ' +
            question.examSolution.steps.length + " שלבים</span>"
          : "") + "</div>" +
        '<div class="quiz-body"><div class="source-proof">' + sourceProof(question) +
        window.topicLinkFor(question) + "</div>" +
        '<div class="quiz-prompt">' + question.prompt + "</div>" + body +
        options + "</div>" + explanation +
        '<div class="quiz-nav">' +
        '<button class="quiz-btn" data-nav="prev">הקודמת</button>' +
        '<button class="quiz-btn primary" data-nav="next">הבאה / מומלצת</button>' +
        '<button class="quiz-btn" data-nav="unanswered">שאלה חדשה</button>' +
        '<span class="quiz-position">' + (position + 1) + " / " + visible.length + "</span></div>";
      renderDynamicCode();
    }

    function renderAll(keepQuestion) {
      refreshVisible(keepQuestion);
      renderStats();
      renderCategories();
      renderCoach();
      renderQuestion();
      renderNotebook();
    }

    function scheduleRecord(record, correct) {
      var now = Date.now();
      if (!correct) {
        record.mastery = 0;
        record.streak = 0;
        record.dueAfter = model.sequence + 3;
        record.dueAt = now + 3 * 60000;
        return;
      }
      record.streak = Number(record.streak || 0) + 1;
      record.mastery = Math.min(3, Number(record.mastery || 0) + 1);
      if (record.mastery === 1) {
        record.dueAfter = model.sequence + 6;
        record.dueAt = now + 30 * 60000;
      } else if (record.mastery === 2) {
        record.dueAfter = model.sequence + 12;
        record.dueAt = now + 24 * 60 * 60000;
      } else {
        record.dueAfter = model.sequence + 30;
        record.dueAt = now + 3 * 24 * 60 * 60000;
      }
    }

    function choose(index) {
      var question = visible[position];
      if (!question || !question.opts || viewAnswers[keyOf(question)]) return;
      applyAnswer(question, index, index === question.ans);
    }

    function chooseSelf(correct) {
      var question = visible[position];
      if (!question || question.kind !== "open" || viewAnswers[keyOf(question)]) return;
      applyAnswer(question, null, correct);
    }

    function applyAnswer(question, index, correct) {
      var id = keyOf(question);
      var record = model.records[id] || {
        attempts: 0,
        correct: 0,
        wrong: 0,
        streak: 0,
        mastery: 0
      };
      model.sequence += 1;
      record.attempts += 1;
      record.correct += correct ? 1 : 0;
      record.wrong += correct ? 0 : 1;
      record.lastChoice = index;
      record.lastCorrect = correct;
      record.lastAt = new Date().toISOString();
      scheduleRecord(record, correct);
      model.records[id] = record;
      model.lastQuestion = id;
      viewAnswers[id] = { choice: index, correct: correct };
      saveModel();
      renderStats();
      renderCoach();
      renderQuestion();
      renderNotebook();
    }

    function openQuestion(id, resetView) {
      var target = questions.find(function (question) {
        return keyOf(question) === String(id);
      });
      if (!target) return;
      if (resetView !== false) delete viewAnswers[keyOf(target)];
      category = "all";
      mode = "all";
      originFilter = "all";
      query = "";
      document.getElementById("quizMode").value = "all";
      document.getElementById("quizOrigin").value = "all";
      document.getElementById("quizSearch").value = "";
      refreshVisible(false);
      position = Math.max(0, visible.findIndex(function (question) {
        return keyOf(question) === keyOf(target);
      }));
      renderCategories();
      renderQuestion();
      shell.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function openRecommended() {
      mode = "adaptive";
      category = "all";
      originFilter = "all";
      query = "";
      document.getElementById("quizMode").value = "adaptive";
      document.getElementById("quizOrigin").value = "all";
      document.getElementById("quizSearch").value = "";
      refreshVisible(false);
      position = 0;
      if (visible[0]) delete viewAnswers[keyOf(visible[0])];
      renderCategories();
      renderQuestion();
      shell.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function goNextUnanswered() {
      var target = rankedAdaptive().find(function (question) {
        var record = recordOf(question);
        return !record || !record.attempts;
      });
      if (!target) {
        shell.insertAdjacentHTML(
          "afterbegin",
          '<div class="quiz-verdict good">ענית לפחות פעם אחת על כל השאלות. ממשיכים לחזרות של המאמן.</div>'
        );
        return;
      }
      openQuestion(keyOf(target));
    }

    shell.addEventListener("click", function (event) {
      var currentQuestion = visible[position];
      var solutionJump = event.target.closest("[data-solution-jump]");
      if (solutionJump && currentQuestion && currentQuestion.examSolution) {
        stopSolutionAuto();
        moveSolution(currentQuestion, Number(solutionJump.getAttribute("data-solution-jump")));
        return;
      }
      var solutionAction = event.target.closest("[data-solution-action]");
      if (solutionAction && currentQuestion && currentQuestion.examSolution) {
        var actionName = solutionAction.getAttribute("data-solution-action");
        var currentStep = solutionIndex(currentQuestion);
        if (actionName === "auto") toggleSolutionAuto(currentQuestion);
        if (actionName === "prev") {
          stopSolutionAuto();
          moveSolution(currentQuestion, currentStep - 1);
        }
        if (actionName === "next") {
          stopSolutionAuto();
          moveSolution(currentQuestion, currentStep + 1);
        }
        return;
      }
      var linked = event.target.closest("[data-open-question]");
      if (linked) {
        openQuestion(linked.getAttribute("data-open-question"));
        return;
      }
      var option = event.target.closest("[data-choice]");
      if (option) {
        choose(Number(option.getAttribute("data-choice")));
        return;
      }
      if (event.target.closest("[data-reveal]")) {
        var current = visible[position];
        if (current) {
          revealedSolutions[keyOf(current)] = true;
          renderQuestion();
        }
        return;
      }
      var selfGrade = event.target.closest("[data-self]");
      if (selfGrade) {
        chooseSelf(selfGrade.getAttribute("data-self") === "1");
        return;
      }
      var nav = event.target.closest("[data-nav]");
      if (!nav || !visible.length) return;
      var action = nav.getAttribute("data-nav");
      if (action === "unanswered") {
        goNextUnanswered();
        return;
      }
      if (action === "next" && mode === "adaptive") {
        openRecommended();
        return;
      }
      if (action === "prev") position = (position - 1 + visible.length) % visible.length;
      if (action === "next") position = (position + 1) % visible.length;
      renderQuestion();
    });

    shell.addEventListener("input", function (event) {
      var box = event.target.closest("[data-code-for]");
      if (box) window.codeDraft(box.getAttribute("data-code-for"), box.value);
    });

    document.getElementById("quizCategories").addEventListener("click", function (event) {
      var button = event.target.closest("[data-cat]");
      if (!button) return;
      category = button.getAttribute("data-cat");
      renderAll(false);
    });

    document.getElementById("quizSearch").addEventListener("input", function (event) {
      query = event.target.value.trim().toLowerCase();
      renderAll(false);
    });

    document.getElementById("quizMode").addEventListener("change", function (event) {
      mode = event.target.value;
      renderAll(false);
    });

    document.getElementById("quizOrigin").addEventListener("change", function (event) {
      originFilter = event.target.value;
      renderAll(false);
    });

    document.getElementById("quizRandom").addEventListener("click", function () {
      if (!visible.length) return;
      position = Math.floor(Math.random() * visible.length);
      delete viewAnswers[keyOf(visible[position])];
      renderQuestion();
    });

    document.getElementById("quizRetry").addEventListener("click", function () {
      var question = visible[position];
      if (!question) return;
      delete viewAnswers[keyOf(question)];
      renderQuestion();
    });

    document.getElementById("quizAdaptive").addEventListener("click", openRecommended);

    document.getElementById("quizReset").addEventListener("click", function () {
      if (!window.confirm("לאפס את כל התשובות, רמות השליטה ומחברת הטעויות?")) return;
      model = emptyModel();
      model.migrated = true;
      viewAnswers = {};
      try {
        localStorage.removeItem(OLD_KEY);
        localStorage.removeItem(OLD_MISTAKE_KEY);
      } catch {}
      saveModel();
      renderAll(false);
    });

    document.getElementById("mistakeNotebook").addEventListener("click", function (event) {
      var button = event.target.closest("[data-review]");
      if (button) openQuestion(button.getAttribute("data-review"));
    });

    document.getElementById("weaknessMap").addEventListener("click", function (event) {
      var button = event.target.closest("[data-coach-cat]");
      if (!button) return;
      category = button.getAttribute("data-coach-cat");
      mode = "adaptive";
      document.getElementById("quizMode").value = "adaptive";
      renderAll(false);
      shell.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    document.addEventListener("keydown", function (event) {
      var page = document.getElementById("practice");
      if (!page || !page.classList.contains("on")) return;
      if (/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) return;
      if (/^[1-4]$/.test(event.key)) choose(Number(event.key) - 1);
    });

    window.setInterval(function () {
      renderStats();
      renderCoach();
    }, 60000);

    /* נגן השלבים הגנרי מבקש ציור מחדש אחרי מעבר שלב */
    window.__stepperRepaint = function (id) {
      if (String(id).indexOf("bank-") === 0) renderQuestion();
    };

    renderAll(false);
  };
})();
