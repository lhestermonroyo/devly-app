import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingComponent = (props) => {
  const { loadingMsg, loading } = props;

  if (loading) {
    return (
      <React.Fragment>
        <div className='mt-5 mb-5'>
          <p className='text-center'>
            <Spinner animation='grow' variant='primary' />
          </p>
          <p className='text-center lead'>{loadingMsg}</p>
        </div>
      </React.Fragment>
    );
  }

  return null;
};

export default LoadingComponent;
