// Terminal state
let commandHistory = [];
let historyIndex = -1;
let isProcessing = false;

// DOM Elements
const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');
const clearBtn = document.getElementById('clearBtn');
const helpBtn = document.getElementById('helpBtn');

// AI Command Responses Database
const aiResponses = {
    'help': {
        type: 'info',
        content: `Available Commands:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  AI Commands:
    ai explain <topic>        - Get AI explanation on any topic
    ai generate <what>        - Generate code, text, or content
    ai analyze <subject>      - Analyze and provide insights

  Project Commands:
    analyze project          - Analyze project structure
    optimize <target>        - Get optimization suggestions
    create <type> <name>     - Create new components/files

  Automation:
    workflow create <name>   - Create automation workflow
    task automate <desc>     - Automate repetitive tasks
    schedule <command>       - Schedule command execution

  Utility:
    help                     - Show this help message
    clear                    - Clear terminal
    version                  - Show CLI version
    status                   - Show system status

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Type any command or use natural language!`
    },
    'version': {
        type: 'success',
        content: `chispart-cli v1.0.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Node.js: v18.17.0
TypeScript: v5.2.2
Platform: ${navigator.platform}
AI Engine: Active ✓`
    },
    'status': {
        type: 'success',
        content: `System Status
━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ CLI Core:        Running
✓ AI Engine:       Active
✓ NLP Processor:   Ready
✓ Task Executor:   Online
✓ Connection:      Stable

All systems operational!`
    }
};

// Command handlers
const commandHandlers = {
    'ai': handleAICommand,
    'analyze': handleAnalyzeCommand,
    'optimize': handleOptimizeCommand,
    'create': handleCreateCommand,
    'workflow': handleWorkflowCommand,
    'task': handleTaskCommand,
    'schedule': handleScheduleCommand,
    'help': () => displayResponse(aiResponses.help),
    'clear': clearTerminal,
    'version': () => displayResponse(aiResponses.version),
    'status': () => displayResponse(aiResponses.status)
};

// Initialize
function init() {
    displayWelcomeMessage();
    setupEventListeners();
    terminalInput.focus();
}

// Welcome message
function displayWelcomeMessage() {
    const welcome = `
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║     ⚡ CHISPART CLI - AI-Powered Terminal v1.0.0     ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝

Welcome to CHISPART CLI! Type 'help' to see available commands.
You can also use natural language to interact with the AI.

`;
    addOutput(welcome, 'info');
}

// Event Listeners
function setupEventListeners() {
    terminalInput.addEventListener('keydown', handleKeyDown);
    clearBtn.addEventListener('click', clearTerminal);
    helpBtn.addEventListener('click', () => executeCommand('help'));

    // Example command buttons
    document.querySelectorAll('.example-cmd').forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            terminalInput.value = cmd;
            executeCommand(cmd);
        });
    });

    // Click to focus terminal
    document.querySelector('.terminal-body').addEventListener('click', () => {
        terminalInput.focus();
    });
}

// Handle keyboard input
function handleKeyDown(e) {
    if (isProcessing) {
        e.preventDefault();
        return;
    }

    switch(e.key) {
        case 'Enter':
            e.preventDefault();
            const command = terminalInput.value.trim();
            if (command) {
                executeCommand(command);
            }
            break;
        case 'ArrowUp':
            e.preventDefault();
            navigateHistory('up');
            break;
        case 'ArrowDown':
            e.preventDefault();
            navigateHistory('down');
            break;
        case 'Tab':
            e.preventDefault();
            autoComplete();
            break;
    }
}

// Execute command
async function executeCommand(command) {
    if (isProcessing) return;

    // Add command to history
    commandHistory.push(command);
    historyIndex = commandHistory.length;

    // Display command
    addOutput(`chispart@ai:~$ ${command}`, 'command');

    // Clear input
    terminalInput.value = '';

    // Show loading
    isProcessing = true;
    const loadingId = showLoading();

    // Simulate processing delay
    await sleep(800 + Math.random() * 700);

    // Remove loading
    removeLoading(loadingId);

    // Parse and execute
    const [mainCmd, ...args] = command.toLowerCase().split(' ');
    const handler = commandHandlers[mainCmd];

    if (handler) {
        await handler(args.join(' '), command);
    } else if (command.trim()) {
        handleNaturalLanguage(command);
    }

    isProcessing = false;
    scrollToBottom();
}

