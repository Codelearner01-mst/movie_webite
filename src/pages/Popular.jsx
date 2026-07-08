import { useState, useEffect } from "react";
import { ErrorCard } from "../components/ErrorCard";
import useFetch from "../service/movies_service";
import MovieCard from "../components/MovieCard";

const Popular = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const POPULARAPIURL = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${currentPage}`;
  const {
    movies: popularMovies,
    isLoading: isPopularLoading,
    error: popularError,
  } = useFetch(POPULARAPIURL);
  const [loadAllMovies, setLoadAllMovies] = useState([]);

  useEffect(() => {
    setLoadAllMovies(popularMovies);
  }, [popularMovies]);

  const loadMoreMovies = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    setLoadAllMovies((prevMovies) => [...prevMovies, ...popularMovies]);
  };

  return (
    <div className="popular-page">
      <div className="container py-4">
        <div className="section-header centered">
          <span className="section-eyebrow">Audience Favorites</span>
          <h2 className="section-title">Most Popular</h2>
          <p className="section-description">
            From blockbuster hits to hidden gems — explore the movies that are
            capturing audiences worldwide right now.
          </p>
        </div>
        {popularError && <ErrorCard message={popularError} />}
        <div className="movies-grid">
          {isPopularLoading && loadAllMovies.length === 0 && (
            <p className="loading-text">Loading popular movies</p>
          )}
          {loadAllMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <div className="load-more-container">
          <button
            className="load-more-btn"
            type="button"
            onClick={loadMoreMovies}
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popular;
