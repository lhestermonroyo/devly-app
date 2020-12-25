require('dotenv').config();
const { JWT_SECRET } = process.env;

const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('./usersModel');

const HttpSuccess = require('../../responses/HttpSuccess');
const HttpError = require('../../responses/HttpError');
const ValidationError = require('../../responses/ValidationError');

/**
 * Controller for request to create user
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next function to execute
 */
async function createUser(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(new ValidationError(400, errors.array()));
  }

  const { firstname, lastname, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json(
          new ValidationError(400, {
            errors: [{ msg: 'User already exists.' }],
          })
        );
    }

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });

    user = new User({
      firstname,
      lastname,
      email,
      password,
      avatar,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) {
        res
          .status(500)
          .json(new HttpError(new Date(), 500, 9999, `Error: ${err}`));
      }

      res.status(200).json(
        new HttpSuccess(200, 'User has been created.', {
          userToken: token,
          userDetails: user,
        })
      );
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(new HttpError(new Date(), 500, 9999, 'Server error.'));
  }
}

/**
 * Controller for request to update user details
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next function to execute
 */
async function updateUserDetails(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(new ValidationError(400, errors.array()));
  }

  try {
    let user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(
      new HttpSuccess(200, 'User details has been updated.', {
        userDetails: user,
      })
    );
  } catch (err) {
    console.error(err);
    res.status(500).json(new HttpError(new Date(), 500, 9999, 'Server error.'));
  }
}

/**
 * Controller for request to update user password
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next function to execute
 */
async function updateUserPassword(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(new ValidationError(400, errors.array()));
  }

  const { password } = req.body;

  try {
    let user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return res
        .status(400)
        .json(
          new ValidationError(400, {
            errors: [{ msg: 'Password already used.' }],
          })
        );
    }

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);

    user.password = newPassword;

    await user.save();

    return res.status(200).json(
      new HttpSuccess(200, 'Password has been updated.', {
        userDetails: user,
      })
    );
  } catch (err) {
    console.error(err);
    res.status(500).json(new HttpError(new Date(), 500, 9999, 'Server error.'));
  }
}

/**
 * Controller for request to get user
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next function to execute
 */
async function getUser(req, res, next) {
  try {
    let users = await User.find();
    return res.status(200).json(
      new HttpSuccess(200, 'Profile has been created.', {
        users,
      })
    );
  } catch (err) {
    console.error(err);
    res.status(500).json(new HttpError(new Date(), 500, 9999, 'Server error.'));
  }
}

module.exports = {
  createUser,
  updateUserDetails,
  updateUserPassword,
  getUser,
};
