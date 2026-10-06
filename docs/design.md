# Quant Rush — UI Design Spec

Status: **v1, approved direction.** This is the single source of truth for the look of the site. `site-plan.md` covers scope and content; this file covers how it looks and moves. A living preview of everything here is in `design-preview/` (open it through a local static server, see "Preview" at the end).

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
- Paper grain: an SVG `feTurbulence` noise data-URI tiled at 300px, opacity .06, `mix-blend-mode: multiply`, on every `.paper` section.
- Home band order: Hero (dark) → tear → About + Highlights (paper-100) → Timeline (paper-100) → How it works (paper-200 band with double rules) → Awards (paper-100) → Register (paper-200 band) → FAQ (paper-100) → flipped tear → Footer (dark).

## 5. Components

### 5.1 Ticker (top, not sticky)

36px tall (32px mobile), ink-900, bottom hairline gold-700 at 40%. JetBrains `.8125rem`. Up items green-400, down rust-300, neutral paper-200. Separator `◆` in gold-700 with 32px margins. The track is duplicated twice and animated `translateX(-50%)` over 60s, linear, infinite; it pauses on hover and focus. `aria-hidden="true"` with a visually hidden summary ("Quant Rush opens Oct 13, deadline Nov 22"). Reduced motion: static, overflow hidden, right-edge fade.

Items come from config: `QNTR ▲ 18.49`, `ALPHA ▲ 4.20%`, `SIGNAL ▲ 2.45%`, `NOISE ▼ 0.31%`, `OVERFIT ▼ 99.00%`, `PAYDIRT ▲ 18.49%`, `BIAS ▼ 3.14%`, `VARIANCE ▲ 2.71%`, `SHARPE ▲ 1.00`, `LEAKAGE ▼ 100%`, `COFFEE ▲ 12.00%`, plus a computed `T-47 DAYS TO THE ASSAY`. Optional pinned announcement chip (gold fill, ink text): `★ DATASET DROPS OCT 13`.

### 5.2 Nav (sticky)

64px (56px mobile), ink-900. A gold-700 at 40% bottom border fades in after 8px of scroll. Left: emblem 28px + "QUANT RUSH" in Alfa `1.125rem` paper-50. Links: Oswald 500 caps `.875rem` tracking .12em paper-200; hover and active state gold-300 with a 2px gold underline growing from the left. Right: a small primary button "REGISTER". Below 900px: a hamburger (bars → X) opens a full-screen ink-900 overlay with Alfa `2.5rem` links, the Register button, and a contact line; body scroll locked; Esc closes. The skip link is the first element in the DOM.

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

paper-200 background, 4px gold-500 left border, mono eyebrow ("ON THE RECORD"), serif text. Used for "Prizes are real; details at Kickoff" and for rules marked TBD.

### 5.8 Accordion (FAQ)

Native `<details>`. Each row has a bottom hairline; the summary is Oswald 600 `1.0625rem` ink-800 with a `+` in gold-800 on the right that rotates 45° when open; content is serif ink-600. Max width 760px.

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

## 6. Home page composition

### Hero (`.on-dark`)

- Min-height `calc(100svh − ticker − nav)`, capped at 880px; centered column, max 880px.
- Background stack: ink-900 → radial gold glow (ellipse at 50% 70%, gold-500 at 10% to transparent) → engraving backdrop (miners at a long tom), gold-masked, bottom-anchored, faded out above 40% height → gold flecks (two pseudo-element layers of about eight radial-gradient dots each, twinkling 3–6s with different delays) → candlestick row along the bottom edge.
- Content, top to bottom, with an 80ms staggered reveal: eyebrow `SANTA MONICA COLLEGE · QFE CLUB PRESENTS` (gold-300, with `— ◆ —` ornaments) → wordmark → tagline → facts stamps → countdown → buttons → scroll cue → engraving credit (bottom-right, mono `.6875rem`, paper at 60%).
- **Wordmark:** "QUANT RUSH", Alfa, `--fs-display`, fill paper-50, `-webkit-text-stroke: 1.5px gold-500`, block extrusion via a `::before` duplicate (`attr(data-text)`) in gold-700 offset 6px/6px (4px on mobile). Breaks to two lines below 640px. Nice-to-have: a diagonal glint sweep every 7s.
- **Tagline:** "Strike signal in the noise." in Source Serif italic, `--fs-lead`, paper-200. Below it, Oswald caps `.8125rem` paper-200 at 80%: `SMC'S FIRST ONLINE QUANT COMPETITION · OPEN TO ALL SMC STUDENTS`.
- **Facts stamps:** three mono pills (`OPENS OCT 13` · `THE ASSAY NOV 22` · `100% ONLINE`), 1.5px paper-300 at 60% border, rotated −2°, 1.5°, −1°; wrap on mobile.
- **Buttons:** primary `STAKE YOUR CLAIM →` (scrolls to Register), secondary `HOW IT WORKS`. Full width and stacked below 640px.
- **Scroll cue:** mono `▼ DIG IN`, bouncing on a 2s loop (off under reduced motion).

