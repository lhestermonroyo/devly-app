import { notification } from 'antd';

const setNotification = (alertType, alertMsg) => {
  notification[alertType]({
    message: alertType === 'success' ? 'Success!' : 'Error!',
    description: alertMsg,
  });
};

export default setNotification;
