# 🌐 Guía de Acceso a Demos - Catálogo Web

## 📍 URL Base Temporal (Antes de Nginx)

**Acceso actual al catálogo:**
```
http://YOUR_PUBLIC_IP:5555/
```

**Acceso a demos individuales:**
```
http://YOUR_PUBLIC_IP:5555/demos/[nombre-demo]/index.html
```

---

## ✅ Demos Ahora Visibles en el Catálogo

Después del rebuild, **todos los 31 items del catálogo** ahora tienen botones de "🎨 Ver Demo" que funcionan correctamente.

### Cómo Verlos:

1. **Abre el catálogo:**
   ```
   http://YOUR_PUBLIC_IP:5555/
   ```

2. **Navega por las categorías:**
   - Todos
   - Mis Proyectos
   - E-commerce
   - Landing Page
   - Sistema Web
   - Blog/Contenido
   - Portafolio
   - Sitio Corporativo
   - Inmobiliaria
   - Fitness/Salud
   - Eventos
   - Catálogo
   - Inteligencia Artificial
   - Y más...

3. **Haz clic en cualquier tarjeta** para expandirla

4. **Verás los botones:**
   - 🎨 **Ver Demo** - Para proyectos personales y items de catálogo
   - 📂 **GitHub** - Para proyectos con repositorio
   - 🚀 **Sitio en Vivo** - Para proyectos deployados
   - 💰 **Solicitar Cotización** - Para items de catálogo

---

## 📂 Acceso Directo a Demos (URLs Completas)

### Proyectos Personales
```
http://YOUR_PUBLIC_IP:5555/demos/defiendetemx/index.html
http://YOUR_PUBLIC_IP:5555/demos/mascotopia/index.html
http://YOUR_PUBLIC_IP:5555/demos/chispart-app/index.html
http://YOUR_PUBLIC_IP:5555/demos/saas-dnd/index.html
http://YOUR_PUBLIC_IP:5555/demos/nova-legis-ai/index.html
http://YOUR_PUBLIC_IP:5555/demos/manda2/index.html
http://YOUR_PUBLIC_IP:5555/demos/tarot-app/index.html
http://YOUR_PUBLIC_IP:5555/demos/escuela-idiomas/index.html
http://YOUR_PUBLIC_IP:5555/demos/facturacion-template/index.html
http://YOUR_PUBLIC_IP:5555/demos/chispart-cli/index.html
http://YOUR_PUBLIC_IP:5555/demos/drag-n-drop/index.html
http://YOUR_PUBLIC_IP:5555/demos/celula-chatbot-ia/index.html
http://YOUR_PUBLIC_IP:5555/demos/crm-twilio/index.html
http://YOUR_PUBLIC_IP:5555/demos/cv-chispart/index.html
http://YOUR_PUBLIC_IP:5555/demos/plantilla-eshop/index.html
```

### Demos de Catálogo
```
http://YOUR_PUBLIC_IP:5555/demos/e-commerce-completo/index.html
http://YOUR_PUBLIC_IP:5555/demos/landing-corporativa/index.html
http://YOUR_PUBLIC_IP:5555/demos/portal-reservaciones/index.html
http://YOUR_PUBLIC_IP:5555/demos/blog-corporativo/index.html
http://YOUR_PUBLIC_IP:5555/demos/portafolio-creativo/index.html
http://YOUR_PUBLIC_IP:5555/demos/dashboard-analitico/index.html
http://YOUR_PUBLIC_IP:5555/demos/restaurante/index.html
http://YOUR_PUBLIC_IP:5555/demos/marketplace-local/index.html
http://YOUR_PUBLIC_IP:5555/demos/portal-inmobiliario/index.html
http://YOUR_PUBLIC_IP:5555/demos/app-gimnasio/index.html
http://YOUR_PUBLIC_IP:5555/demos/sistema-tickets/index.html
http://YOUR_PUBLIC_IP:5555/demos/portal-eventos/index.html
http://YOUR_PUBLIC_IP:5555/demos/clinica-medica/index.html
http://YOUR_PUBLIC_IP:5555/demos/catalogo-digital/index.html
http://YOUR_PUBLIC_IP:5555/demos/portal-noticias/index.html
http://YOUR_PUBLIC_IP:5555/demos/despacho-legal/index.html
http://YOUR_PUBLIC_IP:5555/demos/portal-gubernamental/index.html
http://YOUR_PUBLIC_IP:5555/demos/generador-contenido-ia/index.html
http://YOUR_PUBLIC_IP:5555/demos/analisis-sentimientos/index.html
http://YOUR_PUBLIC_IP:5555/demos/reconocimiento-imagenes/index.html
http://YOUR_PUBLIC_IP:5555/demos/asistente-virtual/index.html
http://YOUR_PUBLIC_IP:5555/demos/traductor-multilingue/index.html
http://YOUR_PUBLIC_IP:5555/demos/generador-imagenes-ia/index.html
http://YOUR_PUBLIC_IP:5555/demos/analisis-predictivo/index.html
```

---

## 🚀 Después de Activar Nginx (Puerto 80)

Una vez que ejecutes `sudo bash deploy.sh`, las URLs serán más simples:

### Catálogo Principal
```
http://YOUR_PUBLIC_IP/
```

### Demos
```
http://YOUR_PUBLIC_IP/demos/defiendetemx/index.html
http://YOUR_PUBLIC_IP/demos/e-commerce-completo/index.html
http://YOUR_PUBLIC_IP/demos/dashboard-analitico/index.html
... (y así sucesivamente, sin :5555)
```

---

## ✅ Verificación

### Check 1: Servidor Corriendo
```bash
pm2 status catalogo-frontend
```
**Esperado:** Estado "online" 🟢

### Check 2: Demos Disponibles
```bash
ls -1 dist/demos/ | wc -l
```
**Esperado:** 40 demos

### Check 3: Build Actualizado
```bash
ls -lh dist/index.html
```
**Esperado:** Archivo reciente

---

## 🎯 Estado Actual

```
✅ 40 demos creados
✅ 31 items con demoUrl configurado
✅ Build actualizado (1.51s)
✅ Servidor reiniciado
✅ Frontend accesible en :5555
⚠️  Nginx pendiente para puerto 80
```

---

## 📝 Siguiente Paso

Para hacer el catálogo accesible sin especificar puerto:

```bash
cd /home/admin/Chispart/catalogo-web-mexico
sudo bash deploy.sh
```

Esto configurará nginx como proxy reverso y el catálogo estará en:
```
http://YOUR_PUBLIC_IP/
```

---

**Última actualización:** 23 de Diciembre, 2024 - 22:20 hrs
