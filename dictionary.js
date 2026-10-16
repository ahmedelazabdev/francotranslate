/**
 * Franco <-> Arabic Comprehensive Conversion Engine
 * Includes 400+ Slang words, multi-token phrase resolution, and phonetic digraphs
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FrancoEngine = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  const FrancoDict = {
    francoToArWords: {
      "isa": "إن شاء الله",
      "inshallah": "إن شاء الله",
      "insha2allah": "إن شاء الله",
      "inshaallah": "إن شاء الله",
      "msa": "ما شاء الله",
      "mashallah": "ما شاء الله",
      "masha2allah": "ما شاء الله",
      "alhamdolelah": "الحمد لله",
      "el7amdolelah": "الحمد لله",
      "el7amdulellah": "الحمد لله",
      "el7mdullah": "الحمد لله",
      "elhamdullah": "الحمد لله",
      "el7amdulilah": "الحمد لله",
      "astaghferullah": "أستغفر الله",
      "subhanallah": "سبحان الله",
      "thx": "شكراً",
      "ty": "شكراً لك",
      "shokran": "شكراً",
      "4okran": "شكراً",
      "shokrn": "شكراً",
      "chokran": "شكراً",
      "mshkoor": "مشكور",
      "mashkoor": "مشكور",
      "wlc": "عفواً أهلاً بك",
      "pls": "من فضلك",
      "plz": "لو سمحت",
      "brb": "سأعود بعد قليل",
      "tc": "اعتن بنفسك",
      "gn": "تصبح على خير",
      "gm": "صباح الخير",
      "bb": "مع السلامة",
      "cu": "أراك لاحقاً",
      "cya": "أراك قريباً",
      "u2": "وأنت أيضاً",
      "idk": "لا أعلم",
      "tbh": "بصراحة",
      "omg": "يا إلهي",
      "lool": "ههههه",
      "lol": "ههههه",
      "rofl": "ههههه هلكت من الضحك",
      "asap": "في أسرع وقت",
      "btw": "بالمناسبة",
      "np": "لا مشكلة",
      "yw": "على الرحب والسعة",

      "el": "ال",
      "al": "ال",
      "il": "ال",
      "w": "و",
      "wa": "و",
      "fe": "في",
      "fy": "في",
      "fi": "في",
      "men": "من",
      "min": "من",
      "3la": "على",
      "3ala": "على",
      "3an": "عن",

      "sabah el kheer": "صباح الخير",
      "sabah el kheir": "صباح الخير",
      "sba7 el 5eer": "صباح الخير",
      "sba7 el kheer": "صباح الخير",
      "sabah el noor": "صباح النور",
      "sabah el nour": "صباح النور",
      "sba7 el noor": "صباح النور",
      "sabah el fool": "صباح الفل",
      "sba7 el fool": "صباح الفل",
      "mesa2 el kheer": "مساء الخير",
      "mesa2 el 5eer": "مساء الخير",
      "masa2 el kheer": "مساء الخير",
      "mesa2 el noor": "مساء النور",
      "el salam 3aleikom": "السلام عليكم",
      "elsalam 3alaykom": "السلام عليكم",
      "salamo 3aleikom": "السلام عليكم",
      "w 3aleikom el salam": "وعليكم السلام",
      "wa 3alaykom elsalam": "وعليكم السلام",
      "kol sana wenta tayeb": "كل سنة وأنت طيب",
      "kol sana wento tayebeen": "كل سنة وأنتم طيبين",
      "kol sana wnty tayba": "كل سنة وإنتي طيبة",
      "ramadan kareem": "رمضان كريم",
      "eid saeed": "عيد سعيد",
      "alf mabrook": "ألف مبروك",
      "rbna ma3ak": "ربنا معاك",
      "rbna ywafa2ak": "ربنا يوفقك",
      "rbna ye5aleek": "ربنا يخليك",
      "allah ye5aleek": "الله يخليك",
      "teslam edak": "تسلم إيدك",
      "kolo تمام": "كله تمام",
      "kolo tamam": "كله تمام",
      "3amel eh": "عامل إيه",
      "3amla eh": "عاملة إيه",
      "3amleen eh": "عاملين إيه",
      "a5barak eh": "أخبارك إيه",
      "akhbarak eh": "أخبارك إيه",
      "ya basha": "يا باشا",
      "ya sa7bi": "يا صاحبي",
      "ya 7abibi": "يا حبيبي",
      "ya 8aly": "يا غالي",
      "ya ghali": "يا غالي",

      "sba7": "صباح",
      "sabah": "صباح",
      "sbah": "صباح",
      "5eer": "خير",
      "kheer": "خير",
      "kheir": "خير",
      "noor": "نور",
      "nour": "نور",
      "fool": "فل",
      "fol": "فل",
      "yasmeen": "ياسمين",
      "ward": "ورد",
      "mesa2": "مساء",
      "masa2": "مساء",
      "masa": "مساء",
      "salam": "سلام",
      "slam": "سلام",
      "3afwan": "عفواً",
      "mar7aba": "مرحباً",
      "marhaba": "مرحباً",
      "ahlan": "أهلاً",
      "sahlan": "سهلاً",
      "ezayak": "إزيك",
      "ezayek": "إزيك",
      "ezayokom": "إزيكم",
      "ezayakom": "إزيكم",
      "3amel": "عامل",
      "3amla": "عاملة",
      "3amleen": "عاملين",
      "a5barak": "أخبارك",
      "akhbarak": "أخبارك",
      "a5barkom": "أخباركم",
      "kolo": "كله",
      "tamam": "تمام",
      "tmm": "تمام",
      "kol": "كل",
      "sana": "سنة",
      "wenta": "وأنت",
      "wenty": "وإنتي",
      "wento": "وأنتم",
      "tayeb": "طيب",
      "tayba": "طيبة",
      "tayebeen": "طيبين",
      "mabrook": "مبروك",
      "rbna": "ربنا",
      "rabbena": "ربنا",
      "rabena": "ربنا",
      "teslam": "تسلم",
      "tslam": "تسلم",
      "ana": "أنا",
      "enta": "إنت",
      "enty": "إنتي",
      "howa": "هو",
      "heya": "هي",
      "e7na": "إحنا",
      "ehna": "إحنا",
      "entoo": "إنتوا",
      "ento": "إنتوا",
      "homma": "هما",
      "eh": "إيه",
      "eah": "إيه",
      "feen": "فين",
      "fain": "فين",
      "leh": "ليه",
      "leih": "ليه",
      "ezay": "إزاي",
      "meen": "مين",
      "emta": "إمتى",
      "kam": "كام",
      "keda": "كده",
      "kda": "كده",
      "bgd": "بجد",
      "mashi": "ماشي",
      "ma4y": "ماشي",
      "bas": "بس",
      "bass": "بس",
      "wala": "ولا",
      "bardo": "برضه",
      "bardoo": "برضه",
      "kaman": "كمان",
      "awy": "أوي",
      "awyy": "أوي",
      "gedan": "جداً",
      "5ales": "خالص",
      "khales": "خالص",
      "kwayes": "كويس",
      "aslan": "أصلاً",
      "dayman": "دايماً",
      "3ashan": "عشان",
      "3lshan": "علشان",
      "3alashan": "علشان",
      "tab": "طب",
      "tb": "طب",
      "yalla": "يلا",
      "7ader": "حاضر",
      "la2": "لأ",
      "la": "لا",
      "ah": "آه",
      "aywa": "أيوه",
      "bokra": "بكرة",
      "embare7": "إمبارح",
      "embareh": "إمبارح",
      "enaharda": "النهاردة",
      "elnaharda": "النهاردة",
      "delwa2ty": "دلوقتي",
      "ba3deen": "بعدين",
      "shwaya": "شوية",
      "kteer": "كتير",
      "keteer": "كتير",
      "soghayar": "صغير",
      "kbeer": "كبير",
      "7abibi": "حبيبي",
      "habibi": "حبيبي",
      "7abebty": "حبيبتي",
      "7ayati": "حياتي",
      "ro7i": "روحي",
      "alby": "قلبي",
      "2albi": "قلبي",
      "ba7ebak": "بحبك",
      "ba7bek": "بحبك",
      "wa7ashtny": "وحشتني",
      "wa7ashteny": "وحشتني",
      "basha": "باشا",
      "sa7bi": "صاحبي",
      "sa7by": "صاحبي",
      "a5oya": "أخويا",
      "o5ty": "أختي",
      "baba": "بابا",
      "mama": "ماما",
      "shoghl": "شغل",
      "shoghle": "شغلي",
      "shoghli": "شغلي",
      "4o8l": "شغل",
      "makan": "مكان",
      "beit": "بيت",
      "msh": "مش",
      "mesh": "مش",
      "sa7": "صح",
      "ghalat": "غلط",
      "3andy": "عندي",
      "3andak": "عندك",
      "3ando": "عنده",
      "fekrah": "فكرة",
      "fikra": "فكرة",
      "tab3an": "طبعاً",
      "tb3n": "طبعاً",
      "fehemt": "فهمت",
      "fahmak": "فاهمك",
      "kalam": "كلام",
      "soora": "صورة",
      "vedio": "فيديو",
      "video": "فيديو",
      "telefoon": "تليفون",
      "raqam": "رقم",
      "7aga": "حاجة",
      "7agat": "حاجات",
      "ay": "أي",
      "ma3ak": "معاك",
      "m3ak": "معاك",
      "ma3aya": "معايا",
      "m3aya": "معايا",
      "yareet": "يا ريت",
      "7elo": "حلو",
      "7elwa": "حلوة",
      "gamed": "جامد",
      "gamda": "جامدة",
      "sa3a": "ساعة",
      "yom": "يوم",
      "shahr": "شهر",
      "sob7": "صبح",
      "leil": "ليل",
      "akeed": "أكيد"
    },

    arToFrancoWords: {
      "شكرا": "shokran",
      "شكراً": "shokran",
      "عفوا": "3afwan",
      "عفواً": "3afwan",
      "صباح الخير": "sabah el kheer",
      "صباح النور": "sabah el noor",
      "صباح الفل": "sabah el fool",
      "مساء الخير": "mesa2 el kheer",
      "مساء النور": "mesa2 el noor",
      "السلام عليكم": "el salam 3aleikom",
      "وعليكم السلام": "w 3aleikom el salam",
      "إن شاء الله": "inshallah",
      "ان شاء الله": "inshallah",
      "ما شاء الله": "mashallah",
      "الحمد لله": "el7amdulellah",
      "الحمدلله": "el7amdulellah",
      "إزيك": "ezayak",
      "ازيك": "ezayak",
      "إزيكم": "ezayokom",
      "ازيكم": "ezayokom",
      "عامل إيه": "3amel eh",
      "عامل ايه": "3amel eh",
      "عاملة إيه": "3amla eh",
      "عاملين إيه": "3amleen eh",
      "أخبارك إيه": "a5barak eh",
      "اخبارك ايه": "a5barak eh",
      "كله تمام": "kolo tamam",
      "تمام": "tamam",
      "ماشي": "mashi",
      "كويس": "kwayes",
      "بجد": "bgd",
      "أنا": "ana",
      "انا": "ana",
      "إنت": "enta",
      "انت": "enta",
      "إنتي": "enty",
      "انتي": "enty",
      "هو": "howa",
      "هي": "heya",
      "إحنا": "e7na",
      "احنا": "e7na",
      "إنتوا": "entoo",
      "انتوا": "entoo",
      "هما": "homma",
      "إيه": "eh",
      "ايه": "eh",
      "فين": "feen",
      "ليه": "leh",
      "إزاي": "ezay",
      "ازاي": "ezay",
      "مين": "meen",
      "إمتى": "emta",
      "امتى": "emta",
      "كام": "kam",
      "كده": "keda",
      "علشان": "3alashan",
      "عشان": "3ashan",
      "بس": "bas",
      "ولا": "wala",
      "برضه": "bardo",
      "كمان": "kaman",
      "أوي": "awy",
      "جدا": "gedan",
      "جداً": "gedan",
      "خالص": "5ales",
      "أصلا": "aslan",
      "أصلاً": "aslan",
      "دايما": "dayman",
      "دايماً": "dayman",
      "طب": "tab",
      "طيب": "tayeb",
      "يلا": "yalla",
      "حاضر": "7ader",
      "لأ": "la2",
      "لا": "la",
      "آه": "ah",
      "أيوه": "aywa",
      "ايوه": "aywa",
      "بكرة": "bokra",
      "إمبارح": "embare7",
      "امبارح": "embare7",
      "النهاردة": "enaharda",
      "دلوقتي": "delwa2ty",
      "بعدين": "ba3deen",
      "شوية": "shwaya",
      "كتير": "kteer",
      "حبيبي": "7abibi",
      "حياتي": "7ayati",
      "روحي": "ro7i",
      "قلبي": "2albi",
      "بحبك": "ba7ebak",
      "وحشتني": "wa7ashtny",
      "يا باشا": "ya basha",
      "يا صاحبي": "ya sa7by",
      "صاحبي": "sa7bi",
      "أخويا": "a5oya",
      "اخويا": "a5oya",
      "أختي": "o5ty",
      "اختي": "o5ty",
      "بابا": "baba",
      "ماما": "mama",
      "كل سنة وأنت طيب": "kol sana wenta tayeb",
      "كل سنة وانت طيب": "kol sana wenta tayeb",
      "كل سنة وانتم طيبين": "kol sana wento tayebeen",
      "ألف مبروك": "alf mabrook",
      "مبروك": "mabrook",
      "ربنا معاك": "rbna ma3ak",
      "ربنا يوفقك": "rbna ywafa2ak",
      "ربنا يخليك": "rbna ye5aleek",
      "ربنا": "rbna",
      "معاك": "ma3ak",
      "معايا": "ma3aya",
      "تسلم": "teslam",
      "مكان": "makan",
      "شغل": "shoghl",
      "شغلي": "shoghli",
      "مش": "msh",
      "صح": "sa7",
      "غلط": "ghalat",
      "عندي": "3andy",
      "عندك": "3andak",
      "فكرة": "fekrah",
      "طبعا": "tab3an",
      "طبعاً": "tab3an",
      "فاهمك": "fahmak",
      "كلام": "kalam",
      "صورة": "soora",
      "فيديو": "video",
      "حاجة": "7aga",
      "حاجات": "7agat",
      "صباح": "sabah",
      "الخير": "el kheer",
      "النور": "el noor",
      "الفل": "el fool",
      "مساء": "mesa2",
      "سنة": "sana",
      "كل": "kol"
    }
  };

  const Digraphs = [
    { p: "3'", r: "غ" },
    { p: "6'", r: "ظ" },
    { p: "7'", r: "خ" },
    { p: "9'", r: "ض" },
    { p: "2'", r: "ء" },
    { p: "kh", r: "خ" },
    { p: "sh", r: "ش" },
    { p: "ch", r: "ش" },
    { p: "th", r: "ث" },
    { p: "gh", r: "غ" },
    { p: "dh", r: "ذ" },
    { p: "zh", r: "ظ" },
    { p: "ph", r: "ف" },
    { p: "ou", r: "و" },
    { p: "oo", r: "و" },
    { p: "ee", r: "ي" },
    { p: "aa", r: "ا" }
  ];

  const FrancoSingleChar = {
    "2": "ء",
    "3": "ع",
    "4": "ش",
    "5": "خ",
    "6": "ط",
    "7": "ح",
    "8": "ق",
    "9": "ص",
    "a": "ا",
    "b": "ب",
    "c": "ك",
    "d": "د",
    "e": "ي",
    "f": "ف",
    "g": "ج",
    "h": "ه",
    "i": "ي",
    "j": "ج",
    "k": "ك",
    "l": "ل",
    "m": "م",
    "n": "ن",
    "o": "و",
    "p": "ب",
    "q": "ق",
    "r": "ر",
    "s": "س",
    "t": "ت",
    "u": "و",
    "v": "ف",
    "w": "و",
    "x": "اكس",
    "y": "ي",
    "z": "ز"
  };

  const ArToFrancoMap = {
    "ع": "3",
    "غ": "3'",
    "ح": "7",
    "خ": "5",
    "ط": "6",
    "ظ": "6'",
    "ص": "9",
    "ض": "9'",
    "ق": "8",
    "ء": "2",
    "أ": "2",
    "إ": "2",
    "آ": "2",
    "ؤ": "2",
    "ئ": "2",
    "ش": "sh",
    "ث": "th",
    "ذ": "th",
    "ب": "b",
    "ت": "t",
    "ة": "a",
    "ج": "g",
    "د": "d",
    "ر": "r",
    "ز": "z",
    "س": "s",
    "ف": "f",
    "ك": "k",
    "ل": "l",
    "م": "m",
    "ن": "n",
    "ه": "h",
    "و": "w",
    "ي": "y",
    "ى": "a",
    "ا": "a"
  };

  class Engine {
    constructor() {}

    static detectLanguage(text) {
      if (!text || !text.trim()) return "empty";
      const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/g;
      const arabicMatches = text.match(arabicRegex) || [];
      const latinMatches = text.match(/[a-zA-Z]/g) || [];
      const numberMatches = text.match(/[23456789]/g) || [];

      const arabicScore = arabicMatches.length;
      const francoScore = latinMatches.length + (numberMatches.length * 0.7);

      return (arabicScore >= francoScore) ? "ar" : "franco";
    }

    phoneticFrancoWord(word) {
      if (!word) return "";
      let clean = word.toLowerCase().trim();

      if (FrancoDict.francoToArWords[clean]) {
        return FrancoDict.francoToArWords[clean];
      }

      // Handle attached prefix "el" / "al"
      let prefix = "";
      if ((clean.startsWith("el") || clean.startsWith("al")) && clean.length > 3) {
        prefix = "ال";
        clean = clean.slice(2);
        if (FrancoDict.francoToArWords[clean]) {
          return prefix + FrancoDict.francoToArWords[clean];
        }
      }

      let working = clean;
      for (const d of Digraphs) {
        const reg = new RegExp(d.p, "gi");
        working = working.replace(reg, d.r);
      }

      let result = [];
      const len = working.length;
      for (let i = 0; i < len; i++) {
        const ch = working[i];
        if (FrancoSingleChar[ch]) {
          if (i === 0 && ch === '2') {
            result.push("أ");
          } else if (i === 0 && ch === 'a') {
            result.push("ا");
          } else if (i === len - 1 && (ch === 'a' || ch === 'h') && result.length >= 2) {
            result.push("ة");
          } else {
            result.push(FrancoSingleChar[ch]);
          }
        } else {
          result.push(ch);
        }
      }

      return prefix + result.join("");
    }

    francoToArabic(text) {
      if (!text) return "";
      const rawTokens = text.split(/([ \t\n\r,.!?،؟;:"'()\[\]{}]+)/);
      const n = rawTokens.length;
      let i = 0;
      const output = [];

      while (i < n) {
        const token = rawTokens[i];
        if (/^[ \t\n\r,.!?،؟;:"'()\[\]{}]+$/.test(token)) {
          output.push(token);
          i++;
          continue;
        }

        // Multi-word phrase check (greedy 4 to 2 words)
        let matched = false;
        for (let wordCount = 4; wordCount >= 2; wordCount--) {
          let phraseWords = [];
          let valid = true;
          let curIdx = i;

          for (let w = 0; w < wordCount; w++) {
            if (curIdx >= n) { valid = false; break; }
            phraseWords.push(rawTokens[curIdx].toLowerCase().trim());
            if (w < wordCount - 1) {
              curIdx++;
              if (curIdx >= n || !/^[ \t]+$/.test(rawTokens[curIdx])) {
                valid = false;
                break;
              }
              curIdx++;
            }
          }

          if (valid) {
            const phraseStr = phraseWords.join(" ");
            if (FrancoDict.francoToArWords[phraseStr]) {
              output.push(FrancoDict.francoToArWords[phraseStr]);
              i = curIdx + 1;
              matched = true;
              break;
            }
          }
        }

        if (!matched) {
          output.push(this.phoneticFrancoWord(token));
          i++;
        }
      }

      return output.join("");
    }

    phoneticArabicWord(word, options = {}) {
      if (!word) return "";
      const clean = word.trim();
      if (FrancoDict.arToFrancoWords[clean]) {
        return FrancoDict.arToFrancoWords[clean];
      }

      let out = "";
      let startIndex = 0;
      if (clean.startsWith("ال") && clean.length > 2) {
        out += "el ";
        startIndex = 2;
      }

      for (let i = startIndex; i < clean.length; i++) {
        const ch = clean[i];
        if (ArToFrancoMap[ch]) {
          let mapped = ArToFrancoMap[ch];
          if (options.useClassicPhonetics) {
            if (mapped === "3") mapped = "aa";
            else if (mapped === "3'") mapped = "gh";
            else if (mapped === "7") mapped = "h";
            else if (mapped === "5") mapped = "kh";
            else if (mapped === "6") mapped = "t";
            else if (mapped === "6'") mapped = "z";
            else if (mapped === "9") mapped = "s";
            else if (mapped === "9'") mapped = "d";
            else if (mapped === "8") mapped = "q";
            else if (mapped === "2") mapped = "a";
          }
          out += mapped;
        } else {
          out += ch;
        }
      }

      return out;
    }

    arabicToFranco(text, options = {}) {
      if (!text) return "";
      const rawTokens = text.split(/([ \t\n\r,.!?،؟;:"'()\[\]{}]+)/);
      const n = rawTokens.length;
      let i = 0;
      const output = [];

      while (i < n) {
        const token = rawTokens[i];
        if (/^[ \t\n\r,.!?،؟;:"'()\[\]{}]+$/.test(token)) {
          output.push(token);
          i++;
          continue;
        }

        let matched = false;
        for (let wordCount = 4; wordCount >= 2; wordCount--) {
          let phraseWords = [];
          let valid = true;
          let curIdx = i;

          for (let w = 0; w < wordCount; w++) {
            if (curIdx >= n) { valid = false; break; }
            phraseWords.push(rawTokens[curIdx].trim());
            if (w < wordCount - 1) {
              curIdx++;
              if (curIdx >= n || !/^[ \t]+$/.test(rawTokens[curIdx])) {
                valid = false;
                break;
              }
              curIdx++;
            }
          }

          if (valid) {
            const phraseStr = phraseWords.join(" ");
            if (FrancoDict.arToFrancoWords[phraseStr]) {
              output.push(FrancoDict.arToFrancoWords[phraseStr]);
              i = curIdx + 1;
              matched = true;
              break;
            }
          }
        }

        if (!matched) {
          output.push(this.phoneticArabicWord(token, options));
          i++;
        }
      }

      return output.join("");
    }

    autoTranslate(text, mode = "auto", options = {}) {
      if (!text) return { direction: "franco-to-ar", result: "" };
      let dir = mode;
      if (mode === "auto") {
        dir = (Engine.detectLanguage(text) === "ar") ? "ar-to-franco" : "franco-to-ar";
      }

      if (dir === "franco-to-ar") {
        return {
          direction: "franco-to-ar",
          result: this.francoToArabic(text)
        };
      } else {
        return {
          direction: "ar-to-franco",
          result: this.arabicToFranco(text, options)
        };
      }
    }
  }

  return Engine;
}));
