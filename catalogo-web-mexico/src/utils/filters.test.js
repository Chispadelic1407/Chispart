import { describe, it, expect } from 'vitest';
import {
  filterByCategories,
  filterByTechnologies,
  filterByComplexity,
  applyMultipleFilters,
  getUniqueTechnologies,
  filtersToURLParams,
  urlParamsToFilters
} from './filters';

const mockProjects = [
  {
    id: 1,
    title: 'E-commerce App',
    description: 'Online store',
    category: 'E-commerce',
    features: ['Cart', 'Payment', 'Products'],
    technologies: ['React', 'Node.js', 'MongoDB']
  },
  {
    id: 2,
    title: 'Blog Platform',
    description: 'Content management',
    category: 'Blog/Contenido',
    features: ['Posts', 'Comments'],
    technologies: ['React', 'Express']
  },
  {
    id: 3,
    title: 'Complex Dashboard',
    description: 'Analytics platform',
    category: 'Sistema Web',
    features: ['Charts', 'Reports', 'Users', 'Analytics', 'Export', 'Import'],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker']
  }
];

describe('filterByCategories', () => {
  it('should return all projects when no categories selected', () => {
    const result = filterByCategories(mockProjects, []);
    expect(result).toEqual(mockProjects);
  });

  it('should filter by single category', () => {
    const result = filterByCategories(mockProjects, ['E-commerce']);
    expect(result).toHaveLength(1);
    expect(result[0].category).toBe('E-commerce');
  });

  it('should filter by multiple categories', () => {
    const result = filterByCategories(mockProjects, ['E-commerce', 'Blog/Contenido']);
    expect(result).toHaveLength(2);
  });

  it('should return empty array when no matches', () => {
    const result = filterByCategories(mockProjects, ['NonExistent']);
    expect(result).toHaveLength(0);
  });
});

describe('filterByTechnologies', () => {
  it('should return all projects when no technologies selected', () => {
    const result = filterByTechnologies(mockProjects, []);
    expect(result).toEqual(mockProjects);
  });

  it('should filter by single technology', () => {
    const result = filterByTechnologies(mockProjects, ['MongoDB']);
    expect(result).toHaveLength(1);
    expect(result[0].technologies).toContain('MongoDB');
  });

  it('should filter by multiple technologies (OR logic)', () => {
    const result = filterByTechnologies(mockProjects, ['MongoDB', 'Express']);
    expect(result).toHaveLength(2);
  });

  it('should be case insensitive', () => {
    const result = filterByTechnologies(mockProjects, ['react']);
    expect(result).toHaveLength(3);
  });

  it('should support partial matches', () => {
    const result = filterByTechnologies(mockProjects, ['Node']);
    expect(result).toHaveLength(2);
  });
});

describe('filterByComplexity', () => {
  it('should return all projects when no complexity specified', () => {
    const result = filterByComplexity(mockProjects, null);
    expect(result).toEqual(mockProjects);
  });

  it('should filter simple projects', () => {
    const result = filterByComplexity(mockProjects, 'simple');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Blog Platform');
  });

  it('should filter medium complexity projects', () => {
    const result = filterByComplexity(mockProjects, 'medium');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('E-commerce App');
  });

  it('should filter complex projects', () => {
    const result = filterByComplexity(mockProjects, 'complex');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Complex Dashboard');
  });
});

describe('applyMultipleFilters', () => {
  it('should apply no filters when empty', () => {
    const result = applyMultipleFilters(mockProjects, {});
    expect(result).toEqual(mockProjects);
  });

  it('should apply category filter only', () => {
    const result = applyMultipleFilters(mockProjects, {
      categories: ['E-commerce']
    });
    expect(result).toHaveLength(1);
  });

  it('should apply technology filter only', () => {
    const result = applyMultipleFilters(mockProjects, {
      technologies: ['MongoDB']
    });
    expect(result).toHaveLength(1);
  });

  it('should apply complexity filter only', () => {
    const result = applyMultipleFilters(mockProjects, {
      complexity: 'simple'
    });
    expect(result).toHaveLength(1);
  });

  it('should apply search term filter only', () => {
    const result = applyMultipleFilters(mockProjects, {
      searchTerm: 'dashboard'
    });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Complex Dashboard');
  });

  it('should apply multiple filters with AND logic', () => {
    const result = applyMultipleFilters(mockProjects, {
      categories: ['E-commerce', 'Sistema Web'],
      technologies: ['React']
    });
    expect(result).toHaveLength(2);
  });

  it('should return empty when filters dont match', () => {
    const result = applyMultipleFilters(mockProjects, {
      categories: ['E-commerce'],
      technologies: ['PostgreSQL']
    });
    expect(result).toHaveLength(0);
  });

  it('should search across multiple fields', () => {
    const result = applyMultipleFilters(mockProjects, {
      searchTerm: 'react'
    });
    expect(result).toHaveLength(3);
  });
});

