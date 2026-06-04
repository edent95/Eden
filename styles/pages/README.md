# Page CSS

This folder holds route-level layout and presentation CSS.

## Rules

- One route or closely related page family per file.
- Keep page layout, typography scale, spacing, grids, panels, CTAs, and responsive overrides here.
- Keep CSS art and illustrated object keyframes in `styles/css-art/`.
- Keep global theme tokens, app-wide base styles, and broad utilities in `index.css` until they are intentionally extracted into base/token files.
- Preserve behavior when extracting. Do not redesign during a structural move unless the user asks for visual changes.

## Current Files

- `home.css`: homepage editorial layout, hero typography, homepage panels/cards, CTAs, footer, and mobile homepage overrides.
- `jiju-pet.css`: `/jiju-pet` product narrative layout, proof rows, system cards, chapters, CTAs, and mobile overrides.
- `life.css`: `/life` editorial video archive layout, featured video stage, archive cards, CTAs, dark mode, and mobile overrides.
- `projects.css`: `/projects` editorial layout, project cards, readout cards, CTAs, and mobile projects overrides.
