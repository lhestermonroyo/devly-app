const express = require('express');
const { check } = require('express-validator'); 

const { getProfile, createProfile } = require('./profileController');
const auth = require('../../utils/authUtil');

const router = express.Router();

router.get(
  '/:id',
  auth,
  getProfile
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