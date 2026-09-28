---
project: Eden
title: eden
status: done
updated: '2026-09-14'
log_format: rag-v1
log_includes:
  - logs/2026-*.md
progress: 0
tags: []
milestones: []
---
# Change Log

The historical monolith was losslessly split into monthly files under `logs/`.

- Read [the recent index](logs/index.md) first, then the newest files in `logs/entries/`.
- New work: `npm run log:append < entry.md` creates one file in `logs/entries/` (since 2026-09-28).
- Do not append to the monthly files, and do not rewrite or delete archived history.

The executable rule is enforced by `npm run verify:log`.
