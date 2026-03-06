export function initAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const revealElements = gsap.utils.toArray(".reveal");
  const mainTl = gsap.timeline();

  mainTl
    .to(".loader-progress", { width: "100%", duration: 0.8 })
    .to(".loader", {
      yPercent: -100,
      duration: 0.6,
      ease: "expo.inOut",
      toComplete: () => setTimeout(() => document.body.classList.add("ready"), 300),
    })
    .from(
      ".hero h1",
      { y: 60, opacity: 0, duration: 1, ease: "power3.out" },
      "-=0.2",
    );

  revealElements.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 92%",
        once: true,
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  });
}
