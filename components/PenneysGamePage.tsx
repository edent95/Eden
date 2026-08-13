/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, ArrowRight, Lock, Check, Timer, Trophy, RotateCcw } from 'lucide-react';
import {
  BAILOUT_CHIPS,
  LAB_UNLOCK_LEVEL,
  PENNEY_LEVELS,
  RANKED_UNLOCK_LEVEL,
  START_CHIPS,
  allSequences,
  bestResponse,
  emptySave,
  flipCoin,
  formatOdds,
  highestUnlockedLevel,
  isLevelUnlocked,
  levelById,
  loadSave,
  mnemonicResponse,
  optimalResponses,
  persistSave,
  randomSequence,
  rankedMilestoneBonus,
  rankedQuestionScore,
  rankedSeconds,
  simulate,
  winProbability,
  type Face,
  type PenneyLevelId,
  type PenneyMode,
  type PenneySave,
  type Sequence,
} from '../services/penneyGame';
import {
  MAX_NAME_LENGTH,
  fetchLeaderboard,
  submitScore,
  type LeaderboardResult,
} from '../services/penneyLeaderboard';
import { PenneyCoinCssIcon } from './css-art/index';

type RoundPhase = 'picking' | 'flipping' | 'resolved';

export type PenneysGamePageProps = {
  isZh: boolean;
  /** Theme + language toggles rendered on the right of the top bar. */
  controls: React.ReactNode;
  homeHref: string;
  conwayHref: string;
};

const FLIP_INTERVAL_MS = 150;
const BET_STEPS = [10, 25, 50];

