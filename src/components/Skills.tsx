import { SKILL_CATEGORIES } from "../data";
import { Code2, Settings, Compass } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18n/translations";


export default function Skills() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const categoryNames = [t.catFrontend, t.catBackend, t.catEngineering];
  const categoryIcons = [
    <Code2 className="w-5 h-5" style={{ color: "var(--color-text-muted)" }} />,
    <Settings className="w-5 h-5" style={{ color: "var(--color-text-muted)" }} />,
    <Compass className="w-5 h-5" style={{ color: "var(--color-text-muted)" }} />
  ];

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden scroll-mt-20 border-t" style={{ backgroundColor: "var(--color-bg-primary)", borderColor: "var(--color-border-primary)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-20 text-left">
          <span className="block font-mono text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: "var(--color-text-muted)" }}>{t.skillsSection}</span>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tight leading-none" style={{ color: "var(--color-text-primary)" }}>{t.skillsTitle}</h2>
          <p className="max-w-md font-light mt-4 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{t.skillsSubtitle}</p>
        </div>

        <div className="space-y-12">
          {SKILL_CATEGORIES.map((category, idx) => (
            <div key={category.name} className="glass-panel glass-panel-hover rounded-2xl p-8 md:p-10 text-left relative">
              <div className="flex items-center gap-3 pb-4 mb-6" style={{ borderBottom: "1px solid var(--color-border-primary)" }}>
                {categoryIcons[idx]}
                <h3 className="text-sm font-mono tracking-widest uppercase font-semibold" style={{ color: "var(--color-text-muted)" }}>{categoryNames[idx]}</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span key={skill} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border text-xs font-mono backdrop-blur-md cursor-default select-none transition-all duration-200 hover:scale-105 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-glass-hover)]" style={{ borderColor: "var(--color-border-primary)", backgroundColor: "var(--color-bg-glass)" }}>
                    <span className="font-medium mr-0.5 select-none font-sans" style={{ color: "var(--color-text-dim)" }}>#</span>
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
