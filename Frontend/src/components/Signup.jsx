import React from "react";
import Navbar from "./Navbar.jsx";  
import Footer from "./Footer.jsx"; 


const Signup = () => {
  return (
    <>
    <Navbar />
    <div className="container d-flex justify-content-center align-items-center p-5">
      <form 
        method="post" 
        action="http://localhost:8000/users/register" 
        className="card p-4 shadow-sm" 
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-4">Signup</h3>
        
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input 
            type="text" 
            id="username" 
            placeholder="Enter username" 
            name="username" 
            className="form-control" 
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Enter email" 
            name="email" 
            className="form-control" 
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Enter password" 
            name="password" 
            className="form-control" 
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
    <Footer />
    </>
  );
};

export default Signup;
