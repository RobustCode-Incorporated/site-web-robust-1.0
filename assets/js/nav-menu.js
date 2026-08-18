(function () {
  var HEADER_ENTRANCE_FALLBACK_MS = 4000;

  function initHeaderEntrance() {
    var header = document.getElementById("main-header");
    if (!header) return;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (typeof window.gsap === "undefined" || reduceMotion) {
      header.style.opacity = "1";
      return;
    }

    var gsap = window.gsap;
    var played = false;

    function play() {
      if (played) return;
      played = true;
      gsap.to(header, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });
    }

    gsap.set(header, { yPercent: -100, opacity: 0 });

    // Only index.html carries the binary-sphere intro; every other page
    // should play its header entrance immediately rather than wait for an
    // event that will never fire.
    var hasIntro = document.getElementById("ecosystem-section") && document.getElementById("binary-sphere-canvas");
    if (hasIntro) {
      window.addEventListener("robustcode:intro-complete", play, { once: true });
      setTimeout(play, HEADER_ENTRANCE_FALLBACK_MS);
    } else {
      play();
    }
  }

  function initHeaderScrollMorph() {
    var header = document.getElementById("main-header");
    if (!header || typeof window.gsap === "undefined" || !window.ScrollTrigger) return;

    window.gsap.registerPlugin(window.ScrollTrigger);

    window.ScrollTrigger.create({
      start: "top -50",
      onEnter: function () {
        header.classList.add("is-scrolled");
      },
      onLeaveBack: function () {
        header.classList.remove("is-scrolled");
      },
    });
  }

  function initNavMenu() {
    if (typeof window.gsap === "undefined") return;
    var gsap = window.gsap;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var burger = document.getElementById("menu-burger");
    var overlay = document.getElementById("menu-overlay");
    if (!burger || !overlay) return;

    var bg = overlay.querySelector(".menu-overlay-bg");
    var mobileLinks = overlay.querySelectorAll(".mobile-link");
    var footer = overlay.querySelector(".menu-overlay-footer");
    var burgerLines = burger.querySelectorAll(".burger-line");

    if (reduceMotion) {
      burger.addEventListener("click", function () {
        var isOpen = overlay.classList.toggle("is-open");
        burger.setAttribute("aria-expanded", String(isOpen));
        overlay.setAttribute("aria-hidden", String(!isOpen));
        document.body.style.overflow = isOpen ? "hidden" : "";
      });
      overlay.querySelectorAll(".mobile-link").forEach(function (link) {
        link.addEventListener("click", function () {
          overlay.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
          overlay.setAttribute("aria-hidden", "true");
          document.body.style.overflow = "";
        });
      });
      return;
    }

    gsap.set(bg, { opacity: 0 });
    gsap.set(mobileLinks, { yPercent: 100 });
    if (footer) gsap.set(footer, { opacity: 0 });
    gsap.set(burgerLines, { x: 0, y: 0, rotate: 0, opacity: 1 });

    var tl = gsap.timeline({
      paused: true,
      onReverseComplete: function () {
        overlay.classList.remove("is-open");
      },
    });

    tl.to(bg, { opacity: 1, duration: 0.5, ease: "power4.inOut" }, 0)
      .to(mobileLinks, { yPercent: 0, duration: 0.5, stagger: 0.06, ease: "power3.out" }, 0.15)
      .to(footer, { opacity: 1, duration: 0.4, ease: "power2.out" }, 0.5)
      .to(burgerLines[0], { y: 7, rotate: 45, duration: 0.35, ease: "power2.inOut" }, 0)
      .to(burgerLines[1], { opacity: 0, duration: 0.2, ease: "power2.inOut" }, 0)
      .to(burgerLines[2], { y: -7, rotate: -45, duration: 0.35, ease: "power2.inOut" }, 0);

    var isOpen = false;

    function openMenu() {
      isOpen = true;
      burger.setAttribute("aria-expanded", "true");
      overlay.setAttribute("aria-hidden", "false");
      overlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
      tl.timeScale(1).play();
    }

    function closeMenu() {
      isOpen = false;
      burger.setAttribute("aria-expanded", "false");
      overlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      tl.timeScale(1.5).reverse();
    }

    burger.addEventListener("click", function () {
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (isOpen) closeMenu();
      });
    });

    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen) closeMenu();
    });
  }

  function initLangSwitcher() {
    var switches = document.querySelectorAll(".lang-switch");
    if (!switches.length) return;

    var gsap = window.gsap;
    var hasGsap = typeof gsap !== "undefined";
    var entries = [];

    switches.forEach(function (switchEl) {
      var toggle = switchEl.querySelector(".lang-toggle");
      var options = switchEl.querySelector(".lang-options");
      if (!toggle || !options) return;

      if (hasGsap) {
        gsap.set(options, { opacity: 0, scale: 0.95, y: -10 });
      }

      entries.push({ switchEl: switchEl, toggle: toggle, options: options });
    });

    function close(entry) {
      entry.switchEl.classList.remove("is-open");
      entry.toggle.setAttribute("aria-expanded", "false");
      if (hasGsap) {
        gsap.to(entry.options, { opacity: 0, scale: 0.95, y: -10, duration: 0.2, ease: "power2.in" });
      } else {
        entry.options.style.opacity = "0";
      }
    }

    function open(entry) {
      entry.switchEl.classList.add("is-open");
      entry.toggle.setAttribute("aria-expanded", "true");
      if (hasGsap) {
        gsap.to(entry.options, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power3.out" });
      } else {
        entry.options.style.opacity = "1";
      }
    }

    function closeAllExcept(exceptEntry) {
      entries.forEach(function (entry) {
        if (entry !== exceptEntry && entry.switchEl.classList.contains("is-open")) close(entry);
      });
    }

    entries.forEach(function (entry) {
      entry.toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        var willOpen = !entry.switchEl.classList.contains("is-open");
        closeAllExcept(willOpen ? entry : null);
        if (willOpen) open(entry);
        else close(entry);
      });

      entry.switchEl.querySelectorAll(".lang-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          close(entry);
        });
      });
    });

    document.addEventListener("click", function (e) {
      entries.forEach(function (entry) {
        if (entry.switchEl.classList.contains("is-open") && !entry.switchEl.contains(e.target)) close(entry);
      });
    });

    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAllExcept(null);
    });
  }

  function init() {
    initHeaderEntrance();
    initHeaderScrollMorph();
    initNavMenu();
    initLangSwitcher();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
