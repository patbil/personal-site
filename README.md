# Personal Portfolio

A modern, interactive personal portfolio website showcasing professional work and skills as a Software Engineer. Built with HTML, SCSS, and JavaScript, featuring smooth scroll animations, responsive design, and zero framework dependencies.

## Features

- **Interactive Animations**: Scroll-triggered animations using GSAP and ScrollTrigger
- **Responsive Design**: Mobile-first layout with adaptive element ordering
- **Project Portfolio**: Professional project showcase with responsive grid
- **Experience Timeline**: Visual professional experience section
- **Contact Form**: Form with validation and user feedback
- **Social Integration**: Sidebar social links with hover effects
- **Mouse Glow Effect**: Interactive cursor feedback

## Project Structure

```
personal-site/
├── index.html
├── CNAME
├── assets/
│   └── projects/
├── css/
│   └── styles.css
├── js/
│   ├── index.js
│   ├── animation.js
│   ├── form.js
│   ├── footer.js
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

- **HTML5**: Semantic markup and canvas element for animations
- **SCSS**: Organized stylesheet architecture with variables, mixins, and modular structure
- **JavaScript**: Vanilla JS for interactivity and particle animations
- **GSAP**: GSAP library for advanced animations and scroll triggers
- **Font Awesome**: Icon library for social media links

## Getting Started

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/patbil/personal-site.git
   cd personal-site
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - No build process or npm installation required - the site works out of the box

## Development

### Project Organization

The codebase follows a clean architecture:

- SCSS files use the 7-1 pattern with modular components
- JavaScript remains lightweight and framework-free
- Single compiled CSS file for optimal performance

### Modifying Styles

Edit SCSS files in the `scss/` directory and compile:

```bash
npx sass scss:css --no-source-map
```

Or use npm script if configured:

```bash
npm run sass
```

## Deployment

Deployed via GitHub Pages with custom domain.

### Automatic Deployment

Simply push to `main` branch:

```bash
git add .
git commit -m "Update: description"
git push origin main
```

GitHub Pages rebuilds the site automatically. The CNAME file ensures the custom domain is preserved.
