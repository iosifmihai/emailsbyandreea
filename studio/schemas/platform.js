/** A platform or tool shown in the “Certified Platforms” rail. */
export const platform = {
  name: "platform",
  title: "Platform",
  type: "document",
  fields: [
    { name: "name", title: "Platform name", type: "string", validation: (r) => r.required() },
    { name: "logo", title: "Logo", type: "image", validation: (r) => r.required() },
    { name: "order", title: "Sort order", type: "number" },
  ],
  orderings: [{ title: "Manual order", name: "manual", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", media: "logo" } },
};
