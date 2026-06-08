import { useState, useEffect } from "react";
import useFetch from "../service/movies_service";
import Hero from "../components/Hero";
import MovieCard from "../components/MovieCard";
import { ErrorCard } from "../components/ErrorCard";
import Search from "../components/Search";
import useDebounce from "../hooks/Debounce";
import "./Home.css";
import { Link } from "react-router-dom";

const LATESTAPIURL = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`;
const UPCOMINGTAPIURL = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`;

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedValue = useDebounce(searchTerm, 1000);
  const SEARCHAPIURL = `https://api.themoviedb.org/3/search/movie?query=${debouncedValue}&include_adult=true&language=en-US&page=1`;

  const { movies: searchResults } = useFetch(SEARCHAPIURL);

  useEffect(() => {
    sessionStorage.setItem("searchresults", JSON.stringify(searchResults));
  }, [searchResults]);

  const {
    movies: latestMovies,
    isLoading: isLatestLoading,
    error: latestError,
  } = useFetch(LATESTAPIURL);
  const {
    movies: upcomingMovies,
    isLoading: isUpcomingLoading,
    error: upcomingError,
  } = useFetch(UPCOMINGTAPIURL);

  return (
    <div className="home-page">
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {debouncedValue.trim() && searchResults.length > 0 && (
        <div className="search-results-container">
          {searchResults.map((result) => (
            <Link
              key={result.id}
              to={`/movie/${result.id}`}
              className="search-result-item"
            >
              {result.title}
            </Link>
          ))}
        </div>
      )}
      <Hero
        image="/home-hero.png"
        title="Experience the Magic of Cinema"
        subtitle="Discover blockbusters, hidden gems, and the most anticipated releases — curated for the true film lover."
        badge="Now Streaming"
      />

      <div className="container py-4">
        <div className="movie-section mb-4">
          <div className="section-header">
            <span className="section-eyebrow">In Theaters Now</span>
            <h2 className="section-title">Latest Movies</h2>
          </div>
          {latestError && <ErrorCard message={latestError} />}
          <div className="movies-grid">
            {isLatestLoading && (
              <p className="loading-text">Loading latest movies</p>
            )}
            {latestMovies.slice(0, 8).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="load-more-container">
            <Link to="/latest" className="load-more-btn">
              Explore More
            </Link>
          </div>
        </div>

        <div className="movie-section mt-4">
          <div className="section-header">
            <span className="section-eyebrow">Coming Soon</span>
            <h2 className="section-title">Upcoming Movies</h2>
          </div>
          {upcomingError && <ErrorCard message={upcomingError} />}
          <div className="movies-grid">
            {isUpcomingLoading && (
              <p className="loading-text">Loading upcoming movies</p>
            )}
            {upcomingMovies.slice(0, 8).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="load-more-container">
            <Link to="/upcoming" className="load-more-btn">
              See What's Next
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
