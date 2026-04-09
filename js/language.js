// --- HELPERS ---
function setResumeLink(lang) {
  const resume = document.querySelector(".resume");
  if (resume) resume.href = `../assets/files/resume-${lang}.pdf`;
}

function detectLanguage() {
  const saved = localStorage.getItem("lang");
  if (saved) return saved;

  return (navigator.language || "en").startsWith("pl") ? "pl" : "en";
}

function resolve(obj, path) {
  return path
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .reduce(
      (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
      obj,
    );
}

async function fetchTranslation(lang) {
  try {
    const res = await fetch(`../i18n/${lang}.json`);
    if (!res.ok) throw new Error(`Failed to load: ${lang}.json`);
    return await res.json();
  } catch (e) {
    console.error("i18n:", e);
    return {};
  }
}

// --- LANGUAGE SWITCHING ---
async function setLanguage(lang) {
  const data = await fetchTranslation(lang);
  updateTextContent(data);
  updateLanguageUI(lang);
  setResumeLink(lang);
}

function updateLanguageUI(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);
  document.getElementById("lang-current").textContent = lang;
}

function updateTextContent(data) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = resolve(data, el.getAttribute("data-i18n"));
    if (value) el.textContent = value;
  });
}

// --- LISTENERS ---
function langSwitcherListener() {
  const switcher = document.querySelector(".lang-switcher");

  document.querySelector("#lang-current").addEventListener("click", (e) => {
    e.stopPropagation();
    switcher.classList.toggle("open");
  });

  document.addEventListener("click", () => switcher.classList.remove("open"));
}

function langButtonsListener() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () =>
      setLanguage(btn.getAttribute("data-lang")),
    );
  });
}

// --- MAIN ---
export function initLanguage() {
  langSwitcherListener();
  langButtonsListener();

  const browserLanguage = detectLanguage();
  setLanguage(browserLanguage);
}
