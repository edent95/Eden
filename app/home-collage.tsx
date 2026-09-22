import React from 'react';
import { joinBasePath, resolveAssetPath, type Language } from './shared';

type HomeCopy = { en: string; zh: string };

const homeCollageItems: Array<{
  title: string;
  tone: string;
  image?: string;
  video?: string;
  imageAlt?: HomeCopy;
  href?: string;
  linkLabel?: HomeCopy;
  ctaLabel?: HomeCopy;
}> = [
  {
    title: 'Life OS',
    tone: 'starmap',
    image: 'home-banners/life-os-banner-poster.jpg',
    video: 'home-banners/life-os-banner.mp4',
    imageAlt: { en: 'A lone robed figure with a staff faces a colossal dragon in the rain and mist, then raises a blazing light toward it', zh: '一名持杖的斗篷行者在雨雾中直面巨龙，随后向它举起一团炽亮的光' },
    href: 'life-os',
    linkLabel: { en: 'Open the Life OS product page', zh: '打开 Life OS 产品页面' },
    ctaLabel: { en: 'Learn more', zh: '了解更多' },
  },
  {
    title: 'ETReportHub',
    tone: 'ocean',
    image: 'home-banners/etreporthub-banner-poster.jpg',
    video: 'home-banners/etreporthub-banner.mp4',
    imageAlt: { en: 'ETReportHub cinematic operations banner', zh: 'ETReportHub 电影感运营场景 banner' },
    href: 'etreporthub',
    linkLabel: { en: 'Open the ETReportHub product page', zh: '打开 ETReportHub 产品页面' },
    ctaLabel: { en: 'Learn more', zh: '了解更多' },
  },
  {
    title: 'Dr Racing',
    tone: 'racing',
    image: 'home-banners/dr-racing-banner-poster.jpg',
    video: 'home-banners/dr-racing-banner.mp4',
    imageAlt: { en: 'Two motorcycle riders accelerating through city traffic', zh: '两名摩托车骑士在城市车流中加速前进' },
    href: 'dr-racing',
    linkLabel: { en: 'Open the Dr Racing product page', zh: '打开 Dr Racing 产品页面' },
    ctaLabel: { en: 'Learn more', zh: '了解更多' },
  },
  {
    title: 'What is Wealth',
    tone: 'wealth',
    image: 'home-banners/what-is-wealth-banner-poster.jpg',
    video: 'home-banners/what-is-wealth-banner.mp4',
    imageAlt: { en: 'US dollar bills drifting in slow motion onto dark marble against a warm golden background', zh: '美元纸币在暖金色光晕中缓缓飘落到深色大理石台面上' },
    href: 'notes/what-is-wealth',
    linkLabel: { en: 'Read the essay: What is wealth, really?', zh: '阅读文章：财富到底是什么' },
    ctaLabel: { en: 'Read the essay', zh: '阅读文章' },
  },
  {
    title: 'Jiju',
    tone: 'coral',
    image: 'home-banners/jiju-adventure-seo.jpg',
    video: 'home-banners/jiju-home-banner.mp4',
    imageAlt: { en: 'Jiju adventure cat navigating an old harbor street with a map and compass', zh: 'Jiju 冒险猫拿着地图与指南针探索旧港街道' },
    href: 'jiju-pet',
    linkLabel: { en: 'Open the Jiju product page', zh: '打开 Jiju 产品页面' },
    ctaLabel: { en: 'Learn more', zh: '了解更多' },
  },
  {
    title: 'Friday Poker Club',
    tone: 'poker',
    image: 'home-banners/friday-poker-club.jpg',
    imageAlt: { en: 'Friday Poker Club private poker table in a dark vintage club', zh: 'Friday Poker Club 深色复古私人牌桌场景' },
    href: 'poker',
    linkLabel: { en: 'Open the Friday Poker Club product page', zh: '打开 Friday Poker Club 产品页面' },
    ctaLabel: { en: 'Play now', zh: '立即开玩' },
  },
  {
    title: "Conway's Game of Life",
    tone: 'conway',
    image: 'home-banners/conway-bagua-pyramid-banner-poster.jpg',
    video: 'home-banners/conway-bagua-pyramid-banner.mp4',
    imageAlt: {
      en: 'An ancient pyramid beneath a luminous Bagua formation as blue and gold lightning converges overhead',
      zh: '古老金字塔上空浮现发光八卦阵，蓝金色闪电在云层中交汇',
    },
    href: 'conways-game-of-life',
    linkLabel: { en: "Open Conway's Game of Life", zh: "打开 Conway's Game of Life" },
    ctaLabel: { en: 'Play now', zh: '立即开玩' },
  },
  {
    title: 'Diving / Ocean',
    tone: 'sea',
    image: 'home-banners/diving-ocean-banner-poster.jpg',
    video: 'home-banners/diving-ocean-banner.mp4',
    imageAlt: { en: 'A first-person dive through a coral reef among rising bubbles, arriving at an octopus DJ spinning records beneath neon light', zh: '第一人称潜入珊瑚礁，穿过上升的气泡，来到在霓虹灯下打碟的章鱼 DJ 面前' },
    href: 'videos/pulau-kapas.mp4',
    linkLabel: { en: 'Watch the Pulau Kapas ocean film', zh: '观看 Pulau Kapas 海洋影片' },
    ctaLabel: { en: 'Watch now', zh: '立即观看' },
  },
  {
    title: 'Film Gallery',
    tone: 'film',
    image: 'home-banners/film-gallery-banner-poster.jpg',
    video: 'home-banners/film-gallery-banner.mp4',
    imageAlt: { en: 'A vintage twin-lens reflex camera revealing film reels through its viewfinder', zh: '复古双反相机的取景器里映出转动的胶片卷轴' },
    href: 'film-gallery',
    linkLabel: { en: 'Open Film Gallery', zh: '打开 Film Gallery' },
    ctaLabel: { en: 'View gallery', zh: '查看图库' },
  },
];

