const fs = require('fs');
const path = require('path');

// Definición de todos los demos a crear
const demosToCreate = [
  {
    folder: 'e-commerce-completo',
    title: 'E-commerce Completo',
    description: 'Tienda online con carrito de compras, pasarela de pagos y gestión de inventario completa',
    icon: '🛒',
    color: '#667eea',
    colorSecondary: '#764ba2',
    features: ['Carrito de compras', 'Pasarela de pagos', 'Gestión de inventario', 'Panel administrativo'],
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe']
  },
  {
    folder: 'landing-corporativa',
    title: 'Landing Page Corporativa',
    description: 'Página de aterrizaje profesional con diseño moderno y optimizada para conversión',
    icon: '🚀',
    color: '#3b82f6',
    colorSecondary: '#1d4ed8',
    features: ['Diseño responsivo', 'Formulario de contacto', 'SEO optimizado', 'Animaciones'],
    technologies: ['React', 'CSS3', 'EmailJS']
  },
  {
    folder: 'portal-reservaciones',
    title: 'Portal de Reservaciones',
    description: 'Sistema de reservas en línea para hoteles, restaurantes o servicios',
    icon: '📅',
    color: '#10b981',
    colorSecondary: '#059669',
    features: ['Calendario interactivo', 'Pagos en línea', 'Notificaciones por email', 'Dashboard'],
    technologies: ['React', 'Firebase', 'Calendar API', 'PayPal']
  },
  {
    folder: 'blog-corporativo',
    title: 'Blog Corporativo',
    description: 'Blog profesional con CMS integrado para gestión de contenidos',
    icon: '📝',
    color: '#f59e0b',
    colorSecondary: '#d97706',
    features: ['CMS personalizado', 'Categorías y tags', 'Comentarios', 'SEO avanzado'],
    technologies: ['React', 'Headless CMS', 'Markdown']
  },
  {
    folder: 'portafolio-creativo',
    title: 'Portafolio Creativo',
    description: 'Sitio web de portafolio con galería interactiva y animaciones premium',
    icon: '🎨',
    color: '#ec4899',
    colorSecondary: '#be185d',
    features: ['Galería interactiva', 'Filtros por categoría', 'Lightbox', 'Formulario contacto'],
    technologies: ['React', 'Framer Motion', 'CSS Grid']
  },
  {
    folder: 'dashboard-analitico',
    title: 'Dashboard Analítico',
    description: 'Panel de control con gráficos en tiempo real y métricas empresariales',
    icon: '📊',
    color: '#8b5cf6',
    colorSecondary: '#6d28d9',
    features: ['Gráficos interactivos', 'Datos en tiempo real', 'Exportar reportes', 'Multi-usuario'],
    technologies: ['React', 'D3.js', 'WebSocket', 'Chart.js']
  },
  {
    folder: 'restaurante',
    title: 'Sitio Web Restaurante',
    description: 'Web completa para restaurante con menú digital y reservaciones online',
    icon: '🍽️',
    color: '#ef4444',
    colorSecondary: '#dc2626',
    features: ['Menú interactivo', 'Reservaciones', 'Galería de fotos', 'Integración redes sociales'],
    technologies: ['React', 'Google Maps API', 'WhatsApp API']
  },
  {
    folder: 'marketplace-local',
    title: 'Marketplace Local',
    description: 'Plataforma de compra-venta entre usuarios con sistema de mensajería',
    icon: '🏪',
    color: '#f97316',
    colorSecondary: '#ea580c',
    features: ['Perfiles de usuario', 'Chat en tiempo real', 'Sistema de pagos', 'Calificaciones'],
    technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL']
  },
  {
    folder: 'portal-inmobiliario',
    title: 'Portal Inmobiliario',
    description: 'Sitio web para bienes raíces con búsqueda avanzada y tours virtuales',
    icon: '🏠',
    color: '#06b6d4',
    colorSecondary: '#0891b2',
    features: ['Búsqueda avanzada', 'Mapas interactivos', 'Galería 360°', 'Calculadora hipoteca'],
    technologies: ['React', 'Google Maps', 'Three.js']
  },
  {
    folder: 'app-gimnasio',
    title: 'App Web Gimnasio',
    description: 'Plataforma para gimnasios con reserva de clases y planes de entrenamiento',
    icon: '💪',
    color: '#14b8a6',
    colorSecondary: '#0d9488',
    features: ['Reserva de clases', 'Planes personalizados', 'Tracking de progreso', 'Pagos mensuales'],
    technologies: ['React', 'Firebase', 'Calendar API']
  },
  {
    folder: 'sistema-tickets',
    title: 'Sistema de Tickets',
    description: 'Plataforma de soporte técnico con sistema de tickets y chat en vivo',
    icon: '🎫',
    color: '#6366f1',
    colorSecondary: '#4f46e5',
    features: ['Gestión de tickets', 'Chat en vivo', 'Base de conocimiento', 'Reportes'],
    technologies: ['React', 'Socket.io', 'Node.js', 'MySQL']
  },
  {
    folder: 'portal-eventos',
    title: 'Portal de Eventos',
    description: 'Sitio web para venta de boletos y gestión de eventos en línea',
    icon: '🎉',
    color: '#a855f7',
    colorSecondary: '#9333ea',
    features: ['Venta de boletos', 'Códigos QR', 'Asientos numerados', 'Reportes de ventas'],
    technologies: ['React', 'Stripe', 'QR Code API', 'PDF.js']
  },
  {
    folder: 'clinica-medica',
    title: 'Web Clínica Médica',
    description: 'Portal médico con citas online, expedientes digitales y telemedicina',
    icon: '⚕️',
    color: '#0ea5e9',
    colorSecondary: '#0284c7',
    features: ['Agenda médica', 'Expedientes digitales', 'Videollamadas', 'Recetas electrónicas'],
    technologies: ['React', 'WebRTC', 'Node.js', 'Encrypted DB']
  },
  {
    folder: 'catalogo-digital',
    title: 'Catálogo Digital Interactivo',
    description: 'Catálogo de productos con realidad aumentada y configurador 3D',
    icon: '📱',
    color: '#84cc16',
    colorSecondary: '#65a30d',
    features: ['Visualización 3D', 'Realidad aumentada', 'Filtros avanzados', 'Compartir productos'],
    technologies: ['React', 'Three.js', 'AR.js', 'WebGL']
  },
  {
    folder: 'portal-noticias',
    title: 'Portal de Noticias',
    description: 'Sitio de noticias con sistema CMS, categorías y comentarios en tiempo real',
    icon: '📰',
    color: '#f43f5e',
    colorSecondary: '#e11d48',
    features: ['CMS completo', 'Comentarios en vivo', 'Newsletter', 'Publicidad programática'],
    technologies: ['React', 'Strapi', 'Socket.io', 'Mailchimp']
  },
  {
    folder: 'despacho-legal',
    title: 'Web Despacho Legal',
    description: 'Sitio profesional para bufete de abogados con blog y formularios seguros',
    icon: '⚖️',
    color: '#1e40af',
    colorSecondary: '#1e3a8a',
    features: ['Blog legal', 'Formularios seguros', 'Calendario de citas', 'Área de clientes'],
    technologies: ['React', 'Encryption', 'Calendar API', 'PDF.js']
  },
  {
    folder: 'portal-gubernamental',
    title: 'Portal Gubernamental',
    description: 'Sitio web gubernamental con trámites en línea y sistema de consultas',
    icon: '🏛️',
    color: '#475569',
    colorSecondary: '#334155',
    features: ['Trámites digitales', 'Consultas públicas', 'Transparencia', 'Accesibilidad WCAG'],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'OAuth']
  },
  {
    folder: 'generador-contenido-ia',
    title: 'Generador de Contenido con IA',
    description: 'Sistema automatizado para crear contenido de marketing, blogs y redes sociales',
    icon: '🤖',
    color: '#7c3aed',
    colorSecondary: '#6d28d9',
    features: ['Generación de textos', 'Optimización SEO automática', 'Múltiples idiomas', 'Plantillas personalizables'],
    technologies: ['OpenAI API', 'Claude AI', 'React', 'Python']
  },
  {
    folder: 'analisis-sentimientos',
    title: 'Análisis de Sentimientos en Redes',
    description: 'Plataforma de monitoreo y análisis de opiniones en redes sociales con IA',
    icon: '💬',
    color: '#2563eb',
    colorSecondary: '#1d4ed8',
    features: ['Análisis en tiempo real', 'Detección de emociones', 'Reportes visuales', 'Alertas automáticas'],
    technologies: ['Python', 'TensorFlow', 'NLP', 'React Dashboard']
  },
  {
    folder: 'reconocimiento-imagenes',
    title: 'Reconocimiento de Imágenes IA',
    description: 'Sistema de clasificación y etiquetado automático de imágenes con visión artificial',
    icon: '👁️',
    color: '#059669',
    colorSecondary: '#047857',
    features: ['Detección de objetos', 'Reconocimiento facial', 'Clasificación automática', 'API REST'],
    technologies: ['TensorFlow', 'OpenCV', 'Python', 'Google Vision AI']
  },
  {
    folder: 'asistente-virtual',
    title: 'Asistente Virtual Personalizado',
    description: 'Asistente de voz inteligente para automatización de tareas empresariales',
    icon: '🎙️',
    color: '#dc2626',
    colorSecondary: '#b91c1c',
    features: ['Comandos de voz', 'Integración con sistemas', 'Automatización de procesos', 'Aprendizaje continuo'],
    technologies: ['Gemini AI', 'Speech-to-Text', 'Node.js', 'WebRTC']
  },
  {
    folder: 'traductor-multilingue',
    title: 'Traductor Automático Multilingüe',
    description: 'Sistema de traducción en tiempo real con IA para documentos y conversaciones',
    icon: '🌐',
    color: '#0891b2',
    colorSecondary: '#0e7490',
    features: ['100+ idiomas', 'Traducción contextual', 'Documentos y audio', 'API integrable'],
    technologies: ['Google Translate AI', 'DeepL API', 'React', 'Python']
  },
  {
    folder: 'generador-imagenes-ia',
    title: 'Generador de Imágenes con IA',
    description: 'Plataforma para crear imágenes únicas desde descripciones de texto',
    icon: '🎨',
    color: '#c026d3',
    colorSecondary: '#a21caf',
    features: ['Generación text-to-image', 'Múltiples estilos', 'Alta resolución', 'Edición con IA'],
    technologies: ['DALL-E', 'Stable Diffusion', 'Midjourney API', 'React']
  },
  {
    folder: 'analisis-predictivo',
    title: 'Análisis Predictivo con Machine Learning',
    description: 'Sistema de predicción de tendencias y comportamientos con modelos de ML',
    icon: '📈',
    color: '#ea580c',
    colorSecondary: '#c2410c',
    features: ['Modelos predictivos', 'Análisis de datos históricos', 'Dashboards interactivos', 'Alertas inteligentes'],
    technologies: ['Python', 'Scikit-learn', 'TensorFlow', 'React Dashboard']
  }
];

