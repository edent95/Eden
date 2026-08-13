import { exists, fail, pass, read } from './lib.mjs';

const documents = ['AGENTS.md', 'soul.md'];
const paths = new Set();

for (const document of documents) {
  const source = read(document);
  for (const match of source.matchAll(/`([^`\n]*SKILL\.md)`/g)) {
    const declared = match[1];
    if (declared.includes('/') && !declared.startsWith('/') && !declared.startsWith('~')) paths.add(declared);
  }
}

const missing = [...paths].filter((declared) => !exists(declared));
if (missing.length > 0) {
  fail('Declared repository-local skills are missing:', missing);
} else {
  pass(`${paths.size} declared repository-local skill path(s) exist`);
}
