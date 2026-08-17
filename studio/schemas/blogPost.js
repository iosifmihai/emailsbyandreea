/**
 * A blog article. Everything the article needs to render and to rank lives
 * here, so nothing has to be edited in code.
 */
export const blogPost = {
  name: "blogPost",
  title: "Blog post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO & sharing" },
  ],
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (r) => r.required().max(120),
    },
    {
      name: "slug",
      title: "URL",
      type: "slug",
      group: "content",
      description: "The address of the article. Click Generate to fill it from the title.",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    },
    {
      name: "excerpt",
      title: "Short summary",
      type: "text",
      rows: 3,
      group: "content",
      description: "One or two sentences. Shown on the blog index and used as a fallback description.",
      validation: (r) => r.max(240),
    },
    {
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      group: "content",
      options: { hotspot: true },
      description: "Shown on the blog index and at the top of the article.",
      fields: [
        {
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describe the image for screen readers and search engines.",
          validation: (r) => r.required(),
        },
      ],
      validation: (r) => r.required(),
    },
    {
      name: "publishedAt",
      title: "Publish date",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    },
    {
      name: "body",
      title: "Article",
      type: "array",
      group: "content",
      of: [
        {
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Sub-heading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bulleted", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", title: "Alt text", type: "string", validation: (r) => r.required() },
            { name: "caption", title: "Caption", type: "string" },
          ],
        },
      ],
      validation: (r) => r.required(),
    },
    {
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      group: "seo",
      description:
        "The headline shown in Google. Around 60 characters. Leave empty to use the article title.",
      validation: (r) => r.max(70),
    },
    {
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 2,
      group: "seo",
      description: "The grey text under the Google result. Around 155 characters.",
      validation: (r) => r.max(170),
    },
    {
      name: "ogImage",
      title: "Sharing image",
      type: "image",
      group: "seo",
      description: "Shown when the link is posted on social media. Falls back to the thumbnail.",
    },
    {
      name: "noindex",
      title: "Hide from search engines",
      type: "boolean",
      group: "seo",
      initialValue: false,
    },
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "thumbnail" },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: subtitle ? new Date(subtitle).toLocaleDateString("en-GB") : "No date",
      media,
    }),
  },
};
