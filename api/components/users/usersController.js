require('dotenv').config();
const { JWT_SECRET } = process.env;

const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const Users = require('./usersModel');
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
  const {
    firstname,
    lastname,
    email,
    password,
  } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json(new ValidationError(400, errors.array()));
  }

  try {
    let user = await Users.findOne({ email });

    if (user) {
      await res.status(400).json(new ValidationError(400, { errors: [{ msg: 'User already exists.' }] }));
    }

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });

    user = new Users({
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
      }
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) {
          res.status(500).json(new HttpError(new Date(), 500, 9999, `Error: ${err}`));
        }

        res.status(200).json(new HttpSuccess(200, 'User has been created.', {
          userToken: token,
          userData: user,
        }));
      }
    )
  } catch (err) {
    console.error(err);
    res.status(500).json(new HttpError(new Date(), 500, 9999, 'Server error.'));
  }
}

module.exports = {
  createUser,
};