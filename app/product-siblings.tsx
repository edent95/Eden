import React from 'react';
import { ProjectsDrRacingCssIcon, ProjectsEtReportCssIcon, ProjectsJijuCssIcon, ProjectsLifeOsCssIcon, ProjectsPokerCssIcon } from '../components/css-art/index';
import { joinBasePath } from './shared';

/** Cross-links shown in the "You might also like" row on every product page. */

export type ProductSibling = {
  id: string;
  name: string;
  path: string;
  iconLabel: string;
  Icon: React.FC<{ label: string }>;
  blurb: { en: string; zh: string };
};

/** Cross-links shown in the "You might also like" row on every product page. */
const productSiblings: ProductSibling[] = [
  {
    id: 'life-os',
    name: 'Life OS',
    path: 'life-os',
    iconLabel: 'LifeOs CSS app icon',
    Icon: ProjectsLifeOsCssIcon,
    blurb: { en: 'Read yourself like a manual.', zh: '把你这个人，读成一本说明书。' },
  },
  {
    id: 'etreporthub',
    name: 'ETReportHub',
    path: 'etreporthub',
    iconLabel: 'ETReportHub CSS app icon',
    Icon: ProjectsEtReportCssIcon,
    blurb: { en: 'Turn daily Excel into clear operating decisions.', zh: '把每日 Excel 变成清楚的运营判断。' },
  },
  {
    id: 'dr-racing',
    name: 'Dr Racing',
    path: 'dr-racing',
    iconLabel: 'Dr Racing CSS app icon',
    Icon: ProjectsDrRacingCssIcon,
    blurb: { en: 'Run the whole motorcycle-loan pipeline in one dashboard.', zh: '把摩托车贷款流程放进同一个仪表台。' },
  },
  {
    id: 'jiju',
    name: 'Jiju',
    path: 'jiju-pet',
    iconLabel: 'Jiju CSS app icon',
    Icon: ProjectsJijuCssIcon,
    blurb: { en: 'Find places that truly work for you and your pet.', zh: '找到真正适合你和宠物一起去的地方。' },
  },
  {
    id: 'poker',
    name: 'Friday Poker Club',
    path: 'poker',
    iconLabel: 'Friday Poker Club CSS app icon',
    Icon: ProjectsPokerCssIcon,
    blurb: { en: 'No place to book. Just bring the crew back.', zh: '不用约地点。把那群人叫回来就好。' },
  },
];

export const productSiblingCards = (baseUrl: string, excludeId: string) =>
  productSiblings
    .filter((item) => item.id !== excludeId)
    .map((item) => ({
      href: joinBasePath(baseUrl, item.path),
      name: item.name,
      blurb: item.blurb,
      icon: <item.Icon label={item.iconLabel} />,
    }));
