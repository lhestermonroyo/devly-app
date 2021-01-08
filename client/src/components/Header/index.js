import React from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Button,
  Image,
} from 'react-bootstrap';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../../actions/authAction';

const Header = (props) => {
  const { history } = props;
  const { pathname } = history.location;

  const dispatch = useDispatch();

  const { isAuthenticated, userDetails } = useSelector((state) => state.auth);

  const handleLogOut = () => {
    dispatch(signOutUser(history));
  };

  const publicLinks = (
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
      <Nav.Link className={pathname === '/sign-in' && 'active'} href='/sign-in'>
        Sign In
      </Nav.Link>
      <Button
        href='/sign-up'
        className='nav-link-btn ml-2'
        variant={pathname === '/sign-up' ? 'primary' : 'outline-primary'}
      >
        Sign Up
      </Button>
    </Nav>
  );

  const privateLinks = (
    <Nav>
      <Nav.Link
        className={pathname === '/dashboard' && 'active'}
        href='/dashboard'
      >
        <i className='fa fa-home fa-fw fa-2x' />
      </Nav.Link>
      <Nav.Link className={pathname === '/search' && 'active'} href='/search'>
        <i className='fa fa-search fa-fw fa-2x' />
      </Nav.Link>
      <Nav.Link
        className={pathname === '/reading-list' && 'active'}
        href='/reading-list'
      >
        <i className='fa fa-bookmark fa-fw fa-2x' />
      </Nav.Link>
      <Nav.Link
        className={pathname === '/notifications' && 'active'}
        href='/notifications'
      >
        <i className='fa fa-globe fa-fw fa-2x' />
      </Nav.Link>
      <NavDropdown
        alignRight
        title={
          <Image
            className='nav-avatar'
            src={userDetails && userDetails.avatar}
            roundedCircle
            thumbnail
          />
        }
        id='nav-dropdown'
      >
        <NavDropdown.Item>
          {userDetails && (
            <React.Fragment>
              <p className='text-primary nav-name-content'>
                <strong>
                  {userDetails.firstname} {userDetails.lastname}
                </strong>
              </p>
              <span className='text-muted'>{userDetails.email}</span>
            </React.Fragment>
          )}
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href='/create-post'>Write a post</NavDropdown.Item>
        <NavDropdown.Item href='/posts'>Posts</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={() => handleLogOut()}>
          Log Out
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );

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
          <Navbar.Brand href='/' className='nav-logo'>
            {`</>`} DEVLY
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto'></Nav>
            <React.Fragment>
              {isAuthenticated ? privateLinks : publicLinks}
            </React.Fragment>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
