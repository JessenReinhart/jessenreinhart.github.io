# AutoBuild Protocol — Hero Revamp

## Agent IDs
- Builder
- Validator
- Main (orchestrator)

## Message Contract

| From → To | Message | Meaning |
|-----------|---------|---------|
| Builder → Validator (+Main) | `PROPOSAL_READY` + text | proposal written, awaiting review |
| Validator → Builder (+Main) | `APPROVED` / `REJECTED: <reasons>` | proposal verdict |
| Builder → Validator (+Main) | `BUILD_DONE` + summary | implementation finished, how verified |
| Validator → Builder (+Main) | `APPROVED` / `CHANGES_REQUESTED: <fixes>` | build verdict |
| Either → Main | any status line | user-facing progress ping |
| Builder → Main | `TASK_COMPLETE` | loop finished successfully |

## HARD CONSTRAINTS (Builder cannot invent; Validator must reject if violated)

1. **Type size:** name uses exactly `text-[clamp(3.5rem,10vw,7rem)]` — NEVER `clamp(4.5rem,18vw,13rem)` or any 18vw/13rem variant.
2. **BlurText motion:** implement with `motion.span` from `motion/react` (staggered blur/opacity/y). **NO `IntersectionObserver`**. Use `useReducedMotion` for a11y.
3. **Portrait filter:** `contrast-110` only. **NO `grayscale`** class unless design explicitly adds it later.

Also still required:
- Brand name hardcoded `JESSEN` / `REINHART`
- Accent = `var(--color-accent)` only (Faith red) — never acid green `#C3E41D`
- No new fonts, no new packages, no shadcn, no Navbar/App edits
- Props `{ onViewProjects, onViewResume }`, `id="hero"`
- Conversion stack + ChevronDown → `#about`
- NEVER run `npm run dev`
- Verify with `npm run lint` (must exit 0)

## Definition of Done
- `src/components/BlurText.tsx` uses `motion.span` + `useReducedMotion`, zero IntersectionObserver
- `src/components/Hero.tsx` type-cut centerpiece with clamp(3.5rem,10vw,7rem), oval seam portrait without grayscale
- `npm run lint` exit 0
- Validator independently re-reads files + re-runs lint, then APPROVED
- Builder sends Main `TASK_COMPLETE`

## Loop
1. Builder writes proposal → `PROPOSAL_READY`
2. Validator `APPROVED` or `REJECTED`
3. Builder implements + verifies → `BUILD_DONE`
4. Validator independently verifies (grep for IntersectionObserver, grayscale, 18vw/13rem; run lint) → `APPROVED` or `CHANGES_REQUESTED`
5. On final `APPROVED`, Builder sends Main `TASK_COMPLETE`
