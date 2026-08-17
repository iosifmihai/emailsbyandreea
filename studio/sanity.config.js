import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

// Paste the project id from sanity.io/manage here (or set SANITY_STUDIO_PROJECT_ID).
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "vomrxysv";

export default defineConfig({
  name: "emails-by-andreea",
  title: "Emails by Andreea",
  projectId,
  dataset: "production",

  plugins: [
    structureTool({
      // "Website text" is a single document, so it opens straight into the
      // editor instead of showing a list with one item in it.
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Website text")
              .id("siteContent")
              .child(S.document().schemaType("siteContent").documentId("siteContent")),
            S.divider(),
            S.documentTypeListItem("blogPost").title("Blog posts"),
            S.documentTypeListItem("review").title("Reviews"),
            S.documentTypeListItem("brand").title("Brands"),
            S.documentTypeListItem("platform").title("Platforms"),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
});
