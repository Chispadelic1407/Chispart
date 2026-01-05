import React, { useState } from 'react';
import './ShareButton.css';

const ShareButton = ({ project }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const projectUrl = `${window.location.origin}?project=${project.id}`;
  const shareText = `Mira este proyecto: ${project.title} - ${project.description}`;

  const handleShare = (platform) => {
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(projectUrl)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(projectUrl)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(projectUrl)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + projectUrl)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
    setShowMenu(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(projectUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowMenu(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="share-button-container" onClick={handleMenuClick}>
      <button
        className="share-button"
        onClick={toggleMenu}
        aria-label={`Compartir ${project.title}`}
        aria-expanded={showMenu}
        aria-haspopup="true"
      >
        <span className="share-icon" aria-hidden="true">🔗</span>
      </button>

      {showMenu && (
        <div className="share-menu" role="menu">
          <button
            className="share-option"
            onClick={() => handleShare('twitter')}
            role="menuitem"
            aria-label="Compartir en Twitter"
          >
            <span className="share-option-icon">🐦</span>
            <span className="share-option-text">Twitter</span>
          </button>

          <button
            className="share-option"
            onClick={() => handleShare('linkedin')}
            role="menuitem"
            aria-label="Compartir en LinkedIn"
          >
            <span className="share-option-icon">💼</span>
            <span className="share-option-text">LinkedIn</span>
          </button>

          <button
            className="share-option"
            onClick={() => handleShare('facebook')}
            role="menuitem"
            aria-label="Compartir en Facebook"
          >
            <span className="share-option-icon">📘</span>
            <span className="share-option-text">Facebook</span>
          </button>

          <button
            className="share-option"
            onClick={() => handleShare('whatsapp')}
            role="menuitem"
            aria-label="Compartir en WhatsApp"
          >
            <span className="share-option-icon">💬</span>
            <span className="share-option-text">WhatsApp</span>
          </button>

          <button
            className="share-option copy-link"
            onClick={handleCopyLink}
            role="menuitem"
            aria-label="Copiar enlace"
          >
            <span className="share-option-icon">{copied ? '✅' : '📋'}</span>
            <span className="share-option-text">
              {copied ? '¡Copiado!' : 'Copiar enlace'}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
