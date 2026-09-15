import { initI18n } from "./i18n.js";
import { initForm } from "./form.js";
import { initMouse } from "./mouse.js";
import { setFooterDate } from "./footer.js";
import { initAnimation } from "./animation.js";
import { initSpotlight } from "./spotlight.js";
import { initNavigation } from "./navigation.js";
import { initLanguageSwitcher } from "./language-switcher.js";

// Composition root: the only place that knows the full feature list.
const FEATURES = [
  // Runs first — it is what unlocks the page from behind the loader.
  ["animation", initAnimation],
  ["i18n", initI18n],
  ["language-switcher", initLanguageSwitcher],
  ["navigation", initNavigation],
  ["form", initForm],
  ["mouse", initMouse],
  ["spotlight", initSpotlight],
  ["footer", setFooterDate],
];

// One failing feature must not abort the rest of the boot sequence.
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
