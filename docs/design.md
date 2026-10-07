# Quant Rush — UI Design Spec

Status: **v1, approved direction.** This is the single source of truth for the look of the site. `site-plan.md` covers scope and content; this file covers how it looks and moves. Every token and component is on one page at `/styleguide` when the site is running (see "Implementation" at the end).

## 1. Concept

**"An 1849 broadsheet printed on a trading floor."** Three layers, each with a job:

| Layer | Role | Ingredients |
|---|---|---|
| Poster (structure) | Makes it feel like a Gold Rush event | Wood-type slab headings, condensed caps labels, double-rule borders, rubber stamps, parchment with grain |
| Market (texture) | The "cool" that students respond to | Scrolling ticker, candlesticks, tabular monospaced numbers, up/down colors, a rising "stock line" timeline |
| Engraving (soul) | Authenticity, screenshot-worthy | Duotoned public-domain engravings of miners, sluices, clipper-ship sailing cards |

Rules of thumb:

- The theme lives in headings, decoration, and calls to action. Body text, the rules page, and the registration form stay calm and highly readable.
- Every themed label is paired with plain words: "The Assay — submission deadline".
- Light symbols only (pickaxe, cart, nugget, claim stake, lantern, scales). No caricatures of people; engraving selection avoids demeaning depictions.
- Page rhythm: dark hero and ticker → torn-paper edge → parchment content → torn edge → dark footer.

## 2. Color tokens

Defined once on `:root`; any section flips to dark with the `.on-dark` class, which remaps the semantic aliases.

| Token | Hex | Use |
|---|---|---|
| `--paper-50` | `#FBF6EA` | Cards and posters on paper |
| `--paper-100` | `#F4E9D3` | Page background (content sections) |
| `--paper-200` | `#E9DAB9` | Alternate section bands, dividers |
| `--paper-300` | `#D9C397` | Subtle borders, hairlines |
| `--ink-900` | `#1C1208` | Hero, ticker, nav, footer backgrounds |
| `--ink-800` | `#2B1D10` | Text and poster borders on paper |
| `--ink-600` | `#5A4632` | Secondary text on paper |
| `--ink-400` | `#8C7A62` | Decorative only / large text (3.4:1 on paper) |
| `--surface-dark` | `#2A1C10` | Tiles and cards on dark (countdown) |
| `--gold-300` | `#E8C45A` | Hover, highlights, text on dark |
| `--gold-500` | `#D4A017` | Primary accent: fills, bars, buttons |
| `--gold-700` | `#A67C0E` | Button extrusions and borders on dark |
| `--gold-800` | `#7A5A08` | The only "gold" allowed as text on paper |
| `--rust-500` | `#A63D2F` | Stamps, deadline, "down" on paper |
| `--rust-300` | `#E0634C` | "Down" on dark (ticker) |
| `--green-700` | `#256B42` | "Up" and done badges on paper |
| `--green-400` | `#5FBF7A` | "Up" on dark (ticker) |

Semantic aliases: `--bg`, `--fg`, `--fg-muted`, `--surface`, `--border`, `--accent`, `--accent-text`, `--up`, `--down`, `--shadow-hard`.

Contrast (WCAG 2 ratios): ink-800/paper-100 13.6 · ink-600/paper-100 7.4 · gold-800/paper-100 5.3 · rust-500/paper-100 5.2 · green-700/paper-100 5.3 · paper-100/ink-900 15.3 · gold-300/ink-900 10.9 · gold-500/ink-900 7.8 · green-400/ink-900 8.1 · rust-300/ink-900 5.3 · ink-900/gold-500 7.8.

Hard rules: **gold-500 is never text on paper** (2:1). **ink-400 never carries small text.**

## 3. Typography

Google Fonts with `display=swap` and `preconnect`.

| Role | Family | Weights | Fallback |
|---|---|---|---|
| Display, H1, H2, wordmark | **Alfa Slab One** | 400 | Georgia bold |
| Labels, eyebrows, nav, buttons, card titles | **Oswald** | 500, 600 (caps, tracked) | Arial Narrow |
| Body | **Source Serif 4** (optical size axis) | 400, 400 italic, 600 | Georgia |
| Numbers, dates, ticker, countdown, code | **JetBrains Mono** | 400, 700, `tabular-nums` | ui-monospace |

