# Personal Portfolio

A modern, interactive personal portfolio website showcasing professional work and skills as a Software Engineer. Built with vanilla HTML, SCSS, and JavaScript, featuring smooth animations and a responsive design.

## Features

- **Interactive Canvas Background**: Animated particle system that creates a dynamic visual effect across the viewport
- **Responsive Design**: Fully responsive layout that adapts seamlessly to mobile, tablet, and desktop devices
- **Smooth Animations**: Scroll-triggered animations and transitions using GSAP and ScrollTrigger for enhanced visual appeal
- **Custom Loading Screen**: Branded loader animation with progress indicator on page initialization
- **Mobile Navigation**: Hamburger menu with smooth transitions for mobile devices

## Project Structure

```
personal-site/
├── index.html              # Main HTML document
├── assets/                 # Images and additional assets
├── css/
│   └── styles.css         # Compiled CSS from SCSS
├── js/
│   └── index.js           # Main JavaScript file
└── scss/                  # SCSS source files
    ├── styles.scss        # Main style entry point
    ├── abstracts/
    │   └── _animations.scss
    ├── base/
    │   ├── _reset.scss
    │   └── _variables.scss
    ├── components/
    │   ├── _header.scss
    │   ├── _loader.scss
    │   └── _socials.scss
    └── layout/
        ├── _canvas.scss
        └── _sections.scss
```

## Technologies Used

- **HTML5**: Semantic markup and canvas element for animations
- **SCSS**: Organized stylesheet architecture with variables, mixins, and modular structure
- **JavaScript**: Vanilla JS for interactivity and particle animations
- **GSAP**: GSAP library for advanced animations and scroll triggers
- **Font Awesome**: Icon library for social media links

## Getting Started

1. Clone or download the repository
2. Open `index.html` in a modern web browser
3. No build process or dependencies installation required - the site works out of the box

## Browser Support

Works on all modern browsers that support:

- ES6 JavaScript
- CSS Grid and Flexbox
- HTML5 Canvas
- CSS Animations and Transitions

## Development

The project is organized for easy maintenance and scalability:

- SCSS files are modular and follow a logical structure
- JavaScript is kept minimal and focused on core functionality
- All styles are compiled to a single CSS file for optimal performance

To modify styles, edit the SCSS files in the `scss/` directory and compile them to `css/styles.css`.

## Contact

- GitHub: [patbil](https://github.com/patbil)
- LinkedIn: [Patryk Bilski](https://www.linkedin.com/in/patryk-bilski1/)

---
