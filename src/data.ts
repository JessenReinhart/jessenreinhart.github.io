import { Experience, Project, SkillCategory, StatItem } from "./types";
import portraitImg from "./assets/images/jessen-portrait-removed-bg.webp";
import tc00 from "./assets/images/tripcore-images/split_0_0.webp";
import tc01 from "./assets/images/tripcore-images/split_0_1.webp";
import tc10 from "./assets/images/tripcore-images/split_1_0.webp";
import tc11 from "./assets/images/tripcore-images/split_1_1.webp";
import tc20 from "./assets/images/tripcore-images/split_2_0.webp";
import tc21 from "./assets/images/tripcore-images/split_2_1.webp";
import ss00 from "./assets/images/soulync-images/split_0_0.webp";
import ss01 from "./assets/images/soulync-images/split_0_1.webp";
import ss10 from "./assets/images/soulync-images/split_1_0.webp";
import tripcoreLive from "./assets/images/tripcore-live.webp";
import invoicrLive from "./assets/images/invoicr-live.webp";
import weddingLive from "./assets/images/wedding-live.webp";
import soulsyncLive from "./assets/images/soulsync-live.webp";

export const PORTRAIT_IMAGE = portraitImg;
export const TRIPCORE_IMAGES = [tc00, tc01, tc10, tc11, tc20, tc21];
export const SOULSYNC_IMAGES = [ss00, ss01, ss10];

