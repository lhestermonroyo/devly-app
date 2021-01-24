import axios from 'axios';
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
import { alertSet } from './uiStateAction';

export const postBegin = () => ({
  type: POST_BEGIN,
});

export const postEnd = () => ({
  type: POST_END,
});

export const commentBegin = () => ({
  type: COMMENT_BEGIN,
});

export const postDetailsSuccess = (res) => ({
  type: POST_DETAILS_SUCCESS,
  payload: res,
});

export const postsSuccess = (res) => ({
  type: POSTS_SUCCESS,
  payload: res,
});

export const postDetailsFail = () => ({
  type: POST_DETAILS_FAIL,
});

export const postsFail = () => ({
  type: POSTS_FAIL,
});

export const updateLikeSuccess = (res) => ({
  type: UPDATE_LIKE_SUCCESS,
  payload: res,
});

export const commentSuccess = (res) => ({
  type: COMMENT_SUCCESS,
  payload: res,
});

export const savePost = (postData, history) => async (dispatch) => {
  dispatch(postBegin());

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/post', postData, config);
    dispatch(
      alertSet({
        alertType: 'success',
        alertMsg: res.data.message.msg,
      })
    );

    history.push('/dashboard');
  } catch (err) {
    console.log(err);
    dispatch(postEnd());
    dispatch(
      alertSet({
        alertType: 'danger',
        alertMsg: 'Failed to create post, please try again.',
      })
    );
  }
};

export const updatePost = (postId, postData, history) => async (dispatch) => {
  dispatch(postBegin());

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.put(`/api/post/${postId}`, postData, config);
    dispatch(
      alertSet({
        alertType: 'success',
        alertMsg: res.data.message.msg,
      })
    );

    history.push(`/post/${postId}`);
  } catch (err) {
    dispatch(postEnd());
    dispatch(
      alertSet({
        alertType: 'danger',
        alertMsg: 'Failed to update post, please try again.',
      })
    );
  }
};

export const deletePost = (postId, history) => async (dispatch) => {
  dispatch(postBegin());

  try {
    await axios.delete(`/api/post/${postId}`);
    history.push('/dashboard');
  } catch (err) {
    dispatch(postEnd());
    dispatch(
      alertSet({
        alertType: 'danger',
        alertMsg: 'Failed to delete post, please try again.',
      })
    );
  }
};

export const getAllPosts = () => async (dispatch) => {
  dispatch(postBegin());

  try {
    const res = await axios.get('/api/post');

    dispatch(postsSuccess(res.data));
  } catch (err) {
    dispatch(postsFail());
    dispatch(
      alertSet({
        alertType: 'danger',
        alertMsg: 'An error occured while fetching data.',
      })
    );
  }
};

export const getPostDetails = (postId) => async (dispatch) => {
  dispatch(postBegin());

  try {
    const res = await axios.get(`/api/post/${postId}`);

    dispatch(postDetailsSuccess(res.data));
  } catch (err) {
    dispatch(postDetailsFail());
    dispatch(
      alertSet({
        alertType: 'danger',
        alertMsg: 'An error occured while fetching data.',
      })
    );
  }
};

export const likePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/like/${postId}`);

    dispatch(updateLikeSuccess(res.data));
  } catch (err) {
    dispatch(postDetailsFail());
    dispatch(
      alertSet({
        alertType: 'danger',
        alertMsg: 'An error occured while liking post.',
      })
    );
  }
};

export const unlikePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/unlike/${postId}`);

    dispatch(updateLikeSuccess(res.data));
  } catch (err) {
    dispatch(postDetailsFail());
    dispatch(
      alertSet({
        alertType: 'danger',
        alertMsg: 'An error occured while unliking post.',
      })
    );
  }
};

export const addComment = (postId, text) => async (dispatch) => {
  dispatch(commentBegin());

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.put(`/api/post/comment/${postId}`, text, config);

    dispatch(commentSuccess(res.data));
  } catch (err) {
    dispatch(postDetailsFail());
    dispatch(
      alertSet({
        alertType: 'danger',
        alertMsg: 'An error occured while saving the comment.',
      })
    );
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  dispatch(commentBegin());

  try {
    const res = await axios.delete(`/api/post/comment/${postId}/${commentId}`);

    dispatch(commentSuccess(res.data));
  } catch (err) {
    dispatch(postDetailsFail());
    dispatch(
      alertSet({
        alertType: 'danger',
        alertMsg: 'An error occured while deleting the comment.',
      })
    );
  }
};
