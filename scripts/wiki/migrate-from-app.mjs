import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { root } from '../harness/lib.mjs';

const appPath = path.join(root, 'App.tsx');
const source = readFileSync(appPath, 'utf8');
const ast = ts.createSourceFile(appPath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

function valueOf(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(valueOf);
  if (ts.isObjectLiteralExpression(node)) {
    return Object.fromEntries(node.properties.map((property) => {
      if (!ts.isPropertyAssignment(property)) throw new Error(`Unsupported property ${property.getText(ast)}`);
      const key = ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)
        ? property.name.text
        : property.name.getText(ast);
      return [key, valueOf(property.initializer)];
    }));
  }
  throw new Error(`Unsupported syntax ${ts.SyntaxKind[node.kind]} in ${node.getText(ast).slice(0, 80)}`);
}

const declarations = new Map();
for (const statement of ast.statements) {
  if (!ts.isVariableStatement(statement)) continue;
  for (const declaration of statement.declarationList.declarations) {
    const name = declaration.name.getText(ast);
    if (!['wikiEntries', 'siteEssayNotes'].includes(name)) continue;
    let initializer = declaration.initializer;
    if (ts.isAsExpression(initializer)) initializer = initializer.expression;
    declarations.set(name, {
      statement,
      data: valueOf(initializer),
    });
  }
}

if (declarations.size !== 2) {
  throw new Error('Expected wikiEntries and siteEssayNotes declarations in App.tsx. Migration may already be complete.');
}

function writeCollection(directory, type, routePrefix, entries) {
  mkdirSync(path.join(root, directory), { recursive: true });
  entries.forEach((entry, index) => {
    const title = entry.title?.en ?? entry.slug;
    const zhTitle = entry.title?.zh ?? '';
    const markdown = `---
id: ${entry.slug}
type: ${type}
route: /${routePrefix}/${entry.slug}
order: ${index + 1}
status: published
---

# ${title}

${zhTitle ? `中文标题：${zhTitle}\n\n` : ''}The JSON block below is the structured bilingual source consumed by the site compiler.

\`\`\`json
${JSON.stringify(entry, null, 2)}
\`\`\`
`;
    writeFileSync(path.join(root, directory, `${entry.slug}.md`), markdown, 'utf8');
  });
}

writeCollection('wiki/pages', 'wiki', 'wiki', declarations.get('wikiEntries').data);
writeCollection('wiki/essays', 'essay', 'notes', declarations.get('siteEssayNotes').data);

const index = `# Eden Wiki Index

This directory is the editable, Markdown-first content source for the public Wiki and Notes routes.

## Wiki pages

${declarations.get('wikiEntries').data.map((entry) => `- [${entry.title.en}](pages/${entry.slug}.md) — \`/wiki/${entry.slug}\``).join('\n')}

## Essays

${declarations.get('siteEssayNotes').data.map((entry) => `- [${entry.title.en}](essays/${entry.slug}.md) — \`/notes/${entry.slug}\``).join('\n')}

## Editing workflow

1. Edit the relevant Markdown source.
2. Keep the frontmatter ID, route, type, and order aligned with its JSON payload.
3. Run \`npm run wiki:build\`.
4. Run \`npm run check\`.
`;
writeFileSync(path.join(root, 'wiki/index.md'), index, 'utf8');

const removals = [...declarations.values()]
  .map(({ statement }) => ({ start: statement.getStart(ast), end: statement.getEnd() }))
  .sort((left, right) => right.start - left.start);
let nextApp = source;
for (const removal of removals) {
  nextApp = `${nextApp.slice(0, removal.start)}${nextApp.slice(removal.end).replace(/^\s*\n/, '\n')}`;
}
nextApp = nextApp.replace(
  "type Language = 'en' | 'zh';",
  "import { siteEssayNotes, wikiEntries } from './generated/content';\n\ntype Language = 'en' | 'zh';",
);
writeFileSync(appPath, nextApp, 'utf8');
console.log('✓ Wiki and Notes migrated from App.tsx into Markdown sources');
