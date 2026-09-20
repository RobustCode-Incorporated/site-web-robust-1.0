(function () {
  function track(name, data) {
    if (typeof window.va === "function") {
      window.va("event", { name, data });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const articleEl = document.querySelector("[data-analytics-article]");
    if (articleEl) {
      track("article_view", { slug: articleEl.dataset.analyticsArticle });

      const seen = new Set();
      window.addEventListener(
        "scroll",
        () => {
          const scrollPct =
            (window.scrollY / (document.body.scrollHeight - window.innerHeight || 1)) * 100;
          [50, 90].forEach((threshold) => {
            if (scrollPct >= threshold && !seen.has(threshold)) {
              seen.add(threshold);
              track("article_scroll", { slug: articleEl.dataset.analyticsArticle, depth: threshold });
            }
          });
        },
        { passive: true }
      );
    }

    const storeEl = document.querySelector("[data-analytics-store]");
    if (storeEl) track("store_view", {});

    const productEl = document.querySelector("[data-analytics-product]");
    if (productEl) track("product_view", { slug: productEl.dataset.analyticsProduct });

    const categoryEl = document.querySelector("[data-analytics-category]");
    if (categoryEl) track("product_category_view", { category: categoryEl.dataset.analyticsCategory });
  });

  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-cta]");
    if (!el) return;
    track(el.dataset.cta, { href: el.getAttribute("href") || null, label: el.textContent.trim() });
  });

  document.addEventListener("click", (e) => {
    const shareLink = e.target.closest(".share-row a");
    if (shareLink) track("article_share", { href: shareLink.href });
  });

  document.addEventListener("submit", (e) => {
    const form = e.target;
    if (form.matches(".newsletter-form")) {
      const honeypot = form.querySelector('[name="company_website"]');
      if (honeypot && honeypot.value) {
        e.preventDefault();
        return; // bot filled the hidden field — silently drop, no event fired
      }
      track("newsletter_signup", {});
      if (!form.dataset.formEndpoint) {
        // Not wired to a real email provider yet — prevent a fake success promise.
        e.preventDefault();
        window.alert("Thanks! Newsletter signup isn't connected to an email provider yet — this is a placeholder.");
      }
    }
  });
})();
