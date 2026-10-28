---
title: "Key metrics to track"
slug: "metrics"
summary: "Formulas and indicative benchmarks for pipeline, win rate, velocity, forecast accuracy and SE metrics; MEDDPICC scoring rubric with stage gates; forecast categories and hygiene."
tags: ["metrics", "forecast", "meddpicc", "pipeline", "presales", "benchmarks"]
order: 10
readMinutes: 10
updated: "2026-10-28"
---

## Formulas and benchmarks

All benchmarks below are generic SaaS/B2B figures — <span class="tag warning">indicative</span> — and none are oil-and-gas-specific.

<div class="kpi-grid">
<div class="kpi"><div class="eyebrow">Pipeline coverage</div><div class="kpi-formula"><code>Open pipeline value / revenue target</code></div><div class="kpi-value num">3–5x</div><div class="kpi-note"><span class="tag warning">indicative</span> General 3–5x; enterprise 4–5x+; ~4x at 25% win rate, 5x+ below 20% <a href="https://www.11x.ai/tips/pipeline-coverage-ratio">11x.ai</a></div></div>
<div class="kpi"><div class="eyebrow">Win rate</div><div class="kpi-formula"><code>Won / (won + lost)</code></div><div class="kpi-value num">~20–21%</div><div class="kpi-note"><span class="tag warning">indicative</span> B2B average (Ebsta × Pavilion, 4.2M opps); top performers 30%+; Gong enterprise ~25% <a href="https://www.hyperbound.ai/blog/b2b-sales-performance-benchmark-2025">Hyperbound</a> · <a href="https://www.saastr.com/gong-100k-deals-take-about-days-to-close">SaaStr/Gong</a></div></div>
<div class="kpi"><div class="eyebrow">Sales velocity</div><div class="kpi-formula"><code>(Opportunities × avg deal value × win rate) / cycle days</code></div><div class="kpi-value num">$1,250/day</div><div class="kpi-note"><span class="tag warning">indicative</span> Example: (150 × $1,000 × 0.25) / 30 = $1,250/day <a href="https://www.salesforce.com/blog/sales/sales-velocity">Salesforce</a></div></div>
<div class="kpi"><div class="eyebrow">Forecast accuracy</div><div class="kpi-formula"><code>Commit = closed-won / commit · Best case = closed-won / best case · Pipeline = closed-won / weighted pipeline</code></div><div class="kpi-value num">85%</div><div class="kpi-note"><span class="tag warning">indicative</span> Commit median 85%, top quartile 95%+; &lt;80% = over-committing; best-case &gt;55% = sandbagging (vendor-authored, unsourced) <a href="https://www.growthspreeofficial.com/blogs/b2b-saas-sales-forecast-accuracy-benchmarks-2026-commit-best-case-pipeline-by-stage">GrowthSpree</a></div></div>
<div class="kpi"><div class="eyebrow">CAC payback</div><div class="kpi-formula"><code>CAC / (avg monthly revenue per customer × gross margin %)</code></div><div class="kpi-value num">18–24 mo</div><div class="kpi-note"><span class="tag warning">indicative</span> Enterprise 18–24 months; NRR 118% <a href="https://resources.rework.com/libraries/growth-frameworks/cac-payback-optimization">Rework</a></div></div>
<div class="kpi"><div class="eyebrow">Customer lifetime</div><div class="kpi-formula"><code>1 / monthly churn</code></div><div class="kpi-value num">—</div><div class="kpi-note"><span class="tag warning">indicative</span> No benchmark given; remaining lifetime should be ≥2x CAC payback <a href="https://resources.rework.com/libraries/growth-frameworks/cac-payback-optimization">Rework</a></div></div>
<div class="kpi"><div class="eyebrow">Technical win rate</div><div class="kpi-formula"><code>Won / (won + lost) for deals with medium/intensive SE involvement</code></div><div class="kpi-value num">25–40%</div><div class="kpi-note"><span class="tag warning">indicative</span> Enterprise 25–40%; scorecard target ≥45% <a href="https://resources.rework.com/de/guides/sales-engineer-playbooks/sales-engineer-metrics">Rework SE metrics</a></div></div>
<div class="kpi"><div class="eyebrow">POC success rate</div><div class="kpi-formula"><code>POCs meeting pre-agreed criteria AND closed-won / all completed POCs</code></div><div class="kpi-value num">60%+</div><div class="kpi-note"><span class="tag warning">indicative</span> &lt;40% broken; 60%+ disciplined; &gt;75% possibly rejecting too many <a href="https://resources.rework.com/de/guides/sales-engineer-playbooks/sales-engineer-metrics">Rework SE metrics</a></div></div>
<div class="kpi"><div class="eyebrow">Demo conversion</div><div class="kpi-formula"><code>First demos advancing within 14 days / total first demos</code></div><div class="kpi-value num">50–65%</div><div class="kpi-note"><span class="tag warning">indicative</span> 50–65% healthy; &lt;40% = demos too generic <a href="https://resources.rework.com/de/guides/sales-engineer-playbooks/sales-engineer-metrics">Rework SE metrics</a></div></div>
<div class="kpi"><div class="eyebrow">Deal velocity contribution</div><div class="kpi-formula"><code>Avg days-to-close (no SE) − avg days-to-close (with SE)</code></div><div class="kpi-value num">≥7 days</div><div class="kpi-note"><span class="tag warning">indicative</span> 12–28% faster cited; target ≥7 days saved <a href="https://resources.rework.com/de/guides/sales-engineer-playbooks/sales-engineer-metrics">Rework SE metrics</a></div></div>
<div class="kpi"><div class="eyebrow">Multi-threading</div><div class="kpi-formula"><code>Buyer contacts per deal</code></div><div class="kpi-value num">~2x</div><div class="kpi-note"><span class="tag warning">indicative</span> Closed-won has ~2x the contacts of lost; buying groups 6–11, up to 15–17 <a href="https://www.hyperbound.ai/blog/b2b-sales-performance-benchmark-2025">Hyperbound</a></div></div>
<div class="kpi"><div class="eyebrow">Quota attainment</div><div class="kpi-formula"><code>Reps at quota / reps</code></div><div class="kpi-value num">28%</div><div class="kpi-note"><span class="tag warning">indicative</span> 28% in 2023 (from 44% in 2022); page figures conflict — cite as "roughly two-thirds or more missed" <a href="https://www.hyperbound.ai/blog/b2b-sales-performance-benchmark-2025">Hyperbound</a></div></div>
</div>