describe('getUniqueTechnologies', () => {
  it('should return unique technologies sorted', () => {
    const result = getUniqueTechnologies(mockProjects);
    expect(result).toContain('React');
    expect(result).toContain('Node.js');
    expect(result).toContain('MongoDB');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should not have duplicates', () => {
    const result = getUniqueTechnologies(mockProjects);
    const uniqueSet = new Set(result);
    expect(result.length).toBe(uniqueSet.size);
  });

  it('should be sorted alphabetically', () => {
    const result = getUniqueTechnologies(mockProjects);
    const sorted = [...result].sort();
    expect(result).toEqual(sorted);
  });
});

describe('filtersToURLParams', () => {
  it('should convert empty filters to empty params', () => {
    const params = filtersToURLParams({});
    expect(params.toString()).toBe('');
  });

  it('should convert categories to URL params', () => {
    const params = filtersToURLParams({
      categories: ['E-commerce', 'Blog']
    });
    expect(params.get('categories')).toBe('E-commerce,Blog');
  });

  it('should convert technologies to URL params', () => {
    const params = filtersToURLParams({
      technologies: ['React', 'Node.js']
    });
    expect(params.get('technologies')).toBe('React,Node.js');
  });

  it('should convert complexity to URL params', () => {
    const params = filtersToURLParams({
      complexity: 'medium'
    });
    expect(params.get('complexity')).toBe('medium');
  });

  it('should convert search term to URL params', () => {
    const params = filtersToURLParams({
      searchTerm: 'dashboard'
    });
    expect(params.get('search')).toBe('dashboard');
  });

  it('should convert all filters to URL params', () => {
    const params = filtersToURLParams({
      categories: ['E-commerce'],
      technologies: ['React'],
      complexity: 'medium',
      searchTerm: 'store'
    });
    expect(params.get('categories')).toBe('E-commerce');
    expect(params.get('technologies')).toBe('React');
    expect(params.get('complexity')).toBe('medium');
    expect(params.get('search')).toBe('store');
  });
});

describe('urlParamsToFilters', () => {
  it('should convert empty params to empty filters', () => {
    const params = new URLSearchParams();
    const filters = urlParamsToFilters(params);
    expect(filters.categories).toEqual([]);
    expect(filters.technologies).toEqual([]);
    expect(filters.complexity).toBeNull();
    expect(filters.searchTerm).toBe('');
  });

  it('should convert categories from URL params', () => {
    const params = new URLSearchParams('categories=E-commerce,Blog');
    const filters = urlParamsToFilters(params);
    expect(filters.categories).toEqual(['E-commerce', 'Blog']);
  });

  it('should convert technologies from URL params', () => {
    const params = new URLSearchParams('technologies=React,Node.js');
    const filters = urlParamsToFilters(params);
    expect(filters.technologies).toEqual(['React', 'Node.js']);
  });

  it('should convert complexity from URL params', () => {
    const params = new URLSearchParams('complexity=medium');
    const filters = urlParamsToFilters(params);
    expect(filters.complexity).toBe('medium');
  });

  it('should convert search term from URL params', () => {
    const params = new URLSearchParams('search=dashboard');
    const filters = urlParamsToFilters(params);
    expect(filters.searchTerm).toBe('dashboard');
  });

  it('should convert all params to filters', () => {
    const params = new URLSearchParams('categories=E-commerce&technologies=React&complexity=medium&search=store');
    const filters = urlParamsToFilters(params);
    expect(filters.categories).toEqual(['E-commerce']);
    expect(filters.technologies).toEqual(['React']);
    expect(filters.complexity).toBe('medium');
    expect(filters.searchTerm).toBe('store');
  });
});
