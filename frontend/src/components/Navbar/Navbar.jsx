import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({userState}) => {
  const currentUser = userState.value;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const navigation = useNavigate();

  const handleLogout = async () => {
    try {
      const resp = await axios.get(`http://localhost:4000/api/v1/logout`, {
        withCredentials: true
      })
      console.log("Logout: ", resp);
      console.log(userState)
      toast.success(resp.message);
      userState.set(null);
      navigation.navigate('/');
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link to="/"></Link>
      </div>
      <h1>For {currentUser.role}</h1>
      <div className="nav-profile" onClick={toggleDropdown}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          alt="Profile"
          className="profile-icon"
        />
        {isDropdownOpen && (
          <div className="dropdown">
            <p>
              {currentUser.name}
            </p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Navbar;