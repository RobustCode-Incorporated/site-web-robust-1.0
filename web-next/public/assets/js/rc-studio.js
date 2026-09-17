/* RC-STUDIO: an "iris" curtain reveal. The page opens on plain white;
   scrolling into the pinned section expands a clip-path circle on the
   black cinema room beneath, and its two reel titles light up letter by
   letter as the circle sweeps past them. CSS defaults the room's
   clip-path to fully open, so a no-JS/no-GSAP visitor still sees the
   content plainly - the closed starting circle is only set once GSAP
   is confirmed available. */
(function () {
  function splitLetters(el) {
    var text = el.textContent;
    el.textContent = "";
    var frag = document.createDocumentFragment();
    var words = text.split(" ");
    words.forEach(function (word, i) {
      var wordSpan = document.createElement("span");
      wordSpan.className = "studio-word";
      Array.prototype.forEach.call(word, function (ch) {
        var span = document.createElement("span");
        span.className = "studio-letter";
        span.textContent = ch;
        wordSpan.appendChild(span);
      });
      frag.appendChild(wordSpan);
      if (i < words.length - 1) frag.appendChild(document.createTextNode(" "));
    });
    el.appendChild(frag);
    return Array.prototype.slice.call(el.querySelectorAll(".studio-letter"));
  }

  function init() {
    if (typeof window.gsap === "undefined" || !window.ScrollTrigger) return;
    var gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var section = document.getElementById("studio-curtain-section");
    var cinemaRoom = document.getElementById("studio-cinema-room");
    var seed = document.querySelector(".studio-curtain-seed");
    var titleEls = Array.prototype.slice.call(document.querySelectorAll(".studio-reel-title"));
    if (!section || !cinemaRoom) return;

    if (reduceMotion) {
      gsap.set(cinemaRoom, { clearProps: "all" });
      if (seed) seed.style.display = "none";
      return;
    }

    gsap.set(cinemaRoom, { clipPath: "circle(0% at 50% 50%)" });
    var titleGroups = titleEls.map(splitLetters);
    titleGroups.forEach(function (letters) {
      gsap.set(letters, { opacity: 0 });
    });

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=" + Math.round(window.innerHeight * 1.5),
        pin: true,
        scrub: 1,
      },
    });

    tl.to(cinemaRoom, { clipPath: "circle(200% at 50% 50%)", duration: 0.7, ease: "power2.inOut" }, 0);
    if (seed) tl.to(seed, { opacity: 0, scale: 0.4, duration: 0.15 }, 0.05);

    titleGroups.forEach(function (letters, i) {
      var start = 0.42 + i * 0.14;
      tl.to(
        letters,
        { opacity: 1, textShadow: "0 0 14px rgba(255,255,255,0.85)", duration: 0.3, stagger: 0.022, ease: "power1.out" },
        start
      ).to(letters, { textShadow: "0 0 0px rgba(255,255,255,0)", duration: 0.35 }, start + 0.3);
    });

    // Language switching re-renders data-i18n text, wiping the letter
    // spans - resplit afterward, snapping straight to the visible state
    // if the curtain has already opened past this point.
    var langButtons = document.querySelectorAll(".lang-btn");
    langButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        setTimeout(function () {
          var st = tl.scrollTrigger;
          var revealed = !st || st.progress > 0.4;
          titleEls.forEach(function (el) {
            var letters = splitLetters(el);
            gsap.set(letters, revealed ? { opacity: 1, textShadow: "0 0 0px rgba(255,255,255,0)" } : { opacity: 0 });
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
