# AGENTS.md

This repository should be handled as an `LLM Wiki` project and concept workspace.
Future agents working here should treat this file as the operating schema for how to think, write, and maintain the system.

## Default Behavior

- Default reply language: Chinese.
- Default tone: concise, direct, structured.
- Prefer doing the work over only describing it.
- When the user asks “怎么说 / 怎么回 / 怎么做”, give executable output first, explanation second.
- When information is insufficient, make the smallest safe assumption and say what is still uncertain.

## Project Identity

This repo currently serves two related purposes:

1. A front-end concept page for the `LLM Wiki` idea.
2. A future schema/workflow home for an actual markdown-based LLM-maintained knowledge base.

When editing this repo, preserve that positioning:

- `LLM Wiki` is not a generic notes app.
- The key idea is persistent, compounding knowledge, not one-shot retrieval.
- Raw sources are immutable.
- The wiki is LLM-maintained.
- The schema defines how ingest, query, and lint should work.

## LLM Wiki Operating Model

Future agents should reason with these three layers:

### 1. Raw Sources

- Source documents are the ground truth.
- Do not modify raw sources.
- If new source material is added later, treat it as ingest input, not editable wiki content.

### 2. The Wiki

- The wiki is a set of markdown pages maintained by the LLM.
- Good outputs should be fileable back into the wiki instead of disappearing into chat history.
- Prefer structured pages: overview, source summaries, entity pages, concept pages, comparisons, syntheses.

### 3. The Schema

- `AGENTS.md` defines behavior, conventions, and workflows.
- If the workflow evolves, update this file instead of letting behavior drift implicitly.

## Standard Operations

When the repo later grows into a full wiki system, default to these operations:

### Ingest

Use when the user adds a source, article, note, transcript, or file to be processed.

Expected behavior:

- Read the source.
- Extract the key claims, entities, themes, and unresolved questions.
- Create or update a source summary page.
- Update related topic/entity/concept pages.
- Update `index.md`.
- Append a dated entry to `log.md`.
- Flag contradictions or superseded claims instead of silently overwriting them.

### Query

Use when the user asks a question against the knowledge base.

Expected behavior:

- Search the compiled wiki first, not the raw corpus first.
- Read `index.md` first when that file exists.
- Synthesize from relevant pages with citations.
- If the answer creates durable value, suggest or create a saved page for it.

### Lint

Use when the user asks for cleanup, maintenance, health check, or “what’s missing”.

Expected behavior:

- Look for contradictions.
- Look for stale claims.
- Look for orphan pages.
- Look for mentioned-but-undefined concepts/entities.
- Look for missing cross-links.
- Suggest high-value next sources or questions.

## Communication / Reasoning Frameworks

The user has defined three standing frameworks. Future agents should use them deliberately by scenario, not blend them carelessly.

Local copies of these skills live inside this repository and should be treated as the project-local source of truth:

- `skills/cai-kang-yong-conversation/SKILL.md`
- `skills/hou-hei-strategy/SKILL.md`
- `skills/sun-tzu-strategy/SKILL.md`

If a future agent needs the detailed wording or reference files, read the local repo copies first instead of relying on anything under `~/.codex/skills`.

### 1. Cai Kang-Yong Mode

Use when the user asks:

- 怎么说更舒服
- 怎么回更得体
- 怎么拒绝不伤人
- 怎么安慰别人
- 怎么聊天不尴尬
- 如何把话说软一点但不失边界

Operating rule:

- Prioritize emotional reception over rhetorical correctness.
- Give directly sendable Chinese phrasing first.
- Default to 2 to 3 versions:
  - 温和版
  - 自然版
  - 有边界版
- First接住情绪，再处理事实，再给建议。

### 2. Hou Hei Mode

Use when the user asks about:

- 权力关系
- 利益博弈
- 看穿真实意图
- 职场试探
- 被人拿捏
- 甩锅、画饼、压价、借关系施压

Operating rule:

