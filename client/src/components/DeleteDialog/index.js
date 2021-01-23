import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteDialog = (props) => {
  const { show, setShow, deleteMsg } = props;
  return (
    <Modal show={show} onHide={() => setShow(!show)}>
      <Modal.Body>
        <p>{deleteMsg}</p>
        <Button className='mr-2'>Yes</Button>
        <Button variant='light' onClick={() => setShow(!show)}>
          Cancel
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteDialog;
