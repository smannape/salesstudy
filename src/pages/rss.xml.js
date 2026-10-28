import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
export async function GET(context) {
  const items = (await getCollection('news'))
    .sort((a, b) => b.data.addedAt.localeCompare(a.data.addedAt)).slice(0, 50);
  return rss({
    title: 'Sales Hub — O&G digital news',
    description: 'Weekly curated oil & gas digital and Kuwait tender news',
    site: context.site,
    items: items.map(n => ({
      title: n.data.title, pubDate: new Date(n.data.date),
      description: n.data.summary, link: n.data.url
    }))
  });
}
