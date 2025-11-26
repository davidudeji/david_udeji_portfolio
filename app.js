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

// function typeText(text, element, callback) {
//   element.textContent = "";
//   let i = 0;

//   let typer = setInterval(() => {
//     element.textContent += text[i];
//     i++;
//     if (i === text.length) {
//       clearInterval(typer);
//       setTimeout(callback, delayBetweenSkills);
//     }
//   }, typingSpeed);
// }

// function startTyping() {
//   let currentFace = faces[faceIndex];
//   let currentSkill = skills[skillIndex];

//   // clear alll faces first
//   // faces.forEach((f) => (f.textContent = ""));

//   // Type on the current face
//   typeText(currentSkill, currentFace, () => {
//     // Move to next skills and face
//     skillIndex = (skillIndex + 1) % skills.length;
//     faceIndex = (faceIndex + 1) % faces.length;
//     faces.textContent = currentSkill;

//     startTyping();
//   });
// }
// // Start animation
// startTyping();

function typeLetters() {
  typingElement.textContent = text.slice(0, index);
  index++;
  let currentSkill = skills[skillIndex];
  skillIndex = (skillIndex + 1) % skills.length;
  faceIndex = (faceIndex + 1) % faces.length;
  faces.textContent = currentSkill;

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
setTimeout(typingSkills, 1000);
