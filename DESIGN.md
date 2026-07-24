# Design System: Mirror's Edge Portfolio

## Overview

Bright runner UI: off-white city planes, near-black ink, single Faith red accent. Sharp geometry (0–4px radii). Condensed display type for speed. Motion is directional (slide/skew), not bounce or glass float.

## Colors

| Token | Light (primary) | Dark (night-run) | Role |
|---|---|---|---|
| bg-primary | `#F4F4F2` | `#0C0E10` | Page field |
| bg-secondary | `#FFFFFF` | `#14171A` | Elevated plane |
| bg-surface | `#EBEBE8` | `#1A1E22` | Nested surface |
| bg-card | `#FFFFFF` | `#12151A` | Cards |
| text-primary | `#0A0A0A` | `#F2F2F0` | Ink |
| text-secondary | `#3A3A3A` | `#C4C4C0` | Body |
| text-muted | `#5C5C5C` | `#8A8A86` | Meta |
| text-dim | `#8A8A86` | `#5C5C5C` | Ghost type |
| accent | `#E10600` | `#FF3B1F` | Faith red — interactive only |
| accent-invert | `#FFFFFF` | `#0A0A0A` | On-accent |
| border-primary | `rgba(10,10,10,0.1)` | `rgba(255,255,255,0.1)` | Hairlines |
| marquee-bg | `#E10600` | `#E10600` | Speed strip |
| marquee-text | `#FFFFFF` | `#FFFFFF` | On-strip |

## Typography

- **Display**: `Barlow Condensed` 600–800, tight tracking, uppercase sparingly
- **Body**: `Sora` 300–600
- **Mono**: `JetBrains Mono` for labels and tech chips
- Hero display max ~clamp to 6rem for readable H1; giant watermark may go larger as decorative aria-hidden type

## Shape

- Cards / panels: `0` (pillar cut)
- Buttons: `2px` or `4px` max — never full pill as default
- Badges: `2px`

## Motion

- Ease: `cubic-bezier(0.16, 1, 0.3, 1)`
- Hero: slide-up + slight skew-X on enter
- Sections: whileInView y:24 → 0, opacity
- Hover: translateY(-2px) or translateX(4px), accent border
- Reduced motion: opacity only / instant

## Components

- Navbar: sticky, hairline bottom, accent active bar
- Buttons primary: solid accent + white text
- Buttons secondary: ink outline, hover accent border
- Cards: sharp, 1px border, no glass blur default
- Marquee: one red speed strip under hero only
