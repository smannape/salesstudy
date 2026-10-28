---
title: "Running the sales cycle"
slug: "running-the-cycle"
summary: "Discovery, demo and POC checklists; the SE role by stage; where SEs win and lose; engineer-to-sales mistakes and remedies."
tags: ["discovery", "demo", "poc", "presales", "checklist", "coaching"]
order: 9
readMinutes: 9
updated: "2026-10-28"
---

## Discovery call checklist

Source: [Gong discovery tips](https://www.gong.io/blog/here-are-the-11-best-discovery-call-tips-youll-read-this-year) unless noted.

<div class="checklist" data-checklist="discovery-call">

- [ ] Open with the Sandler up-front contract: objective, agenda, outcome ([Hyperbound Sandler](https://www.hyperbound.ai/blog/sandler-pain-funnel))
- [ ] Open every meeting with "What's changed since the last time we talked?"
- [ ] Plan 11–14 questions, spread across the call (success 46% for 1–6, 66% for 7–10, 74% for 11–14, 67% for 15–18); C-suite: ~4 questions
- [ ] Talk ≤65% of the time (top reps run 46:54)
- [ ] Phrase for long answers; mirror; label emotions; ask questions based on what was just said; webcam on (closed-won used webcams 41% more)
- [ ] Cover current state (environment, problem, impact, root cause, emotion) and future state ([Gong Gap Selling](https://www.gong.io/blog/gap-selling))
- [ ] Cover MEDDPICC elements ([Hyperbound](https://www.hyperbound.ai/blog/meddpicc-discovery-questions))
- [ ] SE covers solution/technology discovery — As-Is architecture, what works and what doesn't ([Presales Collective](https://presalescollective.com/content/winning-early-the-role-of-the-solution-engineer-early-in-the-sales-cycle))
- [ ] Leave with a written next step

</div>

## Demo checklist

<div class="checklist" data-checklist="demo">

- [ ] No unscoped "vanilla" demo; run a reverse demo if pain is unclear ([Presales Collective](https://presalescollective.com/content/winning-early-the-role-of-the-solution-engineer-early-in-the-sales-cycle))
- [ ] "Do the last thing first"; engage in the first six minutes; cover the customer's key business issues first ([Pragmatic Institute / Great Demo!](https://pragmaticinstitute.com/resources/webinars/product/create-and-deliver-surprisingly-compelling-software-demonstrations))
- [ ] No "Harbor Tour" feature-by-feature walkthrough — "stunningly awful" ([The Juice](https://app.thejuicehq.com/content/g93bWdQ8nX81qkjkSdEXq7ui))
- [ ] Qualify first: 35% of demos are unqualified ([Consensus 2025](https://goconsensus.com/blog/key-insights-2025-report))
- [ ] Demo is the largest stage drop-off — leave with a written next step ([Zeliq](https://www.zeliq.com/blog/sales-cycle))
- [ ] Three-feature limit; map each feature to a stated pain; trial-close after key moments ([Pulse RevOps](https://pulserevops.com/knowledge/q14046))

</div>

## POC / pilot checklist

Source: [Pertama Partners](https://www.pertamapartners.com/insights/running-ai-proof-of-concept-successful-pilots) unless noted.

### Before day one

<div class="checklist" data-checklist="poc-before-day-one">

- [ ] Must/Should success criteria with numbers (e.g. Must ≥95% accuracy; Should <30s per item)
- [ ] Data source and ground-truth owner named; ground truth verified by two people
- [ ] Named vendor support, internal technical staff, business users and PM
- [ ] Time-box agreed — "weeks, not months"
- [ ] 2–3 use cases only
- [ ] Decision meeting date set
- [ ] Who makes the go/no-go call is named
- [ ] What "proceed" triggers commercially is agreed
- [ ] POC tied to MEDDPICC Decision Process so a technical pass advances the paper process

</div>

<div class="callout gap">

**Gap.** The article gives the time-box as 2–4 weeks in its body and 4–8 weeks in its FAQ — inconsistent; treat as "weeks, not months".

</div>

### Phases

1. **Planning** — scope, criteria, data, ground truth, resources, timeline.
2. **Execution** — setup, configuration, test runs, measurement, user feedback, issue log.
3. **Evaluation** — quantitative/qualitative analysis, gap/risk review, recommendation.

### Exit decision

**Proceed / Conditional / Extend / Fail**, judged across technical viability, business value and organisational readiness.

### Failure modes

Undefined criteria · vendor-controlled data · scope creep · no ground truth · limited user involvement · vendor-optimised configuration · "POC theater".

### Context

- Serious trials happen after a preferred vendor is chosen ([TechRepublic on Gartner](https://www.techrepublic.com/article/most-technology-purchases-come-with-high-degree-of-regret-gartner-says/)).
- Poor trials cause switching even on >$1M deals ([Digital Commerce 360](https://www.digitalcommerce360.com/2025/10/28/forrester-b2b-buyers-demand-proof-not-promises/)).
- Tie the POC to MEDDPICC Decision Process so a technical pass advances the paper process.

## SE role by stage

<div class="panel">

<p class="eyebrow">Card</p>

### Solution engineer by stage

Source: [Presales Collective](https://presalescollective.com/content/winning-early-the-role-of-the-solution-engineer-early-in-the-sales-cycle).

| Stage | SE job |
|---|---|
| Research | Deep-dive on customer systems; whiteboard pains/use cases with the AE before contact |
| Discovery | As-Is architecture |
| Outcomes definition | Lead "Art of the Possible" workshops; define To-Be and success metrics |
| Evaluation | Scoped demos / POCs |

- "Value Creator" early vs "Value Fulfiller" late.
- 70% of deals require presales; 6+ AEs per SE raises burnout ([Consensus 2025](https://goconsensus.com/blog/key-insights-2025-report)).

</div>

### Where SEs win and lose <span class="tag">inference</span>

- **Win on:** As-Is discovery; authoring To-Be metrics; shaping required capabilities; scoped demos; criteria-gated POCs; credible implementation estimates.
- **Lose on:** harbor tours; criteria-less POCs; late arrival; silence on infosec until legal; technical win without a business case; over-promising via AI-generated collateral.

## Engineer-to-sales mistakes

<div class="panel">

<p class="eyebrow">Card</p>

### Engineer-to-sales mistakes and remedies

Source: [Pulse RevOps](https://pulserevops.com/knowledge/q14046).

**Mistakes**

- Over-demoing.
- Feature-selling without outcomes.
- Skipping qualification.
- Never trial-closing.
- Tracking demo count.
- Misdiagnosing coaching needs.
- Overcorrecting into a "second AE" and hand-waving architecture.
- Generic training instead of per-SE coaching.

**Remedies**

- "No demo without discovery" gate.
- Diagnose skill / will / knowledge / process.
- Technical win as the SE deliverable.
- Show less, map more.
- GROW coaching on the SE's own recordings.
- Leading indicators: time to first question, features shown vs pains mapped, trial-closes per demo.

</div>

### Management-level traps <span class="tag">inference</span>

- Measuring on activity, not technical wins / POC conversion.
- Forecasting on CRM stage, not evidence.
- Under-investing in procurement / paper-process knowledge.
- Treating pilots as free engineering.
- LAMP "stop investments" include generic demos and treating every positive comment as buying intent ([Sybill LAMP](https://www.sybill.ai/blogs/miller-heiman-lamp)).

<div class="callout gap">

**Gap.** No survey-based study on engineer-to-sales transitions was found; this is practitioner commentary only, with nothing specific to Middle East relationship norms.

</div>
