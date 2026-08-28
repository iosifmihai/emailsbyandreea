/**
 * The bridge between saved text and the running site.
 *
 * Components never learn that any of this exists. They keep importing `hero`,
 * `services` and the rest exactly as before; this module writes the saved
 * wording into those same objects before React first renders, so the page comes
 * up with the edited words already in place. Nothing re-reads at runtime, which
 * is why there is no flash of the old copy.
 *
 * In edit mode each string also carries a marker: sixteen zero-width characters
 * naming its position in the registry. They are invisible, they survive being
 * rendered into the DOM, and they let the editor say precisely which of two
 * identical labels the visitor just clicked. Visitors never receive them.
 */
import { BY_KEY, INDEX_OF, REGISTRY } from "./copyRegistry";
import { DATASET, PROJECT_ID, isSanityConfigured } from "./sanity";

const CACHE_KEY = "eba.copy.v1";
const API_VERSION = "2024-01-01";
const DOC_ID = "siteCopy";

/* ------------------------------------------------------------ markers --- */

const START = "\u2062"; // invisible times
const END = "\u2063"; // invisible separator
const BIT0 = "\u200b"; // zero-width space  = 0
const BIT1 = "\u200c"; // zero-width non-joiner = 1
const MARKER = new RegExp(`${START}[${BIT0}${BIT1}]{16}${END}`, "g");

function encodeMarker(index) {
  let bits = "";
  for (let b = 15; b >= 0; b -= 1) bits += (index >> b) & 1 ? BIT1 : BIT0;
  return START + bits + END;
}

/** Reads back the registry position hidden in a piece of rendered text. */
export function decodeMarker(text) {
  if (typeof text !== "string") return -1;
  const found = text.match(new RegExp(`${START}([${BIT0}${BIT1}]{16})${END}`));
  if (!found) return -1;
  let n = 0;
  for (const ch of found[1]) n = (n << 1) | (ch === BIT1 ? 1 : 0);
  return n;
}

/** The text without its marker, which is what a person should ever see. */
export function stripMarkers(text) {
  return typeof text === "string" ? text.replace(MARKER, "") : text;
}

/* Addresses must stay literal: a marker inside a mailto: or an https:// would
   make the link unusable while edit mode is open. */
const isAddress = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || /^https?:\/\//.test(v);

/* ------------------------------------------------------------- state ---- */

/** key -> saved text. Empty means the site is showing what ships in the code. */
let overrides = new Map();
let marked = false;
const listeners = new Set();

export const getOverrides = () => overrides;
export const isMarked = () => marked;

/** Called after any save, so the app can re-render with the new wording. */
export function onCopyChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/**
 * Writes the current text into the data objects the components read from.
 * Runs over the whole registry every time: cheap, and it means clearing an
 * override restores the built-in wording without any bookkeeping.
 */
export function applyCopy() {
  REGISTRY.forEach((record, index) => {
    const saved = overrides.get(record.key);
    const value = typeof saved === "string" && saved.length ? saved : record.original;
    record.owner[record.prop] = marked && !isAddress(value) ? value + encodeMarker(index) : value;
  });
}

function notify() {
  listeners.forEach((fn) => fn());
}

/* -------------------------------------------------------------- read ---- */

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return new Map(Object.entries(JSON.parse(raw)));
  } catch {
    return null;
  }
}

function writeCache(map) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(Object.fromEntries(map)));
  } catch {
    /* private mode, or the quota is full — the site works without the cache */
  }
}

function toMap(entries) {
  const map = new Map();
  (entries ?? []).forEach((e) => {
    if (e?.key && typeof e.value === "string" && e.value.length) map.set(e.key, e.value);
  });
  return map;
}

async function fetchOverrides(signal, fresh) {
  const query = `*[_id == "${DOC_ID}"][0]{entries[]{key, value}}`;
  /* Visitors read the cached edge endpoint. The editor reads the origin: the
     CDN can lag a write by a few seconds, and seeing your own change bounce
     back to the old wording on reload would look like the save had failed. */
  const host = fresh ? "api" : "apicdn";
  const url =
    `https://${PROJECT_ID}.${host}.sanity.io/v${API_VERSION}/data/query/${DATASET}` +
    `?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Sanity responded ${res.status}`);
  const json = await res.json();
  return toMap(json.result?.entries);
}

/**
 * Loads saved text before the app mounts.
 *
 * The cache is applied straight away so a returning visitor renders the edited
 * words on the first frame. The network then gets a short window to supply
 * anything newer; if it misses that window the page renders anyway and the
 * fresh copy lands in the cache for next time.
 */
export async function loadCopy({ editing = false, timeout = 1200 } = {}) {
  marked = editing;

  const cached = readCache();
  if (cached) overrides = cached;

  if (!isSanityConfigured) {
    applyCopy();
    return;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const latest = await fetchOverrides(controller.signal, editing);
    overrides = latest;
    writeCache(latest);
  } catch {
    /* offline, slow, or no document yet — the cache or the built-in copy stands */
  } finally {
    clearTimeout(timer);
  }

  applyCopy();
}

/* ------------------------------------------------------------- write ---- */

/** Sends one change to the server, which is what holds the write token. */
async function mutate(body, key) {
  const res = await fetch("/api/copy", {
    method: "POST",
    headers: { "content-type": "application/json", "x-edit-key": key },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.ok === false) {
    throw new Error(json.reason || `The server answered ${res.status}`);
  }
  return json;
}

/** Checks a password without changing anything. */
export async function verifyKey(key) {
  await mutate({ action: "verify" }, key);
  return true;
}

export async function saveText(recordKey, value, key) {
  await mutate({ action: "set", key: recordKey, value }, key);
  overrides.set(recordKey, value);
  writeCache(overrides);
  applyCopy();
  notify();
}

export async function resetText(recordKey, key) {
  await mutate({ action: "clear", key: recordKey }, key);
  overrides.delete(recordKey);
  writeCache(overrides);
  applyCopy();
  notify();
}

/* ------------------------------------------------------------ lookups --- */

/** The record a marker points at. */
export const recordAt = (index) => REGISTRY[index] ?? null;

/** The wording that ships in the code, whatever is currently saved over it. */
export const originalOf = (recordKey) => BY_KEY.get(recordKey)?.original ?? "";

export const indexOfKey = (recordKey) => INDEX_OF.get(recordKey) ?? -1;
