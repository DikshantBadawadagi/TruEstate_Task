import React from 'react';
import MultiSelect from './MultiSelect';
import '../styles/FilterPanel.css';

const FilterPanel = ({ filters, filterOptions, onFilterChange, onReset }) => {
  if (!filterOptions) return <div className="filter-loading">Loading filters...</div>;

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Filters</h3>
        <button onClick={onReset} className="reset-btn">Reset All</button>
      </div>

      <div className="filter-groups-container">
        <div className="filter-group">
          <label>Customer Region</label>
          <MultiSelect
            options={filterOptions.regions}
            selected={filters.regions}
            onChange={(value) => onFilterChange('regions', value)}
            placeholder="Select regions..."
          />
        </div>

        <div className="filter-group">
          <label>Gender</label>
          <MultiSelect
            options={filterOptions.genders}
            selected={filters.genders}
            onChange={(value) => onFilterChange('genders', value)}
            placeholder="Select genders..."
          />
        </div>

        <div className="filter-group">
          <label>Age Range</label>
          <div className="range-inputs">
            <input
              type="number"
              placeholder="Min"
              value={filters.ageMin}
              onChange={(e) => onFilterChange('ageMin', e.target.value)}
              className="range-input"
            />
            <span>to</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.ageMax}
              onChange={(e) => onFilterChange('ageMax', e.target.value)}
              className="range-input"
            />
          </div>
        </div>

        <div className="filter-group">
          <label>Product Category</label>
          <MultiSelect
            options={filterOptions.categories}
            selected={filters.categories}
            onChange={(value) => onFilterChange('categories', value)}
            placeholder="Select categories..."
          />
        </div>

        <div className="filter-group">
          <label>Tags</label>
          <MultiSelect
            options={filterOptions.tags}
            selected={filters.tags}
            onChange={(value) => onFilterChange('tags', value)}
            placeholder="Select tags..."
          />
        </div>

        <div className="filter-group">
          <label>Payment Method</label>
          <MultiSelect
            options={filterOptions.paymentMethods}
            selected={filters.paymentMethods}
            onChange={(value) => onFilterChange('paymentMethods', value)}
            placeholder="Select methods..."
          />
        </div>

        <div className="filter-group">
          <label>Date Range</label>
          <div className="date-inputs">
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => onFilterChange('dateFrom', e.target.value)}
              className="date-input"
            />
            <span>to</span>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => onFilterChange('dateTo', e.target.value)}
              className="date-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;