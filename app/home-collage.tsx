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
  /** One or two plain sentences shown over the card on hover / tap: what it is, who it is for. */
  summary: HomeCopy;
}> = [
  {
    title: 'Life OS',
    kind: { en: 'Product', zh: '产品' },
    summary: {
      en: 'Lock eight natal charts first, then record what really happens and measure the match. Working hypothesis: about 73% fits the chart, 27% is yours to change.',
      zh: '先锁定八套本命命盘，再记录现实里发生的事，量出吻合率。目前的工作假设：约 73% 与命盘吻合，27% 是你能改的。',
    },
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
    summary: {
      en: 'The Pokémon-style real-time battle game I dreamed of as a kid. The full version is for friends; the page plays a scripted three-round battle.',
      zh: '小时候梦想中的宝可梦实时对战游戏。完整版只给朋友玩，页面里放一段三回合的对战演出。',
    },
    tone: 'pukimon',
    image: 'home-banners/pukimon-banner-poster.jpg',
    video: 'home-banners/pukimon-banner.mp4',
    imageAlt: { en: 'The Pukimon battle replay: pixel creatures trade moves on a sandy arena, one summoning a ring of shadow clones', zh: 'Pukimon 对战演出：像素小怪在沙地擂台上互放招式，一只召出一圈影子分身' },
    href: 'pukimon',
    linkLabel: { en: 'Open the Pukimon page', zh: '打开 Pukimon 页面' },
  },
  {
    title: 'Scripture',
    kind: { en: 'Reading', zh: '经书' },
    summary: {
      en: 'Buddhist and Sanskrit classics translated into plain, readable language, chapter by chapter, with an engraved illustration for each book.',
      zh: '佛经与梵文经典的白话直译，逐章对照，每部书配一张版画插图。',
    },
    tone: 'scripture',
    image: 'home-banners/scripture-banner-poster.jpg',
    video: 'home-banners/scripture-banner.mp4',
    imageAlt: { en: 'A man faces an ornate mirror, his reflection shatters into faces young and old, golden light spirals, and a golden lotus settles on still water', zh: '一个人对着雕花古镜，镜像碎成少年与老人的面孔，金色光流盘旋，最后一朵金莲落在静水上' },
    href: 'https://scripture.eden-tan.com/',
    linkLabel: { en: 'Open Scripture: nine Sanskrit classics in plain translation', zh: '打开梵文书架：九部经典白话直译' },
  },
  {
    title: 'ETReportHub',
    kind: { en: 'Product', zh: '产品' },
    summary: {
      en: 'A daily reporting system for operations teams: drop in Transaction and Customer Excel files, get KPIs, members, channels, trends and brand comparisons.',
      zh: '给运营团队的日报系统：放进 Transaction 与 Customer Excel，直接得到 KPI、会员、渠道、趋势和品牌对比。',
    },
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
    summary: {
      en: 'Runs a motorcycle dealership from lead to delivered bike: loan and cash applications, bank rounds, the delivery checklist, stock and commissions.',
      zh: '摩托车行从 lead 到交车的运营系统：贷款与现金申请、银行轮次、交车 checklist、库存和佣金，放在一个仪表台里。',
    },
    tone: 'racing',
    image: 'home-banners/dr-racing-banner-poster.jpg',
    video: 'home-banners/dr-racing-banner.mp4',
    imageAlt: { en: 'Two motorcycle riders accelerating through city traffic', zh: '两名摩托车骑士在城市车流中加速前进' },
    href: 'dr-racing',
    linkLabel: { en: 'Open the Dr Racing product page', zh: '打开 Dr Racing 产品页面' },
  },
  {
    title: 'MiYa',
    kind: { en: 'App', zh: 'App' },
    summary: {
      en: 'An iPhone app that reads your Apple Watch health data and explains it in plain words you actually understand.',
      zh: '读取 Apple Watch 健康数据的 iPhone App，用你看得懂的话讲清楚身体在发生什么。',
    },
    tone: 'miya',
    image: 'home-banners/miya-banner-poster.jpg',
    video: 'home-banners/miya-banner.mp4',
    imageAlt: { en: 'An Apple Watch reads a heartbeat, health numbers stream past as light, and the MiYa app turns them into plain words on iPhone', zh: 'Apple Watch 读出心跳，健康数字化成光流掠过，MiYa 在 iPhone 上把它们写成看得懂的话' },
    href: 'https://miya.eden-tan.com/',
    linkLabel: { en: 'Open MiYa: your health, in words you understand', zh: '打开 MiYa：用看得懂的话讲你的健康' },
  },
  {
    title: 'What is Wealth',
    kind: { en: 'Essay', zh: '文章' },
    summary: {
      en: 'A first-principles essay: money is a ledger, debt sells the future, and wealth may really mean control over productive capacity.',
      zh: '一篇第一性原理长文：钱只是记账，债务卖的是未来，财富也许等于你能控制多少生产能力。',
    },
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
    summary: {
      en: 'Find places that are genuinely pet-friendly, check their real policies, and keep your pet\'s profile and visit memories in one place.',
      zh: '找到真正宠物友好的地点，确认真实政策，把宠物档案和到访记忆放在一起。',
    },
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
    summary: {
      en: 'A browser Hold\'em table for a private crew: nine seats, blinds and buy-ins, six mini games, and a chip tracker for real-card nights.',
      zh: '给熟人局的浏览器德州牌桌：九个座位、盲注与买入、六个小游戏，真牌局也能用它记筹码。',
    },
    tone: 'poker',
    image: 'home-banners/friday-poker-club.jpg',
    imageAlt: { en: 'Friday Poker Club private poker table in a dark vintage club', zh: 'Friday Poker Club 深色复古私人牌桌场景' },
    href: 'poker',
    linkLabel: { en: 'Open the Friday Poker Club product page', zh: '打开 Friday Poker Club 产品页面' },
  },
  {
    title: "Conway's Game of Life",
    kind: { en: 'Interactive', zh: '互动实验' },
    summary: {
      en: 'Play a Game of Life board, then follow binary cells through 8 neighbourhoods, 64 hexagrams, 256 rules and Leibniz\'s I Ching bridge.',
      zh: '先玩一盘生命游戏，再沿着二元细胞走进八种邻域、六十四卦、256 条规则和莱布尼茨的《易经》桥梁。',
    },
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
    summary: {
      en: 'A short underwater film shot diving at Pulau Kapas, Malaysia: reef, bubbles and open blue water.',
      zh: '在马来西亚 Pulau Kapas 潜水拍的海底短片：珊瑚礁、气泡和一片蓝。',
    },
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
    summary: {
      en: 'Fifteen film photographs of streets, water, buildings, temples and people, shot on three cameras with Kodak Gold 200 and 400.',
      zh: '十五张胶片照片：街道、水岸、建筑、庙宇与人物，三台相机、Kodak Gold 200 与 400 拍摄。',
    },
    tone: 'film',
    image: 'home-banners/film-gallery-banner-poster.jpg',
    video: 'home-banners/film-gallery-banner.mp4',
    imageAlt: { en: 'A vintage twin-lens reflex camera revealing film reels through its viewfinder', zh: '复古双反相机的取景器里映出转动的胶片卷轴' },
    href: 'film-gallery',
    linkLabel: { en: 'Open Film Gallery', zh: '打开 Film Gallery' },
  },
];

