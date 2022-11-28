import React, { useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Main from '../../components/Main';
import useForm from '../../customHooks/useForm';
import FormField from '../../components/FormField';
import FormButton from '../../components/FormButton';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '../../actions/authAction';
import {
  getCurrentPage,
  loadingFormEnd,
  loadingFormStart,
} from '../../actions/uiStateAction';
import Copyright from '../../components/Copyright';

const SignIn = props => {
  const { history } = props;

  const [values, handleChange] = useForm({
    email: '',
    password: '',
  });

  const { email, password } = values;

  const { isAuthenticated } = useSelector(state => state.auth);
  const { loadingForm } = useSelector(state => state.uiState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentPage('Sign In'));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    dispatch(loadingFormStart());
    await dispatch(signInUser(values));
    dispatch(loadingFormEnd());
  };

  if (isAuthenticated) {
    history.push('/dashboard');
  }

  return (
    <Main>
      <Row>
        <Col xs={6} md={3} />
        <Col xs={6} md={6}>
          <h1 className="display-4 text-center mb-4">Sign In</h1>
          <Form className="mb-4" onSubmit={e => handleSubmit(e)}>
            <FormField
              label="Email"
              type="email"
              placeholder="Enter email"
              name="email"
              value={email}
              handleChange={handleChange}
              required={true}
            />
            <FormField
              label="Password"
              type="password"
              placeholder="Enter password"
              name="password"
              value={password}
              handleChange={handleChange}
              required={true}
            />
            <Form.Group className="mt-4 mb-4">
              <FormButton
                loading={loadingForm}
                type="submit"
                size="lg"
                block={true}
              >
                Sign In
              </FormButton>
            </Form.Group>
          </Form>
          <hr />
          <p className="text-center">Don't have an account yet?</p>
          <FormButton href="/sign-up" align="center" variant="link" size="lg">
            Sign Up
          </FormButton>
          <Copyright className="mt-5 text-center" />
        </Col>
        <Col xs={6} md={3} />
      </Row>
    </Main>
  );
};

export default SignIn;
