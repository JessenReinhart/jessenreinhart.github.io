import { useMemo, type CSSProperties, type ElementType } from "react";
import { motion, useReducedMotion } from "motion/react";

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: CSSProperties;
  as?: "p" | "span" | "h1" | "h2";
}

export default function BlurText({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
  as: Tag = "p",
}: BlurTextProps) {
  const reduceMotion = useReducedMotion();
  const segments = useMemo(
    () => (animateBy === "words" ? text.split(" ") : text.split("")),
    [text, animateBy]
  );

  const yFrom = direction === "top" ? -20 : 20;
  const Component = Tag as ElementType;

  return (
    <Component className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <motion.span
          key={`${segment}-${i}`}
          initial={
            reduceMotion
              ? false
              : { filter: "blur(10px)", opacity: 0, y: yFrom }
          }
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.5, ease: "easeOut", delay: (i * delay) / 1000 }
          }
          style={{ display: "inline-block" }}
        >
          {segment === " " ? "\u00A0" : segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Component>
  );
}
