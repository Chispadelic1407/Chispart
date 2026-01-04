# Implementation Plan: Enhance Portfolio Catalog with Advanced Features and Performance Optimizations

## Overview

This plan outlines the step-by-step implementation of enhancements to the Chispart portfolio catalog. The plan follows Test-Driven Development (TDD) principles as specified in the workflow, with each feature task broken down into "Write Tests" followed by "Implement Feature" subtasks.

---

## Phase 1: Project Setup and Testing Infrastructure

**Goal**: Establish a solid foundation with testing tools and baseline measurements.

### Tasks

- [ ] Task 1.1: Baseline Performance Audit
  - [ ] Subtask: Run Lighthouse audit on current site
  - [ ] Subtask: Document current performance metrics (load time, FCP, LCP, TTI)
  - [ ] Subtask: Run bundle analyzer to identify large dependencies
  - [ ] Subtask: Document current bundle size
  - [ ] Subtask: Create performance baseline report in `docs/performance-baseline.md`

- [ ] Task 1.2: Install Testing Dependencies
  - [ ] Subtask: Install Vitest and related dependencies (`npm install -D vitest @vitest/ui`)
  - [ ] Subtask: Install React Testing Library (`npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event`)
  - [ ] Subtask: Install Playwright for E2E tests (`npm install -D @playwright/test`)
  - [ ] Subtask: Configure Vitest in `vite.config.js`
  - [ ] Subtask: Create `vitest.config.js` with test environment setup
  - [ ] Subtask: Create `playwright.config.js` with browser configurations

- [ ] Task 1.3: Set Up Test Scripts and Structure
  - [ ] Subtask: Add test scripts to `package.json` (test, test:ui, test:coverage, test:e2e)
  - [ ] Subtask: Create `src/tests/setup.js` for test utilities
  - [ ] Subtask: Create `tests/e2e/` directory for Playwright tests
  - [ ] Subtask: Create example unit test for existing component (e.g., `Header.test.jsx`)
  - [ ] Subtask: Create example E2E test for basic navigation
  - [ ] Subtask: Verify all tests run successfully

- [ ] Task 1.4: Configure Pre-commit Hooks
  - [ ] Subtask: Install Husky (`npm install -D husky`)
  - [ ] Subtask: Initialize Husky (`npx husky init`)
  - [ ] Subtask: Create pre-commit hook to run linter
  - [ ] Subtask: Create pre-commit hook to run unit tests
  - [ ] Subtask: Test pre-commit hooks with a dummy commit

- [ ] Task 1.5: Write Tests for Existing Components
  - [ ] Subtask: Write unit tests for `Header` component (≥80% coverage)
  - [ ] Subtask: Write unit tests for `SearchBar` component (≥80% coverage)
  - [ ] Subtask: Write unit tests for `Filter` component (≥80% coverage)
  - [ ] Subtask: Write unit tests for `WebsiteCard` component (≥80% coverage)
  - [ ] Subtask: Write unit tests for `Catalog` component (≥80% coverage)
  - [ ] Subtask: Run coverage report and verify ≥80% coverage

- [ ] Task: Conductor - User Manual Verification 'Phase 1: Project Setup and Testing Infrastructure' (Protocol in workflow.md)

---

## Phase 2: Core Interactive Features

**Goal**: Implement favorites system, social sharing, and detailed project modals.

### Feature 2.1: Favorites System

- [ ] Task 2.1.1: Write Tests for Favorites Context
  - [ ] Subtask: Create test file `src/context/FavoritesContext.test.jsx`
  - [ ] Subtask: Write test for adding a favorite
  - [ ] Subtask: Write test for removing a favorite
  - [ ] Subtask: Write test for checking if project is favorited
  - [ ] Subtask: Write test for localStorage persistence
  - [ ] Subtask: Write test for loading favorites from localStorage on mount

- [ ] Task 2.1.2: Implement Favorites Context
  - [ ] Subtask: Create `src/context/FavoritesContext.jsx`
  - [ ] Subtask: Implement `FavoritesProvider` with state management
  - [ ] Subtask: Implement `addFavorite` function
  - [ ] Subtask: Implement `removeFavorite` function
  - [ ] Subtask: Implement `isFavorite` function
  - [ ] Subtask: Implement localStorage sync (save on change, load on mount)
  - [ ] Subtask: Verify all tests pass

- [ ] Task 2.1.3: Write Tests for Favorites UI Components
  - [ ] Subtask: Create test file `src/components/FavoriteButton.test.jsx`
  - [ ] Subtask: Write test for favorite button rendering
  - [ ] Subtask: Write test for favorite button click (add)
  - [ ] Subtask: Write test for favorite button click (remove)
  - [ ] Subtask: Write test for visual state changes
  - [ ] Subtask: Write test for accessibility (ARIA labels, keyboard support)

