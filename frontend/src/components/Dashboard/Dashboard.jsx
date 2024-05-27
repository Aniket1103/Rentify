import React, { useEffect, useState } from 'react';
// import './Dashboard.css';

const Dashboard = ({ userState }) => {
  const currentUser = userState.value;
  console.log("Dashboard: ", currentUser.role);
  const [propertyData, setPropertyData] = useState([]);


  const getProperties = async () => {
    try {
      const {data} = await axios.get(`http://localhost:4000/api/v1/property/buyer`, {
        withCredentials: true
      })
      console.log("Property Data: ", data);
      setPropertyData("data", data);
    } catch (error) {
      console.log(error.response.data);
    }
  }
  useEffect(() => {
    getProperties();
  }, [])

  return (
    <div className="dashboard-container">
      Dashboard
    </div>
  );
};

export default Dashboard;