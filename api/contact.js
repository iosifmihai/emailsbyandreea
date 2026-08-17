/**
 * Receives form submissions and emails them on.
 *
 * Runs as a Vercel serverless function, so the API key never reaches the
 * browser and a submission is recorded the moment the visitor presses the
 * button — rather than depending on them completing a handoff to their own
 * mail client.
 *
 * Configure in Vercel → Settings → Environment Variables:
 *   RESEND_API_KEY   required — from resend.com/api-keys
 *   CONTACT_TO       optional — defaults to contact@emailsbyandreea.com
 *   CONTACT_FROM     optional — defaults to Resend's shared onboarding sender.
 *                    Set this to something on a domain verified in Resend
 *                    (e.g. "Emails by Andreea <site@emailsbyandreea.com>") for
 *                    proper deliverability.
 *
 * With no key set the function answers 503 `not-configured`, and the form
 * quietly falls back to opening a prefilled mail draft, exactly as before.
 */

const TO = process.env.CONTACT_TO || "contact@emailsbyandreea.com";
const FROM = process.env.CONTACT_FROM || "Emails by Andreea <onboarding@resend.dev>";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const esc = (v = "") =>
  String(v).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[c]);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const body = typeof req.body === "string" ? safeParse(req.body) : req.body || {};
  const {
    kind = "enquiry",
    name = "",
    email = "",
    company = "",
    website = "",
    phone = "",
    interests = [],
    message = "",
    botField = "",
  } = body;

  // Honeypot: a real person never sees this field, so anything in it is a bot.
  // Answer 200 so the bot learns nothing from the response.
  if (botField) return res.status(200).json({ ok: true });

  if (!name.trim() || !EMAIL_RE.test(String(email).trim())) {
    return res.status(400).json({ ok: false, error: "Name and a valid email are required." });
  }
  if (kind === "enquiry" && !message.trim()) {
    return res.status(400).json({ ok: false, error: "Message is required." });
  }

  if (!process.env.RESEND_API_KEY) {
    // The form falls back to a mail draft rather than reporting a failure.
    return res.status(503).json({ ok: false, reason: "not-configured" });
  }

  const isNewsletter = kind === "newsletter";
  const subject = isNewsletter
    ? `Newsletter signup — ${name.trim()}`
    : `Enquiry from ${name.trim()}${company.trim() ? ` — ${company.trim()}` : ""}`;

  const rows = [
    ["Name", name],
    ["Email", email],
    company && ["Company", company],
    website && ["Website", website],
    phone && ["Phone / WhatsApp", phone],
    interests?.length && ["Services of interest", [].concat(interests).join(", ")],
  ].filter(Boolean);

  const html = `
    <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#091019;line-height:1.6">
      <p style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#5a6472;margin:0 0 14px">
        ${isNewsletter ? "Newsletter signup" : "New enquiry"} · emailsbyandreea.com
      </p>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:18px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 18px 4px 0;color:#5a6472;white-space:nowrap">${esc(k)}</td>
                   <td style="padding:4px 0"><strong>${esc(v)}</strong></td></tr>`,
          )
          .join("")}
      </table>
      ${
        message.trim()
          ? `<div style="border-left:2px solid #0a2447;padding-left:14px;white-space:pre-wrap">${esc(
              message,
            )}</div>`
          : ""
      }
    </div>`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        // so a reply in the inbox goes straight back to the visitor
        reply_to: String(email).trim(),
        subject,
        html,
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      console.error("Resend rejected the message:", r.status, detail);
      // Surface a short reason. These are configuration faults — an unverified
      // domain, a sender the account may not use — not anything sensitive, and
      // without them a failure here is undiagnosable from the outside.
      let reason = "";
      try {
        const parsed = JSON.parse(detail);
        reason = parsed.message || parsed.name || "";
      } catch {
        reason = detail.slice(0, 160);
      }
      return res.status(502).json({
        ok: false,
        error: "The message could not be sent.",
        upstream: { status: r.status, reason },
      });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Sending failed:", err);
    return res.status(502).json({ ok: false, error: "The message could not be sent." });
  }
}

function safeParse(s) {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}
