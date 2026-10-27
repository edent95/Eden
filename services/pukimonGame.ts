/**
 * Pukimon 公开版（原创角色的实时擂台对战）的加载器。游戏本体不在这个仓库：Pukimon 项目
 * （github.com/edent95/pukimon）
 *   npm run public:build && npm run embed:build -- --src public --out <Eden>/public/pukimon
 * 产出 `public/pukimon/bond-arena.js`（ES 模块，公开版：原创角色与素材）+ `public/pukimon/assets/`。
 * 用宝可梦素材的完整版不在这里，在 pukimon.eden-tan.com（Google 登录）。
 *
 * 另一个包 `public/pukimon-showdown/`：/pukimon 舞台上的「尼多力诺 vs 耿鬼」演示（用户 2026-10-27 决定公开放这两只、风险自己承担），
 *   在 Pukimon 跑 npm run embed:showdown -- --out <Eden>/public/pukimon-showdown
 * 只带这两只的素材，背景音乐是原创的开场曲；只给看，不能玩。
 *
 * 接口只有一个 `mount(host, opts) → handle`：游戏的 DOM 和样式装在 host 的 Shadow DOM 里，
 * `destroy()` 撤掉它起的计时器、事件监听、音频和 WebGL。host 每次都要用新元素（attachShadow 只能调一次）。
 */

export type PukimonOptions = {
  /** 传给游戏的网址参数，例如 `?fps` 显示帧率。 */
  query?: string;
  /** 预览：电脑对电脑、静音、不收键盘，打完自动开下一局。 */
  demo?: boolean;
  muted?: boolean;
  /** 画质倍数（1 = 正常）。预览用低一点省电。 */
  quality?: number;
  /** 追加进游戏 Shadow DOM 的样式。 */
  css?: string;
  /** 放引擎里写好剧本的演出（例如 'nidogengar'，showdown 包才有），照剧本打、到点重来。 */
  scene?: string;
};

export type PukimonHandle = {
  destroy: () => void;
  /** 暂停 / 继续游戏循环（滚出视野时停掉，省电）。 */
  setRunning: (on: boolean) => void;
  /** 开 / 关声音。开声音要在点击事件里调（浏览器只在用户手势里准出声）。 */
  setMuted: (muted: boolean) => void;
  /** 素材载完、演示开打之后 resolve。 */
  ready: Promise<void>;
};

type PukimonModule = { mount: (host: HTMLElement, opts?: PukimonOptions) => PukimonHandle };

/** 两个包：公开版（原创角色，能玩）和「尼多力诺 vs 耿鬼」演示。 */
export type PukimonBundle = 'pukimon' | 'pukimon-showdown';

const modulePromises = new Map<PukimonBundle, Promise<PukimonModule>>();

export const pukimonBundleUrl = (baseUrl: string, bundle: PukimonBundle = 'pukimon') =>
  // 用带 origin 的完整地址：Vite dev 会拦下对 /public 文件的相对动态 import（给它加 ?import 再报错）
  new URL(`${baseUrl.replace(/\/?$/, '/')}${bundle}/bond-arena.js`, window.location.href).href;

export function loadPukimon(baseUrl: string, bundle: PukimonBundle = 'pukimon'): Promise<PukimonModule> {
  let p = modulePromises.get(bundle);
  if (!p) {
    p = import(/* @vite-ignore */ pukimonBundleUrl(baseUrl, bundle)) as Promise<PukimonModule>;
    modulePromises.set(bundle, p);
    p.catch(() => { modulePromises.delete(bundle); }); // 失败了下次再试
  }
  return p;
}

/** 在 box 里挂一局游戏；返回的函数负责卸载。StrictMode 的二次挂载、加载中途卸载都安全。 */
export function mountPukimon(
  box: HTMLElement,
  baseUrl: string,
  opts: PukimonOptions,
  onState?: (state: 'ready' | 'missing', handle?: PukimonHandle) => void,
  bundle: PukimonBundle = 'pukimon',
): () => void {
  let handle: PukimonHandle | null = null;
  let cancelled = false;
  const host = document.createElement('div');
  host.className = 'pukimon-host';
  box.appendChild(host);
  loadPukimon(baseUrl, bundle)
    .then((mod) => {
      if (cancelled) return;
      handle = mod.mount(host, opts);
      onState?.('ready', handle);
    })
    .catch((err) => {
      if (cancelled) return;
      console.error('[pukimon] 载入失败', err);
      onState?.('missing');
    });
  return () => {
    cancelled = true;
    handle?.destroy();
    host.remove();
  };
}
