import { useId, useState } from "react";
import { mailto, site } from "../../data/site";
import { Arrow } from "./Arrow";
import "./NewsletterForm.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Newsletter sign-up.
 *
 * There is no server behind this site, so rather than fake a subscription the
 * form composes a real, prefilled message in the visitor's own mail client and
 * says plainly that that is what happened. Validation runs here; the send
 * happens in their client, where they can see and confirm it.
 */
export default function NewsletterForm({ tone = "light", compact = false }) {
  const uid = useId();
  const [values, setValues] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle"); // idle | sending | opened

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Please add your name.";
    if (!values.email.trim()) next.email = "Please add your email address.";
    else if (!EMAIL_RE.test(values.email.trim()))
      next.email = "That doesn't look like a valid email address.";
    return next;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) {
      // move focus to the first thing that needs fixing
      document.getElementById(`${uid}-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    setState("sending");
    const href = mailto({
      subject: "Newsletter subscription",
      body: `Please add me to the Emails by Andreea newsletter.\n\nName: ${values.name.trim()}\nEmail: ${values.email.trim()}\n`,
    });
    window.location.href = href;
    // The browser hands off to the mail client; there is nothing to await.
    window.setTimeout(() => setState("opened"), 600);
  };

  return (
    <form
      className={`nl nl--${tone}${compact ? " nl--compact" : ""}`}
      onSubmit={onSubmit}
      noValidate
    >
      <div className="nl__fields">
        <div className="nl__field">
          <label htmlFor={`${uid}-name`} className="nl__label">
            Name
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            className="nl__input"
            value={values.name}
            onChange={set("name")}
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? `${uid}-name-err` : undefined}
            placeholder="Your name"
          />
          {errors.name && (
            <p className="nl__err" id={`${uid}-name-err`}>
              {errors.name}
            </p>
          )}
        </div>

        <div className="nl__field">
          <label htmlFor={`${uid}-email`} className="nl__label">
            Email
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            className="nl__input"
            value={values.email}
            onChange={set("email")}
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? `${uid}-email-err` : undefined}
            placeholder="you@brand.com"
          />
          {errors.email && (
            <p className="nl__err" id={`${uid}-email-err`}>
              {errors.email}
            </p>
          )}
        </div>

        <button type="submit" className="nl__submit" disabled={state === "sending"}>
          <span>{state === "sending" ? "Opening…" : "Subscribe"}</span>
          <Arrow className="btn__arrow" />
        </button>
      </div>

      <p className="nl__status" role="status">
        {state === "opened"
          ? `Your mail app should have opened with the message ready — press send and you're on the list.`
          : ""}
      </p>

      <p className="nl__note">
        Subscribing opens a prefilled email to {site.email}. Your details go straight to
        Andreea and are never shared.
      </p>
    </form>
  );
}
