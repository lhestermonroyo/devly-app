import React from 'react';

const EmptyComponent = (props) => {
  const { emptyMsg } = props;

  return (
    <React.Fragment>
      <div className='mt-5 mb-5'>
        <h5 className='text-center lead'>{emptyMsg}</h5>
      </div>
    </React.Fragment>
  );
};

export default EmptyComponent;
