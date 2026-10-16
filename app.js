/**
 * Franco Translator - Core Application & Admin Control Panel Logic
 */

(function () {
  'use strict';

  // الحالة العامة للتطبيق
  const state = {
    mode: 'franco-to-ar', // 'franco-to-ar' أو 'ar-to-franco'
    customDictionary: {},
    settings: {
      theme: 'emerald',
      font: 'Cairo',
      adsEnabled: true,
      adsMode: 'preview',
      adClient: 'ca-pub-XXXXXXXXXXXXXXXX',
      adSlotHeader: '1234567890',
      adSlotContent: '0987654321',
      adSlotSticky: '1122334455',
      autoTranslate: true
    }
  };

  // عناصر DOM
  const elements = {
    sourceText: document.getElementById('sourceText'),
    targetText: document.getElementById('targetText'),
    sourceLangLabel: document.getElementById('sourceLangLabel'),
    targetLangLabel: document.getElementById('targetLangLabel'),
    swapBtn: document.getElementById('swapBtn'),
    clearBtn: document.getElementById('clearBtn'),
    copyBtn: document.getElementById('copyBtn'),
    speakSourceBtn: document.getElementById('speakSourceBtn'),
    speakTargetBtn: document.getElementById('speakTargetBtn'),
    shareBtn: document.getElementById('shareBtn'),
    downloadBtn: document.getElementById('downloadBtn'),
    charCount: document.getElementById('charCount'),
    wordCount: document.getElementById('wordCount'),
    toast: document.getElementById('toast'),
    quickKeysContainer: document.getElementById('quickKeysContainer'),
    faqItems: document.querySelectorAll('.faq-item'),
    cheatsheetSearch: document.getElementById('cheatsheetSearch'),
    cheatsheetRows: document.querySelectorAll('#cheatsheetTable tbody tr'),
    
    // عناصر لوحة التحكم
    adminModal: document.getElementById('adminModal'),
    openAdminBtn: document.getElementById('openAdminBtn'),
    closeAdminBtn: document.getElementById('closeAdminBtn'),
    adminForm: document.getElementById('adminForm'),
    themeSelect: document.getElementById('themeSelect'),
    fontSelect: document.getElementById('fontSelect'),
    adsToggle: document.getElementById('adsToggle'),
    adsModeSelect: document.getElementById('adsModeSelect'),
    adClientInput: document.getElementById('adClientInput'),
    adSlotHeaderInput: document.getElementById('adSlotHeaderInput'),
    adSlotContentInput: document.getElementById('adSlotContentInput'),
    adSlotStickyInput: document.getElementById('adSlotStickyInput'),
    newFrancoWord: document.getElementById('newFrancoWord'),
    newArabicWord: document.getElementById('newArabicWord'),
    addWordBtn: document.getElementById('addWordBtn'),
    customWordsList: document.getElementById('customWordsList'),
    exportConfigBtn: document.getElementById('exportConfigBtn'),
    importConfigInput: document.getElementById('importConfigInput'),
    resetSettingsBtn: document.getElementById('resetSettingsBtn'),
    quickThemeToggle: document.getElementById('quickThemeToggle')
  };

  // مفاتيح الأرقام والحروف السريعة للفرانكو
  const quickKeys = [
    { key: '2', label: '2 (ء/أ)' },
    { key: '3', label: '3 (ع)' },
    { key: "3'", label: "3' (غ)" },
    { key: '5', label: '5 (خ)' },
    { key: '6', label: '6 (ط)' },
    { key: "6'", label: "6' (ظ)" },
    { key: '7', label: '7 (ح)' },
    { key: '8', label: '8 (ق)' },
    { key: '9', label: '9 (ص)' },
    { key: "9'", label: "9' (ض)" },
    { key: 'kh', label: 'kh (خ)' },
    { key: 'gh', label: 'gh (غ)' },
    { key: 'sh', label: 'sh (ش)' },
    { key: 'th', label: 'th (ث)' }
  ];

  // تحميل الإعدادات من التخزين المحلي
  function loadSettings() {
    try {
      const savedSettings = localStorage.getItem('franco_settings');
      if (savedSettings) {
        state.settings = { ...state.settings, ...JSON.parse(savedSettings) };
      }
      const savedDict = localStorage.getItem('franco_custom_dict');
      if (savedDict) {
        state.customDictionary = JSON.parse(savedDict);
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  // حفظ الإعدادات
  function saveSettings() {
    try {
      localStorage.setItem('franco_settings', JSON.stringify(state.settings));
      localStorage.setItem('franco_custom_dict', JSON.stringify(state.customDictionary));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  // تطبيق الثيم والخطوط
  function applyAppearance() {
    document.documentElement.setAttribute('data-theme', state.settings.theme);
    document.body.style.fontFamily = `'${state.settings.font}', system-ui, -apple-system, sans-serif`;
    updateAdsDisplay();
  }

  // تحديث عرض الإعلانات بناءً على الإعدادات
  function updateAdsDisplay() {
    const adUnits = document.querySelectorAll('.ad-unit-wrapper');
    adUnits.forEach(unit => {
      if (!state.settings.adsEnabled) {
        unit.style.display = 'none';
      } else {
        unit.style.display = 'block';
        const liveSlot = unit.querySelector('.ad-live');
        const previewSlot = unit.querySelector('.ad-preview-box');
        
        if (state.settings.adsMode === 'live') {
          if (liveSlot) liveSlot.style.display = 'block';
          if (previewSlot) previewSlot.style.display = 'none';
        } else {
          if (liveSlot) liveSlot.style.display = 'none';
          if (previewSlot) previewSlot.style.display = 'flex';
        }
      }
    });
  }

  // إظهار إشعار Toast سريع
  function showToast(message) {
    if (!elements.toast) return;
    elements.toast.textContent = message;
    elements.toast.classList.add('show');
    clearTimeout(elements.toast._timer);
    elements.toast._timer = setTimeout(() => {
      elements.toast.classList.remove('show');
    }, 2400);
  }

  // تحديث النصوص والواجهة عند تغيير اتجاه الترجمة
  function updateModeUI() {
    if (state.mode === 'franco-to-ar') {
      elements.sourceLangLabel.textContent = 'الفرانكو (Franco)';
      elements.targetLangLabel.textContent = 'اللغة العربية';
      elements.sourceText.placeholder = 'اكتب أو الصق الفرانكو هنا... مثال: ezyak ya sa7by 3amel eh enharda؟';
      elements.targetText.placeholder = 'الترجمة العربية ستظهر هنا تلقائياً وبلحظتها...';
      elements.sourceText.dir = 'ltr';
      elements.targetText.dir = 'rtl';
      if (elements.quickKeysContainer) elements.quickKeysContainer.style.display = 'flex';
    } else {
      elements.sourceLangLabel.textContent = 'اللغة العربية';
      elements.targetLangLabel.textContent = 'الفرانكو (Franco)';
      elements.sourceText.placeholder = 'اكتب أو الصق النص العربي هنا... مثال: ازيك يا صاحبي عامل ايه النهاردة؟';
      elements.targetText.placeholder = 'Franco translation will appear here instantly...';
      elements.sourceText.dir = 'rtl';
      elements.targetText.dir = 'ltr';
      if (elements.quickKeysContainer) elements.quickKeysContainer.style.display = 'none';
    }
  }

  // إجراء الترجمة
  function performTranslation() {
    const text = elements.sourceText.value;
    if (!text.trim()) {
      elements.targetText.value = '';
      updateStats();
      return;
    }

    let result = '';
    if (state.mode === 'franco-to-ar') {
      result = window.translateFrancoToAr(text, state.customDictionary);
    } else {
      result = window.translateArToFranco(text, state.customDictionary);
    }

    elements.targetText.value = result;
    updateStats();
  }

  // تحديث الإحصائيات (عدد الحروف والكلمات)
  function updateStats() {
    const text = elements.sourceText.value;
    const charLen = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    
    if (elements.charCount) elements.charCount.textContent = `${charLen} حرف`;
    if (elements.wordCount) elements.wordCount.textContent = `${words} كلمة`;
  }

  // تبديل اتجاه الترجمة
  function swapLanguages() {
    const currentSource = elements.sourceText.value;
    const currentTarget = elements.targetText.value;

    state.mode = state.mode === 'franco-to-ar' ? 'ar-to-franco' : 'franco-to-ar';
    updateModeUI();

    elements.sourceText.value = currentTarget;
    elements.targetText.value = currentSource;
    performTranslation();
    showToast('تم تبديل اتجاه الترجمة!');
  }

  // نسخ النص إلى الحافظة
  async function copyTranslation() {
    const text = elements.targetText.value;
    if (!text.trim()) {
      showToast('لا يوجد نص لنسخه!');
      return;
    }

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        elements.targetText.select();
        document.execCommand('copy');
      }
      showToast('تم نسخ الترجمة بنجاح! 📋');
    } catch (err) {
      showToast('فشل النسخ، يرجى التحديد والنسخ يدوياً');
    }
  }

  // تفريغ الحقول
  function clearAll() {
    elements.sourceText.value = '';
    elements.targetText.value = '';
    updateStats();
    elements.sourceText.focus();
    showToast('تم مسح النص 🗑️');
  }

  // نطق النص (Text-To-Speech)
  function speakText(text, lang) {
    if (!('speechSynthesis' in window)) {
      showToast('متصفحك لا يدعم خاصية نطق الصوت');
      return;
    }
    if (!text.trim()) {
      showToast('يرجى كتابة نص أولاً للاستماع إليه');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
    showToast('جاري نطق النص... 🔊');
  }

  // مشاركة النص
  async function shareTranslation() {
    const text = elements.targetText.value || elements.sourceText.value;
    if (!text.trim()) {
      showToast('يرجى كتابة نص لمشاركته');
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ترجمة فرانكو - أسرع مترجم فرانكو عربي',
          text: text,
          url: window.location.href
        });
      } catch (e) {
        // تم الإلغاء
      }
    } else {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + '\n\nتمت الترجمة عبر مترجم فرانكو: ' + window.location.href)}`;
      window.open(whatsappUrl, '_blank');
    }
  }

  // تنزيل كملف نصي .txt
  function downloadTxt() {
    const text = `النص الأصلي:\n${elements.sourceText.value}\n\nالترجمة:\n${elements.targetText.value}\n\n---\nتم التحويل بواسطة: مترجم فرانكو عربي`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `franco-translation-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('تم تحميل الملف النصي بنجاح! 💾');
  }

  // بناء شريط الأزرار السريعة للفرانكو
  function initQuickKeys() {
    if (!elements.quickKeysContainer) return;
    elements.quickKeysContainer.innerHTML = '';
    
    quickKeys.forEach(item => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quick-key-btn';
      btn.textContent = item.label;
      btn.title = `إدراج ${item.key}`;
      btn.addEventListener('click', () => {
        insertAtCursor(elements.sourceText, item.key);
        performTranslation();
        elements.sourceText.focus();
      });
      elements.quickKeysContainer.appendChild(btn);
    });
  }

  // إدراج نص عند موضع المؤشر
  function insertAtCursor(textarea, value) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    textarea.value = text.substring(0, start) + value + text.substring(end);
    textarea.selectionStart = textarea.selectionEnd = start + value.length;
  }

  // إدارة جدول المصطلحات والبحث فيه
  function initCheatsheetSearch() {
    if (!elements.cheatsheetSearch) return;
    elements.cheatsheetSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      elements.cheatsheetRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }

  // إدارة الأسئلة الشائعة (FAQ Accordion)
  function initFaqAccordion() {
    elements.faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        elements.faqItems.forEach(i => i.classList.remove('active'));
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    });
  }

  // تحديث قائمة الكلمات المخصصة في لوحة التحكم
  function renderCustomWords() {
    if (!elements.customWordsList) return;
    elements.customWordsList.innerHTML = '';
    const keys = Object.keys(state.customDictionary);
    
    if (keys.length === 0) {
      elements.customWordsList.innerHTML = '<li class="empty-state">لا توجد كلمات مخصصة مضافة بعد. يمكنك إضافة كلماتك الخاصة من النموذج أعلاه.</li>';
      return;
    }

    keys.forEach(franco => {
      const ar = state.customDictionary[franco];
      const li = document.createElement('li');
      li.className = 'custom-word-item';
      li.innerHTML = `
        <span class="word-pair"><strong>${franco}</strong> ➔ <span>${ar}</span></span>
        <button type="button" class="del-word-btn" title="حذف الكلمة" data-franco="${franco}">&times;</button>
      `;
      li.querySelector('.del-word-btn').addEventListener('click', () => {
        delete state.customDictionary[franco];
        saveSettings();
        renderCustomWords();
        performTranslation();
        showToast('تم حذف الكلمة من القاموس');
      });
      elements.customWordsList.appendChild(li);
    });
  }

  // إعداد لوحة التحكم (Admin Panel)
  function initAdminPanel() {
    if (elements.openAdminBtn && elements.adminModal) {
      elements.openAdminBtn.addEventListener('click', () => {
        elements.themeSelect.value = state.settings.theme;
        elements.fontSelect.value = state.settings.font;
        elements.adsToggle.checked = state.settings.adsEnabled;
        elements.adsModeSelect.value = state.settings.adsMode;
        elements.adClientInput.value = state.settings.adClient;
        elements.adSlotHeaderInput.value = state.settings.adSlotHeader;
        elements.adSlotContentInput.value = state.settings.adSlotContent;
        elements.adSlotStickyInput.value = state.settings.adSlotSticky;
        renderCustomWords();
        
        elements.adminModal.classList.add('active');
      });
    }

    if (elements.closeAdminBtn && elements.adminModal) {
      elements.closeAdminBtn.addEventListener('click', () => {
        elements.adminModal.classList.remove('active');
      });
      
      elements.adminModal.addEventListener('click', (e) => {
        if (e.target === elements.adminModal) {
          elements.adminModal.classList.remove('active');
        }
      });
    }

    // زر التبديل السريع للوضع الليلي في الهيدر
    if (elements.quickThemeToggle) {
      elements.quickThemeToggle.addEventListener('click', () => {
        const nextTheme = state.settings.theme === 'dark' ? 'emerald' : 'dark';
        state.settings.theme = nextTheme;
        saveSettings();
        applyAppearance();
        showToast(`تم التبديل إلى الثيم: ${nextTheme}`);
      });
    }

    // حفظ التغييرات عند التعديل في النموذج
    if (elements.adminForm) {
      elements.adminForm.addEventListener('change', () => {
        state.settings.theme = elements.themeSelect.value;
        state.settings.font = elements.fontSelect.value;
        state.settings.adsEnabled = elements.adsToggle.checked;
        state.settings.adsMode = elements.adsModeSelect.value;
        state.settings.adClient = elements.adClientInput.value.trim();
        state.settings.adSlotHeader = elements.adSlotHeaderInput.value.trim();
        state.settings.adSlotContent = elements.adSlotContentInput.value.trim();
        state.settings.adSlotSticky = elements.adSlotStickyInput.value.trim();

        saveSettings();
        applyAppearance();
        showToast('تم تطبيق الإعدادات وتحديث المظهر مباشرة! ✨');
      });
    }

    // إضافة كلمة مخصصة
    if (elements.addWordBtn) {
      elements.addWordBtn.addEventListener('click', () => {
        const franco = elements.newFrancoWord.value.toLowerCase().trim();
        const ar = elements.newArabicWord.value.trim();
        
        if (!franco || !ar) {
          showToast('يرجى ملء الكلمة بالفرانكو والترجمة بالعربي');
          return;
        }

        state.customDictionary[franco] = ar;
        saveSettings();
        renderCustomWords();
        elements.newFrancoWord.value = '';
        elements.newArabicWord.value = '';
        elements.newFrancoWord.focus();
        performTranslation();
        showToast(`تمت إضافة "${franco}" ➔ "${ar}" بنجاح!`);
      });
    }

    // تصدير الإعدادات
    if (elements.exportConfigBtn) {
      elements.exportConfigBtn.addEventListener('click', () => {
        const exportData = {
          settings: state.settings,
          customDictionary: state.customDictionary,
          exportedAt: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `franco-settings-backup.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('تم تصدير ملف الإعدادات بنجاح!');
      });
    }

    // استيراد الإعدادات
    if (elements.importConfigInput) {
      elements.importConfigInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result);
            if (data.settings) state.settings = { ...state.settings, ...data.settings };
            if (data.customDictionary) state.customDictionary = { ...state.customDictionary, ...data.customDictionary };
            saveSettings();
            applyAppearance();
            renderCustomWords();
            performTranslation();
            showToast('تم استيراد الإعدادات بنجاح! 🎉');
          } catch (err) {
            showToast('خطأ في قراءة ملف الإعدادات!');
          }
        };
        reader.readAsText(file);
      });
    }

    // إعادة ضبط المصنع
    if (elements.resetSettingsBtn) {
      elements.resetSettingsBtn.addEventListener('click', () => {
        if (confirm('هل أنت متأكد من رغبتك في إعادة ضبط جميع الإعدادات للوضع الافتراضي؟')) {
          localStorage.removeItem('franco_settings');
          localStorage.removeItem('franco_custom_dict');
          state.settings = {
            theme: 'emerald',
            font: 'Cairo',
            adsEnabled: true,
            adsMode: 'preview',
            adClient: 'ca-pub-XXXXXXXXXXXXXXXX',
            adSlotHeader: '1234567890',
            adSlotContent: '0987654321',
            adSlotSticky: '1122334455',
            autoTranslate: true
          };
          state.customDictionary = {};
          saveSettings();
          applyAppearance();
          renderCustomWords();
          performTranslation();
          showToast('تمت إعادة الضبط بنجاح');
        }
      });
    }
  }

  // ربط الأحداث الرئيسية
  function initEvents() {
    elements.sourceText.addEventListener('input', () => {
      performTranslation();
    });

    elements.swapBtn.addEventListener('click', swapLanguages);
    elements.clearBtn.addEventListener('click', clearAll);
    elements.copyBtn.addEventListener('click', copyTranslation);

    elements.speakSourceBtn.addEventListener('click', () => {
      const lang = state.mode === 'franco-to-ar' ? 'en-US' : 'ar-SA';
      speakText(elements.sourceText.value, lang);
    });

    elements.speakTargetBtn.addEventListener('click', () => {
      const lang = state.mode === 'franco-to-ar' ? 'ar-SA' : 'en-US';
      speakText(elements.targetText.value, lang);
    });

    elements.shareBtn.addEventListener('click', shareTranslation);
    elements.downloadBtn.addEventListener('click', downloadTxt);

    const demoChips = document.querySelectorAll('.demo-chip');
    demoChips.forEach(chip => {
      chip.addEventListener('click', () => {
        elements.sourceText.value = chip.getAttribute('data-text');
        performTranslation();
        elements.sourceText.scrollIntoView({ behavior: 'smooth', block: 'center' });
        showToast('تم تحميل المثال التجريبي!');
      });
    });
  }

  // التشغيل الأولي للتطبيق
  function init() {
    loadSettings();
    applyAppearance();
    updateModeUI();
    initQuickKeys();
    initCheatsheetSearch();
    initFaqAccordion();
    initAdminPanel();
    initEvents();

    if (!elements.sourceText.value) {
      elements.sourceText.value = "sba7 el 5er ya 7abibi, 3amel eh enharda? inshallah kol 7aga تمام!";
      performTranslation();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
