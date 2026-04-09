# Personal Portfolio

A modern, interactive personal portfolio website showcasing professional work and skills as a Software Engineer. Built with HTML, SCSS, and JavaScript, featuring smooth scroll animations, responsive design, and zero framework dependencies.

## Features

- **Bilingual (PL/EN)**: Automatic language detection based on browser settings with manual switcher
- **Interactive Animations**: Scroll-triggered animations using GSAP and ScrollTrigger
- **Responsive Design**: Mobile-first layout with adaptive element ordering
- **Project Portfolio**: Professional project showcase with responsive grid
- **Experience Timeline**: Visual professional experience section
- **Resume Download**: Language-specific downloadable resume PDF
- **Contact Form**: Formspree-powered form with validation, feedback, and i18n support
- **Social Integration**: Sidebar social links with hover effects
- **Mouse Glow Effect**: Interactive cursor feedback

## Project Structure

```
personal-site/
├── index.html
├── CNAME
├── assets/
│   ├── files/
│   │   ├── resume-pl.pdf
│   │   └── resume-en.pdf
│   └── img/
├── css/
│   └── styles.css
├── i18n/
│   ├── pl.json
│   └── en.json
├── js/
│   ├── index.js
│   ├── animation.js
│   ├── form.js
│   ├── footer.js
│   ├── language.js
│   ├── mouse.js
│   └── navigation.js
└── scss/
    ├── styles.scss
    ├── abstracts/
    ├── base/
    ├── components/
    └── layout/
```

## Technologies Used

- **HTML5**: Semantic markup with ARIA accessibility attributes
- **SCSS**: 7-1 pattern architecture with variables, mixins, and modular components
- **JavaScript**: Vanilla ES modules for interactivity and i18n
- **GSAP**: Animation library for scroll-triggered reveals and page transitions
- **Font Awesome**: Icon library for social media and UI elements

## Getting Started

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/patbil/personal-site.git
   cd personal-site
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - No build process or npm installation required — the site works out of the box

## Development

### Modifying Styles

Edit SCSS files in the `scss/` directory and compile:

```bash
npx sass scss/styles.scss css/styles.css --no-source-map
```

### Adding Translations

Edit `i18n/pl.json` and `i18n/en.json`. Use `data-i18n` attributes in HTML to bind elements to translation keys. Nested keys and arrays are supported (e.g. `exp.items[0].role`).

## Deployment

Deployed via GitHub Pages with custom domain. Push to `main` branch — GitHub Pages rebuilds automatically. The CNAME file ensures the custom domain is preserved.
