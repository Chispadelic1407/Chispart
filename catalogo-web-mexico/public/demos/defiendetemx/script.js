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
document.querySelectorAll('.feature-card, .tech-category, .screenshot-card, .pwa-card, .accessibility-card, .scenario-card').forEach(el => {
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

// Toggle fullscreen for iframe
function toggleFullscreen() {
    const iframe = document.getElementById('live-iframe');
    const container = iframe.closest('.iframe-container');
    
    if (!document.fullscreenElement) {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
        }
        iframe.classList.add('fullscreen');
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        iframe.classList.remove('fullscreen');
    }
}

// Handle fullscreen change events
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('msfullscreenchange', handleFullscreenChange);

function handleFullscreenChange() {
    const iframe = document.getElementById('live-iframe');
    if (!document.fullscreenElement) {
        iframe.classList.remove('fullscreen');
    }
}

// Toggle scenario cards
function toggleScenario(card) {
    const isExpanded = card.classList.contains('expanded');
    
    // Close all other cards
    document.querySelectorAll('.scenario-card').forEach(c => {
        if (c !== card) {
            c.classList.remove('expanded');
        }
    });
    
    // Toggle current card
    if (isExpanded) {
        card.classList.remove('expanded');
    } else {
        card.classList.add('expanded');
    }
}

// Animate PWA mockups on scroll
const pwaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const mockup = entry.target;
            mockup.style.animation = 'phoneFloat 3s ease-in-out infinite';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.phone-frame').forEach(frame => {
    pwaObserver.observe(frame);
});

// Add floating animation for phone mockups
const style = document.createElement('style');
style.textContent = `
    @keyframes phoneFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);

// Animate Lighthouse score on scroll
const scoreObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const circle = entry.target.querySelector('circle:last-child');
            if (circle) {
                circle.style.transition = 'stroke-dashoffset 2s ease-out';
                circle.style.strokeDashoffset = '28.3';
            }
        }
    });
}, { threshold: 0.5 });

const scoreCircle = document.querySelector('.score-circle');
if (scoreCircle) {
    scoreObserver.observe(scoreCircle);
}

// Add keyboard navigation for scenario cards
document.querySelectorAll('.scenario-card').forEach((card, index) => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-expanded', 'false');
    
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleScenario(card);
            const isExpanded = card.classList.contains('expanded');
            card.setAttribute('aria-expanded', isExpanded);
        }
    });
});

// Add smooth reveal animation for architecture diagrams
const archObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const steps = entry.target.querySelectorAll('.workflow-step');
            steps.forEach((step, index) => {
                setTimeout(() => {
                    step.style.opacity = '1';
                    step.style.transform = 'scale(1)';
                }, index * 150);
            });
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.workflow').forEach(workflow => {
    const steps = workflow.querySelectorAll('.workflow-step');
    steps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'scale(0.8)';
        step.style.transition = 'all 0.5s ease';
    });
    archObserver.observe(workflow);
});

// Add hover effect for tech layers
document.querySelectorAll('.layer').forEach(layer => {
    layer.addEventListener('mouseenter', function() {
        this.style.borderLeftWidth = '8px';
        this.style.paddingLeft = 'calc(1.5rem - 4px)';
    });
    
    layer.addEventListener('mouseleave', function() {
        this.style.borderLeftWidth = '4px';
        this.style.paddingLeft = '1.5rem';
    });
});

// Animate stats counter on scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target.querySelector('.stat-value');
            if (statValue && !statValue.classList.contains('animated')) {
                statValue.classList.add('animated');
                const text = statValue.textContent;
                const number = parseInt(text);
                if (!isNaN(number)) {
                    animateCounter(statValue, 0, number, 2000);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

function animateCounter(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    const suffix = element.textContent.replace(/[0-9]/g, '');
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Add accessibility: announce scenario expansion to screen readers
document.querySelectorAll('.scenario-card').forEach(card => {
    const header = card.querySelector('.scenario-header h3');
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    card.appendChild(liveRegion);
    
    card.addEventListener('click', function() {
        setTimeout(() => {
            const isExpanded = this.classList.contains('expanded');
            liveRegion.textContent = isExpanded 
                ? `${header.textContent} expandido. Mostrando detalles.`
                : `${header.textContent} colapsado.`;
        }, 100);
    });
});

// Add screen reader only class
const srStyle = document.createElement('style');
srStyle.textContent = `
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
`;
document.head.appendChild(srStyle);
