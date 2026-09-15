import { $, $$ } from "./dom.js";
import { getLanguage, onLanguageChange, setLanguage } from "./i18n.js";

let switcher, trigger;

function setOpen(open) {
  switcher.classList.toggle("open", open);
  trigger.setAttribute("aria-expanded", String(open));
}

const isOpen = () => switcher.classList.contains("open");

function renderActiveLanguage(language) {
  trigger.textContent = language.toUpperCase();

  $$(".lang-btn").forEach((button) => {
    const active = button.dataset.lang === language;
    button.classList.toggle("active", active);
    button.setAttribute("aria-checked", String(active));
  });
}

export function initLanguageSwitcher() {
  switcher = $(".lang-switcher");
  trigger = $("#lang-current");
  if (!switcher || !trigger) return;

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    setOpen(!isOpen());
  });

  switcher.addEventListener("click", (event) => {
    const button = event.target.closest(".lang-btn");
    if (!button) return;

    setLanguage(button.dataset.lang);
    setOpen(false);
    trigger.focus();
  });

  document.addEventListener("click", () => setOpen(false));

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !isOpen()) return;
    setOpen(false);
    trigger.focus();
  });

  onLanguageChange(renderActiveLanguage);
  renderActiveLanguage(getLanguage());
}
