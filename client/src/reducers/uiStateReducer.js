import {
  ALERT_SET,
  ALERT_HIDE,
  GET_CURRENT_PAGE,
} from '../constants/uiStateConstants';

const initialState = {
  alertType: null,
  alertMsg: '',
  alertShow: false,
  currentPage: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ALERT_SET:
      return {
        ...state,
        alertType: payload.alertType,
        alertMsg: payload.alertMsg,
        alertShow: true,
      };
    case ALERT_HIDE:
      return {
        ...state,
        alertType: null,
        alertMsg: '',
        alertShow: false,
      };
    case GET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      };
    default:
      return {
        ...state,
      };
  }
}
