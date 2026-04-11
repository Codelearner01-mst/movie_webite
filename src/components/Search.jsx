import "./Search.css";

const Search = ({ searchTerm, setSearchTerm }) => {
  /**
   * The search logic as follows:
   * The user types a movie name
   * compare the search term with the movie names in the database and return the ones that match the search term
   * The search should be case insensitive and should return results even if the search term is a partial match of the movie name
   * Wait for the user to stop typing for 500ms before making the search request to avoid making too many requests while the user is typing
   * Dynanamically render the return matches and display them in a dropdown below the search bar
   */

  return (
    <div className="search-container">
      <div className="container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for movies, genres, or actors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
