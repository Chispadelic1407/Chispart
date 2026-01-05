import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Cargar favoritos desde localStorage al montar
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
        setFavorites([]);
      }
    }
  }, []);

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (projectId) => {
    setFavorites((prev) => {
      if (prev.includes(projectId)) {
        return prev;
      }
      return [...prev, projectId];
    });
  };

  const removeFavorite = (projectId) => {
    setFavorites((prev) => prev.filter((id) => id !== projectId));
  };

  const isFavorite = (projectId) => {
    return favorites.includes(projectId);
  };

  const toggleFavorite = (projectId) => {
    if (isFavorite(projectId)) {
      removeFavorite(projectId);
    } else {
      addFavorite(projectId);
    }
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
