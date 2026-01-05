# WebCatalog MX - Catálogo de Servicios Web 🚀

Catálogo interactivo de 28+ soluciones web profesionales diseñadas para empresas y agencias digitales en México. Desarrollado con React 19, Vite y JavaScript moderno.

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-purple.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ Características Principales

### Funcionalidades Core
- 🎯 **28+ Servicios Web Profesionales**: Desde e-commerce hasta sistemas de IA
- 🔍 **Búsqueda Inteligente**: Busca por título, descripción, categoría, características o tecnologías
- 🏷️ **Filtros por Categoría**: 13 categorías diferentes de servicios
- ❤️ **Sistema de Favoritos**: Guarda tus proyectos favoritos con persistencia en localStorage
- 🔗 **Compartir en Redes Sociales**: Comparte proyectos en Twitter, LinkedIn, Facebook y WhatsApp
- 📱 **Diseño Responsivo**: Optimizado para móviles, tablets y desktop
- ⚡ **Rendimiento Optimizado**: Lazy loading de imágenes y code splitting
- ♿ **Accesible**: Navegación por teclado, ARIA labels y skip links
- 🎨 **Animaciones Modernas**: Transiciones suaves y efectos visuales atractivos

### Mejoras de Rendimiento
- **Lazy Loading**: Imágenes cargan solo cuando son visibles
- **Code Splitting**: Componentes pesados se cargan bajo demanda
- **Optimización de Bundle**: Bundle principal < 85 kB (gzip)
- **Blur-up Effect**: Placeholders mientras cargan las imágenes

### SEO y Accesibilidad
- **Meta Tags Completos**: Open Graph y Twitter Cards
- **Structured Data**: Schema.org JSON-LD para rich snippets
- **Sitemap.xml**: Para indexación de motores de búsqueda
- **Robots.txt**: Instrucciones para crawlers
- **Skip Links**: Navegación rápida por teclado
- **ARIA Labels**: Soporte completo para lectores de pantalla

## 📂 Estructura del Proyecto

```
catalogo-web-mexico/
├── public/
│   ├── demos/              # Demos en vivo de proyectos
│   ├── robots.txt          # Instrucciones para crawlers
│   └── sitemap.xml         # Mapa del sitio
├── src/
│   ├── components/
│   │   ├── Catalog.jsx           # Grid de proyectos
│   │   ├── FavoriteButton.jsx    # Botón de favoritos
│   │   ├── FavoritesFilter.jsx   # Filtro de favoritos
│   │   ├── Filter.jsx            # Filtros de categoría
│   │   ├── Header.jsx            # Encabezado
│   │   ├── LazyImage.jsx         # Imágenes con lazy loading
│   │   ├── SearchBar.jsx         # Barra de búsqueda
│   │   ├── SEO.jsx               # Meta tags dinámicos
│   │   ├── ShareButton.jsx       # Compartir en redes
│   │   ├── SkipLink.jsx          # Saltar al contenido
│   │   ├── StructuredData.jsx    # Schema.org JSON-LD
│   │   └── WebsiteCard.jsx       # Tarjeta de proyecto
│   ├── context/
│   │   └── FavoritesContext.jsx  # Estado global de favoritos
│   ├── data/
│   │   └── websites.js           # Datos de proyectos
│   ├── tests/                    # Tests unitarios
│   ├── App.jsx                   # Componente principal
│   └── main.jsx                  # Punto de entrada
├── tests/
│   └── e2e/                      # Tests end-to-end
├── docs/
│   ├── performance-baseline.md
│   ├── performance-optimizations.md
│   └── track-progress-summary.md
└── package.json
```

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 18 o superior
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd catalogo-web-mexico

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:5173`

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia servidor de desarrollo con HMR
npm run preview          # Preview de build de producción

# Build
npm run build            # Construye para producción

# Calidad de Código
npm run lint             # Ejecuta ESLint
npm run lint:fix         # Corrige errores de linting automáticamente

# Testing
npm test                 # Ejecuta tests unitarios
npm run test:ui          # Interfaz visual de tests
npm run test:coverage    # Reporte de cobertura
npm run test:e2e         # Tests end-to-end con Playwright
```

## 🎯 Categorías de Servicios

1. **E-commerce** - Tiendas online y marketplaces
2. **Landing Page** - Páginas de aterrizaje corporativas
3. **Sistema Web** - Plataformas empresariales complejas
4. **Blog/Contenido** - Portales de noticias y blogs
5. **Portafolio** - Sitios web creativos
6. **Sitio Corporativo** - Presencia web profesional
7. **Educación** - Plataformas e-learning
8. **Inmobiliaria** - Portales de bienes raíces
9. **Fitness/Salud** - Apps para gimnasios y wellness
10. **Eventos** - Venta de boletos y gestión de eventos
11. **Salud** - Portales médicos y telemedicina
12. **Catálogo** - Catálogos digitales interactivos
13. **Gobierno** - Portales gubernamentales
14. **IA/Chatbots** - Servicios de inteligencia artificial

