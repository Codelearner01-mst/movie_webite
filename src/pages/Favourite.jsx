import { useState } from "react";
import Hero from "../components/Hero";
import "./Home.css";
import { getFromLocalStorage } from "../Utils/storage";
import MovieCard from "../components/MovieCard";
import MovieCard2 from "../components/movieCard2";

const Favourite = () => {
  const favourite = getFromLocalStorage("favourite");
  const [favouriteMovies, setFavouriteNovies] = useState(favourite);
  return (
    <div className="favourite-page">
      <Hero
        image="/secondary-hero.png"
        title="Your Favourites"
        subtitle="Keep track of the movies you love and the ones you want to watch next."
      />
      <div className="container py-4 text-center">
        <h2 className="section-title">My List</h2>
        {!favouriteMovies.length && (
          <div
            style={{
              padding: "4rem 0",
              backgroundColor: "var(--secondary-bg)",
              borderRadius: "8px",
              border: "2px dashed var(--border-color)",
              marginTop: "2rem",
            }}
          >
            <p style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>
              Your favourite list is currently empty.
              <br />
              Explore our collections and add movies to your list!
            </p>
          </div>
        )}
        <div className="favourite-container">
          {favouriteMovies.map((movie) => (
            <MovieCard2 key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favourite;
