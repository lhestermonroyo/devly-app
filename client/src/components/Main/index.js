import React from 'react';
import { Container } from 'react-bootstrap';

const Main = (props) => {
  const { children } = props;
  return <Container className='container-mt mb-5'>{children}</Container>;
};

export default Main;
