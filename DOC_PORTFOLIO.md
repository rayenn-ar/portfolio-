# Documentation du Portfolio — Ayari Rayen

## Présentation

Ce portfolio est une application Next.js/React moderne permettant de présenter mon profil, mes compétences, mes projets, et mon parcours, avec une interface d’administration pour modifier dynamiquement le contenu.

---

## Structure du projet

- **src/app/**
  - `page.tsx` : Page d’accueil, assemble tous les composants.
  - `admin/page.tsx` : Interface d’administration (mot de passe, édition des données).
  - `api/portfolio/route.ts` : API pour la gestion des données.
- **src/components/**
  - Composants pour chaque section : `Navbar`, `Hero`, `About`, `Skills`, `Projects`, `Experience`, `Contact`, `Footer`.
  - `admin/` : Composants d’édition pour l’admin.
- **src/context/PortfolioContext.tsx** : Fournit les données à tous les composants via React Context.
- **src/data/portfolio-data.ts** : Toutes les données affichées sur le site (infos, compétences, projets, parcours, etc.).
- **public/** : Fichiers statiques (CV, images).

---

## Mise à jour des données (depuis le CV)


### Infos Personnelles

- **Nom** : Ayari Rayen
- **Titre** : Développeur Web & Desktop Full-Stack
- **Email** : [ayarirayen539@gmail.com](mailto:ayarirayen539@gmail.com)
- **Téléphone** : +216 94 816 735
- **Localisation** : Nabeul, Tunisie
- **GitHub** : [github.com/rayenn-ar](https://github.com/rayenn-ar)


### Compétences

- **Frontend** : React 18, Next.js, TypeScript, JavaScript, TailwindCSS
- **Backend & BDD** : Node.js, PostgreSQL, MongoDB, PHP/MySQL
- **Desktop & Outils** : Electron, Tauri, Git, GitHub


### Projets

- **Solutions de Gestion & Caisse (Desktop)** (2024 - Présent)
  - Système de caisse pour supérette, gestion de dépôts fournisseurs, système café/restaurant.
  - Stack : React, Electron, Tauri, Node.js
- **Plateforme E-commerce Complète** (2025)
  - Boutique en ligne, gestion panier, optimisation NoSQL.
  - Stack : React 18, Node.js, MongoDB
- **App de Réservation - Salon de Coiffure** (2026)
  - Prise de rendez-vous en ligne, base de données relationnelle, TypeScript.
  - Stack : Next.js, TypeScript, PostgreSQL


### Parcours (Formation)

- **2025 - 2026** : Business Computing (2ème année), IT Business School - Nabeul
- **2023 - 2025** : Génie Logiciel et Sciences Informatiques, Faculté des Sciences de Gabès

---

## Fonctionnement rapide

1. `npm install` puis `npm run dev` pour lancer le serveur local.
2. Modifie le contenu dans `src/data/portfolio-data.ts`.
3. Accès admin via `/admin` (mot de passe à sécuriser).
4. Déploiement possible sur Vercel ou tout hébergeur Node.js.

---


## Conseils

- **Sépare bien** données et composants.
- **Sécurise** le mot de passe admin pour la production.
- **Ajoute** ou modifie les sections via le fichier de données.
- **Personnalise** le style avec Tailwind.

---


## Pour aller plus loin

- Ajouter une vraie base de données pour la persistance.
- Améliorer la sécurité de l’admin.
- Ajouter des tests unitaires.
- Vérifier l’accessibilité (a11y).

---


---

**Auteur : Ayari Rayen**
