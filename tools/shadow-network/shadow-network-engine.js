export const MAX_DURATION_SECONDS = 60;
export const MAX_EVENTS = 120;
export const DESTINATION = "lab.shadow.invalid";

const SCENARIOS = new Set(["recon", "browse", "beacon", "qr", "rogue", "flood", "diagnostics"]);

export function createShadowState() {
  return {
    events: 0,
    recentTimes: [],
    lastCheckInAt: null,
    routeCounts: new Map(),
  };
}

export function createShadowEvent(state, { scenario, protectedMode, timestamp }) {
  if (!SCENARIOS.has(scenario)) {
    throw new Error(`Unknown Shadow Network scenario: ${scenario}`);
  }

  state.events += 1;
  state.recentTimes = state.recentTimes.filter((time) => timestamp - time < 1000);
  const rateLimited = protectedMode && scenario === "flood" && state.recentTimes.length >= 3;
  state.recentTimes.push(timestamp);

  const signalByScenario = {
    recon: ["Fixture inventory reviewed", "Gateway example displayed", "DNS example displayed"],
    browse: ["Synthetic page view", "Repeated route pattern"],
    beacon: ["Synthetic endpoint check-in", "Regular interval pattern"],
    qr: ["Mock QR warning reviewed", "Untrusted destination indicator"],
    rogue: ["Unauthorized AP tabletop signal", "SSID impersonation risk discussed"],
    flood: ["Synthetic burst event", "High event-rate indicator"],
    diagnostics: ["Sample latency reading displayed", "Sample DNS reading displayed"],
  };
  const signals = signalByScenario[scenario];
  const signal = signals[(state.events - 1) % signals.length];
  const route = scenario === "browse" ? "/demo/page" : scenario === "beacon" ? "/demo/check-in" : `/demo/${scenario}`;
  const routeCount = (state.routeCounts.get(route) || 0) + 1;
  state.routeCounts.set(route, routeCount);

  const repeated = ["browse", "beacon"].includes(scenario) && routeCount >= 3;
  const irregular = scenario === "beacon" && state.lastCheckInAt !== null && Math.abs(timestamp - state.lastCheckInAt - 1000) > 250;
  if (scenario === "beacon") state.lastCheckInAt = timestamp;

  const status = rateLimited ? 429 : protectedMode && repeated ? 403 : 200;
  return {
    id: state.events,
    timestamp,
    actor: `DEMO-${String(((state.events - 1) % 4) + 1).padStart(2, "0")}`,
    destination: DESTINATION,
    route,
    scenario,
    signal,
    status,
    detection: repeated || irregular || scenario === "rogue" || scenario === "qr" || scenario === "flood",
    intervention: status === 403 || status === 429,
    intervalAnomaly: irregular,
  };
}
