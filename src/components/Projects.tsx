import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Github, Code, CheckCircle, X, ExternalLink, Compass, FileText, Heart, Activity, ChevronLeft, ChevronRight } from "lucide-react";
import { PROJECTS } from "../data";
import { Project } from "../types";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const handleOpenProject = (proj: Project) => {
    setSlideIndex(0);
    setSelectedProject(proj);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  const nextSlide = (total: number) => {
    setSlideIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = (total: number) => {
    setSlideIndex((prev) => (prev - 1 + total) % total);
  };

  const renderProjectIcon = (id: string, className = "w-10 h-10") => {
    switch (id) {
      case "proj-tripcore":
        return <Compass className={className} />;
      case "proj-invoicr":
        return <FileText className={className} />;
      case "proj-wedding":
        return <Heart className={className} />;
      case "proj-soulsync":
        return <Activity className={className} />;
      default:
        return <Code className={className} />;
    }
  };

  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 bg-[#090909] overflow-hidden scroll-mt-20 border-t border-white/5"
    >
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-white/[0.01] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Heading */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="block font-mono text-[10px] tracking-[0.3em] text-zinc-500 uppercase mb-3">
              03 // SELECTED PROJECTS
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-none">
              Selected Projects
            </h2>
          </div>
          <div className="max-w-xs text-zinc-400 font-light text-xs leading-relaxed text-left md:text-right font-mono uppercase tracking-wider">
            TECHNICAL APPLICATIONS AND ENTERPRISE UTILITIES.
          </div>
        </div>

        {/* Asymmetrical Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {PROJECTS.map((project, idx) => {
            // Give slightly alternating top-margins to simulate editorial asymmetric layouts
            const alignmentClass = idx % 2 === 1 ? "md:mt-16" : "";

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col text-left group cursor-pointer ${alignmentClass}`}
                onClick={() => handleOpenProject(project)}
                data-cursor="project"
              >
                {/* Image Container with Custom Grayscale scaling */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-950 border border-white/8 group-hover:border-white/25 transition-all duration-500 mb-6 group-hover:scale-[1.01] shadow-2xl flex items-center justify-center">
                  {/* Subtle code watermark overlay on cards */}
                  <div className="absolute top-4 left-4 font-mono text-[9px] text-zinc-600 uppercase tracking-widest bg-black/60 px-2 py-1 rounded border border-white/5 z-20 pointer-events-none select-none">
                    {project.technologies[0]}
                  </div>

                  {/* Elegant Centered Project Icon Showcase */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-zinc-900/50 via-zinc-950 to-black flex items-center justify-center p-12 transition-all duration-500 group-hover:from-zinc-900/80">
                    <div className="p-8 rounded-2xl border border-white/5 bg-zinc-900/40 text-zinc-500 group-hover:text-white group-hover:border-white/10 group-hover:scale-110 group-hover:bg-zinc-900/80 transition-all duration-500 shadow-xl">
                      {renderProjectIcon(project.id, "w-12 h-12")}
                    </div>
                  </div>
                  
                  {/* Hover visual glass sheen */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  
                  {/* Smooth zoom text overlay detailing metrics */}
                  <div className="absolute inset-x-0 bottom-0 flex items-end p-8 justify-between z-20">
                    <div>
                      <span className="block font-mono text-[10px] tracking-wider text-zinc-400 group-hover:text-white transition-colors">
                        {project.tagline}
                      </span>
                      <h3 className="text-3xl font-display font-black text-white tracking-tight mt-1 group-hover:translate-x-1.5 transition-transform duration-300">
                        {project.title}
                      </h3>
                    </div>
                    
                    {/* Tiny expansion emblem */}
                    <div className="w-10 h-10 rounded-full border border-white/10 bg-black/50 flex items-center justify-center text-white backdrop-blur-md group-hover:bg-white group-hover:text-black group-hover:border-white transition-colors duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Lower Card description text */}
                <div className="px-2">
                  <p className="text-zinc-400 font-light text-sm line-clamp-2 leading-relaxed mb-4">
                    {project.description}
                  </p>
                  
                  {/* Core Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2.5 py-0.5 border border-white/5 rounded-full text-zinc-500 group-hover:text-zinc-300 group-hover:border-white/10 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[10px] font-mono text-zinc-600 px-1 py-0.5 select-none">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Deluxe Sliding Project Detail Drawer */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop opacity layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseProject}
              className="fixed inset-0 bg-black z-50 cursor-pointer backdrop-blur-sm"
            />

            {/* Panel container drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:max-w-xl md:max-w-2xl bg-[#090909] border-l border-white/8 z-50 overflow-y-auto px-8 py-10 md:px-12 flex flex-col justify-between"
            >
              <div>
                {/* Header buttons */}
                <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-8 select-none">
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <Code className="w-4 h-4" /> Project Features
                  </span>
                  <button
                    onClick={handleCloseProject}
                    className="p-2 border border-white/5 rounded-full hover:bg-white hover:text-black hover:border-white text-zinc-400 transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Showcase: carousel for projects with images, icon for others */}
                {selectedProject.images && selectedProject.images.length > 0 ? (
                  <div className="w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/5 mb-8 bg-zinc-950 relative group/carousel">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={slideIndex}
                        src={selectedProject.images[slideIndex]}
                        alt={`${selectedProject.title} screenshot ${slideIndex + 1}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="w-full h-full object-contain"
                      />
                    </AnimatePresence>

                    {/* Nav arrows */}
                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          onClick={() => prevSlide(selectedProject.images!.length)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-white hover:text-black cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => nextSlide(selectedProject.images!.length)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-white hover:text-black cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>

                        {/* Dot indicators */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {selectedProject.images.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setSlideIndex(i)}
                              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                                i === slideIndex
                                  ? "bg-white w-4"
                                  : "bg-white/30 hover:bg-white/60"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/5 mb-8 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-zinc-900/50 via-zinc-950 to-black flex items-center justify-center p-8">
                    <div className="p-10 rounded-2xl border border-white/5 bg-zinc-900/40 text-zinc-400 shadow-2xl">
                      {renderProjectIcon(selectedProject.id, "w-16 h-16")}
                    </div>
                  </div>
                )}

                {/* Titles */}
                <div className="text-left mb-6">
                  <span className="font-mono text-[10px] tracking-wider text-zinc-500 uppercase">
                    {selectedProject.tagline}
                  </span>
                  <h3 className="text-4xl font-display font-black text-white tracking-tight mt-1 leading-none">
                    {selectedProject.title}
                  </h3>
                </div>

                {/* Long description text */}
                <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base text-left mb-8">
                  {selectedProject.description}
                </p>

                {/* Features Checklist inside drawer */}
                {selectedProject.features && selectedProject.features.length > 0 && (
                  <div className="text-left mb-8">
                    <h4 className="text-xs font-mono text-zinc-400 tracking-wider uppercase mb-4 border-b border-white/5 pb-2">
                      Key Capabilities Built
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedProject.features.map((feat) => (
                        <div key={feat} className="flex gap-2 items-start">
                          <CheckCircle className="w-4 h-4 text-zinc-400 mt-1 flex-shrink-0" />
                          <span className="text-zinc-400 font-light text-[13px] leading-snug">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Full technology categories */}
                <div className="text-left mb-8">
                  <h4 className="text-xs font-mono text-zinc-400 tracking-wider uppercase mb-3 border-b border-white/5 pb-2">
                    Technological Breakdown
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-[11px] font-mono bg-zinc-950 text-zinc-300 border border-white/5 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Trigger Buttons for links */}
              <div className="border-t border-white/5 pt-6 flex gap-4 select-none">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 text-center rounded-lg bg-white text-black font-semibold text-xs font-mono tracking-widest hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                  >
                    DEMO ENVIRONMENT
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 border border-white/10 rounded-lg hover:border-white/40 text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    <span className="hidden sm:inline-block font-mono text-xs font-semibold tracking-wider">CODE</span>
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
