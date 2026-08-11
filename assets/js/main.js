function initYear() {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
}

function initMenu() {
  const menuBtn = document.getElementById("menu-btn");
  const nav = document.getElementById("nav-links");
  if (!menuBtn || !nav) return;

  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });
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

  const setDetail = (card) => {
    if (!card) {
      wrap.classList.remove("has-active");
      cards.forEach((c) => {
        c.classList.remove("is-active");
        c.setAttribute("aria-pressed", "false");
      });

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

    if (detailCategory && detailTitle && detailDesc) {
      detailCategory.textContent = categoryLabels[card.dataset.category] || "Digital Ecosystem";
      detailTitle.textContent = card.dataset.label || "";
      detailDesc.textContent = card.dataset.desc || "";
    }
  };

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (!pinned) setDetail(card);
    });

    card.addEventListener("mouseleave", () => {
      if (!pinned) setDetail(null);
    });

    card.addEventListener("focus", () => setDetail(card));

    card.addEventListener("blur", () => {
      if (!pinned) setDetail(null);
    });

    card.addEventListener("click", () => {
      pinned = pinned === card ? null : card;
      setDetail(pinned);
    });
  });

  if (core) {
    core.addEventListener("click", () => {
      pinned = null;
      setDetail(null);
    });
  }
}

function initWorkFilters() {
  const tabs = document.querySelectorAll("[data-filter-tab]");
  const cards = document.querySelectorAll("[data-filter-card]");
  if (!tabs.length || !cards.length) return;

  const applyFilter = (value) => {
    cards.forEach((card) => {
      const group = card.getAttribute("data-group");
      const isVisible = value === "all" || group === value;
      card.hidden = !isVisible;
    });

    tabs.forEach((tab) => {
      tab.classList.toggle("is-active", tab.getAttribute("data-filter-tab") === value);
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      applyFilter(tab.getAttribute("data-filter-tab") || "all");
    });
  });

  applyFilter("core");
}

function initIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initYear();
  initMenu();
  initReveal();
  initEcosystemCarousel();
  initWorkFilters();
  initIcons();
});
