import { z, defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string().max(300),
    tags: z.array(z.string()).default([]),
    order: z.number().int(),
    readMinutes: z.number().int().optional(),
    updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
  })
});

const news = defineCollection({
  loader: file('src/data/news.json'),
  schema: z.object({
    id: z.string(),                       // sha1(canonicalUrl).slice(0,12)
    title: z.string().min(8).max(200),
    source: z.string(),                   // publisher name
    url: z.string().url(),
    canonicalUrl: z.string().url(),       // scheme+host+path, no query/utm
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),       // publication date
    weekOf: z.string().regex(/^\d{4}-W\d{2}$/),          // ISO week the agent ran
    summary: z.string().max(600),
    tags: z.array(z.string()).max(8),
    relevance: z.number().int().min(1).max(5),
    citedText: z.string().max(150).optional(),
    addedAt: z.string().datetime()
  })
});

export const collections = { pages, news };
