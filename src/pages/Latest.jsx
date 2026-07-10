import { useState, useEffect } from "react";
import { ErrorCard } from "../components/ErrorCard";
import { useFetch } from "../service/movies_service";
import Card from "../components/Card";

const Latest = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const LATESTAPIURL = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${currentPage}`;
  const {
    movies: latestMovies,
    isLoading: isLatestLoading,
    error: latestError,
  } = useFetch(LATESTAPIURL);
  const [loadAllMovies, setLoadAllMovies] = useState([]);

  useEffect(() => {
    setLoadAllMovies(latestMovies);
  }, [latestMovies]);

  const loadMoreMovies = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    setLoadAllMovies((prevMovies) => [...prevMovies, ...latestMovies]);
  };

  return (
    <div className="latest-page">
      <div className="container py-4">
        <div className="section-header centered">
          <span className="section-eyebrow">Box Office</span>
          <h2 className="section-title">Now Showing</h2>
          <p className="section-description">
            From critically acclaimed indie films to explosive blockbusters —
            find your next favorite movie here.
          </p>
        </div>
        {latestError && <ErrorCard message={latestError} />}
        <div className="movies-grid">
          {isLatestLoading && loadAllMovies.length === 0 && (
            <p className="loading-text">Loading latest movies</p>
          )}
          {loadAllMovies.map((movie) => (
            <Card key={movie.id} show={movie} endpoint="/movie" />
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

export default Latest;
