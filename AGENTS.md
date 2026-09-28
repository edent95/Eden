# AGENTS.md

This repository should be handled as an `LLM Wiki` project and concept workspace.
Future agents working here should treat this file as the operating schema for how to think, write, and maintain the system.

## Default Behavior

- Default reply language: Chinese.
- Default tone: concise, direct, structured.
- Prefer doing the work over only describing it.
- When the user asks “怎么说 / 怎么回 / 怎么做”, give executable output first, explanation second.
- When information is insufficient, make the smallest safe assumption and say what is still uncertain.

## Project Identity

This repo currently serves two related purposes:

1. A front-end concept page for the `LLM Wiki` idea.
2. A markdown-based, LLM-maintained knowledge source compiled into the public Wiki and Notes routes.

When editing this repo, preserve that positioning:

- `LLM Wiki` is not a generic notes app.
- The key idea is persistent, compounding knowledge, not one-shot retrieval.
- Raw sources are immutable.
- The wiki is LLM-maintained.
- The schema defines how ingest, query, and lint should work.

## Personal Knowledge Brand Direction

If the user asks for a Dan Koe-like content direction, treat it as a reference for content architecture, not something to copy. Do not imitate Dan Koe's exact phrasing, promises, brand assets, or worldview.

If the user references Dan Koe for an article or wiki page, default to the writing method only: strong thesis, short paragraphs, readable rhythm, pull quotes, and clear progression. Keep the visual system aligned with Eden's own brand guide unless the user explicitly asks to change the visual identity.

The target direction is:

- Personal knowledge brand, not generic portfolio.
- Strong point of view first, credentials second.
- Essays, systems, build logs, and resources should feel like one compounding body of thought.
- The site should make Eden's recurring themes obvious: AI workflows, LLM-maintained knowledge, product systems, growth logic, Life OS, and how scattered work becomes usable structure.
- Prefer a newsletter / essay / knowledge archive rhythm over a resume-first rhythm when the user asks for creator-media style changes.

Content structure should usually follow this order:

1. Core thesis: the short belief the whole page is organized around.
2. Reader situation: what confusion, scattered workflow, or strategic problem the reader is already facing.
3. Eden's lens: the original framework, system, or operating model being offered.
4. Proof through builds: concrete projects, logs, artifacts, or before/after system changes.
5. Durable archive: essays, wiki pages, source summaries, templates, or repeatable tools.
6. Clear next action: read, subscribe, explore a system, or work with Eden.

Writing rules for this direction:

- Use short, high-signal claims.
- Make the page feel like a worldview, not a service menu.
- Prefer titles that express a position, for example "Knowledge should compound" rather than "About my notes app".
- Use controlled contrast: old way vs new way, scattered vs system, one-shot answer vs durable wiki, content output vs operating memory.
- Avoid fake certainty, inflated income/lifestyle claims, hustle-bro tone, and generic creator slogans.
- Do not turn Eden into a self-help brand. Keep the center of gravity on knowledge systems, product thinking, AI workflows, and lived build evidence.
- If numbers, social proof, or audience claims are used, they must be real and verifiable.

For homepage-level changes in this direction, prioritize these sections:

- A strong first-viewport thesis.
- A "Read the thinking" or essay/archive entry.
- A "Systems / resources" shelf for projects, guides, tools, and LLM Wiki assets.
- A concise about block that explains the human behind the systems.
- A final subscription/contact/work-with-me CTA only after the worldview is clear.

## LLM Wiki Operating Model

Future agents should reason with these three layers:

### 1. Raw Sources

- Source documents are the ground truth.
- Do not modify raw sources.
- If new source material is added later, treat it as ingest input, not editable wiki content.
- Put commit-safe raw inputs under `raw/`; keep public full-text compatibility files in `public/` when an existing URL depends on them.

### 2. The Wiki

