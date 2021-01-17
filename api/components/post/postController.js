const { validationResult } = require('express-validator');

const User = require('../user/usersModel');
const Post = require('../post/postModel');

const HttpSuccess = require('../../responses/HttpSuccess');
const HttpError = require('../../responses/HttpError');
const ValidationError = require('../../responses/ValidationError');

/**
 * Controller for request to add post
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next function to execute
 */
async function addPost(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(new ValidationError(400, errors.array()));
  }

  try {
    const newPost = {
      title: req.body.title,
      content: req.body.content,
      thumbnail: req.body.thumbnail,
      user: req.user.id,
    };

    const post = new Post(newPost);

    await post.save();

    const postDetails = await Post.findById(post._id).populate('user', [
      'firstname',
      'lastname',
      'avatar',
    ]);

    return res.status(200).json(
      new HttpSuccess(200, 'Post has been created.', {
        postDetails,
      })
    );
  } catch (err) {
    console.error(err);
    res.status(500).json(new HttpError(new Date(), 500, 9999, 'Server error.'));
  }
}

/**
 * Controller for request to update post
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next function to execute
 */
async function updatePost(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(new ValidationError(400, errors.array()));
  }

  const { id } = req.params;

  try {
    let post = await Post.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { $set: req.body },
      { new: true }
    );

    if (!post) {
      return res.status(401).json(
        new ValidationError(401, {
          errors: [{ msg: 'User not authorized.' }],
        })
      );
    }

    const postDetails = await Post.findById(id).populate('user', [
      'firstname',
      'lastname',
      'avatar',
    ]);

    return res.status(200).json(
      new HttpSuccess(200, 'Post has been updated.', {
        postDetails,
      })
    );
  } catch (err) {
    console.error(err);
    res.status(500).json(new HttpError(new Date(), 500, 9999, 'Server error.'));
  }
}

/**
 * Controller for request to get all posts
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next function to execute
 */
async function getAllPosts(req, res, next) {
  try {
    const posts = await Post.find()
      .sort({ date: -1 })
      .populate('user', ['firstname', 'lastname', 'avatar'])
      .populate('comments.user', ['firstname', 'lastname', 'avatar']);

    return res.status(200).json(
      new HttpSuccess(200, 'Posts has been retrieved.', {
        posts,
      })
    );
  } catch (err) {
    console.error(err);
    res.status(500).json(new HttpError(new Date(), 500, 9999, 'Server error.'));
  }
}

/**
 * Controller for request to get post by id
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next function to execute
 */
async function getPostById(req, res, next) {
  const { id } = req.params;
  try {
    const post = await Post.findById({ _id: id }).populate('user', [
      'firstname',
      'lastname',
      'avatar',
    ]);

    if (!post) {
      return res.status(404).json(
        new ValidationError(404, {
          errors: [{ msg: 'Post not found.' }],
        })
      );
    }

    return res.status(200).json(
      new HttpSuccess(200, 'Post details has been retrieved.', {
        postDetails: post,
      })
    );
  } catch (err) {
    console.error(err);
    res.status(500).json(new HttpError(new Date(), 500, 9999, 'Server error.'));
  }
}

/**
 * Controller for request to delete post
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next function to execute
 */
async function deletePost(req, res, next) {
  const { id } = req.params;
  try {
    const post = await Post.findById({ _id: id });

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json(
        new ValidationError(401, {
          errors: [{ msg: 'User not authorized.' }],
        })
      );
    }

    await post.remove();
    return res.status(200).json(
      new HttpSuccess(200, {
        msg: 'Post has been deleted.',
      })
    );
  } catch (err) {
    console.error(err);
    res.status(500).json(new HttpError(new Date(), 500, 9999, 'Server error.'));
  }
}

/**
 * Controller for request to like a post
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next function to execute
 */
async function likePost(req, res, next) {
  const { id } = req.params;
  try {
    const post = await Post.findById({ _id: id });

    // Check if user already liked the post
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json(
        new ValidationError(400, {
          errors: [{ msg: 'Post already liked.' }],
        })
      );
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();
    return res.status(200).json(
      new HttpSuccess(200, 'Post has been liked', {
        postLikes: post.likes,
      })
    );
  } catch (err) {
    console.error(err);
    res.status(500).json(new HttpError(new Date(), 500, 9999, 'Server error.'));
  }
}

/**
 * Controller for request to unlike a post
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next function to execute
 */
async function unlikePost(req, res, next) {
  const { id } = req.params;
  try {
    const post = await Post.findById({ _id: id });

    // Check if user already liked the post
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json(
        new ValidationError(400, {
          errors: [{ msg: 'Post has not yet been liked.' }],
        })
      );
    }

    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();
    return res.status(200).json(
      new HttpSuccess(200, 'Post has been unliked.', {
        postLikes: post.likes,
      })
    );
  } catch (err) {
    console.error(err);
    res.status(500).json(new HttpError(new Date(), 500, 9999, 'Server error.'));
  }
}

/**
 * Controller for request to add comment to a post
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next function to execute
 */
async function addComment(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(new ValidationError(400, errors.array()));
  }

  const { id } = req.params;

  try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(id);

    const newComment = {
      text: req.body.text,
      user: req.user.id,
    };

    post.comments.unshift(newComment);

    await post.save();
    return res.status(200).json(
      new HttpSuccess(200, 'Comment has been added.', {
        postComments: post.comments,
      })
    );
  } catch (err) {
    console.error(err);
    res.status(500).json(new HttpError(new Date(), 500, 9999, 'Server error.'));
  }
}

/**
 * Controller for request to delete comment on a post
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next function to execute
 */
async function deleteComment(req, res, next) {
  const { id, comment_id } = req.params;
  try {
    const post = await Post.findById(id);

    // Pull out comment
    const comment = post.comments.find((comment) => comment.id === comment_id);

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json(
        new ValidationError(404, {
          errors: [{ msg: 'Comment does not exist.' }],
        })
      );
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json(
        new ValidationError(401, {
          errors: [{ msg: 'User not authorized.' }],
        })
      );
    }

    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();
    return res.status(200).json(
      new HttpSuccess(200, 'Comment has been deleted.', {
        postComments: post.comments,
      })
    );
  } catch (err) {
    console.error(err);
    res.status(500).json(new HttpError(new Date(), 500, 9999, 'Server error.'));
  }
}

module.exports = {
  addPost,
  updatePost,
  getAllPosts,
  getPostById,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  deleteComment,
};
