"use client";

import { useEffect, useRef, useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/data/translations";

export default function Projects() {
  const { data } = usePortfolio();
  const { projects } = data;
  const { lang } = useLanguage();
  const tr = t(lang);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projets" ref={sectionRef} className="py-24 px-6 bg-surface relative">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold font-[Poppins] mb-4">
            {tr.projects.title} <span className="gradient-text">{tr.projects.titleHighlight}</span>
          </h2>
          <div className="section-line mx-auto mb-6" />
          <p className="text-text-secondary max-w-2xl mx-auto">
            {tr.projects.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`glass-card overflow-hidden group transition-all duration-700 focus-within:ring-2 focus-within:ring-accent ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
              tabIndex={0}
              aria-label={`Projet : ${project.title}`}
            >
              {/* Project Image Placeholder */}
              <div className="h-44 sm:h-48 bg-gradient-to-br from-accent/20 to-accent-secondary/20 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl opacity-20 group-hover:scale-110 group-focus-within:scale-110 transition-transform duration-500 text-accent">
                    {i === 0 ? "</> " : i === 1 ? "{ }" : "< />"}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur text-xs text-white font-medium">
                    {project.date}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60" />
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="text-accent text-xs font-semibold uppercase tracking-wider">{project.type}</span>
                <h3 className="text-lg font-bold font-[Poppins] text-text-primary mt-1 mb-3 group-hover:text-accent group-focus-within:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">{project.description}</p>

                {/* Results */}
                <ul className="space-y-1 mb-4">
                  {project.results.map((r) => (
                    <li key={r} className="text-text-muted text-xs flex items-start gap-2">
                      <span className="text-success mt-0.5">✓</span>
                      {r}
                    </li>
                  ))}
                </ul>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag text-xs bg-accent/10 text-accent px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2.5 rounded-lg border border-border text-text-secondary text-sm font-medium hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-300"
                    aria-label={`GitHub ${project.title}`}
                  >
                    {tr.projects.code} →
                  </a>
                  {project.demo !== "#" && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2.5 rounded-lg bg-accent/10 text-accent text-sm font-medium hover:bg-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-300"
                      aria-label={`Demo ${project.title}`}
                    >
                      {tr.projects.demo} →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
