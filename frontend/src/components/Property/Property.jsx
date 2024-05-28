import React from 'react';
import './Property.css';

const Property = ({ property, isSeller, onEdit, onDelete }) => {
  return (
    <div className="property-card">
      <h2>{property.name}</h2>
      <p><strong>Place:</strong> {property.place} sq ft</p>
      <p><strong>Area:</strong> {property.area} sq ft</p>
      <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
      <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
      <p><strong>Hospitals Nearby:</strong> {property.hospitals}</p>
      <p><strong>Colleges Nearby:</strong> {property.colleges_nearby}</p>
      {isSeller && (
        <div className="property-actions">
          <button onClick={() => onEdit(property)}>Edit</button>
          <button onClick={() => onDelete(property._id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Property;
