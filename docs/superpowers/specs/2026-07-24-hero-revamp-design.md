# Hero Revamp — Design Spec

## Goal
Revamp `src/components/Hero.tsx` with the inspo composition (giant centered two-line name + oval portrait cut into the letters + bottom tagline/scroll cue) while preserving the Mirror's Edge brand, conversion stack, bilingual parity, and existing props/IDs.

## Locked decisions
- Layout: full-bleed single stage (`min-h-[100dvh]`)
- Name: `JESSEN` / `REINHART` (hardcoded brand display, not translated)
- Portrait: existing `PORTRAIT_IMAGE`, oval, centered over the seam between the two lines
- Conversion stack below name: status pill → subtitle → desc → CTAs → socials (all via existing `t.*` + props)
- Bottom: ChevronDown scroll cue to `#about`
- Navbar: untouched; no second header, no theme toggle in Hero
- Tokens: Faith red `--color-accent` / `--color-accent-hover`, Barlow Condensed display, CSS vars
- Fonts: no new fonts (no Fira Code / Antic / Brush Script)
- Deps: `lucide-react` already present; no new packages
- Files: edit `src/components/Hero.tsx` + add `src/components/BlurText.tsx` helper

## Architecture
- `Hero` keeps props `{ onViewProjects, onViewResume }`, id `hero`
- New `BlurText` component (local, not shadcn): letter/word reveal via `motion.span` staggered children (no IntersectionObserver); `prefers-reduced-motion` guard
- Portrait: responsive size clamp, `contrast-110` only (no grayscale unless designed), hover scale, z above type

## Motion
- BlurText: blur 10px→0, translateY 20px→0, opacity 0→1, stagger ~80–100ms/segment via `motion` package (`motion.span`), not CSS transition + IntersectionObserver
- Conversion stack: reuse `hero-slide-up` classes
- Scroll cue: `hero-scroll-bounce`

## Type
- Display: `font-display font-extrabold uppercase tracking-tighter leading-[0.75]`
- Size: `clamp(3.5rem, 10vw, 7rem)`
- Color: name = `--color-accent`; tagline/status = muted tokens

## Data / i18n
- Reuse `t.heroTag`, `t.heroSubtitle`, `t.heroDesc`, `t.heroViewWork`, `t.heroDownloadCv`
- No new i18n keys

## Out of scope
- shadcn CLI / `/components/ui` folder (not a shadcn project)
- Navbar rewrite
- DESIGN.md palette change
- acid green, Fira Code, Brush Script
- new npm deps

## Verification
- `npm run lint` (tsc --noEmit) passes
- Desktop + mobile viewport check
- `prefers-reduced-motion` shows final state instantly
- Scroll cue jumps to `#about`
