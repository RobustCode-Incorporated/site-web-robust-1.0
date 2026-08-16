/* GSAP opening intro: binary sphere -> wordmark reveal -> hero handoff.
   Bails out silently (leaving the page in its normal, scrollable state) if
   GSAP failed to load or required elements are missing, so a script failure
   never leaves visitors stuck behind a fixed black screen. */
(function () {
  if (typeof gsap === "undefined") return;

  const overlay = document.getElementById("ecosystem-section");
  const canvas = document.getElementById("binary-sphere-canvas");
  const eyebrow = document.getElementById("intro-eyebrow");
  const title = document.getElementById("intro-title");
  const heroContent = document.querySelector(".hero-content");
  const heroSub = document.querySelector(".hero-sub");
  const heroCta = document.querySelector(".hero-cta");
  if (!overlay || !canvas || !eyebrow || !title || !heroSub || !heroCta) return;

  const ctaButtons = heroCta.querySelectorAll("a");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // The old scroll-triggered reveal (initReveal() in main.js) would otherwise
  // fight this timeline for control of .hero-content's opacity/transform.
  if (heroContent) heroContent.classList.remove("reveal", "slide-down");

  if (reduceMotion) {
    gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none", display: "none" });
    gsap.set([heroSub, ...ctaButtons], { clearProps: "all" });
    return;
  }

  // Split "Innovation at your fingertips" into per-word masks for the
  // directional (bottom-to-top) reveal.
  const words = title.textContent.trim().split(/\s+/);
  title.innerHTML = words
    .map((word) => '<span class="word-mask"><span class="word">' + word + "</span></span>")
    .join(" ");
  const wordEls = title.querySelectorAll(".word");

  gsap.set(overlay, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 9999,
    backgroundColor: "#000"
  });
  gsap.set(eyebrow, { autoAlpha: 0, letterSpacing: "0.2em" });
  gsap.set(wordEls, { yPercent: 100, autoAlpha: 0 });
  gsap.set(canvas, { scale: 1, autoAlpha: 1, transformOrigin: "50% 50%" });
  gsap.set([heroSub, ...ctaButtons], { autoAlpha: 0, y: 30 });

  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  tl.to(eyebrow, { autoAlpha: 1, letterSpacing: "0.4em", duration: 0.8, ease: "power2.out" }, 0.5)
    .to(eyebrow, { autoAlpha: 0, duration: 0.4, ease: "power2.in" }, 1.5)
    .to(canvas, { scale: 4, autoAlpha: 0, duration: 1.1, ease: "expo.out" }, 1.5)
    .to(wordEls, { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.08, ease: "expo.out" }, 1.5)
    .to(overlay, { autoAlpha: 0, pointerEvents: "none", duration: 0.6, ease: "power2.out" }, 2.2)
    .set(overlay, { display: "none" })
    .to([heroSub, ...ctaButtons], { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 }, 2.5);
})();
