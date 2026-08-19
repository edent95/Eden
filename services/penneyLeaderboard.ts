/**
 * Penney's Game — global leaderboard.
 *
 * Talks to Firebase Realtime Database over its REST interface instead of the
 * Firebase SDK, so this static site adds zero npm dependencies and zero bundle
 * weight for a feature that only one route uses.
 *
 *   sign-in   POST identitytoolkit.googleapis.com/v1/accounts:signUp
 *   refresh   POST securetoken.googleapis.com/v1/token
 *   write     PUT  {databaseURL}/penneyLeaderboard/{uid}.json?auth={idToken}
 *   read      GET  {databaseURL}/penneyLeaderboard.json?orderBy="score"&limitToLast=N
 *
 * Reads are public; writes require an anonymous identity so one browser owns
 * exactly one row. Every failure path degrades to a local-only board — the game
 * never blocks on the network.
 *
 * Required database rules live in docs/penney-leaderboard.md.
 */

const FIREBASE_API_KEY =
  (import.meta.env.VITE_PENNEY_FIREBASE_API_KEY as string | undefined) ??
  'AIzaSyDaD7G0Wg1rTzFrYdWoy-1a951XwQEg8ck';

const FIREBASE_DATABASE_URL = (
  (import.meta.env.VITE_PENNEY_FIREBASE_DATABASE_URL as string | undefined) ??
  'https://eden-tan-default-rtdb.asia-southeast1.firebasedatabase.app'
).replace(/\/$/, '');

const LEADERBOARD_NODE = 'penneyLeaderboard';
const IDENTITY_KEY = 'eden.penney.identity.v1';
const LOCAL_BOARD_KEY = 'eden.penney.localboard.v1';
const REQUEST_TIMEOUT_MS = 8000;

export const LEADERBOARD_SIZE = 20;
export const MAX_NAME_LENGTH = 16;

export type LeaderboardEntry = {
  uid: string;
  name: string;
  score: number;
  streak: number;
  createdAt: number;
};

export type LeaderboardSource = 'global' | 'local';

export type LeaderboardResult = {
  entries: LeaderboardEntry[];
  source: LeaderboardSource;
  /** Present when the global board could not be reached. */
  error?: string;
};

type StoredIdentity = { uid: string; refreshToken: string };

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

const withTimeout = async (input: string, init?: RequestInit): Promise<Response> => {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    window.clearTimeout(timer);
  }
};

const readJson = <T,>(key: string): T | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};

const writeJson = (key: string, value: unknown): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode or quota — non-fatal */
  }
};

export const sanitizeName = (raw: string): string => {
  const trimmed = raw.replace(/[\u0000-\u001f\u007f]/g, '').trim();
  return trimmed.slice(0, MAX_NAME_LENGTH);
};

export const isLeaderboardConfigured = (): boolean =>
  Boolean(FIREBASE_API_KEY) && Boolean(FIREBASE_DATABASE_URL);

/* ------------------------------------------------------------------ */
/* Anonymous identity                                                  */
/* ------------------------------------------------------------------ */

const signUpAnonymously = async (): Promise<{ uid: string; idToken: string; refreshToken: string }> => {
  const response = await withTimeout(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ returnSecureToken: true }),
    },
  );
  if (!response.ok) throw new Error(`anonymous sign-in failed (${response.status})`);
  const payload = (await response.json()) as { localId: string; idToken: string; refreshToken: string };
  return { uid: payload.localId, idToken: payload.idToken, refreshToken: payload.refreshToken };
};

const exchangeRefreshToken = async (refreshToken: string): Promise<{ uid: string; idToken: string }> => {
  const response = await withTimeout(`https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=refresh_token&refresh_token=${encodeURIComponent(refreshToken)}`,
  });
  if (!response.ok) throw new Error(`token refresh failed (${response.status})`);
  const payload = (await response.json()) as { user_id: string; id_token: string };
  return { uid: payload.user_id, idToken: payload.id_token };
};

