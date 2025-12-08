// Certificate titles - replace with your real certificate names if you want
const certificates = [
  "Front-End Dev - Coursera",
  "Advanced CSS Animations",
  "JavaScript ",
  "Cybersecurity - Udemy",
  "Artificial Intelligence",
];

// populate dropdown
const dropdown = document.getElementById("cert-dropdown");
function buildCertList(items) {
  dropdown.innerHTML = ""; // clear
  items.forEach((t, i) => {
    const li = document.createElement("li");
    li.setAttribute("role", "none");
    const a = document.createElement("a");
    a.setAttribute("role", "menuitem");
    a.href = "#"; // link or modal trigger
    a.textContent = t;

    a.tabIndex = -1; // removed from tab order until opened
    li.appendChild(a);
    dropdown.appendChild(li);
  });
}
buildCertList(certificates);

// Accessibility + toggle behavior (click for mobile, hover works for desktop via CSS)
const certItem = document.querySelector(".nav-item.certificates");
const toggleBtn = certItem.querySelector(".nav-button");

function openDropdown() {
  dropdown.style.opacity = "1";
  dropdown.style.transform = "translateY(0)";
  dropdown.style.pointerEvents = "auto";
  dropdown.setAttribute("aria-hidden", "false");
  toggleBtn.setAttribute("aria-expanded", "true");
  // make items focusable
  Array.from(dropdown.querySelectorAll("a")).forEach((a) => (a.tabIndex = 0));
}
function closeDropdown() {
  dropdown.style.opacity = "";
  dropdown.style.transform = "";
  dropdown.style.pointerEvents = "";
  dropdown.setAttribute("aria-hidden", "true");
  toggleBtn.setAttribute("aria-expanded", "false");
  Array.from(dropdown.querySelectorAll("a")).forEach((a) => (a.tabIndex = -1));
}

// click/tap toggling for mobile
toggleBtn.addEventListener("click", (e) => {
  const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
  if (expanded) closeDropdown();
  else openDropdown();
  e.stopPropagation();
});

// close when clicking outside
document.addEventListener("click", (e) => {
  if (!certItem.contains(e.target)) closeDropdown();
});

// keyboard: open with ArrowDown, close with Escape
toggleBtn.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    e.preventDefault();
    openDropdown();
    const first = dropdown.querySelector("a");
    if (first) first.focus();
  }
  if (e.key === "Escape") {
    closeDropdown();
    toggleBtn.focus();
  }
});

// close on Escape inside dropdown
dropdown.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDropdown();
    toggleBtn.focus();
  }
});

// Initialize: set items non-focusable until opened (good for keyboard)
closeDropdown();

// 3D cube animation
// const cube = document.querySelector(".cube");
// Delay the cube reveal
setTimeout(() => {
  document.querySelector(".cube").classList.add("show");
}, 2000);

let mouseX = 0,
  mouseY = 0;

// Mouse tracking rotation

setTimeout(() => {
  window.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 40;
    mouseY = (e.clientY / window.innerHeight - 0.5) * -40;

    cube.style.animation = "none";
    cube.style.transform = `rotateX(${mouseY}deg) rotateY(${mouseX}deg)`;
  });
}, 3000);

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
const text = "Software Developer • Frontend Specialist";
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

setTimeout(typeLetters, 1000); // wait 1.5 sec before typing starts
setTimeout(typingSkills, 800);

// Section
// GSAP + ScrollTrigger setup
gsap.registerPlugin(ScrollTrigger);

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
