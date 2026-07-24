import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Footer from "./components/Footer";
import ResumeViewer from "./components/ResumeViewer";
import { useLanguage } from "./contexts/LanguageContext";
import { translations } from "./i18n/translations";
import { PROJECTS } from "./data";
import { getHireProjectId } from "./utils/hireIntent";

const Experience = lazy(() => import("./components/Experience"));
const Services = lazy(() => import("./components/Services"));
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
    const sectionIds = ["hero", "about", "services", "experience", "projects", "skills", "github", "contact"];
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

  // Cold hire deep-link (?project=) → wait for lazy Contact, then scroll
  useEffect(() => {
    const projectId = getHireProjectId();
    if (!projectId || !PROJECTS.some((p) => p.id === projectId)) return;

    let done = false;
    let mutationObserver: MutationObserver | null = null;
    const scrollToContact = () => {
      if (done) return;
      const el = document.getElementById("contact");
      if (!el) return;
      done = true;
      el.scrollIntoView({ behavior: "smooth" });
      mutationObserver?.disconnect();
    };

    mutationObserver = new MutationObserver(scrollToContact);
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    scrollToContact();
    return () => mutationObserver?.disconnect();
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
      {/* Site chrome — fully removed from print flow so resume is 1 page */}
      <div className="no-print">
        <Navbar activeSection={activeSection} onNavigate={handleSmoothScroll} />

        <main className="relative">
          <Hero
            onViewProjects={() => handleSmoothScroll("projects")}
            onViewResume={() => setResumeOpen(true)}
          />

          <section
            style={{ backgroundColor: "var(--color-marquee-bg)", color: "var(--color-marquee-text)" }}
            className="py-3 overflow-hidden select-none pointer-events-none relative z-20"
          >
            <div className="flex whitespace-nowrap">
              <motion.div
                animate={{ x: [0, "-33.333%"] }}
                transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
                className="flex gap-12 font-display font-extrabold text-xs md:text-sm tracking-[0.28em] uppercase items-center"
              >
                {[0, 1, 2].flatMap((copy) => [
                  <span key={`${copy}-1`}>{t.marquee1}</span>,
                  <span key={`${copy}-s1`} style={{ opacity: 0.65 }}>/</span>,
                  <span key={`${copy}-2`}>{t.marquee2}</span>,
                  <span key={`${copy}-s2`} style={{ opacity: 0.65 }}>/</span>,
                  <span key={`${copy}-3`}>{t.marquee3}</span>,
                  <span key={`${copy}-s3`} style={{ opacity: 0.65 }}>/</span>,
                  <span key={`${copy}-4`}>{t.marquee4}</span>,
                  <span key={`${copy}-s4`} style={{ opacity: 0.65 }}>/</span>,
                  <span key={`${copy}-5`}>{t.marquee5}</span>,
                  <span key={`${copy}-s5`} style={{ opacity: 0.65 }}>/</span>,
                  <span key={`${copy}-6`}>{t.marquee6}</span>,
                  <span key={`${copy}-s6`} style={{ opacity: 0.65 }}>/</span>,
                ])}
              </motion.div>
            </div>
          </section>

          <About />

          <Suspense fallback={null}>
            <Services />
            <Experience />
            <Projects />
            <Skills />
            <GitHubActivity />
            <Contact />
          </Suspense>
        </main>

        <Footer onScrollToTop={handleScrollToTop} />
      </div>

      <AnimatePresence>
        {resumeOpen && (
          <ResumeViewer onClose={() => setResumeOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
