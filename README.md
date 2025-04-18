# Curriculum Vitae Maxime BELLET

Projet CV développé avec **Astro** + **TailwindCSS**.
Déploiement Githab pages via Github Action.

---

## Démo

Vous pouvez visualiser le projet ici :
https://tellebma.github.io/cv

---

## Stack Technique

- [Astro](https://astro.build/)
- [TailwindCSS](https://tailwindcss.com/)
- [Phosphor Icons](https://phosphoricons.com/)
- [Vite](https://vitejs.dev/)
- [GitHub Actions](https://docs.github.com/actions) pour le déploiement automatique

---

## Fonctionnalités

- Mise en page moderne en **format A4**
- **Responsive** (adapté aux mobiles / tablettes)
- **Mode Sombre/Clair** automatique
- **Bouton de téléchargement** du CV au format PDF
- **Donées dynamiques** (profil, skills, expérience, éducation...) à partir d'un fichier `cv.json`
- **Custom fields** (ex: Permis B)
- **Affichage dynamique des compétences** séparées par des virgules

---

## Arborescence du projet

```bash
/src
  /data
    cv.json    # Contient toutes les données du CV
  /pages
    index.astro
  /styles
    global.css  # Configuration des variables CSS et styles globaux
public/
  cv.pdf       # CV PDF téléchargeable
```

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

## TODO (Améliorations possibles)

- Corriger téléchargement du fichier pdf
- nettoyage du projet 
- Ajout CI Sonar + checkmarx
- Externalisation du cv.json
- Ajout d'une génération de PDF automatique
- Correctif du toggle du dark/light mode
- Ajouter un mode "impression" spécifique (avec en-tête en mode clair)

---

## Auteur

**Maxime BELLET**

- [GitHub](https://github.com/tellebma)
- [LinkedIn](https://www.linkedin.com/in/maxime-bellet)


---

## Licence

MIT © Maxime BELLET

