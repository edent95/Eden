import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { OG_IMAGE_FILE, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from './seo';
import { ROUTE_SEO } from './seo-routes';

function generateSitemapAndRobots(outDir: string, siteBaseNoSlash: string) {
  const sitemapRoutes = ROUTE_SEO.filter((route) => route.sitemap !== false);
  const lines = sitemapRoutes.map(({ path: p, priority }) => {
    const loc = p === '/' ? `${siteBaseNoSlash}/` : `${siteBaseNoSlash}${p}`;
    return `  <url><loc>${loc}</loc><changefreq>monthly</changefreq><priority>${priority}</priority></url>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
  const buildId = process.env.GITHUB_SHA?.slice(0, 8) ?? Date.now().toString(36);
  const stamped = src.replace(/(const CACHE_NAME = ')[^']*(')/, `$1eden-site-${buildId}$2`);
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
    server: {
      port: 4180,
      strictPort: true,
      host: 'localhost',
      watch: {
        ignored: ['**/verify_*/**', '**/dist_*/**', '**/_to_delete/**'],
      },
    },
    plugins: [
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
          const manifestScript = `<script>(function(){var p=window.location.pathname;var app=/\\/film-gallery\\/?$/.test(p)?{f:'film-gallery.webmanifest',i:'film-gallery-app-icon.svg',c:'#171411'}:/\\/conways-game-of-life\\/?$/.test(p)?{f:'conway.webmanifest',i:'conway-app-icon.svg',c:'#176b87'}:{f:'site.webmanifest',i:'eden-app-icon.svg',c:'#1c1917'};document.write('<link rel="manifest" href="${base}'+app.f+'"><meta name="theme-color" content="'+app.c+'"><link rel="apple-touch-icon" href="${base}'+app.i+'">');})();</script>`;
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
