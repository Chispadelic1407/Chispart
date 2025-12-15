# 📖 Instrucciones de Uso - WebCatalog MX

## 🚀 Inicio Rápido

### 1. Iniciar el Proyecto

```bash
cd catalogo-web-mexico
npm install
npm run dev
```

Abre tu navegador en: **http://localhost:5173**

---

## 🎯 Funcionalidades Principales

### 1. Tour Interactivo

**Primera Visita:**
- El tour se iniciará automáticamente después de 1 segundo
- Te guiará por las 6 funcionalidades principales
- Puedes saltarlo haciendo clic en "Saltar Tour"

**Reiniciar el Tour:**
- Haz clic en el botón **"🎯 Tour Guiado"** en el header
- O borra el localStorage del navegador

**Navegación del Tour:**
- **Siguiente →** - Avanza al siguiente paso
- **← Anterior** - Regresa al paso anterior
- **Saltar Tour** - Cierra el tour
- **✕** - Cierra el tour

---

### 2. Búsqueda de Servicios

**Cómo Buscar:**
1. Haz clic en la barra de búsqueda
2. Escribe cualquier término (ej: "chatbot", "e-commerce", "IA")
3. Los resultados se filtran en tiempo real

**La búsqueda funciona en:**
- Títulos de servicios
- Descripciones
- Categorías
- Características

**Ejemplo:**
```
Buscar: "inteligencia artificial"
Resultado: 8 servicios de IA
```

---

### 3. Filtros por Categoría

**Categorías Disponibles:**
1. Todos (28 servicios)
2. E-commerce (3 servicios)
3. Landing Page (1 servicio)
4. Sistema Web (4 servicios)
5. Blog/Contenido (2 servicios)
6. Portafolio (1 servicio)
7. Sitio Corporativo (2 servicios)
8. Educación (1 servicio)
9. Inmobiliaria (1 servicio)
10. Fitness/Salud (1 servicio)
11. Eventos (1 servicio)
12. Salud (1 servicio)
13. Catálogo (1 servicio)
14. Gobierno (1 servicio)
15. **Inteligencia Artificial (8 servicios)** ⭐ NUEVO

**Cómo Filtrar:**
1. Haz clic en cualquier botón de categoría
2. Los servicios se filtran automáticamente
3. El contador se actualiza
4. Haz clic en "Todos" para ver todos los servicios

**Combinar Búsqueda + Filtro:**
- Selecciona una categoría
- Luego escribe en la búsqueda
- Ambos filtros se aplican simultáneamente

---

### 4. Tarjetas de Servicio

**Vista Colapsada (Por Defecto):**
- Imagen del servicio
- Título
- Descripción breve
- Precio
- Badge de categoría
- Botón "Ver más detalles"

**Vista Expandida (Al hacer clic):**
- Todo lo anterior +
- Lista de características con checkmarks
- Tags de tecnologías
- **Botón "💰 Solicitar Cotización"** (dorado)
- Botón "Ver menos"

**Cómo Expandir:**
1. Haz clic en cualquier parte de la tarjeta
2. La tarjeta se expande con animación
3. Haz clic nuevamente para colapsar

---

### 5. Solicitar Cotización (Mockup)

**Paso 1: Información del Cliente**

Completa el formulario:
- **Nombre Completo** * (requerido)
- **Correo Electrónico** * (requerido)
- **Teléfono** * (requerido)
- **Empresa** (opcional)
- **Mensaje/Requerimientos** (opcional)

Haz clic en **"Continuar →"**

**Paso 2: Método de Pago (Mockup)**

Selecciona un método:
- **Stripe** - Tarjeta de crédito/débito
- **PayPal** - Cuenta PayPal
- **MercadoPago** - Múltiples opciones

⚠️ **IMPORTANTE:** Los campos de tarjeta están deshabilitados. Esto es una demostración.

Haz clic en **"Enviar Solicitud"**

**Paso 3: Confirmación**

- ✓ Mensaje de éxito
- Resumen de tus datos
- Método de pago seleccionado
- Recordatorio de que es mockup

