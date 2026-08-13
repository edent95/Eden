# Current Project State

Last reviewed: 2026-08-14

## Runtime

- React 19 + TypeScript + Vite 6 static SPA.
- Local development runs at `http://localhost:4180` with a strict port.
- Production deploys from `main` to GitHub Pages at `https://edentan.site`.
- `seo-routes.ts` is the public route and SEO registry.
- `App.tsx` still contains the route renderer plus the current hard-coded Wiki and Notes data.

## Required Verification

- Use `npm run check` as the completion gate.
- Pull requests run `.github/workflows/verify.yml`.
- Main-branch deployment runs the same gate before uploading `dist`.
- Production-only Firebase RTDB rules for Penney's Game remain outside this repository's deployment workflow; see `docs/penney-leaderboard.md`.

## Content And UI Sources Of Truth

- Durable agent rules: `AGENTS.md`.
- Stable user collaboration preferences: `soul.md`.
- Route and SEO metadata: `seo-routes.ts`.
- Shared navigation: `HeaderControls` in `App.tsx` plus `styles/shared.css`.
- CSS art inventory: `css-art.registry.ts` and `docs/css-art-system.md`.
- Change history: append-only `log.md`; read only its recent tail unless older history is relevant.

## Known Structural Debt

- `App.tsx` is large and still embeds Wiki/Notes content. The intended next architecture is Markdown under `wiki/`, compiled into site data.
- `log.md` is large. A future migration should create a generated recent index and archive older entries by month without losing history.
- `log 2.md` and `soul 2.md` are tracked legacy snapshots. They are not active sources of truth and should not be read or updated during normal work.
- Branch protection must be enabled in GitHub settings so the `Eden Harness / verify` check is required before merge.

## Near-Term Harness Direction

1. Keep route, documentation, skill paths, Wiki metadata, CSS structure, and logs machine-checkable.
2. Add regression tests when a bug or repeated Agent mistake is discovered.
3. Move Wiki and Notes content out of `App.tsx` without changing public URLs.
4. Split `App.tsx` by route only after the content model and route contracts are protected by tests.
