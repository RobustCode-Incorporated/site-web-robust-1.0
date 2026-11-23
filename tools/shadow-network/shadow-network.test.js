import test from "node:test";
import assert from "node:assert/strict";
import { createShadowEvent, createShadowState, DESTINATION, MAX_DURATION_SECONDS, MAX_EVENTS } from "./shadow-network-engine.js";

test("the simulation is bounded and uses a reserved fictional destination", () => {
  assert.equal(MAX_DURATION_SECONDS, 60);
  assert.equal(MAX_EVENTS, 120);
  assert.equal(DESTINATION, "lab.shadow.invalid");
});

test("events use synthetic identifiers and contain no observed client address", () => {
  const event = createShadowEvent(createShadowState(), {
    scenario: "browse",
    protectedMode: false,
    timestamp: 1000,
  });
  assert.equal(event.actor, "DEMO-01");
  assert.equal(event.destination, "lab.shadow.invalid");
  assert.equal("ipAddress" in event, false);
  assert.equal(event.status, 200);
});

test("blue-team pattern control marks repeated routes", () => {
  const state = createShadowState();
  const outcomes = [0, 1000, 2000].map((timestamp) =>
    createShadowEvent(state, { scenario: "browse", protectedMode: true, timestamp }),
  );
  assert.equal(outcomes[0].status, 200);
  assert.equal(outcomes[1].status, 200);
  assert.equal(outcomes[2].status, 403);
  assert.equal(outcomes[2].detection, true);
});

test("the flood concept applies a modeled 429 without generating requests", () => {
  const state = createShadowState();
  const outcomes = [0, 100, 200, 300].map((timestamp) =>
    createShadowEvent(state, { scenario: "flood", protectedMode: true, timestamp }),
  );
  assert.deepEqual(outcomes.map((event) => event.status), [200, 200, 200, 429]);
  assert.equal(outcomes[3].intervention, true);
});

test("irregular check-in intervals are flagged as a signal", () => {
  const state = createShadowState();
  createShadowEvent(state, { scenario: "beacon", protectedMode: false, timestamp: 1000 });
  const irregular = createShadowEvent(state, { scenario: "beacon", protectedMode: false, timestamp: 2800 });
  assert.equal(irregular.intervalAnomaly, true);
  assert.equal(irregular.detection, true);
});

test("unknown scenarios fail explicitly", () => {
  assert.throws(
    () => createShadowEvent(createShadowState(), { scenario: "scan", protectedMode: true, timestamp: 0 }),
    /Unknown Shadow Network scenario/,
  );
});
