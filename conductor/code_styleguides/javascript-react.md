# JavaScript & React Style Guide

## Overview

This style guide defines coding standards for JavaScript and React code in the Chispart project. Following these guidelines ensures consistency, maintainability, and code quality across the codebase.

## General JavaScript Principles

### Code Style

**Use Modern ES6+ Syntax**
```javascript
// ✅ Good - Arrow functions
const handleClick = () => {
  console.log('Clicked');
};

// ❌ Avoid - Function expressions for simple callbacks
const handleClick = function() {
  console.log('Clicked');
};
```

**Prefer const and let over var**
```javascript
// ✅ Good
const MAX_ITEMS = 100;
let currentCount = 0;

// ❌ Avoid
var MAX_ITEMS = 100;
var currentCount = 0;
```

**Use Template Literals for String Interpolation**
```javascript
// ✅ Good
const greeting = `Hello, ${name}!`;

// ❌ Avoid
const greeting = 'Hello, ' + name + '!';
```

**Use Destructuring**
```javascript
// ✅ Good
const { title, description, category } = website;
const [first, second] = items;

// ❌ Avoid
const title = website.title;
const description = website.description;
const first = items[0];
```

**Use Spread Operator**
```javascript
// ✅ Good
const newArray = [...oldArray, newItem];
const newObject = { ...oldObject, newProp: value };

// ❌ Avoid
const newArray = oldArray.concat([newItem]);
const newObject = Object.assign({}, oldObject, { newProp: value });
```

### Naming Conventions

**Variables and Functions: camelCase**
```javascript
const userName = 'John';
const isActive = true;
function calculateTotal() { }
```

**Constants: UPPER_SNAKE_CASE**
```javascript
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = 'https://api.example.com';
```

**Classes and Components: PascalCase**
```javascript
class UserProfile { }
function WebsiteCard() { }
```

**Private/Internal: Prefix with underscore (optional)**
```javascript
const _internalHelper = () => { };
```

**Boolean Variables: Use is/has/should prefix**
```javascript
const isLoading = true;
const hasError = false;
const shouldRender = true;
```

### File Organization

**One Component Per File**
- Each React component should have its own file
- File name should match component name: `WebsiteCard.jsx`

**Imports Order**
```javascript
// 1. External dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// 2. Internal components
import Header from './components/Header';
import Footer from './components/Footer';

// 3. Data/utilities
import { websites } from './data/websites';
import { formatDate } from './utils/helpers';

// 4. Styles
import './App.css';
```

**Exports**
```javascript
// ✅ Good - Default export for components
export default WebsiteCard;

// ✅ Good - Named exports for utilities
export { formatDate, calculatePrice };

// ❌ Avoid - Mixing default and named exports in components
export default WebsiteCard;
export { WebsiteCardSkeleton };
```

## React-Specific Guidelines

### Component Structure

**Functional Components (Preferred)**
```javascript
// ✅ Good - Functional component with hooks
import React, { useState, useEffect } from 'react';
import './WebsiteCard.css';

function WebsiteCard({ title, description, price }) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Side effects here
  }, []);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="website-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{price}</span>
    </div>
  );
}

export default WebsiteCard;
```

**Component Organization Order**
1. Imports
2. Component definition
3. State declarations (useState)
4. Effects (useEffect)
5. Memoized values (useMemo, useCallback)
6. Event handlers
7. Render logic
8. Return statement
9. Export

### Props

**Destructure Props**
```javascript
// ✅ Good
function WebsiteCard({ title, description, price, onSelect }) {
  return <div>{title}</div>;
}

// ❌ Avoid
function WebsiteCard(props) {
  return <div>{props.title}</div>;
}
```

**Use Default Props**
```javascript
// ✅ Good
function WebsiteCard({ title = 'Untitled', isActive = false }) {
  return <div>{title}</div>;
}
```

**Prop Types (Optional but Recommended)**
```javascript
import PropTypes from 'prop-types';

WebsiteCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  price: PropTypes.string,
  onSelect: PropTypes.func
};
```

### State Management

**Use useState for Local State**
```javascript
// ✅ Good
const [searchTerm, setSearchTerm] = useState('');
const [selectedCategory, setSelectedCategory] = useState('Todos');
```

