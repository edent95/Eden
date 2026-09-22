import React from 'react';
import { HeaderControls, type Language, type Theme, type ThemePreference } from '../app/shared';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const lifeVideos = [
  {
    title: { en: 'Pulau Tioman', zh: '刁曼岛' },
    href: 'https://www.youtube.com/watch?v=WMqBLHCMtps',
    embedSrc: 'https://www.youtube.com/embed/WMqBLHCMtps',
    thumbnailSrc: 'https://i.ytimg.com/vi/WMqBLHCMtps/hqdefault.jpg',
  },
  {
    title: { en: 'Desaru Surfing', zh: '迪沙鲁冲浪' },
    href: 'https://www.youtube.com/watch?v=Ingu-WLZWhA',
    embedSrc: 'https://www.youtube.com/embed/Ingu-WLZWhA',
    thumbnailSrc: 'https://i.ytimg.com/vi/Ingu-WLZWhA/hqdefault.jpg',
  },
  {
    title: { en: 'Pulau Kapas', zh: '棉花岛' },
    href: 'https://www.youtube.com/watch?v=qC8KuD9n14g',
    embedSrc: 'https://www.youtube.com/embed/qC8KuD9n14g',
    thumbnailSrc: 'https://i.ytimg.com/vi/qC8KuD9n14g/hqdefault.jpg',
  },
];

export const LifeFullPage: React.FC<{
  homeHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const [featuredVideo, ...archiveVideos] = lifeVideos;

  return (
    <div className="page-shell life-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-5 py-8 md:px-8 md:py-10">
        <div className="life-shell mx-auto">
          <div className="life-topbar flex flex-wrap items-center justify-between gap-3">
            <a
              href={homeHref}
              className="life-back-link inline-flex items-center gap-2 text-sm font-medium"
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

          <header className="life-hero py-16 text-center md:py-24">
            <p className="life-kicker mx-auto">{isZh ? 'Life Notes / Video field' : 'Life Notes / Video field'}</p>
            <h1 className="life-title mx-auto mt-5 font-display font-bold tracking-tight">
              {isZh ? '出门的时候，系统先安静下来。' : 'When life leaves the desk.'}
            </h1>
            <p className="life-subtitle mx-auto mt-5">
              {isZh
                ? '不是旅行广告，也不是打卡清单。只是把海、风、岛和路上的片段，收进一个可以回看的生活档案。'
                : 'Not travel advertising. Not a checklist. A small archive of sea, wind, islands, and the parts of life worth replaying.'}
            </p>
            <div className="life-hero-actions mt-7 flex flex-wrap justify-center gap-5">
              <a href="#life-feature" className="life-text-cta">
                {isZh ? '看主片段' : 'Watch feature'} <span aria-hidden>›</span>
              </a>
              <a href="#life-archive" className="life-text-cta life-text-cta-muted">
                {isZh ? '看全部档案' : 'View archive'} <span aria-hidden>›</span>
              </a>
            </div>
          </header>

          <section id="life-feature" className="life-feature-grid">
            <div className="life-feature-copy">
              <p className="life-kicker">{isZh ? 'Featured field note' : 'Featured field note'}</p>
              <h2 className="font-display font-bold tracking-tight">{featuredVideo.title[language]}</h2>
              <p>
                {isZh
                  ? '先放最大的一段。让画面比说明更早出现，页面只负责给它一个安静的观看位置。'
                  : 'The first clip gets the largest stage. Let the footage arrive before the explanation, with the page giving it a quiet place to breathe.'}
              </p>
              <a href={featuredVideo.href} target="_blank" rel="noopener noreferrer" className="life-text-cta">
                {isZh ? '在 YouTube 打开' : 'Open on YouTube'} <ExternalLink size={15} />
              </a>
            </div>
            <div className="life-feature-stage">
              <iframe
                src={featuredVideo.embedSrc}
                title={`${featuredVideo.title[language]} YouTube player`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </section>

          <section id="life-archive" className="life-section py-16 md:py-24">
            <div className="life-section-head">
              <p className="life-kicker">{isZh ? 'Small archive' : 'Small archive'}</p>
              <h2 className="life-section-title font-display font-bold tracking-tight">
                {isZh ? '留下来的，不一定是最完整的旅程。' : 'The saved parts are not always the whole trip.'}
              </h2>
              <p className="life-section-copy">
                {isZh
                  ? '这些片段更像生活里的样本：一个海岛、一段浪、一种离开日常之后身体重新醒来的节奏。'
                  : 'These clips work like field samples: an island, a wave, a rhythm where the body wakes up outside the usual routine.'}
              </p>
            </div>
            <div className="life-archive-grid mt-12">
              {archiveVideos.map((video, index) => (
                <article key={video.href} className="life-video-card">
                  <a href={video.href} target="_blank" rel="noopener noreferrer" className="life-video-thumb" aria-label={`${isZh ? '在 YouTube 打开' : 'Open on YouTube'} ${video.title[language]}`}>
                    <img src={video.thumbnailSrc} alt="" loading="lazy" />
                    <span className="life-play-mark" aria-hidden>
                      <span />
                    </span>
                  </a>
                  <div className="life-video-copy">
                    <p className="life-video-index">{String(index + 2).padStart(2, '0')}</p>
                    <h3 className="font-display font-bold tracking-tight">{video.title[language]}</h3>
                    <a href={video.href} target="_blank" rel="noopener noreferrer" className="life-text-cta life-text-cta-muted">
                      {isZh ? '在 YouTube 打开' : 'Open on YouTube'} <ExternalLink size={14} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="life-note">
            <p className="life-kicker">{isZh ? 'Editorial rule' : 'Editorial rule'}</p>
            <p>
              {isZh
                ? 'Life 页面不需要解释太多。画面负责记忆，文字只负责给它一个位置。'
                : 'The Life page does not need to explain too much. Footage holds the memory. Words only give it a place.'}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};
