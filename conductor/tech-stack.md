# Technology Stack: Chispart - Portfolio Catalog

## Overview

Chispart is built as a modern Single Page Application (SPA) using React 19 with Vite as the build tool. The stack emphasizes performance, developer experience, and maintainability while keeping dependencies minimal and focused.

## Frontend Technologies

### Core Framework
**React 19.2.0**
- **Purpose**: UI component library and state management
- **Why React 19**: Latest stable version with improved performance, concurrent features, and modern hooks
- **Key Features Used**:
  - Functional components with hooks (useState, useMemo, useEffect)
  - Component composition and reusability
  - Virtual DOM for efficient rendering
  - React Context API for state management (if needed)

### Build Tool & Development Server
**Vite 7.2.4**
- **Purpose**: Lightning-fast build tool and development server
- **Why Vite**: 
  - Instant hot module replacement (HMR)
  - Optimized production builds
  - Native ES modules support
  - Significantly faster than webpack-based tools
- **Configuration**: Standard React plugin setup with minimal configuration

### Language
**JavaScript ES6+**
- **Purpose**: Primary programming language
- **Why JavaScript (not TypeScript)**: 
  - Faster development for portfolio project
  - Lower barrier for contributors
  - Sufficient type safety through ESLint and careful coding
- **Features Used**:
  - Arrow functions
  - Destructuring
  - Template literals
  - Async/await
  - Modules (import/export)
  - Spread operator
  - Optional chaining

### Styling
**CSS3 (Modular Component Styles)**
- **Purpose**: Component styling and layout
- **Architecture**: One CSS file per component for modularity
- **Why Vanilla CSS**:
  - No additional dependencies
  - Full control over styles
  - Better performance (no runtime CSS-in-JS overhead)
  - Easy to understand and maintain
- **Features Used**:
  - CSS Grid and Flexbox for layouts
  - CSS Variables for theming
  - Media queries for responsive design
  - CSS transitions and animations
  - Modern selectors and pseudo-classes

## Backend Technologies

### Server Framework
**Express 5.2.1**
- **Purpose**: Web server for hosting demos and serving static files
- **Why Express**: 
  - Minimal, unopinionated framework
  - Perfect for serving static files and demos
  - Easy to configure and deploy
  - Industry standard with excellent documentation
- **Use Cases**:
  - Serving demo iframes
  - Static file hosting
  - Potential API endpoints for future features

### Runtime
**Node.js**
- **Purpose**: JavaScript runtime for server-side code
- **Why Node.js**:
  - Unified JavaScript across frontend and backend
  - Excellent package ecosystem (npm)
  - Great performance for I/O operations
  - Wide deployment support

## Development Tools

### Code Quality
**ESLint 9.39.1**
- **Purpose**: JavaScript linting and code quality enforcement
- **Configuration**: 
  - `@eslint/js` for base rules
  - `eslint-plugin-react-hooks` for React hooks rules
  - `eslint-plugin-react-refresh` for Vite HMR compatibility
- **Benefits**:
  - Catch errors before runtime
  - Enforce consistent code style
  - Prevent common React pitfalls

### Build Plugin
**@vitejs/plugin-react 5.1.1**
- **Purpose**: React support for Vite
- **Features**:
  - Fast Refresh for instant feedback
  - JSX transformation
  - React DevTools integration

## Architecture Patterns

### Application Architecture
**Single Page Application (SPA)**
- Client-side routing (if needed)
- Dynamic content loading
- State management within React
- API calls from browser

### Component Architecture
**Modular Component-Based Design**
- **Structure**:
  ```
  src/
  ├── components/
  │   ├── Header.jsx + Header.css
  │   ├── SearchBar.jsx + SearchBar.css
  │   ├── Filter.jsx + Filter.css
  │   ├── Catalog.jsx + Catalog.css
  │   ├── WebsiteCard.jsx + WebsiteCard.css
  │   ├── ProjectCard.jsx + ProjectCard.css
  │   ├── InteractiveTour.jsx + InteractiveTour.css
  │   └── PaymentMockup.jsx + PaymentMockup.css
  ├── data/
  │   ├── websites.js
  │   └── sebastianProjects.js
  ├── App.jsx + App.css
  └── main.jsx
  ```
- **Principles**:
  - Single Responsibility: Each component has one clear purpose
  - Composition: Complex UIs built from simple components
  - Reusability: Components designed for multiple contexts
  - Colocation: Component logic and styles kept together

### State Management
**React Hooks (useState, useMemo)**
- **Local State**: Component-level state with useState
- **Computed State**: Memoized derived state with useMemo
- **Side Effects**: useEffect for lifecycle management
- **Why No Redux/Context**: 
  - Application state is simple enough for local state
  - Avoids unnecessary complexity
  - Better performance for this use case

