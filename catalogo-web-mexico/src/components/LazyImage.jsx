import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './LazyImage.css';

const LazyImage = ({ src, alt, className = '', width, height }) => {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      effect="blur"
      className={`lazy-image ${className}`}
      width={width}
      height={height}
      placeholderSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect fill='%23f0f0f0' width='800' height='600'/%3E%3C/svg%3E"
      threshold={100}
      loading="lazy"
    />
  );
};

export default LazyImage;
