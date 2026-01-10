// Importar proyectos de Sebastian Vernis
import { sebastianProjects } from './sebastianProjects.js';

// Proyectos de ejemplo/template
const templateProjects = [
  {
    id: 106,
    title: "Chispart CLI - Terminal AI Tool",
    description: "Herramienta CLI que automatiza tareas mediante lenguaje natural y delega análisis avanzados a IA. Ejecuta scripts, gestiona proyectos y procesa comandos complejos.",
    category: "Mis Proyectos",
    
    features: ["Natural Language", "Task Automation", "AI Integration", "Script Execution", "Project Management", "Context-Aware"],
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=600&fit=crop",
    technologies: ["Node.js", "JavaScript", "CLI", "AI API", "Commander.js"],
    githubUrl: "https://github.com/SebastianVernis/chispart-cli"
  },
  {
    id: 107,
    title: "Escuela de Idiomas - Language School",
    description: "Plataforma completa para escuela de idiomas con gestión de cursos, horarios, profesores y estudiantes. Sistema de inscripciones y seguimiento de progreso.",
    category: "Mis Proyectos",
    
    features: ["Gestión de Cursos", "Sistema de Inscripciones", "Tracking de Progreso", "Panel de Profesores", "Calendario de Clases", "Reportes"],
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=600&fit=crop",
    technologies: ["JavaScript", "Node.js", "Express", "MongoDB", "React"],
    githubUrl: "https://github.com/SebastianVernis/escuela-idiomas"
  },
  {
    id: 108,
    title: "Sistema de Facturación - Invoice Template",
    description: "Plantilla profesional para sistema de facturación electrónica con generación de PDFs, cálculo automático de impuestos y gestión de clientes.",
    category: "Mis Proyectos",
    
    features: ["Generación PDF", "Cálculo de Impuestos", "Gestión de Clientes", "Historial de Facturas", "Reportes Fiscales", "Envío por Email"],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop",
    technologies: ["JavaScript", "PDF.js", "HTML5", "CSS3", "LocalStorage"],
    githubUrl: "https://github.com/SebastianVernis/Facturacion-Template"
  },


  {
    id: 111,
    title: "Tarot App - Lectura de Tarot IA",
    description: "Aplicación de lectura de tarot con inteligencia artificial. Genera interpretaciones personalizadas, spreads tradicionales y análisis de cartas.",
    category: "Mis Proyectos",
    
    features: ["Lectura con IA", "Múltiples Spreads", "Interpretación Personalizada", "Historial de Lecturas", "Galería de Cartas", "Análisis Detallado"],
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=600&fit=crop",
    technologies: ["Python", "Flask", "AI API", "JavaScript", "HTML5"],
    githubUrl: "https://github.com/SebastianVernis/tarot-app"
  },
  {
    id: 112,
    title: "Drag & Drop Builder - Visual Editor",
    description: "Constructor visual drag-and-drop para crear páginas web sin código. Incluye componentes pre-diseñados, editor de estilos y exportación de código.",
    category: "Mis Proyectos",
    
    features: ["Drag & Drop", "Editor Visual", "Componentes Pre-diseñados", "Editor de Estilos", "Exportar Código HTML", "Vista Previa en Tiempo Real"],
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=600&fit=crop",
    technologies: ["JavaScript", "HTML5 DnD API", "CSS3", "Vanilla JS"],
    githubUrl: "https://github.com/SebastianVernis/DragNDrop"
  },
  {
    id: 113,
    title: "Celula Chatbot IA - AI Chatbot",
    description: "Chatbot inteligente con procesamiento de lenguaje natural, respuestas contextuales y capacidad de aprendizaje. Interfaz web moderna y responsive.",
    category: "Mis Proyectos",
    
    features: ["NLP Avanzado", "Respuestas Contextuales", "Interfaz Web Moderna", "Historial de Conversación", "Multi-idioma", "API REST"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
    technologies: ["HTML", "JavaScript", "AI API", "CSS3", "WebSocket"],
    githubUrl: "https://github.com/SebastianVernis/celula-chatbot-ia"
  },

  {
    id: 115,
    title: "CRM Twilio - Customer Management",
    description: "Sistema CRM con integración de Twilio para comunicación SMS y WhatsApp. Gestión de contactos, pipeline de ventas y automatización.",
    category: "Mis Proyectos",
    
    features: ["Integración Twilio", "SMS Automáticos", "WhatsApp Business", "Gestión de Contactos", "Pipeline de Ventas", "Reportes"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    technologies: ["JavaScript", "Node.js", "Twilio API", "Express", "MongoDB"],
    githubUrl: "https://github.com/SebastianVernis/crm-twilio"
  },
  {
    id: 1,
    title: "E-commerce Completo",
    description: "Tienda online con carrito de compras, pasarela de pagos y gestión de inventario completa",
    category: "E-commerce",
    
    features: ["Carrito de compras", "Pasarela de pagos", "Gestión de inventario", "Panel administrativo"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
  },
  {
    id: 2,
    title: "Landing Page Corporativa",
    description: "Página de aterrizaje profesional con diseño moderno y optimizada para conversión",
    category: "Landing Page",
    
    features: ["Diseño responsivo", "Formulario de contacto", "SEO optimizado", "Animaciones"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    technologies: ["React", "CSS3", "EmailJS"],
  },
  {
    id: 3,
    title: "Portal de Reservaciones",
    description: "Sistema de reservas en línea para hoteles, restaurantes o servicios",
    category: "Sistema Web",
    
    features: ["Calendario interactivo", "Pagos en línea", "Notificaciones por email", "Dashboard"],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
    technologies: ["React", "Firebase", "Calendar API", "PayPal"],
  },
  {
    id: 4,
    title: "Blog Corporativo",
    description: "Blog profesional con CMS integrado para gestión de contenidos",
    category: "Blog/Contenido",
    
    features: ["CMS personalizado", "Categorías y tags", "Comentarios", "SEO avanzado"],
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop",
    technologies: ["React", "Headless CMS", "Markdown"],
  },
  {
    id: 5,
    title: "Portafolio Creativo",
    description: "Sitio web de portafolio con galería interactiva y animaciones premium",
    category: "Portafolio",
    
    features: ["Galería interactiva", "Filtros por categoría", "Lightbox", "Formulario contacto"],
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    technologies: ["React", "Framer Motion", "CSS Grid"],
  },
  {
    id: 6,
    title: "Dashboard Analítico",
    description: "Panel de control con gráficos en tiempo real y métricas empresariales",
    category: "Sistema Web",
    
    features: ["Gráficos interactivos", "Datos en tiempo real", "Exportar reportes", "Multi-usuario"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    technologies: ["React", "D3.js", "WebSocket", "Chart.js"],
  },
  {
    id: 7,
    title: "Sitio Web Restaurante",
    description: "Web completa para restaurante con menú digital y reservaciones online",
    category: "Sitio Corporativo",
    
    features: ["Menú interactivo", "Reservaciones", "Galería de fotos", "Integración redes sociales"],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    technologies: ["React", "Google Maps API", "WhatsApp API"],
  },
  {
    id: 8,
    title: "Plataforma E-learning",
    description: "Sistema de aprendizaje en línea con cursos, videos y certificaciones",
    category: "Educación",
    
    features: ["Gestión de cursos", "Video streaming", "Exámenes online", "Certificados"],
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
    technologies: ["React", "Node.js", "Video.js", "MongoDB"],
  },

  {
    id: 9,
    title: "Marketplace Local",
    description: "Plataforma de compra-venta entre usuarios con sistema de mensajería",
    category: "E-commerce",
    
    features: ["Perfiles de usuario", "Chat en tiempo real", "Sistema de pagos", "Calificaciones"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
  },
  {
    id: 10,
    title: "Portal Inmobiliario",
    description: "Sitio web para bienes raíces con búsqueda avanzada y tours virtuales",
    category: "Inmobiliaria",
    
    features: ["Búsqueda avanzada", "Mapas interactivos", "Galería 360°", "Calculadora hipoteca"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    technologies: ["React", "Google Maps", "Three.js"],
  },
  {
    id: 11,
    title: "App Web Gimnasio",
    description: "Plataforma para gimnasios con reserva de clases y planes de entrenamiento",
    category: "Fitness/Salud",
    
    features: ["Reserva de clases", "Planes personalizados", "Tracking de progreso", "Pagos mensuales"],
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
    technologies: ["React", "Firebase", "Calendar API"],
  },
  {
    id: 12,
    title: "Sistema de Tickets",
    description: "Plataforma de soporte técnico con sistema de tickets y chat en vivo",
    category: "Sistema Web",
    
    features: ["Gestión de tickets", "Chat en vivo", "Base de conocimiento", "Reportes"],
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop",
    technologies: ["React", "Socket.io", "Node.js", "MySQL"],
  },
  {
    id: 13,
    title: "Portal de Eventos",
    description: "Sitio web para venta de boletos y gestión de eventos en línea",
    category: "Eventos",
    
    features: ["Venta de boletos", "Códigos QR", "Asientos numerados", "Reportes de ventas"],
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
    technologies: ["React", "Stripe", "QR Code API", "PDF.js"],
  },
  {
    id: 14,
    title: "Web Clínica Médica",
    description: "Portal médico con citas online, expedientes digitales y telemedicina",
    category: "Salud",
    
    features: ["Agenda médica", "Expedientes digitales", "Videollamadas", "Recetas electrónicas"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    technologies: ["React", "WebRTC", "Node.js", "Encrypted DB"],
  },
  {
    id: 15,
    title: "Catálogo Digital Interactivo",
    description: "Catálogo de productos con realidad aumentada y configurador 3D",
    category: "Catálogo",
    
    features: ["Visualización 3D", "Realidad aumentada", "Filtros avanzados", "Compartir productos"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    technologies: ["React", "Three.js", "AR.js", "WebGL"],
  },
  {
    id: 16,
    title: "Portal de Noticias",
    description: "Sitio de noticias con sistema CMS, categorías y comentarios en tiempo real",
    category: "Blog/Contenido",
    
    features: ["CMS completo", "Comentarios en vivo", "Newsletter", "Publicidad programática"],
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop",
    technologies: ["React", "Strapi", "Socket.io", "Mailchimp"],
  },

  {
    id: 18,
    title: "Web Despacho Legal",
    description: "Sitio profesional para bufete de abogados con blog y formularios seguros",
    category: "Sitio Corporativo",
    
    features: ["Blog legal", "Formularios seguros", "Calendario de citas", "Área de clientes"],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop",
    technologies: ["React", "Encryption", "Calendar API", "PDF.js"],
  },

  {
    id: 20,
    title: "Portal Gubernamental",
    description: "Sitio web gubernamental con trámites en línea y sistema de consultas",
    category: "Gobierno",
    
    features: ["Trámites digitales", "Consultas públicas", "Transparencia", "Accesibilidad WCAG"],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop",
    technologies: ["React", "Node.js", "PostgreSQL", "OAuth"],
  },

  {
    id: 22,
    title: "Generador de Contenido con IA",
    description: "Sistema automatizado para crear contenido de marketing, blogs y redes sociales con inteligencia artificial",
    category: "Inteligencia Artificial",
    
    features: ["Generación de textos", "Optimización SEO automática", "Múltiples idiomas", "Plantillas personalizables"],
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop",
    technologies: ["OpenAI API", "Claude AI", "React", "Python"],
  },
  {
    id: 23,
    title: "Análisis de Sentimientos en Redes",
    description: "Plataforma de monitoreo y análisis de opiniones en redes sociales con IA",
    category: "Inteligencia Artificial",
    
    features: ["Análisis en tiempo real", "Detección de emociones", "Reportes visuales", "Alertas automáticas"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    technologies: ["Python", "TensorFlow", "NLP", "React Dashboard"],
  },
  {
    id: 24,
    title: "Reconocimiento de Imágenes IA",
    description: "Sistema de clasificación y etiquetado automático de imágenes con visión artificial",
    category: "Inteligencia Artificial",
    
    features: ["Detección de objetos", "Reconocimiento facial", "Clasificación automática", "API REST"],
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=600&fit=crop",
    technologies: ["TensorFlow", "OpenCV", "Python", "Google Vision AI"],
  },
  {
    id: 25,
    title: "Asistente Virtual Personalizado",
    description: "Asistente de voz inteligente para automatización de tareas empresariales",
    category: "Inteligencia Artificial",
    
    features: ["Comandos de voz", "Integración con sistemas", "Automatización de procesos", "Aprendizaje continuo"],
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=600&fit=crop",
    technologies: ["Gemini AI", "Speech-to-Text", "Node.js", "WebRTC"],
  },
  {
    id: 26,
    title: "Traductor Automático Multilingüe",
    description: "Sistema de traducción en tiempo real con IA para documentos y conversaciones",
    category: "Inteligencia Artificial",
    
    features: ["100+ idiomas", "Traducción contextual", "Documentos y audio", "API integrable"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    technologies: ["Google Translate AI", "DeepL API", "React", "Python"],
  },
  {
    id: 27,
    title: "Generador de Imágenes con IA",
    description: "Plataforma para crear imágenes únicas desde descripciones de texto con inteligencia artificial",
    category: "Inteligencia Artificial",
    
    features: ["Generación text-to-image", "Múltiples estilos", "Alta resolución", "Edición con IA"],
    image: "https://images.unsplash.com/photo-1547954575-855750c57bd3?w=800&h=600&fit=crop",
    technologies: ["DALL-E", "Stable Diffusion", "Midjourney API", "React"],
  },
  {
    id: 28,
    title: "Análisis Predictivo con Machine Learning",
    description: "Sistema de predicción de tendencias y comportamientos con modelos de ML personalizados",
    category: "Inteligencia Artificial",
    
    features: ["Modelos predictivos", "Análisis de datos históricos", "Dashboards interactivos", "Alertas inteligentes"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    technologies: ["Python", "Scikit-learn", "TensorFlow", "React Dashboard"],
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
