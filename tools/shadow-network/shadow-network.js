import {
  createShadowEvent,
  createShadowState,
  MAX_DURATION_SECONDS,
  MAX_EVENTS,
} from "./shadow-network-engine.js";

const $ = (id) => document.getElementById(id);
const scenarioInput = $("shadow-scenario");
const intensityInput = $("shadow-intensity");
const durationInput = $("shadow-duration");
const startButton = $("shadow-start");
const stopButton = $("shadow-stop");
const resetButton = $("shadow-reset");
const eventTable = $("shadow-events");
const chart = $("shadow-chart");
const context = chart.getContext("2d");
const intervals = { low: 1000, medium: 500, high: 250 };

let state = createShadowState();
let events = [];
let sampleRates = [];
let timer = null;
let running = false;
let mode = "blue";
let stopsAt = 0;

function protectedMode() {
  return mode !== "red";
}

function setMode(nextMode) {
  if (running) return;
  mode = nextMode;
  for (const button of document.querySelectorAll("[data-team-mode]")) {
    button.setAttribute("aria-pressed", String(button.dataset.teamMode === mode));
  }
  $("shadow-mode-caption").textContent = mode === "red"
    ? "Modeled defenses are off; observe only synthetic outcomes."
    : mode === "blue"
      ? "Modeled defensive rules are on."
      : "Observation mode: simulated defensive rules remain on.";
}

function renderEvents() {
  eventTable.replaceChildren();
  const recent = events.slice(-24).reverse();
  if (!recent.length) {
    const row = document.createElement("tr");
    row.className = "shadow-empty";
    const cell = document.createElement("td");
    cell.colSpan = 4;
    cell.textContent = "No events. Run a scenario to populate this fictional event stream.";
    row.append(cell);
    eventTable.append(row);
    return;
  }
  for (const item of recent) {
    const row = document.createElement("tr");
    const values = [
      new Date(item.timestamp).toLocaleTimeString(),
      `${item.actor} · ${item.destination}${item.route}`,
      item.signal,
    ];
    for (const value of values) {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    }
    const response = document.createElement("td");
    const badge = document.createElement("span");
    badge.className = `shadow-status ${item.status >= 400 ? "is-blocked" : ""}`;
    badge.textContent = item.status === 429 ? "429 · modeled limit" : item.status === 403 ? "403 · modeled block" : "200 · modeled";
    response.append(badge);
    row.append(response);
    eventTable.append(row);
  }
}

function drawChart() {
  const ratio = window.devicePixelRatio || 1;
  const width = chart.clientWidth;
  const height = 116;
  chart.width = Math.round(width * ratio);
  chart.height = Math.round(height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);
  context.strokeStyle = "#293841";
  context.lineWidth = 1;
  for (let row = 0; row < 4; row += 1) {
    const y = 8 + row * 30;
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }
  const slot = width / 30;
  const peak = Math.max(1, ...sampleRates.map((sample) => sample.rate));
  context.fillStyle = "rgba(98, 184, 255, .76)";
  sampleRates.forEach((sample, index) => {
    const barHeight = (sample.rate / peak) * 84;
    context.fillRect(width - (sampleRates.length - index) * slot + 2, 102 - barHeight, Math.max(2, slot - 4), barHeight);
  });
}

function renderMetrics(now = Date.now()) {
  const active = events.filter((item) => item.timestamp >= now - 5000);
  const rate = active.length / 5;
  $("shadow-total").textContent = String(events.length);
  $("shadow-detections").textContent = String(events.filter((item) => item.detection).length);
  $("shadow-blocked").textContent = String(events.filter((item) => item.intervention).length);
  $("shadow-rps").textContent = rate.toFixed(1);
  $("shadow-chart-rate").textContent = `${rate.toFixed(1)} events/sec`;
  const second = Math.floor(now / 1000);
  const last = sampleRates.at(-1);
  if (last?.second === second) last.rate = rate;
  else sampleRates.push({ second, rate });
  sampleRates = sampleRates.slice(-30);
  drawChart();
}

function addEvent(now = Date.now()) {
  const event = createShadowEvent(state, {
    scenario: scenarioInput.value,
    protectedMode: protectedMode(),
    timestamp: now,
  });
  events.push(event);
  renderEvents();
  renderMetrics(now);
}

function setRunning(value) {
  running = value;
  startButton.disabled = value;
  stopButton.disabled = !value;
  scenarioInput.disabled = value;
  intensityInput.disabled = value;
  durationInput.disabled = value;
  document.querySelectorAll("[data-team-mode]").forEach((button) => {
    button.disabled = value;
  });
  $("shadow-run-state").textContent = value ? "RUNNING" : "IDLE";
  $("shadow-run-state").classList.toggle("is-running", value);
}

function stopRun(message) {
  if (timer !== null) window.clearTimeout(timer);
  timer = null;
  if (!running) return;
  setRunning(false);
  $("shadow-message").textContent = `${message} ${events.length} synthetic events remain in memory until reset or page close.`;
}

function tick() {
  if (!running) return;
  const now = Date.now();
  if (now >= stopsAt) {
    stopRun("Automatic stop reached.");
    return;
  }
  if (events.length >= MAX_EVENTS) {
    stopRun("Safety stop reached: 120-event limit.");
    return;
  }
  addEvent(now);
  if (events.length >= MAX_EVENTS) {
    stopRun("Safety stop reached: 120-event limit.");
    return;
  }
  const profileDelay = intervals[intensityInput.value];
  const scenarioDelay = scenarioInput.value === "beacon" ? 1000 : profileDelay;
  timer = window.setTimeout(tick, Math.min(scenarioDelay, stopsAt - Date.now()));
}

function startRun() {
  if (running) return;
  state = createShadowState();
  events = [];
  sampleRates = [];
  renderEvents();
  stopsAt = Date.now() + Math.min(MAX_DURATION_SECONDS, Number(durationInput.value)) * 1000;
  setRunning(true);
  $("shadow-message").textContent = `Running ${scenarioInput.options[scenarioInput.selectedIndex].text}. Local event model only; no network activity.`;
  tick();
}

function resetDashboard() {
  if (timer !== null) window.clearTimeout(timer);
  timer = null;
  setRunning(false);
  state = createShadowState();
  events = [];
  sampleRates = [];
  renderEvents();
  renderMetrics();
  $("shadow-message").textContent = "Dashboard reset. No synthetic data was transmitted or saved.";
}

document.querySelectorAll("[data-team-mode]").forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.teamMode));
});
startButton.addEventListener("click", startRun);
stopButton.addEventListener("click", () => stopRun("Stopped immediately by instructor."));
resetButton.addEventListener("click", resetDashboard);
window.addEventListener("resize", drawChart);
document.addEventListener("visibilitychange", () => {
  if (document.hidden && running) stopRun("Stopped because the page moved to the background.");
});
window.addEventListener("beforeunload", () => {
  if (timer !== null) window.clearTimeout(timer);
});

setMode("blue");
renderEvents();
renderMetrics();
