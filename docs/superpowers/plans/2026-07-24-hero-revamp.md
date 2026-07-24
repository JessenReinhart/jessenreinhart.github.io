# Hero Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Revamp the portfolio Hero into a type-cut centerpiece (giant `JESSEN` / `REINHART` + oval portrait on the name seam + conversion stack below + scroll cue) while keeping Mirror's Edge tokens, bilingual conversion copy, and existing props/IDs.

**Architecture:** Add a small local `BlurText` component for letter/word reveal using `motion.span` (no IntersectionObserver). Rewrite `Hero.tsx` from a two-column grid into a full-bleed centered stage. No Navbar changes, no new fonts, no new npm deps, no shadcn.

**Tech Stack:** React 19, TypeScript, Tailwind v4, lucide-react, `motion` (already in package.json), existing CSS vars / `hero-*` keyframes in `src/index.css`.

## Global Constraints

- Brand display name is hardcoded `JESSEN` / `REINHART` (not translated)
- Accent color = `var(--color-accent)` only (Faith red) — never acid green `#C3E41D`
- Fonts: existing `font-display` (Barlow Condensed) + body/mono — no Fira Code / Antic / Brush Script
- Props stay `{ onViewProjects, onViewResume }`; section `id="hero"`
- Portrait source = `PORTRAIT_IMAGE` from `src/data.ts`
- Portrait filter: `contrast-110` only — **no `grayscale`** unless design explicitly adds it
- Type size: **`text-[clamp(3.5rem,10vw,7rem)]`** — never `clamp(4.5rem,18vw,13rem)`
- BlurText: **`motion.span` staggered children** — **no IntersectionObserver**
- i18n keys reused only: `t.heroTag`, `t.heroSubtitle`, `t.heroDesc`, `t.heroViewWork`, `t.heroDownloadCv`
- Navbar untouched; no second header / theme toggle inside Hero
- Honor `prefers-reduced-motion` (via `useReducedMotion` from `motion/react` or matchMedia)
- No new packages; do not run `npm run dev` (user may already have it)

---

### Task 1: BlurText helper (motion.span)

**Files:**
- Create/overwrite: `src/components/BlurText.tsx`
- Test: `npm run lint`

**Interfaces:**
- Consumes: `motion` from `motion/react`, React
- Produces:

```ts
interface BlurTextProps {
  text: string;
  delay?: number; // ms per segment, default 50
  animateBy?: "words" | "letters"; // default "words"
  direction?: "top" | "bottom"; // default "top"
  className?: string;
  style?: React.CSSProperties;
  as?: "p" | "span" | "h1" | "h2"; // default "p"
}

export default function BlurText(props: BlurTextProps): JSX.Element;
```

- [ ] **Step 1: Write `src/components/BlurText.tsx`**

```tsx
import { useMemo, type CSSProperties, type ElementType } from "react";
import { motion, useReducedMotion } from "motion/react";

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: CSSProperties;
  as?: "p" | "span" | "h1" | "h2";
}

export default function BlurText({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
  as: Tag = "p",
}: BlurTextProps) {
  const reduceMotion = useReducedMotion();
  const segments = useMemo(
    () => (animateBy === "words" ? text.split(" ") : text.split("")),
    [text, animateBy]
  );

  const yFrom = direction === "top" ? -20 : 20;
  const Component = Tag as ElementType;

  return (
    <Component className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <motion.span
          key={`${segment}-${i}`}
          initial={
            reduceMotion
              ? false
              : { filter: "blur(10px)", opacity: 0, y: yFrom }
          }
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.5, ease: "easeOut", delay: (i * delay) / 1000 }
          }
          style={{ display: "inline-block" }}
        >
          {segment === " " ? "\u00A0" : segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Component>
  );
}
```

Hard rules for this file:
- MUST import from `motion/react`
- MUST use `motion.span` for segments
- MUST NOT use `IntersectionObserver`
- MUST honor reduced motion (instant final state)

- [ ] **Step 2: Typecheck**

