import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import useFetch from "../service/movies_service";
import MovieCard from "../components/MovieCard";

const Latest = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    movies: latestMovies,
    isLoading: isLatestLoading,
    error: latestError,
  } = useFetch("now_playing", currentPage);
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
      <Hero
        image="/secondary-hero.png"
        title="Latest Releases"
        subtitle="Stay up to date with the newest additions to the big screen. Don't miss out on the movies everyone is talking about."
      />
      <div className="container py-4 text-center">
        <h2 className="section-title">Now Showing</h2>
        <p
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            fontSize: "1.1rem",
            color: "var(--text-muted)",
            marginBottom: "2rem",
          }}
        >
          Explore our handpicked selection of the latest movies currently
          dominating the box office. From critically acclaimed indie films to
          explosive blockbusters, find your next favorite movie here.
        </p>
        <div className="movies-grid">
          {latestError && <p className="text-danger">Error: {latestError}</p>}
          {isLatestLoading && <p>Loading latest movies...</p>}
          {loadAllMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <div className="load-more-container">
          <button className="load-more-btn" onClick={loadMoreMovies}>
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Latest;
