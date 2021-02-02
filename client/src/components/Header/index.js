import React from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Button,
  Image,
  Form,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../../actions/authAction';

const Header = (props) => {
  const { history } = props;

  const dispatch = useDispatch();

  const { isAuthenticated, userDetails, loading } = useSelector(
    (state) => state.auth
  );
  const { currentPage } = useSelector((state) => state.uiState);

  const handleLogOut = () => {
    dispatch(signOutUser(history));
  };

  const publicLinks = (
    <React.Fragment>
      <Nav className='mr-auto' />
      <Nav>
        <Nav.Link
          className={currentPage === 'Sign In' ? 'active mr-3' : 'mr-3'}
          href='/sign-in'
        >
          Sign In
        </Nav.Link>
        <Button
          href='/sign-up'
          className={currentPage === 'Sign Up' && 'active'}
          variant='primary'
        >
          Create an Account
        </Button>
      </Nav>
    </React.Fragment>
  );

  const privateLinks = (
    <React.Fragment>
      <Nav className='mr-auto'>
        <Form inline>
          <InputGroup>
            <InputGroup.Text>
              <i className='fas fa-search fa-fw' />
            </InputGroup.Text>
            <FormControl placeholder='Search...' className='input-search' />
          </InputGroup>
        </Form>
      </Nav>
      <Nav>
        <Button
          className={currentPage === 'Create Post' && 'active'}
          href='/create-post'
        >
          <i class='fa fa-plus fa-fw' /> Write a Post
        </Button>
        <Nav.Link
          className={currentPage === 'Notifs' ? 'active ml-3' : 'ml-3'}
          href='/notifications'
        >
          <i className='fas fa-bell fa-fw nav-link-icon' />
        </Nav.Link>
        <Nav.Link
          className={currentPage === 'Saved Posts' && 'active'}
          href='/bookmarks'
        >
          <i className='fas fa-bookmark fa-fw nav-link-icon' />
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
                <p className='nav-name-content'>
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
    </React.Fragment>
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
          <Navbar.Brand
            href={isAuthenticated ? '/dashboard' : '/'}
            className='nav-logo'
          >
            <i className='fa fa-code fa-fw' /> DEVLY
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
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
