import { useState } from "react";
import { getFromLocalStorage } from "../Utils/storage";
import MovieCard2 from "../components/movieCard2";

const Favourite = () => {
  const favourite = getFromLocalStorage("favourite");
  const [favouriteMovies] = useState(favourite);

  return (
    <div className="favourite-page">
      <div className="container py-4">
        <div className="section-header centered">
          <span className="section-eyebrow">Watchlist</span>
          <h2 className="section-title">My List</h2>
        </div>
        {!favouriteMovies.length && (
          <div className="empty-state">
            <p>
              Your favourite list is currently empty.
              <br />
              Explore our collections and add movies to your list!
            </p>
          </div>
        )}
        <div className="movies-grid2">
          {favouriteMovies.map((movie) => (
            <MovieCard2 key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favourite;
