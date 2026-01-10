import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'WebCatalogMX - Soluciones Digitales para tu Negocio',
  description = 'Descubre 28+ soluciones web profesionales para tu negocio en México. Desde e-commerce hasta sistemas de gestión, con tecnologías modernas.',
  keywords = 'desarrollo web, diseño web, e-commerce, páginas web México, soluciones digitales, React, Node.js, desarrollo profesional',
  image = '/og-image.jpg',
  url = 'https://webcatalogmx.com',
  type = 'website'
}) => {
  const siteTitle = 'WebCatalogMX';
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="es_MX" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Spanish" />
      <meta name="author" content="Sebastian Vernis" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