<details class="collapsible">
<summary>Full table</summary>

| Metric | Formula | Benchmark <span class="tag warning">indicative</span> | Source |
|---|---|---|---|
| Pipeline coverage | Open pipeline value / revenue target | 3–5x general; enterprise 4–5x+; ~4x at 25% win rate, 5x+ below 20% | [11x.ai](https://www.11x.ai/tips/pipeline-coverage-ratio) |
| Win rate | Won / (won + lost) | ~20–21% B2B average (Ebsta × Pavilion, 4.2M opps); top performers 30%+; Gong enterprise ~25% | [Hyperbound benchmark](https://www.hyperbound.ai/blog/b2b-sales-performance-benchmark-2025); [SaaStr/Gong](https://www.saastr.com/gong-100k-deals-take-about-days-to-close) |
| Sales velocity | (Opportunities × avg deal value × win rate) / cycle days | Example (150 × $1,000 × 0.25)/30 = $1,250/day | [Salesforce](https://www.salesforce.com/blog/sales/sales-velocity) |
| Forecast accuracy | Commit accuracy = closed-won / commit; Best-case accuracy = closed-won / best case; Pipeline accuracy = closed-won / weighted pipeline | Commit median 85%, top quartile 95%+; <80% = over-committing; best-case >55% = sandbagging (vendor-authored, unsourced) | [GrowthSpree](https://www.growthspreeofficial.com/blogs/b2b-saas-sales-forecast-accuracy-benchmarks-2026-commit-best-case-pipeline-by-stage) |
| CAC payback | CAC / (avg monthly revenue per customer × gross margin %) | Enterprise 18–24 months; NRR 118% | [Rework CAC payback](https://resources.rework.com/libraries/growth-frameworks/cac-payback-optimization) |
| Customer lifetime | 1 / monthly churn | — | [Rework](https://resources.rework.com/libraries/growth-frameworks/cac-payback-optimization) |
| Technical win rate | Won / (won + lost) for deals with medium/intensive SE involvement | Enterprise 25–40%; scorecard target ≥45% | [Rework SE metrics](https://resources.rework.com/de/guides/sales-engineer-playbooks/sales-engineer-metrics) |
| POC success rate | POCs meeting pre-agreed criteria AND closed-won / all completed POCs | <40% broken; 60%+ disciplined; >75% possibly rejecting too many | [Rework SE metrics](https://resources.rework.com/de/guides/sales-engineer-playbooks/sales-engineer-metrics) |
| Demo conversion | First demos advancing within 14 days / total first demos | 50–65% healthy; <40% demos too generic | [Rework SE metrics](https://resources.rework.com/de/guides/sales-engineer-playbooks/sales-engineer-metrics) |
| Deal velocity contribution | Avg days-to-close (no SE) − (with SE) | 12–28% faster cited; target ≥7 days saved | [Rework SE metrics](https://resources.rework.com/de/guides/sales-engineer-playbooks/sales-engineer-metrics) |
| Multi-threading | Buyer contacts per deal | Closed-won has ~2x contacts of lost; groups 6–11, up to 15–17 | [Hyperbound benchmark](https://www.hyperbound.ai/blog/b2b-sales-performance-benchmark-2025) |
| Quota attainment | Reps at quota / reps | 28% in 2023 (from 44% in 2022); page figures conflict — cite as "roughly two-thirds or more missed" | [Hyperbound benchmark](https://www.hyperbound.ai/blog/b2b-sales-performance-benchmark-2025) |

</details>

- Demo count is a vanity metric; measure SEs on influence, not AE quota ([Rework SE metrics](https://resources.rework.com/de/guides/sales-engineer-playbooks/sales-engineer-metrics)).
- For 12–36-month NOC cycles use rolling 24–36-month coverage and per-stage conversion/velocity <span class="tag">inference</span>.

## MEDDPICC scoring rubric

Source: [Kalungi](https://www.kalungi.com/blog/using-meddpicc-inside-hubspot).

Score each of the eight elements 1–4 — **1 Not Met · 2 Partially · 3 Strongly · 4 Outstanding** — and roll them into a 0–100% handicap.

<div class="meddpicc-scorer" data-scorer></div>

### Level-3 ("Strongly met") definitions

| Element | Level 3 means |
|---|---|
| Metrics | Baseline and target for 1–2 metrics with a preliminary business case |
| Economic Buyer | Direct access; acknowledges interest and success criteria |
| Decision Criteria | Documented, weighted, mapped to value |
| Decision Process | Steps, approvers, dates and risks known |
| Paper Process | Redlines known, legal engaged |
| Identify Pain | Tied to measurable impact with an owner |
| Champion | Active internal seller shaping criteria and giving access |
| Competition | Compared against criteria with traps placed |

### Stage gates

- **Qualify exit:** M, E, D (criteria) and Pain each ≥3; average ≥2.5.
- **Validate exit:** the above plus D (process) and Identify ≥3; average ≥3.0.
- **Commit entry:** all eight ≥3; average ≥3.5.

### Red flags

- EB access blocked after two weeks.
- Decision/paper process unknown within 21 days.
- Champion cannot reach the EB or procurement.
- No quantified impact by proposal.

### Forecast formula

`Forecast = deal value × handicap × execution multiplier`, cross-checked against 6+ months of stage history. Example: $100K × 45% × 30% = **$13,500**.

For NOC tenders, expand Paper Process to the public-procurement path (CAPT/K-Tender, technical/commercial evaluation, board approvals) with dates <span class="tag">inference</span>.

## Forecast categories and hygiene

Sources: [Outreach](https://www.outreach.ai/resources/blog/sales-forecast-categories); [Omega VP](https://www.omegavp.com/insight/forecasts-dont-miss-evidence-does-meddpicc-in-the-ai-era/).

| Category | Meaning |
|---|---|
| Commit | Public commitment with provable customer actions (names, dates, documents) |
| Best Case | Could close but contingencies remain |
| Pipeline | Default |
| Omitted | Intentionally removed (not a soft delete) |
| Closed | Closed |

- Start contracting for anything forecast within 45 days.
- Weekly review question: **"What must be true for this to close on time and what proof exists?"**

### Weekly top-10 deal review

<div class="checklist" data-checklist="forecast-weekly-review">

- [ ] EB last contact date
- [ ] Next two customer decision events with dates and attendees
- [ ] Paper-process progress
- [ ] Decision criteria in the customer's own words
- [ ] What the champion did last week without you
- [ ] Baseline and target value

</div>

### Team rule set <span class="tag">inference</span>

<div class="checklist" data-checklist="forecast-team-rules">

- [ ] MEDDPICC refreshed monthly
- [ ] No Commit without an EB meeting in the last 30 days and a dated procurement event
- [ ] Stale >90 days = auto-demote
- [ ] Weekly 30-minute top-10 review

</div>
