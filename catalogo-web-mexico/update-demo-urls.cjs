const fs = require('fs');
const path = require('path');

// Mapeo de IDs a URLs de demos
const demoUrls = {
  1: '/demos/e-commerce-completo/index.html',
  2: '/demos/landing-corporativa/index.html',
  3: '/demos/portal-reservaciones/index.html',
  4: '/demos/blog-corporativo/index.html',
  5: '/demos/portafolio-creativo/index.html',
  6: '/demos/dashboard-analitico/index.html',
  7: '/demos/restaurante/index.html',
  9: '/demos/marketplace-local/index.html',
  10: '/demos/portal-inmobiliario/index.html',
  11: '/demos/app-gimnasio/index.html',
  12: '/demos/sistema-tickets/index.html',
  13: '/demos/portal-eventos/index.html',
  14: '/demos/clinica-medica/index.html',
  15: '/demos/catalogo-digital/index.html',
  16: '/demos/portal-noticias/index.html',
  18: '/demos/despacho-legal/index.html',
  20: '/demos/portal-gubernamental/index.html',
  22: '/demos/generador-contenido-ia/index.html',
  23: '/demos/analisis-sentimientos/index.html',
  24: '/demos/reconocimiento-imagenes/index.html',
  25: '/demos/asistente-virtual/index.html',
  26: '/demos/traductor-multilingue/index.html',
  27: '/demos/generador-imagenes-ia/index.html',
  28: '/demos/analisis-predictivo/index.html'
};

// Leer archivo websites.js
const filePath = path.join(__dirname, 'src', 'data', 'websites.js');
let content = fs.readFileSync(filePath, 'utf8');

// Agregar demoUrl a cada item que no lo tenga
Object.entries(demoUrls).forEach(([id, url]) => {
  // Buscar el objeto con este ID
  const idPattern = new RegExp(`(\\{[^}]*id:\\s*${id},(?:(?!demoUrl)[^}])*)technologies:\\s*\\[([^\\]]*)\\]`, 'g');
  
  content = content.replace(idPattern, (match, before, techs) => {
    return `${before}technologies: [${techs}],\n    demoUrl: "${url}"`;
  });
});

// Guardar archivo actualizado
fs.writeFileSync(filePath, content);

console.log('✅ Archivo websites.js actualizado con demoUrls');
console.log(`✅ ${Object.keys(demoUrls).length} demos vinculados`);
