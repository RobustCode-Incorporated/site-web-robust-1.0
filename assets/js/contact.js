/* Contact: an asymmetric split-screen entrance (contact blocks cascade in
   from the left while the 3D brand mesh emerges from black), then a
   mouse-driven magnetic tilt on the logo while the cursor is over the
   black panel - rotationX/rotationY driven by gsap.quickTo (the
   canonical property names; the rotateX/rotateY aliases gsap.to/gsap.set
   accept fine silently fail to resolve here, same bug found and fixed on
   RC-XP's magnetic panel and the Liquid Glass Monolith cards). At rest
   the logo settles back to center and picks up a slow orbital micro-
   oscillation, paused whenever the cursor re-enters so the two motion
   sources never fight over the same transform properties. */
(function () {
  function init() {
    if (typeof window.gsap === "undefined") return;
    var gsap = window.gsap;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var canHover = window.matchMedia("(hover: hover)").matches;

    var panel = document.getElementById("contact-panel-right");
    var logo = document.getElementById("interactive-brand-mesh");
    var blocks = document.querySelectorAll(".contact-intro, .contact-block");

    if (logo) gsap.set(logo, { transformPerspective: 1500, force3D: true });

    if (reduceMotion) {
      gsap.set(Array.prototype.slice.call(blocks).concat(logo ? [logo] : []), { clearProps: "all" });
      return;
    }

    var idleTl = null;
    function startIdle() {
      if (!logo || idleTl) return;
      idleTl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { duration: 7, ease: "sine.inOut" } }).to(
        logo,
        { rotationY: 6, rotationX: -3 },
        0
      );
    }
    function stopIdle() {
      if (idleTl) {
        idleTl.kill();
        idleTl = null;
      }
    }

    gsap.set(blocks, { opacity: 0, x: -40 });
    if (logo) gsap.set(logo, { opacity: 0, scale: 0.7, rotationY: -25 });

    var tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.to(blocks, { opacity: 1, x: 0, duration: 0.9, stagger: 0.12 }, 0.1);
    if (logo) {
      tl.to(logo, { opacity: 1, scale: 1, rotationY: 0, duration: 1.4, ease: "expo.out" }, 0.3);
      tl.call(startIdle);
    }

    if (!panel || !logo || !canHover) return;

    var rotateX = gsap.quickTo(logo, "rotationX", { duration: 0.6, ease: "power3" });
    var rotateY = gsap.quickTo(logo, "rotationY", { duration: 0.6, ease: "power3" });
    var liftZ = gsap.quickTo(logo, "z", { duration: 0.6, ease: "power3" });

    panel.addEventListener("mouseenter", stopIdle);

    panel.addEventListener("mousemove", function (e) {
      var rect = panel.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width - 0.5;
      var py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY(px * 90);
      rotateX(py * -90);
      liftZ(80);
    });

    panel.addEventListener("mouseleave", function () {
      rotateX(0);
      rotateY(0);
      liftZ(0);
      setTimeout(startIdle, 650);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
