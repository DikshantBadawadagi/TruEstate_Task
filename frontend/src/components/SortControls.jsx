import React from 'react';
import '../styles/SortControls.css';

const SortControls = ({ sortBy, sortOrder, onSortByChange, onSortOrderChange }) => {
  return (
    <div className="sort-controls">
      <label>Sort by:</label>
      <select 
        value={sortBy} 
        onChange={(e) => onSortByChange(e.target.value)}
        className="sort-select"
      >
        <option value="date">Date</option>
        <option value="quantity">Quantity</option>
        <option value="customerName">Customer Name</option>
      </select>

      <button
        onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
        className="sort-order-btn"
        title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
      >
        {sortOrder === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  );
};

export default SortControls;