Run: `npm run lint`  
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/BlurText.tsx
git commit -m "feat(hero): BlurText via motion.span (no IntersectionObserver)"
```

---

### Task 2: Rewrite Hero as type-cut centerpiece

**Files:**
- Modify: `src/components/Hero.tsx` (full rewrite)
- Consumes: `BlurText`, `PORTRAIT_IMAGE`, `useLanguage`, `translations`, lucide icons, existing button classes

**Interfaces:**
- Props unchanged:

```ts
interface HeroProps {
  onViewProjects: () => void;
  onViewResume: () => void;
}
```

- [ ] **Step 1: Replace `src/components/Hero.tsx`**

Critical class strings (verbatim):
- Name size: `text-[clamp(3.5rem,10vw,7rem)]` — **never** `18vw` / `13rem`
- Portrait img class: `w-full h-full object-cover contrast-110` — **no `grayscale`**

```tsx
import { ArrowUpRight, ChevronDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { PORTRAIT_IMAGE } from "../data";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18n/translations";
import BlurText from "./BlurText";

interface HeroProps {
  onViewProjects: () => void;
  onViewResume: () => void;
}

export default function Hero({ onViewProjects, onViewResume }: HeroProps) {
  const { lang } = useLanguage();
  const t = translations[lang];

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col overflow-hidden px-6 md:px-12 pt-28 md:pt-32 pb-20"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div
        className="absolute -right-16 top-1/4 w-[40vw] max-w-xl h-[40vw] max-h-xl opacity-40 pointer-events-none z-0"
        style={{
          background: "linear-gradient(135deg, var(--color-accent-soft), transparent 65%)",
          clipPath: "polygon(18% 0, 100% 0, 82% 100%, 0 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative flex-1 flex flex-col items-center justify-center z-10 w-full max-w-7xl mx-auto">
        <div className="relative w-full text-center select-none">
          <BlurText
            text="JESSEN"
            delay={90}
            animateBy="letters"
            direction="top"
            as="h1"
            className="font-display font-extrabold text-[clamp(3.5rem,10vw,7rem)] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
            style={{ color: "var(--color-accent)" }}
          />
          <BlurText
            text="REINHART"
            delay={90}
            animateBy="letters"
            direction="top"
            as="span"
            className="font-display font-extrabold text-[clamp(3.5rem,10vw,7rem)] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
            style={{ color: "var(--color-accent)" }}
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <div className="w-[65px] h-[110px] sm:w-[90px] sm:h-[152px] md:w-[110px] md:h-[185px] lg:w-[129px] lg:h-[218px] rounded-full overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-110 pointer-events-auto">
              <img
                src={PORTRAIT_IMAGE}
                alt="Jessen Profile Photo"
                fetchPriority="high"
                width="129"
                height="218"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover contrast-110"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-14 flex flex-col items-center text-center max-w-2xl w-full">
          <div className="flex items-center gap-2.5 mb-5 select-none hero-slide-up">
            <span className="w-1 h-3.5 me-accent-bar shrink-0" />
            <span
              className="text-[10px] font-mono tracking-[0.22em] uppercase"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {t.heroTag}
            </span>
          </div>

          <p
            className="text-xl sm:text-2xl md:text-3xl font-display font-semibold tracking-wide leading-none uppercase hero-slide-up-delayed"
            style={{ color: "var(--color-text-primary)" }}
          >
            {t.heroSubtitle}
          </p>

          <p
            className="text-base md:text-lg max-w-lg font-light leading-relaxed mt-5 mb-8 hero-slide-up-delayed"
            style={{ color: "var(--color-text-muted)" }}
          >
            {t.heroDesc}
          </p>

          <div className="flex flex-wrap gap-3 items-center justify-center hero-slide-up-delayed-2">
            <button
              type="button"
              onClick={onViewProjects}
              className="me-btn-primary px-7 py-3.5 font-semibold text-xs font-mono tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer"
            >
              {t.heroViewWork}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onViewResume}
              className="me-btn-ghost px-7 py-3.5 font-semibold text-xs font-mono tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer"
            >
              {t.heroDownloadCv}
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>

          <div
            className="flex items-center gap-5 mt-8 hero-slide-up-delayed-2"
            style={{ color: "var(--color-text-muted)" }}
          >
            <a
              href="https://github.com/jessenreinhart"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[var(--color-accent)]"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/jessenreinhart"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[var(--color-accent)]"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:jessenreinharts@gmail.com"
              className="transition-colors hover:text-[var(--color-accent)]"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToAbout}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-10 hero-scroll-bounce cursor-pointer"
        aria-label="Scroll to about"
        style={{ color: "var(--color-text-muted)" }}
      >
        <ChevronDown className="w-5 h-5 md:w-7 md:h-7 transition-colors hover:text-[var(--color-accent)]" />
      </button>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run lint`  
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat(hero): type-cut centerpiece, clamp 10vw/7rem, no grayscale"
```

---

### Task 3: Polish pass (only if smoke finds issues)

- Name overflow on very small screens → confirm clamp min 3.5rem + px-6 is enough
- Portrait covering letters → fine-tune oval size if needed
- Re-run `npm run lint`

---

## Self-review vs corrected constraints

| Constraint | Task |
|---|---|
| `clamp(3.5rem,10vw,7rem)` | Task 2 |
| BlurText = `motion.span`, no IntersectionObserver | Task 1 |
| No grayscale on portrait | Task 2 |
| JESSEN / REINHART + oval seam + conversion stack | Task 2 |
| Faith red CSS vars only | Task 2 |
| Props + id hero stable | Task 2 |
