import React from 'react';
import {
  Navbar,
  Nav,
  Dropdown,
  Container,
  Button,
  Image,
  Form,
  InputGroup,
  FormControl,
  DropdownButton,
} from 'react-bootstrap';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../../actions/authAction';

const Header = props => {
  const { history } = props;

  const dispatch = useDispatch();

  const { isAuthenticated, userDetails, loading } = useSelector(
    state => state.auth
  );
  const { currentPage } = useSelector(state => state.uiState);

  const handleLogOut = () => {
    dispatch(signOutUser(history));
  };

  const publicLinks = (
    <React.Fragment>
      <Nav className="mr-auto" />
      <Nav>
        <Nav.Link
          className={currentPage === 'Sign In' ? 'active mr-3' : 'mr-3'}
          href="/sign-in"
        >
          Sign In
        </Nav.Link>
        <Button
          href="/sign-up"
          className={currentPage === 'Sign Up' && 'active'}
          variant="outline-primary"
        >
          Create an Account
        </Button>
      </Nav>
    </React.Fragment>
  );

  const privateLinks = (
    <React.Fragment>
      <Nav className="mr-auto">
        <Form inline>
          <InputGroup>
            <InputGroup.Text>
              <i className="fas fa-search fa-fw" />
            </InputGroup.Text>
            <FormControl placeholder="Search..." className="input-search" />
          </InputGroup>
        </Form>
      </Nav>
      <Nav>
        <Nav.Link
          className={currentPage === 'Dashboard' && 'text-primary active'}
          href="/dashboard"
        >
          <i className="fas fa-home fa-fw nav-link-icon" />
        </Nav.Link>
        <Nav.Link
          className={currentPage === 'Notifs' && 'active'}
          href="/notifications"
        >
          <i className="fas fa-bell fa-fw nav-link-icon" />
        </Nav.Link>
        <Nav.Link
          className={currentPage === 'Messages' && 'active'}
          href="/messages"
        >
          <i className="fas fa-envelope fa-fw nav-link-icon" />
        </Nav.Link>
        <DropdownButton
          align="end"
          className="nav-dropdown"
          variant="default"
          title={
            <Image
              className="nav-avatar"
              src={userDetails && userDetails.avatar}
              roundedCircle
              thumbnail
            />
          }
        >
          <Dropdown.Item href="/profile">
            {userDetails && (
              <React.Fragment>
                <p className="nav-name-content">
                  <strong>
                    {userDetails.firstname} {userDetails.lastname}
                  </strong>
                </p>
                <span className="text-muted">{userDetails.email}</span>
              </React.Fragment>
            )}
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="/account-settings">
            Account Settings
          </Dropdown.Item>
          <Dropdown.Item href="/help">Help</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => handleLogOut()}>Log Out</Dropdown.Item>
        </DropdownButton>
      </Nav>
    </React.Fragment>
  );

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        fixed="top"
      >
        <Container>
          <Navbar.Brand
            href={isAuthenticated ? '/dashboard' : '/'}
            className="nav-logo"
          >
            <i className="fa fa-code fa-fw" /> DEVLY
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
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
