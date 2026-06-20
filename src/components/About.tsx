import { motion } from "motion/react";
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
    <Award className="w-5 h-5" style={{ color: "var(--color-text-muted)" }} />,
    <Layers className="w-5 h-5" style={{ color: "var(--color-text-muted)" }} />,
    <Users className="w-5 h-5" style={{ color: "var(--color-text-muted)" }} />,
    <Zap className="w-5 h-5" style={{ color: "var(--color-text-muted)" }} />,
    <ShoppingCart className="w-5 h-5" style={{ color: "var(--color-text-muted)" }} />
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden border-y scroll-mt-20" style={{ backgroundColor: "var(--color-bg-secondary)", borderColor: "var(--color-border-primary)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="block font-mono text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: "var(--color-text-muted)" }}>{t.aboutSection}</span>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tight leading-none" style={{ color: "var(--color-text-primary)" }}>{t.aboutTitle}</h2>
          </div>
          <div className="max-w-md font-light text-sm leading-relaxed text-left md:text-right" style={{ color: "var(--color-text-muted)" }}>{t.aboutSubtitle}</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          <div className="lg:col-span-7 space-y-6 text-left">
            <h3 className="text-xl md:text-2xl font-light tracking-wide leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{t.aboutHeading}</h3>
            <p className="font-light leading-relaxed text-sm md:text-base" style={{ color: "var(--color-text-muted)" }}>{t.aboutP1}</p>
            <p className="font-light leading-relaxed text-sm md:text-base" style={{ color: "var(--color-text-muted)" }}>{t.aboutP2}</p>
          </div>

          <div className="lg:col-span-5 p-8 rounded-2xl relative glass-panel">
            <div className="absolute top-3 right-4 font-mono text-[9px] uppercase select-none" style={{ color: "var(--color-text-dim)" }}>{t.aboutSpecializations}</div>
            <h4 className="text-xs font-mono tracking-wider uppercase mb-6 text-left" style={{ color: "var(--color-text-muted)" }}>{t.aboutTechFocus}</h4>
            <ul className="space-y-4 text-left">
              {specializations.map((spec, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <span className="font-mono select-none" style={{ color: "var(--color-text-dim)" }}>—</span>
                  <span className="font-light text-sm transition-colors" style={{ color: "var(--color-text-secondary)" }}>{spec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
          {STATS.map((stat, idx) => (
            <div key={stat.label} className="glass-panel glass-panel-hover rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col justify-between text-left relative overflow-hidden min-w-0">
              <div className="absolute top-3 right-3 opacity-40">{icons[idx]}</div>
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
