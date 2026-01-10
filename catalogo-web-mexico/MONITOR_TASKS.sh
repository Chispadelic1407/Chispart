#!/bin/bash

# Script para monitorear el progreso de las tareas de Remote Code

echo "╔═════════════════════════════════════════════╗"
echo "║  📊 Monitor de Tareas Remote Code          ║"
echo "╚═════════════════════════════════════════════╝"
echo ""

# IDs de las tareas
TASKS=(
  "y4KGHgr0IfHt"
  "e_-9KFIGb34y"
  "H3JrH3P7s7Vj"
  "9bixTeBqiG9h"
  "5lLTqPWn037b"
  "VjW_TMW7yFYh"
  "BLs40M3bnocq"
)

NAMES=(
  "SAAS-DND"
  "CHISPART-APP"
  "DefiendeteMX"
  "EDIFNUEV"
  "AI & ML Demos"
  "E-commerce"
  "Servicios"
)

echo "🔄 Verificando estado de 7 tareas..."
echo ""

for i in "${!TASKS[@]}"; do
  echo "[$((i+1))/7] ${NAMES[$i]}: ${TASKS[$i]}"
done

echo ""
echo "📝 Para ver el estado de todas las tareas:"
echo "   Ver consola de Remote Code o ejecutar mcp_remote-code_my_tasks"
echo ""
echo "🔗 URLs de Acceso:"
echo "   Catálogo: http://YOUR_PUBLIC_IP:5555/"
echo "   Demos: http://YOUR_PUBLIC_IP:5555/demos/"
echo ""
echo "⏱️  Tiempo estimado de completación: ~6-7 horas"
echo ""
