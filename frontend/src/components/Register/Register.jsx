import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import { toast, Toaster } from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Buyer",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async () => {
    console.log(import.meta.env);
    const { name, email, password } = formData;
    if(!email || !password || !name) return alert("Email or Password cannot be empty\nPlease Try Again.");
    if(password.length < 8) return alert("Password must be of atleast 8 characters.")
    console.log(email, password)

    try {
        const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/register`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
      
      console.log(data.user);
      toast.success(data.message || "Registered Successfully");
      navigation.navigate('dashboard');
    } catch (error) {
      if(!error.resoponse || !error.response.status || !error.response.data) toast.error(data.message, "Error in Registration");
      const { status, data } = error.response;
      console.log(status, data);
      if(status === 400 || status === 401) toast.error(data.message, "Error in Registration");
      else toast.error("Error in Registration\nPlease try again.");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
    // console.log(formData);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <Toaster />
        <h2>Register</h2>
        <div className="role-tabs">
          <div
            className={`role-tab ${
              formData.role === "Buyer" ? "active" : ""
            }`}
            onClick={() => setFormData({ ...formData, role: "Buyer" })}
          >
            Buyer
          </div>
          <div
            className={`role-tab ${
              formData.role === "Seller" ? "active" : ""
            }`}
            onClick={() => setFormData({ ...formData, role: "Seller" })}
          >
            Seller
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
            <label htmlFor="phone">Phone:</label>
            <input
              type="phone"
              id="phone"
              name="phone"
              value={formData.phone}
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
          <button type="submit">Register</button>
          <div className="login-link">
            <p>
              Already have an account? <Link to="/">Login here</Link>
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

export default Register;