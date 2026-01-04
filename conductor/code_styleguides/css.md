# CSS Style Guide

## Overview

This style guide defines CSS coding standards for the Chispart project. We use modular CSS with one stylesheet per component, following modern CSS3 best practices.

## Architecture

### File Organization

**One CSS File Per Component**
```
src/
├── components/
│   ├── Header.jsx
│   ├── Header.css          ← Component-specific styles
│   ├── WebsiteCard.jsx
│   ├── WebsiteCard.css     ← Component-specific styles
│   └── ...
├── App.jsx
├── App.css                 ← App-level styles
└── index.css               ← Global styles and resets
```

**Import Order in Component**
```javascript
import React from 'react';
import './WebsiteCard.css';  // Import CSS after React, before export
```

### CSS File Structure

**Organize by Specificity**
```css
/* 1. Component root/container */
.website-card {
  /* Layout properties */
  display: flex;
  flex-direction: column;
  
  /* Box model */
  padding: 24px;
  margin: 16px;
  
  /* Visual properties */
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  
  /* Typography */
  font-family: inherit;
  
  /* Transitions */
  transition: transform 0.2s ease;
}

/* 2. Child elements */
.website-card__title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.website-card__description {
  color: #6b7280;
  line-height: 1.6;
}

/* 3. Modifiers/states */
.website-card--expanded {
  transform: scale(1.02);
}

.website-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 4. Media queries */
@media (max-width: 768px) {
  .website-card {
    padding: 16px;
    margin: 8px;
  }
}
```

## Naming Conventions

### BEM Methodology (Block Element Modifier)

**Block**: Standalone component
```css
.website-card { }
.search-bar { }
.filter { }
```

**Element**: Part of a block (use double underscore)
```css
.website-card__title { }
.website-card__description { }
.website-card__price { }
.search-bar__input { }
.search-bar__icon { }
```

**Modifier**: Variation of block or element (use double dash)
```css
.website-card--expanded { }
.website-card--featured { }
.button--primary { }
.button--disabled { }
```

**Examples**
```css
/* ✅ Good - Clear BEM structure */
.card { }
.card__header { }
.card__body { }
.card__footer { }
.card--large { }
.card--highlighted { }

/* ❌ Avoid - Unclear nesting */
.card .header { }
.card .body .content { }
```

### Class Naming Rules

**Use Lowercase with Hyphens**
```css
/* ✅ Good */
.website-card { }
.search-bar-input { }

/* ❌ Avoid */
.WebsiteCard { }
.website_card { }
.websiteCard { }
```

**Be Descriptive**
```css
/* ✅ Good */
.primary-button { }
.error-message { }
.user-profile-avatar { }

/* ❌ Avoid */
.btn { }
.msg { }
.img1 { }
```

**Avoid Presentational Names**
```css
/* ✅ Good - Semantic */
.primary-button { }
.error-message { }
.featured-card { }

/* ❌ Avoid - Presentational */
.blue-button { }
.red-text { }
.big-card { }
```

## CSS Properties

### Property Order

**Follow Logical Grouping**
```css
.element {
  /* 1. Positioning */
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  
  /* 2. Display & Box Model */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 16px;
  margin: 8px;
  
  /* 3. Border */
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  
  /* 4. Background */
  background: white;
  background-image: url('...');
  
  /* 5. Typography */
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #1a1a1a;
  text-align: left;
  
  /* 6. Visual Effects */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  opacity: 1;
  
  /* 7. Transforms & Transitions */
  transform: translateY(0);
  transition: all 0.2s ease;
  
  /* 8. Other */
  cursor: pointer;
  overflow: hidden;
}
```

### Units

**Use Relative Units**
```css
/* ✅ Good - Relative units for scalability */
.text {
  font-size: 1rem;        /* 16px base */
  padding: 1.5rem;        /* 24px */
  margin: 0.5rem;         /* 8px */
  line-height: 1.6;       /* Unitless for line-height */
}

/* ✅ Good - Pixels for borders and small values */
.card {
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* ✅ Good - Percentages for responsive widths */
.container {
  width: 100%;
  max-width: 1200px;
}

/* ✅ Good - Viewport units for full-screen elements */
.hero {
  height: 100vh;
  width: 100vw;
}

/* ❌ Avoid - Fixed pixels for font sizes */
.text {
  font-size: 16px;  /* Use rem instead */
}
```

