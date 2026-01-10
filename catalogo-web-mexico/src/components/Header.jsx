import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>WebCatalog<span className="accent">MX</span></h1>
          <p className="tagline">Soluciones Digitales para tu Negocio</p>
        </div>
        <nav className="nav">
          <a href="#catalogo">Catálogo</a>
          <a href="#servicios">Servicios</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </div>
      <div className="hero">
        <h2>Diseño y Desarrollo Web Profesional</h2>
        <p>Descubre 28 soluciones web diseñadas específicamente para empresas mexicanas</p>
        <p className="hero-highlight">✨ ¡Ahora con servicios de Inteligencia Artificial!</p>
      </div>
    </header>
  );
};

export default Header;
