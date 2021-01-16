import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingScreen = (props) => {
  const { loadingMsg } = props;

  return (
    <div className='loading-screen'>
      <p className='text-center spinner'>
        <Spinner animation='grow' variant='primary' />
      </p>
      <p className='text-center lead' style={{ marginBottom: -4 }}>
        {loadingMsg}
      </p>
    </div>
  );
};

export default LoadingScreen;
