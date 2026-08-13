import assert from 'node:assert/strict';
import test from 'node:test';
import {
  allSequences,
  bestResponse,
  formatOdds,
  mnemonicResponse,
  optimalResponses,
  winProbability,
} from '../../services/penneyGame.ts';

test('allSequences returns every stable binary sequence', () => {
  assert.deepEqual(allSequences(2), ['TT', 'TH', 'HT', 'HH']);
  assert.equal(allSequences(4).length, 16);
});

test('opposing win probabilities are complementary', () => {
  for (const first of allSequences(3)) {
    for (const second of allSequences(3)) {
      assert.ok(Math.abs(winProbability(first, second) + winProbability(second, first) - 1) < 1e-12);
    }
  }
});

test('the classic three-flip mnemonic is always an optimal response', () => {
  for (const opponent of allSequences(3)) {
    assert.ok(optimalResponses(opponent).includes(mnemonicResponse(opponent)), opponent);
  }
});

test('THH beats HHH with the documented seven-to-one edge', () => {
  const response = bestResponse('HHH');
  assert.equal(response.sequence, 'THH');
  assert.equal(response.probability, 0.875);
  assert.equal(formatOdds(response.probability), '7 : 1');
});
