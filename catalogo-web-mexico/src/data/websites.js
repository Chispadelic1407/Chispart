// Importar proyectos de Sebastian Vernis
import { sebastianProjects } from './sebastianProjects.js';

// Proyectos de ejemplo/template
const templateProjects = [
  {
    id: 106,
    title: "Chispart CLI - Terminal AI Tool",
    description: "Herramienta CLI que automatiza tareas mediante lenguaje natural y delega análisis avanzados a IA. Ejecuta scripts, gestiona proyectos y procesa comandos complejos.",
    category: "Mis Proyectos",
    price: "Proyecto Open Source",
    features: ["Natural Language", "Task Automation", "AI Integration", "Script Execution", "Project Management", "Context-Aware"],
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=600&fit=crop",
    technologies: ["Node.js", "JavaScript", "CLI", "AI API", "Commander.js"],
    demoUrl: "/demos/chispart-cli/index.html",
    githubUrl: "https://github.com/SebastianVernis/chispart-cli"
  },
  {
    id: 107,
    title: "Escuela de Idiomas - Language School",
    description: "Plataforma completa para escuela de idiomas con gestión de cursos, horarios, profesores y estudiantes. Sistema de inscripciones y seguimiento de progreso.",
    category: "Mis Proyectos",
    price: "Proyecto Open Source",
    features: ["Gestión de Cursos", "Sistema de Inscripciones", "Tracking de Progreso", "Panel de Profesores", "Calendario de Clases", "Reportes"],
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=600&fit=crop",
    technologies: ["JavaScript", "Node.js", "Express", "MongoDB", "React"],
    demoUrl: "/demos/escuela-idiomas/index.html",
    githubUrl: "https://github.com/SebastianVernis/escuela-idiomas"
  },
  {
    id: 108,
    title: "Sistema de Facturación - Invoice Template",
    description: "Plantilla profesional para sistema de facturación electrónica con generación de PDFs, cálculo automático de impuestos y gestión de clientes.",
    category: "Mis Proyectos",
    price: "Proyecto Open Source",
    features: ["Generación PDF", "Cálculo de Impuestos", "Gestión de Clientes", "Historial de Facturas", "Reportes Fiscales", "Envío por Email"],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop",
    technologies: ["JavaScript", "PDF.js", "HTML5", "CSS3", "LocalStorage"],
    demoUrl: "/demos/facturacion-template/index.html",
    githubUrl: "https://github.com/SebastianVernis/Facturacion-Template"
  },


  {
    id: 111,
    title: "Tarot App - Lectura de Tarot IA",
    description: "Aplicación de lectura de tarot con inteligencia artificial. Genera interpretaciones personalizadas, spreads tradicionales y análisis de cartas.",
    category: "Mis Proyectos",
    price: "Proyecto Open Source",
    features: ["Lectura con IA", "Múltiples Spreads", "Interpretación Personalizada", "Historial de Lecturas", "Galería de Cartas", "Análisis Detallado"],
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=600&fit=crop",
    technologies: ["Python", "Flask", "AI API", "JavaScript", "HTML5"],
    demoUrl: "/demos/tarot-app/index.html",
    githubUrl: "https://github.com/SebastianVernis/tarot-app"
  },
  {
    id: 112,
    title: "Drag & Drop Builder - Visual Editor",
    description: "Constructor visual drag-and-drop para crear páginas web sin código. Incluye componentes pre-diseñados, editor de estilos y exportación de código.",
    category: "Mis Proyectos",
    price: "Proyecto Open Source",
    features: ["Drag & Drop", "Editor Visual", "Componentes Pre-diseñados", "Editor de Estilos", "Exportar Código HTML", "Vista Previa en Tiempo Real"],
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=600&fit=crop",
    technologies: ["JavaScript", "HTML5 DnD API", "CSS3", "Vanilla JS"],
    demoUrl: "/demos/drag-n-drop/index.html",
    githubUrl: "https://github.com/SebastianVernis/DragNDrop"
  },
  {
    id: 113,
    title: "Celula Chatbot IA - AI Chatbot",
    description: "Chatbot inteligente con procesamiento de lenguaje natural, respuestas contextuales y capacidad de aprendizaje. Interfaz web moderna y responsive.",
    category: "Mis Proyectos",
    price: "Proyecto Open Source",
    features: ["NLP Avanzado", "Respuestas Contextuales", "Interfaz Web Moderna", "Historial de Conversación", "Multi-idioma", "API REST"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
    technologies: ["HTML", "JavaScript", "AI API", "CSS3", "WebSocket"],
    demoUrl: "/demos/celula-chatbot-ia/index.html",
    githubUrl: "https://github.com/SebastianVernis/celula-chatbot-ia"
  },

  {
    id: 115,
    title: "CRM Twilio - Customer Management",
    description: "Sistema CRM con integración de Twilio para comunicación SMS y WhatsApp. Gestión de contactos, pipeline de ventas y automatización.",
    category: "Mis Proyectos",
    price: "Proyecto Open Source",
    features: ["Integración Twilio", "SMS Automáticos", "WhatsApp Business", "Gestión de Contactos", "Pipeline de Ventas", "Reportes"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    technologies: ["JavaScript", "Node.js", "Twilio API", "Express", "MongoDB"],
    demoUrl: "/demos/crm-twilio/index.html",
    githubUrl: "https://github.com/SebastianVernis/crm-twilio"
  },
  {
    id: 1,
    title: "E-commerce Completo",
    description: "Tienda online con carrito de compras, pasarela de pagos y gestión de inventario completa",
    category: "E-commerce",
    price: "$25,000 - $50,000 MXN",
    features: ["Carrito de compras", "Pasarela de pagos", "Gestión de inventario", "Panel administrativo"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    demoUrl: "/demos/e-commerce-completo/index.html"
  },
  {
    id: 2,
    title: "Landing Page Corporativa",
    description: "Página de aterrizaje profesional con diseño moderno y optimizada para conversión",
    category: "Landing Page",
    price: "$8,000 - $15,000 MXN",
    features: ["Diseño responsivo", "Formulario de contacto", "SEO optimizado", "Animaciones"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    technologies: ["React", "CSS3", "EmailJS"],
    demoUrl: "/demos/landing-corporativa/index.html"
  },
  {
    id: 3,
    title: "Portal de Reservaciones",
    description: "Sistema de reservas en línea para hoteles, restaurantes o servicios",
    category: "Sistema Web",
    price: "$35,000 - $60,000 MXN",
    features: ["Calendario interactivo", "Pagos en línea", "Notificaciones por email", "Dashboard"],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
    technologies: ["React", "Firebase", "Calendar API", "PayPal"],
    demoUrl: "/demos/portal-reservaciones/index.html"
  },
  {
    id: 4,
    title: "Blog Corporativo",
    description: "Blog profesional con CMS integrado para gestión de contenidos",
    category: "Blog/Contenido",
    price: "$12,000 - $20,000 MXN",
    features: ["CMS personalizado", "Categorías y tags", "Comentarios", "SEO avanzado"],
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop",
    technologies: ["React", "Headless CMS", "Markdown"],
    demoUrl: "/demos/blog-corporativo/index.html"
  },
  {
    id: 5,
    title: "Portafolio Creativo",
    description: "Sitio web de portafolio con galería interactiva y animaciones premium",
    category: "Portafolio",
    price: "$10,000 - $18,000 MXN",
    features: ["Galería interactiva", "Filtros por categoría", "Lightbox", "Formulario contacto"],
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    technologies: ["React", "Framer Motion", "CSS Grid"],
    demoUrl: "/demos/portafolio-creativo/index.html"
  },
  {
    id: 6,
    title: "Dashboard Analítico",
    description: "Panel de control con gráficos en tiempo real y métricas empresariales",
    category: "Sistema Web",
    price: "$40,000 - $70,000 MXN",
    features: ["Gráficos interactivos", "Datos en tiempo real", "Exportar reportes", "Multi-usuario"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    technologies: ["React", "D3.js", "WebSocket", "Chart.js"],
    demoUrl: "/demos/dashboard-analitico/index.html"
  },
  {
    id: 7,
    title: "Sitio Web Restaurante",
    description: "Web completa para restaurante con menú digital y reservaciones online",
    category: "Sitio Corporativo",
    price: "$15,000 - $25,000 MXN",
    features: ["Menú interactivo", "Reservaciones", "Galería de fotos", "Integración redes sociales"],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    technologies: ["React", "Google Maps API", "WhatsApp API"],
    demoUrl: "/demos/restaurante/index.html"
  },
  {
    id: 8,
    title: "Plataforma E-learning",
    description: "Sistema de aprendizaje en línea con cursos, videos y certificaciones",
    category: "Educación",
    price: "$50,000 - $100,000 MXN",
    features: ["Gestión de cursos", "Video streaming", "Exámenes online", "Certificados"],
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
    technologies: ["React", "Node.js", "Video.js", "MongoDB"],
    demoUrl: "/demos/e-learning/index.html"
  },

  {
    id: 9,
    title: "Marketplace Local",
    description: "Plataforma de compra-venta entre usuarios con sistema de mensajería",
    category: "E-commerce",
    price: "$60,000 - $120,000 MXN",
    features: ["Perfiles de usuario", "Chat en tiempo real", "Sistema de pagos", "Calificaciones"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
    demoUrl: "/demos/marketplace-local/index.html"
  },
  {
    id: 10,
    title: "Portal Inmobiliario",
    description: "Sitio web para bienes raíces con búsqueda avanzada y tours virtuales",
    category: "Inmobiliaria",
    price: "$30,000 - $55,000 MXN",
    features: ["Búsqueda avanzada", "Mapas interactivos", "Galería 360°", "Calculadora hipoteca"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    technologies: ["React", "Google Maps", "Three.js"],
    demoUrl: "/demos/portal-inmobiliario/index.html"
  },
  {
    id: 11,
    title: "App Web Gimnasio",
    description: "Plataforma para gimnasios con reserva de clases y planes de entrenamiento",
    category: "Fitness/Salud",
    price: "$25,000 - $45,000 MXN",
    features: ["Reserva de clases", "Planes personalizados", "Tracking de progreso", "Pagos mensuales"],
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
    technologies: ["React", "Firebase", "Calendar API"],
    demoUrl: "/demos/app-gimnasio/index.html"
  },
  {
    id: 12,
    title: "Sistema de Tickets",
    description: "Plataforma de soporte técnico con sistema de tickets y chat en vivo",
    category: "Sistema Web",
    price: "$35,000 - $65,000 MXN",
    features: ["Gestión de tickets", "Chat en vivo", "Base de conocimiento", "Reportes"],
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop",
    technologies: ["React", "Socket.io", "Node.js", "MySQL"],
    demoUrl: "/demos/sistema-tickets/index.html"
  },
  {
    id: 13,
    title: "Portal de Eventos",
    description: "Sitio web para venta de boletos y gestión de eventos en línea",
    category: "Eventos",
    price: "$28,000 - $50,000 MXN",
    features: ["Venta de boletos", "Códigos QR", "Asientos numerados", "Reportes de ventas"],
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
    technologies: ["React", "Stripe", "QR Code API", "PDF.js"],
    demoUrl: "/demos/portal-eventos/index.html"
  },
  {
    id: 14,
    title: "Web Clínica Médica",
    description: "Portal médico con citas online, expedientes digitales y telemedicina",
    category: "Salud",
    price: "$45,000 - $80,000 MXN",
    features: ["Agenda médica", "Expedientes digitales", "Videollamadas", "Recetas electrónicas"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    technologies: ["React", "WebRTC", "Node.js", "Encrypted DB"],
    demoUrl: "/demos/clinica-medica/index.html"
  },
  {
    id: 15,
    title: "Catálogo Digital Interactivo",
    description: "Catálogo de productos con realidad aumentada y configurador 3D",
    category: "Catálogo",
    price: "$35,000 - $60,000 MXN",
    features: ["Visualización 3D", "Realidad aumentada", "Filtros avanzados", "Compartir productos"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    technologies: ["React", "Three.js", "AR.js", "WebGL"],
    demoUrl: "/demos/catalogo-digital/index.html"
  },
  {
    id: 16,
    title: "Portal de Noticias",
    description: "Sitio de noticias con sistema CMS, categorías y comentarios en tiempo real",
    category: "Blog/Contenido",
    price: "$20,000 - $35,000 MXN",
    features: ["CMS completo", "Comentarios en vivo", "Newsletter", "Publicidad programática"],
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop",
    technologies: ["React", "Strapi", "Socket.io", "Mailchimp"],
    demoUrl: "/demos/portal-noticias/index.html"
  },

  {
    id: 18,
    title: "Web Despacho Legal",
    description: "Sitio profesional para bufete de abogados con blog y formularios seguros",
    category: "Sitio Corporativo",
    price: "$18,000 - $30,000 MXN",
    features: ["Blog legal", "Formularios seguros", "Calendario de citas", "Área de clientes"],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop",
    technologies: ["React", "Encryption", "Calendar API", "PDF.js"],
    demoUrl: "/demos/despacho-legal/index.html"
  },

  {
    id: 20,
    title: "Portal Gubernamental",
    description: "Sitio web gubernamental con trámites en línea y sistema de consultas",
    category: "Gobierno",
    price: "$70,000 - $150,000 MXN",
    features: ["Trámites digitales", "Consultas públicas", "Transparencia", "Accesibilidad WCAG"],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop",
    technologies: ["React", "Node.js", "PostgreSQL", "OAuth"],
    demoUrl: "/demos/portal-gubernamental/index.html"
  },

  {
    id: 22,
    title: "Generador de Contenido con IA",
    description: "Sistema automatizado para crear contenido de marketing, blogs y redes sociales con inteligencia artificial",
    category: "Inteligencia Artificial",
    price: "$28,000 - $50,000 MXN",
    features: ["Generación de textos", "Optimización SEO automática", "Múltiples idiomas", "Plantillas personalizables"],
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop",
    technologies: ["OpenAI API", "Claude AI", "React", "Python"],
    demoUrl: "/demos/generador-contenido-ia/index.html"
  },
  {
    id: 23,
    title: "Análisis de Sentimientos en Redes",
    description: "Plataforma de monitoreo y análisis de opiniones en redes sociales con IA",
    category: "Inteligencia Artificial",
    price: "$40,000 - $75,000 MXN",
    features: ["Análisis en tiempo real", "Detección de emociones", "Reportes visuales", "Alertas automáticas"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    technologies: ["Python", "TensorFlow", "NLP", "React Dashboard"],
    demoUrl: "/demos/analisis-sentimientos/index.html"
  },
  {
    id: 24,
    title: "Reconocimiento de Imágenes IA",
    description: "Sistema de clasificación y etiquetado automático de imágenes con visión artificial",
    category: "Inteligencia Artificial",
    price: "$45,000 - $80,000 MXN",
    features: ["Detección de objetos", "Reconocimiento facial", "Clasificación automática", "API REST"],
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=600&fit=crop",
    technologies: ["TensorFlow", "OpenCV", "Python", "Google Vision AI"],
    demoUrl: "/demos/reconocimiento-imagenes/index.html"
  },
  {
    id: 25,
    title: "Asistente Virtual Personalizado",
    description: "Asistente de voz inteligente para automatización de tareas empresariales",
    category: "Inteligencia Artificial",
    price: "$50,000 - $90,000 MXN",
    features: ["Comandos de voz", "Integración con sistemas", "Automatización de procesos", "Aprendizaje continuo"],
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=600&fit=crop",
    technologies: ["Gemini AI", "Speech-to-Text", "Node.js", "WebRTC"],
    demoUrl: "/demos/asistente-virtual/index.html"
  },
  {
    id: 26,
    title: "Traductor Automático Multilingüe",
    description: "Sistema de traducción en tiempo real con IA para documentos y conversaciones",
    category: "Inteligencia Artificial",
    price: "$32,000 - $58,000 MXN",
    features: ["100+ idiomas", "Traducción contextual", "Documentos y audio", "API integrable"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    technologies: ["Google Translate AI", "DeepL API", "React", "Python"],
    demoUrl: "/demos/traductor-multilingue/index.html"
  },
  {
    id: 27,
    title: "Generador de Imágenes con IA",
    description: "Plataforma para crear imágenes únicas desde descripciones de texto con inteligencia artificial",
    category: "Inteligencia Artificial",
    price: "$38,000 - $70,000 MXN",
    features: ["Generación text-to-image", "Múltiples estilos", "Alta resolución", "Edición con IA"],
    image: "https://images.unsplash.com/photo-1547954575-855750c57bd3?w=800&h=600&fit=crop",
    technologies: ["DALL-E", "Stable Diffusion", "Midjourney API", "React"],
    demoUrl: "/demos/generador-imagenes-ia/index.html"
  },
  {
    id: 28,
    title: "Análisis Predictivo con Machine Learning",
    description: "Sistema de predicción de tendencias y comportamientos con modelos de ML personalizados",
    category: "Inteligencia Artificial",
    price: "$60,000 - $120,000 MXN",
    features: ["Modelos predictivos", "Análisis de datos históricos", "Dashboards interactivos", "Alertas inteligentes"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    technologies: ["Python", "Scikit-learn", "TensorFlow", "React Dashboard"],
    demoUrl: "/demos/analisis-predictivo/index.html"
  }
];

// Combinar proyectos de Sebastian con proyectos template
export const websites = [...sebastianProjects, ...templateProjects];

export const categories = [
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
  "Educación",
  "Landing Page",
  "Sistema Web",
  "Blog/Contenido",
  "Portafolio",
  "Sitio Corporativo",
  "Inmobiliaria",
  "Fitness/Salud",
  "Eventos",
  "Salud",
  "Catálogo",
  "Gobierno",
  "Inteligencia Artificial"
];
