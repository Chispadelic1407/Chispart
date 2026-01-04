# Node.js & Express Style Guide

## Overview

This style guide defines coding standards for Node.js and Express server code in the Chispart project. These guidelines ensure consistency, security, and maintainability for backend services.

## General Node.js Principles

### Module System

**Use ES6 Modules**
```javascript
// ✅ Good - ES6 imports (if package.json has "type": "module")
import express from 'express';
import path from 'path';
import { readFile } from 'fs/promises';

// ✅ Good - CommonJS (default Node.js)
const express = require('express');
const path = require('path');
const fs = require('fs');

// Be consistent throughout the project
```

**Organize Imports**
```javascript
// 1. Built-in Node.js modules
const path = require('path');
const fs = require('fs');

// 2. External dependencies
const express = require('express');
const cors = require('cors');

// 3. Internal modules
const config = require('./config');
const routes = require('./routes');
```

### File Structure

**Organize by Feature**
```
server/
├── config/
│   ├── database.js
│   └── environment.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   └── logger.js
├── routes/
│   ├── api.js
│   └── demos.js
├── utils/
│   ├── logger.js
│   └── helpers.js
├── app.js          // Express app setup
└── server.js       // Server entry point
```

## Express Application Structure

### Application Setup

**Separate App and Server**
```javascript
// app.js - Express application setup
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', require('./routes/api'));
app.use('/demos', require('./routes/demos'));

// Error handling
app.use(require('./middleware/errorHandler'));

module.exports = app;
```

```javascript
// server.js - Server entry point
const app = require('./app');
const config = require('./config/environment');

const PORT = config.port || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Middleware

**Order Matters**
```javascript
const express = require('express');
const app = express();

// 1. Security middleware (first)
app.use(helmet());
app.use(cors());

// 2. Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Logging
app.use(logger);

// 4. Static files
app.use(express.static('public'));

// 5. Routes
app.use('/api', apiRoutes);

// 6. Error handling (last)
app.use(errorHandler);
```

**Custom Middleware**
```javascript
// ✅ Good - Clear, focused middleware
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

// ✅ Good - Async middleware with error handling
async function authenticate(req, res, next) {
  try {
    const token = req.headers.authorization;
    const user = await verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

// ❌ Avoid - Forgetting to call next()
function badMiddleware(req, res, next) {
  console.log('Processing...');
  // Missing next() - request hangs!
}
```

### Route Handlers

**Use Router for Organization**
```javascript
// routes/api.js
const express = require('express');
const router = express.Router();

// ✅ Good - Clear route definitions
router.get('/projects', getProjects);
router.get('/projects/:id', getProjectById);
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

module.exports = router;
```

**Async Route Handlers**
```javascript
// ✅ Good - Async/await with try-catch
router.get('/projects', async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

// ✅ Better - Async wrapper utility
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/projects', asyncHandler(async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
}));
```

**Route Parameters and Query Strings**
```javascript
// ✅ Good - Validate and sanitize inputs
router.get('/projects/:id', async (req, res) => {
  const { id } = req.params;
  
  // Validate
  if (!isValidId(id)) {
    return res.status(400).json({ error: 'Invalid project ID' });
  }
  
  const project = await Project.findById(id);
  
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  
  res.json(project);
});

// ✅ Good - Query parameters with defaults
router.get('/projects', async (req, res) => {
  const { 
    page = 1, 
    limit = 10, 
    category = 'all' 
  } = req.query;
  
  const projects = await Project.find({ category })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  
  res.json(projects);
});
```

### Response Handling

**Consistent Response Format**
```javascript
// ✅ Good - Success response
res.status(200).json({
  success: true,
  data: projects
});

// ✅ Good - Error response
res.status(400).json({
  success: false,
  error: 'Invalid request',
  message: 'Project ID is required'
});

// ✅ Good - Paginated response
res.status(200).json({
  success: true,
  data: projects,
  pagination: {
    page: 1,
    limit: 10,
    total: 100,
    pages: 10
  }
});
```

**HTTP Status Codes**
```javascript
// ✅ Good - Use appropriate status codes
res.status(200).json(data);        // OK
res.status(201).json(newProject);  // Created
res.status(204).send();            // No Content
res.status(400).json(error);       // Bad Request
res.status(401).json(error);       // Unauthorized
res.status(403).json(error);       // Forbidden
res.status(404).json(error);       // Not Found
res.status(500).json(error);       // Internal Server Error
```

## Error Handling

### Error Middleware

**Centralized Error Handler**
```javascript
// middleware/errorHandler.js
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  
  // Operational errors
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message
    });
  }
  
  // Programming errors
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
}

module.exports = errorHandler;
```

**Custom Error Classes**
```javascript
// utils/errors.js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

class ValidationError extends AppError {
  constructor(message = 'Validation failed') {
    super(message, 400);
  }
}

module.exports = { AppError, NotFoundError, ValidationError };
```

**Using Custom Errors**
```javascript
const { NotFoundError, ValidationError } = require('./utils/errors');

router.get('/projects/:id', async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      throw new NotFoundError('Project not found');
    }
    
    res.json(project);
  } catch (error) {
    next(error);
  }
});
```

## Security Best Practices

### Input Validation

**Validate All Inputs**
```javascript
// ✅ Good - Validate request body
const { body, validationResult } = require('express-validator');

