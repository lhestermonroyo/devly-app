import { Modal } from 'antd';

const setConfirmDelete = (content, handleDelete) => {
  Modal.confirm({
    content,
    okText: 'Yes',
    cancelText: 'Cancel',
    onOk: handleDelete,
  });
};

export default setConfirmDelete;
