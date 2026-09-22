import { Experience, Project, Service, SkillCategory, StatItem } from "./types";
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
const tripcoreLive = "/screenshots/tripcore-live.jpg";
const invoicrLive = "/screenshots/invoicr-live.jpg";
const weddingLive = "/screenshots/wedding-live.jpg";
const soulsyncLive = "/screenshots/soulsync-live.jpg";

export const PORTRAIT_IMAGE = portraitImg;
export const TRIPCORE_IMAGES = [tc00, tc01, tc10, tc11, tc20, tc21];
export const SOULSYNC_IMAGES = [ss00, ss01, ss10];

export const LINKEDIN_URL = "https://www.linkedin.com/in/jessenreinhart";

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
    company: "LG Sinarmas, via PGI Data",
    period: "Nov 2025 - Present",
    location: "Jakarta Raya, Indonesia",
    technologies: ["Java", "Spring Boot", "Thymeleaf", "PostgreSQL"],
    highlights: [
      "Building the web app bank staff use to manage card issuance, activation, and reporting",
      "Working across Java/Spring Boot backend and Thymeleaf frontend in a single workflow"
    ],
    highlightsId: [
      "Membangun aplikasi web yang digunakan staf bank untuk mengelola penerbitan, aktivasi, dan pelaporan kartu",
      "Bekerja secara full-stack di backend Java/Spring Boot dan frontend Thymeleaf dalam satu alur kerja"
    ],
    narrative: "Banks manage millions of credit and debit cards. Every issuance, activation, and limit change needs a system that handles it without errors. I'm building the web interface that bank staff use for these operations, working full-stack across the backend services and the pages customers see.",
    narrativeId: "Bank mengelola jutaan kartu kredit dan debit. Setiap penerbitan, aktivasi, dan perubahan limit membutuhkan sistem yang bekerja tanpa kesalahan. Saya membangun antarmuka web yang digunakan staf bank untuk operasi ini, bekerja full-stack di layanan backend dan halaman yang dilihat nasabah."
  },
  {
    id: "exp-wonderslab",
    role: "Freelance Frontend Engineer (Remote)",
    company: "Wonderslab",
    period: "Nov 2025 - Jun 2026",
    location: "Remote",
    technologies: ["React", "TypeScript", "Next.js", "TanStack Router", "TanStack Query", "TailwindCSS", "Zustand"],
    highlights: [
      "Shipped Planet Advisor, a real-estate AI app for checking Korean property prices and running analysis via AI chat (Next.js 14), with streaming responses and infinite scroll",
      "Built d-camp, a startup-evaluation dashboard (React 19 + TanStack Router), with scorecards, pipeline views, and AI-vs-manual evaluation comparison",
      "Delivered Wonderslaw, an AI-powered legal app for Korean legal cases (React + TanStack Query, NestJS backend), including token-expiry auto-logout and redirect handling"
    ],
    highlightsId: [
      "Mengerjakan Planet Advisor, aplikasi AI untuk sektor properti yang membantu mengecek harga dan menganalisis properti di Korea lewat chat AI (Next.js 14), dengan respons streaming dan infinite scroll",
      "Membangun d-camp, dashboard evaluasi startup (React 19 + TanStack Router) dengan scorecard, pipeline view, dan perbandingan evaluasi AI vs manual",
      "Mengirimkan Wonderslaw, aplikasi hukum bertenaga AI untuk kasus hukum Korea (React + TanStack Query, backend NestJS), termasuk auto-logout saat token kadaluarsa dan penanganan redirect"
    ],
    narrative: "Wonderslab needed frontend support across three products. I built Planet Advisor's real-estate AI chat UI for Korean property pricing and analysis, the d-camp startup-evaluation dashboard, and Wonderslaw's legal document flows for Korean cases. All three were built remotely.",
    narrativeId: "Wonderslab butuh bantuan frontend untuk tiga produk. Saya membangun UI chat AI Planet Advisor untuk harga dan analisis properti Korea, dashboard evaluasi startup d-camp, serta alur dokumen hukum Wonderslaw untuk kasus hukum Korea. Ketiganya dikerjakan secara remote."
  },
  {
    id: "exp-wide",
    role: "Frontend Engineer",
    company: "PT Wide Technologies Indonesia",
    period: "Sep 2023 - Nov 2025",
    location: "Jakarta Raya, Indonesia",
    technologies: ["ReactJS", "TypeScript", "i18n", "Banking Architecture"],
    highlights: [
      "Built one React platform that served 20 different banks, each with their own branding",
      "Added multi-language support so regional users could work in their preferred language",
      "Created reusable UI components the R&D team shared across all banking modules"
    ],
    highlightsId: [
      "Membangun satu platform React yang melayani 20 bank berbeda dengan branding masing-masing",
      "Menambahkan dukungan multi-bahasa agar pengguna regional dapat bekerja dalam bahasa pilihan mereka",
      "Membuat komponen UI reusable yang digunakan tim R&D di semua modul perbankan"
    ],
    narrative: "Twenty banks in Southeast Asia needed the same platform with different branding and layouts. I built the React layer so one codebase could serve them all without forking each tenant. The result was one platform running for 30 million users.",
    narrativeId: "Dua puluh bank di Asia Tenggara membutuhkan platform yang sama dengan branding dan layout yang berbeda. Saya membangun layer React agar satu codebase bisa melayani semuanya tanpa memfork tiap tenant. Hasilnya, satu platform digunakan oleh 30 juta pengguna."
  },
  {
    id: "exp-inspigo",
    role: "Frontend Engineer",
    company: "Inspigo.id",
    period: "Dec 2022 - Sep 2023",
    location: "Remote / Hybrid",
    technologies: ["Next.js", "Web Audio API", "CMS Development"],
    highlights: [
      "Built a CMS with Next.js so content teams could publish without writing code",
      "Prototyped browser-based voice conferencing using the Web Audio API"
    ],
    highlightsId: [
      "Membangun CMS dengan Next.js agar tim konten bisa mempublikasi tanpa perlu coding",
      "Membuat prototipe konferensi suara berbasis browser menggunakan Web Audio API"
    ],
    narrative: "Content teams at Inspigo couldn't update the app without developer help. I built a Next.js CMS that let non-technical editors publish directly. I also prototyped a browser-based audio conferencing tool using the Web Audio API.",
    narrativeId: "Tim konten di Inspigo tidak bisa memperbarui aplikasi tanpa bantuan developer. Saya membangun CMS dengan Next.js yang memungkinkan editor non-teknis untuk mempublikasi secara langsung. Saya juga membuat prototipe alat konferensi audio berbasis browser menggunakan Web Audio API."
  },
  {
    id: "exp-sirclo",
    role: "Frontend Engineer",
    company: "SIRCLO",
    period: "Nov 2019 - Nov 2022",
    location: "BSD, South Tangerang",
    technologies: ["ReactJS", "Next.js", "TailwindCSS", "Performance Optimization"],
    highlights: [
      "Built the dashboard 100,000 merchants used to set up and monitor their online stores",
      "Created checkout pages handling 2 million orders every month",
      "Raised Lighthouse performance from 70 to 95 with server-rendered storefronts"
    ],
    highlightsId: [
      "Membangun dashboard yang digunakan 100.000 merchant untuk mengatur dan memantau toko online mereka",
      "Membuat halaman checkout yang menangani 2 juta pesanan setiap bulan",
      "Meningkatkan skor Lighthouse dari 70 ke 95 dengan etalase server-rendered"
    ],
    narrative: "100,000 merchants used SIRCLO to run their online stores. I built the dashboard they configured their shops with, and the storefronts their customers browsed. The checkout flow handled 2 million orders a month. I also pushed Lighthouse scores from 70 to 95 by switching to server-rendered pages.",
    narrativeId: "100.000 merchant menggunakan SIRCLO untuk menjalankan toko online mereka. Saya membangun dashboard yang mereka gunakan untuk mengatur toko, dan etalase yang dilihat pelanggan mereka. Alur checkout menangani 2 juta pesanan per bulan. Saya juga meningkatkan skor Lighthouse dari 70 ke 95 dengan beralih ke halaman server-rendered."
  },
  {
    id: "exp-aksaramaya",
    role: "UI Developer",
    company: "Aksaramaya",
    period: "Mar 2019 - Nov 2019",
    location: "South Jakarta, Indonesia",
    technologies: ["ReactJS", "ChartJS", "HTML5", "Dashboard Visualization"],
    highlights: [
      "Built data dashboards with interactive charts for 60 regional library systems"
    ],
    highlightsId: [
      "Membangun dashboard data dengan grafik interaktif untuk 60 sistem perpustakaan daerah"
    ],
    narrative: "Sixty regional library systems across Indonesia needed data dashboards to track usage. I built React dashboards with Chart.js panels that librarians and administrators used to see how their systems were performing.",
    narrativeId: "Enam puluh sistem perpustakaan daerah di Indonesia membutuhkan dashboard data untuk melacak penggunaan. Saya membangun dashboard React dengan panel Chart.js yang digunakan pustakawan dan administrator untuk melihat kinerja sistem mereka."
  },
];

