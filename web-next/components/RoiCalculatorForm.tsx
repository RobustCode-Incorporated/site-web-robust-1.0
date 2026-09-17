"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";

export default function RoiCalculatorForm() {
  const [hours, setHours] = useState(5);
  const [hourlyCost, setHourlyCost] = useState(35);
  const [setupCost, setSetupCost] = useState(1500);
  const [result, setResult] = useState<{ annual: number; payback: string } | null>(null);
  const [started, setStarted] = useState(false);

  function onChangeAny() {
    if (!started) {
      setStarted(true);
      track("tool_start", { tool: "roi-calculator" });
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const annual = hours * hourlyCost * 52;
    const payback = annual <= 0 ? "N/A" : `${((setupCost / annual) * 12).toFixed(1)} months`;
    setResult({ annual, payback });
    track("tool_complete", { tool: "roi-calculator" });
  }

  return (
    <>
      <form className="tool-form" onSubmit={onSubmit} onChange={onChangeAny}>
        <label>
          Hours spent per week on the task
          <input type="number" min={0} step={0.5} value={hours} onChange={(e) => setHours(Number(e.target.value))} required />
        </label>
        <label>
          Fully-loaded hourly cost of that time (€)
          <input type="number" min={0} step={1} value={hourlyCost} onChange={(e) => setHourlyCost(Number(e.target.value))} required />
        </label>
        <label>
          One-time / setup cost of automating it (€)
          <input type="number" min={0} step={50} value={setupCost} onChange={(e) => setSetupCost(Number(e.target.value))} required />
        </label>
        <button type="submit" className="btn btn-primary">Calculate</button>
      </form>

      {result && (
        <div className="tool-result">
          <p><strong>Estimated annual savings:</strong> €{Math.round(result.annual).toLocaleString("en-US")}</p>
          <p><strong>Estimated payback period:</strong> {result.payback}</p>
          <p className="cta-note">Rough estimate for planning purposes, not a guarantee.</p>
        </div>
      )}
    </>
  );
}
