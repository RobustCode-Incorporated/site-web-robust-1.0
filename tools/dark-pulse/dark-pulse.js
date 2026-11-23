import { createLabState, createSimulationEvent, isSuccessfulStatus, MAX_BPM, MAX_DURATION_SECONDS, MAX_EVENTS } from "./dark-pulse-engine.js";

const $ = (id) => document.getElementById(id);
const scenarioInput = $("scenario");
const intensityInput = $("intensity");
const heartbeatControls = $("heartbeat-controls");
const bpmProfileInput = $("bpm-profile");
const customBpmInput = $("custom-bpm");
const heartbeatModeInput = $("heartbeat-mode");
const durationInput = $("duration");
const defensesInput = $("defenses");
const startButton = $("start-button");
const stopButton = $("stop-button");
const resetButton = $("reset-button");
const runMessage = $("run-message");
const eventList = $("event-list");
const chart = $("traffic-chart");
const chartContext = chart.getContext("2d");
const statusCodes = [200, 304, 401, 403, 423, 429];

let timer = null;
let running = false;
let startedAt = 0;
let stopAt = 0;
let state = createLabState();
let events = [];
let eventTimes = [];
let chartSamples = [];
let runScenario = scenarioInput.value;

function isHeartbeat() {
  return scenarioInput.value === "heartbeat";
}

function selectedBpm() {
  const value = bpmProfileInput.value === "custom" ? Number(customBpmInput.value) : Number(bpmProfileInput.value);
  return Math.min(MAX_BPM, Math.max(40, Number.isFinite(value) ? value : 72));
}

function updateScenarioControls() {
  const heart = isHeartbeat();
  heartbeatControls.hidden = !heart;
  $("intensity-wrap").hidden = heart;
  customBpmInput.disabled = bpmProfileInput.value !== "custom";
  $("current-bpm").textContent = heart ? String(selectedBpm()) : "—";
}

function markPulse() {
  const wrap = $("ecg-wrap");
  wrap.classList.remove("is-pulsing");
  void wrap.offsetWidth;
  wrap.classList.add("is-pulsing");
  $("visit-count").textContent = `· ${events.length} ${events.length === 1 ? "visit" : "visits"}`;
}

function responseClass(status) {
  return status < 400 ? "status-2xx" : "status-4xx";
}

function renderEvents() {
  const recent = events.slice(-30).reverse();
  eventList.replaceChildren();
  if (!recent.length) {
    const row = document.createElement("tr");
    row.className = "empty-row";
    const cell = document.createElement("td");
    cell.colSpan = 5;
    cell.textContent = "No events yet. Start a simulation to populate this local event stream.";
    row.append(cell);
    eventList.append(row);
    return;
  }

  for (const item of recent) {
    const row = document.createElement("tr");
    const time = new Date(item.timestamp).toLocaleTimeString();
    const values = [time, item.actor, item.event, item.path];
    for (const value of values) {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    }
    const statusCell = document.createElement("td");
    const badge = document.createElement("span");
    badge.className = `status-pill ${responseClass(item.status)}`;
    badge.textContent = `${item.status} ${statusLabel(item.status)}`;
    statusCell.append(badge);
    row.append(statusCell);
    eventList.append(row);
  }
}

function statusLabel(status) {
  return ({ 200: "OK", 304: "NOT MODIFIED", 401: "UNAUTHORIZED", 403: "WAF BLOCK", 423: "LOCKED", 429: "RATE LIMITED" })[status] || "STATUS";
}

function renderStatusBars() {
  const container = $("status-bars");
  container.replaceChildren();
  const largest = Math.max(1, ...statusCodes.map((code) => state.statusCounts.get(code) || 0));
  for (const code of statusCodes) {
    const count = state.statusCounts.get(code) || 0;
    const row = document.createElement("div");
    row.className = "status-row";
    const label = document.createElement("span");
    label.className = "status-code";
    label.textContent = code;
    const track = document.createElement("span");
    track.className = "status-track";
    const fill = document.createElement("span");
    fill.className = `status-fill${code === 401 ? " is-warning" : code >= 400 ? " is-danger" : ""}`;
    fill.style.width = `${(count / largest) * 100}%`;
    track.append(fill);
    const value = document.createElement("span");
    value.className = "status-count";
    value.textContent = String(count);
    row.append(label, track, value);
    container.append(row);
  }
}

