# Shadow Network Lab

## Safety and scope

This is a fictional browser-only classroom simulation. It creates synthetic event objects in memory and displays fixture network details using documentation-only addresses. It does not scan Wi-Fi or LAN devices, inspect an IP/subnet, perform ARP or DNS, capture packets, open an access point, communicate with an endpoint, create a real QR code or phishing link, or generate network load.

The destination `lab.shadow.invalid` is a reserved non-resolving example name. Modeled 200/403/429 responses are labels from the local event model, not server responses. Diagnostic values are static samples, not measured readings. There is no packet capture or PCAP output.

## Architecture

```text
Instructor browser controls
          |
          v
Bounded local event model (<= 60 sec, <= 120 events)
          |
          +--> Fictional event table, chart, and modeled controls
          +--> Static RFC 5737 documentation-address fixtures
          +--> Static sample diagnostic readings
```

The page has no analytics script, external JS/font dependency, network API call, browser background worker, or persistence. It stops when the instructor presses STOP, the tab becomes hidden, the selected duration expires, or the event cap is reached. Reset and page close clear the in-memory data.

## Run locally

From the repository root:

```sh
python3 -m http.server 4173
```

Open `http://localhost:4173/tools/shadow-network/`. Run the isolated model tests with:

```sh
node --test tools/shadow-network/shadow-network.test.js
```

## Instructor walkthrough

1. Review the safety notice and fictional topology. Ask students which displayed values are fixtures rather than observations.
2. Select **Wireless reconnaissance** and explain IP/subnet, gateway, DNS, DHCP, ARP, client isolation, and segmentation using only the static example inventory.
3. Run **Automated browsing** and **Endpoint check-in pattern**; compare path repetition and interval regularity in the synthetic event stream.
4. Discuss QR-code warning signs with the decorative non-scannable graphic. There is no destination link or credential form.
5. Use **Rogue access point tabletop** to discuss SSID impersonation and client isolation without creating or connecting to an access point.
6. Select **Traffic spike** and compare Red Team (controls off) with Blue Team (modeled interventions on). No requests leave the page.
7. Review diagnostic sample values and distinguish them from actual ping, DNS, throughput, packet-loss, or stability tests.
8. Use the worksheet in the page to report signals, uncertainty, defensive choices, and authorization boundaries.

## 30-minute exercise and assessment

The page includes a six-part 30-minute lesson plan and an eight-point rubric. Students should distinguish observed facts from inference, identify repeated patterns, describe defensive controls, and respect privacy and authorization. The event table is not a packet capture and must not be presented as one.

## Production and analytics

This page intentionally omits Vercel Web Analytics and the site's event tracker. Its locally generated model events are not sent to business analytics or any service. The ordinary page request used to load a hosted version may still appear in infrastructure-level logs; this lab does not alter hosting or production systems.

Do not extend this module with real network targets, participant device discovery, packet capture, endpoint installation, real beacon traffic, scannable phishing QR codes, or load generation. Any operational experiment belongs in a separately authorized and isolated environment with explicit instructor approval and purpose-built controls.
