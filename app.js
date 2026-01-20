// Hamburger Menu Toggle
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");

hamburgerBtn.addEventListener("click", () => {
  hamburgerBtn.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close menu when a link is clicked
navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    hamburgerBtn.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest("#navbar")) {
    hamburgerBtn.classList.remove("active");
    navMenu.classList.remove("active");
  }
});


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

// tilt photo with mouse
const photoWrap = document.getElementById("photoWrap");
if (photoWrap) {
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
}

