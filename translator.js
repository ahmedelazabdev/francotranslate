/**
 * محرك ترجمة الفرانكو الذكي
 * يدعم التحويل من فرانكو إلى عربي ومن عربي إلى فرانكو
 */

document.addEventListener('DOMContentLoaded', () => {
    // العناصر البرمجية
    const sourceText = document.getElementById('sourceText');
    const targetText = document.getElementById('targetText');
    const swapBtn = document.getElementById('swapBtn');
    const clearInputBtn = document.getElementById('clearInputBtn');
    const copyBtn = document.getElementById('copyBtn');
    const copyStatus = document.getElementById('copyStatus');
    const currentModeLabel = document.getElementById('currentModeLabel');
    const inputLabel = document.getElementById('inputLabel');
    const outputLabel = document.getElementById('outputLabel');
    const charCount = document.getElementById('charCount');
    const manualTranslateBtn = document.getElementById('manualTranslateBtn');

    // الحالة: franco-to-ar أو ar-to-franco
    let currentMode = 'franco-to-ar';

    // قاموس الكلمات الشائعة (تعزيز الذكاء الدلالي للفرانكو)
    const dictionaryFrancoToAr = {
        'ezzayek': 'ازيك', 'ezayak': 'ازيك', '3amel': 'عامل', 'eh': 'ايه',
        'feen': 'فين', 'leih': 'ليه', 'tamam': 'تمام', 'sa7by': 'صاحبي',
        'habibi': 'حبيبي', '7abibi': 'حبيبي', 'shokran': 'شكرا', 'alf': 'الف',
        'mabrook': 'مبروك', 'inshallah': 'ان شاء الله', 'wenta': 'وانت',
        'enti': 'انتي', 'enta': 'انت', 'mesh': 'مش', 'keda': 'كده', 'yalla': 'يلا'
    };

    // خريطة تحويل المقاطع المركبة في الفرانكو إلى عربي
    const francoCompoundMap = [
        { f: "3'", a: "غ" },
        { f: "6'", a: "ظ" },
        { f: "9'", a: "ض" },
        { f: "kh", a: "خ" },
        { f: "sh", a: "ش" },
        { f: "ch", a: "ش" },
        { f: "th", a: "ث" },
        { f: "gh", a: "غ" },
        { f: "dh", a: "ذ" },
        { f: "ph", a: "ف" }
    ];

    // خريطة تحويل الحروف والأرقام الفردية (فرانكو -> عربي)
    const francoSingleMap = {
        '2': 'ء', '3': 'ع', '4': 'ش', '5': 'خ', '6': 'ط', '7': 'ح', '8': 'ق', '9': 'ص',
        'a': 'ا', 'b': 'ب', 'c': 'ك', 'd': 'د', 'e': 'ي', 'f': 'ف', 'g': 'ج',
        'h': 'ه', 'i': 'ي', 'j': 'ج', 'k': 'ك', 'l': 'ل', 'm': 'م', 'n': 'ن',
        'o': 'و', 'p': 'ب', 'q': 'ق', 'r': 'ر', 's': 'س', 't': 'ت', 'u': 'و',
        'v': 'ف', 'w': 'و', 'x': 'كس', 'y': 'ي', 'z': 'ز'
    };

    // خريطة تحويل من عربي إلى فرانكو
    const arabicToFrancoCompound = [
        { a: "ش", f: "sh" },
        { a: "خ", f: "5" },
        { a: "غ", f: "gh" },
        { a: "ث", f: "th" },
        { a: "ظ", f: "6'" },
        { a: "ض", f: "9'" },
        { a: "ع", f: "3" },
        { a: "ح", f: "7" },
        { a: "ط", f: "6" },
        { a: "ص", f: "9" },
        { a: "ق", f: "8" }
    ];

    const arabicSingleMap = {
        'أ': '2', 'إ': '2', 'آ': '2', 'ء': '2', 'ئ': '2', 'ؤ': '2',
        'ا': 'a', 'ب': 'b', 'ت': 't', 'ة': 'a', 'ج': 'g', 'د': 'd',
        'ذ': 'dh', 'ر': 'r', 'ز': 'z', 'س': 's', 'ف': 'f', 'ك': 'k',
        'ل': 'l', 'م': 'm', 'ن': 'n', 'ه': 'h', 'و': 'w', 'ي': 'y', 'ى': 'a'
    };

    // دالة الترجمة من فرانكو إلى عربي
    function translateFrancoToArabic(text) {
        if (!text) return '';
        
        // تقسيم النص إلى كلمات
        const words = text.split(/(\s+|[.,!؟?])/);
        
        return words.map(word => {
            const lowerWord = word.toLowerCase();
            // البحث في القاموس السريع أولاً
            if (dictionaryFrancoToAr[lowerWord]) {
                return dictionaryFrancoToAr[lowerWord];
            }

            let result = lowerWord;
            // استبدال المقاطع المركبة
            francoCompoundMap.forEach(item => {
                result = result.split(item.f).join(item.a);
            });

            // استبدال الحروف والأرقام الفردية
            let finalChars = [];
            for (let i = 0; i < result.length; i++) {
                const char = result[i];
                finalChars.push(francoSingleMap[char] !== undefined ? francoSingleMap[char] : char);
            }

            return finalChars.join('');
        }).join('');
    }

    // دالة الترجمة من عربي إلى فرانكو
    function translateArabicToFranco(text) {
        if (!text) return '';
        let result = text;

        // استبدال المقاطع المركبة أولاً
        arabicToFrancoCompound.forEach(item => {
            result = result.split(item.a).join(item.f);
        });

        // استبدال الحروف الفردية
        let finalChars = [];
        for (let i = 0; i < result.length; i++) {
            const char = result[i];
            finalChars.push(arabicSingleMap[char] !== undefined ? arabicSingleMap[char] : char);
        }

        return finalChars.join('');
    }

    // الدالة المنفذة الرئيسية
    function handleTranslation() {
        const input = sourceText.value;
        updateCounters(input);

        if (input.trim() === '') {
            targetText.value = '';
            return;
        }

        if (currentMode === 'franco-to-ar') {
            targetText.value = translateFrancoToArabic(input);
        } else {
            targetText.value = translateArabicToFranco(input);
        }
    }

    // عداد الحروف والكلمات
    function updateCounters(text) {
        const chars = text.length;
        const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
        charCount.textContent = `الحروف: ${chars} | الكلمات: ${words}`;
    }

    // تبديل الوضع (Swap)
    swapBtn.addEventListener('click', () => {
        if (currentMode === 'franco-to-ar') {
            currentMode = 'ar-to-franco';
            currentModeLabel.textContent = 'الوضع الحالي: عربي ← فرانكو';
            inputLabel.textContent = 'نص عربي';
            outputLabel.textContent = 'نص الفرانكو (Franco)';
            sourceText.placeholder = 'اكتب النص باللغة العربية هنا... مثال: ازيك يا صاحبي عامل ايه؟';
        } else {
            currentMode = 'franco-to-ar';
            currentModeLabel.textContent = 'الوضع الحالي: فرانكو ← عربي';
            inputLabel.textContent = 'نص الفرانكو (Franco)';
            outputLabel.textContent = 'النص المترجم للعربية';
            sourceText.placeholder = 'اكتب أو الصق نص الفرانكو هنا... مثال: ezzayek ya sa7by 3amel eh?';
        }

        // نقل النص الناتج إلى خانة المدخلات لإعادة تحويله
        const temp = targetText.value;
        sourceText.value = temp;
        handleTranslation();
    });

    // ترجمة فورية مع الكتابة
    sourceText.addEventListener('input', handleTranslation);
    manualTranslateBtn.addEventListener('click', handleTranslation);

    // تفريغ النص
    clearInputBtn.addEventListener('click', () => {
        sourceText.value = '';
        targetText.value = '';
        updateCounters('');
        sourceText.focus();
    });

    // نسخ النص للحافظة
    copyBtn.addEventListener('click', async () => {
        if (!targetText.value) return;
        try {
            await navigator.clipboard.writeText(targetText.value);
            copyStatus.textContent = '✓ تم النسخ بنجاح!';
            setTimeout(() => copyStatus.textContent = '', 2500);
        } catch (err) {
            // بديل في حال المتصفحات القديمة
            targetText.select();
            document.execCommand('copy');
            copyStatus.textContent = '✓ تم النسخ!';
            setTimeout(() => copyStatus.textContent = '', 2500);
        }
    });
});
