/** A client review. Shown on the homepage carousel and the Reviews archive. */
export const review = {
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    { name: "quote", title: "What they said", type: "text", rows: 4,
      validation: (r) => r.required() },
    { name: "name", title: "Client name", type: "string",
      description: "As you want it published — initials are fine, e.g. “Scott A.”",
      validation: (r) => r.required() },
    { name: "industry", title: "Industry", type: "string",
      description: "e.g. “U.S. Fragrance Retailer”" },
    { name: "focus", title: "Service", type: "string",
      description: "Optional — which service the review is about." },
    { name: "rating", title: "Stars", type: "number",
      options: { list: [1, 2, 3, 4, 5], layout: "radio", direction: "horizontal" },
      initialValue: 5, validation: (r) => r.required().min(1).max(5) },
    { name: "date", title: "Date received", type: "date" },
    { name: "showOnHome", title: "Feature on the homepage", type: "boolean",
      initialValue: false },
    { name: "order", title: "Sort order", type: "number",
      description: "Lower numbers appear first." },
  ],
  orderings: [{ title: "Manual order", name: "manual", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "industry" },
  },
};
