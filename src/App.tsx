import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ResumeViewer from "./components/ResumeViewer";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [resumeOpen, setResumeOpen] = useState(false);

  // ScrollSpy interaction logic to highlight navbar links automatically
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "experience", "projects", "skills", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    <div className="relative min-h-screen bg-[#050505] text-[#f3f4f6]">
      {/* Subtle Ambient Film Grain Noise overlay */}
      <div className="noise-overlay" />

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
        <section className="bg-white text-black py-4 overflow-hidden border-y border-white/10 select-none pointer-events-none relative z-20">
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
              <span>SENIOR FRONTEND ENGINEER</span>
              <span className="text-zinc-600">//</span>
              <span>CREATIVE CODER</span>
              <span className="text-zinc-600">//</span>
              <span>2M MONTHLY ORDERS</span>
              <span className="text-zinc-600">//</span>
              <span>DIGITAL BANKING TOOLS</span>
              <span className="text-zinc-600">//</span>
              <span>PERFORMANCE ARCHITECTURE</span>
              <span className="text-zinc-600">//</span>
              <span>WHITE-LABEL SOFTWARE SYSTEMS</span>
              <span className="text-zinc-600">//</span>
              
              {/* Duplicated for smooth loop */}
              <span>SENIOR FRONTEND ENGINEER</span>
              <span className="text-zinc-600">//</span>
              <span>CREATIVE CODER</span>
              <span className="text-zinc-600">//</span>
              <span>2M MONTHLY ORDERS</span>
              <span className="text-zinc-600">//</span>
              <span>DIGITAL BANKING TOOLS</span>
              <span className="text-zinc-600">//</span>
              <span>PERFORMANCE ARCHITECTURE</span>
              <span className="text-zinc-600">//</span>
              <span>WHITE-LABEL SOFTWARE SYSTEMS</span>
              <span className="text-zinc-600">//</span>

              {/* Thrice for complete safety on large monitors */}
              <span>SENIOR FRONTEND ENGINEER</span>
              <span className="text-zinc-600">//</span>
              <span>CREATIVE CODER</span>
              <span className="text-zinc-600">//</span>
              <span>2M MONTHLY ORDERS</span>
              <span className="text-zinc-600">//</span>
              <span>DIGITAL BANKING TOOLS</span>
              <span className="text-zinc-600">//</span>
              <span>PERFORMANCE ARCHITECTURE</span>
              <span className="text-zinc-600">//</span>
              <span>WHITE-LABEL SOFTWARE SYSTEMS</span>
              <span className="text-zinc-600">//</span>
            </motion.div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <About />

        {/* EXPERIENCE TIMELINE SECTION */}
        <Experience />

        {/* PROJECTS SECTION */}
        <Projects />

        {/* SKILLS WALL SECTION */}
        <Skills />

        {/* CONTACT GATEWAY SECTION */}
        <Contact />
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
