import { useState } from "react";
import Search from "../components/Search";
import MovieCard2 from "../components/movieCard2";
import "./SearchResults.css";

const SearchResults = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchResults = JSON.parse(
    sessionStorage.getItem("searchresults") || "[]",
  );

  return (
    <div className="search-results-page">
      <div className="search-results-inner">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <section className="search-results-header">
          <p className="section-eyebrow">Search</p>
          <h1>Search Results</h1>
          <p className="search-results-subtitle">Movies</p>
        </section>

        {searchResults.length > 0 ? (
          <div className="movies-grid2">
            {searchResults.map((movie) => (
              <MovieCard2 key={movie.id} movie={movie} />
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
