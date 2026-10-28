import { getCollection, type CollectionEntry } from 'astro:content';

/** News grouped by ISO run week, newest week first. */
export async function newsByWeek(): Promise<{ weeks: string[]; byWeek: Map<string, CollectionEntry<'news'>[]> }> {
  const all = await getCollection('news');
  const byWeek = new Map<string, CollectionEntry<'news'>[]>();
  for (const item of all) {
    const list = byWeek.get(item.data.weekOf) ?? [];
    list.push(item);
    byWeek.set(item.data.weekOf, list);
  }
  const weeks = [...byWeek.keys()].sort().reverse();
  return { weeks, byWeek };
}
