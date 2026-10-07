/**
 * Everything that is likely to change lives here: names, dates, links, contact.
 * Board members can edit this file without touching any component.
 */
export const SITE = {
  name: 'Quant Rush',
  tagline: 'Strike signal in the noise.',
  subtitle: "SMC's first online quant competition",
  description:
    'Quant Rush is a six-week online quant competition open to all California community college students, hosted by the Quantitative Finance & Entrepreneurship Club at Santa Monica College. No experience needed.',

  organizer: {
    name: 'Quantitative Finance & Entrepreneurship Club',
    short: 'QFE Club',
    school: 'Santa Monica College',
    email: 'qfec.smc@gmail.com',
    instagram: 'qfecsmc',
    meeting: 'Tuesdays 11:15–12:15 · MSB 207',
    blurb:
      'A student club for people who like markets, math, and building things. Meetings every Tuesday; all SMC students are welcome.',
  },

  /** ISO timestamps with explicit Pacific offsets (PDT until Nov 1, 2026, then PST). */
  dates: {
    opens: '2026-10-13T11:15:00-07:00',
    deadline: '2026-11-22T23:59:00-08:00',
    results: '2026-12-01T11:15:00-08:00',
  },

  links: {
    /** Google Form "embed" URL (…/viewform?embedded=true). Empty = show the placeholder. */
    formEmbedUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeJfHn5vExdE1IlgXa7wPINWSvlRPj38gL2LPaqWYdXqkK4rQ/viewform?embedded=true',
    /** Google Form share URL for the "open in a new tab" fallback. */
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeJfHn5vExdE1IlgXa7wPINWSvlRPj38gL2LPaqWYdXqkK4rQ/viewform',
    /** Kaggle competition page. Empty = "coming soon" badge. */
    kaggleUrl: '',
    /** Discord invite. Use an invite set to "never expire"; empty = Discord links are hidden. */
    discord: 'https://discord.gg/MUPdvSAV4M',
  },

  /** Social share image (1200×630) under public/. Regenerate with `npm run og`. */
  ogImage: '/brand/og.jpg',
  ogImageAlt: 'Quant Rush: Strike signal in the noise. An online quant competition for California community college students, Oct 13 to Nov 22, 2026.',

  /** Path under public/ to the club logo (transparent PNG, teal mark). Empty = text badge. */
  logoPath: '/brand/logo-qfe.png',

  /** Pinned chip at the front of the ticker. Empty = none. */
  tickerPin: '★ OPENS OCT 13 · 100% ONLINE',
} as const;
