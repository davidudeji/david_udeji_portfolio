/**
 * Motion Library - Scroll Reveal Animations with CSS fallback
 * Using motion.dev for smooth animations with pure CSS fallback
 * Respects prefers-reduced-motion accessibility setting
 */

console.log('Motion library available:', typeof motion !== 'undefined');

// Check if user prefers reduced motion
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

console.log('Prefers reduced motion:', prefersReducedMotion);

// Helper function to animate elements on scroll using CSS transitions
function createScrollReveal(elements, options = {}) {
  const {
    delay = 0,
    staggerDelay = 50,
    duration = 0.6,
    distance = 30,
  } = options;

  console.log('createScrollReveal called with', elements.length, 'elements, duration:', duration);

  if (prefersReducedMotion) {
    elements.forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return;
  }

  elements.forEach((el, index) => {
    const elementDelay = delay + index * staggerDelay;

    // Initial state - hidden
    el.style.opacity = "0";
    el.style.transform = `translateY(${distance}px)`;
    el.style.willChange = "opacity, transform";
    el.style.transition = `opacity ${duration}s ease-out ${elementDelay / 1000}s, transform ${duration}s ease-out ${elementDelay / 1000}s`;

    // Detect when element enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.animationTriggered) {
            entry.target.dataset.animationTriggered = "true";
            
            // Use Motion library if available, otherwise use CSS
            if (typeof motion !== 'undefined' && motion.animate) {
              console.log('Using Motion library for animation');
              motion.animate(
                el,
                { opacity: 1, y: 0 },
                {
                  duration: duration,
                  delay: elementDelay / 1000,
                  easing: [0.22, 1, 0.36, 1],
                }
              );
            } else {
              console.log('Using CSS transition for animation');
              // CSS transition fallback
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }

            // Stop observing after animation triggers
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(el);
  });
}

// Staggered scale animation for cards
function createScaleReveal(elements, options = {}) {
  const {
    delay = 0,
    staggerDelay = 60,
    duration = 0.6,
  } = options;

  console.log('createScaleReveal called with', elements.length, 'elements, duration:', duration);

  if (prefersReducedMotion) {
    elements.forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return;
  }

  elements.forEach((el, index) => {
    const elementDelay = delay + index * staggerDelay;

    // Initial state - scaled down
    el.style.opacity = "0";
    el.style.transform = "scale(0.95) translateY(20px)";
    el.style.willChange = "opacity, transform";
    el.style.transition = `opacity ${duration}s ease-out ${elementDelay / 1000}s, transform ${duration}s ease-out ${elementDelay / 1000}s`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.animationTriggered) {
            entry.target.dataset.animationTriggered = "true";
            
            if (typeof motion !== 'undefined' && motion.animate) {
              console.log('Using Motion library for scale animation');
              motion.animate(
                el,
                { opacity: 1, scale: 1, y: 0 },
                {
                  duration: duration,
                  delay: elementDelay / 1000,
                  easing: [0.22, 1, 0.36, 1],
                }
              );
            } else {
              console.log('Using CSS transition for scale animation');
              // CSS transition fallback
              el.style.opacity = "1";
              el.style.transform = "scale(1) translateY(0)";
            }

            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(el);
  });
}

// Fade-only animation (lighter effect for text)
function createFadeReveal(elements, options = {}) {
  const {
    delay = 0,
    duration = 0.8,
  } = options;

  console.log('createFadeReveal called with', elements.length, 'elements, duration:', duration);

  if (prefersReducedMotion) {
    elements.forEach((el) => {
      el.style.opacity = "1";
    });
    return;
  }

  elements.forEach((el) => {
    el.style.opacity = "0";
    el.style.willChange = "opacity";
    el.style.transition = `opacity ${duration}s ease-out ${delay / 1000}s`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.animationTriggered) {
            entry.target.dataset.animationTriggered = "true";
            
            if (typeof motion !== 'undefined' && motion.animate) {
              console.log('Using Motion library for fade animation');
              motion.animate(
                el,
                { opacity: 1 },
                {
                  duration: duration,
                  delay: delay / 1000,
                  easing: [0.25, 0.46, 0.45, 0.94],
                }
              );
            } else {
              console.log('Using CSS transition for fade animation');
              // CSS transition fallback
              el.style.opacity = "1";
            }

            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(el);
  });
}

