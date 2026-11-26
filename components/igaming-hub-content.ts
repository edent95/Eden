/**
 * `/igaming` — the hub left on eden-tan.com after the iGaming starter pack and guides moved to
 * Asia iGaming (https://asiaigaming.com) on 2026-11-25. It only says where the guides went and
 * links to what stayed here: the field notes (`/igaming/cases`). The résumé page is deliberately
 * not linked: it is unlisted and only sent to recruiters (user decision 2026-11-26).
 *
 * One copy feeds both the React page (`IGamingHubPage.tsx`) and the prerendered static body
 * (`seo-static-content.ts`), so the two cannot drift. Written in first person as Eden Tan.
 * Keep it factual: nothing here may claim more than "the guides are over there, the field
 * notes are still here, old links forward".
 */
import type { IGamingLocalized } from './igaming-content';

const L = (en: string, zh: string): IGamingLocalized => ({ en, zh });

/** `asia:<path>` → that path on asiaigaming.com (language-aware); `cases` → the field notes on this site. */
export type IGamingHubHref = `asia:${string}` | 'cases';

export type IGamingHubLink = { href: IGamingHubHref; label: IGamingLocalized; primary?: boolean };

export const IGAMING_HUB = {
  back: L('Back to home', '返回首页'),
  kicker: L('iGaming', 'iGaming'),
  claim: L('My iGaming guides now live at Asia iGaming.', '我的 iGaming 指南搬到 Asia iGaming 了。'),
  standfirst: L(
    'I write Asia iGaming, a separate site for the starter pack and guides that used to be on this page. My field notes stay here.',
    'Asia iGaming 是我写的另一个网站，原本放在这一页的入门包和指南都搬过去了。我自己的实战案例留在这里。',
  ),
  openAsia: L('Open Asia iGaming', '打开 Asia iGaming'),
  sections: [
    {
      id: 'moved',
      title: L('Where the guides went', '指南搬去哪了'),
      paragraphs: [
        L(
          'Asia iGaming (asiaigaming.com) now holds everything that used to be the iGaming starter pack on eden-tan.com: the key points on its home page, the full guide, the knowledge atlas, and seven topic guides: GGR vs NGR, provider promotions, the promotion launch checklist, CRM and the player lifecycle, marketing reports beyond CPA, RTP, and wagering requirements.',
          'Asia iGaming（asiaigaming.com）现在放着原本在 eden-tan.com 的整套 iGaming 入门包：首页的重点版、完整版、知识地图，以及七篇专题：GGR 与 NGR、供应商促销、活动上线清单、CRM 与玩家生命周期、不只看 CPA 的营销报表、RTP、流水要求。',
        ),
        L(
          'It is in English and Chinese, the same as this site.',
          '它和这个网站一样，有英文和中文两个版本。',
        ),
      ],
      links: [
        { href: 'asia:/', label: L('Asia iGaming: starter pack', 'Asia iGaming：入门包'), primary: true },
        { href: 'asia:/guide/', label: L('Full guide', '完整版') },
        { href: 'asia:/atlas/', label: L('Knowledge atlas', '知识地图') },
      ] as IGamingHubLink[],
    },
    {
      id: 'here',
      title: L('What stays on this site', '留在这个网站的'),
      paragraphs: [
        L(
          'The field notes are anonymised case studies from my own operator-side and provider-side work: what the problem was, how I investigated it, what got built, and what each case does not prove.',
          '实战案例是我自己在 operator 和 provider 两边工作的匿名案例：问题是什么、我怎么查、最后做了什么，以及每个案例不能证明什么。',
        ),
      ],
      links: [
        { href: 'cases', label: L('Read the field notes', '看实战案例') },
      ] as IGamingHubLink[],
    },
    {
      id: 'old-links',
      title: L('Old links still work', '旧链接还能用'),
      paragraphs: [
        L(
          'A link to one of the old guide pages on eden-tan.com forwards to the same guide on Asia iGaming. The guides moved so that there is one copy to keep up to date instead of two.',
          '指向 eden-tan.com 旧指南页的链接，会转到 Asia iGaming 上的同一篇。搬过去是为了只维护一份，而不是两边各放一份。',
        ),
      ],
      links: [] as IGamingHubLink[],
    },
  ],
};
