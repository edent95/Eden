import type { Face, Sequence } from './penneyGame';

const MINI_API_URL = (
  (import.meta.env.VITE_PENNEY_MINI_API_URL as string | undefined) ??
  'https://asia-southeast1-poker-power-card-3abea.cloudfunctions.net/penneyMiniApi'
).replace(/\/$/, '');

const REQUEST_TIMEOUT_MS = 10_000;

export type MiniPlayer = {
  name: string;
  plays: number;
  wins: number;
  winRate: number;
  credits: number;
  dailyLimit: number;
  ranked: boolean;
};

export type MiniLeaderboardEntry = {
  rank: number;
  name: string;
  plays: number;
  wins: number;
  winRate: number;
  isYou: boolean;
};

export type MiniRound = {
  playerSequence: Sequence;
  houseSequence: Sequence;
  flips: Face[];
  winner: 'player' | 'house';
};

export type MiniArenaState = {
  player: MiniPlayer;
  leaderboard: MiniLeaderboardEntry[];
  resetsAt?: string;
};

export type MiniPlayResult = MiniArenaState & {
  round: MiniRound;
};

export class MiniArenaError extends Error {
  readonly status: number;
  readonly state?: MiniArenaState;

  constructor(message: string, status: number, state?: MiniArenaState) {
    super(message);
    this.name = 'MiniArenaError';
    this.status = status;
    this.state = state;
  }
}

const request = async <T,>(init?: RequestInit): Promise<T> => {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(MINI_API_URL, {
      ...init,
      headers: init?.body ? { 'Content-Type': 'application/json', ...init.headers } : init?.headers,
      signal: controller.signal,
    });
    const payload = (await response.json().catch(() => null)) as (T & Partial<MiniArenaState> & { error?: string }) | null;
    if (!response.ok || !payload) {
      const state = payload?.player && payload?.leaderboard
        ? { player: payload.player, leaderboard: payload.leaderboard }
        : undefined;
      throw new MiniArenaError(payload?.error ?? `request-failed-${response.status}`, response.status, state);
    }
    return payload;
  } finally {
    window.clearTimeout(timeout);
  }
};

export const fetchMiniArena = (): Promise<MiniArenaState> => request<MiniArenaState>();

export const playMiniRound = (input: { sequence: Sequence; name: string }): Promise<MiniPlayResult> =>
  request<MiniPlayResult>({
    method: 'POST',
    body: JSON.stringify(input),
  });
