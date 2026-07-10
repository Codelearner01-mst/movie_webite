import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Search from "../components/Search";
import Card2 from "../components/Card2";
import "./SearchResults.css";
import { useFetch } from "../service/movies_service";
import useDebounce from "../hooks/Debounce";

const SearchResults = () => {
  const { query } = useParams();
  const [searchTerm, setSearchTerm] = useState(query || "");
  const debouncedValue = useDebounce(searchTerm, 1000);

  const SEARCHAPIURL = `https://api.themoviedb.org/3/search/multi?query=${debouncedValue}&include_adult=true&language=en-US&page=1`;
  const { movies: searchResults } = useFetch(SEARCHAPIURL);
  console.log("Search Results:", searchResults);

  const firstMovieMatch = searchResults.find((r) => r.media_type === "movie");
  const firstTvMatch = searchResults.find((r) => r.media_type === "tv");

  const [isDropdownVisible, setIsDropdownVisible] = useState(true);

  // Show dropdown when searchTerm changes
  useEffect(() => {
    if (searchTerm) {
      setIsDropdownVisible(true);
    }
  }, [searchTerm]);

  useEffect(() => {
    setSearchTerm(query || "");
    setIsDropdownVisible(false);
  }, [query]);
  useEffect(() => {
    setIsDropdownVisible(false);
  }, []);

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

  return (
    <div className="search-results-page">
      <div className="search-results-inner">
        {/* Search bar with dropdown */}
        <div className="sr-search-wrapper">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {/* Dropdown — same design as Home.jsx */}
          {debouncedValue.trim() &&
            searchResults.length > 0 &&
            isDropdownVisible && (
              <div className="search-results-container sr-dropdown">
                {firstMovieMatch && (
                  <Link
                    to={`/search/${firstMovieMatch.title || firstMovieMatch.name}`}
                    className="search-result-item"
                  >
                    {firstMovieMatch.title || firstMovieMatch.name} in Movies
                  </Link>
                )}
                {firstTvMatch && (
                  <Link
                    to={`/search/${firstTvMatch.title || firstTvMatch.name}`}
                    className="search-result-item"
                  >
                    {firstTvMatch.title || firstTvMatch.name} in TV Shows
                  </Link>
                )}
                {searchResults.slice(0, 7).map(
                  (result) =>
                    result.media_type !== "person" && (
                      <Link
                        key={result.id}
                        to={`/search/${result.title || result.name}`}
                        className="search-result-item"
                      >
                        {result.title || result.name}
                      </Link>
                    ),
                )}
              </div>
            )}
        </div>

        <section className="search-results-header">
          <p className="section-eyebrow">Search</p>
          <h1>Search Results</h1>
          <p className="search-results-subtitle">Movies</p>
        </section>

        {searchResults.length > 0 ? (
          <div className="movies-grid2">
            {searchResults.map((result) => (
              <Card2 key={result.id} show={result} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>
              No search results found yet. Try a different title or keyword.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
