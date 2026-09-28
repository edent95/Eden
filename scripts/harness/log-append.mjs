#!/usr/bin/env node
/**
 * Eden 的 `log:append`:**一条日志一个新文件**,写进 `logs/entries/`(2026-09-28 起)。
 *
 * 为什么:以前每条都追加到当月 `logs/YYYY-MM.md` 末尾(再重建 `logs/index.md`)。
 * 几个 agent / 分支同时干活时,每个 PR 都在同一个文件的 EOF 加行 → 合并必然冲突,
 * 自动合并就停在「和 base 有冲突」。一条一个新文件,两个分支永远不碰同一个文件。
 *
 * 文件:`logs/entries/<YYYY-MM-DD>-<HHMMSS>-<4 位十六进制>.md`,用 `wx` 新建(绝不覆盖)。
 *   - 文件名必须以日期开头:personal-dashboard 的扫描器只收 `^\d{4}-\d{2}-\d{2}-.+\.md$`,
 *     并且自动把 log.md 旁边的 `logs/entries/` 并进 Eden 的条目(不用改 `log_includes`)。
 *   - 内容以 `## YYYY-MM-DD — <标题>` 开头:面板解析器要 `## ` + 完整日期;
 *     `check-log.mjs` 也按这个文件认条目。
 *   - ID 是 `E-<日期>-<时分秒>-<4 位十六进制>`,不是「当天最大序号 +1」——
 *     别的分支上的序号看不见,+1 必然撞号。
 * 日期与时间按 **Asia/Kuala_Lumpur** 算,和 `check-log.mjs` 的月份口径一致。
 *
 * 老的 `logs/2026-*.md` 月度文件保留不动,只是不再往里写新条目。
 *
 * 用法:
 *   npm run log:append < entry.md   # 正文从 stdin 读,首行是 `### 标题`;ID 与 `## 日期` 由脚本写
 *   npm run log:check               # 当月文件 + logs/entries/ 的重号与天标题检查
 */
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const ENTRIES = path.join(ROOT, 'logs', 'entries')
const ENTRY_FILE_RE = /^\d{4}-\d{2}-\d{2}-.+\.md$/
const ID_RE = /^###\s*\[(E-\d{4}-\d{2}-\d{2}-[\w-]+)\]/gm
const ID_PREFIX_RE = /^###\s*(\[E-\d{4}-\d{2}-\d{2}-[\w-]+\])?\s*/

function klParts(d = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kuala_Lumpur', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
  }).formatToParts(d).map((p) => [p.type, p.value]))
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    hms: `${parts.hour}${parts.minute}${parts.second}`,
    month: `${parts.year}-${parts.month}`,
  }
}

function entryFiles() {
  if (!fs.existsSync(ENTRIES)) return []
  return fs.readdirSync(ENTRIES).filter((n) => ENTRY_FILE_RE.test(n)).sort().map((n) => path.join(ENTRIES, n))
}

function check() {
  // 当月文件(如果还在)照旧交给通用脚本查:重号 + 天标题「旧→新」
  const monthly = path.join(ROOT, 'logs', `${klParts().month}.md`)
  let bad = false
  if (fs.existsSync(monthly)) {
    const r = spawnSync(process.execPath, [path.join(ROOT, 'scripts', 'append-log.mjs'), '--check'], {
      stdio: 'inherit', env: { ...process.env, LOGBOOK_FILE: monthly },
    })
    if (r.status !== 0) bad = true
  }

  // ID 在月度文件与条目文件之间全局不重复;每个条目文件必须自带 `## 日期`
  const seen = new Map()
  const add = (id, where) => seen.set(id, [...(seen.get(id) ?? []), where])
  for (const name of fs.readdirSync(path.join(ROOT, 'logs')).filter((n) => /^20\d{2}-\d{2}\.md$/.test(n))) {
    for (const m of fs.readFileSync(path.join(ROOT, 'logs', name), 'utf8').matchAll(ID_RE)) add(m[1], name)
  }
  const files = entryFiles()
  const problems = []
  for (const file of files) {
    const name = path.basename(file)
    const text = fs.readFileSync(file, 'utf8')
    const day = /^##[ \t]+(\d{4}-\d{2}-\d{2})/m.exec(text)
    if (!day) problems.push(`${name} 没有 \`## YYYY-MM-DD\` 天标题(面板认不出它)`)
    else if (!name.startsWith(day[1])) problems.push(`${name} 的文件名日期和 \`## ${day[1]}\` 对不上`)
    for (const m of text.matchAll(ID_RE)) add(m[1], `entries/${name}`)
  }
  // 月度文件内部的重号上面那一步已经报过(历史遗留,不回改),这里只管牵涉条目文件的
  for (const [id, where] of seen) {
    if (where.length > 1 && where.some((w) => w.startsWith('entries/'))) problems.push(`重复 ID ${id}:${where.join(', ')}`)
  }

  console.log(`logs/entries/: ${files.length} 个条目文件`)
  if (problems.length) {
    for (const p of problems) console.error(`  ✗ ${p}`)
    bad = true
  } else console.log('  ✓ 每个条目文件都有天标题,ID 全局不重复')
  process.exit(bad ? 1 : 0)
}

if (process.argv.includes('--check')) check()

const body = fs.readFileSync(0, 'utf8').trim()
if (!body.startsWith('###')) {
  console.error('条目必须以 `### 标题` 开头(ID 与 `## 日期` 由本脚本写,不用自己写)')
  process.exit(2)
}

fs.mkdirSync(ENTRIES, { recursive: true })
const { date, hms } = klParts()
const lines = body.split('\n')
const title = lines[0].replace(ID_PREFIX_RE, '').trim()
for (let attempt = 0; attempt < 5; attempt++) {
  const rand = Math.floor(Math.random() * 0x10000).toString(16).padStart(4, '0')
  const id = `E-${date}-${hms}-${rand}`
  const file = path.join(ENTRIES, `${date}-${hms}-${rand}.md`)
  const out = [`## ${date} — ${title}`, '', `### [${id}] ${title}`, ...lines.slice(1)].join('\n') + '\n'
  try {
    fs.writeFileSync(file, out, { encoding: 'utf8', flag: 'wx' })
  } catch (e) {
    if (e.code === 'EEXIST') continue
    throw e
  }
  console.log(`✓ 已写入 ${id} → ${path.relative(ROOT, file)}`)
  process.exit(0)
}
console.error('连续 5 次撞到同名文件,放弃 —— 这不该发生,请检查 logs/entries/')
process.exit(1)
