import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Property from '../Property/Property';
import Filter from '../Filter/Filter';
import './Dashboard.css';
import Navbar from '../Navbar/Navbar';
import PropertyModal from '../PropertyModal/PropertyModal';

const Dashboard = ({ userState }) => {
  const currentUser = userState.value;
  const [propertyData, setPropertyData] = useState([]);
  const [filters, setFilters] = useState({
    minArea: "1000",
    maxArea: "1500",
    area: '',
    bedrooms: '',
    bathrooms: ''
  });
  const [formData, setFormData] = useState({
    id: '',
    place: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    hospitals: '',
    colleges_nearby: '',
    action: 'create'
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getProperties = async (role) => {
    const endpoint = role === 'Seller'
      ? `${import.meta.env.VITE_BASE_URL}/api/v1/property/seller`
      : `${import.meta.env.VITE_BASE_URL}/api/v1/property/buyer`;

    console.log(`${import.meta.env.VITE_BASE_URL}/api/v1/property/seller`)
    try {
      const { data } = await axios.get(endpoint, {
        withCredentials: true
      });
      console.log("Property Data: ", data);
      setPropertyData(data.properties);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    // console.log(import.meta.env.VITE_BASE_URL)
    getProperties(currentUser.role);
  }, [currentUser.role]);

  const handleEdit = (property) => {
    console.log(`Edit property with id: ${property._id}`);
    
    setIsModalOpen(true)
    setFormData({...property, id: property._id, action: 'update'})
    
  };

  const handleDelete = async (propertyId) => {
    console.log(`Delete property with id: ${propertyId}`);
    
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/property/delete?id=${propertyId}`, {
        withCredentials: true
      });
      setPropertyData(propertyData.filter(property => property._id !== propertyId));
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleCreate = async (newProperty) => {
    try {
      console.log("newProperty", newProperty)
      const config = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      }
      
      const { data } = (formData.action === 'create') ? await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/property/create`, newProperty, config) : await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/v1/property/update`, newProperty, config);

      data.property = newProperty;

      if(formData.action === 'create') setPropertyData([...propertyData, data.property]);
      else setPropertyData([...propertyData.filter((prop) => prop._id !== formData._id), data.property].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))
      setIsModalOpen(false);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const filteredProperties = currentUser.role === 'Buyer'
    ? propertyData.filter((property) => {
        const matchesArea = (Number(filters.minArea) && Number(filters.maxArea)) 
          ? (Number(property.area) >= Number(filters.minArea) && Number(property.area) <= Number(filters.maxArea)) 
          : true;
        const matchesBedrooms = filters.bedrooms ? property.bedrooms == filters.bedrooms : true;
        const matchesBathrooms = filters.bathrooms ? property.bathrooms >= filters.bathrooms : true;
        return matchesArea && matchesBedrooms && matchesBathrooms;
      })
    : propertyData;

  return (
    <div className="dashboard-container">
      <Navbar userState={userState} />
        {currentUser.role === 'Seller' && (
          <button onClick={() => {
            setIsModalOpen(true)
            setFormData({
              id: '',
              place: '',
              area: '',
              bedrooms: '',
              bathrooms: '',
              hospitals: '',
              colleges_nearby: '',
              action: 'create'
            })
          }} className="create-property-button">
            Create Property
          </button>
        )}
      <div className="dashboard-content">
        {currentUser.role === 'Buyer' && (
          <Filter filters={filters} setFilters={setFilters} />
        )}
        <div className="property-list">
          {filteredProperties.length > 0 ? (
            filteredProperties.map(property => (
              <Property 
                key={property._id} 
                property={property} 
                isSeller={currentUser.role === 'Seller'}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p>No properties available.</p>
          )}
        </div>
      </div>
      {isModalOpen && (
        <PropertyModal 
          onClose={() => setIsModalOpen(false)} 
          onCreate={handleCreate}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
};

export default Dashboard;
