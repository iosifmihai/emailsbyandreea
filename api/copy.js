/**
 * Saves the text edited on the site.
 *
 * The browser never holds a Sanity write token: it sends the wording and a
 * password, and this function, running on Vercel, is what is trusted to write.
 * One document, `siteCopy`, holds every change as a { key, value } pair, so a
 * key that is absent simply means "still showing what ships in the code".
 *
 * Configure in Vercel → Settings → Environment Variables:
 *   SANITY_WRITE_TOKEN   required — sanity.io/manage → API → Tokens, Editor
 *   EDIT_PASSWORD        required — chosen by you, 12 characters or more
 *   SANITY_PROJECT_ID    optional — defaults to the project this site uses
 *   SANITY_DATASET       optional — defaults to "production"
 *
 * Without both required values the editor answers 503 and refuses to open,
 * rather than appearing to work and losing what was typed.
 */
import { timingSafeEqual } from "node:crypto";

const PROJECT_ID = process.env.SANITY_PROJECT_ID || "vomrxysv";
const DATASET = process.env.SANITY_DATASET || "production";
const API_VERSION = "2024-01-01";
const DOC_ID = "siteCopy";
const MAX_VALUE = 8000;

const API = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}`;

/** Compares without leaking, through timing, how much of the password matched. */
function passwordMatches(supplied) {
  const expected = process.env.EDIT_PASSWORD || "";
  if (!expected || typeof supplied !== "string") return false;
  const a = Buffer.from(supplied);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/* Sanity needs a stable identifier per array item; the copy key is already
   unique, it just cannot keep its dots. */
const entryKey = (key) => key.replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 64);

async function sanity(path, init) {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.SANITY_WRITE_TOKEN}`,
      ...(init?.headers || {}),
    },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    /* Sanity answers an unusable token with "Session not found", which reads
       like a browser problem rather than a setting to fix. */
    if (res.status === 401 || res.status === 403) {
      throw new Error(
        "Sanity a refuzat tokenul. Verifica SANITY_WRITE_TOKEN in Vercel: trebuie sa fie unul cu drept de Editor.",
      );
    }
    throw new Error(json?.error?.description || json?.message || `Sanity a raspuns ${res.status}`);
  }
  return json;
}

/** Reads the live document, bypassing the CDN so a save is never built on stale data. */
async function readEntries() {
  const query = encodeURIComponent(`*[_id == "${DOC_ID}"][0]{entries}`);
  const json = await sanity(`/data/query/${DATASET}?query=${query}`, { method: "GET" });
  return Array.isArray(json.result?.entries) ? json.result.entries : [];
}

async function writeEntries(entries) {
  await sanity(`/data/mutate/${DATASET}`, {
    method: "POST",
    body: JSON.stringify({
      mutations: [
        { createOrReplace: { _id: DOC_ID, _type: "siteCopy", entries } },
      ],
    }),
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, reason: "Method not allowed" });
  }

  if (!process.env.SANITY_WRITE_TOKEN || !process.env.EDIT_PASSWORD) {
    return res.status(503).json({
      ok: false,
      reason: "Editorul nu este configurat: lipsesc SANITY_WRITE_TOKEN sau EDIT_PASSWORD in Vercel.",
    });
  }

  if (!passwordMatches(req.headers["x-edit-key"])) {
    return res.status(401).json({ ok: false, reason: "Parola nu este corecta." });
  }

  const body = typeof req.body === "string" ? safeParse(req.body) : req.body || {};
  const { action, key, value } = body;

  if (action === "verify") return res.status(200).json({ ok: true });

  if (typeof key !== "string" || !key.length || key.length > 200) {
    return res.status(400).json({ ok: false, reason: "Cheia textului lipseste." });
  }

  try {
    const entries = await readEntries();
    const rest = entries.filter((e) => e?.key !== key);

    if (action === "clear") {
      await writeEntries(rest);
      return res.status(200).json({ ok: true, cleared: true });
    }

    if (action !== "set" || typeof value !== "string") {
      return res.status(400).json({ ok: false, reason: "Actiune necunoscuta." });
    }
    if (value.length > MAX_VALUE) {
      return res.status(400).json({ ok: false, reason: "Textul este prea lung." });
    }

    // An empty box means "back to the original", same as clearing it.
    const next = value.trim().length
      ? [...rest, { _key: entryKey(key), _type: "copyEntry", key, value }]
      : rest;

    await writeEntries(next);
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(502).json({ ok: false, reason: err.message || "Salvarea a esuat." });
  }
}

function safeParse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}
