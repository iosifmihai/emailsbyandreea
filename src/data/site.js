/**
 * Brand-level constants. Everything here is taken from emailsbyandreea.com —
 * no invented contact details, handles or claims.
 */

export const site = {
  name: "Emails by Andreea",
  person: "Andreea Păcurar",
  role: "E-mail & SMS Lifecycle Specialist",
  origin: "https://emailsbyandreea.com",
  email: "contact@emailsbyandreea.com",
  tagline: "High-Performance Email Marketing for E-commerce Brands",
  positioning:
    "Your email marketing solution to success. Building profitable strategies that drive retention and boost Customer Lifetime Value.",
};

export const social = [
  { label: "Instagram", href: "https://www.instagram.com/emailsby.andreea/" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61569190987440" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/andreea-p%C4%83curar-1a7b8924b/",
  },
];

export const primaryNav = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Journal", to: "/blog" },
  { label: "Reviews", to: "/reviews" },
  { label: "About Me", to: "/about" },
  { label: "Contact Me", to: "/contact" },
];

export const legalNav = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Cookie Policy", to: "/cookie-policy" },
  { label: "Disclaimer", to: "/disclaimer" },
  { label: "Terms and Conditions", to: "/terms-and-conditions" },
];

/**
 * Builds a mailto: link with a prefilled subject and body. Forms compose a
 * message the visitor sends from their own client — nothing is posted to a
 * server, and nothing pretends to have been.
 */
export function mailto({ subject, body }) {
  const q = new URLSearchParams();
  if (subject) q.set("subject", subject);
  if (body) q.set("body", body);
  const qs = q.toString().replace(/\+/g, "%20");
  return `mailto:${site.email}${qs ? `?${qs}` : ""}`;
}
