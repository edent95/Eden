---
id: vite
type: wiki
route: /wiki/vite
order: 1
status: published
---

# Vite as the vibe-coding engine

中文标题：Vite 作为 vibe coding 的引擎

The JSON block below is the structured bilingual source consumed by the site compiler.

```json
{
  "slug": "vite",
  "eyebrow": {
    "en": "Build skill",
    "zh": "构建技能"
  },
  "title": {
    "en": "Vite as the vibe-coding engine",
    "zh": "Vite 作为 vibe coding 的引擎"
  },
  "summary": {
    "en": "Vite is useful because it protects the build flow: fast dev server, fast HMR, simple config, and a production build that still forces reality checks.",
    "zh": "Vite 好用的地方，不只是快，而是它保护了构建心流：dev server 快、HMR 快、配置轻，同时 production build 仍然会逼你面对真实问题。"
  },
  "thesis": {
    "en": "For full vibe coding, use Vite as the fast loop, but keep a separate gate for typecheck, build, route checks, and broken-asset checks.",
    "zh": "如果是 fully vibe coding，Vite 应该负责“快速循环”，但必须另外保留 typecheck、build、路由检查和资源检查这道门。"
  },
  "sections": [
    {
      "title": {
        "en": "Why I adopted it",
        "zh": "为什么我会用 Vite"
      },
      "points": {
        "en": [
          "Jiju became too large to keep iterating comfortably without a faster build loop.",
          "The project needed clearer modular boundaries so UI, routes, assets, Firebase logic, and public pages could be changed without the whole app feeling tangled.",
          "Vite helped turn a heavy project into smaller feedback zones: change one page, one component, one asset path, then verify quickly."
        ],
        "zh": [
          "我会用 Vite，是因为 Jiju 项目变得太庞大，继续用慢反馈的方式迭代会一直出问题。",
          "项目需要更清楚的区块边界，让 UI、routes、assets、Firebase logic 和 public pages 不要全部缠在一起。",
          "Vite 帮我把一个很重的项目拆成更小的反馈区：改一个页面、一个组件、一个资源路径，然后快速验证。"
        ]
      }
    },
    {
      "title": {
        "en": "Why it feels good",
        "zh": "为什么它适合 vibe coding"
      },
      "points": {
        "en": [
          "Cold start is fast because dev does not bundle the whole app first.",
          "HMR keeps visual iteration alive, especially when adjusting UI, motion, copy, and microfeedback with AI.",
          "The config surface is small enough that AI can reason about the project without fighting a large custom bundler setup."
        ],
        "zh": [
          "冷启动快，因为开发环境不需要先把整个 app 打包完。",
          "HMR 让视觉迭代不中断，尤其适合和 AI 高频调整 UI、动效、文案和微反馈。",
          "配置面足够小，AI 比较容易理解项目，不会先卡在一大套自定义 bundler 配置里。"
        ]
      }
    },
    {
      "title": {
        "en": "The traps",
        "zh": "真正要小心的缺点"
      },
      "points": {
        "en": [
          "Dev and production are not identical: dev uses native ESM plus esbuild behavior, while production uses Rollup.",
          "Vite transpiles TypeScript quickly, but it does not typecheck by itself.",
          "Large component trees can create a local network waterfall during dev because many modules are requested separately.",
          "Dependency cache can create stale-behavior bugs; clearing `node_modules/.vite` or running with `--force` is sometimes necessary.",
          "Old CommonJS packages or dynamic require patterns can still create compatibility work."
        ],
        "zh": [
          "开发环境和生产环境不完全一样：dev 是 native ESM 加 esbuild 行为，production 是 Rollup 打包。",
          "Vite 会快速转译 TypeScript，但它本身不负责 typecheck。",
          "大型组件树在 dev 下可能形成本地 network waterfall，因为浏览器会分开请求很多模块。",
          "依赖缓存会制造“看起来像幽灵”的旧行为；有时要清 `node_modules/.vite` 或用 `--force` 重跑。",
          "老旧 CommonJS 包、动态 require、旧 SDK 仍然可能需要额外兼容处理。"
        ]
      }
    },
    {
      "title": {
        "en": "How to use it for full vibe coding",
        "zh": "fully vibe coding 时怎么用"
      },
      "points": {
        "en": [
          "Let `npm run dev` stay non-blocking: it should show the UI quickly and keep HMR smooth.",
          "Do not rely on the dev server as proof of correctness; run `npm run typecheck` and `npm run build` before treating a change as done.",
          "Use TypeScript as AI context, not as a wall during exploration. Prefer fixing types later in a dedicated pass instead of scattering `@ts-ignore`.",
          "Use stable imports and route helpers. Path aliases are useful, but only if the repo is structured around them consistently.",
          "Keep Firebase or backend access in a small number of service files so AI can hold the data model in context.",
          "Check real assets and public routes after changes. A passing UI can still hide broken images, wrong base paths, or missing public files."
        ],
        "zh": [
          "让 `npm run dev` 保持不阻断：它的任务是快速显示 UI，并让 HMR 顺。",
          "不要把 dev server 正常当成正确证明；完成前一定跑 `npm run typecheck` 和 `npm run build`。",
          "TypeScript 应该作为 AI 理解代码库的地图，不是探索阶段的墙。不要到处撒 `@ts-ignore`，更好的做法是最后集中修类型。",
          "import 和 route helper 要稳定。alias 很有用，但前提是整个 repo 真的按这个结构维护。",
          "Firebase 或后端访问集中在少数 service 文件里，让 AI 能一次读懂数据模型。",
          "改完要检查真实资源和公开路由。UI 能跑，不代表图片、base path、public files 都没断。"
        ]
      }
    },
    {
      "title": {
        "en": "Rule of thumb",
        "zh": "我的使用原则"
      },
      "points": {
        "en": [
          "Vite is excellent for speed, but speed must be paired with a release checklist.",
          "During exploration, optimize for flow. Before handoff, optimize for truth.",
          "The best Vite setup for AI work is boring: predictable dev server, explicit routes, clean services, and repeatable checks."
        ],
        "zh": [
          "Vite 非常适合速度，但速度必须配一套发布检查。",
          "探索时优化心流；交付前优化真实性。",
          "最适合 AI 协作的 Vite 架构其实要无聊：dev server 可预测、路由明确、service 清楚、检查可重复。"
        ]
      }
    }
  ]
}
```
