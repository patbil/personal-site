// --- STATE ---

let logo, navigation, sections, hamburger, navItems;

function updateItemState(id) {
  navItems.forEach((item) =>
    item.classList.toggle("active", item.dataset.section === id),
  );
}

function toggleMenu(state) {
  const isOpen = state ?? !hamburger.classList.contains("active");
  hamburger.classList.toggle("active", isOpen);
  navigation.classList.toggle("active", isOpen);
  hamburger.setAttribute("aria-expanded", isOpen);
}

// --- HANDLERS ---

function setupMobileMenu() {
  hamburger.addEventListener("click", () => toggleMenu());
}

function setupLogoScroll() {
  logo.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
  });
}

function setupNavigationLinks() {
  navigation.addEventListener("click", (e) => {
    const link = e.target.closest(".nav-link");
    if (!link) return;
    e.preventDefault();
    toggleMenu(false);
    const section = document.getElementById(link.dataset.section);
    if (!section) return;
    section.scrollIntoView({
      behavior: "smooth",
      block: section.id !== "contact" ? "start" : "end",
    });
  });
}

// --- OBSERVER ---

function initSectionObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) updateItemState(entry.target.id);
      });
    },
    {
      rootMargin: "-25% 0px -25% 0px",
      threshold: 0.2,
    },
  );

  sections.forEach((section) => observer.observe(section));
}

export function initNavigation() {
  logo = document.querySelector(".logo");
  navigation = document.querySelector("nav");
  sections = document.querySelectorAll("section");
  hamburger = document.querySelector(".hamburger");
  navItems = document.querySelectorAll(".nav-link");

  if (!logo || !navigation || !hamburger) return;

  setupMobileMenu();
  setupLogoScroll();
  setupNavigationLinks();
  initSectionObserver();
}
