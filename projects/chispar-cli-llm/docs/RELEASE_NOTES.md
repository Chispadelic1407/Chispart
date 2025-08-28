# 📦 Release Notes — feature/interactive-shell-and-docs

Fecha: 2025-08-28

## Nuevas Funcionalidades

- 💬 Modo Interactivo con Shell Seguro
  - `!<cmd>`: ejecutar comandos del sistema con validación de seguridad y timeout.
  - `!!`: re‑ejecutar último comando.
  - `!? <texto|/regex/i>`: ejecutar última coincidencia (substring o regex con flag `i`).
  - `!run <n>`: ejecutar el n‑ésimo del historial.
  - `history [-n N] [filtro|/regex/i]`: mostrar historial (filtrado opcional y límite).
  - `history -c`: limpiar historial.
  - `pwd` / `cd <ruta>`: directorio de trabajo de comandos.
  - `set timeout <s>` / `set outmax <chars>` / `set histmax <n>`.

- 🔍 Análisis de Directorios Enriquecido
  - Prioriza documentación: `README*`, `docs/`, `CHANGELOG`, `CONTRIBUTING`, `*.md/*.rst`.
  - Lee fragmentos reales (snippets) de archivos con límites seguros (hasta 15 archivos, 20k chars totales, 2k por archivo).
  - Prompt enriquecido incluye secciones “Documentación Detectada” y “Fragmentos de Archivos”.
  - Consola muestra paneles de “Documentación (Prioritaria)” y “Muestreo de Contenido”.

## Cambios en Documentación

- `README.md` actualizado con:
  - Sección de shell en el chat interactivo.
  - Notas del análisis de directorios mejorado y enlace a la guía.
- `docs/DIRECTORY_ANALYSIS_GUIDE.md`:
  - Añadidas secciones de prioridad de documentación y snippets.
  - Flujo de análisis actualizado con muestreo de contenido.
- `ui/interactive_tutorial.py`:
  - Nueva sección “Integración con Chat Interactivo y Shell”.

## Consideraciones de Seguridad

- Whitelist/blacklist y patrones peligrosos para comandos.
- Confirmación para acciones sensibles (rm, mv, chmod, git push, docker run).
- Timeout configurable y truncado de salida con indicador `[truncado]`.

## Notas de Implementación

- No se agregaron dependencias nuevas.
- Suite de tests: 106 en verde.

