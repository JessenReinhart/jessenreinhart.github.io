import { useState } from "react";
import { AnimatePresence } from "motion/react";
import EditorialPortfolio from "./components/EditorialPortfolio";
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
        <EditorialPortfolio onViewResume={() => setResumeOpen(true)} />
      </div>

      <AnimatePresence>
        {resumeOpen && <ResumeViewer onClose={() => setResumeOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
