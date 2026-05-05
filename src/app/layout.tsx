import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ayari Rayen — Développeur Web Freelance | Portfolio",
  description:
    "Portfolio professionnel d'Ayari Rayen, développeur web freelance basé à Tunis. Spécialisé en HTML, CSS, JavaScript, React, PHP et MySQL. Disponible pour des missions freelance.",
  keywords: [
    "développeur web",
    "freelance",
    "Tunis",
    "React",
    "JavaScript",
    "portfolio",
    "Ayari Rayen",
  ],
  authors: [{ name: "Ayari Rayen" }],
  openGraph: {
    title: "Ayari Rayen — Développeur Web Freelance",
    description:
      "Développeur web freelance passionné, basé à Tunis. Découvrez mes projets et compétences.",
    type: "website",
    locale: "fr_FR",
  },
};

import { PortfolioProvider } from "@/context/PortfolioContext";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LanguageProvider>
          <PortfolioProvider>
            {children}
          </PortfolioProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
