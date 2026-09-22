import assert from 'node:assert/strict';
import test from 'node:test';
import {
  DAILY_CREDITS,
  DEFAULT_NAMES,
  applyRound,
  buildLeaderboard,
  dayKey,
  defaultNameFor,
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

test('default board names come from the everyday name pool and replace legacy visitor aliases', () => {
  assert.equal(DEFAULT_NAMES.length, 39);
  assert.equal(new Set(DEFAULT_NAMES).size, DEFAULT_NAMES.length);
  const id = 'a1b2c3d4e5f6';
  assert.equal(defaultNameFor(id), defaultNameFor(id));
  assert.ok(DEFAULT_NAMES.includes(defaultNameFor(id)));

  const day = '2026-09-22';
  assert.equal(publicPlayer({ name: 'visitor-a1b2', plays: 3 }, day, 'Ben').name, 'Ben');
  assert.equal(publicPlayer({ name: 'visitor', plays: 3 }, day, 'Ben').name, 'Ben');
  assert.equal(publicPlayer({ name: 'Mei', plays: 3 }, day, 'Ben').name, 'Mei');

  const board = buildLeaderboard({ [id]: { name: 'visitor-a1b2', plays: 10, wins: 5, day } }, day);
  assert.equal(board[0].name, defaultNameFor(id));
});

test('hidden players stay off the public board, even after they play again', () => {
  const day = '2026-09-22';
  const hidden = { name: 'x', plays: 20, wins: 15, day, hidden: true };
  const board = buildLeaderboard({ a: hidden, b: { name: 'y', plays: 10, wins: 1, day } }, day);
  assert.deepEqual(board.map((entry) => entry.name), ['y']);

  const next = applyRound({ player: hidden, winner: 'player', name: 'x', currentDay: day, now: 1 });
  assert.equal(next?.hidden, true);
  assert.equal(applyRound({ player: { plays: 1, day }, winner: 'house', name: 'z', currentDay: day, now: 1 })?.hidden, undefined);
});
