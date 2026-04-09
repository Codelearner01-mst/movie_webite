import { useState, useEffect } from "react";
import { ErrorCard } from "../components/ErrorCard";
import Hero from "../components/Hero";
import useFetch from "../service/movies_service";
import MovieCard from "../components/MovieCard";

const Upcoming = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    movies: upcomingMovies,
    isLoading: isUpcomingLoading,
    error: upcomingError,
  } = useFetch("upcoming", currentPage);
  const [loadAllMovies, setLoadAllMovies] = useState([]);

  useEffect(() => {
    setLoadAllMovies(upcomingMovies);
  }, [upcomingMovies]);

  const loadMoreMovies = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    setLoadAllMovies((prevMovies) => [...prevMovies, ...upcomingMovies]);
  };

  return (
    <div className="upcoming-page">
      <Hero
        image="/secondary-hero.png"
        title="Upcoming Movies"
        subtitle="Get ready for the next wave of cinematic masterpieces. Here is a sneak peek at what's hitting the theaters soon."
      />
      <div className="container py-4 text-center">
        <h2 className="section-title">The Future of Cinema</h2>
        <p
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            fontSize: "1.1rem",
            color: "var(--text-muted)",
          }}
        >
          We are constantly updating our database with the most anticipated
          upcoming movies. Stay tuned for epic sci-fi adventures, heart-pounding
          thrillers, and captivating dramas that will define the next era of
          filmmaking.
        </p>
        <div className="movies-grid">
          {upcomingError && <ErrorCard message={upcomingError} />}
          {isUpcomingLoading && <p>Loading upcoming movies...</p>}
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

export default Upcoming;
