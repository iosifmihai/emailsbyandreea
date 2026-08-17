import { useId, useState } from "react";
import { mailto, site } from "../../data/site";
import { submitForm } from "../../lib/submitForm";
import { Arrow } from "./Arrow";
import "./NewsletterForm.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Newsletter sign-up.
 *
 * Posts to the serverless function, which emails the signup on. Where that
 * function isn't available — local dev, or a host without it — it falls back
 * to a prefilled mail draft and says so. Nothing ever reports success that did
 * not happen.
 */
export default function NewsletterForm({ tone = "light", compact = false }) {
  const uid = useId();
  const [values, setValues] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});
  // idle | sending | sent | drafted | error
  const [state, setState] = useState("idle");
  const [sendError, setSendError] = useState("");
  const [botField, setBotField] = useState("");

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

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) {
      // move focus to the first thing that needs fixing
      document.getElementById(`${uid}-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    setState("sending");
    setSendError("");

    const draft = mailto({
      subject: "Newsletter subscription",
      body: `Please add me to the Emails by Andreea newsletter.\n\nName: ${values.name.trim()}\nEmail: ${values.email.trim()}\n`,
    });

    const result = await submitForm(
      {
        kind: "newsletter",
        name: values.name.trim(),
        email: values.email.trim(),
        botField,
      },
      draft,
    );

    if (!result.ok) {
      setSendError(result.error);
      setState("error");
      return;
    }
    if (result.via === "email") {
      setValues({ name: "", email: "" });
      setState("sent");
    } else {
      setState("drafted");
    }
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
          <span>{state === "sending" ? "Sending…" : "Subscribe"}</span>
          <Arrow className="btn__arrow" />
        </button>
      </div>

      <div className="nl__bot" aria-hidden="true">
        <label htmlFor={`${uid}-hp`}>Leave this field empty</label>
        <input
          id={`${uid}-hp`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={botField}
          onChange={(e) => setBotField(e.target.value)}
        />
      </div>

      <p
        className={`nl__status${state === "error" ? " nl__status--error" : ""}`}
        role="status"
      >
        {state === "sent" && "You are on the list — thank you."}
        {state === "drafted" &&
          "Your mail app should have opened with the message ready — press send."}
        {state === "error" && sendError}
      </p>

      <p className="nl__note">
        Your details go straight to Andreea at {site.email} and are never shared.
      </p>
    </form>
  );
}
