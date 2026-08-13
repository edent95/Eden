import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { root } from '../harness/lib.mjs';

function parseMarkdown(file) {
  const source = readFileSync(file, 'utf8');
  const frontmatterMatch = source.match(/^---\n([\s\S]*?)\n---/);
  const payloadMatch = source.match(/```json\n([\s\S]*?)\n```/);
  if (!frontmatterMatch || !payloadMatch) {
    throw new Error(`${path.relative(root, file)} must contain frontmatter and one JSON payload block`);
  }
  const metadata = Object.fromEntries(
    frontmatterMatch[1].split('\n').filter(Boolean).map((line) => {
      const separator = line.indexOf(':');
      if (separator < 1) throw new Error(`${path.relative(root, file)} has invalid frontmatter: ${line}`);
      return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
    }),
  );
  return {
    file,
    metadata,
    data: JSON.parse(payloadMatch[1]),
  };
}

function readCollection(directory) {
  const absolute = path.join(root, directory);
  return readdirSync(absolute)
    .filter((name) => name.endsWith('.md'))
    .map((name) => parseMarkdown(path.join(absolute, name)))
    .sort((left, right) => Number(left.metadata.order) - Number(right.metadata.order));
}

export function renderGeneratedContent() {
  const wiki = readCollection('wiki/pages').map((entry) => entry.data);
  const essays = readCollection('wiki/essays').map((entry) => entry.data);
  return `/* This file is generated from the Wiki Markdown sources by scripts/wiki/build.mjs. */
/* Edit the Markdown sources, then run npm run wiki:build. */

export type SiteEssayNoteData = {
  slug: string;
  title: Record<'en' | 'zh', string>;
  summary: Record<'en' | 'zh', string>;
  category: Record<'en' | 'zh', string>;
  thesis: Record<'en' | 'zh', string>;
  sources: string[];
  sections: Array<{
    title: Record<'en' | 'zh', string>;
    paragraphs: Record<'en' | 'zh', string[]>;
  }>;
  originalSource?: { url: string; label: Record<'en' | 'zh', string> };
  references?: Array<{ id: string; url: string; label: Record<'en' | 'zh', string> }>;
  referencesNote?: Record<'en' | 'zh', string>;
};

export const wikiEntries = ${JSON.stringify(wiki, null, 2)} as const;

export const siteEssayNotes: SiteEssayNoteData[] = ${JSON.stringify(essays, null, 2)};
`;
}

const outputPath = path.join(root, 'generated/content.ts');
const expected = renderGeneratedContent();
if (process.argv.includes('--check')) {
  const actual = readFileSync(outputPath, 'utf8');
  if (actual !== expected) {
    console.error('generated/content.ts is stale. Run npm run wiki:build and commit the result.');
    process.exit(1);
  }
  console.log('✓ generated/content.ts matches Wiki Markdown sources');
} else {
  mkdirSync(path.dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, expected, 'utf8');
  console.log('✓ generated/content.ts rebuilt from Wiki Markdown sources');
}
