/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, ArrowRight, Download, Plus } from 'lucide-react';
import { HeaderControls, resolveAssetPath } from '../app/shared';
import type { Language, Theme, ThemePreference } from '../app/shared';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

const filmGalleryPhotos = [
  {
    src: '/film-gallery/film-gallery-1.png',
    alt: {
      en: 'Film photograph of a street receding into soft depth, everyday scale',
      zh: '胶片街景，景深将路面与街景分成柔和层次',
    },
    caption: {
      en: 'A quiet street read in layers: a soft near plane, honest everyday scale, no staging.',
      zh: '用景深把街面读成层次：前景柔和，日常尺度，非摆拍场面。',
    },
  },
  {
    src: '/film-gallery/film-gallery-2.png',
    alt: { en: 'Hazy city skyline on film, layered grays and blues', zh: '胶片中的城市天际线，灰蓝层次' },
    caption: {
      en: 'Humid air over the city—haze and distance rendered as believable, restrained tones.',
      zh: '城市上空的湿气与距离，被胶片压成克制、可信的灰与蓝。',
    },
  },
  {
    src: '/film-gallery/film-gallery-3.png',
    alt: { en: 'Tall building on film, glass catching a sliver of light', zh: '高塔与玻璃上一道细光' },
    caption: {
      en: 'A vertical study: weight, edge, and a thin strip of light along glass.',
      zh: '竖向的体量与边线，玻璃上的一条薄光把材质说清楚。',
    },
  },
  {
    src: '/film-gallery/film-gallery-4.png',
    alt: { en: 'Calm waterfront, soft highlights on open water', zh: '平静水面与细碎高光' },
    caption: {
      en: 'Open water, small speculars, and a horizon line that gives the eye a place to rest.',
      zh: '开阔水面、细碎高光，与一条让视线能落稳的水平线。',
    },
  },
  {
    src: '/film-gallery/film-gallery-5.png',
    alt: { en: 'Film frame with a gentle light leak along the edge of the scene', zh: '画缘一道柔和的漏光' },
    caption: {
      en: 'A light leak that reads like a mark of process—kept, not “fixed out.”',
      zh: '漏光像流程留下的签名：保留，而不是当成失误修掉。',
    },
  },
  {
    src: '/film-gallery/film-gallery-6.png',
    alt: { en: 'Ornate temple details softened by emulsion grain', zh: '庙宇细部在颗粒中变得可信' },
    caption: {
      en: 'Carving and shadow held in grain: detail that would go plastic if over-sharpened.',
      zh: '雕刻与阴影像嵌在乳剂里，过度锐化才会显“塑料”。',
    },
  },
  {
    src: '/film-gallery/film-gallery-7.png',
    alt: { en: 'Mountain haze, long tonal gradients in the distance', zh: '远山与漫开的空气感' },
    caption: {
      en: 'Atmosphere over drama—distance carried by long, quiet tonal ramps.',
      zh: '不追求戏剧性，靠长调子把远距托成可感的空气。',
    },
  },
  {
    src: '/film-gallery/film-gallery-8.png',
    alt: { en: 'Coastal view of a city, modest color separation on film', zh: '海岸线上的城市，色彩关系克制' },
    caption: {
      en: 'A coastal read of the city, color kept modest and believable in mixed light.',
      zh: '混合光里读海岸城市，色彩不抢戏，但站得住。',
    },
  },
  {
    src: '/film-gallery/film-gallery-9.png',
    alt: { en: 'Open horizon where sea and sky meet under heavy clouds', zh: '重云下海天相接的开阔线' },
    caption: {
      en: 'A simple split between water and weather—room left for the eye to move.',
      zh: '水与天的交界故意留到最简，好让视线有路可走。',
    },
  },
  {
    src: '/film-gallery/film-gallery-10.png',
    alt: { en: 'Geometric city scene, bicycle as a clear visual anchor', zh: '城市几何，单车作视觉锚点' },
    caption: {
      en: 'Geometry in the block: a wheel, a line, a center that orders the rest of the frame.',
      zh: '街区里的几何：一轮、一线，用清晰的重心把余下元素收住。',
    },
  },
  {
    src: '/film-gallery/film-gallery-11.png',
    alt: { en: 'Candid people by the sea, unposed', zh: '水边未加导演的日常一瞬' },
    caption: {
      en: 'A candid exchange at the water’s edge—ordinary, and meant to stay that way.',
      zh: '水边的寻常交谈，刻意保留不必“升格”的平凡。',
    },
  },
  {
    src: '/film-gallery/film-gallery-12.jpg',
    alt: { en: 'Cargo ship crossing calm water beneath a wide cloudy sky', zh: '货船驶过平静水面，城市与云层铺在远方' },
    caption: {
      en: 'A small vessel under an enormous sky, with the city held quietly along the horizon.',
      zh: '一艘小船压在辽阔云层之下，城市安静地停在水平线上。',
    },
  },
  {
    src: '/film-gallery/film-gallery-13.jpg',
    alt: { en: 'Candid portrait in a warmly lit restaurant', zh: '暖色餐馆里戴墨镜男子的抓拍肖像' },
    caption: {
      en: 'A candid portrait held by warm light, shadow, and the grain of an evening indoors.',
      zh: '暖光、阴影与夜里的颗粒，共同托住一张没有摆拍感的肖像。',
    },
  },
  {
    src: '/film-gallery/film-gallery-14.jpg',
    alt: { en: 'Dim temple altar illuminated by red lanterns and candles', zh: '红灯与烛光照亮幽暗的庙宇内殿' },
    caption: {
      en: 'An interior carried by low light: red lamps, carved surfaces, and pools of reflection.',
      zh: '低光里的内殿，由红灯、雕刻与一小片反光慢慢显形。',
    },
  },
  {
    src: '/film-gallery/film-gallery-15.jpg',
    alt: { en: 'Ornate temple roofline crowned by twin dragon sculptures', zh: '双龙雕塑立于色彩鲜明的庙宇屋脊' },
    caption: {
      en: 'Twin dragons and a crowded roofline cut cleanly against an open pale sky.',
      zh: '双龙与密集屋脊切在清淡天空上，繁复却保持清楚。',
    },
  },
];

