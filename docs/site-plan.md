# Site Plan: Quant Rush

Status: **v1 built** (Astro; see the README). This file records the scope and content decisions behind it. Competition decisions are in the private competition repository.

## Identity

- **Name:** Quant Rush
- **Tagline:** "Strike signal in the noise."
- **Subtitle:** SMC's first online quant competition
- **Organizer:** Quantitative Finance & Entrepreneurship (QFE) Club, Santa Monica College
- **Theme:** Gold Rush, with a stock-market texture (ticker tape, candlesticks, monospaced numbers) layered on top.

Why the theme works: the California Gold Rush was the original startup boom (ties to Entrepreneurship), "mining for alpha" is a natural quant joke, and the public/private leaderboard maps to "what glitters" vs. the assay office.

### Vocabulary

| Real thing | In-theme name |
|---|---|
| Kickoff / registration | Stake Your Claim |
| Workshops | Picks & Shovels |
| Public leaderboard | What Glitters |
| Submission deadline / private leaderboard | The Assay |
| Overfitting joke award | Fool's Gold |
| Participants | Prospectors |

Use the vocabulary as flavor on headings and labels. Plain-language descriptions always accompany it so beginners are never confused.

Care point: the real Gold Rush history includes harm to Native Californians and immigrants. Keep imagery to light symbols (pickaxe, mine cart, gold nuggets, claim stakes, prospector silhouettes). No caricatures of people.

## Visual Design

The full visual spec lives in **`design.md`** (concept, color tokens, typography, components, page compositions, motion, engravings, accessibility). Every token and component is visible at `/styleguide` on the dev server and on Cloudflare previews. Summary of what was decided:

- Dark hero and ticker → torn-paper edge → parchment content sections → dark footer.
- Poster typography (Alfa Slab One, Oswald, Source Serif 4, JetBrains Mono) and line icons built in code, plus duotoned public-domain 19th-century engravings (credits in `CREDITS.md`).
- Mobile first; test at 375px. All motion respects `prefers-reduced-motion`.
- The QFE logo is not the palette source. Until the real file arrives, the footer shows a circular text badge in the same slot.

## Pages

### 1. Home (`/`)

1. **Header / nav:** wordmark, links (Home, Workshops, Rules & FAQ), a gold "Register" button.
2. **Ticker tape** (see above).
3. **Hero:** "Quant Rush", tagline, subtitle, key dates, countdown (to the next milestone), primary button "Stake Your Claim" (scrolls to the form), secondary button "How it works".
4. **About:** 3 to 4 sentences. What it is, who it is for (all California community college students, no experience needed), why it matters.
5. **Highlights:** three cards: Fully online, Weekly workshops, Prizes.
6. **Timeline:** the 6-week schedule from `src/data/schedule.json`, with the current phase highlighted.
7. **How it works:** 4 steps: Register, join on Kaggle, build and submit models, watch the leaderboard.
8. **Awards & prizes:** award cards (names TBD) and a line that prizes exist, details to be announced. No amounts or items listed.
9. **Register:** embedded Google Form with an "open in new tab" fallback link.
10. **FAQ (short):** 5 to 6 questions; link to the full FAQ.
11. **Organizer & footer:** QFE Club blurb, email `qfec.smc@gmail.com`, Instagram `@qfecsmc`, meeting time and place (Tuesdays 11:15 a.m. – 12:15 p.m., MSB 207).

### 2. Workshops (`/workshops`)

- Intro paragraph: every Tuesday, plus how Q&A works.
- One card per session (10/13 through 12/1): date, title, one-line summary, status badge (Upcoming / Done). Materials links (slides, notebooks) added later.
- Content comes from `src/data/schedule.json`, shared with the home-page timeline. Material links stay empty until each session's slides and notebooks are published.

### 3. Rules & FAQ (`/rules`)

- **Eligibility:** all California community college students; verified at prize time against the registration list. The Tuesday workshops are separate and for SMC students.
- **Team rules:** size and submission limits are TBD.
- **Data and evaluation:** high-level only until the dataset is set; public vs. private leaderboard explanation.
- **Prizes and awards:** how winners are chosen, including exact criteria for joke awards.
- **Code of conduct:** no cheating (including attempts to identify the original data), no sharing private solutions across teams.
- **Full FAQ.**
- Anything undecided is marked "To be finalized".

### Later (not in v1)

Leaderboard (link to Kaggle), Data & Problem, Winners.

## Registration (Google Form)

Embedded on Home. Final decision: Google Form only, no custom backend.

**Fields:**

1. Full name
2. SMC student email (verify the exact domain before launch)
3. Kaggle username (required; Kickoff includes a "make a Kaggle account" walkthrough)
4. Experience level: none / some / experienced (drives the "Best Beginner" award)
5. Team: looking for teammates / already have a team (names) / solo
6. How did you hear about us? (optional)
7. Agreement to the rules (checkbox)

**Form settings:** do not require Google sign-in; do not limit to one response; no file upload questions; do not collect student IDs; responses go to a Google Sheet shared with board members only.

## Technical Approach

- **Astro** static site. Interactive bits (ticker, countdown, candlesticks, timeline, nav) are small vanilla scripts; React islands stay available if something richer is needed.
- Deployed to **GitHub Pages** through GitHub Actions. The repository must be public for the free plan.
- Engravings and the icon sprite live in `src/assets/` (processed at build); the emblem and, later, the club logo live in `public/brand/`. Licenses are in `CREDITS.md`.
- **One config file** (for example `src/config/site.ts`) holds name, tagline, dates, form URL, Kaggle URL, contact info, and the logo path. Renaming the competition or swapping the form is a one-file change.
- **Content separate from layout:** timeline, workshops, FAQ, and awards live in Markdown or JSON data files so board members can edit text without touching components.
- No secrets, no server code, no analytics at first.

## Placeholders to Replace Later

| Item | Placeholder in v1 |
|---|---|
| QFE logo | Done: `public/brand/logo-qfe.png` in the footer |
| Kaggle competition URL | "Coming soon" badge |
| Google Form URL | Done: embedded on the home page (URLs in `src/config/site.ts`) |
| Submission deadline time | Countdown assumes 11:59 p.m. Pacific on Sun 11/22 |
| Prizes | "Prizes exist, details to be announced" |
| Problem and dataset | "To be announced" |
| Award names | Fool's Gold and a few generic ones |

## Milestones

Target: a live v1 around **Tue 10/13** (Kickoff).

1. Scaffold the project, theme tokens, shared layout, ticker, nav, footer.
2. Home page complete with placeholder content.
3. Workshops and Rules & FAQ pages.
4. Embed the real Google Form, check on mobile, deploy to GitHub Pages.

## Open Questions

- Rule details and final award names, once the competition repository decides them
