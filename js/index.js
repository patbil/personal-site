import { initForm } from "./form.js";
import { initMouse } from "./mouse.js";
import { setFooterDate } from "./footer.js";
import { initLanguage } from "./language.js";
import { initAnimation } from "./animation.js";
import { initNavigation } from "./navigation.js";

document.addEventListener("DOMContentLoaded", () => {
  initForm();
  initMouse();
  initLanguage();
  initAnimation();
  initNavigation();
  setFooterDate();
});
