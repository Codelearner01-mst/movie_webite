import { useState } from "react";
import "./Hero.css";

const Hero = ({ image, title, subtitle, badge }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const showImage = image && !imageError;

  return (
    <section className="hero">
      <div className="hero-bg-layer hero-bg-gradient" />
      {showImage && (
        <div
          className={`hero-bg-layer hero-bg-image ${imageLoaded ? "loaded" : ""}`}
        >
          <img
            src={image}
            alt=""
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        </div>
      )}
      <div className="hero-vignette" />
      <div className="hero-scanlines" />

      <div className="container hero-content">
        {badge && <span className="hero-badge">{badge}</span>}
        <h1 className="hero-title">{title}</h1>
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
        <div className="hero-divider">
          <span className="hero-star">★</span>
        </div>
      </div>

      <div className="hero-spotlight" />
    </section>
  );
};

export default Hero;
