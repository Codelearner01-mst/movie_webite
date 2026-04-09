import { useEffect, useState } from "react";
import useFetch from "../service/movies_service";
import Hero from "../components/Hero";
import MovieCard from "../components/MovieCard";
import { ErrorCard } from "../components/ErrorCard";
import Search from "../components/Search";
import useDebounce from "../hooks/Debounce";
import "./Home.css";
import { Link } from "react-router-dom";

const AcessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTEzYjEzNDRjOWQ0YzQ5OTczODFmMDNmMTczOTc1OSIsIm5iZiI6MTc3NTQ4OTQxMy45NDksInN1YiI6IjY5ZDNkMTg1ZjU5NzdlOGVkY2NiZmEyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VYhhAF2F3aGl7SFogfiWrU7vnBmBTlovvV52ci2bcVo";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${AcessToken}`,
  },
};

const Home = () => {
  const {
    movies: latestMovies,
    isLoading: isLatestLoading,
    error: latestError,
  } = useFetch("now_playing", 1);
  const {
    movies: upcomingMovies,
    isLoading: isUpcomingLoading,
    error: upcomingError,
  } = useFetch("upcoming", 1);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const debouncedValue = useDebounce(searchTerm, 1000);
  const searchAPI = `https://api.themoviedb.org/3/search/movie?query=${debouncedValue}&include_adult=true&language=en-US&page=1`;
  console.log("Debounced value", debouncedValue);
  console.log("Search term", searchTerm);
  useEffect(() => {
    fetch(searchAPI, options)
      .then((res) => res.json())
      .then((data) => setSearchResults(data.results))
      .catch((err) => console.error(err));
  }, [searchAPI]);

  return (
    <div className="home-page">
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {searchResults.length > 0 && (
        <div className="search-results-container">
          {searchResults.slice(0, 10).map((result) => (
            <span key={result.id} className="search-result-item">
              {result.title}
            </span>
          ))}
        </div>
      )}
      <Hero
        image="/home-hero.png"
        title="Experience the Magic of Cinema"
        subtitle="Discover the latest blockbusters and highly anticipated upcoming releases curated just for you."
      />

      <div className="container py-4">
        <div className="movie-section mb-4">
          <h2 className="section-title">Expected Next: Latest Movies</h2>
          {latestError && <ErrorCard message={latestError} />}
          <div className="movies-grid">
            {isLatestLoading && <p>Loading latest movies...</p>}
            {latestMovies.slice(0, 8).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="load-more-container">
            <Link to="/latest" className="load-more-btn">
              Explore more latest
            </Link>
          </div>
        </div>

        <div className="movie-section mt-4 pt-4">
          <h2 className="section-title">Upcoming Movies</h2>
          {upcomingError && <ErrorCard message={upcomingError} />}
          <div className="movies-grid">
            {isUpcomingLoading && <p>Loading upcoming movies...</p>}
            {upcomingMovies.slice(0, 8).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="load-more-container">
            <Link to="/upcoming" className="load-more-btn">
              Explore more upcoming
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
