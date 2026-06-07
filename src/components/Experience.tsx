import { motion } from "motion/react";
import { Briefcase, Calendar, MapPin, Code2 } from "lucide-react";
import { EXPERIENCES } from "../data";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-24 md:py-32 bg-[#050505] overflow-hidden scroll-mt-20"
    >
      {/* Decorative vertical blueprint coordinate rails */}
      <div className="absolute top-0 bottom-0 left-[20%] w-px bg-zinc-900/40 hidden xl:block" />
      <div className="absolute top-0 bottom-0 left-[80%] w-px bg-zinc-900/40 hidden xl:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Heading */}
        <div className="mb-20 text-left">
          <span className="block font-mono text-[10px] tracking-[0.3em] text-zinc-500 uppercase mb-3">
            02 // PROFESSIONAL JOURNEY
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-none">
            Professional Experience
          </h2>
          <p className="max-w-md text-zinc-400 font-light mt-4 text-sm leading-relaxed">
            A timeline of custom banking applications, performance tuning, and database optimization built since 2019.
          </p>
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative mt-12">
          {/* Centered vertical bar (Desktop) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-zinc-800/80 -translate-x-[0.5px]" />

          {/* Staggered Timeline Items */}
          <div className="space-y-16 md:space-y-24">
            {EXPERIENCES.map((exp, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className={`flex flex-col md:flex-row relative items-start justify-between w-full ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Node Point (clean minimalist square) */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[#050505] border-2 border-white -translate-x-[5px] top-2 z-20 shadow-md shadow-black" />

                  {/* Left-Side Column placeholder for Dates (Desktop) */}
                  <div className={`hidden md:flex flex-col w-[45%] ${isEven ? "text-left" : "text-right"} pt-0.5`}>
                    <div className="text-sm font-mono tracking-widest text-zinc-500 flex items-center gap-2 justify-end select-none">
                      {!isEven && (
                        <>
                          <Calendar className="w-4 h-4 text-zinc-600 inline-block" />
                          <span>{exp.period}</span>
                        </>
                      )}
                    </div>
                    {isEven && (
                      <div className="text-sm font-mono tracking-widest text-zinc-500 flex items-center gap-2 justify-start select-none">
                        <Calendar className="w-4 h-4 text-zinc-600 inline-block" />
                        <span>{exp.period}</span>
                      </div>
                    )}
                    <div className="mt-1 text-xs text-zinc-600 font-mono tracking-wider uppercase">
                      {exp.location}
                    </div>
                  </div>

                  {/* Right-Side Box / Timeline Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="w-full md:w-[45%] pl-10 md:pl-0"
                  >
                    <div className="glass-panel border border-white/8 rounded-2xl p-6 md:p-8 hover:border-white/20 transition-all duration-400 text-left relative glass-panel-hover">
                      {/* Ribbon Dates (Visible on Mobile only) */}
                      <div className="md:hidden flex flex-wrap items-center gap-3 mb-3 text-[10px] font-mono tracking-wider text-zinc-500 uppercase">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {exp.location}
                        </span>
                      </div>

                      {/* Title & Organization */}
                      <span className="block font-mono text-[9px] text-zinc-600 uppercase tracking-widest select-none mb-1">
                        ROLE DETAILS
                      </span>
                      <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                        {exp.role}
                      </h3>
                      <h4 className="text-xs font-mono font-medium text-zinc-400 mt-1 uppercase tracking-wider">
                        {exp.company}
                      </h4>

                      {/* Deliverables / bullet summaries */}
                      {exp.highlights && exp.highlights.length > 0 && (
                        <div className="mt-6 space-y-3.5 border-t border-white/5 pt-6">
                          {exp.highlights.map((highlight, hIdx) => (
                            <div key={hIdx} className="flex gap-3 items-start">
                              <span className="text-zinc-600 font-mono text-[11px] leading-none mt-[3px] select-none">—</span>
                              <p className="text-zinc-400 font-light text-[13px] leading-relaxed">
                                {highlight}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Technologies Pill Grid */}
                      <div className="mt-8 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-1.5 mb-3 select-none">
                          <Code2 className="w-3 h-3 text-zinc-500" />
                          <span className="text-[9px] font-mono tracking-[0.2em] text-zinc-500 uppercase">
                            STACK DEPLOYED
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 text-[10px] font-mono bg-zinc-950/85 text-zinc-300 border border-white/5 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