- The wiki is a set of markdown pages maintained by the LLM.
- Good outputs should be fileable back into the wiki instead of disappearing into chat history.
- Prefer structured pages: overview, source summaries, entity pages, concept pages, comparisons, syntheses.
- Editable public content lives in `wiki/pages/*.md` and `wiki/essays/*.md`.
- Each public content file carries frontmatter plus a structured bilingual JSON payload. After editing it, run `npm run wiki:build`; never hand-edit `generated/content.ts`.

### 3. The Schema

- `AGENTS.md` defines behavior, conventions, and workflows.
- If the workflow evolves, update this file instead of letting behavior drift implicitly.

## Standard Operations

For the current Wiki system, default to these operations:

### Ingest

Use when the user adds a source, article, note, transcript, or file to be processed.

Expected behavior:

- Read the source.
- Extract the key claims, entities, themes, and unresolved questions.
- Create or update a source summary page.
- Update related topic/entity/concept pages.
- Update `index.md`.
- Add a change entry with `npm run log:append < entry.md` (one new file in `logs/entries/`).
- Flag contradictions or superseded claims instead of silently overwriting them.

### Query

Use when the user asks a question against the knowledge base.

Expected behavior:

- Search the compiled wiki first, not the raw corpus first.
- Read `index.md` first when that file exists.
- Synthesize from relevant pages with citations.
- If the answer creates durable value, suggest or create a saved page for it.

### Lint

Use when the user asks for cleanup, maintenance, health check, or “what’s missing”.

Expected behavior:

- Look for contradictions.
- Look for stale claims.
- Look for orphan pages.
- Look for mentioned-but-undefined concepts/entities.
- Look for missing cross-links.
- Suggest high-value next sources or questions.

## Communication / Reasoning Frameworks

The user has defined three standing frameworks. Future agents should use them deliberately by scenario, not blend them carelessly.

The three mode definitions below are the project-local source of truth. Do not
assume a similarly named global skill exists. For Apple-inspired interface and
motion work, the repository-local specialist reference is:

- `.agents/skills/apple-design/SKILL.md`

Every repository-local `SKILL.md` path declared in this file is checked by
`npm run verify:skills`.

### 1. Cai Kang-Yong Mode

Use when the user asks:

- 怎么说更舒服
- 怎么回更得体
- 怎么拒绝不伤人
- 怎么安慰别人
- 怎么聊天不尴尬
- 如何把话说软一点但不失边界

Operating rule:

- Prioritize emotional reception over rhetorical correctness.
- Give directly sendable Chinese phrasing first.
- Default to 2 to 3 versions:
  - 温和版
  - 自然版
  - 有边界版
- First接住情绪，再处理事实，再给建议。

### 2. Hou Hei Mode

Use when the user asks about:

- 权力关系
- 利益博弈
- 看穿真实意图
- 职场试探
- 被人拿捏
- 甩锅、画饼、压价、借关系施压

Operating rule:

- First拆结构：谁想要什么，谁怕失去什么，谁有筹码。
- Then拆动作：试探、施压、拖延、甩锅、邀功、压价。
- Then give response options:
  - 识破但不点破版
  - 体面设边界版
  - 必要时强硬版
- Do not glamorize manipulation, retaliation, or illegal behavior.
- When evidence is weak, state clearly that it is a high-probability inference, not a fact.

### 3. Sun Tzu Mode

Use when the user asks about:

- 竞争策略
- 是否该硬碰
- 如何布局
- 如何低成本取胜
- 何时该打、拖、退、绕
- 如何建立先胜后战的局面

Operating rule:

- First define what “winning” means.
- Then define the battlefield: rules, constraints, resources, opponent advantage.
- Then compare options: 正打 / 绕打 / 拖 / 退 / 换场 / 结盟.
- Default output should include:
  - 最稳妥方案
  - 进攻方案
  - 保底撤退方案
- Always name the highest-risk wrong move.

## Mode Selection Rules