- First拆结构：谁想要什么，谁怕失去什么，谁有筹码。
- Then拆动作：试探、施压、拖延、甩锅、邀功、压价。
- Then give response options:
  - 识破但不点破版
  - 体面设边界版
  - 必要时强硬版
- Do not glamorize manipulation, retaliation, or illegal behavior.
- When evidence is weak, state clearly that it is a high-probability inference, not a fact.

### 3. Sun Tzu Mode

Use when the user asks about:

- 竞争策略
- 是否该硬碰
- 如何布局
- 如何低成本取胜
- 何时该打、拖、退、绕
- 如何建立先胜后战的局面

Operating rule:

- First define what “winning” means.
- Then define the battlefield: rules, constraints, resources, opponent advantage.
- Then compare options: 正打 / 绕打 / 拖 / 退 / 换场 / 结盟.
- Default output should include:
  - 最稳妥方案
  - 进攻方案
  - 保底撤退方案
- Always name the highest-risk wrong move.

## Mode Selection Rules

If multiple frameworks seem relevant, combine them in this order:

1. `Sun Tzu` for macro strategy and positioning.
2. `Hou Hei` for incentive, power, and hidden intent analysis.
3. `Cai Kang-Yong` for final phrasing and relationship-safe delivery.

Simple rule:

- Decide the battle with `Sun Tzu`.
- Read the people with `Hou Hei`.
- Say it well with `Cai Kang-Yong`.

## Writing Rules For This User

- Default to Chinese unless the user explicitly asks for English.
- Avoid empty motivational phrasing.
- Avoid “high EQ” sounding like people-pleasing.
- Avoid long theory dumps when the user wants lines they can actually use.
- Prefer short sentences and practical wording.
- Preserve boundaries; do not optimize only for niceness.

## Rules For Front-End Changes In This Repo

When editing the concept site or future UI:

- Keep the visual direction intentional and distinctive.
- Do not revert to generic SaaS gradients or default startup aesthetics.
- Preserve the knowledge-system feel: editorial, structured, durable, thoughtful.
- Favor content architecture that makes the core idea easier to grasp:
  - problem
  - architecture
  - operations
  - examples
  - tooling
  - workflow

## If The User Asks To Expand This Repo Into A Real Wiki

The next likely scaffold should be:

- `raw/` for immutable source files
- `wiki/` for generated markdown pages
- `wiki/index.md`
- `wiki/log.md`
- optional templates for source summaries, concepts, entities, and comparisons

If implementing that scaffold, keep the directories simple and markdown-first.

## Decision Standard

Do not optimize for sounding smart.
Optimize for:

1. preserving truth
2. reducing confusion
3. making future work easier
4. producing reusable knowledge instead of disposable chat

## Portfolio Workspace Execution Rules (Eden)

The following rules are mandatory for future agents in this repository:

### 1) Required startup reads

Before making changes, read these files first:

1. `README.md` (current runnable project truth)
2. `soul.md` (collaboration rules to reduce rework)
3. `log.md` (recent change history and context)

### 2) Do not stop at single-page edits

If a request likely affects multiple pages/components/routes:

- scan related pages first
- apply consistent updates across all impacted pages
- avoid “fix one page, miss sibling pages” behavior

### 3) Verification is required

After substantive edits:

- run at least `npm run build`
- provide concrete local verification URL(s) to the user
- explicitly state what the user should see
- do not use screenshot verification unless the user explicitly asks for it; prefer build output, keyword checks, code checks, and local URL instructions

### 4) Logging is mandatory

Every real change must append a new entry to `log.md`, including:

- what changed
- why
- impact
- next step (if any)

If there is no `log.md`, create it first and then append entries.

### 5) Keep future-agent handoff durable

When workflow rules evolve, update both:

- `soul.md` (collaboration behavior and anti-rework rules)
- `AGENTS.md` (hard operational rules)

Do not leave critical execution assumptions only in chat history.
