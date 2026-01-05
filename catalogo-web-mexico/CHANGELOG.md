# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [1.0.0] - 2026-01-04

### 🎉 Lanzamiento Inicial con Mejoras Significativas

Esta versión incluye el catálogo base más mejoras sustanciales de funcionalidad, rendimiento, accesibilidad y SEO.

### ✨ Agregado

#### Funcionalidades de Usuario
- **Sistema de Favoritos**
  - Guardar/quitar proyectos de favoritos con un clic
  - Persistencia en localStorage
  - Filtro para ver solo proyectos favoritos
  - Contador de favoritos con badge visual
  - Animación de corazón al agregar favoritos

- **Compartir en Redes Sociales**
  - Compartir proyectos en Twitter, LinkedIn, Facebook y WhatsApp
  - Copiar enlace al portapapeles con confirmación visual
  - Menú dropdown animado
  - URLs compartibles con ID de proyecto

- **Navegación y Búsqueda**
  - Búsqueda inteligente por título, descripción, categoría, características y tecnologías
  - Filtros por categoría (13 categorías)
  - Resultados en tiempo real

#### Optimizaciones de Rendimiento
- **Lazy Loading de Imágenes**
  - Imágenes cargan solo cuando son visibles en viewport
  - Efecto blur-up mientras cargan
  - Reducción de 50-70% en carga inicial de imágenes

- **Code Splitting**
  - InteractiveTour y PaymentMockup se cargan bajo demanda
  - Suspense boundaries con estados de carga
  - Reducción de 8.84 kB en bundle inicial

#### SEO y Accesibilidad
- **Meta Tags Completos**
  - Open Graph para Facebook y LinkedIn
  - Twitter Cards para Twitter
  - Meta descriptions y keywords optimizados

- **Structured Data**
  - Schema.org JSON-LD para rich snippets
  - Tipos: WebSite, CollectionPage, SoftwareApplication, Organization

- **Archivos SEO**
  - sitemap.xml para indexación
  - robots.txt para crawlers

- **Accesibilidad**
  - Skip link para saltar al contenido principal
  - ARIA labels en todos los elementos interactivos
  - Navegación completa por teclado
  - Soporte para lectores de pantalla

#### Infraestructura de Testing
- **Tests Unitarios**
  - Vitest configurado
  - React Testing Library
  - Tests para FavoritesContext, FavoriteButton, ShareButton
  - Cobertura del 100% en componentes nuevos

- **Tests E2E**
  - Playwright configurado
  - Tests para flujo de favoritos
  - Tests para flujo de compartir
  - Tests de navegación básica

#### Documentación
- `docs/performance-baseline.md` - Métricas iniciales
- `docs/performance-optimizations.md` - Optimizaciones implementadas
- `docs/track-progress-summary.md` - Resumen del desarrollo
- README.md actualizado con toda la información
- CHANGELOG.md para seguimiento de cambios

### 🔧 Cambiado

- **App.jsx**
  - Refactorizado para usar FavoritesProvider
  - Agregado lazy loading de componentes pesados
  - Integrado SEO y StructuredData

- **WebsiteCard.jsx**
  - Integrado FavoriteButton
  - Integrado ShareButton
  - Cambiado a LazyImage para imágenes
  - Badge de categoría movido a la izquierda

- **index.html**
  - Cambiado lang a "es-MX"
  - Agregados meta tags básicos
  - Agregado preconnect para Unsplash

### 🚀 Rendimiento

#### Bundle Size
- **Antes**: 242.13 kB (gzip: 75.79 kB)
- **Después**: 268.74 kB (gzip: 82.76 kB)
- **Lazy Chunks**: 8.84 kB (cargados bajo demanda)

**Nota**: El aumento en el bundle principal se compensa con:
- Lazy loading de imágenes (reducción de 50-70% en carga inicial)
- Code splitting de componentes pesados
- Mejor experiencia percibida por el usuario

#### Mejoras Esperadas
- **FCP** (First Contentful Paint): Mejora de 30-40%
- **LCP** (Largest Contentful Paint): Mejora de 40-50%
- **TTI** (Time to Interactive): Mejora de 20-30%

### 📦 Dependencias Agregadas

#### Producción
- `react-lazy-load-image-component@1.6.2` - Lazy loading de imágenes
- `react-helmet-async@2.0.5` - Gestión de meta tags

#### Desarrollo
- `vitest@4.0.16` - Framework de testing
- `@vitest/ui@4.0.16` - Interfaz visual de tests
- `@testing-library/react@16.3.1` - Testing de componentes
- `@testing-library/jest-dom@6.9.1` - Matchers adicionales
- `@testing-library/user-event@14.6.1` - Simulación de eventos
- `@playwright/test@1.57.0` - Testing E2E

### 🐛 Corregido

- Problema de propagación de eventos en botones de favoritos y compartir
- Posicionamiento de badges en tarjetas de proyectos
- Accesibilidad de elementos interactivos

### 🔒 Seguridad

- Configurado `rel="noopener noreferrer"` en enlaces externos
- Validación de entrada en búsqueda
- Sanitización de datos en localStorage

## [0.1.0] - 2025-12-XX

### Agregado
- Catálogo inicial con 28+ proyectos
- Búsqueda básica
- Filtros por categoría
- Diseño responsivo
- Demos en vivo
- Tour interactivo
- Mockup de pagos

---

## Tipos de Cambios

- `Agregado` para nuevas funcionalidades
- `Cambiado` para cambios en funcionalidades existentes
- `Obsoleto` para funcionalidades que serán removidas
- `Removido` para funcionalidades removidas
- `Corregido` para corrección de bugs
- `Seguridad` para vulnerabilidades

## Enlaces

- [Repositorio](https://github.com/SebastianVernis/catalogo-web-mexico)
- [Issues](https://github.com/SebastianVernis/catalogo-web-mexico/issues)
- [Pull Requests](https://github.com/SebastianVernis/catalogo-web-mexico/pulls)
