import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';

describe('Header Component', () => {
  it('renders the logo and tagline', () => {
    render(<Header />);
    
    expect(screen.getByText('WebCatalog')).toBeInTheDocument();
    expect(screen.getByText('MX')).toBeInTheDocument();
    expect(screen.getByText('Soluciones Digitales para tu Negocio')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header />);
    
    expect(screen.getByText('Catálogo')).toBeInTheDocument();
    expect(screen.getByText('Servicios')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
  });

  it('renders the tour button', () => {
    render(<Header />);
    
    const tourButton = screen.getByRole('button', { name: /tour guiado/i });
    expect(tourButton).toBeInTheDocument();
  });

  it('calls onStartTour when tour button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnStartTour = vi.fn();
    
    render(<Header onStartTour={mockOnStartTour} />);
    
    const tourButton = screen.getByRole('button', { name: /tour guiado/i });
    await user.click(tourButton);
    
    expect(mockOnStartTour).toHaveBeenCalledTimes(1);
  });

  it('renders hero section with main heading', () => {
    render(<Header />);
    
    expect(screen.getByText('Diseño y Desarrollo Web Profesional')).toBeInTheDocument();
    expect(screen.getByText(/Descubre 28 soluciones web/i)).toBeInTheDocument();
  });

  it('displays AI services highlight', () => {
    render(<Header />);
    
    expect(screen.getByText(/Ahora con servicios de Inteligencia Artificial/i)).toBeInTheDocument();
  });
});
