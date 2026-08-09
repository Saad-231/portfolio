import type { SkillItem, ProjectItem, ServiceItem, ExperienceItem, NavLink } from "@/types";

/**
 * Central content file.
 * Edit the arrays below to update the site — no need to touch component code.
 */

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const SKILLS: SkillItem[] = [
  { id: "react", name: "React", category: "Frontend", level: 92 },
  { id: "nextjs", name: "Next.js", category: "Frontend", level: 90 },
  { id: "threejs", name: "Three.js", category: "Frontend", level: 82 },
  { id: "typescript", name: "TypeScript", category: "Frontend", level: 88 },
  { id: "nodejs", name: "Node.js", category: "Backend", level: 85 },
  { id: "mongodb", name: "MongoDB", category: "Backend", level: 80 },
  { id: "firebase", name: "Firebase", category: "Backend", level: 83 },
  { id: "figma", name: "Figma", category: "UI/UX", level: 90 },
  { id: "prototyping", name: "Prototyping", category: "UI/UX", level: 87 },
  { id: "branding", name: "Branding", category: "Graphic Design", level: 84 },
  { id: "illustration", name: "Illustration", category: "Graphic Design", level: 78 },
  { id: "unity", name: "Unity", category: "Game Development", level: 75 },
];

// Edit these three case studies directly — each maps to one card in the Projects section.
export const PROJECTS: ProjectItem[] = [
  {
    id: "proj-novascribe",
    title: "NovaScribe AI",
    description:
      "NovaScribe AI is a full stack AI SaaS platform built around intelligent, context-aware conversations. It integrates multiple APIs to power real-time AI responses, wrapped in a modern interface designed for clarity and a smooth day-to-day user experience.",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "JavaScript", "Tailwind CSS", "APIs"],
    image: "/images/project-novascribe.jpg",
    liveUrl: "https://novascribe-ai.vercel.app/",
    githubUrl: "https://github.com/Saad-231/backend",
    year: "2025",
  },
  {
    id: "proj-hubspot-clone",
    title: "HubSpot Website Clone",
    description:
      "A high-quality recreation of the HubSpot marketing site experience, rebuilt from scratch to match its clean corporate design language, layout structure and interaction patterns using modern front-end tooling.",
    tags: ["HTML5", "CSS3", "JavaScript", "React"],
    image: "/images/project-hubspot-clone.jpg",
    liveUrl: "https://codingwithsaad.com/Saad-hubspot/",
    year: "2024",
  },
  {
    id: "proj-saad-portfolio",
    title: "Saad Ali Portfolio",
    description:
      "This portfolio itself — a Next.js and TypeScript build combining scroll-driven motion, a custom navy-and-gold design system and a hand-built component architecture. Beyond the code, I personally designed its entire visual identity — drawing on my graphic design background to shape every layout, animation and detail.",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "EmailJS",
      "Lenis",
    ],
    image: "/images/project-saad-portfolio.jpg",
    githubUrl: "#",
    year: "2026",
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "svc-01",
    index: "01",
    title: "Web Development",
    description:
      "Fast, accessible, production-grade web applications built with modern frameworks and clean architecture.",
    icon: "code",
  },
  {
    id: "svc-02",
    index: "02",
    title: "UI Design",
    description:
      "Interfaces designed around clarity and intent — systemized typography, spacing and interaction states.",
    icon: "layout",
  },
  {
    id: "svc-03",
    index: "03",
    title: "3D Websites",
    description:
      "Immersive, depth-driven web experiences built with layered motion, perspective and scroll choreography that stay fast on real devices.",
    icon: "cube",
  },
  {
    id: "svc-04",
    index: "04",
    title: "Graphic Design",
    description:
      "Brand identities, social assets and visual systems designed to hold together across every touchpoint.",
    icon: "palette",
  },
  {
    id: "svc-05",
    index: "05",
    title: "Game Development",
    description:
      "Interactive 2D/3D experiences and gameplay prototypes built in Unity, from mechanic to polish.",
    icon: "gamepad",
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "exp-01",
    role: "Full Stack Developer",
    organization: "Freelance",
    period: "2023 — Present",
    description:
      "Designing and building full stack products end-to-end for clients — from UI systems to backend APIs and deployment.",
  },
  {
    id: "exp-02",
    role: "UI/UX & Graphic Designer",
    organization: "Independent Studio",
    period: "2022 — Present",
    description:
      "Delivering brand identities and interface designs for startups, translating them into functioning front-end code.",
  },
  {
    id: "exp-03",
    role: "Software Engineering Studies",
    organization: "Self-Directed & Coursework",
    period: "2021 — Present",
    description:
      "Continuous, hands-on study across the modern web stack, three-dimensional graphics and game development.",
  },
];

export const SOCIALS = {
  github: "https://github.com/Saad-231",
  linkedin: "https://linkedin.com",
  email: "saadalieditor6@gmail.com",
};
