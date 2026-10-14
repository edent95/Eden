import { mountDaja } from '../services/dajaGame';

/**
 * 首页「开始」：盖一层全屏的 Daja，从组队开始玩；退出全屏或点「退出」就整局卸掉、回到首页原位。
 *
 * 必须在点击事件里同步调用：requestFullscreen 只认用户手势，所以这一层是直接操作 DOM 建的，
 * 不走 React 渲染（等 React 提交再请求全屏，浏览器就不认了）。
 * iPhone 的 Safari 没有元素全屏接口：这一层照样盖满视口（position: fixed），只是地址栏还在。
 */

// 游戏自己的「⛶ 全屏」按钮会去全屏游戏容器，和这一层冲突；藏掉，原位放这一层的「退出」
const GAME_CSS = '#fsBtn { display: none !important; }';

type FullscreenEl = HTMLElement & { webkitRequestFullscreen?: () => Promise<void> | void };

export function openDajaPlayLayer({ baseUrl, isZh, onClose }: { baseUrl: string; isZh: boolean; onClose?: () => void }) {
  const layer = document.createElement('div') as FullscreenEl;
  layer.className = 'daja-play-layer';
  layer.setAttribute('role', 'dialog');
  layer.setAttribute('aria-label', 'Daja');
  const box = document.createElement('div');
  box.className = 'daja-play-box';
  const exit = document.createElement('button');
  exit.type = 'button';
  exit.className = 'daja-play-exit';
  exit.textContent = isZh ? '✕ 退出' : '✕ Exit';
  layer.append(box, exit);
  document.body.appendChild(layer);
  const root = document.documentElement;
  const prevOverflow = root.style.overflow;
  root.style.overflow = 'hidden';

  let wasFull = false;
  try {
    const req = layer.requestFullscreen ? layer.requestFullscreen({ navigationUI: 'hide' }) : layer.webkitRequestFullscreen?.();
    Promise.resolve(req)
      .then(() => (screen.orientation as ScreenOrientation & { lock?: (o: string) => Promise<void> })?.lock?.('landscape'))
      .catch(() => {});
  } catch {
    // 没有全屏接口：就当普通的盖满视口
  }

  const unmount = mountDaja(box, baseUrl, { css: GAME_CSS }, (state) => {
    if (state === 'missing') box.textContent = isZh ? '游戏载入失败，稍后再试。' : 'The game failed to load. Try again later.';
  });

  let done = false;
  const onFullscreen = () => {
    if (document.fullscreenElement === layer) wasFull = true;
    else if (wasFull) close(); // 用户按 Esc / 系统手势退出了全屏：一起关掉
  };
  document.addEventListener('fullscreenchange', onFullscreen);

  function close() {
    if (done) return;
    done = true;
    document.removeEventListener('fullscreenchange', onFullscreen);
    unmount();
    if (document.fullscreenElement === layer) document.exitFullscreen().catch(() => {});
    layer.remove();
    root.style.overflow = prevOverflow;
    onClose?.();
  }
  exit.addEventListener('click', close);
  // 焦点不能留在按钮上：游戏用空格闪避，空格会「点」到获得焦点的按钮（首页的「开始」、这里的「退出」）
  (document.activeElement as HTMLElement | null)?.blur?.();
  exit.addEventListener('focus', () => exit.blur());
  return close;
}
