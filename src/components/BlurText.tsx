import { useEffect, useMemo, useRef, useState, type CSSProperties, type ElementType, type Ref } from "react";

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
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const segments = useMemo(
    () => (animateBy === "words" ? text.split(" ") : text.split("")),
    [text, animateBy]
  );

  const Component = Tag as ElementType;

  return (
    <Component
      ref={ref as Ref<HTMLElement>}
      className={`inline-flex flex-wrap ${className}`}
      style={style}
    >
      {segments.map((segment, i) => (
        <span
          key={`${segment}-${i}`}
          style={{
            display: "inline-block",
            filter: inView || reduceMotion ? "blur(0px)" : "blur(10px)",
            opacity: inView || reduceMotion ? 1 : 0,
            transform:
              inView || reduceMotion
                ? "translateY(0)"
                : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: reduceMotion
              ? undefined
              : `filter 0.5s ease-out ${i * delay}ms, opacity 0.5s ease-out ${i * delay}ms, transform 0.5s ease-out ${i * delay}ms`,
            willChange: reduceMotion ? undefined : "filter, opacity, transform",
          }}
        >
          {segment === " " ? "\u00A0" : segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Component>
  );
}
