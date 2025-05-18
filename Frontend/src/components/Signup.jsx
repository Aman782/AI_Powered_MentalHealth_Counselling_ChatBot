import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role = user
  const [expertRole, setExpertRole] = useState(""); // new: specific expert role
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const expertRoles = [
    "Psychologist",
    "Psychiatrist",
    "Therapist / Counselor",
    "Mental Health Coach",
    "Behavioral Therapist",
    "Substance Abuse Counselor",
    "Marriage and Family Therapist"
  ];

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = { username, email, password, role };

    if (role === "expert") {
      data.expertRole = expertRole; 
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/users/register",
        data,
        { withCredentials: true }
      );
      alert("Registration successful!");
      setLoggedIn(true);

      if(role == "expert"){
        navigate('/expert-dashboard');
      }else{
        navigate('/');
      }
      console.log(res.data);
    } catch (error) {
      alert("Registration failed. Please try again.");
      console.error(error);
    } finally {
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("user");
      setExpertRole("");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mt-3 d-flex justify-content-center p-5 fontstyle">
        <div className="card shadow-sm p-4 col-md-5 border-3">
          <h2 className="text-center mb-4 text-primary">Sign Up</h2>
          <form onSubmit={handleOnSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                className="form-control"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
              />
            </div>

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

            {/* Role selection */}
            <div className="mb-3">
              <label className="form-label me-3">Role:</label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="role"
                  id="userRole"
                  value="user"
                  checked={role === "user"}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={loading}
                />
                <label className="form-check-label" htmlFor="userRole">
                  User
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="role"
                  id="expertRole"
                  value="expert"
                  checked={role === "expert"}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={loading}
                />
                <label className="form-check-label" htmlFor="expertRole">
                  Expert
                </label>
              </div>
            </div>

            {/* If expert selected, show dropdown */}
            {role === "expert" && (
              <div className="mb-3">
                <label htmlFor="expertRoleSelect" className="form-label">
                  Select your expertise
                </label>
                <select
                  id="expertRoleSelect"
                  className="form-select"
                  value={expertRole}
                  onChange={(e) => setExpertRole(e.target.value)}
                  required
                  disabled={loading}
                >
                  <option value="">-- Select Expert Role --</option>
                  {expertRoles.map((role, idx) => (
                    <option key={idx} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
