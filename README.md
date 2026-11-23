# Satish Vishwakarma — Flutter & Mobile Engineer

[View the portfolio](https://satishvishwakarma24.github.io/portfolio/)

A responsive portfolio covering Flutter development across Android, iOS, and Web. The site includes résumé-backed case studies for Eicher SiteOne, FileSecure, and Voice Buddy, plus a curated Google Play collection with official listing artwork and screenshots.

## Local development

Serve the repository root with any static server:

```sh
python -m http.server 8000
```

Open http://localhost:8000. The site uses HTML, CSS, and JavaScript without a build step.

- `index.html` contains the portfolio content and Google Play source links.
- `css/` contains design tokens, typography, and responsive layouts.
- `js/main.js` handles mobile navigation, active section links, and screenshot previews.
- `assets/screenshots/play/` contains Google Play artwork. The original listings are linked from each project card.
- `assets/static/SatishVishwakarma__Resume.pdf` is the résumé linked from the portfolio.

Pushes to `main` trigger the GitHub Pages workflow in `.github/workflows/static.yml`.

[MIT License](LICENSE)