Fluid scale:

| Token | Size | Notes |
|---|---|---|
| `--fs-display` | `clamp(3.25rem, 2rem + 9vw, 8.5rem)` | Alfa, line-height 0.95, uppercase |
| `--fs-h1` | `clamp(2.5rem, 1.8rem + 3.5vw, 4.25rem)` | Alfa, lh 1.05 |
| `--fs-h2` | `clamp(2rem, 1.5rem + 2.2vw, 2.875rem)` | Alfa, lh 1.1 |
| `--fs-h3` | `1.25rem` | Oswald 600, caps, tracking .06em |
| `--fs-eyebrow` | `.8125rem` | Oswald 500, caps, tracking .18em |
| `--fs-lead` | `clamp(1.125rem, 1rem + .5vw, 1.375rem)` | Source Serif, lh 1.5 |
| `--fs-body` | `1.0625rem` (1rem below 640px) | Source Serif, lh 1.65, measure ≤ 65ch |
| `--fs-small` | `.875rem` | |
| `--fs-mono` | `.9375rem` | JetBrains |
| `--fs-countdown` | `clamp(2.25rem, 1rem + 6vw, 5rem)` | JetBrains 700 |

Newspaper detail: the About paragraph opens with a three-line drop cap in Alfa Slab One, gold-800.

## 4. Spacing, layout, surfaces

- Base 4px. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 (`--s-1` … `--s-10`).
- Container 1120px; the timeline uses 1280px. Gutter 24px at ≥ 640px, 16px below.
- Section padding-block: 96px desktop, 64px mobile. Breakpoints: 640, 900, 1200.
- Radius: 4px for buttons and badges, 6px for cards, pill for stamps.
- Poster borders: 2px ink-800. Hairlines: 1px paper-300. Newspaper double rule: 1px line, 3px gap, 3px line.
- Hard shadows (no blur): `4px 4px 0 ink-800` on paper, `4px 4px 0 gold-700` on dark. Hover 6px, press 0.
- Paper grain: an SVG `feTurbulence` noise data-URI tiled at 300px, opacity .10, `mix-blend-mode: multiply`, on every `.paper` section.
- Foxing: every `.paper` section also carries four faint brown age spots (large radial gradients, multiply), mirrored on alternate sections.
- Vignette: a fixed, full-viewport radial darkening of the page edges (multiply, ~16% at the corners) so the page reads as a sheet rather than a screen color.
- Bleeding engravings: a large ink-variant engraving fragment (10–12% opacity, radial-masked) sits behind the About and FAQ sections. Paper sections clip horizontal overflow.
- Home band order: Hero (dark) → tear → About + Highlights (paper) → Timeline map (paper) → How it works (the Mine: paper darkening to ink) → tear → Awards (paper) → Register (corkboard) → FAQ (paper) → flipped tear → Footer (dark). The middle of the page therefore gets two dark bands of its own.

## 5. Components

### 5.1 Ticker (top, not sticky)

36px tall (32px mobile), ink-900, bottom hairline gold-700 at 40%. JetBrains `.8125rem`. Up items green-400, down rust-300, neutral paper-200. Separator `◆` in gold-700 with 32px margins. The track is duplicated twice and animated `translateX(-50%)` over 60s, linear, infinite; it pauses on hover and focus. `aria-hidden="true"` with a visually hidden summary ("Quant Rush opens Oct 13, deadline Nov 22"). Reduced motion: static, overflow hidden, right-edge fade.

Items come from config: `QNTR ▲ 18.49`, `ALPHA ▲ 4.20%`, `SIGNAL ▲ 2.45%`, `NOISE ▼ 0.31%`, `OVERFIT ▼ 99.00%`, `PAYDIRT ▲ 18.49%`, `BIAS ▼ 3.14%`, `VARIANCE ▲ 2.71%`, `SHARPE ▲ 1.00`, `LEAKAGE ▼ 100%`, `COFFEE ▲ 12.00%`, plus a computed `T-47 DAYS TO THE ASSAY`. Optional pinned announcement chip (gold fill, ink text): `★ DATASET DROPS OCT 13`.

### 5.2 Nav (sticky)

