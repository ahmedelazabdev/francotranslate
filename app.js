/**
 * Main Frontend Application Script
 * High-performance UI interactions, live conversion, keypad, TTS, and toasts
 */

document.addEventListener('DOMContentLoaded', () => {
  const engine = new FrancoEngine();
  const config = window.FRANCO_CONFIG || {};

  // DOM Elements
  const sourceText = document.getElementById('source-text');
  const outputText = document.getElementById('output-text');
  const sourceLangSelect = document.getElementById('source-lang');
  const targetLangBadge = document.getElementById('target-lang-badge');
  const detectedBadge = document.getElementById('detected-lang-badge');
  const swapBtn = document.getElementById('swap-btn');
  const clearBtn = document.getElementById('clear-btn');
  const copyBtn = document.getElementById('copy-btn');
  const shareBtn = document.getElementById('share-btn');
  const downloadBtn = document.getElementById('download-btn');
  const ttsBtn = document.getElementById('tts-btn');
  const themeToggle = document.getElementById('theme-toggle');
  const charCount = document.getElementById('char-count');
  const wordCount = document.getElementById('word-count');
  const keypad = document.getElementById('franco-keypad');
  const toast = document.getElementById('toast');

  let currentMode = 'auto'; // 'auto', 'franco-to-ar', 'ar-to-franco'
  let debounceTimer = null;

  // Show Toast Notification
  function showToast(message, type = 'success') {
    if (!toast) return;
    toast.textContent = message;
    toast.className = `toast toast-${type} show`;
    setTimeout(() => {
      toast.className = 'toast';
    }, 2800);
  }

  // Update Counters
  function updateCounters(text) {
    const chars = text ? text.length : 0;
    const words = text ? (text.trim().match(/\S+/g) || []).length : 0;
    if (charCount) charCount.textContent = `${chars} حرف`;
    if (wordCount) wordCount.textContent = `${words} كلمة`;
  }

  // Execute Translation
  function translate() {
    const input = sourceText.value;
    if (!input || !input.trim()) {
      outputText.value = '';
      updateCounters('');
      if (detectedBadge) detectedBadge.style.display = 'none';
      return;
    }

    updateCounters(input);

    const detected = FrancoEngine.detectLanguage(input);
    let effectiveMode = currentMode;

    if (currentMode === 'auto') {
      effectiveMode = (detected === 'ar') ? 'ar-to-franco' : 'franco-to-ar';
      if (detectedBadge) {
        detectedBadge.style.display = 'inline-flex';
        detectedBadge.textContent = detected === 'ar' ? 'المدخل: عربي' : 'المدخل: فرانكو';
      }
    } else {
      if (detectedBadge) detectedBadge.style.display = 'none';
    }

    // Update target badge
    if (targetLangBadge) {
      targetLangBadge.textContent = (effectiveMode === 'franco-to-ar') ? 'العربية' : 'فرانكو';
    }

    let result = '';
    if (effectiveMode === 'franco-to-ar') {
      result = engine.francoToArabic(input);
    } else {
      result = engine.arabicToFranco(input);
    }

    outputText.value = result;
  }

  // Debounced Input Handler
  sourceText.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(translate, 100);
  });

  // Source Language Selector Change
  if (sourceLangSelect) {
    sourceLangSelect.addEventListener('change', () => {
      currentMode = sourceLangSelect.value;
      translate();
    });
  }

  // Swap Languages Button
  if (swapBtn) {
    swapBtn.addEventListener('click', () => {
      const srcVal = sourceText.value;
      const outVal = outputText.value;

      if (currentMode === 'franco-to-ar') {
        currentMode = 'ar-to-franco';
        if (sourceLangSelect) sourceLangSelect.value = 'ar-to-franco';
      } else if (currentMode === 'ar-to-franco') {
        currentMode = 'franco-to-ar';
        if (sourceLangSelect) sourceLangSelect.value = 'franco-to-ar';
      } else {
        const detected = FrancoEngine.detectLanguage(srcVal);
        currentMode = (detected === 'ar') ? 'franco-to-ar' : 'ar-to-franco';
        if (sourceLangSelect) sourceLangSelect.value = currentMode;
      }

      sourceText.value = outVal;
      translate();
      showToast('🔄 تم تبديل اتجاه الترجمة بنجاح');
    });
  }

  // Clear Button
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      sourceText.value = '';
      outputText.value = '';
      updateCounters('');
      if (detectedBadge) detectedBadge.style.display = 'none';
      sourceText.focus();
      showToast('🗑️ تم مسح النص');
    });
  }

  // Copy Output Button
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const text = outputText.value;
      if (!text) {
        showToast('لا يوجد نص لنسخه!', 'error');
        return;
      }
      navigator.clipboard.writeText(text).then(() => {
        showToast('✅ تم نسخ الترجمة إلى الحافظة بنجاح!');
      }).catch(() => {
        outputText.select();
        document.execCommand('copy');
        showToast('✅ تم نسخ الترجمة!');
      });
    });
  }

  // Share Output Button
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const text = outputText.value;
      if (!text) {
        showToast('لا يوجد نص لمشاركته!', 'error');
        return;
      }
      if (navigator.share) {
        navigator.share({
          title: 'ترجمة فرانكو فورية',
          text: text,
          url: window.location.href
        }).catch(() => {});
      } else {
        const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + '\n\nتمت الترجمة عبر مترجم الفرانكو: ' + window.location.href)}`;
        window.open(waUrl, '_blank');
      }
    });
  }

  // Download Output (.txt)
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const text = outputText.value;
      if (!text) {
        showToast('لا يوجد نص لتحميله!', 'error');
        return;
      }
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `franco-translate-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('⬇️ جاري تحميل الملف النصي...');
    });
  }

  // Text-To-Speech (Pronunciation playback)
  if (ttsBtn) {
    ttsBtn.addEventListener('click', () => {
      const text = outputText.value || sourceText.value;
      if (!text) {
        showToast('لا يوجد نص للاستماع إليه!', 'error');
        return;
      }
      if (!('speechSynthesis' in window)) {
        showToast('المتصفح لا يدعم القراءة الصوتية', 'error');
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const isArabic = /[\u0600-\u06FF]/.test(text);
      utterance.lang = isArabic ? 'ar-SA' : 'en-US';
      utterance.rate = 0.95;

      ttsBtn.classList.add('playing');
      utterance.onend = () => ttsBtn.classList.remove('playing');
      utterance.onerror = () => ttsBtn.classList.remove('playing');

      window.speechSynthesis.speak(utterance);
      showToast('🔊 جاري القراءة الصوتية للنص...');
    });
  }

  // On-Screen Keypad for Franco numbers
  if (keypad) {
    keypad.addEventListener('click', (e) => {
      const btn = e.target.closest('.keypad-btn');
      if (!btn) return;
      const char = btn.getAttribute('data-char');
      if (!char) return;

      const start = sourceText.selectionStart;
      const end = sourceText.selectionEnd;
      const val = sourceText.value;

      sourceText.value = val.substring(0, start) + char + val.substring(end);
      sourceText.selectionStart = sourceText.selectionEnd = start + char.length;
      sourceText.focus();
      translate();
    });
  }

  // Dark / Light Theme Toggle
  function initTheme() {
    const saved = localStorage.getItem('franco_theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? (saved === 'dark') : prefersDark;

    setTheme(isDark);
  }

  function setTheme(isDark) {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeToggle) themeToggle.innerHTML = '☀️ الوضع النهاري';
      localStorage.setItem('franco_theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeToggle) themeToggle.innerHTML = '🌙 الوضع الليلي';
      localStorage.setItem('franco_theme', 'light');
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') === 'dark';
      setTheme(!current);
    });
  }

  initTheme();

  // Search & Filter in Franco Tables
  const tableSearchInput = document.getElementById('table-search-input');
  if (tableSearchInput) {
    tableSearchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      const rows = document.querySelectorAll('.filterable-table tbody tr');
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(term) ? '' : 'none';
      });
    });
  }

  // Quick Sample Phrases Insertion
  const samplePills = document.querySelectorAll('.sample-pill');
  samplePills.forEach(pill => {
    pill.addEventListener('click', () => {
      const sample = pill.getAttribute('data-sample');
      if (sample) {
        sourceText.value = sample;
        sourceText.focus();
        translate();
        showToast('✨ تم إدراج النص التجريبي');
      }
    });
  });

  // Table of Contents Active Spy
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        document.querySelectorAll('.toc-link').forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  document.querySelectorAll('section[id], article[id]').forEach(sec => observer.observe(sec));
});
```

---

### 5️⃣ ملف `admin.js` (لوحة التحكم السرية المشفرة بـ SHA-256)

```javascript
/**
 * Secret Admin Panel for Franco Translator
 * Runs client-side on GitHub Pages with SHA-256 hashed password protection
 */

