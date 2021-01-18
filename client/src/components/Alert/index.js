import React from 'react';
import { Alert } from 'react-bootstrap';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { alertHide } from '../../actions/uiStateAction';

const AlertDismissable = () => {
  const { alertType, alertMsg, alertShow } = useSelector(
    (state) => state.uiState
  );
  const dispatch = useDispatch();

  return (
    alertShow && (
      <Alert
        variant={alertType}
        onClose={() => dispatch(alertHide())}
        dismissible
      >
        {alertMsg}
      </Alert>
    )
  );
};

export default AlertDismissable;
