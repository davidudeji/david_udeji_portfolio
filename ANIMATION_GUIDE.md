# Motion Library Animation Implementation Guide

## Overview

This portfolio now uses the **Motion library** (https://motion.dev/) for smooth, performant scroll-reveal animations. All animations respect the user's accessibility preference for reduced motion.

---

## Animation Strategy

### 1. **Tech Stack Cards** (Hero Section)

- **Animation Type**: Staggered scale reveal
- **Effect**: Cards scale from 0.95 → 1.0 with opacity fade-in
- **Timing**:
  - Duration: 0.5s
  - Stagger: 60ms between each card
  - Trigger: Enters viewport
- **Elements**: `.tech-card`

### 2. **About Section**

- **Image (Left)**:
  - Slides in from left (translateX: -30px → 0)
  - Opacity: 0 → 1
  - Duration: 0.7s
  - Delay: 0ms
- **Content (Right)**:
  - Slides in from right (translateX: 30px → 0)
  - Opacity: 0 → 1
  - Duration: 0.7s
  - Delay: 150ms (staggered after image)
- **Trigger**: Section enters viewport

### 3. **Project Cards Grid**

- **Animation Type**: Staggered scale reveal
- **Effect**: Cards scale from 0.95 → 1.0 with opacity fade-in
- **Timing**:
  - Duration: 0.6s
  - Stagger: 80ms between each card
  - Trigger: Grid enters viewport
- **Elements**: `.project-card`

### 4. **Section Titles**

- **Projects Title**:
  - Simple fade-in (opacity: 0 → 1)
  - Duration: 0.6s
  - Triggers before project cards
- **About Title**:
  - Fade-in effect
  - Duration: 0.6s
  - Smooth easing

### 5. **Footer Social Links**

- **Animation Type**: Fade-in
- **Timing**: 0.5s duration
- **Trigger**: Footer enters viewport
- **Elements**: `footer ul li`

---

## Key Features

### Performance Optimizations

✅ **GPU Acceleration**: Uses `will-change` and `backface-visibility` for hardware acceleration
✅ **Efficient Observers**: IntersectionObserver stops watching after animation triggers
✅ **No Reflows**: Direct CSS transforms (avoid layout triggers)
✅ **Smooth Easing**: Custom cubic-bezier easing for natural motion

### Accessibility

✅ **Respects `prefers-reduced-motion`**: All animations disabled if user prefers reduced motion
✅ **Keyboard Navigation**: Animations don't interfere with focus management
✅ **Semantic HTML**: No changes to DOM structure

### Browser Support

✅ Modern browsers with IntersectionObserver support
✅ Graceful fallback to instant display if Motion library fails

---

## File Structure

```
motion-animations.js      // Main animation logic
index.html                // Motion library CDN import + script reference
app.js                    // Core interactions (menu, typing effects)
main.css                  // Styling + GPU acceleration hints
```

---

## Code Reference

### Main Animation Functions

#### `createScrollReveal(elements, options)`

Generic fade + slide-up animation for single or multiple elements.

**Parameters:**

- `elements`: Array of DOM elements
- `options.delay`: Initial delay in ms
- `options.duration`: Animation duration in seconds
- `options.distance`: Slide distance in px (default: 30)
- `options.staggerDelay`: Delay between staggered items in ms

**Example:**

```javascript
createScrollReveal([element], {
  delay: 0,
  duration: 0.8,
  distance: 30,
});
```

#### `createScaleReveal(elements, options)`

Staggered scale + fade animation, ideal for card grids.

**Parameters:**

- `elements`: Array of DOM elements
- `options.staggerDelay`: Delay between items in ms
- `options.duration`: Animation duration in seconds

**Example:**

```javascript
createScaleReveal(techCards, {
  staggerDelay: 60,
  duration: 0.5,
});
```

#### `createFadeReveal(elements, options)`

Simple opacity fade-in for text and lightweight elements.

**Parameters:**

- `elements`: Array of DOM elements
- `options.delay`: Delay in ms
- `options.duration`: Duration in seconds

---

## Customization

### Adjust Animation Timing

Edit `motion-animations.js` to change timing values:

```javascript
// Example: Slower project card stagger
createScaleReveal(projectCards, {
  staggerDelay: 120, // Increase from 80
  duration: 0.8, // Increase from 0.6
});
```

### Change Easing

Motion uses custom cubic-bezier easing: `[0.22, 1, 0.36, 1]` (similar to ease-out)

Preset easings available:

- **Ease-in-out**: `[0.25, 0.46, 0.45, 0.94]` (used for fades)
- **Custom smooth**: `[0.22, 1, 0.36, 1]` (used for reveals)

### Add New Animated Sections

1. Give elements a unique class (e.g., `.my-section`)
2. Add observer logic in `motion-animations.js`:

```javascript
const myElements = document.querySelectorAll(".my-section");
if (myElements.length > 0) {
  createScaleReveal(myElements, {
    staggerDelay: 60,
    duration: 0.6,
  });
}
```

---

## Testing

### Verify Animations

1. Open DevTools → Network tab
2. Reload page and check Motion library loads
3. Scroll through sections and verify staggered reveals
4. Check Elements tab for `will-change` and `opacity` values

### Test Accessibility

1. Open DevTools → Rendering → Emulate CSS media feature prefers-reduced-motion
2. Reload page
3. Verify all animations are disabled
4. Confirm content is still readable and interactive

### Performance

- Use Lighthouse Performance audit
- Check GPU utilization in Chrome DevTools
- Monitor FPS during scroll (target: 60 FPS)

---

## Troubleshooting

### Animations Not Playing

- Check browser console for JavaScript errors
- Verify Motion library CDN loaded: `window.motion` exists?
- Check if `prefers-reduced-motion` is enabled

### Jittery or Slow Animations

- Disable extensions that inject CSS/JS
- Check browser DevTools Rendering tab for:
  - Excessive repaints
  - Layout thrashing
  - Composite layers

### Elements Visible Before Animation

- Ensure initial states are set correctly (opacity: 0)
- Check CSS cascade isn't overriding inline styles

---

## Migration Notes

### Removed from app.js

- ❌ GSAP library (CDN removed)
- ❌ ScrollTrigger setup
- ❌ Manual GSAP timeline animations for about/projects sections

### Maintained in app.js

- ✅ Hamburger menu functionality
- ✅ Typing effect animation
- ✅ Photo tilt on mouse move
- ✅ Navbar background on scroll

### CSS Changes

- Removed inline `opacity: 0; transform: translateX(...)` from initial states
- Added `backface-visibility` and `transform: translateZ(0)` for GPU acceleration
- Removed unused GSAP animation class hooks

---

## Browser Compatibility

| Feature                | Chrome | Firefox | Safari | Edge |
| ---------------------- | ------ | ------- | ------ | ---- |
| Motion Library         | ✅     | ✅      | ✅     | ✅   |
| IntersectionObserver   | ✅     | ✅      | ✅     | ✅   |
| prefers-reduced-motion | ✅     | ✅      | ✅     | ✅   |
| CSS transforms         | ✅     | ✅      | ✅     | ✅   |

---

## Performance Metrics

**Target Performance:**

- First Contentful Paint (FCP): < 2s
- Cumulative Layout Shift (CLS): < 0.1
- Scroll jank: < 16ms frame time

**Motion Library Impact:**

- Bundle size: ~5-6 KB gzipped
- Overhead on scroll: < 1-2ms per frame

---

## Future Enhancements

Possible additions:

- [ ] Hover state animations for links
- [ ] Parallax scroll effects (subtle depth)
- [ ] Page transition animations
- [ ] Loading skeletons with fade-in
- [ ] Image progressive blur-to-sharp reveal

---

## Resources

- **Motion Docs**: https://motion.dev/
- **IntersectionObserver**: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- **Easing Functions**: https://cubic-bezier.com/
- **Web Performance**: https://web.dev/performance/

---

**Last Updated**: January 19, 2026
**Motion Library Version**: 10.16.16
