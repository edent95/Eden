# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Read first

`AGENTS.md` is the operating schema for this repo (tone, content voice, CSS-art rules, route/SEO rules, logging duty). It is long but authoritative — read it before non-trivial work instead of duplicating its rules here. Then `soul.md` (collaboration preferences), `state/current.md` (current architecture + known debt), `logs/index.md` (recent changes).

Default reply language is Chinese.

## Commands

```bash
npm run dev            # Vite dev server, fixed http://localhost:4180 (strictPort)
npm run check          # THE completion gate (alias of harness:check) — see below
npm run typecheck      # tsc --noEmit (also aliased as `lint`)
npm run build          # plain Vite build; proves compilation only, NOT task completion
npm run preview
```

`npm run check` runs, in order: `verify` (skills → routes → log → wiki → css → firebase) → unit tests → typecheck → `functions:check` → a production build with `VITE_BASE=/ VITE_SITE_URL=https://eden-tan.com` → `test:smoke` against `dist/`. Individual gates can be run alone (`npm run verify:routes`, `npm run verify:css`, …) while iterating, but the task is not done until `npm run check` passes.

Single unit test:

```bash
node --experimental-strip-types --test tests/unit/penney-game.test.ts
```

Content and generated files:

```bash
npm run wiki:build     # wiki/*.md -> generated/content.ts (never hand-edit the output)
npm run log:index      # regenerate logs/index.md after appending to logs/YYYY-MM.md
```

Operator workflow (protected path — `publish` never pushes `main` directly):

```bash
npm run task:new -- "task name"        # branch off default branch: work/YYYYMMDD-HHmm-name
npm run publish -- "commit title"      # ready -> check -> commit -> PR -> verify -> squash merge -> Pages deploy -> live check
npm run publish -- "title" --dry-run   # no writes
npm run publish -- "title" --yes       # required in non-interactive/agent shells; inspect `git status --short` first, never add by habit
npm run publish -- "title" --no-merge  # stop after PR + verify
```

Firebase (deploy is always an explicit, separate step):

```bash
npm run firebase:deploy   # database + functions, project eden-tan
```

## Architecture

**Single-file React app.** `index.tsx` mounts `App.tsx` — a ~10.5k-line monolith holding page data, route components, and the router. There is no router library: `App` reads `window.location.pathname`, strips `VITE_BASE` and the `/zh/` locale prefix into `pathWithoutBase`, then branches on `pathWithoutBase === '/route'` flags. Adding a route means adding such a branch (the route harness greps for that exact literal). Only `PenneysGamePage` and `HomePenneyGame` are split out as lazy chunks (`ProductStorePage` is a shared, eagerly imported product-page shell reused by several routes); splitting more is deliberate future work gated on route contracts being test-covered (`state/current.md`).

**`seo-routes.ts` is the route registry and single source of truth.** Everything else must stay consistent with it: the `pathWithoutBase` branch in `App.tsx`, the README route list, `sitemap`/`index` flags, and `SITE_CONTENT_LASTMOD` (bump whenever SEO-visible content changes). `npm run verify:routes` enforces registry ↔ App.tsx ↔ README agreement. A route that should be reachable but undiscoverable keeps its React branch with `index: false, sitemap: false`.

**Three SEO layers, do not conflate them:** `seo-routes.ts` (metadata registry) → `seo-prerender.ts` (static body copy, topic-cluster interlinks, breadcrumbs, JSON-LD, output paths) → `seo.ts` (client-side sync after React mounts). Production build writes a real static `<route>/index.html` plus `/zh/<route>/index.html` per registered route; `index.tsx` calls `rootElement.replaceChildren()` before hydrating because that static body is a full document, not a hydration target. `public/404.html` is only the SPA fallback for unregistered paths.

**`vite.config.ts` carries the build contract** as named plugins: `favicon-with-base`, `web-app-manifest-with-base` (per-route manifest mapping: `/film-gallery` → `film-gallery.webmanifest`, `/conways-game-of-life` → `conway.webmanifest`, everything else → `site.webmanifest`), `og-image-meta`, `static-route-html`, `seo-sitemap-robots`, `spa-404-redirect-segments`, `service-worker-build-stamp`. `VITE_BASE` unset defaults to `/<repo>/`; CI sets `/` for the custom domain. One build cannot serve both the subpath and root-domain forms.

**Content pipeline.** `wiki/pages/*.md` → `/wiki/:slug`, `wiki/essays/*.md` → `/notes/:slug`. Each file is frontmatter plus a structured bilingual JSON payload, compiled by `scripts/wiki/build.mjs` into `generated/content.ts`, which is committed and consumed by React. `scripts/wiki/lint.mjs` checks schema, citations, bilingual fields, and cross-links. `raw/` is immutable source input.

**CSS layering is machine-checked.** `index.css` may contain nothing but `@import` lines, in order: Tailwind → `styles/tokens.css` → `base.css` → `shared.css` → `theme-overrides.css` → `motion.css` → `styles/css-art/*` → `styles/pages/*`. Route layout goes in `styles/pages/<route>.css`; illustrated visuals go in `styles/css-art/<family>.css`, registered in `css-art.registry.ts`, and reused from `components/css-art` rather than copied. `verify:css` fails if a registered art file is missing, unimported, or animates without a `prefers-reduced-motion` rule. Read `docs/css-art-system.md` before touching CSS art.

**Navigation.** `HeaderControls` in `App.tsx` + the global menu rules in `styles/shared.css` are the nav source of truth for every page. Page CSS may set content width and back destination only.

**Backend boundary.** The homepage Mini Coin Slot calls `penneyMiniApi`, a Firebase Functions v2 endpoint (Node 22, `asia-southeast1`) in `functions/`, which owns IP HMAC, the Malaysia-day 100-credit quota, round results, and all leaderboard writes; the static client never holds raw IPs. `verify:firebase` hard-fails on any reference to the sibling Poker project from `.firebaserc`, `package.json`, `functions/index.js`, `services/penneyLeaderboard.ts`, or `services/penneyMini.ts` — active config must point at `eden-tan`. Details in `docs/penney-mini-arena.md` and `docs/penney-leaderboard.md`.

## Logging is a build gate

Any changed project file (outside `dist/`) requires a new entry appended to the current `logs/YYYY-MM.md` (month resolved in `Asia/Kuala_Lumpur`), followed by `npm run log:index`. `check-log.mjs` reads only the *last* heading's section and requires all five fields: 改动 / 原因 / 影响 / 验证 / 后续. `log.md` is a legacy pointer and must not receive entries. `log 2.md` and `soul 2.md` are dead snapshots — do not read or update them.

## Verification style

Prefer build output, keyword greps, code checks, and a concrete local URL with a stated expected result. Do not use screenshot verification unless explicitly asked. If prose rules and an executable gate under `scripts/harness/`, `scripts/wiki/`, or `.github/workflows/` disagree, fix both in the same change rather than bypassing the gate.

CI: `verify.yml` runs `npm run check` on every PR; `deploy.yml` runs the same gate on `main` before publishing `dist` to GitHub Pages. `main` requires the `verify` check, an up-to-date branch, and resolved conversations, for administrators too.

## Repo-local skills

`.agents/skills/*/SKILL.md` (notably `apple-design`) are project-local references; any `SKILL.md` path mentioned in `AGENTS.md` or `soul.md` is existence-checked by `verify:skills`. `AGENTS.md` also defines three project-local conversation/strategy modes (Cai Kang-Yong / Hou Hei / Sun Tzu) — treat that file, not any similarly named global skill, as their definition.
