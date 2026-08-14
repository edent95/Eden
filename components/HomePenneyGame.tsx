/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { allSequences, type Face, type Sequence } from '../services/penneyGame';
import {
  fetchMiniArena,
  MiniArenaError,
  playMiniRound,
  type MiniArenaState,
  type MiniLeaderboardEntry,
  type MiniPlayer,
  type MiniRound,
} from '../services/penneyMini';

export type HomePenneyGameProps = {
  isZh: boolean;
};

type Phase = 'idle' | 'requesting' | 'revealing' | 'resolved';

const NAME_KEY = 'eden.penney.mini.name.v1';
const MINI_SEQUENCES = allSequences(3);
const FLIP_INTERVAL_MS = 135;
const QUALIFYING_PLAYS = 10;

const EMPTY_PLAYER: MiniPlayer = {
  name: 'visitor',
  plays: 0,
  wins: 0,
  winRate: 0,
  credits: 100,
  dailyLimit: 100,
  ranked: false,
};

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

const percent = (value: number): string => `${(value * 100).toFixed(value > 0 && value < 1 ? 1 : 0)}%`;

const HomePenneyGame: React.FC<HomePenneyGameProps> = ({ isZh }) => {
  const t = React.useCallback((en: string, zh: string) => (isZh ? zh : en), [isZh]);
  const reducedMotion = useReducedMotion();
  const [arena, setArena] = React.useState<MiniArenaState>({ player: EMPTY_PLAYER, leaderboard: [] });
  const [arenaStatus, setArenaStatus] = React.useState<'loading' | 'ready' | 'offline'>('loading');
  const [phase, setPhase] = React.useState<Phase>('idle');
  const [selected, setSelected] = React.useState<Sequence>('HHT');
  const [round, setRound] = React.useState<MiniRound | null>(null);
  const [revealed, setRevealed] = React.useState(0);
  const [name, setName] = React.useState('');
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    try {
      setName(window.localStorage.getItem(NAME_KEY) ?? '');
    } catch {
      /* Private mode is fine; the server still supplies a stable IP alias. */
    }

    let active = true;
    void fetchMiniArena()
      .then((state) => {
        if (!active) return;
        setArena(state);
        setName((current) => current || state.player.name);
        setArenaStatus('ready');
      })
      .catch(() => {
        if (active) setArenaStatus('offline');
      });
    return () => {
      active = false;
    };
  }, []);

  React.useEffect(() => {
    if (phase !== 'revealing' || !round) return undefined;

    if (revealed >= round.flips.length) {
      setPhase('resolved');
      return undefined;
    }

    if (reducedMotion) {
      setRevealed(round.flips.length);
      return undefined;
    }

    const timeout = window.setTimeout(() => setRevealed((count) => count + 1), FLIP_INTERVAL_MS);
    return () => window.clearTimeout(timeout);
  }, [phase, reducedMotion, revealed, round]);

  const persistName = (value: string) => {
    setName(value);
    try {
      window.localStorage.setItem(NAME_KEY, value);
    } catch {
      /* Non-fatal. */
    }
  };

  const spin = async () => {
    if (phase === 'requesting' || phase === 'revealing' || arena.player.credits <= 0) return;
    setPhase('requesting');
    setRound(null);
    setRevealed(0);
    setMessage('');
    try {
      const result = await playMiniRound({ sequence: selected, name });
      setArena({ player: result.player, leaderboard: result.leaderboard });
      setName(result.player.name);
      setRound(result.round);
      setArenaStatus('ready');
      setPhase('revealing');
    } catch (error) {
      if (error instanceof MiniArenaError && error.state) setArena(error.state);
      const isLimit = error instanceof MiniArenaError && error.status === 429;
      setMessage(
        isLimit
          ? t('Today’s 100 credits are gone. Come back after midnight.', '今天的 100 枚已经用完，午夜后再来。')
          : t('The arena is offline for a moment. Your credit was not spent.', '擂台暂时连不上，这次不会扣 credit。'),
      );
      if (!isLimit) setArenaStatus('offline');
      setPhase('idle');
    }
  };

  const faceLabel = (face: Face) => (isZh ? (face === 'H' ? '正' : '反') : face);

  const Coin: React.FC<{ face: Face; size?: 'sm' | 'md'; tone?: 'player' | 'house' | null }> = ({
    face,
    size = 'md',
    tone = null,
  }) => (
    <span
      className={[
        'penney-coin',
        face === 'H' ? 'is-heads' : 'is-tails',
        size === 'sm' ? 'is-small' : '',
        tone === 'player' ? 'is-window-player' : '',
        tone === 'house' ? 'is-window-cpu' : '',
      ].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      <span className="penney-coin-face">{faceLabel(face)}</span>
    </span>
  );

  const SequenceCoins: React.FC<{ sequence: Sequence | null }> = ({ sequence }) => (
    <span className="penney-sequence" role="img" aria-label={sequence ?? ''}>
      {sequence
        ? [...sequence].map((face, index) => (
            <Coin key={`${sequence}-${index}`} face={face as Face} size="sm" />
          ))
        : null}
    </span>
  );

  const visibleFlips = round?.flips.slice(0, revealed) ?? [];
  const winningStart = phase === 'resolved' && round ? visibleFlips.length - 3 : -1;
  const player = arena.player;
  const qualificationLeft = Math.max(0, QUALIFYING_PLAYS - player.plays);

  const statusText = () => {
    if (message) return message;
    if (arenaStatus === 'loading') return t('Connecting to today’s table…', '正在连接今天的牌桌…');
    if (arenaStatus === 'offline') return t('Arena temporarily offline.', '擂台暂时离线。');
    if (phase === 'requesting') return t('The house is locking its ticket…', '庄家正在锁定票面…');
    if (phase === 'revealing') return t('Spinning…', '正在 spin…');
    if (phase === 'resolved' && round) {
      return round.winner === 'player'
        ? t('Your ticket landed first. +1 win.', '你的票面先出现。胜场 +1。')
        : t('The house ticket landed first.', '庄家的票面先出现。');
    }
    if (player.credits <= 0) return t('Credits refill at midnight MYT.', 'Credit 会在马来西亚时间午夜补满。');
    return t('Choose a ticket, then spin for 1 credit.', '选一张票，然后花 1 credit spin。');
  };

  return (
    <section className="eden-penney eden-home-island" id="penney">
      <div className="eden-penney-copy">
        <p className="eden-section-label">{t('Daily arena · Mini Coin Slot', '每日擂台 · Mini Coin Slot')}</p>
        <h2 className={isZh ? 'is-zh' : undefined}>
          {isZh ? <>每天 100 枚。<br />看你能赢多少。</> : <>100 credits.<br />Make them count.</>}
        </h2>
        <div className="eden-penney-body">
          <p>
            {t(
              'Choose a three-coin ticket. The house locks its own ticket after yours. Spin until either pattern lands first.',
              '选一张三枚硬币票。庄家会在你之后锁定自己的票面。持续 spin，谁的图案先出现，谁就赢。',
            )}
          </p>
          <p>
            {t(
              'Credits reset every midnight. Your record stays. Play ten rounds to enter the public board.',
              'Credit 每天午夜补满，个人战绩会保留。玩满十局，就会进入公开排行榜。',
            )}
          </p>
          <p className="eden-penney-thesis">
            <strong>{t('No tutorial. No disclosed odds. Just outcomes.', '没有攻略，不公布赔率，只记录结果。')}</strong>
          </p>
        </div>
      </div>

      <div className="eden-penney-arena">
        <div className="eden-penney-metrics" aria-label={t('Your record', '你的战绩')}>
          <div>
            <span>{t('Credits', 'Credit')}</span>
            <strong>{player.credits}</strong>
            <small>/ {player.dailyLimit}</small>
          </div>
          <div>
            <span>{t('Win rate', '胜率')}</span>
            <strong>{player.plays > 0 ? percent(player.winRate) : '—'}</strong>
            <small>{player.wins} / {player.plays}</small>
          </div>
        </div>

        <label className="eden-penney-name">
          <span>{t('Board name', '排行榜名字')}</span>
          <input
            value={name}
            maxLength={16}
            placeholder="visitor"
            onChange={(event) => persistName(event.target.value)}
          />
        </label>

        <div className="eden-penney-tickets">
          <div className="eden-penney-ticket is-player">
            <span>{t('Your ticket', '你的票')}</span>
            <SequenceCoins sequence={selected} />
          </div>
          <div className="eden-penney-ticket is-house">
            <span>{t('House ticket', '庄家票')}</span>
            {round ? <SequenceCoins sequence={round.houseSequence} /> : <em>???</em>}
          </div>
        </div>

        <div className="eden-penney-stream" aria-live="polite">
          {visibleFlips.length > 0 ? (
            visibleFlips.map((face, index) => (
              <Coin
                key={`flip-${index}`}
                face={face}
                size="sm"
                tone={winningStart >= 0 && index >= winningStart ? round?.winner ?? null : null}
              />
            ))
          ) : (
            <span>{t('reels waiting', '转轴待机')}</span>
          )}
        </div>

        <p className="eden-penney-status">{statusText()}</p>

        <div className="eden-penney-picker" role="group" aria-label={t('Choose a ticket', '选择一张票')}>
          {MINI_SEQUENCES.map((sequence) => (
            <button
              key={sequence}
              type="button"
              className={sequence === selected ? 'is-selected' : undefined}
              aria-pressed={sequence === selected}
              disabled={phase === 'requesting' || phase === 'revealing'}
              onClick={() => {
                setSelected(sequence);
                setRound(null);
                setRevealed(0);
                setPhase('idle');
                setMessage('');
              }}
            >
              <SequenceCoins sequence={sequence} />
            </button>
          ))}
        </div>

        <button
          type="button"
          className="eden-penney-spin"
          disabled={arenaStatus !== 'ready' || phase === 'requesting' || phase === 'revealing' || player.credits <= 0}
          onClick={() => void spin()}
        >
          {phase === 'requesting' || phase === 'revealing'
            ? t('Spinning…', 'Spin 中…')
            : t('Spin · 1 credit', 'Spin · 1 credit')}
        </button>

        {!player.ranked ? (
          <p className="eden-penney-qualify">
            {t(
              `${qualificationLeft} more ${qualificationLeft === 1 ? 'round' : 'rounds'} to enter the board.`,
              `再玩 ${qualificationLeft} 局进入排行榜。`,
            )}
          </p>
        ) : null}

        <MiniLeaderboard entries={arena.leaderboard} isZh={isZh} />
      </div>
    </section>
  );
};

const MiniLeaderboard: React.FC<{ entries: MiniLeaderboardEntry[]; isZh: boolean }> = ({ entries, isZh }) => {
  const t = (en: string, zh: string) => (isZh ? zh : en);
  return (
    <div className="eden-penney-leaderboard">
      <div className="eden-penney-leaderboard-head">
        <strong>{t('Visitor board', '访客排行榜')}</strong>
        <span>{t('minimum 10 plays', '至少 10 局')}</span>
      </div>
      {entries.length === 0 ? (
        <p className="eden-penney-empty">{t('No qualified players yet.', '还没有玩家完成十局。')}</p>
      ) : (
        <ol>
          {entries.slice(0, 5).map((entry) => (
            <li key={`${entry.rank}-${entry.name}`} className={entry.isYou ? 'is-you' : undefined}>
              <span>{entry.rank}</span>
              <strong>{entry.name}</strong>
              <em>{entry.wins}/{entry.plays}</em>
              <b>{percent(entry.winRate)}</b>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default HomePenneyGame;
