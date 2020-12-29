import React from 'react';
import { Container } from 'react-bootstrap';

const Main = (props) => {
  const { children } = props;
  return <Container className='container-mt'>{children}</Container>;
};

export default Main;
