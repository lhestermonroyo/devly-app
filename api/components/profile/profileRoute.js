const express = require('express');
const { check } = require('express-validator');

const {
  getOwnProfile,
  createProfile,
  getAllProfiles,
  getProfileByUserId,
  deleteProfile,
  updateProfileExperience,
  updateProfileEducation,
  deleteProfileExperience,
  deleteProfileEducation,
  getGithubRepositories,
} = require('./profileController');
const auth = require('../../utils/authUtil');

const router = express.Router();

router.get('/me', auth, getOwnProfile);

router.post(
  '/',
  [
    auth,
    check('status', 'Status is required.').not().isEmpty(),
    check('skills', 'Skills are required.').not().isEmpty(),
  ],
  createProfile
);

router.get('/', getAllProfiles);

router.get('/:user_id', getProfileByUserId);

router.delete('/', auth, deleteProfile);

router.put(
  '/experience',
  [
    auth,
    check('title', 'Title is required.').not().isEmpty(),
    check('company', 'Company is required.').not().isEmpty(),
    check('type', 'Type is required.').not().isEmpty(),
    check('from', 'From date is required.').not().isEmpty(),
  ],
  updateProfileExperience
);

router.delete('/experience/:exp_id', auth, deleteProfileExperience);

router.put(
  '/education',
  [
    auth,
    check('school', 'School is required.').not().isEmpty(),
    check('degree', 'Degree is required.').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required.').not().isEmpty(),
    check('from', 'From date is required.').not().isEmpty(),
  ],
  updateProfileEducation
);

router.delete('/education/:edu_id', auth, deleteProfileEducation);

router.get('/github/:username', getGithubRepositories);

module.exports = router;
