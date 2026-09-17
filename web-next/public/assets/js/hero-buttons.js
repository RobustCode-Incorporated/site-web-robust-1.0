(function () {
  function initHeroButtons() {
    if (typeof window.gsap === "undefined") return;
    var gsap = window.gsap;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    var buttons = document.querySelectorAll(".hero-cta .btn");
    if (!buttons.length) return;

    buttons.forEach(function (btn) {
      var glint = btn.querySelector(".btn-glint");
      if (!glint) return;

      gsap.set(glint, { left: "-100%", opacity: 0 });

      btn.addEventListener("mouseenter", function () {
        gsap.to(btn, {
          scale: 1.03,
          boxShadow: "0 0 30px rgba(255, 255, 255, 0.25)",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.fromTo(glint, { left: "-100%", opacity: 1 }, { left: "150%", duration: 0.6, ease: "power2.inOut" });
      });

      btn.addEventListener("mouseleave", function () {
        gsap.to(btn, {
          scale: 1,
          boxShadow: "0 0 0 rgba(255, 255, 255, 0)",
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.to(glint, { opacity: 0, duration: 0.2, ease: "power2.out" });
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeroButtons);
  } else {
    initHeroButtons();
  }
})();
