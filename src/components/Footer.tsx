import { ArrowUp } from "lucide-react";

interface FooterProps {
  onScrollToTop: () => void;
}

export default function Footer({ onScrollToTop }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] border-t border-white/5 py-12 px-6 md:px-12 relative z-10 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side branding */}
        <div className="text-center md:text-left">
          <span className="block font-display font-black text-sm tracking-widest text-white">
            JESSEN
          </span>
          <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mt-0.5">
            Senior Frontend Engineer // © {currentYear} ALL RIGHTS RESERVED
          </span>
        </div>

        {/* Center Credits */}
        <div className="text-center">
          <span className="text-[10px] font-mono text-zinc-600 block uppercase tracking-widest">
            BUILT WITH
          </span>
          <span className="text-[11px] font-mono text-zinc-300 block uppercase tracking-widest mt-0.5">
            Next.js + TypeScript + Tailwind CSS
          </span>
        </div>

        {/* Right Side scroll back trigger */}
        <button
          onClick={onScrollToTop}
          className="w-10 h-10 rounded-full border border-white/8 hover:border-white text-zinc-500 hover:text-white transition-all flex items-center justify-center cursor-pointer"
          data-cursor="button"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}
