// Certificate functionality - REMOVED (certificates now link to new page)

// 3D cube animation - REMOVED (replaced with tech stack cards)
// Delay the cube reveal
// setTimeout(() => {
//   document.querySelector(".cube").classList.add("show");
// }, 2000);

let mouseX = 0,
  mouseY = 0;

// Mouse tracking rotation - REMOVED (was for cube)

// Typing text
const typingElement = document.querySelector(".typing");
const faces = document.querySelector(".typingSkills");
const skills = [
  "HTML",
  "CSS",
  "JAVASCRIPT",
  "REACT",
  "NEXT",
  "NODE JS",
  "API DESIGN",
];

let faceIndex = 0;
let skillIndex = 0;
let typingSpeed = 120;
let delayBetweenSkills = 1000;
const text = "Software Developer.";
let index = 0;


function typeLetters() {
  typingElement.textContent = text.slice(0, index);
  index++;

  if (index <= text.length) {
    setTimeout(typeLetters, 300); // typing speed
  }
}
function typingSkills() {
  let currentSkill = skills[skillIndex];
  skillIndex = (skillIndex + 1) % skills.length;
  faceIndex = (faceIndex + 1) % faces.length;
  faces.textContent = currentSkill;
  setTimeout(typingSkills, 1000);
}

setTimeout(typeLetters, 300); // wait 1.5 sec before typing starts
setTimeout(typingSkills, 800);

// Section
// GSAP + ScrollTrigger setup
gsap.registerPlugin(ScrollTrigger);

// Animate About Section on scroll into view
gsap.timeline({
  scrollTrigger: {
    trigger: ".about-wrap",
    start: "top 80%",
    markers: false,
  },
}).to(
  ".about-left",
  {
    duration: 1,
    x: 0,
    opacity: 1,
    ease: "power2.out",
  },
  0
).to(
  ".about-right",
  {
    duration: 1,
    opacity: 1,
    ease: "power2.out",
  },
  0
);

// Animate Project Carousel on scroll into view
gsap.timeline({
  scrollTrigger: {
    trigger: "#projects",
    start: "top 80%",
    markers: false,
  },
}).to(
  ".carousel-track",
  {
    duration: 1,
    opacity: 1,
    ease: "power2.out",
  },
  0
);

// tilt photo with mouse
const photoWrap = document.getElementById("photoWrap");
photoWrap.addEventListener("mousemove", (e) => {
  const rect = photoWrap.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  const rotateY = x * 14; // ↔
  const rotateX = -y * 10; // ↕
  photoWrap.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
});
photoWrap.addEventListener("mouseleave", () => {
  photoWrap.style.transform = "";
});

// Flip panels on scroll — animate from rotateX(90deg) -> rotateX(0deg)

// Add background when scrolling
const nav = document.getElementById("navbar");
const about = document.getElementById("about-section");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
    console.log(window.scrollY);
    // about.style.transform = "scale(1.02)";
  } else {
    nav.classList.remove("scrolled");
  }
});

// Slide-in on load + IntersectionObserver for panels
document.addEventListener("DOMContentLoaded", () => {
  const wrap = document.querySelector(".about-wrap");
  // initial hidden (prevent visible jump)
  wrap.classList.add("preload");

  // small timeout to allow paint, then slide-in (2 ways: onload or when visible)
  requestAnimationFrame(() => {
    // If you want the whole section to slide in only when visible, use IO instead of immediate
    wrap.classList.add("slide-in");
    wrap.classList.remove("preload");
  });

  // Panels flip when they enter viewport
  const panels = document.querySelectorAll(".panel");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        } else {
          // If you want panels to flip back when out of view, uncomment:
          // entry.target.classList.remove('in-view');
        }
      });
    },
    { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
  );

  panels.forEach((p) => observer.observe(p));
});

// Tilt card mouse tracking (subtle)
const card = document.querySelector(".tilt-card");
if (
  card &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches
) {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * 18; // max 18deg
    const rotateX = (0.5 - py) * 12; // max 12deg

    card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(0)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });

  // keyboard focus tilt (accessible)
  card.addEventListener("focus", () => card.classList.add("focused"));
  card.addEventListener("blur", () => card.classList.remove("focused"));
}
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);

// Duplicate track content for smooth infinite effect
slides.forEach(slide => {
  const clone = slide.cloneNode(true);
  track.appendChild(clone);
});
