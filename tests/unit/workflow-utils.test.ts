import assert from 'node:assert/strict';
import test from 'node:test';

import {
  branchName,
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

test('branchName is readable and collision-resistant by minute', () => {
  const date = new Date('2026-08-13T17:42:00.000Z');
  assert.equal(branchName('发布流程', date), 'work/20260814-0142-发布流程');
});

test('parseTaskArgs requires a title', () => {
  assert.equal(parseTaskArgs(['更新', '首页']).title, '更新 首页');
  assert.throws(() => parseTaskArgs([]), /缺少任务名/);
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

