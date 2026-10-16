/**
 * Franco-Arabic Smart Dictionary & Phonetic Mapping Rules
 * يحتوي على قاموس موسع للكلمات الشائعة وقواعد التحويل الصوتي ثنائي الاتجاه
 */

const FrancoDictionary = {
  // قاموس الكلمات والعبارات الشائعة (فرانكو -> عربي)
  wordMap: {
    // أدوات التعريف والحروف المستقلة
    "el": "ال",
    "al": "ال",
    "w": "و",
    "wa": "و",
    "5er": "خير",
    "kher": "خير",
    "kheir": "خير",
    "kheer": "خير",
    "7aga": "حاجة",
    "haga": "حاجة",
    "she2": "شيء",
    "shee2": "شيء",
    "kol": "كل",
    "bet": "بيت",
    "elbet": "البيت",
    "m3ana": "معانا",
    "ma3ana": "معانا",
    "dayman": "دايماً",
    "daeman": "دايماً",
    "gedan": "جداً",
    "gdn": "جداً",
    "sa7": "صح",
    "8alat": "غلط",
    "ghalat": "غلط",
    "lelah": "لله",
    "lillah": "لله",
    "b5er": "بخير",
    "b5eir": "بخير",
    "bkheer": "بخير",
    "bkheir": "بخير",

    // التحيات والمجاملات
    "sba7": "صباح",
    "sbah": "صباح",
    "sabah": "صباح",
    "el5er": "الخير",
    "el5eir": "الخير",
    "elkheer": "الخير",
    "elkheir": "الخير",
    "elkher": "الخير",
    "el5ir": "الخير",
    "msa2": "مساء",
    "msaa": "مساء",
    "mesa2": "مساء",
    "elnoor": "النور",
    "elnor": "النور",
    "elnour": "النور",
    "elward": "الورد",
    "elfol": "الفل",
    "elkashta": "القشطة",
    "ezayak": "ازيك",
    "ezayek": "ازيك",
    "ezayoko": "ازيكم",
    "ezayeko": "ازيكم",
    "3amel": "عامل",
    "3amla": "عاملة",
    "3amleen": "عاملين",
    "eh": "ايه",
    "a": "ايه",
    "a5barak": "اخبارك",
    "a5barek": "اخبارك",
    "a5barko": "اخباركم",
    "akhbarak": "اخبارك",
    "akhbarek": "اخبارك",
    "akhbarko": "اخباركم",
    "shokran": "شكرا",
    "chokran": "شكرا",
    "choukran": "شكرا",
    "shukran": "شكرا",
    "merci": "ميرسي",
    "3afwan": "عفوا",
    "el3afw": "العفو",
    "el3afoo": "العفو",
    "tamam": "تمام",
    "tmm": "تمام",
    "kwayes": "كويس",
    "kwayesa": "كويسة",
    "kwayseen": "كويسين",
    "kways": "كويس",
    "alhamdolelah": "الحمد لله",
    "elhamdolelah": "الحمد لله",
    "el7amdulelah": "الحمد لله",
    "el7amdelah": "الحمد لله",
    "el7amdellah": "الحمد لله",
    "el7amdulillah": "الحمد لله",
    "al7amdulillah": "الحمد لله",
    "7amdelah": "حمد لله",
    "alf": "ألف",
    "salama": "سلامة",
    "salamtak": "سلامتك",
    "salamtek": "سلامتك",
    "allah": "الله",
    "rabena": "ربنا",
    "ya": "يا",
    "rab": "رب",
    "yarab": "يارب",
    "inshallah": "إن شاء الله",
    "insha2allah": "إن شاء الله",
    "encha2lah": "إن شاء الله",
    "inchalah": "إن شاء الله",
    "mashallah": "ما شاء الله",
    "masha2allah": "ما شاء الله",
    "walahy": "والله",
    "wallahy": "والله",
    "walahi": "والله",

    // المشاعر والعلاقات
    "7abibi": "حبيبي",
    "habibi": "حبيبي",
    "7abebty": "حبيبتي",
    "habebty": "حبيبتي",
    "7abibty": "حبيبتي",
    "ba7ebak": "بحبك",
    "ba7ebek": "بحبك",
    "ba7eboko": "بحبكم",
    "bahebak": "بحبك",
    "bahebek": "بحبك",
    "wa7ashtny": "وحشتني",
    "wa7shtny": "وحشتني",
    "wa7ashtini": "وحشتيني",
    "wahashny": "وحشني",
    "wahshtny": "وحشتني",
    "ro7y": "روحي",
    "3omry": "عمري",
    "alby": "قلبي",
    "2alby": "قلبي",
    "hyaty": "حياتي",
    "7yaty": "حياتي",

    // أدوات الاستفهام والأفعال الشائعة
    "feen": "فين",
    "fen": "فين",
    "fayn": "فين",
    "leh": "ليه",
    "laih": "ليه",
    "lyh": "ليه",
    "emta": "امتى",
    "2emta": "امتى",
    "meen": "مين",
    "men": "مين",
    "ezay": "ازاي",
    "ezy": "ازاي",
    "bekam": "بكام",
    "kam": "كام",
    "msh": "مش",
    "mesh": "مش",
    "moch": "مش",
    "la": "لا",
    "la2": "لأ",
    "ah": "اه",
    "aiwa": "ايوه",
    "aywa": "أيوه",
    "na3am": "نعم",
    "keda": "كده",
    "kda": "كده",
    "kedah": "كده",
    "bardoo": "برضو",
    "bardo": "برضو",
    "bardoh": "برضو",
    "aslan": "أصلاً",
    "2aslan": "أصلاً",
    "tab": "طب",
    "tayeb": "طيب",
    "tayeba": "طيبة",
    "yalla": "يلا",
    "bos": "بص",
    "bosi": "بصي",
    "shof": "شوف",
    "shoof": "شوف",
    "esma3": "اسمع",
    "ta3ala": "تعالى",
    "ta3aly": "تعالي",
    "ta3alo": "تعالوا",
    "ro7": "روح",
    "e3mel": "اعمل",
    "e3mely": "اعملي",
    "khalas": "خلاص",
    "5alas": "خلاص",
    "5lst": "خلصت",
    "lesa": "لسه",
    "lessa": "لسه",
    "delw2ty": "دلوقتي",
    "delwa2ty": "دلوقتي",
    "dlo2ty": "دلوقتي",
    "delwa2ti": "دلوقتي",
    "ba3deen": "بعدين",
    "bokra": "بكره",
    "bokrah": "بكره",
    "enharda": "النهاردة",
    "ennharda": "النهاردة",
    "embare7": "امبارح",
    "bara": "بره",
    "gowa": "جوه",
    "fo2": "فوق",
    "ta7t": "تحت",
    "ganb": "جنب",
    "wara": "ورا",
    "odam": "قدام",
    "2odam": "قدام",

    // ضمائر وأشخاص
    "ana": "أنا",
    "enta": "انت",
    "enty": "انتي",
    "ento": "انتو",
    "howa": "هو",
    "heya": "هي",
    "homa": "هما",
    "e7na": "احنا",
    "we7na": "واحنا",
    "wenta": "وانت",
    "wenty": "وانتي",
    "sa7by": "صاحبي",
    "sa7bty": "صاحبتي",
    "so7aby": "صحابي",
    "o5ty": "اختي",
    "okhty": "اختي",
    "a5oya": "أخويا",
    "akhoya": "أخويا",
    "aboya": "أبويا",
    "omy": "أمي",
    "mama": "ماما",
    "baba": "بابا",

    // كلمات ومصطلحات شائعة في الشات
    "shoghl": "شغل",
    "sho8l": "شغل",
    "choghl": "شغل",
    "gamed": "جامد",
    "gamda": "جامدة",
    "7elw": "حلو",
    "7elwa": "حلوة",
    "helw": "حلو",
    "helwa": "حلوة",
    "teslam": "تسلم",
    "tslam": "تسلم",
    "teslamy": "تسلمي",
    "mabrouk": "مبروك",
    "mabrook": "مبروك",
    "so2al": "سؤال",
    "fekra": "فكرة",
    "moshkela": "مشكلة",
    "moshkila": "مشكلة",
    "mohem": "مهم",
    "akeed": "أكيد",
    "akid": "أكيد",
    "tab3an": "طبعا",
    "tb3n": "طبعا",
    "gad": "جد",
    "begad": "بجد",
    "fash5": "فشخ",
    "awy": "أوي",
    "keteer": "كتير",
    "kteer": "كتير",
    "shwaya": "شوية",
    "shwayah": "شوية",
    "bas": "بس",
    "wala": "ولا",
    "wla": "ولا",
    "aw": "أو",
    "laken": "لكن",
    "lakin": "لكن",
    "3ashan": "عشان",
    "3shan": "عشان",
    "3ala": "على",
    "3la": "على",
    "fe": "في",
    "fi": "في",
    "ma3a": "مع",
    "ma3ak": "معاك",
    "ma3aya": "معايا",
    "3andy": "عندي",
    "3andak": "عندك",
    "3andek": "عندك",
    "mafeesh": "مفيش",
    "mafish": "مفيش",
    "fee": "فيه",
    "feeh": "فيه",

    // سوشيال ومصطلحات رقمية
    "post": "بوست",
    "share": "شير",
    "like": "لايك",
    "comment": "كومنت",
    "message": "رسالة",
    "call": "مكالمة",
    "nemra": "نمرة",
    "raqam": "رقم",
    "ra2am": "رقم",
    "link": "لينك",
    "group": "جروب"
  },

  // جدول الحروف والأرقام الفرانكو مع الحروف المركبة
  francoToArRules: [
    { f: "kh", a: "خ" },
    { f: "gh", a: "غ" },
    { f: "sh", a: "ش" },
    { f: "ch", a: "ش" },
    { f: "th", a: "ث" },
    { f: "dh", a: "ض" },
    { f: "ph", a: "ف" },
    { f: "3'", a: "غ" },
    { f: "6'", a: "ظ" },
    { f: "7'", a: "خ" },
    { f: "9'", a: "ض" },
    { f: "2'", a: "ء" },
    
    // الأرقام المميزة للفرانكو
    { f: "2", a: "أ" },
    { f: "3", a: "ع" },
    { f: "4", a: "ش" },
    { f: "5", a: "خ" },
    { f: "6", a: "ط" },
    { f: "7", a: "ح" },
    { f: "8", a: "ق" },
    { f: "9", a: "ص" },
    
    // الحروف الأبجدية المفردة
    { f: "a", a: "ا" },
    { f: "b", a: "ب" },
    { f: "c", a: "ك" },
    { f: "d", a: "د" },
    { f: "e", a: "ي" },
    { f: "f", a: "ف" },
    { f: "g", a: "ج" },
    { f: "h", a: "ه" },
    { f: "i", a: "ي" },
    { f: "j", a: "ج" },
    { f: "k", a: "ك" },
    { f: "l", a: "ل" },
    { f: "m", a: "م" },
    { f: "n", a: "ن" },
    { f: "o", a: "و" },
    { f: "p", a: "ب" },
    { f: "q", a: "ق" },
    { f: "r", a: "ر" },
    { f: "s", a: "س" },
    { f: "t", a: "ت" },
    { f: "u", a: "و" },
    { f: "v", a: "ف" },
    { f: "w", a: "و" },
    { f: "x", a: "اكس" },
    { f: "y", a: "ي" },
    { f: "z", a: "ز" }
  ],

  // تحويل العربي إلى فرانكو
  arToFrancoRules: [
    { a: "ء", f: "2" },
    { a: "أ", f: "2" },
    { a: "إ", f: "2" },
    { a: "آ", f: "2a" },
    { a: "ا", f: "a" },
    { a: "ب", f: "b" },
    { a: "ت", f: "t" },
    { a: "ة", f: "a" },
    { a: "ث", f: "th" },
    { a: "ج", f: "g" },
    { a: "ح", f: "7" },
    { a: "خ", f: "5" },
    { a: "د", f: "d" },
    { a: "ذ", f: "z" },
    { a: "ر", f: "r" },
    { a: "ز", f: "z" },
    { a: "س", f: "s" },
    { a: "ش", f: "sh" },
    { a: "ص", f: "9" },
    { a: "ض", f: "9'" },
    { a: "ط", f: "6" },
    { a: "ظ", f: "6'" },
    { a: "ع", f: "3" },
    { a: "غ", f: "gh" },
    { a: "ف", f: "f" },
    { a: "ق", f: "2" },
    { a: "ك", f: "k" },
    { a: "ل", f: "l" },
    { a: "م", f: "m" },
    { a: "ن", f: "n" },
    { a: "ه", f: "h" },
    { a: "و", f: "w" },
    { a: "ي", f: "y" },
    { a: "ى", f: "a" }
  ]
};