Haz clic en **"Cerrar"**

**Cerrar el Modal:**
- Haz clic en la **✕** (esquina superior derecha)
- Haz clic fuera del modal (área oscura)
- Presiona **ESC** (teclado)

---

## 🎨 Servicios de Inteligencia Artificial

### Nuevos Servicios Agregados

1. **Chatbot Inteligente con IA**
   - Precio: $35,000 - $65,000 MXN
   - Tecnologías: OpenAI GPT, Gemini AI, Node.js, WebSocket

2. **Generador de Contenido con IA**
   - Precio: $28,000 - $50,000 MXN
   - Tecnologías: OpenAI API, Claude AI, React, Python

3. **Análisis de Sentimientos en Redes**
   - Precio: $40,000 - $75,000 MXN
   - Tecnologías: Python, TensorFlow, NLP, React Dashboard

4. **Reconocimiento de Imágenes IA**
   - Precio: $45,000 - $80,000 MXN
   - Tecnologías: TensorFlow, OpenCV, Python, Google Vision AI

5. **Asistente Virtual Personalizado**
   - Precio: $50,000 - $90,000 MXN
   - Tecnologías: Gemini AI, Speech-to-Text, Node.js, WebRTC

6. **Traductor Automático Multilingüe**
   - Precio: $32,000 - $58,000 MXN
   - Tecnologías: Google Translate AI, DeepL API, React, Python

7. **Generador de Imágenes con IA**
   - Precio: $38,000 - $70,000 MXN
   - Tecnologías: DALL-E, Stable Diffusion, Midjourney API, React

8. **Análisis Predictivo con Machine Learning**
   - Precio: $60,000 - $120,000 MXN
   - Tecnologías: Python, Scikit-learn, TensorFlow, React Dashboard

---

## 📱 Uso en Dispositivos Móviles

### Responsive Design

El sitio se adapta automáticamente a:
- **Desktop** (>768px) - Grid de 3 columnas
- **Tablet** (480-768px) - Grid de 2 columnas
- **Mobile** (<480px) - Grid de 1 columna

### Tour en Móvil

- El tooltip se posiciona en la parte inferior
- Los pasos se muestran verticalmente
- Los botones ocupan todo el ancho

### Modal de Pago en Móvil

- Ocupa el 95% de la pantalla
- Formulario adaptado
- Botones en columna

---

## 🔧 Personalización

### Agregar Nuevos Servicios

Edita `src/data/websites.js`:

```javascript
{
  id: 29,
  title: "Nuevo Servicio",
  description: "Descripción del servicio",
  category: "Categoría Existente",
  price: "$X,XXX - $X,XXX MXN",
  features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
  image: "URL de imagen 800x600px",
  technologies: ["Tech1", "Tech2", "Tech3"]
}
```

### Agregar Nueva Categoría

1. Agrega la categoría en `src/data/websites.js`:
```javascript
export const categories = [
  "Todos",
  // ... categorías existentes
  "Nueva Categoría"
];
```

2. Asigna servicios a la nueva categoría

### Cambiar Colores

Edita los archivos CSS:
- **Primario**: Busca `#667eea` y reemplaza
- **Secundario**: Busca `#764ba2` y reemplaza
- **Acento**: Busca `#ffd700` y reemplaza

### Personalizar Tour

Edita `src/components/InteractiveTour.jsx`:

```javascript
const steps = [
  {
    target: '.selector-css',
    title: 'Título del Paso',
    content: 'Descripción del paso',
    position: 'bottom' // o 'top'
  },
  // ... más pasos
];
```

---

## 📊 Registro de Multimedia

### Consultar Assets

Abre `REGISTRO_MULTIMEDIA.md` para ver:
- Lista completa de 30 assets
- Especificaciones detalladas
- Dimensiones y formatos
- Estado actual

### Actualizar Imágenes

1. Crea/obtén la imagen según especificaciones
2. Optimiza para web (máx 200KB)
3. Sube a CDN o carpeta `public/`
4. Actualiza URL en `src/data/websites.js`
5. Actualiza estado en `REGISTRO_MULTIMEDIA.md`