If multiple frameworks seem relevant, combine them in this order:

1. `Sun Tzu` for macro strategy and positioning.
2. `Hou Hei` for incentive, power, and hidden intent analysis.
3. `Cai Kang-Yong` for final phrasing and relationship-safe delivery.

Simple rule:

- Decide the battle with `Sun Tzu`.
- Read the people with `Hou Hei`.
- Say it well with `Cai Kang-Yong`.

### 4. Apple Editorial Layout Skill

Use `.agents/skills/apple-design/SKILL.md` when the user asks for:

- Apple-like layout logic
- premium minimalist product pages
- typography scale and font-size decisions
- hero / section / card hierarchy
- calmer, more spacious frontend UI
- reducing boxes, borders, badges, and visual noise

Operating rule:

- Do not copy Apple branding, exact copy, assets, or proprietary design.
- Use the high-level logic only: one idea per section, strong visual, short headline, restrained subtitle, clear CTA hierarchy, generous whitespace, and disciplined type scale.
- Treat desktop horizontal whitespace as part of the brand. Do not let sections, grids, tables, or pricing blocks fill the whole available width by default; prefer centered content islands, usually `max-width: 900px` to `1100px`, with quiet left and right space.
- Default Apple-like grids should usually use two columns on desktop and one on mobile unless the section is intentionally a compact catalog.

## Writing Rules For This User

- Default to Chinese unless the user explicitly asks for English.
- Avoid empty motivational phrasing.
- Avoid “high EQ” sounding like people-pleasing.
- Avoid long theory dumps when the user wants lines they can actually use.
- Prefer short sentences and practical wording.
- Preserve boundaries; do not optimize only for niceness.

### Story Style (for any story log: poker table, life, everyday moments)

Defined in `/brand-guide` section `09 / Story content`. The `/poker` Story log was the reference implementation until it was removed on 2026-09-23 at the owner's request, so there is no live example right now; the rules still apply to any future story content. Rules:

- Log the moment, not the score. Record what is worth retelling, not wins/brags.
- Only what really happened. Polish pacing and imagery, never invent events.
- Use short nicknames in the narrative (团长、罩仔、太子 / Cap, Lucky, Prince), same in both languages. Full character titles stay on the avatar cards.
- Short but cinematic: one beat per paragraph, let the key moment land, trim the rest.
- People first, cards second. The crew is the story.
- Not a hand history: no jargon, no solver review, no flexing. Read like a friend retelling the night.

If this voice evolves, update both `/brand-guide` section 06 and this block.

## Rules For Front-End Changes In This Repo

When editing the concept site or future UI:

- Treat `.firebaserc` as the Firebase project source of truth. Eden-owned Functions, Realtime Database rules, leaderboards, visitor data, and active client endpoints must use the dedicated `eden-tan` project; never point active configuration back to Poker or another sibling product project. Keep `npm run verify:firebase` aligned with this boundary when Firebase files change.
- Treat `HeaderControls` and the global menu rules in `styles/shared.css` as the navigation source of truth for every page. Compact-on-selection is the component default; sticky translucent surface, quiet divider, borderless Theme/Language controls, smooth transition, and mobile sizing belong to the shared layer. Route CSS may set content width and back destination only; do not copy or redefine the core menu system in page files.
- Keep the visual direction intentional and distinctive.
- Do not revert to generic SaaS gradients or default startup aesthetics.
- Preserve the knowledge-system feel: editorial, structured, durable, thoughtful.
- Preserve the Apple-like horizontal whitespace now defined in `/brand-guide`: avoid full-width content blocks by default, keep desktop sections calm and centered, and let left/right space remain visibly open.
- Preserve the Jiju app / Jiju cat style of CSS animation: visible objects should move clearly and simply. Do not use background fade, ambient glow layers, scanning lines, card-level colored gradient fades, or complex background-light motion as the default animation language. Put motion on concrete objects instead of the page or card background.
- When the UI needs more color categorization, use solid category rails, dots, chips, borders, and icon accents. Do not use colored gradient fades or glow backgrounds as the categorization mechanism.
- Favor content architecture that makes the core idea easier to grasp:
  - problem
  - architecture
  - operations
  - examples
  - tooling
  - workflow

