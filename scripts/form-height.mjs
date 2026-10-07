// Measures the embedded Google Form's height at the iframe widths the site uses, with headless
// Chrome, and prints the CSS heights for `.wanted iframe` in src/styles/components.css.
// Run `npm run form-height` after changing the form. Needs Chrome or Chromium (or CHROME_PATH).
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

// Each tier: the viewport range it covers and the narrowest iframe in that range
// (the narrowest iframe makes the form tallest).
const TIERS = [
  { css: 'base (>= 878px)', iframe: 690 },
  { css: 'max-width: 877px', iframe: 522 },
  { css: 'max-width: 639px', iframe: 410 },
  { css: 'max-width: 479px', iframe: 330 },
  { css: 'max-width: 399px', iframe: 290 },
  { css: 'max-width: 359px', iframe: 250 },
];
const BUFFER = 110; // room for "This is a required question" messages
const PORT = 9333;

const config = readFileSync('src/config/site.ts', 'utf8');
const url = config.match(/formEmbedUrl:\s*'([^']+)'/)?.[1];
if (!url) {
  console.error('No formEmbedUrl in src/config/site.ts.');
  process.exit(1);
}

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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const profile = mkdtempSync(join(tmpdir(), 'quant-rush-form-'));
const proc = spawn(
  chrome,
  ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, '--no-first-run', '--no-default-browser-check', 'about:blank'],
  { stdio: 'ignore' },
);

try {
  let ready = false;
  for (let i = 0; i < 60 && !ready; i++) {
    try {
      await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json();
      ready = true;
    } catch {
      await sleep(250);
    }
  }
  if (!ready) throw new Error('Chrome did not start.');

  const target = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' })).json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r, { once: true }));
  let id = 0;
  const pending = new Map();
  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  });
  const send = (method, params = {}) =>
    new Promise((res) => {
      const i = ++id;
      pending.set(i, res);
      ws.send(JSON.stringify({ id: i, method, params }));
    });

  await send('Page.enable');
  const rows = [];
  for (const tier of TIERS) {
    await send('Emulation.setDeviceMetricsOverride', { width: tier.iframe, height: 1000, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url });
    await sleep(4000);
    const r = await send('Runtime.evaluate', { expression: 'document.documentElement.scrollHeight', returnByValue: true });
    const form = r.result.result.value;
    rows.push({ media: tier.css, iframeWidth: tier.iframe, formHeight: form, cssHeight: Math.ceil((form + BUFFER) / 10) * 10 });
  }
  ws.close();
  console.table(rows);
  console.log('Copy the cssHeight values into the `.wanted iframe` rules in src/styles/components.css.');
} finally {
  proc.kill();
  await sleep(300);
  rmSync(profile, { recursive: true, force: true });
}
