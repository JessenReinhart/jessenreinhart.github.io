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
        <div className="relative w-full select-none">
          <div className="w-full flex justify-center">
            <BlurText
              text="JESSEN"
              delay={90}
              animateBy="letters"
              direction="top"
              as="h1"
              className="font-display font-bold text-[clamp(4rem,13vw,10rem)] leading-[0.72] tracking-tighter uppercase justify-center whitespace-nowrap"
              style={{ color: "var(--color-accent)" }}
            />
          </div>
          <div className="w-full flex justify-center">
            <BlurText
              text="REINHART"
              delay={90}
              animateBy="letters"
              direction="top"
              as="span"
              className="font-display font-bold text-[clamp(4rem,13vw,10rem)] leading-[0.72] tracking-tighter uppercase justify-center whitespace-nowrap"
              style={{ color: "var(--color-accent)" }}
            />
          </div>

          <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <div
              className="w-[60px] h-[90px] sm:w-[70px] sm:h-[105px] md:w-[80px] md:h-[120px] lg:w-[95px] lg:h-[140px] rounded-full overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-110 pointer-events-auto"
              style={{ backgroundColor: "var(--color-bg-surface)" }}
            >
              <img
                src={PORTRAIT_IMAGE}
                alt="Jessen Profile Photo"
                fetchPriority="high"
                width="95"
                height="140"
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
