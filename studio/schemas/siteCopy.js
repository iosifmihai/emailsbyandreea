/**
 * Every piece of text changed through the on-site editor.
 *
 * The site writes here through /api/copy rather than through the studio, so
 * this schema exists mainly so the changes are visible, searchable and
 * reversible from one place. Deleting an entry restores the wording that ships
 * in the code; there is no way to end up with a blank site by clearing it out.
 */
export const siteCopy = {
  name: "siteCopy",
  title: "Edited text",
  type: "document",
  fields: [
    {
      name: "entries",
      title: "Changed text",
      type: "array",
      description:
        "Each row is one piece of text you changed on the site. Delete a row to bring back the original wording.",
      of: [
        {
          type: "object",
          name: "copyEntry",
          fields: [
            {
              name: "key",
              title: "Where it appears",
              type: "string",
              readOnly: true,
            },
            { name: "value", title: "Your text", type: "text", rows: 4 },
          ],
          preview: {
            select: { title: "value", subtitle: "key" },
          },
        },
      ],
    },
  ],
  preview: {
    prepare: () => ({ title: "Edited text" }),
  },
};
