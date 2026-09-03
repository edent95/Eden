import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { OG_IMAGE_FILE, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from './seo';
import {
  localizedCanonicalRoutePath,
  ROUTE_SEO,
  SITE_CONTENT_LASTMOD,
  type RouteSeo,
  type SeoLanguage,
} from './seo-routes';
import {
  buildStaticBreadcrumbs,
  buildStaticJsonLd,
  getStaticRouteContent,
  languageAlternateUrl,
  routeOutputPath,
} from './seo-prerender';
import { createPwaManifestInjectionScript } from './pwa-manifests';

function generateSitemapAndRobots(outDir: string, siteBaseNoSlash: string) {
  const sitemapRoutes = ROUTE_SEO.filter((route) => route.sitemap !== false);
  const lines = sitemapRoutes.flatMap((route) => (['en', 'zh'] as const).map((language) => {
    const loc = languageAlternateUrl(route, language, siteBaseNoSlash);
    const en = languageAlternateUrl(route, 'en', siteBaseNoSlash);
    const zh = languageAlternateUrl(route, 'zh', siteBaseNoSlash);
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${SITE_CONTENT_LASTMOD}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${route.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${en}" />
    <xhtml:link rel="alternate" hreflang="zh-Hans" href="${zh}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${en}" />
  </url>`;
  }));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${lines.join('\n')}
</urlset>
`;
  writeFileSync(path.join(outDir, 'sitemap.xml'), xml, 'utf8');
  const robots = `User-agent: *
Allow: /

Sitemap: ${siteBaseNoSlash}/sitemap.xml
`;
  writeFileSync(path.join(outDir, 'robots.txt'), robots, 'utf8');
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function upsertMeta(
  html: string,
  attribute: 'name' | 'property',
  key: string,
  content: string,
): string {
  const tag = `<meta ${attribute}="${escapeHtml(key)}" content="${escapeHtml(content)}" />`;
  const pattern = new RegExp(
    `<meta\\s+[^>]*\\b${attribute}=["']${escapeRegExp(key)}["'][^>]*>`,
    'i',
  );
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
}

function upsertCanonical(html: string, href: string): string {
  const tag = `<link rel="canonical" href="${escapeHtml(href)}" />`;
  const pattern = /<link\s+[^>]*\brel=["']canonical["'][^>]*>/i;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
}

function upsertAlternate(html: string, hreflang: string, href: string): string {
  const tag = `<link rel="alternate" hreflang="${escapeHtml(hreflang)}" href="${escapeHtml(href)}" />`;
  const pattern = new RegExp(`<link\\s+[^>]*\\bhreflang=["']${escapeRegExp(hreflang)}["'][^>]*>`, 'i');
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
}

function renderStaticBody(route: RouteSeo, language: SeoLanguage, siteBaseNoSlash: string): string {
  const content = getStaticRouteContent(route, language);
  const breadcrumbs = buildStaticBreadcrumbs(route, language, siteBaseNoSlash);
  const breadcrumbHtml = breadcrumbs.map((item, index) => {
    const current = index === breadcrumbs.length - 1;
    return current
      ? `<span aria-current="page">${escapeHtml(item.name)}</span>`
      : `<a href="${escapeHtml(item.url)}">${escapeHtml(item.name)}</a>`;
  }).join('<span aria-hidden="true"> / </span>');
  const sections = content.sections.map((section) => `
      <section>
        <h2>${escapeHtml(section.title)}</h2>
        ${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n        ')}
      </section>`).join('');
  const related = content.related.map((entry) => {
    const href = languageAlternateUrl(entry, language, siteBaseNoSlash);
    return `<li><a href="${escapeHtml(href)}">${escapeHtml(entry.title[language].split(' | ')[0])}</a></li>`;
  }).join('');
  const relatedTitle = language === 'zh' ? '相关页面' : 'Related pages';
  const skipLabel = language === 'zh' ? '跳到正文' : 'Skip to content';

  return `<div id="root">
    <div class="seo-prerender">
      <a class="seo-prerender-skip" href="#seo-main">${skipLabel}</a>
      <nav aria-label="Breadcrumb">${breadcrumbHtml}</nav>
      <main id="seo-main">
        <header>
          <p class="seo-prerender-eyebrow">${escapeHtml(content.eyebrow)}</p>
          <h1>${escapeHtml(content.heading)}</h1>
          <p class="seo-prerender-summary">${escapeHtml(content.summary)}</p>
          ${content.thesis ? `<blockquote>${escapeHtml(content.thesis)}</blockquote>` : ''}
        </header>${sections}
        <nav aria-labelledby="seo-related-title">
          <h2 id="seo-related-title">${relatedTitle}</h2>
          <ul>${related}</ul>
        </nav>
      </main>
    </div>
  </div>`;
}

function renderRouteHtml(
  shell: string,
  route: RouteSeo,
  language: SeoLanguage,
  siteBaseNoSlash: string | null,
): string {
  const title = route.title[language];
  const description = route.desc[language];
  const robots = route.index === false
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  let html = shell
    .replace(/<html\b[^>]*>/i, `<html lang="${language === 'zh' ? 'zh-Hans' : 'en'}">`)
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);

  for (const [attribute, key, value] of [
    ['name', 'description', description],
    ['name', 'robots', robots],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', description],
    ['property', 'og:title', title],
    ['property', 'og:description', description],
    ['property', 'og:locale', language === 'zh' ? 'zh_CN' : 'en_US'],
  ] as const) {
    html = upsertMeta(html, attribute, key, value);
  }

  if (siteBaseNoSlash) {
    const canonical = `${siteBaseNoSlash}${localizedCanonicalRoutePath(route.path, language)}`;
    html = upsertMeta(html, 'property', 'og:url', canonical);
    html = upsertCanonical(html, canonical);
    html = upsertAlternate(html, 'en', languageAlternateUrl(route, 'en', siteBaseNoSlash));
    html = upsertAlternate(html, 'zh-Hans', languageAlternateUrl(route, 'zh', siteBaseNoSlash));
    html = upsertAlternate(html, 'x-default', languageAlternateUrl(route, 'en', siteBaseNoSlash));
    const jsonLd = JSON.stringify(buildStaticJsonLd(route, language, siteBaseNoSlash)).replace(/</g, '\\u003c');
    const fallbackCss = `<style id="seo-prerender-style">
      .seo-prerender{max-width:920px;margin:0 auto;padding:32px 24px 80px;color:#292524;font:17px/1.75 system-ui,-apple-system,sans-serif}.seo-prerender a{color:inherit;text-decoration-thickness:1px;text-underline-offset:3px}.seo-prerender nav{font-size:14px;color:#57534e}.seo-prerender header{padding:72px 0 40px}.seo-prerender-eyebrow{font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.seo-prerender h1{max-width:780px;margin:12px 0 20px;font-size:clamp(2.5rem,7vw,5.5rem);line-height:.98;letter-spacing:-.05em}.seo-prerender-summary{max-width:720px;font-size:clamp(1.1rem,2vw,1.35rem)}.seo-prerender blockquote{margin:32px 0;padding-left:20px;border-left:3px solid #34d399;font-size:1.2rem}.seo-prerender section{padding:28px 0;border-top:1px solid #e7e5e4}.seo-prerender h2{font-size:1.45rem}.seo-prerender section p{max-width:760px}.seo-prerender ul{padding-left:20px}.seo-prerender-skip{position:absolute;left:-9999px}.seo-prerender-skip:focus{left:16px;top:16px;background:#fff;padding:8px 12px}@media(prefers-color-scheme:dark){.seo-prerender{color:#e7e5e4}.seo-prerender nav{color:#a8a29e}.seo-prerender section{border-color:#44403c}}
    </style>`;
    html = html.replace('</head>', `    ${fallbackCss}\n    <script id="eden-site-json-ld" type="application/ld+json">${jsonLd}</script>\n  </head>`);
    html = html.replace('<div id="root"></div>', renderStaticBody(route, language, siteBaseNoSlash));
  }

  return html;
}

function generateStaticRouteHtml(outDir: string, siteBaseNoSlash: string | null) {
  const shellPath = path.join(outDir, 'index.html');
  const shell = readFileSync(shellPath, 'utf8');

  for (const route of ROUTE_SEO) {
    for (const language of ['en', 'zh'] as const) {
      const outputPath = path.join(outDir, routeOutputPath(route, language));
      mkdirSync(path.dirname(outputPath), { recursive: true });
      writeFileSync(outputPath, renderRouteHtml(shell, route, language, siteBaseNoSlash), 'utf8');
    }
  }
}

/**
 * One id per build, shared by the service worker cache name and the `__BUILD_ID__`
 * the app prints at startup. Keeping them the same is the point: when a PWA looks
 * stale, the id on the page tells you which deploy it is actually running.
 */
const BUILD_ID = process.env.GITHUB_SHA?.slice(0, 8) ?? Date.now().toString(36);

/**
 * Rewrite `CACHE_NAME` in the built `sw.js` so the file's bytes change on every
 * deploy. Browsers decide whether a service worker is "new" by byte-comparing
 * the script, so without this the worker would never update — and the old
 * cache entries would never be evicted by the `activate` handler.
 */
function stampServiceWorker(outDir: string) {
  const swPath = path.join(outDir, 'sw.js');
  let src: string;
  try {
    src = readFileSync(swPath, 'utf8');
  } catch {
    return;
  }
  const stamped = src.replace(/(const CACHE_NAME = ')[^']*(')/, `$1eden-site-${BUILD_ID}$2`);
  if (stamped === src) {
    throw new Error('stampServiceWorker: CACHE_NAME declaration not found in sw.js');
  }
  writeFileSync(swPath, stamped, 'utf8');
}

function resolvePublicSiteBase(env: Readonly<Record<string, string>>): string | null {
  const fromEnv = (env.VITE_SITE_URL as string | undefined)?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, '') || null;
  }
  const gr = process.env.GITHUB_REPOSITORY;
  if (gr) {
    const [owner, repo] = gr.split('/');
    if (owner && repo) {
      return `https://${owner}.github.io/${repo}`;
    }
  }
  return null;
}

function resolveProductionBase(
  env: Readonly<Record<string, string>>,
  repoName: string | undefined,
): string {
  const explicit = (env.VITE_BASE || process.env.VITE_BASE || '').trim();
  if (explicit) {
    if (explicit === '/' || explicit === './') return '/';
    const withLeading = explicit.startsWith('/') ? explicit : `/${explicit}`;
    return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
  }
  if (repoName) return `/${repoName}/`;
  return '/';
}

/** Match Vite `base` path depth for GitHub Pages 404 → `?p=` redirect. */
function pathSegmentsToKeepForBase(base: string): number {
  const normalized = base.replace(/\/$/, '') || '/';
  if (normalized === '' || normalized === '/') return 0;
  return normalized.split('/').filter(Boolean).length;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
  const base = mode === 'production' ? resolveProductionBase(env, repoName) : '/';
  const spaKeepSegments = pathSegmentsToKeepForBase(base);

  return {
    base,
    define: {
      __BUILD_ID__: JSON.stringify(BUILD_ID),
    },
    server: {
      port: 4180,
      strictPort: true,
      host: 'localhost',
      watch: {
        ignored: ['**/verify_*/**', '**/dist_*/**', '**/_to_delete/**'],
      },
    },
    plugins: [
      {
        name: 'hwayik-dev-entry',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const requestPath = req.url?.split('?', 1)[0];
            if (requestPath === '/hwayik') {
              res.statusCode = 307;
              res.setHeader('Location', '/hwayik/');
              res.end();
              return;
            }
            if (requestPath !== '/hwayik/') return next();
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(readFileSync(path.join(__dirname, 'public/hwayik/index.html'), 'utf8'));
          });
        },
      },
      react(),
      tailwindcss(),
      {
        name: 'favicon-with-base',
        transformIndexHtml(html) {
          if (html.includes('rel="icon"')) return html;
          return html.replace(
            '<meta charset="UTF-8" />',
            `<meta charset="UTF-8" />\n    <link rel="icon" type="image/svg+xml" href="${base}favicon.svg" />`,
          );
        },
      },
      {
        name: 'web-app-manifest-with-base',
        transformIndexHtml(html) {
          if (html.includes('rel="manifest"')) return html;
          const manifestScript = createPwaManifestInjectionScript(base);
          return html.replace(
            '</head>',
            `    ${manifestScript}\n  </head>`,
          );
        },
      },
      {
        name: 'og-image-meta',
        transformIndexHtml(html) {
          if (html.includes('property="og:image"') && html.includes('og:image:width')) {
            return html;
          }
          const site = resolvePublicSiteBase(env);
          const imageUrl = site
            ? `${site}/${OG_IMAGE_FILE}`
            : `${base.replace(/\/?$/, '/')}${OG_IMAGE_FILE}`.replace(/([^:]\/)\/+/g, '$1');
          const alt =
            'Eden Tan — Systems Architect and Digital Strategist; portfolio share preview (1200×630).';
          const altAttr = alt.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
          const block = `    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="${OG_IMAGE_WIDTH}" />
    <meta property="og:image:height" content="${OG_IMAGE_HEIGHT}" />
    <meta property="og:image:alt" content="${altAttr}" />
    <meta name="twitter:image" content="${imageUrl}" />
    <meta name="twitter:image:alt" content="${altAttr}" />
`;
          return html.replace('</head>', `${block}\n  </head>`);
        },
      },
      {
        name: 'static-route-html',
        writeBundle() {
          if (mode !== 'production') return;
          generateStaticRouteHtml(
            path.resolve(__dirname, 'dist'),
            resolvePublicSiteBase(env),
          );
        },
      },
      {
        name: 'seo-sitemap-robots',
        closeBundle() {
          if (mode !== 'production') return;
          const site = resolvePublicSiteBase(env);
          if (!site) return;
          const outDir = path.resolve(__dirname, 'dist');
          generateSitemapAndRobots(outDir, site);
        },
      },
      {
        name: 'spa-404-redirect-segments',
        closeBundle() {
          if (mode !== 'production') return;
          const outDir = path.resolve(__dirname, 'dist');
          const templatePath = path.join(__dirname, 'public/404.html');
          let html: string;
          try {
            html = readFileSync(templatePath, 'utf8');
          } catch {
            return;
          }
          const out = html.replace('__PATH_SEGMENTS_TO_KEEP__', String(spaKeepSegments));
          writeFileSync(path.join(outDir, '404.html'), out, 'utf8');
        },
      },
      {
        name: 'service-worker-build-stamp',
        closeBundle() {
          if (mode !== 'production') return;
          stampServiceWorker(path.resolve(__dirname, 'dist'));
        },
      },
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return undefined;
            if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/')) {
              return 'vendor-react';
            }
            if (id.includes('/framer-motion/') || id.includes('/motion-dom/') || id.includes('/motion-utils/')) {
              return 'vendor-motion';
            }
            if (id.includes('/lucide-react/')) {
              return 'vendor-icons';
            }
            return 'vendor';
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
