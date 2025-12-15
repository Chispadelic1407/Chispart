#!/usr/bin/env python3
# Script para agregar servicios de IA al catálogo

import re

# Leer el archivo original
with open('src/data/websites.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Nuevos servicios de IA
ai_services = '''  },
  {
    id: 21,
    title: "Chatbot Inteligente con IA",
    description: "Asistente virtual conversacional con procesamiento de lenguaje natural y aprendizaje automático",
    category: "Inteligencia Artificial",
    price: "$35,000 - $65,000 MXN",
    features: ["Procesamiento de lenguaje natural", "Respuestas contextuales", "Integración multicanal", "Análisis de sentimientos"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
    technologies: ["OpenAI GPT", "Gemini AI", "Node.js", "WebSocket"]
  },
  {
    id: 22,
    title: "Generador de Contenido con IA",
    description: "Sistema automatizado para crear contenido de marketing, blogs y redes sociales con inteligencia artificial",
    category: "Inteligencia Artificial",
    price: "$28,000 - $50,000 MXN",
    features: ["Generación de textos", "Optimización SEO automática", "Múltiples idiomas", "Plantillas personalizables"],
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop",
    technologies: ["OpenAI API", "Claude AI", "React", "Python"]
  },
  {
    id: 23,
    title: "Análisis de Sentimientos en Redes",
    description: "Plataforma de monitoreo y análisis de opiniones en redes sociales con IA",
    category: "Inteligencia Artificial",
    price: "$40,000 - $75,000 MXN",
    features: ["Análisis en tiempo real", "Detección de emociones", "Reportes visuales", "Alertas automáticas"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    technologies: ["Python", "TensorFlow", "NLP", "React Dashboard"]
  },
  {
    id: 24,
    title: "Reconocimiento de Imágenes IA",
    description: "Sistema de clasificación y etiquetado automático de imágenes con visión artificial",
    category: "Inteligencia Artificial",
    price: "$45,000 - $80,000 MXN",
    features: ["Detección de objetos", "Reconocimiento facial", "Clasificación automática", "API REST"],
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=600&fit=crop",
    technologies: ["TensorFlow", "OpenCV", "Python", "Google Vision AI"]
  },
  {
    id: 25,
    title: "Asistente Virtual Personalizado",
    description: "Asistente de voz inteligente para automatización de tareas empresariales",
    category: "Inteligencia Artificial",
    price: "$50,000 - $90,000 MXN",
    features: ["Comandos de voz", "Integración con sistemas", "Automatización de procesos", "Aprendizaje continuo"],
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=600&fit=crop",
    technologies: ["Gemini AI", "Speech-to-Text", "Node.js", "WebRTC"]
  },
  {
    id: 26,
    title: "Traductor Automático Multilingüe",
    description: "Sistema de traducción en tiempo real con IA para documentos y conversaciones",
    category: "Inteligencia Artificial",
    price: "$32,000 - $58,000 MXN",
    features: ["100+ idiomas", "Traducción contextual", "Documentos y audio", "API integrable"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    technologies: ["Google Translate AI", "DeepL API", "React", "Python"]
  },
  {
    id: 27,
    title: "Generador de Imágenes con IA",
    description: "Plataforma para crear imágenes únicas desde descripciones de texto con inteligencia artificial",
    category: "Inteligencia Artificial",
    price: "$38,000 - $70,000 MXN",
    features: ["Generación text-to-image", "Múltiples estilos", "Alta resolución", "Edición con IA"],
    image: "https://images.unsplash.com/photo-1547954575-855750c57bd3?w=800&h=600&fit=crop",
    technologies: ["DALL-E", "Stable Diffusion", "Midjourney API", "React"]
  },
  {
    id: 28,
    title: "Análisis Predictivo con Machine Learning",
    description: "Sistema de predicción de tendencias y comportamientos con modelos de ML personalizados",
    category: "Inteligencia Artificial",
    price: "$60,000 - $120,000 MXN",
    features: ["Modelos predictivos", "Análisis de datos históricos", "Dashboards interactivos", "Alertas inteligentes"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    technologies: ["Python", "Scikit-learn", "TensorFlow", "React Dashboard"]
  }'''

# Reemplazar el cierre del array de websites
content = content.replace(
    '    technologies: ["React", "Node.js", "PostgreSQL", "OAuth"]\n  }\n];',
    '    technologies: ["React", "Node.js", "PostgreSQL", "OAuth"]\n' + ai_services + '\n];'
)

# Agregar la nueva categoría
content = content.replace(
    '  "Gobierno"\n];',
    '  "Gobierno",\n  "Inteligencia Artificial"\n];'
)

# Escribir el archivo modificado
with open('src/data/websites.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ Servicios de IA agregados exitosamente")
print("✓ Categoría 'Inteligencia Artificial' agregada")
print("✓ Total de servicios: 28")