- [ ] Task 2.1.4: Implement Favorites UI Components
  - [ ] Subtask: Create `src/components/FavoriteButton.jsx`
  - [ ] Subtask: Create `src/components/FavoriteButton.css`
  - [ ] Subtask: Implement favorite button with heart icon
  - [ ] Subtask: Add click handler to toggle favorite
  - [ ] Subtask: Add visual feedback (filled/unfilled heart)
  - [ ] Subtask: Add ARIA labels for accessibility
  - [ ] Subtask: Integrate FavoriteButton into WebsiteCard
  - [ ] Subtask: Verify all tests pass

- [ ] Task 2.1.5: Write Tests for Favorites View
  - [ ] Subtask: Create test file `src/components/FavoritesView.test.jsx`
  - [ ] Subtask: Write test for rendering favorited projects
  - [ ] Subtask: Write test for empty state (no favorites)
  - [ ] Subtask: Write test for favorites count badge
  - [ ] Subtask: Write test for filtering favorites

- [ ] Task 2.1.6: Implement Favorites View
  - [ ] Subtask: Create `src/components/FavoritesView.jsx`
  - [ ] Subtask: Create `src/components/FavoritesView.css`
  - [ ] Subtask: Implement favorites filter in Catalog component
  - [ ] Subtask: Add favorites count badge to Header
  - [ ] Subtask: Add "Show Favorites" toggle button
  - [ ] Subtask: Implement empty state UI
  - [ ] Subtask: Verify all tests pass

- [ ] Task 2.1.7: E2E Test for Favorites Flow
  - [ ] Subtask: Create `tests/e2e/favorites.spec.js`
  - [ ] Subtask: Write E2E test for adding favorite
  - [ ] Subtask: Write E2E test for removing favorite
  - [ ] Subtask: Write E2E test for favorites persistence (reload page)
  - [ ] Subtask: Write E2E test for viewing favorites
  - [ ] Subtask: Verify all E2E tests pass

### Feature 2.2: Social Sharing

- [ ] Task 2.2.1: Write Tests for Share Functionality
  - [ ] Subtask: Create test file `src/components/ShareButton.test.jsx`
  - [ ] Subtask: Write test for share button rendering
  - [ ] Subtask: Write test for share menu opening/closing
  - [ ] Subtask: Write test for Twitter share link generation
  - [ ] Subtask: Write test for LinkedIn share link generation
  - [ ] Subtask: Write test for copy-to-clipboard functionality
  - [ ] Subtask: Write test for share event tracking

- [ ] Task 2.2.2: Implement Share Button Component
  - [ ] Subtask: Create `src/components/ShareButton.jsx`
  - [ ] Subtask: Create `src/components/ShareButton.css`
  - [ ] Subtask: Implement share button with dropdown menu
  - [ ] Subtask: Implement Twitter share link generator
  - [ ] Subtask: Implement LinkedIn share link generator
  - [ ] Subtask: Implement Facebook share link generator
  - [ ] Subtask: Implement copy-to-clipboard with visual feedback
  - [ ] Subtask: Integrate ShareButton into WebsiteCard
  - [ ] Subtask: Verify all tests pass

- [ ] Task 2.2.3: Write Tests for Open Graph Meta Tags
  - [ ] Subtask: Create test file `src/utils/seo.test.js`
  - [ ] Subtask: Write test for generating project-specific meta tags
  - [ ] Subtask: Write test for default meta tags

- [ ] Task 2.2.4: Implement Open Graph Meta Tags
  - [ ] Subtask: Install react-helmet-async (`npm install react-helmet-async`)
  - [ ] Subtask: Create `src/utils/seo.js` with meta tag generator
  - [ ] Subtask: Add HelmetProvider to App.jsx
  - [ ] Subtask: Add dynamic meta tags to project pages
  - [ ] Subtask: Add default Open Graph image
  - [ ] Subtask: Verify meta tags in browser dev tools
  - [ ] Subtask: Verify all tests pass

- [ ] Task 2.2.5: E2E Test for Share Flow
  - [ ] Subtask: Create `tests/e2e/share.spec.js`
  - [ ] Subtask: Write E2E test for opening share menu
  - [ ] Subtask: Write E2E test for copy-to-clipboard
  - [ ] Subtask: Verify all E2E tests pass

### Feature 2.3: Detailed Project Modals

- [ ] Task 2.3.1: Write Tests for Modal Component
  - [ ] Subtask: Create test file `src/components/ProjectModal.test.jsx`
  - [ ] Subtask: Write test for modal opening
  - [ ] Subtask: Write test for modal closing (ESC key)
  - [ ] Subtask: Write test for modal closing (backdrop click)
  - [ ] Subtask: Write test for modal closing (close button)
  - [ ] Subtask: Write test for focus trap
  - [ ] Subtask: Write test for focus return after close
  - [ ] Subtask: Write test for keyboard navigation
  - [ ] Subtask: Write test for ARIA attributes

