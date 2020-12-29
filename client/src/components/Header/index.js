import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const Header = (props) => {
  const { history } = props;
  const { pathname } = history.location;
  return (
    <>
      <Navbar
        collapseOnSelect
        expand='lg'
        bg='light'
        variant='light'
        fixed='top'
      >
        <Container>
          <Navbar.Brand href='#home' className='nav-logo'>
            {`</>`} DEVLY
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto'></Nav>
            <Nav>
              <Nav.Link className={pathname === '/' && 'active'} href='/'>
                Home
              </Nav.Link>
              <Nav.Link
                className={pathname === '/developers' && 'active'}
                href='/developers'
              >
                Developers
              </Nav.Link>
              <Nav.Link
                className={pathname === '/sign-in' && 'active'}
                href='/sign-in'
              >
                Sign In
              </Nav.Link>
              <Button
                href='/sign-up'
                className='nav-link-btn ml-2'
                variant={
                  pathname === '/sign-up' ? 'primary' : 'outline-primary'
                }
              >
                Sign Up
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
