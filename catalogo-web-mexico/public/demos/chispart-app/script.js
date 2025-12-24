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

// Add scroll animation to elements
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

// Observe all feature cards and tech categories
document.querySelectorAll('.feature-card, .tech-category, .arch-card, .flow-card, .agent-detail-card, .screenshot-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
});

// Animate stats on scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'pulse 2s ease-in-out infinite';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Fullscreen toggle for iframe
function toggleFullscreen() {
    const wrapper = document.querySelector('.iframe-wrapper');
    const btn = document.querySelector('.fullscreen-btn');
    
    if (!wrapper.classList.contains('fullscreen')) {
        wrapper.classList.add('fullscreen');
        btn.textContent = '✕';
    } else {
        wrapper.classList.remove('fullscreen');
        btn.textContent = '⛶';
    }
}

// API Endpoint toggle
function toggleEndpoint(btn) {
    const endpoint = btn.closest('.api-endpoint');
    const content = endpoint.querySelector('.endpoint-content');
    
    btn.classList.toggle('expanded');
    content.classList.toggle('expanded');
}

// Copy code to clipboard
function copyCode(btn) {
    const codeBlock = btn.closest('.code-example').querySelector('code');
    const text = codeBlock.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.textContent;
        btn.textContent = '✓';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
}

// CLI Terminal Animation
const cliCommands = [
    {
        command: 'chispart generate --prompt "Create a REST API with FastAPI" --agent code',
        output: `<span class="success">✓ Generation complete!</span>
<span class="info">Agent: Code Agent</span>
<span class="info">Model: blackbox-ai</span>
<span class="info">Execution time: 2.34s</span>

Generated FastAPI application with:
  • Main application file (main.py)
  • Pydantic models
  • CRUD endpoints
  • Error handling
  • Documentation`
    },
    {
        command: 'chispart analyze --file app.py --type code_quality',
        output: `<span class="success">✓ Analysis complete!</span>
<span class="info">Quality Score: 8.5/10</span>

Findings:
  • Code structure: Excellent
  • Documentation: Good
  • Error handling: Very Good
  • Performance: Optimal

Suggestions:
  • Add type hints to 2 functions
  • Consider adding unit tests`
    },
    {
        command: 'chispart workflow --type research_and_code --task "Best practices for async Python"',
        output: `<span class="success">✓ Workflow executing...</span>
<span class="info">Step 1/2: Research Agent - Gathering information</span>
<span class="info">Step 2/2: Code Agent - Creating examples</span>

<span class="success">✓ Workflow complete!</span>
Generated comprehensive guide with code examples.`
    }
];

let currentCommandIndex = 0;
let currentCharIndex = 0;
let isTyping = false;

function typeCommand(commandIndex, elementId, callback) {
    const command = cliCommands[commandIndex].command;
    const element = document.getElementById(elementId);
    
    if (!element) return;
    
    if (currentCharIndex < command.length) {
        element.textContent += command[currentCharIndex];
        currentCharIndex++;
        setTimeout(() => typeCommand(commandIndex, elementId, callback), 50);
    } else {
        currentCharIndex = 0;
        if (callback) {
            setTimeout(callback, 500);
        }
    }
}

function showOutput(commandIndex, outputId) {
    const output = cliCommands[commandIndex].output;
    const element = document.getElementById(outputId);
    
    if (!element) return;
    
    element.innerHTML = output;
    element.style.opacity = '0';
    element.style.display = 'block';
    
    setTimeout(() => {
        element.style.transition = 'opacity 0.5s ease';
        element.style.opacity = '1';
    }, 100);
}

function startCLIAnimation() {
    if (isTyping) return;
    isTyping = true;
    
    // Command 1
    typeCommand(0, 'cli-command-1', () => {
        showOutput(0, 'cli-output-1');
        
        // Command 2
        setTimeout(() => {
            typeCommand(1, 'cli-command-2', () => {
                showOutput(1, 'cli-output-2');
                
                // Command 3
                setTimeout(() => {
                    typeCommand(2, 'cli-command-3', () => {
                        showOutput(2, 'cli-output-3');
                        isTyping = false;
                    });
                }, 2000);
            });
        }, 3000);
    });
}

// Start CLI animation when section is visible
const cliObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !isTyping) {
            startCLIAnimation();
        }
    });
}, { threshold: 0.3 });

const cliSection = document.querySelector('.cli-demo');
if (cliSection) {
    cliObserver.observe(cliSection);
}

// Animate agent flow on scroll
const flowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const flowCards = entry.target.querySelectorAll('.flow-card');
            flowCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, index * 150);
            });
        }
    });
}, { threshold: 0.2 });

const agentFlow = document.querySelector('.agent-flow');
if (agentFlow) {
    flowObserver.observe(agentFlow);
}

// Add hover effect to flow cards
document.querySelectorAll('.flow-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const agent = card.getAttribute('data-agent');
        card.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});
