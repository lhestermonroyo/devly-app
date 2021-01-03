import {
  AUTH_BEGIN,
  AUTH_END,
  AUTH_SUCCESS,
  AUTH_FAIL,
  USER_LOADED,
} from '../constants/authConstants';

const initialState = {
  loading: false,
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  userDetails: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case AUTH_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case AUTH_END:
      return {
        ...state,
        loading: false,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };
    case AUTH_SUCCESS:
      localStorage.setItem('token', payload.userToken);
      return {
        ...state,
        isAuthenticated: true,
        userDetails: payload.userDetails,
      };
    case AUTH_FAIL:
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
