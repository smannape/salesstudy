#!/usr/bin/env node
// Merge agent output into news.json. Same gate as `npm run validate`, but fails when there is nothing to merge.
import { existsSync } from 'node:fs';
import { PATHS } from './news-lib.mjs';

if (!existsSync(PATHS.incoming)) {
  console.error(`✗ ${PATHS.incoming} not found — nothing to merge.`);
  process.exit(1);
}
await import('./validate-news.mjs');
