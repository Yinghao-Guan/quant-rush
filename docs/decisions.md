# Decisions (website)

Website decisions only. Competition decisions (format, schedule, data, awards, prizes, team) live in the private competition repository at `../quant-rush-competition/docs/`. Nothing about the data source, the anonymization, or the answers belongs in this repository: it is public.

Newest decisions go at the top of each section.

## Decided

| Topic | Decision |
|---|---|
| Branches and previews | `main` is production (GitHub Pages, smcqfec.com); day-to-day work happens on `dev` and is merged into `main` to go live. Cloudflare Pages (project `quant-rush`) builds previews of every other branch and of pull requests; its production auto-deploys are off. Preview builds are detected through `CF_PAGES`, show a "Preview build" bar, and are `noindex`. GitHub Pages has no public preview-deployment feature (the `preview` input of `actions/deploy-pages` is private alpha as of 2026-10). |
| Community | A Discord server ("QFEC") is linked from the nav, the mobile menu, the footer, the FAQ, and the rules page. The invite URL lives in `SITE.links.discord`; it must be an invite set to never expire. |
| Share image | `public/brand/og.jpg` (1200×630), rendered from the unlisted `/og/` page by `npm run og`. Pages declare it with Open Graph and `summary_large_image` Twitter tags. |
| Hero motion | The static gold flecks became a canvas particle field (`GoldDust.astro`): fine rising dust, out-of-focus motes, and occasional glints. |
| Repository split | The website and the competition are separate repositories (decided 2026-10-06). This one is public (GitHub Pages); the competition repository is private. Public facts flow one way, from the competition into `src/config/site.ts`, `src/data/*.json`, and `src/pages/rules.astro`. |
| Deployment | GitHub Pages via `.github/workflows/deploy.yml` from the public repository `Yinghao-Guan/quant-rush`, served on the custom domain **smcqfec.com** (so `BASE_PATH` is `/`). Internal links still go through `withBase()` in `src/lib/paths.ts` in case the site ever moves back under a sub-path. |
| Style guide | `/styleguide` (unlinked, `noindex`) shows every token and component. It replaced the earlier static `docs/design-preview/`, which was removed once the Astro site existed. |
| Site build | Astro 7 static site, scaffolded 2026-10-06. Engravings live in `src/assets/engravings/` and are converted to WebP at build; the emblem is in `public/brand/`; licenses in `CREDITS.md` at the repo root. |
| Site tech | Astro, no UI framework: the ticker, countdown, candlesticks, timeline, and nav are small vanilla scripts. Built mainly by a coding agent for speed of building and updating. |
| Fonts | Alfa Slab One (display), Oswald (labels), Source Serif 4 (body), JetBrains Mono (numbers), self-hosted via `@fontsource`. |
| Art style | Poster typography and line icons built in code, plus real public-domain 19th-century engravings, always duotoned. Every image is license-checked and listed in `CREDITS.md`. |
| Page rhythm | Dark hero and ticker → torn-paper edge → parchment content → dark footer. Full spec in `design.md`. |
| Logo | The club logo arrived as a raster image on a beige background (2026-10-06). It was keyed out into a transparent PNG (`public/brand/logo-qfe.png`, teal mark only) and is shown in the footer via `logoPath` in `src/config/site.ts`. The emboss and the beige were rendering effects, not part of the mark. |
| Visual direction | **Gold Rush theme** with a stock-market texture (ticker tape, candlesticks, monospaced numbers). Not tied to the club logo. Details in `design.md`. Deep-sea sonar was the runner-up. |
| Name and tagline | **Quant Rush** — "Strike signal in the noise." |
| Registration | **Embedded Google Form only.** No custom backend, accounts, or dashboard. Kaggle itself serves as the participant dashboard. The form (live since 2026-10-06, URLs in `src/config/site.ts`) does not require Google sign-in, allows editing a response later (so the Kaggle username can be added after registering), collects no student IDs, and has an "open in a new tab" fallback. Responses go to a Google Sheet shared only with board members. |
| Site scope | 3 pages: Home, Workshops, Rules & FAQ, plus a 404 page. English only. Leaderboard, Data & Problem, and Winners pages come later. |
| Organizer | SMC Quantitative Finance & Entrepreneurship (QFE) Club |

## Open

- Kaggle competition URL
- HTTPS on smcqfec.com works (since 2026-10-06); tick "Enforce HTTPS" in Settings → Pages if it is not already
- `www.smcqfec.com`: needs a CNAME record to `yinghao-guan.github.io` if the www address should work
- Evaluation metric (decided in the competition repository with the dataset); it shows as "To be finalized" on the rules page until then
- Kaggle competition URL goes on the website (`SITE.links.kaggleUrl`) once the competition exists; it then appears in the footer, the corkboard, and step 2 of "How it works"
