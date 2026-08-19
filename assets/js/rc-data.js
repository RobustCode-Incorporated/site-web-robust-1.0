/* RC-DATA immersive backdrop: a fixed field of thin white "data" points
   streaming past the camera in 3D perspective, live-linked to scroll
   velocity - scroll fast and the stream surges; sit still and it settles
   to a slow idle drift. Content cards get a scroll-scrubbed blur-focus
   pull: out-of-focus and slightly small until the section is centered.

   Same perspective-projection model as binary-rain.js, and the same
   ctx.filter avoidance - real canvas blur was measured stalling GSAP's
   ticker sitewide there, so depth/speed are read here purely through
   size, opacity, and streak length instead. */
(function () {
  function initDataStream() {
    var canvas = document.getElementById("data-stream-canvas");
    if (!canvas) return;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      canvas.remove();
      return;
    }

    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var POINT_COUNT = 160;
    var FOCAL = 320;
    var Z_NEAR = 0.3;
    var Z_FAR = 3.6;
    var BASE_SPEED = 0.22;

    function randomPoint(freshFar) {
      return {
        x: (Math.random() * 2 - 1) * 1.7,
        y: (Math.random() * 2 - 1) * 1.1,
        z: freshFar ? Z_FAR * (0.7 + Math.random() * 0.3) : Z_NEAR + Math.random() * (Z_FAR - Z_NEAR),
        prevScreenX: null,
        prevScreenY: null,
      };
    }

    var points = [];
    for (var i = 0; i < POINT_COUNT; i += 1) points.push(randomPoint(false));

    var width = 0;
    var height = 0;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    // Scroll velocity feeds the stream speed: a burst of scrolling ramps
    // it up, then it eases back down to idle once movement stops.
    var lastScrollY = window.scrollY;
    var scrollBoost = 0;
    window.addEventListener(
      "scroll",
      function () {
        var delta = Math.abs(window.scrollY - lastScrollY);
        lastScrollY = window.scrollY;
        scrollBoost = Math.min(scrollBoost + delta * 0.12, 26);
      },
      { passive: true }
    );

    var lastTime = performance.now();

    function draw(now) {
      requestAnimationFrame(draw);
      var dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      scrollBoost *= 0.92; // decays back to idle each frame
      var speed = BASE_SPEED * (1 + scrollBoost);

      ctx.fillStyle = "rgba(0, 0, 0, 0.32)";
      ctx.fillRect(0, 0, width, height);

      var centerX = width / 2;
      var centerY = height / 2;

      for (var i = 0; i < points.length; i += 1) {
        var p = points[i];
        p.z -= speed * dt;
        if (p.z <= Z_NEAR) {
          Object.assign(p, randomPoint(true));
          continue;
        }

        var screenX = centerX + (p.x / p.z) * FOCAL;
        var screenY = centerY + (p.y / p.z) * FOCAL;
        if (screenX < -40 || screenX > width + 40 || screenY < -40 || screenY > height + 40) {
          p.prevScreenX = null;
          p.prevScreenY = null;
          continue;
        }

        var closeness = 1 - Math.min(p.z / Z_FAR, 1);
        var opacity = 0.15 + closeness * 0.55;
        var size = Math.max(1, Math.min(3, closeness * 3));

        if (p.prevScreenX !== null) {
          ctx.strokeStyle = "rgba(255, 255, 255, " + opacity + ")";
          ctx.lineWidth = size;
          ctx.beginPath();
          ctx.moveTo(p.prevScreenX, p.prevScreenY);
          ctx.lineTo(screenX, screenY);
          ctx.stroke();
        } else {
          ctx.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
          ctx.beginPath();
          ctx.arc(screenX, screenY, size / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        p.prevScreenX = screenX;
        p.prevScreenY = screenY;
      }
    }

    requestAnimationFrame(draw);
  }

  function initFocusReveal() {
    if (typeof window.gsap === "undefined" || !window.ScrollTrigger) return;
    var gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var targets = document.querySelectorAll(".section-heading, .info-block");
    if (!targets.length) return;

    targets.forEach(function (el) {
      if (reduceMotion) {
        gsap.set(el, { clearProps: "all" });
        return;
      }
      gsap.set(el, { filter: "blur(15px)", scale: 0.96, opacity: 0 });
      gsap.to(el, {
        filter: "blur(0px)",
        scale: 1,
        opacity: 1,
        duration: 1.1,
        ease: "power2.out",
        clearProps: "filter,transform,opacity",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
      });
    });
  }

  function init() {
    initDataStream();
    initFocusReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
