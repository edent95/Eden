# Current Project State

Last reviewed: 2026-08-14

## Runtime

- React 19 + TypeScript + Vite 6 static SPA.
- Local development runs at `http://localhost:4180` with a strict port.
- Production deploys from `main` to GitHub Pages at `https://edentan.site`.
- Homepage Mini Coin Slot calls `penneyMiniApi`, a Node.js 22 Firebase Functions v2 endpoint in `asia-southeast1`; it atomically enforces 100 plays per IP per Malaysia day and owns leaderboard writes.
- `seo-routes.ts` is the public route and SEO registry.
- Wiki and Notes content compiles from `wiki/` into `generated/content.ts`; `App.tsx` still contains the large route renderer.

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
- Historical logs are split by month and indexed through generated `logs/index.md`; `log.md` remains a compatibility pointer.
- `log 2.md` and `soul 2.md` are tracked legacy snapshots. They are not active sources of truth and should not be read or updated during normal work.
- GitHub `main` branch protection requires the `verify` check, an up-to-date branch, resolved review conversations, and applies to administrators; force-push and branch deletion are disabled.

## Near-Term Harness Direction

1. Keep route, documentation, skill paths, Wiki metadata, CSS structure, and logs machine-checkable.
2. Add regression tests when a bug or repeated Agent mistake is discovered.
3. Use the phase-three operator commands for routine changes and improve them from observed failure cases.
4. Split `App.tsx` by route only after the content model and route contracts are protected by tests.
