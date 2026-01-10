# 🚀 Instrucciones de Deployment - Catálogo Frontend

## ✅ Estado Actual

- ✅ Frontend construido exitosamente (`npm run build`)
- ✅ Servidor Node.js corriendo en puerto 5555 con PM2
- ✅ Configuración de nginx creada en `/tmp/catalogo-frontend.nginx`
- ⚠️ Falta: Habilitar nginx como proxy reverso

## 📋 Pasos para Completar el Deployment

### 1. Desactivar configuración anterior de nginx (si existe)

```bash
sudo rm /etc/nginx/sites-enabled/manda2
```

### 2. Copiar la nueva configuración

```bash
sudo cp /tmp/catalogo-frontend.nginx /etc/nginx/sites-available/catalogo-frontend
```

### 3. Habilitar el sitio

```bash
sudo ln -s /etc/nginx/sites-available/catalogo-frontend /etc/nginx/sites-enabled/catalogo-frontend
```

### 4. Verificar la configuración de nginx

```bash
sudo nginx -t
```

### 5. Recargar nginx

```bash
sudo systemctl reload nginx
```

O si necesitas reiniciar:

```bash
sudo systemctl restart nginx
```

### 6. Verificar el estado

```bash
sudo systemctl status nginx
```

## 🌐 Acceso

Después de completar estos pasos, el catálogo estará accesible en:

- **URL Principal:** `http://YOUR_PUBLIC_IP/`
- **Demos:** `http://YOUR_PUBLIC_IP/demos/`

Ejemplos de demos:
- `http://YOUR_PUBLIC_IP/demos/defiendetemx/index.html`
- `http://YOUR_PUBLIC_IP/demos/mascotopia/index.html`
- `http://YOUR_PUBLIC_IP/demos/chispart-app/index.html`
- `http://YOUR_PUBLIC_IP/demos/saas-dnd/index.html`
- `http://YOUR_PUBLIC_IP/demos/nova-legis-ai/index.html`

## 🔧 Troubleshooting

### Si nginx no inicia:

```bash
# Ver logs de error
sudo tail -f /var/log/nginx/error.log

# Ver logs de acceso
sudo tail -f /var/log/nginx/access.log
```

### Si el frontend no carga:

```bash
# Verificar que el servidor Node.js esté corriendo
pm2 list

# Ver logs del frontend
pm2 logs catalogo-frontend

# Reiniciar el frontend si es necesario
pm2 restart catalogo-frontend
```

### Si hay conflicto de puertos:

```bash
# Ver qué está usando el puerto 80
sudo lsof -i :80

# O usar netstat
sudo netstat -tulpn | grep :80
```

## 📊 Configuración Actual

- **Frontend Server:** Express.js en puerto 5555
- **Proxy:** Nginx en puerto 80
- **Process Manager:** PM2
- **Features:** 
  - ✅ 5 demos de proyectos
  - ✅ Catálogo completo de sitios web
  - ✅ Filtros por categoría
  - ✅ Sistema de cotización
  - ✅ Diseño responsivo

## 🔐 Seguridad

La configuración incluye:
- Headers de seguridad (X-Frame-Options, X-XSS-Protection, etc.)
- Compresión GZIP
- Cache de assets estáticos
- Timeouts configurados

## 📝 Notas Adicionales

- El servidor frontend se reinicia automáticamente con PM2 si falla
- Los logs se guardan en `/home/admin/.pm2/logs/`
- Para ver el status en tiempo real: `pm2 monit`

---

**Estado:** ✅ Listo para deployment final  
**Última actualización:** 23 de Diciembre, 2024
