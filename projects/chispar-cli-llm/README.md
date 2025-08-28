# 🚀 Chispart Dev Agent v3.0

<p align="center">
  <img src="https://img.shields.io/badge/version-3.0.0-blue?style=for-the-badge&logo=git&logoColor=white" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge&logo=open-source-initiative&logoColor=white" alt="License">
  <img src="https://img.shields.io/badge/python-3.8+-blue?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/status-production-success?style=for-the-badge&logo=statuspage&logoColor=white" alt="Status">
</p>

<p align="center">
  <strong>🤖 Agente de Desarrollo con IA Híbrida</strong><br>
  <em>100+ Modelos de IA • Gestión de Equipos • Ejecución Segura • Asistencia ATC</em>
</p>

---

## ✨ Características Principales

- 🤖 **100+ Modelos de IA**: Acceso a Chispart, Qwen, Gemini, Codestral
- 👥 **Gestión de Equipos**: Crea y administra equipos de desarrollo
- ⚡ **Ejecución Segura**: Sistema de comandos con validación de seguridad
- 🆘 **Asistencia ATC**: Agente de soporte técnico interactivo
- 🎯 **Perfiles Especializados**: 7 tipos de desarrolladores especializados
- 🛡️ **Sistema de Seguridad**: Whitelist y blacklist de comandos
- 📱 **Optimizado para Móviles**: Soporte completo para Termux/Android
 - 📂 **Análisis de Directorios Mejorado**: Prioriza documentación y lee fragmentos reales de archivos
 - 🖥️ **Shell en Chat Interactivo**: Ejecuta comandos con `!`, historial, búsqueda y regex

## 🚀 Instalación Rápida

### Instalación con Un Comando (Recomendado)

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/chispar-cli-llm.git
cd chispar-cli-llm

# Instalar con playground automático
./install-enhanced.sh
```

### Instalación Manual

```bash
# Instalar dependencias
pip install -r requirements.txt

# Hacer ejecutables los scripts
chmod +x chispart chs install.sh install-enhanced.sh

# Configurar APIs
./chispart config

# Iniciar playground de aprendizaje
python3 chispart_dev_agent_v3.py playground
```

## 📋 Comandos Principales

### 🤖 Chat con IA
```bash
# Chat básico
./chispart chat "Explícame Python"
./chs chat "¿Cómo funciona Docker?"

# Chat con API específica
./chispart chat "Hola" --api qwen
./chispart chat "Código React" --api codestral

# Chat con perfil especializado
./chispart chat "Optimizar base de datos" --perfil backend
```

### ⚡ Ejecución de Comandos
```bash
# Ejecutar comando seguro
./chispart execute "ls -la"
./chispart execute "git status" --safe

# Ejecutar con confirmación
./chispart execute "npm install" --confirm
```

### 👥 Gestión de Equipos
```bash
# Listar equipos
./chispart equipos

# Crear equipo interactivo
./chispart equipos --crear

# Trabajar con equipo específico
./chispart equipos --equipo "mi-proyecto"
```

### 🆘 Asistencia Técnica
```bash
# Diagnóstico automático
./chispart atc

# Modo interactivo
./chispart atc --interactivo

# Ayuda específica
./chispart atc --problema "error-python"
```

### 📊 Información del Sistema
```bash
# Ver información completa
./chispart version

# Listar modelos disponibles
./chispart modelos

# Ver ayuda completa
./chispart ayuda
```

### 🎮 Playground Interactivo
```bash
# Iniciar tutorial interactivo completo
./chispart playground

