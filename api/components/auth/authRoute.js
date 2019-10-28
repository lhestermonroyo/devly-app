const express = require('express');
const { check } = require('express-validator');

const { getAuthUser, loginAuth } = require('./authController');
const auth = require('../../utils/authUtil');

const router = express.Router();

router.get(
  '/', 
  auth,
  getAuthUser
);

router.post(
  '/',
  check('email', 'Please includ a valid email.').isEmail(),
  check('password', 'Please enter a password with 8 or more characters.').isLength({ min: 8 }),
  loginAuth
);

module.exports = router;