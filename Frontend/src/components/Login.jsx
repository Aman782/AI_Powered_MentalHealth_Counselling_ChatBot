import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = { email, password };
    console.log(data);

    try {
      const res = await axios.post(
        "http://localhost:8000/users/login",
        data,
        { withCredentials: true }
      );
      alert("Login successful!");
      setLoggedIn(true);
      
      if(res.data.LoggedInUser.role == "expert"){
        navigate('/expert-dashboard');
      }else{
        navigate('/');
      }

      console.log(res.data);
    } catch (error) {
      alert("Incorrect email or password. Please try again.");
      console.error(error);
    } finally {
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-fluid mt-3 d-flex justify-content-center p-5 fontstyle">
        <div className="card shadow-sm col-md-5 p-4 border-3">
          <h2 className="text-center mb-4 text-primary">Login</h2>
          <form onSubmit={handleOnSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                className="form-control"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                className="form-control"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button
              className="btn btn-primary w-100"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
