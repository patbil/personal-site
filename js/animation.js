import { $, $$ } from "./dom.js";
import { LOADER } from "./config.js";
import { prefersReducedMotion } from "./motion.js";

let released = false;

function releasePage() {
  if (released) return;
  released = true;

  $(".loader")?.classList.add("hidden");
  document.body.classList.add("ready");
}

function playIntro(onDone) {
  gsap
    .timeline({ onComplete: onDone })
    .to(".loader-progress", {
      width: "100%",
      duration: 1.2,
      ease: "power2.inOut",
    })
    .to(".loader", {
      yPercent: -100,
      duration: 0.8,
      ease: "expo.inOut",
      onStart: () => setTimeout(releasePage, 100),
    })
    .from(
      ".hero h1",
      {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      },
      "-=0.6",
    );
}

function revealOnScroll() {
  if (!window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  $$(".reveal").forEach((element) => {
    gsap.from(element, {
      scrollTrigger: { trigger: element, start: "top 92%", once: true },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  });
}

export function initAnimation() {
  const watchdog = setTimeout(releasePage, LOADER.watchdogMs);
  const stop = () => {
    clearTimeout(watchdog);
    releasePage();
  };

  if (!window.gsap || prefersReducedMotion()) {
    stop();
    return;
  }

  playIntro(stop);
  revealOnScroll();
}
