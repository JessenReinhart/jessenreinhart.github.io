import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  FileText,
  Github,
  Globe,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { EXPERIENCES, PORTRAIT_IMAGE, PROJECTS, SKILL_CATEGORIES } from "../data";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { translations } from "../i18n/translations";
import Contact from "./Contact";
import GitHubActivity from "./GitHubActivity";
import AccordionGallery from "./AccordionGallery";

interface EditorialPortfolioProps {
  onViewResume: () => void;
}

export default function EditorialPortfolioV2({ onViewResume }: EditorialPortfolioProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const { lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = translations[lang];

  const copy = lang === "id"
    ? {
        eyebrow: "JESSEN REINHART · FRONTEND ENGINEER",
        headline: "Saya membangun antarmuka di balik sistem banking dan commerce.",
        intro: "Tujuh tahun membangun aplikasi web untuk produksi, dari checkout merchant dan operasi perbankan sampai platform React yang dipakai di berbagai wilayah.",
        sideKicker: "PEKERJAAN YANG BENAR-BENAR SAYA KERJAKAN",
        sideBody: "Staf bank, merchant, dan pengguna bergantung pada sistem yang saya kerjakan. Saya peduli pada detail frontend yang membuat alur kerja tetap jelas saat produknya tumbuh.",
        viewWork: "Lihat karya",
        resume: "Buka résumé",
        selectedWork: "Proyek Pilihan",
        selectedWorkDesc: "Build yang masih saya kerjakan, dari AI tooling dan browser RTS sampai tool kecil yang saya buat sendiri.",
        live: "Coba",
        code: "GitHub",
        experience: "Pengalaman",
        experienceDesc: "Dari dashboard perpustakaan hingga operasi perbankan dan commerce multi-tenant, dengan pengalaman sejak 2019.",
        aboutTitle: "Saya suka frontend yang punya pekerjaan nyata.",
        stack: "Core stack",
        statLabels: ["institusi keuangan", "order / bulan", "online stores"],
        portraitRole: "Frontend Engineer",
        portraitLocation: "Jakarta, Indonesia",
        portraitBody: "Membangun di persimpangan banking, commerce, product UI, dan AI tooling.",
      }
    : {
        eyebrow: "JESSEN REINHART · FRONTEND ENGINEER",
        headline: "I build the interfaces behind banking and commerce systems.",
        intro: "Seven years building production web apps, from merchant checkout and banking operations to React platforms used across the region.",
        sideKicker: "WORK I ACTUALLY SHIP",
        sideBody: "Bank staff, merchants, and customers rely on the systems I work on. I care about the frontend details that keep those workflows usable as the product grows.",
        viewWork: "See the work",
        resume: "Open résumé",
        selectedWork: "Featured Work",
        selectedWorkDesc: "Builds I keep working on, from AI tooling to a browser RTS and small tools I made for myself.",
        live: "Try it",
        code: "GitHub",
        experience: "Experience",
        experienceDesc: "From library dashboards to banking operations and multi-tenant commerce, across roles since 2019.",
        aboutTitle: "I like frontend work when the interface has a real job to do.",
        stack: "Core stack",
        statLabels: ["financial institutions", "orders / month", "online stores"],
        portraitRole: "Frontend Engineer",
        portraitLocation: "Jakarta, Indonesia",
        portraitBody: "Building at the intersection of banking, commerce, product UI, and AI tooling.",
      };

  const navItems = [
    { label: t.navProjects, id: "projects" },
    { label: t.navGithub, id: "github" },
    { label: t.navExperience, id: "experience" },
    { label: t.navAbout, id: "about" },
    { label: "Résumé", id: "resume" },
    { label: t.navContact, id: "contact" },
  ];

  const navigate = (id: string) => {
    setMenuOpen(false);
    if (id === "resume") {
      onViewResume();
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  const reveal = {
    initial: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-70px" },
    transition: { duration: reduceMotion ? 0 : 0.62, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-bg-primary)", color: "var(--color-text-primary)" }}>
      <motion.header
        initial={reduceMotion ? false : { y: -22, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 border-b"
        style={{ backgroundColor: "var(--color-bg-primary)", borderColor: "var(--color-border-primary)" }}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 md:px-12">
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })} className="flex items-center gap-3 text-left">
            <span className="font-sans text-xl font-black tracking-[-0.08em]">JR</span>
            <span className="hidden text-sm font-medium sm:inline">Jessen Reinhart</span>
          </button>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <button key={item.id} type="button" onClick={() => navigate(item.id)} className="text-xs font-medium transition-opacity hover:opacity-55" style={{ color: "var(--color-text-secondary)" }}>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-1.5 md:flex">
            <button type="button" onClick={toggleLang} className="me-btn-ghost flex h-9 min-w-9 items-center justify-center px-2 text-[10px] font-mono font-bold" aria-label="Toggle language">
              {lang === "en" ? "EN" : "ID"}
            </button>
            <button type="button" onClick={toggleTheme} className="me-btn-ghost flex h-9 w-9 items-center justify-center" aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
            <button type="button" onClick={() => navigate("contact")} className="ml-2 rounded-md border px-4 py-2 text-xs font-semibold transition-colors hover:text-[var(--color-accent)]" style={{ borderColor: "var(--color-accent)" }}>
              {t.navContact}
            </button>
          </div>

          <button type="button" onClick={() => setMenuOpen((open) => !open)} className="md:hidden" aria-label="Toggle menu">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="border-t px-6 py-5 md:hidden" style={{ backgroundColor: "var(--color-bg-primary)", borderColor: "var(--color-border-primary)" }}>
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button key={item.id} type="button" onClick={() => navigate(item.id)} className="py-3 text-left text-2xl font-semibold tracking-tight">{item.label}</button>
              ))}
            </div>
            <div className="mt-4 flex gap-2 border-t pt-4" style={{ borderColor: "var(--color-border-primary)" }}>
              <button type="button" onClick={toggleLang} className="me-btn-ghost flex flex-1 items-center justify-center gap-2 py-3 text-xs font-mono"><Globe className="h-4 w-4" />{lang === "en" ? "ID" : "EN"}</button>
              <button type="button" onClick={toggleTheme} className="me-btn-ghost flex flex-1 items-center justify-center gap-2 py-3 text-xs font-mono">{theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}{theme === "dark" ? "LIGHT" : "DARK"}</button>
            </div>
          </motion.div>
        )}
      </motion.header>

      <main>
        <section id="hero" className="px-6 pb-14 pt-32 md:px-12 md:pb-20 md:pt-40">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.78, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7"
              >
                <div className="mb-7 font-mono text-[10px] tracking-[0.24em]" style={{ color: "var(--color-text-muted)" }}>{copy.eyebrow}</div>
                <h1 className="max-w-5xl font-sans text-[clamp(3.35rem,6.2vw,6.7rem)] font-semibold leading-[0.91] tracking-[-0.065em]">{copy.headline}</h1>
                <p className="mt-7 max-w-2xl text-base leading-relaxed md:text-lg" style={{ color: "var(--color-text-muted)" }}>{copy.intro}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <motion.button whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }} type="button" onClick={() => navigate("projects")} className="me-btn-primary flex items-center gap-2 px-6 py-3.5 text-xs font-semibold">
                    {copy.viewWork}<ArrowUpRight className="h-4 w-4" />
                  </motion.button>
                  <motion.button whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }} type="button" onClick={onViewResume} className="me-btn-ghost flex items-center gap-2 px-6 py-3.5 text-xs font-semibold">
                    {copy.resume}<FileText className="h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.78, delay: reduceMotion ? 0 : 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5"
              >
                <div className="relative mx-auto h-[380px] max-w-[500px] sm:h-[440px] lg:h-[540px] lg:max-w-none">
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.16, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-[1%] top-[5%] h-[56%] w-[66%]"
                    style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 6%, var(--color-bg-secondary))" }}
                    aria-hidden="true"
                  />
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, x: -16, y: 10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.72, delay: reduceMotion ? 0 : 0.24, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-[12%] left-[5%] h-[43%] w-[60%]"
                    style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 4%, var(--color-bg-surface))" }}
                    aria-hidden="true"
                  />

                  <div
                    className="absolute right-[6%] top-[12%] h-[58%] w-[68%]"
                    style={{ backgroundColor: "color-mix(in srgb, var(--color-accent-soft) 55%, transparent)", clipPath: "polygon(18% 0, 100% 0, 82% 100%, 0 100%)" }}
                    aria-hidden="true"
                  />

                  <motion.img
                    src={PORTRAIT_IMAGE}
                    alt="Jessen Reinhart"
                    className="absolute bottom-0 right-[5%] z-10 h-auto max-h-[88%] w-auto max-w-[68%] object-contain object-bottom sm:right-[4%] sm:max-h-[92%] sm:max-w-[72%] lg:right-0 lg:max-h-[102%] lg:max-w-[90%]"
                    initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.76, delay: reduceMotion ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
                  />

                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.56, delay: reduceMotion ? 0 : 0.42, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-3 right-0 z-20 flex items-start gap-3 border-l border-t px-4 py-3 text-right sm:bottom-5 sm:px-5"
                    style={{ backgroundColor: "var(--color-bg-primary)", borderColor: "var(--color-border-primary)" }}
                  >
                    <span className="mt-2 h-px w-8 shrink-0" style={{ backgroundColor: "var(--color-accent)" }} />
                    <div>
                      <p className="text-xs font-semibold">Jessen Reinhart</p>
                      <p className="mt-1 font-mono text-[9px] tracking-[0.08em]" style={{ color: "var(--color-text-dim)" }}>{copy.portraitRole} · {copy.portraitLocation}</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

          </div>
        </section>

        <section id="projects" className="scroll-mt-24 border-t px-6 py-20 md:px-12 md:py-28" style={{ backgroundColor: "var(--color-bg-secondary)", borderColor: "var(--color-border-primary)" }}>
          <div className="mx-auto max-w-7xl">
            <motion.div {...reveal} className="mb-10 grid gap-6 md:grid-cols-2 md:items-end">
              <div>
                <h2 className="font-sans text-4xl font-semibold tracking-[-0.05em] md:text-6xl">{copy.selectedWork}</h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed md:justify-self-end" style={{ color: "var(--color-text-muted)" }}>{copy.selectedWorkDesc}</p>
            </motion.div>

            <motion.div
              {...reveal}
              className="overflow-visible"
            >
              <AccordionGallery
                items={PROJECTS.map((project) => ({
                  image: project.imageSrc,
                  label: project.title,
                  alt: project.title + " preview",
                }))}
                defaultIndex={0}
                accentColor="var(--color-accent)"
                overlayColor="#0a0a0a"
                textColor="#ffffff"
                grayscale
                showLabels
                duration={0.55}
                ease="power3.out"
                parallax={0.25}
                tilt={4}
                stagger={0.05}
                trigger="click"
                height={420}
                gap={4}
                radius={0}
                expandRatio={0.48}
                onSelect={(index) => setActiveProjectIndex(index)}
                className="project-gallery"
              />

              {PROJECTS[activeProjectIndex] && (() => {
                const project = PROJECTS[activeProjectIndex];
                const description = lang === "id" && project.descriptionId ? project.descriptionId : project.description;
                const motivation = lang === "id" && project.motivationId ? project.motivationId : project.motivation;

                return (
                  <div className="grid gap-8 border-t p-7 md:grid-cols-12 md:gap-10 md:p-10" style={{ borderColor: "var(--color-border-primary)" }}>
                    <div className="md:col-span-5">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] tracking-[0.18em]" style={{ color: "var(--color-accent)" }}>
                          {String(activeProjectIndex + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
                        </span>
                        <span className="h-px w-8" style={{ backgroundColor: "var(--color-border-primary)" }} />
                        <span className="font-mono text-[10px] tracking-[0.16em]" style={{ color: "var(--color-text-dim)" }}>
                          {project.technologies[0]}
                        </span>
                      </div>
                      <h3 className="mt-4 font-sans text-4xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-5xl">{project.title}</h3>
                      <p className="mt-3 text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>{project.tagline}</p>
                    </div>

                    <div className="md:col-span-7 md:pl-4">
                      <p className="text-sm leading-relaxed md:text-base" style={{ color: "var(--color-text-muted)" }}>{description}</p>

                      {motivation && (
                        <div className="mt-5 border-l-2 pl-4" style={{ borderColor: "var(--color-accent)" }}>
                          <div className="mb-1.5 font-mono text-[9px] tracking-[0.18em]" style={{ color: "var(--color-text-dim)" }}>
                            {lang === "id" ? "KENAPA DIBUAT" : "WHY I BUILT IT"}
                          </div>
                          <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-dim)" }}>{motivation}</p>
                        </div>
                      )}

                      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px]" style={{ color: "var(--color-text-dim)" }}>
                        {project.technologies.map((tech, techIndex) => (
                          <span key={tech}>{tech}{techIndex < project.technologies.length - 1 ? " /" : ""}</span>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold">
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-[var(--color-accent)]">
                            {copy.live}<ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-[var(--color-accent)]">
                            {copy.code}<Github className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </div>
        </section>

        <GitHubActivity />

        <section id="experience" className="scroll-mt-24 border-t px-6 py-20 md:px-12 md:py-28" style={{ borderColor: "var(--color-border-primary)" }}>
          <div className="mx-auto max-w-7xl">
            <motion.div {...reveal} className="mb-12 grid gap-6 md:grid-cols-2 md:items-end">
              <div>
                
                <h2 className="font-sans text-4xl font-semibold tracking-[-0.05em] md:text-6xl">{copy.experience}</h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed md:justify-self-end" style={{ color: "var(--color-text-muted)" }}>{copy.experienceDesc}</p>
            </motion.div>

            <div className="border-t" style={{ borderColor: "var(--color-border-primary)" }}>
              {EXPERIENCES.map((exp) => {
                const highlights = lang === "id" && exp.highlightsId ? exp.highlightsId : exp.highlights;
                const proof = exp.company.includes("Wide Technologies") ? (lang === "id" ? "20 bank · 30 juta pengguna" : "20 banks · 30M users") : exp.company === "SIRCLO" ? (lang === "id" ? "100 ribu merchant · 2 juta pesanan/bulan · Lighthouse 70 → 95" : "100K merchants · 2M orders/month · Lighthouse 70 → 95") : null;
                return (
                  <motion.article key={exp.id} {...reveal} className="grid gap-4 border-b py-7 md:grid-cols-12 md:gap-8" style={{ borderColor: "var(--color-border-primary)" }}>
                    <div className="text-xs font-mono leading-relaxed md:col-span-2" style={{ color: "var(--color-text-dim)" }}>{exp.period}</div>
                    <div className="md:col-span-4">
                      <h3 className="text-lg font-semibold tracking-[-0.02em]">{exp.role}</h3>
                      <p className="mt-1 text-sm" style={{ color: "var(--color-accent)" }}>{exp.company}</p>
                      <p className="mt-2 text-xs" style={{ color: "var(--color-text-dim)" }}>{exp.location}</p>{proof && <p className="mt-3 font-mono text-[10px]" style={{ color: "var(--color-text-secondary)" }}>{proof}</p>}
                    </div>
                    <div className="md:col-span-6">
                      {highlights?.slice(0, 3).map((highlight) => <p key={highlight} className="mb-2 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>• {highlight}</p>)}
                      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px]" style={{ color: "var(--color-text-dim)" }}>{exp.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 border-t px-6 py-20 md:px-12 md:py-28" style={{ backgroundColor: "var(--color-bg-secondary)", borderColor: "var(--color-border-primary)" }}>
          <motion.div {...reveal} className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              
              <h2 className="font-sans text-4xl font-semibold leading-[0.98] tracking-[-0.055em] md:text-6xl">{copy.aboutTitle}</h2>
            </div>
            <div className="lg:col-span-7 lg:pl-12">
              <div className="space-y-5 text-sm leading-relaxed md:text-base" style={{ color: "var(--color-text-muted)" }}><p>{t.aboutP1}</p><p>{t.aboutP2}</p></div>
              <div className="mt-10 border-t pt-7" style={{ borderColor: "var(--color-border-primary)" }}>
                <div className="mb-4 font-mono text-[10px] tracking-[0.22em]" style={{ color: "var(--color-text-dim)" }}>{copy.stack}</div>
                <div className="grid gap-x-8 gap-y-6 sm:grid-cols-3">
                  {SKILL_CATEGORIES.map((category) => (
                    <div key={category.name}><h3 className="mb-3 text-sm font-semibold">{category.name}</h3><div className="flex flex-wrap gap-x-3 gap-y-1 text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{category.skills.slice(0, 8).map((skill) => <span key={skill}>{skill}</span>)}</div></div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <Contact />
      </main>

      <footer className="border-t px-6 py-8 md:px-12" style={{ borderColor: "var(--color-border-primary)" }}>
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-[11px] sm:flex-row sm:items-center sm:justify-between" style={{ color: "var(--color-text-dim)" }}>
          <span>© {new Date().getFullYear()} Jessen Reinhart</span>
          <span>React · TypeScript · Tailwind CSS</span>
        </div>
      </footer>
    </div>
  );
}
