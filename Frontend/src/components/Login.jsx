import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({setLoggedIn}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleOnSubmit = (e)=>{
    e.preventDefault();
    
    let data = {
      email,
      password
    }

    try{
      const res = axios.post("http://localhost:8000/users/login", data);
      alert("User LoggedIn Successfully!");
      setLoggedIn(true);
      navigate("/");
      console.log(res.data);
    }catch(error){
      alert("Login credentials are Incorrect!, try again");
      navigate("/login");
      console.log(error);
    }

    setEmail('');
    setPassword('');
  }

  return (
    <>
      <div className="container-fluid mt-3 d-flex justify-content-center p-5 fontstyle">
        <div className="card shadow-sm col-md-5 p-4">
          <h2 className="text-center mb-4 text-primary">Login</h2>
          <form onSubmit={handleOnSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Email
              </label>
              <input
                id={"email"}
                className="form-control"
                type="text"
                placeholder="enter email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                required
              ></input>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                password
              </label>
              <input
                id={"password"}
                className="form-control"
                type="password"
                placeholder="enter password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                required
              ></input>
            </div>
            <button className="btn btn-primary w-100" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
