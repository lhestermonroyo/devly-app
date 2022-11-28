import {
  PROFILE_DETAILS_SUCCESS,
  PROFILES_SUCCESS,
  REPOS_SUCCESS,
  PROFILE_DETAILS_FAIL,
  PROFILES_FAIL,
  REPOS_FAIL,
} from '../constants/profileConstants';
import api from '../util/apiRequest';
import setNotification from '../util/setNotification';

export const profileDetailsSuccess = res => ({
  type: PROFILE_DETAILS_SUCCESS,
  payload: res,
});

export const profilesSuccess = res => ({
  type: PROFILES_SUCCESS,
  payload: res,
});

export const reposSuccess = res => ({
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

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await api.get('/api/profile/me');

    dispatch(profileDetailsSuccess(res.data));
  } catch (err) {
    dispatch(profileDetailsFail());
  }
};

export const getProfileByUserId = userId => async dispatch => {
  try {
    const res = await api.get(`/api/profile/${userId}`);

    dispatch(profileDetailsSuccess(res.data));
  } catch (err) {
    dispatch(profileDetailsFail());
    setNotification('error', 'An error occured while fetching data.');
  }
};

export const updateProfile = profileData => async dispatch => {
  try {
    const res = await api.post('/api/profile', profileData);

    dispatch(profileDetailsSuccess(res.data));
    setNotification('success', 'Profile details has been updated.');
  } catch (err) {
    console.log(err);
    dispatch(profileDetailsFail());
    setNotification('error', 'Failed to update profile, please try again.');
  }
};

export const addExperience = experienceData => async dispatch => {
  try {
    const res = await api.put('/api/profile/experience', experienceData);

    setNotification('success', res.data.message.msg);
  } catch (err) {
    dispatch(profileDetailsFail());
    setNotification('error', 'Failed to update experience, please try again.');
  }
};

export const addEducation = educationData => async dispatch => {
  try {
    const res = await api.put('/api/profile/education', educationData);

    setNotification('success', res.data.message.msg);
  } catch (err) {
    dispatch(profileDetailsFail());
    setNotification('error', 'Failed to update experience, please try again.');
  }
};
