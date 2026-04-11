import { useState } from "react";
import "./MovieCard.css";
import { saveToLocalStorage } from "../Utils/storage";
import { getFromLocalStorage } from "../Utils/storage";
import { isMovieInFavourites } from "../Utils/helper";

const MovieCard = ({ movie }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFavourite, setIsFavourite] = useState(isMovieInFavourites(movie));

  const ToggleFavourite = () => {
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
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  // TMDB only returns the image path suffix, so we must prepend the base URL
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : movie.image;

  return (
    <div className="movie-card">
      <div className="movie-card-image-wrap">
        <div className="movie-card-menu-container">
          <button className="movie-card-menu-btn" onClick={toggleMenu}>
            &#8942;
          </button>
          {isMenuOpen && (
            <div className="movie-card-dropdown">
              <button className="dropdown-item" onClick={ToggleFavourite}>
                {isFavourite ? "Remove from Favourite" : "Add to Favourite"}
              </button>
              <button className="dropdown-item">Add to Watch List</button>
            </div>
          )}
        </div>
        <img
          src={imageUrl}
          alt={movie.title}
          placeholder="Image not available"
          className="movie-card-image"
          style={{ backgroundColor: "gray" }}
        />
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