### About ("Dispatch") — paper-100, directly under the tear

Two columns at ≥ 900px. Left: eyebrow `FROM THE QFE CLUB`, one paragraph with a drop cap (what it is, who it is for, no experience needed, why it matters), and a text link to the rules. Right: a 160px engraving medallion (a prospector) with credit. Stacks on mobile, medallion first at 120px.

### Highlights — three poster cards

1. **100% Online** (laptop icon) — "Compete from anywhere. Submissions and the leaderboard live on Kaggle."
2. **Picks & Shovels** (pickaxe and shovel) — "Every Tuesday, 11:15–12:15 in MSB 207: a workshop, then office hours. We teach the tools; you dig."
3. **Real Prizes** (nugget) — "For the top of the private leaderboard, the best beginner, and a few surprises. Details at Kickoff."

### Timeline — "The Claim Trail" (rising stock line)

Left-aligned header: eyebrow `SIX WEEKS · OCT 13 → NOV 22`, H2 "The Claim Trail", lead "Every Tuesday is a workshop. One Sunday is the Assay."

- **≥ 900px:** an SVG chart (1280×380 viewBox). A polyline rises from bottom-left to top-right through eight nodes with slight jitter, like an uptrend. The area under the line is gold-500 at 8%. A faint dashed horizontal grid in paper-300. The past segment is solid ink-800 at 2.5px; the future segment is dashed gold-700. Nodes are 14px paper-50 circles with a 2.5px ink ring; the current node is gold-500 with a pulsing halo; "The Assay" is a larger rust-500 diamond with a `DEADLINE` stamp. Labels alternate above and below with thin leader lines: date (mono rust-500 `.8125rem`), title (Oswald 600 caps 1rem), one-liner (serif `.9375rem` ink-600, ≤ 22ch). A rotated y-axis joke label `SKILL →` in Oswald ink-400. The line draws in on reveal (stroke-dashoffset, 1.2s) and the nodes pop in staggered.
- **< 900px:** a vertical rail at x = 20px (3px: solid ink for the past, dashed gold for the future); same nodes; items stacked. The current item gets a gold left bar and a `YOU ARE HERE` stamp.
- Data lives in `timeline.json` (date, title, blurb, kind: workshop | deadline | wrapup). Current and past states are computed by date in a small script; done items get `✓ DONE`.

### How it works — paper-200 band, four steps

Columns at ≥ 900px joined by a dashed gold-700 line behind 56px gold circles holding Alfa numerals 01–04; icon + Oswald title + serif text. Vertical with a left rail on mobile.

1. **Stake your claim** — Fill in the form below. Two minutes.
2. **Get your gear** — Make a free Kaggle account and join the Quant Rush competition page.
3. **Dig** — Download the data, train models, submit predictions. Come Tuesdays for workshops and office hours.
4. **The Assay** — Sunday, Nov 22: submissions close. The private leaderboard shows who struck real gold.

### Awards — "The Claims"

A 2×2 grid (one column on mobile) of award cards. Names are placeholders, editable in `awards.json`:

- **Mother Lode** — 1st, 2nd, 3rd on the private leaderboard (three medal dots: gold, silver, bronze).
- **Greenhorn's Luck** — Best beginner: top finisher among self-declared first-timers.
- **Assayer's Choice** — Best write-up: the clearest explanation of a method, judged by the board.
- **Fool's Gold** (`award--joke`) — Biggest drop from the public to the private leaderboard. A joke award with written rules.

Notice box below: "Prizes are real. We'll announce what they are at Kickoff."

### Register — "Stake Your Claim" WANTED poster (paper-200 band)

A poster, max 760px, on paper-50: outer 3px ink-800 border, inner 1px border inset 8px, four small rust-500 "nail" dots in the corners, shadow `8px 8px 0 ink-800`. Inside, top to bottom: "WANTED" (Alfa, `clamp(3rem, 8vw, 5rem)`, tracking .04em) → "PROSPECTORS" (Oswald 600, tracking .3em, rust-500) → a 96px engraving medallion → the italic line "Reward: prizes, bragging rights, and a project for your résumé." → double rule → the Google Form iframe (100% width; height 1400px desktop / 1700px mobile, tuned against the real form; `loading="lazy"`; `title="Quant Rush registration form"`) → mono link "Form not loading? Open it in a new tab →". When no form URL is configured: a dashed placeholder box with a `REGISTRATION OPENS OCT 13` stamp.

