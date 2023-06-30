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
  const im = "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.15752-9/355392768_294387796343019_4736075506570905616_n.jpg?_nc_cat=111&cb=99be929b-3346023f&ccb=1-7&_nc_sid=ae9488&_nc_ohc=36oJtlmLS6oAX_mjZjv&_nc_ht=scontent-hkt1-1.xx&oh=03_AdSja2Po13_iUkC6ywPnMI5ofKHXhktK4SE-udwFbSpRtQ&oe=64C47A70"

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
            <Nav.Link onClick={() => navigate("/enrol")}>Enrollment</Nav.Link>
            {currentUser !== null && (
              <Nav.Link onClick={() => navigate("/admin")}>Admin</Nav.Link>
            )}

            {currentUser === null ? (
              <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
            ) : (
              <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
            )}

            
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
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item >
                  <img style={{ width: 50, height: 50, borderRadius: 400/ 2, margin: 10 }} src={im} alt="profpic"/>
                  <label> Harrison Wills (harris@beastmail.com)</label>                
              </NavDropdown.Item>
              <NavDropdown.Item >
                <Nav.Link onClick={() => navigate("/login")}>Logout</Nav.Link>
              </NavDropdown.Item>
              
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