## 🛠️ Tecnologías Utilizadas

### Core
- **React 19.2.0** - Biblioteca UI con hooks modernos
- **Vite 7.2.4** - Build tool ultra-rápido
- **JavaScript ES6+** - Lenguaje de programación

### Librerías
- **react-lazy-load-image-component** - Lazy loading de imágenes
- **react-helmet-async** - Gestión de meta tags
- **Express 5.2.1** - Servidor para demos

### Testing
- **Vitest** - Framework de testing unitario
- **React Testing Library** - Testing de componentes
- **Playwright** - Testing end-to-end
- **@testing-library/jest-dom** - Matchers adicionales

### Desarrollo
- **ESLint** - Linting de código
- **Vite Plugin React** - Fast Refresh y JSX

## 📊 Métricas de Rendimiento

### Bundle Size
- **JS Principal**: 268.74 kB (gzip: 82.76 kB)
- **CSS Total**: 19.88 kB (gzip: ~6 kB)
- **Lazy Chunks**: 2 componentes (8.84 kB total)

### Core Web Vitals (Objetivos)
- **FCP** (First Contentful Paint): < 1.5s
- **LCP** (Largest Contentful Paint): < 2.5s
- **TTI** (Time to Interactive): < 5s
- **CLS** (Cumulative Layout Shift): < 0.1

### Lighthouse Scores (Objetivos)
- **Performance**: ≥ 90
- **Accessibility**: 100
- **Best Practices**: ≥ 90
- **SEO**: ≥ 90

## 🧪 Testing

### Ejecutar Tests

```bash
# Tests unitarios
npm test

# Tests con interfaz visual
npm run test:ui

# Cobertura de tests
npm run test:coverage

# Tests E2E
npm run test:e2e
```

### Cobertura de Tests
- **Componentes nuevos**: 100%
- **Contextos**: 100%
- **Flujos E2E**: Críticos cubiertos

## ♿ Accesibilidad

El proyecto cumple con WCAG 2.1 AA:

- ✅ Navegación completa por teclado
- ✅ ARIA labels en todos los elementos interactivos
- ✅ Skip link para saltar al contenido principal
- ✅ Contraste de colores adecuado
- ✅ Alt text en todas las imágenes
- ✅ Focus indicators visibles
- ✅ Soporte para lectores de pantalla

## 🔍 SEO

Optimizado para motores de búsqueda:

- ✅ Meta tags completos (Open Graph, Twitter Cards)
- ✅ Structured data (Schema.org JSON-LD)
- ✅ Sitemap.xml para indexación
- ✅ Robots.txt configurado
- ✅ URLs canónicas
- ✅ HTML semántico
- ✅ Preconnect para recursos externos

## 📱 Responsive Design

Optimizado para todos los dispositivos:

- **Desktop**: 1400px+ (grid de 3 columnas)
- **Tablet**: 768px - 1399px (grid de 2 columnas)
- **Mobile**: < 768px (grid de 1 columna)

## 🚀 Deployment

### Build para Producción

```bash
npm run build
```

Los archivos optimizados se generan en la carpeta `dist/`

### Opciones de Hosting

**Recomendado (Hosting Estático):**
- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages

**Configuración:**
- Build command: `npm run build`
- Output directory: `dist`
- Node version: 18+

## 📝 Documentación Adicional

- [Performance Baseline](docs/performance-baseline.md) - Métricas iniciales
- [Performance Optimizations](docs/performance-optimizations.md) - Optimizaciones implementadas
- [Track Progress Summary](docs/track-progress-summary.md) - Resumen del desarrollo

## 🤝 Contribuir

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Contribución

- Sigue el estilo de código existente
- Escribe tests para nuevas funcionalidades
- Actualiza la documentación según sea necesario
- Asegúrate de que todos los tests pasen

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Sebastian Vernis**
- GitHub: [@SebastianVernis](https://github.com/SebastianVernis)

## 🙏 Agradecimientos

- React team por la increíble biblioteca
- Vite team por el build tool ultra-rápido
- Unsplash por las imágenes de alta calidad
- Comunidad open source

## 📞 Soporte

Si tienes preguntas o necesitas ayuda:

- Abre un [Issue](https://github.com/SebastianVernis/catalogo-web-mexico/issues)
- Contacta al autor

---

**Hecho con ❤️ en México 🇲🇽**
