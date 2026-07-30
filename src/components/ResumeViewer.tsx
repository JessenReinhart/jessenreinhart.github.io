import { useEffect, useRef } from "react";
import { X, Printer, Mail, Linkedin, Globe, MapPin, Award } from "lucide-react";
import { motion } from "motion/react";
import { EXPERIENCES } from "../data";

interface ResumeViewerProps {
  onClose: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function ResumeViewer({ onClose }: ResumeViewerProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const root = dialogRef.current;
    const focusables = (): HTMLElement[] => {
      if (!root) return [];
      const nodes = root.querySelectorAll(FOCUSABLE);
      const out: HTMLElement[] = [];
      for (let i = 0; i < nodes.length; i++) {
        const el = nodes[i] as HTMLElement;
        if (!el.hasAttribute("disabled") && el.getClientRects().length > 0) out.push(el);
      }
      return out;
    };

    // Prefer close button first so keyboard users can exit immediately
    const initial =
      root?.querySelector<HTMLElement>("[data-resume-close]") ?? focusables()[0];
    initial?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !root) return;
      const nodes = focusables();
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first || !root.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] overflow-y-auto px-4 py-8 md:p-12 bg-[var(--color-bg-primary)] print:static print:bg-white print:overflow-visible print:p-0 print-resume"
    >
      {/* Visual Controls Header (Omitted during print) */}
      <div
        className="print-resume-chrome max-w-4xl mx-auto flex items-center justify-between gap-3 pb-4 mb-8 select-none"
        style={{ borderBottom: "1px solid var(--color-border-primary)" }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Award className="w-5 h-5 shrink-0" style={{ color: "var(--color-accent)" }} aria-hidden="true" />
          <span
            className="text-xs font-mono uppercase tracking-widest truncate"
            style={{ color: "var(--color-text-muted)" }}
          >
            Jessen — Professional resume
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handlePrint}
            className="me-btn-ghost min-h-11 px-4 py-2.5 font-semibold text-xs font-mono tracking-wider flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" aria-hidden="true" />
            Print resume
          </button>

          <button
            type="button"
            data-resume-close
            onClick={onClose}
            className="me-btn-ghost min-h-11 px-4 py-2.5 flex items-center gap-1 cursor-pointer"
            aria-label="Close resume"
          >
            <X className="w-4 h-4" aria-hidden="true" />
            <span className="text-xs font-mono font-bold">Close</span>
          </button>
        </div>
      </div>

      {/* Resume Sheet — screen can use site fonts; print forces ATS Arial via CSS */}
      <div className="resume-sheet max-w-4xl mx-auto bg-white text-black p-6 sm:p-8 md:p-14 shadow-[0_24px_48px_-20px_var(--color-shadow)] print:shadow-none print:p-0 text-left font-sans leading-tight text-[9.5pt]">
        {/* ── Header ── */}
        <div className="border-b border-black pb-1.5 mb-2">
          <h1
            id="resume-title"
            className="text-lg sm:text-xl font-display font-black tracking-tight text-neutral-900 leading-tight print:text-[14pt]"
          >
            Jessen Reinhart
          </h1>
          <h2 className="text-[10pt] font-medium text-neutral-700 font-display">
            Senior Frontend Engineer
          </h2>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[7.5pt] font-mono text-neutral-600 mt-1 leading-none">
            <a
              href="mailto:jessenreinharts@gmail.com"
              className="inline-flex items-center gap-1 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
            >
              <Mail className="w-2.5 h-2.5 print-only-hide" aria-hidden="true" />
              jessenreinharts@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/jessenreinhart"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
            >
              <Linkedin className="w-2.5 h-2.5 print-only-hide" aria-hidden="true" />
              linkedin.com/in/jessenreinhart
            </a>
            <a
              href="https://jessenreinhart.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
            >
              <Globe className="w-2.5 h-2.5 print-only-hide" aria-hidden="true" />
              jessenreinhart.github.io
            </a>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-2.5 h-2.5 print-only-hide" aria-hidden="true" />
              Jakarta Raya, Indonesia
            </span>
          </div>
        </div>

        {/* ── Professional Summary ── */}
        <div className="resume-section mb-3">
          <h3 className="text-[8pt] font-mono tracking-[0.12em] font-bold text-neutral-600 uppercase pb-px mb-1 select-none">
            Professional summary
          </h3>
          <p className="text-neutral-800 text-[8.5pt] leading-snug">
            Software engineer with 7+ years across banking, e-commerce, and CMS platforms. Built
            customer-facing platforms at Wide Technologies (digital banking for 20+ financial
            institutions, 30M+ users) and SIRCLO (2M monthly orders, dashboards for 100k+ stores).
            Currently building a Card Management System at LG Sinarmas.
          </p>
        </div>

        {/* ── Work Experience ── */}
        <div className="resume-section mb-3">
          <h3 className="text-[8pt] font-mono tracking-[0.12em] font-bold text-neutral-600 uppercase pb-px mb-1 select-none">
            Work experience
          </h3>

          <div className="space-y-1">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="resume-job">
                <div className="flex flex-row items-baseline justify-between gap-2">
                  <div className="min-w-0 flex items-baseline gap-1.5 flex-wrap">
                    <h4 className="text-[9pt] font-bold text-neutral-900 leading-tight">
                      {exp.role}
                    </h4>
                    <span className="text-[7.5pt] font-mono font-semibold text-neutral-700 tracking-wide">
                      {exp.company}
                    </span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[7.5pt] font-mono text-neutral-600 block whitespace-nowrap">
                      {exp.period} · {exp.location}
                    </span>
                  </div>
                </div>

                {/* Narrative is screen-only; print keeps bullets for 1-page ATS density */}
                {exp.narrative && (
                  <p className="print-only-hide text-[8pt] leading-snug text-neutral-700 mt-0.5 mb-0.5">
                    {exp.narrative}
                  </p>
                )}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="pl-3 list-disc text-neutral-800">
                    {exp.highlights.map((item, idx) => (
                      <li key={idx} className="text-[8pt] leading-snug py-px">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="font-mono text-[7pt] text-neutral-600 mt-0.5">
                  <span className="font-semibold text-neutral-700 select-none">Stack: </span>
                  {exp.technologies.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Side Projects ── */}
        <div className="resume-section mb-3">
          <h3 className="text-[8pt] font-mono tracking-[0.12em] font-bold text-neutral-600 uppercase pb-px mb-1 select-none">
            Side projects
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <h4 className="text-[8.5pt] font-bold text-neutral-900">Invoicr</h4>
              <p className="text-[7.5pt] text-neutral-700 leading-snug">
                Invoice &amp; time tracker with hourly billing, PDF export, dark/light themes.
              </p>
              <div className="text-[7pt] font-mono text-neutral-600">
                React, TypeScript, Vite, TailwindCSS
              </div>
            </div>

            <div>
              <h4 className="text-[8.5pt] font-bold text-neutral-900">Wedding E-Invitation</h4>
              <p className="text-[7.5pt] text-neutral-700 leading-snug">
                RSVP invitation portal with timelines, maps, guestbook (200+ guests).
              </p>
              <div className="text-[7pt] font-mono text-neutral-600">
                React, TailwindCSS, Maps API
              </div>
            </div>

            <div>
              <h4 className="text-[8.5pt] font-bold text-neutral-900">TripCore</h4>
              <p className="text-[7.5pt] text-neutral-700 leading-snug">
                Firebase trip planner: shared itineraries, budget split, guest invites.
              </p>
              <div className="text-[7pt] font-mono text-neutral-600">
                ReactJS, TypeScript, Vite, Firebase
              </div>
            </div>

            <div>
              <h4 className="text-[8.5pt] font-bold text-neutral-900">SoulSync</h4>
              <p className="text-[7.5pt] text-neutral-700 leading-snug">
                Offline diary with mood tracking, milestones, Recharts progress.
              </p>
              <div className="text-[7pt] font-mono text-neutral-600">
                React, TailwindCSS, Local Storage, Recharts
              </div>
            </div>
          </div>
        </div>

        {/* ── Education ── */}
        <div className="resume-section mb-3">
          <h3 className="text-[8pt] font-mono tracking-[0.12em] font-bold text-neutral-600 uppercase pb-px mb-1 select-none">
            Education
          </h3>
          <div className="flex justify-between items-baseline gap-2 flex-wrap">
            <div>
              <span className="text-[9pt] font-bold text-neutral-900">
                Bachelor&apos;s Degree in Informatics Engineering
              </span>
              <span className="text-[8pt] text-neutral-700 ml-2">Universitas Gunadarma</span>
            </div>
            <span className="text-[8pt] font-mono text-neutral-600">2014 — 2018</span>
          </div>
        </div>

        {/* ── Skills ── */}
        <div className="resume-section mb-0">
          <h3 className="text-[8pt] font-mono tracking-[0.12em] font-bold text-neutral-600 uppercase pb-px mb-1 select-none">
            Core technical skills
          </h3>
          <p className="text-[8pt] text-neutral-800 leading-snug">
            <strong className="font-mono text-neutral-900 tracking-wider">Frontend:</strong>{" "}
            ReactJS, Next.js, TypeScript, TailwindCSS, HTML5, CSS3, JavaScript (ES6+), Vite.{" "}
            <strong className="font-mono text-neutral-900 tracking-wider">Backend &amp; DB:</strong>{" "}
            Java, Spring Boot, PostgreSQL, Thymeleaf.{" "}
            <strong className="font-mono text-neutral-900 tracking-wider">Specialties:</strong>{" "}
            Performance Optimization, SSR, CMS Development, Banking Architecture, i18n, Reusable
            Component Libraries.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
