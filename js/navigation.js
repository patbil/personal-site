const logo = document.querySelector(".logo");
const navigation = document.querySelector("nav");
const sections = document.querySelectorAll("section");
const hamburger = document.querySelector(".hamburger");
const navItems = document.querySelectorAll(".nav-link");

// --- STATE ---

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
    toggleMenu(false);
    const section = document.getElementById(link.dataset.section);
    section.scrollIntoView({ behavior: "smooth" });
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
      threshold: 0.1,
      rootMargin: "-20% 0px -20% 0px",
    },
  );

  sections.forEach((section) => observer.observe(section));
}

export function initNavigation() {
  setupMobileMenu();
  setupLogoScroll();
  setupNavigationLinks();
  initSectionObserver();
}
