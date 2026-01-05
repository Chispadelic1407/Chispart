import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import './FavoriteButton.css';

const FavoriteButton = ({ projectId, projectTitle }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(projectId);

  const handleClick = (e) => {
    e.stopPropagation();
    toggleFavorite(projectId);
  };

  return (
    <button
      className={`favorite-button ${favorited ? 'favorited' : ''}`}
      onClick={handleClick}
      aria-label={favorited ? `Quitar ${projectTitle} de favoritos` : `Agregar ${projectTitle} a favoritos`}
      aria-pressed={favorited}
      title={favorited ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      <span className="heart-icon" aria-hidden="true">
        {favorited ? '❤️' : '🤍'}
      </span>
    </button>
  );
};

export default FavoriteButton;
