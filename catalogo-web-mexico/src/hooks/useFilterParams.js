import { useState, useEffect, useCallback } from 'react';
import { filtersToURLParams, urlParamsToFilters } from '../utils/filters';

/**
 * Hook personalizado para sincronizar filtros con parámetros URL
 * @returns {Object} { filters, updateFilters, clearFilters }
 */
export const useFilterParams = () => {
  const [filters, setFilters] = useState({
    categories: [],
    technologies: [],
    complexity: null,
    searchTerm: ''
  });

  // Cargar filtros desde URL al montar
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const filtersFromURL = urlParamsToFilters(params);
    setFilters(filtersFromURL);
  }, []);

  // Actualizar URL cuando cambien los filtros
  useEffect(() => {
    const params = filtersToURLParams(filters);
    const newURL = params.toString() 
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    
    // Usar replaceState para no agregar al historial en cada cambio
    window.history.replaceState({}, '', newURL);
  }, [filters]);

  // Función para actualizar filtros
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);

  // Función para limpiar todos los filtros
  const clearFilters = useCallback(() => {
    setFilters({
      categories: [],
      technologies: [],
      complexity: null,
      searchTerm: ''
    });
  }, []);

  // Función para obtener el conteo de filtros activos
  const getActiveFilterCount = useCallback(() => {
    let count = 0;
    if (filters.categories.length > 0) count += filters.categories.length;
    if (filters.technologies.length > 0) count += filters.technologies.length;
    if (filters.complexity) count += 1;
    if (filters.searchTerm) count += 1;
    return count;
  }, [filters]);

  return {
    filters,
    updateFilters,
    clearFilters,
    getActiveFilterCount
  };
};
