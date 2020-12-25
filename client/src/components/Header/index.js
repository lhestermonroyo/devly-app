import React from 'react';
import {
  Navbar,
  Form,
  FormControl,
  Nav,
  Button,
  Container,
} from 'react-bootstrap';

const Header = () => {
  return (
    <>
      <Navbar bg='primary' variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>
            <strong>{`</>`}</strong> DEVLY
          </Navbar.Brand>
          <Nav className='mr-auto'>
            <Nav.Link href='#home'>Home</Nav.Link>
            <Nav.Link href='#features'>Features</Nav.Link>
            <Nav.Link href='#pricing'>Pricing</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type='text' placeholder='Search' className='mr-sm-2' />
            <Button variant='outline-light'>Search</Button>
          </Form>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
