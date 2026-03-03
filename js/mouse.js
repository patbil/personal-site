export function initMouse() {
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
}
