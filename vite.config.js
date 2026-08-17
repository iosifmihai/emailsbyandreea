import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
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
});
