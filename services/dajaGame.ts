/**
 * Daja（实时擂台对战）的加载器。游戏本体不在这个仓库：Daja 项目
 *   npm run public:build && npm run embed:build -- --src public --out <Eden>/public/daja
 * 产出 `public/daja/bond-arena.js`（ES 模块，公开版：原创角色与素材）+ `public/daja/assets/`。
 *
 * 接口只有一个 `mount(host, opts) → handle`：游戏的 DOM 和样式装在 host 的 Shadow DOM 里，
 * `destroy()` 撤掉它起的计时器、事件监听、音频和 WebGL。host 每次都要用新元素（attachShadow 只能调一次）。
 */

export type DajaOptions = {
  /** 传给游戏的网址参数，例如 `?fps` 显示帧率。 */
  query?: string;
  /** 首页预览：电脑对电脑、静音、不收键盘，打完自动开下一局。 */
  demo?: boolean;
  muted?: boolean;
  /** 画质倍数（1 = 正常）。预览用低一点省电。 */
  quality?: number;
  /** 追加进游戏 Shadow DOM 的样式。 */
  css?: string;
};

export type DajaHandle = {
  destroy: () => void;
  /** 暂停 / 继续游戏循环（滚出视野时停掉，省电）。 */
  setRunning: (on: boolean) => void;
  /** 素材载完、演示开打之后 resolve。 */
  ready: Promise<void>;
};

type DajaModule = { mount: (host: HTMLElement, opts?: DajaOptions) => DajaHandle };

let modulePromise: Promise<DajaModule> | null = null;

export const dajaBundleUrl = (baseUrl: string) =>
  // 用带 origin 的完整地址：Vite dev 会拦下对 /public 文件的相对动态 import（给它加 ?import 再报错）
  new URL(`${baseUrl.replace(/\/?$/, '/')}daja/bond-arena.js`, window.location.href).href;

export function loadDaja(baseUrl: string): Promise<DajaModule> {
  if (!modulePromise) {
    modulePromise = import(/* @vite-ignore */ dajaBundleUrl(baseUrl)) as Promise<DajaModule>;
    modulePromise.catch(() => { modulePromise = null; }); // 失败了下次再试
  }
  return modulePromise;
}

/** 在 box 里挂一局游戏；返回的函数负责卸载。StrictMode 的二次挂载、加载中途卸载都安全。 */
export function mountDaja(
  box: HTMLElement,
  baseUrl: string,
  opts: DajaOptions,
  onState?: (state: 'ready' | 'missing', handle?: DajaHandle) => void,
): () => void {
  let handle: DajaHandle | null = null;
  let cancelled = false;
  const host = document.createElement('div');
  host.className = 'daja-host';
  box.appendChild(host);
  loadDaja(baseUrl)
    .then((mod) => {
      if (cancelled) return;
      handle = mod.mount(host, opts);
      onState?.('ready', handle);
    })
    .catch((err) => {
      if (cancelled) return;
      console.error('[daja] 载入失败', err);
      onState?.('missing');
    });
  return () => {
    cancelled = true;
    handle?.destroy();
    host.remove();
  };
}
