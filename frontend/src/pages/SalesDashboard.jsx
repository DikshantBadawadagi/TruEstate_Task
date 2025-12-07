import React from 'react';
import { useSales } from '../hooks/useSales';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import SortControls from '../components/SortControls';
import SalesTable from '../components/SalesTable';
import Pagination from '../components/Pagination';
import '../styles/SalesDashboard.css';

const SalesDashboard = () => {
  const {
    sales,
    filterOptions,
    pagination,
    loading,
    error,
    filters,
    updateFilter,
    resetFilters,
    goToNextPage,
    goToPrevPage
  } = useSales();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Retail Sales Management System</h1>
        <p>Advanced search, filtering, and analytics dashboard</p>
      </header>

      <div className="dashboard-content">
        {/* Search and Controls */}
        <div className="controls-section">
          <SearchBar 
            value={filters.search}
            onChange={(value) => updateFilter('search', value)}
          />
          
          <SortControls
            sortBy={filters.sortBy}
            sortOrder={filters.sortOrder}
            onSortByChange={(value) => updateFilter('sortBy', value)}
            onSortOrderChange={(value) => updateFilter('sortOrder', value)}
          />
        </div>

        <div className="main-section">
          {/* Filter Panel */}
          <aside className="filter-sidebar">
            <FilterPanel
              filters={filters}
              filterOptions={filterOptions}
              onFilterChange={updateFilter}
              onReset={resetFilters}
            />
          </aside>

          {/* Sales Table */}
          <main className="table-section">
            {loading && <div className="loading">Loading sales data...</div>}
            
            {error && (
              <div className="error-message">
                Error: {error}
              </div>
            )}

            {!loading && !error && sales.length === 0 && (
              <div className="no-results">
                No sales records found. Try adjusting your filters.
              </div>
            )}

            {!loading && !error && sales.length > 0 && (
              <>
                <div className="results-info">
                  {pagination ? (
                    `Showing ${(pagination.currentPage - 1) * pagination.itemsPerPage + 1} - ${Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of ${pagination.totalItems} results`
                  ) : (
                    'Showing results'
                  )}
                </div>

                <SalesTable sales={sales} />

                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  hasNextPage={pagination.hasNextPage}
                  hasPrevPage={pagination.hasPrevPage}
                  onNext={goToNextPage}
                  onPrev={goToPrevPage}
                  onPageChange={(page) => updateFilter('page', page)}
                />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;