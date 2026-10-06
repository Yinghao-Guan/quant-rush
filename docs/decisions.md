# Decisions

A running log of what has been decided and what is still open. Newest decisions go at the top of each section.

## Decided

| Topic | Decision |
|---|---|
| Organizer | SMC Quantitative Finance & Entrepreneurship (QFE) Club |
| Edition | First time the club hosts this competition |
| Theme | Quantitative finance |
| Audience | All SMC students |
| Format | Fully online; weekly Tuesday meetings used for workshops and Q&A |
| Duration | 6 weeks of competition (10/13 – 11/22) plus a 12/1 wrap-up. See `timeline.md`. |
| Prizes | Yes, with a budget. The specific prizes are not decided; the website may mention that prizes exist without naming them. |
| Data approach | **Historical data only, no live data.** Data is processed so participants cannot trace it back to the original source and cheat. Two sets: a public set (public leaderboard) and a private set (final ranking). Participants iterate on their models against these. |
| Tracks | **Single track** (one Kaggle competition, one dataset, one metric). Variety comes from multiple awards instead: overall top places, plus fun and special awards (e.g. a joke award for the biggest public-to-private leaderboard drop). Award list to be designed later. |
| Site scope | 3 pages: Home, Workshops, Rules & FAQ. English only. Leaderboard, Data & Problem, and Winners pages come later. |
| Site tech | Astro (static site, deployable to GitHub Pages), with React islands for rich UI where needed. Built mainly by a coding agent for speed of building and updating. |
| Registration | **Embedded Google Form only.** No custom backend, accounts, or dashboard. Kaggle itself serves as the participant dashboard (submissions, leaderboard). Form should not require Google sign-in; include an "open in new tab" fallback link; do not collect student IDs; collect the Kaggle username. Responses go to a Google Sheet shared only with board members. |
| Name | **Quant Rush**. A quick web search found no existing competition or company with this name; do a final check on Kaggle before launch. |
| Visual direction | **Gold Rush theme** with a stock-market texture (ticker tape, candlesticks, monospaced numbers). Not tied to the club logo. Details in `site-plan.md`. Deep-sea sonar was the runner-up. |
| Logo | The original QFE logo file is not available yet; the site uses a circular text badge in the footer as a temporary stand-in and swaps the real file in later. |
| Page rhythm | Dark hero and ticker → torn-paper edge → parchment content → dark footer. Full spec in `design.md`. |
| Art style | Poster typography and line icons built in code, plus real public-domain 19th-century engravings, always duotoned. Every image is license-checked and listed in `assets/CREDITS.md`. |
| Fonts | Alfa Slab One (display), Oswald (labels), Source Serif 4 (body), JetBrains Mono (numbers), from Google Fonts. |
| Scripts | v1 needs no React: ticker, countdown, candlesticks, timeline, and nav are small vanilla scripts. Islands remain an option. |
| Design preview | `docs/design-preview/` is a static mock of the home page plus a style tile; its three stylesheets are the ones the Astro project will use. |
| Platform (proposed) | Kaggle Community Competition for submissions, leaderboard, and teams; this website for information, rules, timeline, and registration guidance. Not yet confirmed. |

## Team

- About 3 members (including the project owner) can work on problem design, data preparation, and workshops.
- Other board members handle non-technical tasks (promotion, registration, logistics, prizes).

## Open

- Final tagline
- Original QFE logo file
- Award list and prize allocation
- Specific problem and dataset
- How the data is anonymized and how the public/private split is made
- Evaluation metric
- Prize details and amounts
- Team rules (size, submission limits, eligibility verification)
- Website scope and tech stack
