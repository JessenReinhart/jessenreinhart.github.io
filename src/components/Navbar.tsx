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
    { label: t.navExperience, id: "experience" },
    { label: t.navProjects, id: "projects" },
    { label: t.navSkills, id: "skills" },
    { label: t.navContact, id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled
            ? "backdrop-blur-md py-4"
            : "bg-transparent border-transparent py-6"
        }`}
        style={{
          backgroundColor: isScrolled ? "var(--color-bg-glass)" : undefined,
          borderColor: isScrolled ? "var(--color-border-primary)" : undefined,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleClick("hero")}
            className="flex items-center gap-3 group cursor-pointer"
            data-cursor="button"
          >
            <div
              className="w-9 h-9 flex items-center justify-center font-display font-black text-lg tracking-tighter transition-transform duration-300 group-hover:rotate-6"
              style={{ border: "1px solid var(--color-text-primary)", backgroundColor: "var(--color-text-primary)", color: "var(--color-bg-primary)" }}
            >
              JR
            </div>
            <div className="text-left hidden sm:block">
              <span className="block font-display font-bold text-xs tracking-wider" style={{ color: "var(--color-text-primary)" }}>
                JESSEN REINHART
              </span>
              <span className="block font-mono text-[9px] uppercase tracking-widest" style={{ color: "var(--color-text-dim)" }}>
                Senior Frontend Engineer
              </span>
            </div>
          </button>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleClick(link.id)}
                className="relative text-xs font-mono tracking-widest transition-colors py-2 cursor-pointer"
                style={{ color: activeSection === link.id ? "var(--color-text-primary)" : "var(--color-text-muted)" }}
                data-cursor="button"
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] block"
                    style={{ backgroundColor: "var(--color-text-primary)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="w-9 h-9 rounded-full border flex items-center justify-center text-xs font-mono font-bold transition-all cursor-pointer"
              style={{ borderColor: "var(--color-border-primary)", color: "var(--color-text-muted)" }}
              title={lang === "en" ? "Switch to Indonesian" : "Ganti ke English"}
            >
              {lang === "en" ? "EN" : "ID"}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer"
              style={{ borderColor: "var(--color-border-primary)", color: "var(--color-text-muted)" }}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => handleClick("contact")}
              className="px-5 py-2.5 rounded-full border text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-2 group cursor-pointer"
              style={{ borderColor: "var(--color-border-primary)", color: "var(--color-text-primary)" }}
              data-cursor="button"
            >
              {t.navGetInTouch}
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 transition-colors"
            style={{ color: "var(--color-text-muted)" }}
            data-cursor="button"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full h-screen z-40 pt-28 px-8 flex flex-col justify-between pb-12"
            style={{ backgroundColor: "var(--color-bg-primary)" }}
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleClick(link.id)}
                  className="text-left py-2 font-display text-4xl font-extrabold tracking-tight transition-colors flex items-center justify-between group"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <span>{link.label}</span>
                  <span className="text-sm font-mono transition-colors" style={{ color: "var(--color-text-dim)" }}>
                    {link.id === activeSection ? "—" : ""}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4 font-mono text-xs">
              {/* Mobile toggles */}
              <div className="flex gap-3">
                <button
                  onClick={toggleTheme}
                  className="flex-1 py-3 rounded-full border flex items-center justify-center gap-2"
                  style={{ borderColor: "var(--color-border-primary)", color: "var(--color-text-primary)" }}
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  {theme === "dark" ? "LIGHT" : "DARK"}
                </button>
                <button
                  onClick={toggleLang}
                  className="flex-1 py-3 rounded-full border flex items-center justify-center gap-2"
                  style={{ borderColor: "var(--color-border-primary)", color: "var(--color-text-primary)" }}
                >
                  <Globe className="w-4 h-4" />
                  {lang === "en" ? "INDONESIA" : "ENGLISH"}
                </button>
              </div>

              <div style={{ backgroundColor: "var(--color-border-primary)" }} className="h-px" />
              <button
                onClick={() => handleClick("contact")}
                className="w-full py-4 text-center border rounded-full font-semibold flex items-center justify-center gap-2"
                style={{ borderColor: "var(--color-text-primary)", backgroundColor: "var(--color-text-primary)", color: "var(--color-bg-primary)" }}
              >
                {t.navGetInTouch}
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <div className="text-center text-[10px] tracking-wider uppercase mt-2" style={{ color: "var(--color-text-dim)" }}>
                {t.navAvailable}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
