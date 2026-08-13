import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { root } from './lib.mjs';

const sourcePath = path.join(root, 'log.md');
const source = readFileSync(sourcePath, 'utf8');
const matches = [...source.matchAll(/^#{2,3} (20\d{2}-\d{2}[^\n]*)$/gm)];
if (matches.length === 0) throw new Error('No dated log entries found; migration may already be complete.');

const groups = new Map();
for (const [index, match] of matches.entries()) {
  const end = matches[index + 1]?.index ?? source.length;
  const block = source.slice(match.index, end).trim();
  const month = match[1].slice(0, 7);
  if (!groups.has(month)) groups.set(month, []);
  groups.get(month).push(block);
}

const logsDirectory = path.join(root, 'logs');
mkdirSync(logsDirectory, { recursive: true });
for (const [month, entries] of groups) {
  const target = path.join(logsDirectory, `${month}.md`);
  if (existsSync(target)) throw new Error(`${path.relative(root, target)} already exists`);
  writeFileSync(target, `# Change Log — ${month}\n\n${entries.join('\n\n')}\n`, 'utf8');
}

writeFileSync(sourcePath, `# Change Log

The historical monolith was losslessly split into monthly files under \`logs/\`.

- Read [the recent index](logs/index.md) first.
- Append new work to the current \`logs/YYYY-MM.md\` file.
- Run \`npm run log:index\` after adding an entry.
- Do not rewrite or delete archived history.

The executable rule is enforced by \`npm run verify:log\`.
`, 'utf8');
console.log(`✓ Migrated ${matches.length} log entries into ${groups.size} monthly files`);
