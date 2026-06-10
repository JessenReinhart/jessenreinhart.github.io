import { ArrowUp } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18n/translations";

interface FooterProps {
  onScrollToTop: () => void;
}

export default function Footer({ onScrollToTop }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <footer className="py-12 px-6 md:px-12 relative z-10 select-none" style={{ backgroundColor: "var(--color-bg-primary)", borderTop: "1px solid var(--color-border-primary)" }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <span className="block font-display font-black text-sm tracking-widest" style={{ color: "var(--color-text-primary)" }}>JESSEN</span>
          <span className="block font-mono text-[9px] uppercase tracking-widest mt-0.5" style={{ color: "var(--color-text-muted)" }}>
            Senior Frontend Engineer // © {currentYear} ALL RIGHTS RESERVED
          </span>
        </div>

        <div className="text-center">
          <span className="text-[10px] font-mono block uppercase tracking-widest" style={{ color: "var(--color-text-dim)" }}>{t.footerBuilt}</span>
          <span className="text-[11px] font-mono block uppercase tracking-widest mt-0.5" style={{ color: "var(--color-text-secondary)" }}>{t.footerStack}</span>
        </div>

        <button
          onClick={onScrollToTop}
          className="w-10 h-10 rounded-full transition-all flex items-center justify-center cursor-pointer"
          style={{ border: "1px solid var(--color-border-primary)", color: "var(--color-text-muted)" }}
          data-cursor="button"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}
