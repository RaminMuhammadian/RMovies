import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form, Spinner } from 'react-bootstrap';

const Register = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [loading, setLoading] = useState(false);

  const joinUser = async () => {
    console.log('Sign Up!');
    setLoading(true);

    const { email, password, name } = userInfo;

    const user = {
      email,
      password,
      name,
    };

    try {
      const response = await axios.post('/api/auth/signup', user);

      if (response.status === 200) {
        alert('Registration successful');
        navigate('/login');
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const joinInfoHandler = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <div className="container" style={{ width: '500px', marginTop: '18vh' }}>
        <div className="row">
          <div className="col">
            <div style={{ margin: '20px' }}>
              <p style={{ fontWeight: 'bold', fontSize: '18px', color: 'white' }}>
                Set up your email and password and start your membership.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="text"
                  placeholder="Email"
                  value={userInfo.email}
                  onChange={joinInfoHandler}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={userInfo.password}
                  onChange={joinInfoHandler}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Name"
                  value={userInfo.name}
                  onChange={joinInfoHandler}
                />
              </Form.Group>

              <Button variant="info" onClick={joinUser} style={{ margin: '20px' }} disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Register'}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Register;
