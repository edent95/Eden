#!/usr/bin/env node
import {
  DEFAULT_SITE_URL,
  command,
  commitsAhead,
  confirmPublish,
  currentBranch,
  defaultBranch,
  derivedToStage,
  ensureExecutable,
  ensureRepository,
  extractPullRequest,
  extractWorkflowRun,
  nothingStagedMessage,
  output,
  parsePublishArgs,
  printPlan,
  sleep,
  staleDerived,
  stagedFiles,
  statusLines,
  uniqueBranchName,
  unstagedFiles,
  untrackedFiles,
} from './lib.mjs';

const HELP = `Eden 安全发布命令

用法：
  git add <你这次改的文件> …
  npm run publish -- "fix: 提交标题"
  npm run publish -- "提交标题" --dry-run
  npm run publish -- "提交标题" --yes
  npm run publish -- "提交标题" --merge     # 仅在人明确要求时:自己等 verify、合并并跟到部署

行为：
  只提交已暂存(git add 过)的文件，绝不 add 全部；在默认分支上运行时，
  从 origin/<默认分支> 开出 <类型>/<YYYYMMDD>-<描述> 分支并带上改动。
  生成 Wiki / 日志索引、运行完整 harness、提交、push、建立 PR，然后停止——
  CI 通过后由 GitHub 自动合并 / 面板的 PR 自动合并接手。

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
  const others = () => [...new Set([...unstagedFiles(), ...untrackedFiles()])];
  const initialStaged = stagedFiles();
  printPlan({ branch, defaultName, files: initialStaged, merge: options.merge, title: options.title, others: others() });

  // 只提交已暂存的文件:什么都没暂存、分支上也没有待推送的提交 → 停下,告诉人怎么暂存自己的文件。
  const onDefault = branch === defaultName;
  const unpushedOnDefault = () =>
    new Error(`本地 ${defaultName} 上有尚未推送的提交；publish 不会丢掉或直推它们。请先把它们挪到任务分支再运行。`);
  // 先于「没暂存」判断:否则只报「没暂存」,人不知道本地 main 上还压着提交(dry-run 同样要看到)。
  if (onDefault && commitsAhead(defaultName) > 0) throw unpushedOnDefault();
  if (initialStaged.length === 0 && (onDefault || commitsAhead(defaultName) === 0)) {
    throw new Error(nothingStagedMessage(statusLines()));
  }

  if (options.dryRun) {
    console.log('\n✓ Dry run 完成；没有修改文件、提交、推送或调用写入型 GitHub 操作。');
    return;
  }

  command('gh', ['auth', 'status']);
  command('git', ['fetch', 'origin', defaultName]);

  if (onDefault && commitsAhead(defaultName) > 0) throw unpushedOnDefault();

  if (onDefault) {
    // 在默认分支上直接改是正常做法:到提交这一刻才从最新的 origin/<默认分支> 开任务分支,
    // 已暂存与未暂存的改动都原样带过去(和 origin 冲突时 git 会拒绝切换,不会强切)。
    branch = uniqueBranchName(options.title);
    command('git', ['switch', '-c', branch, `origin/${defaultName}`]);
    console.log(`✓ 已从 origin/${defaultName} 开出任务分支 ${branch}，改动已随分支带过去`);
  }

  console.log('\n运行 ready：生成派生文件并执行完整 harness…');
  const dirtyBefore = unstagedFiles();
  // 和 CI 一样按「相对 origin/<默认分支> 的整个分支」判日志门禁:否则分支上已提交的日志条目不算数,
  // 只推已有提交(没新暂存)时,工作区里别人的未暂存改动会让 ready 以「没有日志条目」失败。
  command('npm', ['run', 'ready'], {
    env: { HARNESS_BASE_REF: process.env.HARNESS_BASE_REF?.trim() || `origin/${defaultName}` },
  });
  const derived = derivedToStage({ dirtyBefore, dirtyAfter: unstagedFiles() });
  if (derived.length > 0) {
    command('git', ['add', '--', ...derived]);
    console.log(`✓ 已暂存 ready 重新生成的派生文件：${derived.join(', ')}`);
  }

  const files = stagedFiles();
  const stale = staleDerived({ dirtyBefore, staged: files });
  if (stale.length > 0) {
    throw new Error(
      [
        `这次暂存了 ${stale.join(', ')} 的源文件,但这些派生文件在 ready 之前就有未暂存改动,publish 不会替你暂存它们;`,
        '照这样提交,PR 里的派生文件是旧的,CI 的 --check 一定失败。ready 已按当前工作区重新生成了它们:',
        ...stale.map((file) => `  git diff -- ${file}`),
        '确认内容只包含你这次的改动后 `git add` 它,再重新运行 publish。',
      ].join('\n'),
    );
  }
  const aheadBeforeCommit = commitsAhead(defaultName);
  if (files.length === 0 && aheadBeforeCommit === 0) throw new Error(nothingStagedMessage(statusLines()));

  printPlan({ branch, defaultName, files, merge: options.merge, title: options.title, others: others() });
  await confirmPublish(options);

  // 不带路径的 commit 只提交 index;没暂存的改动(可能是别的会话的)留在工作区。
  if (files.length > 0) command('git', ['commit', '-m', options.title]);

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

  if (!options.merge) {
    console.log('\n✓ 已推送并开好 PR，本命令到此为止。');
    console.log('  CI(verify)全过后由 GitHub 自动合并 / personal-dashboard 的 PR 自动合并接手;挂了就在同一分支修、再运行 publish。');
    console.log(`  看检查：gh pr checks ${pullRequest.number} --watch`);
    return;
  }

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

