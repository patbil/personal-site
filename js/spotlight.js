import { isCoarsePointer, prefersReducedMotion } from "./motion.js";

const SELECTOR = ".tech-card, .project-image-wrapper, .contact-form";

let pending = null;
let frame = null;

function apply() {
  frame = null;
  if (!pending) return;

  const { card, x, y } = pending;
  card.style.setProperty("--spot-x", `${x}px`);
  card.style.setProperty("--spot-y", `${y}px`);
}

export function initSpotlight() {
  if (isCoarsePointer() || prefersReducedMotion()) return;

  document.addEventListener(
    "pointermove",
    (event) => {
      const card = event.target.closest?.(SELECTOR);
      if (!card) return;

      const rect = card.getBoundingClientRect();
      pending = {
        card,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };

      frame ??= requestAnimationFrame(apply);
    },
    { passive: true },
  );
}
