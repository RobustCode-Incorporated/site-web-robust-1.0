// Vercel Serverless Function — receives "Request yours" forms for services
// (first one: Automated Video Reports, /what-we-do/video-reports.html).
//
// What it does, in order:
//   1. Validates the form and drops obvious bots (honeypot + minimum fill time).
//   2. Saves the request in Neon Postgres (`service_requests`, created on first use).
//   3. Notifies a human: e-mail via Resend and/or a Slack/Discord/Make webhook.
// It succeeds as soon as the request is stored OR someone has been notified,
// so a lead is never silently lost. If nothing is configured it answers 503 and
// the page tells the visitor to e-mail contact@robust-code.com instead.
//
// Environment variables (Vercel Project Settings — never in this repo):
//   DATABASE_URL            — Neon connection string (already used by the store).
//   RESEND_API_KEY          — optional. Sends the request by e-mail.
//   SERVICE_REQUEST_TO      — optional. Recipient, default contact@robust-code.com.
//   SERVICE_REQUEST_FROM    — optional. Sender on a Resend-verified domain,
//                             default "Robust Code <requests@robust-code.com>".
//   FULFILLMENT_NOTIFY_WEBHOOK_URL — optional. Same chat webhook as the store.

import { neon } from "@neondatabase/serverless";

const SERVICES = { "video-reports": "Automated Video Reports" };
const AUDIENCES = ["management", "board", "clients", "partners", "team", "other"];
const FREQUENCIES = ["weekly", "monthly", "quarterly", "other"];
const LANGUAGES = ["en", "fr", "nl", "other"];
const EMAIL_RE = /^[^\s@<>()]+@[^\s@<>()]+\.[^\s@<>()]{2,}$/;

function clean(v, max) {
  return typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max) : "";
}

export function validate(body) {
  const b = body && typeof body === "object" ? body : {};
  const data = {
    service: clean(b.service, 40),
    name: clean(b.name, 120),
    company: clean(b.company, 160),
    email: clean(b.email, 200).toLowerCase(),
    role: clean(b.role, 120),
    audience: clean(b.audience, 20),
    frequency: clean(b.frequency, 20),
    language: clean(b.language, 10),
    message: typeof b.message === "string" ? b.message.trim().slice(0, 2000) : "",
    lang: b.lang === "fr" ? "fr" : "en",
    consent: b.consent === true || b.consent === "on" || b.consent === "true",
  };
  const errors = [];
  if (!SERVICES[data.service]) errors.push("service");
  if (data.name.length < 2) errors.push("name");
  if (data.company.length < 2) errors.push("company");
  if (!EMAIL_RE.test(data.email)) errors.push("email");
  if (!AUDIENCES.includes(data.audience)) errors.push("audience");
  if (!FREQUENCIES.includes(data.frequency)) errors.push("frequency");
  if (!LANGUAGES.includes(data.language)) errors.push("language");
  if (!data.consent) errors.push("consent");
  // Bots: the hidden "website" field must stay empty, and a human needs a few seconds.
  const bot = clean(b.website, 200) !== "" || !(Number(b.elapsed) >= 3000);
  return { data, errors, bot };
}

async function save(d, meta) {
  if (!process.env.DATABASE_URL) return false;
  try {
    const sql = neon(process.env.DATABASE_URL);
    await sql`CREATE TABLE IF NOT EXISTS service_requests (
      id BIGSERIAL PRIMARY KEY,
      service TEXT NOT NULL,
      name TEXT NOT NULL,
      company TEXT NOT NULL,
      email TEXT NOT NULL,
      role TEXT,
      audience TEXT,
      frequency TEXT,
      language TEXT,
      message TEXT,
      page_lang TEXT,
      consent BOOLEAN NOT NULL DEFAULT false,
      status TEXT NOT NULL DEFAULT 'new',
      user_agent TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
    await sql`INSERT INTO service_requests
      (service, name, company, email, role, audience, frequency, language, message, page_lang, consent, user_agent)
      VALUES (${d.service}, ${d.name}, ${d.company}, ${d.email}, ${d.role}, ${d.audience}, ${d.frequency},
              ${d.language}, ${d.message}, ${d.lang}, ${d.consent}, ${meta.userAgent})`;
    return true;
  } catch (err) {
    console.error("service-request: database error", err.message);
    return false;
  }
}

function summary(d) {
  return [
    `New request: ${SERVICES[d.service]}`,
    `Name: ${d.name}`,
    `Company: ${d.company}`,
    `E-mail: ${d.email}`,
    `Role: ${d.role || "-"}`,
    `Audience: ${d.audience} | Frequency: ${d.frequency} | Language: ${d.language}`,
    `Message: ${d.message || "-"}`,
  ].join("\n");
}

async function notify(d) {
  let ok = false;
  const text = summary(d);
  if (process.env.RESEND_API_KEY) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.SERVICE_REQUEST_FROM || "Robust Code <requests@robust-code.com>",
          to: [process.env.SERVICE_REQUEST_TO || "contact@robust-code.com"],
          reply_to: d.email,
          subject: `${SERVICES[d.service]}: request from ${d.company}`,
          text,
        }),
      });
      ok = r.ok || ok;
      if (!r.ok) console.error("service-request: resend error", r.status);
    } catch (err) {
      console.error("service-request: resend error", err.message);
    }
  }
  const hook = process.env.FULFILLMENT_NOTIFY_WEBHOOK_URL;
  if (hook) {
    try {
      const r = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text, content: text }) });
      ok = r.ok || ok;
    } catch (err) {
      console.error("service-request: webhook error", err.message);
    }
  }
  return ok;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method" });
  }
  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const { data, errors, bot } = validate(body);
  if (bot) return res.status(200).json({ ok: true }); // answer like a success, store nothing
  if (errors.length) return res.status(400).json({ ok: false, error: "invalid", fields: errors });

  const stored = await save(data, { userAgent: clean(req.headers["user-agent"], 300) });
  const notified = await notify(data);
  console.log(`service-request: ${data.service} from ${data.company} stored=${stored} notified=${notified}`);
  if (!stored && !notified) return res.status(503).json({ ok: false, error: "unavailable" });
  return res.status(200).json({ ok: true });
}
