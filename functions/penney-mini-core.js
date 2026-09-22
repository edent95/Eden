export const DAILY_CREDITS = 100;
export const MIN_RANKED_PLAYS = 10;
export const LEADERBOARD_SIZE = 20;
export const MAX_NAME_LENGTH = 16;

const FACE_PATTERN = /^[HT]{3}$/;

/**
 * Default board names: everyday Malaysian names, picked from the hashed player
 * id so the same visitor keeps the same name. Duplicates on the board are fine.
 */
export const DEFAULT_NAMES = [
  'Ben', 'Patrick', 'Lim', 'Tan', 'Teh', 'Albert', '静怡', '俊杰', 'Jason', 'Kee',
  'Wong', 'Ong', 'Chong', 'Ng', 'Lee', 'Goh', 'Kelvin', 'Alvin', 'Jacky', 'Vincent',
  'Eric', 'Daniel', 'Melvin', 'Desmond', 'Winnie', 'Michelle', 'Jessica', 'Carmen', '伟杰', '嘉欣',
  '家豪', '志明', '春娇', '美玲', '子轩', '欣怡', '振华', 'Ah Beng', 'Ah Lian',
];

export const defaultNameFor = (playerId) => {
  const seed = Number.parseInt(String(playerId ?? '').slice(0, 8), 16);
  return DEFAULT_NAMES[(Number.isFinite(seed) ? seed : 0) % DEFAULT_NAMES.length];
};

/** Names the server used to hand out (`visitor`, `visitor-1a2b`) count as unset. */
const LEGACY_AUTO_NAME = /^visitor(-[0-9a-f]{4})?$/;

const chosenName = (value) => {
  const name = sanitizeName(value);
  return LEGACY_AUTO_NAME.test(name) ? '' : name;
};

export const isSequence = (value) => typeof value === 'string' && FACE_PATTERN.test(value);

export const sanitizeName = (value) =>
  String(value ?? '')
    .replace(/[\u0000-\u001f\u007f]/g, '')
    .trim()
    .slice(0, MAX_NAME_LENGTH);

export const dayKey = (date = new Date()) => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kuala_Lumpur',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const read = (type) => parts.find((part) => part.type === type)?.value ?? '';
  return `${read('year')}-${read('month')}-${read('day')}`;
};

/**
 * The house response deliberately stays server-side. The homepage exposes the
 * observed tickets and outcomes, not the rule that generated the response.
 */
export const houseResponse = (playerSequence) => {
  if (!isSequence(playerSequence)) throw new Error('invalid-sequence');
  const first = playerSequence[0];
  const second = playerSequence[1];
  return `${second === 'H' ? 'T' : 'H'}${first}${second}`;
};

export const resolveRound = (playerSequence, nextFace = () => (Math.random() < 0.5 ? 'H' : 'T')) => {
  if (!isSequence(playerSequence)) throw new Error('invalid-sequence');
  const houseSequence = houseResponse(playerSequence);
  const flips = [];

  for (let index = 0; index < 10_000; index += 1) {
    const face = nextFace();
    if (face !== 'H' && face !== 'T') throw new Error('invalid-random-face');
    flips.push(face);
    const tail = flips.slice(-3).join('');
    if (tail === playerSequence) {
      return { playerSequence, houseSequence, flips, winner: 'player' };
    }
    if (tail === houseSequence) {
      return { playerSequence, houseSequence, flips, winner: 'house' };
    }
  }

  throw new Error('round-did-not-resolve');
};

export const normalizePlayer = (value, currentDay, fallbackName = DEFAULT_NAMES[0]) => {
  const source = value && typeof value === 'object' ? value : {};
  const plays = Math.max(0, Math.floor(Number(source.plays) || 0));
  const wins = Math.min(plays, Math.max(0, Math.floor(Number(source.wins) || 0)));
  const storedDay = typeof source.day === 'string' ? source.day : currentDay;
  const dailyUsed = storedDay === currentDay
    ? Math.min(DAILY_CREDITS, Math.max(0, Math.floor(Number(source.dailyUsed) || 0)))
    : 0;

  return {
    name: chosenName(source.name) || fallbackName,
    plays,
    wins,
    winRate: plays > 0 ? wins / plays : 0,
    day: currentDay,
    dailyUsed,
    updatedAt: Math.max(0, Math.floor(Number(source.updatedAt) || 0)),
    // Set by hand in the database to keep a player off the public board; survives later rounds.
    ...(source.hidden === true ? { hidden: true } : {}),
  };
};

export const applyRound = ({ player, winner, name, currentDay, now }) => {
  const current = normalizePlayer(player, currentDay);
  if (current.dailyUsed >= DAILY_CREDITS) return null;

  const plays = current.plays + 1;
  const wins = current.wins + (winner === 'player' ? 1 : 0);
  return {
    ...current,
    name: chosenName(name) || current.name,
    plays,
    wins,
    winRate: wins / plays,
    dailyUsed: current.dailyUsed + 1,
    updatedAt: now,
  };
};

export const publicPlayer = (value, currentDay, fallbackName = DEFAULT_NAMES[0]) => {
  const player = normalizePlayer(value, currentDay, fallbackName);
  return {
    name: player.name,
    plays: player.plays,
    wins: player.wins,
    winRate: player.winRate,
    credits: DAILY_CREDITS - player.dailyUsed,
    dailyLimit: DAILY_CREDITS,
    ranked: player.plays >= MIN_RANKED_PLAYS,
  };
};

export const buildLeaderboard = (players, currentDay, currentPlayerId = '') =>
  Object.entries(players && typeof players === 'object' ? players : {})
    .filter(([, value]) => !(value && typeof value === 'object' && value.hidden === true))
    .map(([id, value]) => ({ id, ...publicPlayer(value, currentDay, defaultNameFor(id)) }))
    .filter((entry) => entry.ranked)
    .sort((a, b) => b.winRate - a.winRate || b.wins - a.wins || b.plays - a.plays || a.name.localeCompare(b.name))
    .slice(0, LEADERBOARD_SIZE)
    .map((entry, index) => ({
      rank: index + 1,
      name: entry.name,
      plays: entry.plays,
      wins: entry.wins,
      winRate: entry.winRate,
      isYou: entry.id === currentPlayerId,
    }));
