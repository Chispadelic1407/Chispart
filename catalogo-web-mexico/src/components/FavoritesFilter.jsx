import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import './FavoritesFilter.css';

const FavoritesFilter = ({ showOnlyFavorites, setShowOnlyFavorites }) => {
  const { favorites } = useFavorites();

  return (
    <div className="favorites-filter">
      <button
        className={`favorites-toggle ${showOnlyFavorites ? 'active' : ''}`}
        onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
        aria-pressed={showOnlyFavorites}
        aria-label={showOnlyFavorites ? 'Mostrar todos los proyectos' : 'Mostrar solo favoritos'}
      >
        <span className="heart-icon" aria-hidden="true">❤️</span>
        <span className="favorites-text">
          {showOnlyFavorites ? 'Mostrando Favoritos' : 'Ver Favoritos'}
        </span>
        {favorites.length > 0 && (
          <span className="favorites-count" aria-label={`${favorites.length} favoritos`}>
            {favorites.length}
          </span>
        )}
      </button>
    </div>
  );
};

export default FavoritesFilter;
