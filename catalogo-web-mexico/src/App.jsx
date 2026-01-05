import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import FavoritesFilter from './components/FavoritesFilter';
import Catalog from './components/Catalog';
import InteractiveTour from './components/InteractiveTour';
import PaymentMockup from './components/PaymentMockup';
import { FavoritesProvider, useFavorites } from './context/FavoritesContext';
import { websites, categories } from './data/websites';
import './App.css';

function AppContent() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const { favorites } = useFavorites();

  // Verificar si es la primera visita
  useEffect(() => {
    const tourCompleted = localStorage.getItem('tourCompleted');
    if (!tourCompleted) {
      // Mostrar el tour automáticamente después de 1 segundo
      setTimeout(() => {
        setShowTour(true);
      }, 1000);
    }
  }, []);

  // Filtrar sitios web basándose en categoría, búsqueda y favoritos
  const filteredWebsites = useMemo(() => {
    return websites.filter((website) => {
      const matchesCategory = selectedCategory === 'Todos' || website.category === selectedCategory;
      const matchesSearch = searchTerm === '' ||
        website.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        website.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        website.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        website.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesFavorites = !showOnlyFavorites || favorites.includes(website.id);

      return matchesCategory && matchesSearch && matchesFavorites;
    });
  }, [selectedCategory, searchTerm, showOnlyFavorites, favorites]);

  const handleStartTour = () => {
    setShowTour(true);
  };

  const handleCloseTour = () => {
    setShowTour(false);
  };

  const handleQuote = (service) => {
    setSelectedService(service);
    setShowPayment(true);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
    setSelectedService(null);
  };

  return (
    <div className="App">
      <Header onStartTour={handleStartTour} />

      <main className="main-content">
        <div className="container">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <Filter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <FavoritesFilter 
            showOnlyFavorites={showOnlyFavorites}
            setShowOnlyFavorites={setShowOnlyFavorites}
          />

          <div className="results-count">
            Mostrando {filteredWebsites.length} de {websites.length} servicios
            {showOnlyFavorites && favorites.length > 0 && ' (Favoritos)'}
            {showOnlyFavorites && favorites.length === 0 && ' - No hay favoritos guardados'}
          </div>

          <Catalog websites={filteredWebsites} onQuote={handleQuote} />
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 WebCatalogMX - Soluciones Digitales para México</p>
          <p className="footer-note">Todos los precios son estimados y pueden variar según requerimientos específicos</p>
        </div>
      </footer>

      {showTour && <InteractiveTour onClose={handleCloseTour} />}
      {showPayment && selectedService && (
        <PaymentMockup service={selectedService} onClose={handleClosePayment} />
      )}
    </div>
  );
}

function App() {
  return (
    <FavoritesProvider>
      <AppContent />
    </FavoritesProvider>
  );
}

export default App;
