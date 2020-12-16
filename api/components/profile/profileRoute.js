const express = require('express');
const { check } = require('express-validator');

const { getOwnProfile, createProfile } = require('./profileController');
const auth = require('../../utils/authUtil');

const router = express.Router();

router.get(
  '/me',
  auth,
  getOwnProfile
);

router.post(
  '/',
  [
    auth,
    check('status', 'Status is required.').not().isEmpty(),
    check('skills', 'Skills are required.').not().isEmpty(),
  ],
  createProfile
);

module.exports = router;