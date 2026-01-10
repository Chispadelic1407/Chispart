#!/bin/bash

# Script de deployment para Catálogo Frontend
# Ejecutar como: sudo bash deploy.sh

set -e

echo "🚀 Iniciando deployment del Catálogo Frontend..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar que se ejecuta como root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}❌ Este script debe ejecutarse con sudo${NC}"
    echo "Uso: sudo bash deploy.sh"
    exit 1
fi

echo -e "${YELLOW}📋 Paso 1: Backup de configuración anterior...${NC}"
if [ -f /etc/nginx/sites-enabled/manda2 ]; then
    mv /etc/nginx/sites-enabled/manda2 /etc/nginx/sites-enabled/manda2.backup
    echo "✅ Configuración anterior respaldada"
fi

echo -e "${YELLOW}📋 Paso 2: Copiando nueva configuración...${NC}"
cp /tmp/catalogo-frontend.nginx /etc/nginx/sites-available/catalogo-frontend
echo "✅ Configuración copiada"

echo -e "${YELLOW}📋 Paso 3: Habilitando el sitio...${NC}"
ln -sf /etc/nginx/sites-available/catalogo-frontend /etc/nginx/sites-enabled/catalogo-frontend
echo "✅ Sitio habilitado"

echo -e "${YELLOW}📋 Paso 4: Verificando configuración de nginx...${NC}"
if nginx -t; then
    echo -e "${GREEN}✅ Configuración de nginx válida${NC}"
else
    echo -e "${RED}❌ Error en la configuración de nginx${NC}"
    echo "Restaurando configuración anterior..."
    rm -f /etc/nginx/sites-enabled/catalogo-frontend
    if [ -f /etc/nginx/sites-enabled/manda2.backup ]; then
        mv /etc/nginx/sites-enabled/manda2.backup /etc/nginx/sites-enabled/manda2
    fi
    exit 1
fi

echo -e "${YELLOW}📋 Paso 5: Recargando nginx...${NC}"
systemctl reload nginx
echo "✅ Nginx recargado"

echo -e "${YELLOW}📋 Paso 6: Verificando estado de nginx...${NC}"
if systemctl is-active --quiet nginx; then
    echo -e "${GREEN}✅ Nginx está corriendo correctamente${NC}"
else
    echo -e "${RED}❌ Nginx no está corriendo${NC}"
    systemctl status nginx
    exit 1
fi

echo ""
echo -e "${GREEN}🎉 ¡Deployment completado exitosamente!${NC}"
echo ""
echo "📊 Estado de servicios:"
echo "  - Nginx: $(systemctl is-active nginx)"
echo "  - Frontend Server: Corriendo en puerto 5555 (PM2)"
echo ""
echo "🌐 Acceso:"
echo "  - URL Principal: http://$(curl -s ifconfig.me)/"
echo "  - Demos: http://$(curl -s ifconfig.me)/demos/"
echo ""
echo "📝 Para ver logs:"
echo "  - Nginx: sudo tail -f /var/log/nginx/access.log"
echo "  - Frontend: pm2 logs catalogo-frontend"
echo ""
