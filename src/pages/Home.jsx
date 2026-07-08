import { useState, useEffect } from "react";
import useFetch from "../service/movies_service";
import Hero from "../components/Hero";
import MovieCard from "../components/MovieCard";
import { ErrorCard } from "../components/ErrorCard";
import Search from "../components/Search";
import Search2 from "../components/Search2";
import useDebounce from "../hooks/Debounce";
import "./Home.css";
import { Link } from "react-router-dom";

const LATESTAPIURL = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`;
const UPCOMINGTAPIURL = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`;

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(true);

  // Show dropdown when searchTerm changes
  useEffect(() => {
    if (searchTerm) {
      setIsDropdownVisible(true);
    }
  }, [searchTerm]);

  // Hide dropdown on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsDropdownVisible(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const debouncedValue = useDebounce(searchTerm, 1000);
  const SEARCHAPIURL = `https://api.themoviedb.org/3/search/multi?query=${debouncedValue}&include_adult=true&language=en-US&page=1`;

  const { movies: searchResults } = useFetch(SEARCHAPIURL);

  const firstMovieMatch = searchResults.find((r) => r.media_type === "movie");
  const firstTvMatch = searchResults.find((r) => r.media_type === "tv");

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
      {/* Full-width sticky search at top */}
      <div className="sticky-search-wrapper">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {/* Search results dropdown for full-width search */}
        {debouncedValue.trim() &&
          searchResults.length > 0 &&
          isDropdownVisible && (
            <div className="search-results-container search-results-full">
              {firstMovieMatch && (
                <Link
                  to={`search/${firstMovieMatch.title || firstMovieMatch.name}`}
                  className="search-result-item"
                  onClick={() => setSearchTerm("")}
                >
                  {firstMovieMatch.title || firstMovieMatch.name} in Movies
                </Link>
              )}
              {firstTvMatch && (
                <Link
                  to={`search/${firstTvMatch.title || firstTvMatch.name}`}
                  className="search-result-item"
                  onClick={() => setSearchTerm("")}
                >
                  {firstTvMatch.title || firstTvMatch.name} in TV Shows
                </Link>
              )}
              {searchResults.slice(0, 7).map(
                (result) =>
                  result.media_type !== "person" && (
                    <Link
                      key={result.id}
                      to={`search/${result.title || result.name}`}
                      className="search-result-item"
                      onClick={() => setSearchTerm("")}
                    >
                      {result.title || result.name}
                    </Link>
                  ),
              )}
            </div>
          )}
      </div>
      {/* Hero section */}
      <Hero
        image="https://static0.colliderimages.com/wordpress/wp-content/uploads/2024/12/10-best-action-movies-of-the-last-25-years.jpg"
        title="Experience the Magic of Cinema"
        subtitle="Discover blockbusters, hidden gems, and the most anticipated releases — curated for the true film lover."
        badge="Now Streaming"
      />

      {/* Original search UI after hero */}
      <Search2 />
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
