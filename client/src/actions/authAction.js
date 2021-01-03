import {
  AUTH_BEGIN,
  AUTH_END,
  AUTH_SUCCESS,
  AUTH_FAIL,
  USER_LOADED,
} from '../constants/authConstants';
import { alertSet } from './alertAction';
import axios from 'axios';
import setAuthToken from '../util/setAuthToken';

export const authBegin = () => ({
  type: AUTH_BEGIN,
});

export const authEnd = () => ({
  type: AUTH_END,
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
  dispatch(authBegin());

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/user', userData, config);

    dispatch(authEnd());
    dispatch(authSuccess(res.data));
    dispatch(
      alertSet({
        alertType: 'success',
        alertMsg: 'You have created an account successfully.',
      })
    );
  } catch (err) {
    console.log('Error', err);
    dispatch(authEnd());
    dispatch(authFail());
    dispatch(
      alertSet({
        alertType: 'danger',
        alertMsg: 'An error occured while signing up.',
      })
    );
  }
};

export const signInUser = (userCreds) => async (dispatch) => {
  dispatch(authBegin());

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/auth', userCreds, config);

    dispatch(authEnd());
    dispatch(authSuccess(res.data));
    dispatch(loadUser());
  } catch (err) {
    console.log('Error', err);
    dispatch(authEnd());
    dispatch(authFail());
    dispatch(
      alertSet({
        alertType: 'danger',
        alertMsg: 'Username and password incorrect.',
      })
    );
  }
};

export const signOutUser = () => (dispatch) => {
  dispatch(authFail());
};

export const loadUser = () => async (dispatch) => {
  dispatch(authBegin());

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch(authEnd());
    dispatch(userLoaded(res.data));
  } catch (err) {
    dispatch(authEnd());
    dispatch(authFail());
  }
};
