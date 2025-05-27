import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

function Header() {
  return (
    <Navbar className="animated-navbar" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/" className="navbar-brand-animated">
          CCMS SCANNER
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
