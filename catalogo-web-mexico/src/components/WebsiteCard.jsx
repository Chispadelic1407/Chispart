import React, { useState } from 'react';
import './WebsiteCard.css';

const WebsiteCard = ({ website }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="website-card" onClick={() => setIsExpanded(!isExpanded)}>
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
                <li key={index}>{feature}</li>
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
        </div>

        <button className="expand-btn">
          {isExpanded ? 'Ver menos' : 'Ver más detalles'}
        </button>
      </div>
    </div>
  );
};

export default WebsiteCard;
