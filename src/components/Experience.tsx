"use client";

import { useEffect, useRef, useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function Experience() {
  const { data } = usePortfolio();
  const { education } = data;
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      title: "Freelance Étudiant",
      place: "Travail à distance",
      period: "2025 — Présent",
      details: [
        "Correction de bugs et amélioration de projets clients",
        "Refonte visuelle et optimisation de sites web",
        "Communication directe avec les clients",
      ],
      type: "work",
    },
    {
      title: education[0].degree,
      place: education[0].school,
      period: education[0].period,
      details: education[0].details,
      type: "education",
    },
  ];

  return (
    <section id="parcours" ref={sectionRef} className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold font-[Poppins] mb-4">
            Mon <span className="gradient-text">Parcours</span>
          </h2>
          <div className="section-line mx-auto mb-6" />
          <p className="text-text-secondary max-w-2xl mx-auto">Formation et expériences qui ont forgé mes compétences.</p>
        </div>

        {/* Timeline */}
        <div className="relative pl-10">
          <div className="timeline-line" />

          {experiences.map((exp, i) => (
            <div
              key={exp.title}
              className={`relative mb-12 last:mb-0 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
              style={{ transitionDelay: `${300 + i * 200}ms` }}
            >
              <div className="timeline-dot" />

              <div className="glass-card p-6 ml-6">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-sm font-semibold text-accent">
                    {exp.type === "work" ? "PRO" : "EDU"}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                    {exp.period}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-[Poppins] text-text-primary mb-1">{exp.title}</h3>
                <p className="text-text-secondary text-sm mb-4">{exp.place}</p>
                <ul className="space-y-2">
                  {exp.details.map((d) => (
                    <li key={d} className="text-text-secondary text-sm flex items-start gap-2">
                      <span className="text-accent mt-0.5 text-xs">▸</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Section Mes Documents supprimée (doublon avec la Navbar) */}
      </div>
    </section>
  );
}