### CSS Art Maintenance Rules

When adding or editing large CSS visuals, treat them as a maintainable asset system, not incidental page CSS:

- Do not keep growing `index.css` with new CSS art blocks by default.
- Put reusable or complex CSS visuals under `styles/css-art/`.
- Register reusable CSS art in `css-art.registry.ts`, and read `docs/css-art-system.md` before adding, moving, or reusing CSS art. Future agents should import from `components/css-art` or the registry instead of copying component markup into page files.
- One visual family should have one file, for example `life-os-signals.css`, `projects-icons.css`, or `jiju-cat.css`.
- Keep page layout CSS separate from CSS art. Page spacing, grids, cards, and typography stay in page/style files; illustrated objects, animation layers, and visual keyframes belong in the CSS art file.
- Use namespaced class names. Existing project namespaces such as `.life-rpg-*`, `.projects-*`, `.jiju-*`, and `.conway-*` are acceptable. Do not introduce generic art classes like `.cloud`, `.card`, `.node`, or `.line`.
- Each CSS art component should have a stable wrapper with a fixed aspect ratio or fixed icon size, then internal layers. Avoid layout shifts from animated children.
- Totem, sigil, glyph, symbolic, or emblem-style CSS art should default to a transparent background, like a transparent PNG. Do not add a fixed app-icon background, visible frame, or heavy outer box unless the user explicitly asks for an app icon or framed badge.
- Fixed backgrounds are appropriate for app icons and literal scenes. Card/banner visuals may use a background only when the background is part of the scene, not just a decorative container.
- For animation, prefer `transform`, `translate`, `rotate`, `scale`, and `opacity`. Avoid animating `width`, `height`, `top`, `left`, large `box-shadow`, heavy `filter`, or large moving gradients unless the visual is isolated and tested.
- Every animated CSS art family must support `prefers-reduced-motion`.
- Every CSS art family used in public pages must work in both light and dark mode.
- Keep complexity tiered:
  - icon: roughly 5 to 12 DOM layers
  - card/banner: roughly 12 to 35 DOM layers
  - hero/feature visual: roughly 35 to 80 DOM layers
  - pure CSS illustration experiments above that belong on a dedicated page or isolated component, not repeated inside grids.
- Before adding a new CSS art family, check whether an existing one can be extended with variables or modifiers instead of starting from scratch.

### Page CSS Maintenance Rules

When page-level CSS grows beyond a small local patch, split it by route instead of continuing to expand `index.css`:

- Put route/page layout CSS under `styles/pages/`.
- One route or closely related page family should have one file, for example `home.css`, `projects.css`, `life-os.css`, or `etreporthub.css`.
- Treat `index.css` as the CSS main manifest only. It should import Tailwind, shared layers, CSS art, and page files; do not grow it with implementation blocks.
- Keep theme variables in `styles/tokens.css`, global page-shell/body behavior in `styles/base.css`, shared UI variables/components in `styles/shared.css`, app-wide dark utility overrides in `styles/theme-overrides.css`, and app-wide motion utilities/keyframes in `styles/motion.css`.
- Page files should contain layout, typography scale, spacing, grids, panels, CTAs, page-specific dark mode, and responsive overrides.
- CSS art files should remain under `styles/css-art/`; do not mix illustrated object layers or art keyframes into page files.
- Keep imports in `index.css` grouped in this order: Tailwind, `tokens.css`, `base.css`, `shared.css`, `theme-overrides.css`, `motion.css`, CSS art files, then page files.
- When extracting page CSS, preserve behavior first. Do not redesign while moving styles unless the user explicitly asks for visual changes.

