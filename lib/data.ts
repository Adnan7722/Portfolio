/**
 * Single source of truth for site content.
 * Edit values here — every section reads from this file.
 * Content is sourced from Muhammad Adnan's CV.
 */

export const profile = {
  name: "Muhammad Adnan",
  firstName: "Muhammad",
  lastName: "Adnan",
  role: "Full-Stack & AI Automation Engineer",
  tagline: "I build fast, business-ready systems powered by AI.",
  location: "United States · Remote",
  available: true,
  email: "adnan.muhammad1290@gmail.com",
  linkedin: "https://www.linkedin.com/in/muhammadadnan111/",
  github: "https://github.com/Adnan7722",
  phone: "+1 940 277 9038",
  phoneHref: "tel:+19402779038",
};

export const stats = [
  { value: "5M+", label: "Monthly users served" },
  { value: "40+", label: "Production APIs" },
  { value: "25–45%", label: "Efficiency gained" },
];

/** Chapters for the scroll journey HUD. `id` maps to a section anchor. */
export const chapters = [
  { id: "top", index: "01", label: "INTRO" },
  { id: "services", index: "02", label: "SERVICES" },
  { id: "work", index: "03", label: "FEATURED WORK" },
  { id: "certs", index: "04", label: "CERTIFICATIONS" },
  { id: "path", index: "05", label: "THE PATH" },
  { id: "contact", index: "06", label: "CONTACT" },
];

export type Service = {
  index: string;
  title: string;
  blurb: string;
  points: string[];
  span: "wide" | "tall" | "normal";
  glyph: "stack" | "bolt" | "store" | "rocket";
};

