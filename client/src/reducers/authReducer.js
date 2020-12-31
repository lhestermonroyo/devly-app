import {
  SIGNUP_BEGIN,
  SIGNUP_END,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
} from '../constants/authConstants';

const initialState = {
  loading: false,
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SIGNUP_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case SIGNUP_END:
      return {
        ...state,
        loading: false,
      };
    case SIGNUP_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
      };
    case SIGNUP_FAILED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };
    default:
      return {
        ...state,
      };
  }
}
