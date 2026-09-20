(function () {
  const input = document.getElementById("store-search-input");
  const results = document.getElementById("store-search-results");
  if (!input || !results) return;

  const indexUrl = input.dataset.storeIndex;
  const base = input.dataset.storeBase || "";
  let products = [];

  fetch(indexUrl)
    .then((r) => r.json())
    .then((data) => {
      products = data;
    })
    .catch(() => {});

  function render(matches) {
    if (!matches.length) {
      results.hidden = true;
      results.innerHTML = "";
      return;
    }
    results.innerHTML = matches
      .slice(0, 8)
      .map((p) => `<li><a href="${base}${p.url}">${p.title} — €${p.price}</a></li>`)
      .join("");
    results.hidden = false;
  }

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (!q) return render([]);
    const matches = products.filter((p) =>
      [p.title, p.description, ...(p.tags || []), ...(p.format || [])].join(" ").toLowerCase().includes(q)
    );
    render(matches);
  });

  document.addEventListener("click", (e) => {
    if (!results.contains(e.target) && e.target !== input) {
      results.hidden = true;
    }
  });
})();