// Initialize animations on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  console.log('DOM Content Loaded - Initializing animations');

  // Tech Stack Cards - Staggered scale reveal
  const techCards = document.querySelectorAll(".tech-card");
  if (techCards.length > 0) {
    console.log('Tech cards found:', techCards.length);
    createScaleReveal(techCards, {
      delay: 0,
      staggerDelay: 60,
      duration: 0.8,
    });
  }

  // About Section - Image and text with different timings
  const aboutLeft = document.querySelector(".about-left");
  if (aboutLeft) {
    console.log('About left found - setting up animation');
    // Set initial hidden state for animation
    aboutLeft.style.opacity = "0";
    aboutLeft.style.transform = "translateX(-30px)";
    aboutLeft.style.willChange = "opacity, transform";
    aboutLeft.style.transition = "opacity 1.2s ease-out, transform 1.2s ease-out";

    const aboutLeftObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.animationTriggered) {
            entry.target.dataset.animationTriggered = "true";
            console.log('Animating aboutLeft');
            
            if (typeof motion !== 'undefined' && motion.animate) {
              console.log('Using Motion library for aboutLeft');
              motion.animate(
                aboutLeft,
                { opacity: 1, x: 0 },
                {
                  duration: 1.2,
                  delay: 0,
                  easing: [0.22, 1, 0.36, 1],
                }
              );
            } else {
              console.log('Using CSS for aboutLeft');
              // CSS fallback
              aboutLeft.style.opacity = "1";
              aboutLeft.style.transform = "translateX(0)";
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    aboutLeftObserver.observe(aboutLeft);
  }

  const aboutRight = document.querySelector(".about-right");
  if (aboutRight) {
    console.log('About right found - setting up animation');
    // Set initial hidden state for animation
    aboutRight.style.opacity = "0";
    aboutRight.style.transform = "translateX(30px)";
    aboutRight.style.willChange = "opacity, transform";
    aboutRight.style.transition = "opacity 1.2s ease-out 0.3s, transform 1.2s ease-out 0.3s";

    const aboutRightObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.animationTriggered) {
            entry.target.dataset.animationTriggered = "true";
            console.log('Animating aboutRight');
            
            if (typeof motion !== 'undefined' && motion.animate) {
              console.log('Using Motion library for aboutRight');
              motion.animate(
                aboutRight,
                { opacity: 1, x: 0 },
                {
                  duration: 1.2,
                  delay: 0.3,
                  easing: [0.22, 1, 0.36, 1],
                }
              );
            } else {
              console.log('Using CSS for aboutRight');
              // CSS fallback
              aboutRight.style.opacity = "1";
              aboutRight.style.transform = "translateX(0)";
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    aboutRightObserver.observe(aboutRight);
  }

  // Project Cards - Staggered scale reveal
  const projectCards = document.querySelectorAll(".project-card");
  if (projectCards.length > 0) {
    console.log('Project cards found:', projectCards.length);
    createScaleReveal(projectCards, {
      delay: 0,
      staggerDelay: 80,
      duration: 0.9,
    });
  }

  // Projects Title - Fade in before cards
  const projectsTitle = document.querySelector(".projects-title");
  if (projectsTitle) {
    createFadeReveal([projectsTitle], {
      delay: 0,
      duration: 0.6,
    });
  }

  // About Title - Fade in with delay
  const aboutTitle = document.querySelector(".about-title");
  if (aboutTitle) {
    console.log('About title found - setting up animation');
    aboutTitle.style.opacity = "0";
    aboutTitle.style.transition = "opacity 0.6s ease-out";
    
    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.animationTriggered && !prefersReducedMotion) {
            entry.target.dataset.animationTriggered = "true";
            console.log('Animating aboutTitle');
            
            if (typeof motion !== 'undefined' && motion.animate) {
              console.log('Using Motion library for aboutTitle');
              motion.animate(
                aboutTitle,
                { opacity: 1 },
                { duration: 0.6, easing: [0.25, 0.46, 0.45, 0.94] }
              );
            } else {
              console.log('Using CSS for aboutTitle');
              aboutTitle.style.opacity = "1";
            }
            
            titleObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    titleObserver.observe(aboutTitle);
  }

  // Footer Links - Staggered fade
  const footerLinks = document.querySelectorAll("footer ul li");
  if (footerLinks.length > 0) {
    console.log('Footer links found:', footerLinks.length);
    createFadeReveal(Array.from(footerLinks), {
      delay: 0,
      duration: 0.5,
    });
  }

  console.log('All animations initialized');
});

// Listener for reduced motion preference changes (for live updates)
window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", (e) => {
  if (e.matches) {
    // User enabled reduced motion - remove will-change hints
    document.querySelectorAll("[style*='will-change']").forEach((el) => {
      el.style.willChange = "auto";
    });
  }
});
