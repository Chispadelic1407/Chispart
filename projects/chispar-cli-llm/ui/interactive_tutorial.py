"""
Tutorial Interactivo para Chispart CLI - Análisis de Directorios
Manual interactivo completo con todos los comandos y variantes
"""

import os
import time
from typing import Dict, List, Optional, Any
from pathlib import Path

from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.text import Text
from rich.prompt import Prompt, Confirm, IntPrompt
from rich.progress import Progress, SpinnerColumn, TextColumn, BarColumn
from rich.markdown import Markdown
from rich.columns import Columns
from rich.align import Align

from ui.components import console, create_panel, create_table
from ui.theme_manager import get_theme
from ui.interactive import InteractivePrompt, MenuSelector

class InteractiveTutorial:
    """Tutorial interactivo completo para Chispart CLI"""
    
    def __init__(self):
        self.colors = get_theme()
        self.current_step = 0
        self.completed_sections = set()
        self.user_progress = {
            "sections_completed": 0,
            "commands_tried": 0,
            "examples_run": 0
        }
    
    def start_tutorial(self):
        """Inicia el tutorial interactivo completo"""
        self._show_welcome()
        
        if not Confirm.ask("¿Quieres comenzar el tutorial interactivo?", default=True):
            console.print(f"[{self.colors['info']}]Puedes ejecutar el tutorial en cualquier momento con:[/]")
            console.print(f"[{self.colors['primary']}]chispart-dev tutorial[/]")
            return
        
        self._run_main_tutorial()
        self._show_completion()
    
    def _show_welcome(self):
        """Muestra la pantalla de bienvenida"""
        welcome_content = f"""
[{self.colors['primary']}]🚀 ¡Bienvenido al Tutorial Interactivo de Chispart CLI![/]

[{self.colors['dim']}]Este tutorial te guiará paso a paso a través de todas las funcionalidades
de análisis de directorios y codebase que acabas de instalar.[/]

[{self.colors['success']}]✨ Lo que aprenderás:[/]
[{self.colors['info']}]• Análisis completo de directorios y proyectos[/]
[{self.colors['info']}]• Exploración especializada de código[/]
[{self.colors['info']}]• Detección automática de patrones de proyecto[/]
[{self.colors['info']}]• Comandos avanzados y opciones[/]
[{self.colors['info']}]• Integración con chat interactivo[/]
[{self.colors['info']}]• Trucos y mejores prácticas[/]

[{self.colors['warning']}]⏱️ Duración estimada: 10-15 minutos[/]
[{self.colors['accent']}]🎯 Nivel: Principiante a Avanzado[/]
"""
        
        console.print(create_panel(
            welcome_content,
            title="🎓 Tutorial Interactivo - Análisis de Directorios",
            style="chispart.brand"
        ))
    
    def _run_main_tutorial(self):
        """Ejecuta el tutorial principal con menú interactivo"""
        sections = {
            "1": "🔍 Análisis Básico de Directorios",
            "2": "🎯 Exploración Especializada de Código", 
            "3": "🏗️ Detección de Patrones de Proyecto",
            "4": "💬 Integración con Chat Interactivo",
            "5": "⚙️ Opciones Avanzadas y Personalización",
            "6": "🚀 Casos de Uso Prácticos",
            "7": "🔧 Troubleshooting y Mejores Prácticas"
        }
        
        while True:
            self._show_progress_summary()
            
            console.print(f"\n[{self.colors['primary']}]📚 Selecciona una sección del tutorial:[/]")
            
            # Crear tabla de secciones
            table = create_table(title="Secciones Disponibles")
            table.add_column("Sección", style="chispart.brand", width=8)
            table.add_column("Título", style=self.colors["accent"], width=40)
            table.add_column("Estado", style=self.colors["success"], width=12)
            
            for key, title in sections.items():
                status = "✅ Completada" if key in self.completed_sections else "⏳ Pendiente"
                table.add_row(key, title, status)
            
            table.add_row("0", "🏁 Finalizar Tutorial", "🚪 Salir")
            console.print(table)
            
            choice = Prompt.ask(
                f"[{self.colors['accent']}]Elige una sección (0-7)",
                choices=["0", "1", "2", "3", "4", "5", "6", "7"],
                default="1"
            )
            
            if choice == "0":
                break
            elif choice == "1":
                self._section_basic_analysis()
            elif choice == "2":
                self._section_specialized_exploration()
            elif choice == "3":
                self._section_project_patterns()
            elif choice == "4":
                self._section_chat_integration()
            elif choice == "5":
                self._section_advanced_options()
            elif choice == "6":
                self._section_practical_cases()
            elif choice == "7":
                self._section_troubleshooting()
            
            self.completed_sections.add(choice)
            self.user_progress["sections_completed"] = len(self.completed_sections)
    
    def _section_basic_analysis(self):
        """Sección 1: Análisis Básico de Directorios"""
        console.print(create_panel(
            f"[{self.colors['primary']}]🔍 Sección 1: Análisis Básico de Directorios[/]",
            style="chispart.brand"
        ))
        
        # Introducción
        intro = f"""
[{self.colors['accent']}]El comando principal para análisis de directorios es:[/]
[{self.colors['primary']}]chispart-dev analizar-directorio <directorio>[/]

[{self.colors['dim']}]Este comando analiza la estructura completa de un directorio,
detecta el tipo de proyecto y proporciona insights detallados.[/]
"""
        console.print(intro)
        
        # Ejemplo básico
        self._show_example_section("Ejemplo Básico", [
            ("Analizar directorio actual", "chispart-dev analizar-directorio ."),
            ("Analizar proyecto específico", "chispart-dev analizar-directorio ./mi-proyecto"),
            ("Analizar con ruta absoluta", "chispart-dev analizar-directorio /home/user/codigo")
        ])
        
        # Opciones principales
        options_table = create_table(title="Opciones Principales")
        options_table.add_column("Opción", style="chispart.brand")
        options_table.add_column("Descripción", style=self.colors["dim"])
        options_table.add_column("Ejemplo", style=self.colors["accent"])
        
        options_data = [
            ("--profundidad N", "Limita la profundidad de análisis", "--profundidad 3"),
            ("--sin-contenido", "Solo analiza estructura, no contenido", "--sin-contenido"),
            ("--incluir-ocultos", "Incluye archivos y carpetas ocultas", "--incluir-ocultos"),
            ("--prompt 'texto'", "Prompt personalizado para IA", "--prompt 'Evalúa la seguridad'"),
            ("--modelo gpt-4", "Especifica modelo de IA", "--modelo claude-3.5-sonnet"),
            ("--api chispart", "Especifica API a usar", "--api gemini")
        ]
        
        for option, desc, example in options_data:
            options_table.add_row(option, desc, example)
        
        console.print(options_table)
        
        # Práctica interactiva
        if Confirm.ask(f"[{self.colors['warning']}]¿Quieres probar un análisis real ahora?"):
            self._interactive_analysis_demo()
        
        self._wait_for_continue()
    
    def _section_specialized_exploration(self):
        """Sección 2: Exploración Especializada de Código"""
        console.print(create_panel(
            f"[{self.colors['primary']}]🎯 Sección 2: Exploración Especializada de Código[/]",
            style="chispart.brand"
        ))
        
        intro = f"""
[{self.colors['accent']}]El comando de exploración especializada es:[/]
[{self.colors['primary']}]chispart-dev explorar-codigo <directorio> --enfoque <área>[/]

[{self.colors['dim']}]Permite análisis enfocado en áreas específicas del desarrollo.[/]
"""
        console.print(intro)
        
        # Enfoques disponibles
        focus_table = create_table(title="Enfoques de Exploración")
        focus_table.add_column("Enfoque", style="chispart.brand")
        focus_table.add_column("Descripción", style=self.colors["dim"])
        focus_table.add_column("Ideal Para", style=self.colors["accent"])
        console.print(focus_table)

    def _section_chat_integration(self):
        """Sección 4: Integración con Chat Interactivo y Shell"""
        header = f"""
[{self.colors['primary']}]💬 Sección 4: Integración con Chat Interactivo[/]

[{self.colors['dim']}]El modo interactivo ahora permite usar comandos del sistema de forma segura,
además de los comandos especiales de análisis (@analizar, @explorar, navegador).[/]
"""
        console.print(create_panel(header, style="chispart.brand"))

        # Tabla de comandos especiales del chat
        table = create_table(title="Comandos en Modo Interactivo")
        table.add_column("Comando", style="chispart.brand", width=22)
        table.add_column("Descripción", style=self.colors["dim"])

        rows = [
            ("@analizar <ruta>", "Analiza un directorio completo y añade el análisis a la conversación"),
            ("@explorar <ruta> --enfoque <tipo>", "Explora el codebase con enfoque (architecture, security, performance, testing)"),
            ("navegador", "Abre el navegador interactivo de directorios"),
            ("comandos", "Muestra todos los comandos disponibles"),
            ("!<cmd>", "Ejecuta un comando del sistema con validación de seguridad y timeout"),
            ("!!", "Re‑ejecuta el último comando del historial"),
            ("!? <texto|/regex/i>", "Ejecuta la última coincidencia (substring o regex con flag i)"),
            ("!run <n>", "Ejecuta el n‑ésimo comando listado en el historial"),
            ("history [-n N] [filtro|/regex/i]", "Muestra historial, opcionalmente filtrado y con límite"),
            ("history -c", "Limpia el historial de comandos"),
            ("pwd", "Muestra el directorio de trabajo de comandos"),
            ("cd <ruta>", "Cambia el directorio de trabajo (soporta rutas relativas y ~)"),
            ("set timeout <s>", "Configura timeout de comandos (1–600 seg)"),
            ("set outmax <chars>", "Límite de caracteres mostrados por comando (100–200000)"),
            ("set histmax <n>", "Máximo de entradas en el historial (10–2000)"),
        ]
        for c, d in rows:
            table.add_row(c, d)
        console.print(table)

        # Nota de seguridad
        note = f"""
[{self.colors['warning']}]🔒 Seguridad:[/]
[{self.colors['dim']}]Todos los comandos pasan por whitelist/blacklist y validaciones de patrones.
Acciones sensibles (rm, mv, chmod, git push, docker run) requieren confirmación.
La salida se trunca según 'outmax' y se indica con [truncado].[/]
"""
        console.print(create_panel(note, title="Seguridad", style="chispart.warning"))

        # Sugerir práctica
        console.print(f"[{self.colors['info']}]Sugerencia:[/] Prueba en una sesión: [bold]chispart-dev interactivo[/bold], luego [bold]!ls[/bold], [bold]history[/bold], [bold]!run 1[/bold].")

        if Confirm.ask(f"[{self.colors['warning']}]¿Continuar al siguiente módulo?", default=True):
            return
