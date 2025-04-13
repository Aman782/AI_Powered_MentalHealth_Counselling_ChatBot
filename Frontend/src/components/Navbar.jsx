import React from "react";
import './Navbar.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Navbar = ({ isLoggedIn, setLoggedIn }) => {
  const navigate = useNavigate();

  const handleOnLogout = async () => {
    try {
      const res = await axios.get("http://localhost:8000/users/logout", {
        withCredentials: true,
      });
      
      alert("User logged out successfully!");
      setLoggedIn(false);
      navigate("/");
      console.log(res);
    } catch (error) {
      alert("Something went wrong");
      console.error(error.response?.data || error.message);
    }
  };

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
          {!isLoggedIn ? (
            <>
              <Link to={"/signup"} className="btn btn-primary btn-lg fs-6 mx-2 fontstyle">
                Signup
              </Link>
              <Link to={"/login"} className="btn btn-outline-success btn-lg fs-6 mx-2 fontstyle">
                Login
              </Link>
            </>
          ) : (
            <button
              className="btn btn-outline-success btn-lg fs-6 mx-2 fontstyle"
              onClick={handleOnLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