export const PROJECTS: Project[] = [
  {
    id: "proj-tripcore",
    title: "TripCore",
    tagline: "Plan a trip with friends",
    description: "Trip plans kept ending up in Excel and WhatsApp. I built one place where everyone could update the itinerary, split costs, and invite the rest of the group in real time.",
    descriptionId: "Rencana perjalanan kami sering berakhir di Excel dan WhatsApp. Saya membuat satu tempat agar semua orang bisa memperbarui itinerary, membagi biaya, dan mengundang anggota lain secara real-time.",
    motivation: "I travel with friends often, and the planning usually ended up scattered across Excel and WhatsApp. I wanted one app where the group could keep the itinerary and costs together.",
    motivationId: "Saya sering bepergian dengan teman, dan rencananya biasanya tersebar di Excel dan WhatsApp. Saya ingin satu aplikasi untuk menyatukan itinerary dan biaya perjalanan.",
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
  },
  {
    id: "proj-invoicr",
    title: "Invoicr",
    tagline: "Track time, then bill it",
    description: "I built a small billing tool around the part of freelancing I kept putting off: tracking time and turning it into a clear invoice.",
    descriptionId: "Saya membuat tool billing kecil untuk bagian freelance yang paling sering saya tunda: mencatat waktu kerja lalu mengubahnya menjadi invoice yang jelas.",
    motivation: "As a freelancer alongside my day job, I kept second-guessing rates and hours. I wanted the invoice to come from recorded work instead of guesswork.",
    motivationId: "Sebagai freelancer di samping pekerjaan utama, saya sering ragu soal tarif dan jam kerja. Saya ingin invoice berasal dari pekerjaan yang benar-benar tercatat, bukan perkiraan.",
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
    images: [invoicrLive],
    liveUrl: "https://invoicr-eight.vercel.app",
    githubUrl: "https://github.com/JessenReinhart/invoicr",
  },
  {
    id: "proj-wedding",
    title: "Wedding E-Invitation",
    tagline: "RSVP + guestbook for a wedding",
    description: "A wedding invitation I could actually control: RSVP, map location, event details, and a guestbook in one page.",
    descriptionId: "Undangan pernikahan yang bisa saya atur sendiri: RSVP, lokasi di peta, detail acara, dan guestbook dalam satu halaman.",
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
    images: [weddingLive],
    liveUrl: "https://wedding-invitation-tau-two.vercel.app",
    githubUrl: "https://github.com/JessenReinhart/wedding-invitation",
  },
  {
    id: "proj-soulsync",
    title: "SoulSync",
    tagline: "A private offline journal",
    description: "A private, offline place to write short logs, mark progress, and keep the data on the device.",
    descriptionId: "Tempat pribadi dan offline untuk menulis log singkat, menandai progres, dan menyimpan data di perangkat.",
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
  },
  {
    id: "proj-shareterm",
    title: "share-term",
    tagline: "Watch your terminal from your phone",
    description: "I wanted to glance at a running dev server or long log from my phone without SSH or tmux. share-term mirrors the terminal over local Wi-Fi after one QR scan.",
    descriptionId: "Saya ingin melihat server dev atau log panjang dari ponsel tanpa SSH atau tmux. share-term menampilkan terminal lewat Wi-Fi lokal setelah satu kali scan QR.",
    motivation: "I use this in my own development workflow. I wanted to glance at a running dev server or long log from my phone without SSH-ing in, and I did not want another app installed on the laptop.",
    motivationId: "Saya memakai ini dalam alur kerja development sendiri. Saya ingin melihat server dev atau log panjang dari ponsel tanpa SSH, dan tidak ingin memasang aplikasi lain di laptop.",
    technologies: ["Node.js", "TypeScript", "node-pty", "WebSocket", "xterm.js", "QR"],
    features: [
      "Live terminal sharing via QR — no tmux required (uses node-pty / ConPTY)",
      "Real terminal emulation on the phone with xterm.js (cursor, colors, layout)",
      "Wide-TUI aware: renders at the true PTY width with a scaled-down font",
      "Draggable floating Clear button, status dot, and pinch-to-zoom on mobile",
      "Share any command directly: `share-term <command>`",
      "Attach to tmux, tail log files, or pipe from stdin"
    ],
    featuresId: [
      "Berbagi terminal langsung via QR — tanpa tmux (menggunakan node-pty / ConPTY)",
      "Emulasi terminal sungguhan di ponsel via xterm.js (kursor, warna, tata letak)",
      "Sadar TUI lebar: merender pada lebar PTY asli dengan font diperkecil",
      "Tombol Clear melayang yang bisa digeser, indikator status, dan pinch-zoom di ponsel",
      "Bagikan perintah apa pun langsung: `share-term <command>`",
      "Menyambung ke tmux, mengekor file log, atau pipe dari stdin"
    ],
    imageSrc: "/screenshots/share-term-live.jpg",
    liveUrl: "/share-term/",
    githubUrl: "https://github.com/JessenReinhart/share-term",
  },
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

export const SERVICES: Service[] = [
  {
    id: "svc-website",
    title: "Company Website / Landing Page",
    titleId: "Website Perusahaan / Landing Page",
    description: "A clean, fast site that gets your business online and makes it easy for people to reach you.",
    descriptionId: "Situs cepat dan modern yang memudahkan pengunjung untuk menghubungi atau membeli.",
    outcome: "Fast, modern site delivered in 1–2 weeks.",
    outcomeId: "Situs cepat & modern siap dalam 1–2 minggu.",
    icon: "website",
    examples: [
      { label: "Wedding E-Invitation", labelId: "Undangan Pernikahan Digital", url: "https://wedding-invitation-tau-two.vercel.app" },
      { label: "This Portfolio", labelId: "Portofolio Ini", url: "https://github.com/JessenReinhart/jessenreinhart.github.io" }
    ]
  },
  {
    id: "svc-webapp",
    title: "Web App (Booking, Ordering, Dashboard)",
    titleId: "Web App (Booking, Order, Dashboard)",
    description: "Custom apps built around how you work, like booking and ordering systems.",
    descriptionId: "Aplikasi custom sesuai cara Anda bekerja, seperti sistem booking dan order.",
    outcome: "Booking system, internal tool, or custom app.",
    outcomeId: "Sistem booking, alat internal, atau aplikasi custom.",
    icon: "webapp",
    examples: [
      { label: "TripCore", labelId: "TripCore", url: "https://tripcore-beta.vercel.app" },
      { label: "Invoicr", labelId: "Invoicr", url: "https://invoicr-eight.vercel.app" }
    ]
  },
  {
    id: "svc-redesign",
    title: "Frontend Upgrade / Redesign",
    titleId: "Upgrade / Redesign Frontend",
    description: "Modernize an old site with faster loads and a cleaner mobile layout.",
    descriptionId: "Membuat situs lama menjadi lebih cepat dengan muat yang kencang dan tampilan mobile yang rapi.",
    outcome: "Make your site fast & mobile-friendly.",
    outcomeId: "Membuat situs Anda cepat & mobile-friendly.",
    icon: "redesign",
    examples: [
      { label: "SIRCLO (Lighthouse 70→95)", labelId: "SIRCLO (Lighthouse 70→95)" }
    ]
  },
  {
    id: "svc-maintenance",
    title: "Maintenance / Ongoing Support",
    titleId: "Maintenance / Dukungan Berkelanjutan",
    description: "I keep your site running with updates and monitoring each month.",
    descriptionId: "Saya menjaga situs Anda tetap berjalan dengan pembaruan dan pemantauan setiap bulan.",
    outcome: "Updates & monitoring every month.",
    outcomeId: "Pembaruan & pemantauan setiap bulan.",
    icon: "maintenance",
    examples: [
      { label: "Monthly care plans", labelId: "Paket perawatan bulanan" }
    ]
  }
];
