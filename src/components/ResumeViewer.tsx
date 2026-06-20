import { X, Printer, Download, Mail, Linkedin, Globe, MapPin, Award } from "lucide-react";
import { motion } from "motion/react";
import { EXPERIENCES, PORTRAIT_IMAGE } from "../data";

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
      className="fixed inset-0 z-[100] bg-black overflow-y-auto px-4 py-8 md:p-12 print:static print:bg-white print:overflow-visible print:p-0 print-resume"
    >
      {/* Visual Controls Header (Omitted during print) */}
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-white/10 pb-4 mb-8 print:hidden select-none">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-white" />
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
            JESSEN — PROFESSIONAL RESUME
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 border border-white/8 hover:border-white hover:bg-white hover:text-black font-semibold text-xs font-mono tracking-wider text-zinc-300 rounded-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            PRINT RESUME
          </button>
          
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-900 border border-white/5 hover:border-white text-white rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span className="text-xs font-mono font-bold">CLOSE</span>
          </button>
        </div>
      </div>

      {/* Styled Resume Sheet Card */}
      <div className="max-w-4xl mx-auto bg-white text-black p-6 sm:p-8 md:p-14 rounded-2xl print:rounded-none print:shadow-none print:p-0 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] text-left font-sans leading-relaxed">
        {/* Top Header Group */}
        <div className="border-b-2 border-black pb-8 mb-8 flex flex-row items-start justify-between gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-display font-black tracking-tight text-neutral-900 leading-none">
              Muhammad Jessen Reinhart Sugiarto
            </h1>
            <h2 className="text-sm sm:text-base md:text-xl font-medium text-neutral-600 mt-2 font-display">
              Senior Frontend Engineer
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-neutral-500 mt-4 leading-none select-all">
              <span className="flex items-center gap-1.5 break-all">
                <Mail className="w-3.5 h-3.5" /> jessenreinharts@gmail.com
              </span>
              <span className="flex items-center gap-1.5 cursor-pointer">
                <Linkedin className="w-3.5 h-3.5" /> linkedin.com/in/jessenreinhart
              </span>
              <span className="flex items-center gap-1.5 cursor-pointer">
                <Globe className="w-3.5 h-3.5" /> jessenreinhart.github.io/
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Jakarta Raya, Indonesia
              </span>
            </div>
          </div>
        </div>

        {/* Section 1 - Professional Summary */}
        <div className="mb-8">
          <h3 className="text-xs font-mono tracking-[0.2em] font-bold text-neutral-500 uppercase border-b border-neutral-200 pb-1 mb-4 select-none">
            PROFESSIONAL SUMMARY
          </h3>
          <p className="text-neutral-700 font-light text-[14px] leading-relaxed">
            Software engineer with seven years of experience across banking, ecommerce, and CMS platforms. Contributed to customer-facing platforms at Wide Technologies (digital banking for 20+ financial institutions, 30M+ portal users) and SIRCLO (2M monthly orders processed, dashboards for 100k+ online stores). Currently building a Card Management System at LG Sinarmas and seeking a senior frontend or full-stack role.
          </p>
        </div>

        {/* Section 2 - Work Experience */}
        <div className="mb-8">
          <h3 className="text-xs font-mono tracking-[0.2em] font-bold text-neutral-500 uppercase border-b border-neutral-200 pb-1 mb-6 select-none">
            WORK EXPERIENCE
          </h3>
          
          <div className="space-y-8">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="group">
                <div className="flex flex-row items-baseline justify-between gap-2 mb-3">
                  <div className="min-w-0">
                    <h4 className="text-sm sm:text-base md:text-lg font-bold text-neutral-900 leading-tight">
                      {exp.role}
                    </h4>
                    <span className="text-[10px] sm:text-xs font-mono font-semibold text-neutral-600 uppercase tracking-wide">
                      {exp.company}
                    </span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[10px] sm:text-xs font-mono text-neutral-500 block whitespace-nowrap">
                      {exp.period}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono text-neutral-400 block uppercase font-medium whitespace-nowrap">
                      {exp.location}
                    </span>
                  </div>
                </div>

                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-1.5 mb-4 pl-4 list-disc text-neutral-700">
                    {exp.highlights.map((item, idx) => (
                      <li key={idx} className="text-[13px] font-light leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-1 sm:gap-1.5 font-mono text-[9px] sm:text-[10px] text-neutral-500 mt-2">
                  <span className="font-semibold text-neutral-400 select-none">STACK:</span>
                  {exp.technologies.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3 - Side Projects */}
        <div className="mb-8">
          <h3 className="text-xs font-mono tracking-[0.2em] font-bold text-neutral-500 uppercase border-b border-neutral-200 pb-1 mb-5 select-none">
            SIDE PROJECTS
          </h3>
          
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900">Invoicr</h4>
              <p className="text-[11px] sm:text-xs text-neutral-600 mt-1 font-light leading-relaxed">
                Invoice Generator &amp; Time Tracker app with custom time log (manual &amp; automated), hourly rate billing, direct layout PDF export, local data persistence, and sync dark/light settings.
              </p>
              <div className="text-[9px] sm:text-[10px] font-mono text-neutral-500 mt-2 select-none">
                React, TypeScript, Vite, TailwindCSS
              </div>
            </div>

            <div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900">Wedding E-Invitation</h4>
              <p className="text-[11px] sm:text-xs text-neutral-600 mt-1 font-light leading-relaxed">
                Digital Wedding Invitation Portal featuring functional RSVP database grids, event schedule timelines, leaflet geography interactive maps, and digital guestbook entries. Serving over 200+ guests.
              </p>
              <div className="text-[9px] sm:text-[10px] font-mono text-neutral-500 mt-2 select-none">
                React, TailwindCSS, Maps API
              </div>
            </div>

            <div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900">TripCore</h4>
              <p className="text-[11px] sm:text-xs text-neutral-600 mt-1 font-light leading-relaxed">
                A Firebase-powered trip planning app with real-time collaborative itineraries, budget splitting, and guest invitation sharing.
              </p>
              <div className="text-[9px] sm:text-[10px] font-mono text-neutral-500 mt-2 select-none">
                ReactJS, TypeScript, Vite, Firebase
              </div>
            </div>

            <div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900">SoulSync</h4>
              <p className="text-[11px] sm:text-xs text-neutral-600 mt-1 font-light leading-relaxed">
                An offline personal log and goal tracker with daily diary entries, mood ratings, milestone tracking, and Recharts progress graphs. Data stored locally in the browser.
              </p>
              <div className="text-[9px] sm:text-[10px] font-mono text-neutral-500 mt-2 select-none">
                React, TailwindCSS, Local Storage, Recharts
              </div>
            </div>
          </div>
        </div>

        {/* Section 4 - Education */}
        <div className="mb-8">
          <h3 className="text-xs font-mono tracking-[0.2em] font-bold text-neutral-500 uppercase border-b border-neutral-200 pb-1 mb-4 select-none">
            EDUCATION
          </h3>
          <div className="flex justify-between items-baseline">
            <div>
              <h4 className="text-[15px] font-bold text-neutral-900">
                Bachelor's Degree in Informatics Engineering
              </h4>
              <span className="text-xs text-neutral-600">Universitas Gunadarma</span>
            </div>
            <span className="text-xs font-mono text-neutral-500">2014 - 2018</span>
          </div>
        </div>

        {/* Section 5 - Skills */}
        <div>
          <h3 className="text-xs font-mono tracking-[0.2em] font-bold text-neutral-500 uppercase border-b border-neutral-200 pb-1 mb-4 select-none">
            CORE TECHNICAL SKILLS
          </h3>
          <div className="space-y-2.5 text-xs text-neutral-700 font-light">
            <div>
              <strong className="font-mono text-neutral-800 tracking-wider">FRONTEND:</strong> ReactJS, Next.js, TypeScript, TailwindCSS, HTML5, CSS3, JavaScript (ES6+), Vite.
            </div>
            <div>
              <strong className="font-mono text-neutral-800 tracking-wider">BACKEND &amp; DB:</strong> Java, Spring Boot, PostgreSQL, Thymeleaf.
            </div>
            <div>
              <strong className="font-mono text-neutral-800 tracking-wider">SPECIALTIES:</strong> Performance Optimization, Server-Side Rendering, CMS Development, Banking Architecture, i18n, Reusable Component Libraries.
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
