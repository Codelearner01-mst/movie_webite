import { useState, useEffect } from "react";
import { ErrorCard } from "../components/ErrorCard";
import Hero from "../components/Hero";
import useFetch from "../service/movies_service";
import MovieCard from "../components/MovieCard";

const TopRatedTvShows = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const TOPRATEDAPIURL = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${currentPage}`;
  const {
    movies: topRatedMovies,
    isLoading: isTopRatedLoading,
    error: topRatedError,
  } = useFetch(TOPRATEDAPIURL);
  const [loadAllTvShows, setLoadAllTvShows] = useState([]);

  useEffect(() => {
    setLoadAllTvShows(topRatedMovies);
  }, [topRatedMovies]);

  const loadMoreTvShows = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    setLoadAllTvShows((prevTvShows) => [...prevTvShows, ...topRatedMovies]);
  };

  return (
    <div className="top-rated-page">
      <Hero
        image="/home-hero.png"
        title="Top Rated TV Shows"
        subtitle="Discover the most highly rated TV shows across the globe."
        badge="Top Rated"
      />
      <div className="container py-4">
        <div className="section-header centered">
          <span className="section-eyebrow">Audience Favorites</span>
          <h2 className="section-title">Most Popular</h2>
          <p className="section-description">
            From blockbuster hits to hidden gems — explore the TV shows that are
            capturing audiences worldwide right now.
          </p>
        </div>
        {topRatedError && <ErrorCard message={topRatedError} />}
        <div className="movies-grid">
          {isTopRatedLoading && loadAllTvShows.length === 0 && (
            <p className="loading-text">Loading top rated TV shows</p>
          )}
          {loadAllTvShows.map((tvShow) => (
            <MovieCard key={tvShow.id} movie={tvShow} />
          ))}
        </div>
        <div className="load-more-container">
          <button
            className="load-more-btn"
            type="button"
            onClick={loadMoreTvShows}
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopRatedTvShows;
