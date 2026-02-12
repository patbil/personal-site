const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  nav.classList.toggle("active");
});

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    nav.classList.remove("active");
  });
});

const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.2 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.35;
    this.speedY = (Math.random() - 0.5) * 0.35;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (
      this.x < 0 ||
      this.x > canvas.width ||
      this.y < 0 ||
      this.y > canvas.height
    )
      this.reset();
  }
  draw() {
    ctx.fillStyle = "rgba(155, 107, 255, 0.12)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < 50; i++) particles.push(new Particle());

function animateBg() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateBg);
}
animateBg();

window.addEventListener("mousemove", (e) => {
  document.body.style.setProperty(
    "--mouse-x",
    (e.clientX / window.innerWidth) * 100 + "%",
  );
  document.body.style.setProperty(
    "--mouse-y",
    (e.clientY / window.innerHeight) * 100 + "%",
  );
});

gsap.registerPlugin(ScrollTrigger);
window.addEventListener("load", () => {
  const tl = gsap.timeline();
  tl.to(".loader-progress", { width: "100%", duration: 0.8 })
    .to("#loader", { yPercent: -100, duration: 0.6, ease: "expo.inOut" })
    .from(
      ".hero h1",
      { y: 60, opacity: 0, duration: 1, ease: "power3.out" },
      "-=0.2",
    );

  gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 92%" },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  });
});
