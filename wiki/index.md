# Eden Wiki Index

This directory is the editable, Markdown-first content source for the public Wiki and Notes routes.

## Public Wiki entry points

`/wiki` is a topic map; `/notes` is the essay archive. The four featured entries link to the existing Notes articles, without duplicating their bodies:

- Systems — [Turn chaos into systems](essays/turn-chaos-into-systems.md)
- Judgment — [Judgment is not knowing more](essays/judgment-is-not-more-information.md)
- People — [Human nature is a design condition](essays/human-nature-is-a-design-condition.md)
- Strategy — [Win before you fight](essays/win-before-you-fight.md)

The selection and bilingual index copy live in `components/wiki-content.ts`. The six technical pages below remain at their original URLs under the collapsed **Build experience / 构建经验** section.

## Wiki pages

- [Vite as the vibe-coding engine](pages/vite.md) — `/wiki/vite`
- [Background music changes the room](pages/background-music.md) — `/wiki/background-music`
- [Click button feedback is part of trust](pages/button-feedback.md) — `/wiki/button-feedback`
- [Firebase lifetime storage as table memory](pages/firebase-lifetime-storage.md) — `/wiki/firebase-lifetime-storage`
- [Reusable skills across projects](pages/skills.md) — `/wiki/skills`
- [Tag Registry and RAG flow](pages/rag-flow.md) — `/wiki/rag-flow`

## Essays

- [Protected but not recognised: the Rohingya in Malaysia](essays/rohingya-malaysia-statelessness.md) — `/notes/rohingya-malaysia-statelessness`
- [Rights without a state: from the Jewish experience of statelessness to today's refugee system](essays/refugee-statelessness-evidence-map.md) — `/notes/refugee-statelessness-evidence-map`
- [Three rivers, one confluence: the Bible, Israel, and America's Middle East politics](essays/bible-israel-us-evidence-map.md) — `/notes/bible-israel-us-evidence-map`
- [Overlap is not command: an evidence map of neocons, Israel's right, and the Iraq War](essays/iraq-war-evidence-map.md) — `/notes/iraq-war-evidence-map`
- [The "mad bull" hits a wall: Korea's 2026 market, and the gap between price and value](essays/korea-2026-crash.md) — `/notes/korea-2026-crash`
- [Old scam, new clothes: MBI and the coin that "only goes up"](essays/mbi-case.md) — `/notes/mbi-case`
- [An empire built on borrowed money: the Carrian case](essays/carrian-case.md) — `/notes/carrian-case`
- [Is modern finance a Ponzi scheme?](essays/modern-finance-ponzi.md) — `/notes/modern-finance-ponzi`
- [What is wealth, really?](essays/what-is-wealth.md) — `/notes/what-is-wealth`
- [Turn chaos into systems](essays/turn-chaos-into-systems.md) — `/notes/turn-chaos-into-systems`
- [Judgment is not knowing more](essays/judgment-is-not-more-information.md) — `/notes/judgment-is-not-more-information`
- [Human nature is a design condition](essays/human-nature-is-a-design-condition.md) — `/notes/human-nature-is-a-design-condition`
- [Win before you fight](essays/win-before-you-fight.md) — `/notes/win-before-you-fight`
- [256 rules, one byte each](essays/elementary-cellular-automata-256-rules.md) — `/notes/elementary-cellular-automata-256-rules`
- [Build loops, not lists: systems thinking for solo founders](essays/systems-thinking-for-solo-founders.md) — `/notes/systems-thinking-for-solo-founders`
- [Penney's game: why the second player wins](essays/penneys-game-probability-intuition.md) — `/notes/penneys-game-probability-intuition`
- [Still, pulsing, moving: the three species of Life](essays/conway-game-of-life-patterns-explained.md) — `/notes/conway-game-of-life-patterns-explained`
- [Rule 30: one line of logic that never settles](essays/elementary-cellular-automata-rule-30-complexity.md) — `/notes/elementary-cellular-automata-rule-30-complexity`

## Editing workflow

1. Edit the relevant Markdown source.
2. Keep the frontmatter ID, route, type, and order aligned with its JSON payload.
3. Run `npm run wiki:build`.
4. Run `npm run check`.
