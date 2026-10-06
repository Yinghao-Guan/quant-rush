/**
 * Everything that is likely to change lives here: names, dates, links, contact.
 * Board members can edit this file without touching any component.
 */
export const SITE = {
  name: 'Quant Rush',
  tagline: 'Strike signal in the noise.',
  subtitle: "SMC's first online quant competition",
  description:
    'Quant Rush is a six-week online quant competition open to all Santa Monica College students, hosted by the Quantitative Finance & Entrepreneurship Club. No experience needed.',

  organizer: {
    name: 'Quantitative Finance & Entrepreneurship Club',
    short: 'QFE Club',
    school: 'Santa Monica College',
    email: 'qfec.smc@gmail.com',
    instagram: 'qfecsmc',
    meeting: 'Tuesdays 11:15–12:15 · MSB 207',
    blurb:
      'A student club for people who like markets, math, and building things. Meetings every Tuesday; everyone is welcome.',
  },

  /** ISO timestamps with explicit Pacific offsets (PDT until Nov 1, 2026, then PST). */
  dates: {
    opens: '2026-10-13T11:15:00-07:00',
    deadline: '2026-11-22T23:59:00-08:00',
    results: '2026-12-01T11:15:00-08:00',
  },

  links: {
    /** Google Form "embed" URL (…/viewform?embedded=true). Empty = show the placeholder. */
    formEmbedUrl: '',
    /** Google Form share URL for the "open in a new tab" fallback. */
    formUrl: '',
    /** Kaggle competition page. Empty = "coming soon" badge. */
    kaggleUrl: '',
  },

  /** Path under public/ to the club logo once it arrives, e.g. '/brand/logo-qfe.svg'. Empty = text badge. */
  logoPath: '',

  /** Pinned chip at the front of the ticker. Empty = none. */
  tickerPin: '★ KICKOFF OCT 13 · MSB 207',
} as const;