### Data Management
**Static Data Files**
- **Location**: `src/data/`
- **Format**: JavaScript modules exporting arrays/objects
- **Benefits**:
  - No database needed for static content
  - Version controlled with code
  - Fast loading (bundled with app)
  - Easy to update and maintain

## Performance Optimizations

### Build Optimizations
- **Code Splitting**: Vite automatically splits code for optimal loading
- **Tree Shaking**: Unused code eliminated in production builds
- **Minification**: JavaScript and CSS minified for smaller bundle sizes
- **Asset Optimization**: Images and static assets optimized during build

### Runtime Optimizations
- **useMemo**: Expensive computations cached (filtering, searching)
- **Lazy Loading**: Images loaded as needed
- **Debouncing**: Search input debounced to reduce re-renders
- **Virtual Scrolling**: (If needed) For large lists of projects

## Development Workflow

### Local Development
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)
npm run lint         # Run ESLint
npm run build        # Production build
npm run preview      # Preview production build
```

### Development Server
- **Port**: 5173 (default Vite port)
- **Hot Module Replacement**: Instant updates without full page reload
- **Error Overlay**: In-browser error messages during development

## Deployment Strategy

### Static Hosting (Recommended)
**Platforms**: Vercel, Netlify, Cloudflare Pages, GitHub Pages
- **Build Command**: `npm run build`
- **Output Directory**: `dist/`
- **Benefits**:
  - Free hosting for static sites
  - Automatic deployments from Git
  - CDN distribution
  - HTTPS by default

### Server Hosting (For Express Backend)
**Platforms**: AWS EC2, DigitalOcean, Heroku, Railway
- **Requirements**: Node.js runtime
- **Process Manager**: PM2 for production
- **Benefits**:
  - Full control over server
  - Can host demo iframes
  - API endpoints if needed

## Browser Support

### Target Browsers
- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Minimum Requirements**:
  - ES6 support
  - CSS Grid and Flexbox
  - Fetch API

### Polyfills
- Not required for target browsers
- Vite handles necessary transformations

## Dependencies Summary

### Production Dependencies
```json
{
  "react": "^19.2.0",           // UI library
  "react-dom": "^19.2.0",       // React DOM renderer
  "express": "^5.2.1"           // Web server
}
```

### Development Dependencies
```json
{
  "@vitejs/plugin-react": "^5.1.1",        // Vite React plugin
  "@eslint/js": "^9.39.1",                 // ESLint base config
  "eslint": "^9.39.1",                     // Linter
  "eslint-plugin-react-hooks": "^7.0.1",   // React hooks linting
  "eslint-plugin-react-refresh": "^0.4.24", // Vite HMR linting
  "globals": "^16.5.0",                    // Global variables for ESLint
  "vite": "^7.2.4"                         // Build tool
}
```

## Future Technology Considerations

### Potential Additions

**TypeScript**
- **When**: If project grows significantly or team expands
- **Benefits**: Better type safety, improved IDE support, fewer runtime errors

**Tailwind CSS**
- **When**: If styling becomes more complex or needs faster iteration
- **Benefits**: Utility-first approach, consistent design system, smaller CSS bundle

**React Router**
- **When**: If multi-page navigation is needed
- **Benefits**: Client-side routing, deep linking, better SEO

**Testing Framework**
- **Options**: Vitest, React Testing Library
- **When**: Before adding complex features or accepting contributions
- **Benefits**: Confidence in changes, regression prevention

**State Management Library**
- **Options**: Zustand, Jotai (lightweight alternatives to Redux)
- **When**: If state becomes complex or shared across many components
- **Benefits**: Centralized state, easier debugging

**Backend Database**
- **Options**: PostgreSQL, MongoDB, Supabase
- **When**: If dynamic content or user accounts are needed
- **Benefits**: Dynamic data, user-generated content, analytics

## Technology Decision Rationale

### Why This Stack?

1. **Performance**: Vite + React 19 provides excellent performance out of the box
2. **Developer Experience**: Fast builds, instant HMR, minimal configuration
3. **Simplicity**: No unnecessary dependencies or complexity
4. **Maintainability**: Standard tools with excellent documentation and community support
5. **Scalability**: Easy to add features or migrate to more complex solutions if needed
6. **Cost**: Free hosting options available, minimal infrastructure requirements
7. **Modern**: Uses latest stable versions of all major tools
8. **Proven**: Battle-tested technologies used by thousands of production applications

### Trade-offs Accepted

1. **No TypeScript**: Faster development but less type safety
2. **No CSS Framework**: More manual styling but full control and smaller bundle
3. **No Backend Database**: Simpler deployment but limited to static content
4. **No Testing**: Faster initial development but requires manual testing
5. **No State Management Library**: Simpler code but may need refactoring if complexity grows

These trade-offs are appropriate for a portfolio catalog and can be revisited as the project evolves.
