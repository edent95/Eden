import { spawnSync } from 'node:child_process';

export const DEFAULT_SITE_URL = 'https://eden-tan.com';

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

export const BRANCH_TYPES = ['feat', 'fix', 'refactor', 'docs', 'ci', 'chore'];

// 标题形如 `fix: xxx` / `feat(scope): xxx` 时取出类型,其余一律 chore。
export function branchType(title) {
  const match = /^\s*([a-z]+)(?:\([^)]*\))?!?:/u.exec(title);
  return match && BRANCH_TYPES.includes(match[1]) ? match[1] : 'chore';
}

export function stripTypePrefix(title) {
  return title.replace(/^\s*[a-z]+(?:\([^)]*\))?!?:\s*/u, '');
}

// 分支名 `<类型>/<YYYYMMDD>-<短描述>`(全局规则的命名;日期按 Asia/Kuala_Lumpur)。
export function branchName(title, date = new Date()) {
  return `${branchType(title)}/${compactTimestamp(date).slice(0, 8)}-${slugify(stripTypePrefix(title))}`;
}

export function parseTaskArgs(argv) {
  if (argv.includes('--help') || argv.includes('-h')) return { help: true, title: '' };
  const title = argv.join(' ').trim();
  if (!title) throw new Error('缺少任务名。示例：npm run task:new -- "更新首页文案"');
  return { help: false, title };
}

export function parsePublishArgs(argv) {
  // 缺省只开 PR 就停:合并交给 GitHub 原生自动合并 / 面板的 PR 自动合并(CI 全过才合)。
  // 只有人明确要求时才传 --merge 让本命令自己合并并跟到部署。
  const options = { dryRun: false, help: false, merge: false, title: '', yes: false };
  const titleParts = [];

  for (const arg of argv) {
    if (arg === '--dry-run') options.dryRun = true;
    else if (arg === '--yes' || arg === '-y') options.yes = true;
    else if (arg === '--merge') options.merge = true;
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

function splitNul(text) {
  return text.split('\0').filter(Boolean);
}

// 已暂存(index 里和 HEAD 不同)的路径。publish 只提交这些。
export function stagedFiles() {
  return splitNul(command('git', ['diff', '--cached', '--name-only', '-z'], { capture: true }).stdout);
}

// 工作区里改了但没暂存的已跟踪路径。
export function unstagedFiles() {
  return splitNul(command('git', ['diff', '--name-only', '-z'], { capture: true }).stdout);
}

export function untrackedFiles() {
  return splitNul(command('git', ['ls-files', '--others', '--exclude-standard', '-z'], { capture: true }).stdout);
}

// ready 会重写的派生文件:只在它们「ready 之前干净、之后变了」时才替你暂存,
// 事先就有未暂存改动的(可能是别的会话的)一律不碰。
export const DERIVED_FILES = ['generated/content.ts', 'logs/index.md'];

export function derivedToStage({ dirtyBefore, dirtyAfter, derived = DERIVED_FILES }) {
  const before = new Set(dirtyBefore);
  const after = new Set(dirtyAfter);
  return derived.filter((file) => after.has(file) && !before.has(file));
}

export function nothingStagedMessage(changedLines) {
  const lines = ['没有已暂存的改动。publish 只提交你自己 `git add` 过的文件,不会替你 add 全部。'];
  if (changedLines.length > 0) {
    lines.push('', '工作区里有这些改动(不一定都是你的):');
    for (const line of changedLines) lines.push(`  ${line}`);
  }
  lines.push('', '先只暂存你这次的文件,再重新运行:', '  git add <你的文件> …', '  npm run publish -- "提交标题"');
  return lines.join('\n');
}

export function commitsAhead(base) {
  const result = command('git', ['rev-list', '--count', `origin/${base}..HEAD`], {
    capture: true,
    allowFailure: true,
  });
  return result.ok ? Number.parseInt(result.stdout, 10) || 0 : 0;
}

export function printPlan({ branch, defaultName, files, merge, title, others = [] }) {
  console.log('\n发布计划');
  console.log(`- 标题：${title}`);
  console.log(`- 当前分支：${branch}`);
  console.log(`- 目标分支：${defaultName}`);
  console.log(`- 将提交(已暂存)：${files.length}`);
  console.log(
    `- 完成方式：${merge ? 'PR → verify → squash merge → deploy → live check(--merge)' : 'push + 开 PR 后停止;CI 通过后由自动合并接手'}`,
  );
  if (files.length > 0) {
    console.log('- 文件：');
    for (const file of files) console.log(`  ${file}`);
  }
  if (others.length > 0) {
    console.log(`- 不会提交(未暂存 / 未跟踪，留在工作区)：${others.length}`);
    for (const line of others) console.log(`  ${line}`);
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
