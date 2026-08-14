import { createHmac, randomInt } from 'node:crypto';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { defineSecret } from 'firebase-functions/params';
import { onRequest } from 'firebase-functions/v2/https';
import {
  DAILY_CREDITS,
  applyRound,
  buildLeaderboard,
  dayKey,
  isSequence,
  publicPlayer,
  resolveRound,
  sanitizeName,
} from './penney-mini-core.js';

if (getApps().length === 0) {
  initializeApp({
    databaseURL: 'https://poker-power-card-3abea-default-rtdb.asia-southeast1.firebasedatabase.app',
  });
}

const ipSalt = defineSecret('PENNEY_IP_SALT');
const PLAYERS_NODE = 'penneyMiniPlayers';
const allowedOrigins = [
  'https://edentan.site',
  'https://www.edentan.site',
  /^http:\/\/(localhost|127\.0\.0\.1):4180$/,
];

const readClientIp = (request) => {
  const forwarded = request.headers['x-forwarded-for'];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  const firstForwarded = typeof raw === 'string' ? raw.split(',')[0]?.trim() : '';
  return firstForwarded || request.ip || request.socket?.remoteAddress || 'unknown';
};

const playerIdFor = (request) =>
  createHmac('sha256', ipSalt.value()).update(readClientIp(request)).digest('hex');

const fallbackNameFor = (playerId) => `visitor-${playerId.slice(0, 4)}`;

const readBoard = async (currentDay, currentPlayerId) => {
  const snapshot = await getDatabase().ref(PLAYERS_NODE).get();
  return buildLeaderboard(snapshot.val(), currentDay, currentPlayerId);
};

export const penneyMiniApi = onRequest(
  {
    region: 'asia-southeast1',
    cors: allowedOrigins,
    secrets: [ipSalt],
    timeoutSeconds: 15,
    memory: '256MiB',
    maxInstances: 10,
  },
  async (request, response) => {
    response.set('Cache-Control', 'no-store');

    if (request.method !== 'GET' && request.method !== 'POST') {
      response.set('Allow', 'GET, POST').status(405).json({ error: 'method-not-allowed' });
      return;
    }

    try {
      const currentDay = dayKey();
      const playerId = playerIdFor(request);
      const playerRef = getDatabase().ref(`${PLAYERS_NODE}/${playerId}`);
      const fallbackName = fallbackNameFor(playerId);

      if (request.method === 'GET') {
        const [playerSnapshot, leaderboard] = await Promise.all([
          playerRef.get(),
          readBoard(currentDay, playerId),
        ]);
        response.status(200).json({
          player: publicPlayer(playerSnapshot.val(), currentDay, fallbackName),
          leaderboard,
          resetsAt: '00:00 Asia/Kuala_Lumpur',
        });
        return;
      }

      const sequence = request.body?.sequence;
      const name = sanitizeName(request.body?.name);
      if (!isSequence(sequence)) {
        response.status(400).json({ error: 'invalid-sequence' });
        return;
      }

      const round = resolveRound(sequence, () => (randomInt(0, 2) === 0 ? 'H' : 'T'));
      const now = Date.now();
      const transaction = await playerRef.transaction(
        (current) => applyRound({
          player: current,
          winner: round.winner,
          name: name || fallbackName,
          currentDay,
          now,
        }),
        undefined,
        false,
      );

      if (!transaction.committed) {
        const [playerSnapshot, leaderboard] = await Promise.all([
          playerRef.get(),
          readBoard(currentDay, playerId),
        ]);
        response.status(429).json({
          error: 'daily-limit-reached',
          player: publicPlayer(playerSnapshot.val(), currentDay, fallbackName),
          leaderboard,
        });
        return;
      }

      const leaderboard = await readBoard(currentDay, playerId);
      response.status(200).json({
        round,
        player: publicPlayer(transaction.snapshot.val(), currentDay, fallbackName),
        leaderboard,
      });
    } catch (error) {
      console.error('penney mini api failed', error);
      response.status(500).json({ error: 'server-error', dailyLimit: DAILY_CREDITS });
    }
  },
);
