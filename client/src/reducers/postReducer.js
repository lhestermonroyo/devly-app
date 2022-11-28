import {
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  POSTS_SUCCESS,
  POSTS_FAIL,
  UPDATE_LIKE_SUCCESS,
  COMMENT_SUCCESS,
  POSTS_UPDATE_LIKE_SUCCESS,
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
    case POSTS_UPDATE_LIKE_SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.postId
            ? { ...post, likes: payload.postLikes }
            : post
        ),
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
