/**
 * Google tag (GA4), loaded only after the visitor accepts cookies.
 * Every call is a no-op on the server (prerender) and before consent.
 */
export const GA_ID = "G-GGL28F4SB2";

let loaded = false;

/** Google's standard snippet, without the automatic page_view. */
export function loadGoogleTag() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  // The tag only ever loads after "Accept", so consent is granted here.
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { send_page_view: false });

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

export function gaEvent(name, params) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}

let lastPath = null;

/**
 * The SPA never reloads, so each route is reported by hand: from <Seo> once
 * the page has set its title, and from the banner when the tag first loads.
 * The same path twice in a row counts once.
 */
export function gaPageView() {
  if (typeof window === "undefined" || !window.gtag) return;
  if (window.location.pathname === lastPath) return;
  lastPath = window.location.pathname;
  gaEvent("page_view", {
    page_location: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title,
  });
}
