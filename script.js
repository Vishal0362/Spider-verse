// ✅ Register ONCE
gsap.registerPlugin(ScrollTrigger);

/* 🧠 Helper */
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
    scrub: 1,
    onUpdate: updateWeb
  }
});

/* 🕸️ Web follows */
function updateWeb() {
  const spidey = document.getElementById("spiderman");
  const web = document.getElementById("web-line");

  if (!spidey || !web) return;

  const rect = spidey.getBoundingClientRect();
  web.style.height = rect.top + "px";
}

/* 🎬 HERO SCROLL */
gsap.timeline({
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
})
.to(".hero-content", {
  y: -250,
  opacity: 0.2,   // ⚠️ don't go fully 0
  ease: "none"
}, 0)
.to(".hero-bg", {
  scale: 1.2,
  y: 120,
  ease: "none"
}, 0);

/* ✨ SECTION REVEAL (SAFE) */
gsap.utils.toArray("section").forEach((section) => {
  gsap.from(section, {
    y: 80,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: section,
      start: "top 85%"
    }
  });
});

/* 🎬 SECTION 1 ENTRY */
gsap.timeline({
  scrollTrigger: {
    trigger: ".reveal-left",
    start: "top 75%",
    toggleActions: "play none none reverse"
  }
})
.from(".reveal-left", {
  x: -120,
  duration: 1,
  ease: "power3.out"
}, 0)
.from(".reveal-bottom", {
  y: 120,
  duration: 1,
  ease: "power3.out"
}, 0);

/* 🕷️ SPIDEY SIDE MOVE */
gsap.to(".reveal-bottom img", {
  x: 120,
  scrollTrigger: {
    trigger: ".reveal-bottom",
    start: "top 80%",
    end: "bottom top",
    scrub: true
  }
});

/* 🎴 SMOOTH 3D TILT (OPTIMIZED) */
document.querySelectorAll(".movie-card").forEach(card => {

  let bounds;

  card.addEventListener("mouseenter", () => {
    bounds = card.getBoundingClientRect();
  });

  card.addEventListener("mousemove", (e) => {
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    const rotateX = (y - bounds.height / 2) / 25;
    const rotateY = (x - bounds.width / 2) / 25;

    gsap.to(card, {
      rotateX: -rotateX,
      rotateY: rotateY,
      scale: 1.04,
      duration: 0.2,
      ease: "power2.out",
      transformPerspective: 800
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  });

});