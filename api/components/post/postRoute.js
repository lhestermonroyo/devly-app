const express = require('express');
const { check } = require('express-validator');

const {
  addPost,
  updatePost,
  getAllPosts,
  getPostById,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  updateComment,
  deleteComment,
} = require('./postController');
const auth = require('../../utils/authUtil');

const router = express.Router();

router.post('/', auth, addPost);

router.put('/:id', auth, updatePost);

router.get('/', auth, getAllPosts);

router.get('/:id', auth, getPostById);

router.delete('/:id', auth, deletePost);

router.put('/like/:id', auth, likePost);

router.put('/unlike/:id', auth, unlikePost);

router.put(
  '/comment/:id',
  [auth, check('text', 'Text is required.').not().isEmpty()],
  addComment
);

router.put(
  '/comment/:id/:comment_id',
  [auth, check('text', 'Text is required.').not().isEmpty()],
  updateComment
);

router.delete('/comment/:id/:comment_id', auth, deleteComment);

module.exports = router;
