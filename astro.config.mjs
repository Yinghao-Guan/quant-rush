// @ts-check
import { defineConfig } from 'astro/config';

// SITE_URL and BASE_PATH are injected by the GitHub Pages workflow
// (.github/workflows/deploy.yml). Locally the site builds for the root path.
const site = process.env.SITE_URL ?? 'http://localhost:4321';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
