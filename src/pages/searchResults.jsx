import { useState } from "react";
import { useParams } from "react-router-dom";
import Search from "../components/Search";
import MovieCard2 from "../components/movieCard2";
import "./SearchResults.css";
import useFetch from "../service/movies_service";
import useDebounce from "../hooks/Debounce";

const SearchResults = () => {
  const { query } = useParams();
  const [searchTerm, setSearchTerm] = useState(query || "");
  const debouncedValue = useDebounce(searchTerm, 1000);

  const SEARCHAPIURL = `https://api.themoviedb.org/3/search/multi?query=${debouncedValue}&include_adult=true&language=en-US&page=1`;
  const { movies: searchResults } = useFetch(SEARCHAPIURL);
  console.log("Search Results:", searchResults);

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
