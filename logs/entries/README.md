# logs/entries

One change-log entry per file, created by `npm run log:append < entry.md`
(`scripts/harness/log-append.mjs`). Do not hand-write, rename, or gitignore these files.

- File name: `<YYYY-MM-DD>-<HHMMSS>-<4 hex>.md` (Asia/Kuala_Lumpur time). It must start with
  the date — the personal-dashboard scanner only picks `^\d{4}-\d{2}-\d{2}-.+\.md$` here and
  merges this directory into Eden's log automatically.
- Content: a `## YYYY-MM-DD — <title>` heading, then `### [E-<date>-<HHMMSS>-<4 hex>] <title>`
  with the rag-v1 fields. The ID is time + random, so branches never collide.

Why: several branches / agents write logs at the same time. When they all appended to the
same monthly `logs/YYYY-MM.md`, every PR pair conflicted at the end of that file. New files
never touch each other. The monthly files and `logs/index.md` stay as frozen history.
