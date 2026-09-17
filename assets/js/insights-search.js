(function () {
  const input = document.getElementById("insights-search-input");
  const results = document.getElementById("insights-search-results");
  if (!input || !results) return;

  const indexUrl = input.dataset.insightsIndex;
  const base = input.dataset.insightsBase || "";
  let articles = [];

  fetch(indexUrl)
    .then((r) => r.json())
    .then((data) => {
      articles = data;
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
      .map((a) => `<li><a href="${base}${a.url}">${a.title}</a></li>`)
      .join("");
    results.hidden = false;
  }

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (!q) return render([]);
    const matches = articles.filter((a) =>
      [a.title, a.description, ...(a.tags || [])].join(" ").toLowerCase().includes(q)
    );
    render(matches);
  });

  document.addEventListener("click", (e) => {
    if (!results.contains(e.target) && e.target !== input) {
      results.hidden = true;
    }
  });
})();
