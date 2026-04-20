# CLAUDE.md

Guidance for Claude Code (claude.ai/code) working in this repository.

## Project Overview

Personal CV/portfolio — static site built with **Astro 5** + **TailwindCSS 4**.
Data-driven from a single JSON file. Deployed to **GitHub Pages**, **Docker Hub**, and custom domain `cv.tellebma.fr`.
Analytics via self-hosted **Matomo**.

## Commands

```bash
# Dev
npm install              # First install (Node 24)
npm run dev              # Dev server on http://localhost:4321
npm run preview          # Preview production build

# Build
npm run build            # Static build to dist/ (base path /)
BUILD_TARGET=github npm run build   # GitHub Pages build (base path /cv)
```

No test runner, linter, or CI aggregator script is wired up in `package.json` today.
Type check is provided by `@astrojs/check` (used implicitly by Astro's dev/build).

## Architecture

- **Data source**: `src/data/cv.json` — single source of truth for CV content.
- **Single page**: `src/pages/index.astro` renders the full CV from the JSON.
- **Layout**: `src/layouts/Layout.astro`.
- **Styles**: `src/styles/global.css` (TailwindCSS 4 via `@tailwindcss/vite` plugin).
- **Assets**: `src/assets/` (SVGs) and `public/` (`cv.pdf`, `favicon.svg`, `images/`).
- **Static output**: `dist/` — no server runtime.

## Build Variants

Controlled by `BUILD_TARGET` in `astro.config.mjs`:
- unset → `base: "/"` (Docker, direct hosting, `cv.tellebma.fr`)
- `github` → `base: "/cv"` (GitHub Pages at `tellebma.github.io/cv`)

## CI/CD — `.github/workflows/`

| Workflow | Role |
|----------|------|
| `deploy_github_pages.yml` | Build with `BUILD_TARGET=github`, push to `gh-pages` on `main` |
| `docker_publish.yml` | Build & push image `tellebma/cv` to Docker Hub |
| `analyse_code_sonar.yml` | SonarCloud quality scan |
| `analyse_SAST_semgrep.yml` | Semgrep SAST scan |
| `analyse_SCA_snyk.yml` | Snyk dependency scan |

Dependabot is enabled for npm updates.

## Docker

`Dockerfile` uses a two-stage build:
1. `node:24` builder → `npm run build`
2. `nginxinc/nginx-unprivileged:stable-alpine` serves `dist/` with `nginx.conf`
Runs as UID 101 (non-root).

Tags:
- `tellebma/cv:latest` → `main`
- `tellebma/cv:dev-<branch>` → other branches

## Conventions

- **TypeScript strict** (extends `astro/tsconfigs/strict`).
- **Node 24**, npm as package manager.
- `cv.json` is untyped at runtime — prefer narrow typing at consumption sites.
- External icons loaded via `phosphor-icons` CDN in `index.astro`.
- Matomo tracker inlined in `index.astro` — keep `is:inline` directive.

## Known Gaps / Watch-outs

- No automated tests — visual checks only. Verify UI manually in `npm run dev` when modifying `index.astro` or `global.css`.
- `tailwind.config.js` and `postcss.config.js` both exist but Tailwind 4 uses the Vite plugin; the legacy configs are no-ops kept for tooling compat.
- `CNAME` file at repo root is copied into the Docker build for the custom domain — keep it in sync with DNS.

## Repo Layout

```
├── astro.config.mjs
├── Dockerfile, nginx.conf, CNAME
├── .github/workflows/     # CI pipelines
├── public/                # Static assets served as-is (cv.pdf, favicon, images)
└── src/
    ├── data/cv.json       # CV content
    ├── layouts/Layout.astro
    ├── pages/index.astro  # Single rendered page
    ├── styles/global.css  # Tailwind + custom
    └── assets/            # SVGs imported by components
```
