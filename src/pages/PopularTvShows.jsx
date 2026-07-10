import { useState, useEffect } from "react";
import { ErrorCard } from "../components/ErrorCard";
import { useFetch } from "../service/movies_service";
import Card from "../components/Card";

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
          {loadAllTvShows.map((tv) => (
            <Card key={tv.id} show={tv} endpoint="/tv" />
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
