import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import Catalog from './components/Catalog';
import { websites, categories } from './data/websites';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar sitios web basándose en categoría y búsqueda
  const filteredWebsites = useMemo(() => {
    return websites.filter((website) => {
      const matchesCategory = selectedCategory === 'Todos' || website.category === selectedCategory;
      const matchesSearch = searchTerm === '' ||
        website.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        website.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        website.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        website.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <div className="App">
      <Header />

      <main className="main-content">
        <div className="container">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <Filter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <div className="results-count">
            Mostrando {filteredWebsites.length} de {websites.length} servicios
          </div>

          <Catalog websites={filteredWebsites} />
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 WebCatalogMX - Soluciones Digitales para México</p>
          <p className="footer-note">Todos los precios son estimados y pueden variar según requerimientos específicos</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
