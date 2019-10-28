const { validationResult } = require('express-validator');

const Profile = require('../profile/profileModel');
const User = require('../users/usersModel');
const HttpSuccess = require('../../responses/HttpSuccess');
const HttpError = require('../../responses/HttpError');
const ValidationError = require('../../responses/ValidationError');

/**
 * Controller for request to get profile
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next function to execute
 */
async function getProfile(req, res, next) {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', [ 'email', 'avatar']);

    if(!profile) {
      return res.status(400).json(new ValidationError(400, { errors: [{ msg: 'There is no profile for this user.' }] }));
    }

    await res.status(200).json(new HttpSuccess(200, 'Profile has been .', {
      profileData: profile,
    }));
  } catch(err) {
    console.log(err);
    res.status(500).json(new HttpError(new Date(), 500, 9999, 'Server error.'));
  }
}

/**
 * Controller for request to create profile
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next function to execute
 */
async function createProfile(req, res, next) {

} 

module.exports = {
  getProfile,
  createProfile,
}