"use client";

import { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import PersonalInfoEditor from "@/components/admin/PersonalInfoEditor";
import ProjectsEditor from "@/components/admin/ProjectsEditor";
import SkillsEditor from "@/components/admin/SkillsEditor";
import ExperienceEditor from "@/components/admin/ExperienceEditor";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [activeTab, setActiveTab] = useState("infos");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const { data, isLoading } = usePortfolio();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsLoggedIn(true);
      setToken(password); // Simple token for now
    } else {
      setLoginError("Mot de passe incorrect");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="glass-card p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold font-[Poppins] text-center mb-6">🔒 Administration</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all pr-12"
                  placeholder="Entrez le mot de passe"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {loginError && <p className="text-red-500 text-sm mt-2">{loginError}</p>}
            </div>
            <button type="submit" className="w-full btn-gradient text-white py-3 rounded-xl font-semibold">
              <span className="relative z-10">Se connecter</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  const tabs = [
    { id: "infos", label: "Infos Personnelles" },
    { id: "skills", label: "Compétences" },
    { id: "projects", label: "Projets" },
    { id: "experience", label: "Parcours" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold font-[Poppins] gradient-text">Portfolio Admin</h1>
            <a href="/" target="_blank" className="text-sm text-text-secondary hover:text-accent flex items-center gap-1">
              Voir le site <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="text-sm text-text-muted hover:text-red-400 transition-colors"
          >
            Déconnexion
          </button>
        </div>
        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6 flex gap-6 overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id 
                  ? "border-accent text-accent" 
                  : "border-transparent text-text-secondary hover:text-text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "infos" && <PersonalInfoEditor token={token} />}
        {activeTab === "skills" && <SkillsEditor token={token} />}
        {activeTab === "projects" && <ProjectsEditor token={token} />}
        {activeTab === "experience" && <ExperienceEditor token={token} />}
      </main>
    </div>
  );
}
