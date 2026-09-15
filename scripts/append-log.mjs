#!/usr/bin/env node
/**
 * 往 log.md 追加一条条目。**只追加,不重写整个文件。**
 *
 * 为什么要这个脚本:常见做法是「读整个 log.md → 字符串拼接 → 整文件写回」。
 * 两个会话同时写时,后写的那个会把先写的整段覆盖掉 —— 而且不会报错。
 * 2026-09-01 在 personal-dashboard 真的发生过:另一个会话写了 E-2026-09-01-16/17,
 * 本会话差点用同一个 id 覆盖掉。实测(两个进程各写 40 条):
 * 读-改-写 落盘 18/80,`fs.appendFileSync`(O_APPEND)落盘 80/80。
 *
 * 这里用 `fs.appendFileSync`:写入相对文件末尾是原子的,两个并发追加都会落盘。
 * **前提是 log.md 按「旧 → 新」排,新条目在末尾。** 全机项目已于 2026-09-10 统一成这个方向。
 *
 * 条目 ID 由脚本分配(当天最大序号 +1),写的人不用关心;写完会复查有没有重号。
 *
 * ── 天标题 ──────────────────────────────────────────────────────────────────
 * 脚本会在需要时**自动补一个 `## YYYY-MM-DD` 天标题**。这不是排版洁癖:
 * 面板的 `parseEntries()` 是**按 `##` 天聚合**的,没有天标题的日志它一条都看不见。
 * 实测过后果:personal-dashboard 79 条条目全挤在一个 `## 2026-08-31` 底下,面板只显示 1 条,
 * `updated` 永远停在 8 月 31 日;Subtitle 一个天标题都没有,面板显示 0 条。
 * 天标题和条目在**同一次 appendFileSync** 里写出去,所以并发下不会出现「有标题没条目」。
 *
 * 用法:
 *   node scripts/append-log.mjs < entry.md     # 正文从 stdin 读,首行是 `### 标题`
 *   node scripts/append-log.mjs --check        # 检查 id 重号 + 天标题是否递增
 *   LOGBOOK_FILE=path/to/log.md node scripts/append-log.mjs < entry.md
 *
 * 找 log.md 的顺序:$LOGBOOK_FILE → 从 cwd 逐级往上找的第一个 log.md。
 * (所以在仓库任何子目录里跑都能用,不依赖脚本自己放在哪。)
 */
import fs from 'node:fs'
import path from 'node:path'

const ID_RE = /^###\s*\[(E-\d{4}-\d{2}-\d{2}-\d{2})\]/gm
const DAY_RE = /^##[ \t]+(\d{4}-\d{2}-\d{2})/gm

/** 从 cwd 逐级往上找 log.md —— 在仓库任何子目录里跑都能用。 */
function findLog() {
  if (process.env.LOGBOOK_FILE) return path.resolve(process.env.LOGBOOK_FILE)
  let dir = process.cwd()
  for (;;) {
    const p = path.join(dir, 'log.md')
    if (fs.existsSync(p)) return p
    const up = path.dirname(dir)
    if (up === dir) break
    dir = up
  }
  console.error('找不到 log.md(从当前目录逐级往上找过了)。用 LOGBOOK_FILE=… 指定,或先建一个。')
  process.exit(2)
}

const LOG = findLog()

/**
 * 把 ``` / ~~~ 围栏里的内容换成等长空格再找标题。
 *
 * 不这么做会误判:log.md 开头的「格式约定」一节里就有用 ```markdown 写的条目模板,
 * 里面的 `## YYYY-MM-DD` 会被当成真的天标题,于是脚本以为今天已经有标题了,不再补。
 * 用等长空格而不是删除,是为了 `index` 仍然对得上原文。
 *
 * (这段和 `scripts/lib/logmd.mjs` 里的同名函数重复。故意的:这个脚本要被原样拷进
 * 十几个仓库,必须自包含、零依赖 —— 宁可重复十行,不要让它 import 一个别处的库。)
 */
