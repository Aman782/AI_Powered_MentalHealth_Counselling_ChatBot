import React from "react";
import './Navbar.css';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
     <>
      <div className="navbar d-flex p-3 border">
        <ul>
          <Link to={"/"} className="fs-4 fontstyle">TherapyAI</Link>
          <Link to={"/"} className="fs-5 contentFontstyle">Home</Link>
          <a className="fs-5 contentFontstyle">About</a>
          <a className="fs-5 contentFontstyle">Services</a>
          <a className="fs-5 contentFontstyle">Contact</a>
        </ul>
        
        <div className="auth ms-auto">
        <Link to={"/signup"} className="btn btn-primary btn-lg fs-6 mx-2 fontstyle">
           Signup
        </Link>

        <Link to={"/login"} className="btn btn-outline-success btn-lg fs-6 mx-2 fontstyle">
           Login
        </Link>
         </div>
        
      </div>
     </>
  );
}

export default Navbar;
