import "./Search.css";
import { Link } from "react-router-dom";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-container">
      <div className="container">
        <div className="search-wrapper">
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
          <Link to="/searchresults" className="search-button">
            Search
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Search;
