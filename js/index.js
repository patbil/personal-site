import { initI18n } from "./i18n.js";
import { initForm } from "./form.js";
import { initMouse } from "./mouse.js";
import { setFooterDate } from "./footer.js";
import { initAnimation } from "./animation.js";
import { initSpotlight } from "./spotlight.js";
import { initNavigation } from "./navigation.js";
import { initScrollProgress } from "./scroll-progress.js";
import { initLanguageSwitcher } from "./language-switcher.js";

const FEATURES = [
  ["animation", initAnimation],
  ["i18n", initI18n],
  ["language-switcher", initLanguageSwitcher],
  ["navigation", initNavigation],
  ["form", initForm],
  ["mouse", initMouse],
  ["spotlight", initSpotlight],
  ["scroll-progress", initScrollProgress],
  ["footer", setFooterDate],
];

function boot() {
  FEATURES.forEach(([name, init]) => {
    try {
      init();
    } catch (error) {
      console.error(`init:${name}`, error);
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
