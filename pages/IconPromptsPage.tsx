import React from 'react';
import { ArrowLeft, ArrowRight, Bookmark, Copy, Database, Download, ExternalLink, GitBranch, Layers, MapPin, MessageSquare, Play, Plus, Search, SearchCheck, Send, SlidersHorizontal, TrendingUp, UserRound } from 'lucide-react';

const iconPromptProducts = [
  {
    id: 'etreporthub',
    name: 'ETReportHub',
    color: '#176B87',
    style: 'precise geometric line icons, consistent 2px rounded strokes, transparent background, deep ocean blue #176B87, warm white #F5F3EF, and one restrained sunset-orange #E8683A signal accent; analytical, calm, reliable, operational',
    batches: [
      ['Product facts', ['operations team reviewing one shared dashboard', 'spreadsheet entering through an import arrow', 'local database cylinder with a small home marker', 'dashboard connected to a CRM user profile']],
      ['Core capabilities', ['two daily spreadsheets merging into one organized system tray', 'business trend line with one highlighted change signal', 'member profile with a precise action target', 'dashboard transforming into a clean exported spreadsheet']],
      ['Daily workflow', ['uploading an Excel sheet', 'two mismatched data rows reconciling into one checked row', 'dashboard signal resolving into one decision arrow', 'selected CRM audience moving into an outbound action']],
      ['System layer', ['database protected by a clear local-data boundary', 'three stacked layers for input, database, and dashboard', 'interactive demo window with a cursor', 'launch action connecting a dashboard to an operating team']],
    ],
  },
  {
    id: 'jiju',
    name: 'Jiju',
    color: '#388E63',
    style: 'warm organic line icons, consistent 2px rounded strokes, transparent background, sage green #388E63, charcoal #343633, and a small sunlight-yellow #F0C96A accent; friendly, trustworthy, curious, calm',
    batches: [
      ['Product facts', ['Penang island coastline with one location marker', 'curved discovery path leading to a place', 'cat silhouette combined with a profile card', 'location marker inside an open memory book']],
      ['Core capabilities', ['cat following a path toward a discovered place', 'verified location marker with a small pet silhouette', 'pet silhouette beside a saved visit photo', 'three pet-and-human profiles connected around one location']],
      ['Outing workflow', ['magnifying lens revealing a pet-friendly place', 'place card with verified pet-policy indicators', 'person and pet moving together toward a location', 'bookmarked place connected to a pet memory card']],
      ['Trust system', ['pet profile protected inside a soft shield', 'three connected layers for place data, pet identity, and visit memory', 'interactive local-discovery map with a cursor', 'open-door destination welcoming a person and pet']],
    ],
  },
  {
    id: 'poker',
    name: 'Friday Poker Club',
    color: '#176447',
    style: 'confident geometric line icons, consistent 2px rounded strokes, transparent background, dark table green #176447, warm cream #F1EDE3, charcoal #111B18, and restrained muted red #C95B55 accents; private home game, familiar group ritual, never casino-like',
    batches: [
      ['Product facts', ['four seat markers around a private oval table', 'two understated Hold’em cards at the table center', 'four table positions connected by a realtime sync signal', 'browser window containing a small poker table']],
      ['Private-game design', ['private link transforming into a poker table', 'four familiar friend profiles around one shared table', 'confirmed poker action with a visible turn indicator', 'speech bubble and memory marker beside the table']],
      ['Table workflow', ['highlighted host seat controlling a four-seat table', 'private invite link moving toward three friends', 'play-chip stack moving toward one empty seat with no currency symbol', 'story card containing a table and four friend markers']],
      ['Room system', ['private table enclosed by a boundary and small lock', 'three stacked layers for room, realtime table, and shared memory', 'interactive browser table with a cursor', 'open table with an invitation arrow bringing the crew back']],
    ],
  },
] as const;

const buildFourGridPrompt = (product: typeof iconPromptProducts[number], batch: typeof product.batches[number]) => `Create one cohesive 2×2 icon sheet for ${product.name}.

The sheet must contain exactly four separate icons:
1. ${batch[1][0]}
2. ${batch[1][1]}
3. ${batch[1][2]}
4. ${batch[1][3]}

Visual system: ${product.style}.

Layout requirements: arrange the four icons in a precise 2×2 grid with equal cell sizes and generous spacing. Each icon must be centered, fully visible, isolated, and easy to crop into an individual square asset. Keep identical scale, stroke width, corner radius, spacing, and visual weight across all four cells. No dividers and no surrounding card or app-icon container.

Output requirements: transparent background, flat vector-quality rendering, crisp edges, readable at 32px and 48px, no text, letters, numbers, labels, emoji, watermark, gradients, glow, glass effect, 3D rendering, or excessive detail.`;

const iconPromptPreviewIcons: Record<string, React.ElementType[][]> = {
  etreporthub: [
    [UserRound, Download, Database, TrendingUp],
    [Download, TrendingUp, SearchCheck, ExternalLink],
    [Download, GitBranch, ArrowRight, Send],
    [Database, Layers, ExternalLink, UserRound],
  ],
  jiju: [
    [MapPin, Search, UserRound, Bookmark],
    [Search, SearchCheck, Bookmark, UserRound],
    [Search, SearchCheck, MapPin, Bookmark],
    [UserRound, Layers, ExternalLink, MapPin],
  ],
  poker: [
    [UserRound, Layers, GitBranch, Play],
    [ExternalLink, UserRound, MessageSquare, Bookmark],
    [SlidersHorizontal, Send, Plus, MessageSquare],
    [GitBranch, Layers, ExternalLink, Play],
  ],
};