// AI Command Handler
async function handleAICommand(args, originalCmd) {
    const [subCmd, ...rest] = args.split(' ');
    const topic = rest.join(' ');

    switch(subCmd) {
        case 'explain':
            await explainTopic(topic);
            break;
        case 'generate':
            await generateContent(topic);
            break;
        case 'analyze':
            await analyzeSubject(topic);
            break;
        default:
            displayResponse({
                type: 'error',
                content: `Unknown AI command: ${subCmd}\nUse: ai [explain|generate|analyze] <topic>`
            });
    }
}

// Explain topic
async function explainTopic(topic) {
    const explanations = {
        'quantum computing': `Quantum Computing Explanation:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Quantum computing leverages quantum mechanical phenomena
like superposition and entanglement to process information.

Key Concepts:
• Qubits: Unlike classical bits (0 or 1), qubits can exist
  in superposition of both states simultaneously
• Entanglement: Qubits can be correlated in ways impossible
  for classical bits
• Quantum Gates: Operations that manipulate qubit states

Applications:
✓ Cryptography and security
✓ Drug discovery and molecular simulation
✓ Optimization problems
✓ Machine learning acceleration

Current State:
⚠ Still in experimental phase
⚠ Requires extreme cooling (~0.015K)
⚠ Error correction challenges

Leading Companies: IBM, Google, Microsoft, IonQ`,
        'default': `AI Analysis: "${topic}"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The topic "${topic}" encompasses several key aspects:

Overview:
This is a complex subject that requires understanding
of multiple interconnected concepts and technologies.

Key Components:
• Fundamental principles and core concepts
• Practical applications and use cases
• Current state of technology
• Future developments and trends

Recommendations:
✓ Start with foundational knowledge
✓ Explore practical examples
✓ Stay updated with latest developments
✓ Experiment with hands-on projects

For more detailed information, try:
ai analyze ${topic}    - Deep dive analysis
ai generate ${topic}   - Generate related content`
    };

    const response = explanations[topic.toLowerCase()] || explanations['default'];
    displayResponse({ type: 'success', content: response });
}

// Generate content
async function generateContent(what) {
    const templates = {
        'api documentation': `Generated API Documentation Template:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# API Documentation

## Authentication
POST /api/auth/login
- Request: { email: string, password: string }
- Response: { token: string, user: User }

## Users
GET /api/users
- Query: { page?: number, limit?: number }
- Response: { users: User[], total: number }

GET /api/users/:id
- Params: { id: string }
- Response: { user: User }

POST /api/users
- Request: { name: string, email: string }
- Response: { user: User, created: true }

## Data Models

User {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

✓ Documentation generated successfully!`,
        'default': `Content Generation: "${what}"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generated content outline:

1. Introduction
   • Context and background
   • Purpose and objectives

2. Main Content
   • Core concepts
   • Implementation details
   • Best practices

3. Examples
   • Practical use cases
   • Code samples
   • Configuration

4. Conclusion
   • Summary
   • Next steps
   • Resources

✓ Content structure generated!
Use: ai explain ${what} - For detailed explanation`
    };

    const response = templates[what.toLowerCase()] || templates['default'];
    displayResponse({ type: 'success', content: response });
}