**Use useMemo for Expensive Computations**
```javascript
// ✅ Good - Memoize filtered results
const filteredWebsites = useMemo(() => {
  return websites.filter(website => 
    website.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [websites, searchTerm]);

// ❌ Avoid - Recalculating on every render
const filteredWebsites = websites.filter(website => 
  website.title.toLowerCase().includes(searchTerm.toLowerCase())
);
```

**Use useCallback for Event Handlers Passed as Props**
```javascript
// ✅ Good - Prevent unnecessary re-renders
const handleSelect = useCallback((id) => {
  setSelectedId(id);
}, []);

// ❌ Avoid - Creates new function on every render
const handleSelect = (id) => {
  setSelectedId(id);
};
```

### JSX Guidelines

**Self-Closing Tags**
```javascript
// ✅ Good
<SearchBar />
<img src={url} alt={title} />

// ❌ Avoid
<SearchBar></SearchBar>
<img src={url} alt={title}></img>
```

**Conditional Rendering**
```javascript
// ✅ Good - Ternary for if/else
{isLoading ? <Spinner /> : <Content />}

// ✅ Good - && for conditional display
{error && <ErrorMessage />}

// ❌ Avoid - Complex logic in JSX
{isLoading ? <Spinner /> : error ? <Error /> : data ? <Content /> : null}

// ✅ Better - Extract to variable or function
const renderContent = () => {
  if (isLoading) return <Spinner />;
  if (error) return <Error />;
  if (data) return <Content />;
  return null;
};

return <div>{renderContent()}</div>;
```

**List Rendering**
```javascript
// ✅ Good - Use key prop with unique identifier
{websites.map(website => (
  <WebsiteCard key={website.id} {...website} />
))}

// ❌ Avoid - Using index as key (unless list is static)
{websites.map((website, index) => (
  <WebsiteCard key={index} {...website} />
))}
```

**Event Handlers**
```javascript
// ✅ Good - Arrow function for inline handlers with parameters
<button onClick={() => handleSelect(id)}>Select</button>

// ✅ Good - Direct reference for handlers without parameters
<button onClick={handleClick}>Click</button>

// ❌ Avoid - Calling function immediately
<button onClick={handleClick()}>Click</button>
```

**Class Names**
```javascript
// ✅ Good - Use className
<div className="website-card">

// ❌ Avoid - Using class
<div class="website-card">

// ✅ Good - Conditional classes
<div className={`card ${isActive ? 'active' : ''}`}>

// ✅ Better - Template literal for multiple conditions
<div className={`card ${isActive ? 'active' : ''} ${isExpanded ? 'expanded' : ''}`}>
```

### Hooks Rules

**Only Call Hooks at Top Level**
```javascript
// ✅ Good
function Component() {
  const [state, setState] = useState(0);
  useEffect(() => { }, []);
  
  return <div />;
}

// ❌ Avoid - Conditional hooks
function Component() {
  if (condition) {
    const [state, setState] = useState(0); // ❌ Wrong
  }
  
  return <div />;
}
```

**Only Call Hooks from React Functions**
```javascript
// ✅ Good - In component
function Component() {
  const [state, setState] = useState(0);
}

// ✅ Good - In custom hook
function useCustomHook() {
  const [state, setState] = useState(0);
  return state;
}

// ❌ Avoid - In regular function
function regularFunction() {
  const [state, setState] = useState(0); // ❌ Wrong
}
```

**Dependencies Array**
```javascript
// ✅ Good - Include all dependencies
useEffect(() => {
  fetchData(userId);
}, [userId]);

// ❌ Avoid - Missing dependencies
useEffect(() => {
  fetchData(userId);
}, []); // ❌ userId is missing

// ✅ Good - Empty array for mount-only effect
useEffect(() => {
  console.log('Component mounted');
}, []);
```

## Code Quality

### Error Handling

**Use Try-Catch for Async Operations**
```javascript
// ✅ Good
const fetchData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
  } catch (error) {
    console.error('Failed to fetch data:', error);
    setError(error.message);
  }
};
```

**Provide Fallbacks**
```javascript
// ✅ Good
const title = website?.title ?? 'Untitled';
const price = website?.price || 'Price not available';
```

