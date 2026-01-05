import React, { useState } from 'react';
import { getUniqueTechnologies } from '../utils/filters';
import './AdvancedFilter.css';

const AdvancedFilter = ({ 
  projects,
  selectedCategories = [],
  selectedTechnologies = [],
  selectedComplexity = null,
  categories = [],
  onCategoryChange,
  onTechnologyChange,
  onComplexityChange,
  onClearAll,
  activeFilterCount = 0
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const uniqueTechnologies = getUniqueTechnologies(projects);

  const handleCategoryToggle = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    onCategoryChange(newCategories);
  };

  const handleTechnologyToggle = (tech) => {
    const newTechnologies = selectedTechnologies.includes(tech)
      ? selectedTechnologies.filter(t => t !== tech)
      : [...selectedTechnologies, tech];
    onTechnologyChange(newTechnologies);
  };

  const handleComplexityChange = (complexity) => {
    onComplexityChange(selectedComplexity === complexity ? null : complexity);
  };

  return (
    <div className="advanced-filter">
      <div className="filter-header">
        <button
          className="filter-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-label="Filtros avanzados"
        >
          <span className="filter-icon">🔍</span>
          <span className="filter-text">Filtros Avanzados</span>
          {activeFilterCount > 0 && (
            <span className="filter-count-badge" aria-label={`${activeFilterCount} filtros activos`}>
              {activeFilterCount}
            </span>
          )}
          <span className="expand-icon" aria-hidden="true">
            {isExpanded ? '▲' : '▼'}
          </span>
        </button>

        {activeFilterCount > 0 && (
          <button
            className="clear-filters-btn"
            onClick={onClearAll}
            aria-label="Limpiar todos los filtros"
          >
            <span aria-hidden="true">✕</span> Limpiar Filtros
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="filter-content">
          {/* Filtros de Categoría */}
          <div className="filter-section">
            <h4 className="filter-section-title">Categorías</h4>
            <div className="filter-options">
              {categories.filter(cat => cat !== 'Todos').map(category => (
                <label key={category} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    aria-label={`Filtrar por ${category}`}
                  />
                  <span className="checkbox-label">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filtros de Tecnología */}
          <div className="filter-section">
            <h4 className="filter-section-title">Tecnologías</h4>
            <div className="filter-chips">
              {uniqueTechnologies.slice(0, 15).map(tech => (
                <button
                  key={tech}
                  className={`tech-chip ${selectedTechnologies.includes(tech) ? 'active' : ''}`}
                  onClick={() => handleTechnologyToggle(tech)}
                  aria-pressed={selectedTechnologies.includes(tech)}
                  aria-label={`Filtrar por ${tech}`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          {/* Filtros de Complejidad */}
          <div className="filter-section">
            <h4 className="filter-section-title">Nivel de Complejidad</h4>
            <div className="complexity-options">
              <button
                className={`complexity-btn ${selectedComplexity === 'simple' ? 'active' : ''}`}
                onClick={() => handleComplexityChange('simple')}
                aria-pressed={selectedComplexity === 'simple'}
                aria-label="Filtrar proyectos simples"
              >
                <span className="complexity-icon">⭐</span>
                <span>Simple</span>
              </button>
              <button
                className={`complexity-btn ${selectedComplexity === 'medium' ? 'active' : ''}`}
                onClick={() => handleComplexityChange('medium')}
                aria-pressed={selectedComplexity === 'medium'}
                aria-label="Filtrar proyectos de complejidad media"
              >
                <span className="complexity-icon">⭐⭐</span>
                <span>Medio</span>
              </button>
              <button
                className={`complexity-btn ${selectedComplexity === 'complex' ? 'active' : ''}`}
                onClick={() => handleComplexityChange('complex')}
                aria-pressed={selectedComplexity === 'complex'}
                aria-label="Filtrar proyectos complejos"
              >
                <span className="complexity-icon">⭐⭐⭐</span>
                <span>Complejo</span>
              </button>
            </div>
          </div>

          {/* Indicadores de Filtros Activos */}
          {activeFilterCount > 0 && (
            <div className="active-filters">
              <h4 className="filter-section-title">Filtros Activos ({activeFilterCount})</h4>
              <div className="active-filter-tags">
                {selectedCategories.map(cat => (
                  <span key={cat} className="active-filter-tag">
                    {cat}
                    <button
                      className="remove-filter"
                      onClick={() => handleCategoryToggle(cat)}
                      aria-label={`Quitar filtro ${cat}`}
                    >
                      ✕
                    </button>
                  </span>
                ))}
                {selectedTechnologies.map(tech => (
                  <span key={tech} className="active-filter-tag tech">
                    {tech}
                    <button
                      className="remove-filter"
                      onClick={() => handleTechnologyToggle(tech)}
                      aria-label={`Quitar filtro ${tech}`}
                    >
                      ✕
                    </button>
                  </span>
                ))}
                {selectedComplexity && (
                  <span className="active-filter-tag complexity">
                    Complejidad: {selectedComplexity}
                    <button
                      className="remove-filter"
                      onClick={() => handleComplexityChange(selectedComplexity)}
                      aria-label="Quitar filtro de complejidad"
                    >
                      ✕
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedFilter;
