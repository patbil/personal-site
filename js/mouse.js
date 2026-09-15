import { isCoarsePointer, prefersReducedMotion } from "./motion.js";

const EASING = 0.12;
const EPSILON = 0.05;

const target = { x: 50, y: 50 };
const position = { x: 50, y: 50 };
let frame = null;

function render() {
  position.x += (target.x - position.x) * EASING;
  position.y += (target.y - position.y) * EASING;

  document.body.style.setProperty("--mouse-x", `${position.x.toFixed(2)}%`);
  document.body.style.setProperty("--mouse-y", `${position.y.toFixed(2)}%`);

  const settled =
    Math.abs(target.x - position.x) < EPSILON &&
    Math.abs(target.y - position.y) < EPSILON;

  frame = settled ? null : requestAnimationFrame(render);
}

export function initMouse() {
  if (isCoarsePointer() || prefersReducedMotion()) return;

  window.addEventListener(
    "mousemove",
    (event) => {
      target.x = (event.clientX / window.innerWidth) * 100;
      target.y = (event.clientY / window.innerHeight) * 100;
      frame ??= requestAnimationFrame(render);
    },
    { passive: true },
  );
}
