import { JSX } from "solid-js";

export interface Skill {
  name: string;
  level: number; // typically 1-5
}

export interface SkillCategory {
  id: string;
  title: string;
  iconClass: string;
  skills: Skill[];
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
}

export interface EducationInfo {
  degree: string;
  major: string;
  university: string;
  period: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface RouterConfig {
  path: string;
  element: JSX.Element;
  title?: string;
}