import React, { useState, useRef, useEffect } from 'react';
import '../styles/MultiSelect.css';

const MultiSelect = ({ options, selected, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (value) => {
    const newSelected = selected.includes(value)
      ? selected.filter(item => item !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange([]);
  };

  return (
    <div className="multiselect" ref={dropdownRef}>
      <div 
        className="multiselect-trigger" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="multiselect-value">
          {selected.length === 0 ? (
            <span className="placeholder">{placeholder}</span>
          ) : (
            <span className="selected-count">{selected.length} selected</span>
          )}
        </div>
        <div className="multiselect-actions">
          {selected.length > 0 && (
            <button 
              className="clear-btn" 
              onClick={handleClear}
              type="button"
            >
              ×
            </button>
          )}
          <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
        </div>
      </div>

      {isOpen && (
        <div className="multiselect-dropdown">
          {options.map((option) => (
            <label key={option} className="multiselect-option">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => handleToggle(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;