(function () {
  const form = document.getElementById("roi-calculator-form");
  const result = document.getElementById("roi-result");
  if (!form || !result) return;

  const annualEl = document.getElementById("roi-annual-savings");
  const paybackEl = document.getElementById("roi-payback");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const hours = parseFloat(document.getElementById("roi-hours").value) || 0;
    const hourlyCost = parseFloat(document.getElementById("roi-hourly-cost").value) || 0;
    const setupCost = parseFloat(document.getElementById("roi-setup-cost").value) || 0;

    const weeklySavings = hours * hourlyCost;
    const annualSavings = weeklySavings * 52;

    annualEl.textContent = "€" + Math.round(annualSavings).toLocaleString("en-US");

    if (annualSavings <= 0) {
      paybackEl.textContent = "N/A";
    } else {
      const months = (setupCost / annualSavings) * 12;
      paybackEl.textContent = months <= 0 ? "Immediate" : months.toFixed(1) + " months";
    }

    result.hidden = false;

    if (typeof window.va === "function") {
      window.va("event", { name: "tool_complete", data: { tool: "roi-calculator" } });
    }
  });

  if (typeof window.va === "function") {
    let started = false;
    form.addEventListener(
      "input",
      () => {
        if (started) return;
        started = true;
        window.va("event", { name: "tool_start", data: { tool: "roi-calculator" } });
      },
      { once: true }
    );
  }
})();
