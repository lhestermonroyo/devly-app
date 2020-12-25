const express = require('express');
const { check } = require('express-validator');

const {
  createUser,
  getUser,
  updateUserDetails,
  updateUserPassword,
} = require('./usersController');
const auth = require('../../utils/authUtil');

const router = express.Router();

router.post(
  '/',
  [
    check('firstname', 'Firstname is required.').not().isEmpty(),
    check('lastname', 'Lastname is required.').not().isEmpty(),
    check('email', 'Please include a valid email.').isEmail(),
    check(
      'password',
      'Please enter a password with 8 or more characters.'
    ).isLength({ min: 8 }),
  ],
  createUser
);

router.put(
  '/',
  [
    auth,
    check('firstname', 'Firstname is required.').not().isEmpty(),
    check('lastname', 'Lastname is required.').not().isEmpty(),
    check('email', 'Please include a valid email.').isEmail(),
  ],
  updateUserDetails
);

router.put(
  '/password',
  [
    auth,
    check(
      'password',
      'Please enter a password with 8 or more characters.'
    ).isLength({ min: 8 }),
  ],
  updateUserPassword
);

router.get('/', getUser);

module.exports = router;
