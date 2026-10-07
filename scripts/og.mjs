// Renders the share card at /og/ into public/brand/og.jpg with headless Chrome.
// Start the site first (`npm run dev`), then run `npm run og`.
// Override the page with OG_URL and the browser with CHROME_PATH if needed.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';

const url = process.env.OG_URL ?? 'http://localhost:4321/og/';
const out = 'public/brand/og.jpg';

const chrome = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].find((p) => p && existsSync(p));
if (!chrome) {
  console.error('Chrome was not found. Set CHROME_PATH to a Chrome or Chromium binary.');
  process.exit(1);
}

// A throwaway profile keeps this from attaching to a Chrome window that is already open.
const profile = mkdtempSync(join(tmpdir(), 'quant-rush-og-'));
const png = join(profile, 'og.png');
try {
  execFileSync(
    chrome,
    [
      '--headless=new',
      `--user-data-dir=${profile}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--window-size=1200,630',
      '--virtual-time-budget=6000',
      `--screenshot=${png}`,
      url,
    ],
    { stdio: 'ignore', timeout: 60_000 },
  );
  if (!existsSync(png)) throw new Error(`No screenshot was produced. Is the site running at ${url}?`);
  await sharp(png).resize(1200, 630, { fit: 'cover', position: 'top' }).jpeg({ quality: 86, mozjpeg: true }).toFile(out);
  console.log(`Wrote ${out} (${Math.round(statSync(out).size / 1024)} KB) from ${url}`);
} finally {
  rmSync(profile, { recursive: true, force: true });
}
