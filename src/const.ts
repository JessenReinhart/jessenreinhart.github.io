import { Experience, EducationInfo, SkillCategory, NavLink } from "./types";

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "home" },
  { href: "#about", label: "about" },
  { href: "#skills", label: "skills" },
  { href: "#experience", label: "experience" },
  { href: "#education", label: "education" },
  { href: "#contact", label: "contact" },
];

export const TYPING_TEXTS: string[] = [
  "I am a frontend engineer",
  "I am curious",
  "I am adaptable",
  "I make stuff",
  "I build digital experiences",
  "I solve problems"
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend Frameworks",
    iconClass: "fab fa-js-square mr-2",
    skills: [
      { name: "ReactJS", level: 5 },
      { name: "TypeScript", level: 5 },
      { name: "NextJS", level: 4 },
      { name: "VueJS", level: 3 },
      { name: "SvelteJS", level: 3 },
    ],
  },
  {
    id: "styling",
    title: "Styling & UI",
    iconClass: "fas fa-paint-brush mr-2",
    skills: [
      { name: "HTML & CSS", level: 5 },
      { name: "TailwindCSS", level: 5 },
      { name: "Bootstrap", level: 4 },
      { name: "Material Design", level: 4 },
      { name: "Ant Design", level: 4 },
    ],
  },
  {
    id: "design",
    title: "Design Tools",
    iconClass: "fas fa-pencil-ruler mr-2",
    skills: [
      { name: "Figma", level: 5 },
      { name: "Photoshop", level: 4 },
      { name: "Illustrator", level: 3 },
      { name: "Inkscape", level: 3 },
    ],
  },
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: "wide",
    jobTitle: "Frontend Software Engineer",
    company: "Wide Technologies Indonesia",
    location: "South Jakarta",
    period: "Sep 2023 - Present",
    responsibilities: [
      "Develop and maintain ReactJS based admin panel web applications for an integrated banking system",
    ],
  },
  {
    id: "inspigo",
    jobTitle: "Frontend Software Engineer",
    company: "Inspigo",
    location: "South Jakarta",
    period: "Dec 2022 - Sep 2023",
    responsibilities: [
      "Developed a NextJS-based CMS for managing application content",
    ],
  },
  {
    id: "sirclo",
    jobTitle: "Frontend Software Engineer",
    company: "Sirclo",
    location: "South Tangerang",
    period: "Nov 2019 - Nov 2022",
    responsibilities: [
      "Developed a ReactJS based CMS for managing webstore contents",
      "Developed a SSR web frontend for online shop web store using NextJS and TailwindCSS",
      "Developed a ReactJS based frontend for payment page",
    ],
  },
  {
    id: "aksaramaya",
    jobTitle: "UI Developer",
    company: "Aksaramaya",
    location: "South Jakarta",
    period: "Mar 2019 - Nov 2019",
    responsibilities: [
      "Designed and developed UI for web dashboards and apps",
      "Developed a ReactJS and React-Admin-based CMS & Dashboard app",
      "Used ChartJS library to display graphs from database",
      "Designed UI and interactive mockups using Figma and Adobe XD",
    ],
  },
];

export const EDUCATION_INFO: EducationInfo = {
  degree: "Bachelor of Engineering",
  major: "Informatics Engineering",
  university: "Gunadarma University, Depok",
  period: "2014 - 2018",
};