64px (56px mobile), ink-900. A gold-700 at 40% bottom border fades in after 8px of scroll. Left: emblem 28px + "QUANT RUSH" in Alfa `1.125rem` paper-50. Links: Oswald 500 caps `.875rem` tracking .12em paper-200; hover and active state gold-300 with a 2px gold underline growing from the left. Right: an outlined Discord icon button (40px; 44px on mobile, where it sits next to the menu toggle) and a small primary button "REGISTER". Below 900px: a hamburger (bars → X) opens a full-screen ink-900 overlay with Alfa `2.5rem` links, the Register button, a secondary "Join the Discord" button, and a contact line; body scroll locked; Esc closes. The skip link is the first element in the DOM.

### 5.3 Buttons

Oswald 600 caps `.9375rem` tracking .1em; padding 14px 28px; radius 4px; 2px border; hard-shadow extrusion; 150ms transitions.

- **Primary:** face gold-500, text ink-900, border ink-900, extrusion gold-700 on dark / ink-800 on paper. Hover: face gold-300, `translate(-2px, -2px)`, shadow 6px. Active: `translate(2px, 2px)`, shadow 0.
- **Secondary on dark:** transparent, paper-100 text and border; hover fill paper at 10%. **Secondary on paper:** ink-800 text and border; hover fill ink at 6%.
- **Text link:** ink-800 with a 2px gold-500 underline offset 3px; hover background gold-300 (highlighter effect). On dark: gold-300 text.
- Sizes: default, and small (10px 18px) for the nav.

### 5.4 Badges and stamps

Oswald caps `.75rem` tracking .12em, 2px border, padding 4px 10px, rotated −2° to 2° per instance. Variants: `upcoming` gold fill with ink text; `done` green-700 outline with "✓"; `today` rust fill with paper text and a slow pulse; `tbd` rust outline "TO BE FINALIZED"; `joke` rust outline "JOKE AWARD"; `soon` ink outline "COMING SOON". Nice-to-have: a noise `mask-image` so stamp edges look inked.

### 5.5 Section header

Eyebrow (Oswald, rust-500, with `✦` and 32px hairlines when centered) → H2 (Alfa, ink-800) → optional lead (Source Serif, ink-600, ≤ 60ch). Under the H2: a 56×4 gold-500 bar for left-aligned headers, or a double rule for centered ones.

### 5.6 Poster card

paper-50, 2px ink-800 border, 6px radius, hard shadow 4px, padding 24–32px. Optional 48px circular stamp icon (gold-500 background, ink icon) top-left. Title in Oswald 600 caps; body in serif. Hover: lift (`translate(-2px, -2px)`, shadow 6px). Variants: `highlight`; `award` (gold top strip with category); `award--joke` (rust strip and border, rotated JOKE stamp); `workshop` (tear-off date block).

### 5.7 Notice box

paper-200 background, 4px gold-500 left border, mono eyebrow ("ON THE RECORD"), serif text. Used for "Prizes are real; we'll announce them here and on Discord" and for rules marked TBD.

### 5.8 Accordion (FAQ)

Native `<details>`. Opening and closing animate the height between the question and the full answer (Web Animations API, 300ms open / 240ms close, with a timer fallback so the state always settles) while the answer fades and the `+` rotates; under reduced motion it toggles natively. Each row has a bottom hairline; the summary is Oswald 600 `1.0625rem` ink-800 with a `+` in gold-800 on the right that rotates 45° when open; content is serif ink-600. Max width 760px.

### 5.9 Torn edge

A reusable 28px-tall, full-width SVG path (about 24 irregular points) in the next section's paper color, overlapping the dark section by 1px, with a second path offset 3px in ink-900 at 12% for depth. A `flip` variant handles paper → dark before the footer.

### 5.10 Countdown

Eyebrow label (gold-300) + four tiles (surface-dark, 1px gold-700 at 50% border, 6px radius): digits in JetBrains 700 gold-300, labels in Oswald caps `.75rem` paper-200 (DAYS, HRS, MIN, SEC). Phase from config: before open → "CLAIM STAKING OPENS IN"; open → "THE ASSAY CLOSES IN"; after the deadline → static "RESULTS DEC 1"; after results → "SEE YOU NEXT RUSH". `aria-live="off"`, with a visually hidden static date. Nice-to-have: 150ms vertical slide on digit change.