/**
 * Each collage video plays only while it is on screen. Every video registers a sampler here
 * and one shared rAF loop checks getBoundingClientRect at ~400ms intervals — it catches page
 * scroll, the shelf's own horizontal scroll and snap alike without wiring a scroll listener
 * per card. rAF is the right clock for this: it stops on its own when the page is hidden
 * (unlike setInterval, which merely gets throttled).
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

const shelfDetailId = (title: string) => `eden-shelf-detail-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

/**
 * One shelf card. The card itself is a toggle, not a link: hovering it (fine pointers) or
 * clicking / tapping it lays the project details over the media, and the details hold the
 * link out. The link stretches over the whole overlay, so on desktop "hover, then click
 * anywhere on the card" still opens the project in one click; on touch the first tap shows
 * the details and the second opens it.
 */
const HomeShelfItem: React.FC<{
  item: HomeCollageItem;
  language: Language;
  baseUrl: string;
  open: boolean;
  onToggle: () => void;
}> = ({ item, language, baseUrl, open, onToggle }) => {
  const isZh = language === 'zh';
  const detailId = shelfDetailId(item.title);
  const image = item.image ? (
    <img
      className="eden-collage-image"
      src={resolveAssetPath(baseUrl, item.image)}
      alt={item.imageAlt?.[language] ?? item.title}
      loading="lazy"
      decoding="async"
    />
  ) : null;
  const media = item.video ? (
    <>
      {image}
      <HomeCollageVideo
        src={resolveAssetPath(baseUrl, item.video)}
        poster={item.image ? resolveAssetPath(baseUrl, item.image) : undefined}
      />
    </>
  ) : image ?? <div className="eden-placeholder-art" aria-hidden="true"><i /><i /><i /></div>;

  return (
    <div className={`eden-shelf-item${open ? ' is-open' : ''}`}>
      <div className={`eden-collage-card tone-${item.tone}`}>
        {media}
        <button
          type="button"
          className="eden-shelf-toggle"
          aria-expanded={open}
          aria-controls={detailId}
          aria-label={isZh ? `${item.title}：查看简介` : `${item.title}: show details`}
          onClick={onToggle}
        />
        <div className="eden-shelf-detail" id={detailId}>
          <span className="eden-shelf-detail-kind">{item.kind[language]}</span>
          <strong className="eden-shelf-detail-title">{item.title}</strong>
          <p className="eden-shelf-detail-copy">{item.summary[language]}</p>
          {item.href ? (
            <a
              className="eden-shelf-detail-link"
              href={resolveAssetPath(baseUrl, item.href)}
              aria-label={item.linkLabel?.[language] ?? item.title}
            >
              {isZh ? '打开' : 'Open'} <span aria-hidden="true">→</span>
            </a>
          ) : null}
        </div>
      </div>
      <span className="eden-shelf-title">{item.title}</span>
      <span className="eden-shelf-kind">{item.kind[language]}</span>
    </div>
  );
};

