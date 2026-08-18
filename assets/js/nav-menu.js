(function () {
  function initNavMenu() {
    if (typeof window.gsap === "undefined") return;
    var gsap = window.gsap;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var header = document.getElementById("main-header");
    var burger = document.getElementById("menu-burger");
    var overlay = document.getElementById("menu-overlay");

    // Desktop nav entrance: logo + links drop in from the top.
    if (header) {
      var navLogo = header.querySelector(".nav-logo");
      var desktopItems = header.querySelectorAll(".desktop-nav a, .desktop-nav button");
      var introTargets = navLogo ? [navLogo].concat(Array.from(desktopItems)) : Array.from(desktopItems);

      if (introTargets.length) {
        if (reduceMotion) {
          gsap.set(introTargets, { opacity: 1, y: 0 });
        } else {
          gsap.from(introTargets, {
            opacity: 0,
            y: -20,
            duration: 0.6,
            stagger: 0.05,
            ease: "power3.out",
            clearProps: "opacity,transform",
          });
        }
      }
    }

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

    function closeSwitch(switchEl) {
      switchEl.classList.remove("is-open");
      var toggle = switchEl.querySelector(".lang-toggle");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    }

    function closeAll() {
      document.querySelectorAll(".lang-switch.is-open").forEach(closeSwitch);
    }

    switches.forEach(function (switchEl) {
      var toggle = switchEl.querySelector(".lang-toggle");
      if (!toggle) return;

      toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        var willOpen = !switchEl.classList.contains("is-open");
        closeAll();
        if (willOpen) {
          switchEl.classList.add("is-open");
          toggle.setAttribute("aria-expanded", "true");
        }
      });

      switchEl.querySelectorAll(".lang-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          closeSwitch(switchEl);
        });
      });
    });

    document.addEventListener("click", function (e) {
      document.querySelectorAll(".lang-switch.is-open").forEach(function (switchEl) {
        if (!switchEl.contains(e.target)) closeSwitch(switchEl);
      });
    });

    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAll();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initNavMenu();
      initLangSwitcher();
    });
  } else {
    initNavMenu();
    initLangSwitcher();
  }
})();