### Route / SEO Registry Rules

When adding, hiding, renaming, or changing a route:

- Treat `seo-routes.ts` as the route registry source of truth.
- Keep client SEO copy, index/noindex status, sitemap inclusion, README route docs, and visible page entries consistent with that registry.
- Keep the route name, visible title, SEO copy, and implemented model conceptually identical. Do not conflate adjacent systems under one familiar name; if both systems remain useful, split them into explicit routes and cross-link them.
- If a route should be reachable but hidden from discovery, keep the React route but set `index: false` and `sitemap: false` in `seo-routes.ts`, then remove visible navigation/card entry points as needed.
- Do not maintain separate ad hoc route lists in `vite.config.ts`, `seo.ts`, README, or page components without checking the registry first.
- Every indexable non-Markdown route needs its own bilingual static body in `seo-static-content.ts`, mirroring what the React page actually renders (modules, numbers, section order). When a product page's substance changes, update that entry and bump the route's `dateModified` in `seo-routes.ts` in the same change.
- Freshness is per route, not sitewide: Wiki/Notes dates live in Markdown frontmatter (`published` / `updated`), other routes in `seo-routes.ts` (`datePublished` / `dateModified`). `SITE_CONTENT_LASTMOD` is only the homepage date and the fallback, and it must be at least as new as every route's `dateModified`.
- Share images are route families in `OG_IMAGES` (`public/og/*.jpg`, 1200×630); pick an existing family via `og:` before adding a new file.

## Notes Format (reading motion)

Every Notes article (`/notes/:slug` essays and the Wiki pages published as notes) renders through the shared reading layer in `components/NotesReading.tsx`, styled in the "Notes format" block of `styles/pages/notes.css`. Readers get, automatically:

- a sticky reading bar under the menu: progress line, `03 / 05` counter, current section title, and a section map whose marker slides to the section being read (dots are anchor links);
- scroll reveals and a section-number pop with a rail that draws down (the thesis card "一句话结论" stays plain, no underline);
- citation previews: hovering or focusing `[n]` shows that reference's label in place (desktop);
- a closing "你刚读完 / What you just read" checklist built from the section titles.

Authoring rule: **every section marks exactly one key sentence with `==…==` in both `en` and `zh`** (essays: `paragraphs`; Wiki notes: `points`). It renders as a highlighter sweep. Pick the line a skimming reader most needs, keep en/zh marks equivalent, keep the mark inside one paragraph, and never split a `[[n]]` / `[[note:…]]` token. `scripts/wiki/lint.mjs` rejects unclosed marks; `seo-prerender.ts` strips them from static HTML (unit-tested).

Color: the Notes pages use one content theme, `--notes-accent` / `--notes-accent-soft` (dark: pink, light: green). The key-sentence highlighter, the thesis card, the reading bar, and the selected Theme / Language pills in the menu all follow it; do not reintroduce the site-wide mint/orange on Notes pages.

Motion stays on concrete objects (bar, marker, number, rail, highlighter, ticks); start states only apply after JS adds `.notes-motion-ready`, and everything is off under `prefers-reduced-motion`. Theme colors must use `--theme-page` / `--theme-text-primary` (the older `--eden-paper` / `--eden-ink` names in notes.css are not defined anywhere).

### Notes storyboard (optional, per essay)