function renderMetrics(now = Date.now()) {
  const windowStart = now - 5000;
  eventTimes = eventTimes.filter((time) => time >= windowStart);
  const rates = eventTimes.length / 5;
  const authFailures = events.filter((item) => item.authFailure || item.status === 423).length;
  const blocked = events.filter((item) => [403, 423, 429].includes(item.status)).length;
  const success = events.filter((item) => isSuccessfulStatus(item.status)).length;
  const failed = events.length - success;
  $("metric-total").textContent = String(events.length);
  $("metric-success").textContent = String(success);
  $("metric-failed").textContent = String(failed);
  $("metric-blocked").textContent = String(blocked);
  $("metric-auth").textContent = String(authFailures);
  $("metric-ratelimit").textContent = String(events.filter((item) => item.status === 429).length);
  $("metric-suspicious").textContent = String(events.filter((item) => item.suspicious).length);
  $("metric-locks").textContent = String(events.some((item) => item.status === 423) ? 1 : 0);
  $("rps-value").textContent = `${rates.toFixed(1)} / sec`;
  $("current-bpm").textContent = isHeartbeat() && running ? String(Math.round(currentBpm(now))) : isHeartbeat() ? String(selectedBpm()) : "—";
  $("defense-explanation").textContent = defensesInput.checked
    ? "Modeled only: 4+ events in a rolling second receive 429; repeated page patterns receive 403; five failed logins lock the demo account for the remainder of this run."
    : "Modeled defenses are off. These events remain synthetic; enabling the switch compares illustrative response outcomes.";
  const second = Math.floor(now / 1000);
  if (chartSamples.at(-1)?.second === second) {
    chartSamples[chartSamples.length - 1].rate = rates;
  } else {
    chartSamples.push({ second, rate: rates });
  }
  chartSamples = chartSamples.slice(-40);
  drawChart();
  renderStatusBars();
}

function drawChart() {
  const dpr = window.devicePixelRatio || 1;
  const width = chart.clientWidth;
  const height = 118;
  chart.width = Math.round(width * dpr);
  chart.height = Math.round(height * dpr);
  chartContext.setTransform(dpr, 0, 0, dpr, 0, 0);
  chartContext.clearRect(0, 0, width, height);
  chartContext.strokeStyle = "#26343b";
  chartContext.lineWidth = 1;
  for (let line = 0; line < 4; line += 1) {
    const y = 10 + line * 31;
    chartContext.beginPath();
    chartContext.moveTo(0, y);
    chartContext.lineTo(width, y);
    chartContext.stroke();
  }
  const peak = Math.max(1, ...chartSamples.map((sample) => sample.rate));
  const slot = width / 40;
  chartContext.fillStyle = "rgba(57, 230, 193, .72)";
  chartSamples.forEach((sample, index) => {
    const barHeight = (sample.rate / peak) * 86;
    chartContext.fillRect(width - (chartSamples.length - index) * slot + 2, 105 - barHeight, Math.max(2, slot - 4), barHeight);
  });
}

function addEvent(now = Date.now()) {
  const item = createSimulationEvent(state, {
    scenario: runScenario,
    protectedMode: defensesInput.checked,
    timestamp: now,
  });
  events.push(item);
  eventTimes.push(now);
  markPulse();
  renderEvents();
  renderMetrics(now);
}

function currentBpm(now) {
  if (heartbeatModeInput.value !== "exercise") return selectedBpm();
  const progress = Math.min(1, (now - startedAt) / 45000);
  return 60 + (Math.max(60, selectedBpm()) - 60) * progress;
}

