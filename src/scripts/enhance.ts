// Progressive enhancement for markdown content: persisted checklists, whitespace matrix,
// MEDDPICC scorer and TOC highlighting. Every storage call is wrapped: private mode can throw.

const store = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key: string, value: unknown) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  },
  remove(key: string) {
    try { localStorage.removeItem(key); } catch {}
  }
};

const pageKey = location.pathname.replace(/\/$/, '') || '/';

function initChecklists() {
  document.querySelectorAll<HTMLElement>('[data-checklist]').forEach((list) => {
    const key = `checklist:${pageKey}:${list.dataset.checklist}`;
    const boxes = Array.from(list.querySelectorAll<HTMLInputElement>('input[type="checkbox"]'));
    if (!boxes.length) return;
    const saved = store.get<number[]>(key, []);
    const status = document.createElement('span');
    const meter = document.createElement('span');
    meter.className = 'cl-meter';
    meter.innerHTML = '<i></i>';
    const update = () => {
      const done = boxes.filter((b) => b.checked).length;
      status.textContent = `${done}/${boxes.length} done`;
      meter.firstElementChild!.setAttribute('style', `width:${(done / boxes.length) * 100}%`);
      boxes.forEach((b) => b.closest('li')?.classList.toggle('done', b.checked));
    };
    boxes.forEach((box, i) => {
      box.disabled = false;
      box.checked = saved.includes(i);
      const label = box.closest('li')?.textContent?.trim().slice(0, 80) ?? `Item ${i + 1}`;
      box.setAttribute('aria-label', label);
      box.addEventListener('change', () => {
        store.set(key, boxes.flatMap((b, j) => (b.checked ? [j] : [])));
        update();
      });
    });
    const bar = document.createElement('div');
    bar.className = 'checklist-bar';
    const reset = document.createElement('button');
    reset.type = 'button';
    reset.className = 'btn small';
    reset.textContent = 'Reset';
    reset.addEventListener('click', () => {
      boxes.forEach((b) => (b.checked = false));
      store.remove(key);
      update();
    });
    bar.append(status, meter, reset);
    list.append(bar);
    update();
  });
}

const WS_STATES = ['empty', 'adopted', 'active', 'competitor'] as const;
const WS_LABELS: Record<string, string> = { empty: 'Empty', adopted: 'Adopted', active: 'Active opp', competitor: 'Competitor' };

function initWhitespace() {
  document.querySelectorAll<HTMLElement>('[data-whitespace]').forEach((table) => {
    const key = `whitespace:${table.dataset.whitespace}`;
    const cells = Array.from(table.querySelectorAll<HTMLButtonElement>('.ws-cell'));
    const saved = store.get<string[]>(key, []);
    const paint = (cell: HTMLButtonElement, state: string) => {
      cell.dataset.state = state;
      cell.textContent = WS_LABELS[state] ?? state;
    };
    cells.forEach((cell, i) => {
      if (saved[i]) paint(cell, saved[i]);
      cell.addEventListener('click', () => {
        const idx = WS_STATES.indexOf((cell.dataset.state ?? 'empty') as (typeof WS_STATES)[number]);
        paint(cell, WS_STATES[(idx + 1) % WS_STATES.length]);
        store.set(key, cells.map((c) => c.dataset.state ?? 'empty'));
      });
    });
  });
}

const ELEMENTS = [
  ['M', 'Metrics'], ['E', 'Economic Buyer'], ['Dc', 'Decision Criteria'], ['Dp', 'Decision Process'],
  ['P', 'Paper Process'], ['I', 'Identify Pain'], ['Ch', 'Champion'], ['Co', 'Competition']
] as const;
const LEVELS = ['1 · Not met', '2 · Partially', '3 · Strongly', '4 · Outstanding'];

