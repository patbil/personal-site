document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const nav = document.querySelector("nav");
  const hamburger = document.querySelector(".hamburger");
  const revealElements = gsap.utils.toArray(".reveal");

  if (hamburger && nav) {
    const toggleMenu = () => {
      const isOpened = hamburger.classList.toggle("active");
      nav.classList.toggle("active");
      hamburger.setAttribute("aria-expanded", isOpened);
    };

    hamburger.addEventListener("click", toggleMenu);

    nav.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        hamburger.classList.remove("active");
        nav.classList.remove("active");
      }
    });
  }

  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    gsap.to(document.body, {
      "--mouse-x": `${x}%`,
      "--mouse-y": `${y}%`,
      duration: 0.2,
      overwrite: "auto",
    });
  });

  const mainTl = gsap.timeline();

  mainTl
    .to(".loader-progress", { width: "100%", duration: 0.8 })
    .to(".loader", { yPercent: -100, duration: 0.6, ease: "expo.inOut" })
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
});
