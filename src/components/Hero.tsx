import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, Code, Cpu, Database, FolderGit2, Layers, Briefcase, Download, Github, Linkedin, Mail, Compass } from "lucide-react";
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
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bgCodeRef = useRef<HTMLDivElement>(null);
  const codeCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (textRef.current) textRef.current.style.transform = `translateY(${Math.min(y, 500) / 500 * 100}px)`;
        if (imageRef.current) imageRef.current.style.transform = `translateY(${-(Math.min(y, 500) / 500) * 50}px)`;
        if (bgCodeRef.current) bgCodeRef.current.style.transform = `translateY(${Math.min(y, 1000) / 1000 * 150}px)`;
        if (codeCardRef.current) codeCardRef.current.style.transform = `translateY(${Math.min(y, 500) / 500 * 100}px)`;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const techs = [
    { name: "ReactJS", icon: <Code className="w-3.5 h-3.5" />, delay: 0 },
    { name: "NextJS", icon: <Cpu className="w-3.5 h-3.5" />, delay: 1.5 },
    { name: "TypeScript", icon: <Briefcase className="w-3.5 h-3.5" />, delay: 0.8 },
    { name: "TailwindCSS", icon: <Layers className="w-3.5 h-3.5" />, delay: 2.2 },
    { name: "Spring Boot", icon: <FolderGit2 className="w-3.5 h-3.5" />, delay: 1.1 },
    { name: "PostgreSQL", icon: <Database className="w-3.5 h-3.5" />, delay: 2.7 }
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 md:px-12 lg:px-24 pt-28 md:pt-16 pb-24 lg:pb-12"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      {/* Grid lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 bottom-0 left-[10%] w-px" style={{ backgroundColor: "var(--color-border-primary)" }} />
        <div className="absolute top-0 bottom-0 left-[50%] w-px" style={{ backgroundColor: "var(--color-border-primary)" }} />
        <div className="absolute top-0 bottom-0 left-[90%] w-px" style={{ backgroundColor: "var(--color-border-primary)" }} />
        <div className="absolute left-0 right-0 top-[25%] h-px" style={{ backgroundColor: "var(--color-border-primary)" }} />
        <div className="absolute left-0 right-0 top-[75%] h-px" style={{ backgroundColor: "var(--color-border-primary)" }} />
      </div>

      {/* Background code snippets */}
      <div
        ref={bgCodeRef}
        className="absolute left-[8%] top-[15%] font-mono text-xs select-none pointer-events-none hidden xl:block z-0 text-left will-change-transform"
      >
        <pre style={{ color: "var(--color-text-dim)", opacity: 0.4 }}>
{`const build = () => {
    return excellence;
};`}
        </pre>
        <span className="block mt-4 text-[10px] tracking-widest uppercase" style={{ color: "var(--color-text-dim)", opacity: 0.3 }}>REACTJS // TYPESCRIPT // NEXTJS // TAILWIND</span>
      </div>

      {/* Left Vertical Rail */}
      <div className="absolute left-6 bottom-[15%] top-[15%] w-10 backdrop-blur-md rounded-md py-8 flex flex-col justify-between items-center z-30 hidden xl:flex" style={{ border: "1px solid var(--color-border-primary)", backgroundColor: "var(--color-bg-glass)" }}>
        <div className="flex flex-col items-center gap-3" />
        <div className="flex flex-col items-center gap-6" style={{ color: "var(--color-text-muted)" }}>
          <a href="https://github.com/jessenreinhart" target="_blank" rel="noopener noreferrer" className="transition-colors" style={{ color: "inherit" }} aria-label="GitHub Link">
            <Github className="w-4 h-4" />
          </a>
          <a href="https://linkedin.com/in/jessenreinhart" target="_blank" rel="noopener noreferrer" className="transition-colors" style={{ color: "inherit" }} aria-label="LinkedIn Link">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="mailto:jessenreinharts@gmail.com" className="transition-colors" style={{ color: "inherit" }} aria-label="Email Link">
            <Mail className="w-4 h-4" />
          </a>
        </div>
        <div className="h-40 relative flex items-center justify-center">
          <span className="absolute rotate-90 whitespace-nowrap text-[8px] font-mono tracking-[0.25em] uppercase select-none" style={{ color: "var(--color-text-muted)" }}>
            {t.heroAvailable}
          </span>
        </div>
      </div>

      {/* Giant Background Typography */}
      <div className="absolute inset-x-0 top-[35%] md:top-[38%] -translate-y-1/2 z-[5] pointer-events-none md:pl-10 xl:pl-16">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative h-full">
          <h1
            ref={textRef}
            aria-hidden="true"
            className="font-display font-black text-8xl sm:text-[11rem] md:text-[13rem] lg:text-[17.5rem] leading-[0.85] tracking-tighter select-none text-left pointer-events-none will-change-transform hero-fade-in"
            style={{ color: "var(--color-text-dim)" }}
          >
            Jessen
          </h1>
        </div>
      </div>

      {/* Floating Code Card */}
      <div
        ref={codeCardRef}
        className="absolute right-[33%] top-[14%] backdrop-blur-xl rounded-2xl p-4 select-none text-[9px] font-mono hidden xl:block z-[6] text-left max-w-[210px] leading-relaxed shadow-2xl will-change-transform hero-fade-in-delayed"
        style={{ backgroundColor: "var(--color-bg-glass)" }}
      >
        <div className="flex items-center justify-between mb-2.5 pb-1.5" style={{ borderBottom: "1px solid var(--color-border-primary)" }}>
          <span className="text-[8.5px] tracking-wider font-mono uppercase" style={{ color: "var(--color-text-muted)" }}>Developer Node</span>
          <span className="text-[8px] font-mono" style={{ color: "var(--color-text-dim)" }}>Jessen.tsx</span>
        </div>
        <div className="leading-snug" style={{ color: "var(--color-text-dim)" }}>
          <span>import React from 'react';</span><br />
          <span>const Jessen = () =&gt; &#125;</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 md:pl-10 xl:pl-16">
        {/* Left Content */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left relative z-20">
          <div
            className="flex items-center mb-6 px-3 py-1.5 rounded-md backdrop-blur-sm self-start shadow-sm select-none hero-slide-up"
            style={{ border: "1px solid var(--color-border-primary)", backgroundColor: "var(--color-bg-glass)" }}
          >
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: "var(--color-text-secondary)" }}>
              {t.heroTag}
            </span>
          </div>

          <div className="relative mb-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight leading-none mb-1" style={{ color: "var(--color-text-primary)" }}>
              Muhammad Jessen Reinhart Sugiarto
            </h2>
            <div className="text-2xl sm:text-3xl md:text-4xl font-mono font-medium tracking-normal leading-none mt-2 select-none" style={{ color: "var(--color-text-secondary)" }}>
              {t.heroSubtitle}
            </div>
          </div>

          <p
            className="text-base md:text-lg max-w-lg font-light leading-relaxed mb-10 hero-slide-up-delayed"
            style={{ color: "var(--color-text-muted)" }}
          >
            {t.heroDesc}
          </p>

          <div
            className="flex flex-wrap gap-4 items-center hero-slide-up-delayed-2"
          >
            <button
              onClick={onViewProjects}
              className="px-8 py-4 font-semibold text-xs font-mono tracking-widest hover:scale-105 transition-all duration-300 rounded-full flex items-center justify-center gap-2 shadow-xl cursor-pointer"
              style={{ backgroundColor: "var(--color-text-primary)", color: "var(--color-bg-primary)" }}
              data-cursor="project"
            >
              {t.heroViewWork}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onViewResume}
              className="px-8 py-4 border font-semibold text-xs font-mono tracking-widest transition-all duration-300 rounded-full flex items-center justify-center gap-2 cursor-pointer"
              style={{ borderColor: "var(--color-border-primary)", color: "var(--color-text-primary)" }}
              data-cursor="button"
            >
              {t.heroDownloadCv}
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Portrait */}
        <div className="lg:col-span-4 relative flex justify-center items-center z-20 w-full mt-8 lg:mt-0">
          <div
            ref={imageRef}
            className="relative w-full aspect-[4/5] sm:max-w-md lg:max-w-[400px] select-none group hero-scale-in will-change-transform"
          >
            <img
              src={PORTRAIT_IMAGE}
              alt="Jessen Profile Photo"
              fetchPriority="high"
              width="400"
              height="500"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain grayscale brightness-95 opacity-98 group-hover:scale-[1.03] transition-transform duration-[2000ms] ease-out select-none relative z-10"
              style={{
                maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)"
              }}
            />
          </div>

          {techs.slice(0, 3).map((tech, idx) => {
            const xCoords = ["-15%", "105%", "35%"];
            const yCoords = ["25%", "45%", "-10%"];
            return (
              <div
                key={tech.name}
                style={{ position: "absolute", left: xCoords[idx], top: yCoords[idx], animationDelay: `${tech.delay}s` }}
                className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-[10px] font-mono tracking-wider shadow-md select-none pointer-events-none z-30 font-semibold hero-float-${idx}`}
              >
                {tech.icon}
                <span style={{ color: "var(--color-text-secondary)" }}>{tech.name}</span>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="lg:col-span-2 flex flex-col gap-4 w-full lg:h-full justify-center relative z-20 mt-8 lg:mt-0">
          {[
            { val: "20", label: t.statInstitutions },
            { val: "30M", label: t.statUsers },
            { val: "2M", label: t.statOrders },
          ].map((stat) => (
            <div key={stat.label} className="backdrop-blur-md rounded-2xl p-4 transition-colors text-left overflow-hidden" style={{ border: "1px solid var(--color-border-primary)", backgroundColor: "var(--color-bg-glass)" }}>
              <div className="font-display font-black text-xl" style={{ color: "var(--color-text-primary)" }}>{stat.val}</div>
              <div className="text-[10px] font-mono uppercase tracking-wider mt-0.5 leading-tight break-words" style={{ color: "var(--color-text-muted)" }}>{stat.label}</div>
            </div>
          ))}
          <div className="backdrop-blur-md rounded-2xl p-4 text-left relative overflow-hidden select-none" style={{ border: "1px solid var(--color-border-primary)", backgroundColor: "var(--color-bg-glass)" }}>
            <span className="block text-[8px] font-mono uppercase tracking-[0.2em] mb-1" style={{ color: "var(--color-text-muted)" }}>BASED IN</span>
            <span className="text-xs font-semibold" style={{ color: "var(--color-text-primary)" }}>Jakarta, Indonesia</span>
          </div>
        </div>
      </div>

      {/* Expertise Banner */}
      <div className="absolute left-6 md:left-12 lg:left-24 bottom-8 backdrop-blur-md rounded-lg py-2.5 px-6 hidden xl:flex items-center gap-4 z-30 select-none" style={{ border: "1px solid var(--color-border-primary)", backgroundColor: "var(--color-bg-glass)" }}>
        <span className="text-[9px] font-mono tracking-[0.2em] uppercase font-black" style={{ color: "var(--color-text-muted)" }}>{t.heroExpertise}</span>
        <span style={{ color: "var(--color-text-dim)" }}>/</span>
        <div className="flex items-center gap-3.5 text-[10px] font-mono" style={{ color: "var(--color-text-muted)" }}>
          <span>ReactJS</span>
          <span style={{ color: "var(--color-text-dim)" }}>•</span>
          <span>Next.js</span>
          <span style={{ color: "var(--color-text-dim)" }}>•</span>
          <span>TypeScript</span>
          <span style={{ color: "var(--color-text-dim)" }}>•</span>
          <span>TailwindCSS</span>
          <span style={{ color: "var(--color-text-dim)" }}>•</span>
          <span className="font-medium">Java / Spring Boot</span>
        </div>
      </div>

      {/* Featured Project Card */}
      <div
        className="absolute right-6 md:right-12 bottom-8 max-w-sm backdrop-blur-md rounded-2xl p-4 text-left hidden xl:flex items-center gap-4 transition-all group cursor-pointer z-30"
        style={{ border: "1px solid var(--color-border-primary)", backgroundColor: "var(--color-bg-glass)" }}
        onClick={onViewProjects}
      >
        <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors" style={{ border: "1px solid var(--color-border-primary)", color: "var(--color-text-muted)" }}>
          <Compass className="w-6 h-6 transition-transform duration-500 ease-out group-hover:rotate-[30deg]" />
        </div>
        <div className="flex-1">
          <span className="text-[8px] font-mono tracking-[0.2em] uppercase" style={{ color: "var(--color-text-muted)" }}>FEATURED PROJECT</span>
          <h4 className="text-sm font-display font-bold tracking-tight mt-0.5 flex items-center gap-1.5" style={{ color: "var(--color-text-primary)" }}>
            TripCore <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" style={{ color: "var(--color-text-muted)" }} />
          </h4>
          <p className="text-[10px] font-light leading-snug line-clamp-1 mt-1" style={{ color: "var(--color-text-muted)" }}>
            Real-time collaborative itinerary builder.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity pointer-events-none">
        <span className="text-[9px] font-mono tracking-[0.3em] uppercase" style={{ color: "var(--color-text-muted)" }}>{t.heroScroll}</span>
        <div className="hero-scroll-bounce">
          <ArrowDown className="w-3.5 h-3.5" style={{ color: "var(--color-text-muted)" }} />
        </div>
      </div>
    </section>
  );
}