- [ ] Task 2.3.2: Implement Modal Component
  - [ ] Subtask: Install react-focus-lock (`npm install react-focus-lock`)
  - [ ] Subtask: Create `src/components/ProjectModal.jsx`
  - [ ] Subtask: Create `src/components/ProjectModal.css`
  - [ ] Subtask: Implement modal overlay with backdrop
  - [ ] Subtask: Implement modal content container
  - [ ] Subtask: Implement close button
  - [ ] Subtask: Implement ESC key handler
  - [ ] Subtask: Implement backdrop click handler
  - [ ] Subtask: Implement focus trap with react-focus-lock
  - [ ] Subtask: Implement focus return on close
  - [ ] Subtask: Add ARIA labels and roles
  - [ ] Subtask: Verify all tests pass

- [ ] Task 2.3.3: Write Tests for Modal Content
  - [ ] Subtask: Write test for displaying project details
  - [ ] Subtask: Write test for displaying technology stack
  - [ ] Subtask: Write test for displaying GitHub stats
  - [ ] Subtask: Write test for demo and repository links

- [ ] Task 2.3.4: Implement Modal Content
  - [ ] Subtask: Create detailed project view layout
  - [ ] Subtask: Add project screenshots/images
  - [ ] Subtask: Add full technology stack with descriptions
  - [ ] Subtask: Integrate GitHub API for repository stats
  - [ ] Subtask: Add links to live demo and repository
  - [ ] Subtask: Style modal content responsively
  - [ ] Subtask: Verify all tests pass

- [ ] Task 2.3.5: Integrate Modal with WebsiteCard
  - [ ] Subtask: Add "View Details" button to WebsiteCard
  - [ ] Subtask: Implement modal open handler
  - [ ] Subtask: Pass project data to modal
  - [ ] Subtask: Test modal integration

- [ ] Task 2.3.6: E2E Test for Modal Flow
  - [ ] Subtask: Create `tests/e2e/modal.spec.js`
  - [ ] Subtask: Write E2E test for opening modal
  - [ ] Subtask: Write E2E test for closing modal (ESC)
  - [ ] Subtask: Write E2E test for closing modal (backdrop)
  - [ ] Subtask: Write E2E test for keyboard navigation
  - [ ] Subtask: Verify all E2E tests pass

- [ ] Task: Conductor - User Manual Verification 'Phase 2: Core Interactive Features' (Protocol in workflow.md)

---

## Phase 3: Advanced Filtering and Search

**Goal**: Implement multi-criteria filtering with URL parameters.

### Feature 3.1: Advanced Filtering System

- [ ] Task 3.1.1: Write Tests for Filter Logic
  - [ ] Subtask: Create test file `src/utils/filters.test.js`
  - [ ] Subtask: Write test for multi-category filtering
  - [ ] Subtask: Write test for technology filtering
  - [ ] Subtask: Write test for complexity filtering
  - [ ] Subtask: Write test for combined filters (AND logic)
  - [ ] Subtask: Write test for filter state management

- [ ] Task 3.1.2: Implement Filter Utilities
  - [ ] Subtask: Create `src/utils/filters.js`
  - [ ] Subtask: Implement multi-category filter function
  - [ ] Subtask: Implement technology filter function
  - [ ] Subtask: Implement complexity filter function
  - [ ] Subtask: Implement combined filter function
  - [ ] Subtask: Verify all tests pass

- [ ] Task 3.1.3: Write Tests for Filter UI Components
  - [ ] Subtask: Create test file `src/components/AdvancedFilter.test.jsx`
  - [ ] Subtask: Write test for multi-select category filters
  - [ ] Subtask: Write test for technology filters
  - [ ] Subtask: Write test for active filter indicators
  - [ ] Subtask: Write test for clear all filters button
  - [ ] Subtask: Write test for filter count badge

- [ ] Task 3.1.4: Implement Advanced Filter UI
  - [ ] Subtask: Create `src/components/AdvancedFilter.jsx`
  - [ ] Subtask: Create `src/components/AdvancedFilter.css`
  - [ ] Subtask: Implement multi-select category checkboxes
  - [ ] Subtask: Implement technology filter chips
  - [ ] Subtask: Implement complexity level selector
  - [ ] Subtask: Add active filter indicators
  - [ ] Subtask: Add clear all filters button
  - [ ] Subtask: Add filter count badge
  - [ ] Subtask: Verify all tests pass

- [ ] Task 3.1.5: Write Tests for URL Parameter Sync
  - [ ] Subtask: Create test file `src/hooks/useFilterParams.test.js`
  - [ ] Subtask: Write test for reading filters from URL
  - [ ] Subtask: Write test for updating URL on filter change
  - [ ] Subtask: Write test for shareable filter URLs

