# Inicio Rápido - WebCatalog MX

## Instalación y Ejecución (3 pasos)

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Abrir en navegador
# El servidor se ejecutará en http://localhost:5173
```

## Vista Previa del Proyecto

El catálogo incluye **20 servicios web** organizados en **13 categorías**:

### Servicios Destacados:
- **E-commerce Completo** ($25,000 - $50,000 MXN)
- **Landing Page Corporativa** ($8,000 - $15,000 MXN)
- **Plataforma E-learning** ($50,000 - $100,000 MXN)
- **Portal Inmobiliario** ($30,000 - $55,000 MXN)
- **App de Delivery** ($45,000 - $85,000 MXN)

### Características Principales:
✅ Búsqueda en tiempo real
✅ Filtros por categoría
✅ Tarjetas expandibles con detalles
✅ Diseño 100% responsivo
✅ Animaciones suaves
✅ Optimizado para performance

## Estructura de Archivos

```
src/
├── components/          # Componentes React
│   ├── Header.jsx      # Encabezado con navegación
│   ├── SearchBar.jsx   # Barra de búsqueda
│   ├── Filter.jsx      # Filtros de categorías
│   ├── WebsiteCard.jsx # Tarjeta individual
│   └── Catalog.jsx     # Grid principal
├── data/
│   └── websites.js     # 20 servicios web
├── App.jsx            # Componente raíz
└── index.css          # Estilos globales
```

## Personalización Rápida

### Cambiar Colores
Editar variables en los archivos CSS:
- Color primario: `#667eea`
- Color secundario: `#764ba2`
- Acento: `#ffd700`

### Agregar Servicios
Editar `src/data/websites.js` y agregar objetos con:
- id, title, description, category, price
- features (array), technologies (array), image (URL)

### Agregar Categorías
1. Agregar en array `categories` en `src/data/websites.js`
2. Asignar categoría a servicios correspondientes

## Comandos Útiles

```bash
# Desarrollo
npm run dev          # Servidor desarrollo (puerto 5173)

# Producción
npm run build        # Compilar para producción
npm run preview      # Vista previa build

# Calidad de código
npm run lint         # Verificar código con ESLint
```

## Tecnologías

- **React 18** - Framework UI
- **Vite** - Build tool ultra-rápido
- **JavaScript ES6+** - Lenguaje moderno
- **CSS3** - Estilos y animaciones

## Soporte

Para preguntas o soporte:
- 📧 Email: contacto@webcatalogmx.com
- 🌐 Web: www.webcatalogmx.com

---

**¡Listo para usar!** 🚀
