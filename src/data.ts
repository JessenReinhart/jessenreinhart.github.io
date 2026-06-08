import { Experience, Project, SkillCategory, StatItem } from "./types";
import portraitImg from "./assets/images/jessen-portrait-removed-bg.png";
import tc00 from "./assets/images/tripcore-images/split_0_0.png";
import tc01 from "./assets/images/tripcore-images/split_0_1.png";
import tc10 from "./assets/images/tripcore-images/split_1_0.png";
import tc11 from "./assets/images/tripcore-images/split_1_1.png";
import tc20 from "./assets/images/tripcore-images/split_2_0.png";
import tc21 from "./assets/images/tripcore-images/split_2_1.png";
import ss00 from "./assets/images/soulync-images/split_0_0.png";
import ss01 from "./assets/images/soulync-images/split_0_1.png";
import ss10 from "./assets/images/soulync-images/split_1_0.png";

export const PORTRAIT_IMAGE = portraitImg;
export const TRIPCORE_IMAGES = [tc00, tc01, tc10, tc11, tc20, tc21];
export const SOULSYNC_IMAGES = [ss00, ss01, ss10];

export const STATS: StatItem[] = [
  { value: "7", label: "Years Experience", numericVal: 7 },
  { value: "20", label: "Financial Institutions", numericVal: 20 },
  { value: "30M", label: "Portal Users", numericVal: 30000000 },
  { value: "100k", label: "Retail Merchants", numericVal: 100000 },
  { value: "2M", label: "Monthly Orders", numericVal: 2000000 }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-pgi",
    role: "Software Engineer",
    company: "LG Sinarmas — via PGI Data",
    period: "Nov 2025 - Present",
    location: "Jakarta Raya, Indonesia",
    technologies: ["Java", "Spring Boot", "Thymeleaf", "PostgreSQL"],
    highlights: [
      "Developing a Card Management System — an enterprise web application for credit and debit card lifecycle operations.",
      "Building backend features in Spring Boot and integrating them with Thymeleaf templates for the frontend layer.",
      "Working across the full stack on card issuance, activation, and reporting workflows."
    ]
  },
  {
    id: "exp-wide",
    role: "Frontend Engineer",
    company: "PT Wide Technologies Indonesia",
    period: "Sep 2023 - Nov 2025",
    location: "Jakarta Raya, Indonesia",
    technologies: ["ReactJS", "TypeScript", "i18n", "Banking Architecture"],
    highlights: [
      "Built interface modules for an enterprise digital banking platform routing transactions for 20 financial institutions in Southeast Asia.",
      "Designed white-label template adapters in React to allow customized styling and themes for corporate tenant networks.",
      "Implemented i18n localization schemas to serve multi-language dashboards to regional target users.",
      "Engineered reusable interface widgets on the R&D team to modularize frontend logic."
    ]
  },
  {
    id: "exp-inspigo",
    role: "Frontend Engineer",
    company: "Inspigo.id",
    period: "Dec 2022 - Sep 2023",
    location: "Remote / Hybrid",
    technologies: ["Next.js", "Web Audio API", "CMS Development"],
    highlights: [
      "Built a Next.js content management system for non-technical teams to update production assets directly.",
      "Prototyped a web-audio conferencing utility in Javascript to support voice communication in modern browsers."
    ]
  },
  {
    id: "exp-sirclo",
    role: "Frontend Engineer",
    company: "SIRCLO",
    period: "Nov 2019 - Nov 2022",
    location: "BSD, South Tangerang",
    technologies: ["ReactJS", "Next.js", "TailwindCSS", "Performance Optimization"],
    highlights: [
      "Built a custom React dashboard for 100,000 retail merchants to configure layouts and monitor storefront metrics.",
      "Developed server-rendered storefronts using Next.js and Tailwind CSS, changing baseline Lighthouse performance scores from 70 to 95.",
      "Created secure checkout interfaces processing 2 million orders monthly for 30 million portal users."
    ]
  },
  {
    id: "exp-aksaramaya",
    role: "UI Developer",
    company: "Aksaramaya",
    period: "Mar 2019 - Nov 2019",
    location: "South Jakarta, Indonesia",
    technologies: ["ReactJS", "ChartJS", "HTML5", "Dashboard Visualization"],
    highlights: [
      "Delivered React data dashboards and Chart.js graph panels across 60 regional digital library systems."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "proj-tripcore",
    title: "TripCore",
    tagline: "Collaborative Trip Planner",
    description: "A Firebase-powered trip planning app with real-time collaborative itineraries, budget splitting, and guest invitation sharing.",
    technologies: ["ReactJS", "TypeScript", "Vite", "Firebase", "Real-time Sync"],
    features: [
      "Real-time collaborative itinerary builder via Firebase",
      "Split expenses and trip budget estimates",
      "Interactive travel map pins and transit tracker",
      "Guest invitation link sharing for shared planning"
    ],
    imageSrc: "",
    images: TRIPCORE_IMAGES,
    liveUrl: "https://tripcore-beta.vercel.app",
    githubUrl: "https://github.com/JessenReinhart/tripcore",
    iconName: "Compass"
  },
  {
    id: "proj-invoicr",
    title: "Invoicr",
    tagline: "Time Tracker & Billing Utility",
    description: "A billing manager and session tracker designed for freelancer use. Features automated timer triggers, custom client directories, and client-side data synchronization.",
    technologies: ["React", "TypeScript", "Vite", "TailwindCSS", "PDF Generation"],
    features: [
      "Trigger-based automated billing timers",
      "Dynamic PDF generation formatting clean bill styles",
      "High-contrast color modes to reduce screen fatigue",
      "Client-side synchronization writing to browser storage"
    ],
    imageSrc: "",
    liveUrl: "https://invoicr-eight.vercel.app",
    githubUrl: "https://github.com/JessenReinhart/invoicr",
    iconName: "FileText"
  },
  {
    id: "proj-wedding",
    title: "Wedding E-Invitation",
    tagline: "Interactive RSVP & Guestbook Platform",
    description: "A digital invitation portal to coordinate guest replies, find geographic locations, display group schedules, and post real-time guest notes.",
    technologies: ["React", "TailwindCSS", "Leaflet Maps API", "CSS Motion"],
    features: [
      "Client RSVP submission flow",
      "Interactive map pinning with custom markers",
      "Live message wall displaying congratulations",
      "Liquid visual layout supporting mobile coordinates"
    ],
    imageSrc: "",
    liveUrl: "https://wedding-invitation-tau-two.vercel.app",
    githubUrl: "https://github.com/JessenReinhart/wedding-invitation",
    iconName: "Heart"
  },
  {
    id: "proj-soulsync",
    title: "SoulSync",
    tagline: "Personal Log & Goal Tracker",
    description: "An offline tracker to record logs, set markers, and graph progress trends using local device storage.",
    technologies: ["React", "TailwindCSS", "Local Storage", "D3 Progress Graphs"],
    features: [
      "Daily diary stream with visual mood ratings",
      "Milestone completion tracker",
      "Encrypted data encryption flow in browser memory",
      "Minimalist interface styled with high contrast"
    ],
    imageSrc: "",
    images: SOULSYNC_IMAGES,
    liveUrl: "https://soulsync-gamma.vercel.app",
    githubUrl: "https://github.com/JessenReinhart/soulsync",
    iconName: "Activity"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      "ReactJS",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "Web Components",
      "Responsive Layouts",
      "Vite"
    ]
  },
  {
    name: "Backend & Core",
    skills: [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Thymeleaf",
      "RESTful APIs",
      "Clean Architecture",
      "Data Relational Models"
    ]
  },
  {
    name: "Engineering Concepts",
    skills: [
      "Performance Optimization",
      "SSR (Next.js)",
      "i18n (Internationalization)",
      "CMS Development",
      "Banking Systems Architecture",
      "Lighthouse Auditing",
      "White-label Modules"
    ]
  }
];
