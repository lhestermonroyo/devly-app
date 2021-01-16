require('dotenv').config();
const { GITHUB_CLIENT_ID, GITHUB_SECRET } = process.env;

const { validationResult } = require('express-validator');
const request = require('request');

const Profile = require('../profile/profileModel');
const User = require('../user/usersModel');
const Post = require('../post/postModel');

const HttpSuccess = require('../../responses/HttpSuccess');
const HttpError = require('../../responses/HttpError');
const ValidationError = require('../../responses/ValidationError');

/**
 * Controller for request to get own profile
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next function to execute
 */
async function getOwnProfile(req, res, next) {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['email', 'avatar']);

    if (!profile) {
      return res.status(404).json(
        new ValidationError(404, {
          errors: [{ msg: 'There is no profile for this user.' }],
        })
      );
    }

    await res.status(200).json(
      new HttpSuccess(200, 'Profile details has been retrieved.', {
        profileDetails: profile,
      })
    );
  } catch (err) {
    console.error(err);
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
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(new ValidationError(400, errors.array()));
  }

  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = req.body;

  //  Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    profileFields.skills = skills.split(',').map((skill) => skill.trim());
  }

  // Build social object
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (facebook) profileFields.social.facebook = facebook;
  if (twitter) profileFields.social.twitter = twitter;
  if (instagram) profileFields.social.instagram = instagram;
  if (linkedin) profileFields.social.linkedin = linkedin;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.status(200).json(
        new HttpSuccess(200, 'Profile has been updated.', {
          profileDetails: profile,
        })
      );
    }

    // Create
    profile = new Profile(profileFields);

    await profile.save();
    return res.status(200).json(
      new HttpSuccess(200, 'Profile has been created.', {
        profileDetails: profile,
      })
    );
  } catch (err) {
    console.error(err);
    res.status(500).json(new HttpError(new Date(), 500, 9999, 'Server error.'));
  }
}

/**
 * Controller for request to get all profiles
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next function to execute
 */
async function getAllProfiles(req, res, next) {
  try {
    const profiles = await Profile.find().populate('user', [
      'firstname',
      'lastname',
      'avatar',
    ]);
    return res.status(200).json(
      new HttpSuccess(200, 'Profiles has been retrieved.', {
        profiles,
      })
    );
  } catch (err) {
    console.error(err);
    res.status(500).json(new HttpError(new Date(), 500, 9999, 'Server error.'));
  }
}

/**
 * Controller for request to get profile by user id
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next function to execute
 */
async function getProfileByUserId(req, res, next) {
  const { user_id } = req.params;
  try {
    const profile = await Profile.findById({ _id: user_id }).populate('user', [
      'firstname',
      'lastname',
      'avatar',
    ]);

    if (!profile) {
      return res.status(404).json(
        new ValidationError(404, {
          errors: [{ msg: 'There is no profile for this user.' }],
        })
      );
    }

    return res.status(200).json(
      new HttpSuccess(200, 'Profile details has been retrieved.', {
        profileDetails: profile,
      })
    );
  } catch (err) {
    console.error(err);
    res.status(500).json(new HttpError(new Date(), 500, 9999, 'Server error.'));
  }
}

/**
 * Controller for request to delete profile, user and posts
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next function to execute
 */
async function deleteProfile(req, res, next) {
  try {
    // @todo - remove user's posts
    await Post.findOneAndRemove({ user: req.user.id });

    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // Remove user
    await User.findByIdAndRemove({ _id: req.user.id });

    return res.status(200).json(
      new HttpSuccess(200, {
        msg: 'User has been deleted.',
      })
    );
  } catch (err) {
    console.error(err);
    res.status(500).json(new HttpError(new Date(), 500, 9999, 'Server error.'));
  }
}

/**
 * Controller for request to update profile experience
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next function to execute
 */
async function updateProfileExperience(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(new ValidationError(400, errors.array()));
  }

  const {
    title,
    company,
    location,
    type,
    from,
    to,
    current,
    description,
  } = req.body;

  const newExperience = {
    title,
    company,
    location,
    type,
    from,
    to,
    current,
    description,
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.experience.unshift(newExperience);

    await profile.save();

    return res.status(200).json(
      new HttpSuccess(200, {
        msg: 'Experience has been updated.',
      })
    );
  } catch (err) {
    console.error(err);
    res.status(500).json(new HttpError(new Date(), 500, 9999, 'Server error.'));
  }
}

/**
 * Controller for request to delete profile experience
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next function to execute
 */
async function deleteProfileExperience(req, res, next) {
  const { exp_id } = req.params;
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    return res.status(200).json(
      new HttpSuccess(200, {
        msg: 'Experience has been deleted.',
      })
    );
  } catch (err) {
    console.error(err);
    res.status(500).json(new HttpError(new Date(), 500, 9999, 'Server error.'));
  }
}

/**
 * Controller for request to update profile education
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next function to execute
 */
async function updateProfileEducation(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(new ValidationError(400, errors.array()));
  }

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = req.body;

  const newEducation = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.education.unshift(newEducation);

    await profile.save();

    return res.status(200).json(
      new HttpSuccess(200, {
        msg: 'Education has been updated.',
      })
    );
  } catch (err) {
    console.error(err);
    res.status(500).json(new HttpError(new Date(), 500, 9999, 'Server error.'));
  }
}

/**
 * Controller for request to delete profile education
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next function to execute
 */
async function deleteProfileEducation(req, res, next) {
  const { edu_id } = req.params;
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    return res.status(200).json(
      new HttpSuccess(200, {
        msg: 'Education has been deleted.',
      })
    );
  } catch (err) {
    console.error(err);
    res.status(500).json(new HttpError(new Date(), 500, 9999, 'Server error.'));
  }
}

/**
 * Controller for request to get user's repositories from github
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next function to execute
 */
async function getGithubRepositories(req, res, next) {
  const { username } = req.params;
  try {
    const option = {
      uri: `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_SECRET}`,
      method: 'GET',
      headers: {
        'user-agent': 'node.js',
      },
    };

    request(option, (err, response, body) => {
      if (err) console.error(err);

      if (response.statusCode !== 200) {
        return res.status(404).json(
          new ValidationError(404, {
            errors: [{ msg: 'No Github profile found.' }],
          })
        );
      }

      res.status(200).json(new HttpSuccess(200, JSON.parse(body)));
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(new HttpError(new Date(), 500, 9999, 'Server error.'));
  }
}

module.exports = {
  getOwnProfile,
  createProfile,
  getAllProfiles,
  getProfileByUserId,
  deleteProfile,
  updateProfileExperience,
  deleteProfileExperience,
  updateProfileEducation,
  deleteProfileEducation,
  getGithubRepositories,
};
