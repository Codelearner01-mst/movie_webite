import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  // TMDB only returns the image path suffix, so we must prepend the base URL
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : movie.image;

  return (
    <div className="movie-card">
      <div className="movie-card-image-wrap">
        <img src={imageUrl} alt={movie.title} className="movie-card-image" />
        <div className="movie-card-overlay">
          <button className="watch-btn">View Details</button>
        </div>
      </div>
      <div className="movie-card-content">
        <span className="movie-card-year">{movie.release_date}</span>
        <h3 className="movie-card-title">{movie.title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
