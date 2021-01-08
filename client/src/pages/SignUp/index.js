import React from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Main from '../../components/Main';
import useForm from '../../customHooks/useForm';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { alertSet } from '../../actions/alertAction';
import { signUpUser } from '../../actions/authAction';
import AlertDismissable from '../../components/Alert';
import Loading from '../../components/Loading';

const SignUp = (props) => {
  const { history } = props;

  const [values, handleChange] = useForm({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { firstname, lastname, email, password, confirmPassword } = values;

  const dispatch = useDispatch();

  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      dispatch(
        alertSet({
          alertType: 'danger',
          alertMsg: 'Passwords do not match.',
        })
      );
    } else {
      const userData = { firstname, lastname, email, password };
      dispatch(signUpUser(userData));
    }
  };

  if (isAuthenticated) {
    history.push('/dashboard');
  }

  return (
    <Main>
      <Row>
        <Col sm={0} md={3} />
        <Col sm={12} md={6}>
          <h1 className='text-center mb-5'>Create an Account</h1>
          <Loading
            loadingMsg={'Signing up, please wait...'}
            loading={loading}
          />
          <AlertDismissable />
          <Form className='mb-4' onSubmit={(e) => handleSubmit(e)}>
            <Form.Group>
              <Form.Label>Firstname</Form.Label>
              <Form.Control
                name='firstname'
                type='text'
                value={firstname}
                onChange={handleChange}
                required={true}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Lastname</Form.Label>
              <Form.Control
                name='lastname'
                type='text'
                value={lastname}
                onChange={handleChange}
                required={true}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name='email'
                type='email'
                value={email}
                onChange={handleChange}
                required={true}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                name='password'
                type='password'
                value={password}
                onChange={handleChange}
                required={true}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                name='confirmPassword'
                type='password'
                value={confirmPassword}
                onChange={handleChange}
                required={true}
              />
            </Form.Group>
            <Button variant='primary' type='submit' className='btn-block'>
              Sign Up
            </Button>
          </Form>
          <hr />
          <Button
            href='/sign-in'
            variant='outline-primary'
            type='submit'
            className='btn-block mt-4'
          >
            Sign In
          </Button>
        </Col>
        <Col sm={0} md={3} />
      </Row>
    </Main>
  );
};

export default SignUp;