const PenneysGamePage: React.FC<PenneysGamePageProps> = ({ isZh, controls, homeHref, conwayHref }) => {
  const t = React.useCallback((en: string, zh: string) => (isZh ? zh : en), [isZh]);

  /* ---------------------------------------------------------------- */
  /* Save file                                                         */
  /* ---------------------------------------------------------------- */

  const [save, setSave] = React.useState<PenneySave>(() => emptySave());
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    const stored = loadSave();
    setSave(stored);
    setActiveLevelId(highestUnlockedLevel(stored.clearedLevels));
    setNameDraft(stored.playerName);
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    persistSave(save);
  }, [hydrated, save]);

  /* ---------------------------------------------------------------- */
  /* Mode + campaign state                                             */
  /* ---------------------------------------------------------------- */

  const [mode, setMode] = React.useState<PenneyMode>('campaign');
  const [activeLevelId, setActiveLevelId] = React.useState<PenneyLevelId>(1);
  const level = levelById(activeLevelId);

  const [roundLength, setRoundLength] = React.useState<number>(3);
  const [cpuSequence, setCpuSequence] = React.useState<Sequence | null>(null);
  const [playerSequence, setPlayerSequence] = React.useState<Sequence | null>(null);
  const [flips, setFlips] = React.useState<Face[]>([]);
  const [phase, setPhase] = React.useState<RoundPhase>('picking');
  const [roundWinner, setRoundWinner] = React.useState<'player' | 'cpu' | null>(null);
  const [pickWasOptimal, setPickWasOptimal] = React.useState<boolean | null>(null);
  const [bet, setBet] = React.useState(25);
  const [progress, setProgress] = React.useState({ wins: 0, rounds: 0, streak: 0 });
  const [levelCleared, setLevelCleared] = React.useState(false);
  const [bailedOut, setBailedOut] = React.useState(false);
  /** Frozen at settle time so a late interval tick cannot shift the winning window. */
  const [roundFlipCount, setRoundFlipCount] = React.useState<number | null>(null);

  const resolvedLength = level.length === 'mixed' ? roundLength : level.length;

  /** Start a fresh round inside the current level. */
  const beginRound = React.useCallback(
    (levelId: PenneyLevelId) => {
      const nextLevel = levelById(levelId);
      const length = nextLevel.length === 'mixed' ? (Math.random() < 0.5 ? 3 : 4) : nextLevel.length;
      setRoundLength(length);
      setFlips([]);
      setRoundFlipCount(null);
      setPlayerSequence(null);
      setRoundWinner(null);
      setPickWasOptimal(null);
      setBailedOut(false);
      setPhase('picking');
      setCpuSequence(nextLevel.order === 'cpu-first' ? randomSequence(length) : null);
    },
    [],
  );

  /** Enter a level from the rail — resets its progress. */
  const openLevel = React.useCallback(
    (levelId: PenneyLevelId) => {
      setActiveLevelId(levelId);
      setProgress({ wins: 0, rounds: 0, streak: 0 });
      setLevelCleared(false);
      beginRound(levelId);
    },
    [beginRound],
  );

  React.useEffect(() => {
    if (!hydrated) return;
    beginRound(highestUnlockedLevel(save.clearedLevels));
    // Only on first hydration: the rail handles every later level change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  /** Settle a finished round: chips, level progress, unlock check. */
  const settleRound = React.useCallback(
    (winner: 'player' | 'cpu', wasOptimal: boolean | null, flipCount: number) => {
      const stake = level.betting ? Math.min(bet, Math.max(0, save.chips)) : 0;

      const rounds = progress.rounds + 1;
      const wins = progress.wins + (winner === 'player' ? 1 : 0);
      let streak = progress.streak;
      if (level.objective === 'streak') {
        streak = wasOptimal ? streak + 1 : 0;
      } else if (level.objective === 'perfect') {
        // Cumulative, not a streak: level 5 asks for five clean wins, not five in a row.
        streak = wasOptimal && winner === 'player' ? streak + 1 : streak;
      }

      const cleared =
        (level.objective === 'wins' && wins >= level.target) ||
        (level.objective === 'rounds' && rounds >= level.target) ||
        (level.objective === 'streak' && streak >= level.target) ||
        (level.objective === 'perfect' && streak >= level.target);

      let chips = save.chips + (winner === 'player' ? stake : -stake);
      let bailouts = save.bailouts;
      let bailout = false;
      if (chips <= 0) {
        chips = BAILOUT_CHIPS;
        bailouts += 1;
        bailout = true;
      }

      const firstClear = cleared && !save.clearedLevels.includes(level.id);
      if (firstClear) chips += level.reward;

      setSave({
        ...save,
        chips,
        bailouts,
        roundsPlayed: save.roundsPlayed + 1,
        roundsWon: save.roundsWon + (winner === 'player' ? 1 : 0),
        clearedLevels: firstClear ? [...save.clearedLevels, level.id] : save.clearedLevels,
      });
      setProgress({ wins, rounds, streak });
      setBailedOut(bailout);
      setRoundFlipCount(flipCount);
      setRoundWinner(winner);
      setPhase('resolved');
      if (cleared) setLevelCleared(true);
    },
    [bet, level, progress, save],
  );

  /* One coin per tick while a round is live. */
  React.useEffect(() => {
    if (phase !== 'flipping') return undefined;
    const intervalId = window.setInterval(() => {
      setFlips((current) => [...current, flipCoin()]);
    }, FLIP_INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, [phase]);

  /* Watch the stream for a completed sequence. */
  React.useEffect(() => {
    if (phase !== 'flipping' || !playerSequence || !cpuSequence) return;
    if (flips.length < resolvedLength) return;
    const tail = flips.slice(-resolvedLength).join('');
    if (tail === playerSequence) settleRound('player', pickWasOptimal, flips.length);
    else if (tail === cpuSequence) settleRound('cpu', pickWasOptimal, flips.length);
  }, [flips, phase, playerSequence, cpuSequence, resolvedLength, pickWasOptimal, settleRound]);

  const choosePlayerSequence = (sequence: Sequence) => {
    if (phase !== 'picking') return;
    if (level.order === 'cpu-first') {
      if (!cpuSequence || sequence === cpuSequence) return;
      setPickWasOptimal(optimalResponses(cpuSequence).includes(sequence));
      setPlayerSequence(sequence);
    } else {
      const others = allSequences(resolvedLength).filter((item) => item !== sequence);
      const answer =
        level.brain === 'optimal'
          ? bestResponse(sequence).sequence
          : others[Math.floor(Math.random() * others.length)];
      setPlayerSequence(sequence);
      setCpuSequence(answer);
      setPickWasOptimal(null);
    }
    setFlips([]);
    setRoundFlipCount(null);
    setPhase('flipping');
  };

  /* ---------------------------------------------------------------- */
  /* Ranked mode — Blind Master                                        */
  /* ---------------------------------------------------------------- */

  type RankedState = {
    status: 'idle' | 'live' | 'over';
    questionIndex: number;
    target: Sequence;
    secondsLeft: number;
    score: number;
    streak: number;
    lastAnswer: { chosen: Sequence; best: Sequence; correct: boolean } | null;
    endedBy: 'timeout' | 'wrong' | null;
  };

  const [ranked, setRanked] = React.useState<RankedState>({
    status: 'idle',
    questionIndex: 0,
    target: 'HHT',
    secondsLeft: 0,
    score: 0,
    streak: 0,
    lastAnswer: null,
    endedBy: null,
  });

  const [board, setBoard] = React.useState<LeaderboardResult>({ entries: [], source: 'local' });
  const [boardLoading, setBoardLoading] = React.useState(false);
  const [nameDraft, setNameDraft] = React.useState('');
  const [submitState, setSubmitState] = React.useState<'idle' | 'sending' | 'done'>('idle');

  const refreshBoard = React.useCallback(async () => {
    setBoardLoading(true);
    const result = await fetchLeaderboard();
    setBoard(result);
    setBoardLoading(false);
  }, []);

  React.useEffect(() => {
    if (mode !== 'ranked') return;
    void refreshBoard();
  }, [mode, refreshBoard]);

  const startRanked = () => {
    const length = Math.random() < 0.5 ? 3 : 4;
    setSubmitState('idle');
    setRanked({
      status: 'live',
      questionIndex: 0,
      target: randomSequence(length),
      secondsLeft: rankedSeconds(0),
      score: 0,
      streak: 0,
      lastAnswer: null,
      endedBy: null,
    });
  };

  /** Latest ranked state for the timer, which runs outside the render closure. */
  const rankedRef = React.useRef(ranked);
  React.useEffect(() => {
    rankedRef.current = ranked;
  }, [ranked]);

  const endRanked = React.useCallback((reason: 'timeout' | 'wrong', chosen: Sequence | null, snapshot: RankedState) => {
    const best = bestResponse(snapshot.target).sequence;
    setSave((currentSave) => ({
      ...currentSave,
      bestRankedScore: Math.max(currentSave.bestRankedScore, snapshot.score),
      bestRankedStreak: Math.max(currentSave.bestRankedStreak, snapshot.streak),
    }));
    setRanked({
      ...snapshot,
      status: 'over',
      endedBy: reason,
      lastAnswer: { chosen: chosen ?? '', best, correct: false },
    });
  }, []);

  React.useEffect(() => {
    if (ranked.status !== 'live') return undefined;
    const intervalId = window.setInterval(() => {
      const current = rankedRef.current;
      if (current.status !== 'live') return;
      const secondsLeft = Number((current.secondsLeft - 0.1).toFixed(1));
      if (secondsLeft <= 0) {
        endRanked('timeout', null, { ...current, secondsLeft: 0 });
        return;
      }
      setRanked({ ...current, secondsLeft });
    }, 100);
    return () => window.clearInterval(intervalId);
  }, [ranked.status, endRanked]);

  const answerRanked = (sequence: Sequence) => {
    if (ranked.status !== 'live') return;
    const correct = optimalResponses(ranked.target).includes(sequence);
    if (!correct) {
      endRanked('wrong', sequence, ranked);
      return;
    }
    setRanked((current) => {
      const streak = current.streak + 1;
      const gained = rankedQuestionScore(current.secondsLeft) + rankedMilestoneBonus(streak);
      const questionIndex = current.questionIndex + 1;
      const length = Math.random() < 0.5 ? 3 : 4;
      return {
        ...current,
        questionIndex,
        streak,
        score: current.score + gained,
        target: randomSequence(length),
        secondsLeft: rankedSeconds(questionIndex),
        lastAnswer: { chosen: sequence, best: sequence, correct: true },
      };
    });
  };

  const handleSubmitScore = async () => {
    setSubmitState('sending');
    const name = nameDraft.trim() || 'anon';
    setSave((current) => ({ ...current, playerName: name }));
    const result = await submitScore({ name, score: ranked.score, streak: ranked.streak });
    setBoard(result);
    setSubmitState('done');
  };

  /* ---------------------------------------------------------------- */
  /* Lab                                                               */
  /* ---------------------------------------------------------------- */

  const [labLength, setLabLength] = React.useState(3);
  const [labPlayer, setLabPlayer] = React.useState<Sequence>('HHT');
  const [labCpu, setLabCpu] = React.useState<Sequence>('THH');
  const [labResult, setLabResult] = React.useState<{
    rounds: number;
    wins: number;
    averageFlips: number;
  } | null>(null);
  const [labBusy, setLabBusy] = React.useState(false);

  const runSimulation = (rounds: number) => {
    setLabBusy(true);
    window.setTimeout(() => {
      setLabResult(simulate(labPlayer, labCpu, rounds));
      setLabBusy(false);
    }, 20);
  };

  React.useEffect(() => {
    const pool = allSequences(labLength);
    if (!pool.includes(labPlayer)) {
      const player = pool[0];
      setLabPlayer(player);
      setLabCpu(bestResponse(player).sequence);
      setLabResult(null);
    }
  }, [labLength, labPlayer]);

  /* ---------------------------------------------------------------- */
  /* Derived values                                                    */
  /* ---------------------------------------------------------------- */

  const clearedCount = save.clearedLevels.length;
  const rankedUnlocked = save.clearedLevels.includes(RANKED_UNLOCK_LEVEL);
  const labUnlocked = save.clearedLevels.includes(LAB_UNLOCK_LEVEL);
  const matchupProbability =
    playerSequence && cpuSequence ? winProbability(playerSequence, cpuSequence) : null;
  const affordableBets = BET_STEPS.filter((step) => step <= save.chips);
  const visibleFlips = roundFlipCount === null ? flips : flips.slice(0, roundFlipCount);
  const winningWindowStart = roundWinner ? visibleFlips.length - resolvedLength : -1;

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

  const SequenceChips: React.FC<{ sequence: Sequence | null; size?: 'sm' | 'md' }> = ({
    sequence,
    size = 'md',
  }) => (
    <span className="penney-sequence" role="img" aria-label={sequence ?? ''}>
      {sequence
        ? [...sequence].map((face, index) => (
            <Coin key={`${sequence}-${index}`} face={face as Face} size={size} />
          ))
        : null}
    </span>
  );

  const objectiveProgressText = () => {
    if (level.objective === 'wins') return `${progress.wins} / ${level.target}`;
    if (level.objective === 'rounds') return `${progress.rounds} / ${level.target}`;
    return `${progress.streak} / ${level.target}`;
  };

  /* ---------------------------------------------------------------- */
  /* Render                                                            */
  /* ---------------------------------------------------------------- */

  return (
    <div className="page-shell penney-page min-h-screen">
      <main className="penney-main">
        <div className="penney-shell">
          <div className="penney-topbar">
            <a href={homeHref} className="penney-back-link inline-flex items-center gap-2 text-sm font-medium">
              <ArrowLeft size={16} />
              {t('Back to Home', '返回主页')}
            </a>
            {controls}
          </div>

          <header className="penney-hero">
            <div className="penney-hero-identity">
              <span className="penney-hero-icon">
                <PenneyCoinCssIcon
                  label={t("Penney's Game CSS app icon", "Penney's Game CSS app 图标")}
                />
              </span>
              <div className="penney-hero-copy">
                <p className="penney-kicker">Non-transitive probability · 1969</p>
                <h1 className="penney-title font-display font-bold tracking-tight">
                  {t("Penney's Game", "Penney's Game · 硬币骗局")}
                </h1>
                <p className="penney-lede">
                  {t(
                    'Two players each name a run of heads and tails. Flip until one shows up. It looks like a coin toss. It is a hustle — and whoever picks second owns it.',
                    '两个人各报一串正反面，一直抛硬币，谁的先出现谁赢。看起来是纯运气 —— 其实是个局，而且后选的那个人稳赢。',
                  )}
                </p>
              </div>
            </div>

            <div className="penney-stat-rail">
              <div className="penney-stat">
                <span className="penney-stat-label">{t('Chips', '筹码')}</span>
                <span className="penney-stat-value">{save.chips}</span>
              </div>
              <div className="penney-stat">
                <span className="penney-stat-label">{t('Levels cleared', '通关')}</span>
                <span className="penney-stat-value">{clearedCount} / {PENNEY_LEVELS.length}</span>
              </div>
              <div className="penney-stat">
                <span className="penney-stat-label">{t('Best ranked', '排位最高分')}</span>
                <span className="penney-stat-value">{save.bestRankedScore}</span>
              </div>
              <div className="penney-stat">
                <span className="penney-stat-label">{t('Rounds played', '总局数')}</span>
                <span className="penney-stat-value">{save.roundsPlayed}</span>
              </div>
            </div>
          </header>

          <nav className="penney-modes" aria-label={t('Game modes', '游戏模式')}>
            <button
              type="button"
              className="penney-mode-tab"
              aria-pressed={mode === 'campaign'}
              onClick={() => setMode('campaign')}
            >
              {t('Campaign', '战役')}
            </button>
            <button
              type="button"
              className="penney-mode-tab"
              aria-pressed={mode === 'ranked'}
              onClick={() => setMode('ranked')}
            >
              {t('Ranked', '排位')}
              {!rankedUnlocked ? <Lock size={13} /> : null}
            </button>
            <button
              type="button"
              className="penney-mode-tab"
              aria-pressed={mode === 'lab'}
              onClick={() => setMode('lab')}
            >
              {t('Lab', '实验室')}
              {!labUnlocked ? <Lock size={13} /> : null}
            </button>
          </nav>

          {/* ---------------------------------------------------------- */}
          {/* Campaign                                                    */}
          {/* ---------------------------------------------------------- */}
          {mode === 'campaign' ? (
            <section className="penney-panel" aria-label={t('Campaign', '战役模式')}>
              <ol className="penney-level-rail">
                {PENNEY_LEVELS.map((item) => {
                  const unlocked = isLevelUnlocked(item.id, save.clearedLevels);
                  const cleared = save.clearedLevels.includes(item.id);
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        className="penney-level-chip"
                        aria-pressed={item.id === activeLevelId}
                        data-state={cleared ? 'cleared' : unlocked ? 'open' : 'locked'}
                        disabled={!unlocked}
                        onClick={() => openLevel(item.id)}
                      >
                        <span className="penney-level-index">
                          {cleared ? <Check size={13} /> : !unlocked ? <Lock size={13} /> : `0${item.id}`}
                        </span>
                        <span className="penney-level-name">{item.name[isZh ? 'zh' : 'en']}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              <div className="penney-level-brief">
                <div className="penney-level-brief-copy">
                  <p className="penney-kicker">
                    {t('Level', '第')} {level.id} {isZh ? '关' : ''} · {level.codename}
                  </p>
                  <h2 className="penney-level-title">{level.name[isZh ? 'zh' : 'en']}</h2>
                  <p className="penney-level-text">{level.brief[isZh ? 'zh' : 'en']}</p>
                </div>
                <div className="penney-level-goal">
                  <span className="penney-goal-label">{t('Goal', '目标')}</span>
                  <span className="penney-goal-text">{level.goal[isZh ? 'zh' : 'en']}</span>
                  <span className="penney-goal-progress">{objectiveProgressText()}</span>
                </div>
              </div>

              {levelCleared ? (
                <div className="penney-clear-card">
                  <p className="penney-clear-title">
                    {t('Level cleared', '通关')} · +{level.reward} {t('chips', '筹码')}
                  </p>
                  <p className="penney-clear-lesson">{level.lesson[isZh ? 'zh' : 'en']}</p>
                  <div className="penney-actions">
                    {level.id < 5 ? (
                      <button type="button" className="penney-button is-primary" onClick={() => openLevel((level.id + 1) as PenneyLevelId)}>
                        {t('Next level', '下一关')} <ArrowRight size={15} />
                      </button>
                    ) : (
                      <button type="button" className="penney-button is-primary" onClick={() => setMode('ranked')}>
                        {t('Enter Ranked', '进入排位赛')} <ArrowRight size={15} />
                      </button>
                    )}
                    <button type="button" className="penney-button" onClick={() => openLevel(level.id)}>
                      {t('Replay level', '重打本关')}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {level.betting ? (
                    <div className="penney-bet-row">
                      <span className="penney-bet-label">{t('Stake', '下注')}</span>
                      {affordableBets.map((step) => (
                        <button
                          key={step}
                          type="button"
                          className="penney-bet-chip"
                          aria-pressed={bet === step}
                          disabled={phase === 'flipping'}
                          onClick={() => setBet(step)}
                        >
                          {step}
                        </button>
                      ))}
                      <button
                        type="button"
                        className="penney-bet-chip is-allin"
                        aria-pressed={bet === save.chips}
                        disabled={phase === 'flipping'}
                        onClick={() => setBet(save.chips)}
                      >
                        {t('All in', '全下')}
                      </button>
                      <span className="penney-bet-note">
                        {t('At stake', '本局赌注')}: {Math.min(bet, save.chips)}
                      </span>
                    </div>
                  ) : null}

                  <div className="penney-board">
                    <div className="penney-side is-cpu">
                      <span className="penney-side-tag">{t('Dealer', '庄家')}</span>
                      {cpuSequence ? (
                        <SequenceChips sequence={cpuSequence} />
                      ) : (
                        <span className="penney-side-waiting">{t('waiting for your pick', '等你先选')}</span>
                      )}
                      {matchupProbability !== null ? (
                        <span className="penney-side-odds">{((1 - matchupProbability) * 100).toFixed(1)}%</span>
                      ) : null}
                    </div>
                    <div className="penney-side is-player">
                      <span className="penney-side-tag">{t('You', '你')}</span>
                      {playerSequence ? (
                        <SequenceChips sequence={playerSequence} />
                      ) : (
                        <span className="penney-side-waiting">{t('pick a sequence', '选一个序列')}</span>
                      )}
                      {matchupProbability !== null ? (
                        <span className="penney-side-odds">{(matchupProbability * 100).toFixed(1)}%</span>
                      ) : null}
                    </div>
                  </div>

                  {phase === 'picking' ? (
                    <div className="penney-picker" role="group" aria-label={t('Pick your sequence', '选择你的序列')}>
                      {allSequences(resolvedLength).map((sequence) => (
                        <button
                          key={sequence}
                          type="button"
                          className="penney-pick"
                          disabled={sequence === cpuSequence}
                          onClick={() => choosePlayerSequence(sequence)}
                        >
                          <SequenceChips sequence={sequence} size="sm" />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="penney-stream" aria-live="polite">
                      {visibleFlips.map((face, index) => (
                        <Coin
                          key={index}
                          face={face}
                          tone={
                            roundWinner && index >= winningWindowStart
                              ? roundWinner === 'player'
                                ? 'player'
                                : 'cpu'
                              : null
                          }
                        />
                      ))}
                    </div>
                  )}

                  <div className="penney-result" aria-live="polite">
                    {phase === 'flipping' ? <span>{t('Flipping…', '抛掷中…')}</span> : null}
                    {phase === 'resolved' && roundWinner ? (
                      <span className={roundWinner === 'player' ? 'is-win' : 'is-loss'}>
                        {roundWinner === 'player'
                          ? t(`You take the round. +${Math.min(bet, save.chips)}`, `你赢下这一局。+${Math.min(bet, save.chips)}`)
                          : t(`Dealer takes it. −${Math.min(bet, save.chips)}`, `庄家收走了。−${Math.min(bet, save.chips)}`)}
                        {' · '}
                        {t(`${visibleFlips.length} flips`, `${visibleFlips.length} 次抛掷`)}
                      </span>
                    ) : null}
                    {pickWasOptimal === false && phase === 'resolved' && cpuSequence ? (
                      <span className="penney-hint-bad">
                        {t('Not the optimal counter. The best answer was', '这不是最优应对。正确答案是')}{' '}
                        <SequenceChips sequence={bestResponse(cpuSequence).sequence} size="sm" />
                      </span>
                    ) : null}
                    {pickWasOptimal === true && phase === 'resolved' ? (
                      <span className="penney-hint-good">{t('Optimal counter.', '最优应对，选对了。')}</span>
                    ) : null}
                    {bailedOut ? (
                      <span className="penney-hint-bad">
                        {t(`Broke. Someone spots you ${BAILOUT_CHIPS} chips.`, `你破产了。有人借了你 ${BAILOUT_CHIPS} 筹码。`)}
                      </span>
                    ) : null}
                  </div>

                  {phase === 'resolved' ? (
                    <div className="penney-actions">
                      <button type="button" className="penney-button is-primary" onClick={() => beginRound(level.id)}>
                        {t('Next round', '下一局')}
                      </button>
                    </div>
                  ) : null}
                </>
              )}
            </section>
          ) : null}

          {/* ---------------------------------------------------------- */}
          {/* Ranked                                                      */}
          {/* ---------------------------------------------------------- */}
          {mode === 'ranked' ? (
            <section className="penney-panel" aria-label={t('Ranked mode', '排位模式')}>
              <div className="penney-level-brief">
                <div className="penney-level-brief-copy">
                  <p className="penney-kicker">{t('Ranked · Blind Master', '排位 · 盲选大师赛')}</p>
                  <h2 className="penney-level-title">{t('Beat the clock', '限时盲选')}</h2>
                  <p className="penney-level-text">
                    {t(
                      'The dealer shows a sequence. Name its optimal counter before the clock runs out. One mistake ends the run — the clock tightens every three answers.',
                      '庄家亮出一个序列，你要在倒计时结束前选出它的最优应对。错一次就结束，每答对三题时间收紧一秒。',
                    )}
                  </p>
                </div>
                <div className="penney-level-goal">
                  <span className="penney-goal-label">{t('Your best', '你的最佳')}</span>
                  <span className="penney-goal-text">
                    {save.bestRankedScore} {t('pts', '分')}
                  </span>
                  <span className="penney-goal-progress">
                    {save.bestRankedStreak} {t('streak', '连对')}
                  </span>
                </div>
              </div>

              {!rankedUnlocked ? (
                <div className="penney-locked">
                  <Lock size={18} />
                  <p>
                    {t(
                      `Clear Campaign level ${RANKED_UNLOCK_LEVEL} to unlock Ranked.`,
                      `先通关战役第 ${RANKED_UNLOCK_LEVEL} 关，才能进入排位赛。`,
                    )}
                  </p>
                  <button type="button" className="penney-button" onClick={() => setMode('campaign')}>
                    {t('Back to Campaign', '回到战役')}
                  </button>
                </div>
              ) : (
                <>
                  {ranked.status === 'idle' ? (
                    <div className="penney-actions">
                      <button type="button" className="penney-button is-primary" onClick={startRanked}>
                        <Timer size={15} /> {t('Start a run', '开始一轮')}
                      </button>
                    </div>
                  ) : null}

                  {ranked.status === 'live' ? (
                    <div className="penney-ranked-live">
                      <div className="penney-ranked-headline">
                        <div className="penney-ranked-metric">
                          <span className="penney-stat-label">{t('Score', '得分')}</span>
                          <span className="penney-stat-value">{ranked.score}</span>
                        </div>
                        <div className="penney-ranked-metric">
                          <span className="penney-stat-label">{t('Streak', '连对')}</span>
                          <span className="penney-stat-value">{ranked.streak}</span>
                        </div>
                        <div className="penney-ranked-metric">
                          <span className="penney-stat-label">{t('Seconds', '剩余')}</span>
                          <span className="penney-stat-value">{ranked.secondsLeft.toFixed(1)}</span>
                        </div>
                      </div>

                      <div
                        className="penney-timer-track"
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={rankedSeconds(ranked.questionIndex)}
                        aria-valuenow={ranked.secondsLeft}
                      >
                        <span
                          className="penney-timer-fill"
                          style={{
                            width: `${Math.max(
                              0,
                              (ranked.secondsLeft / rankedSeconds(ranked.questionIndex)) * 100,
                            )}%`,
                          }}
                        />
                      </div>

                      <div className="penney-board">
                        <div className="penney-side is-cpu">
                          <span className="penney-side-tag">{t('Dealer', '庄家')}</span>
                          <SequenceChips sequence={ranked.target} />
                        </div>
                      </div>

                      <div className="penney-picker" role="group" aria-label={t('Pick the counter', '选出应对')}>
                        {allSequences(ranked.target.length).map((sequence) => (
                          <button
                            key={sequence}
                            type="button"
                            className="penney-pick"
                            disabled={sequence === ranked.target}
                            onClick={() => answerRanked(sequence)}
                          >
                            <SequenceChips sequence={sequence} size="sm" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {ranked.status === 'over' ? (
                    <div className="penney-clear-card">
                      <p className="penney-clear-title">
                        {ranked.endedBy === 'timeout' ? t('Out of time', '超时了') : t('Wrong counter', '选错了')} ·{' '}
                        {ranked.score} {t('pts', '分')} · {ranked.streak} {t('streak', '连对')}
                      </p>
                      {ranked.lastAnswer ? (
                        <p className="penney-clear-lesson">
                          {t('Against', '对手是')} <SequenceChips sequence={ranked.target} size="sm" />{' '}
                          {t('the optimal counter was', '，最优应对是')}{' '}
                          <SequenceChips sequence={ranked.lastAnswer.best} size="sm" />{' '}
                          <span className="penney-inline-odds">
                            ({(bestResponse(ranked.target).probability * 100).toFixed(1)}%)
                          </span>
                        </p>
                      ) : null}

                      {submitState === 'done' ? (
                        <p className="penney-hint-good">{t('Score published.', '成绩已提交。')}</p>
                      ) : (
                        <div className="penney-submit-row">
                          <label className="penney-field">
                            <span className="penney-field-label">{t('Name for the board', '排行榜名字')}</span>
                            <input
                              type="text"
                              className="penney-input"
                              value={nameDraft}
                              maxLength={MAX_NAME_LENGTH}
                              placeholder="anon"
                              onChange={(event) => setNameDraft(event.target.value)}
                            />
                          </label>
                          <button
                            type="button"
                            className="penney-button is-primary"
                            disabled={submitState === 'sending' || ranked.score <= 0}
                            onClick={() => void handleSubmitScore()}
                          >
                            <Trophy size={15} />
                            {submitState === 'sending' ? t('Sending…', '提交中…') : t('Publish score', '提交成绩')}
                          </button>
                        </div>
                      )}

                      <div className="penney-actions">
                        <button type="button" className="penney-button is-primary" onClick={startRanked}>
                          <RotateCcw size={15} /> {t('Run it again', '再来一轮')}
                        </button>
                      </div>
                    </div>
                  ) : null}

                  <div className="penney-leaderboard">
                    <div className="penney-leaderboard-head">
                      <h3>{t('Leaderboard', '排行榜')}</h3>
                      <span className="penney-board-source">
                        {board.source === 'global'
                          ? t('global', '全球')
                          : t('local only — global board unreachable', '本地榜 · 全球榜暂时连不上')}
                      </span>
                      <button type="button" className="penney-button is-quiet" onClick={() => void refreshBoard()}>
                        {boardLoading ? t('Loading…', '读取中…') : t('Refresh', '刷新')}
                      </button>
                    </div>
                    {board.entries.length === 0 ? (
                      <p className="penney-empty">{t('No runs published yet. Be first.', '还没有人提交成绩。你可以是第一个。')}</p>
                    ) : (
                      <table className="penney-table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>{t('Name', '名字')}</th>
                            <th>{t('Score', '分数')}</th>
                            <th>{t('Streak', '连对')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {board.entries.map((entry, index) => (
                            <tr key={entry.uid}>
                              <td>{index + 1}</td>
                              <td>{entry.name}</td>
                              <td>{entry.score}</td>
                              <td>{entry.streak}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </>
              )}
            </section>
          ) : null}

          {/* ---------------------------------------------------------- */}
          {/* Lab                                                         */}
          {/* ---------------------------------------------------------- */}
          {mode === 'lab' ? (
            <section className="penney-panel" aria-label={t('Lab', '实验室')}>
              {!labUnlocked ? (
                <div className="penney-locked">
                  <Lock size={18} />
                  <p>
                    {t(
                      `Clear Campaign level ${LAB_UNLOCK_LEVEL} to unlock the Lab.`,
                      `先通关战役第 ${LAB_UNLOCK_LEVEL} 关，才能打开实验室。`,
                    )}
                  </p>
                  <button type="button" className="penney-button" onClick={() => setMode('campaign')}>
                    {t('Back to Campaign', '回到战役')}
                  </button>
                </div>
              ) : (
                <>
                  <div className="penney-level-brief">
                    <div className="penney-level-brief-copy">
                      <p className="penney-kicker">{t('Lab · free play', '实验室 · 自由对战')}</p>
                      <h2 className="penney-level-title">{t('Run any matchup', '任意对局')}</h2>
                      <p className="penney-level-text">
                        {t(
                          'Set both sequences yourself and push the sample size until the measured rate lands on the exact probability. Ten rounds lie. A hundred thousand do not.',
                          '两边序列都由你定，然后把样本量推上去，看实测胜率怎么落到精确概率上。十局会骗人，十万局不会。',
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="penney-lab-controls">
                    <div className="penney-seg" role="group" aria-label={t('Sequence length', '序列长度')}>
                      {[3, 4].map((length) => (
                        <button
                          key={length}
                          type="button"
                          aria-pressed={labLength === length}
                          onClick={() => {
                            setLabLength(length);
                            const first = allSequences(length)[0];
                            setLabPlayer(first);
                            setLabCpu(bestResponse(first).sequence);
                            setLabResult(null);
                          }}
                        >
                          {length} {t('flips', '位')}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="penney-button is-quiet"
                      onClick={() => {
                        setLabCpu(bestResponse(labPlayer).sequence);
                        setLabResult(null);
                      }}
                    >
                      {t('Set dealer to optimal counter', '让庄家用最优应对')}
                    </button>
                  </div>

                  <div className="penney-lab-grid">
                    <div className="penney-lab-column">
                      <span className="penney-side-tag">{t('You', '你')}</span>
                      <div className="penney-picker is-compact">
                        {allSequences(labLength).map((sequence) => (
                          <button
                            key={sequence}
                            type="button"
                            className="penney-pick"
                            aria-pressed={labPlayer === sequence}
                            disabled={sequence === labCpu}
                            onClick={() => {
                              setLabPlayer(sequence);
                              setLabResult(null);
                            }}
                          >
                            <SequenceChips sequence={sequence} size="sm" />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="penney-lab-column">
                      <span className="penney-side-tag">{t('Dealer', '庄家')}</span>
                      <div className="penney-picker is-compact">
                        {allSequences(labLength).map((sequence) => (
                          <button
                            key={sequence}
                            type="button"
                            className="penney-pick"
                            aria-pressed={labCpu === sequence}
                            disabled={sequence === labPlayer}
                            onClick={() => {
                              setLabCpu(sequence);
                              setLabResult(null);
                            }}
                          >
                            <SequenceChips sequence={sequence} size="sm" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="penney-lab-readout">
                    <div className="penney-lab-figure">
                      <span className="penney-stat-label">{t('Exact probability you win', '你的精确胜率')}</span>
                      <span className="penney-lab-hero">{(winProbability(labPlayer, labCpu) * 100).toFixed(2)}%</span>
                      <span className="penney-stat-label">
                        {t('odds', '赔率')} {formatOdds(winProbability(labPlayer, labCpu))}
                      </span>
                    </div>
                    <div className="penney-lab-sim">
                      <div className="penney-actions">
                        {[1000, 10000, 100000].map((rounds) => (
                          <button
                            key={rounds}
                            type="button"
                            className="penney-button"
                            disabled={labBusy}
                            onClick={() => runSimulation(rounds)}
                          >
                            {t(`Simulate ${rounds.toLocaleString()}`, `模拟 ${rounds.toLocaleString()} 局`)}
                          </button>
                        ))}
                      </div>
                      {labResult ? (
                        <div className="penney-bars">
                          <div className="penney-bar-row">
                            <span className="penney-bar-name">{t('You', '你')}</span>
                            <span className="penney-bar-track">
                              <span
                                className="penney-bar-fill is-player"
                                style={{ width: `${(labResult.wins / labResult.rounds) * 100}%` }}
                              />
                            </span>
                            <span className="penney-bar-value">
                              {((labResult.wins / labResult.rounds) * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="penney-bar-row">
                            <span className="penney-bar-name">{t('Dealer', '庄家')}</span>
                            <span className="penney-bar-track">
                              <span
                                className="penney-bar-fill is-cpu"
                                style={{
                                  width: `${(1 - labResult.wins / labResult.rounds) * 100}%`,
                                }}
                              />
                            </span>
                            <span className="penney-bar-value">
                              {((1 - labResult.wins / labResult.rounds) * 100).toFixed(1)}%
                            </span>
                          </div>
                          <p className="penney-lab-note">
                            {t(
                              `${labResult.rounds.toLocaleString()} rounds · ${labResult.averageFlips.toFixed(1)} flips per round on average`,
                              `${labResult.rounds.toLocaleString()} 局 · 平均每局抛 ${labResult.averageFlips.toFixed(1)} 次`,
                            )}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </>
              )}
            </section>
          ) : null}

          {/* ---------------------------------------------------------- */}
          {/* Strategy reference                                          */}
          {/* ---------------------------------------------------------- */}
          <section className="penney-panel penney-strategy" aria-label={t('Strategy table', '策略表')}>
            <p className="penney-kicker">{t('The counter table', '必胜策略表')}</p>
            <h2 className="penney-level-title">
              {t('Against ABC, play (not B) + A + B', '对手选 ABC，你就选「B 的反面 + A + B」')}
            </h2>
            <p className="penney-level-text">
              {t(
                'Every 3-flip sequence has a counter that beats it. The counters form a loop with no strongest member — the same shape as rock-paper-scissors, which is what makes picking second decisive.',
                '每个三位序列都有一个克制它的序列，而这些克制关系首尾相接成环，没有最强的那一个 —— 和石头剪刀布同构，这正是后选必胜的来源。',
              )}
            </p>
            <table className="penney-table">
              <thead>
                <tr>
                  <th>{t('Dealer picks', '对手选')}</th>
                  <th>{t('You answer', '你选')}</th>
                  <th>{t('Your win rate', '你的胜率')}</th>
                  <th>{t('Odds', '赔率')}</th>
                </tr>
              </thead>
              <tbody>
                {allSequences(3).map((sequence) => {
                  const answer = mnemonicResponse(sequence);
                  const probability = winProbability(answer, sequence);
                  return (
                    <tr key={sequence}>
                      <td><SequenceChips sequence={sequence} size="sm" /></td>
                      <td><SequenceChips sequence={answer} size="sm" /></td>
                      <td>{(probability * 100).toFixed(1)}%</td>
                      <td>{formatOdds(probability)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="penney-level-text penney-why">
              {t(
                'Why THH beats HHH seven times out of eight: unless the very first three flips are HHH, some tail must appear before HHH completes — and the T with the HH that follows it is exactly THH. So THH almost always lands first.',
                '为什么 THH 打 HHH 是 8 局赢 7 局：除非前三次直接开出 HHH，否则在 HHH 完成之前必然先出现一个反面，而那个反面后面接着的两个正面，正好就是 THH。所以 THH 几乎总是抢先。',
              )}
            </p>
            <div className="penney-footer-links">
              <a href={conwayHref} className="penney-footer-link">
                <span>{t('Another system worth playing with', '另一个可以玩的系统')}</span>
                <strong>
                  Conway&rsquo;s Game of Life <ArrowRight size={15} />
                </strong>
              </a>
              <button
                type="button"
                className="penney-button is-quiet"
                onClick={() => {
                  const fresh = emptySave();
                  setSave(fresh);
                  setProgress({ wins: 0, rounds: 0, streak: 0 });
                  setLevelCleared(false);
                  setActiveLevelId(1);
                  setMode('campaign');
                  beginRound(1);
                }}
              >
                <RotateCcw size={14} /> {t(`Reset save (chips back to ${START_CHIPS})`, `重置存档（筹码回到 ${START_CHIPS}）`)}
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PenneysGamePage;
