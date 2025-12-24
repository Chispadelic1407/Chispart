// Testimonials Data
const testimonials = [
    {
        name: "María González",
        role: "CEO, TechStart",
        text: "La mejor decisión que tomamos fue implementar esta plataforma. Nuestras ventas aumentaron un 150% en solo 6 meses.",
        avatar: "👩‍💼",
        rating: 5
    },
    {
        name: "Carlos Rodríguez",
        role: "Director de TI, GlobalCorp",
        text: "Excelente soporte y herramientas potentes. El equipo siempre está disponible para ayudarnos con cualquier duda.",
        avatar: "👨‍💻",
        rating: 5
    },
    {
        name: "Ana Martínez",
        role: "Fundadora, StartupMX",
        text: "Increíble plataforma que nos permitió escalar rápidamente. La automatización nos ahorró cientos de horas.",
        avatar: "👩‍🚀",
        rating: 5
    },
    {
        name: "Roberto Silva",
        role: "CTO, InnovateTech",
        text: "La integración fue súper sencilla y el ROI fue evidente desde el primer mes. Totalmente recomendado.",
        avatar: "👨‍🔬",
        rating: 5
    }
];

let currentTestimonial = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderTestimonials();
    setupEventListeners();
    animateStats();
});

// Render Testimonials
function renderTestimonials() {
    const track = document.getElementById('testimonialTrack');
    const dots = document.getElementById('sliderDots');

    track.innerHTML = testimonials.map(t => `
        <div class="testimonial-card glass">
            <div class="testimonial-avatar">${t.avatar}</div>
            <p class="testimonial-text">"${t.text}"</p>
            <div class="testimonial-author">${t.name}</div>
            <div class="testimonial-role">${t.role}</div>
            <div class="testimonial-rating">${'⭐'.repeat(t.rating)}</div>
        </div>
    `).join('');

    dots.innerHTML = testimonials.map((_, i) => `
        <div class="dot ${i === 0 ? 'active' : ''}" onclick="goToTestimonial(${i})"></div>
    `).join('');
}

// Testimonial Navigation
function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonialSlider();
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    updateTestimonialSlider();
}

function goToTestimonial(index) {
    currentTestimonial = index;
    updateTestimonialSlider();
}

function updateTestimonialSlider() {
    const track = document.getElementById('testimonialTrack');
    track.style.transform = `translateX(-${currentTestimonial * 100}%)`;

    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentTestimonial);
    });
}

// Auto-rotate testimonials
setInterval(nextTestimonial, 5000);

// Animate Stats
function animateStats() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseFloat(stat.dataset.target);
                    animateValue(stat, 0, target, 2000);
                });
                observer.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    const isDecimal = end % 1 !== 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString();
    }, 16);
}

// Video Modal
function playVideo() {
    document.getElementById('videoModal').classList.add('active');
}

function closeVideo() {
    document.getElementById('videoModal').classList.remove('active');
}

// Setup Event Listeners
function setupEventListeners() {
    // Contact Form
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show success message
        alert('¡Gracias por tu mensaje! Te contactaremos pronto.\n\nDemo: En producción, aquí se enviaría el formulario a un servidor.');
        
        // Reset form
        form.reset();
    });

    // Smooth scroll
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

    // Close modal on outside click
    document.getElementById('videoModal').addEventListener('click', (e) => {
        if (e.target.id === 'videoModal') {
            closeVideo();
        }
    });

    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-content');
        parallaxElements.forEach(el => {
            el.style.transform = `translateY(${scrolled * 0.3}px)`;
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .portfolio-item, .pricing-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Add floating animation to hero stats
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .hero-stats .stat {
        animation: float 3s ease-in-out infinite;
    }
    
    .hero-stats .stat:nth-child(2) {
        animation-delay: 0.5s;
    }
    
    .hero-stats .stat:nth-child(3) {
        animation-delay: 1s;
    }
    
    .hero-stats .stat:nth-child(4) {
        animation-delay: 1.5s;
    }
`;
document.head.appendChild(style);
