#!/usr/bin/env node
import {
  DEFAULT_SITE_URL,
  command,
  commitsAhead,
  confirmPublish,
  currentBranch,
  defaultBranch,
  ensureExecutable,
  ensureRepository,
  extractPullRequest,
  extractWorkflowRun,
  output,
  parsePublishArgs,
  printPlan,
  sleep,
  statusLines,
  uniqueBranchName,
} from './lib.mjs';

const HELP = `Eden 安全发布命令

用法：
  npm run publish -- "提交标题"
  npm run publish -- "提交标题" --dry-run
  npm run publish -- "提交标题" --yes
  npm run publish -- "提交标题" --no-merge

行为：
  自动生成 Wiki / 日志索引、运行完整 harness、提交当前范围、建立 PR、等待 verify，
  默认 squash merge，等待 GitHub Pages 部署并检查线上首页、sitemap 与 manifest。

安全规则：
  永不直接 push 默认分支；交互终端需要输入 yes，非交互环境必须显式传 --yes。`;

async function waitForChecks(prNumber) {
  console.log('\n等待 GitHub 注册 verify check…');
  for (let attempt = 0; attempt < 24; attempt += 1) {
    const result = command('gh', ['pr', 'checks', String(prNumber), '--json', 'name,state,bucket'], {
      capture: true,
      allowFailure: true,
    });
    if (result.stdout && result.stdout !== '[]') {
      command('gh', ['pr', 'checks', String(prNumber), '--watch', '--fail-fast']);
      return;
    }
    await sleep(2500);
  }
  throw new Error('60 秒内没有发现 PR checks；PR 已保留，请在 GitHub 检查 workflow 触发状态。');
}

async function waitForDeploy(headSha) {
  console.log('\n等待 main 的部署 workflow…');
  for (let attempt = 0; attempt < 36; attempt += 1) {
    const result = command(
      'gh',
      ['run', 'list', '--workflow', 'deploy.yml', '--branch', 'main', '--limit', '20', '--json', 'databaseId,headSha,status,conclusion,url'],
      { capture: true, allowFailure: true },
    );
    if (result.ok) {
      const run = extractWorkflowRun(result.stdout, headSha);
      if (run) {
        console.log(`部署：${run.url}`);
        command('gh', ['run', 'watch', String(run.databaseId), '--exit-status']);
        return run.url;
      }
    }
    await sleep(5000);
  }
  throw new Error('3 分钟内没有找到对应的 deploy run；代码已合并，请在 GitHub Actions 检查部署。');
}

async function checkLiveSite(siteUrl = DEFAULT_SITE_URL) {
  const targets = [
    ['首页', `${siteUrl}/`],
    ['sitemap', `${siteUrl}/sitemap.xml`],
    ['manifest', `${siteUrl}/site.webmanifest`],
  ];

  console.log('\n检查线上站点…');
  for (const [label, url] of targets) {
    const response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(15_000) });
    if (!response.ok) throw new Error(`${label} 检查失败：HTTP ${response.status} ${url}`);
    if (label === 'manifest') {
      const manifest = await response.json();
      if (manifest.short_name !== 'Eden Tan') throw new Error(`manifest 身份异常：${manifest.short_name ?? '(missing)'}`);
    } else {
      await response.arrayBuffer();
    }
    console.log(`✓ ${label} ${response.status} ${url}`);
  }
}

async function main() {
  const options = parsePublishArgs(process.argv.slice(2));
  if (options.help) {
    console.log(HELP);
    return;
  }

  ensureRepository();
  ensureExecutable('git');
  ensureExecutable('npm');
  ensureExecutable('gh');

  let branch = currentBranch();
  const defaultName = defaultBranch();
  const initialFiles = statusLines();
  printPlan({ branch, defaultName, files: initialFiles, merge: options.merge, title: options.title });

  if (options.dryRun) {
    console.log('\n✓ Dry run 完成；没有修改文件、提交、推送或调用写入型 GitHub 操作。');
    return;
  }

  command('gh', ['auth', 'status']);
  command('git', ['fetch', 'origin', defaultName]);

  if (branch === defaultName) {
    const availableWork = initialFiles.length > 0 || commitsAhead(defaultName) > 0;
    if (!availableWork) throw new Error(`${defaultName} 没有可发布的改动；请先运行 task:new 并完成任务。`);
    branch = uniqueBranchName(options.title);
    command('git', ['switch', '-c', branch]);
    console.log(`✓ 检测到默认分支上的工作，已自动转移到 ${branch}`);
  }

  console.log('\n运行 ready：生成派生文件并执行完整 harness…');
  command('npm', ['run', 'ready']);

  const files = statusLines();
  const aheadBeforeCommit = commitsAhead(defaultName);
  if (files.length === 0 && aheadBeforeCommit === 0) throw new Error('没有可发布的文件或提交。');

  printPlan({ branch, defaultName, files, merge: options.merge, title: options.title });
  await confirmPublish(options);

  if (files.length > 0) {
    command('git', ['add', '--all']);
    command('git', ['commit', '-m', options.title]);
  }

  command('git', ['push', '--set-upstream', 'origin', branch]);

  const existingJson = output('gh', [
    'pr',
    'list',
    '--head',
    branch,
    '--state',
    'open',
    '--limit',
    '1',
    '--json',
    'number,url,title',
  ]);
  let pullRequest = extractPullRequest(existingJson);
  if (!pullRequest) {
    const body = [
      '## Summary',
      '',
      `- ${options.title}`,
      '- Generated and verified by the Eden executable harness.',
      '',
      '## Verification',
      '',
      '- `npm run ready`',
    ].join('\n');
    const url = output('gh', [
      'pr',
      'create',
      '--base',
      defaultName,
      '--head',
      branch,
      '--title',
      options.title,
      '--body',
      body,
    ]);
    const details = output('gh', ['pr', 'view', url, '--json', 'number,url,title']);
    pullRequest = JSON.parse(details);
  }
  console.log(`\nPR：${pullRequest.url}`);

  const mergeState = command(
    'gh',
    ['pr', 'view', String(pullRequest.number), '--json', 'mergeStateStatus', '--jq', '.mergeStateStatus'],
    { capture: true, allowFailure: true },
  );
  if (mergeState.ok && mergeState.stdout === 'BEHIND') {
    console.log('PR 落后默认分支，正在安全更新…');
    command('gh', ['pr', 'update-branch', String(pullRequest.number)]);
  }

  await waitForChecks(pullRequest.number);
  if (!options.merge) {
    console.log(`\n✓ verify 已通过；按 --no-merge 要求保留 PR：${pullRequest.url}`);
    return;
  }

  command('gh', ['pr', 'merge', String(pullRequest.number), '--squash', '--delete-branch']);
  const merged = JSON.parse(output('gh', ['pr', 'view', String(pullRequest.number), '--json', 'mergeCommit,url']));
  const mergeSha = merged.mergeCommit?.oid;
  if (!mergeSha) throw new Error(`PR 已执行合并命令，但无法读取 merge commit：${merged.url}`);

  if (currentBranch() !== defaultName) command('git', ['switch', defaultName]);
  command('git', ['pull', '--ff-only', 'origin', defaultName]);
  const deployUrl = await waitForDeploy(mergeSha);
  await checkLiveSite();

  console.log('\n✓ 发布完成');
  console.log(`PR：${pullRequest.url}`);
  console.log(`Deploy：${deployUrl}`);
  console.log(`Live：${DEFAULT_SITE_URL}`);
}

main().catch((error) => {
  console.error(`\n✗ ${error.message}`);
  process.exitCode = 1;
});

