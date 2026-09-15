import { $ } from "./dom.js";

let bar = null;
let frame = null;

function update() {
  frame = null;

  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  bar.style.transform = `scaleX(${Math.min(progress, 1).toFixed(4)})`;
}

const schedule = () => {
  frame ??= requestAnimationFrame(update);
};

export function initScrollProgress() {
  bar = $(".scroll-progress span");
  if (!bar) return;

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  update();
}
