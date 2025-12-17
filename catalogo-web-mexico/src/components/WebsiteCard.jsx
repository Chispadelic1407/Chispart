import React, { useState } from 'react';
import './WebsiteCard.css';

const WebsiteCard = ({ website, onQuote }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = (e) => {
    // No expandir si se hace clic en el botón de cotizar o enlaces
    if (e.target.closest('.quote-btn') || e.target.closest('.project-links a')) {
      return;
    }
    setIsExpanded(!isExpanded);
  };

  const handleQuoteClick = (e) => {
    e.stopPropagation();
    onQuote(website);
  };

  return (
    <div className="website-card" onClick={handleCardClick}>
      <div className="card-image">
        <img src={website.image} alt={website.title} loading="lazy" />
        <div className="category-badge">{website.category}</div>
      </div>

      <div className="card-content">
        <h3 className="card-title">{website.title}</h3>
        <p className="card-description">{website.description}</p>

        <div className="card-price">{website.price}</div>

        <div className={`card-details ${isExpanded ? 'expanded' : ''}`}>
          <div className="features">
            <h4>Características:</h4>
            <ul>
              {website.features.map((feature, index) => (
                <li key={index}>✓ {feature}</li>
              ))}
            </ul>
          </div>

          <div className="technologies">
            <h4>Tecnologías:</h4>
            <div className="tech-tags">
              {website.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>

          {website.category === "Mis Proyectos" ? (
            <div className="project-links">
              {website.demoUrl && (
                <a href={website.demoUrl} className="demo-btn" onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer">
                  🎨 Ver Demo
                </a>
              )}
              {website.githubUrl && (
                <a href={website.githubUrl} className="github-btn" onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer">
                  📂 GitHub
                </a>
              )}
              {website.liveUrl && (
                <a href={website.liveUrl} className="live-btn" onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer">
                  🚀 Sitio en Vivo
                </a>
              )}
            </div>
          ) : (
            <button className="quote-btn" onClick={handleQuoteClick}>
              💰 Solicitar Cotización
            </button>
          )}
        </div>

        <button className="expand-btn">
          {isExpanded ? '▲ Ver menos' : '▼ Ver más detalles'}
        </button>
      </div>
    </div>
  );
};

export default WebsiteCard;
