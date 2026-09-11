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
import { EXPERIENCES, PORTRAIT_IMAGE, PROJECTS, SKILL_CATEGORIES, STATS } from "../data";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { translations } from "../i18n/translations";
import Contact from "./Contact";

interface EditorialPortfolioProps {
  onViewResume: () => void;
}

const proofStats = [STATS[1], STATS[4], STATS[3]];

export default function EditorialPortfolioV2({ onViewResume }: EditorialPortfolioProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = translations[lang];

  const copy = lang === "id"
    ? {
        eyebrow: "JESSEN REINHART · SENIOR FRONTEND ENGINEER",
        headline: "Saya membangun produk web yang cepat dan scalable untuk banking & commerce.",
        intro: "7+ tahun mengirim interface production untuk platform perbankan, commerce, dashboard, dan CMS di Asia Tenggara.",
        sideKicker: "ENGINEERING YANG TERASA SEDERHANA",
        sideBody: "Saya membantu tim mengubah requirement yang kompleks menjadi pengalaman web yang cepat, jelas, dan maintainable.",
        viewWork: "Lihat proyek pilihan",
        resume: "Lihat résumé",
        selectedWork: "Proyek Pilihan",
        selectedWorkDesc: "Beberapa produk yang saya bangun untuk menyelesaikan masalah nyata, bukan sekadar demo portfolio.",
        live: "Live demo",
        code: "Source",
        experience: "Pengalaman",
        experienceDesc: "Karier dari dashboard regional sampai platform yang digunakan jutaan orang.",
        aboutTitle: "Frontend engineering yang fokus ke reliability, clarity, dan scale.",
        stack: "Core stack",
        statLabels: ["institusi keuangan", "order / bulan", "online stores"],
        portraitRole: "Frontend Engineer",
        portraitLocation: "Jakarta, Indonesia",
        portraitBody: "Membangun di persimpangan banking, commerce, product UI, dan AI tooling.",
      }
    : {
        eyebrow: "JESSEN REINHART · SENIOR FRONTEND ENGINEER",
        headline: "I build fast, scalable web products for banking & commerce.",
        intro: "7+ years shipping production interfaces for banking platforms, commerce, dashboards, and CMS products across Southeast Asia.",
        sideKicker: "ENGINEERING THAT FEELS SIMPLE",
        sideBody: "I help teams turn complex requirements into web experiences that are fast, clear, and maintainable.",
        viewWork: "View selected work",
        resume: "View résumé",
        selectedWork: "Featured Work",
        selectedWorkDesc: "A selection of products I built to solve real problems, not portfolio-only demos.",
        live: "Live demo",
        code: "Source",
        experience: "Experience",
        experienceDesc: "A career spanning regional dashboards to platforms used by millions of people.",
        aboutTitle: "Frontend engineering focused on reliability, clarity, and scale.",
        stack: "Core stack",
        statLabels: ["financial institutions", "orders / month", "online stores"],
        portraitRole: "Frontend Engineer",
        portraitLocation: "Jakarta, Indonesia",
        portraitBody: "Building at the intersection of banking, commerce, product UI, and AI tooling.",
      };

  const navItems = [
    { label: t.navProjects, id: "projects" },
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
        className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl"
        style={{ backgroundColor: "color-mix(in srgb, var(--color-bg-primary) 88%, transparent)", borderColor: "var(--color-border-primary)" }}
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
                    className="absolute right-[1%] top-[5%] h-[56%] w-[66%] rounded-[38px]"
                    style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 6%, var(--color-bg-secondary))" }}
                    aria-hidden="true"
                  />
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, x: -16, y: 10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.72, delay: reduceMotion ? 0 : 0.24, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-[12%] left-[5%] h-[43%] w-[60%] rounded-[34px]"
                    style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 4%, var(--color-bg-surface))" }}
                    aria-hidden="true"
                  />

                  <div
                    className="absolute right-[6%] top-[12%] h-[62%] w-[72%] rounded-full blur-3xl"
                    style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 5%, transparent)" }}
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
                    className="absolute bottom-3 right-0 z-20 flex items-start gap-3 rounded-tl-2xl px-4 py-3 text-right sm:bottom-5 sm:px-5"
                    style={{ backgroundColor: "color-mix(in srgb, var(--color-bg-primary) 90%, transparent)" }}
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

            <motion.div {...reveal} className="mt-14 grid border-y sm:grid-cols-3" style={{ borderColor: "var(--color-border-primary)" }}>
              {proofStats.map((stat, index) => (
                <div key={stat.label} className="flex items-baseline gap-3 border-b py-6 sm:border-b-0 sm:border-r sm:px-7 sm:first:pl-0 sm:last:border-r-0" style={{ borderColor: "var(--color-border-primary)" }}>
                  <span className="text-3xl font-semibold tracking-[-0.04em] md:text-4xl">{stat.value}{index === 0 ? "+" : ""}</span>
                  <span className="text-xs leading-snug" style={{ color: "var(--color-text-muted)" }}>{copy.statLabels[index]}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="projects" className="scroll-mt-24 border-t px-6 py-20 md:px-12 md:py-28" style={{ backgroundColor: "var(--color-bg-secondary)", borderColor: "var(--color-border-primary)" }}>
          <div className="mx-auto max-w-7xl">
            <motion.div {...reveal} className="mb-12 grid gap-6 md:grid-cols-2 md:items-end">
              <div>
                <div className="mb-4 flex items-center gap-3 font-mono text-[10px] tracking-[0.22em]" style={{ color: "var(--color-accent)" }}><span>01</span><span className="h-px w-8" style={{ backgroundColor: "var(--color-accent)" }} /></div>
                <h2 className="font-sans text-4xl font-semibold tracking-[-0.05em] md:text-6xl">{copy.selectedWork}</h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed md:justify-self-end" style={{ color: "var(--color-text-muted)" }}>{copy.selectedWorkDesc}</p>
            </motion.div>

            <div className="space-y-5">
              {PROJECTS.map((project, index) => {
                const description = lang === "id" && project.descriptionId ? project.descriptionId : project.description;
                const motivation = lang === "id" && project.motivationId ? project.motivationId : project.motivation;
                const isShareTerm = project.id === "proj-shareterm";
                return (
                  <motion.article
                    key={project.id}
                    {...reveal}
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                    transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden rounded-xl border"
                    style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border-primary)" }}
                  >
                    <div className="grid lg:grid-cols-12">
                      <div className="relative min-h-[280px] overflow-hidden bg-[var(--color-bg-surface)] lg:col-span-7 lg:min-h-[440px]">
                        {isShareTerm ? (
                          <div className="absolute inset-0 overflow-hidden bg-[#090b0e]">
                            <iframe
                              src="/share-term/"
                              title="share-term live preview"
                              loading="lazy"
                              tabIndex={-1}
                              aria-hidden="true"
                              className="pointer-events-none h-[900px] w-[1440px] origin-top-left scale-[0.62] border-0 sm:scale-[0.72] lg:scale-[0.58] xl:scale-[0.68]"
                            />
                            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
                          </div>
                        ) : (
                          <motion.img
                            src={project.imageSrc}
                            alt={`${project.title} preview`}
                            className="absolute inset-0 h-full w-full object-cover object-top"
                            whileHover={reduceMotion ? undefined : { scale: 1.025 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                          />
                        )}
                      </div>
                      <div className="flex flex-col justify-between p-7 md:p-10 lg:col-span-5">
                        <div>
                          <div className="mb-5 flex items-center gap-3 font-mono text-[9px] tracking-[0.22em]" style={{ color: "var(--color-accent)" }}><span>{String(index + 1).padStart(2, "0")}</span><span className="h-px w-7" style={{ backgroundColor: "var(--color-accent)" }} /></div>
                          <h3 className="font-sans text-3xl font-semibold tracking-[-0.045em] md:text-4xl">{project.title}</h3>
                          <p className="mt-2 text-base font-medium" style={{ color: "var(--color-text-secondary)" }}>{project.tagline}</p>
                          <p className="mt-6 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{description}</p>
                          {motivation && <p className="mt-4 border-l pl-4 text-xs leading-relaxed" style={{ color: "var(--color-text-dim)", borderColor: "var(--color-accent)" }}>{motivation}</p>}
                        </div>
                        <div className="mt-8">
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 5).map((tech) => <span key={tech} className="rounded-full border px-3 py-1 text-[10px] font-mono" style={{ borderColor: "var(--color-border-primary)", color: "var(--color-text-muted)" }}>{tech}</span>)}
                          </div>
                          <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold">
                            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-[var(--color-accent)]">{copy.live}<ArrowUpRight className="h-3.5 w-3.5" /></a>}
                            {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-[var(--color-accent)]">{copy.code}<Github className="h-3.5 w-3.5" /></a>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="experience" className="scroll-mt-24 border-t px-6 py-20 md:px-12 md:py-28" style={{ borderColor: "var(--color-border-primary)" }}>
          <div className="mx-auto max-w-7xl">
            <motion.div {...reveal} className="mb-12 grid gap-6 md:grid-cols-2 md:items-end">
              <div>
                <div className="mb-4 flex items-center gap-3 font-mono text-[10px] tracking-[0.22em]" style={{ color: "var(--color-accent)" }}><span>02</span><span className="h-px w-8" style={{ backgroundColor: "var(--color-accent)" }} /></div>
                <h2 className="font-sans text-4xl font-semibold tracking-[-0.05em] md:text-6xl">{copy.experience}</h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed md:justify-self-end" style={{ color: "var(--color-text-muted)" }}>{copy.experienceDesc}</p>
            </motion.div>

            <div className="border-t" style={{ borderColor: "var(--color-border-primary)" }}>
              {EXPERIENCES.map((exp) => {
                const highlights = lang === "id" && exp.highlightsId ? exp.highlightsId : exp.highlights;
                return (
                  <motion.article key={exp.id} {...reveal} className="grid gap-4 border-b py-7 md:grid-cols-12 md:gap-8" style={{ borderColor: "var(--color-border-primary)" }}>
                    <div className="text-xs font-mono leading-relaxed md:col-span-2" style={{ color: "var(--color-text-dim)" }}>{exp.period}</div>
                    <div className="md:col-span-4">
                      <h3 className="text-lg font-semibold tracking-[-0.02em]">{exp.role}</h3>
                      <p className="mt-1 text-sm" style={{ color: "var(--color-accent)" }}>{exp.company}</p>
                      <p className="mt-2 text-xs" style={{ color: "var(--color-text-dim)" }}>{exp.location}</p>
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
              <div className="mb-4 flex items-center gap-3 font-mono text-[10px] tracking-[0.22em]" style={{ color: "var(--color-accent)" }}><span>03</span><span className="h-px w-8" style={{ backgroundColor: "var(--color-accent)" }} /></div>
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
