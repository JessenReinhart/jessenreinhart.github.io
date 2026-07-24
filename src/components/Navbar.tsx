import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, Sun, Moon, Globe } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18n/translations";

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLanguage();
  const t = translations[lang];

  const navLinks = [
    { label: t.navHome, id: "hero" },
    { label: t.navAbout, id: "about" },
    { label: t.navServices, id: "services" },
    { label: t.navExperience, id: "experience" },
    { label: t.navProjects, id: "projects" },
    { label: t.navSkills, id: "skills" },
    { label: t.navGithub, id: "github" },
    { label: t.navContact, id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          isScrolled ? "py-3" : "py-4 border-transparent"
        }`}
        style={{
          backgroundColor: isScrolled ? "var(--color-bg-secondary)" : "transparent",
          borderColor: isScrolled ? "var(--color-border-primary)" : "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-4">
          <button
            onClick={() => handleClick("hero")}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div
              className="w-9 h-9 flex items-center justify-center font-display font-extrabold text-lg tracking-tighter transition-colors"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "var(--color-accent-invert)",
              }}
            >
              JR
            </div>
            <div className="text-left hidden sm:block">
              <span className="block font-display font-bold text-sm tracking-wide uppercase" style={{ color: "var(--color-text-primary)" }}>
                Jessen Reinhart
              </span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: "var(--color-text-dim)" }}>
                Senior Frontend Engineer
              </span>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleClick(link.id)}
                className="relative text-[11px] font-mono tracking-[0.14em] uppercase transition-colors py-2 cursor-pointer"
                style={{
                  color: activeSection === link.id ? "var(--color-accent)" : "var(--color-text-muted)",
                }}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-[2px] block me-accent-bar"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="me-btn-ghost w-9 h-9 flex items-center justify-center text-[11px] font-mono font-bold cursor-pointer"
              style={{ color: "var(--color-text-muted)" }}
              title={lang === "en" ? "Switch to Indonesian" : "Ganti ke English"}
            >
              {lang === "en" ? "EN" : "ID"}
            </button>
            <button
              onClick={toggleTheme}
              className="me-btn-ghost w-9 h-9 flex items-center justify-center cursor-pointer"
              style={{ color: "var(--color-text-muted)" }}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => handleClick("contact")}
              className="me-btn-primary px-4 py-2.5 text-[11px] font-mono tracking-wider uppercase flex items-center gap-2 group cursor-pointer"
            >
              {t.navGetInTouch}
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 transition-colors"
            style={{ color: "var(--color-text-muted)" }}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 w-full h-[100dvh] z-40 pt-24 px-8 flex flex-col justify-between pb-10"
            style={{ backgroundColor: "var(--color-bg-primary)" }}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <button
                  key={link.id}
                  onClick={() => handleClick(link.id)}
                  className="text-left py-3 font-display text-4xl font-extrabold tracking-tight uppercase transition-colors flex items-center justify-between"
                  style={{
                    color: link.id === activeSection ? "var(--color-accent)" : "var(--color-text-primary)",
                    animationDelay: `${i * 40}ms`,
                  }}
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono" style={{ color: "var(--color-text-dim)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3 font-mono text-xs">
              <div className="flex gap-2">
                <button
                  onClick={toggleTheme}
                  className="me-btn-ghost flex-1 py-3 flex items-center justify-center gap-2"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  {theme === "dark" ? "LIGHT" : "DARK"}
                </button>
                <button
                  onClick={toggleLang}
                  className="me-btn-ghost flex-1 py-3 flex items-center justify-center gap-2"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  <Globe className="w-4 h-4" />
                  {lang === "en" ? "ID" : "EN"}
                </button>
              </div>
              <button
                onClick={() => handleClick("contact")}
                className="me-btn-primary w-full py-4 text-center font-semibold flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                {t.navGetInTouch}
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <div className="text-center text-[10px] tracking-wider uppercase mt-1" style={{ color: "var(--color-text-dim)" }}>
                {t.navAvailable}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
