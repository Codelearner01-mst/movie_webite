import React, { useState } from 'react';
import './Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // No logic required per initial instruction, but standard form flow setup
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="search-container">
      <div className="container">
        <form className="search-form" onSubmit={handleSearch}>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search for movies, genres, or actors..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
