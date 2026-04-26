"use client";

import { useEffect, useRef, useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function Skills() {
  const { data } = usePortfolio();
  const { skills, tools, languages } = data;
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

  return (
    <section id="competences" ref={sectionRef} className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold font-[Poppins] mb-4">
            Mes <span className="gradient-text">Compétences</span>
          </h2>
          <div className="section-line mx-auto mb-6" />
          <p className="text-text-secondary max-w-2xl mx-auto">Les technologies et outils que je maîtrise pour créer des solutions web performantes.</p>
        </div>

        {/* Skills Bars */}
        <div className={`grid md:grid-cols-2 gap-6 mb-12 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {skills.map((skill, i) => (
            <div key={skill.name} className="glass-card p-5" style={{ transitionDelay: `${200 + i * 100}ms` }}>
              <div className="flex justify-between items-center mb-3">
                <span className="text-text-primary font-medium">{skill.name}</span>
                <span className="text-accent text-sm font-semibold">{skill.level}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="skill-bar-fill h-full rounded-full bg-gradient-to-r from-accent to-accent-secondary"
                  style={{
                    "--skill-level": `${skill.level}%`,
                    width: isVisible ? `${skill.level}%` : "0%",
                    transitionDelay: `${400 + i * 150}ms`,
                  } as React.CSSProperties}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Tools */}
          <div className={`glass-card p-8 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h3 className="text-xl font-bold font-[Poppins] text-text-primary mb-5">Outils & Environnement</h3>
            <div className="flex flex-wrap gap-3">
              {tools.map((tool) => (
                <span key={tool} className="tech-tag">{tool}</span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className={`glass-card p-8 transition-all duration-700 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h3 className="text-xl font-bold font-[Poppins] text-text-primary mb-5">Langues</h3>
            <div className="space-y-4">
              {languages.map((lang) => (
                <div key={lang.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-text-primary font-medium">{lang.name}</span>
                    <span className="text-text-secondary text-sm">{lang.level}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-accent-secondary transition-all duration-1000"
                      style={{ width: isVisible ? `${lang.percent}%` : "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