function maskFences(body) {
  const out = body.split('\n')
  let fence = null
  for (let i = 0; i < out.length; i++) {
    const m = /^[ \t]{0,3}(```+|~~~+)/.exec(out[i])
    if (fence == null) {
      if (m) { fence = m[1][0]; out[i] = ' '.repeat(out[i].length) }
    } else {
      const closing = m && m[1][0] === fence
      out[i] = ' '.repeat(out[i].length)
      if (closing) fence = null
    }
  }
  return out.join('\n')
}

const allIds = (text) => [...text.matchAll(ID_RE)].map((m) => m[1])
const allDays = (text) => [...maskFences(text).matchAll(DAY_RE)].map((m) => m[1])

/** 本地日期。**不要用 `toISOString()`** —— 那是 UTC,东八区的晚上会写成昨天。 */
function today() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/**
 * 给「读当天最大序号 → 追加」这一小段加一把排他锁。
 *
 * 为什么需要:`appendFileSync` 保证两条都落盘,但**保证不了两条的 ID 不一样** ——
 * 两个进程可能读到同一个「当天最大序号」,各自 +1 得到同一个号。实测两个进程各写 40 条,
 * 不加锁有 27 条撞号(内容一条没丢,但 ID 重了)。
 *
 * 锁**失败时故意放行**(fail open):拿不到锁就照常追加,顶多退回到「撞号并吵闹」的老行为。
 * 宁可偶尔重号,也不能因为一个陈旧锁文件就让人写不进日志。
 */
function withIdLock(fn) {
  const lock = LOG + '.append-lock'
  let fd = null
  for (let i = 0; i < 50; i++) {
    try { fd = fs.openSync(lock, 'wx'); break } catch (e) {
      if (e.code !== 'EEXIST') break
      // 陈旧锁:上一次跑到一半被杀了,10 秒后直接抢过来
      try { if (Date.now() - fs.statSync(lock).mtimeMs > 10_000) { fs.unlinkSync(lock); continue } } catch {}
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 20)   // 睡 20ms
    }
  }
  try { return fn() } finally {
    if (fd != null) { fs.closeSync(fd); try { fs.unlinkSync(lock) } catch {} }
  }
}

function check() {
  const text = fs.readFileSync(LOG, 'utf8')
  const ids = allIds(text)
  const seen = new Map()
  for (const id of ids) seen.set(id, (seen.get(id) ?? 0) + 1)
  const dup = [...seen].filter(([, n]) => n > 1)
  const days = allDays(text)
  const unsorted = days.findIndex((d, i) => i > 0 && d < days[i - 1])

  console.log(`${LOG}\n  ${ids.length} 条带 ID 的条目 · ${days.length} 个天标题`)
  let bad = false
  if (dup.length) {
    console.error(`  ✗ 重复 ID:${dup.map(([id, n]) => `${id}×${n}`).join(', ')}`)
    bad = true
  } else console.log('  ✓ 没有重复 ID')

  // 「旧 → 新」是 O_APPEND 追加能成立的前提。倒过来的话新条目会落到最旧那一天底下。
  if (unsorted > 0) {
    console.error(`  ✗ 天标题不是「旧→新」:${days[unsorted - 1]} 之后出现了 ${days[unsorted]}`)
    bad = true
  } else if (days.length > 1) console.log('  ✓ 天标题「旧→新」递增')

  // 同一天出现两个 `## 日期`:并发下两个会话可能同时判断「今天还没有标题」。
  // 解析器允许一天多条(`date` 不是唯一键),所以这不算错,但合并掉更干净。
  const dupDay = [...new Set(days.filter((d, i) => days.indexOf(d) !== i))]
  if (dupDay.length) console.log(`  · 提示:${dupDay.join(', ')} 有重复的天标题,可以手工合并(不影响解析)`)

  if (bad) process.exit(1)
}

if (process.argv.includes('--check')) {
  check()
  process.exit(0)
}

const body = fs.readFileSync(0, 'utf8').trim()
if (!body.startsWith('###')) {
  console.error('条目必须以 `### 标题` 开头(ID 由本脚本分配,不用自己写)')
  process.exit(2)
}

const date = today()
const { id, needDay } = withIdLock(() => {
  const before = fs.readFileSync(LOG, 'utf8')
  const taken = allIds(before).filter((x) => x.startsWith(`E-${date}-`))
  const id = `E-${date}-${String(taken.reduce((m, x) => Math.max(m, Number(x.slice(-2))), 0) + 1).padStart(2, '0')}`

  // 首行换成带 ID 的标题;写的人给的 ID(如果有)一律以脚本分配的为准
  const lines = body.split('\n')
  lines[0] = `### [${id}] ${lines[0].replace(/^###\s*(\[E-\d{4}-\d{2}-\d{2}-\d{2}\])?\s*/, '')}`

  // 文件按「旧→新」排,所以最后一个天标题就是最新的一天。不是今天就补一个。
  // 天标题与条目在**同一次 appendFileSync** 里写出去,不会出现「有标题没条目」。
  const days = allDays(before)
  const needDay = days[days.length - 1] !== date
  fs.appendFileSync(LOG, (needDay ? `\n## ${date}\n` : '') + `\n${lines.join('\n')}\n`, 'utf8')
  return { id, needDay }
})

// 复查:并发下两个会话仍可能算出同一个号(窗口很窄,但不是零)
const after = allIds(fs.readFileSync(LOG, 'utf8')).filter((x) => x === id)
if (after.length > 1) {
  console.error(`⚠️  ${id} 出现了 ${after.length} 次 —— 有并发写入,请手工改掉其中一条的序号`)
  process.exit(1)
}
console.log(`✓ 已追加 ${id}${needDay ? `(并新开 ## ${date})` : ''} → ${LOG}`)
