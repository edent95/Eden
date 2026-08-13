import { exists, fail, pass, read } from './lib.mjs';

const indexCss = read('index.css');
const registry = read('css-art.registry.ts');
const problems = [];

for (const [index, line] of indexCss.split('\n').entries()) {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('@import')) {
    problems.push(`index.css:${index + 1} contains implementation CSS instead of an import`);
  }
}

const cssFiles = [...registry.matchAll(/cssFile:\s*'([^']+)'/g)].map((match) => match[1]);
for (const cssFile of new Set(cssFiles)) {
  if (!exists(cssFile)) {
    problems.push(`CSS art registry points to missing file ${cssFile}`);
    continue;
  }
  if (!indexCss.includes(`./${cssFile}`)) {
    problems.push(`${cssFile} is registered but not imported by index.css`);
  }
  const source = read(cssFile);
  if ((/@keyframes|animation\s*:/.test(source)) && !source.includes('prefers-reduced-motion')) {
    problems.push(`${cssFile} animates but has no prefers-reduced-motion rule`);
  }
}

if (problems.length > 0) fail('CSS architecture contract failed:', problems);
else pass(`${new Set(cssFiles).size} CSS art families satisfy the registry contract`);
