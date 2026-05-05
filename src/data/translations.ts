import type { Lang } from "@/context/LanguageContext";

const translations = {
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      skills: "Compétences",
      projects: "Projets",
      experience: "Parcours",
      contact: "Contact",
      downloadCV: "Télécharger CV",
      cvPath: "/CV_Ayari_Rayen_Pro.html",
    },
    hero: {
      greeting: "Salut, je suis",
      seeProjects: "Voir mes projets",
      downloadCV: "Télécharger CV",
      bio: {
        short:
          "Étudiant motivé et autonome en développement web, passionné par la création de sites web modernes et fonctionnels.",
        full: "Capable de travailler à distance avec rigueur, de respecter les délais et de m'adapter rapidement aux besoins des clients. À la recherche de missions freelance pour mettre en pratique mes compétences techniques et accompagner les entreprises dans leur présence en ligne.",
        motivation:
          "Ce qui me motive : Transformer des idées en solutions digitales concrètes et performantes.",
      },
    },
    about: {
      title: "À",
      titleHighlight: "Propos",
      subtitle: "Découvrez qui je suis, ce qui me motive et comment je peux vous aider.",
      technicalSkills: "Compétences Techniques",
      softSkills: "Soft Skills",
      strengths: "Points Forts",
      weaknesses: "Points Faibles",
      bio: {
        short:
          "Étudiant motivé et autonome en développement web, passionné par la création de sites web modernes et fonctionnels.",
        full: "Capable de travailler à distance avec rigueur, de respecter les délais et de m'adapter rapidement aux besoins des clients. À la recherche de missions freelance pour mettre en pratique mes compétences techniques et accompagner les entreprises dans leur présence en ligne.",
        motivation:
          "Ce qui me motive : Transformer des idées en solutions digitales concrètes et performantes.",
      },
      technicalStrong: [
        "Maîtrise de HTML/CSS",
        "JavaScript & React",
        "Bases de données MySQL",
        "Git & GitHub",
        "Résolution de bugs",
      ],
      technicalToImprove: ["Backend avancé (Node.js)", "Design UI/UX", "Tests automatisés"],
      softStrong: ["Communication claire", "Travail en autonomie", "Respect des délais"],
      softToImprove: ["Gestion du stress", "Prise de parole en public"],
    },
    skills: {
      title: "Mes",
      titleHighlight: "Compétences",
      subtitle: "Les technologies et outils que je maîtrise pour créer des solutions web performantes.",
      tools: "Outils & Environnement",
      languages: "Langues",
    },
    projects: {
      title: "Mes",
      titleHighlight: "Projets",
      subtitle:
        "Voici les projets sur lesquels j'ai travaillé. Chaque projet m'a permis de développer de nouvelles compétences.",
      demo: "Démo",
      code: "Code",
    },
    experience: {
      title: "Mon",
      titleHighlight: "Parcours",
      subtitle: "Formation et expériences qui ont forgé mes compétences.",
      workLabel: "PRO",
      eduLabel: "EDU",
      freelanceTitle: "Freelance Étudiant",
      freelancePlace: "Travail à distance",
      freelancePeriod: "2025 — Présent",
      freelanceDetails: [
        "Correction de bugs et amélioration de projets clients",
        "Refonte visuelle et optimisation de sites web",
        "Communication directe avec les clients",
      ],
    },
    contact: {
      title: "Me",
      titleHighlight: "Contacter",
      subtitle: "Vous avez un projet en tête ou une question ? N'hésitez pas à me contacter !",
      email: "Email",
      phone: "Téléphone",
      location: "Localisation",
      github: "GitHub",
      available: "Disponible",
      availableText: "Disponible pour des missions freelance",
      sendMessage: "Envoyer un message",
      messageLabel: "Votre message",
      messagePlaceholder: "Décrivez votre projet ou posez votre question...",
      sendBtn: "Envoyer le message",
      sendSubtext: "Je réponds généralement sous 24h",
    },
    footer: {
      rights: "Tous droits réservés.",
    },
  },

  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
      downloadCV: "Download CV",
      cvPath: "/CV_Ayari_Rayen_Pro_EN.html",
    },
    hero: {
      greeting: "Hi, I am",
      seeProjects: "See my projects",
      downloadCV: "Download CV",
      bio: {
        short:
          "Motivated and self-driven web development student, passionate about building modern and functional websites.",
        full: "Able to work remotely with discipline, meet deadlines, and quickly adapt to client needs. Looking for freelance missions to apply my technical skills and help businesses grow their online presence.",
        motivation: "What drives me: Turning ideas into concrete, high-performing digital solutions.",
      },
    },
    about: {
      title: "About",
      titleHighlight: "Me",
      subtitle: "Discover who I am, what motivates me, and how I can help you.",
      technicalSkills: "Technical Skills",
      softSkills: "Soft Skills",
      strengths: "Strengths",
      weaknesses: "Areas to Improve",
      bio: {
        short:
          "Motivated and self-driven web development student, passionate about building modern and functional websites.",
        full: "Able to work remotely with discipline, meet deadlines, and quickly adapt to client needs. Looking for freelance missions to apply my technical skills and help businesses grow their online presence.",
        motivation: "What drives me: Turning ideas into concrete, high-performing digital solutions.",
      },
      technicalStrong: [
        "HTML/CSS mastery",
        "JavaScript & React",
        "MySQL databases",
        "Git & GitHub",
        "Bug resolution",
      ],
      technicalToImprove: ["Advanced backend (Node.js)", "UI/UX design", "Automated testing"],
      softStrong: ["Clear communication", "Independent work", "Meeting deadlines"],
      softToImprove: ["Stress management", "Public speaking"],
    },
    skills: {
      title: "My",
      titleHighlight: "Skills",
      subtitle: "The technologies and tools I master to build high-performance web solutions.",
      tools: "Tools & Environment",
      languages: "Languages",
    },
    projects: {
      title: "My",
      titleHighlight: "Projects",
      subtitle:
        "Here are the projects I have worked on. Each one helped me develop new skills and tackle real challenges.",
      demo: "Demo",
      code: "Code",
    },
    experience: {
      title: "My",
      titleHighlight: "Journey",
      subtitle: "Education and experiences that shaped my skills.",
      workLabel: "WORK",
      eduLabel: "EDU",
      freelanceTitle: "Student Freelancer",
      freelancePlace: "Remote work",
      freelancePeriod: "2025 — Present",
      freelanceDetails: [
        "Bug fixing and improvement of client projects",
        "Visual redesign and website optimization",
        "Direct client communication",
      ],
    },
    contact: {
      title: "Get in",
      titleHighlight: "Touch",
      subtitle: "Have a project in mind or a question? Feel free to reach out!",
      email: "Email",
      phone: "Phone",
      location: "Location",
      github: "GitHub",
      available: "Available",
      availableText: "Available for freelance missions",
      sendMessage: "Send a message",
      messageLabel: "Your message",
      messagePlaceholder: "Describe your project or ask your question...",
      sendBtn: "Send message",
      sendSubtext: "I usually reply within 24 hours",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
};

export function t(lang: Lang) {
  return translations[lang];
}