export const services: Service[] = [
  {
    index: "01",
    title: "Full-Stack Development",
    blurb:
      "Frontends that feel instant, backends that don't buckle. React, Next.js, Laravel, Node, and databases — wired end to end.",
    points: ["React / Next.js", "Laravel · Node", "SQL & NoSQL"],
    span: "wide",
    glyph: "stack",
  },
  {
    index: "02",
    title: "AI Workflow Automation",
    blurb:
      "I turn repetitive, manual work into agents and pipelines that run themselves — so teams ship, not shuffle.",
    points: ["AI-native dev", "Integrations", "Automation"],
    span: "tall",
    glyph: "bolt",
  },
  {
    index: "03",
    title: "Small-Business Solutions",
    blurb:
      "Complete digital systems for lean teams — ERP, admin dashboards, internal tools — built to grow with the business.",
    points: ["ERP & tools", "Dashboards", "Built to scale"],
    span: "normal",
    glyph: "store",
  },
  {
    index: "04",
    title: "DevOps & Deployment",
    blurb:
      "From localhost to production. Docker, Linux, CI/CD, and cloud — I own the whole path so launches are calm.",
    points: ["Docker · Linux", "CI/CD", "Cloud"],
    span: "normal",
    glyph: "rocket",
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  description: string;
  highlights: string[];
  stack: string[];
  accent: "primary" | "accent" | "amber";
  preview: "erp" | "extension" | "ml";
};

export const projects: Project[] = [
  {
    id: "erp-tryon",
    title: "ERP System with AI Try-On",
    category: "Enterprise Platform",
    year: "2024",
    summary:
      "Full order-management ERP with 3D garment visualization and an AI virtual try-on.",
    description:
      "An end-to-end ERP built on the MERN stack: a complete order-management system fused with Unity-powered 3D garment visualization and an AI virtual try-on. Designed so a retail business can run operations and give customers an immersive fitting experience from one platform.",
    highlights: [
      "Full order-management system",
      "Unity 3D garment visualization",
      "AI virtual try-on experience",
      "MERN stack, end to end",
    ],
    stack: ["MongoDB", "Express", "React", "Node", "Unity", "AI / ML"],
    accent: "primary",
    preview: "erp",
  },
  {
    id: "gmail-monday",
    title: "Gmail → Monday.com Extension",
    category: "Chrome Extension",
    year: "2024",
    summary:
      "A production Chrome extension that turns emails into Monday.com items — built at Arrivy.",
    description:
      "A productivity extension that lives in Gmail and pushes structured email content straight into Monday.com boards for workflow automation. Built and deployed during my internship at Arrivy, alongside a complete Software Requirements Specification (SRS) for engineering alignment.",
    highlights: [
      "One-click email → Monday.com item",
      "Production-ready & deployed",
      "Gmail + Monday.com integration",
      "Authored full SRS document",
    ],
    stack: ["JavaScript", "Chrome APIs", "Monday.com API", "OAuth"],
    accent: "accent",
    preview: "extension",
  },
  {
    id: "stroke-prediction",
    title: "AI Stroke Prediction",
    category: "Machine Learning",
    year: "2023",
    summary:
      "ML models that flag stroke risk from patient data — up to 90% accuracy, served via Flask.",
    description:
      "A machine-learning service that estimates stroke risk from health indicators, with models reaching up to 90% accuracy. Trained and tuned in Python and exposed through a clean Flask API so the prediction is usable in practice, not just a notebook — with explainable risk factors.",
    highlights: [
      "Up to 90% model accuracy",
      "Explainable risk factors",
      "Flask REST API",
      "Reproducible Python pipeline",
    ],
    stack: ["Python", "Flask", "scikit-learn", "Pandas"],
    accent: "amber",
    preview: "ml",
  },
];

export type Certification = {
  title: string;
  issuer: string;
  badge: string;
  note: string;
};

export const certifications: Certification[] = [
  {
    title: "Claude Code in Action",
    issuer: "Anthropic",
    badge: "Certified",
    note: "Agentic coding workflows with Claude Code — building real software with AI.",
  },
  {
    title: "Claude for Developers",
    issuer: "Anthropic",
    badge: "Certified",
    note: "Building production applications on the Claude API and developer platform.",
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  remote?: boolean;
  summary: string;
  tags: string[];
  kind: "work" | "education";
};

export const experience: Experience[] = [
  {
    company: "Dubizzle Labs",
    role: "Software Engineer",
    period: "Jun 2025 — Present",
    location: "Dubai, UAE",
    remote: true,
    summary:
      "Building 40+ production Laravel APIs for real-estate platforms serving 5M+ monthly users across the UAE, KSA & Pakistan, plus 15+ Filament 4.0 admin dashboards for Bayut & Property Monitor (+25–35% team efficiency).",
    tags: ["Laravel", "Filament", "APIs"],
    kind: "work",
  },
  {
    company: "Arrivy",
    role: "Software Engineer Intern",
    period: "Jun 2024 — Jul 2024",
    location: "Washington, USA",
    remote: true,
    summary:
      "Built and deployed the Gmail → Monday.com Chrome extension for workflow automation, and authored a complete Software Requirements Specification for engineering alignment.",
    tags: ["Chrome Ext", "Automation", "SRS"],
    kind: "work",
  },
  {
    company: "Systems Limited",
    role: "DevOps Intern",
    period: "Aug 2024 — Sep 2024",
    location: "Pakistan",
    summary:
      "Worked across Docker, Linux, CI/CD pipelines, and cloud deployment workflows.",
    tags: ["Docker", "CI/CD", "Cloud"],
    kind: "work",
  },
  {
    company: "FAST-NUCES",
    role: "BSc Computer Science",
    period: "2021 — 2025",
    location: "Pakistan",
    summary:
      "Bachelor of Science in Computer Science from FAST National University of Computer and Emerging Sciences. Specialized in software engineering and full-stack development.",
    tags: ["Computer Science", "Software Engineering"],
    kind: "education",
  },
  {
    company: "University of North Texas",
    role: "Master's in Data Science",
    period: "2025 — 2026",
    location: "Denton, Texas, USA",
    summary:
      "Graduate studies in Data Science at University of North Texas. Focus on machine learning, statistical analysis, and data engineering for business applications.",
    tags: ["Data Science", "Machine Learning", "Analytics"],
    kind: "education",
  },
];

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Certs", href: "#certs" },
  { label: "Path", href: "#path" },
  { label: "Contact", href: "#contact" },
];