### 5.11 Candlestick row

Inline SVG at the bottom of the hero and, smaller at 12% opacity, above the footer. 36 candles on desktop, 16 on mobile; deterministic pseudo-random heights (seeded, so server output is stable); mostly green-400, some rust-300, the last one tall and gold-500. Load animation: `scaleY` from 0 with transform-origin bottom, 600ms, 25ms stagger.

### 5.12 Engraving block

`<figure class="engraving engraving--gold | --ink">` with a credit `<figcaption>` in mono `.6875rem`. On paper: `mix-blend-mode: multiply` and `filter: grayscale(1) contrast(1.15)`, so the scan's white paper disappears and the ink lines stay. On dark: an alpha-mask PNG used as `mask-image` on a gold-500 element (the preview uses `invert` + `screen` instead). Always duotone, never full color. Variants: `backdrop` (large, gradient-masked to transparent at the top, opacity .25–.35), `medallion` (96–160px circle with a 2px ink ring), `strip` (footer).

### 5.13 Depth meter (nice-to-have, desktop only)

A fixed bottom-left mono label `DEPTH 0 FT` that increases with scroll (1 ft per 10px). Hidden below 900px and under reduced motion.

### 5.14 Artifacts (ticket, tag, certificate)

Highlights are three physical objects instead of three identical cards, each rotated 1–2.5° and pinned, straightening on hover. All CSS, no images.

- **Ticket:** paper-50, semicircular notches at the left and right mid-edges (two radial-gradient masks on an inner element; the hard drop shadow is applied by `filter` on the wrapper so it follows the notches), an inner hairline, a dashed perforation, and a vertical mono stub (`QNTR · 2026 · No. 001849`).
- **Tag:** kraft paper (`#D9BC8C`), pointed top via `clip-path`, a reinforced hole, an SVG string, an inner hairline, and a rust `ISSUED` badge.
- **Certificate:** paper-50 with the WANTED-poster double border, `✦` corner ornaments, a gold seal (the emblem on a gold disc, rotated) overlapping the bottom edge, and a rotated `TO BE ANNOUNCED` stamp.

### 5.15 The Mine (how it works)

A cross-section. The section background is six hard-stopped strata from paper-100 down to ink-900, with wavy SVG boundary lines, a diagonal hatch on the lower half, and a glowing gold vein (two jagged SVG paths with a gold drop shadow) at bedrock. A ladder (two rails and rungs, gold-700) runs down the center on desktop and down the left on mobile. The four steps are chambers hung on the ladder, zig-zagging left/right by row; each has a mono depth label (`LEVEL 03 · 120 FT`) and a numbered lamp. Chambers 3 and 4 flip to dark surfaces with gold borders and a lamp glow. The section ends with a paper tear.

### 5.16 Corkboard (register)

Cork brown (`#7E5633`) with two speckle patterns and a noise overlay, framed by a wooden border drawn with inset box-shadows. Headings use paper-50 with an ink text-shadow; the WANTED poster is rotated −1.2° on computers (straight on phones and tablets: below 900px or with a coarse pointer, so the form is easy to read and tap) with a soft shadow in addition to the hard one, and its nails become pushpins. At ≥ 1200px two extra scraps are pinned beside the poster: a ruled index card ("Need a team?") and a dashed ticket for the Kaggle page.

### 5.17 Map sheet (timeline)

The Claim Trail sits on a paper-50 sheet with the poster double border and hard shadow. Behind the desktop chart: contour lines and a river (SVG, 1px ink-400 at 40%, river in green-700), three tracked-caps place labels (`SIERRA NEVADA`, `AMERICAN RIVER`, `SUTTER'S MILL`), a compass rose top-right, and a legend box top-left. Positions are chosen so nothing collides with the node labels. The mobile rail sits inside the same sheet.

### 5.18 Newspaper clipping (about)

The About copy is a torn clipping from *The Quant Rush Dispatch*: a masthead (mono volume/date flanking the name in Alfa Slab One) over a double rule, a headline, an italic deck, and two columns with a column rule. The engraved cut sits at the top of the first column with a mono caption; the body opens with a dateline in Oswald caps and a drop cap. The clipping is paper-50, rotated −0.6°, with jagged top and bottom edges (`clip-path` polygon; the hard shadow comes from a `filter` on the wrapper so it follows the tear), two translucent tape strips on the top corners, and a rotated `FIRST EDITION` stamp.

