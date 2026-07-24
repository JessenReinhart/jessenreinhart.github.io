# PROPOSAL — Hero type-cut revamp (corrected)

## Hard constraints (must not invent)
1. Type: `text-[clamp(3.5rem,10vw,7rem)]` — never 18vw/13rem
2. BlurText: `motion.span` + `useReducedMotion` from `motion/react` — NO IntersectionObserver
3. Portrait: `contrast-110` only — NO grayscale

## Task 1 — BlurText
- File: `src/components/BlurText.tsx`
- Plain Tag wrapper + `motion.span` children (no motion[Tag] cast)
- Stagger blur/opacity/y; reduced motion → duration 0 / initial false
- Code: see plan Task 1

## Task 2 — Hero
- File: `src/components/Hero.tsx`
- Full-bleed center stage: JESSEN (h1) / REINHART (span)
- Oval PORTRAIT_IMAGE on seam
- Conversion stack: t.hero* + CTAs + socials
- ChevronDown → #about
- Code: see plan Task 2

## Verify
- `npm run lint` exit 0
- Grep: zero IntersectionObserver, zero grayscale, zero 18vw/13rem in these files
