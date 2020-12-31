import { ALERT_SET, ALERT_HIDE } from '../constants/alertConstants';

const initialState = {
  alertType: null,
  alertMsg: '',
  alertShow: false,
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
    default:
      return {
        ...state,
      };
  }
}
