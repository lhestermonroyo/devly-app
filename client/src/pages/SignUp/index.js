import React, { useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Main from '../../components/Main';
import useForm from '../../customHooks/useForm';
import AlertDismissable from '../../components/Alert';
import LoadingForm from '../../components/LoadingForm';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { alertSet } from '../../actions/uiStateAction';
import { signUpUser } from '../../actions/authAction';
import { getCurrentPage } from '../../actions/uiStateAction';

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

  const { isAuthenticated, loadingForm } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentPage('Sign Up'));
  }, []);

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
            <Button
              size='lg'
              variant='primary'
              type='submit'
              className='btn-block'
              disabled={loadingForm}
            >
              <LoadingForm
                loadingForm={loadingForm}
                btnText='Sign Up'
                loadingText='Signing up, please wait...'
              />
            </Button>
          </Form>
          <hr />
          <p className='text-center'>Already have an account?</p>
          <Button
            size='lg'
            href='/sign-in'
            variant='outline-primary'
            type='submit'
            className='btn-block mt-3'
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
