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

  const { isAuthenticated, userDetails, loading } = useSelector(
    (state) => state.auth
  );
  const { currentPage } = useSelector((state) => state.uiState);

  const handleLogOut = () => {
    dispatch(signOutUser(history));
  };

  const publicLinks = (
    <Nav>
      <Nav.Link className={currentPage === 'Home' && 'active'} href='/'>
        Home
      </Nav.Link>
      <Nav.Link
        className={currentPage === 'Developers' && 'active'}
        href='/developers'
      >
        Developers
      </Nav.Link>
      <Nav.Link
        className={currentPage === 'Sign In' && 'active'}
        href='/sign-in'
      >
        Sign In
      </Nav.Link>
      <Button
        href='/sign-up'
        className='nav-link-btn ml-2'
        variant={currentPage === 'Sign Up' ? 'primary' : 'outline-primary'}
      >
        Sign Up
      </Button>
    </Nav>
  );

  const privateLinks = (
    <Nav>
      <Nav.Link
        className={currentPage === 'Dashboard' && 'active'}
        href='/dashboard'
      >
        Dashboard
      </Nav.Link>
      <Nav.Link
        className={currentPage === 'Saved Posts' && 'active'}
        href='/reading-list'
      >
        Saved Posts
      </Nav.Link>
      <Nav.Link
        className={currentPage === 'Notifs' && 'active'}
        href='/notifications'
      >
        Notifs
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
        <NavDropdown.Item href='/profile'>
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
        <NavDropdown.Item href='/account-settings'>
          Account Settings
        </NavDropdown.Item>
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
            {!loading && (
              <React.Fragment>
                {isAuthenticated ? privateLinks : publicLinks}
              </React.Fragment>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
