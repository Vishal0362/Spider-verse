// Register plugin
gsap.registerPlugin(ScrollTrigger);

/* 🧠 Helper: total scroll distance */
function getScrollDistance() {
  return document.body.scrollHeight - window.innerHeight;
}

/* 🕷️ Spider-Man scroll movement */
gsap.to("#spiderman", {
  y: () => getScrollDistance(),
  ease: "none",
  scrollTrigger: {
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    scrub: 1
  }
});

/* 🕸️ Web follows */
gsap.to("#web-line", {
  height: () => getScrollDistance(),
  ease: "none",
  scrollTrigger: {
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    scrub: 1
  }
});

/* ✨ Section fade-in */
gsap.utils.toArray("section").forEach((section) => {
  gsap.from(section, {
    opacity: 0,
    y: 80,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: section,
      start: "top 85%"
    }
  });
});

/* 🎴 Card tilt (smoother) */
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y - rect.height / 2) / 12;
    const rotateY = (x - rect.width / 2) / 12;

    card.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.05)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});

/* 🎬 Hero content animation */
gsap.from(".hero-content", {
  y: 60,
  opacity: 0,
  duration: 1,
  ease: "power2.out",
  delay: 0.2
});

/* 🔁 Refresh on resize (IMPORTANT) */
window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});