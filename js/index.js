import { initForm } from "./form.js";
import { initMouse } from "./mouse.js";
import { setFooterDate } from "./footer.js";
import { initAnimation } from "./animation.js";
import { initNavigation } from "./navigation.js";

document.addEventListener("DOMContentLoaded", () => {
  initForm();
  initMouse();
  initAnimation();
  initNavigation();
  setFooterDate();
});