# O usando Python directamente
python3 chispart_dev_agent_v3.py playground
```

### 💬 Modo Interactivo con Comandos de Sistema

Dentro de `chispart-dev interactivo` puedes usar comandos de shell de forma segura:

```text
!<cmd>           # Ejecuta un comando (seguridad + timeout)
!!               # Re-ejecuta el último comando
!? <txt|/re/i>   # Ejecuta la última coincidencia (substring o regex con flag i)
!run <n>         # Ejecuta el n-ésimo comando del historial
history [-n N] [filtro|/re/i]  # Muestra historial, opcionalmente filtrado
history -c       # Limpia historial de comandos
pwd              # Muestra directorio de trabajo de comandos
cd <ruta>        # Cambia directorio de trabajo
set timeout <s>  # Cambia timeout (1–600)
set outmax <ch>  # Límite de salida (100–200000)
set histmax <n>  # Tamaño máximo de historial (10–2000)
```

Notas de seguridad:
- Validación por whitelist/blacklist y patrones peligrosos.
- Confirmación para acciones sensibles (`rm`, `mv`, `chmod`, `git push`, `docker run`).
- Salida truncada según `outmax` con indicación `[truncado]`.

## 🏗️ Estructura del Proyecto

```
chispar-cli-llm/
├── 📄 README.md                    # Este archivo
├── 📄 requirements.txt             # Dependencias Python
├── 🔧 install.sh                   # Instalador principal
├── ⚡ chispart                      # Script de ejecución principal
├── ⚡ chs                           # Script de ejecución corto
├── 🐍 chispart_dev_agent_v3.py     # Aplicación principal
├── ⚙️ config_extended.py           # Configuración de APIs
├── 📁 core/                        # Módulos principales
│   ├── team_manager.py             # Gestión de equipos
│   ├── atc_agent.py                # Agente ATC
│   ├── security_manager.py         # Sistema de seguridad
│   ├── dev_profiles.py             # Perfiles especializados
│   └── ...
├── 📁 docs/                        # Documentación
│   └── CHISPART_DEV_AGENT_V3_COMPLETADO.md
├── 📁 scripts/                     # Scripts de instalación
├── 📁 archive/                     # Archivos obsoletos
└── 📁 logs/                        # Archivos de log
```

## 🤖 APIs Soportadas

| API | Modelos | Especialidad |
|-----|---------|--------------|
| **Chispart** | 60+ modelos | General, Código, Análisis |
| **Qwen AI** | 13 modelos | Multilingüe, Razonamiento |
| **Google Gemini** | 8 modelos | Multimodal, Análisis |
| **Mistral Codestral** | 5 modelos | Programación, Código |

## 👥 Perfiles de Desarrollador

- 🎨 **Frontend**: React, Vue, Angular, UI/UX
- ⚙️ **Backend**: APIs, Bases de datos, Microservicios
- 📱 **Mobile**: React Native, Flutter, iOS, Android
- 🤖 **DevOps**: Docker, Kubernetes, CI/CD, Cloud
- 🔒 **Security**: Pentesting, Auditorías, Compliance
- 📊 **Data**: ML, Analytics, Big Data, ETL
- 🏗️ **Architect**: Diseño de sistemas, Patrones, Escalabilidad

## ⚙️ Configuración

### Configurar APIs

```bash
# Configuración interactiva
./chispart config

# O editar manualmente .env
nano .env
```

### Variables de Entorno

```bash
# APIs principales
CHISPART_API_KEY="tu_clave_chispart"
QWEN_API_KEY="tu_clave_qwen"
GEMINI_API_KEY="tu_clave_gemini"
CODESTRAL_API_KEY="tu_clave_codestral"

# Configuración opcional
DEFAULT_API="chispart"
DEFAULT_MODEL="gpt-4"
SECURITY_LEVEL="medium"
```

## 🛡️ Sistema de Seguridad

### Comandos Permitidos (Whitelist)
- `git`, `npm`, `pip`, `docker`, `kubectl`
- `ls`, `pwd`, `cat`, `grep`, `find`
- `python`, `node`, `java`, `go`

### Comandos Bloqueados (Blacklist)
- `sudo`, `su`, `rm -rf`, `dd`
- `chmod 777`, `chown`, `passwd`
- `wget`, `curl` (con URLs sospechosas)

## 📱 Optimizaciones para Termux

- ⚡ **Timeouts Adaptativos**: 120s para móviles vs 30s desktop
- 🔋 **Ahorro de Batería**: Modo producción optimizado
- 📁 **Paths Seguros**: Compatible con sistema de archivos Android
- 🌐 **Red Optimizada**: Chunks y reintentos para conexiones lentas

## 🔧 Solución de Problemas

### Problemas Comunes

#### Error de Importación
```bash
# Verificar instalación
./chispart version

# Reinstalar dependencias
pip install -r requirements.txt --force-reinstall
```

#### API No Responde
```bash
# Verificar configuración
./chispart config

# Probar con API diferente
./chispart chat "test" --api qwen
```

#### Comando Bloqueado
```bash
# Ver nivel de seguridad
./chispart config --security

# Ejecutar con confirmación
./chispart execute "comando" --confirm
```

## 📚 Documentación Completa

- 📖 [Guía Completa](docs/CHISPART_DEV_AGENT_V3_COMPLETADO.md)
- 🔧 [Scripts de Instalación](scripts/)
- 📁 [Archivos Históricos](archive/)
- 📘 [Guía de Análisis de Directorios](docs/DIRECTORY_ANALYSIS_GUIDE.md)

### 🧠 Notas sobre Análisis de Directorios

- Prioriza documentación: `README*`, `docs/`, `CHANGELOG`, `CONTRIBUTING`, `*.md/*.rst`.
- Lee fragmentos reales de archivos (snippets) con límites seguros por archivo y totales.
- El prompt a la IA incluye “Documentación Detectada” y “Fragmentos de Archivos”.
- Paneles en consola muestran documentación y muestreo de contenido.

## 🤝 Contribuir

1. Fork del repositorio
2. Crear rama de feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'feat: nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- **Sebastian Vernis | Soluciones Digitales**: Desarrollo y arquitectura
- **Comunidad Open Source**: Librerías y herramientas
- **APIs de IA**: OpenAI, Anthropic, Google, Mistral, Qwen

---

<div align="center">

### 🚀 ¡Empieza Ahora!

```bash
git clone https://github.com/tu-usuario/chispar-cli-llm.git
cd chispar-cli-llm
./install.sh
./chispart chat "¡Hola, Chispart!"
```

**Desarrollado con ❤️ por Sebastian Vernis | Soluciones Digitales**

</div>