### 5.19 Medal shelf (awards)

Each award is a rosette (16-scallop SVG outline, two concentric discs, an icon in the center) with two striped ribbon tails, hung above a brass name plate that stands on a wooden shelf. Tones come from `awards.json`: gold, green (greenhorn), rust, and a tarnished brass for Fool's Gold, whose plate is also tarnished and which carries a rotated `JOKE AWARD` badge. The shelf is a CSS grid with subgrid rows (rosette, plate, board, blurb); the board is a pseudo-element spanning all columns. Four across on desktop, two across on two shelves on mobile.

### 5.20 Ledger page (FAQ)

The accordion sits on a ruled ledger sheet: paper-50 with horizontal rules every 28px, a double rust margin line on the left, a mono header line ("Prospector's ledger · Q & A", page number), and a mono question number (`Q.01`) in the margin for each row. Summary and answer line heights are 28px so the text sits on the rules. Used on the home page and on the full FAQ in the rules page.

### 5.21 Gold dust (hero)

A full-bleed `<canvas>` (`GoldDust.astro`) between the hero engraving and the content, blended with `screen`.

- **Fine dust:** about one particle per 9,000 px² (36–140). Each has a depth z (0.25–1): radius 0.7–2.8px, rise speed 6–24 px/s, a slow sine sway, and a twinkle. Drawn from three pre-rendered radial sprites (pale gold, gold, white-gold) with additive blending, so overlaps glow. Particles fade in from the bottom and out toward the top, and respawn below the edge.
- **Motes:** about 8% as many large, soft, out-of-focus discs (18–50px, 5–12% opacity) drifting slowly in front, for depth.
- **Glints:** every 0.35–1.45s a near particle flashes a four-point star (tapered gradient strokes) for about a second.
- **Pointer:** with a fine pointer, layers shift up to ~22px (motes ~36px) toward the cursor for parallax.
- **Cost:** device-pixel-ratio capped at 2; the loop stops when the canvas is off screen or the tab is hidden. Under `prefers-reduced-motion` it draws one still frame.

## 6. Home page composition

### Hero (`.on-dark`)

- Min-height `calc(100svh − ticker − nav)`, capped at 880px; centered column, max 880px.
- Background stack: ink-900 → radial gold glow (ellipse at 50% 70%, gold-500 at 10% to transparent) → engraving backdrop (miners at a long tom), gold-masked, bottom-anchored, faded out above 40% height → gold dust (§5.21) → candlestick row along the bottom edge.
- Content, top to bottom, with an 80ms staggered reveal: eyebrow `SANTA MONICA COLLEGE · QFE CLUB PRESENTS` (gold-300, with `— ◆ —` ornaments) → wordmark → tagline → facts stamps → countdown → buttons → scroll cue → engraving credit (bottom-right, mono `.6875rem`, paper at 60%).
- **Wordmark:** "QUANT RUSH", Alfa, `--fs-display`, fill paper-50, `-webkit-text-stroke: 1.5px gold-500`, block extrusion via a `::before` duplicate (`attr(data-text)`) in gold-700 offset 6px/6px (4px on mobile). Breaks to two lines below 640px. Nice-to-have: a diagonal glint sweep every 7s.
- **Tagline:** "Strike signal in the noise." in Source Serif italic, `--fs-lead`, paper-200. Below it, Oswald caps `.8125rem` paper-200 at 80%: `SMC'S FIRST ONLINE QUANT COMPETITION · OPEN TO ALL CALIFORNIA COMMUNITY COLLEGE STUDENTS`.
- **Facts stamps:** three mono pills (`OPENS OCT 13` · `THE ASSAY NOV 22` · `100% ONLINE`), 1.5px paper-300 at 60% border, rotated −2°, 1.5°, −1°; wrap on mobile.
- **Buttons:** primary `STAKE YOUR CLAIM →` (scrolls to Register), secondary `HOW IT WORKS`. Full width and stacked below 640px.
- **Scroll cue:** mono `▼ DIG IN`, bouncing on a 2s loop (off under reduced motion).

