// Gallery data for lightbox
const galleryData = [
    {
        icon: '🖱️',
        title: 'Editor Drag & Drop',
        desc: 'Interfaz intuitiva con sistema de arrastrar y soltar. Los usuarios pueden crear páginas web completas sin escribir código, simplemente arrastrando componentes desde la biblioteca al canvas. Incluye preview en tiempo real, deshacer/rehacer, y guardado automático.'
    },
    {
        icon: '⚙️',
        title: 'Panel de Propiedades',
        desc: 'Editor visual de propiedades con controles para estilos CSS, contenido, y configuración de componentes. Permite ajustar colores, tipografía, espaciado, bordes, sombras y más. Los cambios se reflejan instantáneamente en el canvas.'
    },
    {
        icon: '📐',
        title: '25 Templates Profesionales',
        desc: 'Biblioteca completa de templates diseñados profesionalmente para diferentes industrias: landing pages, portfolios, e-commerce, blogs, corporativos, y más. Cada template es completamente personalizable y responsive.'
    },
    {
        icon: '📊',
        title: 'Dashboard de Proyectos',
        desc: 'Panel de control completo para gestionar todos tus proyectos. Visualiza estadísticas, historial de cambios, versiones publicadas, y analíticas de uso. Incluye búsqueda, filtros, y organización por carpetas.'
    },
    {
        icon: '👥',
        title: 'Gestión de Equipos',
        desc: 'Sistema completo de colaboración en equipo. Invita miembros, asigna roles y permisos, comparte proyectos, y trabaja en tiempo real. Incluye sistema de comentarios y notificaciones.'
    },
    {
        icon: '🧩',
        title: '34 Componentes Modulares',
        desc: 'Biblioteca extensa de componentes reutilizables: headers, footers, heroes, CTAs, formularios, galerías, testimonios, pricing tables, y más. Cada componente es personalizable y optimizado para performance.'
    }
];

let currentLightboxIndex = 0;

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

// Observe all feature cards, tech categories, and component categories
document.querySelectorAll('.feature-card, .tech-category, .component-category, .gallery-item, .snippet-card').forEach(el => {
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

// Animate stats on scroll with counter animation
const animateCounter = (element, target) => {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 100 ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target === 100 ? '%' : '+');
        }
    }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target.querySelector('.stat-value');
            if (statValue && !statValue.classList.contains('animated')) {
                statValue.classList.add('animated');
                const target = parseInt(statValue.getAttribute('data-target'));
                animateCounter(statValue, target);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Add hover effect to component categories
document.querySelectorAll('.component-category li').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.paddingLeft = '1rem';
        this.style.transition = 'padding-left 0.3s ease';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.paddingLeft = '0';
    });
});

// Fullscreen functionality for iframe
function toggleFullscreen() {
    const wrapper = document.getElementById('iframeWrapper');
    wrapper.classList.toggle('fullscreen');
    
    const btn = document.querySelector('.btn-fullscreen span');
    if (wrapper.classList.contains('fullscreen')) {
        btn.textContent = '✕ Cerrar Fullscreen';
    } else {
        btn.textContent = '⛶ Fullscreen';
    }
}

// Lightbox functionality
function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightboxContent();
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function navigateLightbox(direction) {
    currentLightboxIndex += direction;
    if (currentLightboxIndex < 0) {
        currentLightboxIndex = galleryData.length - 1;
    } else if (currentLightboxIndex >= galleryData.length) {
        currentLightboxIndex = 0;
    }
    updateLightboxContent();
}

function updateLightboxContent() {
    const data = galleryData[currentLightboxIndex];
    document.getElementById('lightboxIcon').textContent = data.icon;
    document.getElementById('lightboxTitle').textContent = data.title;
    document.getElementById('lightboxDesc').textContent = data.desc;
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox(-1);
        } else if (e.key === 'ArrowRight') {
            navigateLightbox(1);
        }
    }
    
    // ESC to exit fullscreen
    if (e.key === 'Escape') {
        const wrapper = document.getElementById('iframeWrapper');
        if (wrapper && wrapper.classList.contains('fullscreen')) {
            toggleFullscreen();
        }
    }
});

// Add animation to architecture boxes
const archObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.arch-box').forEach(box => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(20px)';
    box.style.transition = 'all 0.5s ease';
    archObserver.observe(box);
});
