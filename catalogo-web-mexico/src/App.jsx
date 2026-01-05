import React, { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import FavoritesFilter from './components/FavoritesFilter';
import AdvancedFilter from './components/AdvancedFilter';
import Catalog from './components/Catalog';
import SEO from './components/SEO';
import StructuredData from './components/StructuredData';
import SkipLink from './components/SkipLink';
import { FavoritesProvider, useFavorites } from './context/FavoritesContext';
import { useFilterParams } from './hooks/useFilterParams';
import { applyMultipleFilters } from './utils/filters';
import { websites, categories } from './data/websites';
import './App.css';

// Lazy load heavy components
const InteractiveTour = lazy(() => import('./components/InteractiveTour'));
const PaymentMockup = lazy(() => import('./components/PaymentMockup'));

function AppContent() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const { favorites } = useFavorites();
  const { filters, updateFilters, clearFilters, getActiveFilterCount } = useFilterParams();

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

  // Filtrar sitios web usando el sistema de filtrado avanzado
  const filteredWebsites = useMemo(() => {
    let filtered = websites;

    // Aplicar filtro de categoría simple (para compatibilidad con Filter.jsx)
    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter(w => w.category === selectedCategory);
    }

    // Aplicar filtros avanzados
    filtered = applyMultipleFilters(filtered, filters);

    // Aplicar filtro de favoritos
    if (showOnlyFavorites) {
      filtered = filtered.filter(w => favorites.includes(w.id));
    }

    return filtered;
  }, [selectedCategory, filters, showOnlyFavorites, favorites]);

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
      <SEO />
      <StructuredData type="portfolio" data={{ projects: websites }} />
      <SkipLink />
      <Header onStartTour={handleStartTour} />

      <main id="main-content" className="main-content">
        <div className="container">
          <SearchBar 
            searchTerm={filters.searchTerm} 
            setSearchTerm={(term) => updateFilters({ searchTerm: term })} 
          />

          <Filter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <AdvancedFilter
            projects={websites}
            selectedCategories={filters.categories}
            selectedTechnologies={filters.technologies}
            selectedComplexity={filters.complexity}
            categories={categories}
            onCategoryChange={(cats) => updateFilters({ categories: cats })}
            onTechnologyChange={(techs) => updateFilters({ technologies: techs })}
            onComplexityChange={(comp) => updateFilters({ complexity: comp })}
            onClearAll={clearFilters}
            activeFilterCount={getActiveFilterCount()}
          />

          <FavoritesFilter 
            showOnlyFavorites={showOnlyFavorites}
            setShowOnlyFavorites={setShowOnlyFavorites}
          />

          <div className="results-count">
            Mostrando {filteredWebsites.length} de {websites.length} servicios
            {showOnlyFavorites && favorites.length > 0 && ' (Favoritos)'}
            {showOnlyFavorites && favorites.length === 0 && ' - No hay favoritos guardados'}
            {getActiveFilterCount() > 0 && ` - ${getActiveFilterCount()} filtro(s) activo(s)`}
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

      {showTour && (
        <Suspense fallback={<div className="loading-overlay">Cargando...</div>}>
          <InteractiveTour onClose={handleCloseTour} />
        </Suspense>
      )}
      {showPayment && selectedService && (
        <Suspense fallback={<div className="loading-overlay">Cargando...</div>}>
          <PaymentMockup service={selectedService} onClose={handleClosePayment} />
        </Suspense>
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