### About ("Dispatch") — paper-100, directly under the tear

The newspaper clipping (§5.18), max 920px, centered, over the bleeding Sluice engraving. Headline "Gold in the Data: Every SMC Student Invited to Dig"; two paragraphs (what it is, who it is for, no experience needed, who runs it) and a link to the rules.

### Highlights — three artifacts (§5.14)

A ticket, a tag, and a certificate in a 1.2 / 0.8 / 1 column grid, the tag hanging lower than its neighbors. Copy:

1. **100% Online** (laptop icon) — "Compete from anywhere. Submissions and the leaderboard live on Kaggle."
2. **Picks & Shovels** (pickaxe and shovel) — "For SMC students: every Tuesday, a workshop, then Q&A. We teach the tools; you dig."
3. **Real Prizes** (nugget) — "Real prizes for the top of the private leaderboard, the best beginner, and a few surprises."

### Timeline — "The Claim Trail" (rising stock line)

Left-aligned header: eyebrow `SIX WEEKS · OCT 13 → NOV 22`, H2 "The Claim Trail", lead "Every Tuesday is a workshop. One Sunday is the Assay."

- **≥ 900px:** an SVG chart (1280×380 viewBox). A polyline rises from bottom-left to top-right through eight nodes with slight jitter, like an uptrend. The area under the line is gold-500 at 8%. A faint dashed horizontal grid in paper-300. The past segment is solid ink-800 at 2.5px; the future segment is dashed gold-700. Nodes are 14px paper-50 circles with a 2.5px ink ring; the current node is gold-500 with a pulsing halo; "The Assay" is a larger rust-500 diamond with a `DEADLINE` stamp. Labels alternate above and below with thin leader lines: date (mono rust-500 `.8125rem`), title (Oswald 600 caps 1rem), one-liner (serif `.9375rem` ink-600, ≤ 22ch). A rotated y-axis joke label `SKILL →` in Oswald ink-400. The line draws in on reveal (stroke-dashoffset, 1.2s) and the nodes pop in staggered.
- **< 900px:** a vertical rail at x = 20px (3px: solid ink for the past, dashed gold for the future); same nodes; items stacked. The current item gets a gold left bar and a `YOU ARE HERE` stamp.
- Data lives in `src/data/schedule.json` (date, title, blurb, kind: kickoff | workshop | deadline | wrapup). Current and past states are computed by date in a small script; done items get `✓ DONE`.

### How it works — the Mine (§5.15)

Header "From greenhorn to prospector, four levels down" on the paper-colored surface, then four chambers down the shaft:

1. **Stake your claim** — Fill in the form below. Two minutes.
2. **Get your gear** — Make a free Kaggle account and join the Quant Rush competition page.
3. **Dig** — Download the data, train models, submit predictions. Questions go to our Discord, any time.
4. **The Assay** — Sunday, Nov 22: submissions close. The private leaderboard shows who struck real gold.

### Awards — "The Claims"

