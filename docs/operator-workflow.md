# Eden Operator Workflow

这套操作层把仓库里的 Markdown 规则接到真正会执行、会失败、会反馈的命令上。目标不是取消 branch protection，而是让正确路径比直接 push `main` 更省事。

第一次使用时也可以打开图形化操作菜单：`/operator-menu.html`。它提供闭环示意图、安全护栏、故障恢复和可复制命令；HTML 只负责解释与复制，不会从浏览器直接执行 shell 或绕过终端确认。

## 最短路径

```bash
# 1. 开始任务
npm run task:new -- "更新首页文案"

# 2. 修改代码，并在 logs/YYYY-MM.md 追加结构化记录

# 3. 发布
npm run publish -- "更新首页文案"
```

`publish` 会在提交前再次显示文件范围，并要求输入 `yes`。它随后自动执行：

```text
Markdown / code changes
  → wiki:build + log:index
  → npm run check
  → commit + push work branch
  → Pull Request
  → required verify check
  → squash merge
  → GitHub Pages deploy
  → live homepage / sitemap / manifest checks
```

## 三个命令

### `npm run task:new -- "任务名"`

- 只能从默认分支开新任务。
- 建立 `work/YYYYMMDD-HHmm-任务名` 分支，降低命名冲突。
- 如果 `main` 上已有未提交改动，会把改动安全地带到新分支，不会 stash、reset 或删除文件。
- 如果已经在任务分支，会停止并显示当前分支，避免把两个任务混在一起。

### `npm run ready`

- 运行 `wiki:build`，更新 Markdown 编译产物。
- 运行 `log:index`，更新最近变更索引。
- 运行 `npm run check`，执行 policy、unit、typecheck、production build 与 smoke checks。
- 没有当月结构化日志时仍会失败；自动生成索引不会替代人的变更说明。

### `npm run publish -- "提交标题"`

- 先自动运行 `ready`。
- 永不直接 push 默认分支；如果发现工作误留在 `main`，先自动切到新的 `work/*` 分支。
- 显示将提交的文件，并在交互终端要求输入完整的 `yes`。
- 提交、push、建立或复用 PR，等待 required checks。
- PR 落后默认分支时，先用 GitHub 的 update-branch 操作更新。
- 默认 squash merge；随后同步本地 `main`，等待对应 deploy workflow，并检查线上首页、sitemap 与 Eden manifest。

可选参数：

- `--dry-run`：只显示范围和计划，不改文件、不提交、不 push，也不创建 PR。
- `--yes` / `-y`：跳过交互确认。只用于已经人工或 Agent 检查过范围的非交互执行环境。
- `--no-merge`：等待 PR checks 通过后停止，保留 PR 给人审阅或手动合并。

## Markdown 指令如何变成 Harness

| Markdown 规则 | 可执行动作 | 自动反馈 | 阻止错误的位置 |
|---|---|---|---|
| Wiki source 必须编译 | `wiki:build` | 生成或提示 stale output | `verify:wiki` / PR `verify` |
| 每次改动必须记日志 | `log:index` | 缺月份、字段或索引会报具体原因 | `verify:log` / PR `verify` |
| 完成前必须全量验证 | `npm run check` | policy、test、typecheck、build、smoke 分层输出 | 本地 `ready` 与 CI |
| 禁止直接发布 `main` | `task:new` / `publish` | 自动建工作分支 | GitHub branch protection |
| 合并后必须确认生产 | deploy wait + live checks | Actions URL 与三个 HTTP 结果 | `publish` 最终阶段 |

文字规则继续定义意图；脚本负责机械执行；GitHub 权限和 required check 负责不可绕过的边界；日志与终端输出构成反馈循环。

## 故障时怎么恢复

- `ready` 失败：按最早出现的错误修复，再重新运行 `publish`；它不会在检查失败后提交或 push。
- PR check 失败：PR 和工作分支都会保留；修复后再次运行同一个 `publish` 标题即可复用该 PR。
- merge 后 deploy 失败：代码已经在 `main`，命令会返回非零并给出 Actions URL；修复应从新的任务分支走同一流程。
- live check 失败：先打开 deploy URL 确认 Pages 已完成，再检查 DNS/CDN；不要绕过 branch protection 重推 `main`。
