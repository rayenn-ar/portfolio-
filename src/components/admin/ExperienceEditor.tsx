"use client";

import { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function ExperienceEditor({ token }: { token: string }) {
  const { data, updateData } = usePortfolio();
  const [education, setEducation] = useState<any[]>(data.education || []);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const newData = { ...data, education };
    await updateData(newData, token);
    setIsSaving(false);
    alert("Parcours sauvegardé avec succès !");
  };

  const addExperience = () => {
    setEducation([
      {
        degree: "Nouveau Diplôme / Poste",
        school: "Établissement / Entreprise",
        period: "Année - Année",
        details: ["Détail 1", "Détail 2"]
      },
      ...education
    ]);
  };

  const updateExperience = (index: number, field: string, value: any) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    setEducation(updated);
  };

  const removeExperience = (index: number) => {
    if (confirm("Supprimer cet élément ?")) {
      const updated = [...education];
      updated.splice(index, 1);
      setEducation(updated);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-[Poppins]">Gérer le Parcours</h2>
        <div className="flex items-center gap-3">
          <button onClick={addExperience} className="btn-outline text-text-primary px-4 py-2 rounded-lg text-sm font-medium">
            + Ajouter
          </button>
          <button 
            onClick={handleSave} 
            disabled={isSaving}
            className="btn-gradient text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50"
          >
            {isSaving ? "Sauvegarde..." : "Sauvegarder"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {education.map((exp, index) => (
          <div key={index} className="glass-card p-6 relative">
            <button 
              onClick={() => removeExperience(index)}
              className="absolute top-4 right-4 text-text-muted hover:text-red-500 transition-colors"
            >
              ✕
            </button>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Titre (Diplôme ou Poste)</label>
                  <input type="text" value={exp.degree} onChange={e => updateExperience(index, "degree", e.target.value)} className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Établissement / Entreprise</label>
                  <input type="text" value={exp.school} onChange={e => updateExperience(index, "school", e.target.value)} className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Période (ex: 2024 - Présent)</label>
                  <input type="text" value={exp.period} onChange={e => updateExperience(index, "period", e.target.value)} className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-text-secondary mb-1">Détails / Missions (séparés par un saut de ligne)</label>
                <textarea 
                  rows={7} 
                  value={exp.details.join("\n")} 
                  onChange={e => updateExperience(index, "details", e.target.value.split("\n").filter(Boolean))} 
                  className="w-full h-[calc(100%-24px)] bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none resize-none" 
                />
              </div>
            </div>
          </div>
        ))}
        {education.length === 0 && (
          <div className="text-center py-12 text-text-muted">
            Aucun parcours enregistré.
          </div>
        )}
      </div>
    </div>
  );
}
