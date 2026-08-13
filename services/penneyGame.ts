/**
 * Penney's Game — pure game logic.
 *
 * Exact win probabilities come from Conway's leading-numbers formula, not
 * simulation. For two sequences A and B over fair coin flips:
 *
 *   L(X, Y) = sum over k of 2^(k-1) when the last k chars of X equal the first k of Y
 *   odds(A beats B) = (L(B,B) - L(B,A)) / (L(A,A) - L(A,B))
 *
 * Verified against 200k-round Monte Carlo for every 3-bit matchup.
 */

export type Face = 'H' | 'T';
export type Sequence = string;

export type PenneyLevelId = 1 | 2 | 3 | 4 | 5;
export type PenneyMode = 'campaign' | 'ranked' | 'lab';

/** Who commits to a sequence first in a given level. */
export type PickOrder = 'player-first' | 'cpu-first';

/** How the CPU chooses its sequence. */
export type CpuBrain = 'random' | 'optimal';

export const START_CHIPS = 100;
export const BAILOUT_CHIPS = 50;
export const RANKED_UNLOCK_LEVEL: PenneyLevelId = 4;
export const LAB_UNLOCK_LEVEL: PenneyLevelId = 3;

/* ------------------------------------------------------------------ */
/* Conway leading numbers                                              */
/* ------------------------------------------------------------------ */

const correlation = (x: Sequence, y: Sequence): number => {
  let total = 0;
  for (let k = 1; k <= x.length; k += 1) {
    if (x.slice(x.length - k) === y.slice(0, k)) total += 1 << (k - 1);
  }
  return total;
};

/** Probability that sequence `a` appears before sequence `b`. */
export const winProbability = (a: Sequence, b: Sequence): number => {
  if (a === b) return 0.5;
  const numerator = correlation(b, b) - correlation(b, a);
  const denominator = correlation(a, a) - correlation(a, b);
  const total = numerator + denominator;
  if (total <= 0) return 0.5;
  return numerator / total;
};

/** Every sequence of the given length, in stable ascending order. */
export const allSequences = (length: number): Sequence[] => {
  const out: Sequence[] = [];
  for (let index = 0; index < 1 << length; index += 1) {
    let sequence = '';
    for (let bit = length - 1; bit >= 0; bit -= 1) {
      sequence += (index >> bit) & 1 ? 'H' : 'T';
    }
    out.push(sequence);
  }
  return out;
};

/** The strongest counter to `opponent`, plus the probability it wins. */
export const bestResponse = (opponent: Sequence): { sequence: Sequence; probability: number } => {
  let sequence = '';
  let probability = -1;
  for (const candidate of allSequences(opponent.length)) {
    if (candidate === opponent) continue;
    const p = winProbability(candidate, opponent);
    if (p > probability) {
      probability = p;
      sequence = candidate;
    }
  }
  return { sequence, probability };
};

/** Every counter that ties the best achievable probability. */
export const optimalResponses = (opponent: Sequence): Sequence[] => {
  const best = bestResponse(opponent).probability;
  return allSequences(opponent.length).filter(
    (candidate) => candidate !== opponent && Math.abs(winProbability(candidate, opponent) - best) < 1e-9,
  );
};

/** The classic mnemonic: against ABC, play (not B) + A + B. */
export const mnemonicResponse = (opponent: Sequence): Sequence =>
  `${opponent[1] === 'H' ? 'T' : 'H'}${opponent[0]}${opponent[1]}`;

/** Render a probability as a small integer ratio, e.g. 7 : 1. */
export const formatOdds = (probability: number): string => {
  const loss = 1 - probability;
  if (loss <= 0) return '∞ : 1';
  for (let denominator = 1; denominator <= 64; denominator += 1) {
    const numerator = (probability / loss) * denominator;
    if (Math.abs(numerator - Math.round(numerator)) < 1e-9) {
      return `${Math.round(numerator)} : ${denominator}`;
    }
  }
  return `${(probability / loss).toFixed(2)} : 1`;
};

export const randomSequence = (length: number): Sequence => {
  const pool = allSequences(length);
  return pool[Math.floor(Math.random() * pool.length)];
};

export const flipCoin = (): Face => (Math.random() < 0.5 ? 'H' : 'T');

/** Play one full round to completion and report the winner. */
export const resolveRound = (
  player: Sequence,
  cpu: Sequence,
): { winner: 'player' | 'cpu'; flips: Face[] } => {
  const length = player.length;
  const flips: Face[] = [];
  for (let guard = 0; guard < 5000; guard += 1) {
    flips.push(flipCoin());
    const tail = flips.slice(-length).join('');
    if (tail === player) return { winner: 'player', flips };
    if (tail === cpu) return { winner: 'cpu', flips };
  }
  return { winner: 'cpu', flips };
};

