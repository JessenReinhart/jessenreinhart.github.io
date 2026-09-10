import { useState } from "react";
import { AnimatePresence } from "motion/react";
import EditorialPortfolioV2 from "./components/EditorialPortfolioV2";
import ResumeViewer from "./components/ResumeViewer";

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundColor: "var(--color-bg-primary)",
        color: "var(--color-text-primary)",
      }}
    >
      <div className="no-print">
        <EditorialPortfolioV2 onViewResume={() => setResumeOpen(true)} />
      </div>

      <AnimatePresence>
        {resumeOpen && <ResumeViewer onClose={() => setResumeOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