// بناء قاموس عكسي (عربي -> فرانكو)
FrancoDictionary.reverseWordMap = {};
for (const [franco, ar] of Object.entries(FrancoDictionary.wordMap)) {
  if (!FrancoDictionary.reverseWordMap[ar]) {
    FrancoDictionary.reverseWordMap[ar] = franco;
  }
}

// قاموس العبارات والجمل المتكاملة
FrancoDictionary.phraseMap = [
  { f: /sba7\s+(?:el\s*5er|el\s*kheir|el\s*kher|el\s*5eir)/gi, a: "صباح الخير" },
  { f: /sbah\s+(?:el\s*5er|el\s*kheir|el\s*kher|el\s*5eir)/gi, a: "صباح الخير" },
  { f: /msa2\s+(?:el\s*5er|el\s*kheir|el\s*kher|el\s*5eir)/gi, a: "مساء الخير" },
  { f: /msaa\s+(?:el\s*5er|el\s*kheir|el\s*kher|el\s*5eir)/gi, a: "مساء الخير" },
  { f: /(?:el\s*7amdelah|el\s*7amdulelah|el\s*hamdulelah|al\s*hamdulelah|el\s*7amd\s*lelah)/gi, a: "الحمد لله" },
  { f: /(?:in\s*sha2\s*allah|in\s*sha2\s*llah|in\s*sha\s*allah|inshallah|encha2lah)/gi, a: "إن شاء الله" },
  { f: /(?:ma\s*sha2\s*allah|ma\s*sha\s*allah|mashallah)/gi, a: "ما شاء الله" },
  { f: /kol\s+sana\s+wenta\s+tayeb/gi, a: "كل سنة وانت طيب" },
  { f: /kol\s+sana\s+wenty\s+tayeba/gi, a: "كل سنة وانتي طيبة" },
  { f: /alf\s+(?:mabrook|mabrouk|mbrouk)/gi, a: "ألف مبروك" },
  { f: /3amel\s+eh/gi, a: "عامل ايه" },
  { f: /3amla\s+eh/gi, a: "عاملة ايه" },
  { f: /3amleen\s+eh/gi, a: "عاملين ايه" },
  { f: /kol\s+7aga/gi, a: "كل حاجة" },
  { f: /ya\s+7abibi/gi, a: "يا حبيبي" },
  { f: /ya\s+sa7by/gi, a: "يا صاحبي" }
];

