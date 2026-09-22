import React from 'react';
import { HeaderControls, joinBasePath, type Language, type Theme, type ThemePreference } from '../app/shared';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export const JijuRevampFullPage: React.FC<{
  homeHref: string;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  themePreference: ThemePreference;
  theme: Theme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
}> = ({ homeHref, language, setLanguage, themePreference, theme, setThemePreference }) => {
  const isZh = language === 'zh';
  const revampBase = import.meta.env.BASE_URL || '/';

  const sceneEntries = isZh
    ? ['现在吃 lunch', '去 cafe 办公', '带宠物', '好停车', '看 promo', '本地最爱', 'Michelin 但本地认可', '下雨天去哪']
    : ['Lunch now', 'Work from cafe', 'Bringing my pet', 'Easy parking', 'Show me promos', 'Local favorites', 'Michelin but local-approved', 'Rainy-day spot'];

  const proofPoints: [string, string][] = isZh
    ? [
        ['Was', '宠物友好地点目录'],
        ['Now', '场景化本地探索引擎'],
        ['Core question', 'Where should we go today?'],
        ['Start', '一个城市 · 100 个地点 · 8 个 filter'],
      ]
    : [
        ['Was', 'Pet-friendly place directory'],
        ['Now', 'Context-based local discovery engine'],
        ['Core question', 'Where should we go today?'],
        ['Start', 'One city · 100 places · 8 filters'],
      ];

  const mapShows = isZh
    ? ['Name', 'Address', 'Rating（星级）', 'Opening hour', 'Reviews（嘈杂、游客化）']
    : ['Name', 'Address', 'Rating (stars)', 'Opening hour', 'Reviews (noisy, touristy)'];

  const jijuAnswers = isZh
    ? ['适合 laptop work 吗？有 plug / 稳 WiFi 吗？', 'Parking 难吗？冷气够吗？吵不吵？', '能坐久吗？午餐便宜吗？有 lunch set 吗？', '适合一个人 / date / 带宠物吗？', 'food 是真好吃还是只是环境美？local 会回访吗？']
    : ['Good for laptop work? Power plug & stable WiFi?', 'Parking hard? Aircon strong? Noisy?', 'Can sit long? Cheap lunch? Lunch set?', 'Good for solo / date / pets?', 'Actually tasty or just pretty? Will locals return?'];

  const problemCards = isZh
    ? [
        { label: '01 / Maps', title: '地图太宽泛', copy: 'Google Map 有评分和位置,但答不了场景:plug、parking、能不能坐久、有没有 lunch set、本地认不认。' },
        { label: '02 / Reviews', title: '评论太游客化', copy: '太网红、太多假 review、太情绪化。4.5 星不代表它适合你今天的目的。' },
        { label: '03 / Context', title: '没有场景标签', copy: '不知道 parking、不知道能不能坐久、不知道 local 是否真去、不知道 promo 是否还 active。' },
      ]
    : [
        { label: '01 / Maps', title: 'Maps are too broad', copy: 'Ratings and locations, but no scene: plugs, parking, sit-long, lunch sets, or local approval.' },
        { label: '02 / Reviews', title: 'Reviews are too touristy', copy: 'Too influencer-driven, too many fake reviews, too emotional. 4.5 stars does not mean right for today.' },
        { label: '03 / Context', title: 'No scene tags', copy: 'No parking info, no sit-long info, no signal on whether locals actually go or if a promo is still active.' },
      ];

  const categoryCards = isZh
    ? [
        { title: 'Eat', note: '流量最大', tags: ['Lunch set', 'Local favorite', 'Michelin / Bib', 'Cheap good food', 'Date night', 'Solo meal', 'Family dinner', 'Supper', 'Hidden gem', 'Trap warning'] },
        { title: 'Work', note: 'Google Map 查不到', tags: ['Power plug', 'WiFi', 'Quiet', 'Can sit long', 'Good coffee', 'Big table', 'Parking easy', 'Aircon strong', 'Laptop friendly', 'Meeting friendly'] },
        { title: 'Chill', note: '适合内容化', tags: ['Afternoon cafe', 'Rainy day', 'With friend', 'First date', 'Healing place', 'Good view', 'Walkable', 'Photo spot', 'Weekend half-day'] },
        { title: 'Pet', note: '保留差异化,做强 filter', tags: ['Indoor allowed', 'Outdoor only', 'Cat friendly', 'Dog friendly', 'Water bowl', 'Pet menu', 'Walking area', 'Spacious', 'Pet-friendly staff'] },
        { title: 'Promo', note: '每天有人搜', tags: ['Lunch set', 'Coffee promo', 'Student promo', 'Weekday deal', 'Happy hour', 'Buy 1 free 1', 'Set under RM20', 'New opening'] },
      ]
    : [
        { title: 'Eat', note: 'Highest traffic', tags: ['Lunch set', 'Local favorite', 'Michelin / Bib', 'Cheap good food', 'Date night', 'Solo meal', 'Family dinner', 'Supper', 'Hidden gem', 'Trap warning'] },
        { title: 'Work', note: 'Hard to find on Maps', tags: ['Power plug', 'WiFi', 'Quiet', 'Can sit long', 'Good coffee', 'Big table', 'Parking easy', 'Aircon strong', 'Laptop friendly', 'Meeting friendly'] },
        { title: 'Chill', note: 'Great for content', tags: ['Afternoon cafe', 'Rainy day', 'With friend', 'First date', 'Healing place', 'Good view', 'Walkable', 'Photo spot', 'Weekend half-day'] },
        { title: 'Pet', note: 'Differentiation, as a filter', tags: ['Indoor allowed', 'Outdoor only', 'Cat friendly', 'Dog friendly', 'Water bowl', 'Pet menu', 'Walking area', 'Spacious', 'Pet-friendly staff'] },
        { title: 'Promo', note: 'Searched daily', tags: ['Lunch set', 'Coffee promo', 'Student promo', 'Weekday deal', 'Happy hour', 'Buy 1 free 1', 'Set under RM20', 'New opening'] },
      ];

  const scoreRows: [string, number][] = [
    ['Food', 8.5],
    ['Comfort', 7.8],
    ['Parking', 6.5],
    ['Work-friendly', 9.0],
    ['Pet-friendly', 7.0],
    ['Value', 8.2],
    ['Local approval', 8.8],
  ];

  const profileRows = isZh
    ? [
        ['Area', 'Georgetown'],
        ['Best for', 'Laptop work / brunch / 安静下午'],
        ['Price', 'RM20–40'],
        ['Parking', 'Medium difficulty'],
        ['Power plug', 'Yes, limited'],
        ['WiFi', 'Stable'],
        ['Can sit long', 'Yes'],
        ['Pet-friendly', 'Outdoor only'],
        ['Lunch set', 'Weekday 12pm–3pm'],
        ['Local verdict', '适合办公,食物普通但咖啡稳'],
        ['Avoid', 'Weekend 2pm–5pm'],
        ['Best time', 'Weekday morning'],
      ]
    : [
        ['Area', 'Georgetown'],
        ['Best for', 'Laptop work / brunch / quiet afternoon'],
        ['Price', 'RM20–40'],
        ['Parking', 'Medium difficulty'],
        ['Power plug', 'Yes, limited'],
        ['WiFi', 'Stable'],
        ['Can sit long', 'Yes'],
        ['Pet-friendly', 'Outdoor only'],
        ['Lunch set', 'Weekday 12pm–3pm'],
        ['Local verdict', 'Good to work, food average, coffee reliable'],
        ['Avoid', 'Weekend 2pm–5pm'],
        ['Best time', 'Weekday morning'],
      ];

  const todaysPicks = isZh
    ? ['Best lunch set under RM20', '有 plug & parking 的 cafe', 'Local 认可的 Michelin 地点', '本周末宠物友好去处', '今天适合办公的安静地点']
    : ['Best lunch set under RM20', 'Cafes with plug & parking', 'Local-approved Michelin spots', 'Pet-friendly places this weekend', 'Quiet places to work today'];

  const mvpFilters = ['Lunch set', 'Work-friendly', 'Power plug', 'Easy parking', 'Pet-friendly', 'Local favorite', 'Date-friendly', 'Promo available'];

  const mvpCards = isZh
    ? [
        { title: 'Phase 1 · 做有用的数据', lines: ['先做一个城市 / 区域:Penang、KL、PJ、Georgetown、Mont Kiara、Bangsar。', '先做 100 个地点,每个比 Google Map 更有用。', '上 8 个 filter 与 Place Profile。'] },
        { title: 'Phase 2 · 上线场景探索', lines: ['场景入口首页 + 搜索/筛选。', 'SEO landing pages 与本地指南。', 'TikTok / IG / community submission 做增长。'] },
        { title: 'Phase 3 · 验证商户', lines: ['接触 cafe / 餐厅更新资料与 lunch set。', '早期免费 verified listing。', '收集用户与商户反馈。'] },
        { title: 'Phase 4 · 变现', lines: ['Featured placement 与 promo 页。', 'Merchant dashboard。', '扩展城市与垂类,验证后再考虑换域名。'] },
      ]
    : [
        { title: 'Phase 1 · Build useful data', lines: ['One city/area first: Penang, KL, PJ, Georgetown, Mont Kiara, Bangsar.', '100 places, each more useful than Google Maps.', 'Ship 8 filters and the Place Profile.'] },
        { title: 'Phase 2 · Launch scene discovery', lines: ['Scene-entry homepage + search/filter.', 'SEO landing pages and local guides.', 'Grow via TikTok / IG / community submissions.'] },
        { title: 'Phase 3 · Merchant validation', lines: ['Approach cafes/restaurants for profiles and lunch sets.', 'Free verified listing for early merchants.', 'Collect user and merchant feedback.'] },
        { title: 'Phase 4 · Monetization', lines: ['Featured placement and promo pages.', 'Merchant dashboard.', 'Expand cities/verticals; revisit domain after validation.'] },
      ];

  const businessCards = isZh
    ? [
        { title: 'Featured listing', copy: '商户付费出现在相关场景。' },
        { title: 'Promo placement', copy: 'Lunch set、限时优惠在 promo 入口曝光。' },
        { title: 'Merchant subscription', copy: '商户订阅管理资料与表现。' },
        { title: 'Verified place badge', copy: '核验 plug / parking / 宠物政策 / promo。' },
        { title: 'Work-friendly badge', copy: 'Cafe 办公友好认证,强差异化。' },
        { title: 'Local guide sponsorship', copy: '赞助本地指南与清单文。' },
        { title: 'Pet-friendly premium', copy: '宠物友好高信任类别 + 活动。' },
        { title: 'Data insights', copy: '给商户的客流与场景数据。' },
      ]
    : [
        { title: 'Featured listing', copy: 'Merchants pay to appear in relevant scenes.' },
        { title: 'Promo placement', copy: 'Lunch sets and limited deals in the promo entry.' },
        { title: 'Merchant subscription', copy: 'Subscription to manage profile and performance.' },
        { title: 'Verified place badge', copy: 'Verify plug / parking / pet policy / promo.' },
        { title: 'Work-friendly badge', copy: 'Cafe work-friendly certification — strong edge.' },
        { title: 'Local guide sponsorship', copy: 'Sponsor local guides and listicles.' },
        { title: 'Pet-friendly premium', copy: 'High-trust pet category plus events.' },
        { title: 'Data insights', copy: 'Footfall and scene data for merchants.' },
      ];

  const domainCards = isZh
    ? [
        { title: 'A · 继续 jiju.pet', lines: ['品牌解释变宽:从 pet-friendly 扩到 places worth visiting。', '缺点:新用户可能误会只跟宠物有关。'] },
        { title: 'B · 买新主域名', lines: ['jiju.my / jiju.place / jiju.city / gojiju.com / jiju.guide。', 'jiju.pet 变成其中一个频道。最干净。'] },
        { title: 'C · 先 MVP 再换', lines: ['先用 jiju.pet 做 MVP,验证场景搜索。', '最现实:先别纠结 domain。'] },
      ]
    : [
        { title: 'A · Keep jiju.pet', lines: ['Widen the brand: pet-friendly to places worth visiting.', 'Risk: new users assume it is pet-only.'] },
        { title: 'B · Buy a new domain', lines: ['jiju.my / jiju.place / jiju.city / gojiju.com / jiju.guide.', 'jiju.pet becomes one channel. Cleanest.'] },
        { title: 'C · MVP first, switch later', lines: ['Use jiju.pet for the MVP, validate scene search.', 'Most realistic: do not over-think the domain yet.'] },
      ];

  const founderRows = isZh
    ? [
        { role: 'Eden · 系统', copy: '标签系统、搜索、推荐、地点 database、scoring、merchant dashboard、user submission、AI recommendation、SEO landing pages。' },
        { role: 'Partner · 增长', copy: '去店里验证、拍短视频、跟商家谈 promo、拿 lunch set、做 cafe work list、本地推荐、merchant onboarding、TikTok series、社区探店。' },
        { role: 'Shared', copy: '品牌方向、变现策略、重大支出、股权、合作条款、融资与扩张。' },
      ]
    : [
        { role: 'Eden · Systems', copy: 'Tagging, search, recommendation, place database, scoring, merchant dashboard, user submission, AI recommendation, SEO landing pages.' },
        { role: 'Partner · Growth', copy: 'On-site verification, short videos, merchant promo deals, lunch-set info, cafe-work lists, local picks, merchant onboarding, TikTok series, community outings.' },
        { role: 'Shared', copy: 'Brand direction, monetization, major spend, equity, partnership terms, fundraising, expansion.' },
      ];

  const sloganCards = isZh
    ? [
        { title: 'Find places worth visiting', copy: '强调“值得去”。' },
        { title: 'Where should we go today?', copy: '直接命中脑内问题,最强。' },
        { title: 'Local spots, real context', copy: '强调本地与真实场景。' },
        { title: '今天去哪里？', copy: '中文感,生活化。' },
      ]
    : [
        { title: 'Find places worth visiting', copy: 'Emphasizes “worth it”.' },
        { title: 'Where should we go today?', copy: 'Hits the in-head question. Strongest.' },
        { title: 'Local spots, real context', copy: 'Emphasizes local + real scenes.' },
        { title: '今天去哪里？', copy: 'A local, lived-in Chinese voice.' },
      ];

  return (
    <div className="page-shell jiju-page min-h-screen selection:bg-eden-mint/30 selection:text-stone-900">
      <main className="px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-6xl">
          <div className="jiju-topbar flex flex-wrap items-center justify-between gap-3">
            <a href={homeHref} className="jiju-back-link inline-flex items-center gap-2 text-sm font-medium">
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

          <header className="jiju-hero py-16 text-center md:py-24">
            <p className="jiju-kicker mx-auto">{isZh ? 'Jiju / 本地人也会用的去处指南' : 'Jiju / A local discovery guide for places worth visiting'}</p>
            <h1 className="jiju-title mx-auto mt-5 font-display font-bold tracking-tight">Where should we go today?</h1>
            <p className="jiju-subtitle mx-auto mt-5">
              {isZh
                ? '不是普通 review site,也不是 pet-friendly app。Jiju 用真实生活需求帮你决定去哪:lunch set、laptop cafe、plug、parking、promo、宠物友好,以及本地人真的认可的食物。'
                : 'Not a review site, not a pet-friendly app. Jiju helps you decide where to go by real-life needs: lunch sets, laptop cafes, plugs, parking, promos, pet-friendly spots, and food locals actually approve.'}
            </p>
            <div className="jiju-scene-chips">
              {sceneEntries.map((label) => (
                <span key={label} className="jiju-scene-chip">{label}</span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap justify-center gap-5">
              <a href="https://jiju.pet" target="_blank" rel="noopener noreferrer" className="jiju-text-cta">
                {isZh ? '打开 jiju.pet' : 'Open jiju.pet'} <ExternalLink size={15} />
              </a>
              <a href="#mvp" className="jiju-text-cta jiju-text-cta-muted">
                {isZh ? '看 MVP 计划' : 'View MVP plan'} <span aria-hidden>›</span>
              </a>
            </div>
          </header>

          <section className="jiju-product-panel">
            <div className="jiju-product-copy">
              <p className="jiju-kicker">{isZh ? 'Positioning' : 'Positioning'}</p>
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                {isZh ? '卖的是“场景”,不是“地点”。' : 'It sells the scene, not the place.'}
              </h2>
              <p>
                {isZh
                  ? 'Google Map 是地点数据库。Jiju 要做的是场景数据库——把同一家店拆成「适不适合现在的我」。从 niche directory 变成 lifestyle utility:where to go, based on mood, need, time, budget, and lifestyle。'
                  : 'Google Maps is a place database. Jiju is a scene database — breaking each place into “does it fit me right now”. From a niche directory into a lifestyle utility: where to go, based on mood, need, time, budget, and lifestyle.'}
              </p>
            </div>
            <div className="jiju-proof-grid">
              {proofPoints.map(([label, value]) => (
                <div key={label} className="jiju-proof-row">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Same cafe, different data' : 'Same cafe, different data'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '同一家 cafe,在 Jiju 里被拆成可回答的问题。' : 'The same cafe, broken into questions Jiju can answer.'}
              </h2>
            </div>
            <div className="jiju-split-grid mt-12">
              <article className="jiju-note-card">
                <h3 className="font-display text-2xl font-bold tracking-tight">{isZh ? 'Google Map 显示' : 'Google Maps shows'}</h3>
                <ul>
                  {mapShows.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </article>
              <article className="jiju-note-card">
                <h3 className="font-display text-2xl font-bold tracking-tight">{isZh ? 'Jiju 回答' : 'Jiju answers'}</h3>
                <ul>
                  {jijuAnswers.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </article>
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'The problem' : 'The problem'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '人们搜的不是“餐厅”,是“情境”。' : 'People do not search for restaurants. They search for situations.'}
              </h2>
              <p className="jiju-section-copy">
                {isZh
                  ? '今天 lunch 去哪、哪里能办公、哪里好 parking、本地人觉得哪里真的好——现有工具回答不了。'
                  : 'Where to eat now, where to work, where parking is easy, what locals actually rate — existing tools cannot answer.'}
              </p>
            </div>
            <div className="jiju-review-track mt-12">
              {problemCards.map((item) => (
                <article key={item.label} className="jiju-review-card">
                  <span>{item.label}</span>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? '5 main categories' : '5 main categories'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">Eat · Work · Chill · Pet · Promo</h2>
              <p className="jiju-section-copy">
                {isZh
                  ? '五个主分类,每个都有很具体的标签。Pet 保留为强 filter,而不是唯一主轴。'
                  : 'Five main categories, each with concrete tags. Pet stays a strong filter, not the only axis.'}
              </p>
            </div>
            <div className="jiju-cat-grid mt-12">
              {categoryCards.map((cat) => (
                <article key={cat.title} className="jiju-cat-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{cat.title}</h3>
                  <p className="jiju-kicker">{cat.note}</p>
                  <div className="jiju-tag-row">
                    {cat.tags.map((tag) => (
                      <span key={tag} className="jiju-tag">{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Jiju Fit Score' : 'Jiju Fit Score'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '不只显示 rating,显示“适不适合你”。' : 'Not just a rating — a fit score.'}
              </h2>
            </div>
            <div className="jiju-score-card mt-12">
              <div className="jiju-score-grid">
                {scoreRows.map(([label, value]) => (
                  <div key={label} className="jiju-score-row">
                    <span>{label}</span>
                    <div className="jiju-score-bar">
                      <div className="jiju-score-fill" style={{ width: `${value * 10}%` }} />
                    </div>
                    <strong>{value.toFixed(1)}</strong>
                  </div>
                ))}
              </div>
              <p className="jiju-score-summary">
                Best for weekday laptop work and affordable lunch set, but parking gets difficult after 12:30pm.
              </p>
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Place Profile' : 'Place Profile'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '资料像数据库,比 Google Map 更有用。' : 'Each profile reads like a database, more useful than Maps.'}
              </h2>
            </div>
            <div className="jiju-profile-card mt-12">
              {profileRows.map(([label, value]) => (
                <div key={label} className="jiju-profile-row">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Differentiation' : 'Differentiation'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">Not just highly rated. Actually useful.</h2>
              <p className="jiju-section-copy">
                {isZh
                  ? 'Michelin / Google / Tripadvisor / 小红书都太游客化、太网红化、太多假 review、没有场景标签。Jiju 的差异化是 Local Context:plug、parking、能不能坐久、local 是否真去、promo 是否还 active。'
                  : 'Michelin / Google / Tripadvisor / XHS are too touristy, too influencer-driven, too many fake reviews, no scene tags. Jiju’s edge is Local Context: plugs, parking, sit-long, whether locals really go, and whether the promo is still active.'}
              </p>
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Homepage concept' : 'Homepage concept'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '首页是场景入口,不是地图。' : 'The homepage is a scene entry, not a map.'}
              </h2>
            </div>
            <div className="jiju-split-grid mt-12">
              <article className="jiju-note-card">
                <h3 className="font-display text-2xl font-bold tracking-tight">{isZh ? '第一屏 · 场景按钮' : 'First screen · scene buttons'}</h3>
                <div className="jiju-tag-row">
                  {sceneEntries.map((label) => (
                    <span key={label} className="jiju-tag">{label}</span>
                  ))}
                </div>
              </article>
              <article className="jiju-note-card">
                <h3 className="font-display text-2xl font-bold tracking-tight">Today&apos;s useful picks</h3>
                <ul>
                  {todaysPicks.map((pick) => (
                    <li key={pick}>{pick}</li>
                  ))}
                </ul>
              </article>
            </div>
          </section>

          <section id="mvp" className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'MVP plan' : 'MVP plan'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '不要做整个 Malaysia。先做透一个城市。' : 'Do not do all of Malaysia. Nail one city first.'}
              </h2>
              <p className="jiju-section-copy">
                {isZh ? '第一版只做 8 个 filter:' : 'V1 ships only 8 filters:'}
              </p>
              <div className="jiju-tag-row">
                {mvpFilters.map((f) => (
                  <span key={f} className="jiju-tag">{f}</span>
                ))}
              </div>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {mvpCards.map((item) => (
                <article key={item.title} className="jiju-note-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title}</h3>
                  <ul>
                    {item.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Business model' : 'Business model'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '日常高频,变现方式比 pet directory 多。' : 'Daily frequency, more monetization than a pet directory.'}
              </h2>
              <p className="jiju-section-copy">
                {isZh ? '用户每周用,而不是只有带宠物时才用。' : 'Used weekly, not only when bringing a pet.'}
              </p>
            </div>
            <div className="jiju-skill-grid mt-12">
              {businessCards.map((item) => (
                <article key={item.title} className="jiju-skill-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Domain strategy' : 'Domain strategy'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? '.pet 还是新域名?先验证再决定。' : '.pet or a new domain? Validate first.'}
              </h2>
              <p className="jiju-section-copy">
                {isZh ? '当下结论:先别纠结 domain,先验证有没有人真的用场景搜索。' : 'For now: do not over-think the domain, validate that people actually use scene search.'}
              </p>
            </div>
            <div className="jiju-operating-grid mt-12">
              {domainCards.map((group) => (
                <article key={group.title} className="jiju-operating-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{group.title}</h3>
                  <ul>
                    {group.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Founder roles' : 'Founder roles'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">
                {isZh ? 'Eden 做系统,partner 做真实增长。' : 'Eden builds systems; partner drives real-world growth.'}
              </h2>
            </div>
            <div className="jiju-philosophy-list mt-12">
              {founderRows.map((item) => (
                <article key={item.role} className="jiju-philosophy-row">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.role}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="jiju-section py-16 md:py-24">
            <div className="jiju-section-head">
              <p className="jiju-kicker">{isZh ? 'Slogan & brand' : 'Slogan & brand'}</p>
              <h2 className="jiju-section-title font-display font-bold tracking-tight">Local places, filtered by real-life needs.</h2>
              <p className="jiju-section-copy">
                {isZh
                  ? '不看星级、不看网红、不看广告——看我现在饿了、要坐着工作、怕 parking、带宠物、想省钱、想吃 local 觉得真好吃的、不想踩雷。'
                  : 'Not stars, not influencers, not ads — but: I am hungry now, I need to sit and work, I dread parking, I have my pet, I want to save, I want food locals actually love, I do not want to get burned.'}
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {sloganCards.map((item) => (
                <article key={item.title} className="jiju-system-card">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
            <a href={joinBasePath(revampBase, 'jiju-pet')} className="jiju-text-cta jiju-text-cta-muted mt-10 inline-flex">
              {isZh ? '看 Jiju.pet 构建记录' : 'View the Jiju.pet build log'} <span aria-hidden>›</span>
            </a>
          </section>
        </div>
      </main>
    </div>
  );
};
