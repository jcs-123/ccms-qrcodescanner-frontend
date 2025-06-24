import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

function Header() {
  return (
    <Navbar className="animated-navbar" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/" style={{marginLeft:"120px"}} className="navbar-brand-animated ">
          CCMS SCANNER
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