FrancoDictionary.reversePhraseMap = [
  { a: /صباح الخير/g, f: "sba7 el 5er" },
  { a: /مساء الخير/g, f: "msa2 el 5er" },
  { a: /الحمد لله/g, f: "el7amdelah" },
  { a: /إن شاء الله/g, f: "inshallah" },
  { a: /ان شاء الله/g, f: "inshallah" },
  { a: /ما شاء الله/g, f: "mashallah" },
  { a: /كل سنة وانت طيب/g, f: "kol sana wenta tayeb" },
  { a: /كل سنة وانتي طيبة/g, f: "kol sana wenty tayeba" },
  { a: /ألف مبروك/g, f: "alf mabrook" },
  { a: /الف مبروك/g, f: "alf mabrook" },
  { a: /عامل ايه/g, f: "3amel eh" },
  { a: /عاملة ايه/g, f: "3amla eh" },
  { a: /عاملين ايه/g, f: "3amleen eh" },
  { a: /كل حاجة/g, f: "kol 7aga" },
  { a: /يا حبيبي/g, f: "ya 7abibi" },
  { a: /يا صاحبي/g, f: "ya sa7by" }
];

// دالة تنظيف النص والحفاظ على علامات الترقيم
function tokenize(text) {
  return text.split(/([ \n\t.,!؟?()[\]{}:;'"/\\]+)/);
}

// محرك الترجمة الذكي: فرانكو -> عربي
function translateFrancoToAr(text, customRules = {}) {
  if (!text) return "";
  
  // تطبيق العبارات المركبة أولاً
  let processed = text;
  for (const item of FrancoDictionary.phraseMap) {
    processed = processed.replace(item.f, item.a);
  }

  const mergedDict = { ...FrancoDictionary.wordMap, ...customRules };
  const tokens = tokenize(processed);

  return tokens.map(token => {
    if (!token || /^[ \n\t.,!؟?()[\]{}:;'"/\\]+$/.test(token)) {
      return token;
    }

    const cleanToken = token.toLowerCase();

    // 1. هل الكلمة مطابقة مباشرة في القاموس؟
    if (mergedDict[cleanToken]) {
      return mergedDict[cleanToken];
    }

    // 2. هل الكلمة تبدأ بـ 'el' أو 'al' التعريفية؟
    if ((cleanToken.startsWith("el") || cleanToken.startsWith("al")) && cleanToken.length > 3) {
      const rest = cleanToken.substring(2);
      if (mergedDict[rest]) {
        return "ال" + mergedDict[rest];
      }
    }

    // 3. هل الكلمة تبدأ بـ 'w' أو 'wa' الواو العاطفة؟
    if (cleanToken.startsWith("w") && cleanToken.length > 2) {
      const rest = cleanToken.substring(1);
      if (mergedDict[rest]) {
        return "و" + mergedDict[rest];
      }
    }

    // 4. تطبيق قواعد الحروف الذكية
    let word = cleanToken;
    for (const rule of FrancoDictionary.francoToArRules) {
      const regex = new RegExp(rule.f, "g");
      word = word.replace(regex, rule.a);
    }

    return word;
  }).join("");
}

// محرك الترجمة الذكي: عربي -> فرانكو
function translateArToFranco(text, customReverse = {}) {
  if (!text) return "";

  // تطبيق العبارات المركبة أولاً
  let processed = text;
  for (const item of FrancoDictionary.reversePhraseMap) {
    processed = processed.replace(item.a, item.f);
  }

  const mergedDict = { ...FrancoDictionary.reverseWordMap, ...customReverse };
  const tokens = tokenize(processed);

  return tokens.map(token => {
    if (!token || /^[ \n\t.,!؟?()[\]{}:;'"/\\]+$/.test(token)) {
      return token;
    }

    const cleanToken = token.trim();

    // 1. فحص في القاموس العكسي
    if (mergedDict[cleanToken]) {
      return mergedDict[cleanToken];
    }

    // 2. فحص الكلمات المبدوءة بـ "الـ"
    if (cleanToken.startsWith("ال") && cleanToken.length > 3) {
      const rest = cleanToken.substring(2);
      if (mergedDict[rest]) {
        return "el" + mergedDict[rest];
      }
    }

    // 3. فحص الكلمات المبدوءة بـ "و"
    if (cleanToken.startsWith("و") && cleanToken.length > 2) {
      const rest = cleanToken.substring(1);
      if (mergedDict[rest]) {
        return "w" + mergedDict[rest];
      }
    }

    // 4. تطبيق قواعد الحروف العربية إلى فرانكو
    let word = cleanToken;
    for (const rule of FrancoDictionary.arToFrancoRules) {
      const regex = new RegExp(rule.a, "g");
      word = word.replace(regex, rule.f);
    }

    return word;
  }).join("");
}

// تصدير للمتصفح والبيئة المحلية
if (typeof window !== "undefined") {
  window.FrancoDictionary = FrancoDictionary;
  window.translateFrancoToAr = translateFrancoToAr;
  window.translateArToFranco = translateArToFranco;
}
