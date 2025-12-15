# WebCatalog MX - Catálogo de Servicios Web

Catálogo interactivo de 20 soluciones web diseñadas específicamente para empresas y agencias digitales en México. Desarrollado con React y JavaScript.

## Características Principales

- **20 Servicios Web Profesionales**: Desde e-commerce hasta portales gubernamentales
- **Búsqueda Inteligente**: Busca por título, descripción, categoría o características
- **Filtros por Categoría**: 13 categorías diferentes de servicios
- **Diseño Responsivo**: Optimizado para móviles, tablets y desktop
- **Animaciones Modernas**: Transiciones suaves y efectos visuales atractivos
- **Interfaz Intuitiva**: Fácil navegación y exploración de servicios

## Categorías de Servicios

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

## Requisitos Previos

- Node.js 18 o superior
- npm o yarn

## Instalación

```bash
# Clonar el repositorio
cd catalogo-web-mexico

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

## Scripts Disponibles

```bash
# Modo desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la build de producción
npm run preview

# Linting
npm run lint
```

## Estructura del Proyecto

```
catalogo-web-mexico/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Encabezado y navegación
│   │   ├── Header.css
│   │   ├── SearchBar.jsx       # Barra de búsqueda
│   │   ├── SearchBar.css
│   │   ├── Filter.jsx          # Filtros por categoría
│   │   ├── Filter.css
│   │   ├── WebsiteCard.jsx     # Tarjeta de servicio individual
│   │   ├── WebsiteCard.css
│   │   ├── Catalog.jsx         # Grid de servicios
│   │   └── Catalog.css
│   ├── data/
│   │   └── websites.js         # Base de datos de 20 servicios
│   ├── App.jsx                 # Componente principal
│   ├── App.css
│   ├── main.jsx               # Punto de entrada
│   └── index.css              # Estilos globales
├── public/
├── package.json
└── README.md
```

## Servicios Incluidos

Cada servicio incluye:
- **Título y descripción**
- **Categoría**
- **Rango de precio en MXN**
- **Características principales**
- **Tecnologías utilizadas**
- **Imagen representativa**

### Ejemplos de Servicios:

1. **E-commerce Completo** - $25,000 - $50,000 MXN
2. **Landing Page Corporativa** - $8,000 - $15,000 MXN
3. **Portal de Reservaciones** - $35,000 - $60,000 MXN
4. **Blog Corporativo** - $12,000 - $20,000 MXN
5. **Portafolio Creativo** - $10,000 - $18,000 MXN
6. **Dashboard Analítico** - $40,000 - $70,000 MXN
7. **Sitio Web Restaurante** - $15,000 - $25,000 MXN
8. **Plataforma E-learning** - $50,000 - $100,000 MXN
9. **Marketplace Local** - $60,000 - $120,000 MXN
10. **Portal Inmobiliario** - $30,000 - $55,000 MXN

... y 10 más.

## Tecnologías Utilizadas

- **React 18** - Biblioteca principal
- **Vite** - Build tool y dev server
- **JavaScript (ES6+)** - Lenguaje de programación
- **CSS3** - Estilos y animaciones
- **Hooks de React** - useState, useMemo
- **CSS Grid & Flexbox** - Layout responsivo

## Funcionalidades Implementadas

### Búsqueda
La barra de búsqueda filtra en tiempo real por:
- Título del servicio
- Descripción
- Categoría
- Características incluidas

### Filtros
Sistema de filtros por categoría con botones interactivos que permiten:
- Ver todos los servicios
- Filtrar por categoría específica
- Indicador visual de categoría activa

### Tarjetas Expandibles
Cada tarjeta de servicio:
- Muestra información básica por defecto
- Se expande al hacer clic para mostrar detalles completos
- Incluye efectos hover y animaciones
- Diseño responsivo

### Diseño Responsivo
- **Desktop**: Grid de 3 columnas
- **Tablet**: Grid de 2 columnas
- **Mobile**: Grid de 1 columna

## Personalización

### Agregar Nuevos Servicios

Edita el archivo `src/data/websites.js`:

```javascript
{
  id: 21,
  title: "Nuevo Servicio",
  description: "Descripción del servicio",
  category: "Categoría",
  price: "$X,XXX - $X,XXX MXN",
  features: ["Feature 1", "Feature 2", "Feature 3"],
  image: "URL de imagen",
  technologies: ["Tech1", "Tech2"]
}
```

### Agregar Nuevas Categorías

1. Agrega la categoría en `src/data/websites.js`:
```javascript
export const categories = [
  "Todos",
  "Nueva Categoría",
  // ... otras categorías
];
```

2. Asigna la categoría a uno o más servicios.

### Personalizar Colores

Los colores principales están en los archivos CSS:
- **Primario**: `#667eea` (Púrpura)
- **Secundario**: `#764ba2` (Púrpura oscuro)
- **Acento**: `#ffd700` (Dorado)

## Optimizaciones Implementadas

- **useMemo** para optimizar el filtrado de servicios
- **Lazy loading** de imágenes con el atributo `loading="lazy"`
- **CSS Grid** para layouts eficientes
- **Animaciones con CSS** (no JavaScript) para mejor rendimiento
- **Componentes modulares** y reutilizables

## Próximas Mejoras Sugeridas

- [ ] Sistema de favoritos con localStorage
- [ ] Compartir servicios en redes sociales
- [ ] Modal con información detallada de cada servicio
- [ ] Sistema de cotización online
- [ ] Integración con formulario de contacto
- [ ] Modo oscuro
- [ ] Exportar servicios a PDF
- [ ] Integración con CMS para contenido dinámico

## Deployment

### Vercel
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
npm run build
# Configurar base en vite.config.js si es necesario
```

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## Contacto

Para consultas sobre servicios de desarrollo web:
- Email: contacto@webcatalogmx.com
- Web: www.webcatalogmx.com

---

**Desarrollado con** ❤️ **en México para agencias digitales mexicanas**
