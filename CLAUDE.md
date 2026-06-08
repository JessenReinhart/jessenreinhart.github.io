# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install              # Install dependencies
npm run dev              # Start dev server (port 3000, binds 0.0.0.0)
npm run build            # Production build to dist/
npm run lint             # Type-check with tsc --noEmit
```

`npm run clean` is available (`rm -rf dist`) but rarely needed — Vite handles stale output.

## Architecture

This is Jessen Reinhart's portfolio — a single-page React app deployed to GitHub Pages via the workflow at `.github/workflows/deploy.yml` (builds on push to `master`).

**Scroll-spy navigation pattern:** `App.tsx` owns `activeSection` state derived from scroll position. It passes this down to `Navbar` along with an `onNavigate` callback that calls `element.scrollIntoView()`. Each major section (`Hero`, `About`, `Experience`, `Projects`, `Skills`, `Contact`) has an `id` matching the nav link IDs. Section order in `App.tsx` is the canonical layout. The marquee banner between `Hero` and `About` is inline in `App.tsx`, not a separate component.

**Resume modal:** `ResumeViewer` renders as a fullscreen overlay via Framer Motion's `AnimatePresence`, toggled by `resumeOpen` state in `App.tsx`. It has its own print-optimized layout (no separate CSS file).

**Data layer:** All portfolio content lives in `src/data.ts` as typed arrays — `EXPERIENCES`, `PROJECTS`, `SKILL_CATEGORIES`, `STATS`. Types are in `src/types.ts`. When updating content, only `data.ts` needs changes; components consume these exports directly.

**Styling approach:** Tailwind CSS v4 via `@tailwindcss/vite` plugin. Custom theme tokens (fonts, colors) defined with `@theme` in `src/index.css`. Reusable utility classes like `.glass-panel`, `.noise-overlay`, `.text-stroke` are defined in `index.css`. Motion/react (`motion`) handles all animations.

**Vite config:** `base: "./"` ensures relative asset paths for GitHub Pages compatibility. The `@` path alias resolves to project root.
