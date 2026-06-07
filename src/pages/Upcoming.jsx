import { useState, useEffect } from "react";
import { ErrorCard } from "../components/ErrorCard";
import Hero from "../components/Hero";
import useFetch from "../service/movies_service";
import MovieCard from "../components/MovieCard";

const Upcoming = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const UPCOMINGAPIURL = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${currentPage}`;
  const {
    movies: upcomingMovies,
    isLoading: isUpcomingLoading,
    error: upcomingError,
  } = useFetch(UPCOMINGAPIURL);
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
        subtitle="Get ready for the next wave of cinematic masterpieces. A sneak peek at what's hitting theaters soon."
        badge="Premiere Preview"
      />
      <div className="container py-4">
        <div className="section-header centered">
          <span className="section-eyebrow">Anticipated</span>
          <h2 className="section-title">The Future of Cinema</h2>
          <p className="section-description">
            Epic sci-fi adventures, heart-pounding thrillers, and captivating dramas
            that will define the next era of filmmaking.
          </p>
        </div>
        {upcomingError && <ErrorCard message={upcomingError} />}
        <div className="movies-grid">
          {isUpcomingLoading && loadAllMovies.length === 0 && (
            <p className="loading-text">Loading upcoming movies</p>
          )}
          {loadAllMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <div className="load-more-container">
          <button className="load-more-btn" type="button" onClick={loadMoreMovies}>
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
