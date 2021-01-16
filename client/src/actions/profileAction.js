import axios from 'axios';
import {
  PROFILE_BEGIN,
  PROFILE_END,
  PROFILE_DETAILS_SUCCESS,
  PROFILES_SUCCESS,
  REPOS_SUCCESS,
  PROFILE_DETAILS_FAIL,
  PROFILES_FAIL,
  REPOS_FAIL,
} from '../constants/profileConstants';
import { alertSet } from './alertAction';

export const profileBegin = () => ({
  type: PROFILE_BEGIN,
});

export const profileEnd = () => ({
  type: PROFILE_END,
});

export const profileDetailsSuccess = (res) => ({
  type: PROFILE_DETAILS_SUCCESS,
  payload: res,
});

export const profilesSuccess = (res) => ({
  type: PROFILES_SUCCESS,
  payload: res,
});

export const reposSuccess = (res) => ({
  type: REPOS_SUCCESS,
  payload: res,
});

export const profileDetailsFail = () => ({
  type: PROFILE_DETAILS_FAIL,
});

export const profilesFail = () => ({
  type: PROFILES_FAIL,
});

export const reposFail = () => ({
  type: REPOS_FAIL,
});

export const getCurrentProfile = () => async (dispatch) => {
  dispatch(profileBegin());

  try {
    const res = await axios.get('/api/profile/me');

    dispatch(profileDetailsSuccess(res.data));
  } catch (err) {
    dispatch(profileDetailsFail());
    dispatch(
      alertSet({
        alertType: 'danger',
        alertMsg: 'An error occured while fetching data.',
      })
    );
  }
};

export const updateProfile = (profileData) => async (dispatch) => {
  dispatch(profileBegin());

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/profile', profileData, config);

    dispatch(profileDetailsSuccess(res.data));
    dispatch(
      alertSet({
        alertType: 'success',
        alertMsg: 'Profile details has been updated.',
      })
    );
  } catch (err) {
    console.log(err);
    dispatch(profileDetailsFail());
    dispatch(
      alertSet({
        alertType: 'danger',
        alertMsg: 'Failed to update profile, please try again.',
      })
    );
  }
};

export const addExperience = (experienceData) => async (dispatch) => {
  dispatch(profileBegin());

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.put(
      '/api/profile/experience',
      experienceData,
      config
    );

    dispatch(profileEnd());
    dispatch(
      alertSet({
        alertType: 'success',
        alertMsg: res.data.message.msg,
      })
    );
  } catch (err) {
    dispatch(profileDetailsFail());
    dispatch(
      alertSet({
        alertType: 'danger',
        alertMsg: 'Failed to update experience, please try again.',
      })
    );
  }
};

export const addEducation = (educationData) => async (dispatch) => {
  dispatch(profileBegin());

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.put(
      '/api/profile/education',
      educationData,
      config
    );

    dispatch(profileEnd());
    dispatch(
      alertSet({
        alertType: 'success',
        alertMsg: res.data.message.msg,
      })
    );
  } catch (err) {
    dispatch(profileDetailsFail());
    dispatch(
      alertSet({
        alertType: 'danger',
        alertMsg: 'Failed to update experience, please try again.',
      })
    );
  }
};
