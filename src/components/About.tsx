"use client";

import { useEffect, useRef, useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/data/translations";

export default function About() {
  const { data } = usePortfolio();
  const { qualities } = data;
  const { lang } = useLanguage();
  const tr = t(lang);
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
    <section id="apropos" ref={sectionRef} className="py-24 px-6 bg-surface relative">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold font-[Poppins] mb-4">
            {tr.about.title} <span className="gradient-text">{tr.about.titleHighlight}</span>
          </h2>
          <div className="section-line mx-auto mb-6" />
          <p className="text-text-secondary max-w-2xl mx-auto">{tr.about.subtitle}</p>
        </div>

        <div className={`glass-card p-8 mb-12 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-text-primary text-lg leading-relaxed mb-4">{tr.about.bio.short}</p>
          <p className="text-text-secondary leading-relaxed mb-4">{tr.about.bio.full}</p>
          <p className="text-accent font-medium italic">{tr.about.bio.motivation}</p>
        </div>

        <div className={`grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {qualities.map((q, i) => (
            <div key={q.label} className="glass-card p-5 text-center group cursor-default" style={{ transitionDelay: `${300 + i * 80}ms` }}>
              <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform duration-300">{q.icon}</span>
              <span className="text-text-primary text-sm font-medium">{q.label}</span>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className={`transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <h3 className="text-xl font-bold font-[Poppins] mb-4 text-text-primary">{tr.about.technicalSkills}</h3>
            <div className="glass-card p-6 mb-4">
              <h4 className="text-success font-semibold text-sm uppercase tracking-wider mb-3">{tr.about.strengths}</h4>
              <div className="flex flex-wrap gap-2">
                {tr.about.technicalStrong.map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-lg bg-success/10 text-success text-sm border border-success/20">{s}</span>
                ))}
              </div>
            </div>
            <div className="glass-card p-6">
              <h4 className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">{tr.about.weaknesses}</h4>
              <div className="flex flex-wrap gap-2">
                {tr.about.technicalToImprove.map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-lg bg-amber-400/10 text-amber-400 text-sm border border-amber-400/20">{s}</span>
                ))}
              </div>
            </div>
          </div>

          <div className={`transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <h3 className="text-xl font-bold font-[Poppins] mb-4 text-text-primary">{tr.about.softSkills}</h3>
            <div className="glass-card p-6 mb-4">
              <h4 className="text-success font-semibold text-sm uppercase tracking-wider mb-3">{tr.about.strengths}</h4>
              <div className="flex flex-wrap gap-2">
                {tr.about.softStrong.map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-lg bg-success/10 text-success text-sm border border-success/20">{s}</span>
                ))}
              </div>
            </div>
            <div className="glass-card p-6">
              <h4 className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">{tr.about.weaknesses}</h4>
              <div className="flex flex-wrap gap-2">
                {tr.about.softToImprove.map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-lg bg-amber-400/10 text-amber-400 text-sm border border-amber-400/20">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
