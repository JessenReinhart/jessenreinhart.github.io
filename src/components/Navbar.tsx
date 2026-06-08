import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "HOME", id: "hero" },
    { label: "ABOUT", id: "about" },
    { label: "EXPERIENCE", id: "experience" },
    { label: "PROJECTS", id: "projects" },
    { label: "SKILLS", id: "skills" },
    { label: "CONTACT", id: "contact" },
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
            ? "bg-black/60 backdrop-blur-md border-white/8 py-4"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleClick("hero")}
            className="flex items-center gap-3 group cursor-pointer"
            data-cursor="button"
          >
            <div className="w-9 h-9 border border-white flex items-center justify-center font-display font-black text-lg tracking-tighter bg-white text-black transition-transform duration-300 group-hover:rotate-6">
              JR
            </div>
            <div className="text-left hidden sm:block">
              <span className="block font-display font-bold text-xs tracking-wider text-white">
                JESSEN REINHART
              </span>
              <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
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
                className="relative text-xs font-mono tracking-widest text-zinc-400 hover:text-white transition-colors py-2 cursor-pointer"
                data-cursor="button"
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white block"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* "Let's Work Together" button client CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => handleClick("contact")}
              className="px-5 py-2.5 rounded-full border border-white/10 text-xs font-mono tracking-wider text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 group cursor-pointer"
              data-cursor="button"
            >
              GET IN TOUCH
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
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
            className="fixed top-0 left-0 w-full h-screen bg-black/95 z-40 pt-28 px-8 flex flex-col justify-between pb-12"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleClick(link.id)}
                  className="text-left py-2 font-display text-4xl font-extrabold tracking-tight text-zinc-400 hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>{link.label}</span>
                  <span className="text-sm font-mono text-zinc-600 transition-colors group-hover:text-white">
                    {link.id === activeSection ? "—" : ""}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-6 font-mono text-xs">
              <div className="h-px bg-zinc-800" />
              <button
                onClick={() => handleClick("contact")}
                className="w-full py-4 text-center border border-white rounded-full bg-white text-black font-semibold flex items-center justify-center gap-2"
              >
                GET IN TOUCH
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <div className="text-zinc-500 text-center text-[10px] tracking-wider uppercase mt-4">
                Available for contracts & full-time roles
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