### Colors

**Use CSS Variables for Theme Colors**
```css
/* ✅ Good - Define in :root or index.css */
:root {
  --color-primary: #2563eb;
  --color-secondary: #f59e0b;
  --color-text: #1a1a1a;
  --color-text-secondary: #6b7280;
  --color-background: #ffffff;
  --color-border: #e5e7eb;
  --color-error: #ef4444;
  --color-success: #10b981;
}

/* Use variables */
.button {
  background: var(--color-primary);
  color: var(--color-background);
}

.text {
  color: var(--color-text);
}
```

**Color Formats**
```css
/* ✅ Good - Hex for solid colors */
.element {
  color: #2563eb;
  background: #ffffff;
}

/* ✅ Good - RGBA for transparency */
.overlay {
  background: rgba(0, 0, 0, 0.5);
}

/* ✅ Good - HSL for color manipulation */
.element {
  color: hsl(217, 91%, 60%);
}

/* ❌ Avoid - Named colors (except black/white) */
.element {
  color: red;  /* Use hex or rgb instead */
}
```

## Layout

### Flexbox

**Use Flexbox for One-Dimensional Layouts**
```css
/* ✅ Good - Horizontal layout */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

/* ✅ Good - Vertical layout */
.card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* ✅ Good - Centering */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### Grid

**Use Grid for Two-Dimensional Layouts**
```css
/* ✅ Good - Responsive grid */
.catalog {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

/* ✅ Good - Fixed columns */
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 20px;
}

/* ✅ Good - Grid areas */
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

### Spacing

**Use Consistent Spacing Scale**
```css
/* ✅ Good - 8px base unit scale */
:root {
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;
}

.card {
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
}

/* ❌ Avoid - Random spacing values */
.card {
  padding: 23px;
  margin-bottom: 17px;
}
```

## Responsive Design

### Mobile-First Approach

**Start with Mobile, Enhance for Desktop**
```css
/* ✅ Good - Mobile first */
.card {
  padding: 16px;
  font-size: 0.875rem;
}

@media (min-width: 768px) {
  .card {
    padding: 24px;
    font-size: 1rem;
  }
}

@media (min-width: 1024px) {
  .card {
    padding: 32px;
  }
}

/* ❌ Avoid - Desktop first */
.card {
  padding: 32px;
}

@media (max-width: 1024px) {
  .card {
    padding: 24px;
  }
}
```

### Breakpoints

**Use Consistent Breakpoints**
```css
/* Standard breakpoints */
/* Mobile: < 640px (default) */
/* Tablet: 640px - 1024px */
/* Desktop: > 1024px */

@media (min-width: 640px) {
  /* Tablet styles */
}

@media (min-width: 1024px) {
  /* Desktop styles */
}

@media (min-width: 1280px) {
  /* Large desktop styles */
}
```

**Use Variables for Breakpoints**
```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}

/* Note: CSS variables don't work in media queries directly,
   but document them for consistency */
```

## Typography

### Font Families

**Use System Font Stack**
```css
/* ✅ Good - System fonts for performance */
:root {
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
               'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 
               'Fira Sans', 'Droid Sans', 'Helvetica Neue', 
               sans-serif;
  --font-mono: 'Fira Code', 'Courier New', monospace;
}

body {
  font-family: var(--font-sans);
}

code {
  font-family: var(--font-mono);
}
```

### Type Scale

**Use Consistent Type Scale**
```css
:root {
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
}

h1 { font-size: var(--text-4xl); }
h2 { font-size: var(--text-3xl); }
h3 { font-size: var(--text-2xl); }
h4 { font-size: var(--text-xl); }
body { font-size: var(--text-base); }
small { font-size: var(--text-sm); }
```

### Line Height

**Use Appropriate Line Heights**
```css
/* ✅ Good - Unitless line-height */
.heading {
  line-height: 1.2;  /* Tight for headings */
}

.body-text {
  line-height: 1.6;  /* Comfortable for body text */
}

.small-text {
  line-height: 1.4;  /* Medium for small text */
}
```

