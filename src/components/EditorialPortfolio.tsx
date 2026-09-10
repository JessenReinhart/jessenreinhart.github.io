import { useState } from "react";
import {
  ArrowUpRight,
  FileText,
  Github,
  Globe,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { EXPERIENCES, PROJECTS, SKILL_CATEGORIES, STATS } from "../data";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { translations } from "../i18n/translations";

interface EditorialPortfolioProps {
  onViewResume: () => void;
}

const proofStats = [STATS[1], STATS[4], STATS[3]];

export default function EditorialPortfolio({ onViewResume }: EditorialPortfolioProps) {
  const [menuOpen, setMenuOpen] = useState(false);
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
        caseStudy: "Lihat project",
        live: "Live demo",
        code: "Source",
        experience: "Pengalaman",
        experienceDesc: "Karier dari dashboard regional sampai platform yang digunakan jutaan orang.",
        about: "Tentang",
        aboutTitle: "Frontend engineering yang fokus ke reliability, clarity, dan scale.",
        stack: "Core stack",
        contactKicker: "PUNYA SESUATU YANG PERLU DIBANGUN?",
        contactTitle: "Let's make it work.",
        contactBody: "Terbuka untuk product engineering, frontend architecture, contract work, dan kolaborasi yang menarik.",
        emailMe: "Email saya",
        statLabels: ["institusi keuangan", "order / bulan", "online stores"],
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
        caseStudy: "View project",
        live: "Live demo",
        code: "Source",
        experience: "Experience",
        experienceDesc: "A career spanning regional dashboards to platforms used by millions of people.",
        about: "About",
        aboutTitle: "Frontend engineering focused on reliability, clarity, and scale.",
        stack: "Core stack",
        contactKicker: "HAVE SOMETHING WORTH BUILDING?",
        contactTitle: "Let's make it work.",
        contactBody: "Open to product engineering, frontend architecture, contract work, and interesting collaborations.",
        emailMe: "Email me",
        statLabels: ["financial institutions", "orders / month", "online stores"],
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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-bg-primary)", color: "var(--color-text-primary)" }}>
      <header
        className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl"
        style={{ backgroundColor: "color-mix(in srgb, var(--color-bg-primary) 88%, transparent)", borderColor: "var(--color-border-primary)" }}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 md:px-12">
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3 text-left">
            <span className="font-sans text-xl font-black tracking-[-0.08em]">JR</span>
            <span className="hidden text-sm font-medium sm:inline">Jessen Reinhart</span>
          </button>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.id)}
                className="text-xs font-medium transition-opacity hover:opacity-55"
                style={{ color: "var(--color-text-secondary)" }}
              >
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
          <div className="border-t px-6 py-5 md:hidden" style={{ backgroundColor: "var(--color-bg-primary)", borderColor: "var(--color-border-primary)" }}>
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button key={item.id} type="button" onClick={() => navigate(item.id)} className="py-3 text-left text-2xl font-semibold tracking-tight">
                  {item.label}
                </button>
              ))}
            </div>
            <div className="mt-4 flex gap-2 border-t pt-4" style={{ borderColor: "var(--color-border-primary)" }}>
              <button type="button" onClick={toggleLang} className="me-btn-ghost flex flex-1 items-center justify-center gap-2 py-3 text-xs font-mono"><Globe className="h-4 w-4" />{lang === "en" ? "ID" : "EN"}</button>
              <button type="button" onClick={toggleTheme} className="me-btn-ghost flex flex-1 items-center justify-center gap-2 py-3 text-xs font-mono">{theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}{theme === "dark" ? "LIGHT" : "DARK"}</button>
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="hero" className="px-6 pb-14 pt-32 md:px-12 md:pb-20 md:pt-40">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <div className="mb-7 font-mono text-[10px] tracking-[0.24em]" style={{ color: "var(--color-text-muted)" }}>{copy.eyebrow}</div>
                <h1 className="max-w-5xl font-sans text-[clamp(3.4rem,7vw,7.15rem)] font-semibold leading-[0.91] tracking-[-0.065em]">
                  {copy.headline}
                </h1>
                <p className="mt-7 max-w-2xl text-base leading-relaxed md:text-lg" style={{ color: "var(--color-text-muted)" }}>{copy.intro}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button type="button" onClick={() => navigate("projects")} className="me-btn-primary flex items-center gap-2 px-6 py-3.5 text-xs font-semibold">
                    {copy.viewWork}<ArrowUpRight className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={onViewResume} className="me-btn-ghost flex items-center gap-2 px-6 py-3.5 text-xs font-semibold">
                    {copy.resume}<FileText className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <aside className="border-l pl-6 lg:col-span-4 lg:pb-3" style={{ borderColor: "var(--color-border-primary)" }}>
                <div className="font-mono text-[9px] tracking-[0.28em]" style={{ color: "var(--color-text-dim)" }}>{copy.sideKicker}</div>
                <div className="my-6 h-px w-10" style={{ backgroundColor: "var(--color-accent)" }} />
                <p className="max-w-sm text-sm leading-relaxed md:text-base" style={{ color: "var(--color-text-muted)" }}>{copy.sideBody}</p>
              </aside>
            </div>

            <div className="mt-14 grid border-y sm:grid-cols-3" style={{ borderColor: "var(--color-border-primary)" }}>
              {proofStats.map((stat, index) => (
                <div key={stat.label} className="flex items-baseline gap-3 border-b py-6 sm:border-b-0 sm:border-r sm:px-7 sm:first:pl-0 sm:last:border-r-0" style={{ borderColor: "var(--color-border-primary)" }}>
                  <span className="text-3xl font-semibold tracking-[-0.04em] md:text-4xl">{stat.value}{index === 0 ? "+" : ""}</span>
                  <span className="text-xs leading-snug" style={{ color: "var(--color-text-muted)" }}>{copy.statLabels[index]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="scroll-mt-24 border-t px-6 py-20 md:px-12 md:py-28" style={{ backgroundColor: "var(--color-bg-secondary)", borderColor: "var(--color-border-primary)" }}>
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 grid gap-6 md:grid-cols-2 md:items-end">
              <div>
                <div className="mb-4 flex items-center gap-3 font-mono text-[10px] tracking-[0.22em]" style={{ color: "var(--color-accent)" }}><span>01</span><span className="h-px w-8" style={{ backgroundColor: "var(--color-accent)" }} /></div>
                <h2 className="font-sans text-4xl font-semibold tracking-[-0.05em] md:text-6xl">{copy.selectedWork}</h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed md:justify-self-end" style={{ color: "var(--color-text-muted)" }}>{copy.selectedWorkDesc}</p>
            </div>

            <div className="space-y-5">
              {PROJECTS.map((project, index) => {
                const description = lang === "id" && project.descriptionId ? project.descriptionId : project.description;
                const motivation = lang === "id" && project.motivationId ? project.motivationId : project.motivation;
                return (
                  <article key={project.id} className="overflow-hidden rounded-xl border" style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border-primary)" }}>
                    <div className="grid lg:grid-cols-12">
                      <div className="relative min-h-[280px] overflow-hidden bg-[var(--color-bg-surface)] lg:col-span-7 lg:min-h-[440px]">
                        <img src={project.imageSrc} alt={`${project.title} preview`} className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 hover:scale-[1.02]" />
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
                            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[var(--color-accent)]">{copy.live}<ArrowUpRight className="h-3.5 w-3.5" /></a>}
                            {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[var(--color-accent)]">{copy.code}<Github className="h-3.5 w-3.5" /></a>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="experience" className="scroll-mt-24 border-t px-6 py-20 md:px-12 md:py-28" style={{ borderColor: "var(--color-border-primary)" }}>
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 grid gap-6 md:grid-cols-2 md:items-end">
              <div>
                <div className="mb-4 flex items-center gap-3 font-mono text-[10px] tracking-[0.22em]" style={{ color: "var(--color-accent)" }}><span>02</span><span className="h-px w-8" style={{ backgroundColor: "var(--color-accent)" }} /></div>
                <h2 className="font-sans text-4xl font-semibold tracking-[-0.05em] md:text-6xl">{copy.experience}</h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed md:justify-self-end" style={{ color: "var(--color-text-muted)" }}>{copy.experienceDesc}</p>
            </div>

            <div className="border-t" style={{ borderColor: "var(--color-border-primary)" }}>
              {EXPERIENCES.map((exp) => {
                const highlights = lang === "id" && exp.highlightsId ? exp.highlightsId : exp.highlights;
                return (
                  <article key={exp.id} className="grid gap-4 border-b py-7 md:grid-cols-12 md:gap-8" style={{ borderColor: "var(--color-border-primary)" }}>
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
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 border-t px-6 py-20 md:px-12 md:py-28" style={{ backgroundColor: "var(--color-bg-secondary)", borderColor: "var(--color-border-primary)" }}>
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="mb-4 flex items-center gap-3 font-mono text-[10px] tracking-[0.22em]" style={{ color: "var(--color-accent)" }}><span>03</span><span className="h-px w-8" style={{ backgroundColor: "var(--color-accent)" }} /></div>
                <h2 className="font-sans text-4xl font-semibold leading-[0.98] tracking-[-0.055em] md:text-6xl">{copy.aboutTitle}</h2>
              </div>
              <div className="lg:col-span-7 lg:pl-12">
                <div className="space-y-5 text-sm leading-relaxed md:text-base" style={{ color: "var(--color-text-muted)" }}>
                  <p>{t.aboutP1}</p>
                  <p>{t.aboutP2}</p>
                </div>
                <div className="mt-10 border-t pt-7" style={{ borderColor: "var(--color-border-primary)" }}>
                  <div className="mb-4 font-mono text-[10px] tracking-[0.22em]" style={{ color: "var(--color-text-dim)" }}>{copy.stack}</div>
                  <div className="grid gap-x-8 gap-y-6 sm:grid-cols-3">
                    {SKILL_CATEGORIES.map((category) => (
                      <div key={category.name}>
                        <h3 className="mb-3 text-sm font-semibold">{category.name}</h3>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                          {category.skills.slice(0, 8).map((skill) => <span key={skill}>{skill}</span>)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 border-t px-6 py-20 md:px-12 md:py-28" style={{ borderColor: "var(--color-border-primary)" }}>
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <div className="mb-5 font-mono text-[10px] tracking-[0.24em]" style={{ color: "var(--color-accent)" }}>{copy.contactKicker}</div>
                <h2 className="font-sans text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.92] tracking-[-0.065em]">{copy.contactTitle}</h2>
                <p className="mt-6 max-w-xl text-sm leading-relaxed md:text-base" style={{ color: "var(--color-text-muted)" }}>{copy.contactBody}</p>
              </div>
              <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
                <a href="mailto:jessenreinharts@gmail.com" className="me-btn-primary flex w-full items-center justify-center gap-2 px-6 py-4 text-sm font-semibold sm:w-auto">{copy.emailMe}<Mail className="h-4 w-4" /></a>
                <div className="flex items-center gap-5 pt-3" style={{ color: "var(--color-text-muted)" }}>
                  <a href="https://github.com/jessenreinhart" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-[var(--color-accent)]"><Github className="h-5 w-5" /></a>
                  <a href="https://linkedin.com/in/jessenreinhart" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[var(--color-accent)]"><Linkedin className="h-5 w-5" /></a>
                  <a href="mailto:jessenreinharts@gmail.com" aria-label="Email" className="hover:text-[var(--color-accent)]"><Mail className="h-5 w-5" /></a>
                </div>
              </div>
            </div>
          </div>
        </section>
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
