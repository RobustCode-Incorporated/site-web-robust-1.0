export const MAX_BPM = 180;
export const MAX_DURATION_SECONDS = 120;
export const MAX_EVENTS = 600;

export function isSuccessfulStatus(status) {
  return status >= 200 && status < 400;
}

export function createLabState() {
  return {
    requestTimes: [],
    accountFailures: 0,
    botPatternEvents: 0,
    statusCounts: new Map(),
    eventCount: 0,
  };
}

export function createSimulationEvent(state, { scenario, protectedMode, timestamp }) {
  state.eventCount += 1;
  state.requestTimes = state.requestTimes.filter((time) => timestamp - time < 1000);
  const priorRequestsInWindow = state.requestTimes.length;
  state.requestTimes.push(timestamp);

  let status = 200;
  let path = "/lab/home";
  let event = "Page view";
  let suspicious = false;
  let authFailure = false;

  if (scenario === "human") {
    const pages = ["/lab/home", "/lab/about", "/lab/program", "/lab/resources"];
    path = pages[state.eventCount % pages.length];
    status = state.eventCount % 4 === 0 ? 304 : 200;
    event = "Synthetic browse";
  } else if (scenario === "bot") {
    path = "/lab/resources";
    event = "Repeated page pattern";
    suspicious = true;
    state.botPatternEvents += 1;
    if (protectedMode && state.botPatternEvents > 6) status = 403;
  } else if (scenario === "auth") {
    path = "/lab/login";
    event = "Synthetic login failure";
    suspicious = true;
    authFailure = true;
  } else if (scenario === "heartbeat") {
    path = "/lab/heartbeat";
    event = "Heartbeat page view";
  } else {
    throw new Error(`Unknown simulation scenario: ${scenario}`);
  }

  if (protectedMode && priorRequestsInWindow >= 3) {
    status = 429;
  } else if (scenario === "auth") {
    if (protectedMode && state.accountFailures >= 5) {
      status = 423;
    } else {
      state.accountFailures += 1;
      status = 401;
    }
  }

  state.statusCounts.set(status, (state.statusCounts.get(status) || 0) + 1);
  return {
    id: state.eventCount,
    timestamp,
    actor: `SIM-${String(((state.eventCount - 1) % 4) + 1).padStart(2, "0")}`,
    event,
    path,
    status,
    suspicious,
    authFailure,
  };
}