/**
 * Homepage shelf, laid out like a services page: it sits right under the hero, one row of
 * every item. Nothing slides on its own — on every screen size the row is a native
 * horizontal scroller with snap (swipe / trackpad / shift-wheel), and fine pointers also get
 * previous / next buttons. The pause button stops every video in it (moving content that
 * runs longer than five seconds needs a way to stop it).
 */
export const HomeCollage: React.FC<{ language: Language; baseUrl: string }> = ({ language, baseUrl }) => {
  const [paused, setPaused] = React.useState(false);
  const [openTitle, setOpenTitle] = React.useState<string | null>(null);
  const [edges, setEdges] = React.useState({ start: true, end: false });
  const rowRef = React.useRef<HTMLDivElement>(null);
  const showcaseRef = React.useRef<HTMLDivElement>(null);
  const isZh = language === 'zh';

  React.useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const update = () => {
      const max = row.scrollWidth - row.clientWidth;
      setEdges({ start: row.scrollLeft <= 2, end: row.scrollLeft >= max - 2 });
    };
    update();
    row.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      row.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  // An open card closes on Escape or on a tap / click anywhere outside the shelf.
  React.useEffect(() => {
    if (!openTitle) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenTitle(null);
    };
    const onPointer = (event: PointerEvent) => {
      if (!showcaseRef.current?.contains(event.target as Node)) setOpenTitle(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [openTitle]);

  const scrollByPage = (direction: 1 | -1) => {
    const row = rowRef.current;
    if (!row) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    row.scrollBy({ left: direction * row.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <div className={`eden-showcase${paused ? ' is-paused' : ''}`} ref={showcaseRef}>
      <div className="eden-collage" aria-label={isZh ? 'Eden 的作品与生活观察' : "Eden's work and field notes"}>
        <div className="eden-collage-row" ref={rowRef}>
          <div className="eden-collage-track">
            {homeCollageItems.map((item) => (
              <HomeShelfItem
                key={item.title}
                item={item}
                language={language}
                baseUrl={baseUrl}
                open={openTitle === item.title}
                onToggle={() => setOpenTitle((current) => (current === item.title ? null : item.title))}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="eden-showcase-controls">
        <button
          type="button"
          className="eden-showcase-pause"
          aria-pressed={paused}
          aria-label={paused ? (isZh ? '继续播放' : 'Play') : (isZh ? '暂停播放' : 'Pause')}
          onClick={() => setPaused((value) => !value)}
        >
          <span className={paused ? 'is-play' : 'is-pause'} aria-hidden="true" />
        </button>
        <span className="eden-showcase-arrows">
          <button
            type="button"
            className="eden-showcase-arrow"
            aria-label={isZh ? '上一组' : 'Previous'}
            disabled={edges.start}
            onClick={() => scrollByPage(-1)}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className="eden-showcase-arrow"
            aria-label={isZh ? '下一组' : 'Next'}
            disabled={edges.end}
            onClick={() => scrollByPage(1)}
          >
            <span aria-hidden="true">→</span>
          </button>
        </span>
      </div>
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
