import React from 'react';
import WebsiteCard from './WebsiteCard';
import './Catalog.css';

const Catalog = ({ websites }) => {
  return (
    <div className="catalog" id="catalogo">
      {websites.length === 0 ? (
        <div className="no-results">
          <h3>No se encontraron resultados</h3>
          <p>Intenta con otros términos de búsqueda o filtros</p>
        </div>
      ) : (
        <div className="catalog-grid">
          {websites.map((website) => (
            <WebsiteCard key={website.id} website={website} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;
