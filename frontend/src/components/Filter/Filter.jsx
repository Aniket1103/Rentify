import React from 'react';
import './Filter.css';

const Filter = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <div className="filter-container">
      <br></br>
      <div className="filter-item">
        <label>Area Range (sq ft): {filters.minArea} - {filters.maxArea}</label>
        <input
          type="range"
          name="minArea"
          min="500"
          max={filters.maxArea}
          value={filters.minArea}
          onChange={handleChange}
          className="range-input"
        />
        <input
          type="range"
          name="maxArea"
          min={filters.minArea}
          max="2000"
          value={filters.maxArea}
          onChange={handleChange}
          className="range-input"
        />
      </div>
      <div className="filter-item">
        <label>Bedrooms:</label>
        <select name="bedrooms" value={filters.bedrooms} onChange={handleChange}>
          <option value="">Any</option>
          <option value="1">1BHK</option>
          <option value="2">2BHK</option>
          <option value="3">3BHK</option>
          <option value="4">4BHK</option>
        </select>
      </div>
      <div className="filter-item">
        <label>Bathrooms:</label>
        <input
          type="number"
          name="bathrooms"
          value={filters.bathrooms}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Filter;
