import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { primaryNav } from "../../data/site";
import { services } from "../../data/services";
import { Arrow } from "../ui/Arrow";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import "./Header.css";
import { ui } from "../../data/ui";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { pathname } = useLocation();
  const servicesRef = useRef(null);
  const toggleRef = useRef(null);

  useLockBodyScroll(menuOpen);

  // Header gains a ground and a hairline once the hero starts leaving.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Any navigation closes everything.
  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  // Escape closes the topmost layer; focus returns to the control that opened it.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      } else if (servicesOpen) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, servicesOpen]);

  // Clicking or tabbing out of the services panel dismisses it.
  useEffect(() => {
    if (!servicesOpen) return undefined;
    const onDown = (e) => {
      if (!servicesRef.current?.contains(e.target)) setServicesOpen(false);
    };
    const onFocus = (e) => {
      if (!servicesRef.current?.contains(e.target)) setServicesOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("focusin", onFocus);
    };
  }, [servicesOpen]);

  const isServices = pathname.startsWith("/services");

  return (
    <header className={`hdr${scrolled ? " is-scrolled" : ""}${menuOpen ? " is-open" : ""}`}>
      <div className="hdr__inner">
        <Link to="/" className="hdr__brand" aria-label={`Emails by Andreea, home`}>
          <img
            src="/assets/brand/logo-dark.png"
            alt="Emails by Andreea"
            width="180"
            height="52"
            className="hdr__logo"
          />
        </Link>

        <nav className="hdr__nav" aria-label="Primary">
          <ul className="hdr__list">
            {primaryNav.map((item) =>
              item.to === "/services" ? (
                <li
                  key={item.to}
                  className="hdr__item hdr__item--has-panel"
                  ref={servicesRef}
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    type="button"
                    className={`hdr__link hdr__link--btn${isServices ? " is-active" : ""}`}
                    aria-expanded={servicesOpen}
                    aria-controls="services-panel"
                    onClick={() => setServicesOpen((v) => !v)}
                  >
                    {item.label}
                    <svg
                      className="hdr__chev"
                      width="9"
                      height="9"
                      viewBox="0 0 10 10"
                      aria-hidden="true"
                    >
                      <path
                        d="M1.5 3.5 5 7l3.5-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      />
                    </svg>
                  </button>

                  <div
                    id="services-panel"
                    className={`svc-panel${servicesOpen ? " is-open" : ""}`}
                    hidden={!servicesOpen}
                  >
                    <div className="svc-panel__head">
                      <span className="label label--tight">{ui.global.emailServices}</span>
                      <Link to="/services" className="svc-panel__all">
                        {ui.global.allServices} <Arrow size={11} />
                      </Link>
                    </div>
                    <ul className="svc-panel__grid">
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link to={`/services/${s.slug}`} className="svc-panel__link">
                            <span className="svc-panel__name">{s.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.to} className="hdr__item">
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `hdr__link${isActive ? " is-active" : ""}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <Link to="/contact" className="hdr__cta">
          <span>{ui.global.workWithMe}</span>
          <Arrow size={12} />
        </Link>

        <button
          type="button"
          ref={toggleRef}
          className="hdr__burger"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="visually-hidden">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span className="hdr__burger-box" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>

      {/* ---- mobile panel ---- */}
      <div id="mobile-menu" className="mmenu" hidden={!menuOpen}>
        <nav className="mmenu__inner" aria-label="Mobile">
          <ul className="mmenu__list">
            {primaryNav.map((item, i) => (
              <li key={item.to} style={{ "--i": i }}>
                {item.to === "/services" ? (
                  <>
                    <div className="mmenu__row">
                      <NavLink to="/services" className="mmenu__link">
                        Services
                      </NavLink>
                      <button
                        type="button"
                        className={`mmenu__expand${mobileServicesOpen ? " is-open" : ""}`}
                        aria-expanded={mobileServicesOpen}
                        aria-controls="mobile-services"
                        onClick={() => setMobileServicesOpen((v) => !v)}
                      >
                        <span className="visually-hidden">
                          {mobileServicesOpen ? "Hide services" : "Show all services"}
                        </span>
                        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                          <path
                            d="M7 1.5v11M1.5 7h11"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                          />
                        </svg>
                      </button>
                    </div>
                    <ul id="mobile-services" className="mmenu__sub" hidden={!mobileServicesOpen}>
                      {services.map((s) => (
                        <li key={s.slug}>
                          <NavLink to={`/services/${s.slug}`} className="mmenu__sublink">
                            {s.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className="mmenu__link"
                  >
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          <div className="mmenu__foot">
            <Link to="/contact" className="btn btn--solid mmenu__cta">
              <span>{ui.global.workWithMe}</span>
              <Arrow className="btn__arrow" />
            </Link>
            <a href="mailto:contact@emailsbyandreea.com" className="mmenu__mail">
              contact@emailsbyandreea.com
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
