/* GSAP opening intro: wordmark reveal -> hero handoff, layered over the
   binary-rain canvas (binary-rain.js owns that element's own warp/fade
   cinematic independently, on the same 1.5s/2.2s schedule).
   Bails out silently (leaving the page in its normal, scrollable state) if
   GSAP failed to load or required elements are missing, so a script failure
   never leaves visitors stuck behind a fixed black screen. */
(function () {
  if (typeof gsap === "undefined") return;

  const overlay = document.getElementById("ecosystem-section");
  const eyebrow = document.getElementById("intro-eyebrow");
  const title = document.getElementById("intro-title");
  const heroContent = document.querySelector(".hero-content");
  const heroEyebrow = heroContent ? heroContent.querySelector(".eyebrow") : null;
  const heroTitle = heroContent ? heroContent.querySelector("h1") : null;
  const heroSub = document.querySelector(".hero-sub");
  const heroCta = document.querySelector(".hero-cta");
  if (!overlay || !eyebrow || !title || !heroEyebrow || !heroTitle || !heroSub || !heroCta) {
    window.dispatchEvent(new Event("robustcode:intro-complete"));
    return;
  }

  const heroRevealItems = [heroEyebrow, heroTitle, heroSub];
  const ctaButtons = heroCta.querySelectorAll("a");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none", display: "none" });
    gsap.set([...heroRevealItems, heroCta], { clearProps: "all" });
    window.dispatchEvent(new Event("robustcode:intro-complete"));
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

  // Real hero copy hands off from the overlay's own wordmark: each line
  // rises out of its overflow-hidden mask, then the CTAs settle in with a
  // soft scale-up right behind the last line.
  gsap.set(heroRevealItems, { yPercent: 100, autoAlpha: 0 });
  gsap.set(heroCta, { autoAlpha: 0, scale: 0.95 });

  const tl = gsap.timeline({
    defaults: { ease: "power4.out" },
    onComplete: () => window.dispatchEvent(new Event("robustcode:intro-complete")),
  });

  tl.to(eyebrow, { autoAlpha: 1, letterSpacing: "0.4em", duration: 0.8, ease: "power2.out" }, 0.5)
    .to(eyebrow, { autoAlpha: 0, duration: 0.4, ease: "power2.in" }, 1.5)
    .to(wordEls, { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.08, ease: "expo.out" }, 1.5)
    .to(overlay, { autoAlpha: 0, pointerEvents: "none", duration: 0.6, ease: "power2.out" }, 2.2)
    .set(overlay, { display: "none" })
    .to(
      heroRevealItems,
      { yPercent: 0, autoAlpha: 1, duration: 1.2, stagger: 0.15, ease: "power4.out", clearProps: "transform,opacity,visibility" },
      2.5
    )
    .to(heroCta, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "power2.out", clearProps: "transform,opacity,visibility" }, "-=0.5");
})();
