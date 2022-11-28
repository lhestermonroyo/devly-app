import React, { useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import Main from '../../components/Main';
import useForm from '../../customHooks/useForm';
import FormField from '../../components/FormField';
import FormButton from '../../components/FormButton';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { loadingFormEnd, loadingFormStart } from '../../actions/uiStateAction';
import { signUpUser } from '../../actions/authAction';
import { getCurrentPage } from '../../actions/uiStateAction';
import Copyright from '../../components/Copyright';
import setNotification from '../../util/setNotification';

const SignUp = props => {
  const { history } = props;

  const [values, handleChange] = useForm({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { firstname, lastname, email, password, confirmPassword } = values;

  const { isAuthenticated } = useSelector(state => state.auth);
  const { loadingForm } = useSelector(state => state.uiState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentPage('Sign Up'));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setNotification('error', 'Passwords do not match.');
    } else {
      const userData = { firstname, lastname, email, password };
      dispatch(loadingFormStart());
      await dispatch(signUpUser(userData));
      dispatch(loadingFormEnd());
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
          <h1 className="display-4 text-center mb-4">Create an Account</h1>
          <Form className="mb-4" onSubmit={e => handleSubmit(e)}>
            <FormField
              label="Firstname"
              type="text"
              placeholder="Enter firstname"
              name="firstname"
              value={firstname}
              handleChange={handleChange}
              required={true}
            />
            <FormField
              label="Lastname"
              type="text"
              placeholder="Enter lastname"
              name="lastname"
              value={lastname}
              handleChange={handleChange}
              required={true}
            />
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
            <FormField
              label="Confirm Password"
              type="password"
              placeholder="Enter confirm password"
              name="confirmPassword"
              value={confirmPassword}
              handleChange={handleChange}
              required={true}
            />
            <Form.Group className="mt-4 mb-4">
              <FormButton loading={loadingForm} type="submit" block={true}>
                Sign Up
              </FormButton>
            </Form.Group>
          </Form>
          <hr />
          <p className="text-center">Already have an account?</p>
          <FormButton href="/sign-in" align="center" variant="link">
            Sign In
          </FormButton>
          <Copyright className="mt-5 text-center" />
        </Col>
        <Col sm={0} md={3} />
      </Row>
    </Main>
  );
};

export default SignUp;