/** Monte Carlo helper used by the Lab simulator. */
export const simulate = (
  player: Sequence,
  cpu: Sequence,
  rounds: number,
): { wins: number; rounds: number; averageFlips: number } => {
  const length = player.length;
  let wins = 0;
  let flips = 0;
  for (let round = 0; round < rounds; round += 1) {
    let buffer = '';
    for (;;) {
      buffer += Math.random() < 0.5 ? 'H' : 'T';
      flips += 1;
      if (buffer.length > length) buffer = buffer.slice(-length);
      if (buffer === player) {
        wins += 1;
        break;
      }
      if (buffer === cpu) break;
    }
  }
  return { wins, rounds, averageFlips: flips / rounds };
};

/* ------------------------------------------------------------------ */
/* Campaign definition                                                 */
/* ------------------------------------------------------------------ */

export type LocalizedText = { en: string; zh: string };

export type PenneyLevel = {
  id: PenneyLevelId;
  codename: string;
  name: LocalizedText;
  brief: LocalizedText;
  /** What the player has to do to clear the level. */
  goal: LocalizedText;
  /** Shown once the level is cleared — the lesson the level teaches. */
  lesson: LocalizedText;
  length: number | 'mixed';
  order: PickOrder;
  brain: CpuBrain;
  /** 'wins' = win N rounds, 'rounds' = survive N rounds, 'streak' = N optimal picks in a row. */
  objective: 'wins' | 'rounds' | 'streak' | 'perfect';
  target: number;
  reward: number;
  betting: boolean;
};

export const PENNEY_LEVELS: PenneyLevel[] = [
  {
    id: 1,
    codename: 'Warm-up',
    name: { en: 'Street Warm-up', zh: '街头热身' },
    brief: {
      en: 'Both of you pick blind. Nobody is cheating yet — learn how a round ends.',
      zh: '双方都是瞎选，还没人出老千。先弄懂一局是怎么结束的。',
    },
    goal: { en: 'Win 3 rounds', zh: '赢 3 局' },
    lesson: {
      en: 'Every 3-flip sequence is equally likely to show up on its own. That is why the game looks fair.',
      zh: '每个 3 位序列单独出现的概率完全一样 —— 这就是这个游戏看起来公平的原因。',
    },
    length: 3,
    order: 'player-first',
    brain: 'random',
    objective: 'wins',
    target: 3,
    reward: 100,
    betting: true,
  },
  {
    id: 2,
    codename: 'The Hustle',
    name: { en: 'The Hustle', zh: '被宰' },
    brief: {
      en: 'You still pick first. The dealer now answers your pick on purpose. Play it out.',
      zh: '你还是先选。但庄家开始针对你的选择出牌了。打完就知道。',
    },
    goal: { en: 'Survive 6 rounds', zh: '打满 6 局' },
    lesson: {
      en: 'Whatever you picked, a counter existed. Picking first is the losing seat.',
      zh: '无论你选什么，都存在一个克制它的序列。先选的那个人，坐的是输家的位子。',
    },
    length: 3,
    order: 'player-first',
    brain: 'optimal',
    objective: 'rounds',
    target: 6,
    reward: 150,
    betting: true,
  },
  {
    id: 3,
    codename: 'The Counter',
    name: { en: 'The Counter', zh: '反杀' },
    brief: {
      en: 'Seats swapped. The dealer commits first — now find the sequence that beats it.',
      zh: '换位子了。庄家先出牌 —— 现在轮到你找出克制它的序列。',
    },
    goal: { en: '3 optimal picks in a row', zh: '连续 3 次选出最优应对' },
    lesson: {
      en: 'Against ABC, play (not B) + A + B. It is optimal for all eight 3-bit sequences.',
      zh: '对手选 ABC，你就选「B 的反面 + A + B」。这个口诀对全部 8 个三位序列都是最优解。',
    },
    length: 3,
    order: 'cpu-first',
    brain: 'random',
    objective: 'streak',
    target: 3,
    reward: 200,
    betting: true,
  },
  {
    id: 4,
    codename: 'Four-Bit',
    name: { en: 'Four-Bit Master', zh: '四位大师' },
    brief: {
      en: 'Four flips now. The mnemonic bends — you have to read the overlap instead.',
      zh: '换成 4 位。口诀在这里会失灵 —— 你得改看序列之间的重叠结构。',
    },
    goal: { en: '3 optimal picks in a row', zh: '连续 3 次选出最优应对' },
    lesson: {
      en: 'What decides the winner is prefix/suffix overlap, not the sequence itself. THHH beats HHHH 15 : 1.',
      zh: '决定胜负的是前后缀重叠结构，不是序列本身。THHH 打 HHHH 是 15 : 1。',
    },
    length: 4,
    order: 'cpu-first',
    brain: 'random',
    objective: 'streak',
    target: 3,
    reward: 300,
    betting: true,
  },
  {
    id: 5,
    codename: 'Clean Sweep',
    name: { en: 'Clean Sweep', zh: '通杀' },
    brief: {
      en: 'Mixed length, dealer first. Pick optimally AND take the round. Luck still gets a vote.',
      zh: '长度随机，庄家先出。既要选对，还要真的赢下这一局 —— 运气仍然有一票。',
    },
    goal: { en: 'Win 5 rounds with optimal picks', zh: '用最优应对赢下 5 局' },
    lesson: {
      en: 'A 3 : 1 edge is an edge, not a guarantee. Edge plus volume is the whole hustle.',
      zh: '3 : 1 的优势是优势，不是保证。优势 × 局数，才是这门生意的全部。',
    },
    length: 'mixed',
    order: 'cpu-first',
    brain: 'random',
    objective: 'perfect',
    target: 5,
    reward: 500,
    betting: true,
  },
];

