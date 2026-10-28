import type { CollectionEntry } from 'astro:content';

export interface DailyCard {
  page: string;
  pageTitle: string;
  title: string;
  kind: 'Checklist' | 'Questions';
  items: string[];
}

/** Minimal inline markdown → HTML for list items (links, bold, italics, code). Content is our own. */
export function inlineMd(s: string): string {
  return s
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" rel="noopener">$1</a>');
}

const listItems = (block: string) =>
  block
    .split(/\r?\n/)
    .filter((l) => /^\s*[-*] /.test(l) && !/^\s{2,}/.test(l))
    .map((l) => inlineMd(l.replace(/^\s*[-*] (\[[ xX]\] )?/, '').trim()))
    .filter(Boolean);

/** Pull every collapsible question list and checklist out of the knowledge pages. */
export function extractCards(pages: CollectionEntry<'pages'>[]): DailyCard[] {
  const cards: DailyCard[] = [];
  for (const p of pages) {
    const body = p.body ?? '';
    for (const m of body.matchAll(/<details class="collapsible">\s*<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g)) {
      const items = listItems(m[2]);
      if (items.length >= 2) cards.push({ page: p.data.slug, pageTitle: p.data.title, title: m[1].replace(/<[^>]+>/g, '').trim(), kind: 'Questions', items });
    }
    for (const m of body.matchAll(/<div class="checklist" data-checklist="([^"]+)">([\s\S]*?)<\/div>/g)) {
      const before = body.slice(0, m.index);
      const heading = [...before.matchAll(/^#{2,4} (.+)$/gm)].pop()?.[1] ?? m[1];
      const items = listItems(m[2]);
      if (items.length >= 2) cards.push({ page: p.data.slug, pageTitle: p.data.title, title: heading.replace(/[*`]/g, '').trim(), kind: 'Checklist', items });
    }
  }
  return cards;
}

/** Plain text for search snippets. */
export function plainText(md: string): string {
  return md
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#+\s+/gm, '')
    .replace(/[|*_`>#-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
