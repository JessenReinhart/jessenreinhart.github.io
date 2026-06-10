import { motion, useScroll, useTransform } from "motion/react";
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

  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 500], [0, 100]);
  const imageY = useTransform(scrollY, [0, 500], [0, -50]);
  const bgCodeY = useTransform(scrollY, [0, 1000], [0, 150]);

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
      <motion.div
        style={{ y: bgCodeY }}
        className="absolute left-[8%] top-[15%] font-mono text-xs select-none pointer-events-none hidden xl:block z-0 text-left"
      >
        <pre style={{ color: "var(--color-text-dim)", opacity: 0.4 }}>
{`const build = () => {
    return excellence;
};`}
        </pre>
        <span className="block mt-4 text-[10px] tracking-widest uppercase" style={{ color: "var(--color-text-dim)", opacity: 0.3 }}>REACTJS // TYPESCRIPT // NEXTJS // TAILWIND</span>
      </motion.div>

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
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
            style={{ y: textY, color: "var(--color-text-dim)", opacity: 0.08 }}
            className="font-display font-black text-8xl sm:text-[11rem] md:text-[13rem] lg:text-[17.5rem] leading-[0.85] tracking-tighter select-none text-left pointer-events-none"
          >
            Jessen
          </motion.h1>
        </div>
      </div>

      {/* Floating Code Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.65, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        style={{ y: textY, backgroundColor: "var(--color-bg-glass)" }}
        className="absolute right-[33%] top-[14%] backdrop-blur-xl rounded-2xl p-4 select-none text-[9px] font-mono hidden xl:block z-[6] text-left max-w-[210px] leading-relaxed shadow-2xl"
      >
        <div className="flex items-center justify-between mb-2.5 pb-1.5" style={{ borderBottom: "1px solid var(--color-border-primary)" }}>
          <span className="text-[8.5px] tracking-wider font-mono uppercase" style={{ color: "var(--color-text-muted)" }}>Developer Node</span>
          <span className="text-[8px] font-mono" style={{ color: "var(--color-text-dim)" }}>Jessen.tsx</span>
        </div>
        <div className="leading-snug" style={{ color: "var(--color-text-dim)" }}>
          <span>import React from 'react';</span><br />
          <span>const Jessen = () =&gt; &#125;</span>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 md:pl-10 xl:pl-16">
        {/* Left Content */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center mb-6 px-3 py-1.5 rounded-md backdrop-blur-sm self-start shadow-sm select-none"
            style={{ border: "1px solid var(--color-border-primary)", backgroundColor: "var(--color-bg-glass)" }}
          >
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: "var(--color-text-secondary)" }}>
              {t.heroTag}
            </span>
          </motion.div>

          <div className="relative mb-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight leading-none mb-1" style={{ color: "var(--color-text-primary)" }}>
              Muhammad Jessen Reinhart Sugiarto
            </h2>
            <div className="text-2xl sm:text-3xl md:text-4xl font-mono font-medium tracking-normal leading-none mt-2 select-none" style={{ color: "var(--color-text-secondary)" }}>
              {t.heroSubtitle}
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg max-w-lg font-light leading-relaxed mb-10"
            style={{ color: "var(--color-text-muted)" }}
          >
            {t.heroDesc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-4 items-center"
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
          </motion.div>
        </div>

        {/* Portrait */}
        <div className="lg:col-span-4 relative flex justify-center items-center z-20 w-full mt-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, cubicBezier: [0.16, 1, 0.3, 1] }}
            style={{ y: imageY }}
            className="relative w-full aspect-[4/5] sm:max-w-md lg:max-w-[400px] select-none group"
          >
            <img
              src={PORTRAIT_IMAGE}
              alt="Jessen Profile Photo"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain grayscale brightness-95 opacity-98 group-hover:scale-[1.03] transition-transform duration-[2000ms] ease-out select-none relative z-10"
              style={{
                maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)"
              }}
            />
          </motion.div>

          {techs.slice(0, 3).map((tech, idx) => {
            const xCoords = ["-15%", "105%", "35%"];
            const yCoords = ["25%", "45%", "-10%"];
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: [0, -8, 0] }}
                transition={{
                  scale: { duration: 0.5 },
                  y: { repeat: Infinity, duration: 4 + idx, ease: "easeInOut", delay: tech.delay }
                }}
                style={{ position: "absolute", left: xCoords[idx], top: yCoords[idx] }}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-[10px] font-mono tracking-wider shadow-md select-none pointer-events-none z-30 font-semibold"
              >
                {tech.icon}
                <span style={{ color: "var(--color-text-secondary)" }}>{tech.name}</span>
              </motion.div>
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
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
          <ArrowDown className="w-3.5 h-3.5" style={{ color: "var(--color-text-muted)" }} />
        </motion.div>
      </div>
    </section>
  );
}
