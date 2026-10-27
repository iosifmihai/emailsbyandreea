import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getConsent, loadPixel, setConsent, track } from "../../lib/metaPixel";
import "./CookieConsent.css";

/**
 * Asks once for marketing cookies, starts the Meta Pixel on "Accept" and
 * reports a PageView on every route change (the SPA never reloads).
 */
export default function CookieConsent() {
  const { pathname } = useLocation();
  const [choice, setChoice] = useState(null);
  const [ready, setReady] = useState(false);

  // Read the stored choice only in the browser, after hydration.
  useEffect(() => {
    const stored = getConsent();
    setChoice(stored);
    if (stored === "granted") loadPixel();
    setReady(true);
  }, []);

  useEffect(() => {
    if (choice === "granted") track("PageView");
  }, [pathname, choice]);

  if (!ready || choice) return null;

  const decide = (value) => {
    setConsent(value);
    setChoice(value);
  };

  return (
    <div className="cookie" role="dialog" aria-label="Cookie consent">
      <p className="cookie__text">
        We use marketing cookies (Meta Pixel) to measure our campaigns. See the{" "}
        <Link to="/cookie-policy">Cookie Policy</Link>.
      </p>
      <div className="cookie__actions">
        <button type="button" className="btn btn--ghost" onClick={() => decide("denied")}>
          Decline
        </button>
        <button type="button" className="btn btn--solid" onClick={() => decide("granted")}>
          Accept
        </button>
      </div>
    </div>
  );
}
