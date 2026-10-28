// Shared news gate: canonicalisation, schema and de-dup rules (CLAUDE.md §6).
// The Zod schema mirrors the `news` collection in src/content.config.ts — keep the two in sync.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { z } from 'zod';

export const PATHS = {
  news: 'src/data/news.json',
  seen: 'src/data/seen.json',
  incoming: 'src/data/incoming.json'
};

export const MAX_PER_WEEK = 12;
export const STALE_DAYS = 21;
export const TITLE_WINDOW_DAYS = 14;

export const ALLOWLIST = [
  'jpt.spe.org', 'spe.org', 'spglobal.com', 'rigzone.com', 'oilprice.com', 'energyvoice.com', 'ogj.com', 'worldoil.com',
  'upstreamonline.com', 'oilandgasiq.com', 'meed.com', 'guest.meed.com', 'zawya.com', 'kuwaittimes.com', 'arabtimesonline.com',
  'kuna.net.kw', 'kockw.com', 'kpc.com.kw', 'adnoc.ae', 'aramco.com', 'pdo.co.om', 'qatarenergy.qa', 'slb.com', 'halliburton.com',
  'bakerhughes.com', 'aveva.com', 'aspentech.com', 'emerson.com', 'kongsbergdigital.com', 'palantir.com', 'businesswire.com',
  'prnewswire.com', 'reuters.com', 'bloomberg.com', 'ft.com', 'mckinsey.com', 'bain.com', 'accenture.com', 'deloitte.com',
  'gartner.com', 'forrester.com', 'woodmac.com', 'opengroup.org', 'capt.gov.kw', 'trade.gov', 'tamimi.com', 'clydeco.com'
];

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
export const newsSchema = z.object({
  id: z.string(),
  title: z.string().min(8).max(200),
  source: z.string(),
  url: z.string().url(),
  canonicalUrl: z.string().url(),
  date: isoDate,
  weekOf: z.string().regex(/^\d{4}-W\d{2}$/),
  summary: z.string().max(600),
  tags: z.array(z.string()).max(8),
  relevance: z.number().int().min(1).max(5),
  citedText: z.string().max(150).optional(),
  addedAt: z.string().datetime()
}).strict();

/** scheme + host (lowercased) + path; drops query (incl. utm_*), fragment and trailing slash. */
export function canonicalise(raw) {
  const u = new URL(raw);
  const path = u.pathname.replace(/\/+$/, '');
  return `${u.protocol.toLowerCase()}//${u.host.toLowerCase()}${path}`;
}

export const idFor = (canonicalUrl) => createHash('sha1').update(canonicalUrl).digest('hex').slice(0, 12);

const STOPWORDS = new Set('a an and are as at be by for from has in is it its of on or that the to was were will with'.split(' '));
export const normaliseTitle = (t) =>
  t.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter((w) => w && !STOPWORDS.has(w)).join(' ');

const DAY = 86400000;
export const toUtc = (iso) => {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
  return Date.UTC(y, m - 1, d);
};

/** True only for real, zero-padded calendar dates. */
export function isRealDate(iso) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
  return new Date(toUtc(iso)).toISOString().slice(0, 10) === iso;
}

/** UTC ms of the Monday that starts an ISO week. */
export function weekStart(week) {
  const [y, w] = week.split('-W').map(Number);
  const jan4 = Date.UTC(y, 0, 4);
  const dow = new Date(jan4).getUTCDay() || 7;
  return jan4 - (dow - 1) * DAY + (w - 1) * 7 * DAY;
}

export function isoWeekOf(date = new Date()) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const y = d.getUTCFullYear();
  const week = Math.ceil(((d - Date.UTC(y, 0, 1)) / DAY + 1) / 7);
  return `${y}-W${String(week).padStart(2, '0')}`;
}

export function hostAllowed(url) {
  const host = new URL(url).hostname.toLowerCase().replace(/^www\./, '');
  return ALLOWLIST.some((d) => host === d || host.endsWith(`.${d}`));
}

export const readJson = (p, fallback) => (existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : fallback);
export const writeJson = (p, data) => writeFileSync(p, JSON.stringify(data, null, 2) + '\n');

export const sortNews = (items) => [...items].sort((a, b) => b.addedAt.localeCompare(a.addedAt) || a.id.localeCompare(b.id));