### FAQ (short) — paper-100

Eyebrow `PROSPECTOR'S HANDBOOK`, H2 "Questions from the camp". Six accordions, then the link "Read the full rules & FAQ →".

### Footer (`.on-dark`, after the flipped tear)

Three columns (stacked on mobile):

1. QFE logo slot — until the real file arrives, a 96px circular text badge (paper-50, double ink ring, Oswald "QFE / SMC") — plus "Quantitative Finance & Entrepreneurship Club · Santa Monica College" and a two-line blurb.
2. Contact — `qfec.smc@gmail.com`, Instagram `@qfecsmc`, "Meetings: Tuesdays 11:15–12:15, MSB 207".
3. Quick links — Workshops, Rules & FAQ, Kaggle page (`COMING SOON` badge), Register.

Below: a faint candlestick strip, a hairline, then mono `.75rem`: "© 2026 QFE Club · Santa Monica College · Quant Rush is student-run and not affiliated with Kaggle. Engravings are public domain; see credits."

## 7. Other pages

- **Workshops (`/workshops`)** — a dark header band: eyebrow `WORKSHOPS · EVERY TUESDAY · MSB 207`, H1 "Picks & Shovels", lead, an engraving (miners with tools) gold-masked on the right, then a torn edge. Then a two-column grid (one on mobile) of `workshop` cards: a tear-off date block on the left (rust month strip, Alfa day numeral 2.5rem, mono weekday) and, on the right, title, summary, status badge (UPCOMING / TODAY / DONE), and a materials row (`SLIDES · NOTEBOOK · RECORDING`, dashed "coming soon" when empty). DONE cards sit at 80% opacity.
- **Rules & FAQ (`/rules`)** — a dark header band: eyebrow `RULES · ELIGIBILITY · FAQ`, H1 "The Miner's Code", an engraving (assay office or scales). Body at ≥ 900px: a sticky left table of contents (Oswald caps, § numbers, current item gold) and content at ≤ 70ch on the right: §1 Eligibility, §2 Teams, §3 Data & Evaluation (public vs. private explained), §4 Awards, §5 Code of Conduct (a double-bordered poster box with five rules), §6 FAQ (full). Undecided lines carry the `TO BE FINALIZED` stamp.
- **404** — dark, H1 "No gold here.", mono `404 · CLAIM NOT FOUND`, button "Back to camp", and an engraving if a suitable public-domain one is found.

## 8. Motion

Easing `cubic-bezier(.2, .8, .2, 1)`; durations: micro 150ms, standard 300ms, reveal 500ms.

- Hero load: elements fade up 12px with an 80ms stagger; candlesticks grow (600ms, 25ms stagger); flecks twinkle.
- Scroll reveals: `.reveal` elements via `IntersectionObserver` (threshold .15, once).
- Timeline: line draws in over 1.2s, nodes pop, the current node pulses on a 2s loop.
- Ticker loops over 60s; buttons and cards lift and press; accordion content fades in over 200ms.
- `prefers-reduced-motion: reduce`: ticker static; no reveals, draws, pulses, bounces, or glints; only opacity fades of ≤ 150ms remain.

## 9. Engravings and brand assets

### Engravings

Public domain only. Verify each item's license page before downloading and record title, source URL, date, and the license statement in `assets/CREDITS.md`. Sources:

- Wikimedia Commons: `Category:California Gold Rush` and its subcategories (`California Gold Rush in art`, `Sailing cards`, `People of the California Gold Rush`, `Ott's Assay Office`).
- Library of Congress Prints & Photographs, items marked "No known restrictions on publication" (download through a browser; the site blocks scripted fetches).
- Internet Archive Book Images on Flickr Commons (public domain) for small medallion crops: panning, pickaxe, scales.

Processing: keep each image ≤ 1800px wide and ≤ 300KB (JPEG or WebP); three to five images for v1. For dark sections, produce alpha-mask PNGs (grayscale → invert → alpha) with a small `sharp` script once the Astro project exists; the preview uses CSS blend modes on the raw scans.

### Brand assets (SVG)

