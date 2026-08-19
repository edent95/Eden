# Current Project State

Last reviewed: 2026-08-19

## Runtime

- React 19 + TypeScript + Vite 6 progressive app；production build 会按 `seo-routes.ts` 为每个已登记 route 生成英文与 `/zh/` 中文目录 HTML，服务器响应直接含真实正文、静态内链、breadcrumbs、JSON-LD、canonical 与 hreflang，React 再接管互动。
- Local development runs at `http://localhost:4180` with a strict port.
- Production deploys from `main` to GitHub Pages at `https://eden-tan.com`.
- Homepage Mini Coin Slot calls `penneyMiniApi`, a Node.js 22 Firebase Functions v2 endpoint in `asia-southeast1`; it atomically enforces 100 plays per IP per Malaysia day and owns leaderboard writes.
- `seo-routes.ts` is the public route and SEO registry；`seo-prerender.ts` 负责把 registry 与编译后的 Wiki/Notes 内容转成静态正文、主题集群链接与结构化数据。
- Wiki and Notes content compiles from `wiki/` into `generated/content.ts`; `App.tsx` still contains the large route renderer.
- Sitemap 同时列出英文与中文 canonical URL，包含 reciprocal hreflang、x-default 与 `SITE_CONTENT_LASTMOD`；修改 SEO 可见内容时必须同步更新该日期。

## Required Verification

- Use `npm run check` as the completion gate.
- Pull requests run `.github/workflows/verify.yml`.
- Main-branch deployment runs the same gate before uploading `dist`.
- `npm run task:new` and `npm run publish` provide the protected operator path from work branch through PR, required checks, deployment, and live verification.
- Production-only Firebase RTDB rules for Penney's Game remain outside this repository's deployment workflow; see `docs/penney-leaderboard.md`.
- Mini Coin Slot Functions source is tracked under `functions/`; `npm run check` syntax-checks it, while production deployment remains the explicit `npm run functions:deploy` step documented in `docs/penney-mini-arena.md`.

## Content And UI Sources Of Truth

- Durable agent rules: `AGENTS.md`.
- Stable user collaboration preferences: `soul.md`.
- Route and SEO metadata: `seo-routes.ts`.
- Shared navigation: `HeaderControls` in `App.tsx` plus `styles/shared.css`.
- CSS art inventory: `css-art.registry.ts` and `docs/css-art-system.md`.
- Change history: `logs/index.md` plus append-only monthly `logs/YYYY-MM.md` archives.

## Known Structural Debt

- Wiki and Notes content now lives under `wiki/` and compiles into `generated/content.ts`; `App.tsx` still contains large route components that can be split later.
- `PenneysGamePage` 与首页 Penney 模块已使用 lazy chunk；其余大型 route 仍集中在 `App.tsx`，主 bundle 还可继续按 route 拆分。当前环境没有 Chrome DevTools performance trace，不能把 bundle 优化当成真实 LCP / INP / CLS 实测。
- Historical logs are split by month and indexed through generated `logs/index.md`; `log.md` remains a compatibility pointer.
- `log 2.md` and `soul 2.md` are tracked legacy snapshots. They are not active sources of truth and should not be read or updated during normal work.
- GitHub `main` branch protection requires the `verify` check, an up-to-date branch, resolved review conversations, and applies to administrators; force-push and branch deletion are disabled.

## Near-Term Harness Direction

1. Keep route, documentation, skill paths, Wiki metadata, CSS structure, and logs machine-checkable.
2. Add regression tests when a bug or repeated Agent mistake is discovered.
3. Use the phase-three operator commands for routine changes and improve them from observed failure cases.
4. Split `App.tsx` by route only after the content model and route contracts are protected by tests.