The medal shelf (§5.19). Names are placeholders, editable in `src/data/awards.json` (which also sets each medal's tone and icon):

- **Mother Lode** — 1st, 2nd, 3rd on the private leaderboard (three medal dots: gold, silver, bronze).
- **Greenhorn's Luck** — Best beginner team: the best-placed team whose members are all first-timers.
- **The Prospector's Report** — Best memo, judged by the board: the award for thinking rather than code. A one-to-two-page memo on how you'd attack the problem and why; open to anyone registered, with or without leaderboard submissions.
- **Fool's Gold** (`award--joke`) — Biggest drop from the public to the private leaderboard among the public top 10.

Notice box below: "Prizes are real. We'll announce what they are here and on Discord."

### Register — "Stake Your Claim" WANTED poster on the corkboard (§5.16)

A poster, max 760px, on paper-50: outer 3px ink-800 border, inner 1px border inset 8px, four small rust-500 "nail" dots in the corners, shadow `8px 8px 0 ink-800`. Inside, top to bottom: "WANTED" (Alfa, `clamp(3rem, 8vw, 5rem)`, tracking .04em) → "PROSPECTORS" (Oswald 600, tracking .3em, rust-500) → a 96px engraving medallion → the italic line "Reward: prizes, bragging rights, and a project for your résumé." → double rule → the Google Form iframe (100% width; heights in six width tiers, from 2380px on desktop to 3450px below 360px, measured against the live form with `npm run form-height`; `loading="lazy"`; `title="Quant Rush registration form"`) → mono link "Form not loading? Open it in a new tab →". When no form URL is configured: a dashed placeholder box with a `REGISTRATION OPENS OCT 13` stamp.

### FAQ (short) — paper-100

Eyebrow `PROSPECTOR'S HANDBOOK`, H2 "Questions from the camp". Six accordions on the ledger page (§5.20), then the link "Read the full rules & FAQ →". The harbor engraving bleeds in from the right.

### Footer (`.on-dark`, after the flipped tear)

Three columns (stacked on mobile):

1. The QFE logo (`public/brand/logo-qfe.png`, the club's teal mark on a 96px paper-50 disc with an ink ring; a text badge is the fallback when no logo path is set) plus "Quantitative Finance & Entrepreneurship Club · Santa Monica College" and a two-line blurb.
2. Contact — `qfec.smc@gmail.com`, Instagram `@qfecsmc`, "Meetings: Tuesdays 11:15–12:15, MSB 207".
3. Quick links — Workshops, Rules & FAQ, Kaggle page (`COMING SOON` badge), Register.

Below: a faint candlestick strip, a hairline, then mono `.75rem`: "© 2026 QFE Club · Santa Monica College · Quant Rush is student-run and not affiliated with Kaggle. All engravings are in the public domain; the one behind this footer shows San Francisco Harbor during the gold rush (J. P. Young, 1912)." Every engraving on the site carries a visible credit; `CREDITS.md` in the repository is for maintainers only and is never referenced on the site.

## 7. Other pages

- **Workshops (`/workshops`)** — a dark header band: eyebrow `WORKSHOPS · EVERY TUESDAY · MSB 207`, H1 "Picks & Shovels", lead, an engraving (miners with tools) gold-masked on the right, then a torn edge. Then a two-column grid (one on mobile) of `workshop` cards: a tear-off date block on the left (rust month strip, Alfa day numeral 2.5rem, mono weekday) and, on the right, title, summary, status badge (UPCOMING / TODAY / DONE), and a materials row (`SLIDES · NOTEBOOK`, dashed "coming soon" when empty). DONE cards sit at 80% opacity.
- **Rules & FAQ (`/rules`)** — a dark header band: eyebrow `RULES · ELIGIBILITY · FAQ`, H1 "The Miner's Code", an engraving (assay office or scales). Body at ≥ 900px: a sticky left table of contents (Oswald caps, § numbers, current item gold) and content at ≤ 70ch on the right: §1 Eligibility, §2 Teams, §3 Data & Evaluation (public vs. private explained), §4 Awards, §5 Code of Conduct (a double-bordered poster box with five rules), §6 FAQ (full). Undecided lines carry the `TO BE FINALIZED` stamp.
- **404** — dark, H1 "No gold here.", mono `404 · CLAIM NOT FOUND`, button "Back to camp", and an engraving if a suitable public-domain one is found.

## 8. Motion

Easing `cubic-bezier(.2, .8, .2, 1)`; durations: micro 150ms, standard 300ms, reveal 500ms.

- Hero load: elements fade up 12px with an 80ms stagger; candlesticks grow (600ms, 25ms stagger); gold dust drifts continuously (§5.21).
- Scroll reveals: `.reveal` elements via `IntersectionObserver` (threshold .15, once).
- Timeline: line draws in over 1.2s, nodes pop, the current node pulses on a 2s loop.
- Ticker loops over 60s; buttons and cards lift and press; accordion content fades in over 200ms.
- `prefers-reduced-motion: reduce`: ticker static; no reveals, draws, pulses, bounces, or glints; only opacity fades of ≤ 150ms remain.

## 9. Engravings and brand assets

### Engravings

Public domain only. Verify each item's license page before downloading and record title, source URL, date, and the license statement in `CREDITS.md` at the repository root. Sources:

- Wikimedia Commons: `Category:California Gold Rush` and its subcategories (`California Gold Rush in art`, `Sailing cards`, `People of the California Gold Rush`, `Ott's Assay Office`).
- Library of Congress Prints & Photographs, items marked "No known restrictions on publication" (download through a browser; the site blocks scripted fetches).
- Internet Archive Book Images on Flickr Commons (public domain) for small medallion crops: panning, pickaxe, scales.

Processing: keep each image ≤ 1800px wide and ≤ 300KB (JPEG or WebP); three to five images for v1. For dark sections, produce alpha-mask PNGs (grayscale → invert → alpha) with a small `sharp` script once the Astro project exists; the preview uses CSS blend modes on the raw scans.

### Brand assets (SVG)

- `public/brand/emblem.svg` — a circular stamp: outer ring text `QUANT RUSH · SMC · 2026 ·`, center a pickaxe crossed with a rising candlestick and a nugget at the crossing. Monochrome, so it works in ink or gold. The crossing alone is the favicon.
- `src/assets/icons/sprite.svg` — 24px grid, 2px stroke, round caps, `currentColor`: pickaxe, shovel, cart, nugget, claim-stake, lantern, scales, map, candlestick, trophy, calendar, laptop, team, question, envelope, instagram.
- Social preview image: `public/brand/og.jpg` (1200×630). Its source is the unlisted page `/og/` (`src/pages/og.astro`): ticker strip, eyebrow, the wordmark, tagline, three date/format pills, the gold emblem on the right, the Sluice engraving gold-masked behind, static gold dust, a candlestick row, and the domain. With the dev server running, `npm run og` screenshots it with headless Chrome. The engraving on the card uses the original file rather than an optimized copy so the screenshot never waits on image processing.

## 10. Accessibility and responsive rules

- Contrast per §2. `ink-400` and `gold-500` never carry small text on paper.
- `:focus-visible`: a 3px outline, gold-300 on dark and ink-800 on paper, offset 3px. Hit targets ≥ 44px.
- Skip link; one H1 per page; landmarks (`header`, `nav`, `main`, `footer`); native `<details>`; the iframe has a title.
- Ticker `aria-hidden` with a visually hidden summary; countdown `aria-live="off"` with a visually hidden date; decorative SVGs `aria-hidden`.
- Check 375, 640, 900, and 1200px: no horizontal scroll, wordmark on two lines on mobile, timeline vertical below 900, nav collapsed below 900, cards 1 → 2 → 3 columns, footer stacked, form iframe height per breakpoint.

## 11. Implementation

The Astro site implements this spec. Where things live:

- `src/styles/tokens.css` — colors, type, spacing, and the `.on-dark` remap (§2–§4)
- `src/styles/base.css` — reset, body text, paper grain, focus, reduced motion
- `src/styles/components.css` — every component in §5 and the home compositions in §6
- `src/styles/pages.css` — inner-page header band, workshops grid, rules layout, 404
- `src/components/` — one component per §5 item (`Ticker`, `Nav`, `Countdown`, `Candles`, `TornEdge`, `Engraving`, `Trail`, …)
- `src/assets/engravings/` and `CREDITS.md` — the engravings and their licenses
- `public/brand/emblem.svg`, `src/assets/icons/sprite.svg` — brand assets (§9)

Every token and component is on one page at `/styleguide`, available on the dev server and on Cloudflare previews but never published to production. Fonts are self-hosted via `@fontsource` packages; the variable families register as "Oswald Variable", "Source Serif 4 Variable", and "JetBrains Mono Variable".

## Appendix A — Where the copy lives

The words on the site are not duplicated here, so they cannot drift. Edit them at the source:

| Copy | File |
|---|---|
| Name, tagline, subtitle, meta description, ticker pin, club blurb | `src/config/site.ts` |
| Hero lines | `src/components/Hero.astro` |
| About clipping | `src/components/Dispatch.astro` |
| Highlights (ticket, tag, certificate) | `src/components/Highlights.astro` |
| Timeline and workshop cards | `src/data/schedule.json` |
| How it works | `src/components/Mine.astro` |
| Awards | `src/data/awards.json` |
| FAQ | `src/data/faq.json` |
| Rules | `src/pages/rules.astro` |

Copy rules: the competition is open to all California community college students and is fully online; the Tuesday workshops are separate, in person, and for SMC students, so competition copy (rules, FAQ, how it works) never depends on them. The site never describes how the dataset was prepared; it only says the data comes from a legitimate, lawful source and must not be traced back.
