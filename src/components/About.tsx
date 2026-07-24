import { STATS } from "../data";
import { Layers, Zap, Award, Users, ShoppingCart } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18n/translations";

function StatDisplay({ targetVal }: { targetVal: number }) {
  const formatValue = (val: number) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(0)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(0)}k`;
    return val.toString();
  };

  return (
    <span className="font-display font-extrabold text-3xl sm:text-4xl lg:text-xl xl:text-4xl tracking-tighter whitespace-nowrap" style={{ color: "var(--color-text-primary)" }}>
      {formatValue(targetVal)}
    </span>
  );
}

export default function About() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const specializations = [
    t.aboutSpec1, t.aboutSpec2, t.aboutSpec3, t.aboutSpec4,
    t.aboutSpec5, t.aboutSpec6, t.aboutSpec7, t.aboutSpec8
  ];

  const statLabels = [t.statYears, t.statInstitutions, t.statUsers, t.statMerchants, t.statOrders];
  const icons = [
    <Award className="w-5 h-5" style={{ color: "var(--color-accent)" }} />,
    <Layers className="w-5 h-5" style={{ color: "var(--color-accent)" }} />,
    <Users className="w-5 h-5" style={{ color: "var(--color-accent)" }} />,
    <Zap className="w-5 h-5" style={{ color: "var(--color-accent)" }} />,
    <ShoppingCart className="w-5 h-5" style={{ color: "var(--color-accent)" }} />
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden border-t scroll-mt-20" style={{ backgroundColor: "var(--color-bg-secondary)", borderColor: "var(--color-border-primary)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16 md:mb-20">
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-none uppercase" style={{ color: "var(--color-text-primary)" }}>{t.aboutTitle}</h2>
          <p className="max-w-md font-light text-sm leading-relaxed mt-4" style={{ color: "var(--color-text-muted)" }}>{t.aboutSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-7 space-y-6 text-left">
            <h3 className="text-xl md:text-2xl font-light tracking-wide leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{t.aboutHeading}</h3>
            <p className="font-light leading-relaxed text-sm md:text-base" style={{ color: "var(--color-text-muted)" }}>{t.aboutP1}</p>
            <p className="font-light leading-relaxed text-sm md:text-base" style={{ color: "var(--color-text-muted)" }}>{t.aboutP2}</p>
          </div>

          <div className="lg:col-span-5 p-8 relative me-panel">
            <h4 className="text-xs font-mono tracking-wider uppercase mb-6 text-left" style={{ color: "var(--color-text-muted)" }}>{t.aboutTechFocus}</h4>
            <ul className="space-y-4 text-left">
              {specializations.map((spec, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <span className="font-mono select-none mt-0.5" style={{ color: "var(--color-accent)" }}>/</span>
                  <span className="font-light text-sm transition-colors" style={{ color: "var(--color-text-secondary)" }}>{spec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
          {STATS.map((stat, idx) => (
            <div key={stat.label} className="me-panel me-panel-hover p-4 sm:p-5 md:p-6 flex flex-col justify-between text-left relative overflow-hidden min-w-0">
              <div className="absolute top-3 right-3 opacity-70">{icons[idx]}</div>
              <div className="mb-3"><StatDisplay targetVal={stat.numericVal} /></div>
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider leading-tight break-words" style={{ color: "var(--color-text-muted)" }}>{statLabels[idx]}</div>
              {stat.source && (
                <div className="text-[9px] font-mono mt-1 tracking-wider" style={{ color: "var(--color-text-dim)" }}>{stat.source}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
