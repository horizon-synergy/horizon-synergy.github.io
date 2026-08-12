(function () {
  "use strict";

  /* ============================================================
     Theme system
     ============================================================ */
  var THEMES = {
    default: {
      label: "Default",
      tokens: {
        primary: "#3A606E",
        secondary: "#607B7D",
        tertiary: "#828E82",
        accent: "#AAAE8E",
        surface: "#E0E0E0",
      },
    },
    nature: {
      label: "Nature",
      tokens: {
        primary: "#002400",
        secondary: "#273B09",
        tertiary: "#58641D",
        accent: "#7B904B",
        surface: "#DBD2E0",
      },
    },
    noir: {
      label: "Noir",
      tokens: {
        primary: "#14110F",
        secondary: "#34312D",
        tertiary: "#7E7F83",
        accent: "#D9C5B2",
        surface: "#F3F3F4",
      },
    },
    earth: {
      label: "Earth",
      tokens: {
        primary: "#1B2021",
        secondary: "#51513D",
        tertiary: "#A6A867",
        accent: "#E3DC95",
        surface: "#E3DCC2",
      },
    },
  };
  var THEME_ORDER = ["default", "nature", "noir", "earth"];
  var STORAGE_KEY = "likhaya-theme";

  function applyTheme(key) {
    var tokens = (THEMES[key] || THEMES.default).tokens;
    var root = document.documentElement;
    root.style.setProperty("--lk-primary", tokens.primary);
    root.style.setProperty("--lk-secondary", tokens.secondary);
    root.style.setProperty("--lk-tertiary", tokens.tertiary);
    root.style.setProperty("--lk-accent", tokens.accent);
    root.style.setProperty("--lk-surface", tokens.surface);
    root.setAttribute("data-lk-theme", key);
  }

  function setTheme(key) {
    if (!THEMES[key]) return;
    applyTheme(key);
    try {
      window.localStorage.setItem(STORAGE_KEY, key);
    } catch (err) {
      /* ignore */
    }
    updateActivePills(key);
  }

  function updateActivePills(activeKey) {
    var pills = document.querySelectorAll(".lk-theme-pill");
    pills.forEach(function (pill) {
      var isActive = pill.getAttribute("data-theme-key") === activeKey;
      pill.classList.toggle("is-active", isActive);
      pill.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function buildThemeSwitcher(container, id) {
    container.setAttribute("role", "group");
    container.setAttribute("aria-label", "Choose a LIKHAIA theme");
    container.classList.add("lk-theme-switcher");

    THEME_ORDER.forEach(function (key) {
      var theme = THEMES[key];
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "lk-theme-pill";
      btn.setAttribute("data-theme-key", key);
      btn.setAttribute("aria-pressed", "false");
      btn.id = "lk-theme-" + id + "-" + key;

      var swatch = document.createElement("span");
      swatch.className = "lk-theme-swatch";
      swatch.setAttribute("aria-hidden", "true");
      swatch.style.background =
        "linear-gradient(135deg, " +
        theme.tokens.primary +
        " 0%, " +
        theme.tokens.accent +
        " 55%, " +
        theme.tokens.surface +
        " 100%)";

      var label = document.createElement("span");
      label.className = "lk-theme-label";
      label.textContent = theme.label;

      btn.appendChild(swatch);
      btn.appendChild(label);
      btn.addEventListener("click", function () {
        setTheme(key);
      });

      container.appendChild(btn);
    });
  }

  function initThemeSwitchers() {
    var containers = document.querySelectorAll("[data-theme-switcher]");
    containers.forEach(function (container) {
      buildThemeSwitcher(
        container,
        container.getAttribute("data-id") || "switcher",
      );
    });
  }

  function initTheme() {
    var stored = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      stored = null;
    }
    var initial = stored && THEMES[stored] ? stored : "default";
    applyTheme(initial);
    updateActivePills(initial);
  }

  /* ============================================================
     Contour / topography motif (signature illustration)
     ============================================================ */
  function contourSVG() {
    return (
      "" +
      '<svg viewBox="0 0 600 600" fill="none" aria-hidden="true">' +
      '<path d="M300 40C420 40 540 130 540 260C540 380 450 470 320 480C210 488 90 430 60 330C34 244 90 150 190 100C230 80 265 40 300 40Z" stroke="var(--lk-tertiary)" stroke-width="1"></path>' +
      '<path d="M300 90C400 90 495 165 495 265C495 365 420 440 315 448C222 455 122 405 98 320C77 248 122 172 205 132C238 116 266 90 300 90Z" stroke="var(--lk-tertiary)" stroke-width="1"></path>' +
      '<path d="M303 145C380 145 452 202 452 275C452 350 393 408 310 414C238 420 158 382 140 315C124 257 160 198 226 168C252 156 274 145 303 145Z" stroke="var(--lk-accent)" stroke-width="1.25"></path>' +
      '<path d="M305 200C360 200 410 240 410 288C410 335 370 375 312 379C264 383 205 356 192 308C181 267 207 226 254 205C271 198 289 200 305 200Z" stroke="var(--lk-accent)" stroke-width="1.5"></path>' +
      '<circle cx="305" cy="290" r="26" fill="var(--lk-accent)" opacity="0.55"></circle>' +
      "</svg>"
    );
  }

  function initContours() {
    var slots = document.querySelectorAll("[data-contour]");
    slots.forEach(function (slot) {
      slot.classList.add("lk-contour");
      slot.style.opacity = slot.getAttribute("data-opacity") || "1";
      slot.innerHTML = contourSVG();
    });
  }

  /* ============================================================
     Mobile menu
     ============================================================ */
  function initMobileMenu() {
    var toggle = document.getElementById("lk-menu-toggle");
    var menu = document.getElementById("lk-mobile-menu");
    var burger = document.getElementById("lk-burger");
    if (!toggle || !menu) return;

    function close() {
      menu.classList.remove("is-open");
      burger.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
    function open() {
      menu.classList.add("is-open");
      burger.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
    }

    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.contains("is-open");
      if (isOpen) {
        close();
      } else {
        open();
      }
    });

    var links = menu.querySelectorAll("[data-mobile-link]");
    links.forEach(function (link) {
      link.addEventListener("click", close);
    });
  }

  /* ============================================================
     Newsletter forms
     ============================================================ */
  function initNewsletterForms() {
    var forms = document.querySelectorAll("[data-newsletter-form]");
    forms.forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var input = form.querySelector("input[type=email]");
        if (!input || !input.value) return;
        var note = form.querySelector("[data-newsletter-note]");
        // NOTE: this UI is structured for a Beehiiv embed / API call.
        // No request is made yet, so we never claim a real subscription.
        if (note) {
          note.textContent =
            "Sign-ups aren't open yet. We'll share this space here once they are.";
        }
      });
    });
  }

  /* ============================================================
     Reveal-on-scroll (respects prefers-reduced-motion)
     ============================================================ */
  function initReveal() {
    var items = document.querySelectorAll(".lk-reveal");
    var prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced || !("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ============================================================
     Footer year
     ============================================================ */
  function initFooterYear() {
    var el = document.getElementById("lk-footer-year");
    if (el) {
      el.textContent =
        "\u00A9 " + new Date().getFullYear() + " LIKHAYA. All rights reserved.";
    }
  }

  /* ============================================================
     Init
     ============================================================ */
  document.addEventListener("DOMContentLoaded", function () {
    initThemeSwitchers();
    initTheme();
    initContours();
    initMobileMenu();
    initNewsletterForms();
    initReveal();
    initFooterYear();
  });
})();
