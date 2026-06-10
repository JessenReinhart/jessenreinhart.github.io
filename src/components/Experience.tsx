import { motion } from "motion/react";
import { Calendar, MapPin, Code2 } from "lucide-react";
import { EXPERIENCES } from "../data";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18n/translations";

export default function Experience() {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <section id="experience" className="relative py-24 md:py-32 overflow-hidden scroll-mt-20" style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-20 text-left">
          <span className="block font-mono text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: "var(--color-text-muted)" }}>{t.expSection}</span>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tight leading-none" style={{ color: "var(--color-text-primary)" }}>{t.expTitle}</h2>
          <p className="max-w-md font-light mt-4 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{t.expSubtitle}</p>
        </div>

        <div className="relative mt-12">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] -translate-x-[0.5px]" style={{ backgroundColor: "var(--color-border-primary)" }} />

          <div className="space-y-16 md:space-y-24">
            {EXPERIENCES.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              const highlights = lang === "id" && exp.highlightsId ? exp.highlightsId : exp.highlights;
              return (
                <div key={exp.id} className={`flex flex-col md:flex-row relative items-start justify-between w-full ${isEven ? "md:flex-row-reverse" : ""}`}>
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 border-2 -translate-x-[5px] top-2 z-20" style={{ backgroundColor: "var(--color-bg-primary)", borderColor: "var(--color-text-primary)" }} />

                  <div className={`hidden md:flex flex-col w-[45%] ${isEven ? "text-left" : "text-right"} pt-0.5`}>
                    <div className="text-sm font-mono tracking-widest flex items-center gap-2 select-none" style={{ color: "var(--color-text-muted)" }}>
                      {!isEven && <><Calendar className="w-4 h-4 inline-block" style={{ color: "var(--color-text-dim)" }} /><span>{exp.period}</span></>}
                    </div>
                    {isEven && (
                      <div className="text-sm font-mono tracking-widest flex items-center gap-2 justify-start select-none" style={{ color: "var(--color-text-muted)" }}>
                        <Calendar className="w-4 h-4 inline-block" style={{ color: "var(--color-text-dim)" }} /><span>{exp.period}</span>
                      </div>
                    )}
                    <div className="mt-1 text-xs font-mono tracking-wider uppercase" style={{ color: "var(--color-text-dim)" }}>{exp.location}</div>
                  </div>

                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.1 }} className="w-full md:w-[45%] pl-10 md:pl-0">
                    <div className="glass-panel glass-panel-hover rounded-2xl p-6 md:p-8 text-left relative">
                      <div className="md:hidden flex flex-wrap items-center gap-3 mb-3 text-[10px] font-mono tracking-wider uppercase" style={{ color: "var(--color-text-muted)" }}>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {exp.period}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {exp.location}</span>
                      </div>

                      <span className="block font-mono text-[9px] uppercase tracking-widest select-none mb-1" style={{ color: "var(--color-text-dim)" }}>{t.expRoleDetails}</span>
                      <h3 className="text-2xl font-display font-bold tracking-tight" style={{ color: "var(--color-text-primary)" }}>{exp.role}</h3>
                      <h4 className="text-xs font-mono font-medium mt-1 uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>{exp.company}</h4>

                      {highlights && highlights.length > 0 && (
                        <div className="mt-6 space-y-3.5 pt-6" style={{ borderTop: "1px solid var(--color-border-primary)" }}>
                          {highlights.map((highlight, hIdx) => (
                            <div key={hIdx} className="flex gap-3 items-start">
                              <span className="font-mono text-[11px] leading-none mt-[3px] select-none" style={{ color: "var(--color-text-dim)" }}>—</span>
                              <p className="font-light text-[13px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{highlight}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-8 pt-4" style={{ borderTop: "1px solid var(--color-border-primary)" }}>
                        <div className="flex items-center gap-1.5 mb-3 select-none">
                          <Code2 className="w-3 h-3" style={{ color: "var(--color-text-muted)" }} />
                          <span className="text-[9px] font-mono tracking-[0.2em] uppercase" style={{ color: "var(--color-text-muted)" }}>{t.expStackDeployed}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.technologies.map((tech) => (
                            <span key={tech} className="px-2.5 py-1 text-[10px] font-mono rounded-full" style={{ backgroundColor: "var(--color-bg-card)", color: "var(--color-text-secondary)", border: "1px solid var(--color-border-primary)" }}>{tech}</span>
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