// Template HTML
const generateHTML = (demo) => `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${demo.title} - Demo</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="gradient-bg"></div>
    
    <header class="glass-header">
        <div class="container">
            <div class="logo">
                <span class="logo-icon">${demo.icon}</span>
                <span class="logo-text">${demo.title}</span>
            </div>
            <nav>
                <a href="#features">Características</a>
                <a href="#tech">Tecnologías</a>
                <a href="/" class="btn-back">← Volver al Catálogo</a>
            </nav>
        </div>
    </header>

    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <div class="badge">Demo Interactivo</div>
                <h1 class="hero-title">
                    ${demo.title.split(' ')[0]}<br/>
                    <span class="gradient-text">${demo.title.split(' ').slice(1).join(' ')}</span>
                </h1>
                <p class="hero-description">
                    ${demo.description}
                </p>
                <div class="hero-buttons">
                    <a href="https://wa.me/5215512345678?text=Hola%2C%20me%20interesa%20el%20proyecto%20${encodeURIComponent(demo.title)}" target="_blank" class="btn-primary">
                        <span>💬 Solicitar Cotización</span>
                    </a>
                    <a href="/" class="btn-secondary">
                        <span>📂 Ver Más Proyectos</span>
                    </a>
                </div>
                <div class="hero-stats">
                    ${demo.features.slice(0, 4).map((feature, i) => `
                    <div class="stat">
                        <div class="stat-icon">${['✓', '✓', '✓', '✓'][i]}</div>
                        <div class="stat-label">${feature}</div>
                    </div>`).join('')}
                </div>
            </div>
        </div>
    </section>

    <section id="features" class="features">
        <div class="container">
            <h2 class="section-title">Características Principales</h2>
            <div class="features-grid">
                ${demo.features.map((feature, i) => `
                <div class="feature-card glass">
                    <div class="feature-icon">${['🚀', '⚡', '🎯', '💡', '🔒', '📊'][i % 6]}</div>
                    <h3>${feature}</h3>
                    <p>Implementación profesional de ${feature.toLowerCase()} con las mejores prácticas del mercado.</p>
                </div>`).join('')}
            </div>
        </div>
    </section>

    <section id="tech" class="tech-stack">
        <div class="container">
            <h2 class="section-title">Tecnologías Utilizadas</h2>
            <div class="tech-grid">
                ${demo.technologies.map(tech => `
                <div class="tech-tag glass">
                    <span>${tech}</span>
                </div>`).join('')}
            </div>
        </div>
    </section>

    <section class="cta">
        <div class="container">
            <div class="cta-content glass">
                <h2>¿Listo para tu proyecto?</h2>
                <p>Solicita una cotización personalizada</p>
                <div class="cta-buttons">
                    <a href="https://wa.me/5215512345678?text=Hola%2C%20me%20interesa%20el%20proyecto%20${encodeURIComponent(demo.title)}" target="_blank" class="btn-primary">
                        <span>💬 Contactar por WhatsApp</span>
                    </a>
                    <a href="/" class="btn-secondary">
                        <span>📂 Ver Catálogo Completo</span>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <p>Demo de proyecto - Catálogo Web México</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`;

