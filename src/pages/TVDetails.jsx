import React from "react";
import { useParams } from "react-router-dom";
import { useDetails } from "../service/movies_service";
import "./MovieDetails.css";

const TVDetails = () => {
  const { id } = useParams();
  const url = `https://api.themoviedb.org/3/tv/${id}?append_to_response=videos&language=en-US`;
  const ERROR = "Failed to fetch TV show details. Please try again";
  const { movie: tv, isLoading, error } = useDetails(url, ERROR);

  if (isLoading) {
    return (
      <div className="movie-details-loading">
        <div className="spinner"></div>
        <p>Loading cinematic experience...</p>
      </div>
    );
  }

  if (error || !tv) {
    return (
      <div className="movie-details-error">
        <h2>Oops!</h2>
        <p>{error || "We couldn't find the details for this TV show."}</p>
      </div>
    );
  }

  // Find the official YouTube trailer
  const trailer = tv.videos?.results?.find(
    (vid) => vid.site === "YouTube" && vid.type === "Trailer",
  );

  const backdropUrl = tv.backdrop_path
    ? `https://image.tmdb.org/t/p/original${tv.backdrop_path}`
    : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&q=80"; // generic cinema fallback

  const posterUrl = tv.poster_path
    ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
    : tv.image;

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
            <img src={posterUrl} alt={tv.name} className="detail-poster" />
            <div className="detail-stats">
              <span className="stat-badge">{tv.first_air_date}</span>
              <span className="stat-badge">{tv.number_of_seasons} Seasons</span>
              <span className="stat-badge">
                {tv.number_of_episodes} Episodes
              </span>
              <span className="stat-badge rating">
                ★ {tv.vote_average?.toFixed(1)}
              </span>
            </div>
            <div className="detail-genres">
              {tv.genres?.map((g) => (
                <span key={g.id} className="genre-pill">
                  {g.name}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Title, Overview, Trailer */}
          <div className="movie-details-right">
            <span className="section-eyebrow">TV Show Info</span>
            <h1 className="detail-title">{tv.name}</h1>
            {tv.tagline && <p className="detail-tagline">"{tv.tagline}"</p>}

            <h3 className="section-heading">Overview</h3>
            <p className="detail-overview">{tv.overview}</p>

            <div
              className="detail-stats"
              style={{ justifyContent: "flex-start" }}
            >
              <span className="stat-badge">
                First Aired: {tv.first_air_date}
              </span>
              <span className="stat-badge">Last Aired: {tv.last_air_date}</span>
            </div>

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

export default TVDetails;
