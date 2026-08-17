/**
 * The editable copy of the marketing site. A single document — there is only
 * ever one of these — so the studio shows it as one page rather than a list.
 *
 * Anything left blank falls back to the text already built into the site, so
 * you can change one line without having to fill in the rest.
 */
export const siteContent = {
  name: "siteContent",
  title: "Website text",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "metrics", title: "Numbers" },
    { name: "about", title: "Meet me" },
    { name: "sections", title: "Section intros" },
    { name: "cta", title: "Closing & newsletter" },
    { name: "contact", title: "Contact details" },
  ],

  fields: [
    /* ---- hero ---- */
    { name: "heroEyebrow", title: "Small label above the headline", type: "string", group: "hero" },
    { name: "heroHeadline", title: "Headline", type: "text", rows: 2, group: "hero" },
    { name: "heroSub", title: "Supporting sentence", type: "text", rows: 3, group: "hero" },
    { name: "heroCta", title: "Button text", type: "string", group: "hero" },
    {
      name: "heroPortrait",
      title: "Hero photo",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    },

    /* ---- metrics ---- */
    {
      name: "metrics",
      title: "The three numbers",
      type: "array",
      group: "metrics",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Number", type: "number", validation: (r) => r.required() },
            { name: "suffix", title: "After the number", type: "string", description: "e.g. “+” or “+ mil”" },
            { name: "label", title: "Label", type: "string", validation: (r) => r.required() },
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
      validation: (r) => r.max(4),
    },

    /* ---- meet me ---- */
    { name: "meetLabel", title: "Section label", type: "string", group: "about" },
    { name: "meetHeading", title: "Heading", type: "text", rows: 2, group: "about" },
    {
      name: "meetBio",
      title: "Bio paragraphs",
      type: "array",
      group: "about",
      of: [{ type: "text", rows: 4 }],
    },
    {
      name: "meetPortrait",
      title: "Photo",
      type: "image",
      group: "about",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    },

    /* ---- section intros ---- */
    { name: "servicesHeading", title: "Services heading", type: "text", rows: 2, group: "sections" },
    { name: "servicesCopy", title: "Services intro", type: "text", rows: 3, group: "sections" },
    { name: "platformsNote", title: "Certified platforms note", type: "string", group: "sections" },
    { name: "testimonialsHeading", title: "Testimonials heading", type: "text", rows: 2, group: "sections" },

    /* ---- closing + newsletter ---- */
    { name: "newsletterHeading", title: "Newsletter heading", type: "string", group: "cta" },
    { name: "newsletterCopy", title: "Newsletter description", type: "text", rows: 3, group: "cta" },
    { name: "finalHeading", title: "Closing headline", type: "string", group: "cta" },
    { name: "finalCopy", title: "Closing paragraph", type: "text", rows: 3, group: "cta" },

    /* ---- contact ---- */
    { name: "email", title: "Contact email", type: "string", group: "contact" },
    {
      name: "social",
      title: "Social links",
      type: "array",
      group: "contact",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Name", type: "string" },
            { name: "href", title: "Link", type: "url" },
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    },
  ],

  preview: { prepare: () => ({ title: "Website text" }) },
};
