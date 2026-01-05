import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoriteButton from './FavoriteButton';
import { FavoritesProvider } from '../context/FavoritesContext';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

global.localStorage = localStorageMock;

describe('FavoriteButton Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderWithProvider = (component) => {
    return render(<FavoritesProvider>{component}</FavoritesProvider>);
  };

  it('should render favorite button', () => {
    renderWithProvider(<FavoriteButton projectId="test-1" projectTitle="Test Project" />);
    
    const button = screen.getByRole('button', { name: /agregar test project a favoritos/i });
    expect(button).toBeInTheDocument();
  });

  it('should show unfilled heart when not favorited', () => {
    renderWithProvider(<FavoriteButton projectId="test-1" projectTitle="Test Project" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('🤍');
    expect(button).not.toHaveClass('favorited');
  });

  it('should toggle favorite on click', async () => {
    const user = userEvent.setup();
    renderWithProvider(<FavoriteButton projectId="test-1" projectTitle="Test Project" />);
    
    const button = screen.getByRole('button');
    
    // Initially not favorited
    expect(button).toHaveTextContent('🤍');
    
    // Click to favorite
    await user.click(button);
    
    // Should now be favorited
    expect(button).toHaveTextContent('❤️');
    expect(button).toHaveClass('favorited');
  });

  it('should unfavorite when clicked again', async () => {
    const user = userEvent.setup();
    renderWithProvider(<FavoriteButton projectId="test-1" projectTitle="Test Project" />);
    
    const button = screen.getByRole('button');
    
    // Click to favorite
    await user.click(button);
    expect(button).toHaveTextContent('❤️');
    
    // Click again to unfavorite
    await user.click(button);
    expect(button).toHaveTextContent('🤍');
    expect(button).not.toHaveClass('favorited');
  });

  it('should have correct ARIA labels', () => {
    renderWithProvider(<FavoriteButton projectId="test-1" projectTitle="Test Project" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Agregar Test Project a favoritos');
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('should update ARIA labels when favorited', async () => {
    const user = userEvent.setup();
    renderWithProvider(<FavoriteButton projectId="test-1" projectTitle="Test Project" />);
    
    const button = screen.getByRole('button');
    
    await user.click(button);
    
    expect(button).toHaveAttribute('aria-label', 'Quitar Test Project de favoritos');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('should stop event propagation on click', async () => {
    const user = userEvent.setup();
    const parentClickHandler = vi.fn();
    
    render(
      <FavoritesProvider>
        <div onClick={parentClickHandler}>
          <FavoriteButton projectId="test-1" projectTitle="Test Project" />
        </div>
      </FavoritesProvider>
    );
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    // Parent click handler should not be called
    expect(parentClickHandler).not.toHaveBeenCalled();
  });

  it('should be keyboard accessible', async () => {
    const user = userEvent.setup();
    renderWithProvider(<FavoriteButton projectId="test-1" projectTitle="Test Project" />);
    
    const button = screen.getByRole('button');
    
    // Focus the button
    button.focus();
    expect(button).toHaveFocus();
    
    // Press Enter to toggle
    await user.keyboard('{Enter}');
    expect(button).toHaveTextContent('❤️');
  });
});
