import {
  POST_BEGIN,
  POST_END,
  COMMENT_BEGIN,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  POSTS_SUCCESS,
  POSTS_FAIL,
  UPDATE_LIKE_SUCCESS,
  COMMENT_SUCCESS,
} from '../constants/postConstants';

const initialState = {
  loading: false,
  commentLoading: false,
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
    case COMMENT_BEGIN:
      return {
        ...state,
        commentLoading: true,
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
    case COMMENT_SUCCESS:
      return {
        ...state,
        commentLoading: false,
        postDetails: { ...state.postDetails, comments: payload.postComments },
      };
    default:
      return {
        ...state,
      };
  }
}
