/**
 * Script para generar imágenes de proyectos usando Blackbox AI API
 * Genera imágenes hero, screenshots y assets multimedia para cada proyecto
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de Blackbox AI API
const BLACKBOX_API_KEY = process.env.BLACKBOX_API_KEY || 'sk-sUr-qT34j0SoUTcXao8gAg';
const BLACKBOX_API_BASE_URL = process.env.BLACKBOX_API_BASE_URL || 'https://api.blackbox.ai/v1';

// Proyectos de Sebastian Vernis
const projects = [
  {
    id: 201,
    name: "SAAS-DND",
    title: "Editor Visual Drag & Drop",
    description: "Sistema SaaS con editor HTML visual drag-and-drop, 25 templates profesionales",
    imagePrompts: {
      hero: "Modern SaaS dashboard with drag and drop interface, visual HTML editor, dark theme, professional UI, glassmorphism design, purple and blue gradients, 4K quality",
      screenshot1: "Drag and drop website builder interface, component library sidebar, canvas with website preview, properties panel, modern dark UI",
      screenshot2: "Template gallery showing 25 professional website templates, grid layout, hover effects, modern design",
      icon: "Minimalist icon for drag and drop editor, geometric shapes, purple gradient, modern tech logo"
    }
  },
  {
    id: 202,
    name: "CHISPART-APP",
    title: "Plataforma Multi-Agente IA",
    description: "Plataforma de IA multiagente con interfaz glassmorphism, FastAPI backend",
    imagePrompts: {
      hero: "AI multi-agent platform interface, glassmorphism design, neural network visualization, futuristic UI, purple and cyan colors, holographic effects, 4K quality",
      screenshot1: "FastAPI REST API documentation interface, Swagger UI, modern dark theme, code examples",
      screenshot2: "AI chat interface with multiple agents, conversation bubbles, glassmorphism cards, modern design",
      icon: "AI brain icon with multiple nodes, neural network pattern, gradient colors, tech logo"
    }
  },
  {
    id: 203,
    name: "EDIFNUEV",
    title: "Sistema de Gestión de Edificios",
    description: "Sistema de gestión para edificio de 20 apartamentos, presupuestos y gastos",
    imagePrompts: {
      hero: "Building management dashboard, financial charts, expense tracking, modern admin panel, blue and white color scheme, professional interface, 4K quality",
      screenshot1: "Budget management interface with monthly expenses, charts and graphs, clean design",
      screenshot2: "Apartment management grid, tenant information cards, status indicators, modern UI",
      icon: "Building icon with management symbols, geometric design, blue gradient, professional logo"
    }
  },
  {
    id: 204,
    name: "DEFIENDETEMX",
    title: "Protección Legal PWA",
    description: "PWA con información legal para emergencias en México, botón SOS 911",
    imagePrompts: {
      hero: "Legal protection mobile app interface, SOS emergency button, Mexican flag colors, modern PWA design, glassmorphism, safety theme, 4K quality",
      screenshot1: "Legal information cards with verified content, emergency scenarios, clean mobile UI",
      screenshot2: "Voice recorder interface with AI transcription, waveform visualization, modern design",
      icon: "Shield icon with legal scales, Mexican colors (green, white, red), protection symbol, modern logo"
    }
  },
  {
    id: 205,
    name: "NOVA-LEGIS-AI",
    title: "Asistente Legal Inteligente",
    description: "Chatbot legal 24/7 con lead scoring y análisis contextual",
    imagePrompts: {
      hero: "Legal AI chatbot interface, professional law firm design, chat widget, lead scoring dashboard, blue and gold colors, modern UI, 4K quality",
      screenshot1: "AI chatbot conversation interface, legal questions and answers, professional design",
      screenshot2: "Lead management dashboard with scoring metrics, analytics charts, modern admin panel",
      icon: "Legal scales with AI brain, professional law firm logo, blue and gold gradient"
    }
  },
  {
    id: 206,
    name: "CELULA-CHATBOT-IA",
    title: "Web Banda Musical",
    description: "Sitio web para banda musical con chatbot IA y sistema de cotización",
    imagePrompts: {
      hero: "Music band website, concert stage background, modern web design, vibrant colors, musical instruments, professional layout, 4K quality",
      screenshot1: "Music band gallery with photos and videos, multimedia showcase, modern design",
      screenshot2: "Booking system with pricing calculator, event calendar, professional interface",
      icon: "Musical note with AI elements, vibrant colors, modern band logo, creative design"
    }
  },
  {
    id: 207,
    name: "DRAGNDROP",
    title: "Sistema Full-Stack Multi-Versión",
    description: "Sistema full-stack con deployment multi-versión e infraestructura compleja",
    imagePrompts: {
      hero: "Full-stack development dashboard, version control interface, deployment pipeline, DevOps theme, dark UI, technical design, 4K quality",
      screenshot1: "Multi-version deployment interface, version history, rollback options, modern DevOps UI",
      screenshot2: "Infrastructure monitoring dashboard, server status, metrics and logs, technical interface",
      icon: "Layered stack icon with version branches, technical logo, blue and green gradient"
    }
  },
  {
    id: 208,
    name: "TAROT-APP",
    title: "Lecturas de Tarot con IA",
    description: "Plataforma de tarot con IA, astrología y lecturas personalizadas",
    imagePrompts: {
      hero: "Mystical tarot reading interface, tarot cards spread, celestial background, purple and gold colors, magical atmosphere, AI elements, 4K quality",
      screenshot1: "Tarot card selection interface, Celtic Cross spread, mystical design, dark theme",
      screenshot2: "Astrology birth chart with AI analysis, zodiac symbols, cosmic design, modern UI",
      icon: "Mystical tarot card with AI symbol, celestial elements, purple and gold gradient, magical logo"
    }
  },
  {
    id: 209,
    name: "FACTURACION-TEMPLATE",
    title: "Sistema de Facturación Automotriz",
    description: "Facturación para concesionarios con QR codes y REPUVE",
    imagePrompts: {
      hero: "Automotive invoice system, car dealership interface, QR code integration, professional business design, blue and white colors, 4K quality",
      screenshot1: "Invoice generation interface with PDF preview, QR code display, professional layout",
      screenshot2: "Vehicle inventory management, car database, REPUVE integration, modern admin panel",
      icon: "Car icon with invoice document and QR code, professional automotive logo, blue gradient"
    }
  },
  {
    id: 210,
    name: "MANDA2",
    title: "Plataforma de Delivery",
    description: "Sistema de delivery con tracking en tiempo real y OTP",
    imagePrompts: {
      hero: "Food delivery app interface, real-time tracking map, order management, modern mobile design, orange and white colors, 4K quality",
      screenshot1: "Delivery tracking interface with live map, order status, driver location, modern UI",
      screenshot2: "Restaurant menu and ordering interface, food items grid, cart system, clean design",
      icon: "Delivery box with location pin, fast delivery symbol, orange gradient, modern logo"
    }
  },
  {
    id: 211,
    name: "MASCOTOPIA",
    title: "E-commerce para Mascotas",
    description: "Tienda online de alimentos y accesorios para mascotas",
    imagePrompts: {
      hero: "Pet store e-commerce website, cute animals, product showcase, friendly design, orange and blue colors, modern shopping interface, 4K quality",
      screenshot1: "Pet products catalog with filters, shopping cart, product cards, friendly UI",
      screenshot2: "Product detail page with pet food, add to cart button, reviews, modern e-commerce design",
      icon: "Cute paw print with shopping cart, pet store logo, orange and blue gradient, friendly design"
    }
  },
  {
    id: 212,
    name: "ESCUELA-IDIOMAS",
    title: "Plataforma Educativa de Idiomas",
    description: "Escuela de idiomas con 3 idiomas, biblioteca digital de 1000+ libros",
    imagePrompts: {
      hero: "Language learning platform, digital library interface, course dashboard, educational design, blue and green colors, modern e-learning UI, 4K quality",
      screenshot1: "Digital library with 1000+ books, categories, streaming interface, modern design",
      screenshot2: "Language course dashboard with progress tracking, levels A1-C2, student portal, clean UI",
      icon: "Book with multiple language flags (English, French, Portuguese), educational logo, blue gradient"
    }
  },
  {
    id: 213,
    name: "PLANTILLA-ESHOP",
    title: "Template E-commerce de Ropa",
    description: "Template de tienda de ropa con generación de imágenes IA",
    imagePrompts: {
      hero: "Fashion e-commerce website, clothing store interface, modern shopping design, trendy fashion, elegant layout, pastel colors, 4K quality",
      screenshot1: "Clothing product grid with filters, fashion items, shopping interface, modern design",
      screenshot2: "Product detail page with clothing item, size selector, add to cart, elegant UI",
      icon: "Hanger icon with shopping bag, fashion store logo, elegant gradient, modern design"
    }
  }
];

/**
 * Genera prompt para imagen usando Blackbox AI
 */
