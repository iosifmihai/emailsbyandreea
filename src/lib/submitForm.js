/**
 * Sends a form to the serverless function, and falls back to a prefilled mail
 * draft when that isn't available.
 *
 * The fallback matters: the site is deployed as static files, so during local
 * development — and on any host without the function — there is no /api route.
 * Rather than showing an error for something the visitor cannot fix, the form
 * reverts to the behaviour it had before, and says which of the two happened.
 *
 * Resolves to { ok, via } where `via` is "email" (delivered) or "mailto"
 * (handed to the visitor's mail client), or { ok: false, error }.
 */
export async function submitForm(payload, mailtoHref) {
  const toDraft = () => {
    if (mailtoHref) window.location.href = mailtoHref;
    return { ok: true, via: "mailto" };
  };

  let res;
  try {
    res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // offline, or no function deployed at this origin
    return toDraft();
  }

  if (res.ok) return { ok: true, via: "email" };

  const data = await res.json().catch(() => ({}));

  // 503 not-configured means the mail key is missing — the visitor shouldn't
  // see that as a failure, so hand them the draft instead.
  if (res.status === 503 || data.reason === "not-configured") return toDraft();

  // A static host answers /api/contact with the SPA's index.html, which is not
  // JSON — treat that as "no function here" rather than a real error.
  if (res.status === 404 || res.status === 405) return toDraft();

  return { ok: false, error: data.error || "The message couldn't be sent just now." };
}
