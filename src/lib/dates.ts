// All dates are stored as ISO strings and formatted at build time (Safari §4.8): never parse in client JS.
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** ISO week string (YYYY-Www) for a YYYY-MM-DD date. */
export function isoWeek(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

/** Human label for an ISO week, e.g. "2026-W44 · 26 Oct – 1 Nov 2026". */
export function weekLabel(week: string): string {
  const [ys, ws] = week.split('-W');
  const y = Number(ys), w = Number(ws);
  const jan4 = new Date(Date.UTC(y, 0, 4));
  const monday = new Date(jan4);
  monday.setUTCDate(jan4.getUTCDate() - ((jan4.getUTCDay() || 7) - 1) + (w - 1) * 7);
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  const f = (dt: Date) => `${dt.getUTCDate()} ${MONTHS[dt.getUTCMonth()]}`;
  return `${f(monday)} – ${f(sunday)} ${sunday.getUTCFullYear()}`;
}
