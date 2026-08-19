/* RC-XP: a liquid-glass panel that tracks the cursor with a damped
   magnetic tilt (gsap.quickTo, so each mousemove just retargets an
   already-running tween instead of creating a new one - cheap enough
   to run on every frame). Page elements settle in with an elastic
   entrance on load, and the two methodology blocks rise out of their
   masks with a soft overshoot bounce. */
(function () {
  function initMagneticPanel() {
    var panel = document.getElementById("magnetic-glass-panel");
    if (!panel || typeof window.gsap === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return; // touch devices skip the cursor tilt

    var gsap = window.gsap;
    // quickTo needs the canonical property names - rotateX/rotateY (the
    // aliases gsap.to/gsap.set both accept fine) silently fail to resolve
    // here, measured leaving the panel completely unrotated.
    var rotateX = gsap.quickTo(panel, "rotationX", { duration: 0.6, ease: "power3" });
    var rotateY = gsap.quickTo(panel, "rotationY", { duration: 0.6, ease: "power3" });
    var liftY = gsap.quickTo(panel, "y", { duration: 0.6, ease: "power3" });

    gsap.set(panel, { transformPerspective: 1000 });

    panel.addEventListener("mousemove", function (e) {
      var rect = panel.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width - 0.5;
      var py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY(px * 10);
      rotateX(py * -10);
      liftY(py * -6);
    });

    panel.addEventListener("mouseleave", function () {
      rotateX(0);
      rotateY(0);
      liftY(0);
    });
  }

  function initEntrance() {
    if (typeof window.gsap === "undefined") return;
    var gsap = window.gsap;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var heading = document.getElementById("rcxp-heading");
    var panel = document.getElementById("magnetic-glass-panel");
    var methodItems = Array.from(document.querySelectorAll(".rcxp-method-mask")).map(function (mask) {
      return mask.firstElementChild;
    });

    if (reduceMotion) {
      gsap.set([heading, panel].concat(methodItems).filter(Boolean), { clearProps: "all" });
      return;
    }

    if (heading) gsap.set(heading, { opacity: 0, y: 20 });
    if (panel) gsap.set(panel, { opacity: 0, scale: 0.9 });
    if (methodItems.length) gsap.set(methodItems, { y: 50, opacity: 0 });

    var tl = gsap.timeline({ defaults: { ease: "elastic.out(1, 0.6)" } });

    if (heading) tl.to(heading, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 0);
    if (panel) {
      tl.to(panel, { opacity: 1, scale: 1, duration: 1.3, clearProps: "opacity" }, 0.15);
    }
    if (methodItems.length) {
      tl.to(
        methodItems,
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "back.out(1.7)", clearProps: "transform,opacity" },
        0.5
      );
    }
  }

  function init() {
    initEntrance();
    initMagneticPanel();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
