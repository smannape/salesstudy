# Sales Hub

A static Astro site with two jobs: daily 10-minute reference cards on enterprise-software and OFS selling to Gulf NOCs, and a weekly oil & gas digital news tracker that an agent updates. Blueprint dark theme, no runtime framework.

## Commands

```
nvm use 22
npm ci
npm run validate   # check news.json; merge src/data/incoming.json if present
npm run build      # Zod-validated build into dist/
npm run preview
npm run dev
```

## Layout

- `src/content/pages/*.md`: the 11 knowledge pages. Frontmatter is validated in `src/content.config.ts`.
- `src/data/news.json`, `seen.json`: the news archive and its canonical-URL index. Only `npm run validate` should write to these.
- `src/data/sources.json`, `events.json`: the curated sources and the event calendar.
- `scripts/news-lib.mjs`: the news gate (canonical URLs, sha1 ids, de-dup, staleness, allowlist, 12 items per week). Its Zod schema mirrors `content.config.ts`, so keep the two in sync.
- `src/scripts/enhance.ts`: client-side features (persisted checklists, the whitespace matrix, the MEDDPICC scorer, TOC highlighting).
- `.claude/skills/weekly-news/SKILL.md` and `.github/workflows/weekly-news.yml`: the weekly agent.

## Markdown conventions for pages

The conventions are: `<div class="panel">` for cards; `<span class="tag warning">indicative</span>`, `tag` (inference) and `tag danger` (unverified) for flags; `<div class="callout gap">` for gaps; `<details class="collapsible"><summary>…` for question lists; `<div class="checklist" data-checklist="id">` around a `- [ ]` task list; and `.kpi-grid` / `.kpi` for metric tiles. Leave a blank line after an opening HTML tag and before its closing tag so the Markdown inside still renders. The Today page builds its card of the day from the collapsibles and checklists.

## Deploy setup

1. Push this folder to its own GitHub repo, preferably private, because GitHub disables schedules in public repos after 60 days without activity.
2. In Netlify, import the repo. `netlify.toml` already sets the build command and publish directory. Then change `site` in `astro.config.mjs` to the real Netlify URL.
3. Add the `ANTHROPIC_API_KEY` repo secret and install the Claude GitHub App with `/install-github-app`.
4. Run **Weekly AI news update** once via `workflow_dispatch` and check the result.

The workflow installs dependencies and runs the agent. The agent may commit but not push. The workflow then re-runs `npm run validate` and `npm run build`, and pushes to `main` only if both pass. Netlify rebuilds from that push. One deploy a week costs about 60–75 of the 300 free credits per month.

Before the first run, check two things: that the model id `claude-sonnet-5-5` is still current, and that the `--allowedTools` rule syntax is accepted (CLAUDE.md §7 open risks).