- [ ] Task 3.1.6: Implement URL Parameter Sync
  - [ ] Subtask: Create `src/hooks/useFilterParams.js`
  - [ ] Subtask: Implement URL parameter reading on mount
  - [ ] Subtask: Implement URL parameter updating on filter change
  - [ ] Subtask: Integrate with AdvancedFilter component
  - [ ] Subtask: Test shareable URLs manually
  - [ ] Subtask: Verify all tests pass

- [ ] Task 3.1.7: Integrate Advanced Filters with Catalog
  - [ ] Subtask: Update Catalog component to use advanced filters
  - [ ] Subtask: Combine search with filters
  - [ ] Subtask: Update filter results in real-time
  - [ ] Subtask: Test filter combinations

- [ ] Task 3.1.8: E2E Test for Advanced Filtering
  - [ ] Subtask: Create `tests/e2e/filters.spec.js`
  - [ ] Subtask: Write E2E test for multi-category filtering
  - [ ] Subtask: Write E2E test for technology filtering
  - [ ] Subtask: Write E2E test for combined filters
  - [ ] Subtask: Write E2E test for URL parameter persistence
  - [ ] Subtask: Verify all E2E tests pass

- [ ] Task: Conductor - User Manual Verification 'Phase 3: Advanced Filtering and Search' (Protocol in workflow.md)

---

## Phase 4: Performance Optimizations

**Goal**: Achieve Lighthouse Performance score ≥90 and <3 second load times.

### Optimization 4.1: Code Splitting and Lazy Loading

- [ ] Task 4.1.1: Analyze Current Bundle
  - [ ] Subtask: Run `npm run build` and analyze bundle size
  - [ ] Subtask: Install bundle analyzer (`npm install -D rollup-plugin-visualizer`)
  - [ ] Subtask: Configure visualizer in `vite.config.js`
  - [ ] Subtask: Generate bundle analysis report
  - [ ] Subtask: Identify large dependencies and components
  - [ ] Subtask: Document findings in `docs/bundle-analysis.md`

- [ ] Task 4.1.2: Write Tests for Lazy Loading
  - [ ] Subtask: Create test file `src/components/LazyImage.test.jsx`
  - [ ] Subtask: Write test for lazy image loading
  - [ ] Subtask: Write test for placeholder display
  - [ ] Subtask: Write test for blur-up effect

- [ ] Task 4.1.3: Implement Lazy Loading for Images
  - [ ] Subtask: Install react-lazy-load-image-component (`npm install react-lazy-load-image-component`)
  - [ ] Subtask: Create `src/components/LazyImage.jsx`
  - [ ] Subtask: Implement lazy loading with blur-up placeholder
  - [ ] Subtask: Replace all `<img>` tags with LazyImage component
  - [ ] Subtask: Verify all tests pass

- [ ] Task 4.1.4: Implement Code Splitting
  - [ ] Subtask: Identify components for code splitting (Modal, AdvancedFilter)
  - [ ] Subtask: Implement React.lazy for Modal component
  - [ ] Subtask: Implement React.lazy for AdvancedFilter component
  - [ ] Subtask: Add Suspense boundaries with loading states
  - [ ] Subtask: Test lazy loading in browser
  - [ ] Subtask: Verify bundle size reduction

- [ ] Task 4.1.5: Optimize Images
  - [ ] Subtask: Convert images to WebP format
  - [ ] Subtask: Generate responsive image sizes (thumbnail, medium, large)
  - [ ] Subtask: Implement srcset for responsive images
  - [ ] Subtask: Compress images with imagemin
  - [ ] Subtask: Verify image optimization in Lighthouse

### Optimization 4.2: Service Worker and Caching

- [ ] Task 4.2.1: Write Tests for Service Worker
  - [ ] Subtask: Create test file `tests/service-worker.test.js`
  - [ ] Subtask: Write test for service worker registration
  - [ ] Subtask: Write test for cache strategies

- [ ] Task 4.2.2: Implement Service Worker
  - [ ] Subtask: Install Workbox (`npm install -D workbox-cli workbox-webpack-plugin`)
  - [ ] Subtask: Configure Workbox in `vite.config.js`
  - [ ] Subtask: Create service worker configuration
  - [ ] Subtask: Implement cache-first strategy for static assets
  - [ ] Subtask: Implement network-first strategy for API calls
  - [ ] Subtask: Register service worker in `main.jsx`
  - [ ] Subtask: Test offline functionality
  - [ ] Subtask: Verify all tests pass

### Optimization 4.3: Resource Hints and Preloading