const issues = (err) => err.issues.map((x) => `${x.path.join('.')}: ${x.message}`).join('; ');

/** Check the committed archive: schema, unique ids, id = sha1(canonicalUrl), seen.json consistency. */
export function checkArchive(news, seen) {
  if (!Array.isArray(news)) return ['news.json must be an array'];
  const errors = [];
  const ids = new Set();
  news.forEach((item, i) => {
    const r = newsSchema.safeParse(item);
    if (!r.success) errors.push(`news[${i}] ${item?.id ?? ''}: ${issues(r.error)}`);
    if (ids.has(item.id)) errors.push(`news[${i}]: duplicate id ${item.id}`);
    ids.add(item.id);
    if (item.canonicalUrl && item.id !== idFor(item.canonicalUrl)) errors.push(`news[${i}]: id does not match sha1(canonicalUrl)`);
    if (item.date && !isRealDate(item.date)) errors.push(`news[${i}]: invalid date ${item.date}`);
    if (item.canonicalUrl && seen[item.canonicalUrl] !== item.id) errors.push(`news[${i}]: missing from seen.json`);
  });
  return errors;
}

/**
 * Gate incoming candidates against the archive. Returns { accepted, rejected, warnings };
 * each record is judged on its own so the report lists every problem at once.
 */
export function gateIncoming(incoming, news, seen) {
  const accepted = [];
  const rejected = [];
  const warnings = [];
  if (!Array.isArray(incoming)) return { accepted, rejected: [{ index: -1, reason: 'incoming.json must be an array' }], warnings };

  const perWeek = {};
  news.forEach((n) => (perWeek[n.weekOf] = (perWeek[n.weekOf] ?? 0) + 1));
  const known = [...news];
  const seenNow = new Set(Object.keys(seen));

  incoming.forEach((raw, index) => {
    const reject = (reason) => rejected.push({ index, title: raw?.title, reason });
    if (!raw || typeof raw !== 'object') return reject('not an object');
    let canonicalUrl;
    try { canonicalUrl = canonicalise(raw.url); } catch { return reject(`bad url ${raw.url}`); }
    const item = { ...raw, canonicalUrl, id: idFor(canonicalUrl) };
    const parsed = newsSchema.safeParse(item);
    if (!parsed.success) return reject(issues(parsed.error));
    if (!isRealDate(item.date)) return reject(`date ${item.date} is not a real zero-padded ISO date`);
    const runStart = weekStart(item.weekOf);
    if (toUtc(item.date) < runStart - STALE_DAYS * DAY) return reject(`stale: ${item.date} is more than ${STALE_DAYS} days before ${item.weekOf}`);
    if (toUtc(item.date) >= runStart + 7 * DAY) return reject(`date ${item.date} is after the run week ${item.weekOf}`);
    if (seenNow.has(canonicalUrl)) return reject(`duplicate canonicalUrl ${canonicalUrl}`);
    const nt = normaliseTitle(item.title);
    const twin = known.find((k) => normaliseTitle(k.title) === nt && Math.abs(toUtc(k.date) - toUtc(item.date)) <= TITLE_WINDOW_DAYS * DAY);
    if (twin) return reject(`duplicate title of ${twin.id}`);
    // Off-allowlist hosts: relevance >= 4 is allowed with a warning (SKILL.md rule); 3 is rejected;
    // <= 2 only warns (§6 rule 5) because such items are already exceptional.
    if (!hostAllowed(item.url)) {
      const host = new URL(item.url).hostname;
      if (item.relevance === 3) return reject(`host ${host} not in allowlist (needs relevance >= 4)`);
      warnings.push(`${item.id}: host ${host} not in allowlist (relevance ${item.relevance}) — confirm the publisher is reputable`);
    }
    if ((perWeek[item.weekOf] ?? 0) >= MAX_PER_WEEK) return reject(`week ${item.weekOf} already has ${MAX_PER_WEEK} items`);
    perWeek[item.weekOf] = (perWeek[item.weekOf] ?? 0) + 1;
    seenNow.add(canonicalUrl);
    known.push(parsed.data);
    accepted.push(parsed.data);
  });
  return { accepted, rejected, warnings };
}
