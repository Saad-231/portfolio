export interface SkillItem {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "UI/UX" | "Graphic Design" | "Game Development";
  level: number; // 0-100, used for the animated progress ring
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  year: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  index: string; // e.g. "01"
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}
