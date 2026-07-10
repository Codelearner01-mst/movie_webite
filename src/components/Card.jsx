import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";
import { saveToLocalStorage, getFromLocalStorage } from "../Utils/storage";
import { isMovieInFavourites } from "../Utils/helper";

const Card = ({ show, endpoint }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFavourite, setIsFavourite] = useState(isMovieInFavourites(show));

  const ToggleFavourite = (e) => {
    e.stopPropagation();
    const currentFavourites = getFromLocalStorage("favourite") || [];
    if (!isFavourite) {
      saveToLocalStorage("favourite", [...currentFavourites, show]);
      setIsFavourite(true);
    } else {
      const newFavourites = currentFavourites.filter(
        (fav) => fav.id !== show.id,
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
    navigate(`${endpoint}/${show.id}`);
  };

  const imageUrl = show.poster_path
    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
    : show.image;

  const rating = show.vote_average ? show.vote_average.toFixed(1) : null;

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
              <button
                type="button"
                className="dropdown-item"
                onClick={ToggleFavourite}
              >
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
          alt={show.title}
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
        <div className="movie-card-shine" />
      </div>
      <div className="movie-card-content">
        <span className="movie-card-year">
          {show.release_date || show.first_air_date}
        </span>
        <h3 className="movie-card-title">{show.title || show.name}</h3>
      </div>
    </div>
  );
};

export default Card;
