# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing website for **GymPo** (a workout-tracking mobile app). It is a **static site** — two hand-written HTML files, no build system, no package manager, no tests, no JavaScript. Published via **GitHub Pages** at **gympoapp.com** (`CNAME` + `.nojekyll`).

- `index.html` — landing page (`https://gympoapp.com/`)
- `privacy.html` — privacy policy (`/privacy.html`)
- `img/` — all images, flat (no subfolders); `img/README.md` is the manifest

## Running / previewing

There is nothing to build, lint, or test. Serve the folder over HTTP so relative `img/` paths and the CSP resolve correctly:

```
python3 -m http.server 8000   # then open http://localhost:8000
```

Opening the file directly (`file://`) can misbehave under the CSP — use the local server.

## Deployment

Merging to **`main`** auto-deploys to gympoapp.com via GitHub Pages (usually 1–3 min). There is no CI. Verify a deploy by checking content against `origin/main` with git; in some sandboxed sessions the network policy blocks outbound requests to gympoapp.com, so do not treat a failed fetch of the live URL as a broken deploy.

## Hard constraints (read before editing HTML)

1. **Strict Content-Security-Policy.** Both pages carry:
   `default-src 'none'; img-src 'self'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'`.
   This means: **no external scripts, styles, fonts, or images; no inline or external JavaScript** (`script-src` is `'none'` via `default-src`). Everything must stay self-contained — CSS inline in `<head>`, icons as inline `<svg>`, images local under `img/`. Adding any external resource (CDN, Google Fonts, analytics snippet) will be silently blocked by the browser.

2. **Self-contained pages.** Each HTML file has its own inline `<style>` block; there is no shared stylesheet. Duplicate/keep styles consistent across pages by hand.

## Theming gotcha (caused real bugs)

The palette supports light + dark via `@media (prefers-color-scheme: dark)`, which **flips the CSS variables** — notably `--ink` is dark in light mode but *light* in dark mode. Do **not** use `var(--ink)` (or other theme-flipping vars) as a background that must always stay dark: white text on it becomes unreadable in dark mode. For surfaces meant to be dark in both themes (e.g. the "GymPo Pro" band, the store buttons) use a **fixed hex** color. Always sanity-check new sections in **both** themes.

## Images

- Live flat in `img/` and are referenced with relative paths (`img/inicio.png`). Names are **case-sensitive** on GitHub Pages — match them exactly.
- `img/README.md` maps each expected filename to the store screenshot it represents (identified by the caption printed on the image). Keep it in sync when adding/renaming images.
- `img/banner.png` is the Open Graph image (`og:image`); `img/icon.png` is the app icon used for the header logo, favicon, and the large download-section icon.

## Content conventions

- Copy is in **Spanish**; brand tagline is **"Entrena · Registra · Progresa"**.
- The app is **pre-launch / in testing**: the Google Play and App Store buttons are intentional **"Próximamente"** placeholders (styled but non-linking). When real store URLs arrive, they replace the placeholder `<span class="store disabled">` elements.
- Contact email is `contacto@gympoapp.com`; social links are `@gympoapp` (Instagram, TikTok).
