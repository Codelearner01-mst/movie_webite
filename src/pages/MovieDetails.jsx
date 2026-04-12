import React from "react";
import { useParams } from "react-router-dom";
import { useMovieDetails } from "../service/movies_service";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const { movie, isLoading, error } = useMovieDetails(id);

  if (isLoading) {
    return (
      <div className="movie-details-loading">
        <div className="spinner"></div>
        <p>Loading cinematic experience...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="movie-details-error">
        <h2>Oops!</h2>
        <p>{error || "We couldn't find the details for this movie."}</p>
      </div>
    );
  }

  // Find the official YouTube trailer
  const trailer = movie.videos?.results?.find(
    (vid) => vid.site === "YouTube" && vid.type === "Trailer"
  );

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&q=80"; // generic cinema fallback

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : movie.image;

  return (
    <div className="movie-details-page">
      {/* Background Banner */}
      <div
        className="movie-details-hero"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="hero-overlay"></div>
      </div>

      <div className="container movie-details-content">
        <div className="movie-details-grid">
          {/* Left Column: Poster & Info */}
          <div className="movie-details-left">
            <img src={posterUrl} alt={movie.title} className="detail-poster" />
            <div className="detail-stats">
              <span className="stat-badge">{movie.release_date?.substring(0, 4)}</span>
              <span className="stat-badge">{movie.runtime} min</span>
              <span className="stat-badge rating">★ {movie.vote_average?.toFixed(1)}</span>
            </div>
            <div className="detail-genres">
              {movie.genres?.map((g) => (
                <span key={g.id} className="genre-pill">{g.name}</span>
              ))}
            </div>
          </div>

          {/* Right Column: Title, Overview, Trailer */}
          <div className="movie-details-right">
            <h1 className="detail-title">{movie.title}</h1>
            {movie.tagline && <p className="detail-tagline">"{movie.tagline}"</p>}

            <h3 className="section-heading">Overview</h3>
            <p className="detail-overview">{movie.overview}</p>

            {trailer ? (
              <div className="trailer-section">
                <h3 className="section-heading">Official Trailer</h3>
                <div className="video-container">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}?rel=0`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ) : (
              <div className="no-trailer">
                <p>No official trailer available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
