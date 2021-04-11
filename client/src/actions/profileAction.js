import axios from 'axios';
import {
  PROFILE_BEGIN,
  PROFILE_END,
  PROFILE_FORM_BEGIN,
  PROFILE_FORM_END,
  PROFILE_DETAILS_SUCCESS,
  PROFILES_SUCCESS,
  REPOS_SUCCESS,
  PROFILE_DETAILS_FAIL,
  PROFILES_FAIL,
  REPOS_FAIL,
} from '../constants/profileConstants';
import { alertSet } from './uiStateAction';

export const profileBegin = () => ({
  type: PROFILE_BEGIN,
});

export const profileEnd = () => ({
  type: PROFILE_END,
});

export const profileFormBegin = () => ({
  type: PROFILE_FORM_BEGIN,
});

export const profileFormEnd = () => ({
  type: PROFILE_FORM_END,
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
    dispatch(profileEnd());
  } catch (err) {
    dispatch(profileDetailsFail());
    dispatch(profileEnd());
  }
};

export const getProfileByUserId = (userId) => async (dispatch) => {
  dispatch(profileBegin());

  try {
    const res = await axios.get(`/api/profile/${userId}`);

    dispatch(profileDetailsSuccess(res.data));
    dispatch(profileEnd());
  } catch (err) {
    dispatch(profileDetailsFail());
    dispatch(
      alertSet({
        alertType: 'danger',
        alertMsg: 'An error occured while fetching data.',
      })
    );
    dispatch(profileEnd());
  }
};

export const updateProfile = (profileData) => async (dispatch) => {
  dispatch(profileFormBegin());

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
    dispatch(profileFormEnd());
  } catch (err) {
    console.log(err);
    dispatch(profileDetailsFail());
    dispatch(
      alertSet({
        alertType: 'danger',
        alertMsg: 'Failed to update profile, please try again.',
      })
    );
    dispatch(profileFormEnd());
  }
};

export const addExperience = (experienceData) => async (dispatch) => {
  dispatch(profileFormBegin());

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

    dispatch(
      alertSet({
        alertType: 'success',
        alertMsg: res.data.message.msg,
      })
    );
    dispatch(profileFormEnd());
  } catch (err) {
    dispatch(profileDetailsFail());
    dispatch(
      alertSet({
        alertType: 'danger',
        alertMsg: 'Failed to update experience, please try again.',
      })
    );
    dispatch(profileFormEnd());
  }
};

export const addEducation = (educationData) => async (dispatch) => {
  dispatch(profileFormBegin());

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

    dispatch(
      alertSet({
        alertType: 'success',
        alertMsg: res.data.message.msg,
      })
    );
    dispatch(profileFormEnd());
  } catch (err) {
    dispatch(profileDetailsFail());
    dispatch(
      alertSet({
        alertType: 'danger',
        alertMsg: 'Failed to update experience, please try again.',
      })
    );
    dispatch(profileFormEnd());
  }
};
