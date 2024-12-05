import React, { useState } from "react";
import axios from "axios";
import config from "../config.js";
import Navbar from "./Navbar.jsx";  
import Footer from "./Footer.jsx";  


const API_URL = config.API_URL;

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/users/login`, formData, {
        withCredentials: true,
      });
      setMessage("User logged in successfully");
      console.log("Access Token:", response.data.accessToken);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      {/* Include Navbar */}
      <Navbar />

      {/* Container to center the content */}
      <div className="container d-flex justify-content-center align-items-center p-5">
        {/* Card for the login form */}
        <div className="card shadow-sm p-4" style={{ width: "100%", maxWidth: "400px" }}>
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username or Email
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your username or email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          {/* Message after form submission */}
          {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
      </div>

      {/* Include Footer */}
      <Footer />
    </>
  );
};

export default Login;
