/* Liquid Glass Monolith cards: shared 3D magnetic hover-tilt + glare-sweep
   card system for RC-DATA's and RC-CORE's plain info grids. Mouse-driven
   tilt uses gsap.quickTo so each mousemove just retargets an already-
   running tween instead of creating a new one - quickTo needs the
   canonical rotationX/rotationY property names - the rotateX/rotateY
   aliases that gsap.to/gsap.set accept fine silently fail to resolve
   here (same bug found and fixed on RC-XP's magnetic panel). Entrance
   is a ScrollTrigger.batch cascade from below, power4.out. */
(function () {
  function initTiltCards() {
    if (typeof window.gsap === "undefined") return;
    var gsap = window.gsap;
    var cards = Array.prototype.slice.call(document.querySelectorAll("[data-tilt-card]"));
    if (!cards.length) return;

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var canHover = window.matchMedia("(hover: hover)").matches;

    if (!reduceMotion && canHover) {
      cards.forEach(function (card) {
        var glare = card.querySelector(".liquid-monolith-card-glare");
        var rotateX = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3" });
        var rotateY = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3" });
        var liftX = gsap.quickTo(card, "x", { duration: 0.5, ease: "power3" });
        var liftY = gsap.quickTo(card, "y", { duration: 0.5, ease: "power3" });
        var liftZ = gsap.quickTo(card, "z", { duration: 0.5, ease: "power3" });
        var glareX = glare ? gsap.quickTo(glare, "xPercent", { duration: 0.4, ease: "power3" }) : null;
        var glareY = glare ? gsap.quickTo(glare, "yPercent", { duration: 0.4, ease: "power3" }) : null;

        gsap.set(card, { transformPerspective: 1000 });

        card.addEventListener("mousemove", function (e) {
          var rect = card.getBoundingClientRect();
          var px = (e.clientX - rect.left) / rect.width - 0.5;
          var py = (e.clientY - rect.top) / rect.height - 0.5;
          rotateY(px * 10);
          rotateX(py * -10);
          liftX(px * 8);
          liftY(py * 8);
          liftZ(30);
          if (glareX && glareY) {
            glareX(px * 60);
            glareY(py * 60);
          }
          if (glare) gsap.to(glare, { opacity: 1, duration: 0.3 });
        });

        card.addEventListener("mouseleave", function () {
          rotateX(0);
          rotateY(0);
          liftX(0);
          liftY(0);
          liftZ(0);
          if (glare) gsap.to(glare, { opacity: 0, duration: 0.4 });
        });
      });
    }

    if (reduceMotion || typeof window.ScrollTrigger === "undefined") {
      gsap.set(cards, { clearProps: "all" });
      return;
    }
    gsap.registerPlugin(window.ScrollTrigger);

    gsap.set(cards, { opacity: 0, y: 60 });
    window.ScrollTrigger.batch(cards, {
      start: "top 88%",
      once: true,
      onEnter: function (batch) {
        gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: "power4.out", stagger: 0.12 });
      },
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTiltCards);
  } else {
    initTiltCards();
  }
})();
