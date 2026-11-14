import React from 'react';

/**
 * `/igaming/atlas` topic scenes (engraved-scenes): one engraved print per map topic,
 * each = meaning → one symbolic object (no people, no text) → one maths motif → one action.
 *
 * - balance  (Rules & cost)        a promise must weigh the same as its cost.
 *            Scale with a rule scroll and a coin stack; lever balance. Tips, then settles level.
 * - hourglass (Partners & delivery) six offers in, two go through.
 *            Hourglass, bulbs 1 : φ. Two of six gold beads drop through the neck.
 * - beacon   (Players & service)    reach the one who is waiting, at the right moment.
 *            Lighthouse and a boat; beam sweep. The beam stops on the boat, its lantern answers.
 * - loupe    (Data & evidence)      look closer before you believe a number.
 *            Magnifier over stone pillars; moiré in the lens. The lens glides and pauses.
 *
 * Parts are data (`Part[]`), drawn back to front; the shared base (paper, rosette, rays,
 * golden guides, bands, corners, frame) is the same for all four, only the subject and
 * the ink hue (`--en-hue`) change. Styles: `styles/pages/igaming-atlas-scenes.css`.
 */
export type Part = string | [string, Part[]];
export type AtlasSceneKind = 'balance' | 'hourglass' | 'beacon' | 'loupe';

const BACK: Part[] = ['paper', 'rosette', 'rays', 'guide gv1', 'guide gv2', 'guide gh1'];
const FRONT: Part[] = ['band top', 'band bottom', 'corner k1', 'corner k2', 'corner k3', 'corner k4', 'frame'];

const SUBJECT: Record<AtlasSceneKind, Part[]> = {
  balance: [
    'glow', 'floor',
    'post', 'plinth',
    ['beam', [
      'bar',
      ['pan pl', ['chain', 'dish', ['scroll', ['seal']]]],
      ['pan pr', ['chain', 'dish', 'coin n1', 'coin n2', 'coin n3']],
    ]],
    'finial',
  ],
  hourglass: [
    'glow', 'floor',
    'cap ct', 'cap cb', 'rod rl', 'rod rr',
    ['bulb bt', ['bulb-in']], ['bulb bb', ['bulb-in']],
    'bead s1', 'bead s2', 'bead s3', 'bead s4', 'bead go1', 'bead go2',
  ],
  beacon: [
    'sea', 'horizon',
    ['sweep', ['cone']],
    'rock', 'tower', 'gallery', 'lantern', 'roof', 'lamp-core',
    ['boat', ['hull', 'mast', 'sail', 'boat-lamp', 'boat-glow']],
    'wave w1', 'wave w2',
  ],
  loupe: [
    'floor',
    'pillar p1', 'pillar p2', 'pillar p3', 'pillar p4', 'pillar p5',
    ['lens', ['glass', 'rim', 'handle', 'glint']],
  ],
};

const cls = (names: string) => names.split(' ').map((n) => `as-${n}`).join(' ');

function renderParts(parts: Part[]): React.ReactNode {
  return parts.map((p, i) =>
    typeof p === 'string' ? <span key={i} className={cls(p)} /> : <span key={i} className={cls(p[0])}>{renderParts(p[1])}</span>,
  );
}

const AtlasScene: React.FC<{ kind: AtlasSceneKind }> = ({ kind }) => (
  <div className={`atlas-scene is-${kind}`} aria-hidden="true">
    {renderParts([...BACK, ...SUBJECT[kind], ...FRONT])}
  </div>
);

export default AtlasScene;
