import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = ({setLoggedIn}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let data = { username, email, password };

    try {
      const res = await axios.post('http://localhost:8000/users/register', data, {withCredentials: true});
      alert('Registration Success');
      setLoggedIn(true);
      navigate('/');
      console.log(res.data);
    } catch (error) {
      alert('Registration Failed!');
      console.log(error);
    }

    setEmail('');
    setUsername('');
    setPassword('');
  };

  return (
    <>
    <div className="container mt-3 d-flex justify-content-center p-5 fontstyle">
      <div className="card shadow-sm p-4 col-md-5 border-3">
        <h2 className="text-center mb-4 text-primary">Sign Up</h2>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Signup;
