import {
  POST_BEGIN,
  POST_END,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  POSTS_SUCCESS,
  POSTS_FAIL,
  UPDATE_LIKE_SUCCESS,
} from '../constants/postConstants';

const initialState = {
  loading: false,
  postDetails: null,
  posts: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case POST_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case POST_END:
      return {
        ...state,
        loading: false,
      };
    case POST_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        postDetails: payload.postDetails,
      };
    case POST_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        postDetails: null,
      };
    case POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: payload.posts,
      };
    case POSTS_FAIL:
      return {
        ...state,
        loading: false,
        posts: [],
      };
    case UPDATE_LIKE_SUCCESS:
      return {
        ...state,
        postDetails: { ...state.postDetails, likes: payload.postLikes },
      };
    default:
      return {
        ...state,
      };
  }
}
