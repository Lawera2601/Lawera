# Lawera - Personal Portfolio

A bilingual personal portfolio website built with **Vue 3** + **Vite 8**, deployed on GitHub Pages.

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Vue 3 (Composition API) |
| Build Tool | Vite 8 |
| Routing | Vue Router 4 |
| i18n | Vue I18n 9 (zh-CN / en) |
| Animations | GSAP 3 |
| Styling | CSS Custom Properties + Dark/Light Theme |

## Features

- **Bilingual** — Chinese (zh-CN) and English (en) with language switcher
- **Dark / Light theme** — Toggle with system preference detection
- **Responsive design** — Mobile-first, works across all devices
- **Smooth animations** — GSAP-powered scroll reveals and transitions
- **Canvas background** — Interactive animated hero section
- **Contact form** — Email integration via FormSubmit

## Project Structure

```
src/
├── assets/styles/     # CSS variables & theme styles
├── components/        # Reusable Vue components
├── composables/       # Composables (useTheme, useScroll)
├── i18n/              # Translation files (zh-CN.json, en.json)
├── router/            # Vue Router config
├── views/             # Page-level components
├── App.vue
├── constants.js
├── main.js
└── style.css
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This site is deployed on **GitHub Pages** with the base path set to `/Lawera/`.

```bash
npm run build
# Deploy the dist/ folder to GitHub Pages
```

## License

MIT
