import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "motion/react";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Footer from "./components/Footer";
import ResumeViewer from "./components/ResumeViewer";
import { useLanguage } from "./contexts/LanguageContext";
import { translations } from "./i18n/translations";

const Experience = lazy(() => import("./components/Experience"));
const Projects = lazy(() => import("./components/Projects"));
const Skills = lazy(() => import("./components/Skills"));
const GitHubActivity = lazy(() => import("./components/GitHubActivity"));
const Contact = lazy(() => import("./components/Contact"));

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [resumeOpen, setResumeOpen] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang];

  // ScrollSpy via IntersectionObserver — avoids forced reflow from offsetTop reads
  useEffect(() => {
    const sectionIds = ["hero", "about", "experience", "projects", "skills", "github", "contact"];
    const observed = new Set<string>();
    const visibleSections = new Map<string, number>();

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleSections.delete(entry.target.id);
          }
        }

        let bestId = "hero";
        let bestRatio = 0;
        for (const [id, ratio] of visibleSections) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        setActiveSection(bestId);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "-10% 0px -40% 0px" }
    );

    // Observe sections that are already in the DOM
    const observeSections = () => {
      for (const id of sectionIds) {
        if (!observed.has(id)) {
          const el = document.getElementById(id);
          if (el) {
            intersectionObserver.observe(el);
            observed.add(id);
          }
        }
      }
    };

    observeSections();

    // Watch for lazy-loaded sections being added to the DOM
    const mutationObserver = new MutationObserver(() => {
      observeSections();
      // Stop once all sections are observed
      if (observed.size === sectionIds.length) {
        mutationObserver.disconnect();
      }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  const handleSmoothScroll = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: "var(--color-bg-primary)", color: "var(--color-text-primary)" }}>

      {/* Luxury Custom Interaction Cursor */}
      <CustomCursor />

      {/* Permanent Header Navbar */}
      <Navbar activeSection={activeSection} onNavigate={handleSmoothScroll} />

      {/* Main Sections */}
      <main className="relative">
        {/* HERO SECTION */}
        <Hero
          onViewProjects={() => handleSmoothScroll("projects")}
          onViewResume={() => setResumeOpen(true)}
        />

        {/* Dynamic Infinite Typographic Marquee Banner */}
        <section style={{ backgroundColor: "var(--color-marquee-bg)", color: "var(--color-marquee-text)" }} className="py-4 overflow-hidden border-y select-none pointer-events-none relative z-20" >
          <div className="flex whitespace-nowrap">
            <motion.div
              animate={{ x: [0, "-33.333%"] }}
              transition={{
                repeat: Infinity,
                duration: 25,
                ease: "linear",
              }}
              className="flex gap-16 font-display font-black text-xs md:text-sm tracking-[0.3em] uppercase items-center"
            >
              <span>{t.marquee1}</span>
              <span style={{ color: "var(--color-text-dim)" }}>//</span>
              <span>{t.marquee2}</span>
              <span style={{ color: "var(--color-text-dim)" }}>//</span>
              <span>{t.marquee3}</span>
              <span style={{ color: "var(--color-text-dim)" }}>//</span>
              <span>{t.marquee4}</span>
              <span style={{ color: "var(--color-text-dim)" }}>//</span>
              <span>{t.marquee5}</span>
              <span style={{ color: "var(--color-text-dim)" }}>//</span>
              <span>{t.marquee6}</span>
              <span style={{ color: "var(--color-text-dim)" }}>//</span>
              
              {/* Duplicated for smooth loop */}
              <span>{t.marquee1}</span>
              <span style={{ color: "var(--color-text-dim)" }}>//</span>
              <span>{t.marquee2}</span>
              <span style={{ color: "var(--color-text-dim)" }}>//</span>
              <span>{t.marquee3}</span>
              <span style={{ color: "var(--color-text-dim)" }}>//</span>
              <span>{t.marquee4}</span>
              <span style={{ color: "var(--color-text-dim)" }}>//</span>
              <span>{t.marquee5}</span>
              <span style={{ color: "var(--color-text-dim)" }}>//</span>
              <span>{t.marquee6}</span>
              <span style={{ color: "var(--color-text-dim)" }}>//</span>

              {/* Thrice for complete safety on large monitors */}
              <span>{t.marquee1}</span>
              <span style={{ color: "var(--color-text-dim)" }}>//</span>
              <span>{t.marquee2}</span>
              <span style={{ color: "var(--color-text-dim)" }}>//</span>
              <span>{t.marquee3}</span>
              <span style={{ color: "var(--color-text-dim)" }}>//</span>
              <span>{t.marquee4}</span>
              <span style={{ color: "var(--color-text-dim)" }}>//</span>
              <span>{t.marquee5}</span>
              <span style={{ color: "var(--color-text-dim)" }}>//</span>
              <span>{t.marquee6}</span>
              <span style={{ color: "var(--color-text-dim)" }}>//</span>
            </motion.div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <About />

        {/* Below-the-fold sections: lazy-loaded to reduce main-thread work */}
        <Suspense fallback={null}>
          <Experience />
          <Projects />
          <Skills />
          <GitHubActivity />
          <Contact />
        </Suspense>
      </main>

      {/* MONOCHROME FOOTER */}
      <Footer onScrollToTop={handleScrollToTop} />

      {/* Printable Fully Styled Editorial Fullscreen Resume Modal Overlay */}
      <AnimatePresence>
        {resumeOpen && (
          <ResumeViewer onClose={() => setResumeOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
