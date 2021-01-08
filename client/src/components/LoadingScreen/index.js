import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingScreen = (props) => {
  const { loadingMsg } = props;
  return (
    <div className='loading-screen'>
      <p className='text-center'>
        <Spinner animation='grow' size='sm' variant='dark' />
      </p>
      <p className='text-center' style={{ marginBottom: -4 }}>
        {loadingMsg}
      </p>
    </div>
  );
};

export default LoadingScreen;
