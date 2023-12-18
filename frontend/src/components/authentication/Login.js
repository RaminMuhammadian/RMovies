import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form, Spinner } from 'react-bootstrap';

const Login = ({ setUserId }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const data = {
      email: username,
      password: password,
    };

    try {
      const response = await axios.post("/api/auth/signin", data);

      if (response.data.token) {
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('user_id', response.data.userId);
        
        // Set the user ID in the parent component state
        setUserId(response.data.userId);

        // Set Authorization header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        // Navigate to the home page
        navigate("/");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container>
      <div className="container" style={{ width: "500px", marginTop: "18vh" }}>
        <div className="row">
          <div className="col">
            <div style={{ margin: "20px" }}>
              <p style={{ fontWeight: "bold", fontSize: "18px", color: "white" }}>
                Login with your email and password.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Email"
                  value={username}
                  onChange={handleUsername}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={handlePassword}
                />
              </Form.Group>

              {error && (
                <div className="text-danger mb-3">
                  {error}
                </div>
              )}

              <Button variant="info" type="submit" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
