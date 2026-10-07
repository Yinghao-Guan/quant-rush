// @ts-check
import { defineConfig } from 'astro/config';
import { rm } from 'node:fs/promises';

// /styleguide and /og (the share-card source) are tools for maintainers. They stay on the
// dev server and on Cloudflare previews, but are removed from every other build, including
// production, so they are never published on smcqfec.com.
const internalPages = {
  name: 'internal-pages',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      if (process.env.CF_PAGES === '1') return;
      for (const page of ['styleguide', 'og']) {
        await rm(new URL(`${page}/`, dir), { recursive: true, force: true });
      }
    },
  },
};

// SITE_URL and BASE_PATH are injected by the GitHub Pages workflow
// (.github/workflows/deploy.yml). Locally the site builds for the root path.
const site = process.env.SITE_URL ?? 'http://localhost:4321';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [internalPages],
});