/**
 * The collage cards ride a compositor-driven marquee, and IntersectionObserver does not
 * reliably recompute while a transform animation runs on the compositor — a card can
 * slide fully into view without a single callback, which left its video paused forever.
 * getBoundingClientRect does see the animated transform, so every collage video registers
 * a sampler here and one shared rAF loop checks them at ~400ms intervals. rAF is the right
 * clock for this: it stops on its own when the page is hidden (unlike setInterval, which
 * merely gets throttled) and it is in step with the animation it is sampling.
 */
const collageVideoSamplers = new Set<() => void>();

let collageSamplerFrame = 0;

let collageSamplerLast = 0;

const runCollageSamplers = (now: number) => {
  collageSamplerFrame = window.requestAnimationFrame(runCollageSamplers);
  if (now - collageSamplerLast < 400) return;
  collageSamplerLast = now;
  collageVideoSamplers.forEach((sample) => sample());
};

const registerCollageVideoSampler = (sample: () => void) => {
  collageVideoSamplers.add(sample);
  if (!collageSamplerFrame) {
    collageSamplerFrame = window.requestAnimationFrame(runCollageSamplers);
  }
  return () => {
    collageVideoSamplers.delete(sample);
    if (collageVideoSamplers.size === 0 && collageSamplerFrame) {
      window.cancelAnimationFrame(collageSamplerFrame);
      collageSamplerFrame = 0;
    }
  };
};

