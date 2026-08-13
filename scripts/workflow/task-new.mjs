#!/usr/bin/env node
import {
  command,
  currentBranch,
  defaultBranch,
  ensureRepository,
  parseTaskArgs,
  statusLines,
  uniqueBranchName,
} from './lib.mjs';

const HELP = `Eden 安全开工命令

用法：
  npm run task:new -- "任务名"

行为：
  从默认分支建立带时间戳的 work/* 分支；已有未提交改动会安全地随分支保留。`;

try {
  const options = parseTaskArgs(process.argv.slice(2));
  if (options.help) {
    console.log(HELP);
    process.exit(0);
  }

  ensureRepository();
  const current = currentBranch();
  const defaultName = defaultBranch();
  if (current !== defaultName) {
    throw new Error(`当前已在 ${current}；请完成或切回 ${defaultName} 后再开新任务。`);
  }

  const files = statusLines();
  const nextBranch = uniqueBranchName(options.title);
  command('git', ['switch', '-c', nextBranch]);

  console.log(`\n✓ 已进入 ${nextBranch}`);
  if (files.length > 0) console.log(`✓ 已把 ${files.length} 个未提交文件安全保留在新分支`);
  console.log(`下一步：完成修改后运行 npm run publish -- ${JSON.stringify(options.title)}`);
} catch (error) {
  console.error(`\n✗ ${error.message}`);
  process.exitCode = 1;
}

