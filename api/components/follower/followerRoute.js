const express = require('express');

const { followUser, unfollowUser } = require('./followerController');

const auth = require('../../utils/authUtil');
const router = express.Router();

router.post('/:following_id', auth, followUser);
router.delete('/:following_id', auth, unfollowUser);

module.exports = router;
