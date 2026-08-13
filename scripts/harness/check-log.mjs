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
const requiredEvidence = [
  ['change description', /改动|做了什么|Changed/i],
  ['reason', /原因|为什么|Reason/i],
  ['impact', /影响|Impact/i],
  ['verification', /验证|Verification/i],
  ['next step', /后续|下一步|Next/i],
];

for (const [label, pattern] of requiredEvidence) {
  if (!pattern.test(latest)) problems.push(`Latest log entry is missing ${label}`);
}

if (!changed.includes('logs/index.md')) {
  problems.push('The generated logs/index.md was not updated');
}

if (problems.length > 0) fail('Change-log gate failed:', problems);
else pass(`${meaningful.length} changed project file(s) have a structured monthly log entry`);