## Animations and Transitions

### Transitions

**Use Transitions for Interactive Elements**
```css
/* ✅ Good - Smooth transitions */
.button {
  background: var(--color-primary);
  transform: scale(1);
  transition: all 0.2s ease;
}

.button:hover {
  background: var(--color-primary-dark);
  transform: scale(1.05);
}

/* ✅ Good - Specific properties */
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* ❌ Avoid - Transition on all properties (performance) */
.element {
  transition: all 0.5s;  /* Too slow and affects all properties */
}
```

### Animations

**Use Keyframe Animations Sparingly**
```css
/* ✅ Good - Subtle, purposeful animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fadeIn 0.3s ease;
}

/* ✅ Good - Loading spinner */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

### Performance

**Animate Transform and Opacity Only**
```css
/* ✅ Good - GPU-accelerated properties */
.element {
  transition: transform 0.2s, opacity 0.2s;
}

.element:hover {
  transform: translateY(-2px);
  opacity: 0.8;
}

/* ❌ Avoid - Expensive properties */
.element {
  transition: width 0.2s, height 0.2s, top 0.2s;
}
```

## Accessibility

### Focus States

**Always Style Focus States**
```css
/* ✅ Good - Visible focus indicator */
.button:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ✅ Good - Custom focus ring */
.input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

/* ❌ Avoid - Removing outline without replacement */
.button:focus {
  outline: none;  /* Never do this without alternative */
}
```

### Color Contrast

**Ensure Sufficient Contrast**
```css
/* ✅ Good - High contrast (WCAG AA) */
.text {
  color: #1a1a1a;           /* Dark text */
  background: #ffffff;       /* White background */
}

.button {
  color: #ffffff;            /* White text */
  background: #2563eb;       /* Blue background */
}

/* ❌ Avoid - Low contrast */
.text {
  color: #cccccc;            /* Light gray text */
  background: #ffffff;       /* White background - poor contrast */
}
```

### Hidden Content

**Hide Content Accessibly**
```css
/* ✅ Good - Visually hidden but screen-reader accessible */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* ❌ Avoid - Hidden from screen readers */
.hidden {
  display: none;  /* Also hidden from screen readers */
}
```

## Best Practices

### Avoid !important

```css
/* ✅ Good - Use specificity */
.button.button--primary {
  background: var(--color-primary);
}

/* ❌ Avoid - Using !important */
.button {
  background: var(--color-primary) !important;
}
```

### Avoid Deep Nesting

```css
/* ✅ Good - Flat structure */
.card { }
.card__header { }
.card__title { }

/* ❌ Avoid - Deep nesting */
.card .header .title .text { }
```

### Use Shorthand Properties

```css
/* ✅ Good - Shorthand */
.element {
  margin: 16px 24px;
  padding: 8px 16px 12px;
  border: 1px solid #e5e7eb;
}

/* ❌ Avoid - Longhand when shorthand works */
.element {
  margin-top: 16px;
  margin-right: 24px;
  margin-bottom: 16px;
  margin-left: 24px;
}
```

### Vendor Prefixes

```css
/* ✅ Good - Let build tools handle prefixes */
.element {
  display: flex;
  transform: translateY(0);
}

/* ❌ Avoid - Manual prefixes (use autoprefixer) */
.element {
  display: -webkit-flex;
  display: flex;
  -webkit-transform: translateY(0);
  transform: translateY(0);
}
```

## Common Patterns

### Card Component
```css
.card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: var(--spacing-lg);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

### Button Component
```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.button--primary {
  background: var(--color-primary);
  color: white;
}

.button--primary:hover {
  background: var(--color-primary-dark);
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Container/Wrapper
```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

@media (min-width: 768px) {
  .container {
    padding: 0 var(--spacing-lg);
  }
}
```

## Summary

- Use modular CSS with one file per component
- Follow BEM naming convention
- Use CSS variables for theme values
- Write mobile-first responsive styles
- Prefer Flexbox and Grid for layouts
- Use relative units (rem, %, vh/vw)
- Animate only transform and opacity
- Ensure accessibility with focus states and contrast
- Keep specificity low, avoid !important
- Use consistent spacing and typography scales
- Optimize for performance