### Especificaciones Estándar

- **Servicios**: 800x600px, JPG/PNG, máx 200KB
- **Logo**: 200x60px, SVG/PNG, máx 50KB
- **Favicon**: 32x32px, ICO/PNG, máx 10KB

---

## 🐛 Solución de Problemas

### El tour no se inicia automáticamente

**Solución:**
```javascript
// Abre la consola del navegador y ejecuta:
localStorage.removeItem('tourCompleted');
// Recarga la página
```

### Los filtros no funcionan

**Verificar:**
1. Que la categoría exista en `categories`
2. Que los servicios tengan la categoría correcta
3. Recargar la página

### El modal de pago no se abre

**Verificar:**
1. Que la tarjeta esté expandida
2. Hacer clic directamente en el botón dorado
3. Revisar consola por errores

### Imágenes no cargan

**Verificar:**
1. URLs de Unsplash correctas
2. Conexión a internet
3. Parámetros de URL: `?w=800&h=600&fit=crop`

---

## 📚 Documentación Adicional

### Archivos de Documentación

1. **README.md** - Documentación técnica completa
2. **QUICK_START.md** - Guía de inicio rápido
3. **PROYECTO_INFO.md** - Información detallada del proyecto
4. **REGISTRO_MULTIMEDIA.md** - Registro de assets multimedia
5. **IMPLEMENTACION_COMPLETADA.md** - Resumen de implementación
6. **INSTRUCCIONES_USO.md** - Este archivo

### Estructura del Proyecto

```
catalogo-web-mexico/
├── src/
│   ├── components/
│   │   ├── Header.jsx + .css
│   │   ├── SearchBar.jsx + .css
│   │   ├── Filter.jsx + .css
│   │   ├── WebsiteCard.jsx + .css
│   │   ├── Catalog.jsx + .css
│   │   ├── InteractiveTour.jsx + .css
│   │   └── PaymentMockup.jsx + .css
│   ├── data/
│   │   ├── websites.js
│   │   └── mediaAssets.js
│   ├── App.jsx + .css
│   └── index.css
├── public/
├── REGISTRO_MULTIMEDIA.md
├── IMPLEMENTACION_COMPLETADA.md
├── INSTRUCCIONES_USO.md
└── package.json
```

---

## 💡 Consejos de Uso

### Para Presentaciones

1. Inicia el tour para mostrar funcionalidades
2. Filtra por "Inteligencia Artificial" para destacar lo nuevo
3. Expande una tarjeta y muestra el botón de cotización
4. Abre el modal de pago para mostrar el proceso

### Para Desarrollo

1. Usa `npm run dev` para desarrollo
2. Los cambios se reflejan automáticamente (HMR)
3. Revisa la consola por errores
4. Usa React DevTools para debugging

### Para Producción

1. Ejecuta `npm run build`
2. Prueba con `npm run preview`
3. Verifica que no haya errores
4. Deploy a Vercel, Netlify o GitHub Pages

---

## 🎓 Recursos de Aprendizaje

### React
- [Documentación Oficial de React](https://react.dev)
- [React Hooks](https://react.dev/reference/react)

### Vite
- [Documentación de Vite](https://vitejs.dev)

### CSS
- [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

---

## 📞 Soporte

Si tienes preguntas o necesitas ayuda:

1. Revisa la documentación completa
2. Consulta `IMPLEMENTACION_COMPLETADA.md`
3. Revisa el código de los componentes
4. Busca en la consola del navegador

---

## ✅ Checklist de Verificación

Antes de usar en producción:

- [ ] Todas las imágenes optimizadas
- [ ] Información de contacto actualizada
- [ ] Precios actualizados
- [ ] Servicios revisados
- [ ] Tour probado
- [ ] Modal de pago probado
- [ ] Búsqueda probada
- [ ] Filtros probados
- [ ] Responsive probado
- [ ] Build exitoso
- [ ] Sin errores en consola

---

**¡Disfruta de WebCatalog MX!** 🎉

Para más información, consulta los demás archivos de documentación.
