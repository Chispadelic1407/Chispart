import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { FavoritesProvider, useFavorites } from './FavoritesContext';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

global.localStorage = localStorageMock;

describe('FavoritesContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should initialize with empty favorites', () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    expect(result.current.favorites).toEqual([]);
  });

  it('should add a favorite', () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    act(() => {
      result.current.addFavorite('project-1');
    });

    expect(result.current.favorites).toContain('project-1');
    expect(result.current.isFavorite('project-1')).toBe(true);
  });

  it('should not add duplicate favorites', () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    act(() => {
      result.current.addFavorite('project-1');
      result.current.addFavorite('project-1');
    });

    expect(result.current.favorites).toEqual(['project-1']);
  });

  it('should remove a favorite', () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    act(() => {
      result.current.addFavorite('project-1');
      result.current.addFavorite('project-2');
    });

    act(() => {
      result.current.removeFavorite('project-1');
    });

    expect(result.current.favorites).not.toContain('project-1');
    expect(result.current.favorites).toContain('project-2');
    expect(result.current.isFavorite('project-1')).toBe(false);
  });

  it('should toggle favorite on and off', () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    act(() => {
      result.current.toggleFavorite('project-1');
    });

    expect(result.current.isFavorite('project-1')).toBe(true);

    act(() => {
      result.current.toggleFavorite('project-1');
    });

    expect(result.current.isFavorite('project-1')).toBe(false);
  });

  it('should persist favorites to localStorage', () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    act(() => {
      result.current.addFavorite('project-1');
      result.current.addFavorite('project-2');
    });

    const stored = localStorage.getItem('favorites');
    expect(stored).toBe(JSON.stringify(['project-1', 'project-2']));
  });

  it('should load favorites from localStorage on mount', () => {
    localStorage.setItem('favorites', JSON.stringify(['project-1', 'project-2']));

    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    // Wait for useEffect to run
    expect(result.current.favorites).toEqual(['project-1', 'project-2']);
    expect(result.current.isFavorite('project-1')).toBe(true);
    expect(result.current.isFavorite('project-2')).toBe(true);
  });

  it('should handle corrupted localStorage data gracefully', () => {
    localStorage.setItem('favorites', 'invalid-json');

    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    expect(result.current.favorites).toEqual([]);
  });

  it('should check if project is favorite', () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    act(() => {
      result.current.addFavorite('project-1');
    });

    expect(result.current.isFavorite('project-1')).toBe(true);
    expect(result.current.isFavorite('project-2')).toBe(false);
  });
});
