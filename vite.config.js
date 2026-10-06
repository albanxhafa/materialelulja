import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import sitePages from "./site/vite-plugin.js";

export default defineConfig({
  base: "/",
  // sitePages() adds every page from site/pages.js as an extra HTML entry (dist/<slug>/index.html).
  plugins: [sitePages(), tailwindcss()],
  build: {
    target: "es2022",
    cssMinify: "lightningcss",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
  },
  server: {
    open: true,
  },
});