router.post('/projects',
  [
    body('title').trim().notEmpty().isLength({ max: 100 }),
    body('description').trim().notEmpty(),
    body('category').isIn(['web', 'mobile', 'api'])
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Process valid data
  }
);
```

**Sanitize Inputs**
```javascript
// ✅ Good - Sanitize user input
const sanitizeHtml = require('sanitize-html');

router.post('/projects', (req, res) => {
  const { title, description } = req.body;
  
  const sanitizedData = {
    title: sanitizeHtml(title, { allowedTags: [] }),
    description: sanitizeHtml(description, { allowedTags: ['b', 'i', 'em'] })
  };
  
  // Use sanitized data
});
```

### Security Headers

**Use Helmet**
```javascript
const helmet = require('helmet');

// ✅ Good - Basic helmet setup
app.use(helmet());

// ✅ Good - Custom helmet configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:']
    }
  }
}));
```

### CORS Configuration

**Configure CORS Properly**
```javascript
const cors = require('cors');

// ✅ Good - Specific origin
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));

// ✅ Good - Multiple origins
const allowedOrigins = [
  'https://yourdomain.com',
  'https://www.yourdomain.com'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// ❌ Avoid - Allow all origins in production
app.use(cors({ origin: '*' }));  // Only for development
```

### Rate Limiting

**Implement Rate Limiting**
```javascript
const rateLimit = require('express-rate-limit');

// ✅ Good - General rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later'
});

app.use('/api/', limiter);

// ✅ Good - Stricter limit for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts'
});

app.use('/api/auth/', authLimiter);
```

## Environment Configuration

### Environment Variables

**Use dotenv**
```javascript
// ✅ Good - Load environment variables
require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET
};

// ✅ Good - Validate required variables
const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET'];

requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});
```

**.env File Structure**
```bash
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=mongodb://localhost:27017/myapp

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# External APIs
API_KEY=your-api-key
```

**Never Commit .env**
```bash
# .gitignore
.env
.env.local
.env.*.local
```

## Logging

### Structured Logging

**Use a Logging Library**
```javascript
const winston = require('winston');

// ✅ Good - Configure logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Add console transport in development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
```

**Log Appropriately**
```javascript
const logger = require('./utils/logger');

// ✅ Good - Log levels
logger.error('Database connection failed', { error: err });
logger.warn('Deprecated API endpoint used', { endpoint: req.path });
logger.info('User logged in', { userId: user.id });
logger.debug('Processing request', { body: req.body });

// ❌ Avoid - console.log in production
console.log('User data:', user);  // Use logger instead
```

## Performance

### Caching

**Implement Caching**
```javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 }); // 10 minutes

// ✅ Good - Cache middleware
function cacheMiddleware(duration) {
  return (req, res, next) => {
    const key = req.originalUrl;
    const cachedResponse = cache.get(key);
    
    if (cachedResponse) {
      return res.json(cachedResponse);
    }
    
    res.originalJson = res.json;
    res.json = (body) => {
      cache.set(key, body, duration);
      res.originalJson(body);
    };
    
    next();
  };
}

// Usage
router.get('/projects', cacheMiddleware(600), getProjects);
```

### Compression

**Enable Compression**
```javascript
const compression = require('compression');

// ✅ Good - Compress responses
app.use(compression());
```

### Static File Serving

**Optimize Static Files**
```javascript
// ✅ Good - Serve static files with caching
app.use(express.static('public', {
  maxAge: '1d',
  etag: true
}));

// ✅ Good - Separate static file server
app.use('/demos', express.static('public/demos', {
  maxAge: '7d'
}));
```

## Testing

### Unit Tests

**Test Route Handlers**
```javascript
const request = require('supertest');
const app = require('../app');

describe('GET /api/projects', () => {
  it('should return all projects', async () => {
    const res = await request(app)
      .get('/api/projects')
      .expect('Content-Type', /json/)
      .expect(200);
    
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
  
  it('should return 404 for non-existent project', async () => {
    const res = await request(app)
      .get('/api/projects/invalid-id')
      .expect(404);
    
    expect(res.body.success).toBe(false);
  });
});
```

## Common Patterns

### Serving Static HTML for Demos

**Demo Route Handler**
```javascript
const express = require('express');
const path = require('path');
const router = express.Router();

// ✅ Good - Serve demo files
router.get('/:demoName', (req, res) => {
  const { demoName } = req.params;
  const demoPath = path.join(__dirname, '../public/demos', demoName, 'index.html');
  
  res.sendFile(demoPath, (err) => {
    if (err) {
      res.status(404).json({ error: 'Demo not found' });
    }
  });
});

module.exports = router;
```

### Health Check Endpoint

**Health Check**
```javascript
// ✅ Good - Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

### Graceful Shutdown

**Handle Shutdown Signals**
```javascript
// ✅ Good - Graceful shutdown
const server = app.listen(PORT);

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    // Close database connections, etc.
    process.exit(0);
  });
});
```

## Summary

- Organize code by feature, not by type
- Use middleware for cross-cutting concerns
- Implement centralized error handling
- Validate and sanitize all inputs
- Use environment variables for configuration
- Implement security best practices (helmet, CORS, rate limiting)
- Use structured logging
- Optimize with caching and compression
- Write tests for critical paths
- Handle graceful shutdown
- Keep routes thin, logic in services
- Use async/await with proper error handling
