import React, { useState, useEffect } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ value, onChange }) => {
  const [searchTerm, setSearchTerm] = useState(value);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, onChange]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by customer name or phone number..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <svg 
        className="search-icon" 
        width="20" 
        height="20" 
        viewBox="0 0 20 20" 
        fill="none"
      >
        <path 
          d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default SearchBar;