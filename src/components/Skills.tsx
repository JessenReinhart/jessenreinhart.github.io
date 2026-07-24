import { SKILL_CATEGORIES } from "../data";
import { Code2, Settings, Compass } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18n/translations";

export default function Skills() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const categoryNames = [t.catFrontend, t.catBackend, t.catEngineering];
  const categoryIcons = [
    <Code2 className="w-5 h-5" style={{ color: "var(--color-accent)" }} />,
    <Settings className="w-5 h-5" style={{ color: "var(--color-accent)" }} />,
    <Compass className="w-5 h-5" style={{ color: "var(--color-accent)" }} />
  ];

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden scroll-mt-20 border-t" style={{ backgroundColor: "var(--color-bg-primary)", borderColor: "var(--color-border-primary)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16 md:mb-20 text-left">
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-none uppercase" style={{ color: "var(--color-text-primary)" }}>{t.skillsTitle}</h2>
          <p className="max-w-md font-light mt-4 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{t.skillsSubtitle}</p>
        </div>

        <div className="space-y-6">
          {SKILL_CATEGORIES.map((category, idx) => (
            <div key={category.name} className="me-panel me-panel-hover p-7 md:p-9 text-left relative">
              <div className="flex items-center gap-3 mb-5">
                {categoryIcons[idx]}
                <h3 className="text-sm font-mono tracking-widest uppercase font-semibold" style={{ color: "var(--color-text-muted)" }}>{categoryNames[idx]}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 me-chip text-xs font-mono cursor-default select-none transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)]"
                  >
                    <span className="font-medium select-none" style={{ color: "var(--color-accent)" }}>#</span>
                    <span style={{ color: "var(--color-text-secondary)" }}>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
