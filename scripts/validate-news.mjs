#!/usr/bin/env node
// Gate for the weekly agent: validates src/data/news.json and, when src/data/incoming.json exists,
// merges the candidates (schema, de-dup, staleness, allowlist, 12/week) and deletes incoming.json.
// Any rejected candidate fails the run and nothing is merged, so the agent must fix or drop it.
// Flags: --dry-run (report only, write nothing).
import { unlinkSync, existsSync } from 'node:fs';
import { PATHS, readJson, writeJson, checkArchive, gateIncoming, sortNews } from './news-lib.mjs';

const dryRun = process.argv.includes('--dry-run');
const news = readJson(PATHS.news, []);
const seen = readJson(PATHS.seen, {});

const archiveErrors = checkArchive(news, seen);
if (archiveErrors.length) {
  console.error(`✗ news.json is invalid (${archiveErrors.length} problems):`);
  archiveErrors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}

if (!existsSync(PATHS.incoming)) {
  console.log(`✓ news.json valid: ${news.length} items. No incoming.json to merge.`);
  process.exit(0);
}

let incoming;
try {
  incoming = readJson(PATHS.incoming, []);
} catch (e) {
  console.error(`✗ incoming.json is not valid JSON: ${e.message}`);
  process.exit(1);
}

const { accepted, rejected, warnings } = gateIncoming(incoming, news, seen);
warnings.forEach((w) => console.warn(`! ${w}`));

if (rejected.length) {
  console.error(`✗ ${rejected.length} of ${incoming.length} candidates rejected — fix or drop them in incoming.json and re-run:`);
  rejected.forEach((r) => console.error(`  - [${r.index}] ${r.title ?? ''}: ${r.reason}`));
  console.error('Nothing was merged.');
  process.exit(1);
}

if (dryRun) {
  console.log(`✓ dry run: ${accepted.length} candidates would be merged.`);
  process.exit(0);
}

const merged = sortNews([...news, ...accepted]);
accepted.forEach((a) => (seen[a.canonicalUrl] = a.id));
writeJson(PATHS.news, merged);
writeJson(PATHS.seen, Object.fromEntries(Object.entries(seen).sort(([a], [b]) => a.localeCompare(b))));
unlinkSync(PATHS.incoming);
console.log(`✓ merged ${accepted.length} items (archive now ${merged.length}); incoming.json removed.`);
