import React from 'react';
import './Hero.css';

const Hero = ({ image, title, subtitle }) => {
  return (
    <div className="hero">
      <div className="hero-background">
        <img src={image} alt="Hero Background" />
        <div className="hero-overlay"></div>
      </div>
      <div className="container hero-content">
        <h1 className="hero-title">{title}</h1>
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
};

export default Hero;
