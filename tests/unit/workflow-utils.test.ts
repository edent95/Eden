import assert from 'node:assert/strict';
import test from 'node:test';

import {
  branchName,
  branchType,
  derivedToStage,
  staleDerived,
  nothingStagedMessage,
  extractPullRequest,
  extractWorkflowRun,
  parsePublishArgs,
  parseTaskArgs,
  slugify,
} from '../../scripts/workflow/lib.mjs';

test('slugify keeps readable Latin and CJK task names', () => {
  assert.equal(slugify("Eden's New Workflow"), 'edens-new-workflow');
  assert.equal(slugify('更新 首页 Harness'), '更新-首页-harness');
});

test('branchName follows <type>/<YYYYMMDD>-<desc> in Malaysia time', () => {
  const date = new Date('2026-08-13T17:42:00.000Z');
  assert.equal(branchName('发布流程', date), 'chore/20260814-发布流程');
  assert.equal(branchName('fix: publish only staged files', date), 'fix/20260814-publish-only-staged-files');
  assert.equal(branchName('feat(home): new hero', date), 'feat/20260814-new-hero');
});

test('branchType only accepts the known conventional types', () => {
  assert.equal(branchType('docs: x'), 'docs');
  assert.equal(branchType('wip: x'), 'chore');
  assert.equal(branchType('Fix typo'), 'chore');
});

test('derivedToStage only stages generated files that ready itself changed', () => {
  assert.deepEqual(
    derivedToStage({ dirtyBefore: ['a.ts'], dirtyAfter: ['a.ts', 'generated/content.ts', 'logs/index.md'] }),
    ['generated/content.ts', 'logs/index.md'],
  );
  assert.deepEqual(
    derivedToStage({ dirtyBefore: ['logs/index.md'], dirtyAfter: ['logs/index.md', 'generated/content.ts'] }),
    ['generated/content.ts'],
  );
  assert.deepEqual(derivedToStage({ dirtyBefore: [], dirtyAfter: ['other.ts'] }), []);
});

test('nothingStagedMessage lists changes and the git add hint', () => {
  const message = nothingStagedMessage([' M App.tsx', '?? notes.md']);
  assert.match(message, /没有已暂存的改动/);
  assert.match(message, / M App\.tsx/);
  assert.match(message, /git add <你的文件>/);
});

test('parseTaskArgs requires a title', () => {
  assert.equal(parseTaskArgs(['更新', '首页']).title, '更新 首页');
  assert.throws(() => parseTaskArgs([]), /缺少任务名/);
});

test('parsePublishArgs defaults to opening the PR without merging', () => {
  assert.equal(parsePublishArgs(['更新首页']).merge, false);
  assert.equal(parsePublishArgs(['更新首页', '--merge']).merge, true);
});

test('parsePublishArgs separates safety flags from the title', () => {
  assert.deepEqual(parsePublishArgs(['更新首页', '--dry-run', '--yes', '--no-merge']), {
    dryRun: true,
    help: false,
    merge: false,
    title: '更新首页',
    yes: true,
  });
  assert.throws(() => parsePublishArgs(['--wat']), /未知参数/);
});

test('GitHub response helpers select the relevant objects', () => {
  assert.deepEqual(extractPullRequest('[{"number":2,"url":"https://example.test/2"}]'), {
    number: 2,
    url: 'https://example.test/2',
  });
  assert.equal(extractPullRequest('[]'), null);
  assert.deepEqual(
    extractWorkflowRun('[{"headSha":"old"},{"headSha":"target","databaseId":7}]', 'target'),
    { headSha: 'target', databaseId: 7 },
  );
});


test('staleDerived flags pre-dirty generated files whose sources are being committed', () => {
  // 派生文件事先就脏、这次又暂存了它的源文件 → 提交里的派生文件会过期,必须拦下
  assert.deepEqual(
    staleDerived({ dirtyBefore: ['generated/content.ts'], staged: ['wiki/pages/a.md', 'logs/entries/x.md'] }),
    ['generated/content.ts'],
  );
  assert.deepEqual(staleDerived({ dirtyBefore: ['logs/index.md'], staged: ['logs/2026-09.md'] }), ['logs/index.md']);
  // 源文件没动、派生文件本身已暂存、或事先干净,都不拦
  assert.deepEqual(staleDerived({ dirtyBefore: ['generated/content.ts'], staged: ['App.tsx'] }), []);
  assert.deepEqual(
    staleDerived({ dirtyBefore: ['generated/content.ts'], staged: ['wiki/pages/a.md', 'generated/content.ts'] }),
    [],
  );
  assert.deepEqual(staleDerived({ dirtyBefore: [], staged: ['wiki/pages/a.md'] }), []);
  // 条目文件(logs/entries/)不进索引,不算 logs/index.md 的源
  assert.deepEqual(staleDerived({ dirtyBefore: ['logs/index.md'], staged: ['logs/entries/2026-09-29-x.md'] }), []);
});
