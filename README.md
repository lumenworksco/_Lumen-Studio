<div align="center">

<img src="assets/logo.png" alt="Lumen Studio logo" width="96">

# Lumen Studio

**AI research. Brilliantly built.**

The website of Lumen Studio, an AI research studio in Luxembourg building intelligent systems, from autonomous trading to NLP models and AI-powered tools.

[![Website](https://img.shields.io/badge/website-lumen.braunf.com-4f6bed?style=flat-square)](https://lumen.braunf.com)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![Hosted on GitHub Pages](https://img.shields.io/badge/hosted%20on-GitHub%20Pages-222?style=flat-square&logo=github)](https://pages.github.com)
![No build step](https://img.shields.io/badge/build-none-success?style=flat-square)

![Lumen Studio banner](assets/banner.png)

</div>

## Preview

| Home | Projects |
| --- | --- |
| ![Home page](assets/screenshots/home.png) | ![Projects page](assets/screenshots/projects.png) |
| **Velox** | **Piste** |
| ![Velox page](assets/screenshots/velox.png) | ![Piste page](assets/screenshots/piste.png) |

## Overview

A fast, dependency-free static site written in plain HTML, CSS and JavaScript. There is no framework, bundler or build step.

| Page | Description |
| --- | --- |
| [`index.html`](index.html) | Landing page: hero, featured work, about and contact |
| [`projects.html`](projects.html) | Full list of public projects |
| [`velox.html`](velox.html) | Velox, the autonomous trading system |
| [`piste.html`](piste.html) | Piste, the ski companion app |

## Features

- Responsive layout with a mobile navigation menu
- Scroll-triggered fade-in animations and a sticky, blurred nav bar
- Open Graph and Twitter Card metadata with canonical URLs for clean link previews
- Custom `404` page, `robots.txt` and `sitemap.xml`
- Zero dependencies and zero build tooling

## Getting started

```bash
git clone https://github.com/lumenworksco/Lumen-Studio.git
cd Lumen-Studio

# Open directly...
open index.html

# ...or serve locally
python3 -m http.server 8000   # http://localhost:8000
```

## Project structure

```
.
├── index.html        # Landing page
├── projects.html     # All projects
├── velox.html        # Velox product page
├── piste.html        # Piste product page
├── 404.html          # Not-found page
├── style.css         # Shared styles
├── script.js         # Nav, menu and scroll animations
├── assets/           # Logo, banner, social preview and README screenshots
├── CNAME             # Custom domain for GitHub Pages
├── robots.txt
└── sitemap.xml
```

## Deployment

The site is served by GitHub Pages from the `main` branch at [lumen.braunf.com](https://lumen.braunf.com). The custom domain is set in [`CNAME`](CNAME), and `.nojekyll` disables Jekyll processing. Pushing to `main` deploys the site.

## Contact

- Email: [braunf25@proton.me](mailto:braunf25@proton.me)
- GitHub: [@lumenworksco](https://github.com/lumenworksco)
- Hugging Face: [iPwnds](https://huggingface.co/iPwnds)

## License

Released under the [MIT License](LICENSE) © 2026 Florian Braun.
