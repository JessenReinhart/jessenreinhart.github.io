import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { gsap } from "gsap";

import "./AccordionGallery.css";

export interface AccordionGalleryItem {
  image: string;
  label?: string;
  link?: string;
  alt?: string;
}

interface AccordionGalleryProps {
  items: AccordionGalleryItem[];
  defaultIndex?: number;
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  grayscale?: boolean;
  showLabels?: boolean;
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  stagger?: number;
  trigger?: "hover" | "click";
  height?: number;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
  onSelect?: (index: number, item: AccordionGalleryItem) => void;
}

const AccordionGallery = ({
  items,
  defaultIndex = 0,
  accentColor = "#ffffff",
  overlayColor = "#060010",
  textColor = "#ffffff",
  grayscale = true,
  showLabels = true,
  duration = 0.6,
  ease = "power3.out",
  parallax = 0.5,
  tilt = 8,
  stagger = 0.06,
  trigger = "hover",
  height = 460,
  gap = 10,
  radius = 16,
  expandRatio = 0.52,
  orientation = "horizontal",
  className = "",
  onSelect,
}: AccordionGalleryProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);
  const mediaRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const barRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const textRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(320);

  const vertical = orientation === "vertical";
  const count = items.length;
  const [active, setActive] = useState(
    Math.min(Math.max(defaultIndex, 0), Math.max(count - 1, 0)),
  );
  const [hovered, setHovered] = useState<number | null>(null);

  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const applyLayout = useCallback(
    (animate: boolean) => {
      const panels = panelRefs.current;
      if (!panels.length || count === 0) return;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
      const mediaSize = mediaSizeRef.current;

      tlRef.current?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const tl = gsap.timeline();

      panels.forEach((panel, index) => {
        if (!panel) return;

        const isActive = index === active;
        const media = mediaRefs.current[index];
        const bar = barRefs.current[index];
        const text = textRefs.current[index];

        const rot = isActive ? 0 : index < active ? tilt : -tilt;
        const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot };

        tl.to(
          panel,
          {
            flexGrow: isActive ? grow : 1,
            ...rotProp,
            duration: dur,
            ease,
          },
          0,
        );

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - index));
          const shift = drift * parallax * mediaSize * 0.06;
          const gray = grayscale ? (isActive ? 0 : 1) : 0;

          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : isActive ? 0 : shift,
              y: vertical ? (isActive ? 0 : shift) : 0,
              "--ag-gray": gray,
              "--ag-dim": isActive ? 0 : 0.42,
              duration: dur,
              ease,
            },
            0,
          );
        }

        if (showLabels && bar && text) {
          if (isActive) {
            tl.to(
              [bar, text],
              {
                opacity: 1,
                x: 0,
                duration: dur,
                ease,
                stagger: prefersReduced ? 0 : stagger,
              },
              0,
            );
          } else {
            tl.to(
              [bar, text],
              {
                opacity: 0,
                x: -14,
                duration: dur * 0.6,
                ease,
              },
              0,
            );
          }
        }
      });

      tlRef.current = tl;
    },
    [
      active,
      count,
      expandRatio,
      duration,
      ease,
      vertical,
      tilt,
      parallax,
      grayscale,
      showLabels,
      stagger,
      prefersReduced,
    ],
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size =
        Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22);

      mediaSizeRef.current = size;
      el.style.setProperty("--ag-media-size", size + "px");
      applyLayout(!firstRunRef.current);
    };

    measure();
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measure)
        : null;

    ro?.observe(el);
    return () => ro?.disconnect();
  }, [applyLayout, gap, count, expandRatio, vertical]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(
    () => () => {
      tlRef.current?.kill();
    },
    [],
  );

  const activate = (index: number) => {
    setActive(index);
    onSelect?.(index, items[index]);
  };

  const handleEnter = (index: number) => {
    if (trigger === "hover") setActive(index);
  };

  const handleClick = (index: number, event: MouseEvent<HTMLElement>) => {
    if (index !== active && event.currentTarget instanceof HTMLAnchorElement) {
      event.preventDefault();
    }
    activate(index);
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      activate((index + 1) % count);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      activate((index - 1 + count) % count);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activate(index);
    }
  };

  if (count === 0) return null;

  const rootStyle = {
    "--ag-accent": accentColor,
    "--ag-overlay": overlayColor,
    "--ag-text": textColor,
    "--ag-gap": gap + "px",
    "--ag-radius": radius + "px",
    height: vertical ? Math.round(height * 1.6) + "px" : height + "px",
  } as CSSProperties;

  return (
    <div
      ref={rootRef}
      className={
        "accordion-gallery" +
        (vertical ? " accordion-gallery--vertical" : "") +
        (className ? " " + className : "")
      }
      style={rootStyle}
      role="list"
      aria-label="Project gallery"
    >
      {items.map((item, index) => {
        const isActive = index === active;
        const Tag = item.link ? "a" : "div";

        return (
          <Tag
            key={item.label ?? index}
            ref={(element) => {
              panelRefs.current[index] = element;
            }}
            className={
              "ag-panel" +
              (isActive ? " ag-panel--active" : "") +
              (hovered === index ? " ag-panel--hovered" : "")
            }
            style={{ borderRadius: radius + "px" }}
            href={item.link || undefined}
            onClick={(event) => handleClick(index, event)}
            onMouseEnter={() => {
              setHovered(index);
              handleEnter(index);
            }}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => activate(index)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? "true" : undefined}
            aria-label={item.label}
          >
            <span className="ag-panel__frame">
              <span
                className="ag-panel__media"
                ref={(element) => {
                  mediaRefs.current[index] = element;
                }}
              >
                <img
                  src={item.image}
                  alt={item.alt ?? item.label ?? ""}
                  draggable={false}
                />
              </span>
              <span className="ag-panel__overlay" aria-hidden="true" />
            </span>

            {showLabels && (
              <>
                <span className="ag-panel__label" aria-hidden="true">
                  <span
                    className="ag-panel__bar"
                    ref={(element) => {
                      barRefs.current[index] = element;
                    }}
                  />
                  <span
                    className="ag-panel__text"
                    ref={(element) => {
                      textRefs.current[index] = element;
                    }}
                  >
                    {item.label}
                  </span>
                </span>
                <span className="ag-panel__hover-label" aria-hidden="true">
                  {item.label}
                </span>
              </>
            )}
          </Tag>
        );
      })}
    </div>
  );
};

export default AccordionGallery;