// Template CSS
const generateCSS = (demo) => `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary: ${demo.color};
    --secondary: ${demo.colorSecondary};
    --text-light: #ffffff;
    --glass-bg: rgba(255, 255, 255, 0.1);
    --glass-border: rgba(255, 255, 255, 0.2);
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: var(--text-light);
    overflow-x: hidden;
    background: #0f0f23;
}

.gradient-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
    z-index: -1;
}

@keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

.glass {
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.glass-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(15, 15, 35, 0.8);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--glass-border);
    padding: 1rem 0;
}

.glass-header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.5rem;
    font-weight: 700;
}

.logo-icon {
    font-size: 2rem;
}

nav {
    display: flex;
    gap: 2rem;
    align-items: center;
}

nav a {
    color: var(--text-light);
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    padding: 0.5rem 1rem;
    border-radius: 8px;
}

nav a:hover {
    background: var(--glass-bg);
}

.btn-back {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
}

.hero {
    padding: 8rem 0 6rem;
    text-align: center;
}

.hero-content {
    max-width: 900px;
    margin: 0 auto;
}

.badge {
    display: inline-block;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    padding: 0.5rem 1.5rem;
    border-radius: 50px;
    font-size: 0.9rem;
    margin-bottom: 2rem;
}

.hero-title {
    font-size: 4rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1.5rem;
}

.gradient-text {
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: brightness(1.5);
}

.hero-description {
    font-size: 1.25rem;
    line-height: 1.8;
    opacity: 0.9;
    margin-bottom: 3rem;
}

.hero-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 4rem;
}

.btn-primary, .btn-secondary {
    padding: 1rem 2rem;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-block;
}

.btn-primary {
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    color: white;
    border: none;
}

.btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.btn-secondary {
    background: var(--glass-bg);
    color: white;
    border: 1px solid var(--glass-border);
}

.btn-secondary:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-3px);
}

.hero-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-top: 4rem;
}

.stat {
    background: var(--glass-bg);
    padding: 1.5rem;
    border-radius: 16px;
    border: 1px solid var(--glass-border);
}

.stat-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.stat-label {
    font-size: 0.9rem;
    opacity: 0.9;
}

.features {
    padding: 6rem 0;
}

.section-title {
    text-align: center;
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 4rem;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.feature-card {
    padding: 2.5rem;
    transition: all 0.3s ease;
}

.feature-card:hover {
    transform: translateY(-10px);
}

.feature-icon {
    font-size: 3rem;
    margin-bottom: 1.5rem;
}

.feature-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.feature-card p {
    opacity: 0.9;
    line-height: 1.6;
}

.tech-stack {
    padding: 6rem 0;
    background: rgba(0, 0, 0, 0.2);
}

.tech-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    max-width: 800px;
    margin: 0 auto;
}

.tech-tag {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-weight: 600;
}

.cta {
    padding: 6rem 0;
}

.cta-content {
    text-align: center;
    padding: 4rem;
}

.cta-content h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.cta-content p {
    font-size: 1.25rem;
    opacity: 0.9;
    margin-bottom: 2rem;
}

.cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

.footer {
    padding: 3rem 0;
    text-align: center;
    border-top: 1px solid var(--glass-border);
    background: rgba(0, 0, 0, 0.3);
}

.footer p {
    opacity: 0.8;
}

@media (max-width: 768px) {
    .hero-title {
        font-size: 2.5rem;
    }
    
    nav {
        flex-wrap: wrap;
        gap: 1rem;
    }
    
    .hero-buttons, .cta-buttons {
        flex-direction: column;
    }
    
    .hero-stats {
        grid-template-columns: repeat(2, 1fr);
    }
}`;

// Template JS
const generateJS = () => `document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

document.querySelectorAll('.feature-card, .tech-tag').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = \`translateY(\${scrolled * 0.3}px)\`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
});`;

// Crear todos los demos
const demosDir = path.join(__dirname, 'public', 'demos');

demosToCreate.forEach(demo => {
    const demoPath = path.join(demosDir, demo.folder);
    
    // Crear directorio si no existe
    if (!fs.existsSync(demoPath)) {
        fs.mkdirSync(demoPath, { recursive: true });
    }
    
    // Crear archivos
    fs.writeFileSync(path.join(demoPath, 'index.html'), generateHTML(demo));
    fs.writeFileSync(path.join(demoPath, 'style.css'), generateCSS(demo));
    fs.writeFileSync(path.join(demoPath, 'script.js'), generateJS());
    
    console.log(`✅ Demo creado: ${demo.folder}`);
});

console.log(`\n🎉 Se crearon ${demosToCreate.length} demos exitosamente!`);
