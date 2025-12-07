import React from 'react';
import '../styles/Pagination.css';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  hasNextPage, 
  hasPrevPage, 
  onNext, 
  onPrev, 
  onPageChange 
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="pagination">
      <button 
        onClick={onPrev} 
        disabled={!hasPrevPage}
        className="pagination-btn"
      >
        ← Previous
      </button>

      <div className="page-numbers">
        {currentPage > 3 && (
          <>
            <button 
              onClick={() => onPageChange(1)} 
              className="page-btn"
            >
              1
            </button>
            {currentPage > 4 && <span className="ellipsis">...</span>}
          </>
        )}

        {getPageNumbers().map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`page-btn ${page === currentPage ? 'active' : ''}`}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && <span className="ellipsis">...</span>}
            <button 
              onClick={() => onPageChange(totalPages)} 
              className="page-btn"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button 
        onClick={onNext} 
        disabled={!hasNextPage}
        className="pagination-btn"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;