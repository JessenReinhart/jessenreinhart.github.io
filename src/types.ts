export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  technologies: string[];
  highlights?: string[];
  highlightsId?: string[];
  narrative?: string;
  narrativeId?: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  descriptionId?: string;
  motivation?: string;
  motivationId?: string;
  technologies: string[];
  features?: string[];
  featuresId?: string[];
  imageSrc: string;
  images?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface StatItem {
  value: string;
  label: string;
  numericVal: number;
  source?: string;
}

export interface ServiceExample {
  label: string;
  labelId?: string;
  url?: string;
}

export interface Service {
  id: string;
  title: string;
  titleId?: string;
  description: string;
  descriptionId?: string;
  outcome: string;
  outcomeId?: string;
  icon: "website" | "webapp" | "redesign" | "maintenance";
  examples?: ServiceExample[];
}
