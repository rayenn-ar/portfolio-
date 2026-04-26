"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
// Import default static data as fallback while loading
import * as fallbackData from "@/data/portfolio-data";

type PortfolioData = typeof fallbackData;

interface PortfolioContextType {
  data: PortfolioData;
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  updateData: (newData: PortfolioData, token: string) => Promise<boolean>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  // Initialize with fallback data
  const [data, setData] = useState<PortfolioData>({
    personalInfo: fallbackData.personalInfo,
    bio: fallbackData.bio,
    strengths: fallbackData.strengths,
    skills: fallbackData.skills,
    tools: fallbackData.tools,
    projects: fallbackData.projects,
    education: fallbackData.education,
    languages: fallbackData.languages,
    qualities: fallbackData.qualities,
    navLinks: fallbackData.navLinks,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolioData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/portfolio");
      if (!res.ok) throw new Error("Failed to fetch data");
      const fetchedData = await res.json();
      
      // Merge fetched data with fallback data to preserve static fields like navLinks
      setData({ ...fallbackData, ...fetchedData });
      setError(null);
    } catch (err) {
      console.error("Error loading portfolio data:", err);
      setError("Erreur de chargement des données. Affichage des données par défaut.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const updateData = async (newData: PortfolioData, token: string) => {
    try {
      const res = await fetch("/api/portfolio", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ data: newData }),
      });

      if (!res.ok) throw new Error("Failed to update");
      
      // Update local state on success
      setData(newData);
      return true;
    } catch (err) {
      console.error("Error saving data:", err);
      return false;
    }
  };

  return (
    <PortfolioContext.Provider value={{ data, isLoading, error, refreshData: fetchPortfolioData, updateData }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
