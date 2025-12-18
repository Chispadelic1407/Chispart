import React, { useState, useEffect } from 'react';
import './InteractiveTour.css';

const InteractiveTour = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const steps = [
    {
      target: '.header',
      title: '¡Bienvenido a WebCatalog MX! 🎉',
      content: 'Este es tu catálogo completo de servicios web profesionales. Te mostraremos cómo usar la plataforma.',
      position: 'bottom'
    },
    {
      target: '.search-bar',
      title: 'Búsqueda Inteligente 🔍',
      content: 'Busca servicios por nombre, descripción, categoría o características. La búsqueda es en tiempo real.',
      position: 'bottom'
    },
    {
      target: '.filter',
      title: 'Filtros por Categoría 🏷️',
      content: 'Filtra los servicios por categoría. Ahora incluimos servicios de Inteligencia Artificial.',
      position: 'bottom'
    },
    {
      target: '.results-count',
      title: 'Contador de Resultados 📊',
      content: 'Aquí verás cuántos servicios coinciden con tu búsqueda y filtros.',
      position: 'bottom'
    },
    {
      target: '.catalog-grid',
      title: 'Catálogo de Servicios 📦',
      content: 'Explora nuestros 28 servicios. Haz clic en cualquier tarjeta para ver más detalles.',
      position: 'top'
    },
    {
      target: '.website-card',
      title: 'Tarjetas Interactivas 💳',
      content: 'Cada tarjeta muestra información clave. Haz clic para expandir y ver características completas, tecnologías y botón de cotización.',
      position: 'top'
    }
  ];

  useEffect(() => {
    // Scroll al elemento objetivo
    const targetElement = document.querySelector(steps[currentStep].target);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('tourCompleted', 'true');
    if (onClose) onClose();
  };

  const handleSkip = () => {
    handleClose();
  };

  if (!isVisible) return null;

  const currentStepData = steps[currentStep];
  const targetElement = document.querySelector(currentStepData.target);
  
  if (!targetElement) return null;

  const rect = targetElement.getBoundingClientRect();
  const tooltipStyle = {
    position: 'fixed',
    zIndex: 10001,
  };

  // Posicionar el tooltip según la posición especificada
  if (currentStepData.position === 'bottom') {
    const topPosition = rect.bottom + 20;
    // Ensure tooltip doesn't go off bottom of screen
    if (topPosition + 400 > window.innerHeight) {
      tooltipStyle.top = `${Math.max(20, window.innerHeight - 420)}px`;
    } else {
      tooltipStyle.top = `${topPosition}px`;
    }
    tooltipStyle.left = `${rect.left + rect.width / 2}px`;
    tooltipStyle.transform = 'translateX(-50%)';
  } else if (currentStepData.position === 'top') {
    const bottomPosition = window.innerHeight - rect.top + 20;
    // Ensure tooltip doesn't go off top of screen
    if (bottomPosition + 400 > window.innerHeight) {
      tooltipStyle.top = `20px`;
      tooltipStyle.bottom = 'auto';
    } else {
      tooltipStyle.bottom = `${bottomPosition}px`;
    }
    tooltipStyle.left = `${rect.left + rect.width / 2}px`;
    tooltipStyle.transform = 'translateX(-50%)';
  }

  return (
    <>
      {/* Overlay oscuro */}
      <div className="tour-overlay" onClick={handleSkip}></div>
      
      {/* Highlight del elemento */}
      <div 
        className="tour-highlight"
        style={{
          position: 'fixed',
          top: `${rect.top - 5}px`,
          left: `${rect.left - 5}px`,
          width: `${rect.width + 10}px`,
          height: `${rect.height + 10}px`,
          zIndex: 10000,
        }}
      ></div>

      {/* Tooltip */}
      <div className="tour-tooltip" style={tooltipStyle}>
        <div className="tour-tooltip-header">
          <h3>{currentStepData.title}</h3>
          <button className="tour-close-btn" onClick={handleClose}>✕</button>
        </div>
        
        <div className="tour-tooltip-content">
          <p>{currentStepData.content}</p>
        </div>

        <div className="tour-tooltip-footer">
          <div className="tour-progress">
            {steps.map((_, index) => (
              <span 
                key={index} 
                className={`tour-progress-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
              ></span>
            ))}
          </div>

          <div className="tour-buttons">
            <button className="tour-btn tour-btn-skip" onClick={handleSkip}>
              Saltar Tour
            </button>
            
            {currentStep > 0 && (
              <button className="tour-btn tour-btn-prev" onClick={handlePrev}>
                ← Anterior
              </button>
            )}
            
            <button className="tour-btn tour-btn-next" onClick={handleNext}>
              {currentStep < steps.length - 1 ? 'Siguiente →' : 'Finalizar ✓'}
            </button>
          </div>
        </div>

        <div className="tour-step-counter">
          Paso {currentStep + 1} de {steps.length}
        </div>
      </div>
    </>
  );
};

export default InteractiveTour;
