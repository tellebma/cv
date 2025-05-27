# Curriculum Vitae Maxime BELLET

Projet CV développé avec **Astro** + **TailwindCSS**.  
Déploiement via **GitHub Actions** sur **GitHub Pages**, **Docker Hub**, et suivi via **Matomo**.

[![Déployer sur GitHub Pages](https://github.com/tellebma/cv/actions/workflows/deploy_github_pages.yml/badge.svg)](https://github.com/tellebma/cv/actions/workflows/deploy_github_pages.yml)
[![Build and Push Docker Image](https://github.com/tellebma/cv/actions/workflows/docker_publish.yml/badge.svg)](https://github.com/tellebma/cv/actions/workflows/docker_publish.yml)
[![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=tellebma_cv&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=tellebma_cv)
[![Snyk Vulnerabilities](https://snyk.io/test/github/tellebma/cv/badge.svg)](https://snyk.io/test/github/tellebma/cv)
[![Semgrep](https://img.shields.io/badge/semgrep-scanning-brightgreen)](https://semgrep.dev/orgs/tellebma)
[![Dependabot](https://img.shields.io/badge/dependabot-enabled-brightgreen)](https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically)

> 🎯 **Analyse Matomo active** sur [matomo.tellebma.fr](https://matomo.tellebma.fr)

---

## Démo

- [GitHub Pages](https://tellebma.github.io/cv)
- [cv.tellebma.fr](https://cv.tellebma.fr)

---

## Stack Technique

- [Astro](https://astro.build/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [GitHub Actions](https://docs.github.com/actions)

---

## Fonctionnalités

- Mise en page du CV
- **Responsive** (adapté aux mobiles / tablettes)
- **Mode Sombre/Clair** 
- **Téléchargement PDF** du CV
- **Données dynamiques** depuis un fichier json

---

## Arborescence du projet

```bash
/src
  /data
    cv.json          # Contient toutes les données du CV
  /pages
    index.astro
  /styles
    global.css       # Styles globaux
/public
  cv.pdf             # CV PDF téléchargeable
````

---

## Installation locale

```bash
git clone https://github.com/tellebma/cv.git
cd cv
npm install
npm run dev
```

Ensuite ouvrir : `http://localhost:4321`

---

## Build Production

```bash
npm run build
npm run preview
```

---

## Déploiement

### 🚀 GitHub Pages

Déployé automatiquement sur `main` via GitHub Actions.

### 🐳 Docker Hub

Une image Docker est automatiquement buildée et poussée ici :
➡️ [hub.docker.com/repository/docker/tellebma/cv](https://hub.docker.com/repository/docker/tellebma/cv/general)

* `tellebma/cv:latest` pour la branche `main`
* `tellebma/cv:dev-branch-name` pour les branches secondaires

---

## 🔎 Analyse & Sécurité

Le projet intègre plusieurs outils de CI pour la **qualité de code** et la **sécurité** :

| Outil          | Type                                      | Statut  |
| -------------- | ----------------------------------------- | ------- |
| **SonarCloud** | Qualité + Bugs + Duplications             | ✅ actif |
| **Semgrep**    | SAST (analyse sécurité statique)          | ✅ actif |
| **Snyk**       | Analyse des dépendances (SCA)             | ✅ actif |
| **Dependabot** | Mises à jour automatiques des dépendances | ✅ actif |

---

## TODO (Améliorations possibles)
* Nettoyage du projet
* Ajouter génération de PDF automatique
* Correctif du toggle dark/light mode en automatique
* Mode impression spécifique (avec en-tête en mode clair)
* github pages en mode preview pour les MR 

---

## Auteur

**Maxime BELLET**

* [GitHub](https://github.com/tellebma)
* [LinkedIn](https://www.linkedin.com/in/maxime-bellet)

---

## Licence

MIT © Maxime BELLET


