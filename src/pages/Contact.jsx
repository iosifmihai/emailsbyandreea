import { useId, useState } from "react";
import PageHero from "../components/layout/PageHero";
import { Reveal } from "../components/ui/Reveal";
import { Arrow } from "../components/ui/Arrow";
import { contactPage } from "../data/content";
import { mailto, site, social } from "../data/site";
import { Seo, professionalService } from "../lib/seo";
import { submitForm } from "../lib/submitForm";
import "./Contact.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const EMPTY = {
  name: "",
  company: "",
  website: "",
  email: "",
  phone: "",
  message: "",
  consent: false,
};

export default function Contact() {
  const uid = useId();
  const [values, setValues] = useState(EMPTY);
  const [interests, setInterests] = useState([]);
  const [errors, setErrors] = useState({});
  // idle | sending | sent | drafted | error
  const [state, setState] = useState("idle");
  const [sendError, setSendError] = useState("");
  const [botField, setBotField] = useState("");

  const set = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const toggleInterest = (label) =>
    setInterests((list) =>
      list.includes(label) ? list.filter((l) => l !== label) : [...list, label],
    );

  const validate = () => {
    const e = {};
    if (!values.name.trim()) e.name = "Please tell me your name.";
    if (!values.email.trim()) e.email = "Please add an email address so I can reply.";
    else if (!EMAIL_RE.test(values.email.trim()))
      e.email = "That doesn't look like a valid email address.";
    if (!values.message.trim()) e.message = "Please add a short message.";
    if (!values.consent) e.consent = "Please confirm you're happy for me to reply.";
    return e;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }

    setState("sending");
    setSendError("");

    const lines = [
      `Name: ${values.name.trim()}`,
      values.company.trim() && `Company: ${values.company.trim()}`,
      values.website.trim() && `Website: ${values.website.trim()}`,
      `Email: ${values.email.trim()}`,
      values.phone.trim() && `Phone / WhatsApp: ${values.phone.trim()}`,
      interests.length && `Services of interest: ${interests.join(", ")}`,
      "",
      values.message.trim(),
    ].filter(Boolean);

    const draft = mailto({
      subject: `Enquiry from ${values.name.trim()}${
        values.company.trim() ? `, ${values.company.trim()}` : ""
      }`,
      body: lines.join("\n"),
    });

    const result = await submitForm(
      {
        kind: "enquiry",
        name: values.name.trim(),
        email: values.email.trim(),
        company: values.company.trim(),
        website: values.website.trim(),
        phone: values.phone.trim(),
        interests,
        message: values.message.trim(),
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
      setValues(EMPTY);
      setInterests([]);
      setState("sent");
    } else {
      setState("drafted");
    }
  };

  const field = (key, label, props = {}) => (
    <div className="cf__field">
      <label htmlFor={`${uid}-${key}`} className="cf__label">
        {label}
        {props.required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={`${uid}-${key}`}
        name={key}
        className="cf__input"
        value={values[key]}
        onChange={set(key)}
        aria-invalid={errors[key] ? "true" : undefined}
        aria-describedby={errors[key] ? `${uid}-${key}-err` : undefined}
        {...props}
      />
      {errors[key] && (
        <p className="cf__err" id={`${uid}-${key}-err`}>
          {errors[key]}
        </p>
      )}
    </div>
  );

  return (
    <>
      <Seo
        title={contactPage.metaTitle}
        description={contactPage.metaDescription}
        path="/contact"
        jsonLd={professionalService}
      />

      <PageHero
        eyebrow={contactPage.eyebrow}
        title={contactPage.heading}
        lead={contactPage.intro}
        crumbs={[{ label: "Contact Me" }]}
      />

      <section className="section ctc">
        <div className="shell ctc__grid">
          {/* ---- aside ---- */}
          <aside className="ctc__aside">
            <Reveal>
              <p className="label">Direct</p>
              <a className="ctc__mail" href={`mailto:${site.email}`}>
                {site.email}
                <Arrow size={13} />
              </a>
            </Reveal>

            <Reveal delay={90} className="ctc__block">
              <p className="label">Elsewhere</p>
              <ul className="ctc__social">
                {social.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer noopener">
                      {s.label}
                      <Arrow size={12} />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={160} className="ctc__block ctc__how">
              <p className="label">How this works</p>
              <p>
                Your message goes straight to {site.email}. Andreea replies to the
                address you give, usually with a question or two about where your
                email channel is now.
              </p>
            </Reveal>
          </aside>

          {/* ---- form ---- */}
          <div className="ctc__formwrap">
            <form className="cf" onSubmit={onSubmit} noValidate>
              <fieldset className="cf__set">
                <legend className="cf__legend">About you
                </legend>
                <div className="cf__row">
                  {field("name", "Contact name", {
                    required: true,
                    autoComplete: "name",
                    type: "text",
                  })}
                  {field("email", "Your company's email", {
                    required: true,
                    autoComplete: "email",
                    type: "email",
                    inputMode: "email",
                  })}
                </div>
                <div className="cf__row">
                  {field("company", "Company", {
                    autoComplete: "organization",
                    type: "text",
                  })}
                  {field("website", "Your company's website", {
                    autoComplete: "url",
                    type: "url",
                    placeholder: "https://",
                  })}
                </div>
                <div className="cf__row cf__row--single">
                  {field("phone", "Contact phone / WhatsApp", {
                    autoComplete: "tel",
                    type: "tel",
                    inputMode: "tel",
                  })}
                </div>
              </fieldset>

              <fieldset className="cf__set">
                <legend className="cf__legend">What you're interested in
                </legend>
                <ul className="cf__interests">
                  {contactPage.interests.map((label) => {
                    const id = `${uid}-int-${label.replace(/\W+/g, "-")}`;
                    const checked = interests.includes(label);
                    return (
                      <li key={label}>
                        <input
                          type="checkbox"
                          id={id}
                          className="cf__chk visually-hidden"
                          checked={checked}
                          onChange={() => toggleInterest(label)}
                        />
                        <label htmlFor={id} className="cf__chip">
                          <span className="cf__chipbox" aria-hidden="true" />
                          {label}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </fieldset>

              <fieldset className="cf__set">
                <legend className="cf__legend">Your message
                </legend>
                <div className="cf__field">
                  <label htmlFor={`${uid}-message`} className="cf__label">
                    Where is your email channel now, and what's getting in the way?
                    <span aria-hidden="true"> *</span>
                  </label>
                  <textarea
                    id={`${uid}-message`}
                    name="message"
                    rows="6"
                    className="cf__input cf__textarea"
                    value={values.message}
                    onChange={set("message")}
                    aria-invalid={errors.message ? "true" : undefined}
                    aria-describedby={errors.message ? `${uid}-message-err` : undefined}
                  />
                  {errors.message && (
                    <p className="cf__err" id={`${uid}-message-err`}>
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Honeypot: hidden from people, catnip for bots. */}
                <div className="cf__bot" aria-hidden="true">
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

                <div className="cf__consent">
                  <input
                    type="checkbox"
                    id={`${uid}-consent`}
                    className="cf__chk visually-hidden"
                    checked={values.consent}
                    onChange={set("consent")}
                    aria-invalid={errors.consent ? "true" : undefined}
                    aria-describedby={errors.consent ? `${uid}-consent-err` : undefined}
                  />
                  <label htmlFor={`${uid}-consent`} className="cf__chip cf__chip--consent">
                    <span className="cf__chipbox" aria-hidden="true" />
                    <span>
                      I'm happy for Andreea to use these details to reply to my
                      enquiry, as described in the{" "}
                      <a href="/privacy-policy">Privacy Policy</a>.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="cf__err" id={`${uid}-consent-err`}>
                      {errors.consent}
                    </p>
                  )}
                </div>
              </fieldset>

              <div className="cf__foot">
                <button type="submit" className="btn btn--solid" disabled={state === "sending"}>
                  <span>{state === "sending" ? "Sending…" : "Send enquiry"}</span>
                  <Arrow className="btn__arrow" />
                </button>
                <p
                  className={`cf__status${state === "error" ? " cf__status--error" : ""}`}
                  role="status"
                >
                  {state === "sent" &&
                    "Sent, thank you. Your enquiry is in Andreea's inbox and she'll reply to the address you gave."}
                  {state === "drafted" &&
                    "Your mail app should have opened with everything filled in, press send and it's on its way."}
                  {state === "error" && sendError}
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
