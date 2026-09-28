import { changedFiles, exists, fail, pass, read } from './lib.mjs';

const changed = changedFiles().filter((file) => !file.startsWith('dist/'));
const month = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Kuala_Lumpur',
  year: 'numeric',
  month: '2-digit',
}).format(new Date());
const currentLog = `logs/${month}.md`;
// 2026-09-28 起新条目一条一个文件(`npm run log:append` → logs/entries/<日期>-<时分秒>-<随机>.md),
// 几个分支同时写日志不再在同一个文件上冲突。老的「追加当月文件 + 重建 index」路径仍然认。
const isEntryFile = (file) => /^logs\/entries\/\d{4}-\d{2}-\d{2}-.+\.md$/.test(file);
const entryFiles = changed.filter((file) => isEntryFile(file) && exists(file));
const meaningful = changed.filter((file) => ![currentLog, 'logs/index.md'].includes(file) && !file.startsWith('logs/entries/'));

if (meaningful.length === 0) {
  pass('No unlogged project changes detected');
  process.exit(0);
}

const problems = [];
if (entryFiles.length === 0 && !changed.includes(currentLog)) {
  problems.push(`Project files changed without a new log entry — run \`npm run log:append < entry.md\` (writes logs/entries/)`);
}

// 条目文件:整个文件就是这一条;月度文件:只看最后一个标题之后的那一段
let latest;
if (entryFiles.length > 0) {
  latest = read(entryFiles.at(-1));
  for (const file of entryFiles) {
    if (!/^##[ \t]+\d{4}-\d{2}-\d{2}/m.test(read(file))) {
      problems.push(`${file} has no \`## YYYY-MM-DD\` heading (the dashboard cannot see it)`);
    }
  }
} else {
  const log = read(currentLog);
  const headingMatches = [...log.matchAll(/^#{2,3} .+$/gm)];
  const latestStart = headingMatches.at(-1)?.index ?? 0;
  latest = log.slice(latestStart);
}
// 2026-09-10:全机项目统一到 logbook 的 rag-v1 七字段格式(见根目录 AGENTS.md)。
// 这里**两套都认** —— 新条目按 rag-v1 写,`logs/` 下 2026-09 之前的历史条目仍是
// 「改动 / 原因 / 影响 / 验证 / 后续」五栏,不回填、也不该因为格式旧而让 CI 红掉。
// 只要其中一套的字段齐了就放行;两套都不齐时,按 rag-v1 报缺哪几栏。
const FORMATS = [
  ['rag-v1', [
    ['changed', /(^|[^a-z])changed\b|改动/i],
    ['ripples', /(^|[^a-z])ripples\b|牵连|影响/i],
    ['verified', /(^|[^a-z])verified\b|验证/i],
    ['impact', /(^|[^a-z])impact\b|影响半径|影响/i],
    ['keywords', /(^|[^a-z])keywords\b|检索词/i],
  ]],
  ['legacy', [
    ['change description', /改动|做了什么|Changed/i],
    ['reason', /原因|为什么|Reason/i],
    ['impact', /影响|Impact/i],
    ['verification', /验证|Verification/i],
    ['next step', /后续|下一步|Next/i],
  ]],
];

const misses = FORMATS.map(([name, fields]) => [name, fields.filter(([, re]) => !re.test(latest)).map(([l]) => l)]);
if (misses.every(([, m]) => m.length > 0)) {
  const ragMiss = misses.find(([name]) => name === 'rag-v1')[1];
  problems.push(`Latest log entry is missing ${ragMiss.join(', ')} (rag-v1 fields; see AGENTS.md)`);
}

// logs/index.md 只由月度文件生成;条目文件不进索引(否则每个 PR 都改它,又回到冲突)
if (entryFiles.length === 0 && !changed.includes('logs/index.md')) {
  problems.push('The generated logs/index.md was not updated');
}

if (problems.length > 0) fail('Change-log gate failed:', problems);
else pass(`${meaningful.length} changed project file(s) have a structured log entry`);
