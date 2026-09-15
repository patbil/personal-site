import { $, $$ } from "./dom.js";
import { MEDIA, SECTION_OBSERVER } from "./config.js";

const mobile = window.matchMedia(MEDIA.mobile);

let nav, logo, hamburger, navLinks;

// --- STATE ---

const isOpen = () => nav.classList.contains("active");

function syncInertState() {
  nav.inert = mobile.matches && !isOpen();
}

function toggleMenu(force) {
  const open = force ?? !isOpen();

  nav.classList.toggle("active", open);
  hamburger.classList.toggle("active", open);
  hamburger.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);

  syncInertState();
  if (open) $(".nav-link", nav)?.focus();
}

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
    block: id === "contact" ? "end" : "start",
  });
}

function setActiveLink(id) {
  navLinks.forEach((link) =>
    link.classList.toggle("active", link.dataset.section === id),
  );
}

// --- WIRING ---

function watchSections() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveLink(entry.target.id);
    });
  }, SECTION_OBSERVER);

  $$("section").forEach((section) => observer.observe(section));
}

export function initNavigation() {
  nav = $(".nav");
  logo = $(".logo");
  hamburger = $(".hamburger");
  navLinks = $$(".nav-link");

  if (!nav || !logo || !hamburger) return;

  hamburger.addEventListener("click", () => toggleMenu());

  logo.addEventListener("click", (event) => {
    event.preventDefault();
    scrollToSection("about");
  });

  nav.addEventListener("click", (event) => {
    const link = event.target.closest(".nav-link");
    if (!link) return;

    event.preventDefault();
    toggleMenu(false);
    scrollToSection(link.dataset.section);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !isOpen()) return;
    toggleMenu(false);
    hamburger.focus();
  });

  // Resizing past the breakpoint with the menu open would strand it.
  mobile.addEventListener("change", () => toggleMenu(false));

  syncInertState();
  watchSections();
}
