/* ABOUT: an "iris" curtain reveal from the white engineering block into a
   black founder's-vision portal. Mirrors RC-STUDIO's approach - CSS
   defaults the portal's clip-path to fully open, so a no-JS/no-GSAP
   visitor still sees it plainly, and the closed starting circle plus the
   pinned scroll-driven expansion are only wired up once GSAP is
   confirmed available. The name and headline light up letter by letter
   as the circle sweeps past, then the two vision cards rise in. */
(function () {
  function splitLetters(el) {
    var text = el.textContent;
    el.textContent = "";
    var frag = document.createDocumentFragment();
    var words = text.split(" ");
    words.forEach(function (word, i) {
      var wordSpan = document.createElement("span");
      wordSpan.className = "vision-word";
      Array.prototype.forEach.call(word, function (ch) {
        var span = document.createElement("span");
        span.className = "vision-letter";
        span.textContent = ch;
        wordSpan.appendChild(span);
      });
      frag.appendChild(wordSpan);
      if (i < words.length - 1) frag.appendChild(document.createTextNode(" "));
    });
    el.appendChild(frag);
    return Array.prototype.slice.call(el.querySelectorAll(".vision-letter"));
  }

  function init() {
    if (typeof window.gsap === "undefined" || !window.ScrollTrigger) return;
    var gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var section = document.getElementById("about-iris-section");
    var portal = document.getElementById("about-vision-portal");
    var seed = document.querySelector(".about-iris-seed");
    var nameEl = document.getElementById("vision-name");
    var headlineEl = document.getElementById("vision-headline");
    var cards = Array.prototype.slice.call(document.querySelectorAll(".vision-card"));
    if (!section || !portal) return;

    if (reduceMotion) {
      gsap.set(portal, { clearProps: "all" });
      if (seed) seed.style.display = "none";
      return;
    }

    gsap.set(portal, { clipPath: "circle(0% at 50% 50%)" });

    var nameLetters = nameEl ? splitLetters(nameEl) : [];
    var headlineLetters = headlineEl ? splitLetters(headlineEl) : [];
    if (nameLetters.length) gsap.set(nameLetters, { opacity: 0.1 });
    if (headlineLetters.length) gsap.set(headlineLetters, { opacity: 0.1 });
    if (cards.length) gsap.set(cards, { opacity: 0, y: 30 });

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=" + Math.round(window.innerHeight * 1.8),
        pin: true,
        scrub: 1,
      },
    });

    tl.to(portal, { clipPath: "circle(150% at 50% 50%)", duration: 0.6, ease: "power2.inOut" }, 0);
    if (seed) tl.to(seed, { opacity: 0, scale: 0.4, duration: 0.12 }, 0.05);

    if (nameLetters.length) {
      tl.to(
        nameLetters,
        { opacity: 1, textShadow: "0 0 10px rgba(255,255,255,0.6)", duration: 0.3, stagger: 0.028, ease: "power1.out" },
        0.4
      ).to(nameLetters, { textShadow: "0 0 0px rgba(255,255,255,0)", duration: 0.35 }, 0.7);
    }
    if (headlineLetters.length) {
      tl.to(
        headlineLetters,
        { opacity: 1, textShadow: "0 0 10px rgba(255,255,255,0.6)", duration: 0.3, stagger: 0.025, ease: "power1.out" },
        0.62
      ).to(headlineLetters, { textShadow: "0 0 0px rgba(255,255,255,0)", duration: 0.35 }, 0.92);
    }
    if (cards.length) {
      tl.to(cards, { opacity: 1, y: 0, duration: 0.3, stagger: 0.1, ease: "power2.out" }, 0.95);
    }

    // Language switching re-renders data-i18n text, wiping the letter
    // spans - resplit afterward, snapping straight to the visible state
    // if the iris has already opened past this point.
    var langButtons = document.querySelectorAll(".lang-btn");
    langButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        setTimeout(function () {
          var st = tl.scrollTrigger;
          var revealed = !st || st.progress > 0.5;
          [nameEl, headlineEl].forEach(function (el) {
            if (!el) return;
            var letters = splitLetters(el);
            gsap.set(letters, revealed ? { opacity: 1, textShadow: "0 0 0px rgba(255,255,255,0)" } : { opacity: 0.1 });
          });
        }, 0);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