export const levelById = (id: PenneyLevelId): PenneyLevel =>
  PENNEY_LEVELS.find((level) => level.id === id) ?? PENNEY_LEVELS[0];

/* ------------------------------------------------------------------ */
/* Ranked mode — Blind Master                                          */
/* ------------------------------------------------------------------ */

export const RANKED_START_SECONDS = 8;
export const RANKED_MIN_SECONDS = 3;

/** Timer allowance shrinks as the streak grows. */
export const rankedSeconds = (questionIndex: number): number =>
  Math.max(RANKED_MIN_SECONDS, RANKED_START_SECONDS - Math.floor(questionIndex / 3));

/** Points for one correct answer, given the whole seconds left on the clock. */
export const rankedQuestionScore = (secondsLeft: number): number => 100 + Math.max(0, Math.floor(secondsLeft)) * 10;

export const RANKED_MILESTONES: { at: number; bonus: number }[] = [
  { at: 5, bonus: 200 },
  { at: 10, bonus: 500 },
  { at: 20, bonus: 1000 },
];

export const rankedMilestoneBonus = (streak: number): number =>
  RANKED_MILESTONES.find((milestone) => milestone.at === streak)?.bonus ?? 0;

/* ------------------------------------------------------------------ */
/* Save file                                                           */
/* ------------------------------------------------------------------ */

export const PENNEY_SAVE_KEY = 'eden.penney.v1';

export type PenneySave = {
  chips: number;
  clearedLevels: PenneyLevelId[];
  bestRankedScore: number;
  bestRankedStreak: number;
  playerName: string;
  bailouts: number;
  roundsPlayed: number;
  roundsWon: number;
};

export const emptySave = (): PenneySave => ({
  chips: START_CHIPS,
  clearedLevels: [],
  bestRankedScore: 0,
  bestRankedStreak: 0,
  playerName: '',
  bailouts: 0,
  roundsPlayed: 0,
  roundsWon: 0,
});

export const loadSave = (): PenneySave => {
  if (typeof window === 'undefined') return emptySave();
  try {
    const raw = window.localStorage.getItem(PENNEY_SAVE_KEY);
    if (!raw) return emptySave();
    const parsed = JSON.parse(raw) as Partial<PenneySave>;
    const base = emptySave();
    return {
      ...base,
      ...parsed,
      clearedLevels: Array.isArray(parsed.clearedLevels)
        ? (parsed.clearedLevels.filter((id) => [1, 2, 3, 4, 5].includes(id as number)) as PenneyLevelId[])
        : [],
      chips: typeof parsed.chips === 'number' && Number.isFinite(parsed.chips) ? parsed.chips : base.chips,
    };
  } catch {
    return emptySave();
  }
};

export const persistSave = (save: PenneySave): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(PENNEY_SAVE_KEY, JSON.stringify(save));
  } catch {
    /* storage unavailable — the session still plays, it just will not persist */
  }
};

export const highestUnlockedLevel = (cleared: PenneyLevelId[]): PenneyLevelId => {
  const next = PENNEY_LEVELS.find((level) => !cleared.includes(level.id));
  return next ? next.id : 5;
};

export const isLevelUnlocked = (id: PenneyLevelId, cleared: PenneyLevelId[]): boolean =>
  id === 1 || cleared.includes((id - 1) as PenneyLevelId) || cleared.includes(id);