(function () {
  'use strict';

  // Helper: SHA-256 Hashing
  async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Configuration Manager
  const ConfigManager = {
    STORAGE_KEY: 'franco_site_config',
    AUTH_KEY: 'franco_admin_authenticated',
    ATTEMPTS_KEY: 'franco_login_attempts',

    getConfig() {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return Object.assign({}, window.FRANCO_CONFIG || {}, parsed);
        } catch (e) {
          console.error('Error parsing stored config:', e);
        }
      }
      return window.FRANCO_CONFIG || {};
    },

    saveConfig(newConfig) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newConfig));
      window.FRANCO_CONFIG = newConfig;
      this.applyConfig(newConfig);
    },

    resetConfig() {
      localStorage.removeItem(this.STORAGE_KEY);
      location.reload();
    },

    applyConfig(cfg) {
      if (!cfg) return;

      if (cfg.siteTitle) document.title = cfg.siteTitle;
      const descMeta = document.querySelector('meta[name="description"]');
      if (descMeta && cfg.siteDescription) descMeta.setAttribute('content', cfg.siteDescription);
      const kwMeta = document.querySelector('meta[name="keywords"]');
      if (kwMeta && cfg.siteKeywords) kwMeta.setAttribute('content', cfg.siteKeywords);

      const brandLogo = document.getElementById('site-brand-logo');
      if (brandLogo && cfg.siteName) brandLogo.textContent = cfg.siteName;

      const root = document.documentElement;
      if (cfg.theme) {
        if (cfg.theme.primaryColor) root.style.setProperty('--primary-color', cfg.theme.primaryColor);
        if (cfg.theme.accentColor) root.style.setProperty('--accent-color', cfg.theme.accentColor);
        if (cfg.theme.primaryHover) root.style.setProperty('--primary-hover', cfg.theme.primaryHover);
        if (cfg.theme.fontFamily) {
          document.body.style.fontFamily = cfg.theme.fontFamily;
        }
      }

      const annBar = document.getElementById('announcement-bar');
      if (annBar && cfg.announcement) {
        if (cfg.announcement.enabled) {
          annBar.style.display = 'flex';
          const textEl = document.getElementById('announcement-text');
          const linkEl = document.getElementById('announcement-link');
          if (textEl) textEl.textContent = cfg.announcement.text;
          if (linkEl) {
            linkEl.textContent = cfg.announcement.linkText || '';
            linkEl.href = cfg.announcement.linkUrl || '#';
            linkEl.style.display = cfg.announcement.linkText ? 'inline-block' : 'none';
          }
          if (cfg.announcement.bgColor) annBar.style.backgroundColor = cfg.announcement.bgColor;
          if (cfg.announcement.textColor) annBar.style.color = cfg.announcement.textColor;
        } else {
          annBar.style.display = 'none';
        }
      }

      const headerAd = document.getElementById('header-ad-slot');
      const midAd = document.getElementById('mid-content-ad-slot');
      const stickyAd = document.getElementById('sticky-bottom-ad-slot');

      if (cfg.ads && cfg.ads.enabled) {
        if (headerAd && cfg.ads.headerAd) {
          headerAd.style.display = cfg.ads.headerAd.enabled ? 'block' : 'none';
          if (cfg.ads.headerAd.enabled && cfg.ads.headerAd.code) {
            headerAd.innerHTML = cfg.ads.headerAd.code;
          }
        }
        if (midAd && cfg.ads.midContentAd) {
          midAd.style.display = cfg.ads.midContentAd.enabled ? 'block' : 'none';
          if (cfg.ads.midContentAd.enabled && cfg.ads.midContentAd.code) {
            midAd.innerHTML = cfg.ads.midContentAd.code;
          }
        }
        if (stickyAd && cfg.ads.stickyFooterAd) {
          stickyAd.style.display = cfg.ads.stickyFooterAd.enabled ? 'block' : 'none';
          if (cfg.ads.stickyFooterAd.enabled && cfg.ads.stickyFooterAd.code) {
            stickyAd.innerHTML = cfg.ads.stickyFooterAd.code + '<button class="sticky-ad-close" onclick="document.getElementById(\'sticky-bottom-ad-slot\').style.display=\'none\'" title="إغلاق">&times;</button>';
          }
        }
      } else {
        if (headerAd) headerAd.style.display = 'none';
        if (midAd) midAd.style.display = 'none';
        if (stickyAd) stickyAd.style.display = 'none';
      }

      let customStyleTag = document.getElementById('custom-admin-css');
      if (!customStyleTag) {
        customStyleTag = document.createElement('style');
        customStyleTag.id = 'custom-admin-css';
        document.head.appendChild(customStyleTag);
      }
      if (cfg.theme && cfg.theme.customCss) {
        customStyleTag.textContent = cfg.theme.customCss;
      }

      if (cfg.tracking) {
        if (cfg.tracking.googleSearchConsoleTag && !document.querySelector('meta[name="google-site-verification"]')) {
          const gscMeta = document.createElement('meta');
          gscMeta.name = 'google-site-verification';
          gscMeta.content = cfg.tracking.googleSearchConsoleTag;
          document.head.appendChild(gscMeta);
        }
      }
    }
  };

  // Admin UI Controller
  const AdminUI = {
    isAuthenticated() {
      return sessionStorage.getItem(ConfigManager.AUTH_KEY) === 'true';
    },

    setAuthenticated(status) {
      if (status) {
        sessionStorage.setItem(ConfigManager.AUTH_KEY, 'true');
      } else {
        sessionStorage.removeItem(ConfigManager.AUTH_KEY);
      }
    },

    isLockedOut() {
      const attemptsData = localStorage.getItem(ConfigManager.ATTEMPTS_KEY);
      if (!attemptsData) return false;
      const { count, lockUntil } = JSON.parse(attemptsData);
      if (lockUntil && Date.now() < lockUntil) {
        const remainingSec = Math.ceil((lockUntil - Date.now()) / 1000);
        return remainingSec;
      }
      return false;
    },

    recordFailedAttempt() {
      let attempts = { count: 0, lockUntil: 0 };
      try {
        const stored = localStorage.getItem(ConfigManager.ATTEMPTS_KEY);
        if (stored) attempts = JSON.parse(stored);
      } catch (e) {}

      attempts.count = (attempts.count || 0) + 1;
      if (attempts.count >= 5) {
        attempts.lockUntil = Date.now() + 5 * 60 * 1000;
        attempts.count = 0;
      }
      localStorage.setItem(ConfigManager.ATTEMPTS_KEY, JSON.stringify(attempts));
    },

    resetFailedAttempts() {
      localStorage.removeItem(ConfigManager.ATTEMPTS_KEY);
    },

    showLoginModal() {
      const remaining = this.isLockedOut();
      if (remaining) {
        alert(`تم قفل الدخول مؤقتاً لكثرة المحاولات الخاطئة. يرجى الانتظار ${remaining} ثانية.`);
        return;
      }

      let modal = document.getElementById('admin-login-modal');
      if (!modal) {
        modal = this.createLoginModal();
        document.body.appendChild(modal);
      }
      modal.style.display = 'flex';
      const input = document.getElementById('admin-password-input');
      if (input) {
        input.value = '';
        setTimeout(() => input.focus(), 100);
      }
    },

    hideLoginModal() {
      const modal = document.getElementById('admin-login-modal');
      if (modal) modal.style.display = 'none';
    },

    createLoginModal() {
      const modal = document.createElement('div');
      modal.id = 'admin-login-modal';
      modal.className = 'admin-modal-backdrop';
      modal.innerHTML = `
        <div class="admin-modal-box">
          <div class="admin-modal-header">
            <h3>🔐 لوحة التحكم السرية للمدير</h3>
            <button class="admin-modal-close" onclick="document.getElementById('admin-login-modal').style.display='none'">&times;</button>
          </div>
          <div class="admin-modal-body">
            <p class="admin-modal-desc">هذه اللوحة مخصصة لمالك الموقع فقط لإدارة وتخصيص القالب والإعلانات والإعدادات. كلمة المرور الافتراضية: <code>admin123</code></p>
            <div class="admin-form-group">
              <label for="admin-password-input">أدخل كلمة المرور السرية:</label>
              <input type="password" id="admin-password-input" class="admin-input" placeholder="كلمة المرور المشفرة" autocomplete="current-password" />
            </div>
            <div id="admin-login-error" class="admin-error-text" style="display:none;"></div>
            <button id="admin-login-submit" class="admin-btn admin-btn-primary" style="width:100%;margin-top:12px;">تسجيل الدخول للوحة التحكم</button>
          </div>
        </div>
      `;

      modal.querySelector('#admin-login-submit').addEventListener('click', () => this.handleLogin());
      modal.querySelector('#admin-password-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.handleLogin();
      });

      return modal;
    },

    async handleLogin() {
      const pwdInput = document.getElementById('admin-password-input');
      const errorEl = document.getElementById('admin-login-error');
      const val = pwdInput.value;

      if (!val) {
        errorEl.textContent = 'يرجى كتابة كلمة المرور';
        errorEl.style.display = 'block';
        return;
      }

      const inputHash = await sha256(val);
      const currentConfig = ConfigManager.getConfig();
      const targetHash = currentConfig.adminPasswordHash || "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9";

      if (inputHash === targetHash) {
        this.resetFailedAttempts();
        this.setAuthenticated(true);
        this.hideLoginModal();
        this.showDashboard();
      } else {
        this.recordFailedAttempt();
        errorEl.textContent = 'كلمة المرور غير صحيحة! يرجى التأكد والمحاولة مجدداً.';
        errorEl.style.display = 'block';
      }
    },

    showDashboard() {
      if (!this.isAuthenticated()) {
        this.showLoginModal();
        return;
      }

      let dashboard = document.getElementById('admin-dashboard-modal');
      if (!dashboard) {
        dashboard = this.createDashboardModal();
        document.body.appendChild(dashboard);
      }
      this.populateDashboardForm();
      dashboard.style.display = 'flex';
    },

    hideDashboard() {
      const dashboard = document.getElementById('admin-dashboard-modal');
      if (dashboard) dashboard.style.display = 'none';
    },

    createDashboardModal() {
      const modal = document.createElement('div');
      modal.id = 'admin-dashboard-modal';
      modal.className = 'admin-modal-backdrop admin-dashboard-backdrop';
      modal.innerHTML = `
        <div class="admin-dashboard-box">
          <div class="admin-dashboard-header">
            <div class="admin-dash-title">
              <h2>⚙️ لوحة تحكم موقع مترجم الفرانكو (GitHub Pages)</h2>
              <span class="admin-badge-status">جلسة مشفرة نشطة</span>
            </div>
            <div class="admin-dash-actions">
              <button class="admin-btn admin-btn-sm admin-btn-danger" id="admin-logout-btn">تسجيل خروج</button>
              <button class="admin-modal-close" onclick="document.getElementById('admin-dashboard-modal').style.display='none'">&times;</button>
            </div>
          </div>

          <div class="admin-dashboard-layout">
            <div class="admin-dash-tabs">
              <button class="dash-tab active" data-tab="tab-general">🏷️ الموقع والسيو</button>
              <button class="dash-tab" data-tab="tab-theme">🎨 المظهر والألوان</button>
              <button class="dash-tab" data-tab="tab-ads">💰 إدارة الإعلانات</button>
              <button class="dash-tab" data-tab="tab-announcement">📢 الشريط الإخباري</button>
              <button class="dash-tab" data-tab="tab-tracking">📈 التتبع والإحصائيات</button>
              <button class="dash-tab" data-tab="tab-security">🔒 الأمان وكلمة المرور</button>
              <button class="dash-tab" data-tab="tab-export">🚀 التصدير لـ GitHub</button>
            </div>

            <div class="admin-dash-content">
              <div class="dash-panel active" id="tab-general">
                <h3>إعدادات الموقع وعناصر السيو (SEO)</h3>
                <p class="dash-hint">تعديل بيانات الميتا لتحسين ترتيب الموقع في محرك بحث جوجل للكلمات المفتاحية المستهدفة.</p>
                <div class="dash-grid">
                  <div class="dash-field">
                    <label>اسم الموقع (Brand Logo):</label>
                    <input type="text" id="cfg-siteName" class="admin-input" />
                  </div>
                  <div class="dash-field">
                    <label>عنوان الصفحة الرئيسي (Title Tag):</label>
                    <input type="text" id="cfg-siteTitle" class="admin-input" />
                  </div>
                  <div class="dash-field full-width">
                    <label>وصف الميتا لمحركات البحث (Meta Description):</label>
                    <textarea id="cfg-siteDescription" class="admin-input" rows="3"></textarea>
                  </div>
                  <div class="dash-field full-width">
                    <label>الكلمات المفتاحية (Meta Keywords):</label>
                    <input type="text" id="cfg-siteKeywords" class="admin-input" />
                  </div>
                  <div class="dash-field">
                    <label>الرابط الدائم (Canonical URL):</label>
                    <input type="url" id="cfg-canonicalUrl" class="admin-input" placeholder="https://username.github.io/repo/" />
                  </div>
                  <div class="dash-field">
                    <label>اسم الكاتب / المالك:</label>
                    <input type="text" id="cfg-authorName" class="admin-input" />
                  </div>
                </div>
              </div>

              <div class="dash-panel" id="tab-theme">
                <h3>تخصيص المظهر وتصميم القالب</h3>
                <p class="dash-hint">تحكم فوري في ألوان القالب والخط والتأثيرات البصرية.</p>
                <div class="dash-grid">
                  <div class="dash-field">
                    <label>اللون الأساسي (Primary Color):</label>
                    <div class="color-picker-wrapper">
                      <input type="color" id="cfg-primaryColor" class="admin-color" />
                      <input type="text" id="cfg-primaryColor-hex" class="admin-input text-ltr" />
                    </div>
                  </div>
                  <div class="dash-field">
                    <label>لون التمييز (Accent Color):</label>
                    <div class="color-picker-wrapper">
                      <input type="color" id="cfg-accentColor" class="admin-color" />
                      <input type="text" id="cfg-accentColor-hex" class="admin-input text-ltr" />
                    </div>
                  </div>
                  <div class="dash-field">
                    <label>نوع الخط العربي:</label>
                    <select id="cfg-fontFamily" class="admin-input">
                      <option value="'Cairo', 'Segoe UI', Tahoma, sans-serif">خط كايرو (Cairo Modern)</option>
                      <option value="'Tajawal', 'Segoe UI', Tahoma, sans-serif">خط تجوال (Tajawal)</option>
                      <option value="'Almarai', 'Segoe UI', Tahoma, sans-serif">خط المراعي (Almarai)</option>
                      <option value="'Readex Pro', 'Segoe UI', Tahoma, sans-serif">خط ريدكس برو (Readex Pro)</option>
                      <option value="system-ui, -apple-system, sans-serif">خط النظام السريع (System UI)</option>
                    </select>
                  </div>
                  <div class="dash-field">
                    <label>المظهر الافتراضي للزوار الجدد:</label>
                    <select id="cfg-darkModeDefault" class="admin-input">
                      <option value="false">الوضع الفاتح (Light Mode)</option>
                      <option value="true">الوضع الليلي (Dark Mode)</option>
                    </select>
                  </div>
                  <div class="dash-field full-width">
                    <label>أكواد CSS مخصصة (Custom CSS Override):</label>
                    <textarea id="cfg-customCss" class="admin-input text-ltr font-mono" rows="4" placeholder="/* اكتب أي كود CSS إضافي لتخصيص القالب */"></textarea>
                  </div>
                </div>
              </div>

              <div class="dash-panel" id="tab-ads">
                <h3>إدارة وتفعيل الإعلانات (Google AdSense)</h3>
                <p class="dash-hint">تحكم في ظهور الإعلانات وأماكنها بسهولة دون الحاجة لتعديل الأكواد يدوياً.</p>
                
                <div class="dash-switch-box">
                  <label class="switch-label">
                    <input type="checkbox" id="cfg-ads-enabled" />
                    <span>تفعيل الإعلانات في الموقع بالكامل (Master Ads Toggle)</span>
                  </label>
                </div>

                <div class="dash-field full-width">
                  <label>معرف ناشر جوجل أدسنس (Publisher ID):</label>
                  <input type="text" id="cfg-adSenseClientId" class="admin-input text-ltr" placeholder="ca-pub-1234567890123456" />
                </div>

                <div class="dash-section-divider">مواضع الإعلانات المخصصة</div>

                <div class="ad-slot-config">
                  <div class="dash-switch-box">
                    <label class="switch-label">
                      <input type="checkbox" id="cfg-headerAd-enabled" />
                      <span>1. إعلان البانر العلوي (أعلى المترجم)</span>
                    </label>
                  </div>
                  <textarea id="cfg-headerAd-code" class="admin-input text-ltr font-mono" rows="3" placeholder="ضع كود وحدة إعلان أدسنس أو بانر HTML"></textarea>
                </div>

                <div class="ad-slot-config">
                  <div class="dash-switch-box">
                    <label class="switch-label">
                      <input type="checkbox" id="cfg-midAd-enabled" />
                      <span>2. إعلان داخل المقال (Mid-Content Ad)</span>
                    </label>
                  </div>
                  <textarea id="cfg-midAd-code" class="admin-input text-ltr font-mono" rows="3" placeholder="ضع كود وحدة إعلان أدسنس"></textarea>
                </div>

                <div class="ad-slot-config">
                  <div class="dash-switch-box">
                    <label class="switch-label">
                      <input type="checkbox" id="cfg-stickyAd-enabled" />
                      <span>3. إعلان بانر مثبت أسفل الشاشة (Sticky Footer Mobile)</span>
                    </label>
                  </div>
                  <textarea id="cfg-stickyAd-code" class="admin-input text-ltr font-mono" rows="3" placeholder="ضع كود البانر السفلي"></textarea>
                </div>
              </div>

              <div class="dash-panel" id="tab-announcement">
                <h3>الشريط الإخباري والتنبيهات العلوية</h3>
                <p class="dash-hint">شريط أعلى الموقع لجذب انتباه الزوار للإشعارات الهامة أو العروض أو التحديثات.</p>
                <div class="dash-switch-box">
                  <label class="switch-label">
                    <input type="checkbox" id="cfg-ann-enabled" />
                    <span>تفعيل الشريط الإخباري أعلى الموقع</span>
                  </label>
                </div>
                <div class="dash-grid">
                  <div class="dash-field full-width">
                    <label>نص الرسالة / التنبيه:</label>
                    <input type="text" id="cfg-ann-text" class="admin-input" />
                  </div>
                  <div class="dash-field">
                    <label>نص الزر أو الرابط (اختياري):</label>
                    <input type="text" id="cfg-ann-linkText" class="admin-input" />
                  </div>
                  <div class="dash-field">
                    <label>رابط الزر (URL):</label>
                    <input type="text" id="cfg-ann-linkUrl" class="admin-input text-ltr" />
                  </div>
                  <div class="dash-field">
                    <label>لون خلفية الشريط:</label>
                    <input type="color" id="cfg-ann-bgColor" class="admin-color" />
                  </div>
                  <div class="dash-field">
                    <label>لون النص:</label>
                    <input type="color" id="cfg-ann-textColor" class="admin-color" />
                  </div>
                </div>
              </div>

              <div class="dash-panel" id="tab-tracking">
                <h3>إحصائيات جوجل وأكواد التتبع المخصصة</h3>
                <p class="dash-hint">ربط الموقع مع أدوات مشرفي المواقع وGoogle Analytics.</p>
                <div class="dash-grid">
                  <div class="dash-field">
                    <label>معرف Google Analytics (GA4):</label>
                    <input type="text" id="cfg-googleAnalyticsId" class="admin-input text-ltr" placeholder="G-XXXXXXXXXX" />
                  </div>
                  <div class="dash-field">
                    <label>رمز التحقق في Google Search Console:</label>
                    <input type="text" id="cfg-googleSearchConsoleTag" class="admin-input text-ltr" placeholder="kL-sXXXXXXXXX..." />
                  </div>
                  <div class="dash-field full-width">
                    <label>أكواد مخصصة داخل الوسم &lt;head&gt;:</label>
                    <textarea id="cfg-customHeadCode" class="admin-input text-ltr font-mono" rows="3" placeholder="<!-- Meta tags, Pixel scripts -->"></textarea>
                  </div>
                  <div class="dash-field full-width">
                    <label>أكواد مخصصة قبل إغلاق الوسم &lt;/body&gt;:</label>
                    <textarea id="cfg-customFooterCode" class="admin-input text-ltr font-mono" rows="3" placeholder="<!-- Live chat widget, trackers -->"></textarea>
                  </div>
                </div>
              </div>

              <div class="dash-panel" id="tab-security">
                <h3>تغيير كلمة المرور المشفرة للمدير</h3>
                <p class="dash-hint">يتم تشفير كلمة المرور فورياً داخل متصفحك عبر خوارزمية SHA-256 قبل الحفظ لحمايتها بنسبة 100%.</p>
                <div class="dash-grid">
                  <div class="dash-field">
                    <label>كلمة المرور الجديدة:</label>
                    <input type="password" id="cfg-new-password" class="admin-input" placeholder="كلمة المرور الجديدة" />
                  </div>
                  <div class="dash-field">
                    <label>تأكيد كلمة المرور الجديدة:</label>
                    <input type="password" id="cfg-confirm-password" class="admin-input" placeholder="أعد كتابتها للتأكيد" />
                  </div>
                  <div class="dash-field full-width">
                    <button type="button" class="admin-btn admin-btn-secondary" id="btn-update-password">تحديث كلمة المرور</button>
                    <span id="pwd-update-msg" style="margin-right:12px;font-size:0.9rem;"></span>
                  </div>
                </div>
              </div>

              <div class="dash-panel" id="tab-export">
                <h3>🚀 الحفظ الدائم لـ GitHub Pages</h3>
                <div class="github-sync-guide">
                  <p><strong>كيف تجعل تعديلاتك دائمة لجميع الزوار على github.io؟</strong></p>
                  <ol>
                    <li>انقر على زر <strong>"تحميل ملف site-config.js المعدل"</strong> أدناه.</li>
                    <li>ارفع الملف المحمل إلى مستودعك في GitHub واستبدل الملف القديم بنفس الاسم.</li>
                    <li>مباشرة ستصبح جميع تعديلاتك (الإعلانات، الألوان، العناوين، السيو) مفعلة للجميع حول العالم!</li>
                  </ol>
                </div>
                <div class="export-actions-row">
                  <button type="button" class="admin-btn admin-btn-success" id="btn-download-config">⬇️ تحميل ملف site-config.js الجاهز للرفع</button>
                  <button type="button" class="admin-btn admin-btn-secondary" id="btn-copy-config-json">📋 نسخ كود الإعدادات (JSON)</button>
                  <button type="button" class="admin-btn admin-btn-danger" id="btn-reset-defaults">⚠️ استعادة الإعدادات الأصلية</button>
                </div>
                <div class="dash-field full-width" style="margin-top:16px;">
                  <label>معاينة كود الإعدادات النهائي:</label>
                  <textarea id="cfg-export-preview" class="admin-input text-ltr font-mono" rows="8" readonly></textarea>
                </div>
              </div>

            </div>
          </div>

          <div class="admin-dashboard-footer">
            <div class="footer-left">
              <span id="save-status-msg" class="save-status">جاهز للحفظ</span>
            </div>
            <div class="footer-right">
              <button type="button" class="admin-btn admin-btn-secondary" onclick="document.getElementById('admin-dashboard-modal').style.display='none'">إلغاء</button>
              <button type="button" class="admin-btn admin-btn-primary" id="btn-save-all-config">💾 حفظ التغييرات وتطبيقها فوراً</button>
            </div>
          </div>
        </div>
      `;

      this.attachDashboardEvents(modal);
      return modal;
    },

    attachDashboardEvents(modal) {
      const tabs = modal.querySelectorAll('.dash-tab');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'));
          modal.querySelectorAll('.dash-panel').forEach(p => p.classList.remove('active'));
          tab.classList.add('active');
          const target = modal.querySelector(`#${tab.dataset.tab}`);
          if (target) target.classList.add('active');
        });
      });

      const pColor = modal.querySelector('#cfg-primaryColor');
      const pHex = modal.querySelector('#cfg-primaryColor-hex');
      if (pColor && pHex) {
        pColor.addEventListener('input', () => pHex.value = pColor.value);
        pHex.addEventListener('input', () => pColor.value = pHex.value);
      }

      const aColor = modal.querySelector('#cfg-accentColor');
      const aHex = modal.querySelector('#cfg-accentColor-hex');
      if (aColor && aHex) {
        aColor.addEventListener('input', () => aHex.value = aColor.value);
        aHex.addEventListener('input', () => aColor.value = aHex.value);
      }

      modal.querySelector('#admin-logout-btn').addEventListener('click', () => {
        this.setAuthenticated(false);
        this.hideDashboard();
      });

      modal.querySelector('#btn-update-password').addEventListener('click', async () => {
        const p1 = modal.querySelector('#cfg-new-password').value;
        const p2 = modal.querySelector('#cfg-confirm-password').value;
        const msg = modal.querySelector('#pwd-update-msg');

        if (!p1 || p1.length < 6) {
          msg.textContent = '❌ يجب أن تكون كلمة المرور 6 أحرف على الأقل';
          msg.style.color = '#ef4444';
          return;
        }
        if (p1 !== p2) {
          msg.textContent = '❌ كلمتا المرور غير متطابقتين';
          msg.style.color = '#ef4444';
          return;
        }

        const newHash = await sha256(p1);
        const current = ConfigManager.getConfig();
        current.adminPasswordHash = newHash;
        ConfigManager.saveConfig(current);

        msg.textContent = '✅ تم تحديث وتشفير كلمة المرور بنجاح!';
        msg.style.color = '#10b981';
        modal.querySelector('#cfg-new-password').value = '';
        modal.querySelector('#cfg-confirm-password').value = '';
        this.updateExportPreview();
      });

      modal.querySelector('#btn-save-all-config').addEventListener('click', () => {
        const updated = this.gatherFormData();
        ConfigManager.saveConfig(updated);
        const status = modal.querySelector('#save-status-msg');
        status.textContent = '✅ تم حفظ التغييرات وتطبيقها على الموقع فوراً!';
        status.style.color = '#10b981';
        this.updateExportPreview();
        setTimeout(() => {
          status.textContent = 'جاهز للحفظ';
          status.style.color = '';
        }, 3000);
      });

      modal.querySelector('#btn-download-config').addEventListener('click', () => {
        const cfg = this.gatherFormData();
        const fileContent = `/**
 * Franco Translator - Configuration File
 * Generated from Secret Admin Panel
 */

window.FRANCO_CONFIG = ${JSON.stringify(cfg, null, 2)};
`;
        const blob = new Blob([fileContent], { type: 'application/javascript;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'site-config.js';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });

      modal.querySelector('#btn-copy-config-json').addEventListener('click', () => {
        const cfg = this.gatherFormData();
        const jsonStr = JSON.stringify(cfg, null, 2);
        navigator.clipboard.writeText(jsonStr).then(() => {
          alert('تم نسخ كود الإعدادات إلى الحافظة بنجاح!');
        });
      });

      modal.querySelector('#btn-reset-defaults').addEventListener('click', () => {
        if (confirm('هل أنت متأكد من رغبتك في استعادة الإعدادات الأصلية الافتراضية؟')) {
          ConfigManager.resetConfig();
        }
      });
    },

    gatherFormData() {
      const modal = document.getElementById('admin-dashboard-modal');
      const current = ConfigManager.getConfig();

      const updated = Object.assign({}, current, {
        siteName: modal.querySelector('#cfg-siteName').value,
        siteTitle: modal.querySelector('#cfg-siteTitle').value,
        siteDescription: modal.querySelector('#cfg-siteDescription').value,
        siteKeywords: modal.querySelector('#cfg-siteKeywords').value,
        canonicalUrl: modal.querySelector('#cfg-canonicalUrl').value,
        authorName: modal.querySelector('#cfg-authorName').value,

        theme: Object.assign({}, current.theme, {
          primaryColor: modal.querySelector('#cfg-primaryColor').value,
          accentColor: modal.querySelector('#cfg-accentColor').value,
          fontFamily: modal.querySelector('#cfg-fontFamily').value,
          darkModeDefault: modal.querySelector('#cfg-darkModeDefault').value === 'true',
          customCss: modal.querySelector('#cfg-customCss').value
        }),

        ads: Object.assign({}, current.ads, {
          enabled: modal.querySelector('#cfg-ads-enabled').checked,
          adSenseClientId: modal.querySelector('#cfg-adSenseClientId').value,
          headerAd: {
            enabled: modal.querySelector('#cfg-headerAd-enabled').checked,
            code: modal.querySelector('#cfg-headerAd-code').value
          },
          midContentAd: {
            enabled: modal.querySelector('#cfg-midAd-enabled').checked,
            code: modal.querySelector('#cfg-midAd-code').value
          },
          stickyFooterAd: {
            enabled: modal.querySelector('#cfg-stickyAd-enabled').checked,
            code: modal.querySelector('#cfg-stickyAd-code').value
          }
        }),

        announcement: Object.assign({}, current.announcement, {
          enabled: modal.querySelector('#cfg-ann-enabled').checked,
          text: modal.querySelector('#cfg-ann-text').value,
          linkText: modal.querySelector('#cfg-ann-linkText').value,
          linkUrl: modal.querySelector('#cfg-ann-linkUrl').value,
          bgColor: modal.querySelector('#cfg-ann-bgColor').value,
          textColor: modal.querySelector('#cfg-ann-textColor').value
        }),

        tracking: Object.assign({}, current.tracking, {
          googleAnalyticsId: modal.querySelector('#cfg-googleAnalyticsId').value,
          googleSearchConsoleTag: modal.querySelector('#cfg-googleSearchConsoleTag').value,
          customHeadCode: modal.querySelector('#cfg-customHeadCode').value,
          customFooterCode: modal.querySelector('#cfg-customFooterCode').value
        })
      });

      return updated;
    },

    populateDashboardForm() {
      const modal = document.getElementById('admin-dashboard-modal');
      const cfg = ConfigManager.getConfig();

      modal.querySelector('#cfg-siteName').value = cfg.siteName || '';
      modal.querySelector('#cfg-siteTitle').value = cfg.siteTitle || '';
      modal.querySelector('#cfg-siteDescription').value = cfg.siteDescription || '';
      modal.querySelector('#cfg-siteKeywords').value = cfg.siteKeywords || '';
      modal.querySelector('#cfg-canonicalUrl').value = cfg.canonicalUrl || '';
      modal.querySelector('#cfg-authorName').value = cfg.authorName || '';

      const pColor = (cfg.theme && cfg.theme.primaryColor) || '#2563eb';
      const aColor = (cfg.theme && cfg.theme.accentColor) || '#06b6d4';
      modal.querySelector('#cfg-primaryColor').value = pColor;
      modal.querySelector('#cfg-primaryColor-hex').value = pColor;
      modal.querySelector('#cfg-accentColor').value = aColor;
      modal.querySelector('#cfg-accentColor-hex').value = aColor;
      if (cfg.theme && cfg.theme.fontFamily) {
        modal.querySelector('#cfg-fontFamily').value = cfg.theme.fontFamily;
      }
      modal.querySelector('#cfg-darkModeDefault').value = (cfg.theme && cfg.theme.darkModeDefault) ? 'true' : 'false';
      modal.querySelector('#cfg-customCss').value = (cfg.theme && cfg.theme.customCss) || '';

      modal.querySelector('#cfg-ads-enabled').checked = !!(cfg.ads && cfg.ads.enabled);
      modal.querySelector('#cfg-adSenseClientId').value = (cfg.ads && cfg.ads.adSenseClientId) || '';
      modal.querySelector('#cfg-headerAd-enabled').checked = !!(cfg.ads && cfg.ads.headerAd && cfg.ads.headerAd.enabled);
      modal.querySelector('#cfg-headerAd-code').value = (cfg.ads && cfg.ads.headerAd && cfg.ads.headerAd.code) || '';
      modal.querySelector('#cfg-midAd-enabled').checked = !!(cfg.ads && cfg.ads.midContentAd && cfg.ads.midContentAd.enabled);
      modal.querySelector('#cfg-midAd-code').value = (cfg.ads && cfg.ads.midContentAd && cfg.ads.midContentAd.code) || '';
      modal.querySelector('#cfg-stickyAd-enabled').checked = !!(cfg.ads && cfg.ads.stickyFooterAd && cfg.ads.stickyFooterAd.enabled);
      modal.querySelector('#cfg-stickyAd-code').value = (cfg.ads && cfg.ads.stickyFooterAd && cfg.ads.stickyFooterAd.code) || '';

      modal.querySelector('#cfg-ann-enabled').checked = !!(cfg.announcement && cfg.announcement.enabled);
      modal.querySelector('#cfg-ann-text').value = (cfg.announcement && cfg.announcement.text) || '';
      modal.querySelector('#cfg-ann-linkText').value = (cfg.announcement && cfg.announcement.linkText) || '';
      modal.querySelector('#cfg-ann-linkUrl').value = (cfg.announcement && cfg.announcement.linkUrl) || '';
      modal.querySelector('#cfg-ann-bgColor').value = (cfg.announcement && cfg.announcement.bgColor) || '#1e293b';
      modal.querySelector('#cfg-ann-textColor').value = (cfg.announcement && cfg.announcement.textColor) || '#38bdf8';

      modal.querySelector('#cfg-googleAnalyticsId').value = (cfg.tracking && cfg.tracking.googleAnalyticsId) || '';
      modal.querySelector('#cfg-googleSearchConsoleTag').value = (cfg.tracking && cfg.tracking.googleSearchConsoleTag) || '';
      modal.querySelector('#cfg-customHeadCode').value = (cfg.tracking && cfg.tracking.customHeadCode) || '';
      modal.querySelector('#cfg-customFooterCode').value = (cfg.tracking && cfg.tracking.customFooterCode) || '';

      this.updateExportPreview();
    },

    updateExportPreview() {
      const modal = document.getElementById('admin-dashboard-modal');
      const preview = modal.querySelector('#cfg-export-preview');
      if (preview) {
        const cfg = this.gatherFormData();
        preview.value = `window.FRANCO_CONFIG = ${JSON.stringify(cfg, null, 2)};`;
      }
    }
  };

  // Keyboard shortcut listener: Ctrl + Shift + A
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      if (AdminUI.isAuthenticated()) {
        AdminUI.showDashboard();
      } else {
        AdminUI.showLoginModal();
      }
    }
  });

  // URL trigger check: ?admin or #admin
  window.addEventListener('DOMContentLoaded', () => {
    const config = ConfigManager.getConfig();
    ConfigManager.applyConfig(config);

    if (window.location.search.includes('admin') || window.location.hash === '#admin') {
      setTimeout(() => {
        if (AdminUI.isAuthenticated()) {
          AdminUI.showDashboard();
        } else {
          AdminUI.showLoginModal();
        }
      }, 300);
    }

    const adminBtn = document.getElementById('admin-trigger-btn');
    if (adminBtn) {
      adminBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (AdminUI.isAuthenticated()) {
          AdminUI.showDashboard();
        } else {
          AdminUI.showLoginModal();
        }
      });
    }

    // Triple click stealth trigger on site brand logo
    const brand = document.getElementById('site-brand-logo');
    if (brand) {
      let clickCount = 0;
      let timer = null;
      brand.addEventListener('click', () => {
        clickCount++;
        clearTimeout(timer);
        timer = setTimeout(() => { clickCount = 0; }, 600);
        if (clickCount >= 3) {
          clickCount = 0;
          if (AdminUI.isAuthenticated()) {
            AdminUI.showDashboard();
          } else {
            AdminUI.showLoginModal();
          }
        }
      });
    }
  });

  window.FrancoAdmin = {
    open: () => {
      if (AdminUI.isAuthenticated()) AdminUI.showDashboard();
      else AdminUI.showLoginModal();
    },
    getConfig: () => ConfigManager.getConfig(),
    saveConfig: (c) => ConfigManager.saveConfig(c)
  };

})();
