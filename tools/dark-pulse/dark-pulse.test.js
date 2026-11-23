import test from "node:test";
import assert from "node:assert/strict";
import { createLabState, createSimulationEvent, isSuccessfulStatus, MAX_BPM, MAX_DURATION_SECONDS, MAX_EVENTS } from "./dark-pulse-engine.js";

test("safety bounds are fixed and conservative", () => {
  assert.equal(MAX_BPM, 180);
  assert.equal(MAX_DURATION_SECONDS, 120);
  assert.equal(MAX_EVENTS, 600);
});

test("organic-like and heartbeat scenarios produce only synthetic page-view events", () => {
  const state = createLabState();
  const human = createSimulationEvent(state, { scenario: "human", protectedMode: false, timestamp: 1000 });
  const heartbeat = createSimulationEvent(state, { scenario: "heartbeat", protectedMode: false, timestamp: 2000 });
  assert.equal(human.status, 200);
  assert.equal(heartbeat.path, "/lab/heartbeat");
  assert.equal(human.actor.startsWith("SIM-"), true);
});

test("2xx and 3xx statuses count as successful responses", () => {
  assert.equal(isSuccessfulStatus(200), true);
  assert.equal(isSuccessfulStatus(304), true);
  assert.equal(isSuccessfulStatus(401), false);
});

test("defensive model rate-limits the fourth request in a rolling second", () => {
  const state = createLabState();
  const statuses = Array.from({ length: 4 }, (_, index) =>
    createSimulationEvent(state, { scenario: "bot", protectedMode: true, timestamp: 1000 + index * 100 }).status,
  );
  assert.deepEqual(statuses, [200, 200, 200, 429]);
});

test("defensive model flags repeated paths and locks the fake account after five failures", () => {
  const botState = createLabState();
  let botEvent;
  for (let index = 0; index < 7; index += 1) {
    botEvent = createSimulationEvent(botState, { scenario: "bot", protectedMode: true, timestamp: index * 2000 });
  }
  assert.equal(botEvent.status, 403);

  const authState = createLabState();
  const authStatuses = Array.from({ length: 6 }, (_, index) =>
    createSimulationEvent(authState, { scenario: "auth", protectedMode: true, timestamp: index * 2000 }).status,
  );
  assert.deepEqual(authStatuses, [401, 401, 401, 401, 401, 423]);
});

test("unknown scenarios fail explicitly", () => {
  assert.throws(
    () => createSimulationEvent(createLabState(), { scenario: "unknown", protectedMode: false, timestamp: 0 }),
    /Unknown simulation scenario/,
  );
});
