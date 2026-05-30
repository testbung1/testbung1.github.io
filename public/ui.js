/**
 * Client UI logic for khoindvn.io.vn (Astro port)
 * Typing effect, navigation, socials, theme, language, ESign/KSign tabs, Google Analytics.
 * Certificate list rendering is done at build time by Astro, so no fetch/render here.
 */

(function () {
  'use strict';

  const TYPING_CONFIG = {
    texts: ["Seller.", "Designer.", "Developer."],
    typingSpeed: 110,
    deletingSpeed: 55,
    pauseAfterType: 2200
  };

  const SOCIAL_ICONS = {
    facebook: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#1877f2"/>
      <path d="M16 8h-2a1 1 0 0 0-1 1v2h3l-.5 3H13v7h-3v-7H8v-3h2V9a4 4 0 0 1 4-4h2v3z" fill="white"/>
    </svg>`,
    messenger: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#0084ff"/>
      <path d="M12 2C6.5 2 2 6.2 2 11.4c0 2.9 1.4 5.4 3.6 7.1v3.5l3.3-1.8c.9.2 1.8.3 2.1.3 5.5 0 10-4.2 10-9.4S17.5 2 12 2zm1 12.6l-2.5-2.7-4.9 2.7 5.4-5.7 2.6 2.7 4.8-2.7-5.4 5.7z" fill="white"/>
    </svg>`,
    telegram: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#2196f3"/>
      <path d="M20.7 3.3L2.3 10.2c-.9.4-.9 1 0 1.2l4.6 1.4 1.7 5.3c.2.6.4.8.8.8.4 0 .6-.2.9-.5l2.2-2.1 4.6 3.4c.8.5 1.4.2 1.6-.7l3-14.2c.3-1.1-.4-1.6-1.1-1.5zm-3.4 4.4L9 14.5l-.3 3.3-1.7-5.3 11.3-4.8z" fill="white"/>
    </svg>`,
    zalo: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#0068ff"/>
      <text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" font-family="-apple-system,Arial,sans-serif" font-weight="900" font-size="10" fill="white">Zalo</text>
    </svg>`
  };

  const SOCIAL_LINKS = [
    { name: "facebook", url: "https://www.facebook.com/share/1XH7kThUjd/?mibextid=wwXIfr" },
    { name: "messenger", url: "https://m.me/khoindvn.esigncert" },
    { name: "telegram", url: "https://t.me/m/7P3IVuTSYTQ1" },
    { name: "zalo", url: "https://zalo.me/0386495528" }
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingTimeout = null;

  function typeText() {
    const el = document.getElementById("typed-text");
    if (!el) return;
    if (typingTimeout) clearTimeout(typingTimeout);

    const fullText = TYPING_CONFIG.texts[textIndex];
    if (isDeleting) {
      el.textContent = fullText.slice(0, --charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % TYPING_CONFIG.texts.length;
      }
      typingTimeout = setTimeout(typeText, TYPING_CONFIG.deletingSpeed);
    } else {
      el.textContent = fullText.slice(0, ++charIndex);
      if (charIndex === fullText.length) {
        isDeleting = true;
        typingTimeout = setTimeout(typeText, TYPING_CONFIG.pauseAfterType);
        return;
      }
      typingTimeout = setTimeout(typeText, TYPING_CONFIG.typingSpeed);
    }
  }

  function animateSkillBars() {
    document.querySelectorAll(".skill-fill").forEach(el => {
      el.style.width = el.dataset.percent || "0%";
    });
  }

  function handleScrollAnimation() {
    const skillsCard = document.querySelector(".skills-card");
    if (skillsCard) {
      const top = skillsCard.getBoundingClientRect().top;
      if (top < window.innerHeight) {
        animateSkillBars();
        window.removeEventListener("scroll", handleScrollAnimation);
      }
    }
  }

  function initNav() {
    const menuBtn = document.getElementById("menu-button");
    const navLinks = document.getElementById("nav-links");
    if (menuBtn && navLinks) {
      menuBtn.addEventListener("click", () => {
        const show = navLinks.classList.toggle("show");
        menuBtn.setAttribute("aria-expanded", String(show));
      });
      navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("show");
          menuBtn.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  function initSocials() {
    const container = document.querySelector(".social-buttons");
    if (!container) return;
    SOCIAL_LINKS.forEach(({ name, url }) => {
      const btn = document.createElement("button");
      btn.className = "social-btn";
      btn.setAttribute("aria-label", name);
      btn.innerHTML = SOCIAL_ICONS[name] || "";
      btn.addEventListener("click", () => window.open(url, "_blank"));
      container.appendChild(btn);
    });
  }

  function updateThemeIcon(theme) {
    const themeIcon = document.getElementById("themeIcon");
    if (!themeIcon) return;
    if (theme === "dark") {
      themeIcon.innerHTML = `
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      `;
    } else {
      themeIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />`;
    }
  }

  function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    if (newTheme === 'dark') {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
    }
    try { localStorage.setItem('theme', newTheme); } catch (e) {}
    updateThemeIcon(newTheme);
  }

  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem('theme'); } catch (e) {}
    const theme = saved
      ? saved
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    updateThemeIcon(theme);
  }

  function setLang(lang) {
    const btn = document.getElementById('langBtn');
    if (!btn) return;
    const isVI = lang === 'VI';
    btn.innerText = isVI ? 'VI' : 'EN';
    try { localStorage.setItem('lang', isVI ? 'VI' : 'EN'); } catch (e) {}

    const showClass = isVI ? '.lang-vi' : '.lang-en';
    const hideClass = isVI ? '.lang-en' : '.lang-vi';
    document.querySelectorAll(hideClass).forEach(el => el.style.display = 'none');
    document.querySelectorAll(showClass).forEach(el => {
      const tag = el.tagName;
      if (tag === 'P' || tag === 'DIV' || tag === 'H2' || tag === 'H3' || tag === 'H4') {
        el.style.display = 'block';
      } else {
        el.style.display = 'inline-block';
      }
    });
  }

  function toggleLang() {
    const btn = document.getElementById('langBtn');
    if (!btn) return;
    setLang(btn.innerText === 'VI' ? 'EN' : 'VI');
  }

  function initLang() {
    let saved = null;
    try { saved = localStorage.getItem('lang'); } catch (e) {}
    if (saved === 'VI' || saved === 'EN') { setLang(saved); return; }
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang && browserLang.toLowerCase().includes('vi')) setLang('VI');
    else setLang('EN');
  }

  function switchTab(tab) {
    const thumb = document.getElementById('seg-thumb');
    const btnE = document.getElementById('tab-esign');
    const btnK = document.getElementById('tab-ksign');
    const panE = document.getElementById('panel-esign');
    const panK = document.getElementById('panel-ksign');
    if (!thumb || !btnE || !btnK || !panE || !panK) return;

    if (tab === 'esign') {
      thumb.style.transform = 'translateX(0)';
      btnE.classList.add('active');
      btnE.setAttribute('aria-selected', 'true');
      btnK.classList.remove('active');
      btnK.setAttribute('aria-selected', 'false');
      panE.hidden = false;
      panE.classList.remove('tab-panel');
      void panE.offsetWidth;
      panE.classList.add('tab-panel');
      panK.hidden = true;
    } else {
      let attempts = 0;
      const updatePosition = () => {
        if (btnE.offsetWidth === 0) {
          if (++attempts < 100) requestAnimationFrame(updatePosition);
          return;
        }
        thumb.style.transform = `translateX(${btnE.offsetWidth}px)`;
      };
      requestAnimationFrame(updatePosition);
      btnK.classList.add('active');
      btnK.setAttribute('aria-selected', 'true');
      btnE.classList.remove('active');
      btnE.setAttribute('aria-selected', 'false');
      panK.hidden = false;
      panK.classList.remove('tab-panel');
      void panK.offsetWidth;
      panK.classList.add('tab-panel');
      panE.hidden = true;
    }
  }

  function loadGoogleAnalytics() {
    if (window.gaLoaded) return;
    window.gaLoaded = true;
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-CLK70W4PDR";
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', 'G-CLK70W4PDR');
  }

  // Expose for inline onclick handlers in the markup
  window.setLang = setLang;
  window.toggleLang = toggleLang;
  window.switchTab = switchTab;
  window.toggleTheme = toggleTheme;

  document.addEventListener("DOMContentLoaded", () => {
    initNav();
    initSocials();
    initTheme();
    initLang();
    typeText();
    loadGoogleAnalytics();
    window.addEventListener("scroll", handleScrollAnimation, { passive: true });
    handleScrollAnimation();
  });

  window.addEventListener("pagehide", () => {
    if (typingTimeout) clearTimeout(typingTimeout);
  });
})();
