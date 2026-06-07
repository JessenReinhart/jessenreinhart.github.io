import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hoveredEl, setHoveredEl] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 30, stiffness: 250, mass: 0.8 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverType = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (hoverType) {
        setHoveredEl(hoverType);
      } else {
        setHoveredEl(null);
      }
    };

    const handleHoverEnd = () => {
      setHoveredEl(null);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    
    // Listen for hover over elements with data-cursor attribute
    document.addEventListener("mouseover", handleHoverStart);
    document.addEventListener("mouseout", handleHoverEnd);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleHoverStart);
      document.removeEventListener("mouseout", handleHoverEnd);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!mounted || !isVisible) return null;

  const isProject = hoveredEl === "project";
  const isButton = hoveredEl === "button";
  const isContact = hoveredEl === "contact";

  return (
    <>
      {/* Outer Springing Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/40 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isProject ? 84 : isButton ? 48 : isContact ? 64 : 24,
          height: isProject ? 84 : isButton ? 48 : isContact ? 64 : 24,
          backgroundColor: isProject ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0)",
          borderColor: isProject ? "rgba(255, 255, 255, 1)" : isButton ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        {isProject && (
          <div className="w-full h-full flex items-center justify-center text-[10px] font-mono font-bold text-black tracking-widest uppercase">
            VIEW
          </div>
        )}
        {isContact && (
          <div className="w-full h-full flex items-center justify-center text-[10px] font-mono font-bold text-white tracking-widest uppercase">
            SAY HI
          </div>
        )}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isProject || isButton || isContact ? 0 : 1,
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}
