import React from "react";
import './Navbar.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Navbar = ({isLoggedIn, setLoggedIn}) => {
  const navigate = useNavigate();

  const handleOnLogout = ()=>{
    try {
      const res = axios.get("http://localhost:8000/users/logout");
      alert("User logged out successfully!");
      setLoggedIn(false);
      navigate("/");
      console.log(res);
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  }

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
        {!isLoggedIn?<> <Link to={"/signup"} className="btn btn-primary btn-lg fs-6 mx-2 fontstyle">
           Signup
        </Link>

        <Link to={"/login"} className="btn btn-outline-success btn-lg fs-6 mx-2 fontstyle">
           Login
        </Link></>: <Link className="btn btn-outline-success btn-lg fs-6 mx-2 fontstyle" onClick={handleOnLogout}>
           Logout
        </Link>}
        
         </div>
        
      </div>
     </>
  );
}

export default Navbar;
