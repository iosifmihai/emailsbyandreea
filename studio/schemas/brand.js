/** A managed client brand, shown in the “Brands Managed” grid. */
export const brand = {
  name: "brand",
  title: "Brand",
  type: "document",
  fields: [
    { name: "name", title: "Brand name", type: "string", validation: (r) => r.required() },
    { name: "logo", title: "Logo", type: "image",
      description: "Transparent PNG or SVG works best.",
      options: { hotspot: false }, validation: (r) => r.required() },
    { name: "url", title: "Website", type: "url", description: "Optional." },
    { name: "order", title: "Sort order", type: "number",
      description: "Lower numbers appear first." },
  ],
  orderings: [{ title: "Manual order", name: "manual", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", media: "logo" } },
};