const filmGalleryCameras = [
  {
    name: 'Konica Auto S2',
    frameNumbers: [1, 2, 6, 7, 8, 9, 10, 11],
  },
  { name: 'Rolleiflex Old Standard (Model 621)', frameNumbers: [3, 4, 5] },
  { name: 'Zeiss Ikon Contessa 35', frameNumbers: [12, 13, 14, 15] },
];

const filmGalleryStocks = [
  { name: 'Kodak Gold 200', frameNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
  { name: 'Kodak Gold 400', frameNumbers: [14, 15] },
];

const filmGalleryFrames = filmGalleryPhotos
  .map((photo, index) => ({ photo, frameNumber: index + 1 }))
  .reverse();

export const FilmGalleryFullPage: React.FC<{
  homeHref: string;
  baseUrl: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, baseUrl, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const filmStripRef = React.useRef<HTMLDivElement>(null);
  const [installPrompt, setInstallPrompt] = React.useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = React.useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches,
  );
  const [isDownloading, setIsDownloading] = React.useState(false);

  React.useEffect(() => {
    const captureInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };
    const markInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };
    window.addEventListener('beforeinstallprompt', captureInstallPrompt);
    window.addEventListener('appinstalled', markInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', captureInstallPrompt);
      window.removeEventListener('appinstalled', markInstalled);
    };
  }, []);

  const scrollFilmStrip = (direction: -1 | 1) => {
    const strip = filmStripRef.current;
    if (!strip) return;
    strip.scrollBy({
      left: direction * Math.min(strip.clientWidth * 0.82, 760),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  const installFilmGallery = async () => {
    if (isInstalled) return;
    if (installPrompt) {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === 'accepted') setIsInstalled(true);
      setInstallPrompt(null);
      return;
    }
    window.alert(
      isZh
        ? '如果浏览器没有弹出安装视窗：iPhone / iPad 请点分享，再选择「加入主画面」；Safari 桌面版请选择 File → Add to Dock。'
        : 'If no install window appears: on iPhone or iPad, tap Share → Add to Home Screen. In desktop Safari, choose File → Add to Dock.',
    );
  };

  const downloadFilmGallery = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const offlinePhotos = await Promise.all(filmGalleryFrames.map(async ({ photo, frameNumber }) => {
        const response = await fetch(resolveAssetPath(baseUrl, photo.src));
        if (!response.ok) throw new Error(`Unable to download frame ${frameNumber}`);
        const blob = await response.blob();
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(blob);
        });
        const camera = filmGalleryCameras.find((item) => item.frameNumbers.includes(frameNumber));
        const stock = filmGalleryStocks.find((item) => item.frameNumbers.includes(frameNumber));
        return { frameNumber, dataUrl, alt: photo.alt[language], caption: photo.caption[language], camera: camera?.name ?? '', stock: stock?.name ?? '' };
      }));
      const galleryData = JSON.stringify(offlinePhotos).replace(/</g, '\\u003c');
      const offlineHtml = `<!doctype html><html lang="${language}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Film Gallery — Eden Tan</title><style>
*{box-sizing:border-box}body{margin:0;background:#f5f3ef;color:#171411;font-family:system-ui,-apple-system,sans-serif}.wrap{width:min(1080px,100%);margin:auto;padding:clamp(24px,6vw,80px)}.k{font:700 12px ui-monospace,monospace;letter-spacing:.15em;text-transform:uppercase;color:#766f68}h1{font-size:clamp(56px,12vw,138px);line-height:.88;letter-spacing:-.07em;margin:22px 0 28px}.intro{max-width:720px;font-size:clamp(18px,2.4vw,28px);line-height:1.25;color:#514c47}.gallery{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(24px,4vw,52px);margin-top:80px}figure{margin:0}img{display:block;width:100%;height:auto;border-radius:18px;background:#171411}figcaption{display:grid;gap:7px;padding-top:14px}.n{font:700 12px ui-monospace,monospace;color:#176b87}.gear{font-size:13px;color:#766f68}.cap{font-size:15px;line-height:1.5}@media(max-width:680px){.gallery{grid-template-columns:1fr;margin-top:48px}h1{font-size:58px}}
</style></head><body><main class="wrap"><p class="k">15 frames · 3 cameras · 2 film stocks</p><h1>Film Gallery</h1><p class="intro">Fifteen records of stopping to look: streets, water, buildings, temples, and people who happened to enter the frame.</p><section class="gallery" id="gallery"></section></main><script>
var photos=${galleryData},root=document.getElementById('gallery');photos.forEach(function(p){var f=document.createElement('figure'),img=document.createElement('img'),c=document.createElement('figcaption'),n=document.createElement('span'),g=document.createElement('span'),d=document.createElement('span');img.src=p.dataUrl;img.alt=p.alt;n.className='n';n.textContent=String(p.frameNumber).padStart(2,'0');g.className='gear';g.textContent=p.camera+' · '+p.stock;d.className='cap';d.textContent=p.caption;c.append(n,g,d);f.append(img,c);root.appendChild(f)});
</script></body></html>`;
      const file = new Blob([offlineHtml], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(file);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'film-gallery-offline.html';
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    } catch {
      window.alert(isZh ? '照片下载失败，请确认网络后再试一次。' : 'The photos could not be downloaded. Check your connection and try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="page-shell film-gallery-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-6xl">
          <div className="film-gallery-topbar flex flex-wrap items-center justify-between gap-3">
            <a
              href={homeHref}
              className="film-gallery-back-link inline-flex items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft size={16} />
              {isZh ? '返回主页' : 'Back to Home'}
            </a>
            <HeaderControls
              language={language}
              setLanguage={setLanguage}
              themePreference={themePreference}
              theme={theme}
              setThemePreference={setThemePreference}
            />
          </div>

          <header className="film-gallery-hero py-16 text-center md:py-24">
            <p className="film-gallery-kicker mx-auto">
              {isZh
                ? `${filmGalleryPhotos.length} 格 · 3 台相机 · 2 种胶卷`
                : `${filmGalleryPhotos.length} frames · 3 cameras · 2 film stocks`}
            </p>
            <h1 className="film-gallery-title mx-auto mt-5 font-display font-bold tracking-tight">
              {isZh ? 'Film Gallery' : 'Film Gallery'}
            </h1>
            <p className="film-gallery-subtitle mx-auto mt-5">
              {isZh
                ? '它不太像作品集，更像十五次停下来看的记录：街道、水岸、建筑、庙宇，以及偶然走进画面的人。'
                : 'Less a portfolio than fifteen records of stopping to look: streets, water, buildings, temples, and people who happened to enter the frame.'}
            </p>
            <p className="film-gallery-copy mx-auto mt-5">
              {isZh
                ? '使用 Konica Auto S2、Rolleiflex Old Standard (Model 621) 与 Zeiss Ikon Contessa 35 拍摄，胶卷为 Kodak Gold 200 和 400。每张照片下方保留当时使用的相机与胶卷。'
                : 'Shot on the Konica Auto S2, Rolleiflex Old Standard (Model 621), and Zeiss Ikon Contessa 35 with Kodak Gold 200 and 400. The camera and film stock stay with each frame below.'}
            </p>
            <div className="film-gallery-app-actions">
              <button type="button" onClick={installFilmGallery} disabled={isInstalled}>
                <Plus size={16} />
                <span>{isInstalled ? (isZh ? '已安装' : 'Installed') : isZh ? '安装 App' : 'Install app'}</span>
              </button>
              <button type="button" className="is-primary" onClick={downloadFilmGallery} disabled={isDownloading}>
                <Download size={16} />
                <span>{isDownloading ? (isZh ? '正在打包照片…' : 'Packing photos…') : isZh ? '下载离线版' : 'Download offline'}</span>
              </button>
            </div>
          </header>

          <section className="film-gallery-section pb-16 md:pb-24">
            <div className="film-gallery-section-header">
              <div className="film-gallery-section-head">
                <p className="film-gallery-kicker">
                  {isZh
                    ? `横向胶卷 / ${filmGalleryPhotos.length} 格`
                    : `Horizontal roll / ${filmGalleryPhotos.length} frames`}
                </p>
                <h2 className="film-gallery-section-title font-display font-bold tracking-tight">
                  {isZh ? '沿着胶卷，从左看到右。' : 'Follow the roll from left to right.'}
                </h2>
              </div>
              <div className="film-gallery-strip-actions">
                <p>{isZh ? '拖动、滑动，或使用方向键。' : 'Drag, swipe, or use the arrow controls.'}</p>
                <div>
                  <button type="button" onClick={() => scrollFilmStrip(-1)} aria-label={isZh ? '向左看上一组照片' : 'Scroll to previous film frames'}>
                    <ArrowLeft size={19} />
                  </button>
                  <button type="button" onClick={() => scrollFilmStrip(1)} aria-label={isZh ? '向右看下一组照片' : 'Scroll to next film frames'}>
                    <ArrowRight size={19} />
                  </button>
                </div>
              </div>
            </div>

            <div className="film-gallery-strip-shell mt-12">
              <div
                ref={filmStripRef}
                className="film-gallery-strip"
                role="region"
                aria-label={isZh ? '可横向滚动的胶片照片' : 'Horizontally scrollable film photographs'}
                tabIndex={0}
              >
              {filmGalleryFrames.map(({ photo, frameNumber }, index) => {
                const camera = filmGalleryCameras.find((item) => item.frameNumbers.includes(frameNumber));
                const stock = filmGalleryStocks.find((item) => item.frameNumbers.includes(frameNumber));

                return (
                  <figure
                    key={photo.src}
                    className="film-gallery-frame"
                  >
                    <div className="film-gallery-negative">
                      <img
                        src={resolveAssetPath(baseUrl, photo.src)}
                        alt={photo.alt[language]}
                        loading={index < 2 ? 'eager' : 'lazy'}
                      />
                    </div>
                    <figcaption>
                      <span className="film-gallery-frame-index">{String(frameNumber).padStart(2, '0')}</span>
                      {camera && stock ? (
                        <span className="film-gallery-frame-gear">
                          <span>{camera.name}</span>
                          <span aria-hidden="true">·</span>
                          <span>{stock.name}</span>
                        </span>
                      ) : null}
                    </figcaption>
                  </figure>
                );
              })}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
