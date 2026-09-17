/* Our Work: filter chips (instant show/hide by category) plus a per-dalle
   ScrollTrigger reveal - text rises from below while the image slides in
   from whichever outer edge it sits on, converging toward center. */
(function () {
  function initPortfolioFilters() {
    var chips = document.querySelectorAll(".filter-chip");
    var cards = document.querySelectorAll("[data-filter-card]");
    if (!chips.length || !cards.length) return;

    function applyFilter(value) {
      cards.forEach(function (card) {
        var category = card.getAttribute("data-category");
        card.hidden = value !== "all" && category !== value;
      });
      chips.forEach(function (chip) {
        chip.classList.toggle("is-active", chip.getAttribute("data-filter-chip") === value);
      });
    }

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        applyFilter(chip.getAttribute("data-filter-chip") || "all");
      });
    });
  }

  function initPortfolioReveal() {
    if (typeof window.gsap === "undefined" || !window.ScrollTrigger) return;
    var gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var dalles = document.querySelectorAll(".project-dalle");
    if (!dalles.length) return;

    dalles.forEach(function (dalle) {
      var info = dalle.querySelector(".project-info");
      var visual = dalle.querySelector(".project-image-wrapper");
      var fromX = dalle.classList.contains("row-reverse") ? -40 : 40;

      if (reduceMotion) {
        gsap.set([info, visual].filter(Boolean), { clearProps: "all" });
        return;
      }

      if (info) gsap.set(info, { y: 30, opacity: 0 });
      if (visual) gsap.set(visual, { x: fromX, scale: 1.08 });

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: dalle,
          start: "top 80%",
          once: true,
        },
      });

      if (info) {
        tl.to(info, { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", clearProps: "transform,opacity" }, 0);
      }
      if (visual) {
        tl.to(visual, { x: 0, scale: 1, duration: 1.2, ease: "power4.out", clearProps: "transform" }, 0);
      }
    });
  }

  function init() {
    initPortfolioFilters();
    initPortfolioReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
