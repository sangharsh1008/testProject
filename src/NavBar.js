import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import React from 'react';

function NavBar(props) {


if(!props.isUserLogged){
  return <div></div>
}else{
  
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link as={Link} to="/home">
            Home
          </Nav.Link>
         
          <Nav.Link as={Link} to="/cart">
            Cart
          </Nav.Link>

          <Nav.Link as={Link} to="/category">
            Categories Products
          </Nav.Link>         
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
}

function stateToProps(state) {
  console.log(state);
  return {
    isUserLogged:state.reducer.isUserLogged,
  };
}
export default connect(stateToProps)(NavBar);
