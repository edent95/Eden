# Current Project State

Last reviewed: 2026-09-18

## Runtime

- React 19 + TypeScript + Vite 6 progressive app；production build 会按 `seo-routes.ts` 为每个已登记 route 生成英文与 `/zh/` 中文目录 HTML，服务器响应直接含真实正文、静态内链、breadcrumbs、JSON-LD、canonical 与 hreflang，React 再接管互动。
- Local development runs at `http://localhost:4180` with a strict port.
- Production deploys from `main` to GitHub Pages at `https://eden-tan.com`.
- Eden-owned Firebase configuration, RTDB, Auth, rules, leaderboard and target Functions source live in the dedicated `eden-tan` project and must not share a sibling product project's backend.
- Homepage Mini Coin Slot calls the dedicated `eden-tan` `penneyMiniApi`, a Node.js 22 Firebase Functions v2 endpoint in `asia-southeast1`; it atomically enforces 100 plays per IP per Malaysia day and owns leaderboard writes. Google Artifact Registry provisioning recovered on 2026-08-19, and GET, preflight CORS, the 100-credit contract and the migrated leaderboard have been verified. After production readback confirmed the new client bundle, the previous Poker-project Function, Secret and Eden-owned RTDB nodes were permanently removed.
- `seo-routes.ts` is the public route and SEO registry（含每个 route 的 `datePublished` / `dateModified` 与 `og` 分享图家族）；`seo-static-content.ts` 保存产品页、工具页与归档页的独立双语静态正文；`seo-prerender.ts` 负责把 registry、静态正文与编译后的 Wiki/Notes 内容转成静态正文、主题集群链接、逐 route 日期与结构化数据。
- Wiki and Notes content compiles from `wiki/` into `generated/content.ts`; `App.tsx` is now only the router; each route component lives in `pages/` and loads as a lazy chunk.
- Sitemap 同时列出英文与中文 canonical URL，包含 reciprocal hreflang 与 x-default；`lastmod` 逐 route 计算（Wiki/Notes 来自 Markdown frontmatter `published` / `updated`，其余来自 registry），`SITE_CONTENT_LASTMOD` 只作首页日期与兜底，且必须不早于任何 route 的 `dateModified`（`verify:routes` 会检查）。改一个页面的可抓取内容时，更新那个 route 或那篇 Markdown 的日期，而不是全站日期。
- 未登记路径由 `pages/NotFoundPage.tsx` 的 `NotFoundPage` 渲染（`App.tsx` 判定）并由 `seo.ts` 标为 `noindex`；`robots.txt` 对 `/?p=` SPA shim 加了 `Disallow`。

## Required Verification

- Use `npm run check` as the completion gate.
- Pull requests run `.github/workflows/verify.yml`.
- Main-branch deployment runs the same gate before uploading `dist`.
- `npm run task:new` and `npm run publish` provide the protected operator path from work branch through PR, required checks, deployment, and live verification.
- Firebase project selection and RTDB rules are tracked in `.firebaserc` and `database.rules.json`; `npm run verify:firebase` rejects Poker-project references from every active Firebase target, including the Mini API client.
- Mini Coin Slot Functions source is tracked under `functions/`; `npm run check` syntax-checks it, while production deployment remains the explicit `npm run firebase:deploy` step documented in `docs/penney-mini-arena.md`.

## Content And UI Sources Of Truth

- Durable agent rules: `AGENTS.md`.
- Stable user collaboration preferences: `soul.md`.
- Route and SEO metadata: `seo-routes.ts`.
- Shared navigation: `HeaderControls` in `app/shared.tsx` plus `styles/shared.css`.
- CSS art inventory: `css-art.registry.ts` and `docs/css-art-system.md`.
- Change history: `logs/index.md` plus append-only monthly `logs/YYYY-MM.md` archives.

## Known Structural Debt

- 2026-09-18 起 `App.tsx` 只剩路由与语言/主题状态（约 550 行）；除首页与 404 外，每个 route 都是 `pages/` 下的 lazy chunk，共享的导航与路径工具在 `app/shared.tsx`。首页仍 eager 打包在主 bundle；非首页 route 首次渲染多一次 chunk 请求（期间显示空白 `main` 占位），目前没有测试覆盖这段加载态。当前环境没有 Chrome DevTools performance trace，不能把 bundle 拆分当成真实 LCP / INP / CLS 实测。
- `pages/legacy/` 保存 7 个没有任何路由渲染的旧页面（Jiju/Poker/ETReportHub 旧版、CRM、Projects、Previous Projects、Active Build skills），不进 bundle，但仍被 `tsc` 检查；确认不再需要后可整目录删除。
- `generated/content.ts`（Wiki/Notes 全文）仍被 `App.tsx` 用来判定 route，因此留在主 bundle。
- Historical logs are split by month and indexed through generated `logs/index.md`; `log.md` remains a compatibility pointer.
- `log 2.md` and `soul 2.md` are tracked legacy snapshots. They are not active sources of truth and should not be read or updated during normal work.
- GitHub `main` branch protection requires the `verify` check, an up-to-date branch, resolved review conversations, and applies to administrators; force-push and branch deletion are disabled.

## Near-Term Harness Direction

1. Keep route, documentation, skill paths, Wiki metadata, CSS structure, and logs machine-checkable.
2. Add regression tests when a bug or repeated Agent mistake is discovered.
3. Use the phase-three operator commands for routine changes and improve them from observed failure cases.
4. Route-level split of `App.tsx` is done (2026-09-18). Next: a render-level smoke test per route (at least "lazy chunk resolves without throwing"), then decide whether to delete `pages/legacy/`.
