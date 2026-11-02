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
  /** The grey line under the title on the shelf (Apple-style caption). */
  kind: HomeCopy;
}> = [
  {
    title: 'Life OS',
    kind: { en: 'Product', zh: '产品' },
    tone: 'starmap',
    image: 'home-banners/life-os-banner-poster.jpg',
    video: 'home-banners/life-os-banner.mp4',
    imageAlt: { en: 'A lone robed figure with a staff faces a colossal dragon in the rain and mist, then raises a blazing light toward it', zh: '一名持杖的斗篷行者在雨雾中直面巨龙，随后向它举起一团炽亮的光' },
    href: 'life-os',
    linkLabel: { en: 'Open the Life OS product page', zh: '打开 Life OS 产品页面' },
  },
  {
    title: 'Pukimon',
    kind: { en: 'Game', zh: '游戏' },
    tone: 'pukimon',
    image: 'home-banners/pukimon-banner-poster.jpg',
    video: 'home-banners/pukimon-banner.mp4',
    imageAlt: { en: 'A 3D fan animation: a trainer in a red cap dodges and fights through a wrecked room, sparks flying', zh: '3D 同人动画：戴红帽的训练家在一片狼藉的房间里闪躲、对打，火花四溅' },
    href: 'pukimon',
    linkLabel: { en: 'Open the Pukimon page', zh: '打开 Pukimon 页面' },
  },
  {
    title: 'ETReportHub',
    kind: { en: 'Product', zh: '产品' },
    tone: 'ocean',
    image: 'home-banners/etreporthub-banner-poster.jpg',
    video: 'home-banners/etreporthub-banner.mp4',
    imageAlt: { en: 'ETReportHub cinematic operations banner', zh: 'ETReportHub 电影感运营场景 banner' },
    href: 'etreporthub',
    linkLabel: { en: 'Open the ETReportHub product page', zh: '打开 ETReportHub 产品页面' },
  },
  {
    title: 'Dr Racing',
    kind: { en: 'Product', zh: '产品' },
    tone: 'racing',
    image: 'home-banners/dr-racing-banner-poster.jpg',
    video: 'home-banners/dr-racing-banner.mp4',
    imageAlt: { en: 'Two motorcycle riders accelerating through city traffic', zh: '两名摩托车骑士在城市车流中加速前进' },
    href: 'dr-racing',
    linkLabel: { en: 'Open the Dr Racing product page', zh: '打开 Dr Racing 产品页面' },
  },
  {
    title: 'What is Wealth',
    kind: { en: 'Essay', zh: '文章' },
    tone: 'wealth',
    image: 'home-banners/what-is-wealth-banner-poster.jpg',
    video: 'home-banners/what-is-wealth-banner.mp4',
    imageAlt: { en: 'US dollar bills drifting in slow motion onto dark marble against a warm golden background', zh: '美元纸币在暖金色光晕中缓缓飘落到深色大理石台面上' },
    href: 'notes/what-is-wealth',
    linkLabel: { en: 'Read the essay: What is wealth, really?', zh: '阅读文章：财富到底是什么' },
  },
  {
    title: 'Jiju',
    kind: { en: 'Product', zh: '产品' },
    tone: 'coral',
    image: 'home-banners/jiju-adventure-seo.jpg',
    video: 'home-banners/jiju-home-banner.mp4',
    imageAlt: { en: 'Jiju adventure cat navigating an old harbor street with a map and compass', zh: 'Jiju 冒险猫拿着地图与指南针探索旧港街道' },
    href: 'jiju-pet',
    linkLabel: { en: 'Open the Jiju product page', zh: '打开 Jiju 产品页面' },
  },
  {
    title: 'Friday Poker Club',
    kind: { en: 'Game', zh: '游戏' },
    tone: 'poker',
    image: 'home-banners/friday-poker-club.jpg',
    imageAlt: { en: 'Friday Poker Club private poker table in a dark vintage club', zh: 'Friday Poker Club 深色复古私人牌桌场景' },
    href: 'poker',
    linkLabel: { en: 'Open the Friday Poker Club product page', zh: '打开 Friday Poker Club 产品页面' },
  },
  {
    title: "Conway's Game of Life",
    kind: { en: 'Interactive', zh: '互动实验' },
    tone: 'conway',
    image: 'home-banners/conway-bagua-pyramid-banner-poster.jpg',
    video: 'home-banners/conway-bagua-pyramid-banner.mp4',
    imageAlt: {
      en: 'An ancient pyramid beneath a luminous Bagua formation as blue and gold lightning converges overhead',
      zh: '古老金字塔上空浮现发光八卦阵，蓝金色闪电在云层中交汇',
    },
    href: 'conways-game-of-life',
    linkLabel: { en: "Open Conway's Game of Life", zh: "打开 Conway's Game of Life" },
  },
  {
    title: 'Diving / Ocean',
    kind: { en: 'Film', zh: '影片' },
    tone: 'sea',
    image: 'home-banners/diving-ocean-banner-poster.jpg',
    video: 'home-banners/diving-ocean-banner.mp4',
    imageAlt: { en: 'A first-person dive through a coral reef among rising bubbles, arriving at an octopus DJ spinning records beneath neon light', zh: '第一人称潜入珊瑚礁，穿过上升的气泡，来到在霓虹灯下打碟的章鱼 DJ 面前' },
    href: 'videos/pulau-kapas.mp4',
    linkLabel: { en: 'Watch the Pulau Kapas ocean film', zh: '观看 Pulau Kapas 海洋影片' },
  },
  {
    title: 'Film Gallery',
    kind: { en: 'Photography', zh: '摄影' },
    tone: 'film',
    image: 'home-banners/film-gallery-banner-poster.jpg',
    video: 'home-banners/film-gallery-banner.mp4',
    imageAlt: { en: 'A vintage twin-lens reflex camera revealing film reels through its viewfinder', zh: '复古双反相机的取景器里映出转动的胶片卷轴' },
    href: 'film-gallery',
    linkLabel: { en: 'Open Film Gallery', zh: '打开 Film Gallery' },
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

const HomeCollageVideo: React.FC<{ src: string; poster?: string; className?: string }> = ({ src, poster, className = 'eden-collage-video' }) => {
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
      // the showcase's pause button stops every video in it, not only the drift
      if (video.closest('.is-paused')) return false;
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
      className={className}
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

/** The item the showcase opens on as a full-width video banner; the rest ride the shelf below. */
const FEATURE_TITLE = 'Pukimon';

const HomeShelfItem: React.FC<{ item: HomeCollageItem; language: Language; baseUrl: string; duplicate?: boolean }> = ({ item, language, baseUrl, duplicate = false }) => {
  const media = item.video ? (
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
  );

  const content = (
    <>
      <span className={`eden-collage-card tone-${item.tone}`}>{media}</span>
      <span className="eden-shelf-title">{item.title}</span>
      <span className="eden-shelf-kind">{item.kind[language]}</span>
    </>
  );

  return item.href ? (
    <a
      className="eden-shelf-item"
      href={resolveAssetPath(baseUrl, item.href)}
      aria-label={item.linkLabel?.[language] ?? item.title}
      tabIndex={duplicate ? -1 : undefined}
    >
      {content}
    </a>
  ) : (
    <div className="eden-shelf-item">{content}</div>
  );
};

/**
 * The shelf under the feature banner: one row of cards with a title and a kind under each.
 *
 * Desktop (fine pointer, wider than a tablet) drifts it as a marquee. The items are rendered
 * twice so translating the track by exactly one run loops with no visible seam, and that
 * distance is measured in px into `--eden-run-shift`: iOS Safari resolves a percentage
 * translate on a `width: max-content` flex track against the wrong box (~25px, measured on
 * an iPhone), which reads as a motionless or jittering row.
 *
 * Phones and tablets do not drift at all — the row is a native horizontal scroller with snap,
 * the duplicate run is hidden in CSS — so the iOS marquee problem cannot reach them.
 *
 * The duplicate run stays clickable — do NOT mark it `inert`, that removes it from hit
 * testing and half the visible cards stop responding — it is only hidden from the
 * accessibility tree and the tab order, so the real run is the one keyboard users reach.
 */
const HomeShelfRow: React.FC<{ items: HomeCollageItem[]; language: Language; baseUrl: string }> = ({ items, language, baseUrl }) => {
  const trackRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const track = trackRef.current;
    const run = track?.firstElementChild;
    if (!track || !run) return;

    // A run's border box already includes each item's right margin, so its width is one
    // whole run with gaps.
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
    <div className="eden-collage-row">
      <div className="eden-collage-track" ref={trackRef}>
        {[0, 1].map((run) => (
          <div className="eden-collage-run" key={run} aria-hidden={run === 1 || undefined}>
            {items.map((item) => (
              <HomeShelfItem key={item.title} item={item} language={language} baseUrl={baseUrl} duplicate={run === 1} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

/** Full-width video banner for the featured item, copy and two actions over its lower left. */
const HomeFeatureBanner: React.FC<{ item: HomeCollageItem; language: Language; baseUrl: string }> = ({ item, language, baseUrl }) => {
  const isZh = language === 'zh';
  return (
    <section className={`eden-feature tone-${item.tone}`} aria-labelledby="eden-feature-title">
      {item.image ? (
        <img className="eden-feature-poster" src={resolveAssetPath(baseUrl, item.image)} alt={item.imageAlt?.[language] ?? item.title} decoding="async" />
      ) : null}
      {item.video ? (
        <HomeCollageVideo
          className="eden-feature-video"
          src={resolveAssetPath(baseUrl, item.video)}
          poster={item.image ? resolveAssetPath(baseUrl, item.image) : undefined}
        />
      ) : null}
      <div className="eden-feature-copy">
        <p className="eden-feature-kicker">
          <span>{item.title}</span>
          <span className="eden-feature-chip">{isZh ? '实时擂台' : 'Live arena'}</span>
        </p>
        <h2 id="eden-feature-title">{isZh ? <>小时候梦想的那场对战，<br />我把它做出来了。</> : <>The battle I dreamed of as a kid.<br />I built it.</>}</h2>
        <div className="eden-feature-actions">
          <a className="eden-feature-button is-primary" href="#pukimon">{isZh ? '立即开玩' : 'Play now'}</a>
          {item.href ? (
            <a className="eden-feature-button" href={resolveAssetPath(baseUrl, item.href)} aria-label={item.linkLabel?.[language]}>
              {isZh ? '了解更多' : 'Learn more'}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
};

/**
 * Homepage showcase, laid out like a services page: one big featured video banner, then a
 * shelf of everything else, then a pause button that stops the drift and every video in the
 * showcase (moving content that runs longer than five seconds needs a way to stop it).
 */
export const HomeCollage: React.FC<{ language: Language; baseUrl: string }> = ({ language, baseUrl }) => {
  const [paused, setPaused] = React.useState(false);
  const feature = homeCollageItems.find((item) => item.title === FEATURE_TITLE);
  const shelf = homeCollageItems.filter((item) => item !== feature);
  const isZh = language === 'zh';

  return (
    <div className={`eden-showcase${paused ? ' is-paused' : ''}`}>
      {feature ? <HomeFeatureBanner item={feature} language={language} baseUrl={baseUrl} /> : null}
      <div className="eden-collage" aria-label={isZh ? 'Eden 的作品与生活观察' : "Eden's work and field notes"}>
        <HomeShelfRow items={shelf} language={language} baseUrl={baseUrl} />
      </div>
      <button
        type="button"
        className="eden-showcase-pause"
        aria-pressed={paused}
        aria-label={paused ? (isZh ? '继续播放' : 'Play') : (isZh ? '暂停播放' : 'Pause')}
        onClick={() => setPaused((value) => !value)}
      >
        <span className={paused ? 'is-play' : 'is-pause'} aria-hidden="true" />
      </button>
    </div>
  );
};

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
