# Satish Vishwakarma — Portfolio

Personal portfolio website for a Flutter Developer showcasing experience, projects, skills, and contact information.

**Live demo:** [satishvishwakarma24.github.io/portfolio](https://satishvishwakarma24.github.io/portfolio/)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222?logo=github&logoColor=white)

## Features

- Selected Work bento grid with real app screenshots
- Case-study project cards and downloadable resume PDF
- Animated stat counters, scroll progress bar, and sticky mobile CTA
- Responsive dark-theme design with tablet breakpoint (1024px)
- Mobile hamburger navigation with accessibility support
- SEO meta tags, Open Graph previews, and JSON-LD structured data
- Auto-deployed to GitHub Pages on every push to `main`

## Project structure

```
portfolio/
├── index.html              # Main page (content lives here)
├── assets/
│   ├── images/             # Avatar, OG preview image
│   ├── screenshots/        # App screenshots by project
│   ├── static/             # Resume PDF
│   └── icons/              # Logo, favicon, apple-touch-icon
├── css/
│   ├── tokens.css          # Design tokens (colors, spacing)
│   ├── base.css            # Reset, typography, accessibility
│   ├── components.css      # Layout and component styles
│   └── main.css            # Stylesheet entry point
├── js/
│   └── main.js             # Scroll reveal, nav, copy, active section
├── .github/workflows/
│   └── static.yml          # GitHub Pages deployment
├── README.md
└── LICENSE
```

## Local development

No build step required. Serve the repo root with any static file server:

```bash
# Python
python3 -m http.server 8000

# Node (npx)
npx serve .
```

Then open [http://localhost:8000](http://localhost:8000).

## Customization

| What to change | Where |
|----------------|-------|
| Page content (experience, projects, etc.) | `index.html` |
| Colors and design tokens | `css/tokens.css` |
| Layout and component styles | `css/components.css` |
| Interactivity | `js/main.js` |
| Logo and favicon | `assets/icons/` |
| Social preview image | `assets/images/og-preview.png` |

## Deployment

Pushes to the `main` branch trigger the GitHub Actions workflow in `.github/workflows/static.yml`, which deploys the entire repository to GitHub Pages.

Ensure **Settings → Pages → Build and deployment** is set to **GitHub Actions**.

## License

[MIT](LICENSE) © 2026 Satish Vishwakarma