- [ ] Task 4.3.1: Implement Resource Hints
  - [ ] Subtask: Add preconnect for external domains (Google Fonts, CDNs)
  - [ ] Subtask: Add preload for critical CSS
  - [ ] Subtask: Add preload for critical fonts
  - [ ] Subtask: Add prefetch for likely next pages
  - [ ] Subtask: Verify resource hints in Network tab

- [ ] Task 4.3.2: Optimize CSS Delivery
  - [ ] Subtask: Extract critical CSS
  - [ ] Subtask: Inline critical CSS in HTML
  - [ ] Subtask: Defer non-critical CSS
  - [ ] Subtask: Verify CSS optimization in Lighthouse

### Optimization 4.4: Virtual Scrolling (if needed)

- [ ] Task 4.4.1: Evaluate Need for Virtual Scrolling
  - [ ] Subtask: Test catalog performance with 100+ projects
  - [ ] Subtask: Measure scroll performance
  - [ ] Subtask: Decide if virtual scrolling is necessary

- [ ] Task 4.4.2: Write Tests for Virtual Scrolling (if needed)
  - [ ] Subtask: Create test file `src/components/VirtualCatalog.test.jsx`
  - [ ] Subtask: Write test for rendering visible items only
  - [ ] Subtask: Write test for scroll behavior

- [ ] Task 4.4.3: Implement Virtual Scrolling (if needed)
  - [ ] Subtask: Install react-window (`npm install react-window`)
  - [ ] Subtask: Create `src/components/VirtualCatalog.jsx`
  - [ ] Subtask: Implement virtual list with react-window
  - [ ] Subtask: Replace Catalog grid with VirtualCatalog
  - [ ] Subtask: Test scroll performance
  - [ ] Subtask: Verify all tests pass

### Optimization 4.5: Performance Verification

- [ ] Task 4.5.1: Run Performance Audits
  - [ ] Subtask: Run Lighthouse audit on optimized site
  - [ ] Subtask: Verify Performance score ≥90
  - [ ] Subtask: Verify FCP <1.5s, LCP <2.5s, TTI <5s
  - [ ] Subtask: Test on 3G network throttling
  - [ ] Subtask: Document performance improvements in `docs/performance-report.md`

- [ ] Task 4.5.2: Set Up Performance Monitoring
  - [ ] Subtask: Install web-vitals (`npm install web-vitals`)
  - [ ] Subtask: Create `src/utils/performance.js`
  - [ ] Subtask: Implement Web Vitals tracking
  - [ ] Subtask: Log performance metrics to console (dev mode)
  - [ ] Subtask: Integrate with analytics (production)

- [ ] Task: Conductor - User Manual Verification 'Phase 4: Performance Optimizations' (Protocol in workflow.md)

---

## Phase 5: Accessibility and SEO

**Goal**: Achieve WCAG 2.1 AA compliance and optimize for search engines.

### Feature 5.1: Accessibility Improvements

- [ ] Task 5.1.1: Accessibility Audit
  - [ ] Subtask: Install axe DevTools browser extension
  - [ ] Subtask: Run axe audit on all pages
  - [ ] Subtask: Document accessibility violations
  - [ ] Subtask: Prioritize violations by severity
  - [ ] Subtask: Create accessibility checklist

- [ ] Task 5.1.2: Write Tests for Accessibility
  - [ ] Subtask: Install jest-axe (`npm install -D jest-axe`)
  - [ ] Subtask: Add axe tests to all component test files
  - [ ] Subtask: Write test for keyboard navigation
  - [ ] Subtask: Write test for focus indicators
  - [ ] Subtask: Write test for ARIA labels

- [ ] Task 5.1.3: Implement Keyboard Navigation
  - [ ] Subtask: Ensure all interactive elements are keyboard accessible
  - [ ] Subtask: Implement skip navigation link
  - [ ] Subtask: Add keyboard shortcuts documentation
  - [ ] Subtask: Test with keyboard only (no mouse)
  - [ ] Subtask: Verify all tests pass

- [ ] Task 5.1.4: Implement Focus Indicators
  - [ ] Subtask: Add visible focus styles to all interactive elements
  - [ ] Subtask: Ensure focus indicators meet WCAG contrast requirements
  - [ ] Subtask: Test focus order (logical tab sequence)
  - [ ] Subtask: Verify all tests pass

- [ ] Task 5.1.5: Add ARIA Labels and Roles
  - [ ] Subtask: Add ARIA labels to all buttons and links
  - [ ] Subtask: Add ARIA roles to semantic sections
  - [ ] Subtask: Add ARIA live regions for dynamic content
  - [ ] Subtask: Add ARIA expanded/collapsed states for expandable elements
  - [ ] Subtask: Verify all tests pass

- [ ] Task 5.1.6: Ensure Color Contrast
  - [ ] Subtask: Audit color contrast with WebAIM Contrast Checker
  - [ ] Subtask: Fix contrast issues (text, buttons, links)
  - [ ] Subtask: Verify contrast ratios meet WCAG AA (4.5:1 for normal text)
  - [ ] Subtask: Test in dark mode (if implemented)

