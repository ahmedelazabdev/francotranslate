/**
 * Franco Translator - Default Configuration
 * This file can be modified directly or updated via the Secret Admin Panel.
 * To apply your admin settings permanently for all visitors on GitHub Pages:
 * Copy the exported JSON from the Admin Panel and paste it into this file.
 */

window.FRANCO_CONFIG = {
  // Master Admin Password Hash (SHA-256 for initial password: "admin123")
  adminPasswordHash: "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9",

  // Site Identity & SEO Meta
  siteName: "مترجم فرانكو الفوري | Franco Translator",
  siteTitle: "مترجم فرانكو - ترجمه فرانكو عربي وتحويل الفرانكو إلى عربي فوري 2026",
  siteDescription: "أفضل مترجم فرانكو فوري لتحويل الفرانكو إلى عربي ومن عربي لفرانكو بدقة وسرعة فائقة. يشمل جدول أرقام الفرانكو وقاموس الشات والرموز مع نطق صوتي مجاناً.",
  siteKeywords: "مترجم فرانكو, ترجمه فرانكو, فرانكو ترجمه, فرانكو عربي, تحويل فرانكو لعربي, ترجمة فرانكو, ارقام الفرانكو, فرانكو تو اربيك, franco translator, arabizi",
  canonicalUrl: "https://username.github.io/franco-translator/",
  authorName: "فريق مترجم فرانكو",

  // Branding & Visual Theme
  theme: {
    primaryColor: "#2563eb",
    accentColor: "#06b6d4",
    primaryHover: "#1d4ed8",
    fontFamily: "'Cairo', 'Segoe UI', Tahoma, sans-serif",
    darkModeDefault: false,
    headerGradient: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #0f172a 100%)",
    enableGlassmorphism: true
  },

  // Announcement Bar
  announcement: {
    enabled: true,
    text: "🔥 تم تحديث مترجم الفرانكو 2026! يدعم الآن كافة اختصارات السوشيال ميديا وقاموس الشات الصوتي مجاناً.",
    linkText: "تعرف على الأرقام",
    linkUrl: "#franco-table",
    bgColor: "#1e293b",
    textColor: "#38bdf8"
  },

  // AdSense & Monetization Settings
  ads: {
    enabled: true,
    adSenseClientId: "",
    headerAd: {
      enabled: true,
      code: '<div class="ad-placeholder-box"><span class="ad-badge">إعلان</span><p class="ad-text">مساحة إعلانية علوية (728x90 / متجاوبة)<br><small>يمكنك وضع كود جوجل أدسنس أو البانر الخاص بك من لوحة التحكم</small></p></div>'
    },
    midContentAd: {
      enabled: true,
      code: '<div class="ad-placeholder-box in-article"><span class="ad-badge">إعلان</span><p class="ad-text">مساحة إعلانية داخل المقال (300x250 أو بانر متجاوب)<br><small>تظهر لزوار جوجل داخل المقال المتوافق مع السيو</small></p></div>'
    },
    stickyFooterAd: {
      enabled: true,
      code: '<div class="sticky-ad-inner"><span class="ad-badge">إعلان ممول</span><span class="sticky-ad-text">بانر إعلاني مثبت أسفل الشاشة للموبايل والكمبيوتر (قابلة للإخفاء من لوحة التحكم)</span></div>'
    }
  },

  // Tracking & Analytics
  tracking: {
    googleAnalyticsId: "",
    googleSearchConsoleTag: "",
    customHeadCode: "",
    customFooterCode: ""
  },

  // Converter Preferences
  converter: {
    liveTranslate: true,
    debounceMs: 150,
    defaultDirection: "auto",
    showOnScreenKeypad: true,
    enableTextToSpeech: true
  }
};