### Performance

**Avoid Inline Object/Array Creation in Props**
```javascript
// ❌ Avoid - Creates new object on every render
<Component style={{ margin: 10 }} />

// ✅ Good - Define outside or use useMemo
const style = { margin: 10 };
<Component style={style} />
```

**Lazy Load Heavy Components**
```javascript
// ✅ Good
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Comments

**Use Comments Sparingly**
```javascript
// ✅ Good - Explain why, not what
// Debounce search to avoid excessive API calls
const debouncedSearch = debounce(handleSearch, 300);

// ❌ Avoid - Obvious comments
// Set the state to true
setIsActive(true);
```

**Use JSDoc for Complex Functions**
```javascript
/**
 * Filters websites based on category and search term
 * @param {Array} websites - Array of website objects
 * @param {string} category - Selected category filter
 * @param {string} searchTerm - Search query string
 * @returns {Array} Filtered array of websites
 */
function filterWebsites(websites, category, searchTerm) {
  // Implementation
}
```

## Testing Considerations

**Write Testable Code**
```javascript
// ✅ Good - Pure function, easy to test
export function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ❌ Avoid - Side effects, hard to test
function calculateTotal(items) {
  let total = 0;
  items.forEach(item => {
    total += item.price;
    updateUI(total); // Side effect
  });
  return total;
}
```

**Separate Logic from Presentation**
```javascript
// ✅ Good - Logic in custom hook
function useFilteredWebsites(websites, category, searchTerm) {
  return useMemo(() => {
    return websites.filter(/* filtering logic */);
  }, [websites, category, searchTerm]);
}

function Catalog() {
  const filteredWebsites = useFilteredWebsites(websites, category, searchTerm);
  return <div>{/* render */}</div>;
}
```

## Common Patterns

### Custom Hooks
```javascript
// ✅ Good - Reusable logic in custom hook
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

### Compound Components
```javascript
// ✅ Good - Flexible, composable components
function Card({ children }) {
  return <div className="card">{children}</div>;
}

Card.Header = function CardHeader({ children }) {
  return <div className="card-header">{children}</div>;
};

Card.Body = function CardBody({ children }) {
  return <div className="card-body">{children}</div>;
};

// Usage
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
</Card>
```

## Anti-Patterns to Avoid

**Don't Mutate State Directly**
```javascript
// ❌ Avoid
state.items.push(newItem);
setState(state);

// ✅ Good
setState({ ...state, items: [...state.items, newItem] });
```

**Don't Use Index as Key for Dynamic Lists**
```javascript
// ❌ Avoid
{items.map((item, index) => <Item key={index} />)}

// ✅ Good
{items.map(item => <Item key={item.id} />)}
```

**Don't Forget to Clean Up Effects**
```javascript
// ❌ Avoid - Memory leak
useEffect(() => {
  const interval = setInterval(() => { }, 1000);
}, []);

// ✅ Good - Cleanup
useEffect(() => {
  const interval = setInterval(() => { }, 1000);
  return () => clearInterval(interval);
}, []);
```

## Accessibility

**Use Semantic HTML**
```javascript
// ✅ Good
<button onClick={handleClick}>Click</button>
<nav><ul><li><a href="/">Home</a></li></ul></nav>

// ❌ Avoid
<div onClick={handleClick}>Click</div>
<div><div><div><span>Home</span></div></div></div>
```

**Provide Alt Text**
```javascript
// ✅ Good
<img src={url} alt="Project screenshot showing dashboard" />

// ❌ Avoid
<img src={url} />
<img src={url} alt="" /> // Only for decorative images
```

**Keyboard Navigation**
```javascript
// ✅ Good - Handle keyboard events
<div 
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyPress={(e) => e.key === 'Enter' && handleClick()}
>
  Click me
</div>
```

## Summary

- Use modern ES6+ syntax consistently
- Follow React hooks rules strictly
- Keep components small and focused
- Use meaningful names for variables and functions
- Optimize performance with useMemo and useCallback
- Write accessible, semantic HTML
- Comment only when necessary to explain "why"
- Separate logic from presentation
- Handle errors gracefully
- Follow consistent file and code organization
