import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Github, Code, CheckCircle, X, ExternalLink, Compass, FileText, Heart, Activity, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { PROJECTS } from "../data";
import { Project } from "../types";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18n/translations";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang];

  const handleOpenProject = (proj: Project) => {
    setSlideIndex(0);
    setIsZoomed(false);
    setSelectedProject(proj);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  const nextSlide = (total: number) => {
    setIsZoomed(false);
    setSlideIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = (total: number) => {
    setIsZoomed(false);
    setSlideIndex((prev) => (prev - 1 + total) % total);
  };

  const handleZoomToggle = useCallback(() => {
    setIsZoomed((prev) => !prev);
  }, []);

  const renderProjectIcon = (id: string, className = "w-10 h-10") => {
    switch (id) {
      case "proj-tripcore": return <Compass className={className} />;
      case "proj-invoicr": return <FileText className={className} />;
      case "proj-wedding": return <Heart className={className} />;
      case "proj-soulsync": return <Activity className={className} />;
      default: return <Code className={className} />;
    }
  };

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden scroll-mt-20 border-t" style={{ backgroundColor: "var(--color-bg-secondary)", borderColor: "var(--color-border-primary)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="block font-mono text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: "var(--color-text-muted)" }}>{t.projSection}</span>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tight leading-none" style={{ color: "var(--color-text-primary)" }}>{t.projTitle}</h2>
          </div>
          <div className="max-w-xs font-light text-xs leading-relaxed text-left md:text-right font-mono uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>{t.projSubtitle}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {PROJECTS.map((project, idx) => {
            const alignmentClass = idx % 2 === 1 ? "md:mt-16" : "";
            return (
              <motion.div key={project.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }} className={`flex flex-col text-left group cursor-pointer ${alignmentClass}`} onClick={() => handleOpenProject(project)} data-cursor="project">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 group-hover:scale-[1.01] shadow-2xl flex items-center justify-center" style={{ backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border-primary)" }}>
                  <div className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-widest px-2 py-1 rounded z-20 pointer-events-none select-none" style={{ backgroundColor: "var(--color-bg-primary)", color: "var(--color-text-dim)", border: "1px solid var(--color-border-primary)" }}>{project.technologies[0]}</div>
                  {/* Icon fallback — visible when screenshot doesn't exist yet */}
                  <div className="absolute inset-0 flex items-center justify-center p-12">
                    {renderProjectIcon(project.id, "w-12 h-12")}
                  </div>
                  {/* Live screenshot — covers icon when loaded; onError hides it (404 on dev) */}
                  <img
                    src={project.imageSrc}
                    alt={`${project.title} preview`}
                    className="absolute -inset-px object-cover object-top transition-all duration-700 group-hover:scale-105"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none" }}
                  />
                  {/* Gradient overlay so bottom text stays readable */}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--color-bg-secondary) 0%, transparent 40%)" }} />
                  <div className="absolute inset-x-0 bottom-0 flex items-end p-8 justify-between z-20">
                    <div>
                      <span className="block font-mono text-[10px] tracking-wider" style={{ color: "var(--color-text-muted)" }}>{project.tagline}</span>
                      <h3 className="text-3xl font-display font-black tracking-tight mt-1 group-hover:translate-x-1.5 transition-transform duration-300" style={{ color: "var(--color-text-primary)" }}>{project.title}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-colors duration-300" style={{ border: "1px solid var(--color-border-primary)", color: "var(--color-text-primary)" }}>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <div className="px-2">
                  <p className="font-light text-sm line-clamp-2 leading-relaxed mb-4" style={{ color: "var(--color-text-muted)" }}>{lang === "id" && project.descriptionId ? project.descriptionId : project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-[10px] font-mono px-2.5 py-0.5 rounded-full" style={{ border: "1px solid var(--color-border-primary)", color: "var(--color-text-muted)" }}>{tech}</span>
                    ))}
                    {project.technologies.length > 3 && <span className="text-[10px] font-mono px-1 py-0.5 select-none" style={{ color: "var(--color-text-dim)" }}>+{project.technologies.length - 3} {t.projMore}</span>}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {selectedProject && (() => {
            const projDesc = lang === "id" && selectedProject.descriptionId ? selectedProject.descriptionId : selectedProject.description;
            const projMotivation = lang === "id" && selectedProject.motivationId ? selectedProject.motivationId : selectedProject.motivation;
            const projFeatures = lang === "id" && selectedProject.featuresId ? selectedProject.featuresId : selectedProject.features;
            return (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }} onClick={handleCloseProject} className="fixed inset-0 z-50 cursor-pointer backdrop-blur-sm" style={{ backgroundColor: "var(--color-bg-primary)" }} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 220 }} className="fixed right-0 top-0 bottom-0 w-full sm:max-w-xl md:max-w-2xl z-50 overflow-y-auto px-8 py-10 md:px-12 flex flex-col justify-between" style={{ backgroundColor: "var(--color-bg-secondary)", borderLeft: "1px solid var(--color-border-primary)" }}>
              <div>
                <div className="flex items-center justify-between pb-6 mb-8 select-none" style={{ borderBottom: "1px solid var(--color-border-primary)" }}>
                  <span className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-2" style={{ color: "var(--color-text-muted)" }}><Code className="w-4 h-4" /> {t.projFeatures}</span>
                  <button onClick={handleCloseProject} className="p-2 rounded-full transition-all cursor-pointer" style={{ border: "1px solid var(--color-border-primary)", color: "var(--color-text-muted)" }}><X className="w-4 h-4" /></button>
                </div>

                {selectedProject.images && selectedProject.images.length > 0 ? (
                  <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-8 relative group/carousel" style={{ boxShadow: "inset 0 0 0 1px var(--color-border-primary)", backgroundColor: "transparent" }}>
                    <AnimatePresence mode="wait">
                      <motion.img key={slideIndex} src={selectedProject.images[slideIndex]} alt={`${selectedProject.title} screenshot ${slideIndex + 1}`} width="800" height="500" initial={{ opacity: 0 }} animate={{ opacity: 1, scale: isZoomed ? 2 : 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className={`w-full h-full object-contain ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`} drag={isZoomed ? true : false} dragConstraints={{ left: -300, right: -300, top: -300, bottom: 300 }} dragElastic={0.1} onClick={handleZoomToggle} />
                    </AnimatePresence>
                    <div className="absolute top-3 right-3 z-10">
                      <button onClick={handleZoomToggle} className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity cursor-pointer" style={{ backgroundColor: "var(--color-bg-primary)", border: "1px solid var(--color-border-primary)", color: "var(--color-text-primary)" }}>
                        {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    {selectedProject.images.length > 1 && !isZoomed && (
                      <>
                        <button onClick={() => prevSlide(selectedProject.images!.length)} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity cursor-pointer" style={{ backgroundColor: "var(--color-bg-primary)", border: "1px solid var(--color-border-primary)", color: "var(--color-text-primary)" }}><ChevronLeft className="w-4 h-4" /></button>
                        <button onClick={() => nextSlide(selectedProject.images!.length)} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity cursor-pointer" style={{ backgroundColor: "var(--color-bg-primary)", border: "1px solid var(--color-border-primary)", color: "var(--color-text-primary)" }}><ChevronRight className="w-4 h-4" /></button>
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {selectedProject.images.map((_, i) => (
                            <button key={i} onClick={() => setSlideIndex(i)} className={`h-2 rounded-full transition-all cursor-pointer ${i === slideIndex ? "w-4" : "w-2"}`} style={{ backgroundColor: i === slideIndex ? "var(--color-text-primary)" : "var(--color-text-dim)" }} />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-8 flex items-center justify-center p-8" style={{ border: "1px solid var(--color-border-primary)", backgroundColor: "var(--color-bg-card)" }}>
                    <div className="p-10 rounded-2xl" style={{ border: "1px solid var(--color-border-primary)", color: "var(--color-text-muted)" }}>{renderProjectIcon(selectedProject.id, "w-16 h-16")}</div>
                  </div>
                )}

                <div className="text-left mb-6">
                  <span className="font-mono text-[10px] tracking-wider uppercase" style={{ color: "var(--color-text-muted)" }}>{selectedProject.tagline}</span>
                  <h3 className="text-4xl font-display font-black tracking-tight mt-1 leading-none" style={{ color: "var(--color-text-primary)" }}>{selectedProject.title}</h3>
                </div>

                <p className="font-light leading-relaxed text-sm md:text-base text-left mb-6" style={{ color: "var(--color-text-secondary)" }}>{projDesc}</p>

                {projMotivation && (
                  <div className="text-left mb-8 pl-5" style={{ borderLeft: "2px solid var(--color-border-primary)" }}>
                    <h4 className="text-[10px] font-mono tracking-wider uppercase mb-2" style={{ color: "var(--color-text-muted)" }}>{t.projWhyBuilt}</h4>
                    <p className="font-light text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{projMotivation}</p>
                  </div>
                )}

                {projFeatures && projFeatures.length > 0 && (
                  <div className="text-left mb-8">
                    <h4 className="text-xs font-mono tracking-wider uppercase mb-4 pb-2" style={{ color: "var(--color-text-muted)", borderBottom: "1px solid var(--color-border-primary)" }}>{t.projKeyCapabilities}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {projFeatures.map((feat) => (
                        <div key={feat} className="flex gap-2 items-start">
                          <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: "var(--color-text-muted)" }} />
                          <span className="font-light text-[13px] leading-snug" style={{ color: "var(--color-text-muted)" }}>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-left mb-8">
                  <h4 className="text-xs font-mono tracking-wider uppercase mb-3 pb-2" style={{ color: "var(--color-text-muted)", borderBottom: "1px solid var(--color-border-primary)" }}>{t.projTechBreakdown}</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1.5 text-[11px] font-mono rounded-md" style={{ backgroundColor: "var(--color-bg-card)", color: "var(--color-text-secondary)", border: "1px solid var(--color-border-primary)" }}>{tech}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 flex gap-4 select-none" style={{ borderTop: "1px solid var(--color-border-primary)" }}>
                {selectedProject.liveUrl && (
                  <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 text-center rounded-lg font-semibold text-xs font-mono tracking-widest flex items-center justify-center gap-2" style={{ backgroundColor: "var(--color-text-primary)", color: "var(--color-bg-primary)" }}>
                    {t.projDemo} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="px-4 rounded-lg flex items-center justify-center gap-2" style={{ border: "1px solid var(--color-border-primary)", color: "var(--color-text-primary)" }}>
                    <Github className="w-4 h-4" />
                    <span className="hidden sm:inline-block font-mono text-xs font-semibold tracking-wider">{t.projCode}</span>
                  </a>
                )}
              </div>
            </motion.div>
          </>
            );
          })()}
      </AnimatePresence>
    </section>
  );
}
