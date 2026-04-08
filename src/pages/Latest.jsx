import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import getMovies from "../service/movies-service";
import MovieCard from "../components/MovieCard";

const Latest = () => {
  const [latestMovies, setLatestMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchLatestMovies = async () => {
      try {
        const data = await getMovies("now_playing", currentPage);
        setLatestMovies(data.results);
      } catch (error) {
        console.error("Error fetching latest movies:", error);
      }
    };

    fetchLatestMovies();
  }, [currentPage]);

  const loadMoreMovies = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    setLatestMovies((prevMovies) => [...prevMovies, ...latestMovies]);
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
          {latestMovies.map((movie) => (
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