// Analyze subject
async function analyzeSubject(subject) {
    const analyses = {
        'project structure': `Project Structure Analysis:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📁 Project Root
├── 📂 src/
│   ├── 📂 components/      ✓ Well organized
│   ├── 📂 services/        ✓ Good separation
│   ├── 📂 utils/           ✓ Proper utilities
│   ├── 📂 types/           ✓ Type definitions
│   └── 📄 index.ts         ✓ Entry point
├── 📂 tests/
│   └── 📂 unit/            ⚠ Needs more coverage
├── 📂 docs/                ✓ Documentation
├── 📄 package.json         ✓ Dependencies managed
├── 📄 tsconfig.json        ✓ TypeScript config
└── 📄 README.md            ✓ Project info

Analysis Results:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Structure Score: 8.5/10
✓ Maintainability: High
⚠ Test Coverage: 65% (recommend 80%+)
✓ Documentation: Good
✓ Type Safety: Excellent

Recommendations:
1. Increase test coverage
2. Add integration tests
3. Document API endpoints
4. Set up CI/CD pipeline`,
        'default': `Deep Analysis: "${subject}"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Comprehensive Analysis Report:

Strengths:
✓ Strong foundational concepts
✓ Good implementation approach
✓ Scalable architecture
✓ Modern best practices

Areas for Improvement:
⚠ Performance optimization needed
⚠ Error handling can be enhanced
⚠ Documentation should be expanded

Metrics:
• Complexity Score: Medium
• Maintainability: Good
• Performance: Acceptable
• Security: Review needed

Recommendations:
1. Implement caching strategy
2. Add comprehensive error handling
3. Improve code documentation
4. Set up monitoring and logging

Next Steps:
→ optimize ${subject}
→ create tests for ${subject}`
    };

    const response = analyses[subject.toLowerCase()] || analyses['default'];
    displayResponse({ type: 'info', content: response });
}

// Analyze Command Handler
async function handleAnalyzeCommand(target) {
    await analyzeSubject(target || 'project structure');
}

// Optimize Command Handler
async function handleOptimizeCommand(target) {
    const optimizations = {
        'database queries': `Database Query Optimization Report:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Detected Issues:
⚠ N+1 query pattern in user fetch
⚠ Missing indexes on frequently queried fields
⚠ Large result sets without pagination

Recommendations:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Add Database Indexes:
   CREATE INDEX idx_user_email ON users(email);
   CREATE INDEX idx_post_created ON posts(created_at);

2. Use Query Optimization:
   • Implement eager loading for relations
   • Add select() to fetch only needed fields
   • Use query batching for bulk operations

3. Implement Caching:
   • Redis for frequently accessed data
   • Cache invalidation strategy
   • Query result caching

Expected Improvements:
✓ 60% faster query execution
✓ 40% reduced database load
✓ Better scalability

Apply changes? Run: workflow apply optimization`,
        'default': `Optimization Analysis: "${target}"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Performance Review:
• Current state analyzed
• Bottlenecks identified
• Solutions proposed

Optimization Strategies:
1. Code-level improvements
2. Architectural changes
3. Resource optimization
4. Caching implementation

Estimated Impact:
⚡ 30-50% performance gain
📊 Better resource utilization
🚀 Improved user experience

Next: Review detailed report and apply changes`
    };

    const response = optimizations[target.toLowerCase()] || optimizations['default'];
    displayResponse({ type: 'success', content: response });
}

// Create Command Handler
async function handleCreateCommand(args) {
    const [type, name, ...rest] = args.split(' ');

    const creates = {
        'component': `Creating React Component: ${name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Generated ${name}.tsx
✓ Generated ${name}.module.css
✓ Generated ${name}.test.tsx
✓ Updated index.ts

File: src/components/${name}/${name}.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import React from 'react';
import styles from './${name}.module.css';

interface ${name}Props {
  // Add your props here
}

export const ${name}: React.FC<${name}Props> = (props) => {
  return (
    <div className={styles.container}>
      <h2>${name} Component</h2>
    </div>
  );
};

✓ Component created successfully!
→ Edit: src/components/${name}/${name}.tsx`,
        'default': `Creating ${type}: ${name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ File structure created
✓ Boilerplate code generated
✓ Tests scaffolded
✓ Documentation added

Location: src/${type}s/${name}/

Next steps:
1. Review generated files
2. Customize implementation
3. Add tests
4. Update documentation`
    };

    const response = creates[type?.toLowerCase()] || creates['default'];
    displayResponse({ type: 'success', content: response });
}

// Workflow Command Handler
async function handleWorkflowCommand(args) {
    const [action, ...rest] = args.split(' ');
    const name = rest.join(' ');

    displayResponse({
        type: 'success',
        content: `Workflow ${action}: "${name}"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Workflow configuration created
✓ Steps defined and validated
✓ Automation rules configured
✓ Triggers set up

Workflow Steps:
1. Initialize environment
2. Execute primary tasks
3. Run validations
4. Deploy changes
5. Send notifications

Status: Active ✓
Run: workflow run ${name}`
    });
}

