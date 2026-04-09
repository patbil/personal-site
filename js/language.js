let translations = {};
let switcher, currentBtn;

// --- HELPERS ---

function resolve(obj, path) {
  return path
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .reduce(
      (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
      obj,
    );
}

function detectLanguage() {
  return (
    localStorage.getItem("lang") ||
    ((navigator.language || "en").startsWith("pl") ? "pl" : "en")
  );
}

async function fetchTranslations(lang) {
  try {
    const res = await fetch(`./i18n/${lang}.json`);
    if (!res.ok) throw new Error(`Failed to load: ${lang}.json`);
    return await res.json();
  } catch (e) {
    console.error("i18n:", e);
    return {};
  }
}

// --- DOM UPDATES ---

function applyTranslations(data) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = resolve(data, el.getAttribute("data-i18n"));
    if (value) el.textContent = value;
  });
}

function applyMeta(data) {
  const title = resolve(data, "meta.title");
  const desc = resolve(data, "meta.description");

  if (desc) {
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", desc);
  }
}

function applyActiveState(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);
  currentBtn.textContent = lang;

  const resume = document.querySelector(".resume");
  if (resume) resume.href = `./assets/files/resume-${lang}.pdf`;

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

// --- LANGUAGE ---

async function setLanguage(lang) {
  translations = await fetchTranslations(lang);
  applyTranslations(translations);
  applyMeta(translations);
  applyActiveState(lang);
}

// --- SWITCHER ---

function toggleSwitcher(open) {
  switcher.classList.toggle("open", open);
  currentBtn.setAttribute("aria-expanded", open);
}

function initSwitcher() {
  switcher = document.querySelector(".lang-switcher");
  currentBtn = document.getElementById("lang-current");

  currentBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleSwitcher(!switcher.classList.contains("open"));
  });

  switcher.addEventListener("click", (e) => {
    const btn = e.target.closest(".lang-btn");
    if (!btn) return;
    setLanguage(btn.dataset.lang);
    toggleSwitcher(false);
  });

  document.addEventListener("click", () => toggleSwitcher(false));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && switcher.classList.contains("open")) {
      toggleSwitcher(false);
      currentBtn.focus();
    }
  });
}

// --- PUBLIC ---

export function getTranslation(key) {
  return resolve(translations, key);
}

export function initLanguage() {
  initSwitcher();
  setLanguage(detectLanguage());
}
