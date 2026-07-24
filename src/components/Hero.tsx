import { ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { PORTRAIT_IMAGE } from "../data";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18n/translations";

interface HeroProps {
  onViewProjects: () => void;
  onViewResume: () => void;
}

export default function Hero({ onViewProjects, onViewResume }: HeroProps) {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden px-6 md:px-12 pt-28 md:pt-24 pb-16"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      {/* Soft diagonal accent — optional, no box */}
      <div
        className="absolute -right-16 top-1/4 w-[40vw] max-w-xl h-[40vw] max-h-xl opacity-40 pointer-events-none z-0"
        style={{
          background: "linear-gradient(135deg, var(--color-accent-soft), transparent 65%)",
          clipPath: "polygon(18% 0, 100% 0, 82% 100%, 0 100%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left copy */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          {/* Status pill — accent bar + mono only, no border box */}
          <div className="flex items-center gap-2.5 mb-6 self-start select-none hero-slide-up">
            <span className="w-1 h-3.5 me-accent-bar shrink-0" />
            <span
              className="text-[10px] font-mono tracking-[0.22em] uppercase"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {t.heroTag}
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-7xl font-display font-extrabold tracking-tight leading-[0.95] uppercase hero-slide-up"
            style={{ color: "var(--color-text-primary)" }}
          >
            Muhammad Jessen Reinhart Sugiarto
          </h1>

          <p
            className="text-xl sm:text-2xl md:text-3xl font-display font-semibold tracking-wide leading-none mt-4 uppercase hero-slide-up-delayed"
            style={{ color: "var(--color-accent)" }}
          >
            {t.heroSubtitle}
          </p>

          <p
            className="text-base md:text-lg max-w-lg font-light leading-relaxed mt-6 mb-8 hero-slide-up-delayed"
            style={{ color: "var(--color-text-muted)" }}
          >
            {t.heroDesc}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 items-center hero-slide-up-delayed-2">
            <button
              onClick={onViewProjects}
              className="me-btn-primary px-7 py-3.5 font-semibold text-xs font-mono tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer"
            >
              {t.heroViewWork}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onViewResume}
              className="me-btn-ghost px-7 py-3.5 font-semibold text-xs font-mono tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer"
            >
              {t.heroDownloadCv}
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Inline socials — ghost icon links, no boxes */}
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

        {/* Right portrait */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-center w-full">
          {/* Giant RUN watermark behind portrait */}
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none font-display font-extrabold text-[8rem] sm:text-[10rem] lg:text-[12rem] leading-none tracking-tighter uppercase hero-fade-in"
            style={{ color: "var(--color-text-primary)", opacity: 0.04 }}
          >
            RUN
          </span>

          <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md aspect-[4/5] select-none group hero-scale-in">
            {/* Red L-clip accent */}
            <div
              className="absolute -inset-px me-accent-bar opacity-90"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 8px, 8px 8px, 8px 100%, 0 100%)",
              }}
              aria-hidden="true"
            />
            <img
              src={PORTRAIT_IMAGE}
              alt="Jessen Profile Photo"
              fetchPriority="high"
              width="400"
              height="500"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain grayscale contrast-110 opacity-95 group-hover:scale-[1.02] transition-transform duration-700 ease-out select-none relative z-10"
              style={{
                maskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
