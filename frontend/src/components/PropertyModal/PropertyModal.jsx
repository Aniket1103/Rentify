import React, { useState } from 'react';
import './PropertyModal.css';

const PropertyModal = ({ onClose, onCreate, formData, setFormData }) => {
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Property Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="place">Place:</label>
            <input
              type="text"
              id="place"
              name="place"
              value={formData.place}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="area">Area:</label>
            <input
              type="number"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bedrooms">Bedrooms:</label>
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bathrooms">Bathrooms:</label>
            <input
              type="number"
              id="bathrooms"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="hospitals">Hospitals Nearby:</label>
            <input
              type="text"
              id="hospitals"
              name="hospitals"
              value={formData.hospitals}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="colleges_nearby">Colleges Nearby:</label>
            <input
              type="text"
              id="colleges_nearby"
              name="colleges_nearby"
              value={formData.colleges_nearby}
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyModal;
