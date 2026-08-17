/**
 * Project identity for the `sanity` command line (dataset, import, deploy).
 * The studio itself reads sanity.config.js — this file is only for the CLI.
 *
 * CommonJS: the CLI transpiles this config and loads it through require, so
 * the studio package deliberately does not set "type": "module".
 */
module.exports = {
  api: {
    projectId: "vomrxysv",
    dataset: "production",
  },
  // The address the studio is published to: emailsbyandreea.sanity.studio
  studioHost: "emailsbyandreea",
};
