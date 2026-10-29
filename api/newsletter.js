// Vercel Serverless Function — newsletter signup with double opt-in.
//
//   POST /api/newsletter  {email, lang, company_website, elapsed}
//        -> stores a *pending* subscriber in Neon and e-mails a confirmation link.
//   GET  /api/newsletter?confirm=TOKEN      -> subscriber confirmed (+ owner notified).
//   GET  /api/newsletter?unsubscribe=TOKEN  -> subscriber unsubscribed.
//
// Nobody is "subscribed" until they click the link in their own inbox (GDPR-friendly
// proof of consent: confirmed_at + the IP-free token flow). Every e-mail carries an
// unsubscribe link. Table `newsletter_subscribers` is created on first use.
//
// Environment (Vercel Project Settings):
//   DATABASE_URL        — Neon connection string (required).
//   RESEND_API_KEY      — required to send the confirmation e-mail.
//   NEWSLETTER_FROM     — optional, default "Robust Code Insights <insights@robust-code.com>".
//   NEWSLETTER_NOTIFY   — optional owner address for "new confirmed subscriber",
//                         default contact@robust-code.com (set to "off" to disable).
//   RESEND_AUDIENCE_ID  — optional. If set, confirmed subscribers are also added to this
//                         Resend audience, so issues can be sent as Resend broadcasts.

import { neon } from "@neondatabase/serverless";
import { randomBytes } from "node:crypto";

const SITE = "https://www.robust-code.com";
const EMAIL_RE = /^[^\s@<>()]+@[^\s@<>()]+\.[^\s@<>()]{2,}$/;

const TXT = {
  en: {
    subject: "Confirm your subscription to Robust Code Insights",
    hello: "Thanks for signing up for Robust Code Insights.",
    body: "One practical piece a month on Belgian digitalization, AI adoption and business operations. Please confirm that this is your address:",
    button: "Confirm my subscription",
    ignore: "If you didn't sign up, ignore this e-mail and nothing will happen.",
    confirmedTitle: "You're subscribed.",
    confirmedBody: "Thank you. The next article will land in your inbox.",
    unsubTitle: "You're unsubscribed.",
    unsubBody: "You won't receive any more e-mails from Robust Code Insights.",
    badTitle: "This link is no longer valid.",
    badBody: "It may have been used already. You can sign up again from any article.",
    back: "Back to Insights",
    unsubscribe: "Unsubscribe",
  },
  fr: {
    subject: "Confirmez votre inscription à Robust Code Insights",
    hello: "Merci pour votre inscription à Robust Code Insights.",
    body: "Un article pratique par mois sur la digitalisation en Belgique, l'adoption de l'IA et les opérations d'entreprise. Merci de confirmer que c'est bien votre adresse :",
    button: "Confirmer mon inscription",
    ignore: "Si vous ne vous êtes pas inscrit, ignorez cet e-mail : il ne se passera rien.",
    confirmedTitle: "Vous êtes inscrit.",
    confirmedBody: "Merci. Le prochain article arrivera dans votre boîte mail.",
    unsubTitle: "Vous êtes désinscrit.",
    unsubBody: "Vous ne recevrez plus d'e-mails de Robust Code Insights.",
    badTitle: "Ce lien n'est plus valide.",
    badBody: "Il a peut-être déjà été utilisé. Vous pouvez vous réinscrire depuis n'importe quel article.",
    back: "Retour aux Insights",
    unsubscribe: "Se désinscrire",
  },
};

let sqlClient;
async function db() {
  if (!process.env.DATABASE_URL) return null;
  if (!sqlClient) {
    sqlClient = neon(process.env.DATABASE_URL);
    await sqlClient`CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id BIGSERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      lang TEXT NOT NULL DEFAULT 'en',
      status TEXT NOT NULL DEFAULT 'pending',      -- pending | confirmed | unsubscribed
      token TEXT UNIQUE NOT NULL,
      source TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      confirmed_at TIMESTAMPTZ,
      unsubscribed_at TIMESTAMPTZ
    )`;
  }
  return sqlClient;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

async function sendMail({ to, subject, html, text }) {
  if (!process.env.RESEND_API_KEY) return false;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.NEWSLETTER_FROM || "Robust Code Insights <insights@robust-code.com>", to: [to], subject, html, text }),
  });
  if (!r.ok) console.error("newsletter: resend error", r.status, await r.text().catch(() => ""));
  return r.ok;
}

