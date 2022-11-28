import {
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  POSTS_SUCCESS,
  POSTS_FAIL,
  UPDATE_LIKE_SUCCESS,
  COMMENT_SUCCESS,
  POSTS_UPDATE_LIKE_SUCCESS,
} from '../constants/postConstants';
import api from '../util/apiRequest';
import setNotification from '../util/setNotification';

export const postDetailsSuccess = res => ({
  type: POST_DETAILS_SUCCESS,
  payload: res,
});

export const postsSuccess = res => ({
  type: POSTS_SUCCESS,
  payload: res,
});

export const postDetailsFail = () => ({
  type: POST_DETAILS_FAIL,
});

export const postsFail = () => ({
  type: POSTS_FAIL,
});

export const postsUpdateLikeSuccess = res => ({
  type: POSTS_UPDATE_LIKE_SUCCESS,
  payload: res,
});

export const updateLikeSuccess = res => ({
  type: UPDATE_LIKE_SUCCESS,
  payload: res,
});

export const commentSuccess = res => ({
  type: COMMENT_SUCCESS,
  payload: res,
});

export const savePost = (postData, history) => async () => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const res = await api.post('/api/post', postData, config);
    setNotification('success', res.data.message);
    history.push('/dashboard');
  } catch (err) {
    console.log(err);
    setNotification('error', 'Failed to create post, please try again.');
  }
};

export const updatePost = (postId, postData, history) => async () => {
  try {
    const res = await api.put(`/api/post/${postId}`, postData);
    setNotification('success', res.data.message);
    history.push(`/post/${postId}`);
  } catch (err) {
    setNotification('error', 'Failed to update post, please try again.');
  }
};

export const deletePost = (postId, history) => async dispatch => {
  try {
    const res = await api.delete(`/api/post/${postId}`);

    setNotification('success', res.data.message.msg);

    if (history) {
      history.push('/dashboard');
    } else {
      await dispatch(getAllPosts());
    }
  } catch (err) {
    setNotification('error', 'Failed to delete post, please try again.');
  }
};

export const getAllPosts = () => async dispatch => {
  try {
    const res = await api.get('/api/post');

    dispatch(postsSuccess(res.data));
  } catch (err) {
    dispatch(postsFail());
    setNotification('error', 'An error occured while fetching data.');
  }
};

export const getPostDetails = postId => async dispatch => {
  try {
    const res = await api.get(`/api/post/${postId}`);

    dispatch(postDetailsSuccess(res.data));
  } catch (err) {
    dispatch(postDetailsFail());
    setNotification('error', 'An error occured while fetching data.');
  }
};

export const likePost = (postId, type) => async dispatch => {
  try {
    const res = await api.put(`/api/post/like/${postId}`);

    if (type === 'POSTS') {
      dispatch(postsUpdateLikeSuccess({ ...res.data, postId }));
    } else {
      dispatch(updateLikeSuccess(res.data));
    }
  } catch (err) {
    dispatch(postDetailsFail());
    setNotification('error', 'An error occured while liking post.');
  }
};

export const unlikePost = (postId, type) => async dispatch => {
  try {
    const res = await api.put(`/api/post/unlike/${postId}`);

    if (type === 'POSTS') {
      dispatch(postsUpdateLikeSuccess({ ...res.data, postId }));
    } else {
      dispatch(updateLikeSuccess(res.data));
    }
  } catch (err) {
    dispatch(postDetailsFail());
    setNotification('error', 'An error occured while unliking post.');
  }
};

export const addComment = (postId, text) => async dispatch => {
  try {
    const res = await api.put(`/api/post/comment/${postId}`, text);

    dispatch(commentSuccess(res.data));
  } catch (err) {
    dispatch(postDetailsFail());
    setNotification('error', 'An error occured while saving the comment.');
  }
};

export const updateComment = (postId, commentId, text) => async dispatch => {
  try {
    const res = await api.put(`/api/post/comment/${postId}/${commentId}`, text);

    dispatch(commentSuccess(res.data));
  } catch (err) {
    dispatch(postDetailsFail());
    setNotification('error', 'An error occured while updating the comment.');
  }
};

export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    const res = await api.delete(`/api/post/comment/${postId}/${commentId}`);

    dispatch(commentSuccess(res.data));
    setNotification('success', res.data.message);
  } catch (err) {
    dispatch(postDetailsFail());
    setNotification('error', 'An error occured while deleting the comment.');
  }
};
