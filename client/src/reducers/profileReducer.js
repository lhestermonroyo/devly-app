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

const initialState = {
  loading: false,
  loadingForm: false,
  profileDetails: null,
  profiles: null,
  repos: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case PROFILE_END:
      return {
        ...state,
        loading: false,
      };
    case PROFILE_FORM_BEGIN:
      return {
        ...state,
        loadingForm: true,
      };
    case PROFILE_FORM_END:
      return {
        ...state,
        loadingForm: false,
      };
    case PROFILE_DETAILS_SUCCESS:
      return {
        ...state,
        profileDetails: payload.profileDetails,
      };
    case PROFILES_SUCCESS:
      return {
        ...state,
        profiles: payload.profiles,
      };
    case REPOS_SUCCESS:
      return {
        ...state,
        repos: payload.repos,
      };
    case REPOS_FAIL:
      return {
        ...state,
        repos: [],
      };
    case PROFILE_DETAILS_FAIL:
      return {
        ...state,
        profileDetails: null,
      };
    case PROFILES_FAIL:
      return {
        ...state,
        profiles: null,
      };
    default:
      return {
        ...state,
      };
  }
}
