/* RC-CORE: pins #core-software-showroom for a two-beat scroll story - REM
   settles into place first (3D tilt + light sweep), then RCM rises to
   seal over it - driven by one scrubbed timeline across the pinned
   scroll range so both beats stay locked to the same continuous
   gesture, matching the "scroll to advance" framing in the brief. */
(function () {
  function initCoreShowroom() {
    if (typeof window.gsap === "undefined" || !window.ScrollTrigger) return;
    var gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var section = document.getElementById("core-software-showroom");
    if (!section) return;

    var remPanel = section.querySelector(".core-panel--rem");
    var remContent = remPanel ? remPanel.querySelector(".core-panel-content") : null;
    var remSweep = remPanel ? remPanel.querySelector(".core-panel-sweep") : null;
    var rcmPanel = section.querySelector(".core-panel--rcm");

    if (reduceMotion) {
      gsap.set([remContent, remSweep, rcmPanel].filter(Boolean), { clearProps: "all" });
      return;
    }

    if (remContent) gsap.set(remContent, { opacity: 0, y: 60, rotateX: -10, transformOrigin: "50% 100%" });
    if (remSweep) gsap.set(remSweep, { xPercent: -120, opacity: 0 });
    if (rcmPanel) gsap.set(rcmPanel, { yPercent: 100 });

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=" + Math.round(window.innerHeight * 1.6),
        pin: true,
        scrub: 1,
      },
    });

    if (remContent) {
      tl.to(remContent, { opacity: 1, y: 0, rotateX: 0, duration: 0.4, ease: "power3.out" }, 0);
    }
    if (remSweep) {
      tl.to(remSweep, { xPercent: 120, opacity: 1, duration: 0.4, ease: "power2.out" }, 0.05);
    }
    if (rcmPanel) {
      tl.to(rcmPanel, { yPercent: 0, duration: 0.6, ease: "expo.out" }, 0.5);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCoreShowroom);
  } else {
    initCoreShowroom();
  }
})();
