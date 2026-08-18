/* Monumental binary-rain intro visual: a 3D field of 0/1 glyphs drifting
   toward the camera, culminating in a GSAP-driven "warp speed" burst that
   hands off to the hero. Plain Canvas 2D - no WebGL/Three.js needed.

   Depth model: each glyph has a world position (x, y, z) with the camera
   at z=0 looking down +z. Screen position is a classic perspective divide
   (screen = center + (world / z) * focal), so smaller z = closer = bigger
   and more off-center. Glyphs drift down slowly in world-Y and drift
   toward the camera in z; once z passes the camera they respawn far away,
   giving an endless field with no per-frame allocation growth. */
(function () {
  const canvas = document.getElementById("binary-sphere-canvas");
  const section = document.getElementById("ecosystem-section");
  if (!canvas || !section) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const PARTICLE_COUNT = 220;
  const FOCAL = 320;
  const Z_NEAR = 0.35; // respawn once a particle passes this (too close to render)
  const Z_FAR = 4.2; // spawn depth for fresh particles
  const FALL_SPEED = 0.09; // world units/sec at rest
  const DRIFT_Z_SPEED = 0.16; // world units/sec toward camera at rest

  // Depth-of-field without ctx.filter: real canvas blur forces an
  // unaccelerated software composite on every glyph and is expensive
  // enough to starve the whole page's frame budget (it was measured
  // stalling GSAP's own ticker sitewide). Near/far softness is faked
  // instead with a cheap second "halo" glyph - bigger, dimmer, no
  // filter - drawn under the sharp one; only the near band gets it,
  // since far glyphs are already small and dim enough to read as soft.
  const NEAR_HALO_Z = 1.1;

  function randomParticle(freshFar) {
    return {
      char: Math.random() > 0.5 ? "1" : "0",
      x: (Math.random() * 2 - 1) * 1.6,
      y: (Math.random() * 2 - 1) * 1.1,
      z: freshFar ? Z_FAR * (0.6 + Math.random() * 0.4) : Z_NEAR + Math.random() * (Z_FAR - Z_NEAR),
      flicker: Math.random() * Math.PI * 2,
    };
  }

  const particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i += 1) particles.push(randomParticle(false));

  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;

  function resize() {
    const rect = section.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  // Soft mouse parallax: the projection center eases toward the cursor
  // instead of snapping, per "interaction douce".
  let targetParallaxX = 0;
  let targetParallaxY = 0;
  let parallaxX = 0;
  let parallaxY = 0;
  window.addEventListener("mousemove", (e) => {
    targetParallaxX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetParallaxY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Driven by GSAP: warpSpeed ramps the z-approach rate (the "hyperspace"
  // burst), trailAlpha controls how much of the previous frame survives
  // each fillRect wipe (lower = longer light streaks).
  const motion = { warpSpeed: 1, trailAlpha: 1 };
  let running = true;
  let rafId = null;
  let lastTime = performance.now();

  function draw(now) {
    if (!running) return;
    rafId = requestAnimationFrame(draw);

    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;

    parallaxX += (targetParallaxX - parallaxX) * 0.04;
    parallaxY += (targetParallaxY - parallaxY) * 0.04;

    ctx.fillStyle = `rgba(0, 0, 0, ${motion.trailAlpha})`;
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2 + parallaxX * 40;
    const centerY = height / 2 + parallaxY * 40;
    const zStep = DRIFT_Z_SPEED * motion.warpSpeed * dt;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";

    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];
      p.y += FALL_SPEED * dt;
      p.z -= zStep;
      if (p.z <= Z_NEAR || p.y > 1.3) {
        Object.assign(p, randomParticle(true));
        continue;
      }

      const scale = FOCAL / (p.z * 220);
      const screenX = centerX + (p.x / p.z) * FOCAL;
      const screenY = centerY + (p.y / p.z) * FOCAL;
      if (screenX < -60 || screenX > width + 60 || screenY < -60 || screenY > height + 60) continue;

      const closeness = 1 - Math.min(p.z / Z_FAR, 1);
      const flicker = 0.9 + Math.sin(now * 0.001 + p.flicker) * 0.1;
      let opacity = (0.1 + closeness * 0.6) * flicker;
      // During warp the nearest glyphs get a bright streaked-light boost.
      if (motion.warpSpeed > 4 && p.z < 1.2) opacity = Math.min(1, opacity + (motion.warpSpeed / 60) * 0.5);

      const size = Math.max(9, Math.min(120, scale * 18));
      const font = `${size.toFixed(1)}px "IBM Plex Mono", monospace`;

      if (p.z < NEAR_HALO_Z) {
        ctx.globalAlpha = opacity * 0.3;
        ctx.font = `${(size * 1.7).toFixed(1)}px "IBM Plex Mono", monospace`;
        ctx.fillText(p.char, screenX, screenY);
      }

      ctx.globalAlpha = opacity;
      ctx.font = font;
      ctx.fillText(p.char, screenX, screenY);
    }
    ctx.globalAlpha = 1;
  }

  rafId = requestAnimationFrame(draw);

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
  }

  // The cinematic: 0-1.5s ambient drift, 1.5-2.2s warp-speed burst with
  // growing light-trail streaks, then the canvas is dropped from the
  // render tree entirely to free the GPU/CPU for the hero handoff.
  function playIntroSequence() {
    if (typeof window.gsap === "undefined") {
      stop();
      canvas.style.display = "none";
      return;
    }
    const gsap = window.gsap;
    const tl = gsap.timeline({ delay: 1.5 });
    tl.to(motion, { warpSpeed: 55, trailAlpha: 0.16, duration: 0.7, ease: "power4.in" })
      .to(canvas, { opacity: 0, duration: 0.3, ease: "power2.out" }, "-=0.1")
      .call(() => {
        stop();
        canvas.style.display = "none";
      });
  }

  playIntroSequence();
})();
