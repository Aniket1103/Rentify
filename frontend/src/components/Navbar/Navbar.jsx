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
      const resp = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/logout`, {
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
            <div className="github">
                <a href="https://github.com/Aniket1103/Rentify" target="_blank" >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="60" viewBox="0 0 24 24">
                    <path fill="#222222" d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"></path>
                </svg>
                </a>
            </div>
          </div>
          
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Navbar;