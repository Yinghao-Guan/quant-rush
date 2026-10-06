/* Quant Rush — preview behaviors.
   Vanilla JS. Each function mirrors a small <script> the Astro components will carry. */
(() => {
  'use strict';

  /* ---- Config (will live in src/config/site.ts) -------------------------- */
  const CONFIG = {
    opens:    '2026-10-13T11:15:00-07:00',
    deadline: '2026-11-22T23:59:00-08:00',
    results:  '2026-12-01T11:15:00-08:00',
    formUrl:  '',   // Google Form embed URL; empty shows the placeholder
  };

  const TIMELINE = [
    { date: '2026-10-13', label: 'Tue Oct 13', title: 'Stake Your Claim', sub: 'Kickoff',      kind: 'kickoff',  blurb: 'Rules, Kaggle setup, team formation. The competition opens.' },
    { date: '2026-10-20', label: 'Tue Oct 20', title: 'Picks & Shovels I', sub: 'Workshop 1', kind: 'workshop', blurb: 'Python, pandas, your first Kaggle notebook. Leave with a baseline submitted.' },
    { date: '2026-10-27', label: 'Tue Oct 27', title: 'Reading the Vein',  sub: 'Workshop 2', kind: 'workshop', blurb: 'Exploring the data and understanding the metric.' },
    { date: '2026-11-03', label: 'Tue Nov 3',  title: 'Refining the Ore',  sub: 'Workshop 3', kind: 'workshop', blurb: 'Feature engineering and baseline models.' },
    { date: '2026-11-10', label: 'Tue Nov 10', title: 'What Glitters',     sub: 'Workshop 4', kind: 'workshop', blurb: 'Validation and overfitting: why the public leaderboard lies.' },
    { date: '2026-11-17', label: 'Tue Nov 17', title: 'The Last Dig',      sub: 'Final sprint', kind: 'workshop', blurb: 'Office hours, ensembling, final submissions.' },
    { date: '2026-11-22', label: 'Sun Nov 22', title: 'The Assay',         sub: 'Deadline',   kind: 'deadline', blurb: 'Submissions close. The private leaderboard decides.' },
    { date: '2026-12-01', label: 'Tue Dec 1',  title: 'Paydirt',           sub: 'Wrap-up',    kind: 'wrapup',   blurb: 'Winners announced. Top teams walk through their solutions.' },
  ];

  const TICKER = [
    ['QNTR', '▲', '18.49'],  ['ALPHA', '▲', '4.20%'],   ['SIGNAL', '▲', '2.45%'], ['NOISE', '▼', '0.31%'],
    ['OVERFIT', '▼', '99.00%'], ['PAYDIRT', '▲', '18.49%'], ['BIAS', '▼', '3.14%'], ['VARIANCE', '▲', '2.71%'],
    ['SHARPE', '▲', '1.00'], ['LEAKAGE', '▼', '100%'],   ['COFFEE', '▲', '12.00%'],
  ];

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const now = () => new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const localDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const daysUntil = (iso) => Math.max(0, Math.ceil((new Date(iso) - now()) / 864e5));

  /* ---- 5.1 Ticker --------------------------------------------------------- */
  function renderTicker() {
    const track = document.querySelector('.ticker__track');
    if (!track) return;
    const items = [`<span class="ticker__item"><span class="ticker__pin">★ KICKOFF OCT 13 · MSB 207</span></span>`];
    for (const [sym, dir, val] of TICKER) {
      const cls = dir === '▲' ? 'ticker__up' : 'ticker__down';
      items.push(`<span class="ticker__item"><span>${sym}</span><span class="${cls}">${dir} ${val}</span></span>`);
    }
    items.push(`<span class="ticker__item"><span>T-${daysUntil(CONFIG.deadline)} DAYS TO THE ASSAY</span></span>`);
    const group = `<span class="ticker__group">${items.join('')}</span>`;
    track.innerHTML = group + group;
  }

  /* ---- 5.11 Candlesticks (deterministic, seeded) ------------------------- */
  function renderCandles(el, n, seed) {
    let s = seed >>> 0;
    const rnd = () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296);
    let html = '';
    for (let i = 0; i < n; i++) {
      const up = rnd() > 0.32;
      const body = 16 + Math.round(rnd() * 50);
      const base = Math.round(rnd() * 28);
      const wick = Math.min(100, body + base + 8 + Math.round(rnd() * 16));
      const cls = i === n - 1 ? 'candle--gold' : up ? 'candle--up' : 'candle--down';
      html += `<span class="candle ${cls}" style="--i:${i};--body:${body}%;--base:${base}%;--wick:${wick}%">` +
              `<span class="candle__wick"></span><span class="candle__body"></span></span>`;
    }
    el.innerHTML = html;
  }
  function initCandles() {
    const count = () => (innerWidth < 640 ? 16 : innerWidth < 900 ? 26 : 36);
    let last = -1;
    const draw = () => {
      const n = count();
      if (n === last) return;
      last = n;
      document.querySelectorAll('[data-candles]').forEach((el, i) => renderCandles(el, n, 1849 + i * 7));
    };
    draw();
    let t;
    addEventListener('resize', () => { clearTimeout(t); t = setTimeout(draw, 150); });
  }

  /* ---- 5.10 Countdown ----------------------------------------------------- */
  function initCountdown() {
    const root = document.querySelector('[data-countdown]');
    if (!root) return;
    const title = root.querySelector('.countdown__title');
    const nums = root.querySelectorAll('.countdown__num');
    const phase = () => {
      const t = now();
      if (t < new Date(CONFIG.opens))    return { label: 'Claim staking opens in', target: new Date(CONFIG.opens) };
      if (t < new Date(CONFIG.deadline)) return { label: 'The Assay closes in',    target: new Date(CONFIG.deadline) };
      if (t < new Date(CONFIG.results))  return { label: 'Results Dec 1',          target: null };
      return { label: 'See you next rush', target: null };
    };
    const tick = () => {
      const p = phase();
      title.textContent = p.label;
      if (!p.target) { nums.forEach((n) => (n.textContent = '--')); return; }
      let d = Math.max(0, p.target - now());
      const days = Math.floor(d / 864e5); d -= days * 864e5;
      const hrs  = Math.floor(d / 36e5);  d -= hrs * 36e5;
      const min  = Math.floor(d / 6e4);   d -= min * 6e4;
      const sec  = Math.floor(d / 1e3);
      [days, hrs, min, sec].forEach((v, i) => {
        const s = pad(v);
        if (nums[i].textContent !== s) nums[i].textContent = s;
      });
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---- 5.2 Nav ------------------------------------------------------------ */
  function initNav() {
    const nav = document.querySelector('.nav');
    const toggle = nav && nav.querySelector('.nav__toggle');
    const overlay = document.querySelector('.nav__overlay');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 8);
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    if (!toggle || !overlay) return;
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      overlay.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    overlay.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
    addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  }

  /* ---- Scroll reveals ----------------------------------------------------- */
  function initReveals() {
    const els = document.querySelectorAll('.reveal');
    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      }
    }, { threshold: 0.15 });
    els.forEach((e) => io.observe(e));
  }

  /* ---- Timeline: The Claim Trail ----------------------------------------- */
  function trailStatus() {
    const t = now();
    const today = localDate(t);
    let currentSet = false;
    return TIMELINE.map((m) => {
      const end = new Date(`${m.date}T23:59:59-08:00`);
      const past = end < t;
      const isToday = m.date === today;
      const current = !past && !currentSet && (currentSet = true);
      return { ...m, past, isToday, current };
    });
  }
  const badgeFor = (m) =>
    m.isToday ? '<span class="badge badge--today">Today</span>' :
    m.past    ? '<span class="badge badge--done">✓ Done</span>' :
    m.kind === 'deadline' ? '<span class="badge badge--tbd">Deadline</span>' :
    m.current ? '<span class="badge badge--upcoming">Next up</span>' : '';

  function renderTrailList(list, items) {
    list.innerHTML = items.map((m) => `
      <li class="trail__item ${m.past ? 'is-past' : ''} ${m.current ? 'is-current' : ''} ${m.kind === 'deadline' ? 'is-deadline' : ''}">
        <div class="trail__date">${m.label}</div>
        <div class="trail__title">${m.title} <span class="muted" style="font-weight:500;letter-spacing:.04em;text-transform:none">— ${m.sub}</span> ${badgeFor(m)}</div>
        <p class="trail__blurb">${m.blurb}</p>
      </li>`).join('');
    const cur = list.querySelector('.is-current');
    list.style.setProperty('--past', cur ? `${cur.offsetTop + 4}px` : '100%');
  }

  function renderTrailChart(chart, items) {
    const n = items.length;
    const xs = items.map((_, i) => 8 + i * (84 / (n - 1)));
    const jitter = [0, 4, -3, 5, -2, 3, -6, 0];
    const ys = items.map((_, i) => 80 - i * (58 / (n - 1)) + (jitter[i] || 0));
    const pt = (i) => `${xs[i].toFixed(2)} ${ys[i].toFixed(2)}`;
    const curIdx = Math.max(0, items.findIndex((m) => m.current));
    const pastPts = items.slice(0, curIdx + 1).map((_, i) => pt(i)).join(' L ');
    const futurePts = items.slice(curIdx).map((_, i) => pt(curIdx + i)).join(' L ');
    const area = `M ${items.map((_, i) => pt(i)).join(' L ')} L ${xs[n - 1].toFixed(2)} 100 L ${xs[0].toFixed(2)} 100 Z`;

    const svg = `
      <svg class="trail__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <g class="trail__draw">
          ${[20, 40, 60, 80].map((y) => `<line class="trail__grid" x1="0" y1="${y}" x2="100" y2="${y}"/>`).join('')}
          <path class="trail__area" d="${area}"/>
          <path class="trail__past" d="M ${pastPts}"/>
          <path class="trail__future" d="M ${futurePts}"/>
        </g>
      </svg>`;

    const nodes = items.map((m, i) => {
      const side = i % 2 ? 'above' : 'below';
      const cls = ['trail__node', `trail__node--${side}`, m.past ? 'is-past' : '', m.current ? 'is-current' : '', m.kind === 'deadline' ? 'is-deadline' : ''].join(' ');
      return `
        <div class="${cls}" style="--i:${i};left:${xs[i].toFixed(2)}%;top:calc(90px + (100% - 180px) * ${(ys[i] / 100).toFixed(4)})">
          <div class="trail__dot"></div>
          <div class="trail__label">
            <div class="trail__date">${m.label}</div>
            <div class="trail__title">${m.title}</div>
            <p class="trail__blurb">${m.sub} · ${m.blurb}</p>
            ${badgeFor(m)}
          </div>
        </div>`;
    }).join('');

    chart.innerHTML = `<span class="trail__axis">Skill →</span>${svg}${nodes}`;
  }

  function initTrail() {
    const list = document.querySelector('[data-trail-list]');
    const chart = document.querySelector('[data-trail-chart]');
    const items = trailStatus();
    if (list) renderTrailList(list, items);
    if (chart) renderTrailChart(chart, items);
  }

  /* ---- Register form ------------------------------------------------------ */
  function initForm() {
    const slot = document.querySelector('[data-form]');
    if (!slot || !CONFIG.formUrl) return;
    slot.outerHTML = `<iframe src="${CONFIG.formUrl}" title="Quant Rush registration form" loading="lazy"></iframe>`;
  }

  /* ---- 5.13 Depth meter --------------------------------------------------- */
  function initDepth() {
    const el = document.querySelector('.depth');
    if (!el) return;
    const f = () => { el.textContent = `DEPTH ${String(Math.round(scrollY / 10)).padStart(4, '0')} FT`; };
    addEventListener('scroll', f, { passive: true });
    f();
  }

  /* ---- Boot --------------------------------------------------------------- */
  renderTicker();
  initCandles();
  initCountdown();
  initNav();
  initTrail();
  initForm();
  initReveals();
  initDepth();
})();
