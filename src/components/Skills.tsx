import { useState, useRef, MouseEvent } from "react";
import { motion } from "motion/react";
import { SKILL_CATEGORIES } from "../data";
import { Code2, Settings, Compass, HelpCircle } from "lucide-react";

// Individual Magnetic Tag wrapper
function MagneticTag({ text, key }: { text: string; key?: string }) {
  const cardRef = useRef<HTMLSpanElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLSpanElement>) => {
    if (!cardRef.current) return;
    
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Distances from center
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    
    // Dampen coordinate pull (e.g., maximum 12px shift)
    const factorX = dx * 0.15;
    const factorY = dy * 0.15;
    
    setCoords({ x: factorX, y: factorY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  return (
    <motion.span
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: coords.x,
        y: coords.y,
        scale: isHovered ? 1.05 : 1,
        borderColor: isHovered ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.06)",
        backgroundColor: isHovered ? "rgba(255, 255, 255, 0.05)" : "rgba(10, 10, 10, 0.6)"
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border text-xs font-mono text-zinc-300 backdrop-blur-md relative cursor-none select-none"
    >
      <span className="text-zinc-600 font-medium mr-0.5 select-none font-sans">#</span>
      <span>{text}</span>
    </motion.span>
  );
}

export default function Skills() {
  const categoryIcons = [
    <Code2 className="w-5 h-5 text-zinc-500" />,
    <Settings className="w-5 h-5 text-zinc-500" />,
    <Compass className="w-5 h-5 text-zinc-500" />
  ];

  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 bg-[#050505] overflow-hidden scroll-mt-20 border-t border-white/5"
    >
      <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-white/[0.01] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Heading */}
        <div className="mb-20 text-left">
          <span className="block font-mono text-[10px] tracking-[0.3em] text-zinc-500 uppercase mb-3">
            04 // CAPABILITIES MATRIX
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-none">
            Technical Skills
          </h2>
          <p className="max-w-md text-zinc-400 font-light mt-4 text-sm leading-relaxed">
            Core technologies, programming languages, and development frameworks used across systems.
          </p>
        </div>

        {/* Skills Categories and Tags Panel */}
        <div className="space-y-12">
          {SKILL_CATEGORIES.map((category, idx) => (
            <div
              key={category.name}
              className="glass-panel border border-white/8 rounded-2xl p-8 md:p-10 text-left relative glass-panel-hover"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-6">
                {categoryIcons[idx]}
                <h3 className="text-sm font-mono tracking-widest text-zinc-400 uppercase font-semibold">
                  {category.name}
                </h3>
              </div>

              {/* Flex wall of skills */}
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <MagneticTag key={skill} text={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