- [ ] Task 5.1.7: Add Alt Text for Images
  - [ ] Subtask: Audit all images for alt text
  - [ ] Subtask: Add descriptive alt text to all images
  - [ ] Subtask: Use empty alt for decorative images
  - [ ] Subtask: Verify with screen reader

- [ ] Task 5.1.8: Screen Reader Testing
  - [ ] Subtask: Test with NVDA (Windows)
  - [ ] Subtask: Test with JAWS (Windows)
  - [ ] Subtask: Test with VoiceOver (macOS/iOS)
  - [ ] Subtask: Document screen reader experience
  - [ ] Subtask: Fix any screen reader issues

- [ ] Task 5.1.9: Final Accessibility Verification
  - [ ] Subtask: Run axe audit again
  - [ ] Subtask: Verify zero violations
  - [ ] Subtask: Run Lighthouse accessibility audit
  - [ ] Subtask: Verify Accessibility score = 100
  - [ ] Subtask: Document accessibility compliance in `docs/accessibility-report.md`

### Feature 5.2: SEO Enhancements

- [ ] Task 5.2.1: Implement Semantic HTML
  - [ ] Subtask: Replace generic divs with semantic elements (header, nav, main, section, article, footer)
  - [ ] Subtask: Add proper heading hierarchy (h1, h2, h3)
  - [ ] Subtask: Verify semantic structure with HTML validator

- [ ] Task 5.2.2: Write Tests for SEO Utilities
  - [ ] Subtask: Create test file `src/utils/seo.test.js`
  - [ ] Subtask: Write test for generating structured data
  - [ ] Subtask: Write test for generating meta tags
  - [ ] Subtask: Write test for generating canonical URLs

- [ ] Task 5.2.3: Implement Structured Data
  - [ ] Subtask: Create JSON-LD schema for portfolio
  - [ ] Subtask: Create JSON-LD schema for individual projects
  - [ ] Subtask: Add structured data to HTML head
  - [ ] Subtask: Validate structured data with Google Rich Results Test
  - [ ] Subtask: Verify all tests pass

- [ ] Task 5.2.4: Optimize Meta Tags
  - [ ] Subtask: Add unique title tags for each page
  - [ ] Subtask: Add unique meta descriptions for each page
  - [ ] Subtask: Add Open Graph meta tags
  - [ ] Subtask: Add Twitter Card meta tags
  - [ ] Subtask: Verify meta tags with Facebook Sharing Debugger and Twitter Card Validator

- [ ] Task 5.2.5: Create Sitemap and Robots.txt
  - [ ] Subtask: Generate sitemap.xml
  - [ ] Subtask: Create robots.txt
  - [ ] Subtask: Add sitemap reference to robots.txt
  - [ ] Subtask: Verify sitemap with Google Search Console

- [ ] Task 5.2.6: Implement Canonical URLs
  - [ ] Subtask: Add canonical link tags to all pages
  - [ ] Subtask: Verify canonical URLs are correct

- [ ] Task 5.2.7: Mobile-Friendly Verification
  - [ ] Subtask: Run Google Mobile-Friendly Test
  - [ ] Subtask: Fix any mobile usability issues
  - [ ] Subtask: Verify responsive design on multiple devices

- [ ] Task 5.2.8: Final SEO Verification
  - [ ] Subtask: Run Lighthouse SEO audit
  - [ ] Subtask: Verify SEO score ≥90
  - [ ] Subtask: Submit sitemap to Google Search Console
  - [ ] Subtask: Document SEO optimizations in `docs/seo-report.md`

- [ ] Task: Conductor - User Manual Verification 'Phase 5: Accessibility and SEO' (Protocol in workflow.md)

---

## Phase 6: Analytics Integration

**Goal**: Track user behavior and engagement metrics.

### Feature 6.1: Analytics Setup

- [ ] Task 6.1.1: Choose Analytics Platform
  - [ ] Subtask: Evaluate Google Analytics 4 vs Plausible
  - [ ] Subtask: Consider privacy implications and GDPR compliance
  - [ ] Subtask: Make decision and document rationale
  - [ ] Subtask: Create analytics account

- [ ] Task 6.1.2: Write Tests for Analytics Utilities
  - [ ] Subtask: Create test file `src/services/analytics.test.js`
  - [ ] Subtask: Write test for tracking page views
  - [ ] Subtask: Write test for tracking custom events
  - [ ] Subtask: Write test for tracking user properties
  - [ ] Subtask: Write test for opt-out functionality

