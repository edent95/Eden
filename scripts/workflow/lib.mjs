import { spawnSync } from 'node:child_process';

export const DEFAULT_SITE_URL = 'https://edentan.site';

export function command(commandName, args, options = {}) {
  const result = spawnSync(commandName, args, {
    cwd: options.cwd ?? process.cwd(),
    encoding: 'utf8',
    env: { ...process.env, ...options.env },
    stdio: options.capture ? ['inherit', 'pipe', 'pipe'] : 'inherit',
  });

  if (options.capture && options.echoStderr && result.stderr) process.stderr.write(result.stderr);

  if (result.error) {
    if (options.allowFailure) return { ok: false, stdout: '', stderr: result.error.message, status: null };
    throw result.error;
  }

  const response = {
    ok: result.status === 0,
    stdout: (result.stdout ?? '').trim(),
    stderr: (result.stderr ?? '').trim(),
    status: result.status,
  };

  if (!response.ok && !options.allowFailure) {
    const detail = response.stderr || response.stdout || `exit ${response.status}`;
    throw new Error(`${commandName} ${args.join(' ')} failed: ${detail}`);
  }

  return response;
}

export function output(commandName, args, options = {}) {
  return command(commandName, args, { ...options, capture: true }).stdout;
}

export function slugify(value) {
  const normalized = value
    .normalize('NFKC')
    .toLocaleLowerCase('en-US')
    .replace(/[’']/gu, '')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/gu, '');

  return [...normalized].slice(0, 48).join('').replace(/-+$/u, '') || 'change';
}

export function compactTimestamp(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kuala_Lumpur',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type) => parts.find((part) => part.type === type)?.value ?? '';
  return `${get('year')}${get('month')}${get('day')}-${get('hour')}${get('minute')}`;
}

export function branchName(title, date = new Date()) {
  return `work/${compactTimestamp(date)}-${slugify(title)}`;
}

export function parseTaskArgs(argv) {
  if (argv.includes('--help') || argv.includes('-h')) return { help: true, title: '' };
  const title = argv.join(' ').trim();
  if (!title) throw new Error('缺少任务名。示例：npm run task:new -- "更新首页文案"');
  return { help: false, title };
}

export function parsePublishArgs(argv) {
  const options = { dryRun: false, help: false, merge: true, title: '', yes: false };
  const titleParts = [];

  for (const arg of argv) {
    if (arg === '--dry-run') options.dryRun = true;
    else if (arg === '--yes' || arg === '-y') options.yes = true;
    else if (arg === '--no-merge') options.merge = false;
    else if (arg === '--help' || arg === '-h') options.help = true;
    else if (arg.startsWith('-')) throw new Error(`未知参数：${arg}`);
    else titleParts.push(arg);
  }

  options.title = titleParts.join(' ').trim();
  if (!options.help && !options.title) {
    throw new Error('缺少提交标题。示例：npm run publish -- "更新首页文案"');
  }
  return options;
}

export function ensureRepository() {
  const result = command('git', ['rev-parse', '--is-inside-work-tree'], { capture: true, allowFailure: true });
  if (!result.ok || result.stdout !== 'true') throw new Error('当前目录不是 Git 仓库。');
}

export function ensureExecutable(name, versionArgs = ['--version']) {
  const result = command(name, versionArgs, { capture: true, allowFailure: true });
  if (!result.ok) throw new Error(`找不到可执行命令 ${name}。`);
}

export function currentBranch() {
  const branch = output('git', ['branch', '--show-current']);
  if (!branch) throw new Error('当前处于 detached HEAD；请先切换到一个分支。');
  return branch;
}

export function defaultBranch() {
  const remoteHead = command('git', ['symbolic-ref', '--quiet', '--short', 'refs/remotes/origin/HEAD'], {
    capture: true,
    allowFailure: true,
  });
  if (remoteHead.ok && remoteHead.stdout.startsWith('origin/')) return remoteHead.stdout.slice('origin/'.length);

  const githubDefault = command('gh', ['repo', 'view', '--json', 'defaultBranchRef', '--jq', '.defaultBranchRef.name'], {
    capture: true,
    allowFailure: true,
  });
  return githubDefault.ok && githubDefault.stdout ? githubDefault.stdout : 'main';
}

export function uniqueBranchName(title, date = new Date()) {
  const base = branchName(title, date);
  let candidate = base;
  let suffix = 2;
  while (
    command('git', ['show-ref', '--verify', '--quiet', `refs/heads/${candidate}`], { capture: true, allowFailure: true }).ok ||
    command('git', ['show-ref', '--verify', '--quiet', `refs/remotes/origin/${candidate}`], {
      capture: true,
      allowFailure: true,
    }).ok
  ) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  return candidate;
}

export function statusLines() {
  const status = output('git', ['status', '--short']);
  return status ? status.split('\n') : [];
}

export function commitsAhead(base) {
  const result = command('git', ['rev-list', '--count', `origin/${base}..HEAD`], {
    capture: true,
    allowFailure: true,
  });
  return result.ok ? Number.parseInt(result.stdout, 10) || 0 : 0;
}

export function printPlan({ branch, defaultName, files, merge, title }) {
  console.log('\n发布计划');
  console.log(`- 标题：${title}`);
  console.log(`- 当前分支：${branch}`);
  console.log(`- 目标分支：${defaultName}`);
  console.log(`- 未提交文件：${files.length}`);
  console.log(`- 完成方式：${merge ? 'PR verify → squash merge → deploy → live check' : 'PR verify 后停止'}`);
  if (files.length > 0) {
    console.log('- 文件：');
    for (const file of files) console.log(`  ${file}`);
  }
}

export async function confirmPublish({ yes }) {
  if (yes) return;
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    throw new Error('非交互环境不会自动发布；检查范围后重新运行并加 --yes。');
  }

  const { createInterface } = await import('node:readline/promises');
  const prompt = createInterface({ input: process.stdin, output: process.stdout });
  const answer = (await prompt.question('\n确认提交、推送并执行上述流程？输入 yes 继续：')).trim().toLowerCase();
  prompt.close();
  if (answer !== 'yes') throw new Error('已取消，没有提交或推送。');
}

export function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function extractPullRequest(listJson) {
  const list = JSON.parse(listJson || '[]');
  return list[0] ?? null;
}

export function extractWorkflowRun(listJson, headSha) {
  const runs = JSON.parse(listJson || '[]');
  return runs.find((run) => run.headSha === headSha) ?? null;
}

