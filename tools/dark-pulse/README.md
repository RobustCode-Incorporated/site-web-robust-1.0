# Dark Pulse Traffic Lab

## What this lab is

Dark Pulse is a client-side educational visualization. It creates labeled event objects in browser memory and models response codes and defensive signals. It does **not** make HTTP requests, run a server, accept credentials, test a WAF, or reproduce real network behavior. It has no Vercel Web Analytics script or analytics event instrumentation.

The public website itself may still record an ordinary page view through hosting-level logs or platform features. The simulator's generated events are not sent to Vercel Analytics or another analytics service.

## Architecture

```text
Instructor controls
        |
        v
Browser timer (maximum 120 seconds)
        |
        v
Local event model <---- Defensive model (rate limit / pattern flag / fake lockout)
        |
        +----> In-memory counters, chart, and recent-event table
```

The `dark-pulse-engine.js` module is dependency-free and deterministic apart from timestamps passed to it. `dark-pulse.js` handles the interface, bounded timer, chart, and rendering. `dark-pulse.test.js` exercises event classification and modeled controls using Node's built-in test runner.

## Run locally

From the repository root, serve the static files locally:

```sh
python3 -m http.server 4173
```

Open `http://localhost:4173/tools/dark-pulse/`. The page uses no simulation backend. Stop the local static file server when the class is finished.

Run the focused automated tests:

```sh
node --test tools/dark-pulse/dark-pulse.test.js
```

## Instructor walkthrough

1. Select **Organic-like browsing** and start a short run. Observe changing paths and timing.
2. Select **Heartbeat visits** and try the 60, 72, 90, and 100 BPM profiles. Each pulse corresponds to one in-memory page-view event.
3. Use **Exercise** to ramp toward the selected BPM or **Irregular rhythm** to introduce bounded timing variation.
4. Compare the automated page pattern with modeled defenses switched off and on.
5. Select synthetic login failures and observe 401 results followed by a modeled 423 lockout. No username/password field exists and no credentials are used.
6. Point out that 403, 423, and 429 are simulation labels; no WAF or server actually returned them.
7. Press **STOP NOW**, reset, and discuss what additional evidence a real defender would need before attributing intent.

## Safety and analytics separation

- Event generation runs only in the open browser tab and stops on instructor request, tab backgrounding, the selected duration, or 600 events.
- The maximum illustrated heartbeat rate is 180 BPM. A custom value is bounded to 40–180 BPM.
- The simulator contains no destination setting, `fetch`, XHR, WebSocket, proxy, IP rotation, credential submission, or third-party request loop. The page also loads no external fonts or scripts.
- The dashboard page intentionally omits the Vercel Insights script and analytics event tracker. Do not add them to this page if generated events must remain separate from business metrics.
- The site deployment is not modified or deployed by this lab. Do not use the production site or any third-party service as a traffic target.

## Student exercises

- Explain why a regular rhythm alone is not proof of automation or malicious intent.
- Compare request rate, path repetition, response status, and authentication-failure counts across scenarios.
- Describe what an operational rate limiter, progressive delay, account lockout, and WAF might do—and why this visual model is not a substitute for testing those controls in an authorized staging environment.
- Propose a monitoring alert that combines multiple signals and discuss false positives.
