(function () {
  function initFooterAnimation() {
    var footer = document.getElementById("site-footer");
    if (!footer || typeof window.gsap === "undefined") return;

    var gsap = window.gsap;
    var line = footer.querySelector(".footer-top-line");
    var blocks = footer.querySelectorAll(".footer-brand, .footer-column");
    var bottom = footer.querySelector(".footer-bottom");
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.set(line, { scaleX: 1 });
      gsap.set(blocks, { opacity: 1, y: 0 });
      gsap.set(bottom, { opacity: 1, y: 0 });
      return;
    }

    if (!window.ScrollTrigger) return;
    gsap.registerPlugin(window.ScrollTrigger);

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: "top 95%",
        once: true,
      },
    });

    if (line) {
      tl.from(line, {
        scaleX: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }

    if (blocks.length) {
      tl.from(
        blocks,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        },
        line ? "-=0.3" : 0
      );
    }

    if (bottom) {
      tl.from(
        bottom,
        {
          opacity: 0,
          y: 10,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2"
      );
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFooterAnimation);
  } else {
    initFooterAnimation();
  }
})();
