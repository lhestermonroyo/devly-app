import {
  ALERT_SET,
  ALERT_HIDE,
  GET_CURRENT_PAGE,
} from '../constants/uiStateConstants';

export const alertSet = (alertData) => ({
  type: ALERT_SET,
  payload: alertData,
});

export const alertHide = () => ({
  type: ALERT_HIDE,
});

export const getCurrentPage = (currentPage) => ({
  type: GET_CURRENT_PAGE,
  payload: currentPage,
});