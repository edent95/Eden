import { siteEssayNotes } from '../generated/content.ts';

export const wikiTopics = [
  'turn-chaos-into-systems',
  'judgment-is-not-more-information',
  'human-nature-is-a-design-condition',
  'win-before-you-fight',
].map((slug) => {
  const note = siteEssayNotes.find((entry) => entry.slug === slug);
  if (!note) throw new Error(`Wiki topic has no published Note: ${slug}`);
  return note;
});

export const WIKI_INDEX = {
  summary: {
    en: 'Start with systems, judgment, human behavior, or strategy. Find ideas and methods to bring back to your own work.',
    zh: '从系统、判断、人性和策略四个主题出发，找到可以带回工作里的思路与方法。',
  },
  topicsTitle: { en: 'Start with a theme', zh: '从四个主题开始' },
  topicsIntro: {
    en: 'Choose a theme to read the full essay in Notes.',
    zh: '选一个你正在思考的主题，进入 Notes 阅读完整文章。',
  },
  buildTitle: { en: 'Build experience', zh: '构建经验' },
  buildIntro: {
    en: 'Practical notes from building projects: development tools, interaction feedback, sound, persistence, and knowledge workflows.',
    zh: '做项目时留下的具体方法：开发工具、交互反馈、声音、数据保存与知识整理。',
  },
  relationshipTitle: { en: 'Find a theme. Read the thinking.', zh: 'Wiki 找主题，Notes 读文章。' },
  relationshipCopy: {
    en: 'The Wiki connects ideas by theme and keeps practical build references close by. Notes holds the full essays: the question, the reasoning, and the examples. Each essay has one home; this map helps you find it.',
    zh: 'Wiki 按主题整理入口，也保留做项目时可查的具体方法。Notes 展开一个想法，把问题、推理和例子讲完整。同一篇文章只保留一份正文，从这里找到它，再到 Notes 深读。',
  },
};