const iconPromptProductNotes: Record<string, string> = {
  etreporthub: 'Operational clarity · data movement · decision signals',
  jiju: 'Local discovery · pet identity · trusted memories',
  poker: 'Private ritual · familiar crew · shared table moments',
};

const IconPromptsPage: React.FC<{ homeHref: string }> = ({ homeHref }) => {
  const [copied, setCopied] = React.useState<string | null>(null);
  const [activeProductId, setActiveProductId] = React.useState(iconPromptProducts[0].id);
  const activeProduct = iconPromptProducts.find((product) => product.id === activeProductId) ?? iconPromptProducts[0];

  const writeToClipboard = async (text: string) => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const didCopy = document.execCommand('copy');
    textarea.remove();
    if (!didCopy) throw new Error('Clipboard unavailable');
  };

  const copyPrompt = async (id: string, prompt: string) => {
    try {
      await writeToClipboard(prompt);
      setCopied(id);
      window.setTimeout(() => setCopied((current) => current === id ? null : current), 1600);
    } catch {
      setCopied(`error-${id}`);
      window.setTimeout(() => setCopied((current) => current === `error-${id}` ? null : current), 2200);
    }
  };

  const copyAllPrompts = () => {
    const promptSet = activeProduct.batches
      .map((batch, index) => `PROMPT ${index + 1} · ${batch[0].toUpperCase()}\n\n${buildFourGridPrompt(activeProduct, batch)}`)
      .join('\n\n────────────────────\n\n');
    copyPrompt(`${activeProduct.id}-all`, promptSet);
  };

  return (
    <div className="page-shell icon-prompts-page">
      <main><div className="icon-prompts-island">
        <header className="icon-prompts-hero">
          <a href={homeHref} className="icon-prompts-back"><ArrowLeft size={16} /> Back home</a>
          <p>Icon prompt studio</p>
          <h1>Design the system<br />before the icons.</h1>
          <span>三个产品，十二组四宫格 Prompt。先统一视觉语法，再让 agent 一次生成 4 枚可以直接拆分的产品图标。</span>
        </header>

        <nav className="icon-prompts-switcher" aria-label="Choose a product icon system">
          <div className="icon-prompts-tabs" role="tablist" aria-label="Products">
            {iconPromptProducts.map((product) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeProduct.id === product.id}
                aria-controls="active-icon-prompt-system"
                className={activeProduct.id === product.id ? 'is-active' : ''}
                key={product.id}
                style={{ '--tab-accent': product.color } as React.CSSProperties}
                onClick={() => setActiveProductId(product.id)}
              >
                <i aria-hidden />
                {product.name}
              </button>
            ))}
          </div>
          <button className="icon-prompts-copy-all" type="button" onClick={copyAllPrompts}>
            <Copy size={15} />
            {copied === `${activeProduct.id}-all` ? 'Copied all' : copied === `error-${activeProduct.id}-all` ? 'Copy failed' : 'Copy all four'}
          </button>
        </nav>

        <section
          id="active-icon-prompt-system"
          className="icon-prompts-product"
          style={{ '--prompt-accent': activeProduct.color } as React.CSSProperties}
        >
          <div className="icon-prompts-product-head">
            <div>
              <p>Selected product system</p>
              <h2>{activeProduct.name}</h2>
            </div>
            <span>{iconPromptProductNotes[activeProduct.id]}</span>
          </div>

          <div className="icon-prompts-grid">
            {activeProduct.batches.map((batch, index) => {
              const id = `${activeProduct.id}-${index}`;
              const prompt = buildFourGridPrompt(activeProduct, batch);
              const previewIcons = iconPromptPreviewIcons[activeProduct.id][index];
              return (
                <article className="icon-prompt-card" key={id}>
                  <div className="icon-prompt-card-head">
                    <span>0{index + 1}</span>
                    <h3>{batch[0]}</h3>
                    <button type="button" onClick={() => copyPrompt(id, prompt)} aria-label={`Copy ${batch[0]} prompt`}>
                      <Copy size={15} />
                      {copied === id ? 'Copied' : copied === `error-${id}` ? 'Try again' : 'Copy'}
                    </button>
                  </div>

                  <div className="icon-prompt-preview" aria-hidden>
                    {previewIcons.map((PreviewIcon, itemIndex) => (
                      <div className="icon-prompt-preview-cell" key={`${id}-preview-${itemIndex}`}>
                        <span>0{itemIndex + 1}</span>
                        <PreviewIcon size={38} strokeWidth={1.65} />
                      </div>
                    ))}
                  </div>

                  <ol>
                    {batch[1].map((item) => <li key={item}>{item}</li>)}
                  </ol>

                  <details className="icon-prompt-details">
                    <summary><span>View full production prompt</span><ArrowRight size={16} /></summary>
                    <pre>{prompt}</pre>
                  </details>
                </article>
              );
            })}
          </div>
        </section>
      </div></main>
    </div>
  );
};

export default IconPromptsPage;
