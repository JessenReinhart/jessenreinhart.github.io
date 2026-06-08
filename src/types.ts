export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  technologies: string[];
  highlights?: string[];
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  features?: string[];
  imageSrc: string;
  images?: string[];
  liveUrl?: string;
  githubUrl?: string;
  iconName?: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface StatItem {
  value: string;
  label: string;
  numericVal: number;
}
