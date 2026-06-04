# CSS Art System

This folder holds complex CSS visuals that are reusable or likely to keep growing.

## Rules

- One visual family per file.
- Keep page layout in page-level CSS; keep illustrated objects, animation layers, and keyframes here.
- Use namespaced class names such as `.life-rpg-*`, `.projects-*`, `.jiju-*`, or `.conway-*`.
- Give every visual a stable wrapper size or aspect ratio.
- Totem / sigil / glyph / symbolic / emblem visuals default to transparent background, like a transparent PNG.
- Use a fixed background only for app icons, literal scenes, framed badges, or banners where the background is part of the visual meaning.
- Prefer `transform` and `opacity` for motion.
- Support light mode, dark mode, and `prefers-reduced-motion`.
- Do not repeat heavy pure CSS illustrations inside dense grids.

## Complexity Tiers

- Icon: roughly 5 to 12 DOM layers.
- Card/banner: roughly 12 to 35 DOM layers.
- Hero/feature visual: roughly 35 to 80 DOM layers.
- Larger pure CSS illustration experiments should live on a dedicated page or isolated component.

## Current Files

- `home-jiju-scene.css`: homepage 21:9 Jiju cat scene hero banner, cameo cat, ambient grass/cloud/butterfly/leaf/star animation, and related keyframes.
- `home-interest-totems.css`: homepage Interests transparent totems, currently Life OS black-to-gold power-up figure, Analog Tech vibrating gramophone, Pattern Archive small-beast-to-fire-dragon evolution, Conway broken pyramid, Life Notes Bagua mirror glyph, and related keyframes.
- `home-life-magic.css`: homepage Life OS 1:1 heart-beat into magic circle icon, geometry rings, nodes, sparks, and related keyframes.
- `home-projects-blueprint.css`: homepage Projects Hub 1:1 blueprint icon, grid, plan lines, dimension marks, scan motion, and related keyframes.
- `life-os-signals.css`: Life OS player signal cards, WIND-57 cloud/sea/island banner, PHASE-RULE contract banner, and related keyframes.
- `projects-icons.css`: `/projects` CSS app icons for Jiju, Friday Poker Club, ETReportHub, and CRM Intelligence System.
