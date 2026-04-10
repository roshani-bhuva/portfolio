import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** GitHub Pages has no SPA fallback; copy index.html so deep links load the app. */
function githubPagesSpa404() {
  return {
    name: "github-pages-spa-404",
    closeBundle() {
      const dist = path.resolve(__dirname, "dist");
      fs.copyFileSync(
        path.join(dist, "index.html"),
        path.join(dist, "404.html"),
      );
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), githubPagesSpa404()],
  server: {
    host: true,
  },
  base: "/portfolio/",
});
