import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import Catalog from './components/Catalog';
import InteractiveTour from './components/InteractiveTour';
import PaymentMockup from './components/PaymentMockup';
import { websites, categories } from './data/websites';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showTour, setShowTour] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

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

          <div className="results-count">
            Mostrando {filteredWebsites.length} de {websites.length} servicios
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

export default App;
