import axios from 'axios';
import {
  POST_BEGIN,
  POST_END,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  POSTS_SUCCESS,
  POSTS_FAIL,
} from '../constants/postConstants';
import { alertSet } from './uiStateAction';

export const postBegin = () => ({
  type: POST_BEGIN,
});

export const postEnd = () => ({
  type: POST_END,
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

export const savePost = (postData, history) => async (dispatch) => {
  dispatch(postBegin());

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/post', postData, config);
    history.push('/dashboard');

    dispatch(
      alertSet({
        alertType: 'success',
        alertMsg: res.data.message.msg,
      })
    );
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
