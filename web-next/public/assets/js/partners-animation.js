(function () {
  function initPartnersAnimation() {
    var section = document.getElementById("partners-section");
    if (!section || typeof window.gsap === "undefined") return;

    var heading = section.querySelector(".section-heading");
    var cards = section.querySelectorAll(".partner-card");
    if (!cards.length) return;

    var gsap = window.gsap;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    cards.forEach(function (card) {
      var halo = document.createElement("span");
      halo.className = "partner-card-halo";
      halo.setAttribute("aria-hidden", "true");
      card.prepend(halo);
    });

    if (reduceMotion) {
      gsap.set(cards, { opacity: 1, y: 0 });
      if (heading) gsap.set(heading, { opacity: 1, y: 0 });
    } else if (window.ScrollTrigger) {
      gsap.registerPlugin(window.ScrollTrigger);

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
      });

      if (heading) {
        tl.from(heading, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: "power3.out",
        });
      }

      tl.from(
        cards,
        {
          opacity: 0,
          y: 30,
          duration: 0.7,
          stagger: 0.05,
          ease: "power3.out",
        },
        heading ? "-=0.35" : 0
      );
    }

    var restColor = "rgba(255, 255, 255, 0.35)";

    cards.forEach(function (card) {
      var brand = card.style.getPropertyValue("--brand").trim() || "#ffffff";
      var logo = card.querySelector(".partner-logo, .partner-card--text");
      var halo = card.querySelector(".partner-card-halo");

      var enter = function () {
        gsap.to(card, { scale: 1.03, y: -6, duration: 0.4, ease: "power2.out" });
        if (logo) gsap.set(logo, { color: brand });
        if (halo) gsap.to(halo, { opacity: 0.55, duration: 0.4, ease: "power2.out" });
      };

      var leave = function () {
        gsap.to(card, { scale: 1, y: 0, duration: 0.4, ease: "power2.out" });
        if (logo) gsap.set(logo, { color: restColor });
        if (halo) gsap.to(halo, { opacity: 0, duration: 0.4, ease: "power2.out" });
      };

      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);
      card.addEventListener("focus", enter, true);
      card.addEventListener("blur", leave, true);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPartnersAnimation);
  } else {
    initPartnersAnimation();
  }
})();