- [ ] Task 6.1.3: Implement Analytics Service
  - [ ] Subtask: Install analytics library (e.g., `npm install react-ga4` or `npm install plausible-tracker`)
  - [ ] Subtask: Create `src/services/analytics.js`
  - [ ] Subtask: Implement initialization function
  - [ ] Subtask: Implement page view tracking
  - [ ] Subtask: Implement custom event tracking
  - [ ] Subtask: Implement user property tracking
  - [ ] Subtask: Implement opt-out functionality
  - [ ] Subtask: Verify all tests pass

- [ ] Task 6.1.4: Integrate Analytics with App
  - [ ] Subtask: Initialize analytics in `main.jsx`
  - [ ] Subtask: Track page views on route changes
  - [ ] Subtask: Add analytics to environment variables
  - [ ] Subtask: Test analytics in development mode

### Feature 6.2: Event Tracking

- [ ] Task 6.2.1: Implement Event Tracking for Key Interactions
  - [ ] Subtask: Track search queries
  - [ ] Subtask: Track filter usage (category, technology)
  - [ ] Subtask: Track project card clicks
  - [ ] Subtask: Track demo interactions (iframe clicks)
  - [ ] Subtask: Track favorite additions/removals
  - [ ] Subtask: Track social shares
  - [ ] Subtask: Track modal opens
  - [ ] Subtask: Track GitHub link clicks

- [ ] Task 6.2.2: Implement Cookie Consent (if using GA4)
  - [ ] Subtask: Install cookie consent library (`npm install react-cookie-consent`)
  - [ ] Subtask: Create `src/components/CookieConsent.jsx`
  - [ ] Subtask: Implement cookie consent banner
  - [ ] Subtask: Integrate consent with analytics initialization
  - [ ] Subtask: Store consent preference in localStorage
  - [ ] Subtask: Test consent flow

- [ ] Task 6.2.3: Verify Analytics Tracking
  - [ ] Subtask: Test all tracked events in browser
  - [ ] Subtask: Verify events appear in analytics dashboard
  - [ ] Subtask: Test opt-out functionality
  - [ ] Subtask: Document tracked events in `docs/analytics-events.md`

- [ ] Task: Conductor - User Manual Verification 'Phase 6: Analytics Integration' (Protocol in workflow.md)

---

## Phase 7: Dark Mode (Optional)

**Goal**: Implement dark mode with theme persistence.

### Feature 7.1: Dark Mode Implementation

- [ ] Task 7.1.1: Write Tests for Theme Context
  - [ ] Subtask: Create test file `src/context/ThemeContext.test.jsx`
  - [ ] Subtask: Write test for theme toggle
  - [ ] Subtask: Write test for theme persistence
  - [ ] Subtask: Write test for system preference detection

- [ ] Task 7.1.2: Implement Theme Context
  - [ ] Subtask: Create `src/context/ThemeContext.jsx`
  - [ ] Subtask: Implement ThemeProvider with state management
  - [ ] Subtask: Implement theme toggle function
  - [ ] Subtask: Implement localStorage persistence
  - [ ] Subtask: Implement system preference detection (prefers-color-scheme)
  - [ ] Subtask: Verify all tests pass

- [ ] Task 7.1.3: Create Dark Mode Color Scheme
  - [ ] Subtask: Define dark mode color variables in CSS
  - [ ] Subtask: Create `src/styles/themes.css`
  - [ ] Subtask: Define light theme colors
  - [ ] Subtask: Define dark theme colors
  - [ ] Subtask: Ensure color contrast meets WCAG AA in both modes

- [ ] Task 7.1.4: Write Tests for Theme Toggle UI
  - [ ] Subtask: Create test file `src/components/ThemeToggle.test.jsx`
  - [ ] Subtask: Write test for toggle button rendering
  - [ ] Subtask: Write test for toggle button click
  - [ ] Subtask: Write test for icon changes (sun/moon)

- [ ] Task 7.1.5: Implement Theme Toggle UI
  - [ ] Subtask: Create `src/components/ThemeToggle.jsx`
  - [ ] Subtask: Create `src/components/ThemeToggle.css`
  - [ ] Subtask: Implement toggle button with sun/moon icons
  - [ ] Subtask: Add smooth transition between themes
  - [ ] Subtask: Integrate ThemeToggle into Header
  - [ ] Subtask: Verify all tests pass

- [ ] Task 7.1.6: Apply Dark Mode Styles
  - [ ] Subtask: Update all component CSS files to support dark mode
  - [ ] Subtask: Test all components in dark mode
  - [ ] Subtask: Fix any visual issues in dark mode
  - [ ] Subtask: Verify color contrast in dark mode

- [ ] Task 7.1.7: E2E Test for Dark Mode
  - [ ] Subtask: Create `tests/e2e/dark-mode.spec.js`
  - [ ] Subtask: Write E2E test for theme toggle
  - [ ] Subtask: Write E2E test for theme persistence
  - [ ] Subtask: Verify all E2E tests pass

