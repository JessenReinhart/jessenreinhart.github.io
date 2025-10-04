import { PersonalData } from './types';

export const personalData: PersonalData = {
    name: "Muhammad Jessen Reinhart Sugiarto",
    title: "Frontend Software Engineer",
    email: "jessen_1206@yahoo.com",
    linkedin: "https://linkedin.com/in/jessenreinhart",
    summary: "I am a Frontend Software Engineer with over 5 years of experience in building scalable web applications, including CMS and e-commerce frontends. My expertise lies in technologies such as ReactJS, NextJS, TypeScript, and TailwindCSS. I have a proven track record of enhancing performance, streamlining workflows, and supporting platforms that handle millions of monthly transactions and users.",
    skills: [
        "React",
        "Next.js",
        "TypeScript",
        "TailwindCSS",
        "JavaScript",
        "HTML",
        "CSS",
        "Vue.js",
        "Node.js",
        "Git",
        "Figma",
        "Adobe XD",
        "Agile",
        "Chart.js",
    ],
    experience: [
        {
            role: "Frontend Software Engineer",
            company: "Wide Technologies Indonesia",
            duration: "09/2023 - Present",
            description: [
                "Contributed to PrimeCash X, a digital banking platform serving 20+ corporate and retail banks across Southeast Asia.",
                "Developed multi-site and white-label frontend solutions in ReactJS, enabling banks to customize branding and features.",
                "Implemented internationalization (i18n) to support multi-language interfaces, ensuring accessibility for diverse regional users.",
                "Collaborated within a cross-functional R&D team to enhance modularity, scalability, and reliability of banking-grade web applications."
            ]
        },
        {
            role: "Frontend Software Engineer",
            company: "Inspigo",
            duration: "12/2022 - 09/2023",
            description: [
                "Built a NextJS CMS that streamlined content management workflows for non-technical teams.",
                "Collaborated on a conceptual real-time audio conferencing feature, exploring web-audio technologies for live voice interactions."
            ]
        },
        {
            role: "Frontend Software Engineer",
            company: "Sirclo",
            duration: "11/2019 - 11/2022",
            description: [
                "Developed a custom ReactJS CMS empowering 100,000+ brands to update their webstores more efficiently.",
                "Engineered SSR storefronts with NextJS + TailwindCSS, improving load speed by ~40% and boosting Lighthouse score from ~70 to ~95.",
                "Developed secure ReactJS payment pages supporting ~2M monthly orders within SIRCLO's ecosystem."
            ]
        },
        {
            role: "UI Developer",
            company: "Aksaramaya",
            duration: "03/2019 - 11/2019",
            description: [
                "Delivered ReactJS dashboards and ChartJS visualizations for digital library platforms used across 60+ library apps."
            ]
        }
    ],
    projects: [
        {
            title: "Invoicr",
            subtitle: "Invoice Generator & Time Tracker app",
            url: "https://invoicr-eight.vercel.app",
            description: [
                "Built with React, TypeScript, Vite, and TailwindCSS.",
                "Features time tracking (manual & auto), hourly rate billing, PDF export, local data persistence, and dark/light mode."
            ]
        },
        {
            title: "Wedding E-Invitation",
            subtitle: "Digital Wedding Invitation Platform",
            description: [
                "Developed using React + TailwindCSS.",
                "Features: RSVP form, event schedule, interactive maps, and a digital guestbook.",
                "Accessed by over 200 guests."
            ]
        },
        {
            title: "SoulSync",
            subtitle: "Personal development/journaling concept app",
            url: "https://soulsync-gamma.vercel.app",
            description: [
                "Built with React + TailwindCSS, focusing on clean UI/UX for journaling, goal tracking, and self-reflection.",
                "Implemented local storage for offline data persistence."
            ]
        }
    ],
    education: {
        degree: "B.Eng. Informatics Engineering",
        university: "Gunadarman University",
        duration: "01/2014 - 05/2018"
    }
};