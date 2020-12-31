import { ALERT_SET, ALERT_HIDE } from '../constants/alertConstants';

export const alertSet = (alertData) => ({
  type: ALERT_SET,
  payload: alertData,
});

export const alertHide = () => ({
  type: ALERT_HIDE,
});
