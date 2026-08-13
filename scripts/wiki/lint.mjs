import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { exists, fail, pass, root } from '../harness/lib.mjs';

if (!exists('wiki')) {
  pass('Wiki Markdown scaffold is not active yet; hard-coded Wiki routes are covered by verify:routes');
  process.exit(0);
}

function markdownFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? markdownFiles(target) : entry.name.endsWith('.md') ? [target] : [];
  });
}

const files = markdownFiles(path.join(root, 'wiki'));
const ids = new Map();
const links = [];
const problems = [];

for (const file of files) {
  const source = readFileSync(file, 'utf8');
  const relative = path.relative(root, file);
  if (relative === 'wiki/index.md' || relative === 'wiki/log.md') continue;
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatter) {
    problems.push(`${relative} has no frontmatter`);
    continue;
  }
  const id = frontmatter[1].match(/^id:\s*([^\s]+)\s*$/m)?.[1];
  if (!id) problems.push(`${relative} has no frontmatter id`);
  else if (ids.has(id)) problems.push(`${relative} duplicates id ${id} from ${ids.get(id)}`);
  else ids.set(id, relative);
  for (const match of source.matchAll(/\[\[note:([^\]|]+)(?:\|[^\]]+)?\]\]/g)) {
    links.push({ from: relative, target: match[1] });
  }
}

for (const link of links) {
  if (!ids.has(link.target)) problems.push(`${link.from} links to missing note:${link.target}`);
}

if (problems.length > 0) fail('Wiki lint failed:', problems);
else pass(`${files.length} Wiki Markdown file(s) and ${links.length} internal link(s) are valid`);
