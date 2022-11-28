const Follower = require('./followerModel');

const HttpSuccess = require('../../responses/HttpSuccess');
const HttpError = require('../../responses/HttpError');
const ValidationError = require('../../responses/ValidationError');

/**
 * Controller for request to add a follower
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next function to execute
 */
async function followUser(req, res, next) {
  const { following_id } = req.params;

  try {
    // check if current user and following user already existed
    let followerData = await Follower.findOne({
      following: following_id,
      user: req.params.id,
    });

    if (followerData) {
      return res.status(404).json(
        new ValidationError(404, {
          errors: [{ msg: 'Follower already existed.' }],
        })
      );
    }

    follower = new Follower({
      user: req.params.id,
      follower: follower_id,
    });

    await follower.save();

    const userFollowedDetails = await Follower.find({
      user: req.params.id,
    }).populate('follower', ['firstname', 'lastname', 'avatar']);

    return res.status(200).json(
      new HttpSuccess(200, 'Follower has been added.', {
        userFollowedDetails,
      })
    );
  } catch (error) {
    console.error(err);
    res.status(500).json(new HttpError(new Date(), 500, 9999, 'Server error.'));
  }
}

function unfollowUser() {

}

module.exports = { followUser, unfollowUser };
