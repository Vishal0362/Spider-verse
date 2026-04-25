gsap.registerPlugin(ScrollTrigger);

gsap.to("#spiderman", {
  x: window.innerWidth + 200,
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 1
  }
});

gsap.utils.toArray("section").forEach((section) => {
  gsap.from(section, {
    opacity: 0,
    y: 100,
    duration: 1,
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
    }
  });
});

gsap.registerPlugin(ScrollTrigger);

gsap.to(".far", {
  y: 100,
  scrollTrigger: {
    scrub: true
  }
});

gsap.to(".mid", {
  y: 200,
  scrollTrigger: {
    scrub: true
  }
});

gsap.to(".front", {
  y: 300,
  scrollTrigger: {
    scrub: true
  }
});

gsap.to("#spiderman", {
  motionPath: {
    path: [
      { x: 0, y: 0 },
      { x: 300, y: 150 },
      { x: 600, y: -50 },
      { x: 900, y: 200 }
    ],
    curviness: 1.5
  },
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 1
  }
});

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    let x = e.offsetX;
    let y = e.offsetY;

    card.style.transform = `
      rotateX(${(y - 100)/10}deg)
      rotateY(${(x - 100)/10}deg)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotate(0deg)";
  });
});