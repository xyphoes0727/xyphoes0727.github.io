// Build-time generator for static files that used to be TanStack server routes.
// Writes dist/rss.xml, dist/sitemap.xml, a .nojekyll marker, and a 404.html SPA fallback.
// Run AFTER `vite build`.
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const BLOG_DIR = path.join(ROOT, "src/content/blog");
const PROJECTS_DIR = path.join(ROOT, "src/content/projects");

// Update this if you move to a custom domain.
const SITE_URL = "https://xyphoes0727.github.io";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function parseFrontmatter(raw) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!m) return { data: {}, content: raw };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line);
    if (!kv) continue;
    let val = kv[2].trim();
    let parsed = val;
    if (/^\[.*\]$/.test(val)) {
      try { parsed = JSON.parse(val.replace(/'/g, '"')); }
      catch { parsed = val.slice(1, -1).split(",").map((s) => s.trim().replace(/^["']|["']$/g, "")).filter(Boolean); }
    } else if (val === "true" || val === "false") parsed = val === "true";
    else if (/^-?\d+(\.\d+)?$/.test(val)) parsed = Number(val);
    else parsed = val.replace(/^["']|["']$/g, "");
    data[kv[1]] = parsed;
  }
  return { data, content: m[2] };
}

async function loadDir(dir) {
  const files = (await fs.readdir(dir)).filter((f) => f.endsWith(".md"));
  return Promise.all(files.map(async (f) => {
    const raw = await fs.readFile(path.join(dir, f), "utf8");
    const { data } = parseFrontmatter(raw);
    return { slug: f.replace(/\.md$/, ""), ...data };
  }));
}

async function main() {
  await fs.mkdir(DIST, { recursive: true });

  const blogs = (await loadDir(BLOG_DIR)).sort((a, b) => (a.date < b.date ? 1 : -1));
  const projects = await loadDir(PROJECTS_DIR);

  // rss.xml
  const items = blogs.map((p) => `
  <item>
    <title>${esc(p.title ?? "")}</title>
    <link>${SITE_URL}/blog/${p.slug}</link>
    <guid>${SITE_URL}/blog/${p.slug}</guid>
    <pubDate>${p.date ? new Date(p.date).toUTCString() : ""}</pubDate>
    <description>${esc(p.description ?? "")}</description>
  </item>`).join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Yug Dalwadi — Writing</title>
  <link>${SITE_URL}/blog</link>
  <description>Essays and notes on ML, systems, and engineering.</description>
  <language>en-us</language>${items}
</channel>
</rss>`;
  await fs.writeFile(path.join(DIST, "rss.xml"), rss);

  // sitemap.xml
  const entries = [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/about", changefreq: "monthly", priority: "0.7" },
    { path: "/projects", changefreq: "weekly", priority: "0.9" },
    { path: "/blog", changefreq: "weekly", priority: "0.9" },
    ...projects.map((p) => ({ path: `/projects/${p.slug}`, changefreq: "monthly", priority: "0.7" })),
    ...blogs.map((b) => ({ path: `/blog/${b.slug}`, lastmod: b.date, changefreq: "monthly", priority: "0.6" })),
  ];
  const urls = entries.map((e) => [
    `  <url>`,
    `    <loc>${SITE_URL}${e.path}</loc>`,
    e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
    e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
    e.priority ? `    <priority>${e.priority}</priority>` : null,
    `  </url>`,
  ].filter(Boolean).join("\n"));
  const sitemap = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
  await fs.writeFile(path.join(DIST, "sitemap.xml"), sitemap);

  // SPA fallback: GitHub Pages serves 404.html for unknown paths.
  // We capture the requested path and replay it via history.replaceState in main.tsx.
  const indexHtml = await fs.readFile(path.join(DIST, "index.html"), "utf8");
  const redirectScript = `<script>
    (function () {
      try {
        sessionStorage.setItem(
          "gh-pages-redirect",
          window.location.pathname + window.location.search + window.location.hash
        );
        window.location.replace("/");
      } catch (e) {}
    })();
  </script>`;
  const notFoundHtml = indexHtml.replace("<head>", `<head>${redirectScript}`);
  await fs.writeFile(path.join(DIST, "404.html"), notFoundHtml);

  // Tell GitHub Pages not to run Jekyll.
  await fs.writeFile(path.join(DIST, ".nojekyll"), "");

  console.log(`✓ static generation complete (${blogs.length} posts, ${projects.length} projects)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
