import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import Navbar from "./Navbar"; 
import Footer from "./Footer";  

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Assuming a successful signup process here, you'd typically send data to an API
    setSuccess('Account created successfully!');
    setError('');
  };

  return (
    <>
    <Navbar />
    <div className="container d-flex justify-content-center align-items-center p-4" style={{ minHeight: '90vh' }}>
      <div className="row w-100">
        <div className="col-md-8 col-lg-6 mx-auto">
          <Card className="shadow-sm border-1 p-4 rounded">
            <Card.Body>
              <h3 className="text-center mb-4 text-primary">Sign Up</h3>
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

                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Choose a username"
                    name="username"
                    value={formData.username}
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

                <Form.Group controlId="confirmPassword" className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="shadow-sm"
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 py-2">
                  Sign Up
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

export default Signup;
