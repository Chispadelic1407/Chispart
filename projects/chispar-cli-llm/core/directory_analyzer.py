"""
Analizador de directorios y codebase para Chispart CLI
Proporciona análisis completo de estructuras de archivos y código
"""

import os
import json
import mimetypes
from pathlib import Path
from typing import Dict, List, Any, Optional, Set, Tuple
from datetime import datetime
from collections import defaultdict, Counter
import re

from ui.components import console, create_panel, create_table
from ui.theme_manager import get_theme


class CodebaseAnalyzer:
    """Analizador especializado para codebase y proyectos de desarrollo"""
    
    # Extensiones de archivos por categoría
    CODE_EXTENSIONS = {
        'python': ['.py', '.pyw', '.pyx'],
        'javascript': ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
        'web': ['.html', '.htm', '.css', '.scss', '.sass', '.less'],
        'java': ['.java', '.class', '.jar'],
        'c_cpp': ['.c', '.cpp', '.cc', '.cxx', '.h', '.hpp'],
        'csharp': ['.cs', '.csx'],
        'php': ['.php', '.phtml', '.php3', '.php4', '.php5'],
        'ruby': ['.rb', '.rbw'],
        'go': ['.go'],
        'rust': ['.rs'],
        'swift': ['.swift'],
        'kotlin': ['.kt', '.kts'],
        'scala': ['.scala', '.sc'],
        'shell': ['.sh', '.bash', '.zsh', '.fish'],
        'sql': ['.sql', '.mysql', '.pgsql'],
        'config': ['.json', '.yaml', '.yml', '.toml', '.ini', '.cfg', '.conf'],
        'docker': ['Dockerfile', '.dockerignore'],
        'git': ['.gitignore', '.gitattributes'],
        'markdown': ['.md', '.markdown', '.rst'],
    }
    
    # Patrones de archivos importantes
    IMPORTANT_FILES = {
        'package.json', 'requirements.txt', 'Pipfile', 'poetry.lock',
        'Cargo.toml', 'go.mod', 'pom.xml', 'build.gradle',
        'Makefile', 'CMakeLists.txt', 'setup.py', 'setup.cfg',
        'README.md', 'LICENSE', 'CHANGELOG.md', '.env.example',
        'docker-compose.yml', 'Dockerfile', '.github'
    }
    
    # Directorios comunes a ignorar
    IGNORE_DIRS = {
        '__pycache__', '.git', '.svn', '.hg', 'node_modules',
        '.venv', 'venv', 'env', '.env', 'build', 'dist',
        '.pytest_cache', '.coverage', 'htmlcov', '.tox',
        '.idea', '.vscode', '.vs', 'target', 'bin', 'obj'
    }

    def __init__(self):
        self.colors = get_theme()
        self.stats = {
            'total_files': 0,
            'total_directories': 0,
            'total_size': 0,
            'file_types': Counter(),
            'languages': Counter(),
            'largest_files': [],
            'project_type': 'unknown',
            'dependencies': [],
            'architecture_patterns': []
        }

    def analyze_directory(self, directory_path: str, 
                         max_depth: Optional[int] = None,
                         include_hidden: bool = False,
                         analyze_content: bool = True,
                         prioritize_docs: bool = True,
                         sample_contents: bool = True,
                         max_sample_files: int = 15,
                         max_chars_total: int = 20000,
                         max_chars_per_file: int = 2000) -> Dict[str, Any]:
        """
        Analiza un directorio completo y retorna información detallada
        
        Args:
            directory_path: Ruta del directorio a analizar
            max_depth: Profundidad máxima de análisis (None = sin límite)
            include_hidden: Si incluir archivos/directorios ocultos
            analyze_content: Si analizar el contenido de los archivos
            
        Returns:
            Dict con análisis completo del directorio
        """
        directory_path = Path(directory_path).resolve()
        
        if not directory_path.exists():
            raise ValueError(f"El directorio {directory_path} no existe")
        
        if not directory_path.is_dir():
            raise ValueError(f"{directory_path} no es un directorio")
        
        console.print(f"[{self.colors['info']}]🔍 Analizando directorio: {directory_path}[/]")
        
        # Resetear estadísticas
        self._reset_stats()
        
        # Análisis principal
        file_tree = self._build_file_tree(directory_path, max_depth, include_hidden, prioritize_docs=prioritize_docs)
        
        if analyze_content:
            self._analyze_file_contents(directory_path, include_hidden)
        
        # Analizar documentación disponible (prioridad alta en protocolo jerárquico)
        documentation = self._analyze_documentation(directory_path, include_hidden=include_hidden)

        # Detectar tipo de proyecto
        project_info = self._detect_project_type(directory_path)
        
        # Análisis de dependencias
        dependencies = self._analyze_dependencies(directory_path)
        
        # Patrones de arquitectura
        architecture = self._analyze_architecture(directory_path, file_tree)
        
        # Muestreo de contenido de archivos (priorizando documentación)
        content_samples = None
        if sample_contents:
            content_samples = self._sample_content_bundle(
                directory_path,
                include_hidden=include_hidden,
                prioritize_docs=prioritize_docs,
                max_files=max_sample_files,
                max_total=max_chars_total,
                max_per_file=max_chars_per_file
            )

        # Generar resumen
        summary = self._generate_summary(directory_path)
        
        return {
            'directory': str(directory_path),
            'timestamp': datetime.now().isoformat(),
            'file_tree': file_tree,
            'statistics': self.stats,
            'documentation': documentation,
            'project_info': project_info,
            'dependencies': dependencies,
            'architecture': architecture,
            'content_samples': content_samples,
            'summary': summary,
            'recommendations': self._generate_recommendations()
        }

    def _reset_stats(self):
        """Resetea las estadísticas para un nuevo análisis"""
        self.stats = {
            'total_files': 0,
            'total_directories': 0,
            'total_size': 0,
            'file_types': Counter(),
            'languages': Counter(),
            'largest_files': [],
            'project_type': 'unknown',
            'dependencies': [],
            'architecture_patterns': []
        }

    def _build_file_tree(self, directory: Path, max_depth: Optional[int], 
                        include_hidden: bool, current_depth: int = 0,
                        prioritize_docs: bool = True) -> Dict[str, Any]:
        """Construye el árbol de archivos del directorio"""
        
        if max_depth is not None and current_depth >= max_depth:
            return {}
        
        tree = {
            'name': directory.name,
            'type': 'directory',
            'path': str(directory),
            'children': [],
            'size': 0,
            'file_count': 0,
            'dir_count': 0
        }
        
        try:
            def sort_key(x: Path):
                # Directorios antes que archivos
                is_file_key = 1 if x.is_file() else 0
                # Prioridad de documentación si se solicita
                priority = self._get_item_priority(x) if prioritize_docs else 5
                return (is_file_key, priority, x.name.lower())

            items = sorted(directory.iterdir(), key=sort_key)
            
            for item in items:
                # Filtrar archivos/directorios ocultos
                if not include_hidden and item.name.startswith('.'):
                    continue
                
                # Filtrar directorios ignorados
                if item.is_dir() and item.name in self.IGNORE_DIRS:
                    continue
                
                if item.is_file():
                    file_info = self._analyze_file(item)
                    tree['children'].append(file_info)
                    tree['size'] += file_info['size']
                    tree['file_count'] += 1
                    self.stats['total_files'] += 1
                    self.stats['total_size'] += file_info['size']
                    
                elif item.is_dir():
                    subdir_tree = self._build_file_tree(
                        item, max_depth, include_hidden, current_depth + 1, prioritize_docs=prioritize_docs
                    )
                    tree['children'].append(subdir_tree)
                    tree['size'] += subdir_tree['size']
                    tree['file_count'] += subdir_tree['file_count']
                    tree['dir_count'] += subdir_tree['dir_count'] + 1
                    self.stats['total_directories'] += 1
                    
        except PermissionError:
            tree['error'] = 'Permission denied'
        
        return tree

    def _get_item_priority(self, path: Path) -> int:
        """Devuelve prioridad para ordenar elementos, priorizando documentación.
        Menor número = mayor prioridad.
        """
        name = path.name.lower()
        # Documentación principal
        doc_names = {"readme.md", "readme", "changelog.md", "contributing.md", "docs"}
        if name in doc_names:
            return 0
        # Directorios de documentación y archivos markdown/rst
        if path.is_dir() and name in {"docs", "documentation"}:
            return 0
        if path.is_file() and path.suffix.lower() in {".md", ".markdown", ".rst"}:
            return 1
        # Archivos importantes de configuración
        if name in self.IMPORTANT_FILES:
            return 2
        # Estructura de código fuente común
        if path.is_dir() and name in {"src", "app", "lib"}:
            return 3
        # Tests
        if name in {"tests", "test", "__tests__"}:
            return 4
        # Resto
        return 5

    def _analyze_documentation(self, directory: Path, include_hidden: bool = False) -> Dict[str, Any]:
        """Explora documentación disponible y devuelve un resumen prioritario.
        Busca README, docs/, CHANGELOG, CONTRIBUTING y archivos .md/.rst.
        """
        docs_info = {
            "has_readme": False,
            "primary_readme": None,
            "doc_dirs": [],
            "doc_files": [],
            "headings": [],
            "summary_excerpt": None,
            "count": 0
        }

        try:
            # Archivos de primera prioridad
            candidates = [
                directory / "README.md",
                directory / "Readme.md",
                directory / "readme.md",
                directory / "README",
            ]
            for c in candidates:
                if c.exists() and c.is_file():
                    docs_info["has_readme"] = True
                    docs_info["primary_readme"] = str(c)
                    break

            # Directorios de documentación
            for dname in ["docs", "documentation"]:
                dpath = directory / dname
                if dpath.exists() and dpath.is_dir():
                    docs_info["doc_dirs"].append(str(dpath))

            # Recolectar archivos de documentación nivel superior
            for item in directory.iterdir():
                if not include_hidden and item.name.startswith('.'):
                    continue
                if item.is_file() and (item.suffix.lower() in {".md", ".markdown", ".rst"} or item.name.lower() in {"changelog.md", "contributing.md"}):
                    docs_info["doc_files"].append(str(item))

            # Recolectar dentro de docs/ (no profundo para evitar costo alto)
            for dir_str in docs_info["doc_dirs"]:
                dpath = Path(dir_str)
                try:
                    for sub in dpath.glob("**/*"):
                        if sub.is_file() and sub.suffix.lower() in {".md", ".markdown", ".rst"}:
                            docs_info["doc_files"].append(str(sub))
                except Exception:
                    pass

            # Eliminar duplicados y ordenar con prioridad por nombre
            seen = set()
            ordered = []
            for f in docs_info["doc_files"]:
                if f not in seen:
                    seen.add(f)
                    ordered.append(f)
            # Orden: README primero, luego CHANGELOG/CONTRIBUTING, luego resto alfabético
            def doc_key(p: str):
                n = Path(p).name.lower()
                if n.startswith("readme"): return (0, n)
                if n.startswith("changelog"): return (1, n)
                if n.startswith("contributing"): return (1, n)
                return (2, n)
            ordered.sort(key=doc_key)
            docs_info["doc_files"] = ordered
            docs_info["count"] = len(ordered)

            # Extraer headings y un extracto del README si existe
            readme_path = docs_info["primary_readme"] or (ordered[0] if ordered else None)
            if readme_path:
                try:
                    with open(readme_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read(8000)  # límite razonable
                    # Headings Markdown simples
                    headings = re.findall(r"^\s{0,3}#{1,6}\s+(.+)$", content, re.MULTILINE)
                    docs_info["headings"] = headings[:10]
                    excerpt = content.strip().splitlines()
                    excerpt = "\n".join(excerpt[:30])  # primeras líneas
                    docs_info["summary_excerpt"] = excerpt[:1200]
                except Exception:
                    pass
        except Exception:
            # Ante cualquier error, devolver lo recolectado hasta el momento
            pass

        return docs_info

    def _iter_files(self, directory: Path, include_hidden: bool = False) -> List[Path]:
        """Itera archivos del árbol respetando exclusiones comunes."""
        for root, dirs, files in os.walk(directory):
            # Filtrar dir ignorados
            dirs[:] = [d for d in dirs if d not in self.IGNORE_DIRS]
            if not include_hidden:
                dirs[:] = [d for d in dirs if not d.startswith('.')]
                files = [f for f in files if not f.startswith('.')]
            for fname in files:
                fpath = Path(root) / fname
                yield fpath

    def _sample_content_bundle(self, directory: Path,
                                include_hidden: bool,
                                prioritize_docs: bool,
                                max_files: int,
                                max_total: int,
                                max_per_file: int) -> Dict[str, Any]:
        """Selecciona archivos priorizados y devuelve fragmentos de contenido.
        Respeta límites totales y por archivo, priorizando documentación y archivos clave.
        """
        # Recolectar todos los archivos con prioridades
        candidates: List[Tuple[int, Path]] = []
        for fpath in self._iter_files(directory, include_hidden=include_hidden):
            # Ignorar binarios grandes por extensión simple
            if fpath.suffix.lower() in {'.png', '.jpg', '.jpeg', '.gif', '.pdf', '.zip', '.tar', '.gz', '.rar', '.7z'}:
                continue
            prio = self._get_item_priority(fpath) if prioritize_docs else 5
            # Favorecer raíz con pequeño sesgo
            if fpath.parent == directory:
                prio = max(0, prio - 1)
            candidates.append((prio, fpath))

        # Ordenar por prioridad y nombre
        candidates.sort(key=lambda t: (t[0], t[1].name.lower()))

        # Seleccionar hasta max_files respetando max_total
        selected = []
        total_chars = 0
        for _, path in candidates:
            if len(selected) >= max_files:
                break
            try:
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read(max_per_file + 1024)  # pequeño margen para truncar limpio
                snippet = content[:max_per_file]
                if total_chars + len(snippet) > max_total:
                    # Si excede, truncar y terminar
                    remaining = max_total - total_chars
                    if remaining <= 0:
                        break
                    snippet = snippet[:remaining]
                    selected.append({"path": str(path), "chars": len(snippet), "content": snippet, "truncated": True})
                    total_chars += len(snippet)
                    break
                selected.append({"path": str(path), "chars": len(snippet), "content": snippet, "truncated": len(content) > len(snippet)})
                total_chars += len(snippet)
            except Exception:
                continue

        return {
            "files": selected,
            "total_chars": total_chars,
            "max_total": max_total,
            "max_files": max_files,
            "truncated": total_chars >= max_total or len(selected) >= max_files
        }

    def _analyze_file(self, file_path: Path) -> Dict[str, Any]:
        """Analiza un archivo individual"""
        try:
            stat = file_path.stat()
            file_size = stat.st_size
            
            # Determinar tipo de archivo
            extension = file_path.suffix.lower()
            mime_type, _ = mimetypes.guess_type(str(file_path))
            
            # Categorizar por lenguaje/tipo
            language = self._detect_language(file_path)
            if language:
                self.stats['languages'][language] += 1
            
            # Categorizar por extensión
            self.stats['file_types'][extension or 'no_extension'] += 1
            
            # Trackear archivos más grandes
            if len(self.stats['largest_files']) < 10:
                self.stats['largest_files'].append((str(file_path), file_size))
            else:
                self.stats['largest_files'].sort(key=lambda x: x[1], reverse=True)
                if file_size > self.stats['largest_files'][-1][1]:
                    self.stats['largest_files'][-1] = (str(file_path), file_size)
            
            return {
                'name': file_path.name,
                'type': 'file',
                'path': str(file_path),
                'size': file_size,
                'extension': extension,
                'mime_type': mime_type,
                'language': language,
                'modified': datetime.fromtimestamp(stat.st_mtime).isoformat(),
                'is_important': file_path.name in self.IMPORTANT_FILES
            }
            
        except (OSError, PermissionError) as e:
            return {
                'name': file_path.name,
                'type': 'file',
                'path': str(file_path),
                'error': str(e)
            }

    def _detect_language(self, file_path: Path) -> Optional[str]:
        """Detecta el lenguaje de programación de un archivo"""
        extension = file_path.suffix.lower()
        filename = file_path.name.lower()
        
        # Casos especiales por nombre de archivo
        if filename in ['dockerfile', 'makefile', 'rakefile']:
            return filename
        
        # Buscar por extensión
        for language, extensions in self.CODE_EXTENSIONS.items():
            if extension in extensions or filename in extensions:
                return language
        
        return None

    def _analyze_file_contents(self, directory: Path, include_hidden: bool):
        """Analiza el contenido de archivos de código para obtener más información"""
        for root, dirs, files in os.walk(directory):
            # Filtrar directorios ignorados
            dirs[:] = [d for d in dirs if d not in self.IGNORE_DIRS]
            
            if not include_hidden:
                dirs[:] = [d for d in dirs if not d.startswith('.')]
                files = [f for f in files if not f.startswith('.')]
            
            for file in files:
                file_path = Path(root) / file
                
                # Solo analizar archivos de código
                if self._detect_language(file_path):
                    self._analyze_code_file(file_path)

    def _analyze_code_file(self, file_path: Path):
        """Analiza un archivo de código específico"""
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            # Análisis básico de imports/dependencias
            imports = self._extract_imports(content, file_path.suffix)
            
            # Análisis de funciones/clases
            functions = self._extract_functions(content, file_path.suffix)
            
            # TODO: Expandir análisis según necesidades
            
        except (UnicodeDecodeError, PermissionError):
            pass  # Ignorar archivos que no se pueden leer

    def _extract_imports(self, content: str, extension: str) -> List[str]:
        """Extrae imports/dependencias de un archivo"""
        imports = []
        
        if extension == '.py':
            # Python imports
            import_patterns = [
                r'^import\s+([^\s#]+)',
                r'^from\s+([^\s#]+)\s+import'
            ]
        elif extension in ['.js', '.jsx', '.ts', '.tsx']:
            # JavaScript/TypeScript imports
            import_patterns = [
                r'import.*from\s+[\'"]([^\'"]+)[\'"]',
                r'require\([\'"]([^\'"]+)[\'"]\)'
            ]
        else:
            return imports
        
        for pattern in import_patterns:
            matches = re.findall(pattern, content, re.MULTILINE)
            imports.extend(matches)
        
        return imports

    def _extract_functions(self, content: str, extension: str) -> List[str]:
        """Extrae funciones/métodos de un archivo"""
        functions = []
        
        if extension == '.py':
            # Python functions and classes
            function_patterns = [
                r'^def\s+([a-zA-Z_][a-zA-Z0-9_]*)',
                r'^class\s+([a-zA-Z_][a-zA-Z0-9_]*)'
            ]
        elif extension in ['.js', '.jsx', '.ts', '.tsx']:
            # JavaScript/TypeScript functions
            function_patterns = [
                r'function\s+([a-zA-Z_][a-zA-Z0-9_]*)',
                r'const\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=.*=>',
                r'class\s+([a-zA-Z_][a-zA-Z0-9_]*)'
            ]
        else:
            return functions
        
        for pattern in function_patterns:
            matches = re.findall(pattern, content, re.MULTILINE)
            functions.extend(matches)
        
        return functions

    def _detect_project_type(self, directory: Path) -> Dict[str, Any]:
        """Detecta el tipo de proyecto basándose en archivos y estructura"""
        project_info = {
            'type': 'unknown',
            'framework': None,
            'language': None,
            'build_system': None,
            'confidence': 0.0
        }
        
        # Archivos indicadores de tipo de proyecto
        indicators = {
            'python': {
                'files': ['requirements.txt', 'setup.py', 'pyproject.toml', 'Pipfile'],
                'dirs': ['venv', '.venv', '__pycache__']
            },
            'nodejs': {
                'files': ['package.json', 'package-lock.json', 'yarn.lock'],
                'dirs': ['node_modules', 'dist', 'build']
            },
            'react': {
                'files': ['package.json'],
                'content_patterns': ['"react":', '"@types/react":']
            },
            'vue': {
                'files': ['package.json'],
                'content_patterns': ['"vue":', '"@vue/']
            },
            'angular': {
                'files': ['angular.json', 'package.json'],
                'content_patterns': ['"@angular/']
            },
            'django': {
                'files': ['manage.py', 'settings.py'],
                'dirs': ['migrations']
            },
            'flask': {
                'files': ['app.py', 'requirements.txt'],
                'content_patterns': ['flask', 'Flask']
            },
            'java': {
                'files': ['pom.xml', 'build.gradle', 'build.xml'],
                'dirs': ['src/main/java', 'target', 'build']
            },
            'dotnet': {
                'files': ['.csproj', '.sln', 'project.json'],
                'dirs': ['bin', 'obj']
            },
            'go': {
                'files': ['go.mod', 'go.sum'],
                'dirs': ['vendor']
            },
            'rust': {
                'files': ['Cargo.toml', 'Cargo.lock'],
                'dirs': ['target', 'src']
            }
        }
        
        scores = {}
        
        for project_type, config in indicators.items():
            score = 0
            
            # Verificar archivos
            for file_name in config.get('files', []):
                if (directory / file_name).exists():
                    score += 2
            
            # Verificar directorios
            for dir_name in config.get('dirs', []):
                if (directory / dir_name).exists():
                    score += 1
            
            # Verificar patrones en archivos
            for pattern in config.get('content_patterns', []):
                if self._search_pattern_in_files(directory, pattern):
                    score += 1
            
            if score > 0:
                scores[project_type] = score
        
        if scores:
            best_match = max(scores.items(), key=lambda x: x[1])
            project_info['type'] = best_match[0]
            project_info['confidence'] = min(best_match[1] / 5.0, 1.0)
            
            # Detectar framework específico
            if best_match[0] in ['react', 'vue', 'angular']:
                project_info['framework'] = best_match[0]
                project_info['type'] = 'frontend'
            elif best_match[0] in ['django', 'flask']:
                project_info['framework'] = best_match[0]
                project_info['type'] = 'backend'
        
        return project_info

    def _search_pattern_in_files(self, directory: Path, pattern: str) -> bool:
        """Busca un patrón en archivos de configuración"""
        config_files = ['package.json', 'requirements.txt', 'Pipfile', 'pom.xml']
        
        for file_name in config_files:
            file_path = directory / file_name
            if file_path.exists():
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        if pattern in content:
                            return True
                except (UnicodeDecodeError, PermissionError):
                    continue
        
        return False

    def _analyze_dependencies(self, directory: Path) -> Dict[str, Any]:
        """Analiza las dependencias del proyecto"""
        dependencies = {
            'package_managers': [],
            'dependencies': [],
            'dev_dependencies': [],
            'total_count': 0
        }
        
        # Analizar package.json (Node.js)
        package_json = directory / 'package.json'
        if package_json.exists():
            dependencies['package_managers'].append('npm/yarn')
            try:
                with open(package_json, 'r', encoding='utf-8') as f:
                    data = json.loads(f.read())
                    
                    deps = data.get('dependencies', {})
                    dev_deps = data.get('devDependencies', {})
                    
                    dependencies['dependencies'].extend(list(deps.keys()))
                    dependencies['dev_dependencies'].extend(list(dev_deps.keys()))
                    dependencies['total_count'] += len(deps) + len(dev_deps)
                    
            except (json.JSONDecodeError, UnicodeDecodeError):
                pass
        
        # Analizar requirements.txt (Python)
        requirements_txt = directory / 'requirements.txt'
        if requirements_txt.exists():
            dependencies['package_managers'].append('pip')
            try:
                with open(requirements_txt, 'r', encoding='utf-8') as f:
                    lines = f.readlines()
                    for line in lines:
                        line = line.strip()
                        if line and not line.startswith('#'):
                            # Extraer nombre del paquete (antes de ==, >=, etc.)
                            package_name = re.split(r'[>=<!=]', line)[0].strip()
                            dependencies['dependencies'].append(package_name)
                            dependencies['total_count'] += 1
            except UnicodeDecodeError:
                pass
        
        # Analizar Pipfile (Python)
        pipfile = directory / 'Pipfile'
        if pipfile.exists():
            dependencies['package_managers'].append('pipenv')
            # TODO: Implementar parser de Pipfile
        
        # Analizar pom.xml (Java)
        pom_xml = directory / 'pom.xml'
        if pom_xml.exists():
            dependencies['package_managers'].append('maven')
            # TODO: Implementar parser de pom.xml
        
        # Analizar Cargo.toml (Rust)
        cargo_toml = directory / 'Cargo.toml'
        if cargo_toml.exists():
            dependencies['package_managers'].append('cargo')
            # TODO: Implementar parser de Cargo.toml
        
        return dependencies

    def _analyze_architecture(self, directory: Path, file_tree: Dict[str, Any]) -> Dict[str, Any]:
        """Analiza patrones de arquitectura del proyecto"""
        architecture = {
            'patterns': [],
            'structure_type': 'unknown',
            'complexity': 'low',
            'organization': 'unknown'
        }
        
        # Analizar estructura de directorios
        dir_names = set()
        self._collect_directory_names(file_tree, dir_names)
        
        # Detectar patrones arquitectónicos comunes
        if 'src' in dir_names and 'test' in dir_names:
            architecture['patterns'].append('Standard Source/Test Structure')
        
        if 'models' in dir_names and 'views' in dir_names and 'controllers' in dir_names:
            architecture['patterns'].append('MVC Pattern')
        
        if 'components' in dir_names and 'services' in dir_names:
            architecture['patterns'].append('Component-Service Architecture')
        
        if 'api' in dir_names or 'routes' in dir_names:
            architecture['patterns'].append('API-Driven Architecture')
        
        if 'migrations' in dir_names:
            architecture['patterns'].append('Database Migration Pattern')
        
        if 'docker' in dir_names or any('Dockerfile' in str(f) for f in directory.rglob('*')):
            architecture['patterns'].append('Containerized Architecture')
        
        # Determinar complejidad basada en número de directorios y archivos
        total_dirs = file_tree.get('dir_count', 0)
        total_files = file_tree.get('file_count', 0)
        
        if total_dirs > 20 or total_files > 100:
            architecture['complexity'] = 'high'
        elif total_dirs > 10 or total_files > 50:
            architecture['complexity'] = 'medium'
        
        # Determinar tipo de estructura
        if 'src' in dir_names:
            architecture['structure_type'] = 'source-based'
        elif 'app' in dir_names:
            architecture['structure_type'] = 'app-based'
        elif len(dir_names) < 5:
            architecture['structure_type'] = 'flat'
        else:
            architecture['structure_type'] = 'modular'
        
        return architecture

    def _collect_directory_names(self, tree: Dict[str, Any], dir_names: Set[str]):
        """Recolecta recursivamente nombres de directorios"""
        if tree.get('type') == 'directory':
            dir_names.add(tree['name'].lower())
        
        for child in tree.get('children', []):
            self._collect_directory_names(child, dir_names)

    def _generate_summary(self, directory: Path) -> str:
        """Genera un resumen textual del análisis"""
        stats = self.stats
        
        # Formatear tamaño total
        size_mb = stats['total_size'] / (1024 * 1024)
        size_str = f"{size_mb:.1f} MB" if size_mb > 1 else f"{stats['total_size'] / 1024:.1f} KB"
        
        # Top lenguajes
        top_languages = stats['languages'].most_common(3)
        languages_str = ", ".join([f"{lang} ({count})" for lang, count in top_languages])
        
        # Top extensiones
        top_extensions = stats['file_types'].most_common(3)
        extensions_str = ", ".join([f"{ext} ({count})" for ext, count in top_extensions])
        
        summary = f"""Análisis del directorio: {directory.name}

📊 Estadísticas Generales:
• Total de archivos: {stats['total_files']:,}
• Total de directorios: {stats['total_directories']:,}
• Tamaño total: {size_str}

💻 Lenguajes detectados: {languages_str or 'Ninguno'}
📁 Extensiones principales: {extensions_str or 'Ninguna'}

🏗️ Tipo de proyecto: {stats.get('project_type', 'Desconocido')}
"""
        
        return summary

    def _generate_recommendations(self) -> List[str]:
        """Genera recomendaciones basadas en el análisis"""
        recommendations = []
        
        # Recomendaciones basadas en tamaño
        if self.stats['total_files'] > 1000:
            recommendations.append("Considera organizar el proyecto en módulos más pequeños")
        
        # Recomendaciones basadas en lenguajes
        if len(self.stats['languages']) > 5:
            recommendations.append("Múltiples lenguajes detectados - considera estandarizar tecnologías")
        
        # Recomendaciones basadas en archivos grandes
        large_files = [f for f, size in self.stats['largest_files'] if size > 1024*1024]  # > 1MB
        if large_files:
            recommendations.append("Archivos grandes detectados - considera optimizar o dividir")
        
        # Recomendaciones generales
        if not recommendations:
            recommendations.append("Estructura de proyecto bien organizada")
        
        return recommendations

    def display_analysis_summary(self, analysis: Dict[str, Any]):
        """Muestra un resumen visual del análisis"""
        
        # Panel principal con información básica
        basic_info = f"""
[bold cyan]📁 Directorio:[/bold cyan] {analysis['directory']}
[bold green]📊 Archivos:[/bold green] {analysis['statistics']['total_files']:,}
[bold yellow]📂 Directorios:[/bold yellow] {analysis['statistics']['total_directories']:,}
[bold blue]💾 Tamaño:[/bold blue] {analysis['statistics']['total_size'] / (1024*1024):.1f} MB
[bold magenta]🏗️ Tipo:[/bold magenta] {analysis['project_info']['type']}
"""
        
        console.print(create_panel(
            basic_info.strip(),
            title="📋 Resumen del Análisis",
            style="chispart.brand"
        ))

        # Panel de documentación prioritaria
        doc = analysis.get('documentation')
        if doc and (doc.get('has_readme') or doc.get('count', 0) > 0):
            lines = []
            if doc.get('has_readme'):
                from pathlib import Path as _P
                lines.append(f"📘 README: {_P(doc.get('primary_readme')).name}")
            if doc.get('doc_dirs'):
                from pathlib import Path as _P
                lines.append(f"📚 Directorios: {', '.join([_P(d).name for d in doc.get('doc_dirs', [])])}")
            if doc.get('doc_files'):
                from pathlib import Path as _P
                preview = "\n".join([f"• {_P(p).name}" for p in doc.get('doc_files', [])[:8]])
                lines.append(preview)
            if doc.get('headings'):
                headings = "\n".join([f"# {h}" for h in doc.get('headings', [])[:5]])
                lines.append(f"\n🧭 Encabezados clave:\n{headings}")

            console.print(create_panel(
                "\n".join(lines),
                title="📝 Documentación (Prioritaria)",
                style="chispart.info"
            ))
        
        # Tabla de lenguajes
        if analysis['statistics']['languages']:
            lang_table = create_table(title="💻 Lenguajes Detectados")
            lang_table.add_column("Lenguaje", style="cyan")
            lang_table.add_column("Archivos", style="green", justify="right")
            
            for lang, count in analysis['statistics']['languages'].most_common(10):
                lang_table.add_row(lang.title(), str(count))
            
            console.print(lang_table)

        # Información de muestreo de contenido
        samples = analysis.get('content_samples')
        if samples and samples.get('files'):
            samples_info = f"""
[bold cyan]🗃️ Fragmentos leídos:[/bold cyan] {len(samples.get('files', []))} archivos
[bold blue]🧾 Caracteres totales:[/bold blue] {samples.get('total_chars', 0)} / {samples.get('max_total', 'N/A')}
"""
            console.print(create_panel(
                samples_info.strip(),
                title="📄 Muestreo de Contenido",
                style="chispart.secondary"
            ))
        
        # Información de dependencias
        if analysis['dependencies']['total_count'] > 0:
            deps_info = f"""
[bold cyan]📦 Gestores de paquetes:[/bold cyan] {', '.join(analysis['dependencies']['package_managers'])}
[bold green]📚 Total dependencias:[/bold green] {analysis['dependencies']['total_count']}
[bold yellow]🔧 Dependencias principales:[/bold yellow] {len(analysis['dependencies']['dependencies'])}
[bold blue]🛠️ Dependencias de desarrollo:[/bold blue] {len(analysis['dependencies']['dev_dependencies'])}
"""
            
            console.print(create_panel(
                deps_info.strip(),
                title="📦 Dependencias",
                style="blue"
            ))
        
        # Patrones de arquitectura
        if analysis['architecture']['patterns']:
            arch_info = f"""
[bold cyan]🏗️ Patrones detectados:[/bold cyan]
{chr(10).join([f'• {pattern}' for pattern in analysis['architecture']['patterns']])}

[bold green]📐 Estructura:[/bold green] {analysis['architecture']['structure_type']}
[bold yellow]🔧 Complejidad:[/bold yellow] {analysis['architecture']['complexity']}
"""
            
            console.print(create_panel(
                arch_info.strip(),
                title="🏗️ Arquitectura",
                style="chispart.accent"
            ))
        
        # Recomendaciones
        if analysis['recommendations']:
            rec_info = "\n".join([f"• {rec}" for rec in analysis['recommendations']])
            
            console.print(create_panel(
                rec_info,
                title="💡 Recomendaciones",
                style="chispart.warning"
            ))


# Instancia global del analizador
directory_analyzer = CodebaseAnalyzer()
