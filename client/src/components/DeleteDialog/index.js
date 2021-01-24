import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteDialog = (props) => {
  const { showDelete, setShowDelete, deleteMsg, handleDelete } = props;
  return (
    <Modal show={showDelete} onHide={() => setShowDelete(!showDelete)}>
      <Modal.Body>
        <p>{deleteMsg}</p>
        <Button className='mr-2' onClick={() => handleDelete()}>
          Yes
        </Button>
        <Button variant='light' onClick={() => setShowDelete(!showDelete)}>
          Cancel
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteDialog;