async function generateImage(prompt, projectName, imageType) {
  console.log(`\n🎨 Generando ${imageType} para ${projectName}...`);
  console.log(`📝 Prompt: ${prompt}`);
  
  try {
    const response = await fetch(`${BLACKBOX_API_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BLACKBOX_API_KEY}`
      },
      body: JSON.stringify({
        model: 'blackboxai-pro',
        messages: [
          {
            role: 'user',
            content: `Generate a high-quality image URL for: ${prompt}. Return ONLY the image URL, nothing else.`
          }
        ],
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const imageUrl = data.choices[0]?.message?.content?.trim();
    
    console.log(`✅ Imagen generada: ${imageUrl}`);
    return imageUrl;
  } catch (error) {
    console.error(`❌ Error generando imagen: ${error.message}`);
    // Fallback a Unsplash
    return `https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop`;
  }
}

/**
 * Genera todas las imágenes para un proyecto
 */
async function generateProjectImages(project) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🚀 Procesando proyecto: ${project.name}`);
  console.log(`${'='.repeat(60)}`);

  const images = {
    projectId: project.id,
    projectName: project.name,
    hero: null,
    screenshots: [],
    icon: null
  };

  // Generar imagen hero
  images.hero = await generateImage(project.imagePrompts.hero, project.name, 'Hero');
  
  // Generar screenshots
  images.screenshots.push(
    await generateImage(project.imagePrompts.screenshot1, project.name, 'Screenshot 1')
  );
  images.screenshots.push(
    await generateImage(project.imagePrompts.screenshot2, project.name, 'Screenshot 2')
  );
  
  // Generar icon
  images.icon = await generateImage(project.imagePrompts.icon, project.name, 'Icon');

  return images;
}

/**
 * Función principal
 */
async function main() {
  console.log('🎨 Iniciando generación de imágenes con Blackbox AI');
  console.log(`📊 Total de proyectos: ${projects.length}`);
  console.log(`🔑 API Key: ${BLACKBOX_API_KEY.substring(0, 10)}...`);
  console.log(`🌐 API URL: ${BLACKBOX_API_BASE_URL}`);

  const allImages = [];

  // Generar imágenes para cada proyecto
  for (const project of projects) {
    const projectImages = await generateProjectImages(project);
    allImages.push(projectImages);
    
    // Pequeña pausa entre proyectos para no saturar la API
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Guardar resultados
  const outputDir = path.join(__dirname, 'public', 'generated-images');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputFile = path.join(outputDir, 'project-images.json');
  fs.writeFileSync(outputFile, JSON.stringify(allImages, null, 2));

  console.log(`\n${'='.repeat(60)}`);
  console.log('✅ Generación completada!');
  console.log(`📁 Archivo guardado: ${outputFile}`);
  console.log(`📊 Total imágenes generadas: ${allImages.length * 4}`);
  console.log(`${'='.repeat(60)}\n`);

  // Mostrar resumen
  console.log('\n📋 RESUMEN DE IMÁGENES GENERADAS:\n');
  allImages.forEach(img => {
    console.log(`${img.projectName}:`);
    console.log(`  Hero: ${img.hero}`);
    console.log(`  Screenshots: ${img.screenshots.length}`);
    console.log(`  Icon: ${img.icon}`);
    console.log('');
  });
}

// Ejecutar
main().catch(console.error);
