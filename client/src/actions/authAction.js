import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  USER_LOADED,
} from '../constants/authConstants';
import api from '../util/apiRequest';
import setAuthToken from '../util/setAuthToken';
import setNotification from '../util/setNotification';

export const authSuccess = res => ({
  type: AUTH_SUCCESS,
  payload: res,
});

export const authFail = () => ({
  type: AUTH_FAIL,
});

export const userLoaded = res => ({
  type: USER_LOADED,
  payload: res,
});

export const signUpUser = userData => async dispatch => {
  try {
    const res = await api.post('/api/user', userData);
    dispatch(authSuccess(res.data));
    setNotification('success', 'Your account has been created.');
  } catch (err) {
    console.log('Error', err);
    dispatch(authFail());
    setNotification('error', 'An error occured while signing up.');
  }
};

export const signInUser = userData => async dispatch => {
  try {
    const res = await api.post('/api/auth', userData);
    dispatch(authSuccess(res.data));
    dispatch(loadUser());
  } catch (err) {
    console.log('Error', err.errors);
    dispatch(authFail());
    setNotification('error', 'Username or password is incorrect.');
  }
};

export const signOutUser = history => dispatch => {
  history.push('/');
  dispatch(authFail());
};

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await api.get('/api/auth');
    dispatch(userLoaded(res.data));
  } catch (err) {
    dispatch(authFail());
  }
};
