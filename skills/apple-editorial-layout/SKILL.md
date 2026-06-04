---
name: apple-editorial-layout
description: Apple.com inspired editorial product-page layout and typography decision system. Use when the user asks for Apple-like layout logic, premium minimalist product pages, hero typography scale, responsive font sizing, airy spacing, CTA hierarchy, product-grid rhythm, or wants a website to feel clear, calm, polished, and high-end without copying Apple branding.
---

# Apple Editorial Layout

Use this skill to create calm, premium, product-led web pages with clear visual hierarchy.

Do not copy Apple branding, exact assets, product language, interaction details, or proprietary design. Use only the high-level layout logic:

- one clear message per screen
- large product or visual first
- short headline
- short supporting line
- two restrained actions
- generous empty space
- strong typographic hierarchy
- very little decoration

## Core Logic

Apple-style page logic is not “minimal design.” It is controlled attention.

The page should answer, in this order:

1. What is this?
2. Why should the reader care?
3. What can the reader do next?

Each section should have one dominant idea. If a section needs more than one headline idea, split it.

## Page Structure

### 1. Global Navigation

Keep navigation small and quiet.

- Height: 44px to 52px
- Font size: 12px to 14px
- Weight: 400 to 500
- Background: transparent, white, or very soft blur
- Items: short labels only
- Avoid heavy buttons in the nav unless there is one primary action

The nav should not compete with the hero.

### 2. Hero

Hero structure:

1. Product, person, project, or concept name
2. One-line value phrase
3. Optional secondary line
4. Primary and secondary actions
5. Large visual or immersive media

Recommended text limits:

- Headline: 2 to 7 words
- Subheadline: 6 to 16 words
- Supporting line: 1 sentence only
- CTA: 1 to 3 words

Avoid paragraphs in the hero.

### 3. Feature Sections

Use repeated section rhythm:

- short title
- one plain sentence
- product visual, screenshot, or strong image
- optional CTA

Do not use many equal cards on the first screen. Use cards only after the main story is clear.

### 4. Product Grid

For secondary items, use a grid:

- Desktop: 2 columns
- Tablet: 2 columns
- Mobile: 1 column

Each grid item should have:

- title
- one benefit line
- one or two actions
- image

Keep title and copy aligned consistently across grid items.

## Typography Scale

Use fewer font sizes than feels necessary.

### Desktop

Use this scale as a default:

- Nav: 12px to 14px
- Eyebrow: 12px, uppercase or small label, tracking only if useful
- Hero headline: 56px to 80px
- Hero subheadline: 24px to 32px
- Section headline: 40px to 56px
- Card headline: 28px to 40px
- Body: 17px to 21px
- Caption / meta: 12px to 14px
- Legal / footnote: 11px to 12px

### Mobile

Mobile should step down, not squeeze desktop type.

- Nav: 12px
- Eyebrow: 11px to 12px
- Hero headline: 38px to 48px
- Hero subheadline: 19px to 24px
- Section headline: 30px to 40px
- Card headline: 24px to 32px
- Body: 16px to 18px
- Caption / meta: 12px to 13px

Do not scale font purely with viewport width. Use breakpoint-based sizes or `clamp()` with safe min and max.

Good clamp examples:

```css
.hero-title {
  font-size: clamp(2.5rem, 5vw, 5rem);
  line-height: 1.04;
}

.hero-subtitle {
  font-size: clamp(1.2rem, 2.4vw, 2rem);
  line-height: 1.18;
}
```

## Line Height

Use tight line height for large display text and relaxed line height for reading.

- Hero headline: 1.02 to 1.08
- Section headline: 1.05 to 1.12
- Card headline: 1.08 to 1.16
- Subtitle: 1.16 to 1.28
- Body: 1.45 to 1.65
- Legal: 1.35 to 1.5

If a headline wraps into more than 2 lines, reduce words before reducing size.

## Font Weight

Keep weights restrained.

- Hero headline: 600 to 700
- Section headline: 600 to 700
- Body: 400
- CTA: 500 to 600
- Meta: 500

Avoid using too many bold elements in the same screen.

## Spacing System

The premium feeling comes from spacing discipline.

Use this rhythm:

- Nav to hero: 32px to 56px
- Hero text stack gap: 8px to 16px
- Hero text to CTA: 16px to 24px
- Hero text to image: 32px to 64px
- Section vertical padding: 72px to 120px desktop, 48px to 72px mobile
- Desktop horizontal whitespace: do not let content fill the full available width by default. Prefer a centered content island such as `max-width: 900px` to `1100px`, then let the left and right sides stay quiet.
- Dense tables, pricing, and card grids can be narrower than the page shell. A `max-width: 900px` table inside a `max-width: 1100px` page often feels more premium than a full-width table.
- Default desktop grids should usually be 2 columns, not 3 or 4, unless the section is intentionally a compact catalog.
- Grid gap: 12px to 24px
- Card internal padding: 24px to 40px desktop, 20px to 28px mobile

If the page feels cluttered, remove borders first, reduce copy second, increase spacing third.

## CTA Logic

Default CTA pattern:

- Primary: “Learn more”
- Secondary: “Buy”, “Contact”, “View”, “Start”, or a context-specific action

Use link-style CTAs more often than filled buttons.

Recommended:

```text
Learn more >
View project >
Contact >
```

Avoid more than two CTAs per section.

## Visual Layout Rules

- Let the visual carry emotional weight.
- Let typography carry clarity.
- Do not decorate empty space just because it is empty.
- Avoid heavy borders, nested cards, noisy shadows, and too many badges.
- Use black, white, and neutral surfaces first. Add accent only for action or meaning.
- Product/image should often be larger than the text block.

## Application Workflow

When applying this skill:

1. Identify the page’s single primary message.
2. Choose the hero headline and subheadline before designing layout.
3. Decide whether the first viewport should be image-led or text-led.
4. Build typography scale for desktop and mobile.
5. Define section rhythm before styling cards.
6. Remove unnecessary borders, labels, and decorative shapes.
7. Check mobile first: no horizontal movement, no cramped headings, no text trapped inside small boxes.
8. Check desktop second: enough whitespace, strong hero, clear CTA hierarchy.

## For Eden Site

For Eden’s personal brand site, use this skill to make pages feel:

- clearer
- calmer
- more premium
- less boxed
- less dashboard-heavy
- more editorial

Recommended direction:

- Keep strong images.
- Reduce HUD lines and decorative borders.
- Use large, short section titles.
- Let each chapter breathe.
- Put one clear thought per section.
- Use smaller meta labels and larger content headlines.

## Avoid

- Copying Apple’s exact copywriting, layout, product names, or assets
- Using too many cards above the fold
- Making every section the same size
- Overusing uppercase labels
- Making headings huge inside small panels
- Adding gradients, lines, or badges to compensate for weak hierarchy
- Long hero paragraphs
- More than two actions per section
