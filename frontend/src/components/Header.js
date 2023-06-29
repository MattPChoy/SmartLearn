import React from "react";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../helper/AuthContext";

function Header() {
  const courses = ["COMP3506", "COMP3702", "DECO3801", "MATH2100"];
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          SmartClass
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/enrol")}>Enrol</Nav.Link>
            {currentUser !== null && (
              <Nav.Link onClick={() => navigate("/admin")}>Admin</Nav.Link>
            )}

            {currentUser === null ? (
              <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
            ) : (
              <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
            )}

            <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
            <NavDropdown title="Courses" id="basic-nav-dropdown">
              {courses.map((course, index) => (
                <NavDropdown.Item
                  key={index}
                  onClick={() => navigate(`/courses/${course}`)}
                >
                  {course}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
