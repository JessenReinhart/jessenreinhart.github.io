# Hero Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Revamp the portfolio Hero into a type-cut centerpiece (giant `JESSEN` / `REINHART` + oval portrait on the name seam + conversion stack below + scroll cue) while keeping Mirror's Edge tokens, bilingual conversion copy, and existing props/IDs.

**Architecture:** Add a small local `BlurText` component for letter/word reveal. Rewrite `Hero.tsx` from a two-column grid into a full-bleed centered stage. No Navbar changes, no new fonts, no new npm deps, no shadcn.

**Tech Stack:** React 19, TypeScript, Tailwind v4, lucide-react, existing CSS vars / `hero-*` keyframes in `src/index.css`.

## Global Constraints

- Brand display name is hardcoded `JESSEN` / `REINHART` (not translated)
- Accent color = `var(--color-accent)` only (Faith red) — never acid green `#C3E41D`
- Fonts: existing `font-display` (Barlow Condensed) + body/mono — no Fira Code / Antic / Brush Script
- Props stay `{ onViewProjects, onViewResume }`; section `id="hero"`
- Portrait source = `PORTRAIT_IMAGE` from `src/data.ts`
- i18n keys reused only: `t.heroTag`, `t.heroSubtitle`, `t.heroDesc`, `t.heroViewWork`, `t.heroDownloadCv`
- Navbar untouched; no second header / theme toggle inside Hero
- Honor `prefers-reduced-motion`
- No new packages; do not run `npm run dev` (user may already have it)

---

### Task 1: BlurText helper

**Files:**
- Create: `src/components/BlurText.tsx`
- Test: manual + `npm run lint` (project has no unit test runner)

**Interfaces:**
- Consumes: React only
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

- [ ] **Step 1: Create `src/components/BlurText.tsx`**

```tsx
import { useEffect, useMemo, useRef, useState } from "react";

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
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
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const segments = useMemo(
    () => (animateBy === "words" ? text.split(" ") : text.split("")),
    [text, animateBy]
  );

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      className={`inline-flex flex-wrap ${className}`}
      style={style}
    >
      {segments.map((segment, i) => (
        <span
          key={`${segment}-${i}`}
          style={{
            display: "inline-block",
            filter: inView || reduceMotion ? "blur(0px)" : "blur(10px)",
            opacity: inView || reduceMotion ? 1 : 0,
            transform:
              inView || reduceMotion
                ? "translateY(0)"
                : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: reduceMotion
              ? undefined
              : `filter 0.5s ease-out ${i * delay}ms, opacity 0.5s ease-out ${i * delay}ms, transform 0.5s ease-out ${i * delay}ms`,
            willChange: reduceMotion ? undefined : "filter, opacity, transform",
          }}
        >
          {segment === " " ? "\u00A0" : segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run lint`  
Expected: PASS (no errors in BlurText)

- [ ] **Step 3: Commit**

```bash
git add src/components/BlurText.tsx
git commit -m "feat(hero): add BlurText letter/word reveal helper"
```

---

### Task 2: Rewrite Hero as type-cut centerpiece

**Files:**
- Modify: `src/components/Hero.tsx` (full rewrite)
- Consumes: `BlurText`, `PORTRAIT_IMAGE`, `useLanguage`, `translations`, lucide icons, existing button classes

**Interfaces:**
- Consumes: `BlurText` from Task 1; props unchanged:

```ts
interface HeroProps {
  onViewProjects: () => void;
  onViewResume: () => void;
}
```

- Produces: same default export `Hero` used by `App.tsx` — no App.tsx changes

- [ ] **Step 1: Replace `src/components/Hero.tsx` entirely**

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
      {/* Soft diagonal accent */}
      <div
        className="absolute -right-16 top-1/4 w-[40vw] max-w-xl h-[40vw] max-h-xl opacity-40 pointer-events-none z-0"
        style={{
          background: "linear-gradient(135deg, var(--color-accent-soft), transparent 65%)",
          clipPath: "polygon(18% 0, 100% 0, 82% 100%, 0 100%)",
        }}
        aria-hidden="true"
      />

      {/* Center stage: name + portrait */}
      <div className="relative flex-1 flex flex-col items-center justify-center z-10 w-full max-w-7xl mx-auto">
        <div className="relative w-full text-center select-none">
          <BlurText
            text="JESSEN"
            delay={90}
            animateBy="letters"
            direction="top"
            as="h1"
            className="font-display font-extrabold text-[clamp(4.5rem,18vw,13rem)] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
            style={{ color: "var(--color-accent)" }}
          />
          <BlurText
            text="REINHART"
            delay={90}
            animateBy="letters"
            direction="top"
            as="span"
            className="font-display font-extrabold text-[clamp(4.5rem,18vw,13rem)] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
            style={{ color: "var(--color-accent)" }}
          />

          {/* Oval portrait on seam */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <div className="w-[65px] h-[110px] sm:w-[90px] sm:h-[152px] md:w-[110px] md:h-[185px] lg:w-[129px] lg:h-[218px] rounded-full overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-110 pointer-events-auto">
              <img
                src={PORTRAIT_IMAGE}
                alt="Jessen Profile Photo"
                fetchPriority="high"
                width="129"
                height="218"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale contrast-110"
              />
            </div>
          </div>
        </div>

        {/* Conversion stack */}
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

      {/* Scroll cue */}
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

- [ ] **Step 3: Visual smoke (dev server already running — do NOT start another)**

Check in browser at the running port (usually `http://localhost:3000`):
1. Giant red `JESSEN` / `REINHART` centered, letter blur-in
2. Oval portrait straddles the two lines
3. Status / subtitle / desc / CTAs / socials under name
4. Chevron scrolls to About
5. Toggle dark mode via existing Navbar — colors stay token-based
6. Toggle ID language — conversion copy switches, name stays JESSEN/REINHART
7. Mobile width: name clamps, portrait smaller, stack readable

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat(hero): type-cut centerpiece with oval seam portrait"
```

---

### Task 3: Polish pass (only if smoke finds issues)

**Files:**
- Modify: `src/components/Hero.tsx` and/or `src/components/BlurText.tsx` as needed
- Possibly `src/index.css` only if a new reduced-motion rule is required (prefer component-level)

Common fixes:
- Name too large on small phones → tighten clamp min to `3.5rem` or add `px-2`
- Portrait covering letters too much → slightly reduce oval size or raise/lower with `top-[48%]`
- Conversion stack cramped under long ID copy → reduce `mt-*` or desc `max-w`
- H1 accessibility: ensure only one heading — if two BlurText both use h1, change second to `as="span"` (already in Step 1)

- [ ] **Step 1: Apply only needed polish from smoke**
- [ ] **Step 2: `npm run lint`**
- [ ] **Step 3: Commit if any changes**

```bash
git add src/components/Hero.tsx src/components/BlurText.tsx
git commit -m "fix(hero): polish type-cut sizing and reduced motion"
```

---

## Self-review vs spec

| Spec item | Task |
|---|---|
| Full-bleed min-h stage | Task 2 |
| JESSEN / REINHART | Task 2 |
| Oval portrait on seam | Task 2 |
| Conversion stack below | Task 2 |
| Chevron → #about | Task 2 |
| BlurText + reduced motion | Task 1 |
| ME tokens / no new fonts / no shadcn | Global + Task 2 |
| Props + id hero stable | Task 2 |
| No App/Navbar change | Global |

No placeholders. No new deps. No DESIGN.md palette change.
