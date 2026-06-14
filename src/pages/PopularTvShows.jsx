import { useState, useEffect } from "react";
import { ErrorCard } from "../components/ErrorCard";
import Hero from "../components/Hero";
import useFetch from "../service/movies_service";
import MovieCard from "../components/MovieCard";

const PopularTvShows = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const POPULARAPIURL = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${currentPage}`;
  const {
    movies: popularMovies,
    isLoading: isPopularLoading,
    error: popularError,
  } = useFetch(POPULARAPIURL);
  const [loadAllTvShows, setLoadAllTvShows] = useState([]);

  useEffect(() => {
    setLoadAllTvShows(popularMovies);
  }, [popularMovies]);

  const loadMoreTvShows = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    setLoadAllTvShows((prevTvShows) => [...prevTvShows, ...popularMovies]);
  };

  return (
    <div className="popular-page">
      <Hero
        image="/home-hero.png"
        title="Popular TV Shows"
        subtitle="Discover what the world is watching right now. The most popular TV shows trending across the globe."
        badge="Trending Now"
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
        {popularError && <ErrorCard message={popularError} />}
        <div className="movies-grid">
          {isPopularLoading && loadAllTvShows.length === 0 && (
            <p className="loading-text">Loading popular TV shows</p>
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

export default PopularTvShows;