function initScorer() {
  document.querySelectorAll<HTMLElement>('[data-scorer]').forEach((host) => {
    const key = 'meddpicc-scorer';
    const saved = store.get<Record<string, number>>(key, {});
    host.classList.add('panel', 'scorer');
    host.innerHTML = `
      <div class="eyebrow">Interactive</div>
      <h3 style="margin-top:4px">MEDDPICC deal scorer</h3>
      <p class="small muted">Score each element 1–4. Saved in this browser only.</p>
      <div class="scorer-grid">
        ${ELEMENTS.map(([k, label]) => `
          <label>${label}
            <select data-el="${k}">${LEVELS.map((l, i) => `<option value="${i + 1}">${l}</option>`).join('')}</select>
          </label>`).join('')}
        <label>Deal value (USD)<input type="number" inputmode="decimal" min="0" step="1000" data-in="value"></label>
        <label>Execution multiplier (0–1)<input type="number" inputmode="decimal" min="0" max="1" step="0.05" data-in="mult"></label>
      </div>
      <div class="scorer-out">
        <div class="kpi"><div class="eyebrow">Average</div><div class="kpi-value num" data-out="avg"></div></div>
        <div class="kpi"><div class="eyebrow">Handicap</div><div class="kpi-value num" data-out="hcp"></div></div>
        <div class="kpi"><div class="eyebrow">Forecast</div><div class="kpi-value num" data-out="fc"></div></div>
      </div>
      <div class="meta-row" data-out="gates"></div>
      <button type="button" class="btn small" data-reset>Reset scorer</button>`;
    const selects = Array.from(host.querySelectorAll<HTMLSelectElement>('select[data-el]'));
    const valueIn = host.querySelector<HTMLInputElement>('[data-in="value"]')!;
    const multIn = host.querySelector<HTMLInputElement>('[data-in="mult"]')!;
    const out = (n: string) => host.querySelector<HTMLElement>(`[data-out="${n}"]`)!;

    const apply = (s: Record<string, number>) => {
      selects.forEach((sel) => (sel.value = String(s[sel.dataset.el!] ?? 1)));
      valueIn.value = String(s.value ?? 100000);
      multIn.value = String(s.mult ?? 0.3);
    };
    const compute = () => {
      const v: Record<string, number> = {};
      selects.forEach((sel) => (v[sel.dataset.el!] = Number(sel.value)));
      const scores = ELEMENTS.map(([k]) => v[k]);
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      const handicap = (avg - 1) / 3;
      const value = Math.max(0, Number(valueIn.value) || 0);
      const mult = Math.min(1, Math.max(0, Number(multIn.value) || 0));
      const ge3 = (keys: string[]) => keys.every((k) => v[k] >= 3);
      const qualify = ge3(['M', 'E', 'Dc', 'I']) && avg >= 2.5;
      const validate = qualify && ge3(['Dp', 'I']) && avg >= 3.0;
      const commit = scores.every((x) => x >= 3) && avg >= 3.5;
      out('avg').textContent = avg.toFixed(2);
      out('hcp').textContent = `${Math.round(handicap * 100)}%`;
      out('fc').textContent = `$${Math.round(value * handicap * mult).toLocaleString('en-US')}`;
      const gate = (name: string, ok: boolean) => `<span class="tag ${ok ? 'success' : 'danger'}">${name}: ${ok ? 'pass' : 'fail'}</span>`;
      out('gates').innerHTML = gate('Qualify exit', qualify) + gate('Validate exit', validate) + gate('Commit entry', commit);
      store.set(key, { ...v, value, mult });
      // Lets on-page visuals (the radar in viz/metrics.astro) follow the scorer.
      document.dispatchEvent(new CustomEvent('meddpicc', { detail: { scores: v, avg, qualify, validate, commit } }));
    };
    apply(saved);
    host.addEventListener('input', compute);
    host.addEventListener('change', compute);
    host.querySelector('[data-reset]')?.addEventListener('click', () => { store.remove(key); apply({}); compute(); });
    compute();
  });
}

function initToc() {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.toc a[href^="#"]'));
  if (!links.length || !('IntersectionObserver' in window)) return;
  const map = new Map(links.map((a) => [decodeURIComponent(a.hash.slice(1)), a]));
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.remove('active'));
      map.get(e.target.id)?.classList.add('active');
    });
  }, { rootMargin: '-60px 0px -70% 0px' });
  map.forEach((_, id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
}

// KPI tiles: draw a meter under any percentage value and count numbers up when they scroll in.
function initKpis() {
  const tiles = Array.from(document.querySelectorAll<HTMLElement>('.kpi'));
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io!.unobserve(e.target);
        reveal(e.target as HTMLElement);
      }), { rootMargin: '0px 0px -10% 0px' })
    : null;
  const reveal = (tile: HTMLElement) => {
    const bar = tile.querySelector<HTMLElement>('.kpi-meter i');
    if (bar) bar.style.width = bar.dataset.w!;
    const val = tile.querySelector<HTMLElement>('.kpi-value');
    const m = val?.textContent?.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/s);
    if (!val || !m || val.children.length || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const [, pre, n, post] = m;
    const target = Number(n), dp = n.includes('.') ? n.split('.')[1].length : 0, t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / 700), eased = 1 - Math.pow(1 - k, 3);
      val.textContent = pre + (target * eased).toFixed(dp) + post;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  tiles.forEach((tile) => {
    const text = tile.querySelector('.kpi-value')?.textContent ?? '';
    const pct = text.match(/(\d+(?:\.\d+)?)\s*(?:[–-]\s*(\d+(?:\.\d+)?))?\s*%/);
    if (pct) {
      const lo = Number(pct[1]), hi = pct[2] ? Number(pct[2]) : lo;
      const meter = document.createElement('span');
      meter.className = 'kpi-meter';
      meter.setAttribute('aria-hidden', 'true');
      meter.innerHTML = `<i data-w="${Math.min(100, (lo + hi) / 2)}%"></i>`;
      tile.append(meter);
    }
    if (io) io.observe(tile); else reveal(tile);
  });
}

initKpis();
initChecklists();
initWhitespace();
initScorer();
initToc();
