# Quick Reference: Motion Animations

## 📋 What's Animated

```
Hero/Tech Stack     → Staggered scale reveal (0.5s, 60ms stagger)
About Section       → Split animation (image left, text right, 0.7s)
Project Grid        → Staggered scale reveal (0.6s, 80ms stagger)
Titles              → Fade in (0.6s)
Footer              → Fade in (0.5s)
```

## 🎯 Animation Functions

### `createScrollReveal(elements, options)`

**For**: General fade + slide-up animations

```javascript
createScrollReveal([el1, el2], {
  delay: 0, // ms
  duration: 0.6, // seconds
  distance: 30, // px
  staggerDelay: 50, // ms
});
```

### `createScaleReveal(elements, options)`

**For**: Card grids with scale effect

```javascript
createScaleReveal(cards, {
  delay: 0,
  duration: 0.6,
  staggerDelay: 80,
});
```

### `createFadeReveal(elements, options)`

**For**: Text-only fade-in

```javascript
createFadeReveal(titles, {
  delay: 0,
  duration: 0.8,
});
```

## 🔧 Common Customizations

### Make animations faster:

```javascript
duration: 0.3,          // was 0.6
staggerDelay: 30,       // was 60
```

### Make animations slower:

```javascript
duration: 0.9,          // was 0.6
staggerDelay: 150,      // was 80
```

### Change easing (feels snappier):

```javascript
easing: [0.34, 1.56, 0.64, 1]; // Bounce
```

### Add more stagger between items:

```javascript
staggerDelay: 150; // was 80 (spreads them out more)
```

## 🧪 Testing

### Check Motion library loaded:

```javascript
// In browser console:
window.motion; // Should return Motion object
```

### Test reduced motion:

```
DevTools → F12
Ctrl+Shift+P → "prefers-reduced-motion"
Select "reduce" → Reload
```

### Monitor performance:

```
DevTools → Performance tab → Record scroll
Target: 60 FPS (< 16.67ms per frame)
```

## ⚠️ Common Issues

| Problem                           | Solution                                   |
| --------------------------------- | ------------------------------------------ |
| Animations don't play             | Check Motion library loaded in Network tab |
| Elements visible before animation | Ensure initial `opacity: 0` is set         |
| Jittery on scroll                 | Disable browser extensions, check GPU      |
| Works in DevTools but not live    | Check CORS on CDN (unlikely)               |
| Too fast/slow                     | Adjust `duration` and `staggerDelay`       |

## 📂 File Map

```
motion-animations.js    ← Main animation logic (edit here to customize)
index.html             ← Motion CDN imported, script loaded
app.js                 ← Core interactions (hamburger, typing, tilt)
main.css               ← Styling + GPU hints
ANIMATION_GUIDE.md     ← Full documentation
IMPLEMENTATION_SUMMARY.md ← This overview
```

## 🚀 Add Animation to New Element

1. Give it a class: `<div class="my-new-section">`
2. Add to `motion-animations.js` in `DOMContentLoaded`:

```javascript
const myElements = document.querySelectorAll(".my-new-section");
createScrollReveal(myElements, {
  duration: 0.6,
  staggerDelay: 50,
});
```

## 📊 Timing Reference

| Use Case          | Duration | Stagger   |
| ----------------- | -------- | --------- |
| Quick fade (text) | 0.3-0.5s | N/A       |
| Standard reveal   | 0.5-0.7s | 50-80ms   |
| Slow dramatic     | 0.8-1.0s | 100-150ms |
| Cards / Grids     | 0.6s     | 60-100ms  |

## 🎬 Animation Easing Presets

```javascript
// Ease out (smooth, recommended)
[0.22, 1, 0.36, 1][
  // Ease in-out (smooth, slower)
  (0.25, 0.46, 0.45, 0.94)
][
  // Bounce (playful)
  (0.34, 1.56, 0.64, 1)
][
  // Snappy (quick)
  (0.19, 1, 0.22, 1)
];
```

## 💡 Pro Tips

- **Stagger delay = smaller numbers = faster cascade** (30ms = quick, 150ms = slow)
- **Duration affects smoothness** (0.3s = snappy, 0.9s = slow-mo)
- **Always test on mobile** (animations may feel different)
- **Combine with CSS hover states** for interactive feedback
- **Prefers-reduced-motion is automatic** (no setup needed!)

---

**Motion Library**: v10.16.16  
**Bundle Size**: 5.6 KB gzipped  
**Status**: Production ready ✅
