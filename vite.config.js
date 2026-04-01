import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/materialelulja/",
  plugins: [tailwindcss()],
  build: {
    target: "es2022",
    cssMinify: "lightningcss",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        produkte: resolve(__dirname, "produkte/index.html"),
        makita: resolve(__dirname, "makita/index.html"),
        kontakt: resolve(__dirname, "kontakt/index.html"),
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
