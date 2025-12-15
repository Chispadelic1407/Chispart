import React from 'react';
import './Filter.css';

const Filter = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="filter">
      <h3>Filtrar por categoría:</h3>
      <div className="filter-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filter;