An essay may add a top-level `storyboard` array to its JSON payload, one frame per section in section order: `{ "motif", "kind", "beat": { "en", "zh" } }`. The article then shows, after the thesis card, one large engraved stage that plays the selected frame, a caption (kind chip, section title, the story beat, and that section's `==key sentence==`), and a strip of static thumbnails; while reading, the stage follows the current section.

- `kind` classifies the section's key point. Evidence notes: `method`, `fact` (documented), `overturned`, `gap` (no evidence), `verdict`. General notes: `idea`, `example` (a case), `principle`, `warning`, `action` (practice).
- `motif` picks the main subject, each a named piece of mathematics, from `styles/css-art/notes-storyboard.css` (registry category `notes-storyboard`): `mandelbrot` (zₙ₊₁ = zₙ² + c; a simple rule, endless detail), `spiral` (Fibonacci squares + golden spiral; accumulation), `catenoid` (soap film r = c·cosh(z/c) between two rings that snaps when pulled apart; a case that could not hold), `catenary` (chain y = a·cosh(x/a) with a missing link; an unproven chain), `penrose` (a Penrose sun growing in the overlap of two circles; real overlap, no repeating chain). Also `phyllotaxis` (89 seeds at n·137.5°, radius c√n; many small units, one rule) and `lissajous` (x = sin(3t + π/2), y = sin(2t); rhythm, feedback, two signals). Inside one note never repeat a motif in consecutive sections and use any motif at most twice. A new motif needs a scene in `components/css-art/index.tsx`, CSS in that family file, a registry entry, and the motif name added to `scripts/wiki/lint.mjs` and the `storyboard` type in `scripts/wiki/build.mjs`.
- `beat` is one cinematic line that retells the section as a scene. It must stay true to the section: no new facts, no invented events.
- Style (owner's choice, 2026-09-29): an ancient-grimoire engraving with **no outlines**: forms are modelled only by hatching and tone (no contour strokes, no double-rule frame, no ring lines), the main subject floats gently, gold motes drift up, and the formula runes hang in a loose, partly faded ring. Every frame has **three subjects**: the mathematical main subject plus two supporting props on the ground (library: quill, candle, scroll, crystal ball, hourglass, key, astrolabe), with a crescent moon and twinkling sparks. The ring carries the motif's **real formula written like runes** (a deliberate exception to the skills' "no text inside the art" rule: formulas only, never words). Keep it generic magic: no franchise symbols, crests or logos.
- Art rules otherwise come from the engraved-ui / golden-engraving skills: one stage is the screen's protagonist, one named motif per frame, no people, scenes act only when selected (`.is-active`), only the slow circle/rays and tiny sparks/flame run on their own, thumbnails are static (no runes, sparks or corners), and the ink follows the Notes theme (light: green on cream, dark: pink on rose-black), gold foil being the one extra color.
- **Page-level art direction ("grimoire" layout, 2026-09-29).** A note with a storyboard is designed at page scale, not as boxes: `pages/ContentPages.tsx` adds `.notes-grimoire` to the page root and renders (1) `NotesGrimoireCover` (styles/css-art/notes-grimoire.css) full-bleed behind the hero: sky + orrery with formula runes, a CSS-3D grimoire whose leaves turn, near candles and books; the title sits on the left half; (2) a fixed page-wide golden-ratio grid and huge dotted spiral arcs; (3) the thesis as stacked parchment with a wax seal; (4) a storyboard stage that tilts in 3D and separates its layers with the pointer; (5) marginal medallions (≥1280px) that replay each section's scene while it is read. Depth comes from layers, parallax (`components/NotesDepth.ts` writes `--nd-px`, `--nd-py`, `--nd-scroll` on the page root; fine pointers only, off under reduced motion) and cast shadows — never from glow backgrounds.
- **Dimensional grain (立体颗粒).** Grain is a depth cue: far cover layers carry fine grain and near layers coarse grain (`--g-size`), solid props are modelled with stipple dots whose density rises away from an upper-left light, and a faint film grain jitters over the cover. Noise is generated in code (inline SVG `feTurbulence`, no images). In dark mode never soft-light / overlay a grey noise over near-black surfaces — it lifts #141211 to grey; use the dark-speck-only noise (alpha from the noise, RGB black) with normal blending, and measure the average background colour after any grain change.
- **Rolled out to every Note (2026-09-29):** all 11 essays and the 4 Wiki pages published as notes (button-feedback, background-music, firebase-lifetime-storage, vite) carry a `storyboard`; the Wiki note branch of `WikiPage` renders the same grimoire layout (cover, grid, seal, storyboard, marginalia, depth). The cover's orrery ring is built from the formulas of the motifs the note uses (`coverFormula`). A new Note is expected to ship with its storyboard. Other essays roll out after the style is approved.

## Current Wiki Structure

- `raw/`: immutable, commit-safe source inputs.
- `wiki/pages/`: public `/wiki/:slug` Markdown sources.
- `wiki/essays/`: public `/notes/:slug` Markdown sources.
- `wiki/index.md`: human-readable content map.
- `generated/content.ts`: compiler output consumed by React; never edit manually.
- `scripts/wiki/build.mjs`: deterministic Markdown-to-TypeScript compiler.
- `scripts/wiki/lint.mjs`: schema, citation, bilingual field, route, and cross-link checks.

Keep future templates for source summaries, concepts, entities, and comparisons
simple and markdown-first. Any schema expansion must update both the compiler and
lint gate in the same change.

## Decision Standard

Do not optimize for sounding smart.
Optimize for:

1. preserving truth
2. reducing confusion
3. making future work easier
4. producing reusable knowledge instead of disposable chat

## Portfolio Workspace Execution Rules (Eden)

The following rules are mandatory for future agents in this repository:

### 1) Required startup reads

Before making changes, read these files first:

1. `README.md` (current runnable project truth)
2. `soul.md` (collaboration rules to reduce rework)
3. `state/current.md` (current architecture, verification, and known risks)
4. `logs/index.md` and the newest files in `logs/entries/` (`ls logs/entries | tail -20`; open a monthly archive only when the task needs older detail)

### 2) Do not stop at single-page edits

If a request likely affects multiple pages/components/routes:

- scan related pages first
- apply consistent updates across all impacted pages
- avoid “fix one page, miss sibling pages” behavior

### 3) Verification is required

After substantive edits:

- run `npm run check` (the executable harness: policy checks, unit tests, typecheck, production build, and built-site smoke checks)
- provide concrete local verification URL(s) to the user
- explicitly state what the user should see
- do not use screenshot verification unless the user explicitly asks for it; prefer build output, keyword checks, code checks, and local URL instructions

The machine-enforced checks live under `scripts/harness/`, `scripts/wiki/`, and
`.github/workflows/`. If prose and an executable gate disagree, fix both in the
same change rather than silently bypassing the gate.

### 4) Logging is mandatory

**Since 2026-09-28: one entry = one new file in `logs/entries/`.** The monthly
`logs/2026-*.md` files and `logs/index.md` are frozen history — do not append to them.
The root `log.md` is a stable pointer and must not receive entries either.

```bash
npm run log:append < entry.md   # creates logs/entries/<YYYY-MM-DD>-<HHMMSS>-<4 hex>.md; ID + `## date — title` heading are written by the script
npm run log:check               # duplicate IDs across monthly files + entry files; every entry file has a `## date` heading
```

**Why a file per entry:** several agents / branches work on this repo at once. When every PR
appended to the end of the same monthly file (and regenerated the same `logs/index.md`), every
pair of PRs conflicted at EOF and auto-merge stopped. New files never collide.

**Hard rules — breaking them does not error, it fails silently:**

1. **Always create entries with the script, never by hand.** It opens the file with `wx`
   (never overwrites), picks the date/time in **Asia/Kuala_Lumpur** (same as `check-log.mjs`),
   and assigns a collision-free ID `E-<YYYY-MM-DD>-<HHMMSS>-<4 hex>`. Do **not** go back to
   "today's max number + 1": other branches' numbers are invisible, so +1 collides.
2. **Do not rename entry files.** The file name must start with `YYYY-MM-DD-`: the
   personal-dashboard scanner only picks `^\d{4}-\d{2}-\d{2}-.+\.md$` from `logs/entries/`
   and merges them into Eden automatically (no `log_includes` change needed; the
   `logs/2026-*.md` glob does not match the subdirectory, which is intended).
3. **Every entry file keeps its `## YYYY-MM-DD — <title>` heading.** The dashboard aggregates
   **by `##` day**; a file without one is dropped silently. `verify:log` checks it.
4. **Never gitignore `logs/` or `logs/entries/`.** The entries are the change history;
   ignoring them would silently drop every new entry from git, the dashboard and the gate.

`verify:log` passes when changed project files come with at least one new `logs/entries/`
file carrying the rag-v1 fields. Entry files are intentionally **not** listed in
`logs/index.md` — an index that every PR rewrites would bring the conflicts back. The legacy
path (append to the current month + `npm run log:index`) is still accepted by the gate but
should not be used.

**Format** (the script writes the `##` heading and the ID; you only supply `### Title` + fields on stdin): a `## YYYY-MM-DD — Title` heading, then one `### [E-YYYY-MM-DD-HHMMSS-xxxx] Title` entry carrying
the seven rag-v1 fields — `type` `scope` `impact` `changed` `ripples` `verified` `keywords`.
Of those, **`ripples` is the most valuable and the one most often left empty**:

> After this change, **whose assumptions broke**? **Who must change with it**?
> **Who will get burned next time for not knowing this**?
> If you cannot answer, write "none" — do not leave it blank.

`npm run verify:log` accepts **both** rag-v1 and the pre-2026-09 five-field Chinese shape
(改动 / 原因 / 影响 / 验证 / 后续), so the existing history in `logs/` stays valid.
History is **not** backfilled — only new entries follow rag-v1.

Each `###` entry is recalled on its own by retrieval, without the surrounding context — so
repeat the subject and never write "it / the above / that thing earlier".

### 5) Keep future-agent handoff durable

When workflow rules evolve, update both:

- `AGENTS.md` (hard operational rules)
- the relevant executable check or workflow

Update `soul.md` only when the user's durable collaboration preference changes;
do not duplicate technical policy there.

Do not leave critical execution assumptions only in chat history.

### 6) Use the protected operator workflow

For normal repository changes:

1. Edit directly in the current working directory — do **not** create a branch or worktree before editing (the user's dev server hot-reloads the working copy). Run `git status` first and note changes that are not yours (another session may be working here).
2. Make the scoped change and add the required log entry (`npm run log:append < entry.md`).
3. Stage **only your own files**: `git add <file> …`. Never `git add -A` / `git add .` / `git add --all`; other sessions' changes stay in the working tree.
4. Run `npm run publish -- "fix: commit title"`. It commits **only what is staged** (and refuses, listing the changed files, when nothing is), runs `ready` and the full harness, and — if you are on the default branch — creates the task branch `<type>/<YYYYMMDD>-<desc>` from `origin/<default>` at that moment, carrying your changes. It then pushes, opens the PR, and **stops**.
5. The PR merges itself after CI: GitHub native auto-merge / the personal-dashboard PR auto-merge merge once the required `verify` check passes. If CI fails, fix on the same branch and run `publish` again. Do not merge the PR yourself unless the user explicitly asks — only then pass `--merge` (waits for `verify`, squash-merges, follows the Pages deploy and live checks).
6. In a non-interactive Agent environment, inspect `git status --short` first and pass `--yes` explicitly. Never add `--yes` by habit.

`publish` must never push the default branch directly. Keep GitHub branch protection and the required `verify` check enabled; the command exists to orchestrate that protected path, not bypass it. Use `--dry-run` for a no-write preview. `npm run task:new -- "task name"` (branch off the default branch before editing) still exists but is **optional**; nothing requires it. The executable behavior is documented in `docs/operator-workflow.md` and implemented under `scripts/workflow/`.
