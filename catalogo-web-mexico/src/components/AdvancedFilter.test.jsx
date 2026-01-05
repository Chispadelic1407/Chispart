import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdvancedFilter from './AdvancedFilter';

const mockProjects = [
  {
    id: 1,
    category: 'E-commerce',
    technologies: ['React', 'Node.js'],
    features: ['Cart', 'Payment']
  },
  {
    id: 2,
    category: 'Blog',
    technologies: ['React', 'Express'],
    features: ['Posts']
  }
];

const mockCategories = ['Todos', 'E-commerce', 'Blog', 'Sistema Web'];

describe('AdvancedFilter Component', () => {
  const defaultProps = {
    projects: mockProjects,
    selectedCategories: [],
    selectedTechnologies: [],
    selectedComplexity: null,
    categories: mockCategories,
    onCategoryChange: vi.fn(),
    onTechnologyChange: vi.fn(),
    onComplexityChange: vi.fn(),
    onClearAll: vi.fn(),
    activeFilterCount: 0
  };

  it('should render filter toggle button', () => {
    render(<AdvancedFilter {...defaultProps} />);
    
    const toggleButton = screen.getByRole('button', { name: /filtros avanzados/i });
    expect(toggleButton).toBeInTheDocument();
  });

  it('should expand filter content when toggle is clicked', async () => {
    const user = userEvent.setup();
    render(<AdvancedFilter {...defaultProps} />);
    
    const toggleButton = screen.getByRole('button', { name: /filtros avanzados/i });
    
    // Initially collapsed
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    
    // Click to expand
    await user.click(toggleButton);
    
    // Should be expanded
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Categorías')).toBeVisible();
  });

  it('should display category checkboxes', async () => {
    const user = userEvent.setup();
    render(<AdvancedFilter {...defaultProps} />);
    
    const toggleButton = screen.getByRole('button', { name: /filtros avanzados/i });
    await user.click(toggleButton);
    
    // Should show categories (excluding 'Todos')
    expect(screen.getByLabelText(/filtrar por e-commerce/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/filtrar por blog/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/filtrar por sistema web/i)).toBeInTheDocument();
  });

  it('should call onCategoryChange when category is selected', async () => {
    const user = userEvent.setup();
    const onCategoryChange = vi.fn();
    
    render(<AdvancedFilter {...defaultProps} onCategoryChange={onCategoryChange} />);
    
    const toggleButton = screen.getByRole('button', { name: /filtros avanzados/i });
    await user.click(toggleButton);
    
    const ecommerceCheckbox = screen.getByLabelText(/filtrar por e-commerce/i);
    await user.click(ecommerceCheckbox);
    
    expect(onCategoryChange).toHaveBeenCalledWith(['E-commerce']);
  });

  it('should display technology chips', async () => {
    const user = userEvent.setup();
    render(<AdvancedFilter {...defaultProps} />);
    
    const toggleButton = screen.getByRole('button', { name: /filtros avanzados/i });
    await user.click(toggleButton);
    
    expect(screen.getByText('Tecnologías')).toBeVisible();
    expect(screen.getByRole('button', { name: /filtrar por react/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /filtrar por node\.js/i })).toBeInTheDocument();
  });

  it('should call onTechnologyChange when technology is selected', async () => {
    const user = userEvent.setup();
    const onTechnologyChange = vi.fn();
    
    render(<AdvancedFilter {...defaultProps} onTechnologyChange={onTechnologyChange} />);
    
    const toggleButton = screen.getByRole('button', { name: /filtros avanzados/i });
    await user.click(toggleButton);
    
    const reactChip = screen.getByRole('button', { name: /filtrar por react/i });
    await user.click(reactChip);
    
    expect(onTechnologyChange).toHaveBeenCalledWith(['React']);
  });

  it('should display complexity buttons', async () => {
    const user = userEvent.setup();
    render(<AdvancedFilter {...defaultProps} />);
    
    const toggleButton = screen.getByRole('button', { name: /filtros avanzados/i });
    await user.click(toggleButton);
    
    expect(screen.getByText('Nivel de Complejidad')).toBeVisible();
    expect(screen.getByRole('button', { name: /filtrar proyectos simples/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /filtrar proyectos de complejidad media/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /filtrar proyectos complejos/i })).toBeInTheDocument();
  });

  it('should call onComplexityChange when complexity is selected', async () => {
    const user = userEvent.setup();
    const onComplexityChange = vi.fn();
    
    render(<AdvancedFilter {...defaultProps} onComplexityChange={onComplexityChange} />);
    
    const toggleButton = screen.getByRole('button', { name: /filtros avanzados/i });
    await user.click(toggleButton);
    
    const mediumBtn = screen.getByRole('button', { name: /filtrar proyectos de complejidad media/i });
    await user.click(mediumBtn);
    
    expect(onComplexityChange).toHaveBeenCalledWith('medium');
  });

  it('should show active filter count badge', () => {
    render(<AdvancedFilter {...defaultProps} activeFilterCount={3} />);
    
    const badge = screen.getByLabelText(/3 filtros activos/i);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('3');
  });

  it('should show clear filters button when filters are active', () => {
    render(<AdvancedFilter {...defaultProps} activeFilterCount={2} />);
    
    const clearButton = screen.getByRole('button', { name: /limpiar todos los filtros/i });
    expect(clearButton).toBeInTheDocument();
  });

  it('should call onClearAll when clear button is clicked', async () => {
    const user = userEvent.setup();
    const onClearAll = vi.fn();
    
    render(<AdvancedFilter {...defaultProps} activeFilterCount={2} onClearAll={onClearAll} />);
    
    const clearButton = screen.getByRole('button', { name: /limpiar todos los filtros/i });
    await user.click(clearButton);
    
    expect(onClearAll).toHaveBeenCalledTimes(1);
  });

  it('should display active filter tags when expanded', async () => {
    const user = userEvent.setup();
    
    render(
      <AdvancedFilter 
        {...defaultProps} 
        selectedCategories={['E-commerce']}
        selectedTechnologies={['React']}
        selectedComplexity="medium"
        activeFilterCount={3}
      />
    );
    
    const toggleButton = screen.getByRole('button', { name: /filtros avanzados/i });
    await user.click(toggleButton);
    
    expect(screen.getByText('Filtros Activos (3)')).toBeVisible();
    expect(screen.getByText('E-commerce')).toBeVisible();
    expect(screen.getByText('React')).toBeVisible();
    expect(screen.getByText(/complejidad: medium/i)).toBeVisible();
  });

  it('should remove individual filter when X is clicked', async () => {
    const user = userEvent.setup();
    const onCategoryChange = vi.fn();
    
    render(
      <AdvancedFilter 
        {...defaultProps} 
        selectedCategories={['E-commerce']}
        activeFilterCount={1}
        onCategoryChange={onCategoryChange}
      />
    );
    
    const toggleButton = screen.getByRole('button', { name: /filtros avanzados/i });
    await user.click(toggleButton);
    
    const removeButton = screen.getByRole('button', { name: /quitar filtro e-commerce/i });
    await user.click(removeButton);
    
    expect(onCategoryChange).toHaveBeenCalledWith([]);
  });

  it('should have correct ARIA attributes', async () => {
    const user = userEvent.setup();
    render(<AdvancedFilter {...defaultProps} />);
    
    const toggleButton = screen.getByRole('button', { name: /filtros avanzados/i });
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    
    await user.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('should mark selected technologies as active', async () => {
    const user = userEvent.setup();
    
    render(
      <AdvancedFilter 
        {...defaultProps} 
        selectedTechnologies={['React']}
      />
    );
    
    const toggleButton = screen.getByRole('button', { name: /filtros avanzados/i });
    await user.click(toggleButton);
    
    const reactChip = screen.getByRole('button', { name: /filtrar por react/i });
    expect(reactChip).toHaveClass('active');
    expect(reactChip).toHaveAttribute('aria-pressed', 'true');
  });
});
