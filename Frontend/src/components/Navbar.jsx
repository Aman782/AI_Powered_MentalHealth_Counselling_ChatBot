import React from "react";
import './Navbar.css';

const Navbar = () => {
  return (
     <>
      <div className="navbar d-flex p-3 border">
        <ul>
          <a className="fs-5">Home</a>
          <a className="fs-5">About</a>
          <a className="fs-5">Services</a>
          <a className="fs-5">Contact</a>
        </ul>
        
        <div className="auth ms-auto">
        <button className="btn btn-primary fs-5 mx-2">
           Signup
        </button>

        <button className="btn btn-outline fs-5 mx-2">
           Login
        </button>
         </div>
        
      </div>
     </>
  );
}

export default Navbar;
