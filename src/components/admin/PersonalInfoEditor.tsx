"use client";

import { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function PersonalInfoEditor({ token }: { token: string }) {
  const { data, updateData } = usePortfolio();
  const [info, setInfo] = useState(data.personalInfo);
  const [cvUploading, setCvUploading] = useState(false);
  const [bio, setBio] = useState(data.bio);
  const [isSaving, setIsSaving] = useState(false);


  // Upload CV PDF
  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Seuls les fichiers PDF sont acceptés.");
      return;
    }
    setCvUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const result = await res.json();
    setCvUploading(false);
    if (result.url) {
      setInfo({ ...info, cvPath: result.url });
      alert("CV déposé avec succès ! N'oubliez pas de sauvegarder pour appliquer.");
    } else {
      alert(result.error || "Erreur lors de l'upload du CV.");
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const newData = { ...data, personalInfo: info, bio: bio };
    await updateData(newData, token);
    setIsSaving(false);
    alert("Informations sauvegardées avec succès !");
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-[Poppins]">Infos Personnelles</h2>
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="btn-gradient text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50"
        >
          {isSaving ? "Sauvegarde..." : "Sauvegarder"}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-4">
                    <div>
                      <label className="block text-sm text-text-secondary mb-1">CV (PDF)</label>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleCvUpload}
                        className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none"
                        disabled={cvUploading}
                      />
                      {info.cvPath && (
                        <div className="mt-2">
                          <a href={info.cvPath} target="_blank" rel="noopener noreferrer" className="text-accent underline mr-4">Voir le CV actuel</a>
                          <span className="text-xs text-text-secondary">(remplacer pour écraser l'ancien)</span>
                        </div>
                      )}
                      {cvUploading && <div className="text-sm text-accent mt-1">Envoi du CV...</div>}
                    </div>
          <h3 className="text-lg font-bold mb-4 border-b border-border pb-2">Identité</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-text-secondary mb-1">Prénom</label>
              <input type="text" value={info.firstName} onChange={e => setInfo({...info, firstName: e.target.value})} className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none" />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1">Nom</label>
              <input type="text" value={info.lastName} onChange={e => setInfo({...info, lastName: e.target.value})} className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">Titre Professionnel</label>
            <input type="text" value={info.title} onChange={e => setInfo({...info, title: e.target.value})} className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none" />
          </div>
          <div className="flex items-center gap-2 mt-4">
            <input type="checkbox" id="available" checked={info.available} onChange={e => setInfo({...info, available: e.target.checked})} className="rounded text-accent focus:ring-accent" />
            <label htmlFor="available" className="text-sm">Disponible pour missions freelance</label>
          </div>
        </div>

        <div className="glass-card p-6 space-y-4">
          <h3 className="text-lg font-bold mb-4 border-b border-border pb-2">Contact</h3>
          <div>
            <label className="block text-sm text-text-secondary mb-1">Email</label>
            <input type="email" value={info.email} onChange={e => setInfo({...info, email: e.target.value})} className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none" />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">Téléphone</label>
            <input type="text" value={info.phone} onChange={e => setInfo({...info, phone: e.target.value})} className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none" />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">Localisation</label>
            <input type="text" value={info.location} onChange={e => setInfo({...info, location: e.target.value})} className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none" />
          </div>
        </div>

        <div className="glass-card p-6 space-y-4 md:col-span-2">
          <h3 className="text-lg font-bold mb-4 border-b border-border pb-2">Bio & Motivation</h3>
          <div>
            <label className="block text-sm text-text-secondary mb-1">Bio Courte (Héros)</label>
            <textarea rows={2} value={bio.short} onChange={e => setBio({...bio, short: e.target.value})} className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none resize-none" />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">Bio Longue (À Propos)</label>
            <textarea rows={4} value={bio.full} onChange={e => setBio({...bio, full: e.target.value})} className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none resize-none" />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">Motivation</label>
            <textarea rows={2} value={bio.motivation} onChange={e => setBio({...bio, motivation: e.target.value})} className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none resize-none" />
          </div>
        </div>

        <div className="glass-card p-6 space-y-4 md:col-span-2">
          <h3 className="text-lg font-bold mb-4 border-b border-border pb-2">Liens & Réseaux</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-text-secondary mb-1">GitHub URL</label>
              <input type="url" value={info.github} onChange={e => setInfo({...info, github: e.target.value})} className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none" />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1">LinkedIn URL</label>
              <input type="url" value={info.linkedin} onChange={e => setInfo({...info, linkedin: e.target.value})} className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
