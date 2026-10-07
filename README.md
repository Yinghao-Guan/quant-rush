# Quant Rush

Official website for **Quant Rush**, the online Kaggle competition hosted by the **Quantitative Finance & Entrepreneurship (QFE) Club** at **Santa Monica College**.

> 🚧 **Status: building v1.** The site structure, design, and copy are in place; the dataset, Kaggle page, and registration form are still being prepared. See `docs/` for plans and decisions.

## About

The QFE Club is organizing a six-week online quant competition for all SMC students (Oct 13 – Nov 22, 2026, wrap-up Dec 1). This site is the single place for participants to learn about the competition and follow along: overview, timeline, weekly workshops, rules and FAQ, awards, and registration.

This repository holds only the website. The competition itself (problem design, data, baselines) is maintained separately and privately.

## Stack

- [Astro](https://astro.build) static site, no framework runtime. Interactive bits (ticker, countdown, timeline, nav) are small vanilla scripts.
- Fonts are self-hosted through `@fontsource` packages.
- Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Getting Started

Requires Node 22.12 or newer (Astro 7's minimum).

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:4321>. `npm run build` writes the static site to `dist/`; `npm run preview` serves that build.

## Editing Content

| What | Where |
|---|---|
| Names, dates, links (form, Kaggle, Discord), contact, logo path | `src/config/site.ts` |
| Schedule: workshops, deadline, wrap-up, materials links | `src/data/schedule.json` |
| FAQ | `src/data/faq.json` |
| Awards | `src/data/awards.json` |
| Ticker jokes | `src/data/ticker.json` |
| Rules text | `src/pages/rules.astro` |
| Colors, type, spacing | `src/styles/tokens.css` (spec in `docs/design.md`) |

Every token and component is visible at `/styleguide` (unlinked, not indexed).

The social share image is `public/brand/og.jpg`. Its source is the unlisted page `/og/` (`src/pages/og.astro`). After changing the card, regenerate the image with the dev server running:

```bash
npm run og
```

This needs Google Chrome or Chromium installed; set `CHROME_PATH` if it is somewhere unusual.

## Repository Layout

```
.
├── .github/workflows/   # GitHub Pages deploy
├── docs/                # Planning notes, decisions, design spec
├── public/              # Served as-is (emblem, favicon)
├── src/
│   ├── assets/          # Engravings and the icon sprite (processed at build)
│   ├── components/      # Astro components
│   ├── config/site.ts   # Site-wide settings
│   ├── data/            # JSON content
│   ├── layouts/         # Base layout
│   ├── lib/             # Small helpers (paths, dates, status)
│   ├── pages/           # Routes: /, /workshops, /rules, /404, /styleguide
│   └── styles/          # tokens, base, components, pages
├── CREDITS.md           # Sources and licenses for every engraving
└── astro.config.mjs
```

## Deploying

The site is live at <https://smcqfec.com> (GitHub Pages with a custom domain; Settings → Pages → Source is "GitHub Actions"). The workflow builds with `SITE_URL=https://smcqfec.com` and `BASE_PATH=/`. If the custom domain is ever removed, switch the workflow back to `SITE_URL=https://<owner>.github.io` and `BASE_PATH=/<repo>` so asset paths get the `/<repo>/` prefix; the commented lines in `deploy.yml` show the values.

## Contributing

This is a club project. If you are a QFE Club member and want to help, reach out to the organizers.

## License

To be decided. The engravings are public domain; see `CREDITS.md`.
