import { motion } from "motion/react";
import { Globe, LayoutDashboard, Gauge, Wrench, Linkedin, ArrowUpRight, ExternalLink } from "lucide-react";
import { SERVICES, STATS, LINKEDIN_URL } from "../data";
import { Service } from "../types";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18n/translations";

const renderServiceIcon = (icon: Service["icon"], className = "w-10 h-10") => {
  switch (icon) {
    case "website": return <Globe className={className} />;
    case "webapp": return <LayoutDashboard className={className} />;
    case "redesign": return <Gauge className={className} />;
    case "maintenance": return <Wrench className={className} />;
    default: return <Globe className={className} />;
  }
};

const scrollToContact = () => {
  const el = document.getElementById("contact");
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Services() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const proofStats = [STATS[2], STATS[1], STATS[3]];

  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden border-t scroll-mt-20" style={{ backgroundColor: "var(--color-bg-primary)", borderColor: "var(--color-border-primary)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="block font-mono text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: "var(--color-text-muted)" }}>{t.svcSection}</span>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tight leading-none" style={{ color: "var(--color-text-primary)" }}>{t.svcTitle}</h2>
          </div>
          <div className="max-w-xs font-light text-xs leading-relaxed text-left md:text-right font-mono uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>{t.svcSubtitle}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: (idx % 2) * 0.1, cubicBezier: [0.16, 1, 0.3, 1] }}
              className="glass-panel glass-panel-hover rounded-2xl p-7 md:p-8 flex flex-col text-left relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all" style={{ border: "1px solid var(--color-border-primary)", backgroundColor: "var(--color-bg-card)", color: "var(--color-text-primary)" }}>
                  {renderServiceIcon(service.icon, "w-6 h-6")}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest select-none" style={{ color: "var(--color-text-dim)" }}>0{idx + 1}</span>
              </div>

              <h3 className="text-2xl font-display font-black tracking-tight mb-2" style={{ color: "var(--color-text-primary)" }}>{lang === "id" && service.titleId ? service.titleId : service.title}</h3>
              <p className="font-light text-sm leading-relaxed mb-5" style={{ color: "var(--color-text-muted)" }}>{lang === "id" && service.descriptionId ? service.descriptionId : service.description}</p>

              {service.examples && service.examples.length > 0 && (
                <div className="mb-5">
                  <span className="block font-mono text-[9px] tracking-[0.2em] uppercase mb-2" style={{ color: "var(--color-text-dim)" }}>{t.svcExamples}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {service.examples.map((ex) => {
                      const label = lang === "id" && ex.labelId ? ex.labelId : ex.label;
                      return ex.url ? (
                        <a key={ex.label} href={ex.url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono px-2.5 py-0.5 rounded-full transition-colors flex items-center gap-1 group cursor-pointer" style={{ border: "1px solid var(--color-border-primary)", color: "var(--color-text-muted)" }} data-cursor="button">
                          {label}
                          <ExternalLink className="w-2.5 h-2.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      ) : (
                        <span key={ex.label} className="text-[10px] font-mono px-2.5 py-0.5 rounded-full" style={{ border: "1px solid var(--color-border-primary)", color: "var(--color-text-muted)" }}>{label}</span>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mt-auto pt-4" style={{ borderTop: "1px solid var(--color-border-primary)" }}>
                <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--color-text-secondary)" }}>{lang === "id" && service.outcomeId ? service.outcomeId : service.outcome}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social proof strip */}
        <div className="mt-12 glass-panel rounded-2xl p-7 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-xs font-mono tracking-wider uppercase mb-1" style={{ color: "var(--color-text-muted)" }}>{t.svcProofTitle}</h4>
            <p className="font-light text-sm leading-relaxed max-w-sm" style={{ color: "var(--color-text-muted)" }}>{t.svcProofDesc}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {proofStats.map((stat) => (
                <div key={stat.label} className="text-left">
                  <span className="font-display font-extrabold text-xl tracking-tighter" style={{ color: "var(--color-text-primary)" }}>{stat.value}</span>
                  <span className="block text-[10px] font-mono uppercase tracking-wider leading-tight" style={{ color: "var(--color-text-muted)" }}>{stat.label}</span>
                </div>
              ))}
            </div>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer group" style={{ border: "1px solid var(--color-border-primary)", color: "var(--color-text-primary)" }} data-cursor="button">
              <Linkedin className="w-4 h-4" />
              {t.svcLinkedinRecs}
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* CTA band */}
        <div className="mt-8 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden" style={{ backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border-primary)" }}>
          <h3 className="font-display font-black text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight" style={{ color: "var(--color-text-primary)" }}>{t.svcCtaTitle}</h3>
          <p className="font-light text-sm md:text-base leading-relaxed mt-3 mb-7" style={{ color: "var(--color-text-muted)" }}>{t.svcCtaDesc}</p>
          <button onClick={scrollToContact} className="px-7 py-3.5 rounded-full font-bold text-xs font-mono tracking-widest transition-colors flex items-center justify-center gap-2 mx-auto cursor-pointer select-none" style={{ backgroundColor: "var(--color-text-primary)", color: "var(--color-bg-primary)" }} data-cursor="button">
            {t.svcCtaButton}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
