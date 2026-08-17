/* ============================================================
 * exam-archive.js — כל המבחנים הייחודיים שנמצאו בתיקיית הקורס.
 *
 * 30 קובצי שאלון נסרקו. לאחר איחוד עותקים זהים/שמות חלופיים
 * נשארו 21 מבחנים ייחודיים, 84 שאלות ופתרון לכל מבחן.
 * הקבצים עצמם נשמרים תחת assets/exams כדי שהאתר יעבוד גם offline.
 * ============================================================ */
(function () {
  "use strict";

  function item(cat, title, skills, difficulty) {
    return { cat: cat, title: title, skills: skills, difficulty: difficulty || 3 };
  }

  /* הקטגוריות זהות ל-topicPages ב-config.js — כך שקישורי ההעמקה,
     סינון הנושאים במאמן וסטטיסטיקת השליטה עובדים על טקסונומיה אחת.
     A ו-M הם נושאי ארכיון בלבד (סמסטר א'), ואין להם עמוד נושא. */
  var U = "משוואת-הגלים";
  var D = "דלמבר";
  var E = "אנרגיה-והספק";
  var J = "צומת-אימפדנסים";
  var F = "גלים-עומדים-פורייה";
  var T = "קו-תמסורת";
  var A = "אקוסטיקה — ארכיון";
  var M = "גלים אלקטרומגנטיים — ארכיון";
  var R = "מיתר-מונע-בקצה";

  var exams = [
    {
      key: "2026-x", year: 2026, label: "2026 · שאלון X", period: "סמסטר ב׳",
      questionFile: "2026-x-question.pdf", solutionFile: "2026-x-solution.pdf",
      priority: "core", aliases: [], solutionAliases: [],
      questions: [
        item(R, "מיתר חצי־אינסופי, מנוע וגל חד־כיווני", ["מהירות ועכבה", "שחזור גל", "כוח והספק"]),
        item(D, "תנאי התחלה, נוסחת ד׳אלמבר וחלוקת אנרגיה", ["פירוק ד׳אלמבר", "תחומי תמיכה", "אנרגיה"]),
        item(J, "צומת בין מיתרים: החזרה, העברה ורוחבי פולסים", ["עכבות", "מקדמי אמפליטודה", "שימור אנרגיה"]),
        item(F, "מיתר רתום: מקדמי פורייה, מופעים ואנרגיה מודאלית", ["אופנים עצמיים", "פאזה", "מחזור ואנרגיה"])
      ]
    },
    {
      key: "2025-x", year: 2025, label: "2025 · שאלון X", period: "סמסטר ב׳",
      questionFile: "2025-x-question.pdf", solutionFile: "2025-x-solution.pdf",
      priority: "core",
      aliases: ["מבחן X - 2025_1.pdf", "course90929-year2025-semester2-moed1.pdf"],
      solutionAliases: ["פתרון X - 2025_1.pdf"],
      questions: [
        item(R, "מנוע בקצה מיתר: כוח, מהירות, עבודה ואנרגיה", ["גל חד־כיווני", "אימפדנס", "עבודת מנוע"]),
        item(T, "קו תמסורת סופי ותנאי שפה", ["משוואות הטלגרף", "החזרות בקצוות", "מתח וזרם"]),
        item(J, "מעבר בין שני מיתרים ושימור אנרגיה", ["החזרה", "העברה", "עכבה"]),
        item(E, "סופרפוזיציה של גלים עומדים והספק", ["התאבכות", "הספק רגעי", "ממוצע בזמן"])
      ]
    },
    {
      key: "2025-y", year: 2025, label: "2025 · שאלון Y", period: "סמסטר ב׳",
      questionFile: "2025-y-question.pdf", solutionFile: "2025-y-solution.pdf",
      priority: "core", aliases: ["מבחן Y - 2025_1.pdf"],
      solutionAliases: ["פתרון Y - 2025_1.pdf"],
      questions: [
        item(R, "מנוע, עבודת הקצה ושחזור גל מתקדם", ["מהירות חומרית", "כוח", "אנרגיה"]),
        item(D, "ד׳אלמבר, תמיכה סופית ואנרגיה באזור", ["תנאי התחלה", "אינטגרל ד׳אלמבר", "זרימת אנרגיה"]),
        item(J, "פולס בצומת: אמפליטודה, סימן ורוחב", ["מקדמי מעבר", "מהירויות", "שימור אנרגיה"]),
        item(T, "קו תמסורת סופי: אופנים, מתח וזרם", ["תנאי שפה", "הרמוניות", "אנרגיה בקו"])
      ]
    },
    {
      key: "2024-x", year: 2024, label: "2024 · שאלון X", period: "סמסטר ב׳",
      questionFile: "2024-x-question.pdf", solutionFile: "2024-x-solution.pdf",
      priority: "archive",
      aliases: ["מבחן X - 2024_1.pdf", "course90929-year2024-semester2-moed1.pdf"],
      solutionAliases: ["פתרון X - 2024_1.pdf"],
      questions: [
        item(R, "מיתר מונע ושחזור גל חד־כיווני", ["מהירות ועכבה", "תנאי קצה", "הספק"]),
        item(D, "תנאי התחלה, ד׳אלמבר ואנרגיה", ["פירוק גל", "תחומי תמיכה", "אנרגיה"]),
        item(J, "צומת בין תווכים", ["מקדם החזרה", "מקדם העברה", "יחסי אנרגיה"]),
        item(F, "מיתר סופי רתום", ["פיתוח פורייה", "אופנים", "אנרגיה מודאלית"])
      ]
    },
    {
      key: "2024-y", year: 2024, label: "2024 · שאלון Y", period: "סמסטר ב׳",
      questionFile: "2024-y-question.pdf", solutionFile: "2024-y-solution.pdf",
      priority: "archive",
      aliases: ["מבחן Y - 2024_1.pdf", "course90929-year2024-semester2-moed2.pdf"],
      solutionAliases: ["פתרון Y - 2024_1.pdf"],
      questions: [
        item(R, "מיתר חצי־אינסופי ומקור בקצה", ["גל מתקדם", "אימפדנס", "עבודת מקור"]),
        item(D, "ד׳אלמבר וחישוב אנרגיה", ["תנאי התחלה", "פולסים", "אנרגיה"]),
        item(J, "החזרה והעברה בצומת", ["עכבות", "מקדמים", "רוחב פולס"]),
        item(F, "מיתר סופי והרמוניות", ["אורתוגונליות", "פאזה", "מחזור"])
      ]
    },
    {
      key: "2024-s1-m1", year: 2024, label: "2024 · סמסטר א׳ · מועד א׳", period: "סמסטר א׳",
      questionFile: "2024-s1-m1-complete.pdf", solutionFile: "2024-s1-m1-complete.pdf",
      priority: "archive", embeddedSolution: true, aliases: [], solutionAliases: [],
      questions: [
        item(U, "חבל תלוי במסוק: מתיחות משתנה, זמן מעבר והרמוניה עומדת", ["מתיחות ממשקל", "זמן התפשטות", "תדר עצמי"]),
        item(D, "מיתר אינסופי עם מהירות התחלתית: ד׳אלמבר ואנרגיה באזור", ["נרמול מאנרגיה", "אינטגרל ד׳אלמבר", "תחום תמיכה"]),
        item(F, "מיתר רתום: הספק, אופן ראשון ואנרגיה", ["הספק במיתר", "מקדם פורייה", "אנרגיית אופן"]),
        item(M, "סופרפוזיציה של גלים אלקטרומגנטיים", ["וקטורי גל", "שדה מגנטי", "וקטור פוינטינג"])
      ]
    },
    {
      key: "2023-x", year: 2023, label: "2023 · שאלון X", period: "סמסטר ב׳",
      questionFile: "2023-x-question.pdf", solutionFile: "2023-x-solution.pdf",
      priority: "archive", aliases: ["מבחן X - 2023_1.pdf"],
      solutionAliases: ["פתרון X - 2023_1.pdf"],
      questions: [
        item(J, "פולס בצומת בין מיתרים", ["עכבה", "החזרה והעברה", "אנרגיה"]),
        item(T, "קו תמסורת סופי", ["תנאי שפה", "אופנים", "מתח וזרם"]),
        item(R, "מנוע ומיתר חצי־אינסופי", ["גל חד־כיווני", "כוח", "הספק"]),
        item(E, "גל כללי, גל עומד והספק", ["סופרפוזיציה", "מהירות חומרית", "ממוצע הספק"])
      ]
    },
    {
      key: "2023-y", year: 2023, label: "2023 · שאלון Y", period: "סמסטר ב׳",
      questionFile: "2023-y-question.pdf", solutionFile: "2023-y-solution.pdf",
      priority: "archive",
      aliases: ["מבחן Y - 2023_1.pdf", "course90929-year2023-semester2-moed1.pdf"],
      solutionAliases: ["פתרון Y - 2023_1.pdf"],
      questions: [
        item(J, "צומת בין מיתרים", ["מקדמי אמפליטודה", "רוחבי פולסים", "אנרגיה"]),
        item(T, "קו תמסורת אינסופי", ["ד׳אלמבר חשמלי", "אימפדנס", "אנרגיה"]),
        item(F, "מיתר סופי רתום", ["אופנים", "מקדמים", "הספק"]),
        item(R, "מנוע בקצה מיתר", ["תנאי קצה", "עבודה", "גל מתקדם"])
      ]
    },
    {
      key: "2023-s1-m1", year: 2023, label: "2023 · סמסטר א׳ · מועד א׳", period: "סמסטר א׳",
      questionFile: "2023-s1-m1-complete.pdf", solutionFile: "2023-s1-m1-complete.pdf",
      priority: "archive", embeddedSolution: true, aliases: [], solutionAliases: [],
      questions: [
        item(U, "חבל דרך גלגלת: מתיחות משתנה וזמן הגעת הפרעה", ["מתיחות כתלות במיקום", "מהירות מקומית", "זמן מעבר"]),
        item(F, "מיתר רתום עם שני אופנים: צורה, הספק ואנרגיה", ["גל עומד", "הספק רגעי", "אנרגיה כוללת"]),
        item(M, "שני גלים אלקטרומגנטיים בכיוונים שונים", ["וקטורי גל", "שדה מגנטי", "פוינטינג ממוצע"]),
        item(T, "קו תמסורת אינסופי מנתוני מתח וזרם", ["אימפדנס", "קבוע דיאלקטרי", "פירוק לגלים"])
      ]
    },
    {
      key: "2023-s1-m2", year: 2023, label: "2023 · סמסטר א׳ · מועד ב׳", period: "סמסטר א׳",
      questionFile: "2023-s1-m2-complete.pdf", solutionFile: "2023-s1-m2-complete.pdf",
      priority: "archive", embeddedSolution: true, aliases: [], solutionAliases: [],
      questions: [
        item(U, "חבל מסתובב עם מסה: מתיחות, מהירות גל וזמן מחזור", ["תנועה מעגלית", "מתיחות", "מהירות משתנה"]),
        item(F, "גל עומד במיתר: אורך גל, פאזה והספק", ["הרמוניה", "פאזה", "הספק רגעי"]),
        item(M, "גל אלקטרומגנטי מתוך השדה המגנטי", ["וקטור גל", "שדה חשמלי", "חוק גאוס"]),
        item(T, "קו תמסורת אינסופי — פירוק אלגברי", ["אימפדנס", "מהירות", "גלי מתח וזרם"])
      ]
    },
    {
      key: "2022-x", year: 2022, label: "2022 · שאלון X", period: "סמסטר ב׳",
      questionFile: "2022-x-question.pdf", solutionFile: "2022-x-solution.pdf",
      priority: "archive",
      aliases: ["מבחן X - 2022_1.pdf", "course90929-year2022-semester2-moed1.pdf"],
      solutionAliases: ["פתרון X - 2022_1.pdf"],
      questions: [
        item(F, "מיתר סופי: תנאי התחלה ואופנים", ["פיתוח הרמוני", "אנרגיה", "מחזור"]),
        item(A, "מקור אקוסטי ותווך חצי־אינסופי", ["לחץ", "מהירות חומרית", "שטף אנרגיה"]),
        item(T, "קו תמסורת אינסופי", ["מתח וזרם", "ד׳אלמבר", "אנרגיה"]),
        item(J, "צומת בקו תמסורת והתאבכות אקוסטית", ["מקדמי מעבר", "הספק", "סופרפוזיציה"])
      ]
    },
    {
      key: "2022-y", year: 2022, label: "2022 · שאלון Y", period: "סמסטר ב׳",
      questionFile: "2022-y-question.pdf", solutionFile: "2022-y-solution.pdf",
      priority: "archive",
      aliases: ["מבחן Y - 2022_1.pdf", "course90929-year2022-semester2-moed2.pdf"],
      solutionAliases: ["פתרון Y - 2022_1.pdf"],
      questions: [
        item(R, "מנוע ומיתר חצי־אינסופי", ["מהירות גל", "כוח", "אנרגיה"]),
        item(A, "גל קול בצינור סופי", ["תנאי שפה", "אופנים אקוסטיים", "אנרגיה"]),
        item(T, "קו תמסורת אינסופי", ["אימפדנס", "ד׳אלמבר", "הספק"]),
        item(J, "צומת חשמלי והתאבכות גלי קול", ["החזרה והעברה", "שטף אנרגיה", "סופרפוזיציה"])
      ]
    },
    {
      key: "2022-s1-m1", year: 2022, label: "2022 · סמסטר א׳ · מועד א׳", period: "סמסטר א׳",
      questionFile: "2022-s1-m1-complete.pdf", solutionFile: "2022-s1-m1-complete.pdf",
      priority: "archive", embeddedSolution: true, aliases: [], solutionAliases: [],
      questions: [
        item(J, "פולס משולש בצומת: מהירויות, מקדמים ורוחבים", ["אימפדנס", "מקדם החזרה", "רוחב פולס"]),
        item(E, "שני פולסים מתנגשים: צורה, זמן ואנרגיה", ["סופרפוזיציה", "גלים חד־כיווניים", "אנרגיה"]),
        item(M, "גל אלקטרומגנטי מישורי מתוך השדה החשמלי", ["וקטור גל", "קיטוב", "שדה מגנטי"]),
        item(T, "קו תמסורת אינסופי מנתוני מתח וזרם", ["מהירות", "השראות", "ד׳אלמבר"])
      ]
    },
    {
      key: "2022-s1-m2", year: 2022, label: "2022 · סמסטר א׳ · מועד ב׳", period: "סמסטר א׳",
      questionFile: "2022-s1-m2-complete.pdf", solutionFile: "2022-s1-m2-complete.pdf",
      priority: "archive", embeddedSolution: true, aliases: [], solutionAliases: [],
      questions: [
        item(J, "פולס משולש במעבר בין שני מיתרים", ["מהירויות", "מקדמי מעבר", "שרטוט פולסים"]),
        item(M, "גל אלקטרומגנטי: תדר, אורך גל ואנרגיה", ["דיספרסיה בריק", "שדה מגנטי", "שטף אנרגיה"]),
        item(F, "מיתר רתום: אנרגיה והרמוניה ראשונה", ["שימור אנרגיה", "מקדם פורייה", "פאזה"]),
        item(T, "קו תמסורת אינסופי — פירוק לשני כיוונים", ["אימפדנס", "קבוע דיאלקטרי", "גלי מתח"])
      ]
    },
    {
      key: "2021-x", year: 2021, label: "2021 · שאלון X", period: "סמסטר ב׳",
      questionFile: "2021-x-question.pdf", solutionFile: "2021-x-solution.pdf",
      priority: "archive",
      aliases: ["מבחן X - 2021_1.pdf", "course90929-year2021-semester2-moed1.pdf"],
      solutionAliases: ["פתרון X - 2021_1.pdf"],
      questions: [
        item(T, "קו תמסורת מנתוני התחלה", ["ד׳אלמבר חשמלי", "מתח וזרם", "אנרגיה"]),
        item(A, "גלי קול מישוריים", ["לחץ", "מהירות חומרית", "שטף אנרגיה"]),
        item(F, "מיתר סופי רתום", ["אופנים", "מקדמי פורייה", "אנרגיה"]),
        item(J, "צומת במיתר וקו תמסורת אינסופי", ["יחס עכבות", "הספק", "גל חד־כיווני"])
      ]
    },
    {
      key: "2021-y", year: 2021, label: "2021 · שאלון Y", period: "סמסטר ב׳",
      questionFile: "2021-y-question.pdf", solutionFile: "2021-y-solution.pdf",
      priority: "archive",
      aliases: ["מבחן Y - 2021_1.pdf", "course90929-year2021-semester2-moed2.pdf"],
      solutionAliases: ["פתרון Y - 2021_1.pdf"],
      questions: [
        item(D, "מיתר אינסופי ותנאי התחלה כלליים", ["יחידות", "הספק", "ד׳אלמבר"]),
        item(A, "שני גלי קול מישוריים", ["לחץ ומהירות", "שטף אנרגיה", "כיוון ממוצע"]),
        item(T, "קו תמסורת סופי פתוח", ["אופנים", "אנרגיה", "תדירות"]),
        item(J, "פולס בצומת ושני גלים במיתר", ["החזרה והעברה", "הספק", "אנרגיה כוללת"])
      ]
    },
    {
      key: "2021-s1-m1", year: 2021, label: "2021 · סמסטר א׳ · מועד א׳", period: "סמסטר א׳",
      questionFile: "2021-s1-m1-complete.pdf", solutionFile: "2021-s1-m1-complete.pdf",
      priority: "archive", embeddedSolution: true, aliases: [], solutionAliases: [],
      questions: [
        item(F, "מיתר רתום: הרמוניה ראשונה, אנרגיה וחזרה בזמן", ["מקדמי פורייה", "אנרגיה", "מחזור"]),
        item(T, "פולס בקו תמסורת אינסופי", ["חד־כיווניות", "מתח וזרם", "אנרגיה דרך גלאי"]),
        item(A, "סופרפוזיציה של שני גלי קול", ["לחץ ומהירות", "צפיפות אנרגיה", "ממוצע בזמן"]),
        item(J, "יחס עכבות מהספק ושאלות נכונות/שגויות", ["יחס הספקים", "חד־כיווניות", "קשר מתח־זרם"])
      ]
    },
    {
      key: "2021-s1-m2", year: 2021, label: "2021 · סמסטר א׳ · מועד ב׳", period: "סמסטר א׳",
      questionFile: "2021-s1-m2-complete.pdf", solutionFile: "2021-s1-m2-complete.pdf",
      priority: "archive", embeddedSolution: true, aliases: [], solutionAliases: [],
      questions: [
        item(D, "מיתר אינסופי עם תנאי התחלה מעריכיים", ["הספק", "ד׳אלמבר", "תנאי לחד־כיווניות"]),
        item(T, "קו תמסורת סופי פתוח עם שני אופנים", ["מתח וזרם", "אנרגיה", "תדירות"]),
        item(A, "שני גלי קול ניצבים", ["לחץ ומהירות", "שטף אנרגיה", "כיוון ממוצע"]),
        item(J, "פולס בצומת ושני גלים במיתר", ["יחס עכבות", "הספק רגעי", "אנרגיה"])
      ]
    },
    {
      key: "2020-s2-m1", year: 2020, label: "2020 · סמסטר ב׳ · מועד א׳", period: "סמסטר ב׳",
      questionFile: "2020-s2-m1-complete.pdf", solutionFile: "2020-s2-m1-complete.pdf",
      priority: "archive", embeddedSolution: true, aliases: [], solutionAliases: [],
      questions: [
        item(D, "מיתר אינסופי: שחזור הגל וצפיפות אנרגיה", ["מהירות ועכבה", "פירוק לשני כיוונים", "אנרגיה"]),
        item(T, "קו תמסורת סופי מקוצר", ["הרמוניה שלישית", "אנרגיה", "חזרה בזמן"]),
        item(A, "סופרפוזיציה של גלי לחץ", ["אפיון גל", "מהירות חומרית", "צפיפות אנרגיה"]),
        item(J, "פולס חצי־מעגל בצומת ושאלות מושגיות", ["יחס עכבות", "צורת גלים", "סימן הספק"])
      ]
    },
    {
      key: "2020-s2-m2", year: 2020, label: "2020 · סמסטר ב׳ · מועד ב׳", period: "סמסטר ב׳",
      questionFile: "2020-s2-m2-complete.pdf", solutionFile: "2020-s2-m2-complete.pdf",
      priority: "archive", embeddedSolution: true, aliases: [], solutionAliases: [],
      questions: [
        item(F, "מיתר רתום: שני אופנים, אנרגיה והספק", ["מהירות ועכבה", "קביעת אמפליטודה", "הספק"]),
        item(T, "קו תמסורת אינסופי מנתוני התחלה", ["חד־כיווניות", "ד׳אלמבר", "אנרגיה"]),
        item(A, "גל קול מתוך שדה מהירות חומרית", ["אפיון גל", "לחץ", "שטף אנרגיה"]),
        item(J, "יחס עכבות ושאלות מושגיות", ["סימן החזרה", "יחס הספקים", "סופרפוזיציה"])
      ]
    },
    {
      key: "2020-s1-m1", year: 2020, label: "2020 · סמסטר א׳ · מועד א׳", period: "סמסטר א׳",
      questionFile: "2020-s1-m1-complete.pdf", solutionFile: "2020-s1-m1-complete.pdf",
      priority: "archive", embeddedSolution: true,
      aliases: ["course90929-year2020-semester1-moed1.pdf · עותק חלקי של שאלות 1–2"],
      solutionAliases: [],
      questions: [
        item(F, "מיתר סופי: אנרגיה, הרמוניה שלישית וחזרה בזמן", ["מקדמי פורייה", "זוגיות הרמוניות", "מחזור"]),
        item(T, "קו תמסורת אינסופי מנתוני מתח וזרם", ["פירוק לגלים", "אנרגיה", "שרטוט בזמן"]),
        item(A, "שני גלי קול בתווך אינסופי", ["לחץ ומהירות", "שטף אנרגיה", "צפיפות אנרגיה"]),
        item(M, "גלים אלקטרומגנטיים ויחס עכבות בצומת", ["שדות E ו־B", "סופרפוזיציה", "יחס הספקים"])
      ]
    }
  ];

  function esc(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function path(file) {
    return "assets/exams/" + file;
  }

  var openQuestions = [];
  exams.forEach(function (exam) {
    exam.questions.forEach(function (question, index) {
      var number = index + 1;
      var solutionText = exam.embeddedSolution
        ? "השאלון והפתרון נמצאים באותו PDF; הפתרון מופיע אחרי ארבע השאלות."
        : "הפתרון הרשמי נשמר כ־PDF נפרד. השווה רק לאחר ניסיון מלא על דף.";
      openQuestions.push({
        id: "EX-" + exam.key.toUpperCase() + "-Q" + number,
        examKey: exam.key,
        examYear: exam.year,
        questionNumber: number,
        cat: question.cat,
        difficulty: question.difficulty,
        skills: question.skills,
        origin: "archive",
        kind: "open",
        qtype: "analysis",
        sourceLabel: "מבחן " + exam.label + " · שאלה " + number + " · נוסח מקורי",
        sourceHref: path(exam.questionFile),
        prompt: "פתח את קובץ המקור ופתור במלואה את שאלה " + number + ": <b>" +
          esc(question.title) + "</b>.",
        hint: "לפני חישוב, רשום איזה מודל פיזיקלי מתאים ומהם תנאי ההתחלה או השפה. " +
          "המיומנויות המרכזיות כאן: " + esc(question.skills.join(" · ")) + ".",
        rule: "פתרון מלא צריך לכלול מודל, הצבה עם יחידות, בדיקת סימנים ותשובה לכל תת־סעיף.",
        why: "זהו כרטיס ניווט למבחן המקורי; נוסח השאלה, השרטוטים והמספרים נשמרו ב־PDF ללא ניסוח מחדש.",
        trap: "אל תסמן שהצלחת על סמך קריאת הפתרון. פתור קודם את כל תתי־הסעיפים ברצף.",
        html: '<div class="archive-task"><b>רשימת בדיקה:</b><ul><li>' +
          question.skills.map(function (skill) { return esc(skill); }).join("</li><li>") +
          '</li></ul></div><details class="sol"><summary>פתרון רשמי</summary>' +
          '<div class="body"><p>' + solutionText + '</p><p><a class="quiz-btn primary" ' +
          'href="' + path(exam.solutionFile) + '" target="_blank" rel="noopener">' +
          'פתח פתרון רשמי ב־PDF</a></p></div></details>'
      });
    });
  });

  window.EXAM_CATALOG = exams;
  window.EXAM_ARCHIVE_STATS = {
    sourcePdfFiles: 61,
    candidateQuestionnaires: 30,
    uniqueExams: exams.length,
    questions: openQuestions.length,
    canonicalPdfs: 32,
    aliasPdfs: 29
  };
  window.BANK_OPEN_QUESTIONS = (window.BANK_OPEN_QUESTIONS || []).concat(openQuestions);

  function examCard(exam) {
    var aliasCount = exam.aliases.length + exam.solutionAliases.length;
    var topics = exam.questions.map(function (question, index) {
      return '<li><b>' + (index + 1) + '.</b> ' + esc(question.title) + '</li>';
    }).join("");
    return '<article class="archive-card" data-year="' + exam.year + '" data-search="' +
      esc((exam.label + " " + exam.period + " " + exam.questions.map(function (q) {
        return q.title + " " + q.cat;
      }).join(" ")).toLowerCase()) + '">' +
      '<div class="archive-card-head"><div><span class="tag ' +
      (exam.priority === "core" ? "exam" : "generated") + '">' +
      (exam.priority === "core" ? "ליבת 2025–2026" : "תרגול ארכיון") + '</span>' +
      '<h3>' + esc(exam.label) + '</h3><small>' + esc(exam.period) +
      ' · 4 שאלות · פתרון מלא</small></div><b class="archive-year">' + exam.year + '</b></div>' +
      '<ol class="archive-topics">' + topics + '</ol>' +
      '<div class="archive-actions"><a class="quiz-btn primary" href="' +
      path(exam.questionFile) + '" target="_blank" rel="noopener">פתח שאלון</a>' +
      '<a class="quiz-btn" href="' + path(exam.solutionFile) +
      '" target="_blank" rel="noopener">פתח פתרון</a>' +
      '<a class="quiz-btn" href="#practice" data-practice-exam="' + exam.key +
      '">תרגל את 4 השאלות</a></div>' +
      (aliasCount ? '<details class="archive-alias"><summary>' + aliasCount +
        ' שמות/עותקים נוספים שאוחדו</summary><div>' +
        exam.aliases.concat(exam.solutionAliases).map(esc).join("<br>") +
        '</div></details>' : "") + '</article>';
  }

  window.mountExamArchive = function () {
    var root = document.getElementById("examArchiveGrid");
    var yearSelect = document.getElementById("archiveYear");
    var search = document.getElementById("archiveSearch");
    var count = document.getElementById("archiveVisibleCount");
    if (!root || !yearSelect || !search) return;

    root.innerHTML = exams.map(examCard).join("");
    Array.from(new Set(exams.map(function (exam) { return exam.year; })))
      .sort(function (a, b) { return b - a; })
      .forEach(function (year) {
        yearSelect.insertAdjacentHTML("beforeend", '<option value="' + year + '">' + year + '</option>');
      });

    function applyFilters() {
      var year = yearSelect.value;
      var query = search.value.trim().toLowerCase();
      var visible = 0;
      Array.prototype.forEach.call(root.querySelectorAll(".archive-card"), function (card) {
        var show = (!year || card.getAttribute("data-year") === year) &&
          (!query || card.getAttribute("data-search").indexOf(query) >= 0);
        card.hidden = !show;
        if (show) visible += 1;
      });
      if (count) count.textContent = visible + " מבחנים מוצגים";
    }

    yearSelect.addEventListener("change", applyFilters);
    search.addEventListener("input", applyFilters);
    root.addEventListener("click", function (event) {
      var link = event.target.closest("[data-practice-exam]");
      if (!link) return;
      var key = link.getAttribute("data-practice-exam");
      var selectedExam = exams.filter(function (exam) { return exam.key === key; })[0];
      var origin = document.getElementById("quizOrigin");
      var quizSearch = document.getElementById("quizSearch");
      if (origin) {
        origin.value = "archive";
        origin.dispatchEvent(new Event("change", { bubbles: true }));
      }
      if (quizSearch && selectedExam) {
        quizSearch.value = selectedExam.label;
        quizSearch.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });
    applyFilters();
  };
})();
