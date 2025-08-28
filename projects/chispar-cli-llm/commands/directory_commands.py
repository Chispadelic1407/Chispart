"""
Comandos CLI para análisis de directorios y codebase
"""

import os
import click
from typing import Optional, Dict, Any
from pathlib import Path

from ui.components import console, create_panel, create_table
from ui.theme_manager import get_theme
from core.directory_analyzer import directory_analyzer
from core.validation import APIValidator
from core.error_handler import ChispartErrorHandler
from utils import save_conversation_history
from datetime import datetime


class DirectoryCommands:
    """Maneja comandos relacionados con análisis de directorios"""
    
    def __init__(self, command_handler):
        self.command_handler = command_handler
        self.validator = APIValidator()
        self.error_handler = ChispartErrorHandler()
        self.colors = get_theme()
    
    def handle_directory_analysis(self, directory_path: str, 
                                 api_name: str,
                                 prompt: str = "Analiza este directorio y proporciona insights sobre la estructura del proyecto",
                                 model: Optional[str] = None,
                                 max_depth: Optional[int] = None,
                                 include_hidden: bool = False,
                                 analyze_content: bool = True,
                                 save_history: bool = True) -> Dict[str, Any]:
        """
        Maneja el análisis completo de directorios
        
        Args:
            directory_path: Ruta del directorio a analizar
            api_name: API a utilizar para el análisis IA
            prompt: Prompt para el análisis IA
            model: Modelo específico (opcional)
            max_depth: Profundidad máxima de análisis
            include_hidden: Si incluir archivos ocultos
            analyze_content: Si analizar contenido de archivos
            save_history: Si guardar en historial
            
        Returns:
            Dict con resultado de la operación
        """
        try:
            # Validar directorio
            validation_result = self._validate_directory(directory_path)
            if not validation_result["valid"]:
                console.print(f"[{self.colors['error']}]{validation_result['error']}[/]")
                return {"success": False, "error": validation_result["error"]}
            
            # Mostrar información del directorio
            self._show_directory_info(directory_path)
            
            # Realizar análisis estructural
            console.print(f"[{self.colors['info']}]🔍 Analizando estructura del directorio...[/]")
            
            analysis = directory_analyzer.analyze_directory(
                directory_path=directory_path,
                max_depth=max_depth,
                include_hidden=include_hidden,
                analyze_content=analyze_content,
                prioritize_docs=True,
                sample_contents=True
            )
            
            # Mostrar resultados del análisis
            directory_analyzer.display_analysis_summary(analysis)
            
            # Generar prompt enriquecido para IA (incluye fragmentos de archivos)
            enriched_prompt = self._create_enriched_prompt(analysis, prompt)
            
            # Enviar a IA para análisis adicional
            console.print(f"\n[{self.colors['info']}]🤖 Enviando análisis a IA para insights adicionales...[/]")
            
            ai_result = self.command_handler.handle_chat(
                api_name=api_name,
                message=enriched_prompt,
                model=model,
                save_history=False  # Guardaremos manualmente con más contexto
            )
            
            if ai_result["success"]:
                # Mostrar análisis de IA
                console.print(create_panel(
                    ai_result["response"],
                    title=f"🧠 Análisis IA - {ai_result['api_used']}",
                    style="chispart.success"
                ))
                
                # Guardar en historial con contexto completo
                if save_history:
                    conversation = {
                        "type": "directory_analysis",
                        "api": api_name,
                        "model": ai_result["model_used"],
                        "directory": directory_path,
                        "prompt": prompt,
                        "structural_analysis": analysis,
                        "ai_response": ai_result["response"],
                        "usage": ai_result.get("usage"),
                        "timestamp": datetime.now().isoformat(),
                        "execution_time": ai_result.get("execution_time"),
                        "analysis_params": {
                            "max_depth": max_depth,
                            "include_hidden": include_hidden,
                            "analyze_content": analyze_content
                        }
                    }
                    save_conversation_history(conversation)
                
                return {
                    "success": True,
                    "structural_analysis": analysis,
                    "ai_analysis": ai_result["response"],
                    "api_used": ai_result["api_used"],
                    "model_used": ai_result["model_used"],
                    "usage": ai_result.get("usage"),
                    "execution_time": ai_result.get("execution_time")
                }
            else:
                return {
                    "success": False,
                    "error": "Error en análisis IA",
                    "structural_analysis": analysis
                }
                
        except Exception as e:
            return self.error_handler.handle_command_error(e, "directory_analysis")
    
    def handle_codebase_exploration(self, directory_path: str,
                                   api_name: str,
                                   focus_area: str = "general",
                                   model: Optional[str] = None,
                                   save_history: bool = True) -> Dict[str, Any]:
        """
        Maneja exploración especializada de codebase
        
        Args:
            directory_path: Ruta del directorio
            api_name: API a utilizar
            focus_area: Área de enfoque (architecture, security, performance, etc.)
            model: Modelo específico
            save_history: Si guardar en historial
        """
        try:
            # Validar directorio
            validation_result = self._validate_directory(directory_path)
            if not validation_result["valid"]:
                console.print(f"[{self.colors['error']}]{validation_result['error']}[/]")
                return {"success": False, "error": validation_result["error"]}
            
            # Análisis estructural básico
            analysis = directory_analyzer.analyze_directory(
                directory_path=directory_path,
                analyze_content=True
            )
            
            # Crear prompt especializado según área de enfoque
            specialized_prompt = self._create_specialized_prompt(analysis, focus_area)
            
            console.print(f"[{self.colors['info']}]🔍 Explorando codebase con enfoque en: {focus_area}[/]")
            
            # Enviar a IA
            ai_result = self.command_handler.handle_chat(
                api_name=api_name,
                message=specialized_prompt,
                model=model,
                save_history=False
            )
            
            if ai_result["success"]:
                # Mostrar resultado
                console.print(create_panel(
                    ai_result["response"],
                    title=f"🔍 Exploración de Codebase - {focus_area.title()}",
                    style="chispart.brand"
                ))
                
                # Guardar en historial
                if save_history:
                    conversation = {
                        "type": "codebase_exploration",
                        "api": api_name,
                        "model": ai_result["model_used"],
                        "directory": directory_path,
                        "focus_area": focus_area,
                        "structural_analysis": analysis,
                        "ai_response": ai_result["response"],
                        "usage": ai_result.get("usage"),
                        "timestamp": datetime.now().isoformat()
                    }
                    save_conversation_history(conversation)
                
                return {
                    "success": True,
                    "focus_area": focus_area,
                    "analysis": ai_result["response"],
                    "structural_data": analysis
                }
            else:
                return {"success": False, "error": "Error en exploración IA"}
                
        except Exception as e:
            return self.error_handler.handle_command_error(e, "codebase_exploration")
    
    def handle_project_patterns_analysis(self, directory_path: str,
                                       api_name: str,
                                       model: Optional[str] = None) -> Dict[str, Any]:
        """
        Analiza patrones y arquitectura del proyecto
        """
        try:
            # Análisis estructural
            analysis = directory_analyzer.analyze_directory(directory_path, analyze_content=True)
            
            # Crear prompt para análisis de patrones
            patterns_prompt = f"""
Analiza los siguientes datos de un proyecto de software y proporciona insights sobre:

1. **Patrones de Arquitectura**: Identifica patrones de diseño y arquitectura utilizados
2. **Calidad del Código**: Evalúa la organización y estructura del código
3. **Mejores Prácticas**: Identifica qué mejores prácticas se siguen y cuáles faltan
4. **Recomendaciones**: Sugiere mejoras específicas para el proyecto

**Datos del Proyecto:**

**Tipo de Proyecto:** {analysis['project_info']['type']}
**Estructura de Directorios:** {', '.join(analysis['architecture']['patterns'])}
**Patrones Detectados:** {', '.join(analysis['architecture']['patterns'])}
**Lenguajes Principales:** {dict(analysis['statistics']['languages'].most_common(5))}
**Total de Archivos:** {analysis['statistics']['total_files']}
**Dependencias:** {analysis['dependencies']['total_count']} dependencias encontradas

**Gestores de Paquetes:** {', '.join(analysis['dependencies']['package_managers'])}

Proporciona un análisis detallado y profesional con recomendaciones específicas y accionables.
"""
            
            console.print(f"[{self.colors['info']}]🏗️ Analizando patrones de arquitectura...[/]")
            
            ai_result = self.command_handler.handle_chat(
                api_name=api_name,
                message=patterns_prompt,
                model=model,
                save_history=False
            )
            
            if ai_result["success"]:
                console.print(create_panel(
                    ai_result["response"],
                    title="🏗️ Análisis de Patrones y Arquitectura",
                    style="chispart.accent"
                ))
                
                return {
                    "success": True,
                    "patterns_analysis": ai_result["response"],
                    "structural_data": analysis
                }
            else:
                return {"success": False, "error": "Error en análisis de patrones"}
                
        except Exception as e:
            return self.error_handler.handle_command_error(e, "patterns_analysis")
    
    def _validate_directory(self, directory_path: str) -> Dict[str, Any]:
        """Valida un directorio para análisis"""
        try:
            path = Path(directory_path).resolve()
            
            # Verificar existencia
            if not path.exists():
                return {
                    "valid": False,
                    "error": f"El directorio {directory_path} no existe"
                }
            
            # Verificar que es directorio
            if not path.is_dir():
                return {
                    "valid": False,
                    "error": f"{directory_path} no es un directorio"
                }
            
            # Verificar permisos de lectura
            if not os.access(path, os.R_OK):
                return {
                    "valid": False,
                    "error": f"Sin permisos de lectura para {directory_path}"
                }
            
            # Verificar que no esté vacío
            try:
                if not any(path.iterdir()):
                    return {
                        "valid": False,
                        "error": f"El directorio {directory_path} está vacío"
                    }
            except PermissionError:
                return {
                    "valid": False,
                    "error": f"Sin permisos para listar contenido de {directory_path}"
                }
            
            return {"valid": True}
            
        except Exception as e:
            return {
                "valid": False,
                "error": f"Error validando directorio: {str(e)}"
            }
    
    def _show_directory_info(self, directory_path: str):
        """Muestra información básica del directorio"""
        try:
            path = Path(directory_path).resolve()
            
            # Contar elementos básicos
            files_count = sum(1 for item in path.rglob('*') if item.is_file())
            dirs_count = sum(1 for item in path.rglob('*') if item.is_dir())
            
            info = f"""
[{self.colors['info']}]📁 Directorio:[/] {path.name}
[{self.colors['info']}]📍 Ruta completa:[/] {path}
[{self.colors['info']}]📄 Archivos (aprox):[/] {files_count}
[{self.colors['info']}]📂 Subdirectorios:[/] {dirs_count}
"""
            
            console.print(create_panel(
                info.strip(),
                title="📊 Información del Directorio",
                style=self.colors["info"]
            ))
            
        except Exception:
            # Si hay error mostrando info, continuar silenciosamente
            pass
    
    def _create_enriched_prompt(self, analysis: Dict[str, Any], user_prompt: str) -> str:
        """Crea un prompt enriquecido con datos del análisis estructural"""
        
        # Extraer información clave del análisis
        stats = analysis['statistics']
        project_info = analysis['project_info']
        dependencies = analysis['dependencies']
        architecture = analysis['architecture']
        documentation = analysis.get('documentation', {})

        # Preparar strings seguros para documentación (evitar expresiones complejas en f-string)
        if documentation.get('has_readme') and documentation.get('primary_readme'):
            try:
                doc_readme_str = f"Sí → {Path(documentation.get('primary_readme')).name}"
            except Exception:
                doc_readme_str = "Sí"
        else:
            doc_readme_str = "No"

        try:
            doc_dirs_list = [Path(d).name for d in documentation.get('doc_dirs', [])]
            doc_dirs_str = ", ".join(doc_dirs_list) if doc_dirs_list else "Ninguno"
        except Exception:
            doc_dirs_str = "Ninguno"

        try:
            doc_files_list = documentation.get('doc_files', [])
            doc_files_preview = [f"  • {Path(p).name}" for p in doc_files_list[:10]]
            doc_files_block = "\n".join(doc_files_preview)
        except Exception:
            doc_files_block = ""

        doc_excerpt_str = ""
        if documentation.get('summary_excerpt'):
            doc_excerpt_str = "\nResumen README (extracto):\n" + documentation.get('summary_excerpt')
        
        # Crear resumen estructurado
        # Preparar sección de fragmentos de archivos (limitada)
        samples = analysis.get('content_samples') or {}
        sample_files = samples.get('files', [])
        samples_section = ""
        if sample_files:
            samples_preview_lines = []
            for f in sample_files[:10]:  # máximo 10 fragmentos en prompt
                path = f.get('path')
                content = f.get('content', '')
                # Delimitar cada fragmento
                samples_preview_lines.append(f"Archivo: {path}\n```\n{content}\n```\n")
            samples_footer = f"(Fragmentos mostrados: {min(len(sample_files),10)}/{len(sample_files)} | Caracteres totales: {samples.get('total_chars', 0)})"
            samples_section = "\n**Fragmentos de Archivos (prioridad: documentación primero):**\n" + "\n".join(samples_preview_lines) + samples_footer + "\n"

        enriched_prompt = f"""
{user_prompt}

**DATOS DEL ANÁLISIS ESTRUCTURAL:**

**Información General:**
- Directorio: {analysis['directory']}
- Total de archivos: {stats['total_files']}
- Total de directorios: {stats['total_directories']}
- Tamaño total: {self._format_size(stats['total_size'])}

**Tipo de Proyecto:**
- Tipo principal: {project_info['type']}
- Framework: {project_info.get('framework', 'N/A')}
- Confianza: {project_info['confidence']:.1%}

**Lenguajes de Programación:**
{self._format_languages(stats['languages'])}

**Tipos de Archivo Más Comunes:**
{self._format_file_types(stats['file_types'])}

**Documentación Detectada (prioridad alta):**
- README: {doc_readme_str}
- Directorios de docs: {doc_dirs_str}
- Archivos de docs: {min(documentation.get('count', 0), 10)} mostrados de {documentation.get('count', 0)}
{doc_files_block}
{doc_excerpt_str}

**Dependencias:**
- Total: {dependencies['total_count']}
- Gestores de paquetes: {', '.join(dependencies['package_managers'])}
- Dependencias principales: {len(dependencies['dependencies'])}
- Dependencias de desarrollo: {len(dependencies['dev_dependencies'])}

**Arquitectura y Patrones:**
- Patrones detectados: {', '.join(architecture['patterns'])}
- Tipo de estructura: {architecture['structure_type']}
- Complejidad: {architecture['complexity']}

**Archivos Más Grandes:**
{self._format_largest_files(stats['largest_files'])}

**Recomendaciones Automáticas:**
{chr(10).join(['- ' + rec for rec in analysis['recommendations']])}

{samples_section}
Por favor, proporciona un análisis detallado y profesional basado en esta información estructural.
"""
        
        return enriched_prompt
    
    def _create_specialized_prompt(self, analysis: Dict[str, Any], focus_area: str) -> str:
        """Crea prompts especializados según el área de enfoque"""
        
        base_info = f"""
**ANÁLISIS DE CODEBASE - ENFOQUE: {focus_area.upper()}**

**Información del Proyecto:**
- Tipo: {analysis['project_info']['type']}
- Archivos: {analysis['statistics']['total_files']}
- Lenguajes: {dict(analysis['statistics']['languages'].most_common(3))}
- Dependencias: {analysis['dependencies']['total_count']}
"""
        
        if focus_area == "architecture":
            return f"""{base_info}

**ENFOQUE EN ARQUITECTURA:**
Analiza la arquitectura del proyecto considerando:

1. **Patrones de Diseño**: ¿Qué patrones arquitectónicos se utilizan?
2. **Separación de Responsabilidades**: ¿Cómo está organizado el código?
3. **Escalabilidad**: ¿Es la arquitectura escalable?
4. **Mantenibilidad**: ¿Qué tan fácil es mantener este código?
5. **Mejores Prácticas**: ¿Se siguen las mejores prácticas arquitectónicas?

**Estructura detectada:** {analysis['architecture']['structure_type']}
**Patrones encontrados:** {', '.join(analysis['architecture']['patterns'])}
"""
        
        elif focus_area == "security":
            return f"""{base_info}

**ENFOQUE EN SEGURIDAD:**
Evalúa los aspectos de seguridad del proyecto:

1. **Gestión de Dependencias**: ¿Hay dependencias desactualizadas o vulnerables?
2. **Configuración**: ¿Se manejan correctamente las configuraciones sensibles?
3. **Validación de Entrada**: ¿Se validan adecuadamente las entradas?
4. **Autenticación y Autorización**: ¿Cómo se maneja la seguridad de acceso?
5. **Mejores Prácticas**: ¿Se siguen las mejores prácticas de seguridad?

**Dependencias a revisar:** {len(analysis['dependencies']['dependencies'])} paquetes
"""
        
        elif focus_area == "performance":
            return f"""{base_info}

**ENFOQUE EN RENDIMIENTO:**
Analiza los aspectos de rendimiento del proyecto:

1. **Optimización de Código**: ¿Hay oportunidades de optimización?
2. **Gestión de Recursos**: ¿Se utilizan eficientemente los recursos?
3. **Caching**: ¿Se implementan estrategias de cache?
4. **Lazy Loading**: ¿Se cargan los recursos de manera eficiente?
5. **Monitoreo**: ¿Hay herramientas de monitoreo implementadas?

**Tamaño del proyecto:** {self._format_size(analysis['statistics']['total_size'])}
**Archivos grandes:** {len([f for f in analysis['statistics']['largest_files'] if f[1] > 1024*1024])} archivos > 1MB
"""
        
        elif focus_area == "testing":
            return f"""{base_info}

**ENFOQUE EN TESTING:**
Evalúa la estrategia de testing del proyecto:

1. **Cobertura de Tests**: ¿Qué tan completa es la cobertura?
2. **Tipos de Tests**: ¿Se implementan unit, integration y e2e tests?
3. **Herramientas**: ¿Qué herramientas de testing se utilizan?
4. **CI/CD**: ¿Están integrados los tests en el pipeline?
5. **Calidad**: ¿Son los tests mantenibles y efectivos?

**Directorios de test detectados:** {'Sí' if 'test_driven' in analysis['architecture']['patterns'] else 'No'}
"""
        
        else:  # general
            return f"""{base_info}

**ANÁLISIS GENERAL:**
Proporciona un análisis completo del codebase considerando:

1. **Calidad General**: Evaluación global de la calidad del código
2. **Organización**: ¿Está bien organizado el proyecto?
3. **Documentación**: ¿Hay documentación adecuada?
4. **Mantenibilidad**: ¿Qué tan fácil es mantener y extender?
5. **Recomendaciones**: Sugerencias específicas de mejora

**Resumen:** {analysis['summary']}
"""
    
    def _format_size(self, size_bytes: int) -> str:
        """Formatea el tamaño en bytes"""
        for unit in ['B', 'KB', 'MB', 'GB']:
            if size_bytes < 1024.0:
                return f"{size_bytes:.1f} {unit}"
            size_bytes /= 1024.0
        return f"{size_bytes:.1f} TB"
    
    def _format_languages(self, languages_counter) -> str:
        """Formatea la lista de lenguajes"""
        if not languages_counter:
            return "- No se detectaron lenguajes específicos"
        
        formatted = []
        for lang, count in languages_counter.most_common(5):
            formatted.append(f"- {lang}: {count} archivos")
        
        return "\n".join(formatted)
    
    def _format_file_types(self, file_types_counter) -> str:
        """Formatea los tipos de archivo"""
        if not file_types_counter:
            return "- No hay tipos de archivo específicos"
        
        formatted = []
        for ext, count in file_types_counter.most_common(5):
            ext_display = ext if ext else "sin extensión"
            formatted.append(f"- {ext_display}: {count} archivos")
        
        return "\n".join(formatted)
    
    def _format_largest_files(self, largest_files) -> str:
        """Formatea la lista de archivos más grandes"""
        if not largest_files:
            return "- No hay información de archivos grandes"
        
        formatted = []
        for file_path, size in largest_files[:5]:
            file_name = Path(file_path).name
            formatted.append(f"- {file_name}: {self._format_size(size)}")
        
        return "\n".join(formatted)


# Instancia global para comandos de directorio
directory_commands = None

def get_directory_commands(command_handler):
    """Factory function para obtener instancia de DirectoryCommands"""
    global directory_commands
    if directory_commands is None:
        directory_commands = DirectoryCommands(command_handler)
    return directory_commands
