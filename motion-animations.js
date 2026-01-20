/**
 * Motion Library - Scroll Reveal Animations
 * Using motion.dev for smooth, performant scroll-triggered animations
 * Respects prefers-reduced-motion accessibility setting
 */

// Check if user prefers reduced motion
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// Helper function to animate elements on scroll
function createScrollReveal(elements, options = {}) {
  const {
    delay = 0,
    staggerDelay = 50,
    duration = 0.6,
    distance = 30,
  } = options;

  // Return early if reduced motion is preferred
  if (prefersReducedMotion) {
    elements.forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return;
  }

  // Use Motion's scroll-triggered animations
  elements.forEach((el, index) => {
    const elementDelay = delay + index * staggerDelay;

    // Initial state
    el.style.opacity = "0";
    el.style.transform = `translateY(${distance}px)`;
    el.style.willChange = "opacity, transform";

    // Detect when element enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger animation with Motion API
            motion.animate(
              el,
              {
                opacity: 1,
                y: 0, // translateY
              },
              {
                duration: duration,
                delay: elementDelay / 1000, // Convert ms to seconds
                easing: [0.22, 1, 0.36, 1], // Custom cubic-bezier easing
              }
            );

            // Stop observing after animation triggers
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before fully visible
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

  if (prefersReducedMotion) {
    elements.forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return;
  }

  elements.forEach((el, index) => {
    const elementDelay = delay + index * staggerDelay;

    // Initial state - scaled down slightly
    el.style.opacity = "0";
    el.style.transform = "scale(0.95) translateY(20px)";
    el.style.willChange = "opacity, transform";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            motion.animate(
              el,
              {
                opacity: 1,
                scale: 1,
                y: 0,
              },
              {
                duration: duration,
                delay: elementDelay / 1000,
                easing: [0.22, 1, 0.36, 1],
              }
            );

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

  if (prefersReducedMotion) {
    elements.forEach((el) => {
      el.style.opacity = "1";
    });
    return;
  }

  elements.forEach((el) => {
    el.style.opacity = "0";
    el.style.willChange = "opacity";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            motion.animate(
              el,
              {
                opacity: 1,
              },
              {
                duration: duration,
                delay: delay / 1000,
                easing: [0.25, 0.46, 0.45, 0.94],
              }
            );

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
  // Tech Stack Cards - Staggered scale reveal
  const techCards = document.querySelectorAll(".tech-card");
  if (techCards.length > 0) {
    createScaleReveal(techCards, {
      delay: 0,
      staggerDelay: 60,
      duration: 0.5,
    });
  }

  // About Section - Image and text with different timings
  const aboutLeft = document.querySelector(".about-left");
  if (aboutLeft) {
    // Keep visible by default, animate on intersection
    aboutLeft.style.opacity = "1";
    aboutLeft.style.transform = "none";

    const aboutLeftObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !prefersReducedMotion && !entry.target.dataset.animated) {
            entry.target.dataset.animated = "true";
            motion.animate(
              aboutLeft,
              {
                opacity: 1,
                x: 0,
              },
              {
                duration: 0.7,
                delay: 0,
                easing: [0.22, 1, 0.36, 1],
              }
            );
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );
    aboutLeftObserver.observe(aboutLeft);
  }

  const aboutRight = document.querySelector(".about-right");
  if (aboutRight) {
    // Keep visible by default, animate on intersection
    aboutRight.style.opacity = "1";
    aboutRight.style.transform = "none";

    const aboutRightObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !prefersReducedMotion && !entry.target.dataset.animated) {
            entry.target.dataset.animated = "true";
            motion.animate(
              aboutRight,
              {
                opacity: 1,
                x: 0,
              },
              {
                duration: 0.7,
                delay: 0.15,
                easing: [0.22, 1, 0.36, 1],
              }
            );
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );
    aboutRightObserver.observe(aboutRight);
  }

  // Project Cards - Staggered scale reveal
  const projectCards = document.querySelectorAll(".project-card");
  if (projectCards.length > 0) {
    createScaleReveal(projectCards, {
      delay: 0,
      staggerDelay: 80,
      duration: 0.6,
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
    aboutTitle.style.opacity = "0";
    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !prefersReducedMotion) {
            motion.animate(
              aboutTitle,
              { opacity: 1 },
              { duration: 0.6, easing: [0.25, 0.46, 0.45, 0.94] }
            );
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
    createFadeReveal(Array.from(footerLinks), {
      delay: 0,
      duration: 0.5,
    });
  }
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
