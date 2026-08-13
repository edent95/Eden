import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

export const root = process.cwd();

export function read(relativePath) {
  return readFileSync(path.join(root, relativePath), 'utf8');
}

export function exists(relativePath) {
  return existsSync(path.join(root, relativePath));
}

export function fail(title, problems) {
  const list = Array.isArray(problems) ? problems : [problems];
  console.error(`\n${title}`);
  for (const problem of list) console.error(`- ${problem}`);
  process.exitCode = 1;
}

export function pass(message) {
  console.log(`✓ ${message}`);
}

export function git(args) {
  try {
    return execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
}

export function changedFiles() {
  const files = new Set();
  const add = (output) => {
    for (const file of output.split('\n').map((item) => item.trim()).filter(Boolean)) files.add(file);
  };

  add(git(['diff', '--name-only']));
  add(git(['diff', '--cached', '--name-only']));
  add(git(['ls-files', '--others', '--exclude-standard']));

  let base = process.env.HARNESS_BASE_REF?.trim();
  if (base && /^0+$/.test(base)) base = '';
  if (base) add(git(['diff', '--name-only', `${base}...HEAD`]));
  else if (process.env.CI === 'true') add(git(['diff', '--name-only', 'HEAD^', 'HEAD']));

  return [...files].sort();
}