/** Reuse the stored anonymous identity so one browser keeps one leaderboard row. */
const getIdentity = async (): Promise<{ uid: string; idToken: string }> => {
  const stored = readJson<StoredIdentity>(IDENTITY_KEY);
  if (stored?.refreshToken) {
    try {
      const refreshed = await exchangeRefreshToken(stored.refreshToken);
      return refreshed;
    } catch {
      /* fall through and mint a new identity */
    }
  }
  const created = await signUpAnonymously();
  writeJson(IDENTITY_KEY, { uid: created.uid, refreshToken: created.refreshToken });
  return { uid: created.uid, idToken: created.idToken };
};

export const getStoredUid = (): string | null => readJson<StoredIdentity>(IDENTITY_KEY)?.uid ?? null;

/* ------------------------------------------------------------------ */
/* Local fallback board                                                */
/* ------------------------------------------------------------------ */

const readLocalBoard = (): LeaderboardEntry[] => readJson<LeaderboardEntry[]>(LOCAL_BOARD_KEY) ?? [];

const writeLocalBoard = (entry: LeaderboardEntry): LeaderboardEntry[] => {
  const existing = readLocalBoard().filter((item) => item.uid !== entry.uid);
  const next = [...existing, entry].sort((a, b) => b.score - a.score).slice(0, LEADERBOARD_SIZE);
  writeJson(LOCAL_BOARD_KEY, next);
  return next;
};

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

export const fetchLeaderboard = async (): Promise<LeaderboardResult> => {
  if (!isLeaderboardConfigured()) {
    return { entries: readLocalBoard(), source: 'local', error: 'not-configured' };
  }
  try {
    const url =
      `${FIREBASE_DATABASE_URL}/${LEADERBOARD_NODE}.json` +
      `?orderBy=${encodeURIComponent('"score"')}&limitToLast=${LEADERBOARD_SIZE}`;
    const response = await withTimeout(url);
    if (!response.ok) throw new Error(`leaderboard read failed (${response.status})`);
    const payload = (await response.json()) as Record<string, Omit<LeaderboardEntry, 'uid'>> | null;
    if (!payload) return { entries: [], source: 'global' };
    const entries = Object.entries(payload)
      .map(([uid, value]) => ({
        uid,
        name: typeof value?.name === 'string' ? value.name : 'anon',
        score: Number(value?.score) || 0,
        streak: Number(value?.streak) || 0,
        createdAt: Number(value?.createdAt) || 0,
      }))
      .sort((a, b) => b.score - a.score || a.createdAt - b.createdAt);
    return { entries, source: 'global' };
  } catch (error) {
    return {
      entries: readLocalBoard(),
      source: 'local',
      error: error instanceof Error ? error.message : 'unknown error',
    };
  }
};

/**
 * Publish a run. The database rules only accept a strictly higher score than the
 * row already stored, so replaying a worse run never overwrites a better one.
 */
export const submitScore = async (input: {
  name: string;
  score: number;
  streak: number;
}): Promise<LeaderboardResult> => {
  const entryBase = {
    name: sanitizeName(input.name) || 'anon',
    score: Math.max(0, Math.floor(input.score)),
    streak: Math.max(0, Math.floor(input.streak)),
    createdAt: Date.now(),
  };

  if (!isLeaderboardConfigured()) {
    const uid = getStoredUid() ?? 'local';
    return { entries: writeLocalBoard({ uid, ...entryBase }), source: 'local', error: 'not-configured' };
  }

  try {
    const { uid, idToken } = await getIdentity();
    const response = await withTimeout(
      `${FIREBASE_DATABASE_URL}/${LEADERBOARD_NODE}/${uid}.json?auth=${encodeURIComponent(idToken)}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entryBase),
      },
    );
    // A rejected write means the stored score is already higher — that is a
    // valid outcome, not an error. Refresh the board either way.
    if (!response.ok && response.status !== 401 && response.status !== 403) {
      throw new Error(`leaderboard write failed (${response.status})`);
    }
    writeLocalBoard({ uid, ...entryBase });
    return await fetchLeaderboard();
  } catch (error) {
    const uid = getStoredUid() ?? 'local';
    return {
      entries: writeLocalBoard({ uid, ...entryBase }),
      source: 'local',
      error: error instanceof Error ? error.message : 'unknown error',
    };
  }
};
