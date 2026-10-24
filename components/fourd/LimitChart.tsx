import React from 'react';
import { rm, rmK, limLabel, type SweepRow } from '../../services/fourdRisk';
import type { Tip } from './charts';

// 收字上限 on one shared x axis, two panels with their own y (never one chart with two scales):
// above, what an average draw earns at that limit; below, the worst draw against the reserve.
// The columns whose worst draw the reserve covers are shaded, so "where can I go" reads at once.

const ticks = (hi: number, count: number) => {
  const step0 = hi / count || 1, mag = Math.pow(10, Math.floor(Math.log10(step0)));
  const step = [1, 2, 2.5, 5, 10].map((x) => x * mag).find((x) => x >= step0)!;
  const out: number[] = []; for (let v = 0; v <= hi + 1e-9; v += step) out.push(v);
  return out;
};
// rmK puts a no-break space after RM; axis labels drop the unit, the axis title carries it
const bare = (v: number) => rmK(v).replace(/^RM\s*/u, '');
const short = (l: number) => (l === Infinity ? '不设' : l === 0 ? '0' : bare(l));

export const LimitChart: React.FC<{
  rows: SweepRow[]; reserve: number; current: number; recommended?: number; width: number;
  onTip: Tip; onPick: (limit: number) => void;
}> = ({ rows, reserve, current, recommended, width, onTip, onPick }) => {
  const [hover, setHover] = React.useState(-1);
  const W = Math.max(300, Math.round(width)), L = W < 480 ? 46 : 64, R = 12;
  const n = rows.length, col = (W - L - R) / n, x = (i: number) => L + (i + 0.5) * col;
  const aTop = 26, aH = 130, bTop = aTop + aH + 64, bH = 170, axisY = bTop + bH, H = axisY + 52;

  const E = rows.map((r) => r.E), eHi = Math.max(...E, 1) * 1.12, eLo = Math.min(0, ...E);
  const ya = (v: number) => aTop + aH - ((v - eLo) / (eHi - eLo)) * aH;
  const loss = rows.map((r) => Math.max(0, -r.worst));
  const fitsAt = loss.map((v) => v <= reserve + 0.5);
  const bHi = Math.max(reserve * 1.8, ...loss.filter((v, i) => fitsAt[i]).map((v) => v * 1.15));
  const yb = (v: number) => bTop + bH - (Math.min(v, bHi) / bHi) * bH;
  const every = col < 30 ? 3 : col < 44 ? 2 : 1;

  const tip = (e: React.MouseEvent, i: number) => {
    const r = rows[i];
    onTip(e.nativeEvent, [
      `每个字最多自己赔 ${limLabel(r.limit)}`,
      `每期平均赚 ${rm(r.E)}`,
      `最惨一期亏 ${rmK(loss[i])}`,
      fitsAt[i] ? `备用金赔得起，还剩 ${rmK(reserve - loss[i])}` : `比备用金多 ${rmK(loss[i] - reserve)}`,
      r.limit === current ? '现在用的就是它' : '点一下用这个上限',
    ]);
  };
  const line = (ys: number[]) => ys.map((y, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y.toFixed(1)}`).join('');
  const ci = rows.findIndex((r) => r.limit === current), ri = rows.findIndex((r) => r.limit === recommended);
  const fitN = fitsAt.filter(Boolean).length;
  // x labels: the current and recommended limits always, then every `every`-th one that does not crowd them
  // when 现在 and 建议 sit a column or two apart, anchor them away from each other
  const close = ci >= 0 && ri >= 0 && ci !== ri && Math.abs(ci - ri) * col < 56;
  const away = (i: number, other: number) => (close ? { textAnchor: i < other ? 'end' : 'start' } as const : undefined);
  const shown: number[] = [ci, ri].filter((i) => i >= 0);
  for (const i of [...rows.keys()].filter((i) => i % every === 0 || i === n - 1)) if (shown.every((j) => Math.abs(i - j) >= every)) shown.push(i);

  return (
    <figure className="rt-limit-chart">
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} role="img"
        aria-label={`收字上限从 0 到不设上限：每期平均赚从 ${rmK(E[0])} 到 ${rmK(E[n - 1])};最惨一期亏损在 ${fitN} 种上限下不超过备用金 ${rmK(reserve)}`}
        onMouseLeave={() => { setHover(-1); onTip(null); }}>
        {/* where the reserve covers the worst draw */}
        {fitsAt.map((ok, i) => (ok ? <rect key={`f${i}`} className="lc-fit" x={L + i * col} y={aTop - 8} width={col} height={axisY - aTop + 8} /> : null))}
        {hover >= 0 ? <rect className="lc-hover" x={L + hover * col} y={aTop - 8} width={col} height={axisY - aTop + 8} /> : null}

        {/* panel A: average profit per draw */}
        <text className="lc-title" x={L} y={aTop - 12}>每期平均获利</text>
        {ticks(eHi, 3).map((t) => (
          <g key={`a${t}`}>
            <line className="lc-grid" x1={L} x2={W - R} y1={ya(t)} y2={ya(t)} />
            <text className="lc-y" x={L - 8} y={ya(t) + 4}>{short(t)}</text>
          </g>
        ))}
        <path className="lc-profit" d={line(E.map(ya))} />
        {E.map((v, i) => <circle key={`p${i}`} className="lc-profit-dot" cx={x(i)} cy={ya(v)} r={i === ri ? 5 : 3} />)}

        {/* panel B: worst draw against the reserve */}
        <text className="lc-title" x={L} y={bTop - 12}>最惨一期亏多少 · 对比备用金</text>
        {ticks(bHi, 3).map((t) => (
          <g key={`b${t}`}>
            <line className="lc-grid" x1={L} x2={W - R} y1={yb(t)} y2={yb(t)} />
            <text className="lc-y" x={L - 8} y={yb(t) + 4}>{short(t)}</text>
          </g>
        ))}
        <line className="lc-reserve" x1={L} x2={W - R} y1={yb(reserve)} y2={yb(reserve)} />
        <text className="lc-reserve-label" x={W - R} y={yb(reserve) - 7}>备用金 {rmK(reserve)}</text>
        <path className="lc-loss" d={line(loss.map(yb))} />
        {loss.map((v, i) => (
          <g key={`l${i}`}>
            <circle className={fitsAt[i] ? 'lc-ok' : 'lc-over'} cx={x(i)} cy={yb(v)} r={i === ri ? 6 : 4.5} />
            {v > bHi && (i === n - 1 || (loss[i - 1] <= bHi && x(i) - 30 > L + 200)) ? <text className="lc-clip" x={i === n - 1 ? W - R : x(i)} y={bTop - 12} style={i === n - 1 ? { textAnchor: 'end' } : undefined}>{bare(v)} ↑</text> : null}
          </g>
        ))}

        {/* x axis: the limit */}
        <line className="lc-axis" x1={L} x2={W - R} y1={axisY} y2={axisY} />
        {rows.map((r, i) => (shown.includes(i)
          ? <text key={`x${i}`} className={`lc-x${i === ci ? ' is-now' : ''}`} x={x(i)} y={axisY + 16} style={i === ci ? away(ci, ri) : i === ri ? away(ri, ci) : undefined}>{short(r.limit)}</text> : null))}
        <text className="lc-x-title" x={L + (W - L - R) / 2} y={axisY + 40}>收字上限：每个字开头奖最多自己赔(RM)</text>

        {ci >= 0 ? (
          <g className="lc-now">
            <line x1={x(ci)} x2={x(ci)} y1={aTop - 8} y2={axisY} />
            <text x={x(ci)} y={aTop - 12} style={away(ci, ri)}>{ci === ri ? '现在 · 建议' : '现在'}</text>
          </g>
        ) : null}
        {ri >= 0 && ri !== ci ? <text className="lc-rec" x={x(ri)} y={aTop - 12} style={away(ri, ci)}>建议</text> : null}

        {rows.map((r, i) => (
          <rect key={`h${i}`} className="lc-hit" x={L + i * col} y={aTop - 8} width={col} height={axisY - aTop + 24}
            onMouseMove={(e) => { setHover(i); tip(e, i); }}
            onClick={() => { if (r.limit !== current) onPick(r.limit); }} />
        ))}
      </svg>
      <figcaption>
        <ul className="rt-legend">
          <li><i className="lc-key-fit" />绿底：最惨一期备用金赔得起</li>
          <li><i className="lc-key-profit" />每期平均获利</li>
          <li><i className="lc-key-over" />最惨一期超过备用金</li>
          <li><i className="lc-key-reserve" />备用金</li>
        </ul>
        <p className="rt-note">把鼠标放在某一列上看数字，点一下就改成那个上限。</p>
      </figcaption>
    </figure>
  );
};
