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

const initialState = {
  loading: false,
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
    case PROFILE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        profileDetails: payload.profileDetails,
      };
    case PROFILES_SUCCESS:
      return {
        ...state,
        loading: false,
        profiles: payload.profiles,
      };
    case REPOS_SUCCESS:
      return {
        ...state,
        loading: false,
        repos: payload.repos,
      };
    case PROFILE_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        profileDetails: null,
      };
    case PROFILES_FAIL:
      return {
        ...state,
        loading: false,
        profiles: null,
      };
    case REPOS_FAIL:
      return {
        ...state,
        loading: false,
        repos: [],
      };
    default:
      return {
        ...state,
      };
  }
}