function confirmEmail(lang, token) {
  const t = TXT[lang];
  const link = `${SITE}/api/newsletter?confirm=${token}`;
  const unsub = `${SITE}/api/newsletter?unsubscribe=${token}`;
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#000">
  <div style="background:#000;color:#fff;padding:18px 24px;border-radius:10px 10px 0 0;font-weight:bold;letter-spacing:2px">ROBUST CODE · INSIGHTS</div>
  <div style="border:1px solid #ddd;border-top:0;padding:28px 24px;border-radius:0 0 10px 10px;background:#FFFAFA">
    <p style="font-size:17px;margin:0 0 12px">${esc(t.hello)}</p>
    <p style="color:#444;line-height:1.5">${esc(t.body)}</p>
    <p style="margin:26px 0"><a href="${link}" style="background:#000;color:#fff;text-decoration:none;padding:14px 22px;border-radius:999px;display:inline-block">${esc(t.button)}</a></p>
    <p style="color:#777;font-size:13px">${esc(t.ignore)}</p>
  </div>
  <p style="color:#999;font-size:12px;text-align:center;margin-top:14px">ROBUST CODE S.a.r.l · <a href="${unsub}" style="color:#999">${esc(t.unsubscribe)}</a></p>
</div>`;
  const text = `${t.hello}\n\n${t.body}\n${link}\n\n${t.ignore}\n\n${t.unsubscribe}: ${unsub}`;
  return { subject: t.subject, html, text };
}

function page(res, lang, title, body, ok = true) {
  const t = TXT[lang] || TXT.en;
  const back = lang === "fr" ? "/fr/insights/" : "/insights/";
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.status(ok ? 200 : 400).send(`<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${esc(title)} | ROBUST CODE</title><link rel="icon" href="/assets/images/logo.png">
<style>body{margin:0;background:#FFFAFA;font-family:Arial,Helvetica,sans-serif;color:#000}header{background:#000;padding:18px 28px}header img{height:34px}main{max-width:560px;margin:12vh auto;padding:0 24px;text-align:center}h1{font-size:34px;margin:0 0 12px}p{color:#555;line-height:1.5}.dot{width:64px;height:64px;border-radius:50%;margin:0 auto 22px;background:${ok ? "#1b5e20" : "#d32f2f"};color:#fff;font-size:34px;line-height:64px}a.btn{display:inline-block;margin-top:22px;background:#000;color:#fff;text-decoration:none;padding:13px 22px;border-radius:999px}</style></head>
<body><header><a href="/"><img src="/assets/images/robust-logo-white.png" alt="ROBUST CODE"></a></header><main><div class="dot">${ok ? "&#10003;" : "!"}</div><h1>${esc(title)}</h1><p>${esc(body)}</p><a class="btn" href="${back}">${esc(t.back)}</a></main></body></html>`);
}

async function addToAudience(email) {
  const aud = process.env.RESEND_AUDIENCE_ID;
  if (!aud || !process.env.RESEND_API_KEY) return;
  try {
    await fetch(`https://api.resend.com/audiences/${aud}/contacts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ email, unsubscribed: false }),
    });
  } catch (err) { console.error("newsletter: audience error", err.message); }
}

export default async function handler(req, res) {
  const sql = await db().catch((e) => { console.error("newsletter: db", e.message); return null; });

  if (req.method === "GET") {
    const q = req.query || {};
    const token = typeof (q.confirm || q.unsubscribe) === "string" ? (q.confirm || q.unsubscribe).slice(0, 80) : "";
    if (!sql || !/^[a-f0-9]{40}$/.test(token)) return page(res, "en", TXT.en.badTitle, TXT.en.badBody, false);
    if (q.confirm) {
      const rows = await sql`UPDATE newsletter_subscribers SET status = 'confirmed', confirmed_at = COALESCE(confirmed_at, now())
        WHERE token = ${token} AND status <> 'unsubscribed' RETURNING email, lang`;
      if (!rows.length) return page(res, "en", TXT.en.badTitle, TXT.en.badBody, false);
      const { email, lang } = rows[0];
      await addToAudience(email);
      const owner = process.env.NEWSLETTER_NOTIFY || "contact@robust-code.com";
      if (owner !== "off") await sendMail({ to: owner, subject: "New Insights subscriber", text: `${email} confirmed their subscription (${lang}).`, html: `<p>${esc(email)} confirmed their subscription (${esc(lang)}).</p>` }).catch(() => {});
      const t = TXT[lang] || TXT.en;
      return page(res, lang, t.confirmedTitle, t.confirmedBody);
    }
    const rows = await sql`UPDATE newsletter_subscribers SET status = 'unsubscribed', unsubscribed_at = now()
      WHERE token = ${token} RETURNING lang`;
    if (!rows.length) return page(res, "en", TXT.en.badTitle, TXT.en.badBody, false);
    const t = TXT[rows[0].lang] || TXT.en;
    return page(res, rows[0].lang, t.unsubTitle, t.unsubBody);
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ ok: false });
  }
  let b = req.body;
  if (typeof b === "string") { try { b = JSON.parse(b); } catch { b = {}; } }
  b = b || {};
  const email = typeof b.email === "string" ? b.email.trim().toLowerCase().slice(0, 200) : "";
  const lang = b.lang === "fr" ? "fr" : "en";
  if ((typeof b.company_website === "string" && b.company_website) || !(Number(b.elapsed) >= 1500)) {
    return res.status(200).json({ ok: true }); // bot: pretend success, store nothing
  }
  if (!EMAIL_RE.test(email)) return res.status(400).json({ ok: false, error: "email" });
  if (!sql || !process.env.RESEND_API_KEY) return res.status(503).json({ ok: false, error: "unavailable" });

  const fresh = randomBytes(20).toString("hex");
  const source = typeof b.source === "string" ? b.source.slice(0, 200) : null;
  // New address -> pending. Pending/unsubscribed address -> new token, pending again.
  // Already confirmed -> nothing changes, same answer (no way to probe who is subscribed).
  const rows = await sql`INSERT INTO newsletter_subscribers (email, lang, token, source)
    VALUES (${email}, ${lang}, ${fresh}, ${source})
    ON CONFLICT (email) DO UPDATE SET
      token = CASE WHEN newsletter_subscribers.status = 'confirmed' THEN newsletter_subscribers.token ELSE EXCLUDED.token END,
      lang = EXCLUDED.lang,
      status = CASE WHEN newsletter_subscribers.status = 'confirmed' THEN 'confirmed' ELSE 'pending' END
    RETURNING token, status`;
  const { token, status } = rows[0];
  if (status !== "confirmed") {
    const m = confirmEmail(lang, token);
    const sent = await sendMail({ to: email, ...m });
    if (!sent) return res.status(503).json({ ok: false, error: "unavailable" });
  }
  console.log(`newsletter: signup ${status}`);
  return res.status(200).json({ ok: true });
}
