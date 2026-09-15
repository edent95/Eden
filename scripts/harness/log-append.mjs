#!/usr/bin/env node
/**
 * Eden 的 `log:append` 包装:把通用的 `scripts/append-log.mjs` 指向**当月**的
 * `logs/YYYY-MM.md`,而不是根目录的 `log.md`。
 *
 * 为什么要这一层:Eden 的条目按月拆在 `logs/` 下,根 `log.md` 只是一个稳定指针
 * (`AGENTS.md` 明写「must not receive normal change entries」)。通用脚本默认往上找到
 * 第一个 `log.md` 就写进去 —— 那会绕过月度归档,也会让 `npm run verify:log` 判定
 * 「项目文件变了但当月 log 没变」而失败。
 *
 * 月份用 **Asia/Kuala_Lumpur** 算,和 `check-log.mjs` 里的算法保持一致;
 * 两边用不同时区的话,月初/月末会出现「脚本写进了上个月的文件、校验器去看这个月的」。
 */
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const month = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Kuala_Lumpur', year: 'numeric', month: '2-digit',
}).format(new Date())
const target = path.join(ROOT, 'logs', `${month}.md`)

if (!fs.existsSync(target)) {
  fs.writeFileSync(target, `# ${month} Change Log\n`, 'utf8')
  console.log(`(新建 logs/${month}.md)`)
}

const r = spawnSync(process.execPath, [path.join(ROOT, 'scripts', 'append-log.mjs'), ...process.argv.slice(2)], {
  stdio: 'inherit',
  env: { ...process.env, LOGBOOK_FILE: target },
})
process.exit(r.status ?? 1)
