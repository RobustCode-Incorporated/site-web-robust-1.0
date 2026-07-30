const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const processMessages = [
  "Initializing modules...",
  "Compiling assets...",
  "Securing runtime...",
  "System Robust ready."
];

function bootPreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  const percentEl = document.getElementById("loader-percent");
  const processEl = document.getElementById("loader-process");
  const strokes = document.querySelectorAll(".loader-stroke");
  let percent = 0;

  strokes.forEach((stroke, i) => {
    stroke.style.animation = `draw 0.65s ease forwards ${i * 0.18}s`;
  });

  const ticker = setInterval(() => {
    percent = Math.min(percent + 5, 100);
    if (percentEl) percentEl.textContent = String(percent);
    if (processEl) processEl.textContent = processMessages[Math.min(Math.floor(percent / 26), processMessages.length - 1)];

    if (percent >= 100) {
      clearInterval(ticker);
      preloader.classList.add("ready");
      setTimeout(() => {
        preloader.remove();
      }, 460);
    }
  }, reducedMotion ? 8 : 45);
}

function bootTypewriter() {
  const line = document.getElementById("hero-typewriter");
  if (!line) return;
  const text = "boot://robust-code > precision-engineering-mode";
  if (reducedMotion) {
    line.textContent = text;
    return;
  }

  let i = 0;
  const step = () => {
    if (i <= text.length) {
      line.textContent = text.slice(0, i);
      i += 1;
      setTimeout(step, 36);
    }
  };
  step();
}

function bootReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;
  if (reducedMotion) {
    elements.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach((el) => observer.observe(el));
}

function bootDecryptHover() {
  if (reducedMotion) return;
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const nodes = document.querySelectorAll(".decrypt");

  nodes.forEach((node) => {
    const raw = node.textContent || "";
    node.dataset.raw = raw;
    node.addEventListener("mouseenter", () => {
      let frame = 0;
      const run = setInterval(() => {
        const unlocked = Math.floor(frame / 2);
        node.textContent = raw
          .split("")
          .map((char, idx) => {
            if (char === " ") return " ";
            return idx < unlocked ? raw[idx] : charset[Math.floor(Math.random() * charset.length)];
          })
          .join("");

        frame += 1;
        if (unlocked >= raw.length) {
          clearInterval(run);
          node.textContent = raw;
        }
      }, 24);
    });
  });
}

function bootHeroParallax() {
  if (reducedMotion) return;
  const visual = document.getElementById("hero-visual");
  if (!visual) return;

  window.addEventListener("mousemove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 12;
    const y = (event.clientY / window.innerHeight - 0.5) * -12;
    visual.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
  });
}

function bootCursor() {
  if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;
  const cursor = document.querySelector(".cursor");
  if (!cursor) return;

  window.addEventListener("mousemove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });

  document.querySelectorAll("a, button").forEach((element) => {
    element.addEventListener("mouseenter", () => cursor.classList.add("active"));
    element.addEventListener("mouseleave", () => cursor.classList.remove("active"));
  });
}

function bootYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", () => {
  bootPreloader();
  bootTypewriter();
  bootReveal();
  bootDecryptHover();
  bootHeroParallax();
  bootCursor();
  bootYear();
});
