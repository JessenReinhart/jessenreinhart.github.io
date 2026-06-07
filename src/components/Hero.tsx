import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, Code, Cpu, Database, FolderGit2, Layers, Briefcase, Download, Github, Linkedin, Mail, Compass } from "lucide-react";
import { PORTRAIT_IMAGE } from "../data";

interface HeroProps {
  onViewProjects: () => void;
  onViewResume: () => void;
}

export default function Hero({ onViewProjects, onViewResume }: HeroProps) {
  // Parallax scrolling effects
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 500], [0, 100]);
  const imageY = useTransform(scrollY, [0, 500], [0, -50]);
  const bgCodeY = useTransform(scrollY, [0, 1000], [0, 150]);

  // Floating technology presets
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
      className="relative min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden px-6 md:px-12 lg:px-24 pt-28 md:pt-16 pb-24 lg:pb-12"
    >
      {/* Editorial horizontal/vertical background grid lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 bottom-0 left-[10%] w-px bg-zinc-800" />
        <div className="absolute top-0 bottom-0 left-[50%] w-px bg-zinc-800" />
        <div className="absolute top-0 bottom-0 left-[90%] w-px bg-zinc-800" />
        <div className="absolute left-0 right-0 top-[25%] h-px bg-zinc-800" />
        <div className="absolute left-0 right-0 top-[75%] h-px bg-zinc-800" />
      </div>

      {/* Abstract background code snippets cascading */}
      <motion.div
        style={{ y: bgCodeY }}
        className="absolute left-[8%] top-[15%] text-zinc-800 font-mono text-xs select-none pointer-events-none hidden xl:block z-0 text-left"
      >
        <pre className="text-zinc-800/40">
{`const build = () => {
    return excellence;
};`}
        </pre>
        <span className="block mt-4 text-[10px] tracking-widest text-zinc-800/30 uppercase">REACTJS // TYPESCRIPT // NEXTJS // TAILWIND</span>
        <span className="block text-[10px] tracking-widest text-zinc-800/30 uppercase mt-1">BANKING PLATFORMS // CMS ARCHITECTURE</span>
        <span className="block text-[10px] tracking-widest text-zinc-800/30 uppercase mt-1">PERFORMANCE OPTIMIZATION</span>
      </motion.div>

      {/* Left Vertical Status Connection Rail */}
      <div className="absolute left-6 bottom-[15%] top-[15%] w-10 border border-white/5 bg-zinc-950/40 backdrop-blur-md rounded-md py-8 flex flex-col justify-between items-center z-30 hidden xl:flex">
        <div className="flex flex-col items-center gap-3">
          {/* Status indicators removed */}
        </div>
        <div className="flex flex-col items-center gap-6 text-zinc-500">
          <a href="https://github.com/jessenreinhart" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="GitHub Link">
            <Github className="w-4 h-4" />
          </a>
          <a href="https://linkedin.com/in/jessenreinhart" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn Link">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="mailto:jessen_1206@yahoo.com" className="hover:text-white transition-colors" aria-label="Email Link">
            <Mail className="w-4 h-4" />
          </a>
        </div>
        <div className="h-40 relative flex items-center justify-center">
          <span className="absolute rotate-90 whitespace-nowrap text-[8px] font-mono tracking-[0.25em] text-zinc-500 uppercase select-none">
            AVAILABLE FOR NEW PROJECTS //
          </span>
        </div>
      </div>

      {/* Giant Behind-the-Scene Background Typography */}
      <div className="absolute inset-x-0 top-[35%] md:top-[38%] -translate-y-1/2 z-[5] pointer-events-none md:pl-10 xl:pl-16">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative h-full">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
            style={{ y: textY }}
            className="font-display font-black text-8xl sm:text-[11rem] md:text-[13rem] lg:text-[17.5rem] leading-[0.85] text-white/[0.12] tracking-tighter select-none text-left pointer-events-none"
          >
            Jessen
          </motion.h1>
        </div>
      </div>

      {/* Floating Mockup Code Snippet Card - behind portrait at z-[6] */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.65, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        style={{ y: textY }}
        className="absolute right-[33%] top-[14%] border border-white/5 bg-[#09090b]/60 backdrop-blur-xl rounded-2xl p-4 select-none text-[9px] font-mono text-zinc-400 hidden xl:block z-[6] text-left max-w-[210px] leading-relaxed shadow-2xl"
      >
        <div className="flex items-center justify-between mb-2.5 border-b border-white/5 pb-1.5 text-zinc-600">
          <span className="text-[8.5px] text-zinc-500 tracking-wider font-mono uppercase">Developer Node</span>
          <span className="text-[8px] text-zinc-600 font-mono">Jessen.tsx</span>
        </div>
        <div className="text-zinc-600 leading-snug">
          <span>import React from 'react';</span><br />
          <span>const Jessen = () =&gt; &#125;</span>
        </div>
        <div className="mt-2 text-zinc-500">
          <span className="text-blue-500">const</span> <span className="text-purple-400">Jessen</span> = () =&gt; &#123;<br />
          <span className="pl-2.5 text-blue-500">return</span> (<br />
          <span className="pl-5 text-zinc-600">&lt;</span><span className="text-green-500">div</span> <span className="text-yellow-500">className</span>=<span className="text-orange-400">"engineer"</span><span className="text-zinc-600">&gt;</span><br />
          <span className="pl-7.5 text-zinc-600">&lt;</span><span className="text-green-500">code</span><span className="text-zinc-600">&gt;</span>Building ideas<span className="text-zinc-600">&lt;/</span><span className="text-green-500">code</span><span className="text-zinc-600">&gt;</span><br />
          <span className="pl-5 text-zinc-600">&lt;/</span><span className="text-green-500">div</span><span className="text-zinc-600">&gt;</span><br />
          <span className="pl-2.5">);</span><br />
          &#125;
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 md:pl-10 xl:pl-16">
        
        {/* Column 1: Left Info Content (lg:col-span-6) */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left relative z-20">
          
          {/* Tagline Outline Box */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center mb-6 px-3 py-1.5 rounded-md border border-white/10 bg-zinc-950/40 backdrop-blur-sm self-start shadow-sm select-none"
          >
            <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-300 uppercase">
              SENIOR FRONTEND ENGINEER
            </span>
          </motion.div>

          {/* Titles matching mockup proportions */}
          <div className="relative mb-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium text-white tracking-tight leading-none mb-1">
              Senior Frontend Engineer
            </h2>
            <div className="text-2xl sm:text-3xl md:text-4xl font-mono text-zinc-300 font-medium tracking-normal leading-none mt-2 select-none">
              &amp; Creative Problem Solver
            </div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg text-zinc-400 max-w-lg font-light leading-relaxed mb-10"
          >
            Seven years of experience building web applications, digital banking tools, and custom administration layouts.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <button
              onClick={onViewProjects}
              className="px-8 py-4 bg-white text-black font-semibold text-xs font-mono tracking-widest hover:bg-zinc-200 hover:scale-105 transition-all duration-300 rounded-full flex items-center justify-center gap-2 shadow-xl cursor-pointer"
              data-cursor="project"
            >
              VIEW MY WORK
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onViewResume}
              className="px-8 py-4 border border-white/15 text-white hover:border-white/40 hover:bg-white/5 font-semibold text-xs font-mono tracking-widest transition-all duration-300 rounded-full flex items-center justify-center gap-2 cursor-pointer"
              data-cursor="button"
            >
              DOWNLOAD CV
              <Download className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>

        {/* Column 2: Transparent Profile/Portrait Cutout (lg:col-span-4) */}
        <div className="lg:col-span-4 relative flex justify-center items-center z-20 w-full mt-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, cubicBezier: [0.16, 1, 0.3, 1] }}
            style={{ y: imageY }}
            className="relative w-full aspect-[4/5] sm:max-w-md lg:max-w-[400px] select-none group"
          >
            {/* The Cutout profile image */}
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

            {/* Premium cinematic lighting overlay behind portrait */}
            <div className="absolute inset-0 bg-radial-gradient from-white/[0.04] to-transparent pointer-events-none rounded-full blur-[60px]" />
          </motion.div>

          {/* Floating technology presets orbiting dynamically */}
          {techs.slice(0, 3).map((tech, idx) => {
            const xCoords = ["-15%", "105%", "35%"];
            const yCoords = ["25%", "45%", "-10%"];
            
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ 
                  opacity: 1, 
                  y: [0, -8, 0],
                }}
                transition={{
                  scale: { duration: 0.5 },
                  y: {
                    repeat: Infinity,
                    duration: 4 + idx,
                    ease: "easeInOut",
                    delay: tech.delay
                  }
                }}
                style={{
                  position: "absolute",
                  left: xCoords[idx],
                  top: yCoords[idx],
                }}
                className="hidden md:flex items-center gap-2 px-3  py-1.5 rounded-full border border-white/8 glass-panel text-[10px] font-mono text-zinc-300 tracking-wider shadow-md select-none pointer-events-none z-30 font-semibold"
              >
                {tech.icon}
                <span>{tech.name}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Column 3: Far Right Stats/Metric Stack (lg:col-span-2) */}
        <div className="lg:col-span-2 flex flex-col gap-4 w-full lg:h-full justify-center relative z-20 mt-8 lg:mt-0">
          
          {/* Card 1 */}
          <div className="border border-white/8 bg-zinc-950/40 backdrop-blur-md rounded-2xl p-4 hover:border-white/20 transition-colors text-left overflow-hidden">
            <div className="font-display font-black text-xl text-white">7+</div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mt-0.5 leading-tight break-words">Years Experience</div>
          </div>

          {/* Card 2 */}
          <div className="border border-white/8 bg-zinc-950/40 backdrop-blur-md rounded-2xl p-4 hover:border-white/20 transition-colors text-left overflow-hidden">
            <div className="font-display font-black text-xl text-white">20+</div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mt-0.5 leading-tight break-words">Projects Delivered</div>
          </div>

          {/* Card 3 */}
          <div className="border border-white/8 bg-zinc-950/40 backdrop-blur-md rounded-2xl p-4 hover:border-white/20 transition-colors text-left overflow-hidden">
            <div className="font-display font-black text-xl text-white">30M+</div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mt-0.5 leading-tight break-words">End Users Impacted</div>
          </div>

          {/* Card 4 - Location Box */}
          <div className="border border-white/8 bg-zinc-950/40 backdrop-blur-md rounded-2xl p-4 text-left relative overflow-hidden select-none">
            <span className="block text-[8px] font-mono text-zinc-500 uppercase tracking-[0.2em] mb-1">BASED IN</span>
            <div className="flex items-center">
              <span className="text-xs font-semibold text-white">Jakarta, Indonesia</span>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Bottom-Left Horizontal Expertise Banner */}
      <div className="absolute left-6 md:left-12 lg:left-24 bottom-8 border border-white/8 bg-zinc-950/60 backdrop-blur-md rounded-lg py-2.5 px-6 hidden xl:flex items-center gap-4 z-30 select-none">
        <span className="text-[9px] font-mono tracking-[0.2em] text-zinc-500 uppercase font-black">EXPERTISE</span>
        <span className="text-zinc-700">/</span>
        <div className="flex items-center gap-3.5 text-[10px] font-mono text-zinc-400">
          <span className="hover:text-white transition-colors">ReactJS</span>
          <span className="text-zinc-800">•</span>
          <span className="hover:text-white transition-colors">Next.js</span>
          <span className="text-zinc-800">•</span>
          <span className="hover:text-white transition-colors">TypeScript</span>
          <span className="text-zinc-800">•</span>
          <span className="hover:text-white transition-colors">TailwindCSS</span>
          <span className="text-zinc-800">•</span>
          <span className="hover:text-white transition-colors font-medium">Java / Spring Boot</span>
        </div>
      </div>

      {/* Floating Bottom-Right Featured Project Card */}
      <div 
        className="absolute right-6 md:right-12 bottom-8 max-w-sm border border-white/10 bg-zinc-950/80 backdrop-blur-md rounded-2xl p-4 text-left hidden xl:flex items-center gap-4 hover:border-white/25 transition-all group cursor-pointer z-30"
        onClick={onViewProjects}
      >
        <div className="w-14 h-14 rounded-xl border border-white/5 bg-zinc-900/60 flex items-center justify-center flex-shrink-0 text-zinc-400 group-hover:text-white transition-colors">
          <Compass className="w-6 h-6 transition-transform duration-500 ease-out group-hover:rotate-[30deg]" />
        </div>
        <div className="flex-1">
          <span className="text-[8px] font-mono tracking-[0.2em] text-zinc-500 uppercase">FEATURED PROJECT</span>
          <h4 className="text-sm font-display font-bold text-white tracking-tight mt-0.5 flex items-center gap-1.5">
            TripCore <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </h4>
          <p className="text-[10px] text-zinc-400 font-light leading-snug line-clamp-1 mt-1">
            Real-time collaborative itinerary builder.
          </p>
        </div>
      </div>

      {/* Bounce-scrolling indicator at the bottom center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity pointer-events-none">
        <span className="text-[9px] font-mono tracking-[0.3em] text-zinc-500 uppercase">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-zinc-400" />
        </motion.div>
      </div>
    </section>
  );
}
