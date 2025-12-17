import { useState } from 'react';
import './ProjectCard.css';

function ProjectCard({ website }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const isSebastiansProject = website.id >= 201 && website.id <= 213;

  return (
    <div className={`project-card ${isExpanded ? 'expanded' : ''}`}>
      <div className="project-card-header" onClick={toggleExpand}>
        <img 
          src={website.image} 
          alt={website.title}
          className="project-image"
          loading="lazy"
        />
        <div className="project-overlay">
          <h3 className="project-title">{website.title}</h3>
          {isSebastiansProject && (
            <span className="project-badge">Proyecto Real</span>
          )}
        </div>
      </div>

      <div className="project-card-body">
        <p className="project-description">{website.description}</p>
        
        <div className="project-meta">
          <span className="project-category">{website.category}</span>
          {website.complexity && (
            <span className={`project-complexity complexity-${website.complexity.toLowerCase()}`}>
              {website.complexity}
            </span>
          )}
          {website.status && (
            <span className="project-status">{website.status}</span>
          )}
        </div>

        {website.price && (
          <div className="project-price">{website.price}</div>
        )}

        {!isExpanded && (
          <button className="expand-button" onClick={toggleExpand}>
            Ver Detalles →
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="project-card-expanded">
          <div className="project-tabs">
            <button 
              className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              📋 Overview
            </button>
            <button 
              className={`tab-button ${activeTab === 'features' ? 'active' : ''}`}
              onClick={() => setActiveTab('features')}
            >
              ⚡ Features
            </button>
            <button 
              className={`tab-button ${activeTab === 'tech' ? 'active' : ''}`}
              onClick={() => setActiveTab('tech')}
            >
              🛠️ Tech Stack
            </button>
            {website.liveUrl && (
              <button 
                className={`tab-button ${activeTab === 'demo' ? 'active' : ''}`}
                onClick={() => setActiveTab('demo')}
              >
                🚀 Demo Live
              </button>
            )}
            {website.metrics && (
              <button 
                className={`tab-button ${activeTab === 'metrics' ? 'active' : ''}`}
                onClick={() => setActiveTab('metrics')}
              >
                📊 Métricas
              </button>
            )}
          </div>

          <div className="project-tab-content">
            {activeTab === 'overview' && (
              <div className="tab-panel">
                <h4>Descripción Completa</h4>
                <p>{website.description}</p>
                
                {website.highlights && (
                  <div className="project-highlights">
                    <h5>✨ Highlights</h5>
                    <ul>
                      {website.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="project-links">
                  {website.githubUrl && (
                    <a 
                      href={website.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link github-link"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      Ver en GitHub
                    </a>
                  )}
                  {website.liveUrl && (
                    <a 
                      href={website.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link live-link"
                    >
                      🌐 Demo Live
                    </a>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="tab-panel">
                <h4>Características Principales</h4>
                <ul className="features-list">
                  {website.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <span className="feature-icon">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'tech' && (
              <div className="tab-panel">
                <h4>Stack Tecnológico</h4>
                <div className="tech-stack">
                  {website.technologies.map((tech, index) => (
                    <span key={index} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'demo' && website.liveUrl && (
              <div className="tab-panel">
                <h4>Demo en Vivo</h4>
                <div className="demo-container">
                  <div className="demo-info">
                    <p>🚀 Este proyecto está desplegado y funcionando en producción.</p>
                    <a 
                      href={website.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="demo-button"
                    >
                      Abrir Demo en Nueva Pestaña →
                    </a>
                  </div>
                  <div className="demo-preview">
                    <iframe 
                      src={website.liveUrl}
                      title={`Demo de ${website.title}`}
                      className="demo-iframe"
                      sandbox="allow-scripts allow-same-origin allow-forms"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'metrics' && website.metrics && (
              <div className="tab-panel">
                <h4>Métricas del Proyecto</h4>
                <div className="metrics-grid">
                  {Object.entries(website.metrics).map(([key, value]) => (
                    <div key={key} className="metric-item">
                      <div className="metric-value">{value}</div>
                      <div className="metric-label">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button className="collapse-button" onClick={toggleExpand}>
            ↑ Cerrar Detalles
          </button>
        </div>
      )}
    </div>
  );
}

export default ProjectCard;
