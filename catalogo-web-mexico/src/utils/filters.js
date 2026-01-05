/**
 * Utilidades para filtrado avanzado de proyectos
 */

/**
 * Filtra proyectos por múltiples categorías
 * @param {Array} projects - Lista de proyectos
 * @param {Array} categories - Categorías seleccionadas
 * @returns {Array} Proyectos filtrados
 */
export const filterByCategories = (projects, categories) => {
  if (!categories || categories.length === 0) {
    return projects;
  }
  return projects.filter(project => categories.includes(project.category));
};

/**
 * Filtra proyectos por tecnologías
 * @param {Array} projects - Lista de proyectos
 * @param {Array} technologies - Tecnologías seleccionadas
 * @returns {Array} Proyectos filtrados
 */
export const filterByTechnologies = (projects, technologies) => {
  if (!technologies || technologies.length === 0) {
    return projects;
  }
  return projects.filter(project => 
    technologies.some(tech => 
      project.technologies.some(projectTech => 
        projectTech.toLowerCase().includes(tech.toLowerCase())
      )
    )
  );
};

/**
 * Filtra proyectos por nivel de complejidad
 * @param {Array} projects - Lista de proyectos
 * @param {String} complexity - Nivel de complejidad ('simple', 'medium', 'complex')
 * @returns {Array} Proyectos filtrados
 */
export const filterByComplexity = (projects, complexity) => {
  if (!complexity) {
    return projects;
  }
  
  // Determinar complejidad basada en número de características y tecnologías
  return projects.filter(project => {
    const featureCount = project.features?.length || 0;
    const techCount = project.technologies?.length || 0;
    const totalComplexity = featureCount + techCount;
    
    if (complexity === 'simple') {
      return totalComplexity <= 8;
    } else if (complexity === 'medium') {
      return totalComplexity > 8 && totalComplexity <= 15;
    } else if (complexity === 'complex') {
      return totalComplexity > 15;
    }
    
    return true;
  });
};

/**
 * Aplica múltiples filtros a la lista de proyectos (lógica AND)
 * @param {Array} projects - Lista de proyectos
 * @param {Object} filters - Objeto con filtros { categories, technologies, complexity, searchTerm }
 * @returns {Array} Proyectos filtrados
 */
export const applyMultipleFilters = (projects, filters) => {
  let filtered = [...projects];
  
  // Filtrar por categorías
  if (filters.categories && filters.categories.length > 0) {
    filtered = filterByCategories(filtered, filters.categories);
  }
  
  // Filtrar por tecnologías
  if (filters.technologies && filters.technologies.length > 0) {
    filtered = filterByTechnologies(filtered, filters.technologies);
  }
  
  // Filtrar por complejidad
  if (filters.complexity) {
    filtered = filterByComplexity(filtered, filters.complexity);
  }
  
  // Filtrar por término de búsqueda
  if (filters.searchTerm && filters.searchTerm.trim() !== '') {
    const searchLower = filters.searchTerm.toLowerCase();
    filtered = filtered.filter(project =>
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower) ||
      project.category.toLowerCase().includes(searchLower) ||
      project.features.some(feature => feature.toLowerCase().includes(searchLower)) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchLower))
    );
  }
  
  return filtered;
};

/**
 * Obtiene todas las tecnologías únicas de los proyectos
 * @param {Array} projects - Lista de proyectos
 * @returns {Array} Lista de tecnologías únicas ordenadas
 */
export const getUniqueTechnologies = (projects) => {
  const techSet = new Set();
  projects.forEach(project => {
    project.technologies?.forEach(tech => techSet.add(tech));
  });
  return Array.from(techSet).sort();
};

/**
 * Convierte filtros a parámetros URL
 * @param {Object} filters - Objeto con filtros
 * @returns {URLSearchParams} Parámetros URL
 */
export const filtersToURLParams = (filters) => {
  const params = new URLSearchParams();
  
  if (filters.categories && filters.categories.length > 0) {
    params.set('categories', filters.categories.join(','));
  }
  
  if (filters.technologies && filters.technologies.length > 0) {
    params.set('technologies', filters.technologies.join(','));
  }
  
  if (filters.complexity) {
    params.set('complexity', filters.complexity);
  }
  
  if (filters.searchTerm) {
    params.set('search', filters.searchTerm);
  }
  
  return params;
};

/**
 * Convierte parámetros URL a objeto de filtros
 * @param {URLSearchParams} params - Parámetros URL
 * @returns {Object} Objeto con filtros
 */
export const urlParamsToFilters = (params) => {
  const filters = {
    categories: [],
    technologies: [],
    complexity: null,
    searchTerm: ''
  };
  
  const categoriesParam = params.get('categories');
  if (categoriesParam) {
    filters.categories = categoriesParam.split(',').filter(Boolean);
  }
  
  const technologiesParam = params.get('technologies');
  if (technologiesParam) {
    filters.technologies = technologiesParam.split(',').filter(Boolean);
  }
  
  const complexityParam = params.get('complexity');
  if (complexityParam) {
    filters.complexity = complexityParam;
  }
  
  const searchParam = params.get('search');
  if (searchParam) {
    filters.searchTerm = searchParam;
  }
  
  return filters;
};
