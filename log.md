---
project: Eden
title: eden
status: todo
updated: '2026-08-31'
log_includes:
  - logs/2026-*.md
---
# Change Log

The historical monolith was losslessly split into monthly files under `logs/`.

- Read [the recent index](logs/index.md) first.
- Append new work to the current `logs/YYYY-MM.md` file.
- Run `npm run log:index` after adding an entry.
- Do not rewrite or delete archived history.

The executable rule is enforced by `npm run verify:log`.
