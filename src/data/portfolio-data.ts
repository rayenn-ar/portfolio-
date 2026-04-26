// ============================================
// 📁 DONNÉES DU PORTFOLIO — AYARI RAYEN
// ============================================
// Modifiez ce fichier pour personnaliser tout le contenu
// du portfolio sans toucher au code des composants.

export const personalInfo = {
  firstName: "Rayen",
  lastName: "Ayari",
  title: "Développeur Web & Desktop Full-Stack",
  email: "ayarirayen539@gmail.com",
  phone: "+216 94 816 735",
  location: "Nabeul, Tunisie",
  github: "https://github.com/rayenn-ar",
  linkedin: "https://linkedin.com/in/ayari-rayen-98242630a",
  cvPath: "/CV_Ayari_Rayen_Pro.html",
  available: true,
};

export const bio = {
  short:
    "Étudiant motivé et autonome en développement web, passionné par la création de sites web modernes et fonctionnels.",
  full: "Capable de travailler à distance avec rigueur, de respecter les délais et de m'adapter rapidement aux besoins des clients. À la recherche de missions freelance pour mettre en pratique mes compétences techniques et accompagner les entreprises dans leur présence en ligne.",
  motivation:
    "Ce qui me motive : Transformer des idées en solutions digitales concrètes et performantes.",
};

export const strengths = {
  technical: {
    strong: [
      "Maîtrise de HTML/CSS",
      "JavaScript & React",
      "Bases de données MySQL",
      "Git & GitHub",
      "Résolution de bugs",
    ],
    toImprove: [
      "Backend avancé (Node.js)",
      "Design UI/UX",
      "Tests automatisés",
    ],
  },
  soft: {
    strong: [
      "Autonomie",
      "Travail en équipe",
      "Curiosité",
      "Gestion du temps",
      "Communication",
    ],
    toImprove: [
      "Prise de parole en public",
      "Perfectionnisme (j'apprends à prioriser)",
    ],
  },
};

export const skills = [
  { name: "React 18", level: 85, category: "frontend" },
  { name: "Next.js", level: 80, category: "frontend" },
  { name: "TypeScript", level: 75, category: "frontend" },
  { name: "JavaScript", level: 80, category: "frontend" },
  { name: "TailwindCSS", level: 75, category: "frontend" },
  { name: "Node.js", level: 70, category: "backend" },
  { name: "PostgreSQL", level: 65, category: "backend" },
  { name: "MongoDB", level: 60, category: "backend" },
  { name: "PHP/MySQL", level: 60, category: "backend" },
  { name: "Electron", level: 60, category: "desktop" },
  { name: "Tauri", level: 55, category: "desktop" },
  { name: "Git", level: 80, category: "tools" },
  { name: "GitHub", level: 80, category: "tools" },
];

export const tools = [
  "VS Code",
  "Figma",
  "GitHub",
  "Postman",
  "Chrome DevTools",
  "npm",
];

export const projects = [
  {
    id: 1,
    title: "Solutions de Gestion & Caisse (Desktop)",
    description:
      "Développement complet d'un système de caisse pour supérette, gestion de dépôts fournisseurs, système complet pour café/restaurant.",
    role: "Développeur freelance — conception, développement, optimisation.",
    technologies: ["React", "Electron", "Tauri", "Node.js"],
    type: "Freelance / Indépendant",
    date: "2024 - Présent",
    results: [
      "Interface rapide et ergonomique",
      "Gestion des ventes, stocks, statistiques",
      "Applications desktop performantes",
    ],
    github: "https://github.com/rayenn-ar",
    demo: "#",
    image: "/projects/gestion-caisse.jpg",
  },
  {
    id: 2,
    title: "Plateforme E-commerce Complète",
    description:
      "Conception d'une boutique en ligne dynamique, gestion panier, optimisation base NoSQL.",
    role: "Développeur fullstack — conception, développement, optimisation.",
    technologies: ["React 18", "Node.js", "MongoDB"],
    type: "Projet Indépendant",
    date: "2025",
    results: [
      "Site responsive et sécurisé",
      "Gestion catalogue et panier",
      "Optimisation base de données",
    ],
    github: "https://github.com/rayenn-ar",
    demo: "#",
    image: "/projects/ecommerce.jpg",
  },
  {
    id: 3,
    title: "App de Réservation - Salon de Coiffure",
    description:
      "Application web sur mesure pour prise de rendez-vous, base de données relationnelle, typage TypeScript.",
    role: "Développeur freelance — conception, développement.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    type: "Mission Freelance",
    date: "2026",
    results: [
      "Gestion sécurisée des clients",
      "Base de données relationnelle",
      "Code robuste et maintenable",
    ],
    github: "https://github.com/rayenn-ar",
    demo: "#",
    image: "/projects/reservation.jpg",
  },
];

export const education = [
  {
    degree: "Business Computing (2ème année)",
    school: "IT Business School - Nabeul",
    period: "2025 - 2026",
    details: [
      "Spécialisation en ingénierie logicielle, algorithmique avancée, architectures web et bases de données.",
    ],
  },
  {
    degree: "Génie Logiciel et Sciences Informatiques",
    school: "Faculté des Sciences de Gabès",
    period: "2023 - 2025",
    details: [
      "Programmation, algorithmique, bases de données.",
    ],
  },
];

export const languages = [
  { name: "Arabe", level: "Langue maternelle", percent: 100 },
  { name: "Français", level: "Bon niveau", percent: 75 },
  { name: "Anglais", level: "Intermédiaire", percent: 50 },
];

export const qualities = [
  { label: "Sérieux & Responsable", icon: "🎯" },
  { label: "Autonome", icon: "🚀" },
  { label: "Curieux & Motivé", icon: "💡" },
  { label: "Apprentissage Rapide", icon: "⚡" },
  { label: "Esprit Logique", icon: "🧠" },
  { label: "Bonne Communication", icon: "🤝" },
];

export const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "À propos", href: "#apropos" },
  { label: "Compétences", href: "#competences" },
  { label: "Projets", href: "#projets" },
  { label: "Parcours", href: "#parcours" },
  { label: "Contact", href: "#contact" },
];
