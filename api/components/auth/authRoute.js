const express = require('express');
const { check } = require('express-validator');

const { getAuthUser, loginAuth } = require('./authController');
const auth = require('../../utils/authUtil');

const router = express.Router();

router.get('/', auth, getAuthUser);

router.post(
  '/',
  check('email', 'Please includ a valid email.').isEmail(),
  check('password', 'Password is required.').exists(),
  loginAuth
);

module.exports = router;
