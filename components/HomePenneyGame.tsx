/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Home page inline Penney's Game.
 *
 * A deliberately small slice of /penneys-game: 3-flip sequences, you always
 * pick first, and the dealer always answers with the optimal counter. That is
 * the whole point of the section — the game looks fair, and it is not.
 *
 * All probability and round logic is reused from services/penneyGame.ts; this
 * component owns presentation only. It intentionally does NOT touch the
 * localStorage save used by the full page, so playing here cannot corrupt a
 * campaign run.
 */

import React from 'react';
import {
  allSequences,
  bestResponse,
  formatOdds,
  resolveRound,
  winProbability,
  type Face,
  type Sequence,
} from '../services/penneyGame';

export type HomePenneyGameProps = {
  isZh: boolean;
  /** Link to the full /penneys-game route. */
  penneyHref: string;
};

type Phase = 'picking' | 'answering' | 'flipping' | 'resolved';

const MINI_LENGTH = 3;
const FLIP_INTERVAL_MS = 150;
const ANSWER_DELAY_MS = 560;
const MINI_SEQUENCES = allSequences(MINI_LENGTH);

/** Matches the reduced-motion contract used by the rest of the site. */
const useReducedMotion = (): boolean => {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reduced;
};

const HomePenneyGame: React.FC<HomePenneyGameProps> = ({ isZh, penneyHref }) => {
  const t = React.useCallback((en: string, zh: string) => (isZh ? zh : en), [isZh]);
  const reducedMotion = useReducedMotion();

  const [phase, setPhase] = React.useState<Phase>('picking');
  const [playerSequence, setPlayerSequence] = React.useState<Sequence | null>(null);
  const [cpuSequence, setCpuSequence] = React.useState<Sequence | null>(null);
  const [flips, setFlips] = React.useState<Face[]>([]);
  const [revealed, setRevealed] = React.useState(0);
  const [winner, setWinner] = React.useState<'player' | 'cpu' | null>(null);
  const [tally, setTally] = React.useState({ player: 0, cpu: 0 });

  /* The dealer takes a beat before answering, so the counter reads as a
     deliberate response to your pick rather than a simultaneous reveal. */
  React.useEffect(() => {
    if (phase !== 'answering' || !playerSequence) return undefined;

    const id = window.setTimeout(
      () => {
        const counter = bestResponse(playerSequence).sequence;
        const round = resolveRound(playerSequence, counter);
        setCpuSequence(counter);
        setFlips(round.flips);
        setWinner(round.winner);
        setRevealed(0);
        setPhase('flipping');
      },
      reducedMotion ? 0 : ANSWER_DELAY_MS,
    );

    return () => window.clearTimeout(id);
  }, [phase, playerSequence, reducedMotion]);

  /* Coins land one at a time. Reduced motion drops straight to the outcome. */
  React.useEffect(() => {
    if (phase !== 'flipping') return undefined;

    if (revealed >= flips.length) {
      setPhase('resolved');
      setTally((prev) =>
        winner === 'player'
          ? { ...prev, player: prev.player + 1 }
          : { ...prev, cpu: prev.cpu + 1 },
      );
      return undefined;
    }

    if (reducedMotion) {
      setRevealed(flips.length);
      return undefined;
    }

    const id = window.setTimeout(() => setRevealed((count) => count + 1), FLIP_INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [phase, revealed, flips.length, winner, reducedMotion]);

  const pick = (sequence: Sequence) => {
    if (phase === 'answering' || phase === 'flipping') return;
    setPlayerSequence(sequence);
    setCpuSequence(null);
    setFlips([]);
    setRevealed(0);
    setWinner(null);
    setPhase('answering');
  };

  const reset = () => {
    setPhase('picking');
    setPlayerSequence(null);
    setCpuSequence(null);
    setFlips([]);
    setRevealed(0);
    setWinner(null);
  };

  const faceLabel = (face: Face) => (isZh ? (face === 'H' ? '正' : '反') : face);

  const Coin: React.FC<{ face: Face; size?: 'sm' | 'md'; tone?: 'player' | 'cpu' | null }> = ({
    face,
    size = 'md',
    tone = null,
  }) => (
    <span
      className={[
        'penney-coin',
        face === 'H' ? 'is-heads' : 'is-tails',
        size === 'sm' ? 'is-small' : '',
        tone ? `is-window-${tone}` : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
    >
      <span className="penney-coin-face">{faceLabel(face)}</span>
    </span>
  );

  const Sequence3: React.FC<{ sequence: Sequence | null; size?: 'sm' | 'md' }> = ({
    sequence,
    size = 'sm',
  }) => (
    <span className="penney-sequence" role="img" aria-label={sequence ?? ''}>
      {sequence
        ? [...sequence].map((face, index) => (
            <Coin key={`${sequence}-${index}`} face={face as Face} size={size} />
          ))
        : null}
    </span>
  );

  const visibleFlips = flips.slice(0, revealed);
  const dealerEdge = playerSequence && cpuSequence ? winProbability(cpuSequence, playerSequence) : null;
  const windowStart = phase === 'resolved' ? visibleFlips.length - MINI_LENGTH : -1;
  const totalRounds = tally.player + tally.cpu;

  const statusLine = () => {
    if (phase === 'picking' && !playerSequence) {
      return t('Pick any three flips. You go first.', '随便选三个翻面。你先选。');
    }
    if (phase === 'answering') return t('The dealer is answering your pick…', '庄家正在针对你的选择出牌…');
    if (phase === 'flipping') return t('Flipping until one sequence shows up…', '一直翻，直到某个序列先出现…');
    if (phase === 'resolved') {
      return winner === 'player'
        ? t('You won this one — the edge is not a guarantee.', '这局你赢了 —— 优势不等于必胜。')
        : t('The dealer takes it. Again.', '庄家拿下。又一次。');
    }
    return '';
  };

  return (
    <section className="eden-penney eden-home-island" id="penney">
      <div className="eden-penney-copy">
        <p className="eden-section-label">{t("Interactive · Penney's Game", "互动 · Penney's Game")}</p>
        <h2 className={isZh ? 'is-zh' : undefined}>
          {isZh ? <>你先选，<br />你就已经输了。</> : <>You pick first.<br />You already lost.</>}
        </h2>
        <div className="eden-penney-body">
          <p>
            {t(
              'Every three-flip sequence is equally likely to show up on its own. That is exactly why this looks fair.',
              '每个三位序列单独出现的概率完全一样 —— 这就是它看起来公平的原因。',
            )}
          </p>
          <p>
            {t(
              'But the game is not about your sequence. It is about the one that answers it. Pick, and watch the dealer take the edge in front of you.',
              '但这局比的不是你的序列，而是回应你的那一个。选一个，看着庄家当面把优势拿走。',
            )}
          </p>
          <p className="eden-penney-thesis">
            <strong>
              {t(
                'Once you can see the system, you can pick the other side.',
                '一旦看见这个系统，你就可以站到另一边。',
              )}
            </strong>
          </p>
        </div>
        <a className="eden-text-link" href={penneyHref}>
          {t('Play the full five-level run', '玩完整的五关版本')} <span>→</span>
        </a>
      </div>

      <div className="eden-penney-board">
        <div className="eden-penney-slots">
          <div className="eden-penney-slot">
            <p className="eden-penney-slot-label">{t('You', '你')}</p>
            {playerSequence ? (
              <Sequence3 sequence={playerSequence} />
            ) : (
              <span className="eden-penney-slot-empty">{t('pick below', '在下面选')}</span>
            )}
          </div>
          <div className="eden-penney-slot">
            <p className="eden-penney-slot-label">{t('Dealer', '庄家')}</p>
            {cpuSequence ? (
              <Sequence3 sequence={cpuSequence} />
            ) : (
              <span className="eden-penney-slot-empty">
                {phase === 'answering' ? t('answering…', '出牌中…') : t('waits for you', '等你先出')}
              </span>
            )}
          </div>
        </div>

        {dealerEdge !== null ? (
          <p className="eden-penney-odds">
            {t('Dealer odds', '庄家胜率')}{' '}
            <strong>{Math.round(dealerEdge * 100)}%</strong>
            <span className="eden-penney-odds-ratio">{formatOdds(dealerEdge)}</span>
          </p>
        ) : null}

        <div className="eden-penney-stream" aria-live="polite">
          {visibleFlips.length > 0 ? (
            visibleFlips.map((face, index) => (
              <Coin
                key={`flip-${index}`}
                face={face}
                size="sm"
                tone={
                  windowStart >= 0 && index >= windowStart
                    ? winner === 'player'
                      ? 'player'
                      : 'cpu'
                    : null
                }
              />
            ))
          ) : (
            <span className="eden-penney-stream-empty">
              {t('the coin has not been flipped yet', '硬币还没开始翻')}
            </span>
          )}
        </div>

        <p className="eden-penney-status">{statusLine()}</p>

        {phase === 'picking' ? (
          <div className="eden-penney-picker" role="group" aria-label={t('Pick your sequence', '选择你的序列')}>
            {MINI_SEQUENCES.map((sequence) => (
              <button
                key={sequence}
                type="button"
                className="eden-penney-pick"
                onClick={() => pick(sequence)}
              >
                <Sequence3 sequence={sequence} />
              </button>
            ))}
          </div>
        ) : (
          <div className="eden-penney-actions">
            <button
              type="button"
              className="eden-penney-again"
              onClick={reset}
              disabled={phase !== 'resolved'}
            >
              {t('Pick again', '再选一次')}
            </button>
          </div>
        )}

        {totalRounds > 0 ? (
          <p className="eden-penney-tally">
            {t('Running score', '累计比分')}{' '}
            <strong>
              {t('You', '你')} {tally.player} · {t('Dealer', '庄家')} {tally.cpu}
            </strong>
          </p>
        ) : null}
      </div>
    </section>
  );
};

export default HomePenneyGame;