- [ ] Task: Conductor - User Manual Verification 'Phase 7: Dark Mode' (Protocol in workflow.md)

---

## Phase 8: Documentation and Deployment

**Goal**: Update documentation and deploy to production.

### Documentation

- [ ] Task 8.1.1: Update README
  - [ ] Subtask: Document new features (favorites, sharing, modals, filters)
  - [ ] Subtask: Update installation instructions
  - [ ] Subtask: Update scripts documentation
  - [ ] Subtask: Add testing instructions
  - [ ] Subtask: Add deployment instructions
  - [ ] Subtask: Add screenshots of new features

- [ ] Task 8.1.2: Create User Guide
  - [ ] Subtask: Create `docs/user-guide.md`
  - [ ] Subtask: Document how to use search and filters
  - [ ] Subtask: Document how to use favorites
  - [ ] Subtask: Document how to share projects
  - [ ] Subtask: Document keyboard shortcuts
  - [ ] Subtask: Add screenshots and GIFs

- [ ] Task 8.1.3: Create Developer Guide
  - [ ] Subtask: Create `docs/developer-guide.md`
  - [ ] Subtask: Document project structure
  - [ ] Subtask: Document component architecture
  - [ ] Subtask: Document testing strategy
  - [ ] Subtask: Document deployment process
  - [ ] Subtask: Document contribution guidelines

- [ ] Task 8.1.4: Create CHANGELOG
  - [ ] Subtask: Create `CHANGELOG.md`
  - [ ] Subtask: Document all changes in this track
  - [ ] Subtask: Organize by feature/fix/performance/accessibility
  - [ ] Subtask: Include version number and date

### Deployment

- [ ] Task 8.2.1: Pre-Deployment Checklist
  - [ ] Subtask: Run all tests and verify 100% pass rate
  - [ ] Subtask: Run linter and verify zero errors
  - [ ] Subtask: Run Lighthouse audit and verify all scores ≥90
  - [ ] Subtask: Test on multiple browsers (Chrome, Firefox, Safari, Edge)
  - [ ] Subtask: Test on multiple devices (desktop, tablet, mobile)
  - [ ] Subtask: Verify all environment variables are set
  - [ ] Subtask: Verify analytics tracking is working

- [ ] Task 8.2.2: Build for Production
  - [ ] Subtask: Run `npm run build`
  - [ ] Subtask: Verify build completes without errors
  - [ ] Subtask: Test production build locally with `npm run preview`
  - [ ] Subtask: Verify all features work in production build

- [ ] Task 8.2.3: Deploy to Staging
  - [ ] Subtask: Deploy to staging environment (e.g., Vercel preview)
  - [ ] Subtask: Run smoke tests on staging
  - [ ] Subtask: Verify analytics tracking on staging
  - [ ] Subtask: Get stakeholder approval

- [ ] Task 8.2.4: Deploy to Production
  - [ ] Subtask: Deploy to production (e.g., Vercel, Netlify)
  - [ ] Subtask: Verify deployment success
  - [ ] Subtask: Run smoke tests on production
  - [ ] Subtask: Monitor for errors in first 24 hours
  - [ ] Subtask: Verify analytics tracking on production

- [ ] Task 8.2.5: Post-Deployment Verification
  - [ ] Subtask: Run Lighthouse audit on production URL
  - [ ] Subtask: Verify all performance metrics meet targets
  - [ ] Subtask: Test all features on production
  - [ ] Subtask: Monitor analytics for user engagement
  - [ ] Subtask: Create post-deployment report

- [ ] Task: Conductor - User Manual Verification 'Phase 8: Documentation and Deployment' (Protocol in workflow.md)

---

## Summary

This plan implements comprehensive enhancements to the Chispart portfolio catalog following Test-Driven Development principles. Each feature is broken down into:

1. **Write Tests**: Define expected behavior through tests
2. **Implement Feature**: Write code to make tests pass
3. **Verify**: Ensure all tests pass and feature works as expected

The plan is organized into 8 phases:
- **Phase 1**: Testing infrastructure and baseline measurements
- **Phase 2**: Core interactive features (favorites, sharing, modals)
- **Phase 3**: Advanced filtering and search
- **Phase 4**: Performance optimizations
- **Phase 5**: Accessibility and SEO
- **Phase 6**: Analytics integration
- **Phase 7**: Dark mode (optional)
- **Phase 8**: Documentation and deployment

Each phase ends with a manual verification checkpoint as specified in the workflow.

**Estimated Timeline**: 14-20 days

**Success Criteria**:
- Test coverage ≥80%
- Lighthouse scores: Performance ≥90, Accessibility 100, Best Practices ≥90, SEO ≥90
- Zero linting errors
- Zero accessibility violations (WCAG 2.1 AA)
- All features implemented and tested
