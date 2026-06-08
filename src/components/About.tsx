import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { STATS } from "../data";
import { Layers, Zap, Award, Users, ShoppingCart } from "lucide-react";

// Helper component for counting up numbers smoothly
function CountingNumber({ targetVal, duration = 2000, suffix = "" }: { targetVal: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = targetVal;
    const totalSteps = 60;
    const stepTime = duration / totalSteps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / totalSteps;
      // Ease out quad
      const easeVal = progress * (2 - progress);
      const currentCount = Math.floor(easeVal * end);
      
      setCount(currentCount);

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        setCount(end);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, targetVal, duration]);

  // Handle human-readable large quantities
  const formatValue = (val: number) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(0)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(0)}k`;
    return val.toString();
  };

  return (
    <span ref={ref} className="font-display font-extrabold text-3xl sm:text-4xl lg:text-xl xl:text-4xl text-white tracking-tighter whitespace-nowrap">
      {formatValue(count)}
      {suffix}
    </span>
  );
}

export default function About() {
  const specializations = [
    "React & Next.js Frameworks",
    "Enterprise Software Systems",
    "Web Banking Structures",
    "Performance Tuning and Auditing",
    "Design Systems and Component Libraries",
    "Content Management Systems (CMS)",
    "White-label Tenant Infrastructure",
    "Micro-Frontend Systems"
  ];

  // Map indexes to statistical symbols
  const icons = [
    <Award className="w-5 h-5 text-zinc-400" />,
    <Layers className="w-5 h-5 text-zinc-400" />,
    <Users className="w-5 h-5 text-zinc-400" />,
    <Zap className="w-5 h-5 text-zinc-400" />,
    <ShoppingCart className="w-5 h-5 text-zinc-400" />
  ];

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 bg-[#090909] overflow-hidden border-y border-white/5 scroll-mt-20"
    >
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-white/[0.01] blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Heading */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="block font-mono text-[10px] tracking-[0.3em] text-zinc-500 uppercase mb-3">
              01 // BIOGRAPHY
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-none">
              Building Web Systems Since 2019
            </h2>
          </div>
          <div className="max-w-md text-zinc-400 font-light text-sm leading-relaxed text-left md:text-right">
            Frontend engineer with seven years of experience building web applications, auditing client execution, and designing modular system codebases.
          </div>
        </div>

        {/* Narrative & Skills Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          {/* Main Story Text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h3 className="text-xl md:text-2xl font-light text-zinc-200 tracking-wide leading-relaxed">
              Based in Jakarta, Indonesia, Jessen structures applications around{" "}
              <strong className="text-white font-medium">performance tuning, responsive layouts, and clean codebase logic</strong>.
            </h3>
            <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base">
              My engineering work extends beyond superficial visual adjustments. Having built critical transactions modules for online banking services and generic merchant dashboards, I focus on loading speed, module decoupling, and code reliability.
            </p>
            <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base">
              From minimizing server-rendered document size to maintaining zero compilation warnings, I build user ports using strict TypeScript configurations, component hierarchies, and optimized browser resource loads.
            </p>
          </div>

          {/* Core Specialization Columns */}
          <div className="lg:col-span-5 bg-zinc-950/40 border border-white/5 p-8 rounded-2xl relative">
            <div className="absolute top-3 right-4 font-mono text-[9px] text-zinc-600 uppercase select-none">
              SPECIALIZATIONS
            </div>
            <h4 className="text-xs font-mono tracking-wider text-zinc-500 uppercase mb-6 text-left">
              TECHNICAL FOCUS
            </h4>
            <ul className="space-y-4 text-left">
              {specializations.map((spec, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <span className="font-mono text-zinc-600 group-hover:text-zinc-400 transition-colors select-none">—</span>
                  <span className="text-zinc-300 font-light text-sm group-hover:text-white transition-colors">
                    {spec}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bento Grid Analytics Statistics Panel */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
          {STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className="glass-panel border border-white/8 p-4 sm:p-5 md:p-6 rounded-2xl flex flex-col justify-between text-left relative glass-panel-hover overflow-hidden min-w-0"
            >
              <div className="absolute top-3 right-3 opacity-40">
                {icons[idx]}
              </div>
              <div className="mb-3">
                <CountingNumber
                  targetVal={stat.numericVal}
                  suffix={stat.value.includes("+") ? "+" : ""}
                />
              </div>
              <div className="text-zinc-400 text-[10px] sm:text-xs font-mono uppercase tracking-wider leading-tight break-words">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