function nextDelay(now) {
  if (runScenario === "heartbeat") {
    const base = 60000 / currentBpm(now);
    if (heartbeatModeInput.value === "arrhythmia") {
      return Math.max(60000 / MAX_BPM, base * (0.7 + Math.random() * 0.6));
    }
    return base;
  }
  const intervalByIntensity = { low: 1000, medium: 500, high: 250 };
  if (runScenario === "human") return 800 + Math.random() * 1400;
  if (runScenario === "auth") return intervalByIntensity[intensityInput.value] * 1.5;
  return intervalByIntensity[intensityInput.value];
}

function tick() {
  if (!running) return;
  const now = Date.now();
  if (now >= stopAt) {
    stopSimulation("Automatic stop reached.");
    return;
  }
  if (events.length >= MAX_EVENTS) {
    stopSimulation("Safety stop reached: 600-event run limit.");
    return;
  }
  addEvent(now);
  if (events.length >= MAX_EVENTS) {
    stopSimulation("Safety stop reached: 600-event run limit.");
    return;
  }
  timer = window.setTimeout(tick, Math.max(0, Math.min(nextDelay(now), stopAt - Date.now())));
}

function setRunning(value) {
  running = value;
  startButton.disabled = value;
  stopButton.disabled = !value;
  scenarioInput.disabled = value;
  intensityInput.disabled = value;
  durationInput.disabled = value;
  defensesInput.disabled = value;
  heartbeatModeInput.disabled = value;
  bpmProfileInput.disabled = value;
  customBpmInput.disabled = value || bpmProfileInput.value !== "custom";
  $("run-state").textContent = value ? "RUNNING" : "IDLE";
  $("run-state").classList.toggle("is-running", value);
  $("live-label").textContent = value ? "SIMULATING" : "STANDING BY";
  $("live-label").classList.toggle("is-running", value);
}

function stopSimulation(message = "Simulation stopped.") {
  if (timer !== null) window.clearTimeout(timer);
  timer = null;
  if (!running) return;
  setRunning(false);
  runMessage.textContent = `${message} ${events.length} synthetic events recorded in this page only.`;
  renderMetrics();
}

function startSimulation() {
  if (running) return;
  if (isHeartbeat() && (Number(customBpmInput.value) < 40 || Number(customBpmInput.value) > MAX_BPM)) {
    runMessage.textContent = `Choose a BPM between 40 and ${MAX_BPM}.`;
    customBpmInput.focus();
    return;
  }
  resetDashboard();
  state = createLabState();
  runScenario = scenarioInput.value;
  startedAt = Date.now();
  stopAt = startedAt + Math.min(MAX_DURATION_SECONDS, Number(durationInput.value)) * 1000;
  setRunning(true);
  runMessage.textContent = "Running locally. No network requests are being generated.";
  tick();
}

function resetDashboard() {
  if (timer !== null) window.clearTimeout(timer);
  timer = null;
  running = false;
  events = [];
  eventTimes = [];
  chartSamples = [];
  state = createLabState();
  setRunning(false);
  renderEvents();
  renderMetrics();
  $("metric-total").textContent = "0";
  $("metric-success").textContent = "0";
  $("metric-failed").textContent = "0";
  $("metric-blocked").textContent = "0";
  $("metric-auth").textContent = "0";
  $("metric-ratelimit").textContent = "0";
  $("metric-suspicious").textContent = "0";
  $("metric-locks").textContent = "0";
  $("visit-count").textContent = "· 0 visits";
  runMessage.textContent = "Dashboard reset. No events are stored or transmitted.";
}

scenarioInput.addEventListener("change", updateScenarioControls);
bpmProfileInput.addEventListener("change", () => {
  customBpmInput.disabled = bpmProfileInput.value !== "custom" || running;
  updateScenarioControls();
});
customBpmInput.addEventListener("input", updateScenarioControls);
startButton.addEventListener("click", startSimulation);
stopButton.addEventListener("click", () => stopSimulation("Stopped immediately by instructor."));
resetButton.addEventListener("click", resetDashboard);
window.addEventListener("resize", drawChart);
document.addEventListener("visibilitychange", () => {
  if (document.hidden && running) stopSimulation("Stopped because this tab moved to the background.");
});
window.addEventListener("beforeunload", () => {
  if (timer !== null) window.clearTimeout(timer);
});

updateScenarioControls();
renderStatusBars();
renderMetrics();
