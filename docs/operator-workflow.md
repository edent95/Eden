# Eden Operator Workflow

这套操作层把仓库里的 Markdown 规则接到真正会执行、会失败、会反馈的命令上。目标不是取消 branch protection，而是让正确路径比直接 push `main` 更省事。

第一次使用时也可以打开图形化操作菜单：`/operator-menu.html`。它提供闭环示意图、安全护栏、故障恢复和可复制命令；HTML 只负责解释与复制，不会从浏览器直接执行 shell 或绕过终端确认。

## 最短路径

```bash
# 1. 直接在当前目录修改（不必先开分支），并用 npm run log:append < entry.md 在 logs/entries/ 新建一条结构化记录

# 2. 只暂存你这次改的文件（绝不 git add -A / . / --all）
git add <你的文件> …

# 3. 发布：开 PR 后停止，CI 通过后自动合并
npm run publish -- "fix: 更新首页文案"
```

`publish` 只提交已暂存的文件；什么都没暂存时会列出工作区改动并提示 `git add`，然后停止。它会在提交前再次显示「将提交」与「不会提交」两份清单，并要求输入 `yes`。它随后自动执行：

```text
Markdown / code changes
  → wiki:build + log:index
  → npm run check
  → （在 main 上时）从 origin/main 开 <类型>/<YYYYMMDD>-<描述> 分支
  → commit（只含已暂存文件）+ push
  → Pull Request，命令到此结束
  → required verify check → GitHub 原生自动合并 / 面板 PR 自动合并
  → GitHub Pages deploy

仅 --merge：命令自己等 verify → squash merge → 等 deploy → live homepage / sitemap / manifest checks
```

## 三个命令

### `npm run task:new -- "任务名"`（可选）

- 不是必需步骤：默认做法是直接在当前目录改，`publish` 在提交时才开分支。
- 只能从默认分支开新任务。
- 建立 `<类型>/YYYYMMDD-任务名` 分支（类型取自标题前缀，如 `fix:`，缺省 `chore`）。
- 如果 `main` 上已有未提交改动，会把改动安全地带到新分支，不会 stash、reset 或删除文件。
- 如果已经在任务分支，会停止并显示当前分支，避免把两个任务混在一起。

### `npm run ready`

- 运行 `wiki:build`，更新 Markdown 编译产物。
- 运行 `log:index`，更新最近变更索引。
- 运行 `npm run check`，执行 policy、unit、typecheck、production build 与 smoke checks。
- 没有当月结构化日志时仍会失败；自动生成索引不会替代人的变更说明。

### `npm run publish -- "提交标题"`

- 只提交已暂存（`git add` 过）的文件，绝不 `git add --all`；未暂存与未跟踪的改动（可能是别的会话的）留在工作区。
- 永不直接 push 默认分支；在 `main` 上运行时，从 `origin/main` 开出 `<类型>/<YYYYMMDD>-<描述>` 分支并带上改动（与 origin 冲突时 git 拒绝切换，命令停止）。本地 `main` 有未推送提交时停止。
- 自动运行 `ready`；ready 重新生成的派生文件（`generated/content.ts`、`logs/index.md`）只在它们事先是干净的时候才替你暂存。
- 显示将提交的文件，并在交互终端要求输入完整的 `yes`。
- 提交、push、建立或复用 PR，然后停止。合并由 CI 通过后的自动合并完成；CI 失败就在同一分支修，再运行 `publish`。
- `--merge`（仅在人明确要求时）：PR 落后时先 update-branch，等待 required checks，squash merge，同步本地 `main`，等待 deploy workflow，并检查线上首页、sitemap 与 Eden manifest。

可选参数：

- `--dry-run`：只显示范围和计划，不改文件、不提交、不 push，也不创建 PR。
- `--yes` / `-y`：跳过交互确认。只用于已经人工或 Agent 检查过范围的非交互执行环境。
- `--merge`：命令自己等 verify、合并并跟到部署。缺省不合并；`--no-merge` 仍被接受，等同缺省。

## Markdown 指令如何变成 Harness

| Markdown 规则 | 可执行动作 | 自动反馈 | 阻止错误的位置 |
|---|---|---|---|
| Wiki source 必须编译 | `wiki:build` | 生成或提示 stale output | `verify:wiki` / PR `verify` |
| 每次改动必须记日志 | `log:index` | 缺月份、字段或索引会报具体原因 | `verify:log` / PR `verify` |
| 完成前必须全量验证 | `npm run check` | policy、test、typecheck、build、smoke 分层输出 | 本地 `ready` 与 CI |
| 禁止直接发布 `main` | `publish` | 提交时自动建工作分支 | GitHub branch protection |
| 只提交自己的改动 | `publish` 只提交已暂存文件 | 「将提交 / 不会提交」两份清单 | `publish` 提交前 |
| 合并后必须确认生产 | `--merge` 的 deploy wait + live checks | Actions URL 与三个 HTTP 结果 | `publish --merge` 最终阶段 |

文字规则继续定义意图；脚本负责机械执行；GitHub 权限和 required check 负责不可绕过的边界；日志与终端输出构成反馈循环。

## 故障时怎么恢复

- `ready` 失败：按最早出现的错误修复，再重新运行 `publish`；它不会在检查失败后提交或 push。
- PR check 失败：PR 和工作分支都会保留；修复、`git add` 修改的文件后再次运行同一个 `publish` 标题即可复用该 PR。
- merge 后 deploy 失败：代码已经在 `main`，命令会返回非零并给出 Actions URL；修复应从新的任务分支走同一流程。
- live check 失败：先打开 deploy URL 确认 Pages 已完成，再检查 DNS/CDN；不要绕过 branch protection 重推 `main`。
