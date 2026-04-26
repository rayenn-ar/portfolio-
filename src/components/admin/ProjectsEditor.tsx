"use client";

import { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function ProjectsEditor({ token }: { token: string }) {
  const { data, updateData } = usePortfolio();
  const [projects, setProjects] = useState<any[]>(data.projects || []);
  const [isSaving, setIsSaving] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [githubUsername, setGithubUsername] = useState(data.personalInfo.github.split("/").pop() || "");

  const handleSave = async () => {
    setIsSaving(true);
    const newData = { ...data, projects };
    await updateData(newData, token);
    setIsSaving(false);
    alert("Projets sauvegardés avec succès !");
  };

  const importGitHub = async () => {
    if (!githubUsername) return alert("Veuillez entrer un nom d'utilisateur GitHub");
    setIsImporting(true);
    try {
      const res = await fetch(`/api/github?username=${githubUsername}`);
      if (!res.ok) throw new Error("Erreur lors de l'import");
      const githubProjects = await res.json();
      
      // Filter out existing github projects to avoid duplicates, then prepend new ones
      const nonGithubProjects = projects.filter(p => !p.id.toString().startsWith("github-"));
      setProjects([...githubProjects, ...nonGithubProjects]);
      alert(`${githubProjects.length} projets importés avec succès ! Pensez à sauvegarder.`);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'importation GitHub.");
    } finally {
      setIsImporting(false);
    }
  };

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: "Nouveau Projet",
      description: "Description du projet...",
      role: "Développeur",
      technologies: [],
      type: "Projet Personnel",
      date: new Date().getFullYear().toString(),
      results: [],
      github: "#",
      demo: "#",
      image: "/projects/placeholder.jpg"
    };
    setProjects([newProject, ...projects]);
  };

  const updateProject = (index: number, field: string, value: any) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  const removeProject = (index: number) => {
    if (confirm("Supprimer ce projet ?")) {
      const updated = [...projects];
      updated.splice(index, 1);
      setProjects(updated);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
      });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      updateProject(index, "image", url);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Erreur lors de l'upload de l'image.");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold font-[Poppins]">Gérer les Projets</h2>
        <div className="flex items-center gap-3">
          <button onClick={addProject} className="btn-outline text-text-primary px-4 py-2 rounded-lg text-sm font-medium">
            + Nouveau Projet
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

      {/* GitHub Importer */}
      <div className="glass-card p-6 flex flex-col md:flex-row items-center gap-4 border border-accent/20 bg-accent/5">
        <div className="flex-1">
          <h3 className="font-bold text-accent mb-1">Importer depuis GitHub</h3>
          <p className="text-sm text-text-secondary">Récupère automatiquement vos dépôts publics récents.</p>
        </div>
        <div className="flex w-full md:w-auto items-center gap-2">
          <span className="text-text-secondary text-sm">github.com/</span>
          <input 
            type="text" 
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
            className="bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none w-32"
            placeholder="username"
          />
          <button 
            onClick={importGitHub}
            disabled={isImporting}
            className="bg-surface border border-border hover:border-accent px-4 py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
          >
            {isImporting ? "Importation..." : "Importer"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={project.id} className="glass-card p-6 relative group">
            <button 
              onClick={() => removeProject(index)}
              className="absolute top-4 right-4 text-text-muted hover:text-red-500 transition-colors"
              title="Supprimer le projet"
            >
              ✕
            </button>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Column 1: Image & Basic Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Image du projet</label>
                  <div className="relative h-32 bg-surface border border-border rounded-lg overflow-hidden group/img">
                    <img src={project.image} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                      <label className="cursor-pointer text-sm text-white bg-accent/80 px-3 py-1.5 rounded hover:bg-accent transition-colors">
                        Changer l'image
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, index)} />
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Titre</label>
                  <input type="text" value={project.title} onChange={e => updateProject(index, "title", e.target.value)} className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm text-text-secondary mb-1">Date</label>
                    <input type="text" value={project.date} onChange={e => updateProject(index, "date", e.target.value)} className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm text-text-secondary mb-1">Type</label>
                    <input type="text" value={project.type} onChange={e => updateProject(index, "type", e.target.value)} className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none" />
                  </div>
                </div>
              </div>

              {/* Column 2: Text content */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Description</label>
                  <textarea rows={3} value={project.description} onChange={e => updateProject(index, "description", e.target.value)} className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none resize-none" />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Votre rôle</label>
                  <input type="text" value={project.role} onChange={e => updateProject(index, "role", e.target.value)} className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Technologies (séparées par virgule)</label>
                  <input 
                    type="text" 
                    value={project.technologies.join(", ")} 
                    onChange={e => updateProject(index, "technologies", e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))} 
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none" 
                    placeholder="React, Tailwind, Node.js"
                  />
                </div>
              </div>

              {/* Column 3: Links & Results */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Lien GitHub</label>
                  <input type="url" value={project.github} onChange={e => updateProject(index, "github", e.target.value)} className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Lien Démo / Site Web</label>
                  <input type="url" value={project.demo} onChange={e => updateProject(index, "demo", e.target.value)} className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Résultats (séparés par un saut de ligne)</label>
                  <textarea 
                    rows={4} 
                    value={project.results.join("\n")} 
                    onChange={e => updateProject(index, "results", e.target.value.split("\n").filter(Boolean))} 
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none resize-none" 
                    placeholder="Résultat 1&#10;Résultat 2"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="text-center py-12 text-text-muted">
            Aucun projet. Ajoutez-en un manuellement ou importez depuis GitHub.
          </div>
        )}
      </div>
    </div>
  );
}
