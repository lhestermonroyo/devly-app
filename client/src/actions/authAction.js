import {
  AUTH_BEGIN,
  AUTH_END,
  AUTH_FORM_BEGIN,
  AUTH_FORM_END,
  AUTH_SUCCESS,
  AUTH_FAIL,
  USER_LOADED,
} from '../constants/authConstants';
import { alertSet } from './uiStateAction';
import axios from 'axios';
import setAuthToken from '../util/setAuthToken';

export const authBegin = () => ({
  type: AUTH_BEGIN,
});

export const authEnd = () => ({
  type: AUTH_END,
});

export const authFormBegin = () => ({
  type: AUTH_FORM_BEGIN,
});

export const authFormEnd = () => ({
  type: AUTH_FORM_END,
});

export const authSuccess = (res) => ({
  type: AUTH_SUCCESS,
  payload: res,
});

export const authFail = () => ({
  type: AUTH_FAIL,
});

export const userLoaded = (res) => ({
  type: USER_LOADED,
  payload: res,
});

export const signUpUser = (userData) => async (dispatch) => {
  dispatch(authFormBegin());

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/user', userData, config);

    dispatch(authSuccess(res.data));
    dispatch(
      alertSet({
        alertType: 'success',
        alertMsg: 'You have created an account successfully.',
      })
    );
    dispatch(authFormEnd());
  } catch (err) {
    console.log('Error', err);
    dispatch(authFail());
    dispatch(
      alertSet({
        alertType: 'danger',
        alertMsg: 'An error occured while signing up.',
      })
    );
    dispatch(authFormEnd());
  }
};

export const signInUser = (userData) => async (dispatch) => {
  dispatch(authFormBegin());

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/auth', userData, config);

    dispatch(authSuccess(res.data));
    dispatch(loadUser());
    dispatch(authFormEnd());
  } catch (err) {
    console.log('Error', err.errors);
    dispatch(authFail());
    dispatch(
      alertSet({
        alertType: 'danger',
        alertMsg: 'Username and password incorrect.',
      })
    );
    dispatch(authFormEnd());
  }
};

export const signOutUser = (history) => (dispatch) => {
  history.push('/');
  dispatch(authFail());
};

export const loadUser = () => async (dispatch) => {
  dispatch(authBegin());

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch(userLoaded(res.data));
    dispatch(authEnd());
  } catch (err) {
    dispatch(authFail());
    dispatch(authEnd());
  }
};
