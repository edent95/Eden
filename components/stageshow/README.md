# stageshow kit (vendored)

Copied from the stageshow skill (`~/.claude/skills/stageshow/kit`, MIT, see the skill's LICENSE / NOTICE).
Was used by `components/IGamingAtlasTermsDemo.tsx` on `/igaming/atlas`; that page moved to https://asiaigaming.com/atlas/ on 2026-11-25, so nothing on this site imports the kit right now.

- Every kit file starts with `// @ts-nocheck`: Eden does not install `@types/react`, so the kit's
  `HTMLAttributes`-based prop types do not resolve. Don't edit the kit; restyle parts from the demo.
- To update: re-copy the skill's `kit/` folder and re-add the header line.
