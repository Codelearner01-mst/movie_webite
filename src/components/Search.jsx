import "./Search.css";
import { Link } from "react-router-dom";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-container search-container-full search-container-sticky">
      <div className="search-wrapper search-wrapper-full">
        <div className="search-glow" />
        <svg
          className="search-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search movies, genres, actors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search movies"
        />
        {searchTerm && (
          <span
            className="search-close-sign"
            onClick={() => setSearchTerm("")}
            role="button"
            aria-label="Clear search"
          >
            &times;
          </span>
        )}
      </div>
      {searchTerm.trim() && (
        <div className="search-dropdown-full">
          {/* Dropdown will be populated by parent */}
        </div>
      )}
    </div>
  );
};

export default Search;
