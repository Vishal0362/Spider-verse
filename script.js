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

document.addEventListener("DOMContentLoaded", () => {

  const movieView = document.getElementById("movieView");
  const overlay = document.getElementById("movieOverlay");
  const content = document.getElementById("movieContent");

  const img = document.getElementById("movieImg");
  const title = document.getElementById("movieTitle");
  const desc = document.getElementById("movieDesc");
  const universe = document.getElementById("movieUniverse");

  const closeBtn = document.getElementById("closeMovie");

  const universeLabels = {
    "EARTH-96283": "Tobey Maguire Era",
    "EARTH-120703": "Andrew Garfield Era",
    "EARTH-616": "MCU",
    "MULTIVERSE": "Multiverse Event",
    "SPIDER-VERSE": "Spider-Verse"
  };

  function openMovie(card) {
    const cardImg = card.querySelector("img");
    if (!cardImg) return;

    title.textContent = card.dataset.title || "";
    desc.textContent = card.dataset.desc || "";
    universe.textContent = universeLabels[card.dataset.universe] || card.dataset.universe || "";

    img.src = cardImg.src;
    img.alt = card.dataset.title || cardImg.alt || "";
    img.style.opacity = "0";

    movieView.style.display = "flex";
    movieView.classList.remove("pointer-events-none");
    movieView.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    gsap.killTweensOf([movieOverlay, content, img]);
    gsap.set(movieOverlay, { opacity: 0 });
    gsap.set(content, { opacity: 0, scale: 0.95, y: 24 });

    gsap.timeline()
      .to(movieView, { opacity: 1, duration: 0.15, ease: "power1.out" }, 0)
      .to(movieOverlay, { opacity: 1, duration: 0.22, ease: "power2.out" }, 0)
      .to(content, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "power3.out" }, 0.05)
      .to(img, { opacity: 1, duration: 0.25, ease: "power2.out" }, 0.18);
  }

  function closeMovie() {
    gsap.killTweensOf([movieOverlay, content, img, movieView]);

    gsap.timeline({
      onComplete: () => {
        movieView.style.display = "none";
        movieView.classList.add("pointer-events-none");
        movieView.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "auto";
      }
    })
      .to(content, { opacity: 0, scale: 0.96, y: 18, duration: 0.18, ease: "power2.in" }, 0)
      .to(movieOverlay, { opacity: 0, duration: 0.2, ease: "power2.in" }, 0.02)
      .to(movieView, { opacity: 0, duration: 0.2, ease: "power1.in" }, 0.02);
  }

  document.querySelectorAll(".movie-card").forEach(card => {
    card.addEventListener("click", () => openMovie(card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openMovie(card);
      }
    });
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
  });

  // ✅ BUTTON WORKS
  closeBtn.addEventListener("click", closeMovie);

  // ✅ CLICK OUTSIDE
  overlay.addEventListener("click", closeMovie);

  // ✅ ESC KEY
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMovie();
  });

});
