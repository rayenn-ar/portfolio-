"use client";

import { useState, useEffect } from "react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function Navbar() {
  const { data } = usePortfolio();
  const { navLinks, personalInfo } = data;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#accueil");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detect active section
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(`#${sections[i]}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href: string) => {
    setIsMobileOpen(false);
    setActiveSection(href);
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "navbar-glass py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#accueil"
          className="text-2xl font-bold font-[Poppins] tracking-tight group"
        >
          <span className="gradient-text group-hover:opacity-80 transition-opacity">
            {personalInfo.firstName[0]}
            {personalInfo.lastName[0]}
          </span>
          <span className="text-text-muted text-sm ml-1 font-normal hidden sm:inline">
            .dev
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleClick(link.href)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeSection === link.href
                  ? "text-accent bg-accent/10"
                  : "text-text-secondary hover:text-text-primary hover:bg-white/5"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Button Desktop */}
        <a
          href={personalInfo.cvPath}
          download
          className="hidden md:inline-flex items-center gap-2 btn-gradient text-white px-5 py-2.5 rounded-xl text-sm font-semibold relative z-10"
        >
          <span className="relative z-10">Télécharger CV</span>
        </a>

        {/* Mobile Hamburger */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Ouvrir ou fermer le menu de navigation"
          aria-expanded={isMobileOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`w-6 h-0.5 bg-text-primary rounded transition-all duration-300 ${
              isMobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-text-primary rounded transition-all duration-300 ${
              isMobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-text-primary rounded transition-all duration-300 ${
              isMobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          isMobileOpen ? "max-h-[500px] opacity-100 translate-y-0 shadow-2xl ring-2 ring-accent/30" : "max-h-0 opacity-0 -translate-y-4"
        }`}
        tabIndex={-1}
        aria-hidden={!isMobileOpen}
      >
        <div className="px-6 py-4 bg-surface/95 backdrop-blur-xl border-t border-border mt-2 rounded-b-2xl">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleClick(link.href)}
              className={`block py-3 px-4 rounded-lg text-base font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                activeSection === link.href
                  ? "text-accent bg-accent/10"
                  : "text-text-secondary hover:text-text-primary hover:bg-white/5"
              }`}
              style={{ animationDelay: `${i * 50}ms` }}
              tabIndex={isMobileOpen ? 0 : -1}
              aria-current={activeSection === link.href ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}
          <a
            href={personalInfo.cvPath}
            download
            className="block mt-3 text-center btn-gradient text-white px-5 py-3 rounded-xl text-sm font-semibold relative z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            tabIndex={isMobileOpen ? 0 : -1}
          >
            <span className="relative z-10">Télécharger CV</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
