/* What We Do: per-section cinematic reveal. Each .section-unit gets its
   own ScrollTrigger - the cinematic image "camera move" (slow zoom-out
   + pan) and the text cascade (rising out of overflow-hidden masks) play
   once, timed together, the moment the section crosses 80% up the
   viewport. */
(function () {
  function initUnitSections() {
    if (typeof window.gsap === "undefined" || !window.ScrollTrigger) return;
    var gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);

    var sections = document.querySelectorAll(".section-unit");
    if (!sections.length) return;

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    sections.forEach(function (section) {
      var visual = section.querySelector(".unit-visual");
      var revealItems = Array.from(section.querySelectorAll(".unit-reveal-mask")).map(function (mask) {
        return mask.firstElementChild;
      });

      if (reduceMotion) {
        gsap.set([visual].concat(revealItems), { clearProps: "all" });
        return;
      }

      if (visual) gsap.set(visual, { scale: 1.15, y: -20 });
      gsap.set(revealItems, { y: 40, opacity: 0 });

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      if (visual) {
        tl.to(visual, { scale: 1, y: 0, duration: 1.6, ease: "power3.out" }, 0);
      }
      tl.to(
        revealItems,
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "expo.out", clearProps: "transform,opacity" },
        0.1
      );
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initUnitSections);
  } else {
    initUnitSections();
  }
})();
