import { X, Printer, Mail, Linkedin, Globe, MapPin, Award } from "lucide-react";
import { motion } from "motion/react";
import { EXPERIENCES } from "../data";

interface ResumeViewerProps {
  onClose: () => void;
}

export default function ResumeViewer({ onClose }: ResumeViewerProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] overflow-y-auto px-4 py-8 md:p-12 bg-[var(--color-bg-primary)] print:static print:bg-white print:overflow-visible print:p-0 print-resume"
    >
      {/* Visual Controls Header (Omitted during print) */}
      <div
        className="print-resume-chrome max-w-4xl mx-auto flex items-center justify-between pb-4 mb-8 select-none"
        style={{ borderBottom: "1px solid var(--color-border-primary)" }}
      >
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5" style={{ color: "var(--color-accent)" }} />
          <span
            className="text-xs font-mono uppercase tracking-widest"
            style={{ color: "var(--color-text-muted)" }}
          >
            JESSEN — PROFESSIONAL RESUME
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="me-btn-ghost px-4 py-2 font-semibold text-xs font-mono tracking-wider flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            PRINT RESUME
          </button>

          <button
            onClick={onClose}
            className="me-btn-ghost px-4 py-2 flex items-center gap-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span className="text-xs font-mono font-bold">CLOSE</span>
          </button>
        </div>
      </div>

      {/* Resume Sheet — base text-[9.5pt] for print, compact spacing */}
      <div className="max-w-4xl mx-auto bg-white text-black p-6 sm:p-8 md:p-14 shadow-[0_24px_48px_-20px_var(--color-shadow)] print:shadow-none print:p-0 text-left font-sans leading-tight text-[9.5pt]">

        {/* ── Header ── */}
        <div className="border-b border-black pb-1.5 mb-2">
          <h1 className="text-lg sm:text-xl font-display font-black tracking-tight text-neutral-900 leading-tight print:text-[15pt]">
            Jessen Reinhart
          </h1>
          <h2 className="text-[10pt] font-medium text-neutral-600 font-display">
            Senior Frontend Engineer
          </h2>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[7.5pt] font-mono text-neutral-500 mt-1 leading-none select-all">
            <span className="flex items-center gap-1">
              <Mail className="w-2.5 h-2.5" /> jessenreinharts@gmail.com
            </span>
            <span className="flex items-center gap-1">
              <Linkedin className="w-2.5 h-2.5" /> linkedin.com/in/jessenreinhart
            </span>
            <span className="flex items-center gap-1">
              <Globe className="w-2.5 h-2.5" /> jessenreinhart.github.io
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-2.5 h-2.5" /> Jakarta Raya, Indonesia
            </span>
          </div>
        </div>

        {/* ── Professional Summary ── */}
        <div className="mb-3 print:mb-3">
          <h3 className="text-[8pt] font-mono tracking-[0.12em] font-bold text-neutral-500 uppercase pb-px mb-1 select-none">
            PROFESSIONAL SUMMARY
          </h3>
          <p className="text-neutral-700 text-[8.5pt] leading-snug">
            Software engineer with 7+ years across banking, e-commerce, and CMS platforms. Built customer-facing platforms at Wide Technologies (digital banking for 20+ financial institutions, 30M+ users) and SIRCLO (2M monthly orders, dashboards for 100k+ stores). Currently building a Card Management System at LG Sinarmas.
          </p>
        </div>

        {/* ── Work Experience ── */}
        <div className="mb-3 print:mb-3">
          <h3 className="text-[8pt] font-mono tracking-[0.12em] font-bold text-neutral-500 uppercase pb-px mb-1 select-none">
            WORK EXPERIENCE
          </h3>

          <div className="space-y-1">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-row items-baseline justify-between gap-2">
                  <div className="min-w-0 flex items-baseline gap-1.5">
                    <h4 className="text-[9pt] font-bold text-neutral-900 leading-tight">
                      {exp.role}
                    </h4>
                    <span className="text-[7.5pt] font-mono font-semibold text-neutral-600 tracking-wide">
                      {exp.company}
                    </span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[7.5pt] font-mono text-neutral-500 block whitespace-nowrap">
                      {exp.period} · {exp.location}
                    </span>
                  </div>
                </div>

                {exp.narrative && (
                  <p className="text-[8pt] leading-snug text-neutral-600 mt-0.5 mb-0.5">
                    {exp.narrative}
                  </p>
                )}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="pl-3 list-disc text-neutral-700">
                    {exp.highlights.map((item, idx) => (
                      <li key={idx} className="text-[8pt] leading-snug py-px">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="font-mono text-[7pt] text-neutral-500 mt-0.5">
                  <span className="font-semibold text-neutral-400 select-none">Stack: </span>
                  {exp.technologies.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Side Projects ── */}
        <div className="mb-3 print:mb-3">
          <h3 className="text-[8pt] font-mono tracking-[0.12em] font-bold text-neutral-500 uppercase pb-px mb-1 select-none">
            SIDE PROJECTS
          </h3>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <div>
              <h4 className="text-[8.5pt] font-bold text-neutral-900">Invoicr</h4>
              <p className="text-[7.5pt] text-neutral-600 leading-snug">
                Invoice &amp; time tracker with hourly billing, PDF export, dark/light themes.
              </p>
              <div className="text-[7pt] font-mono text-neutral-500">
                React, TypeScript, Vite, TailwindCSS
              </div>
            </div>

            <div>
              <h4 className="text-[8.5pt] font-bold text-neutral-900">Wedding E-Invitation</h4>
              <p className="text-[7.5pt] text-neutral-600 leading-snug">
                RSVP invitation portal with timelines, maps, guestbook (200+ guests).
              </p>
              <div className="text-[7pt] font-mono text-neutral-500">
                React, TailwindCSS, Maps API
              </div>
            </div>

            <div>
              <h4 className="text-[8.5pt] font-bold text-neutral-900">TripCore</h4>
              <p className="text-[7.5pt] text-neutral-600 leading-snug">
                Firebase trip planner: shared itineraries, budget split, guest invites.
              </p>
              <div className="text-[7pt] font-mono text-neutral-500">
                ReactJS, TypeScript, Vite, Firebase
              </div>
            </div>

            <div>
              <h4 className="text-[8.5pt] font-bold text-neutral-900">SoulSync</h4>
              <p className="text-[7.5pt] text-neutral-600 leading-snug">
                Offline diary with mood tracking, milestones, Recharts progress.
              </p>
              <div className="text-[7pt] font-mono text-neutral-500">
                React, TailwindCSS, Local Storage, Recharts
              </div>
            </div>
          </div>
        </div>

        {/* ── Education ── */}
        <div className="mb-3 print:mb-3">
          <h3 className="text-[8pt] font-mono tracking-[0.12em] font-bold text-neutral-500 uppercase pb-px mb-1 select-none">
            EDUCATION
          </h3>
          <div className="flex justify-between items-baseline">
            <div>
              <span className="text-[9pt] font-bold text-neutral-900">
                Bachelor's Degree in Informatics Engineering
              </span>
              <span className="text-[8pt] text-neutral-600 ml-2">Universitas Gunadarma</span>
            </div>
            <span className="text-[8pt] font-mono text-neutral-500">2014 — 2018</span>
          </div>
        </div>

        {/* ── Skills ── */}
        <div className="mb-3 print:mb-3">
          <h3 className="text-[8pt] font-mono tracking-[0.12em] font-bold text-neutral-500 uppercase pb-px mb-1 select-none">
            CORE TECHNICAL SKILLS
          </h3>
          <p className="text-[8pt] text-neutral-700 leading-snug">
            <strong className="font-mono text-neutral-800 tracking-wider">Frontend:</strong>{" "}
            ReactJS, Next.js, TypeScript, TailwindCSS, HTML5, CSS3, JavaScript (ES6+), Vite.{" "}
            <strong className="font-mono text-neutral-800 tracking-wider">Backend &amp; DB:</strong>{" "}
            Java, Spring Boot, PostgreSQL, Thymeleaf.{" "}
            <strong className="font-mono text-neutral-800 tracking-wider">Specialties:</strong>{" "}
            Performance Optimization, SSR, CMS Development, Banking Architecture, i18n, Reusable Component Libraries.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
