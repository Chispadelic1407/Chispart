// Proyectos completos de Sebastian Vernis desde GitHub
// Actualizado: 17 de Diciembre, 2025

export const sebastianProjects = [
  {
    id: 201,
    title: "SAAS-DND - Editor Visual Drag & Drop",
    description: "Sistema SaaS comercial completo con editor HTML visual drag-and-drop. Incluye 25 templates profesionales, 34 componentes arrastrables, autenticación JWT, gestión de equipos con roles, procesamiento de pagos y colaboración en tiempo real.",
    category: "SaaS/Plataformas",
    complexity: "Alta",
    status: "100% Completo",
    features: [
      "Editor Visual Drag & Drop",
      "25 Templates Profesionales",
      "34 Componentes Arrastrables",
      "Panel de Propiedades Funcional",
      "Tema Oscuro con Canvas Fullscreen",
      "Atajos de Teclado (Ctrl+P, Ctrl+B, F11)",
      "Exportación Completa (HTML/CSS/JS)",
      "Verificación OTP por Email",
      "Autenticación JWT",
      "Onboarding de 4 Pasos",
      "Dashboard en Tiempo Real",
      "Gestión de Equipos (Admin, Editor, Viewer)",
      "Trial Gratuito de 5 Minutos"
    ],
    technologies: ["React 19", "TypeScript", "Vite", "TailwindCSS", "Node.js", "Express", "PostgreSQL", "Drizzle ORM", "Turborepo", "pnpm", "Docker", "Nginx", "GitHub Actions"],
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/sebastianvernis/SAAS-DND",
    liveUrl: "http://18.223.32.141",
    metrics: {
      commits: 85,
      tests: 100,
      pages: 11,
      docs: 18,
      contributors: 2
    },
    highlights: [
      "Proyecto Flagship - Sistema SaaS Completo",
      "Editor Visual Profesional",
      "Arquitectura Escalable con Turborepo",
      "100 Tests Automatizados",
      "Deploy en AWS con CI/CD"
    ]
  },
  {
    id: 202,
    title: "CHISPART-APP - Plataforma Multi-Agente IA",
    description: "Plataforma de IA multiagente para creación de contenido potenciada por Blackbox AI. Interfaz glassmorphism moderna con flujos de trabajo colaborativos, REST API con FastAPI, CLI interactivo y Web Playground.",
    category: "IA/Chatbots",
    complexity: "Alta",
    status: "Completo",
    features: [
      "FastAPI REST API",
      "Integración Blackbox AI",
      "Selección Dinámica de Modelos",
      "Containerización Docker",
      "Configuración JSON Flexible",
      "Importación CSV de Modelos",
      "Logging & Health Checks",
      "CORS Habilitado",
      "Auto-documentación (Swagger UI, ReDoc)",
      "CLI Tool con REPL Interactivo",
      "Web Playground en /playground",
      "Operaciones de Archivos",
      "Aplicación de Patches",
      "Auto-análisis y Evolución",
      "Desarrollo Asistido por IA",
      "Integración Web Search (SerpAPI/Tavily)",
      "Integración GitHub (Gists, API)",
      "Utilidades de Deploy SSH"
    ],
    technologies: ["Python 3.9+", "FastAPI", "Uvicorn", "Pydantic", "Blackbox AI", "OpenAI", "Claude", "Docker", "Docker Compose", "Vercel", "Render", "pytest", "mypy", "pre-commit", "ruff", "HTML/CSS/JavaScript"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/sebastianvernis/CHISPART-APP",
    liveUrl: "https://chispart-app.vercel.app",
    license: "MIT",
    highlights: [
      "Plataforma Multi-Agente Innovadora",
      "Interfaz Glassmorphism Moderna",
      "Integración Múltiples Modelos IA",
      "CLI y Web Interface",
      "Documentación Auto-generada"
    ]
  },
  {
    id: 203,
    title: "EDIFNUEV - Sistema de Gestión de Edificios",
    description: "Sistema web completo de gestión para edificio de 20 apartamentos (Edificio 205). Administración comprehensiva de presupuestos, cuotas, gastos y gestión de usuarios con roles diferenciados.",
    category: "Sistemas de Gestión",
    complexity: "Alta",
    status: "Operacional",
    features: [
      "Autenticación & Autorización (JWT + bcrypt)",
      "Gestión de Presupuesto Anual",
      "Control de Gastos Mensuales",
      "Cálculo Automático de Cuotas",
      "Sistema de Cierre Anual",
      "Dashboards por Rol (ADMIN, COMITE, INQUILINO)",
      "Sistema de Carga de Recibos",
      "Reportes & Analíticas"
    ],
    technologies: ["Node.js", "Express.js", "JSON Storage", "JWT", "bcryptjs", "express-validator", "PM2", "HTML5", "Vanilla JavaScript", "Nginx", "AWS EC2", "GitHub Actions"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/sebastianvernis/EDIFNUEV",
    liveUrl: "http://ec2-18-223-32-141.us-east-2.compute.amazonaws.com",
    version: "2.0",
    metrics: {
      files: "80+",
      controllers: 12,
      models: 9,
      routes: 13,
      frontendModules: 33,
      testSuites: 11,
      linesOfCode: "~15,000",
      codeDuplication: "0%"
    },
    highlights: [
      "Sistema de Gestión Completo",
      "20 Usuarios Activos",
      "Arquitectura Modular",
      "Deploy en AWS EC2",
      "Testing Comprehensivo"
    ]
  },
  {
    id: 204,
    title: "DEFIENDETEMX - Protección Legal PWA",
    description: "Progressive Web Application que proporciona información legal inmediata para detenciones policiales, abuso policial y situaciones de emergencia en México. Herramienta de protección ciudadana con guía legal verificada.",
    category: "Legal/Cívico",
    complexity: "Media",
    status: "Completo",
    features: [
      "3 Escenarios Legales Verificados",
      "Botón SOS 911 (acceso rápido emergencia)",
      "Recursos Descargables (guías legales)",
      "PWA Offline (funciona sin internet)",
      "Información Verificada (revisada por expertos legales)",
      "Modelo de Datos de Issues (50+ campos)",
      "Servicio CRUD (9 endpoints RESTful)",
      "Autenticación Segura (JWT, sesiones)",
      "Grabadora de Voz con IA (transcripción, análisis emocional)",
      "Sistema de Notificaciones SMS (Twilio)",
      "Gradientes Animados & Glassmorphism",
      "Iconografía Moderna"
    ],
    technologies: ["Next.js 14", "App Router", "Tailwind CSS", "next-pwa", "JWT", "Twilio SMS", "IA Transcripción", "Cloudflare Pages"],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/sebastianvernis/DEFIENDETEMX",
    liveUrl: "https://defiendete-mx.pages.dev",
    version: "2.0",
    metrics: {
      files: "50+",
      linesOfCode: "15,000+",
      tests: "200+",
      docs: "15+",
      apiEndpoints: "25+",
      documentation: "31+"
    },
    highlights: [
      "Impacto Social - Protección Ciudadana",
      "PWA Offline First",
      "Información Legal Verificada",
      "IA para Análisis de Voz",
      "Deploy en Cloudflare Pages"
    ]
  },
  {
    id: 205,
    title: "NOVA-LEGIS-AI - Asistente Legal Inteligente",
    description: "Sistema comprehensivo de asistencia inteligente para Nova Legis Solutions (empresa de servicios legales). Proporciona soporte al cliente 24/7 mediante interfaz de chatbot con calificación de leads, gestión de conversaciones e integración multicanal.",
    category: "IA/Chatbots",
    complexity: "Media",
    status: "Completo",
    features: [
      "Chatbot Inteligente 24/7 (widget flotante personalizable)",
      "Conversaciones Contextuales con Memoria",
      "Análisis Automático de Intención",
      "Lead Scoring en Tiempo Real (0-100)",
      "Integración Blackbox AI (GPT-4, Claude, Gemini)",
      "Sistema de Fallback Automático entre Modelos",
      "Base de Datos (Supabase/PostgreSQL)",
      "Almacenamiento de Conversaciones",
      "Gestión de Leads y Documentos",
      "Base de Conocimiento",
      "Sistema de Citas",
      "WhatsApp Business API (Twilio)",
      "Email (SendGrid)",
      "Integración Calendly (planeada)"
    ],
    technologies: ["Next.js 14", "TypeScript", "React", "Blackbox AI", "Node.js", "Supabase", "PostgreSQL", "Twilio", "SendGrid", "Calendly", "ESLint", "PostCSS"],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/sebastianvernis/NOVA-LEGIS-AI",
    highlights: [
      "Asistente Legal 24/7",
      "Multi-Model AI Routing",
      "Lead Scoring Automático",
      "Integración WhatsApp Business",
      "Base de Conocimiento Legal"
    ]
  },
  {
    id: 206,
    title: "CELULA-CHATBOT-IA - Web Banda Musical",
    description: "Sitio web oficial para Grupo Musical Versátil La Célula, banda musical profesional en México. Incluye información de la banda, chatbot con IA, sistema de cotización integrado, blog y funcionalidad de reservaciones.",
    category: "Web Corporativa",
    complexity: "Media",
    status: "Completo",
    features: [
      "Optimización de Sitio Estático (HTML, CSS, JavaScript)",
      "Sistema de Blog con Paginación",
      "Chatbot con IA (Google Gemini API)",
      "Sistema de Cotización (calculadora de precios integrada)",
      "Galería Multimedia (fotos y videos)",
      "Formularios de Contacto (integración Resend API)",
      "Soporte PWA",
      "Optimización de Performance (Core Web Vitals)",
      "Imágenes WebP con Lazy Loading",
      "CSS/JS Minificado",
      "Fuentes Auto-hospedadas",
      "Critical CSS Inline",
      "JavaScript Diferido"
    ],
    technologies: ["HTML5", "JavaScript", "CSS3", "Node.js 18+", "Express.js", "Serverless Functions", "Google Gemini API", "Resend API", "AWS Amplify", "Cloudflare Pages", "Vercel"],
    image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/sebastianvernis/CELULA-CHATBOT-IA",
    liveUrl: "https://celula-chatbot-ia.vercel.app",
    license: "© 2024 Grupo Musical Versátil La Célula",
    highlights: [
      "Sitio Web Profesional para Banda",
      "Chatbot con Google Gemini",
      "Sistema de Cotización Integrado",
      "PWA Optimizado",
      "Core Web Vitals Compliant"
    ]
  },
  {
    id: 207,
    title: "DRAGNDROP - Sistema Full-Stack Multi-Versión",
    description: "Aplicación web full-stack con funcionalidad drag-and-drop, infraestructura de deployment comprehensiva, capacidad de deployment multi-versión y características de catálogo/demo.",
    category: "Full-Stack",
    complexity: "Alta",
    status: "Completo",
    features: [
      "Sistema de Deployment Multi-Versión",
      "Scripts de Organización de Versiones",
      "Tracking de Múltiples Versiones de Deployment",
      "Sistema de Catálogo/Demo (múltiples demos HTML)",
      "Integración de Sistema Comercial",
      "Testing Comprehensivo (componentes, carga, suite completa)",
      "Infraestructura de Deployment (Nginx, túneles SSH, multi-servidor)",
      "Sistema de Documentación (múltiples formatos MD)"
    ],
    technologies: ["JavaScript", "HTML", "CSS", "Shell", "HCL/Terraform", "Python", "TypeScript", "Node.js", "Nginx", "Vercel", "Jest", "GitHub Actions", "PWA"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/sebastianvernis/DRAGNDROP",
    metrics: {
      contributors: 5,
      commits: 91
    },
    highlights: [
      "Arquitectura Multi-Versión",
      "Infraestructura Compleja",
      "Testing Comprehensivo",
      "CI/CD con GitHub Actions",
      "PWA Capabilities"
    ]
  },
  {
    id: 208,
    title: "TAROT-APP - Lecturas de Tarot con IA",
    description: "Plataforma profesional de lecturas de tarot potenciada por IA que combina tarot tradicional con IA moderna (Google Gemini) para insights místicos personalizados y cálculos astrológicos. Construida como servicio freemium con autenticación JWT.",
    category: "Entretenimiento",
    complexity: "Media",
    status: "Completo",
    features: [
      "Múltiples Tipos de Tiradas (carta única, 3 cartas, Cruz Celta)",
      "Interpretaciones Potenciadas por IA (Google Gemini)",
      "Historial de Lecturas (guardar y revisar)",
      "UI Moderna (responsiva, tema oscuro/claro)",
      "Módulo de Astrología (cálculos de carta natal, sistemas de casas, aspectos)",
      "Análisis de Carta con IA",
      "Autenticación JWT",
      "Modelo de Negocio Freemium",
      "Gestión de Suscripciones",
      "Persistencia de Tema"
    ],
    technologies: ["Python 3.11", "Flask", "Google Gemini API", "JWT", "Bcrypt", "SQLAlchemy", "SQLite", "PostgreSQL", "HTML/CSS/JavaScript", "Vercel"],
    image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/sebastianvernis/TAROT-APP",
    license: "MIT",
    metrics: {
      contributors: 3,
      commits: 35
    },
    apiEndpoints: [
      "/api/health",
      "/api/auth/register",
      "/api/auth/login",
      "/api/readings/draw",
      "/api/readings/history",
      "/api/user/profile",
      "/api/subscription/status",
      "/api/astrology/birth-chart"
    ],
    highlights: [
      "Tarot + IA Innovador",
      "Módulo de Astrología Completo",
      "Modelo Freemium",
      "Tema Oscuro/Claro",
      "Deploy Serverless en Vercel"
    ]
  },
  {
    id: 209,
    title: "FACTURACION-TEMPLATE - Sistema de Facturación Automotriz",
    description: "AutoFacturas - Aplicación web para concesionarios automotrices para generar facturas con códigos QR integrados que enlazan a datos de REPUVE (Registro Público Vehicular - Registro Público de Vehículos de México).",
    category: "Facturación",
    complexity: "Media",
    status: "Completo",
    features: [
      "Generación de Facturas PDF (facturas profesionales automatizadas)",
      "Integración de Código QR (enlaza a datos REPUVE locales)",
      "Gestión de Clientes (base de datos comprehensiva de clientes)",
      "Gestión de Vehículos (tracking de inventario)",
      "Base de Datos REPUVE Local (mantiene copia local)",
      "Interfaz Web Responsiva (mobile-friendly)"
    ],
    technologies: ["React.js", "Tailwind CSS", "qrcode.js", "jsPDF", "Node.js", "Express.js", "SQLite", "Docker", "Nginx", "PM2", "Vercel"],
    image: "https://images.unsplash.com/photo-1554224311-beee2f770c4f?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/sebastianvernis/FACTURACION-TEMPLATE",
    liveUrl: "https://facturacion-template.vercel.app",
    metrics: {
      contributors: 3,
      commits: 5
    },
    highlights: [
      "Específico para México (REPUVE)",
      "Generación Automática de PDF",
      "Integración QR Code",
      "Gestión Completa de Clientes/Vehículos",
      "Deploy en Vercel"
    ]
  },
  {
    id: 210,
    title: "MANDA2 - Plataforma de Delivery Full-Stack",
    description: "Aplicación web full-stack con servicios API backend, UI frontend, integración de base de datos MongoDB, autenticación email/OTP y soporte de deployment multi-plataforma (Railway, AWS EC2, Docker).",
    category: "Full-Stack",
    complexity: "Alta",
    status: "Completo",
    features: [
      "Verificación OTP por Email (contraseña de un solo uso)",
      "Infraestructura de Testing de Email",
      "Setup y Configuración de MongoDB",
      "Inicialización de Base de Datos",
      "Testing de Conexión",
      "Deployment Multi-plataforma (Railway, AWS EC2, Docker, Local)",
      "Infraestructura de Testing Comprehensiva",
      "Documentación Bilingüe (Inglés/Español)"
    ],
    technologies: ["JavaScript", "HTML", "CSS", "Node.js", "Express.js", "MongoDB", "Gradle", "Java/Kotlin", "PM2", "Docker", "Nginx", "Caddy", "Railway", "AWS EC2", "Nixpacks", "Systemd", "Shell Scripts", "Qwen AI"],
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/sebastianvernis/MANDA2",
    metrics: {
      contributors: 5,
      commits: 47
    },
    branch: "sesion4-visual-consistency-clean",
    highlights: [
      "Plataforma de Delivery Completa",
      "OTP Email Verification",
      "Multi-Platform Deployment",
      "Documentación Bilingüe",
      "Testing Comprehensivo"
    ]
  },
  {
    id: 211,
    title: "MASCOTOPIA - E-commerce para Mascotas",
    description: "Tienda online especializada para mascotas que ofrece alimentos y accesorios. Construida con PHP y Vanilla JavaScript, proporciona experiencia de compra completa con catálogo de productos, carrito y checkout.",
    category: "E-commerce",
    complexity: "Baja",
    status: "Completo",
    features: [
      "Catálogo de Productos (filtros por categoría)",
      "Carrito de Compras (agregar, modificar, eliminar productos)",
      "Carrito Persistente (LocalStorage)",
      "Ajuste de Cantidad (botones +/-)",
      "Sistema de Checkout (proceso de compra simulado)",
      "Generación de Órdenes",
      "Diseño Responsivo (móvil y desktop)",
      "REST API (backend PHP)"
    ],
    technologies: ["HTML5", "CSS3", "Vanilla JavaScript", "Fetch API", "LocalStorage", "PHP 8.1+", "Apache/Nginx"],
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/sebastianvernis/MASCOTOPIA",
    license: "© 2025 Mascotopia",
    metrics: {
      commits: 2
    },
    apiEndpoints: [
      "GET /api.php/products",
      "GET /api.php/products?category=alimento",
      "GET /api.php/products/1",
      "GET /api.php/categories",
      "POST /api.php/orders"
    ],
    colorPalette: {
      primary: "#FF6B35",
      secondary: "#4A90E2",
      accent: "#FFD700",
      background: "#F0F2F5"
    },
    highlights: [
      "E-commerce Completo en PHP Puro",
      "Carrito Persistente con LocalStorage",
      "REST API Nativa",
      "Diseño Responsivo",
      "Sin Frameworks"
    ]
  },
  {
    id: 212,
    title: "ESCUELA-IDIOMAS - Plataforma Educativa de Idiomas",
    description: "Plataforma digital comprehensiva de escuela de idiomas especializada en educación de Inglés, Francés y Portugués con cursos multi-nivel (A1-C2 CEFR), preparación de certificaciones internacionales, biblioteca digital (1000+ libros), grupos de práctica conversacional y procesamiento de pagos integrado.",
    category: "Educación",
    complexity: "Alta",
    status: "Production Ready",
    features: [
      "3 Idiomas (Inglés, Francés, Portugués)",
      "6 Niveles de Competencia (A1-C2 marco CEFR)",
      "Certificaciones (preparación TOEFL, CAPLE, DAFL)",
      "Modos de Aprendizaje (grupos guiados, práctica libre, clases individuales)",
      "Biblioteca Digital (1000+ libros en PDF, EPUB, Audio)",
      "12 Categorías (Gramática, Vocabulario, Conversación, Lectura, etc.)",
      "Capacidades de Streaming y Descarga",
      "Auto-asignación Basada en Paquete",
      "Sistema de Pagos (Stripe internacional, Clip mercado mexicano)",
      "Soporte de Webhook (confirmación automática)",
      "Paquetes (Básico $1,200 MXN, Premium $2,500 MXN, Certificación $3,000 MXN)",
      "Gestión de Usuarios (roles Estudiante, Profesor, Administrador)",
      "Portales Personalizados (dashboards personalizados)",
      "Métricas de Progreso (tracking automatizado)",
      "Sistema de Asistencia"
    ],
    technologies: ["Vanilla JavaScript", "HTML5", "CSS3", "Chart.js", "Font Awesome", "Inter font", "PHP 7.4+", "MySQL 8.0+", "MVC", "RESTful APIs", "JWT", "Composer", "Prisma ORM", "Prisma Studio", "Migrations", "Apache 2.4+/Nginx 1.18+", "SSL", "Let's Encrypt", "Certbot", "Node.js 18+"],
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/sebastianvernis/ESCUELA-IDIOMAS",
    license: "© 2025 Idiomas Avanza",
    version: "1.0.0",
    metrics: {
      commits: 15
    },
    databaseSchema: [
      "usuarios", "libros", "cursos", "clases", "pagos", "asistencias",
      "conversacion_salas", "usuario_libros", "inscripciones", "profesores",
      "horarios", "certificaciones"
    ],
    highlights: [
      "Plataforma Educativa Completa",
      "3 Idiomas, 6 Niveles CEFR",
      "Biblioteca Digital 1000+ Libros",
      "Sistema de Pagos Dual (Stripe + Clip)",
      "Production Ready v1.0.0"
    ]
  },
  {
    id: 213,
    title: "PLANTILLA-ESHOP - Template E-commerce de Ropa",
    description: "RopaShop - Template de tienda online de ropa moderno, atractivo y fácil de usar. Template e-commerce listo para usar con interfaz limpia y profesional para venta de artículos de ropa.",
    category: "E-commerce",
    complexity: "Baja",
    status: "Completo",
    features: [
      "Diseño Moderno & Atractivo (UI/UX contemporáneo)",
      "Catálogo de Productos con Filtros",
      "Carrito de Compras Funcional (gestión completa)",
      "Páginas de Detalle de Producto",
      "Pasarela de Pago Lista (pre-estructurada)",
      "Generación de Imágenes con IA (Blackbox AI para imágenes de productos)"
    ],
    technologies: ["React.js", "React Router", "Bootstrap", "React-Bootstrap", "FontAwesome Icons", "Context API", "Vite", "ESLint"],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/sebastianvernis/PLANTILLA-ESHOP",
    metrics: {
      commits: 1
    },
    paymentGateways: ["Stripe", "PayPal", "MercadoPago"],
    customScripts: [
      "generate_images.js - Generación de imágenes de productos con IA",
      "generate_articles.js - Utilidad de generación de artículos/contenido"
    ],
    highlights: [
      "Template E-commerce Listo para Usar",
      "Generación de Imágenes con IA",
      "Múltiples Pasarelas de Pago",
      "Context API para Estado",
      "Bootstrap Responsivo"
    ]
  }
];

export const projectCategories = [
  "Todos",
  "SaaS/Plataformas",
  "IA/Chatbots",
  "Sistemas de Gestión",
  "Legal/Cívico",
  "Web Corporativa",
  "Full-Stack",
  "Entretenimiento",
  "Facturación",
  "E-commerce",
  "Educación"
];

export const complexityLevels = [
  "Todos",
  "Alta",
  "Media",
  "Baja"
];

export const technologies = [
  "Todos",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "PHP",
  "PostgreSQL",
  "MongoDB",
  "MySQL",
  "Blackbox AI",
  "Google Gemini",
  "Docker",
  "AWS",
  "Vercel"
];

// Estadísticas del portfolio
export const portfolioStats = {
  totalProjects: 13,
  liveDemos: 8,
  totalCommits: "300+",
  contributors: "30+",
  linesOfCode: "100,000+",
  automatedTests: "200+",
  documentation: "50+ archivos MD"
};
