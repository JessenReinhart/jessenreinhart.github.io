export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string[];
}

export interface Project {
  title: string;
  subtitle: string;
  description: string[];
  url?: string;
}

export interface Education {
  degree: string;
  university: string;
  duration: string;
}

export interface PersonalData {
  name: string;
  title: string;
  email: string;
  linkedin: string;
  summary: string;
  skills: string[];
  experience: Experience[];
  projects: Project[];
  education: Education;
}