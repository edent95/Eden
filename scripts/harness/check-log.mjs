import { changedFiles, fail, pass, read } from './lib.mjs';

const changed = changedFiles().filter((file) => !file.startsWith('dist/'));
const month = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Kuala_Lumpur',
  year: 'numeric',
  month: '2-digit',
}).format(new Date());
const currentLog = `logs/${month}.md`;
const meaningful = changed.filter((file) => ![currentLog, 'logs/index.md'].includes(file));

if (meaningful.length === 0) {
  pass('No unlogged project changes detected');
  process.exit(0);
}

const problems = [];
if (!changed.includes(currentLog)) {
  problems.push(`Project files changed without a matching ${currentLog} change`);
}

const log = read(currentLog);
const headingMatches = [...log.matchAll(/^#{2,3} .+$/gm)];
const latestStart = headingMatches.at(-1)?.index ?? 0;
const latest = log.slice(latestStart);
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

if (!changed.includes('logs/index.md')) {
  problems.push('The generated logs/index.md was not updated');
}

if (problems.length > 0) fail('Change-log gate failed:', problems);
else pass(`${meaningful.length} changed project file(s) have a structured monthly log entry`);
