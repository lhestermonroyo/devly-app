require('dotenv').config();
const { JWT_SECRET } = process.env;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../user/usersModel');
const HttpSuccess = require('../../responses/HttpSuccess');
const HttpError = require('../../responses/HttpError');
const ValidationError = require('../../responses/ValidationError');

/**
 * Controller for request to get authenticated user
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next function to execute
 */
async function getAuthUser(req, res, next) {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(new HttpSuccess(200, 'User has been retrieved.', {
      userData: user,
    }));
  } catch(err) {
    console.error(err);
    res.status(500).json(new HttpError(new Date, 500, 9999, `Error: ${err}`));
  }
}

/**
 * Controller for request to authenticate user and get token
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next function to execute
 */
async function loginAuth(req, res, next) {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json(new ValidationError(400, errors.array()));
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    
    if(!user) {
      return res.status(400).json(new ValidationError(400, { errors: [{ msg: 'Invalid credentials.' }] }));
    }

    const payload = {
      user: {
        id: user.id,
      }
    };

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
      return res.status(400).json(new ValidationError(400, { errors: [{ msg: 'Invalid credentials.' }] }));
    }

    jwt.sign(
      payload, 
      JWT_SECRET, 
      { expiresIn: 360000 },
      (err, token) => {
        if(err) {
          res.status(500).json(new HttpError(new Date(), 500, 9999, `Error: ${err}`));
        }

        res.status(200).json(new HttpSuccess(200, 'User has been authenticated.', {
          userToken: token,
        }));
      }
    )
  } catch(err) {
    console.error(err);
    res.status(500).json(new HttpError(new Date(), 500, 9999, 'Server error.'));
  }
}

module.exports = {
  getAuthUser,
  loginAuth,
};