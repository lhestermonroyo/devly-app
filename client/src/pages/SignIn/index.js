import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Main from '../../components/Main';
import useForm from '../../customHooks/useForm';

const SignIn = () => {
  const [values, handleChange] = useForm({
    email: '',
    password: '',
  });

  const { email, password } = values;

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(values);
  };

  return (
    <Main>
      <Row>
        <Col xs={6} md={3} />
        <Col xs={6} md={6}>
          <h1 className='text-center'>Sign In</h1>
          <Form className='mt-5 mb-4' onSubmit={(e) => handleSubmit(e)}>
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
            <Form.Group controlId='formBasicCheckbox'>
              <Form.Check type='checkbox' label='Check me out' />
            </Form.Group>
            <Button variant='primary' type='submit' className='btn-block'>
              Sign In
            </Button>
          </Form>
          <hr />
          <Button
            href='/sign-up'
            variant='outline-primary'
            type='submit'
            className='btn-block mt-4'
          >
            Create an Account
          </Button>
        </Col>
        <Col xs={6} md={3} />
      </Row>
    </Main>
  );
};

export default SignIn;
