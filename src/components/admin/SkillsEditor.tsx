"use client";

import { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function SkillsEditor({ token }: { token: string }) {
  const { data, updateData } = usePortfolio();
  const [skills, setSkills] = useState<any[]>(data.skills || []);
  const [tools, setTools] = useState<string[]>(data.tools || []);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const newData = { ...data, skills, tools };
    await updateData(newData, token);
    setIsSaving(false);
    alert("Compétences sauvegardées avec succès !");
  };

  const addSkill = () => {
    setSkills([...skills, { name: "Nouvelle comp.", level: 50, category: "frontend" }]);
  };

  const updateSkill = (index: number, field: string, value: any) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], [field]: value };
    setSkills(updated);
  };

  const removeSkill = (index: number) => {
    const updated = [...skills];
    updated.splice(index, 1);
    setSkills(updated);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-[Poppins]">Gérer les Compétences</h2>
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="btn-gradient text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50"
        >
          {isSaving ? "Sauvegarde..." : "Sauvegarder"}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Technical Skills */}
        <div className="glass-card p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-border pb-3">
            <h3 className="text-lg font-bold">Langages & Frameworks</h3>
            <button onClick={addSkill} className="text-xs bg-surface border border-border px-2 py-1 rounded hover:border-accent">
              + Ajouter
            </button>
          </div>
          
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-3 group">
                <input 
                  type="text" 
                  value={skill.name} 
                  onChange={(e) => updateSkill(index, "name", e.target.value)}
                  className="flex-1 bg-surface border border-border rounded py-1.5 px-2 text-sm focus:border-accent outline-none"
                />
                <input 
                  type="number" 
                  min="0" max="100"
                  value={skill.level} 
                  onChange={(e) => updateSkill(index, "level", parseInt(e.target.value) || 0)}
                  className="w-16 bg-surface border border-border rounded py-1.5 px-2 text-sm text-center focus:border-accent outline-none"
                />
                <span className="text-xs text-text-muted">%</span>
                <select 
                  value={skill.category}
                  onChange={(e) => updateSkill(index, "category", e.target.value)}
                  className="bg-surface border border-border rounded py-1.5 px-2 text-sm text-text-secondary focus:border-accent outline-none"
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="tools">Outils</option>
                </select>
                <button onClick={() => removeSkill(index)} className="text-text-muted hover:text-red-500">✕</button>
              </div>
            ))}
          </div>
        </div>

        {/* Tools and Environment */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-lg font-bold border-b border-border pb-3">Outils & Environnement</h3>
          <div>
            <label className="block text-sm text-text-secondary mb-2">Séparez les outils par une virgule</label>
            <textarea 
              rows={4}
              value={tools.join(", ")}
              onChange={(e) => setTools(e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
              className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none resize-none leading-relaxed"
              placeholder="Git, VS Code, Figma, Postman..."
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {tools.map(tool => (
              <span key={tool} className="tech-tag text-xs">{tool}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
