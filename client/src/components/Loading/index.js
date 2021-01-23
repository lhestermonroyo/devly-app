import React from 'react';
import { Card, Spinner } from 'react-bootstrap';

const Loading = (props) => {
  const { loadingMsg, loading } = props;

  return (
    loading && (
      <Card className='border-light loading-container mb-3'>
        <Card.Body>
          <p className='text-center'>
            <Spinner animation='grow' size='sm' variant='dark' />
          </p>
          <p className='text-center' style={{ marginBottom: -4 }}>
            {loadingMsg}
          </p>
        </Card.Body>
      </Card>
    )
  );
};

export default Loading;
