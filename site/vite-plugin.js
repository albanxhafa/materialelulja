// Vite plugin: turns site/pages.js into real multi-page HTML entries.
//
// - build: each page is added to the Rolldown input as <root>/<slug>/index.html and its HTML is
//   supplied through `load`, so Vite processes it like a normal file (CSS/JS bundling, hashing).
//   Output: dist/<slug>/index.html — clean /slug/ URLs on GitHub Pages. Also emits sitemap.xml.
// - dev: pages are rendered on request (and hot-reloaded when anything in site/ changes).
// - index.html: <!-- @site:header --> / <!-- @site:footer --> are replaced with shared partials.

import path from "node:path";
import { pathToFileURL } from "node:url";
import { normalizePath } from "vite";

const ENTRY = "/site/pages.js";
const PARTIAL_RE = /<!--\s*@site:([\w-]+)\s*-->/g;

export default function sitePages() {
  let root = process.cwd();
  let server;
  let pagesByFile = new Map();

  const loadRegistry = () =>
    server
      ? server.environments.ssr.runner.import(ENTRY)
      : import(pathToFileURL(path.join(root, ENTRY)).href);

  const absFile = (file) => normalizePath(path.resolve(root, file));

  return {
    name: "lulja:site-pages",
    enforce: "pre",

    async config(userConfig) {
      root = path.resolve(userConfig.root ?? process.cwd());
      const { PAGES } = await loadRegistry();
      const input = Object.fromEntries(PAGES.map((p) => [p.file.replace(/(\/index)?\.html$/, ""), absFile(p.file)]));
      return { appType: "mpa", build: { rollupOptions: { input } } };
    },

    async buildStart() {
      const { PAGES } = await loadRegistry();
      pagesByFile = new Map(PAGES.map((p) => [absFile(p.file), p]));
    },

    resolveId(id) {
      const file = normalizePath(id);
      if (pagesByFile.has(file)) return file;
    },

    load(id) {
      const page = pagesByFile.get(normalizePath(id));
      if (page) return page.render();
    },

    transformIndexHtml: {
      order: "pre",
      async handler(html) {
        if (!html.includes("@site:")) return html;
        const { PARTIALS } = await loadRegistry();
        return html.replace(PARTIAL_RE, (_, name) => {
          if (!PARTIALS[name]) throw new Error(`[lulja:site-pages] Unknown partial "@site:${name}"`);
          return PARTIALS[name]();
        });
      },
    },

    async generateBundle() {
      const { renderSitemap } = await loadRegistry();
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: renderSitemap() });
    },

    configureServer(devServer) {
      server = devServer;
      const siteDir = normalizePath(path.join(root, "site")) + "/";

      devServer.watcher.on("change", (file) => {
        if (!normalizePath(file).startsWith(siteDir)) return;
        devServer.environments.ssr.moduleGraph.invalidateAll();
        devServer.environments.ssr.runner.clearCache();
        devServer.ws.send({ type: "full-reload" });
      });

      const send = (res, status, type, body) => {
        res.statusCode = status;
        res.setHeader("Content-Type", `${type}; charset=utf-8`);
        res.end(body);
      };

      // Runs after Vite's static/module middlewares, before its HTML + 404 handlers.
      return () => {
        devServer.middlewares.use(async (req, res, next) => {
          if (req.method !== "GET" && req.method !== "HEAD") return next();
          const url = (req.url ?? "/").split("?")[0];
          try {
            const { PAGES, renderSitemap } = await loadRegistry();
            if (url === "/sitemap.xml") return send(res, 200, "application/xml", renderSitemap());

            const page = PAGES.find((p) => p.path === url || `${p.path}index.html` === url);
            if (page) return send(res, 200, "text/html", await devServer.transformIndexHtml(url, page.render(), req.originalUrl));

            if (PAGES.some((p) => p.path === `${url}/`)) {
              res.statusCode = 301;
              res.setHeader("Location", `${url}/`);
              return res.end();
            }

            // Mirror GitHub Pages: unknown HTML routes get the 404 page.
            const wantsHtml = req.headers.accept?.includes("text/html");
            if (wantsHtml && !path.extname(url)) {
              const notFound = PAGES.find((p) => p.path === "/404.html");
              return send(res, 404, "text/html", await devServer.transformIndexHtml(url, notFound.render(), req.originalUrl));
            }
          } catch (err) {
            return next(err);
          }
          next();
        });
      };
    },
  };
}
