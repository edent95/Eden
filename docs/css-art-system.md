# CSS Art System

This repo treats CSS art as reusable visual assets. Future agents should use this file and `css-art.registry.ts` before touching page code.

## Where To Start

1. Check `css-art.registry.ts`.
2. Import the component from `components/css-art`.
3. Confirm the CSS file listed in the registry is already imported through `index.css`.
4. Use `/project-css` as the visual review page after changes.

Do not copy an existing CSS art component into a page just to reuse it. Add or reuse a registry entry instead.

## Main Files

- `components/css-art/index.tsx`: React wrappers and DOM layers for reusable CSS art.
- `css-art.registry.ts`: source of truth for IDs, titles, component references, background type, ratio, CSS file, and labels.
- `styles/css-art/`: visual styling, animation layers, light/dark mode, and `prefers-reduced-motion`.
- `styles/pages/`: page layout only. Do not put illustrated object layers here.
- `/project-css`: internal direct review page for currently registered CSS art.

## Registry Fields

Each reusable visual should have:

- `id`: stable kebab-case ID.
- `title`: public display name.
- `category`: `project-icon`, `home-system`, `home-interest`, `office-icon`, `math-magic-icon`, `elemental-icon`, or `wiki-icon`.
- `sourceRoute`: where the visual appears first.
- `ratio`: use `1:1` for icons, `transparent-totem` for transparent symbolic art.
- `background`: `framed`, `transparent`, or `scene`.
- `supportsDarkMode`: should be `true` for public page visuals.
- `supportsReducedMotion`: should be `true` for animated visuals.
- `cssFile`: exact CSS file path.
- `Component`: React component from `components/css-art`.
- `label`: bilingual accessible label.
- `copy`: bilingual usage note.

## Background Rules

Use `background: 'framed'` for app icons with a fixed icon surface.

Use `background: 'transparent'` for totems, sigils, glyphs, symbols, and emblems. These should behave like transparent PNG assets and should not add visible outer boxes, generic app-icon frames, or heavy shadows.

Use `background: 'scene'` only when the background is part of the illustration itself.

## Adding A New CSS Art

1. Add a component to `components/css-art/index.tsx`.
2. Add or update a family CSS file under `styles/css-art/`.
3. Ensure `index.css` imports that CSS file.
4. Add a registry entry in `css-art.registry.ts`.
5. If it should appear on `/project-css`, put it in an existing category or extend that page intentionally.
6. Verify `prefers-reduced-motion` and light/dark mode.
7. Run `npm run build`.
8. Append `log.md`.

## Reusing Existing CSS Art

Use the registry:

```tsx
import { getProjectCssArtByProjectTitle } from './css-art.registry';

const item = getProjectCssArtByProjectTitle('Jiju');
const Icon = item?.Component;

return Icon ? <Icon label={item.label[language]} /> : null;
```

For fixed lists, import the category:

```tsx
import { homeInterestCssArtItems } from './css-art.registry';

{homeInterestCssArtItems.map((item) => {
  const Icon = item.Component;
  return <Icon key={item.id} label={item.label[language]} />;
})}
```

## Current Registered CSS Art

- `projects-jiju`
- `projects-friday-poker-club`
- `projects-etreporthub`
- `projects-crm-intelligence-system`
- `home-projects-hub-blueprint`
- `home-life-os-magic`
- `home-life-os-power-up`
- `home-analog-tech-gramophone`
- `home-pattern-archive-bagua`
- `home-conway-pyramid-break`
- `office-desk-calendar`
- `office-inbox-tray`
- `office-report-sheet`
- `office-team-board`
- `office-contract-seal`
- `office-workflow-automator`
- `math-prime-sigil`
- `math-vector-gate`
- `math-integral-spell`
- `math-pi-orb`
- `math-fractal-rune`
- `math-matrix-portal`
- `element-fire`
- `element-water`
- `element-wind`
- `wiki-vite`
- `wiki-background-music`
- `wiki-button-feedback`
- `wiki-firebase-storage`
- `wiki-skills`
- `wiki-rag-flow`
