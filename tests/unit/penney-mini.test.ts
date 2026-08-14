import assert from 'node:assert/strict';
import test from 'node:test';
import {
  DAILY_CREDITS,
  applyRound,
  buildLeaderboard,
  dayKey,
  houseResponse,
  publicPlayer,
  resolveRound,
} from '../../functions/penney-mini-core.js';

test('mini arena uses the Malaysia calendar day for credit resets', () => {
  assert.equal(dayKey(new Date('2026-08-14T15:59:59Z')), '2026-08-14');
  assert.equal(dayKey(new Date('2026-08-14T16:00:00Z')), '2026-08-15');
});

test('house ticket and round outcome are generated away from the browser', () => {
  assert.equal(houseResponse('HHH'), 'THH');
  const faces = [...'THH'];
  const round = resolveRound('HHH', () => faces.shift() as 'H' | 'T');
  assert.equal(round.houseSequence, 'THH');
  assert.equal(round.winner, 'house');
  assert.deepEqual(round.flips, ['T', 'H', 'H']);
});

test('one IP receives exactly 100 committed rounds per Malaysia day', () => {
  const currentDay = '2026-08-14';
  const almostSpent = {
    name: 'Eden',
    plays: 99,
    wins: 50,
    winRate: 50 / 99,
    day: currentDay,
    dailyUsed: 99,
    updatedAt: 1,
  };
  const finalRound = applyRound({
    player: almostSpent,
    winner: 'player',
    name: 'Eden',
    currentDay,
    now: 2,
  });
  assert.equal(finalRound?.dailyUsed, DAILY_CREDITS);
  assert.equal(applyRound({ player: finalRound, winner: 'house', name: 'Eden', currentDay, now: 3 }), null);
  assert.equal(publicPlayer(finalRound, currentDay).credits, 0);
  assert.equal(publicPlayer(finalRound, '2026-08-15').credits, DAILY_CREDITS);
});

test('leaderboard requires ten plays and ranks by win rate', () => {
  const board = buildLeaderboard(
    {
      shortRun: { name: 'One shot', plays: 1, wins: 1 },
      steady: { name: 'Steady', plays: 10, wins: 6 },
      finder: { name: 'Finder', plays: 20, wins: 13 },
    },
    '2026-08-14',
    'finder',
  );
  assert.deepEqual(board.map((entry) => entry.name), ['Finder', 'Steady']);
  assert.equal(board[0]?.isYou, true);
});
