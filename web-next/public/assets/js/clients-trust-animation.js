(function () {
  function initClientsTrustAnimation() {
    var section = document.getElementById("clients-trust-section");
    if (!section || typeof window.gsap === "undefined") return;

    var gsap = window.gsap;
    var heading = section.querySelector(".section-heading");
    var wrapper = section.querySelector(".clients-monolith-wrapper");
    var cards = section.querySelectorAll(".client-single-card");
    if (!wrapper || !cards.length) return;

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.set([heading, wrapper, cards], { opacity: 1, y: 0, scaleX: 1 });
      return;
    }

    if (!window.ScrollTrigger) return;
    gsap.registerPlugin(window.ScrollTrigger);

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        once: true,
      },
    });

    if (heading) {
      tl.from(heading, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
      });
    }

    tl.from(
      wrapper,
      {
        scaleX: 0,
        duration: 1,
        ease: "power4.out",
      },
      heading ? "-=0.25" : 0
    );

    tl.from(
      cards,
      {
        opacity: 0,
        y: 10,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.4"
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initClientsTrustAnimation);
  } else {
    initClientsTrustAnimation();
  }
})();
