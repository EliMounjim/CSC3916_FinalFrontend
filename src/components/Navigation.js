import React from 'react';
import {Nav, Navbar, Container, Button, NavDropdown} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import logo from '../assets/logo.png';
function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
          <LinkContainer to ="/">
            <Navbar.Brand>
                <img src={logo} style={{width:50, height:50}} />
            </Navbar.Brand>
          
          </LinkContainer>
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
                <LinkContainer to="/login">
                      <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                      <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/chat">
                      <Nav.Link>Chat</Nav.Link>
                </LinkContainer>
              <NavDropdown title="Menu" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">log Out</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation