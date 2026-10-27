/**
 * Meta Pixel, loaded only after the visitor accepts marketing cookies.
 * Every call is a no-op on the server (prerender) and before consent.
 */
export const PIXEL_ID = "1526467508579732";
const CONSENT_KEY = "eba-cookie-consent"; // "granted" | "denied"

export function getConsent() {
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

export function setConsent(value) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* private mode: the choice lasts for this page view only */
  }
  if (value === "granted") loadPixel();
}

let loaded = false;

/** Meta's standard base snippet, without the automatic PageView. */
export function loadPixel() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */
  window.fbq("init", PIXEL_ID);
}

export function track(event, params) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", event, params);
}
