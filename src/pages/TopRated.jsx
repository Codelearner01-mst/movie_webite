import { useState, useEffect } from "react";
import { ErrorCard } from "../components/ErrorCard";
import useFetch from "../service/movies_service";
import MovieCard from "../components/MovieCard";

const TopRated = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const TOPRATEDAPIURL = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${currentPage}`;
  const {
    movies: topRatedMovies,
    isLoading: isTopRatedLoading,
    error: topRatedError,
  } = useFetch(TOPRATEDAPIURL);
  const [loadAllMovies, setLoadAllMovies] = useState([]);

  useEffect(() => {
    setLoadAllMovies(topRatedMovies);
  }, [topRatedMovies]);

  const loadMoreMovies = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    setLoadAllMovies((prevMovies) => [...prevMovies, ...topRatedMovies]);
  };

  return (
    <div className="toprated-page">
      <div className="container py-4">
        <div className="section-header centered">
          <span className="section-eyebrow">Highest Rated</span>
          <h2 className="section-title">All-Time Greats</h2>
          <p className="section-description">
            Discover the most acclaimed films in cinema history — from timeless
            classics to modern masterpieces that define excellence.
          </p>
        </div>
        {topRatedError && <ErrorCard message={topRatedError} />}
        <div className="movies-grid">
          {isTopRatedLoading && loadAllMovies.length === 0 && (
            <p className="loading-text">Loading top rated movies</p>
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

export default TopRated;
