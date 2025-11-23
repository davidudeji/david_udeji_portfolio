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
const text = "Software Developer • Frontend Specialist";
let index = 0;

function typeLetters() {
  typingElement.textContent = text.slice(0, index);
  index++;

  if (index <= text.length) {
    setTimeout(typeLetters, 200); // typing speed
  }
}

setTimeout(typeLetters, 1500); // wait 1.5 sec before typing starts
// get all faces element
const faces = [];
const face1 = document.getElementById("face1");
const face2 = document.getElementById("face2");
const face3 = document.getElementById("face3");
const face4 = document.getElementById("face4");
const face5 = document.getElementById("face5");
const face6 = document.getElementById("face6");

const cube = document.getElementById("cube");

faces.push(face1, face2, face3, face4, face5, face6);

// function CircularQueue(capacity) {
//   this.faces = faces;
//   this.queue = new Array(faces);
//   this.front = 0;
//   this.rear = -1;
//   this.size = 0;
// }
// // Add element
// enqueue(){
//   if(this.isFull()){
//     console.log("Queue is full")
//     return false
//   }

//   // Move rear pointer circularly
// this.rear = (this.rear + 1) % this.faces;
// this.queue[this.rear] = [...faces];
// this.size++;
// return true
// }

// dequeue(){
//   if(this.isEmpty()){
//     console.log("Queue is empty");
//     return null;
//   }
//   const removed = this.queue[this.front];
//   this.queue[this.front] = undefined;

//   // Move front pointer circularly
//   this.front = (this.front + 1) % this.capacity;
//   this.size--;
//   return removed;
// }
for (let i = 0; i <= faces.length; i++) {
  faces[i].textContent = "SQL";
}
// cubes.addEventListener('mouseOver', (e)=>{

// })