const HomeCollageVideo: React.FC<{ src: string; poster?: string }> = ({ src, poster }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Safari checks both the muted property and the content attribute before
    // allowing inline autoplay.
    video.defaultMuted = true;
    video.muted = true;
    video.setAttribute('muted', '');

    const shouldPlay = () => {
      if (motionQuery.matches || document.hidden) return false;
      const rect = video.getBoundingClientRect();
      // zero-sized means a stylesheet hid it, not that it scrolled away
      if (rect.width === 0 || rect.height === 0) return false;
      return rect.right > 0 && rect.left < window.innerWidth && rect.bottom > 0 && rect.top < window.innerHeight;
    };

    const syncPlayback = () => {
      if (shouldPlay()) {
        void video.play().catch(() => undefined);
      } else if (!video.paused) {
        video.pause();
      }
    };

    syncPlayback();
    const unregister = registerCollageVideoSampler(syncPlayback);
    motionQuery.addEventListener('change', syncPlayback);
    video.addEventListener('canplay', syncPlayback);
    // rAF stops while the page is hidden, so pausing has to be driven by the event
    document.addEventListener('visibilitychange', syncPlayback);

    return () => {
      unregister();
      motionQuery.removeEventListener('change', syncPlayback);
      video.removeEventListener('canplay', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="eden-collage-video"
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

type HomeCollageItem = (typeof homeCollageItems)[number];

const HomeCollageCard: React.FC<{ item: HomeCollageItem; language: Language; baseUrl: string; duplicate?: boolean }> = ({ item, language, baseUrl, duplicate = false }) => {
  const cardContent = (
    <>
      {item.video ? (
        <>
          {item.image ? (
            <img
              className="eden-collage-image"
              src={resolveAssetPath(baseUrl, item.image)}
              alt={item.imageAlt?.[language] ?? item.title}
              loading="lazy"
              decoding="async"
            />
          ) : null}
          <HomeCollageVideo
            src={resolveAssetPath(baseUrl, item.video)}
            poster={item.image ? resolveAssetPath(baseUrl, item.image) : undefined}
          />
        </>
      ) : item.image ? (
        <img
          className="eden-collage-image"
          src={resolveAssetPath(baseUrl, item.image)}
          alt={item.imageAlt?.[language] ?? item.title}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="eden-placeholder-art" aria-hidden="true"><i /><i /><i /></div>
      )}
      <div className="eden-collage-reveal">
        {item.href ? (
          <span className="eden-collage-cta">{item.ctaLabel?.[language] ?? (language === 'zh' ? '了解更多' : 'Learn more')}</span>
        ) : (
          <h3>{item.title}</h3>
        )}
      </div>
    </>
  );

  return item.href ? (
    <a
      className={`eden-collage-card tone-${item.tone}`}
      href={resolveAssetPath(baseUrl, item.href)}
      aria-label={item.linkLabel?.[language] ?? item.title}
      tabIndex={duplicate ? -1 : undefined}
    >
      {cardContent}
    </a>
  ) : (
    <article className={`eden-collage-card tone-${item.tone}`} tabIndex={duplicate ? -1 : 0}>
      {cardContent}
    </article>
  );
};

/**
 * One marquee row. The items are rendered twice so translating the track by exactly
 * one run loops with no visible seam.
 *
 * That distance used to be written as `-50%`, which is correct per spec — a percentage
 * translate resolves against the element's own border box, and the track is exactly two
 * runs wide. iOS Safari does not agree: on a `width: max-content` flex track it resolves
 * the percentage against the wrong box and lands on roughly 25px, so the marquee jitters
 * in place instead of scrolling (measured on an iPhone: 25 distinct offsets over 23s,
 * against 600 for an identical row animated in px). So measure one run and hand the
 * keyframes a pixel distance through `--eden-run-shift`.
 *
 * The duplicate run stays clickable — do NOT mark it `inert`, that removes it from hit
 * testing and half the visible cards stop responding — it is only hidden from the
 * accessibility tree and the tab order, so the real run is the one keyboard users reach.
 * The drift pauses on hover and focus so cards can actually be clicked.
 */
const HomeCollageRow: React.FC<{
  items: HomeCollageItem[];
  language: Language;
  baseUrl: string;
  direction: 'left' | 'right';
}> = ({ items, language, baseUrl, direction }) => {
  const trackRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const track = trackRef.current;
    const run = track?.firstElementChild;
    if (!track || !run) return;

    // A run's border box already includes each card's right margin, so its width is one
    // whole run with gaps — exactly what `-50%` of the two-run track was meant to be.
    const measure = () => {
      track.style.setProperty('--eden-run-shift', `${run.getBoundingClientRect().width}px`);
    };

    measure();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(run);
    return () => observer.disconnect();
  }, [items.length]);

  return (
    <div className={`eden-collage-row eden-collage-row-${direction}`}>
      <div className="eden-collage-track" ref={trackRef}>
        {[0, 1].map((run) => (
          <div className="eden-collage-run" key={run} aria-hidden={run === 1 || undefined}>
            {items.map((item) => (
              <HomeCollageCard key={item.title} item={item} language={language} baseUrl={baseUrl} duplicate={run === 1} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const HomeCollage: React.FC<{ language: Language; baseUrl: string }> = ({ language, baseUrl }) => (
  <div className="eden-collage" aria-label={language === 'zh' ? 'Eden 的项目与生活观察拼贴' : "Eden's work and field-note collage"}>
    <HomeCollageRow items={homeCollageItems.slice(0, 4)} language={language} baseUrl={baseUrl} direction="left" />
    <HomeCollageRow items={homeCollageItems.slice(4)} language={language} baseUrl={baseUrl} direction="right" />
  </div>
);

export const DelayedAboutProfileVideo: React.FC<{
  baseUrl: string;
  label: string;
}> = ({ baseUrl, label }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timeoutId = window.setTimeout(() => {
      void videoRef.current?.play().catch(() => undefined);
    }, 15_000);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <video
      ref={videoRef}
      src={joinBasePath(baseUrl, 'videos/eden-profile-joker-laugh.mp4')}
      poster={joinBasePath(baseUrl, 'images/eden-environmental-portrait.jpg')}
      aria-label={label}
      preload="metadata"
      muted
      playsInline
    />
  );
};
