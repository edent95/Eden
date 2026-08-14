export const DAILY_CREDITS = 100;
export const MIN_RANKED_PLAYS = 10;
export const LEADERBOARD_SIZE = 20;
export const MAX_NAME_LENGTH = 16;

const FACE_PATTERN = /^[HT]{3}$/;

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

export const normalizePlayer = (value, currentDay, fallbackName = 'visitor') => {
  const source = value && typeof value === 'object' ? value : {};
  const plays = Math.max(0, Math.floor(Number(source.plays) || 0));
  const wins = Math.min(plays, Math.max(0, Math.floor(Number(source.wins) || 0)));
  const storedDay = typeof source.day === 'string' ? source.day : currentDay;
  const dailyUsed = storedDay === currentDay
    ? Math.min(DAILY_CREDITS, Math.max(0, Math.floor(Number(source.dailyUsed) || 0)))
    : 0;

  return {
    name: sanitizeName(source.name) || fallbackName,
    plays,
    wins,
    winRate: plays > 0 ? wins / plays : 0,
    day: currentDay,
    dailyUsed,
    updatedAt: Math.max(0, Math.floor(Number(source.updatedAt) || 0)),
  };
};

export const applyRound = ({ player, winner, name, currentDay, now }) => {
  const current = normalizePlayer(player, currentDay);
  if (current.dailyUsed >= DAILY_CREDITS) return null;

  const plays = current.plays + 1;
  const wins = current.wins + (winner === 'player' ? 1 : 0);
  return {
    ...current,
    name: sanitizeName(name) || current.name,
    plays,
    wins,
    winRate: wins / plays,
    dailyUsed: current.dailyUsed + 1,
    updatedAt: now,
  };
};

export const publicPlayer = (value, currentDay, fallbackName = 'visitor') => {
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
    .map(([id, value]) => ({ id, ...publicPlayer(value, currentDay) }))
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
