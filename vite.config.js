import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Runs the functions in /api during `npm run dev`.
 *
 * On Vercel they are serverless handlers; locally there is nothing to serve
 * them, so the contact form and the site editor would answer 404 and fall back
 * to their offline behaviour. This mounts each file at its own path and gives
 * it the small slice of the Vercel request and response objects it uses, which
 * is enough to exercise both for real before deploying.
 */
function apiRoutes() {
  return {
    name: "api-routes",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const [pathname] = (req.url || "").split("?");
        if (!pathname.startsWith("/api/")) return next();

        const name = pathname.slice("/api/".length).replace(/[^a-z0-9-]/gi, "");
        let handler;
        try {
          ({ default: handler } = await server.ssrLoadModule(`/api/${name}.js`));
        } catch {
          return next();
        }

        const chunks = [];
        for await (const chunk of req) chunks.push(chunk);
        const raw = Buffer.concat(chunks).toString("utf8");

        req.body = raw ? safeJson(raw) : {};
        res.status = (code) => {
          res.statusCode = code;
          return res;
        };
        res.json = (payload) => {
          res.setHeader("content-type", "application/json");
          res.end(JSON.stringify(payload));
          return res;
        };

        try {
          await handler(req, res);
        } catch (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ ok: false, reason: err.message }));
        }
      });
    },
  };
}

function safeJson(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export default defineConfig(({ mode }) => {
  /* Vercel injects the unprefixed variables in production. Locally they live
     in .env, which git ignores, so put EDIT_PASSWORD and SANITY_WRITE_TOKEN
     there to exercise the editor and the contact form before deploying. */
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  return {
    plugins: [react(), apiRoutes()],
    build: {
      rollupOptions: {
        output: {
          // Router + React move on a different cadence to page code; splitting
          // them keeps the vendor chunk cacheable across content edits.
          // Rolldown (Vite 8) requires the function form here.
          manualChunks(id) {
            if (!id.includes("node_modules")) return undefined;
            // must be tested before "react" — the path contains both
            if (id.includes("react-router")) return "router";
            if (id.includes("/react-dom/") || id.includes("/react/")) return "react";
            return undefined;
          },
        },
      },
    },
  };
});
