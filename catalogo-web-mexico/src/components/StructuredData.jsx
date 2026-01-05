import React from 'react';
import { Helmet } from 'react-helmet-async';

const StructuredData = ({ type = 'website', data = {} }) => {
  const getStructuredData = () => {
    switch (type) {
      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'WebCatalogMX',
          description: 'Catálogo de soluciones web profesionales para negocios en México',
          url: 'https://webcatalogmx.com',
          author: {
            '@type': 'Person',
            name: 'Sebastian Vernis',
            url: 'https://github.com/SebastianVernis'
          },
          inLanguage: 'es-MX',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://webcatalogmx.com/?search={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        };

      case 'portfolio':
        return {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Catálogo de Proyectos Web',
          description: 'Colección de 28+ proyectos web profesionales con demos en vivo',
          url: 'https://webcatalogmx.com',
          author: {
            '@type': 'Person',
            name: 'Sebastian Vernis',
            jobTitle: 'Full Stack Developer',
            url: 'https://github.com/SebastianVernis'
          },
          numberOfItems: 28,
          itemListElement: data.projects?.map((project, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'SoftwareApplication',
              name: project.title,
              description: project.description,
              applicationCategory: 'WebApplication',
              offers: {
                '@type': 'Offer',
                price: project.price,
                priceCurrency: 'MXN'
              }
            }
          })) || []
        };

      case 'project':
        return {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: data.title,
          description: data.description,
          applicationCategory: 'WebApplication',
          operatingSystem: 'Web Browser',
          offers: {
            '@type': 'Offer',
            price: data.price,
            priceCurrency: 'MXN',
            availability: 'https://schema.org/InStock'
          },
          author: {
            '@type': 'Person',
            name: 'Sebastian Vernis'
          },
          keywords: data.technologies?.join(', '),
          featureList: data.features?.join(', ')
        };

      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'WebCatalogMX',
          description: 'Desarrollo de soluciones web profesionales',
          url: 'https://webcatalogmx.com',
          logo: 'https://webcatalogmx.com/logo.png',
          founder: {
            '@type': 'Person',
            name: 'Sebastian Vernis'
          },
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'MX',
            addressLocality: 'México'
          },
          sameAs: [
            'https://github.com/SebastianVernis'
          ]
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
