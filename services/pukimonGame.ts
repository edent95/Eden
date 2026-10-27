/**
 * Pukimon 公开版（原创角色的实时擂台对战）的加载器。游戏本体不在这个仓库：Pukimon 项目
 * （github.com/edent95/pukimon）
 *   npm run public:build && npm run embed:build -- --src public --out <Eden>/public/pukimon
 * 产出 `public/pukimon/bond-arena.js`（ES 模块，公开版：原创角色与素材）+ `public/pukimon/assets/`。
 * 用宝可梦素材的完整版不在这里，在 pukimon.eden-tan.com（Google 登录）。
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
};

export type PukimonHandle = {
  destroy: () => void;
  /** 暂停 / 继续游戏循环（滚出视野时停掉，省电）。 */
  setRunning: (on: boolean) => void;
  /** 素材载完、演示开打之后 resolve。 */
  ready: Promise<void>;
};

type PukimonModule = { mount: (host: HTMLElement, opts?: PukimonOptions) => PukimonHandle };

let modulePromise: Promise<PukimonModule> | null = null;

export const pukimonBundleUrl = (baseUrl: string) =>
  // 用带 origin 的完整地址：Vite dev 会拦下对 /public 文件的相对动态 import（给它加 ?import 再报错）
  new URL(`${baseUrl.replace(/\/?$/, '/')}pukimon/bond-arena.js`, window.location.href).href;

export function loadPukimon(baseUrl: string): Promise<PukimonModule> {
  if (!modulePromise) {
    modulePromise = import(/* @vite-ignore */ pukimonBundleUrl(baseUrl)) as Promise<PukimonModule>;
    modulePromise.catch(() => { modulePromise = null; }); // 失败了下次再试
  }
  return modulePromise;
}

/** 在 box 里挂一局游戏；返回的函数负责卸载。StrictMode 的二次挂载、加载中途卸载都安全。 */
export function mountPukimon(
  box: HTMLElement,
  baseUrl: string,
  opts: PukimonOptions,
  onState?: (state: 'ready' | 'missing', handle?: PukimonHandle) => void,
): () => void {
  let handle: PukimonHandle | null = null;
  let cancelled = false;
  const host = document.createElement('div');
  host.className = 'pukimon-host';
  box.appendChild(host);
  loadPukimon(baseUrl)
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
