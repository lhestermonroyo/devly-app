import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingForm = (props) => {
  const { loadingForm, btnText, loadingText } = props;

  if (loadingForm) {
    return (
      <React.Fragment>
        <Spinner animation='grow' variant='light' />
        <span className='ml-3'>{loadingText}</span>
      </React.Fragment>
    );
  }

  return <React.Fragment>{btnText}</React.Fragment>;
};

export default LoadingForm;
