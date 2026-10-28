import { getCollection } from 'astro:content';
import { plainText } from '../lib/cards';

// Build-time search index: title, headings, tags and the first 300 chars of each page, plus news items.
export async function GET() {
  const pages = (await getCollection('pages')).map((p) => {
    const body = p.body ?? '';
    const headings = [...body.matchAll(/^#{2,4} (.+)$/gm)].map((m) => plainText(m[1]));
    return {
      type: 'page',
      url: `/${p.data.slug}/`,
      title: p.data.title,
      headings,
      tags: p.data.tags,
      text: `${p.data.summary} ${plainText(body)}`.slice(0, 300)
    };
  });
  const news = (await getCollection('news')).map((n) => ({
    type: 'news',
    url: `/news/${n.data.weekOf}/#${n.data.id}`,
    title: n.data.title,
    headings: [n.data.source],
    tags: n.data.tags,
    text: n.data.summary.slice(0, 300)
  }));
  return new Response(JSON.stringify([...pages, ...news]), { headers: { 'Content-Type': 'application/json' } });
}
