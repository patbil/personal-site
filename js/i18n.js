import { LANGUAGE } from "./config.js";
import { $, $$, setAttributes } from "./dom.js";

const CHANGE_EVENT = "i18n:change";

let translations = {};
let currentLanguage = LANGUAGE.fallback;

// --- RESOLUTION ---

function resolve(source, path) {
  return path
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .reduce(
      (value, key) => (value && value[key] !== undefined ? value[key] : undefined),
      source,
    );
}

function normalize(language) {
  return LANGUAGE.supported.includes(language) ? language : LANGUAGE.fallback;
}

function detect() {
  const stored = localStorage.getItem(LANGUAGE.storageKey);
  if (LANGUAGE.supported.includes(stored)) return stored;

  const browser = (navigator.language || "").toLowerCase();
  return LANGUAGE.supported.find((lang) => browser.startsWith(lang)) ?? LANGUAGE.fallback;
}

async function load(language) {
  try {
    const response = await fetch(`./i18n/${language}.json`);
    if (!response.ok) throw new Error(`Failed to load: ${language}.json`);
    return await response.json();
  } catch (error) {
    console.error("i18n:", error);
    return null;
  }
}

// --- APPLICATION ---

function applyText() {
  $$("[data-i18n]").forEach((element) => {
    const value = resolve(translations, element.dataset.i18n);
    // textContent, never innerHTML — translation files must stay inert data.
    if (typeof value === "string") element.textContent = value;
  });
}

function applyMeta() {
  const description = resolve(translations, "meta.description");

  setAttributes($('meta[name="description"]'), { content: description });
  setAttributes($('meta[property="og:description"]'), { content: description });
  setAttributes($('meta[name="twitter:description"]'), {
    content: description,
  });
}

function applyLocalizedAssets(language) {
  const resume = $(".resume");
  if (resume) resume.href = `./assets/files/resume-${language}.pdf`;
}

// --- PUBLIC ---

export function translate(key, fallback = "") {
  const value = resolve(translations, key);
  return typeof value === "string" ? value : fallback;
}

export const getLanguage = () => currentLanguage;

export async function setLanguage(language) {
  const target = normalize(language);
  const data = await load(target);

  // A failed fetch must not blank the page — keep whatever is rendered.
  if (!data) return;

  translations = data;
  currentLanguage = target;

  document.documentElement.lang = target;
  localStorage.setItem(LANGUAGE.storageKey, target);

  applyText();
  applyMeta();
  applyLocalizedAssets(target);

  document.dispatchEvent(
    new CustomEvent(CHANGE_EVENT, { detail: { language: target } }),
  );
}

export function onLanguageChange(handler) {
  document.addEventListener(CHANGE_EVENT, (event) =>
    handler(event.detail.language),
  );
}

export const initI18n = () => setLanguage(detect());
