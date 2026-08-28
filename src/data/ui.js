/**
 * The short words the layout itself says: section labels, button text, table
 * headings, the small print between the paragraphs.
 *
 * Longer prose lives in content.js, services.js and legal.js. What is here is
 * everything that used to be typed straight into a component, gathered so the
 * on-site editor can reach it like any other copy.
 */
export const ui = {
  /* --------------------------------------------------- shared chrome ---- */
  global: {
    skipLink: "Skip to content",
    workWithMe: "Work With Me",
    allServices: "All services",
    emailServices: "Email services",
    home: "Home",
    contactMe: "Contact me",
    sendEmail: "Send me an email",
    questions: "Questions",
  },

  /* ---------------------------------------------------------- home ------ */
  home: {
    scroll: "Scroll",
    metricsLabel: "Work to date",
    brandsLabel: "Brands Managed",
    platformsLabel: "Certified Platforms",
    platformsNote: "Certified and fluent across the stack your brand already runs on.",
    outcomesLabel: "What it produces",
    testimonialsLabel: "What my clients say",
    testimonialsLink: "Read all the testimonials",
    finalLabel: "Next step",
    meetName: "Andreea Păcurar",
    meetRole: "E-mail & SMS Lifecycle Specialist",
  },

  /* --------------------------------------------------------- footer ----- */
  footer: {
    newsletterLabel: "Subscribe to my newsletter",
    colServices: "Email Services",
    colDiscover: "Discover",
    colPolicies: "Policies",
    colElsewhere: "Elsewhere",
  },

  /* ------------------------------------------------------- services ----- */
  services: {
    whoLabel: "Who this is for",
    structureLabel: "Structure",
    coreLabel: "Core services",
    allLabel: "All nine services",
    caseLabel: "The case",
    detailLabel: "In detail",
    scopeLabel: "Scope",
    deliverablesLabel: "Deliverables",
    nextLabel: "Where this leads next",
  },

  /* ---------------------------------------------------------- about ----- */
  about: {
    howLabel: "How I work",
    credentialsLabel: "Credentials",
    credentialsHeading: "Verified expertise",
  },

  /* ---------------------------------------------------------- legal ----- */
  legal: {
    contents: "Contents",
    colName: "Name",
    colPurpose: "Purpose",
    colProvider: "Provider",
    colType: "Type",
    colExpires: "Expires",
    questionsNote: "Questions about this policy? Email",
  },

  /* --------------------------------------------------------- journal ---- */
  blog: {
    allArticles: "All articles",
    loading: "Loading articles…",
    failed: "The articles couldn't be loaded just now. Please try again shortly.",
    empty: "No articles published yet, the first one is coming.",
    postFailed: "This article couldn't be loaded just now.",
  },

  /* ------------------------------------------------------- not found ---- */
  notFound: {
    label: "Undeliverable",
    heading: "This one bounced.",
    copy: "The page you were after doesn't exist. Here's the rest of the site.",
    back: "Back to home",
  },
};