- `assets/brand/emblem.svg` — a circular stamp: outer ring text `QUANT RUSH · SMC · 2026 ·`, center a pickaxe crossed with a rising candlestick and a nugget at the crossing. Monochrome, so it works in ink or gold. The crossing alone is the favicon.
- `assets/icons/sprite.svg` — 24px grid, 2px stroke, round caps, `currentColor`: pickaxe, shovel, cart, nugget, claim-stake, lantern, scales, map, candlestick, trophy, calendar, laptop, team, question, envelope, instagram.
- `assets/brand/og.svg` → a 1200×630 PNG for social previews: dark background, wordmark, tagline, dates, candlestick row.

## 10. Accessibility and responsive rules

- Contrast per §2. `ink-400` and `gold-500` never carry small text on paper.
- `:focus-visible`: a 3px outline, gold-300 on dark and ink-800 on paper, offset 3px. Hit targets ≥ 44px.
- Skip link; one H1 per page; landmarks (`header`, `nav`, `main`, `footer`); native `<details>`; the iframe has a title.
- Ticker `aria-hidden` with a visually hidden summary; countdown `aria-live="off"` with a visually hidden date; decorative SVGs `aria-hidden`.
- Check 375, 640, 900, and 1200px: no horizontal scroll, wordmark on two lines on mobile, timeline vertical below 900, nav collapsed below 900, cards 1 → 2 → 3 columns, footer stacked, form iframe height per breakpoint.

## 11. Preview

`design-preview/` is a static mock of the home page plus a style tile (swatches, type, buttons, badges, cards). Its three stylesheets are written to be copied as-is into the Astro project:

- `styles/tokens.css` — colors, type, spacing, and the `.on-dark` remap
- `styles/base.css` — reset, fonts, body text, paper grain, focus, reduced motion
- `styles/components.css` — every component in §5

Open it with a static server from the repository root (for example `python3 -m http.server 4173`) and visit `/docs/design-preview/`. `file://` also works, except that the icon sprite loads only over HTTP.

## Appendix A — Copy deck (home)

**Hero**
- Eyebrow: SANTA MONICA COLLEGE · QFE CLUB PRESENTS
- Wordmark: QUANT RUSH
- Tagline: Strike signal in the noise.
- Subline: SMC'S FIRST ONLINE QUANT COMPETITION · OPEN TO ALL SMC STUDENTS
- Stamps: OPENS OCT 13 · THE ASSAY NOV 22 · 100% ONLINE
- Countdown label: CLAIM STAKING OPENS IN
- Buttons: STAKE YOUR CLAIM → / HOW IT WORKS

**About**
Quant Rush is a six-week online competition where SMC students build models on a disguised, historical financial dataset. Every submission updates a public leaderboard; a private one, revealed at the end, decides the winners. No finance background and no Kaggle experience needed. Bring curiosity, a laptop, and a willingness to be wrong a few hundred times before you're right. The Quantitative Finance & Entrepreneurship Club runs the show and teaches the tools every Tuesday.

**Timeline**
| Date | Title | Blurb |
|---|---|---|
| Tue Oct 13 | Stake Your Claim — Kickoff | Rules, Kaggle setup, team formation. The competition opens. |
| Tue Oct 20 | Picks & Shovels I | Python, pandas, your first Kaggle notebook. Leave with a baseline submitted. |
| Tue Oct 27 | Reading the Vein | Exploring the data and understanding the metric. |
| Tue Nov 3 | Refining the Ore | Feature engineering and baseline models. |
| Tue Nov 10 | What Glitters | Validation and overfitting: why the public leaderboard lies. |
| Tue Nov 17 | The Last Dig | Office hours, ensembling, final submissions. |
| Sun Nov 22 | The Assay — Deadline | Submissions close. The private leaderboard decides. |
| Tue Dec 1 | Paydirt — Wrap-up | Winners announced. Top teams walk through their solutions. |

**FAQ**
- Do I need experience? — No. The first two workshops take you from zero to a submitted baseline. Experienced folks can skip ahead; beginners have their own award.
- Is it free? — Yes. Registration, Kaggle, and the workshops are all free.
- Can I team up? — Yes, in teams of up to N (to be finalized). Solo is fine too. Need teammates? Say so on the form and we'll match you at Kickoff.
- Do I need to be a finance major? — No. If you can run a Python notebook, or want to learn, you're in.
- What is Kaggle? — A free platform for data-science competitions. You upload predictions, it scores them and ranks everyone on a leaderboard. We walk you through it at Kickoff.
- What do I win? — Prizes for the top of the private leaderboard, the best beginner, the best write-up, and one joke award. The actual prizes are announced at Kickoff.

**Footer blurb**
A student club at Santa Monica College for people who like markets, math, and building things. Meetings every Tuesday; everyone is welcome.
