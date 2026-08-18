function initYear() {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
}

function initReveal() {
  const nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  nodes.forEach((node) => observer.observe(node));
}

function initEcosystemCarousel() {
  const wrap = document.getElementById("capability-carousel");
  const core = document.getElementById("ecosystem-core");
  const cards = document.querySelectorAll(".carousel-card");
  const detailCategory = document.getElementById("ecosystem-detail-category");
  const detailTitle = document.getElementById("ecosystem-detail-title");
  const detailDesc = document.getElementById("ecosystem-detail-desc");
  if (!wrap || !cards.length) return;

  const categoryLabels = {
    applications: "Applications",
    payments: "Integrations & Payments",
    infrastructure: "Infrastructure & Data"
  };

  let pinned = null;

  // No colour here by design: the palette is strictly black/white/glass, so
  // "connecting" a capability to the Core just brightens its liquid-glass
  // background and pulses its icon, regardless of category.
  const setCoreActive = (card) => {
    if (!core) return;
    core.classList.toggle("active", Boolean(card));
  };

  const setDetail = (card) => {
    if (!card) {
      wrap.classList.remove("has-active");
      cards.forEach((c) => {
        c.classList.remove("is-active");
        c.setAttribute("aria-pressed", "false");
      });
      setCoreActive(null);

      if (detailCategory && detailTitle && detailDesc) {
        detailCategory.textContent = "Digital Ecosystem";
        detailTitle.textContent = "Robust Core";
        detailDesc.textContent = "Hover or select any capability to see how it connects to the Robust Core.";
      }
      return;
    }

    wrap.classList.add("has-active");
    cards.forEach((c) => {
      const isActive = c === card;
      c.classList.toggle("is-active", isActive);
      c.setAttribute("aria-pressed", String(isActive && c === pinned));
    });
    setCoreActive(card);

    if (detailCategory && detailTitle && detailDesc) {
      detailCategory.textContent = categoryLabels[card.dataset.category] || "Digital Ecosystem";
      detailTitle.textContent = card.dataset.label || "";
      detailDesc.textContent = card.dataset.desc || "";
    }
  };

  // Event delegation: a handful of listeners on the wrap instead of five per
  // card. The marquee duplicates every card for its seamless loop (18 buttons
  // total here), so this keeps the listener count constant as cards are added.
  const cardFrom = (target) => target instanceof Element && target.closest(".carousel-card");

  wrap.addEventListener("mouseover", (event) => {
    const card = cardFrom(event.target);
    if (!card) return;
    if (cardFrom(event.relatedTarget) === card) return;
    if (!pinned) setDetail(card);
  });

  wrap.addEventListener("mouseout", (event) => {
    const card = cardFrom(event.target);
    if (!card) return;
    if (cardFrom(event.relatedTarget) === card) return;
    if (!pinned) setDetail(null);
  });

  wrap.addEventListener("focusin", (event) => {
    const card = cardFrom(event.target);
    if (card) setDetail(card);
  });

  wrap.addEventListener("focusout", (event) => {
    const card = cardFrom(event.target);
    if (!card) return;
    if (cardFrom(event.relatedTarget) === card) return;
    if (!pinned) setDetail(null);
  });

  wrap.addEventListener("click", (event) => {
    const card = cardFrom(event.target);
    if (!card) return;
    pinned = pinned === card ? null : card;
    setDetail(pinned);
  });

  if (core) {
    core.addEventListener("click", () => {
      pinned = null;
      setDetail(null);
    });
  }
}

function initIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initYear();
  initReveal();
  initEcosystemCarousel();
  initIcons();
});
