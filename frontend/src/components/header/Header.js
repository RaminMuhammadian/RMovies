import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";

const Header = ({ userId, setUserId }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user information from sessionstorage
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('token');
    
    // State update to indicate that the user is no longer logged in
    setUserId(null);

    // Refresh page and navigate to the front page
    window.location.reload();
    navigate("/");
  };

  return (
    <Navbar bg="black" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand className="logo" style={{ color: 'red' }}>
          <NavLink className="nav-link" to="/">
            RMovies
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/watchlist">
              Watchlist
            </NavLink>
          </Nav>

          {!userId ? (
            <NavLink to="/login">
              <Button variant="outline-info" className="me-2">
                Login
              </Button>
            </NavLink>
          ) : (
            <Button variant="outline-info" className="me-2" onClick={handleLogout}>
              Logout
            </Button>
          )}

          <NavLink to="/register">
            <Button variant="outline-info">Register</Button>
          </NavLink>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
