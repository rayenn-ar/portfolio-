"use client";

import { useEffect, useRef, useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/data/translations";

export default function Contact() {
  const { data } = usePortfolio();
  const { personalInfo } = data;
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
    <section id="contact" ref={sectionRef} className="py-24 px-6 bg-surface relative">
      <div className="max-w-4xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold font-[Poppins] mb-4">
            {tr.contact.title} <span className="gradient-text">{tr.contact.titleHighlight}</span>
          </h2>
          <div className="section-line mx-auto mb-6" />
          <p className="text-text-secondary max-w-2xl mx-auto">
            {tr.contact.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info Cards */}
          <div className={`space-y-4 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <a href={`mailto:${personalInfo.email}`} className="glass-card p-5 flex items-center gap-4 group cursor-pointer block">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-text-muted text-xs uppercase tracking-wider">{tr.contact.email}</p>
                <p className="text-text-primary font-medium group-hover:text-accent transition-colors">{personalInfo.email}</p>
              </div>
            </a>

            <a href={`tel:${personalInfo.phone}`} className="glass-card p-5 flex items-center gap-4 group cursor-pointer block">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-text-muted text-xs uppercase tracking-wider">{tr.contact.phone}</p>
                <p className="text-text-primary font-medium group-hover:text-accent transition-colors">{personalInfo.phone}</p>
              </div>
            </a>

            <div className="glass-card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-text-muted text-xs uppercase tracking-wider">{tr.contact.location}</p>
                <p className="text-text-primary font-medium">{personalInfo.location}</p>
              </div>
            </div>

            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="glass-card p-5 flex items-center gap-4 group cursor-pointer block">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
                <p className="text-text-primary font-medium group-hover:text-accent transition-colors">{personalInfo.github.replace('https://', '')}</p>
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <form className="glass-card p-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="contact-name" className="block text-text-secondary text-sm font-medium mb-2">Nom complet</label>
                <input id="contact-name" type="text" placeholder="Votre nom" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-text-secondary text-sm font-medium mb-2">Email</label>
                <input id="contact-email" type="email" placeholder="votre@email.com" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-text-secondary text-sm font-medium mb-2">{tr.contact.messageLabel}</label>
                <textarea id="contact-message" rows={4} placeholder={tr.contact.messagePlaceholder} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none" />
              </div>
              <button type="submit" className="w-full btn-gradient text-white py-3.5 rounded-xl font-semibold relative z-10">
                <span className="relative z-10">{tr.contact.sendBtn} →</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
