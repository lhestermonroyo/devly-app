const express = require('express');
const { check } = require('express-validator');

const { createUser } = require('./usersController');
const router = express.Router();

router.post(
  '/',
  [
    check('firstname', 'Firstname is required.').not().isEmpty(),
    check('lastname', 'Lastname is required.').not().isEmpty(),
    check('email', 'Please include a valid email.').isEmail(),
    check('password', 'Please enter a password with 8 or more characters.').isLength({ min: 8 }),
  ],
  createUser);

module.exports = router;