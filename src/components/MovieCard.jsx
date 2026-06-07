import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";
import { saveToLocalStorage, getFromLocalStorage } from "../Utils/storage";
import { isMovieInFavourites } from "../Utils/helper";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFavourite, setIsFavourite] = useState(isMovieInFavourites(movie));

  const ToggleFavourite = (e) => {
    e.stopPropagation();
    const currentFavourites = getFromLocalStorage("favourite") || [];
    if (!isFavourite) {
      saveToLocalStorage("favourite", [...currentFavourites, movie]);
      setIsFavourite(true);
    } else {
      const newFavourites = currentFavourites.filter(
        (fav) => fav.id !== movie.id,
      );
      saveToLocalStorage("favourite", newFavourites);
      setIsFavourite(false);
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  const goToDetails = (e) => {
    e?.stopPropagation();
    navigate(`/movie/${movie.id}`);
  };

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : movie.image;

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : null;

  return (
    <div
      className="movie-card"
      onClick={goToDetails}
      onKeyDown={(e) => e.key === "Enter" && goToDetails(e)}
      role="button"
      tabIndex={0}
    >
      <div className="movie-card-image-wrap">
        <div className="movie-card-menu-container">
          <button
            type="button"
            className="movie-card-menu-btn"
            onClick={toggleMenu}
            aria-label="Movie options"
          >
            &#8942;
          </button>
          {isMenuOpen && (
            <div className="movie-card-dropdown">
              <button type="button" className="dropdown-item" onClick={ToggleFavourite}>
                {isFavourite ? "Remove from Favourite" : "Add to Favourite"}
              </button>
              <button type="button" className="dropdown-item">
                Add to Watch List
              </button>
            </div>
          )}
        </div>
        <img
          src={imageUrl}
          alt={movie.title}
          className="movie-card-image"
          loading="lazy"
        />
        {rating && (
          <span className="movie-card-rating">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {rating}
          </span>
        )}
        <div className="movie-card-overlay">
          <button type="button" className="watch-btn" onClick={goToDetails}>
            View Details
          </button>
        </div>
        <div className="movie-card-shine" />
      </div>
      <div className="movie-card-content">
        {year && <span className="movie-card-year">{year}</span>}
        <h3 className="movie-card-title">{movie.title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