// Task Command Handler
async function handleTaskCommand(args) {
    const [action, ...desc] = args.split(' ');
    const description = desc.join(' ');

    displayResponse({
        type: 'success',
        content: `Task Automation: ${description}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Task analyzed and understood
✓ Automation script generated
✓ Dependencies resolved
✓ Scheduled for execution

Automated Actions:
• Pre-execution checks
• Main task execution
• Validation and testing
• Cleanup and reporting

Estimated Time Saved: 45 minutes per execution
Scheduled: Ready to run

Execute: task run "${description}"`
    });
}

// Schedule Command Handler
async function handleScheduleCommand(command) {
    displayResponse({
        type: 'success',
        content: `Scheduled Command: ${command}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Command validated
✓ Schedule configured
✓ Cron job created
✓ Notifications enabled

Schedule Details:
Command: ${command}
Frequency: Daily at 02:00 AM
Next Run: Tomorrow 02:00 AM
Retries: 3 attempts
Timeout: 30 minutes

Manage: schedule list | schedule remove <id>`
    });
}

// Natural Language Handler
function handleNaturalLanguage(input) {
    const nlpResponses = [
        `Processing natural language: "${input}"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AI Understanding:
Your request has been analyzed and interpreted.

Suggested Actions:
1. Break down into specific commands
2. Execute step by step
3. Validate results

Try being more specific with commands like:
• ai explain <topic>
• analyze <target>
• create <type> <name>

Or type 'help' for available commands.`,
        `Natural Language Processing: "${input}"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Intent recognized
✓ Context analyzed
✓ Actions identified

Interpretation:
Your request involves multiple steps. I'll help you
break it down into executable commands.

Recommended workflow:
1. Start with: ai analyze <your topic>
2. Then: optimize <specific area>
3. Finally: create <what you need>

Need help? Type 'help' for command reference.`
    ];

    const response = nlpResponses[Math.floor(Math.random() * nlpResponses.length)];
    displayResponse({ type: 'info', content: response });
}

// Display response
function displayResponse(response) {
    addOutput(response.content, response.type);
}

// Add output to terminal
function addOutput(text, type = 'output') {
    const line = document.createElement('div');
    line.className = `terminal-line terminal-${type}`;

    const span = document.createElement('span');
    span.className = `terminal-${type}-text`;
    span.textContent = text;

    line.appendChild(span);
    terminalOutput.appendChild(line);
}

// Show loading indicator
function showLoading() {
    const id = 'loading-' + Date.now();
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.id = id;

    const span = document.createElement('span');
    span.className = 'terminal-output-text';
    span.innerHTML = '⚡ Processing<span class="loading-dots"></span>';

    line.appendChild(span);
    terminalOutput.appendChild(line);

    return id;
}

// Remove loading indicator
function removeLoading(id) {
    const element = document.getElementById(id);
    if (element) {
        element.remove();
    }
}

// Clear terminal
function clearTerminal() {
    terminalOutput.innerHTML = '';
    displayWelcomeMessage();
    terminalInput.focus();
}

// Navigate command history
function navigateHistory(direction) {
    if (commandHistory.length === 0) return;

    if (direction === 'up') {
        historyIndex = Math.max(0, historyIndex - 1);
    } else {
        historyIndex = Math.min(commandHistory.length, historyIndex + 1);
    }

    terminalInput.value = historyIndex < commandHistory.length
        ? commandHistory[historyIndex]
        : '';
}

// Auto-complete
function autoComplete() {
    const input = terminalInput.value.toLowerCase();
    const commands = Object.keys(commandHandlers);

    const matches = commands.filter(cmd => cmd.startsWith(input));

    if (matches.length === 1) {
        terminalInput.value = matches[0] + ' ';
    } else if (matches.length > 1) {
        addOutput('Suggestions: ' + matches.join(', '), 'info');
        scrollToBottom();
    }
}

// Scroll to bottom
function scrollToBottom() {
    const terminalBody = document.querySelector('.terminal-body');
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Sleep utility
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .tech-category, .arch-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
});

// Initialize on load
document.addEventListener('DOMContentLoaded', init);