export const STATS: StatItem[] = [
  { value: "7", label: "Years Experience", numericVal: 7 },
  { value: "20", label: "Financial Institutions", numericVal: 20, source: "via Wide Technologies" },
  { value: "30M", label: "Portal Users", numericVal: 30000000, source: "via Wide Technologies" },
  { value: "100k", label: "Online Stores", numericVal: 100000, source: "via SIRCLO" },
  { value: "2M", label: "Monthly Orders", numericVal: 2000000, source: "via SIRCLO" }
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
    ],
    highlightsId: [
      "Mengembangkan Card Management System — aplikasi web enterprise untuk pengelolaan siklus hidup kartu kredit dan debit.",
      "Membangun fitur backend dengan Spring Boot dan mengintegrasikannya dengan template Thymeleaf untuk lapisan frontend.",
      "Bekerja secara full-stack pada alur kerja penerbitan, aktivasi, dan pelaporan kartu."
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
      "Built interface modules for an enterprise digital banking platform serving 20 financial institutions across Southeast Asia.",
      "Designed white-label React template adapters for customized styling across corporate tenant networks.",
      "Implemented i18n localization to serve multi-language dashboards to regional users.",
      "Engineered reusable interface widgets on the R&D team to modularize frontend logic."
    ],
    highlightsId: [
      "Membangun modul antarmuka untuk platform perbankan digital enterprise yang melayani 20 institusi keuangan di Asia Tenggara.",
      "Merancang adapter template React white-label untuk kustomisasi tampilan di jaringan tenant korporat.",
      "Menerapkan lokalisasi i18n untuk menyajikan dashboard multi-bahasa kepada pengguna regional.",
      "Merekayasa widget antarmuka yang dapat digunakan kembali di tim R&D untuk memodularkan logika frontend."
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
    ],
    highlightsId: [
      "Membangun sistem manajemen konten Next.js agar tim non-teknis dapat memperbarui aset produksi secara langsung.",
      "Membuat prototipe alat konferensi audio berbasis web dengan JavaScript untuk mendukung komunikasi suara di browser modern."
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
      "Built a React dashboard for 100,000 retail merchants to configure layouts and monitor storefront metrics.",
      "Developed server-rendered storefronts with Next.js and Tailwind CSS, raising Lighthouse scores from 70 to 95.",
      "Created checkout interfaces handling 2 million orders monthly across SIRCLO's merchant network."
    ],
    highlightsId: [
      "Membangun dashboard React untuk 100.000 merchant ritel guna mengonfigurasi tata letak dan memantau metrik toko.",
      "Mengembangkan etalase server-rendered dengan Next.js dan Tailwind CSS, meningkatkan skor Lighthouse dari 70 ke 95.",
      "Membuat antarmuka checkout yang menangani 2 juta pesanan bulanan di jaringan merchant SIRCLO."
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
    ],
    highlightsId: [
      "Menyerahkan dashboard data React dan panel grafik Chart.js untuk 60 sistem perpustakaan digital regional."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "proj-tripcore",
    title: "TripCore",
    tagline: "Collaborative Trip Planner",
    description: "A Firebase-powered trip planning app with real-time collaborative itineraries, budget splitting, and guest invitation sharing.",
    descriptionId: "Aplikasi perencana perjalanan berbasis Firebase dengan itinerari kolaboratif real-time, pembagian anggaran, dan berbagi undangan tamu.",
    motivation: "I travel with friends often. Trip notes, itineraries, and savings goals used to live in Excel or WhatsApp and got buried. TripCore puts everything in one collaborative app where each member can update progress, add itinerary ideas, and track the next destination.",
    motivationId: "Saya sering bepergian dengan teman. Catatan perjalanan, itinerari, dan target tabungan dulu tersebar di Excel atau WhatsApp dan mudah terlupakan. TripCore menyatukan semuanya dalam satu aplikasi kolaboratif di mana setiap anggota dapat memperbarui progres, menambahkan ide itinerari, dan melacak destinasi berikutnya.",
    technologies: ["ReactJS", "TypeScript", "Vite", "Firebase", "Real-time Sync"],
    features: [
      "Real-time collaborative itinerary builder via Firebase",
      "Split expenses and trip budget estimates",
      "Interactive travel map pins and transit tracker",
      "Guest invitation link sharing for shared planning"
    ],
    featuresId: [
      "Pembangun itinerari kolaboratif real-time via Firebase",
      "Pembagian pengeluaran dan estimasi anggaran perjalanan",
      "Pin peta perjalanan interaktif dan pelacak transit",
      "Berbagi tautan undangan tamu untuk perencanaan bersama"
    ],
    imageSrc: tripcoreLive,
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
    descriptionId: "Pengelola penagihan dan pelacak sesi yang dirancang untuk freelancer. Dilengkapi pemicu timer otomatis, direktori klien kustom, dan sinkronisasi data sisi klien.",
    motivation: "As a freelancer alongside my day job, I struggled to set fair fees and track hours. I ended up underpaid or afraid of overcharging. Invoicr makes billing objective and easier to communicate to clients.",
    motivationId: "Sebagai freelancer di samping pekerjaan utama, saya kesulitan menetapkan tarif yang wajar dan melacak jam kerja. Saya sering dibayar rendah atau takut mengenakan biaya berlebihan. Invoicr membuat penagihan lebih objektif dan mudah dikomunikasikan kepada klien.",
    technologies: ["React", "TypeScript", "Vite", "TailwindCSS", "PDF Generation"],
    features: [
      "Trigger-based automated billing timers",
      "Dynamic PDF generation formatting clean bill styles",
      "High-contrast color modes to reduce screen fatigue",
      "Client-side synchronization writing to browser storage"
    ],
    featuresId: [
      "Timer penagihan otomatis berbasis pemicu",
      "Pembuatan PDF dinamis dengan format tagihan yang rapi",
      "Mode warna kontras tinggi untuk mengurangi kelelahan mata",
      "Sinkronisasi sisi klien menggunakan penyimpanan browser"
    ],
    imageSrc: invoicrLive,
    liveUrl: "https://invoicr-eight.vercel.app",
    githubUrl: "https://github.com/JessenReinhart/invoicr",
    iconName: "FileText"
  },
  {
    id: "proj-wedding",
    title: "Wedding E-Invitation",
    tagline: "Interactive RSVP & Guestbook Platform",
    description: "A digital invitation portal to coordinate guest replies, find geographic locations, display group schedules, and post real-time guest notes.",
    descriptionId: "Portal undangan digital untuk mengoordinasikan balasan tamu, menemukan lokasi geografis, menampilkan jadwal grup, dan memposting catatan tamu real-time.",
    motivation: "Built for my own wedding. I wanted something personal, not the typical over-the-top commercial template, with features I wanted but couldn't find in existing tools.",
    motivationId: "Dibuat untuk pernikahan saya sendiri. Saya menginginkan sesuatu yang personal, bukan template komersial yang berlebihan, dengan fitur yang saya inginkan tetapi tidak ditemukan di alat yang ada.",
    technologies: ["React", "TailwindCSS", "Leaflet Maps API", "CSS Motion"],
    features: [
      "Client RSVP submission flow",
      "Interactive map pinning with custom markers",
      "Live message wall displaying congratulations",
      "Liquid visual layout supporting mobile coordinates"
    ],
    featuresId: [
      "Alur pengiriman RSVP tamu",
      "Penandaan peta interaktif dengan marker kustom",
      "Dinding pesan langsung yang menampilkan ucapan selamat",
      "Tata letak visual yang fleksibel mendukung koordinat perangkat seluler"
    ],
    imageSrc: weddingLive,
    liveUrl: "https://wedding-invitation-tau-two.vercel.app",
    githubUrl: "https://github.com/JessenReinhart/wedding-invitation",
    iconName: "Heart"
  },
  {
    id: "proj-soulsync",
    title: "SoulSync",
    tagline: "Personal Log & Goal Tracker",
    description: "An offline tracker to record logs, set markers, and graph progress trends using local device storage.",
    descriptionId: "Pelacak offline untuk mencatat log, menetapkan penanda, dan membuat grafik tren progres menggunakan penyimpanan lokal perangkat.",
    motivation: "I went through a rough period and needed a private space to log my thoughts. I built it for myself, hoping it would help.",
    motivationId: "Saya melalui masa sulit dan membutuhkan ruang pribadi untuk mencatat pikiran saya. Saya membuatnya untuk diri sendiri, berharap ia bisa membantu.",
    technologies: ["React", "TailwindCSS", "Local Storage", "Recharts"],
    features: [
      "Daily diary stream with visual mood ratings",
      "Milestone completion tracker",
      "Browser-local data persistence",
      "Minimalist interface styled with high contrast"
    ],
    featuresId: [
      "Aliran jurnal harian dengan penilaian suasana hati visual",
      "Pelacak penyelesaian milestone",
      "Penyimpanan data lokal di browser",
      "Antarmuka minimalis dengan gaya kontras tinggi"
    ],
    imageSrc: soulsyncLive,
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
