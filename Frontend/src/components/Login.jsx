import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import Navbar from "./Navbar"; 
import Footer from "./Footer"; 


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email === 'test@example.com' && formData.password === 'password') {
      setSuccess('Login successful!');
      setError('');
    } else {
      setError('Invalid email or password.');
      setSuccess('');
    }
  };

  return (
    <>
    <Navbar />
    <div className="container d-flex justify-content-center align-items-center p-5" style={{ minHeight: '60vh' }}>
      <div className="row w-100">
        <div className="col-md-8 col-lg-6 mx-auto">
          <Card className="shadow-sm border-1 p-4 rounded">
            <Card.Body>
              <h3 className="text-center mb-4 text-primary">Login</h3>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="shadow-sm"
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="shadow-sm"
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 py-2">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Login;
