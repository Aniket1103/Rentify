import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; 
import { toast, Toaster } from "react-hot-toast";

const CREDS = {
  "Buyer" : {
    email: "buyer.test@gmail.com",
    password: "buyertest123"
  },
  "Seller": {
    email: "seller.test@gmail.com",
    password: "sellertest123"
  }
}

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async () => {
    const { email, password } = formData;
    if(!email || !password ) return alert("Email or Password cannot be empty\nPlease Try Again.");
    if(password.length < 8) return alert("Password must be of atleast 8 characters.")
    console.log(email, password, import.meta.env.VITE_BASE_URL)

    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/login`, {
          email,
          password
      }, config);
      
      console.log("login response", response);
      toast.success("Logged In Successfully!");
      navigation.navigate('dashboard');
    } catch (error) {
      // const { status, data } = error.response;
      // console.log(status, data);
      toast.error(error?.response?.data?.message || "Error Logging in\nPlease try again.");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to the backend API for login).
    await handleLogin();
    console.log(formData);
  };

    const handleContinueAsGuest = async (role) => {
      // Handle "Continue as Guest" button action here
      setFormData(CREDS[role])
      await handleLogin();  
      console.log(`Continue as ${role} clicked!`);
    };


  return (
    <div className="login-container">
      <div className="login-card">
        <Toaster />
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
          <div className="continue-as-guest">
            <button onClick={() => handleContinueAsGuest("Buyer")}>Continue as Buyer <code>test</code></button>
          </div>
          <div className="continue-as-guest">
            <button onClick={() => handleContinueAsGuest("Seller")}>Continue as Seller <code>test</code></button>
          </div>
          <div className="register-link">
            <p>
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </div>
          <div className="github">
            <a href="https://github.com/Aniket1103/Rentify" target="_blank" >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="60" viewBox="0 0 24 24">
                  <path fill="#222222" d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"></path>
              </svg>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;