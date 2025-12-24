// Projects Data
const projects = [
    {
        id: 1,
        title: "E-commerce Moderno",
        category: "web",
        description: "Tienda online con diseño minimalista y experiencia de usuario optimizada",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=800&fit=crop"
    },
    {
        id: 2,
        title: "Brand Identity - TechStart",
        category: "branding",
        description: "Identidad corporativa completa para startup tecnológica",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop"
    },
    {
        id: 3,
        title: "App Móvil Fitness",
        category: "mobile",
        description: "Aplicación de seguimiento de ejercicios y nutrición",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=900&fit=crop"
    },
    {
        id: 4,
        title: "Dashboard Analytics",
        category: "ui",
        description: "Panel de control con visualización de datos en tiempo real",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
    },
    {
        id: 5,
        title: "Landing Page SaaS",
        category: "web",
        description: "Página de aterrizaje para plataforma de software empresarial",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=700&fit=crop"
    },
    {
        id: 6,
        title: "Logo Design - Café Artesanal",
        category: "branding",
        description: "Diseño de logo y papelería para cafetería boutique",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=600&fit=crop"
    },
    {
        id: 7,
        title: "App de Delivery",
        category: "mobile",
        description: "Aplicación de entrega a domicilio con tracking en vivo",
        image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600&h=800&fit=crop"
    },
    {
        id: 8,
        title: "Redesign UI - Banking App",
        category: "ui",
        description: "Rediseño de interfaz para aplicación bancaria móvil",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=900&fit=crop"
    },
    {
        id: 9,
        title: "Portfolio Personal",
        category: "web",
        description: "Sitio web personal para fotógrafo profesional",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=500&fit=crop"
    },
    {
        id: 10,
        title: "Packaging Design",
        category: "branding",
        description: "Diseño de empaque para línea de productos orgánicos",
        image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=700&fit=crop"
    },
    {
        id: 11,
        title: "Social Media App",
        category: "mobile",
        description: "Red social enfocada en contenido creativo",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=800&fit=crop"
    },
    {
        id: 12,
        title: "CRM Dashboard",
        category: "ui",
        description: "Sistema de gestión de relaciones con clientes",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
    }
];

// Skills Data
const skills = [
    { name: "UI/UX Design", icon: "🎨", percentage: 95 },
    { name: "Web Development", icon: "💻", percentage: 90 },
    { name: "Branding", icon: "✨", percentage: 85 },
    { name: "Mobile Design", icon: "📱", percentage: 88 },
    { name: "Illustration", icon: "🖌️", percentage: 80 },
    { name: "Animation", icon: "🎬", percentage: 75 }
];

// Timeline Data
const timeline = [
    {
        year: "2024",
        title: "Senior Designer - TechCorp",
        description: "Liderando el equipo de diseño en proyectos de alto impacto"
    },
    {
        year: "2022",
        title: "UI/UX Designer - StartupHub",
        description: "Diseño de interfaces para múltiples productos SaaS"
    },
    {
        year: "2020",
        title: "Freelance Designer",
        description: "Trabajando con clientes internacionales en diversos proyectos"
    },
    {
        year: "2018",
        title: "Junior Designer - CreativeStudio",
        description: "Inicio de carrera profesional en agencia de diseño"
    }
];

let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    renderSkills();
    renderTimeline();
    animateSkills();
});

// Render Projects
function renderProjects(filter = 'all') {
    const gallery = document.getElementById('gallery');
    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(p => p.category === filter);

    gallery.innerHTML = filteredProjects.map((project, index) => `
        <div class="project-card" style="animation-delay: ${index * 0.1}s" onclick="openLightbox(${project.id})">
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-info">
                <div class="project-category">${getCategoryName(project.category)}</div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
            </div>
        </div>
    `).join('');
}

function getCategoryName(category) {
    const names = {
        web: 'Web Design',
        branding: 'Branding',
        ui: 'UI/UX',
        mobile: 'Mobile'
    };
    return names[category] || category;
}

// Filter Projects
function filterProjects(category) {
    currentFilter = category;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Render filtered projects
    renderProjects(category);
}

// Render Skills
function renderSkills() {
    const skillsGrid = document.querySelector('.skills-grid');
    skillsGrid.innerHTML = skills.map(skill => `
        <div class="skill-card">
            <div class="skill-icon">${skill.icon}</div>
            <div class="skill-name">${skill.name}</div>
            <div class="skill-bar">
                <div class="skill-progress" data-percentage="${skill.percentage}"></div>
            </div>
            <div class="skill-percentage">${skill.percentage}%</div>
        </div>
    `).join('');
}

// Animate Skills
function animateSkills() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const percentage = bar.dataset.percentage;
                    setTimeout(() => {
                        bar.style.width = percentage + '%';
                    }, 100);
                });
                observer.unobserve(entry.target);
            }
        });
    });

    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// Render Timeline
function renderTimeline() {
    const timelineContainer = document.querySelector('.timeline');
    if (!timelineContainer) return;

    timelineContainer.innerHTML = timeline.map(item => `
        <div class="timeline-item">
            <div class="timeline-content">
                <div class="timeline-year">${item.year}</div>
                <h3 class="timeline-title">${item.title}</h3>
                <p class="timeline-description">${item.description}</p>
            </div>
            <div class="timeline-dot"></div>
        </div>
    `).join('');
}

// Lightbox
function openLightbox(projectId) {
    const project = projects.find(p => p.id === projectId);
    const lightbox = document.getElementById('lightbox');
    
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" onclick="closeLightbox()">&times;</button>
            <img src="${project.image}" alt="${project.title}" class="lightbox-image">
            <div class="lightbox-info">
                <div class="project-category">${getCategoryName(project.category)}</div>
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                <div style="margin-top: 1rem;">
                    <button class="btn-primary" onclick="alert('Demo: Ver proyecto completo')">Ver Proyecto</button>
                    <button class="btn-secondary" onclick="closeLightbox()" style="margin-left: 1rem;">Cerrar</button>
                </div>
            </div>
        </div>
    `;
    
    lightbox.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

// Scroll Functions
function scrollToProjects() {
    document.getElementById('proyectos').scrollIntoView({ behavior: 'smooth' });
}

function showContact() {
    document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
}

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Gracias por tu mensaje! Te contactaré pronto.\n\nDemo: En producción, aquí se enviaría el formulario.');
        contactForm.reset();
    });
}

// Close lightbox on outside click
document.addEventListener('click', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});
